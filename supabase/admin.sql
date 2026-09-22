-- ============================================================================
-- Speakout — لوحة الأدمن (Supabase) — نسخة آمنة (ترقية كاملة)
-- شغّل ده مرة واحدة في Supabase Dashboard ← SQL Editor على مشروع b1 بتاعك.
--
-- ليه التغيير؟ الصلاحية بتتبني دلوقتي على الـ user id الثابت («auth.uid()»)
-- مش على اسم المستخدم، لأن اسم المستخدم الطالب نفسه ممكن يتزور بيه.
-- السكربت بيشيل الجدول القديمة (اللي كانت بـ username) ويعمل اللي بـ user_id.
-- ============================================================================

-- 1) ناخد أسماء الأدمن اللي كانوا موجودين (لو في جدول قديم) قبل ما نموت الجدول
do $$
begin
  if to_regclass('public.admins') is not null
     and exists (
       select 1 from information_schema.columns
       where table_schema = 'public' and table_name = 'admins' and column_name = 'username'
     )
     and not exists (
       select 1 from information_schema.columns
       where table_schema = 'public' and table_name = 'admins' and column_name = 'user_id'
     )
  then
    create temp table _legacy_admins as select username from public.admins;
  else
    create temp table _legacy_admins as select null::text as username where false;
  end if;
end $$;

-- 2) نشيل الفانكشنز القديمة (مش كلها موجودة)، وبعدين الجدول القديم وكل اللي مرتكز عليها
drop function if exists public.admin_status();
drop function if exists public.admin_data();
drop function if exists public.admin_delete_user(text);
drop function if exists public.grant_admin(text);
drop function if exists public.revoke_admin(text);
drop table if exists public.admins cascade;

-- 3) الجدول الجديد: مفتاحه الـ user id الثابت من Supabase (auth.uid())
create table public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  username text,
  granted_at timestamptz not null default now()
);

alter table public.admins enable row level security;

-- ما فيش أي policy على الجدول: التعديل عليه بيبقى عن طريق SQL/Dashboard بس.
-- (RLS بيخلّي الجدول مش مقروء من أي حد، وفانكشنز الأمان هي اللي بتتعامل معاه)

-- 4) نرجع الأدمن اللي كانوا موجودين وينطبقوا على الحسابات الحقيقية بـ user_id
insert into public.admins (user_id, username)
select
  u.id,
  u.raw_user_meta_data ->> 'username'
from auth.users u
where lower(u.raw_user_meta_data ->> 'username') in (
  select lower(username) from _legacy_admins
  where username is not null
)
   or lower(u.raw_user_meta_data ->> 'username') in ('admin', 'ادمن');

drop table _legacy_admins;

-- ============================================================================
-- التحقق الأساسي: هل المستخدم الحالي أدمن؟ (مش معتمد على الاسم إطلاقًا)
-- ============================================================================
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from public.admins where user_id = auth.uid()
  );
$$;

create or replace function public.admin_status()
returns boolean
language sql
security definer
stable
as $$
  select public.is_admin();
$$;

-- ============================================================================
-- منح/سحب الأدمن (صاحب المشروع بيشغّلها لو حابب يضيف أدمن تاني)
-- p_username: اللي كتبه في VITE_ADMIN_USERNAME غالبًا
-- ============================================================================
create or replace function public.grant_admin(p_username text)
returns void
language plpgsql
security definer
as $$
begin
  if p_username is null or trim(p_username) = '' then
    return;
  end if;
  insert into public.admins (user_id, username)
  select id, raw_user_meta_data ->> 'username'
  from auth.users
  where raw_user_meta_data ->> 'username' = trim(p_username)
    and id not in (select user_id from public.admins)
  on conflict (user_id) do nothing;
end;
$$;

create or replace function public.revoke_admin(p_username text)
returns void
language plpgsql
security definer
as $$
declare
  v_uid uuid;
begin
  if not public.is_admin() then
    raise exception 'not an admin';
  end if;
  select id into v_uid
  from auth.users
  where raw_user_meta_data ->> 'username' = trim(p_username);
  if v_uid is null then
    return;
  end if;
  delete from public.admins where user_id = v_uid;
end;
$$;

-- ============================================================================
-- بيانات الطلاب: مش بتترجّع غير للأدمن الحقيقي (فحص صلاحية جوه الفانكشن)
-- ============================================================================
create or replace function public.admin_data()
returns json
language sql
security definer
stable
as $$
  select case when public.is_admin() then
    coalesce(json_agg(row_to_json(t) order by t.created_at desc), '[]'::json)
  else
    '[]'::json
  end
  from (
    select
      u.id as user_id,
      u.raw_user_meta_data ->> 'username' as username,
      u.raw_user_meta_data ->> 'age' as age,
      u.created_at,
      (select jsonb_object_agg(key, value) from public.user_data d where d.user_id = u.id) as data
    from auth.users u
  ) t;
$$;

-- ============================================================================
-- مسح طالب: فحص صلاحية أولًا، ومحدش يقدر يمسح نفسه (عشان محدش يقفلون الأدمن)
-- ============================================================================
create or replace function public.admin_delete_user(p_username text)
returns void
language plpgsql
security definer
as $$
declare
  v_id uuid;
begin
  if not public.is_admin() then
    raise exception 'not an admin';
  end if;

  select id into v_id
  from auth.users
  where raw_user_meta_data ->> 'username' = p_username;

  if v_id is null then
    return;
  end if;

  if v_id = auth.uid() then
    raise exception 'cannot delete self';
  end if;

  delete from public.user_data where user_id = v_id;
  delete from auth.users where id = v_id;
end;
$$;

-- ============================================================================
-- الصلاحيات: مش متاحة غير للأدمن (فحص جوه الفانكشنز).
-- grant/revoke مش متاحة للـ authenticated إطلاقًا (صاحب المشروع بس من SQL).
-- ============================================================================
revoke all on function public.is_admin() from public, anon;
revoke all on function public.admin_status() from public, anon;
revoke all on function public.admin_data() from public, anon;
revoke all on function public.admin_delete_user(text) from public, anon;

grant execute on function public.is_admin() to authenticated;
grant execute on function public.admin_status() to authenticated;
grant execute on function public.admin_data() to authenticated;
grant execute on function public.admin_delete_user(text) to authenticated;