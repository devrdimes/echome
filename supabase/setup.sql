-- =======================================================
-- Echo AI — Complete Supabase Schema + RLS Setup
-- =======================================================
-- This file creates ALL tables, then sets up extensions,
-- RLS, indexes, and triggers.
-- Run this ONCE in Supabase SQL Editor → New Query → Run.
-- =======================================================

-- ────────────────────────────────────────────────────────
-- 1. Extensions
-- ────────────────────────────────────────────────────────
create extension if not exists pg_trgm;
create extension if not exists vector;

-- ────────────────────────────────────────────────────────
-- 2. Enum types
-- ────────────────────────────────────────────────────────
do $$ begin
  create type "PlanTier" as enum ('FREE', 'PRO', 'ULTIMATE');
  exception when duplicate_object then null;
end $$;

do $$ begin
  create type "SubscriptionStatus" as enum (
    'ACTIVE', 'PAST_DUE', 'CANCELED', 'TRIALING', 'PAUSED', 'INCOMPLETE'
  );
  exception when duplicate_object then null;
end $$;

do $$ begin
  create type "ContentSort" as enum (
    'CONVERSATION', 'WRITING', 'VOICE', 'JOURNAL', 'FEEDBACK', 'BEHAVIOR'
  );
  exception when duplicate_object then null;
end $$;

do $$ begin
  create type "ProfileStatus" as enum ('DRAFT', 'GENERATING', 'READY', 'FAILED');
  exception when duplicate_object then null;
end $$;

do $$ begin
  create type "ReflectionMood" as enum ('VERY_LOW', 'LOW', 'NEUTRAL', 'HIGH', 'VERY_HIGH');
  exception when duplicate_object then null;
end $$;

do $$ begin
  create type "HabitStatus" as enum ('ACTIVE', 'PAUSED', 'ARCHIVED');
  exception when duplicate_object then null;
end $$;

do $$ begin
  create type "SortOfCompletion" as enum ('DONE', 'SKIPPED', 'PARTIAL');
  exception when duplicate_object then null;
end $$;

do $$ begin
  create type "Role" as enum ('USER', 'ADMIN');
  exception when duplicate_object then null;
end $$;

do $$ begin
  create type "AchievementKind" as enum (
    'FIRST_REPORT', 'STREAK_7', 'STREAK_30', 'STREAK_100',
    'REFLECTION_10', 'REFLECTION_50', 'HABIT_MASTER', 'GOAL_REACHED',
    'SHARED_REPORT', 'ALL_SECTIONS', 'EARLY_ADOPTER'
  );
  exception when duplicate_object then null;
end $$;

do $$ begin
  create type "SeasonName" as enum ('SPRING', 'SUMMER', 'AUTUMN', 'WINTER');
  exception when duplicate_object then null;
end $$;

do $$ begin
  create type "AIJobState" as enum ('QUEUED', 'RUNNING', 'COMPLETED', 'FAILED', 'RETRYING');
  exception when duplicate_object then null;
end $$;

do $$ begin
  create type "TraitCategory" as enum (
    'COMMUNICATION', 'LEADERSHIP', 'LEARNING', 'RELATIONSHIP', 'EMOTIONAL',
    'DECISION_MAKING', 'STRESS', 'BLIND_SPOT', 'HIDDEN_STRENGTH', 'GROWTH', 'CORE'
  );
  exception when duplicate_object then null;
end $$;

-- ────────────────────────────────────────────────────────
-- 3. Tables
-- ────────────────────────────────────────────────────────

-- users
create table if not exists public.users (
  id                              text        primary key,
  name                            varchar(120),
  email                           varchar(255) not null unique,
  email_verified                  timestamptz,
  image                           varchar(2048),
  role                            "Role"       not null default 'USER',
  total_xp                        integer      not null default 0,
  level                           integer      not null default 1,
  current_streak                  integer      not null default 0,
  longest_streak                  integer      not null default 0,
  last_streak_day                 timestamptz,
  plan_tier                       "PlanTier"   not null default 'FREE',
  subscription_status             "SubscriptionStatus" not null default 'ACTIVE',
  trial_ends_at                   timestamptz,
  reports_generated_this_cycle    integer      not null default 0,
  reflections_this_cycle          integer      not null default 0,
  future_sims_this_cycle          integer      not null default 0,
  cycle_started_at                timestamptz  not null default now(),
  created_at                      timestamptz  not null default now(),
  updated_at                      timestamptz  not null default now()
);

