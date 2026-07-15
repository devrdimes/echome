-- =======================================================
-- Echo AI — Supabase Setup SQL
-- =======================================================
-- HOW TO USE:
-- 1. Run "npx prisma migrate deploy" (or prisma db push) first
--    so Prisma creates all tables with snake_case names.
-- 2. Then run THIS file in the Supabase SQL Editor.
-- =======================================================

-- ───────────────────────────────────────────────────────
-- 1. Extensions
-- ───────────────────────────────────────────────────────
create extension if not exists pg_trgm  with schema extensions;
create extension if not exists vector   with schema extensions;

-- ───────────────────────────────────────────────────────
-- 2. Enable Row Level Security on all tables
-- ───────────────────────────────────────────────────────
do $$
  declare t text;
  begin
    for t in
      select table_name
      from information_schema.tables
      where table_schema = 'public'
        and table_type   = 'BASE TABLE'
        and table_name not in ('_prisma_migrations')
    loop
      execute format('alter table public.%I enable row level security', t);
    end loop;
  end;
$$;

-- ───────────────────────────────────────────────────────
-- 3. Service-role bypass (used by Prisma / server)
--    The DATABASE_URL connection uses the service role,
--    which bypasses RLS automatically. These policies are
--    defence-in-depth for direct queries.
-- ───────────────────────────────────────────────────────

-- Helper: create a service-role bypass policy for a table
create or replace function create_service_bypass(tbl text) returns void
  language plpgsql as $$
  begin
    execute format(
      'create policy "service role full access" on public.%I
         for all to service_role using (true) with check (true)',
      tbl
    );
  exception when duplicate_object then null;
  end;
$$;

select create_service_bypass('users');
select create_service_bypass('accounts');
select create_service_bypass('sessions');
select create_service_bypass('verification_tokens');
select create_service_bypass('content_sources');
select create_service_bypass('trait_claims');
select create_service_bypass('profile_versions');
select create_service_bypass('profile_current');
select create_service_bypass('trait_links');
select create_service_bypass('reflections');
select create_service_bypass('future_scenarios');
select create_service_bypass('goals');
select create_service_bypass('habits');
select create_service_bypass('habit_logs');
select create_service_bypass('user_achievements');
select create_service_bypass('user_missions');
select create_service_bypass('season_progress');
select create_service_bypass('share_cards');
select create_service_bypass('subscriptions');
select create_service_bypass('ai_jobs');
select create_service_bypass('audit_logs');
select create_service_bypass('notifications');
select create_service_bypass('user_feature_flags');

drop function create_service_bypass;

-- ───────────────────────────────────────────────────────
-- 4. Public read policies (no auth needed)
-- ───────────────────────────────────────────────────────

-- Share cards are publicly readable via share_id
create policy "share_cards public read"
  on public.share_cards for select
  using (true);

-- ───────────────────────────────────────────────────────
-- 5. Indexes for full-text search (pg_trgm)
-- ───────────────────────────────────────────────────────
create index if not exists idx_reflections_body_trgm
  on public.reflections using gin (body gin_trgm_ops);

create index if not exists idx_content_sources_body_trgm
  on public.content_sources using gin (body gin_trgm_ops);

create index if not exists idx_trait_claims_label_trgm
  on public.trait_claims using gin (label gin_trgm_ops);

-- ───────────────────────────────────────────────────────
-- 6. Updated-at trigger function
-- ───────────────────────────────────────────────────────
create or replace function set_updated_at()
  returns trigger language plpgsql as $$
  begin
    new.updated_at = now();
    return new;
  end;
$$;

-- Apply to tables that have updated_at (Prisma handles this via @updatedAt,
-- but this trigger ensures it works for direct SQL updates too)
do $$
  declare t text;
  begin
    for t in select unnest(array[
      'users', 'content_sources', 'reflections', 'goals',
      'habits', 'user_missions', 'season_progress', 'subscriptions',
      'ai_jobs'
    ])
    loop
      execute format(
        'create or replace trigger trg_%s_updated_at
           before update on public.%I
           for each row execute procedure set_updated_at()',
        replace(t, '-', '_'), t
      );
    end loop;
  end;
$$;

-- ───────────────────────────────────────────────────────
-- Done!
-- ───────────────────────────────────────────────────────
-- Verification: check all tables have RLS enabled
select tablename, rowsecurity
from pg_tables
where schemaname = 'public'
  and tablename != '_prisma_migrations'
order by tablename;
