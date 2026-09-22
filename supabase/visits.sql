-- ============================================================================
-- Speakout B1 — إحصائيات الزيارات (لوحة الأدمن)
-- شغّل ده مرة واحدة في Supabase Dashboard ← SQL Editor على مشروع b1 بتاعك،
-- بعد تشغيل schema.sql و admin.sql.
-- ============================================================================

-- جدول واحد فيه: أول ظهور ، آخر ظهور ، عدد الفتحات لكل جهاز/متصفح.
create table if not exists public.active_visits (
  visitor_key text primary key,
  first_seen timestamptz not null default now(),
  last_seen timestamptz not null default now(),
  opens integer not null default 1
);

alter table public.active_visits enable row level security;

-- تسجيل فتحة جديدة (مع أول تحميل للصفحة)
create or replace function public.record_visit(p_key text)
returns void
language plpgsql
security definer
as $$
begin
  insert into public.active_visits (visitor_key, last_seen, opens)
  values (p_key, now(), 1)
  on conflict (visitor_key) do update
    set opens = public.active_visits.opens + 1,
        last_seen = now();
end;
$$;

-- نبضة حياة: بتحدّث "آخر ظهور" بس (عشان عدّاد اللي فاتحين لايف يفضل دقيق)
create or replace function public.visit_ping(p_key text)
returns void
language sql
security definer
as $$
  update public.active_visits set last_seen = now() where visitor_key = p_key;
$$;

-- إحصائيات للأدمن بس: النهارده / لايف دلوقتي / إجمالي الفتحات
create or replace function public.admin_visits()
returns json
language sql
security definer
stable
as $$
  select case when exists (
    select 1 from public.admins
    where username = auth.jwt() -> 'user_metadata' ->> 'username'
  ) then json_build_object(
    'today', (select count(*) from public.active_visits where last_seen >= date_trunc('day', now())),
    'live', (select count(*) from public.active_visits where last_seen >= now() - interval '5 minutes'),
    'total', (select coalesce(sum(opens), 0) from public.active_visits)
  ) else '{}'::json end;
$$;

revoke all on function public.record_visit(text) from public, anon;
revoke all on function public.visit_ping(text) from public, anon;
revoke all on function public.admin_visits() from public, anon;

grant execute on function public.record_visit(text) to anon, authenticated;
grant execute on function public.visit_ping(text) to anon, authenticated;
grant execute on function public.admin_visits() to authenticated;