-- accounts
create table if not exists public.accounts (
  id                  text primary key,
  user_id             text        not null references public.users(id) on delete cascade,
  type                text        not null,
  provider            text        not null,
  provider_account_id text        not null,
  refresh_token       text,
  access_token        text,
  expires_at          integer,
  token_type          text,
  scope               text,
  id_token            text,
  session_state       text,
  created_at          timestamptz not null default now(),
  unique(provider, provider_account_id)
);

-- sessions
create table if not exists public.sessions (
  id            text primary key,
  session_token text        not null unique,
  user_id       text        not null references public.users(id) on delete cascade,
  expires       timestamptz not null,
  created_at    timestamptz not null default now()
);

-- verification_tokens
create table if not exists public.verification_tokens (
  identifier text        not null,
  token      text        not null unique,
  expires    timestamptz not null,
  unique(identifier, token)
);

-- subscriptions
create table if not exists public.subscriptions (
  id                      text primary key,
  user_id                 text   not null unique references public.users(id) on delete cascade,
  stripe_customer_id      text   not null unique,
  stripe_subscription_id  text   unique,
  stripe_price_id         varchar(200),
  status                  "SubscriptionStatus" not null default 'TRIALING',
  current_period_start    timestamptz,
  current_period_end      timestamptz,
  cancel_at               timestamptz,
  canceled_at             timestamptz,
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now()
);

-- content_sources
create table if not exists public.content_sources (
  id             text primary key,
  user_id        text          not null references public.users(id) on delete cascade,
  sort           "ContentSort" not null,
  title          varchar(200),
  body           text          not null,
  metadata       jsonb         not null default '{}',
  active         boolean       not null default true,
  token_estimate integer       not null default 0,
  created_at     timestamptz   not null default now(),
  updated_at     timestamptz   not null default now()
);

-- trait_claims
create table if not exists public.trait_claims (
  id          text primary key,
  user_id     text           not null references public.users(id) on delete cascade,
  source_id   text           not null references public.content_sources(id) on delete cascade,
  category    "TraitCategory" not null,
  label       varchar(120)   not null,
  description text           not null,
  confidence  double precision not null default 0.5,
  quote       text,
  polarity    double precision not null default 0,
  created_at  timestamptz    not null default now()
);

-- profile_versions
create table if not exists public.profile_versions (
  id            text primary key,
  user_id       text            not null references public.users(id) on delete cascade,
  version       integer         not null,
  status        "ProfileStatus" not null default 'DRAFT',
  report        jsonb           not null default '{}',
  summary       text            not null default '',
  confidence    double precision not null default 0.5,
  source_ids    text[]          not null default '{}',
  token_usage   integer         not null default 0,
  cost_usd      double precision not null default 0,
  model_tag     varchar(120)    not null default '',
  error_message text,
  created_at    timestamptz     not null default now(),
  unique(user_id, version)
);

-- profile_current
create table if not exists public.profile_current (
  user_id            text primary key references public.users(id) on delete cascade,
  profile_version_id text        not null references public.profile_versions(id) on delete cascade,
  updated_at         timestamptz not null default now()
);

-- trait_links
create table if not exists public.trait_links (
  id                 text primary key,
  profile_version_id text             not null references public.profile_versions(id) on delete cascade,
  trait_claim_id     text             not null references public.trait_claims(id) on delete cascade,
  weight             double precision not null default 1,
  unique(profile_version_id, trait_claim_id)
);

-- reflections
create table if not exists public.reflections (
  id         text primary key,
  user_id    text             not null references public.users(id) on delete cascade,
  date       date             not null,
  body       text             not null,
  mood       "ReflectionMood" not null default 'NEUTRAL',
  analysis   jsonb            not null default '{}',
  analyzed   boolean          not null default false,
  tags       text[]           not null default '{}',
  created_at timestamptz      not null default now(),
  updated_at timestamptz      not null default now(),
  unique(user_id, date)
);

-- goals
create table if not exists public.goals (
  id            text primary key,
  user_id       text        not null references public.users(id) on delete cascade,
  title         varchar(200) not null,
  description   text         not null default '',
  cadence       text         not null default 'weekly',
  target_metric varchar(60),
  target_value  double precision,
  progress      double precision not null default 0,
  achieved      boolean      not null default false,
  achieved_at   timestamptz,
  archived      boolean      not null default false,
  habit_ids     text[]       not null default '{}',
  color         varchar(20),
  created_at    timestamptz  not null default now(),
  updated_at    timestamptz  not null default now()
);

