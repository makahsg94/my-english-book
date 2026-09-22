-- ============================================================================
-- رسائل الأدمن → الطالب (داخل التطبيق)
-- الجدول + الدوال: يعرض الأدمن يبعت رسالة لطالب معين، والطالب يقرا رسايله
-- الجديدة أول ما يفتح الموقع (بتظهر كـ toast مرة واحدة).
-- شغّل الملف ده في Supabase Dashboard ← SQL Editor بعد schema.sql و admin.sql
-- ============================================================================

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now(),
  read_at timestamptz
);

alter table public.messages enable row level security;

-- الطالب بيقرا رسايله بس
create policy "students read own messages"
  on public.messages for select
  using (auth.uid() = user_id);

-- الأدمن هو اللي بيكتب (security definer: بيرفع قيود الـ RLS)

-- عداد/قائمة رسائل لكل الطلاب — هدف للأدمن بس
create or replace function public.admin_messages()
returns table (id uuid, user_id uuid, username text, body text, created_at timestamptz)
language sql
security definer
stable
as $$
  select m.id, m.user_id, u.raw_user_meta_data ->> 'username' as username,
         m.body, m.created_at
  from public.messages m
  left join auth.users u on u.id = m.user_id
  where public.is_admin()
  order by m.created_at desc
  limit 200;
$$;

-- الأدمن يبعت رسالة لطالب معين بالاسم
create or replace function public.admin_send_message(p_username text, p_body text)
returns boolean
language plpgsql
security definer
as $$
declare
  v_uid uuid;
begin
  if not public.is_admin() then
    return false;
  end if;
  if p_body is null or btrim(p_body) = '' then
    return false;
  end if;
  select id into v_uid
  from auth.users
  where raw_user_meta_data ->> 'username' = btrim(p_username)
  limit 1;
  if v_uid is null then
    return false;
  end if;
  insert into public.messages (user_id, body) values (v_uid, p_body);
  return true;
end;
$$;

-- رسايل الطالب الجديدة (اللي لسه متقرياش) — الطالب بس بيقدر يستدعيها
create or replace function public.my_inbox()
returns table (id uuid, body text, created_at timestamptz)
language plpgsql
security definer
as $$
begin
  if auth.uid() is null then
    return;
  end if;
  return query
    select m.id, m.body, m.created_at
    from public.messages m
    where m.user_id = auth.uid() and m.read_at is null
    order by m.created_at desc;
end;
$$;

-- الرسايل اللي اتقرت بتتعلّم (لما الطالب يشوفها)
create or replace function public.mark_messages_read()
returns void
language plpgsql
security definer
as $$
begin
  update public.messages
  set read_at = now()
  where user_id = auth.uid() and read_at is null;
end;
$$;

grant execute on function public.admin_messages() to authenticated;
grant execute on function public.admin_send_message(text, text) to authenticated;
grant execute on function public.my_inbox() to authenticated;
grant execute on function public.mark_messages_read() to authenticated;