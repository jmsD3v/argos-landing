export interface Tool {
  name: string;
  copy: string;
}

export const tools: Tool[] = [
  { name: 'Dataing', copy: 'Plataforma de recolección masiva de información pública asociada a CUIL o DNI, automatizando la consulta de múltiples fuentes abiertas y otras bases públicas para investigaciones de ciberinteligencia y OSINT.' },
  { name: 'Imargos', copy: 'Herramienta de análisis de imágenes orientada a la geolocalización. Extrae y procesa metadatos EXIF y utiliza reconocimiento visual para identificar lugares y patrones.' },
  { name: 'Shodargos', copy: 'Módulo de consulta automatizada a la API de Shodan. Permite búsquedas avanzadas de infraestructura expuesta en internet con filtros específicos por país o tipo de dispositivo.' },
  { name: 'Argram', copy: 'Motor de búsqueda enfocado en usuarios de Telegram. A través de técnicas OSINT y pivoting avanzado, correlaciona nombres de usuario, IDs y alias con información externa.' },
  { name: 'Wallargos', copy: 'Analizador de wallets y transacciones en blockchain. Permite inspeccionar direcciones de criptomonedas públicas, visualizar flujo de fondos y balance histórico. Compatible con Bitcoin, Ethereum y tokens ERC-20.' },
  { name: 'DArgos', copy: 'Entorno controlado para búsquedas en deepweb y darkweb. Utiliza proxies TOR preconfigurados y motores de indexación ocultos para explorar servicios .onion con medidas de anonimato básico y opciones de logging.' },
];

/** Mock CLI commands the Home hero terminal types out on a loop - one per tool, in tools order. */
export const terminalCommands = [
  'dataing --cuil 20-30xxxxxx-1',
  'imargos --geolocate evidencia.jpg',
  'shodargos --query "port:22 country:AR"',
  'wallargos --track 0x9f2...4b1',
];
