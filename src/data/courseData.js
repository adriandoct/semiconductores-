// Course Data for "Auxiliar en la Caracterización de Dispositivos Semiconductores"
// Full 40-hour curriculum, 4 weekly modules, labs, step-by-step procedures, solutions, and quizzes.

export const COURSE_INFO = {
  title: "Auxiliar en la Caracterización de Dispositivos Semiconductores",
  subtitle: "Plataforma Interactiva para la Enseñanza y Caracterización Práctica de Laboratorio",
  duration: "40 Horas (Teoría + Práctica)",
  author: "Laboratorio de Electrónica y Semiconductores",
  targetAudience: "Docentes y Estudiantes de Bachillerato Técnico y Licenciatura en Electrónica/Mecatrónica",
  objective: "Desarrollar competencias en la identificación, medición, extracción de parámetros técnicos y prueba funcional de dispositivos semiconductores (Diodos, BJT, MOSFET) bajo normas de seguridad ESD."
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
        
**Polarización Inversa (Reverse Bias):** Se invierte la polaridad. La zona de depleción se ensancha, impidiendo el flujo de corriente principal (únicamente circula una corriente de fuga minúscula $I_S \sim nA$). Si el voltaje inverso supera el voltaje de ruptura ($V_{BR}$), ocurre la avalancha.`,
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
          expectedResult: "Lectura Base-Emisor (B-E) ≈ 0.690V | Lectura Base-Colector (B-C) ≈ 0.680V. (La junta B-E siempre presenta una caída ligeramente superior a B-C)."
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
    subtitle: "Ecuación de Shockley, resistencia dinámica $r_d$, trazado de curva $I-V$ y hojas de datos",
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
          "Sensibilidad térmica: $I_S$ se duplica por cada incrementó de $10^\\circ\\text{C}$.",
          "Voltaje térmico $V_T \\approx 26\\text{ mV}$ a temperatura ambiente.",
          "Comportamiento exponencial en zona directa ($V_D > 0.5V$)."
        ]
      },
      {
        id: "resistencia_dinamica",
        title: "2.2 Resistencia Estática ($R_D$) vs Resistencia Dinámica ($r_d$)",
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
      objective: "Construir experimentalmente la gráfica Corriente vs Voltaje ($I_D$ vs $V_D$) de un diodo 1N4007 registrando datos punto a punto y determinando la resistencia dinámica.",
      materials: [
        "1x Diodo Rectificador 1N4007",
        "1x Resistencia de limitación de $1\\text{ k}\\Omega$ (1/4W, 5%)",
        "1x Fuente de Alimentación DC Variable (0 - 12V)",
        "2x Multímetros Digitales (Uno como voltímetro en paralelo y otro como miliamperímetro en serie)",
        "1x Protoboard y cables de conexión"
      ],
      safetyNotes: [
        "Verificar que la corriente en serie no supere la potencia nominal de la resistencia de $1\\text{ k}\\Omega$ ($P = I^2 R$).",
        "Conectar el miliamperímetro en SERIE con el circuito. ¡Nunca en paralelo con la fuente!",
        "Incrementar el voltaje DC gradualmente de 0V a 10V observando el encendido del diodo."
      ],
      steps: [
        {
          stepNumber: 1,
          title: "Montaje del Circuito",
          description: "Conecte en serie: Fuente DC (+) ➔ Miliamperímetro (+) / (-) ➔ Resistencia $1\\text{ k}\\Omega$ ➔ Ánodo Diodo ➔ Cátodo Diodo ➔ Fuente DC (-). Coloque el Voltímetro en paralelo directamente sobre el diodo.",
          expectedResult: "Circuito cerrado listo para tomar lecturas pareadas de $V_D$ (mV) e $I_D$ (mA)."
        },
        {
          stepNumber: 2,
          title: "Toma de Datos en la Zona Sub-Umbral (0V a 0.5V)",
          description: "Ajuste la fuente en 0.5V, 1.0V, 1.5V. Mida $V_D$ e $I_D$.",
          expectedResult: "El voltaje en el diodo crecerá casi igual a la fuente, mientras que la corriente será prácticamente $0\\text{ mA}$ ($I_D < 0.05\\text{ mA}$)."
        },
        {
          stepNumber: 3,
          title: "Toma de Datos en la Zona de Conducción (0.6V a 0.75V)",
          description: "Incremente la fuente a 3V, 5V, 8V, 10V, 12V. Registre $V_D$ e $I_D$.",
          expectedResult: "A $V_S = 10\\text{V}$, $V_D \\approx 0.685\\text{V}$, e $I_D \\approx \\frac{10 - 0.685}{1000} = 9.315\\text{ mA}$."
        },
        {
          stepNumber: 4,
          title: "Cálculo de la Resistencia Dinámica $r_d$",
          description: "Calcule $\\Delta V_D / \\Delta I_D$ entre los puntos de $2\\text{ mA}$ y $8\\text{ mA}$.",
          expectedResult: "$\\Delta V_D \\approx 40\\text{ mV}$, $\\Delta I_D = 6\\text{ mA} \\implies r_d = \\frac{40\\text{ mV}}{6\\text{ mA}} \\approx 6.67 \\Omega$."
        }
      ],
      solutionGuide: {
        title: "Tabla de Mediciones Típicas de Referencia (Diodo 1N4007 a 25°C)",
        items: [
          "Fuente $V_S = 1.0\\text{V} \\implies V_D = 0.450\\text{V}, I_D = 0.55\\text{ mA}$",
          "Fuente $V_S = 3.0\\text{V} \\implies V_D = 0.620\\text{V}, I_D = 2.38\\text{ mA}$",
          "Fuente $V_S = 5.0\\text{V} \\implies V_D = 0.660\\text{V}, I_D = 4.34\\text{ mA}$",
          "Fuente $V_S = 10.0\\text{V} \\implies V_D = 0.695\\text{V}, I_D = 9.305\\text{ mA}$"
        ]
      }
    },
    quiz: [
      {
        id: "q2_1",
        question: "En la Ecuación de Shockley, ¿qué representa la variable $V_T$ y cuál es su valor aproximado a 25°C?",
        options: [
          "Voltaje Total del circuito, ~12V",
          "Voltaje Térmico, ~26 mV",
          "Voltaje Threshold (Umbral), ~0.7V",
          "Voltaje de Ruptura Zener, ~5.1V"
        ],
        correctIndex: 1,
        explanation: "El voltaje térmico $V_T = k T / q$ equivale a aproximadamente $25.85\\text{ mV}$ a temperatura ambiente ($300\\text{ K}$)."
      },
      {
        id: "q2_2",
        question: "Si la corriente continua $I_D$ por un diodo es de $5\\text{ mA}$, ¿cuál es su resistencia dinámica aproximada $r_d$ considerando $\\eta = 1$?",
        options: [
          "5.2 Ω",
          "26 Ω",
          "100 Ω",
          "0.5 Ω"
        ],
        correctIndex: 0,
        explanation: "$r_d = \\frac{V_T}{I_D} = \\frac{26\\text{ mV}}{5\\text{ mA}} = 5.2 \\Omega$."
      },
      {
        id: "q2_3",
        question: "¿Cómo se comporta la corriente de saturación inversa $I_S$ ante un aumento de la temperatura ambiente?",
        options: [
          "Permanece completamente constante independientemente de la temperatura",
          "Disminuye exponencialmente hacia cero",
          "Aumenta exponencialmente, duplicándose aproximadamente por cada 10°C de incremento",
          "Se vuelve negativa provocando oscilaciones"
        ],
        correctIndex: 2,
        explanation: "La generación térmica de pares electrón-hueco en la zona de depleción hace que $I_S$ se duplique aproximadamente cada $10^\\circ\\text{C}$."
      },
      {
        id: "q2_4",
        question: "En la curva I-V del diodo 1N4007, ¿qué parámetro técnico indica la corriente máxima continua que puede conducir sin destruirse?",
        options: [
          "$V_{RRM}$ (Maximum Repetitive Reverse Voltage)",
          "$I_{F(AV)}$ (Maximum Average Forward Current)",
          "$V_F$ (Forward Voltage Drop)",
          "$C_T$ (Total Capacitance)"
        ],
        correctIndex: 1,
        explanation: "$I_{F(AV)}$ representa la corriente promedio directa máxima que soporta el componente (para el 1N4007 es de $1.0\\text{ A}$)."
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
        explanation: "Debido a la naturaleza exponencial de la curva I-V, pequeños incrementos de voltaje en el diodo sobre $0.7\\text{V}$ provocan corrientes masivas que quemarían el dispositivo sin una resistencia limitadora."
      }
    ]
  },
  {
    id: 3,
    title: "Semana 3: Extracción de Parámetros y Ganancia ($h_{FE}$) en Transistores BJT",
    badge: "Módulo 3",
    subtitle: "Configuración Emisor Común, corriente de Base ($I_B$), Colector ($I_C$) y saturación",
    hours: "10 Horas",
    overview: "Esta semana se enfoca en el transistor de unión bipolar (BJT). Se analiza el principio de amplificación de corriente ($I_C = h_{FE} \\cdot I_B$), las regiones de operación (Corte, Activa, Saturación) y los métodos para extraer la ganancia $h_{FE}$ y trazar la recta de carga DC.",
    theorySections: [
      {
        id: "bjt_principios",
        title: "3.1 Principio de Operación del Transistor BJT",
        content: `El BJT es un dispositivo controlado por corriente que consta de tres regiones semiconductoras semiconductoras entrelazadas (NPN o PNP):
- **Base (B)**: Región muy delgada y levemente dopada.
- **Emisor (E)**: Región fuertemente dopada para inyectar portadores.
- **Colector (C)**: Región de tamaño físico mayor para disipar potencia.
        
En la **Región Activa**: La unión B-E está polarizada en Directa ($V_{BE} \\approx 0.7V$) y la unión B-C en Inversa. La pequeña corriente inyectada por la base ($I_B$) controla una corriente mucho mayor que fluye de Colector a Emisor ($I_C$).`,
        keyPoints: [
          "Relación fundamental: $I_C = h_{FE} \\cdot I_B = \\beta \\cdot I_B$.",
          "Corriente de Emisor: $I_E = I_C + I_B = (h_{FE} + 1) I_B$.",
          "Relación $\\alpha$: $\\alpha = \\frac{\\beta}{\\beta + 1} \\approx 0.99$."
        ]
      },
      {
        id: "regiones_bjt",
        title: "3.2 Regiones de Trabajo: Corte, Activa y Saturación",
        content: `1. **Corte (Cutoff):** $I_B = 0 \\implies I_C \\approx 0$, $V_{CE} = V_{CC}$. El transistor actúa como un interruptor abierto.
2. **Región Activa (Linear Active):** $V_{CE} > V_{CE(sat)} \\approx 0.2V$. $I_C = \\beta \\cdot I_B$. Utilizado para amplificación de señales analógicas.
3. **Saturación (Saturation):** La corriente $I_C$ alcanza su valor máximo determinado por la red externa $I_{C(sat)} = \\frac{V_{CC} - V_{CE(sat)}}{R_C}$. $V_{CE(sat)} \\approx 0.1V - 0.3V$. El transistor actúa como un interruptor cerrado.`,
        keyPoints: [
          "Punto de Operación Q: ($V_{CEQ}, I_{CQ}$) definido por la recta de carga DC.",
          "Cálculo de Saturación: $I_B > \\frac{I_{C(sat)}}{\\beta_{min}}$ para garantizar conmutación sólida."
        ]
      }
    ],
    labPractice: {
      title: "Práctica 3 del Viernes: Caracterización y Determinación Experimental de $h_{FE}$ en Transistor 2N2222",
      objective: "Medir las corrientes de Base ($I_B$) y Colector ($I_C$) en un circuito en Emisor Común para determinar el factor de amplificación de corriente continua $h_{FE}$ del transistor NPN 2N2222.",
      materials: [
        "1x Transistor NPN 2N2222A (encapsulado TO-92)",
        "1x Resistencia de Base $R_B = 100\\text{ k}\\Omega$ (1/4W)",
        "1x Resistencia de Colector $R_C = 330\\ \\Omega$ (1/4W)",
        "1x Fuente de Alimentación DC Variable (0 - 12V)",
        "2x Multímetros Digitales (Medición simultánea de $I_B$ en $\\mu A$ e $I_C$ en $mA$)",
        "1x Protoboard y cables"
      ],
      safetyNotes: [
        "Asegurarse de conectar el multímetro de Base en la escala de microamperios (μA) o miliamperios (mA) antes de encender la fuente.",
        "Verificar la distribución de patillas del 2N2222 (Vista plana frontal de izquierda a derecha: E-B-C en TO-92 común).",
        "Evitar cortocircuitar el Colector a $V_{CC}$ sin la resistencia $R_C$ de protección."
      ],
      steps: [
        {
          stepNumber: 1,
          title: "Montaje del Circuito Emisor Común",
          description: "Conecte la Base a través de $R_B (100\\text{k}\\Omega)$ a $V_{BB} = 5\\text{V}$. Conecte el Colector a través de $R_C (330\\Omega)$ a $V_{CC} = 10\\text{V}$. Emisor directamente a Gnd.",
          expectedResult: "Circuito de polarización fija listo para medir $V_{BE}, V_{CE}, I_B, I_C$."
        },
        {
          stepNumber: 2,
          title: "Medición de Corrientes $I_B$ e $I_C$",
          description: "Intercale el multímetro 1 en serie con la Base para medir $I_B$. Intercale el multímetro 2 en serie con el Colector para medir $I_C$.",
          expectedResult: "$I_B \\approx \\frac{5V - 0.7V}{100\\text{k}\\Omega} = 43\\ \\mu\\text{A}$. $I_C \\approx 6.88\\text{ mA}$."
        },
        {
          stepNumber: 3,
          title: "Cálculo Experimental de $h_{FE}$",
          description: "Divida la corriente de Colector $I_C$ medida entre la corriente de Base $I_B$ medida: $h_{FE} = \\frac{I_C}{I_B}$.",
          expectedResult: "$h_{FE} = \\frac{6.88\\text{ mA}}{0.043\\text{ mA}} = 160$ (valor dentro del rango de datasheet 100-300 para el 2N2222)."
        },
        {
          stepNumber: 4,
          title: "Verificación de la Región de Saturación",
          description: "Reduzca $R_B$ a $10\\text{ k}\\Omega$. Observe cómo $V_{CE}$ cae a $\\sim 0.15\\text{V}$.",
          expectedResult: "El transistor entra en Saturación. $I_C$ alcanza el límite máximo $I_{C(sat)} \\approx \\frac{10V - 0.15V}{330\\Omega} = 29.8\\text{ mA}$."
        }
      ],
      solutionGuide: {
        title: "Guía de Comparación de Parámetros BJT",
        items: [
          "**Transistor 2N2222A**: $h_{FE}$ típico = 100 - 300 a $I_C = 10\\text{ mA}$.",
          "**Transistor BC548**: $h_{FE}$ típico = 200 - 450 (Clase B/C).",
          "**Efecto de la Temperatura**: $h_{FE}$ aumenta aproximadamente +0.5% por cada °C de incremento térmico."
        ]
      }
    },
    quiz: [
      {
        id: "q3_1",
        question: "¿Cuál es la fórmula para calcular la ganancia de corriente continua ($h_{FE}$ o $\\beta$) de un transistor BJT en Emisor Común?",
        options: [
          "$h_{FE} = \\frac{V_{CE}}{I_C}$",
          "$h_{FE} = \\frac{I_C}{I_B}$",
          "$h_{FE} = \\frac{I_B}{I_E}$",
          "$h_{FE} = I_C \\cdot I_B$"
        ],
        correctIndex: 1,
        explanation: "La ganancia $h_{FE}$ (Forward Current Transfer Ratio) se define como la razón entre la corriente de salida de Colector $I_C$ y la corriente de entrada de Base $I_B$."
      },
      {
        id: "q3_2",
        question: "En un transistor BJT NPN polarizado en Región de Saturación, ¿cuál es el valor típico de la tensión Colector-Emisor ($V_{CE(sat)}$)?",
        options: [
          "0.1 V a 0.3 V",
          "0.7 V exactos",
          "Igual a la fuente $V_{CC}$ (12V)",
          "-5.0 V"
        ],
        correctIndex: 0,
        explanation: "En saturación ambas uniones (B-E y B-C) quedan polarizadas en directa, reduciendo la caída entre Colector y Emisor a un mínimo de aproximadamente 0.1V a 0.3V."
      },
      {
        id: "q3_3",
        question: "Si un transistor NPN tiene $I_B = 50\\ \\mu\\text{A}$ y una ganancia $h_{FE} = 150$, ¿cuál es la corriente de Colector $I_C$ en la región activa?",
        options: [
          "0.75 mA",
          "7.5 mA",
          "75 mA",
          "150 mA"
        ],
        correctIndex: 1,
        explanation: "$I_C = h_{FE} \\cdot I_B = 150 \\cdot 50\\ \\mu\\text{A} = 7500\\ \\mu\\text{A} = 7.5\\text{ mA}$."
      },
      {
        id: "q3_4",
        question: "¿Qué ocurre con el punto de trabajo Q ($V_{CE}, I_C$) si aumenta la temperatura del transistor sin compensación térmica?",
        options: [
          "El punto Q se desplaza hacia la región de corte",
          "La ganancia $h_{FE}$ e $I_S$ aumentan, desplazando el punto Q hacia arriba hacia la saturación (embalamiento térmico)",
          "El transistor deja de conducir completamente",
          "El voltaje $V_{BE}$ aumenta a 5V"
        ],
        correctIndex: 1,
        explanation: "El coeficiente térmico positivo de $h_{FE}$ y la corriente de fuga provocan que a mayor temperatura circule más $I_C$, calentando aún más el dispositivo."
      },
      {
        id: "q3_5",
        question: "Para utilizar un transistor BJT como un interruptor digital (Switch ON/OFF), ¿en qué dos regiones debe conmutar el dispositivo?",
        options: [
          "Región Activa y Región Zener",
          "Región de Corte ($I_B=0$) y Región de Saturación ($V_{CE} \\approx 0.2V$)",
          "Región de Triodo y Región de Ruptura",
          "Región de Avalancha y Región Omica"
        ],
        correctIndex: 1,
        explanation: "Como interruptor abierto (OFF) opera en Corte ($I_C=0$), y como interruptor cerrado (ON) se fuerza a Saturación con $I_B$ suficiente."
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
          "Tensión de ruptura en Gate $V_{GS(max)} \\approx \\pm 20\\text{V}$.",
          "Carga electrostática humana sin protección: ¡hasta 15,000V!",
          "Resistencia de $1\\text{ M}\\Omega$ en la pulsera: Protege al operador de choques eléctricos de red."
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
          "Tolerancia aceptable en laboratorio docente: $\\le 10\\%$.",
          "Efecto de carga del voltímetro: Afecta circuitos de alta impedancia ($>100\\text{ k}\\Omega$)."
        ]
      }
    ],
    labPractice: {
      title: "Práctica 4 del Viernes: Caracterización Completa y Proyecto Integrador de Dispositivos",
      objective: "Realizar el reporte técnico integrador comparando la curva I-V teórica de un diodo y la ganancia $h_{FE}$ de un BJT contra sus valores experimentales medidos, tabulando porcentajes de error.",
      materials: [
        "1x Diodo 1N4007 y 1x Transistor NPN 2N2222",
        "Resistencias de precisión de $330\\Omega$, $1\\text{ k}\\Omega$, $100\\text{ k}\\Omega$",
        "Fuente DC y Multímetros de precisión calibrados",
        "Pulsera ESD antiestática conectada a chasis/tierra",
        "Plantilla de Reporte Técnico de Caracterización"
      ],
      safetyNotes: [
        "Verificar la conexión a tierra de la pulsera antiestática antes de tocar las patillas del MOSFET/BJT.",
        "Calcular la potencia disipada $P = V_{CE} \\cdot I_C$ en el transistor para no exceder los $625\\text{ mW}$ del encapsulado TO-92."
      ],
      steps: [
        {
          stepNumber: 1,
          title: "Verificación de Protocolo Antiestático",
          description: "Colóquese la pulsera ESD. Verifique con el megaóhmetro que la correa de muñeca presente una resistencia entre $0.9\\text{ M}\\Omega$ y $1.1\\text{ M}\\Omega$ a tierra.",
          expectedResult: "Sistema ESD verificado y seguro para manipulación de componentes."
        },
        {
          stepNumber: 2,
          title: "Caracterización de Potencia y Temperatura",
          description: "Mida el voltaje $V_{BE}$ y la corriente $I_C$ en el transistor 2N2222 al encenderlo y tras 3 minutos de operación continua.",
          expectedResult: "Al calentarse ligeramente el transistor, $V_{BE}$ disminuye aproximadamente $-2\\text{ mV}/^\\circ\\text{C}$ e $I_C$ sube levemente."
        },
        {
          stepNumber: 3,
          title: "Tabulación Teórica vs Experimental",
          description: "Llene la tabla comparativa con $V_{D(teo)} = 0.700\\text{V}$ vs $V_{D(exp)}$, e $h_{FE(teo)} = 150$ vs $h_{FE(exp)}$.",
          expectedResult: "Cálculo automático de porcentaje de error para inclusión en la memoria técnica."
        },
        {
          stepNumber: 4,
          title: "Emisión del Dictamen Técnico",
          description: "Determine si el componente cumple las especificaciones de la hoja de datos para su aprobación en control de calidad.",
          expectedResult: "Aprobación o Rechazo del lote probado basado en límites de tolerancia."
        }
      ],
      solutionGuide: {
        title: "Criterios de Aprobación de Control de Calidad",
        items: [
          "**Diodo 1N4007**: $V_F \\le 0.8V$ a $I_F = 10\\text{ mA}$. Corriente inversa $I_R < 5\\ \\mu\\text{A}$ a $V_R = 50\\text{V}$.",
          "**Transistor 2N2222**: $h_{FE} \\ge 100$ a $I_C = 10\\text{ mA}$, $V_{CE(sat)} \\le 0.3\\text{V}$."
        ]
      }
    },
    quiz: [
      {
        id: "q4_1",
        question: "¿Por qué los componentes con tecnología MOSFET o CMOS son significativamente más vulnerables al daño por Descargas Electrostáticas (ESD) que los diodos rectificadores?",
        options: [
          "Porque son más pequeños físicamente",
          "Debido a la extrema delgadez de la capa aislante de óxido de silicio ($SiO_2$) en la compuerta, la cual se perfora con tensiones estáticas elevadas",
          "Porque conducen corriente alterna",
          "Porque están hechos de cobre puro"
        ],
        correctIndex: 1,
        explanation: "La capa dieléctrica del Gate tiene un espesor de pocos nanómetros, por lo que diferencias de potencial de más de 20V generan un campo eléctrico destructivo que perfora el aislante."
      },
      {
        id: "q4_2",
        question: "¿Cuál es el propósito principal de incluir una resistencia de $1\\text{ M}\\Omega$ en serie dentro del cable de una pulsera antiestática ESD?",
        options: [
          "Aumentar el voltaje del cuerpo humano a 100V",
          "Proteger al usuario limitando la corriente a un nivel seguro en caso de tocar accidentalmente una línea de alta tensión",
          "Filtrar las señales de radiofrecuencia del aire",
          "Acelerar la descarga electrostática a velocidad cero"
        ],
        correctIndex: 1,
        explanation: "La resistencia de $1\\text{ M}\\Omega$ permite drenar suavemente las cargas estáticas lentas hacia tierra sin permitir corrientes peligrosas (>0.5mA) a través del cuerpo humano si se toca la red eléctrica."
      },
      {
        id: "q4_3",
        question: "Si el valor teórico calculado para la corriente de colector es $I_{C(teo)} = 10.0\\text{ mA}$ y el valor medido en el laboratorio es $I_{C(exp)} = 9.2\\text{ mA}$, ¿cuál es el porcentaje de error?",
        options: [
          "5.0 %",
          "8.0 %",
          "12.0 %",
          "0.8 %"
        ],
        correctIndex: 1,
        explanation: "\\% Error = |(9.2 - 10.0) / 10.0| * 100 = |-0.8 / 10.0| * 100 = 8.0%."
      },
      {
        id: "q4_4",
        question: "¿Qué efecto causa el incremento de temperatura en la caída de voltaje directa ($V_{BE}$) de una unión PN a corriente constante?",
        options: [
          "Aumenta a razón de +10 mV/°C",
          "Disminuye a razón de aproximadamente -2 mV/°C a -2.5 mV/°C",
          "Permanece inalterada",
          "Se vuelve infinita"
        ],
        correctIndex: 1,
        explanation: "El coeficiente de temperatura de la unión PN es negativo, cayendo aproximadamente $-2\\text{ mV}$ por cada grado Celsius de elevación térmica."
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
