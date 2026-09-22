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
  opens integer not null default 1,
  -- حد أقصى لطول المفتاح ومنع أي قيم شاذة من مكتبة الـ spam
  constraint active_visits_key_len check (length(visitor_key) between 1 and 128)
);

alter table public.active_visits enable row level security;

-- تسجيل فتحة جديدة (مع أول تحميل للصفحة)
-- p_key بيتم تدقيقه هنا عشان أي حد (anon) يقدر يستدعيها بس بقيود:
-- طول معقول + نمنع التضخيم السريع (فتحة جديدة خلال 10 ثواني = تاني مرة، مش جديدة)
create or replace function public.record_visit(p_key text)
returns void
language plpgsql
security definer
as $$
begin
  if p_key is null or length(p_key) > 128 then
    return;
  end if;

  insert into public.active_visits (visitor_key, last_seen, opens)
  values (p_key, now(), 1)
  on conflict (visitor_key) do update
    set opens = case
          when public.active_visits.last_seen < now() - interval '10 seconds'
            then public.active_visits.opens + 1
          else public.active_visits.opens
        end,
        last_seen = now();
end;
$$;

-- نبضة حياة: بتحدّث "آخر ظهور" بس (عشان عدّاد اللي فاتحين لايف يفضل دقيق)
create or replace function public.visit_ping(p_key text)
returns void
language sql
security definer
as $$
  update public.active_visits
     set last_seen = now()
   where visitor_key = p_key
     and p_key is not null
     and length(p_key) <= 128;
$$;

-- إحصائيات للأدمن بس (فحص صلاحية بالـ user id الثابت مش بالاسم)
create or replace function public.admin_visits()
returns json
language sql
security definer
stable
as $$
  select case when public.is_admin() then json_build_object(
    'today', (select count(*) from public.active_visits where last_seen >= date_trunc('day', now())),
    'live', (select count(*) from public.active_visits where last_seen >= now() - interval '5 minutes'),
    'total', (select coalesce(sum(opens), 0) from public.active_visits)
  ) else '{}'::json end;
$$;

revoke all on function public.record_visit(text) from public;
revoke all on function public.visit_ping(text) from public;
revoke all on function public.admin_visits() from public, anon;

grant execute on function public.record_visit(text) to anon, authenticated;
grant execute on function public.visit_ping(text) to anon, authenticated;
grant execute on function public.admin_visits() to authenticated;