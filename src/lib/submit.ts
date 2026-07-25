/**
 * Single seam between the 4 lead-gen forms and their storage backend.
 *
 * No Supabase project is wired up yet - each `insert*` call below validates
 * and logs. Once a project exists, replace the body of each function with a
 * `supabase.from('<table>').insert(...)` call (see supabase/schema.sql for the
 * target tables) - the API endpoints in src/pages/api/ never need to change.
 */

export class SubmitValidationError extends Error {}

function required(value: FormDataEntryValue | null, field: string): string {
  const str = typeof value === 'string' ? value.trim() : '';
  if (!str) throw new SubmitValidationError(`El campo "${field}" es obligatorio.`);
  return str;
}

function optional(value: FormDataEntryValue | null): string {
  return typeof value === 'string' ? value.trim() : '';
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export interface BetaSignup {
  email: string;
}

export async function insertBetaSignup(form: FormData): Promise<BetaSignup> {
  const email = required(form.get('email'), 'Email');
  if (!isEmail(email)) throw new SubmitValidationError('El email no es válido.');
  const row: BetaSignup = { email };
  // TODO(supabase): await supabase.from('beta_signups').insert(row);
  console.log('[beta_signups]', row);
  return row;
}

export interface AmbassadorApplication {
  nombre: string;
  apellido: string;
  pais: string;
  ciudad: string;
  mail: string;
  whatsapp: string;
  linkedin: string;
  experiencia: string;
  razon: string;
}

export async function insertAmbassadorApplication(form: FormData): Promise<AmbassadorApplication> {
  const mail = required(form.get('mail'), 'Mail');
  if (!isEmail(mail)) throw new SubmitValidationError('El mail no es válido.');
  const row: AmbassadorApplication = {
    nombre: required(form.get('nombre'), 'Nombre'),
    apellido: required(form.get('apellido'), 'Apellido'),
    pais: required(form.get('pais'), 'País'),
    ciudad: optional(form.get('ciudad')),
    mail,
    whatsapp: optional(form.get('whatsapp')),
    linkedin: optional(form.get('linkedin')),
    experiencia: optional(form.get('experiencia')),
    razon: optional(form.get('razon')),
  };
  // TODO(supabase): await supabase.from('ambassador_applications').insert(row);
  console.log('[ambassador_applications]', row);
  return row;
}

export interface VolunteerApplication {
  nombre: string;
  apellido: string;
  pais: string;
  ciudad: string;
  mail: string;
  whatsapp: string;
  linkedin: string;
  rol: string;
  experiencia: string;
}

export async function insertVolunteerApplication(form: FormData): Promise<VolunteerApplication> {
  const mail = required(form.get('mail'), 'Mail');
  if (!isEmail(mail)) throw new SubmitValidationError('El mail no es válido.');
  const row: VolunteerApplication = {
    nombre: required(form.get('nombre'), 'Nombre'),
    apellido: required(form.get('apellido'), 'Apellido'),
    pais: required(form.get('pais'), 'País'),
    ciudad: optional(form.get('ciudad')),
    mail,
    whatsapp: optional(form.get('whatsapp')),
    linkedin: optional(form.get('linkedin')),
    rol: optional(form.get('rol')),
    experiencia: optional(form.get('experiencia')),
  };
  // TODO(supabase): await supabase.from('volunteer_applications').insert(row);
  console.log('[volunteer_applications]', row);
  return row;
}

export interface ContactMessage {
  nombre: string;
  apellido: string;
  email: string;
  mensaje: string;
}

export async function insertContactMessage(form: FormData): Promise<ContactMessage> {
  const email = required(form.get('email'), 'Email');
  if (!isEmail(email)) throw new SubmitValidationError('El email no es válido.');
  const row: ContactMessage = {
    nombre: required(form.get('nombre'), 'Nombre'),
    apellido: required(form.get('apellido'), 'Apellido'),
    email,
    mensaje: required(form.get('mensaje'), 'Mensaje'),
  };
  // TODO(supabase): await supabase.from('contact_messages').insert(row);
  console.log('[contact_messages]', row);
  return row;
}
