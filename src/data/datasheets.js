// Datasheets and Component Specifications Reference Data

export const DATASHEETS_DATA = [
  {
    id: "1N4007",
    name: "1N4007",
    type: "Diodo Rectificador de Silicio",
    package: "DO-41",
    pinoutImg: "DO-41",
    pins: [
      { name: "Ánodo (A)", desc: "Terminal positiva (+). Lado sin banda." },
      { name: "Cátodo (K)", desc: "Terminal negativa (-). Marcado con la franja plateada/blanca." }
    ],
    specs: {
      VRRM: "1000 V (Tensión Inversa Repetitiva Máxima)",
      IF_AV: "1.0 A (Corriente Directa Promedio)",
      VF: "1.1 V máx. a 1.0 A (Típica: 0.68 V a 10 mA)",
      IR: "5.0 µA a 25°C (Corriente de Fuga Inversa)",
      P_max: "3.0 W",
      operatingTemp: "-65°C a +175°C"
    },
    description: "Diodo rectificador de uso general de alta tensión, ideal para fuentes de alimentación, rectificación de 60Hz y protección contra polaridad inversa."
  },
  {
    id: "1N4148",
    name: "1N4148",
    type: "Diodo de Conmutación Rápida (Small Signal)",
    package: "DO-35 (Vidrio)",
    pinoutImg: "DO-35",
    pins: [
      { name: "Ánodo (A)", desc: "Terminal positiva (+)." },
      { name: "Cátodo (K)", desc: "Terminal negativa (-). Marcado con franja negra en el cuerpo de vidrio." }
    ],
    specs: {
      VRRM: "100 V (Tensión Inversa Repetitiva)",
      IF_AV: "300 mA (Corriente Directa Máxima)",
      VF: "1.0 V a 10 mA (Típica: 0.65 V a 1 mA)",
      trr: "4.0 ns (Tiempo de Recuperación Inverso ultra rápido)",
      P_max: "500 mW",
      operatingTemp: "-65°C a +200°C"
    },
    description: "Diodo de alta velocidad en encapsulado de vidrio, óptimo para procesamiento de señales lógicas de alta frecuencia, mezcladores y protección de retransmisión."
  },
  {
    id: "2N2222",
    name: "2N2222A",
    type: "Transistor NPN de Pequeña Señal y Conmutación",
    package: "TO-92 (Plástico)",
    pinoutImg: "TO-92",
    pins: [
      { name: "Pin 1: Emisor (E)", desc: "Terminal de salida de portadores. Lado izquierdo visto de frente." },
      { name: "Pin 2: Base (B)", desc: "Terminal de control central." },
      { name: "Pin 3: Colector (C)", desc: "Terminal de entrada principal. Lado derecho visto de frente." }
    ],
    specs: {
      VCEO: "40 V (Tensión Colector-Emisor Máxima)",
      IC_max: "800 mA (Corriente de Colector Máxima)",
      hFE: "100 - 300 (a IC = 10 mA, VCE = 10V)",
      VCE_sat: "0.3 V máx. a IC = 150 mA",
      fT: "300 MHz (Frecuencia de Transición)",
      P_tot: "625 mW a 25°C"
    },
    description: "Transistor bipolar NPN estándar de la industria. Utilizado en amplificación de audio de baja potencia, preamplificadores y conmutación de cargas de relés y LEDs."
  },
  {
    id: "BC548",
    name: "BC548B",
    type: "Transistor BJT NPN de Baja Potencia",
    package: "TO-92 (Plástico)",
    pinoutImg: "TO-92",
    pins: [
      { name: "Pin 1: Colector (C)", desc: "Terminal izquierda vista de frente (Lado plano)." },
      { name: "Pin 2: Base (B)", desc: "Terminal central." },
      { name: "Pin 3: Emisor (E)", desc: "Terminal derecha vista de frente." }
    ],
    specs: {
      VCEO: "30 V (Tensión Colector-Emisor)",
      IC_max: "100 mA (Corriente de Colector)",
      hFE: "200 - 450 (Rango de alta ganancia Clase B)",
      VCE_sat: "0.25 V a IC = 10 mA",
      fT: "300 MHz",
      P_tot: "500 mW"
    },
    description: "Transistor NPN europeo muy popular para etapas de preamplificación de bajo ruido y sensores de muy baja corriente."
  },
  {
    id: "IRF540",
    name: "IRF540N",
    type: "MOSFET Canal N de Potencia (Power MOSFET)",
    package: "TO-220AB",
    pinoutImg: "TO-220",
    pins: [
      { name: "Pin 1: Compuerta (Gate - G)", desc: "Terminal de control de alto aislamiento de entrada." },
      { name: "Pin 2: Drenador (Drain - D)", desc: "Terminal de paso principal. Conectada a la pestaña disipadora posterior." },
      { name: "Pin 3: Surtidor (Source - S)", desc: "Terminal de referencia a masa/tierra." }
    ],
    specs: {
      VDSS: "100 V (Tensión Drenador-Surtidor)",
      ID_max: "33 A (Corriente Continua de Drenador a 25°C)",
      RDS_on: "44 mΩ (Resistencia en Conducción ultra baja)",
      VGS_th: "2.0 V a 4.0 V (Tensión de Umbral)",
      P_D: "130 W (con disipador de calor adecuado)",
      VGS_max: "±20 V (¡Atención ESD!)"
    },
    description: "MOSFET de potencia canal N de tercera generación. Utilizado en fuentes conmutadas (SMPS), control PWM de motores DC, inversores de potencia y robótica."
  }
];
