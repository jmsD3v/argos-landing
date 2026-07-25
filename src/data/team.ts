export interface TeamMember {
  name: string;
  role: string;
  initials: string;
  paletteIndex: number;
}

const RAW_TEAM: [string, string][] = [
  ['Nahuel Marchettich', 'Dev & Tool Tester'],
  ['David Rivas', 'WordPress Dev'],
  ['Lucia Razongles', 'Tool Tester'],
  ['Tomas Brusa', 'Tool Tester'],
  ['Gustavo Coluccio', 'Dev & Tool Tester'],
  ['Nadia Cuadra Aragón', 'Comunidades'],
  ['Federico Capano', 'Tool Tester'],
  ['Agustín Perez Pesce', 'Tool Tester'],
  ['Lucia Fuhr', 'Comunidades'],
  ['Nadia Gomez', 'Tool Tester'],
  ['Facundo Benitez', 'Tool Tester'],
  ['Gustavo Minchiotti', 'UX/UI & WordPress Dev'],
  ["Ramiro Dell'Orto", 'Tool Tester'],
  ['Laureano Rueda', 'Dev'],
  ['Adrian Gervatovski', 'Tool Tester'],
  ['Macarena Tallarico', 'Comunidades'],
  ['Andres Isola', 'Tool Tester'],
  ['Alejandro Tumilasci', 'Tool Tester'],
  ['Juan Pablo Vargas', 'UX/UI'],
  ['Ariel Anonis', 'Dev & Mobile Dev'],
  ['Luis Garcia', 'Tool Tester'],
  ['Guillermo Figueredo', 'Tool Tester'],
  ['Juan Manuel Silva', 'Dev'],
];

export const team: TeamMember[] = RAW_TEAM.map(([name, role], i) => ({
  name,
  role,
  initials: name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase(),
  paletteIndex: i % 6,
}));

/** 6-color rotating gradient palette so no two adjacent avatar cards match. */
export const avatarPalette = [
  { bg: 'linear-gradient(135deg, var(--color-accent-300), var(--color-accent-600))', fg: 'var(--color-bg)' },
  { bg: 'linear-gradient(135deg, var(--color-neutral-700), var(--color-neutral-900))', fg: 'var(--color-bg)' },
  { bg: 'linear-gradient(135deg, var(--color-accent-100), var(--color-accent-400))', fg: 'var(--color-accent-900)' },
  { bg: 'linear-gradient(135deg, var(--color-accent-600), var(--color-accent-900))', fg: 'var(--color-bg)' },
  { bg: 'linear-gradient(135deg, var(--color-neutral-200), var(--color-neutral-400))', fg: 'var(--color-neutral-800)' },
  { bg: 'linear-gradient(135deg, var(--color-accent-400), var(--color-accent-800))', fg: 'var(--color-bg)' },
];

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
