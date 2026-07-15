-- =======================================================
-- Echo AI — Supabase Setup SQL  (v2 — simplified)
-- =======================================================
-- IMPORTANT: Run "npx prisma db push" FIRST so all tables
-- exist, THEN paste this entire file into the Supabase
-- SQL Editor and click "Run".
-- =======================================================

-- ────────────────────────────────────────────────────────
-- 1. Extensions  (idempotent — safe to re-run)
-- ────────────────────────────────────────────────────────
create extension if not exists pg_trgm;
create extension if not exists vector;

-- ────────────────────────────────────────────────────────
-- 2. Enable Row Level Security
-- ────────────────────────────────────────────────────────
alter table public.users                 enable row level security;
alter table public.accounts              enable row level security;
alter table public.sessions              enable row level security;
alter table public.verification_tokens   enable row level security;
alter table public.content_sources       enable row level security;
alter table public.trait_claims          enable row level security;
alter table public.profile_versions      enable row level security;
alter table public.profile_current       enable row level security;
alter table public.trait_links           enable row level security;
alter table public.reflections           enable row level security;
alter table public.future_scenarios      enable row level security;
alter table public.goals                 enable row level security;
alter table public.habits                enable row level security;
alter table public.habit_logs            enable row level security;
alter table public.user_achievements     enable row level security;
alter table public.user_missions         enable row level security;
alter table public.season_progress       enable row level security;
alter table public.share_cards           enable row level security;
alter table public.subscriptions         enable row level security;
alter table public.ai_jobs               enable row level security;
alter table public.audit_logs            enable row level security;
alter table public.notifications         enable row level security;
alter table public.user_feature_flags    enable row level security;

-- ────────────────────────────────────────────────────────
-- 3. Service-role bypass policies
--    Prisma connects via service role → bypasses RLS.
--    These policies are defence-in-depth only.
-- ────────────────────────────────────────────────────────
create policy "service role bypass" on public.users
  for all to service_role using (true) with check (true);

create policy "service role bypass" on public.accounts
  for all to service_role using (true) with check (true);

create policy "service role bypass" on public.sessions
  for all to service_role using (true) with check (true);

create policy "service role bypass" on public.verification_tokens
  for all to service_role using (true) with check (true);

create policy "service role bypass" on public.content_sources
  for all to service_role using (true) with check (true);

create policy "service role bypass" on public.trait_claims
  for all to service_role using (true) with check (true);

create policy "service role bypass" on public.profile_versions
  for all to service_role using (true) with check (true);

create policy "service role bypass" on public.profile_current
  for all to service_role using (true) with check (true);

create policy "service role bypass" on public.trait_links
  for all to service_role using (true) with check (true);

create policy "service role bypass" on public.reflections
  for all to service_role using (true) with check (true);

create policy "service role bypass" on public.future_scenarios
  for all to service_role using (true) with check (true);

create policy "service role bypass" on public.goals
  for all to service_role using (true) with check (true);

create policy "service role bypass" on public.habits
  for all to service_role using (true) with check (true);

create policy "service role bypass" on public.habit_logs
  for all to service_role using (true) with check (true);

create policy "service role bypass" on public.user_achievements
  for all to service_role using (true) with check (true);

create policy "service role bypass" on public.user_missions
  for all to service_role using (true) with check (true);

create policy "service role bypass" on public.season_progress
  for all to service_role using (true) with check (true);

create policy "service role bypass" on public.share_cards
  for all to service_role using (true) with check (true);

create policy "service role bypass" on public.subscriptions
  for all to service_role using (true) with check (true);

create policy "service role bypass" on public.ai_jobs
  for all to service_role using (true) with check (true);

create policy "service role bypass" on public.audit_logs
  for all to service_role using (true) with check (true);

create policy "service role bypass" on public.notifications
  for all to service_role using (true) with check (true);

create policy "service role bypass" on public.user_feature_flags
  for all to service_role using (true) with check (true);

-- ────────────────────────────────────────────────────────
-- 4. Public read — share cards (accessible without login)
-- ────────────────────────────────────────────────────────
create policy "share cards public read" on public.share_cards
  for select using (true);

-- ────────────────────────────────────────────────────────
-- 5. Full-text search indexes (pg_trgm)
-- ────────────────────────────────────────────────────────
create index if not exists idx_reflections_body_trgm
  on public.reflections using gin(body gin_trgm_ops);

create index if not exists idx_content_sources_body_trgm
  on public.content_sources using gin(body gin_trgm_ops);

create index if not exists idx_trait_claims_label_trgm
  on public.trait_claims using gin(label gin_trgm_ops);

-- ────────────────────────────────────────────────────────
-- 6. Updated-at trigger function
-- ────────────────────────────────────────────────────────
create or replace function public.set_updated_at()
  returns trigger language plpgsql as $$
  begin
    new.updated_at = now();
    return new;
  end;
$$;

create or replace trigger trg_users_updated_at
  before update on public.users
  for each row execute function public.set_updated_at();

create or replace trigger trg_content_sources_updated_at
  before update on public.content_sources
  for each row execute function public.set_updated_at();

create or replace trigger trg_reflections_updated_at
  before update on public.reflections
  for each row execute function public.set_updated_at();

create or replace trigger trg_goals_updated_at
  before update on public.goals
  for each row execute function public.set_updated_at();

create or replace trigger trg_habits_updated_at
  before update on public.habits
  for each row execute function public.set_updated_at();

create or replace trigger trg_user_missions_updated_at
  before update on public.user_missions
  for each row execute function public.set_updated_at();

create or replace trigger trg_season_progress_updated_at
  before update on public.season_progress
  for each row execute function public.set_updated_at();

create or replace trigger trg_subscriptions_updated_at
  before update on public.subscriptions
  for each row execute function public.set_updated_at();

create or replace trigger trg_ai_jobs_updated_at
  before update on public.ai_jobs
  for each row execute function public.set_updated_at();

-- ────────────────────────────────────────────────────────
-- 7. Verify — should show rowsecurity = true for all rows
-- ────────────────────────────────────────────────────────
select tablename, rowsecurity
from pg_tables
where schemaname = 'public'
  and tablename  != '_prisma_migrations'
order by tablename;
