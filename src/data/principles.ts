export interface Principle {
  title: string;
  copy: string;
  icon: 'briefcase' | 'check' | 'user' | 'history' | 'shield' | 'flag';
}

export const principles: Principle[] = [
  {
    title: 'Objetividad',
    copy: 'Nuestra plataforma es neutral. argOS entrega información sin alteraciones, interpretaciones ni manipulaciones de ningún tipo.',
    icon: 'briefcase',
  },
  {
    title: 'Innovación',
    copy: 'Creemos en mejorar permanentemente nuestros procesos automatizados, aumentando precisión, velocidad de respuesta y utilidad real.',
    icon: 'check',
  },
  {
    title: 'Acompañamiento experto',
    copy: 'Asesoría permanente, formación estratégica y soporte humano especializado para maximizar la adopción del producto.',
    icon: 'user',
  },
  {
    title: 'Conciencia y compromiso social',
    copy: 'Actuamos bajo estrictos principios éticos que respetan la privacidad individual, la democracia y los derechos fundamentales.',
    icon: 'history',
  },
  {
    title: 'Robustez',
    copy: 'Construimos sobre tecnologías sólidas y confiables, con alto desempeño y resistencia frente a tareas exigentes.',
    icon: 'shield',
  },
  {
    title: 'Verificación continua',
    copy: 'Todas nuestras fuentes, métodos y datos pasan por controles internos y procesos estrictos de validación.',
    icon: 'flag',
  },
];
