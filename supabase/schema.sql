-- argOS landing - lead-gen tables.
-- Apply against a Supabase project when credentials are available, then swap
-- the TODO(supabase) inserts in src/lib/submit.ts for real `.insert()` calls.

create table if not exists beta_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  created_at timestamptz not null default now()
);

create table if not exists ambassador_applications (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  apellido text not null,
  pais text not null,
  ciudad text,
  mail text not null,
  whatsapp text,
  linkedin text,
  experiencia text,
  razon text,
  created_at timestamptz not null default now()
);

create table if not exists volunteer_applications (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  apellido text not null,
  pais text not null,
  ciudad text,
  mail text not null,
  whatsapp text,
  linkedin text,
  rol text,
  experiencia text,
  created_at timestamptz not null default now()
);

create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  apellido text not null,
  email text not null,
  mensaje text not null,
  created_at timestamptz not null default now()
);

-- Row Level Security: these tables are write-only from the public client (the
-- Astro API routes use the service role from the server, so no public INSERT
-- policy is required there) - enable RLS and leave no public policies so the
-- tables reject anonymous reads/writes by default.
alter table beta_signups enable row level security;
alter table ambassador_applications enable row level security;
alter table volunteer_applications enable row level security;
alter table contact_messages enable row level security;
