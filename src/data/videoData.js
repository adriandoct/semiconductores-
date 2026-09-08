// Educational Video Library for Semiconductor Characterization
// Curated videos for educational feedback (retroalimentación) on semiconductor theory, labs, and Tinkercad simulations.

export const VIDEO_CATEGORIES = [
  { id: 'all', name: 'Todos los Videos', icon: 'Film' },
  { id: 'week-1', name: 'Semana 1: Fundamentos & Multímetro', icon: 'Cpu' },
  { id: 'week-2', name: 'Semana 2: Curva I-V & Shockley', icon: 'TrendingUp' },
  { id: 'week-3', name: 'Semana 3: BJT hFE & MOSFET', icon: 'Zap' },
  { id: 'week-4', name: 'Semana 4: Normas ESD & Diagnóstico', icon: 'ShieldCheck' },
  { id: 'tinkercad', name: 'Simulaciones en Tinkercad', icon: 'Monitor' },
];

export const FEEDBACK_VIDEOS = [
  {
    id: 'vid-pn-junction',
    title: 'Física de Semiconductores y la Unión P-N Explicada',
    subtitle: 'Retroalimentación teórica sobre dopaje, zona de depleción y barrera de 0.7V',
    weekId: 1,
    topicId: 'atomica',
    category: 'week-1',
    duration: '10:45',
    youtubeId: 'JBtEckh3L9Q',
    thumbnailUrl: 'https://img.youtube.com/vi/JBtEckh3L9Q/hqdefault.jpg',
    description: 'Video explicativo animado que ilustra el comportamiento atómico del Silicio, el mecanismo de dopaje P-N con impurezas trivalentes y pentavalentes, y la formación del campo eléctrico interno en la zona de depleción.',
    keyTakeaways: [
      'Dopaje Tipo N: Impurezas pentavalentes (Fósforo) aportan electrones libres.',
      'Dopaje Tipo P: Impurezas trivalentes (Boro) generan huecos o lagunas.',
      'Zona de depleción: Se forma por recombinación y genera una barrera de ~0.7V en Silicio.',
      'Efecto de la temperatura: Aumenta la generación térmica de pares electrón-hueco.'
    ],
    recommendedFor: 'Alumnos que requieran reforzar la estructura cristalina y el concepto de portadores mayoritarios y minoritarios.'
  },
  {
    id: 'vid-diode-multimeter',
    title: 'Cómo Probar Diodos y Identificar Terminales con Multímetro Digital',
    subtitle: 'Práctica de laboratorio: Mediciones en polarización directa e inversa',
    weekId: 1,
    practiceId: 1,
    topicId: 'encapsulados',
    category: 'week-1',
    duration: '08:30',
    youtubeId: 'bLq8Fw1X6nI',
    thumbnailUrl: 'https://img.youtube.com/vi/bLq8Fw1X6nI/hqdefault.jpg',
    description: 'Demostración paso a paso del uso del multímetro digital en modo prueba de diodos. Muestra cómo identificar el Cátodo por la franja en el encapsulado DO-41 y cómo comprobar junturas Base-Emisor y Base-Colector en un BJT NPN.',
    keyTakeaways: [
      'Banda plateada en el diodo = Terminal CÁTODO (K).',
      'Polarización Directa: Lectura entre 0.550V y 0.720V en Silicio.',
      'Polarización Inversa: Lectura "OL" (Open Loop) que indica bloqueo de corriente.',
      'Identificación BJT: La junta Base-Emisor registra una caída de voltaje ligeramente mayor que la Base-Colector.'
    ],
    recommendedFor: 'Retroalimentar la Práctica 1 del Viernes sobre comprobación rápida de diodos y transistores.'
  },
  {
    id: 'vid-diode-iv-curve',
    title: 'Trazado Experimental de la Curva Característica I-V del Diodo',
    subtitle: 'Extracción de parámetros técnicos y cálculo de resistencia dinámica (rd)',
    weekId: 2,
    practiceId: 2,
    topicId: 'curva_iv',
    category: 'week-2',
    duration: '12:15',
    youtubeId: '33vbFFFn0Ys',
    thumbnailUrl: 'https://img.youtube.com/vi/33vbFFFn0Ys/hqdefault.jpg',
    description: 'Explicación matemática y práctica sobre el trazado de la curva I-V. Demuestra cómo varía la resistencia dinámica rd en la rodilla de conducción (Vknee = 0.7V) y la verificación del diodo Zener en modo de regulación inversa.',
    keyTakeaways: [
      'Resistencia dinámica: rd = ΔVd / ΔId (disminuye dramáticamente al aumentar la corriente).',
      'Voltaje de codo (Vknee): Umbral donde la corriente crece de forma exponencial.',
      'Ecuación de Shockley: Id = Is * (e^(Vd / n*Vt) - 1).',
      'Regulación Zener: Mantiene voltaje constante VZ en polarización inversa superado el codo Zener.'
    ],
    recommendedFor: 'Estudiantes realizando la caracterización I-V de la Semana 2.'
  },
  {
    id: 'vid-bjt-hfe',
    title: 'Caracterización de Transistores BJT NPN y Medición de Ganancia (hFE)',
    subtitle: 'Análisis de regiones de operación: Corte, Saturación y Región Activa',
    weekId: 3,
    practiceId: 3,
    topicId: 'bjt_ganancia',
    category: 'week-3',
    duration: '14:50',
    youtubeId: '7ukDKVHpf4U',
    thumbnailUrl: 'https://img.youtube.com/vi/7ukDKVHpf4U/hqdefault.jpg',
    description: 'Videotutorial enfocado en la medición del factor de amplificación β (hFE = Ic / Ib) mediante circuitos de prueba en protoboard y multímetro. Muestra las condiciones exactas para entrar en saturación VCE(sat) < 0.2V.',
    keyTakeaways: [
      'Ganancia hFE (β): Relación entre la corriente de Colector e Ib en región activa.',
      'Región de Corte: Ib = 0, no circula corriente Ic (interruptor abierto).',
      'Región de Saturación: VCE se reduce al mínimo (~0.2V), máxima corriente Ic.',
      'Prueba de ganancia en multímetro: Inserción directa en la ranura hFE.'
    ],
    recommendedFor: 'Refuerzo conceptual para la Práctica 3 sobre BJT de pequeña señal.'
  },
  {
    id: 'vid-mosfet-switch',
    title: 'Funcionamiento del MOSFET Tipo Enriquecimiento y Conmutación',
    subtitle: 'Control por voltaje de Gate, umbral VGS(th) y resistencia RDS(on)',
    weekId: 3,
    topicId: 'mosfet_conmutacion',
    category: 'week-3',
    duration: '11:20',
    youtubeId: 'stM154L4I-g',
    thumbnailUrl: 'https://img.youtube.com/vi/stM154L4I-g/hqdefault.jpg',
    description: 'Análisis gráfico del comportamiento de un MOSFET de canal N (ejemplo IRF540). Muestra cómo el campo eléctrico en la compuerta aislada de SiO2 crea el canal conductor sin consumir corriente continua de entrada.',
    keyTakeaways: [
      'Control por Voltaje: Ig ≈ 0 A en estado estacionario debido al aislamiento de óxido.',
      'Voltaje de Umbral VGS(th): Voltaje mínimo para iniciar la inducción del canal N.',
      'Resistencia RDS(on): Resistencia interna de drenador a surtidor en conducción completa.',
      'Precaución: El aislante de compuerta es altamente susceptible a descargas ESD.'
    ],
    recommendedFor: 'Estudiantes analizando transistores unipolares MOSFET.'
  },
  {
    id: 'vid-esd-safety',
    title: 'Protección contra Descargas Electrostáticas (ESD) en Semiconductores',
    subtitle: 'Normativa de seguridad en laboratorio y protocolos de manipulación',
    weekId: 4,
    practiceId: 4,
    topicId: 'normas_esd',
    category: 'week-4',
    duration: '09:10',
    youtubeId: 'R4aE2Z28qsc',
    thumbnailUrl: 'https://img.youtube.com/vi/R4aE2Z28qsc/hqdefault.jpg',
    description: 'Demostración de los daños microscópicos invisibles que provocan las cargas triboeléctricas humanas en las junturas del semiconductor. Guía práctica sobre el uso de la pulsera antiestática con resistencia de 1 MΩ.',
    keyTakeaways: [
      'Carga humana ESD: Puede superar 3,000 V sin ser sentida por el usuario.',
      'Daño latente: Ruptura dieléctrica en la delgada capa de dióxido de silicio.',
      'Pulsera Antiestática: Debe incluir resistencia de seguridad de 1 MΩ en serie a tierra.',
      'Bolsas antiestáticas: Utilizar bolsas de blindaje (Shielding Bags) para almacenamiento.'
    ],
    recommendedFor: 'Complemento de la Práctica 4 sobre control de calidad y normas ESD.'
  },
  {
    id: 'vid-tinkercad-tutorial',
    title: 'Tutorial Didáctico Tinkercad Circuits para Semiconductores',
    subtitle: 'Solucionario virtual: Uso de multímetro, fuente regulada y protoboard',
    weekId: 1,
    category: 'tinkercad',
    duration: '13:00',
    youtubeId: '1aA7QY7659k',
    thumbnailUrl: 'https://img.youtube.com/vi/1aA7QY7659k/hqdefault.jpg',
    description: 'Guía práctica para configurar la plataforma Tinkercad Circuits. Enseña a interconectar componentes semiconductores, medir con instrumentos digitales virtuales y verificar el solucionario del docente.',
    keyTakeaways: [
      'Inserción de componentes en el protoboard virtual.',
      'Conexión de multímetros en modo Voltaje, Corriente o Diodo.',
      'Ajuste de fuentes de alimentación de voltaje variable.',
      'Simulación e interpretación de resultados gráficos.'
    ],
    recommendedFor: 'Estudiantes que realicen sus reportes y prácticas en Tinkercad Circuits.'
  }
];
