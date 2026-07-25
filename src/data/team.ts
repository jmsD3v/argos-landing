export interface TeamMember {
  name: string;
  role: string;
  initials: string;
  paletteIndex: number;
  /** Filename in public/ - real headshot, uploaded 2026-07-25. Falls back to
   * the gradient-initials tile (avatarClass) if a name is ever added here
   * without a matching photo yet. */
  photo?: string;
}

const RAW_TEAM: [string, string, string?][] = [
  ['Nahuel Marchettich', 'Dev & Tool Tester', 'nm.webp'],
  ['David Rivas', 'WordPress Dev', 'dr.webp'],
  ['Lucia Razongles', 'Tool Tester', 'lr.webp'],
  ['Tomas Brusa', 'Tool Tester', 'tb.webp'],
  ['Gustavo Coluccio', 'Dev & Tool Tester', 'gc.webp'],
  ['Nadia Cuadra Aragón', 'Comunidades', 'nca.webp'],
  ['Federico Capano', 'Tool Tester', 'fc.webp'],
  ['Agustín Perez Pesce', 'Tool Tester', 'app.webp'],
  ['Lucia Fuhr', 'Comunidades', 'lf.webp'],
  ['Nadia Gomez', 'Tool Tester', 'ng.webp'],
  ['Facundo Benitez', 'Tool Tester', 'fb.webp'],
  ['Gustavo Minchiotti', 'UX/UI & WordPress Dev', 'gm.webp'],
  ["Ramiro Dell'Orto", 'Tool Tester', 'rdo.webp'],
  ['Laureano Rueda', 'Dev', 'lru.webp'],
  ['Adrian Gervatovski', 'Tool Tester', 'ag.webp'],
  ['Macarena Tallarico', 'Comunidades', 'mt.webp'],
  ['Andres Isola', 'Tool Tester', 'ai.webp'],
  ['Alejandro Tumilasci', 'Tool Tester', 'at.webp'],
  ['Juan Pablo Vargas', 'UX/UI', 'jpv.webp'],
  ['Ariel Anonis', 'Dev & Mobile Dev', 'aa.webp'],
  ['Luis Garcia', 'Tool Tester', 'lg.webp'],
  ['Guillermo Figueredo', 'Tool Tester', 'gf.webp'],
  ['Juan Manuel Silva', 'Dev', 'jms.webp'],
];

export const team: TeamMember[] = RAW_TEAM.map(([name, role, photo], i) => ({
  name,
  role,
  photo,
  initials: name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase(),
  paletteIndex: i % 6,
}));

/** 6-color rotating gradient palette so no two adjacent avatar cards match.
 * Rendered via the `.avatar-0`..`.avatar-5` classes in tokens.css (a real CSS
 * class rather than an inline `style` attribute, so it isn't affected by a
 * `style-src` CSP that omits 'unsafe-inline'). */
export function avatarClass(paletteIndex: number): string {
  return `avatar-${paletteIndex}`;
}

export interface OpenRole {
  title: string;
  copy: string;
}

export const openRoles: OpenRole[] = [
  { title: 'Tool Tester', copy: 'Buscamos personas con capacidades técnicas para testear las herramientas que incorporamos en nuestro sistema operativo, en el marco de la metodología OSINT.' },
  { title: 'UI/UX Designer', copy: 'Buscamos personas con sensibilidad por el diseño para crear experiencias simples, intuitivas y funcionales, tanto para el sitio web como para el sistema operativo.' },
  { title: 'Dev', copy: 'Buscamos personas que sepan cómo trabajar en entornos Linux (especialmente Debian) para sumarse al desarrollo de herramientas de nuestra distro.' },
  { title: 'WordPress Dev', copy: 'Buscamos personas con experiencia en WordPress que quieran sumar su talento al desarrollo voluntario de nuestro sitio web.' },
];

export const applicationRoles = [
  { value: 'tool-tester', label: 'Tool Tester' },
  { value: 'ux-ui', label: 'UX/UI Designer' },
  { value: 'dev', label: 'Dev' },
  { value: 'wordpress', label: 'WordPress Dev' },
  { value: 'comunidad', label: 'Comunidad y redes sociales' },
];
