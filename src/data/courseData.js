// Course Data for "Auxiliar en la Caracterización de Dispositivos Semiconductores"
// Full 40-hour curriculum, 4 weekly modules, labs, step-by-step procedures, solutions, Tinkercad guides, and quizzes.

export const COURSE_INFO = {
  title: "Auxiliar en la Caracterización de Dispositivos Semiconductores",
  subtitle: "Plataforma Didáctica con Soluciones Gráficas en Tinkercad y Simulación de Laboratorio",
  duration: "40 Horas (Teoría + Práctica)",
  author: "Laboratorio de Electrónica y Semiconductores",
  targetAudience: "Docentes y Estudiantes de Bachillerato Técnico y Licenciatura en Electrónica/Mecatrónica",
  objective: "Desarrollar competencias en la identificación, medición, extracción de parámetros técnicos y prueba funcional de dispositivos semiconductores (Diodos, BJT, MOSFET) bajo normas de seguridad ESD con respaldo gráfico en Tinkercad Circuits."
};

export const WEEKS_DATA = [
  {
    id: 1,
    title: "Semana 1: Fundamentos de Dispositivos Semiconductores",
    badge: "Módulo 1",
    subtitle: "Estructura atómica, polarización, encapsulados e identificación de terminales",
    hours: "10 Horas",
    overview: "En esta primera semana se sientan las bases teóricas sobre la física de semiconductores de silicio y germanio, la unión P-N, las técnicas de polarización directa e inversa, y los métodos prácticos para identificar las terminales de componentes reales en encapsulados estándar.",
    theorySections: [
      {
        id: "atomica",
        title: "1.1 Estructura del Silicio y la Unión P-N",
        content: `Los semiconductores como el Silicio (Si) y Germanio (Ge) son materiales de tetravalencia atómica que forman redes cristalinas por enlaces covalentes. Al dopar el material puro con impurezas pentavalentes (Fósforo, Arsénico) se obtienen materiales **Tipo N** (portadores mayoritarios: electrones libres). Al dopar con impurezas trivalentes (Boro, Galio) se obtiene material **Tipo P** (portadores mayoritarios: huecos o lagunas).
        
Al juntar un cristal Tipo P y uno Tipo N se genera la **Unión P-N**, creando una *zona de depleción o agotamiento* donde se equilibran los portadores y surge una barrera de potencial de aproximadamente **0.7V en Silicio** y **0.3V en Germanio**.`,
        keyPoints: [
          "Dopaje P: Exceso de huecos (+)",
          "Dopaje N: Exceso de electrones libres (-)",
          "Barrera de potencial: ~0.7V (Si) a 25°C",
          "Ancho de depleción: Varía inversamente con el voltaje aplicado"
        ]
      },
      {
        id: "polarizacion",
        title: "1.2 Polarización Directa e Inversa",
        content: `**Polarización Directa (Forward Bias):** Se conecta el polo positivo de la fuente al Ánodo (P) y el negativo al Cátodo (N). La barrera de potencial se reduce cuando $V > V_{knee}$, permitiendo el flujo masivo de corriente a través del dispositivo.
        
**Polarización Inversa (Reverse Bias):** Se invierte la polaridad. La zona de depleción se ensancha, impidiendo el flujo de corriente principal (únicamente circula una corriente de fuga minúscula $I_S \\sim nA$). Si el voltaje inverso supera el voltaje de ruptura ($V_{BR}$), ocurre la avalancha.`,
        keyPoints: [
          "Directa: Anodo (+), Cátodo (-). Conducción activa.",
          "Inversa: Anodo (-), Cátodo (+). Bloqueo y corriente de fuga $I_S$.",
          "Resistencia dinámica: Muy baja en directa, extremadamente alta en inversa."
        ]
      },
      {
        id: "encapsulados",
        title: "1.3 Encapsulados Estándar y Terminales",
        content: `Los componentes semiconductores se comercializan en diversos encapsulados según su capacidad de disipación térmica y aplicación:
- **DO-41 / DO-35**: Diodos de señal y rectificadores (la franja plateada/negra indica la terminal CÁTODO).
- **TO-92**: Transistores BJT de pequeña señal (2N2222, BC548). Vista frontal con lado plano: Terminales 1, 2, 3.
- **TO-220**: Transistores de potencia y MOSFETs (IRF540). Posee pestaña metálica para disipador de calor conectada a la terminal central (Drenador o Colector).`,
        keyPoints: [
          "Identificación en Diodos: Banda impresa = Cátodo (K).",
          "Identificación BJT en Multímetro: Prueba de diodo B-E (~0.7V) y B-C (~0.68V).",
          "Precaución: El encapsulado TO-220 conduce calor y voltaje en su pestaña posterior."
        ]
      }
    ],
    labPractice: {
      title: "Práctica 1 del Viernes: Identificación y Verificación de Semiconductores con Multímetro Digital",
      objective: "Comprobar la polaridad y el estado funcional de diodos (1N4007, 1N4148) y transistores (2N2222, BC548) utilizando la función de prueba de diodos del multímetro.",
      materials: [
        "1x Diodo Rectificador 1N4007",
        "1x Diodo de Señal 1N4148",
        "1x Transistor NPN 2N2222 o BC548",
        "1x Multímetro Digital con función de prueba de diodo (mV/V)",
        "1x Protoboard de laboratorio",
        "Juego de cables puente y caimanes"
      ],
      safetyNotes: [
        "Desconectar siempre la fuente de alimentación antes de medir en modo Ohmetro/Diodo.",
        "Utilizar pulsera antiestática (ESD) al manipular semiconductores de señal sensible.",
        "Verificar que las puntas del multímetro estén correctamente insertadas en V/Ω (+) y COM (-)."
      ],
      steps: [
        {
          stepNumber: 1,
          title: "Configuración del Multímetro",
          description: "Gire la perilla del multímetro digital al selector de prueba de diodo (símbolo de diodo ➔|—).",
          expectedResult: "La pantalla mostrará 'OL' o '1.' indicando circuito abierto sin contacto."
        },
        {
          stepNumber: 2,
          title: "Prueba de Polarización Directa del Diodo 1N4007",
          description: "Conecte la punta Roja (+) al Ánodo (lado sin banda) y la punta Negra (-) al Cátodo (lado con la banda plateada).",
          expectedResult: "Lectura típica de caída de voltaje directa: entre 0.550 V y 0.720 V (550 mV a 720 mV)."
        },
        {
          stepNumber: 3,
          title: "Prueba de Polarización Inversa del Diodo 1N4007",
          description: "Invierta las puntas: punta Roja (+) al Cátodo y punta Negra (-) al Ánodo.",
          expectedResult: "La pantalla debe marcar 'OL' (sin conducción). Si marca un valor bajo, el diodo está en cortocircuito."
        },
        {
          stepNumber: 4,
          title: "Identificación de Terminales Base-Emisor-Colector en BJT NPN",
          description: "Coloque la punta Roja en la patilla central del 2N2222 (Base) y pruebe con la Negra en las otras dos patillas.",
          expectedResult: "Lectura Base-Emisor (B-E) ≈ 0.690V | Lectura Base-Colector (B-C) ≈ 0.680V."
        }
      ],
      solutionGuide: {
        title: "Criterios de Diagnóstico de Fallas",
        items: [
          "**Diodo Abierto**: Marca 'OL' tanto en directa como en inversa.",
          "**Diodo en Cortocircuito**: Marca ~0.000V y pita en ambas direcciones.",
          "**Diodo Bueno (Silicio)**: Directa 0.5V-0.7V, Inversa 'OL'.",
          "**Diodo Bueno (LED Rojo)**: Directa 1.8V-2.2V, Inversa 'OL'."
        ]
      },
      tinkercadGuide: {
        title: "Solución Gráfica del Maestro en Tinkercad Circuits (Práctica 1)",
        tinkercadUrl: "https://www.tinkercad.com/circuits",
        breadboardSetup: "Insertar el Diodo 1N4007 en las filas 10 y 15 del Protoboard virtual de Tinkercad. Conectar el Multímetro virtual en modo Diodo.",
        wiringDetails: [
          "Punta ROJA del Multímetro virtual Tinkercad a la fila 10 (Ánodo 1N4007).",
          "Punta NEGRA del Multímetro virtual Tinkercad a la fila 15 (Cátodo 1N4007 con la franja blanca).",
          "Transistor 2N2222 insertado en las filas 20, 21 y 22. Punta ROJA a la patilla 2 (Base) y NEGRA a patilla 1 (Emisor)."
        ],
        expectedVirtualReadings: [
          { test: "1N4007 Directa (Tinkercad)", value: "0.68 V (680 mV)", status: "Conducción Activa" },
          { test: "1N4007 Inversa (Tinkercad)", value: "ERR / OL (Infinita)", status: "Bloqueo Correcto" },
          { test: "2N2222 Junta B-E (Tinkercad)", value: "0.71 V", status: "Unión NPN Sana" },
          { test: "2N2222 Junta B-C (Tinkercad)", value: "0.69 V", status: "Unión NPN Sana" }
        ]
      }
    },
    quiz: [
      {
        id: "q1_1",
        question: "¿Cuál es la caída de voltaje típica en polarización directa para un diodo rectificador de Silicio como el 1N4007 a temperatura ambiente?",
        options: [
          "0.1 V a 0.2 V",
          "0.6 V a 0.7 V",
          "1.8 V a 2.2 V",
          "5.0 V"
        ],
        correctIndex: 1,
        explanation: "Los diodos de silicio presentan una barrera de potencial de aproximadamente 0.7V en polarización directa debido al ancho de la zona de depleción."
      },
      {
        id: "q1_2",
        question: "En un diodo discreto con encapsulado DO-41, ¿cómo se identifica físicamente la terminal del Cátodo?",
        options: [
          "Por la pata más larga del componente",
          "Por una muesca circular en el centro",
          "Por la franja o banda de color impresa en un extremo del cuerpo",
          "Por el color azul del cuerpo"
        ],
        correctIndex: 2,
        explanation: "La norma estándar de marcaje especifica una franja (plateada, blanca o negra) cerca del extremo que corresponde al Cátodo."
      },
      {
        id: "q1_3",
        question: "¿Qué ocurre en la zona de depleción cuando un diodo se polariza en Inversa?",
        options: [
          "Se reduce a cero permitiendo conducción masiva",
          "Se ensancha, impidiendo el flujo de portadores mayoritarios",
          "Se calienta y destruye instantáneamente",
          "Comienza a emitir luz visible"
        ],
        correctIndex: 1,
        explanation: "Al aplicar un campo eléctrico inverso, los portadores mayoritarios son atraídos hacia los contactos externos, aumentando el ancho de la zona de depleción."
      },
      {
        id: "q1_4",
        question: "Al medir un transistor NPN con el multímetro en modo Diodo, ¿por qué la lectura Base-Emisor (B-E) es ligeramente mayor que Base-Colector (B-C)?",
        options: [
          "Porque el emisor está más fuertemente dopado que el colector",
          "Porque el colector es más pequeño que el emisor",
          "Porque la base está aislada con dióxido de silicio",
          "Por un defecto de fabricación común"
        ],
        correctIndex: 0,
        explanation: "El Emisor posee la mayor concentración de dopaje del transistor para inyectar portadores, lo que incrementa ligeramente la densidad de carga de la unión y su caída de voltaje B-E."
      },
      {
        id: "q1_5",
        question: "Si al probar un diodo en polarización directa e inversa la lectura del multímetro es 0.001 V en ambos sentidos, ¿cuál es el estado del componente?",
        options: [
          "El diodo está en estado óptimo",
          "El diodo está abierto (Open)",
          "El diodo está en cortocircuito (Short)",
          "Es un diodo Schottky de alta velocidad"
        ],
        correctIndex: 2,
        explanation: "Una lectura cercana a 0V con continuidad en ambos sentidos confirma que la unión semiconductora se ha destruido y cortocircuitado internamente."
      }
    ]
  },
  {
    id: 2,
    title: "Semana 2: Parámetros Técnicos y Caracterización I-V del Diodo",
    badge: "Módulo 2",
    subtitle: "Ecuación de Shockley, resistencia dinámica rd, trazado de curva I-V y hojas de datos",
    hours: "10 Horas",
    overview: "Esta semana aborda el análisis cuantitativo de las curvas de corriente contra voltaje (I-V) en diodos semiconductores. Se profundiza en la Ecuación de Shockley, el cálculo de resistencia estática y dinámica, y la extracción de parámetros desde hojas de datos del fabricante.",
    theorySections: [
      {
        id: "shockley",
        title: "2.1 La Ecuación Ideal del Diodo (Shockley)",
        content: `La relación matemática entre el voltaje aplicado $V_D$ y la corriente resultante $I_D$ está dada por:
        
$$I_D = I_S \\cdot \\left( e^{\\frac{V_D}{\\eta V_T}} - 1 \\right)$$
        
Donde:
- $I_S$: Corriente de saturación inversa (típicamente $10^{-12} A$ a $10^{-9} A$).
- $\\eta$: Factor de idealidad del diodo ($1 \\le \\eta \\le 2$, para silicio común $\\eta \\approx 1.1 - 1.5$).
- $V_T$: Voltaje térmico $V_T = \\frac{k \\cdot T}{q} \\approx 25.85 \\text{ mV}$ a $300\\text{ K}$ ($25^\\circ\\text{C}$).`,
        keyPoints: [
          "Sensibilidad térmica: $I_S$ se duplica por cada incremento de $10^\\circ\\text{C}$.",
          "Voltaje térmico $V_T \\approx 26\\text{ mV}$ a temperatura ambiente.",
          "Comportamiento exponencial en zona directa ($V_D > 0.5V$)."
        ]
      },
      {
        id: "resistencia_dinamica",
        title: "2.2 Resistencia Estática (RD) vs Resistencia Dinámica (rd)",
        content: `En la caracterización I-V distinguimos dos conceptos de resistencia:
        
1. **Resistencia Estática (DC):** $R_D = \\frac{V_D}{I_D}$. Es la pendiente del punto de operación DC.
2. **Resistencia Dinámica (AC):** $r_d = \\frac{dV_D}{dI_D} \\approx \\frac{\\eta V_T}{I_D}$. 
        
Para pequeñas señales en la zona de conducción directa, la resistencia dinámica resulta inversamente proporcional a la corriente continua de polarización $I_D$. A mayor corriente, menor es la resistencia AC del diodo.`,
        keyPoints: [
          "A $I_D = 1\\text{ mA}$, $r_d \\approx 26 \\Omega$.",
          "A $I_D = 10\\text{ mA}$, $r_d \\approx 2.6 \\Omega$.",
          "Crucial para el diseño de atenuadores, reguladores y limitadores."
        ]
      }
    ],
    labPractice: {
      title: "Práctica 2 del Viernes: Caracterización Experimental de la Curva I-V del Diodo 1N4007",
      objective: "Construir experimentalmente la gráfica Corriente vs Voltaje (ID vs VD) de un diodo 1N4007 registrando datos punto a punto y determinando la resistencia dinámica.",
      materials: [
        "1x Diodo Rectificador 1N4007",
        "1x Resistencia de limitación de 1 kΩ (1/4W, 5%)",
        "1x Fuente de Alimentación DC Variable (0 - 12V)",
        "2x Multímetros Digitales (Uno como voltímetro en paralelo y otro como miliamperímetro en serie)",
        "1x Protoboard y cables de conexión"
      ],
      safetyNotes: [
        "Verificar que la corriente en serie no supere la potencia nominal de la resistencia de 1 kΩ.",
        "Conectar el miliamperímetro en SERIE con el circuito. ¡Nunca en paralelo con la fuente!",
        "Incrementar el voltaje DC gradualmente de 0V a 10V observando el encendido del diodo."
      ],
      steps: [
        {
          stepNumber: 1,
          title: "Montaje del Circuito",
          description: "Conecte en serie: Fuente DC (+) ➔ Miliamperímetro (+) / (-) ➔ Resistencia 1 kΩ ➔ Ánodo Diodo ➔ Cátodo Diodo ➔ Fuente DC (-). Coloque el Voltímetro en paralelo directamente sobre el diodo.",
          expectedResult: "Circuito cerrado listo para tomar lecturas pareadas de VD (mV) e ID (mA)."
        },
        {
          stepNumber: 2,
          title: "Toma de Datos en la Zona Sub-Umbral (0V a 0.5V)",
          description: "Ajuste la fuente en 0.5V, 1.0V, 1.5V. Mida VD e ID.",
          expectedResult: "El voltaje en el diodo crecerá casi igual a la fuente, mientras que la corriente será prácticamente 0 mA."
        },
        {
          stepNumber: 3,
          title: "Toma de Datos en la Zona de Conducción (0.6V a 0.75V)",
          description: "Incremente la fuente a 3V, 5V, 8V, 10V, 12V. Registre VD e ID.",
          expectedResult: "A VS = 10V, VD ≈ 0.685V, e ID ≈ 9.315 mA."
        },
        {
          stepNumber: 4,
          title: "Cálculo de la Resistencia Dinámica rd",
          description: "Calcule ΔVD / ΔID entre los puntos de 2 mA y 8 mA.",
          expectedResult: "ΔVD ≈ 40 mV, ΔID = 6 mA ⟹ rd ≈ 6.67 Ω."
        }
      ],
      solutionGuide: {
        title: "Tabla de Mediciones Típicas de Referencia (Diodo 1N4007 a 25°C)",
        items: [
          "Fuente VS = 1.0V ⟹ VD = 0.450V, ID = 0.55 mA",
          "Fuente VS = 3.0V ⟹ VD = 0.620V, ID = 2.38 mA",
          "Fuente VS = 5.0V ⟹ VD = 0.660V, ID = 4.34 mA",
          "Fuente VS = 10.0V ⟹ VD = 0.695V, ID = 9.305 mA"
        ]
      },
      tinkercadGuide: {
        title: "Solución Gráfica del Maestro en Tinkercad Circuits (Práctica 2)",
        tinkercadUrl: "https://www.tinkercad.com/circuits",
        breadboardSetup: "Conectar Fuente DC Variable de Tinkercad en 0-12V. Resistencia 1kΩ en serie con el Diodo 1N4007. Intercalar Miliamperímetro virtual Tinkercad en serie y Voltímetro virtual en paralelo al diodo.",
        wiringDetails: [
          "Fuente DC (+) Tinkercad a la terminal positiva del Amperímetro virtual (Modo A).",
          "Terminal negativa del Amperímetro Tinkercad a una pata de R = 1kΩ (Fila 12).",
          "Otra pata de R = 1kΩ (Fila 16) al Ánodo del Diodo 1N4007.",
          "Cátodo 1N4007 a la linea de Tierra (-) de la Fuente DC de Tinkercad.",
          "Voltímetro virtual 2 (Modo V) conectado directamente en paralelo sobre Ánodo y Cátodo del diodo."
        ],
        expectedVirtualReadings: [
          { test: "Fuente DC en 1.0V (Tinkercad)", value: "VD = 0.45V, ID = 0.55mA", status: "Sub-umbral" },
          { test: "Fuente DC en 5.0V (Tinkercad)", value: "VD = 0.66V, ID = 4.34mA", status: "Conducción Exponencial" },
          { test: "Fuente DC en 10.0V (Tinkercad)", value: "VD = 0.70V, ID = 9.30mA", status: "Conducción Plena" },
          { test: "Resistencia Dinámica rd (Tinkercad)", value: "rd = 6.67 Ω", status: "Cálculo Derivado Correcto" }
        ]
      }
    },
    quiz: [
      {
        id: "q2_1",
        question: "En la Ecuación de Shockley, ¿qué representa la variable VT y cuál es su valor aproximado a 25°C?",
        options: [
          "Voltaje Total del circuito, ~12V",
          "Voltaje Térmico, ~26 mV",
          "Voltaje Threshold (Umbral), ~0.7V",
          "Voltaje de Ruptura Zener, ~5.1V"
        ],
        correctIndex: 1,
        explanation: "El voltaje térmico VT = k T / q equivale a aproximadamente 25.85 mV a temperatura ambiente (300 K)."
      },
      {
        id: "q2_2",
        question: "Si la corriente continua ID por un diodo es de 5 mA, ¿cuál es su resistencia dinámica aproximada rd considerando η = 1?",
        options: [
          "5.2 Ω",
          "26 Ω",
          "100 Ω",
          "0.5 Ω"
        ],
        correctIndex: 0,
        explanation: "rd = VT / ID = 26 mV / 5 mA = 5.2 Ω."
      },
      {
        id: "q2_3",
        question: "¿Cómo se comporta la corriente de saturación inversa IS ante un aumento de la temperatura ambiente?",
        options: [
          "Permanece completamente constante independientemente de la temperatura",
          "Disminuye exponencialmente hacia cero",
          "Aumenta exponencialmente, duplicándose aproximadamente por cada 10°C de incremento",
          "Se vuelve negativa provocando oscilaciones"
        ],
        correctIndex: 2,
        explanation: "La generación térmica de pares electrón-hueco en la zona de depleción hace que IS se duplique aproximadamente cada 10°C."
      },
      {
        id: "q2_4",
        question: "En la curva I-V del diodo 1N4007, ¿qué parámetro técnico indica la corriente máxima continua que puede conducir sin destruirse?",
        options: [
          "VRRM (Maximum Repetitive Reverse Voltage)",
          "IF(AV) (Maximum Average Forward Current)",
          "VF (Forward Voltage Drop)",
          "CT (Total Capacitance)"
        ],
        correctIndex: 1,
        explanation: "IF(AV) representa la corriente promedio directa máxima que soporta el componente (para el 1N4007 es de 1.0 A)."
      },
      {
        id: "q2_5",
        question: "Al trazar experimentalmente la curva I-V, ¿por qué se incluye una resistencia en serie con la fuente de alimentación?",
        options: [
          "Para aumentar la caída de voltaje del diodo a más de 10V",
          "Para limitar la corriente y evitar la destrucción térmica del diodo por embalamiento",
          "Para convertir la corriente continua en corriente alterna",
          "Para rectificar la señal automáticamente"
        ],
        correctIndex: 1,
        explanation: "Debido a la naturaleza exponencial de la curva I-V, pequeños incrementos de voltaje en el diodo sobre 0.7V provocan corrientes masivas que quemarían el dispositivo sin una resistencia limitadora."
      }
    ]
  },
  {
    id: 3,
    title: "Semana 3: Extracción de Parámetros y Ganancia (hFE) en Transistores BJT",
    badge: "Módulo 3",
    subtitle: "Configuración Emisor Común, corriente de Base (IB), Colector (IC) y saturación",
    hours: "10 Horas",
    overview: "Esta semana se enfoca en el transistor de unión bipolar (BJT). Se analiza el principio de amplificación de corriente (IC = hFE * IB), las regiones de operación (Corte, Activa, Saturación) y los métodos para extraer la ganancia hFE y trazar la recta de carga DC.",
    theorySections: [
      {
        id: "bjt_principios",
        title: "3.1 Principio de Operación del Transistor BJT",
        content: `El BJT es un dispositivo controlado por corriente que consta de tres regiones semiconductoras entrelazadas (NPN o PNP):
- **Base (B)**: Región muy delgada y levemente dopada.
- **Emisor (E)**: Región fuertemente dopada para inyectar portadores.
- **Colector (C)**: Región de tamaño físico mayor para disipar potencia.
        
En la **Región Activa**: La unión B-E está polarizada en Directa ($V_{BE} \\approx 0.7V$) y la unión B-C en Inversa. La pequeña corriente inyectada por la base ($I_B$) controla una corriente mucho mayor que fluye de Colector a Emisor ($I_C$).`,
        keyPoints: [
          "Relación fundamental: IC = hFE * IB = β * IB.",
          "Corriente de Emisor: IE = IC + IB = (hFE + 1) IB.",
          "Relación α: α = β / (β + 1) ≈ 0.99."
        ]
      },
      {
        id: "regiones_bjt",
        title: "3.2 Regiones de Trabajo: Corte, Activa y Saturación",
        content: `1. **Corte (Cutoff):** IB = 0 ⟹ IC ≈ 0, VCE = VCC. El transistor actúa como un interruptor abierto.
2. **Región Activa (Linear Active):** VCE > VCE(sat) ≈ 0.2V. IC = β * IB. Utilizado para amplificación de señales analógicas.
3. **Saturación (Saturation):** La corriente IC alcanza su valor máximo determinado por la red externa IC(sat) = (VCC - VCE(sat)) / RC. VCE(sat) ≈ 0.1V - 0.3V. El transistor actúa como un interruptor cerrado.`,
        keyPoints: [
          "Punto de Operación Q: (VCEQ, ICQ) definido por la recta de carga DC.",
          "Cálculo de Saturación: IB > IC(sat) / β_min para garantizar conmutación sólida."
        ]
      }
    ],
    labPractice: {
      title: "Práctica 3 del Viernes: Caracterización y Determinación Experimental de hFE en Transistor 2N2222",
      objective: "Medir las corrientes de Base (IB) y Colector (IC) en un circuito en Emisor Común para determinar el factor de amplificación de corriente continua hFE del transistor NPN 2N2222.",
      materials: [
        "1x Transistor NPN 2N2222A (encapsulado TO-92)",
        "1x Resistencia de Base RB = 100 kΩ (1/4W)",
        "1x Resistencia de Colector RC = 330 Ω (1/4W)",
        "1x Fuente de Alimentación DC Variable (0 - 12V)",
        "2x Multímetros Digitales (Medición simultánea de IB en µA e IC en mA)",
        "1x Protoboard y cables"
      ],
      safetyNotes: [
        "Asegurarse de conectar el multímetro de Base en la escala de microamperios (μA) antes de encender la fuente.",
        "Verificar la distribución de patillas del 2N2222 (Vista plana frontal de izquierda a derecha: E-B-C).",
        "Evitar cortocircuitar el Colector a VCC sin la resistencia RC de protección."
      ],
      steps: [
        {
          stepNumber: 1,
          title: "Montaje del Circuito Emisor Común",
          description: "Conecte la Base a través de RB (100 kΩ) a VBB = 5V. Conecte el Colector a través de RC (330 Ω) a VCC = 10V. Emisor directamente a Gnd.",
          expectedResult: "Circuito de polarización fija listo para medir VBE, VCE, IB, IC."
        },
        {
          stepNumber: 2,
          title: "Medición de Corrientes IB e IC",
          description: "Intercale el multímetro 1 en serie con la Base para medir IB. Intercale el multímetro 2 en serie con el Colector para medir IC.",
          expectedResult: "IB ≈ (5V - 0.7V) / 100 kΩ = 43 µA. IC ≈ 6.88 mA."
        },
        {
          stepNumber: 3,
          title: "Cálculo Experimental de hFE",
          description: "Divida la corriente de Colector IC medida entre la corriente de Base IB medida: hFE = IC / IB.",
          expectedResult: "hFE = 6.88 mA / 0.043 mA = 160 (valor dentro del rango de datasheet 100-300 para 2N2222)."
        },
        {
          stepNumber: 4,
          title: "Verificación de la Región de Saturación",
          description: "Reduzca RB a 10 kΩ. Observe cómo VCE cae a ~0.15V.",
          expectedResult: "El transistor entra en Saturación. IC alcanza el límite máximo IC(sat) ≈ (10V - 0.15V) / 330 Ω = 29.8 mA."
        }
      ],
      solutionGuide: {
        title: "Guía de Comparación de Parámetros BJT",
        items: [
          "**Transistor 2N2222A**: hFE típico = 100 - 300 a IC = 10 mA.",
          "**Transistor BC548**: hFE típico = 200 - 450 (Clase B/C).",
          "**Efecto de la Temperatura**: hFE aumenta aproximadamente +0.5% por cada °C de incremento térmico."
        ]
      },
      tinkercadGuide: {
        title: "Solución Gráfica del Maestro en Tinkercad Circuits (Práctica 3 - BJT 2N2222)",
        tinkercadUrl: "https://www.tinkercad.com/circuits",
        breadboardSetup: "Montar el transistor NPN 2N2222 en las columnas 20(E), 21(B), 22(C) del Protoboard Tinkercad. Fuente DC 1 configurada en 5V para Base y Fuente DC 2 configurada en 10V para Colector.",
        wiringDetails: [
          "Fuente DC 1 (+) Tinkercad a Amperímetro virtual 1 (Escala µA). Salida a RB = 100kΩ conectada a la Base (Pin 21).",
          "Fuente DC 2 (+) Tinkercad a Amperímetro virtual 2 (Escala mA). Salida a RC = 330Ω conectada al Colector (Pin 22).",
          "Emisor (Pin 20) conectado directamente al bus común de Tierra / Gnd (-).",
          "Voltímetro virtual 3 (Modo V) entre Colector (Pin 22) y Emisor (Pin 20) para registrar VCEQ."
        ],
        expectedVirtualReadings: [
          { test: "Corriente de Base IB (Tinkercad)", value: "43.0 µA", status: "Polarización B-E en Directa (0.7V)" },
          { test: "Corriente de Colector IC (Tinkercad)", value: "6.88 mA", status: "Región Activa Lineal" },
          { test: "Ganancia Calculada hFE (Tinkercad)", value: "hFE = 160", status: "Dentro de Especificación Datasheet" },
          { test: "Prueba de Saturación RB=10kΩ (Tinkercad)", value: "VCE = 0.15V, IC = 29.8mA", status: "Saturación Completa (Switch ON)" }
        ]
      }
    },
    quiz: [
      {
        id: "q3_1",
        question: "¿Cuál es la fórmula para calcular la ganancia de corriente continua (hFE o β) de un transistor BJT en Emisor Común?",
        options: [
          "hFE = VCE / IC",
          "hFE = IC / IB",
          "hFE = IB / IE",
          "hFE = IC * IB"
        ],
        correctIndex: 1,
        explanation: "La ganancia hFE (Forward Current Transfer Ratio) se define como la razón entre la corriente de salida de Colector IC y la corriente de entrada de Base IB."
      },
      {
        id: "q3_2",
        question: "En un transistor BJT NPN polarizado en Región de Saturación, ¿cuál es el valor típico de la tensión Colector-Emisor (VCE(sat))?",
        options: [
          "0.1 V a 0.3 V",
          "0.7 V exactos",
          "Igual a la fuente VCC (12V)",
          "-5.0 V"
        ],
        correctIndex: 0,
        explanation: "En saturación ambas uniones (B-E y B-C) quedan polarizadas en directa, reduciendo la caída entre Colector y Emisor a un mínimo de aproximadamente 0.1V a 0.3V."
      },
      {
        id: "q3_3",
        question: "Si un transistor NPN tiene IB = 50 µA y una ganancia hFE = 150, ¿cuál es la corriente de Colector IC en la región activa?",
        options: [
          "0.75 mA",
          "7.5 mA",
          "75 mA",
          "150 mA"
        ],
        correctIndex: 1,
        explanation: "IC = hFE * IB = 150 * 50 µA = 7500 µA = 7.5 mA."
      },
      {
        id: "q3_4",
        question: "¿Qué ocurre con el punto de trabajo Q (VCE, IC) si aumenta la temperatura del transistor sin compensación térmica?",
        options: [
          "El punto Q se desplaza hacia la región de corte",
          "La ganancia hFE e IS aumentan, desplazando el punto Q hacia arriba hacia la saturación (embalamiento térmico)",
          "El transistor deja de conducir completamente",
          "El voltaje VBE aumenta a 5V"
        ],
        correctIndex: 1,
        explanation: "El coeficiente térmico positivo de hFE y la corriente de fuga provocan que a mayor temperatura circule más IC, calentando aún más el dispositivo."
      },
      {
        id: "q3_5",
        question: "Para utilizar un transistor BJT como un interruptor digital (Switch ON/OFF), ¿en qué dos regiones debe conmutar el dispositivo?",
        options: [
          "Región Activa y Región Zener",
          "Región de Corte (IB=0) y Región de Saturación (VCE ≈ 0.2V)",
          "Región de Triodo y Región de Ruptura",
          "Región de Avalancha y Región Omica"
        ],
        correctIndex: 1,
        explanation: "Como interruptor abierto (OFF) opera en Corte (IC=0), y como interruptor cerrado (ON) se fuerza a Saturación con IB suficiente."
      }
    ]
  },
  {
    id: 4,
    title: "Semana 4: Protección ESD, Tolerancias y Proyecto Integrador",
    badge: "Módulo 4",
    subtitle: "Descargas electrostáticas, MOSFETs, análisis de error y reporte de caracterización",
    hours: "10 Horas",
    overview: "En la semana final se abordan las normas de seguridad de laboratorio para la prevención de Descargas Electrostáticas (ESD) en dispositivos sensibles (MOSFETs, CMOS), el cálculo de errores de medición en instrumentación y la consolidación del Reporte Técnico Integrador.",
    theorySections: [
      {
        id: "esd",
        title: "4.1 Protección ESD y Manipulación de MOSFETs",
        content: `Los transistores de efecto de campo metal-óxido-semiconductor (MOSFET) poseen un aislante ultra delgado de dióxido de silicio ($SiO_2$) en la Compuerta (Gate). Una descarga electrostática de apenas 100V puede perforar irrecuperablemente este aislante dieléctrico.
        
**Protocolo ESD Estándar (ANSI/ESD S20.20):**
- Utilizar pulsera antiestática con resistencia de seguridad de $1\\text{ M}\\Omega$ conectada a tierra física.
- Tapetes disipativos sobre las mesas de trabajo.
- Mantener los componentes en bolsas o tubos antiestáticos de apantallamiento hasta su inserción en el circuito.`,
        keyPoints: [
          "Tensión de ruptura en Gate VGS(max) ≈ ±20V.",
          "Carga electrostática humana sin protección: ¡hasta 15,000V!",
          "Resistencia de 1 MΩ en la pulsera: Protege al operador de choques eléctricos de red."
        ]
      },
      {
        id: "tolerancias",
        title: "4.2 Tolerancias de Medición y Porcentaje de Error",
        content: `En la caracterización experimental de semiconductores es fundamental comparar las mediciones ($X_{exp}$) con los modelos teóricos o datos de hoja técnica ($X_{teo}$).
        
**Ecuación de Porcentaje de Error (% Error):**
$$\\%\\text{ Error} = \\left| \\frac{X_{exp} - X_{teo}}{X_{teo}} \\right| \\times 100\\%$$
        
Las discrepancias comunes provienen de:
1. Tolerancia de resistencias (5% o 1%).
2. Impedancia interna del multímetro ($10\\text{ M}\\Omega$ en voltaje, $\\sim 1\\Omega$ en corriente).
3. Calentamiento por efecto Joule durante la prueba.`,
        keyPoints: [
          "Tolerancia aceptable en laboratorio docente: ≤ 10%.",
          "Efecto de carga del voltímetro: Afecta circuitos de alta impedancia (>100 kΩ)."
        ]
      }
    ],
    labPractice: {
      title: "Práctica 4 del Viernes: Caracterización Completa del MOSFET IRF540 y Proyecto Integrador",
      objective: "Realizar la caracterización del canal N del MOSFET IRF540 determinando la tensión de umbral Vth y el porcentaje de error respecto a la hoja de datos en la memoria integradora.",
      materials: [
        "1x MOSFET Canal N IRF540N (encapsulado TO-220)",
        "1x Resistencia de Drenador RD = 100 Ω (1/2W)",
        "1x Potenciómetro de 10 kΩ para ajuste de VGS",
        "1x Fuente DC Variable (0 - 12V)",
        "Pulsera ESD antiestática de seguridad (1 MΩ)",
        "2x Multímetros Digitales"
      ],
      safetyNotes: [
        "Conectar la pulsera antiestática ESD A TIERRA antes de retirar el MOSFET de su empaque de protección.",
        "No exceder el voltaje en Gate VGS de ±20V durante la medición."
      ],
      steps: [
        {
          stepNumber: 1,
          title: "Verificación de Protocolo Antiestático ESD",
          description: "Colóquese la pulsera ESD. Verifique con el megaóhmetro que la correa de muñeca presente una resistencia de ~1 MΩ a tierra.",
          expectedResult: "Sistema ESD verificado y seguro para manipulación del MOSFET IRF540."
        },
        {
          stepNumber: 2,
          title: "Montaje del Circuito de Conmutación MOSFET en Tinkercad",
          description: "Conecte la Compuerta (Gate - Pin 1) al cursor central del potenciómetro de 10kΩ. Conecte el Drenador (Drain - Pin 2) a través de RD = 100Ω a VDD = 12V. Surtidor (Source - Pin 3) a Gnd.",
          expectedResult: "Circuito listo para variar VGS desde 0V hasta 6V."
        },
        {
          stepNumber: 3,
          title: "Determinación Experimental de la Tensión de Umbral Vth",
          description: "Gire lentamente el potenciómetro hasta que la corriente de Drenador ID alcance 1 mA. Registre VGS.",
          expectedResult: "VGS(th) medido ≈ 3.2V (dentro del rango datasheet de 2.0V a 4.0V para el IRF540)."
        },
        {
          stepNumber: 4,
          title: "Emisión del Dictamen Integrador y % Error",
          description: "Calcule el porcentaje de error entre Vth medido (3.2V) y el valor nominal de datasheet (3.0V).",
          expectedResult: "% Error = |(3.2 - 3.0)/3.0| * 100 = 6.67% (Aprobado en control de calidad)."
        }
      ],
      solutionGuide: {
        title: "Criterios de Aprobación de Control de Calidad MOSFET",
        items: [
          "**MOSFET IRF540**: Vth entre 2.0V y 4.0V. RDS(on) ≤ 44 mΩ en conducción plena (VGS = 10V).",
          "**Aislamiento de Gate**: Corriente de Compuerta IG = 0.00 µA (Resistencia > 100 MΩ)."
        ]
      },
      tinkercadGuide: {
        title: "Solución Gráfica del Maestro en Tinkercad Circuits (Práctica 4 - MOSFET IRF540)",
        tinkercadUrl: "https://www.tinkercad.com/circuits",
        breadboardSetup: "Insertar el MOSFET Canal N (IRF540) en las columnas 15(Gate), 16(Drain), 17(Source) del Protoboard Tinkercad. Potenciómetro 10kΩ conectado a la Fuente DC de 12V para ajustar VGS.",
        wiringDetails: [
          "Potenciómetro 10kΩ en Tinkercad: Terminal 1 a Gnd, Terminal 2 a Fuente DC (+12V), Limpiador/Cursor central a Gate del MOSFET (Pin 15).",
          "Drenador (Pin 16) a la resistencia RD = 100Ω (1/2W) conectada al Amperímetro virtual en serie (Modo mA/A).",
          "Surtidor (Pin 17) conectado a la linea de masa/tierra Gnd (-).",
          "Voltímetro virtual 1 midiendo VGS (entre Gate y Source) y Voltímetro virtual 2 midiendo VDS (entre Drain y Source)."
        ],
        expectedVirtualReadings: [
          { test: "VGS en 1.5V (< Vth en Tinkercad)", value: "ID = 0.00 mA, VDS = 12.0V", status: "Corte (Switch OFF)" },
          { test: "VGS en 3.2V (Umbral Vth en Tinkercad)", value: "ID = 1.00 mA", status: "Inicio de Conducción (Umbral Alcanzado)" },
          { test: "VGS en 5.0V (Saturación en Tinkercad)", value: "ID = 118 mA, VDS = 0.18V", status: "Conducción Plena Óhmica" },
          { test: "Cálculo % Error Vth (Tinkercad)", value: "6.67 % Error", status: "Dictamen: CONFORME" }
        ]
      }
    },
    quiz: [
      {
        id: "q4_1",
        question: "¿Por qué los componentes con tecnología MOSFET o CMOS son significativamente más vulnerables al daño por Descargas Electrostáticas (ESD) que los diodos rectificadores?",
        options: [
          "Porque son más pequeños físicamente",
          "Debido a la extrema delgadez de la capa aislante de óxido de silicio (SiO2) en la compuerta, la cual se perfora con tensiones estáticas elevadas",
          "Porque conducen corriente alterna",
          "Porque están hechos de cobre puro"
        ],
        correctIndex: 1,
        explanation: "La capa dieléctrica del Gate tiene un espesor de pocos nanómetros, por lo que diferencias de potencial de más de 20V generan un campo eléctrico destructivo que perfora el aislante."
      },
      {
        id: "q4_2",
        question: "¿Cuál es el propósito principal de incluir una resistencia de 1 MΩ en serie dentro del cable de una pulsera antiestática ESD?",
        options: [
          "Aumentar el voltaje del cuerpo humano a 100V",
          "Proteger al usuario limitando la corriente a un nivel seguro en caso de tocar accidentalmente una línea de alta tensión",
          "Filtrar las señales de radiofrecuencia del aire",
          "Acelerar la descarga electrostática a velocidad cero"
        ],
        correctIndex: 1,
        explanation: "La resistencia de 1 MΩ permite drenar suavemente las cargas estáticas lentas hacia tierra sin permitir corrientes peligrosas (>0.5mA) a través del cuerpo humano si se toca la red eléctrica."
      },
      {
        id: "q4_3",
        question: "Si el valor teórico calculado para la corriente de colector es IC(teo) = 10.0 mA y el valor medido en el laboratorio es IC(exp) = 9.2 mA, ¿cuál es el porcentaje de error?",
        options: [
          "5.0 %",
          "8.0 %",
          "12.0 %",
          "0.8 %"
        ],
        correctIndex: 1,
        explanation: "% Error = |(9.2 - 10.0) / 10.0| * 100 = |-0.8 / 10.0| * 100 = 8.0%."
      },
      {
        id: "q4_4",
        question: "¿Qué efecto causa el incremento de temperatura en la caída de voltaje directa (VBE) de una unión PN a corriente constante?",
        options: [
          "Aumenta a razón de +10 mV/°C",
          "Disminuye a razón de aproximadamente -2 mV/°C a -2.5 mV/°C",
          "Permanece inalterada",
          "Se vuelve infinita"
        ],
        correctIndex: 1,
        explanation: "El coeficiente de temperatura de la unión PN es negativo, cayendo aproximadamente -2 mV por cada grado Celsius de elevación térmica."
      },
      {
        id: "q4_5",
        question: "En un reporte formal de caracterización de semiconductores, ¿qué elemento es indispensable incluir en la conclusión técnica?",
        options: [
          "La marca del protoboard utilizado",
          "La comparación cuantitativa entre valores nominales teóricos y experimentales con análisis de causas de error y dictamen funcional",
          "El costo económico individual del diodo probador",
          "La lista de compañeros de clase"
        ],
        correctIndex: 1,
        explanation: "Un dictamen de ingeniería requiere sustentar cuantitativamente el estado del componente mediante el porcentaje de error e interpretar si los valores están dentro de los márgenes de la hoja de datos."
      }
    ]
  }
];