-- future_scenarios
create table if not exists public.future_scenarios (
  id                  text primary key,
  user_id             text        not null references public.users(id) on delete cascade,
  goal_id             text        references public.goals(id) on delete set null,
  title               varchar(200) not null,
  scenario            text         not null,
  confidence          jsonb        not null default '{}',
  branches            jsonb        not null default '[]',
  assumptions         text[]       not null default '{}',
  disclaimer_snapshot text         not null default '',
  model_tag           varchar(120) not null default '',
  token_usage         integer      not null default 0,
  cost_usd            double precision not null default 0,
  created_at          timestamptz  not null default now()
);

-- habits
create table if not exists public.habits (
  id             text primary key,
  user_id        text          not null references public.users(id) on delete cascade,
  title          varchar(160)  not null,
  description    text,
  cadence        text          not null default 'daily',
  schedule       jsonb         not null default '{}',
  difficulty     integer       not null default 3,
  status         "HabitStatus" not null default 'ACTIVE',
  total_done     integer       not null default 0,
  best_streak    integer       not null default 0,
  current_streak integer       not null default 0,
  goal_id        text,
  created_at     timestamptz   not null default now(),
  updated_at     timestamptz   not null default now()
);

-- habit_logs
create table if not exists public.habit_logs (
  id         text primary key,
  user_id    text              not null references public.users(id) on delete cascade,
  habit_id   text              not null references public.habits(id) on delete cascade,
  date       date              not null,
  completion "SortOfCompletion" not null default 'DONE',
  note       text,
  ai_note    text,
  created_at timestamptz       not null default now(),
  unique(habit_id, date)
);

-- user_achievements
create table if not exists public.user_achievements (
  id          text primary key,
  user_id     text              not null references public.users(id) on delete cascade,
  kind        "AchievementKind" not null,
  xp_awarded  integer           not null default 0,
  metadata    jsonb             not null default '{}',
  unlocked_at timestamptz       not null default now(),
  unique(user_id, kind)
);

-- user_missions
create table if not exists public.user_missions (
  id          text primary key,
  user_id     text        not null references public.users(id) on delete cascade,
  mission_key varchar(60) not null,
  title       varchar(160) not null,
  description text         not null,
  type        varchar(40)  not null,
  target      integer      not null default 1,
  progress    integer      not null default 0,
  completed   boolean      not null default false,
  claimed     boolean      not null default false,
  xp_reward   integer      not null default 0,
  week_key    varchar(10)  not null,
  created_at  timestamptz  not null default now(),
  updated_at  timestamptz  not null default now(),
  unique(user_id, mission_key)
);

-- season_progress
create table if not exists public.season_progress (
  id              text primary key,
  user_id         text         not null references public.users(id) on delete cascade,
  season          "SeasonName" not null,
  year            integer      not null,
  xp_this_season  integer      not null default 0,
  tier_reached    integer      not null default 0,
  rewards_claimed text[]       not null default '{}',
  created_at      timestamptz  not null default now(),
  updated_at      timestamptz  not null default now(),
  unique(user_id, season, year)
);

-- share_cards
create table if not exists public.share_cards (
  id                 text primary key,
  user_id            text        not null references public.users(id) on delete cascade,
  profile_version_id text        references public.profile_versions(id) on delete set null,
  title              varchar(120) not null,
  format             text         not null default 'square',
  accent             varchar(20)  not null default '',
  share_id           text         not null unique,
  image_url          varchar(2048),
  payload            jsonb        not null default '{}',
  shared_to          text[]       not null default '{}',
  created_at         timestamptz  not null default now()
);

-- ai_jobs
create table if not exists public.ai_jobs (
  id              text primary key,
  user_id         text         not null references public.users(id) on delete cascade,
  type            varchar(60)  not null,
  state           "AIJobState" not null default 'QUEUED',
  payload         jsonb        not null default '{}',
  result          jsonb,
  error           text,
  attempts        integer      not null default 0,
  next_attempt_at timestamptz  not null default now(),
  created_at      timestamptz  not null default now(),
  updated_at      timestamptz  not null default now()
);

-- audit_logs
create table if not exists public.audit_logs (
  id         text primary key,
  user_id    text        references public.users(id) on delete set null,
  action     varchar(80) not null,
  diff       jsonb       not null default '{}',
  ip         varchar(45),
  user_agent varchar(512),
  created_at timestamptz not null default now()
);

-- notifications
create table if not exists public.notifications (
  id         text primary key,
  user_id    text        not null references public.users(id) on delete cascade,
  type       varchar(60) not null,
  title      varchar(200) not null,
  body       text         not null,
  href       varchar(500),
  read       boolean      not null default false,
  created_at timestamptz  not null default now()
);

