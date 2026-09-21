-- ============================================================================
-- Speakout B1 — لوحة الأدمن (Supabase)
-- شغّل ده مرة واحدة في Supabase Dashboard ← SQL Editor على مشروع b1 بتاعك.
-- الادمن المفعّل هنا اسمه 'admin' — تأكد إن VITE_ADMIN_USERNAME في ملف .env
-- == admin (مكتوب كده بالفعل).
-- ============================================================================

create table if not exists public.admins (
  username text primary key
);

-- اضرب اسم الأدمن (لو الاسم اتغير، عدل القيمة دي أو شغّل insert جديد)
insert into public.admins (username)
values ('admin')
on conflict (username) do nothing;

alter table public.admins enable row level security;

create or replace function public.admin_status()
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1
    from public.admins
    where username = auth.jwt() -> 'user_metadata' ->> 'username'
  );
$$;

create or replace function public.admin_data()
returns json
language sql
security definer
stable
as $$
  select coalesce(json_agg(row_to_json(t) order by t.created_at desc), '[]'::json)
  from (
    select
      u.id as user_id,
      u.raw_user_meta_data ->> 'username' as username,
      u.created_at,
      (select jsonb_object_agg(key, value) from public.user_data d where d.user_id = u.id) as data
    from auth.users u
  ) t;
$$;

create or replace function public.admin_delete_user(p_username text)
returns void
language plpgsql
security definer
as $$
declare
  v_id uuid;
begin
  if not exists (
    select 1 from public.admins
    where username = auth.jwt() -> 'user_metadata' ->> 'username'
  ) then
    raise exception 'not an admin';
  end if;

  select id into v_id
  from auth.users
  where raw_user_meta_data ->> 'username' = p_username;

  if v_id is null then
    return;
  end if;

  delete from public.user_data where user_id = v_id;
  delete from auth.users where id = v_id;
end;
$$;

revoke all on function public.admin_status() from public, anon;
revoke all on function public.admin_data() from public, anon;
revoke all on function public.admin_delete_user(text) from public, anon;

grant execute on function public.admin_status() to authenticated;
grant execute on function public.admin_data() to authenticated;
grant execute on function public.admin_delete_user(text) to authenticated;