-- user_feature_flags
create table if not exists public.user_feature_flags (
  id         text primary key,
  user_id    text        not null references public.users(id) on delete cascade,
  flag       varchar(60) not null,
  value      boolean     not null default false,
  created_at timestamptz not null default now(),
  unique(user_id, flag)
);

-- ────────────────────────────────────────────────────────
-- 4. Indexes
-- ────────────────────────────────────────────────────────
create index if not exists idx_accounts_user_id          on public.accounts(user_id);
create index if not exists idx_sessions_user_id          on public.sessions(user_id);
create index if not exists idx_users_plan_tier           on public.users(plan_tier);
create index if not exists idx_users_subscription_status on public.users(subscription_status);
create index if not exists idx_users_role                on public.users(role);
create index if not exists idx_content_sources_user_sort on public.content_sources(user_id, sort, active);
create index if not exists idx_content_sources_created   on public.content_sources(created_at);
create index if not exists idx_trait_claims_user_cat     on public.trait_claims(user_id, category);
create index if not exists idx_trait_claims_source       on public.trait_claims(source_id);
create index if not exists idx_profile_versions_status   on public.profile_versions(user_id, status);
create index if not exists idx_trait_links_claim         on public.trait_links(trait_claim_id);
create index if not exists idx_reflections_date          on public.reflections(user_id, date);
create index if not exists idx_future_scenarios_created  on public.future_scenarios(user_id, created_at);
create index if not exists idx_goals_archived            on public.goals(user_id, archived);
create index if not exists idx_habits_status             on public.habits(user_id, status);
create index if not exists idx_habit_logs_date           on public.habit_logs(user_id, date);
create index if not exists idx_achievements_user         on public.user_achievements(user_id);
create index if not exists idx_missions_week             on public.user_missions(user_id, week_key);
create index if not exists idx_season_progress_user      on public.season_progress(user_id);
create index if not exists idx_share_cards_created       on public.share_cards(user_id, created_at);
create index if not exists idx_subscriptions_status      on public.subscriptions(status);
create index if not exists idx_ai_jobs_state             on public.ai_jobs(state, next_attempt_at);
create index if not exists idx_ai_jobs_user_type         on public.ai_jobs(user_id, type);
create index if not exists idx_audit_logs_user           on public.audit_logs(user_id, created_at);
create index if not exists idx_audit_logs_action         on public.audit_logs(action, created_at);
create index if not exists idx_notifications_user        on public.notifications(user_id, read, created_at);

-- Full-text search (pg_trgm)
create index if not exists idx_reflections_body_trgm
  on public.reflections using gin(body gin_trgm_ops);

create index if not exists idx_content_sources_body_trgm
  on public.content_sources using gin(body gin_trgm_ops);

create index if not exists idx_trait_claims_label_trgm
  on public.trait_claims using gin(label gin_trgm_ops);

-- ────────────────────────────────────────────────────────
-- 5. Enable Row Level Security
-- ────────────────────────────────────────────────────────
alter table public.users                enable row level security;
alter table public.accounts             enable row level security;
alter table public.sessions             enable row level security;
alter table public.verification_tokens  enable row level security;
alter table public.content_sources      enable row level security;
alter table public.trait_claims         enable row level security;
alter table public.profile_versions     enable row level security;
alter table public.profile_current      enable row level security;
alter table public.trait_links          enable row level security;
alter table public.reflections          enable row level security;
alter table public.future_scenarios     enable row level security;
alter table public.goals                enable row level security;
alter table public.habits               enable row level security;
alter table public.habit_logs           enable row level security;
alter table public.user_achievements    enable row level security;
alter table public.user_missions        enable row level security;
alter table public.season_progress      enable row level security;
alter table public.share_cards          enable row level security;
alter table public.subscriptions        enable row level security;
alter table public.ai_jobs              enable row level security;
alter table public.audit_logs           enable row level security;
alter table public.notifications        enable row level security;
alter table public.user_feature_flags   enable row level security;

-- ────────────────────────────────────────────────────────
-- 6. Service-role bypass (Prisma uses service role)
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

-- Share cards are publicly readable (no login required)
create policy "share cards public read" on public.share_cards
  for select using (true);

-- ────────────────────────────────────────────────────────
-- 7. Updated-at trigger
-- ────────────────────────────────────────────────────────
create or replace function public.set_updated_at()
  returns trigger language plpgsql as $$
  begin new.updated_at = now(); return new; end;
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
-- 8. Verify
-- ────────────────────────────────────────────────────────
select tablename, rowsecurity
from pg_tables
where schemaname = 'public'
  and tablename != '_prisma_migrations'
order by tablename;
