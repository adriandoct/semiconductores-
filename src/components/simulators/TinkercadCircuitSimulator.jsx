import React, { useState } from 'react';
import { Cpu, Zap, Activity, ShieldCheck, ExternalLink, RefreshCw, CheckCircle2, AlertTriangle, Monitor, Play, Settings2 } from 'lucide-react';

export default function TinkercadCircuitSimulator({ weekId = 1 }) {
  // --- STATE FOR WEEK 1: Multimeter Diode & BJT Junction Check ---
  const [w1Component, setW1Component] = useState('diode_forward'); // 'diode_forward' | 'diode_reverse' | 'bjt_be' | 'bjt_bc'
  const [w1DiodeState, setW1DiodeState] = useState('good'); // 'good' | 'open' | 'short'

  // --- STATE FOR WEEK 2: Diode IV Curve Circuit ---
  const [w2Vs, setW2Vs] = useState(5.0); // Source DC Voltage 0 to 12V
  const [w2Resistor, setW2Resistor] = useState(1000); // 1k ohm

  // --- STATE FOR WEEK 3: BJT hFE Common Emitter ---
  const [w3Vbb, setW3Vbb] = useState(5.0); // Base voltage 0 to 10V
  const [w3Vcc, setW3Vcc] = useState(10.0); // Collector voltage 0 to 15V
  const [w3RbMode, setW3RbMode] = useState(100000); // 100k (Active) or 10k (Saturation)
  const [w3Beta, setW3Beta] = useState(160); // hFE

  // --- STATE FOR WEEK 4: MOSFET IRF540 Vth & Switching ---
  const [w4VgsPot, setW4VgsPot] = useState(3.2); // Gate voltage set via potentiometer
  const [w4Vdd, setW4Vdd] = useState(12.0); // Drain supply voltage
  const [w4Rd, setW4Rd] = useState(100); // Drain resistor 100 ohms
  const [w4VthNominal, setW4VthNominal] = useState(3.0); // Datasheet Vth

  // ===================== CALCULATIONS =====================
  
  // Week 1 Calculations
  const getW1Reading = () => {
    if (w1DiodeState === 'open') return { reading: 'OL', status: 'Circuito Abierto (Defectuoso)', color: 'text-amber-400' };
    if (w1DiodeState === 'short') return { reading: '0.000 V', status: 'Cortocircuito (Defectuoso)', color: 'text-rose-400' };

    switch (w1Component) {
      case 'diode_forward':
        return { reading: '0.682 V', status: 'Polarización Directa (Silicio OK)', color: 'text-emerald-400' };
      case 'diode_reverse':
        return { reading: 'OL', status: 'Bloqueo Inverso Correcto', color: 'text-cyan-400' };
      case 'bjt_be':
        return { reading: '0.710 V', status: 'Unión B-E Sana (Emisor Dopado)', color: 'text-emerald-400' };
      case 'bjt_bc':
        return { reading: '0.690 V', status: 'Unión B-C Sana (Colector)', color: 'text-emerald-400' };
      default:
        return { reading: '0.680 V', status: 'OK', color: 'text-emerald-400' };
    }
  };

  // Week 2 Calculations
  // Diode IV: Vs - VD - ID*R = 0 => Shockley equation iteration
  const computeW2Diode = () => {
    let vd = 0.68;
    const eta = 1.2;
    const Vt = 0.02585; // thermal voltage at 25C
    const Is = 1e-9; // 1nA

    if (w2Vs <= 0.3) {
      vd = w2Vs;
      const id = 0;
      return { vd, idMA: 0, rd: Infinity };
    }

    // Simple iterative solver for Vs = Vd + Is*(exp(Vd/(eta*Vt))-1)*R
    for (let i = 0; i < 20; i++) {
      const id = Is * (Math.exp(vd / (eta * Vt)) - 1);
      const f = vd + id * w2Resistor - w2Vs;
      const df = 1 + (Is / (eta * Vt)) * Math.exp(vd / (eta * Vt)) * w2Resistor;
      vd = vd - f / df;
    }
    vd = Math.max(0, Math.min(vd, w2Vs));
    const idA = Math.max(0, (w2Vs - vd) / w2Resistor);
    const idMA = idA * 1000;
    const rd = idA > 1e-6 ? (eta * Vt) / idA : Infinity;
    return { vd, idMA, rd };
  };

  const w2Data = computeW2Diode();

  // Week 3 Calculations (BJT Common Emitter)
  const computeW3BJT = () => {
    const vbe = 0.7;
    let ibA = Math.max(0, (w3Vbb - vbe) / w3RbMode);
    if (w3Vbb < 0.7) ibA = 0;
    const ibUA = ibA * 1e6;

    // Saturation limit
    const rc = 330;
    const vceSat = 0.15;
    const icSatA = Math.max(0, (w3Vcc - vceSat) / rc);

    const icLinearA = w3Beta * ibA;
    const isSat = icLinearA >= icSatA;
    const icA = isSat ? icSatA : icLinearA;
    const icMA = icA * 1000;
    const vce = isSat ? vceSat : Math.max(vceSat, w3Vcc - icA * rc);
    const hfeMeasured = ibUA > 0 ? (icMA / (ibUA / 1000)) : 0;

    return { ibUA, icMA, vce, isSat, hfeMeasured };
  };

  const w3Data = computeW3BJT();

  // Week 4 Calculations (MOSFET IRF540 Vth)
  const computeW4MOSFET = () => {
    const vth = 3.2; // experimental Vth
    const Kn = 0.05; // A/V^2 process transconductance parameter
    const rdsOn = 0.044; // 44 mOhm

    if (w4VgsPot < vth) {
      return { idMA: 0, vds: w4Vdd, mode: 'Corte (OFF)', statusColor: 'text-slate-400' };
    }

    const vgsOver = w4VgsPot - vth;
    // Saturation vs Triode/Ohmic boundary
    const icSatA = vgsOver * vgsOver * Kn;
    const icMaxA = w4Vdd / (w4Rd + rdsOn);

    if (icSatA >= icMaxA) {
      const idA = icMaxA;
      const vds = idA * rdsOn;
      return { idMA: idA * 1000, vds, mode: 'Conducción Plena Óhmica (Switch ON)', statusColor: 'text-emerald-400' };
    } else {
      const idA = icSatA;
      const vds = Math.max(0, w4Vdd - idA * w4Rd);
      return { idMA: idA * 1000, vds, mode: 'Región de Saturación / Transición', statusColor: 'text-cyan-400' };
    }
  };

  const w4Data = computeW4MOSFET();
  const w4ErrorPercent = (Math.abs(3.2 - w4VthNominal) / w4VthNominal) * 100;

  return (
    <div className="bg-slate-950 rounded-3xl border border-cyan-500/40 p-5 space-y-6 shadow-2xl overflow-hidden">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              Tinkercad Circuits Virtual Lab
            </span>
            <span className="text-xs text-slate-400">Práctica Interactiva Semana {weekId}</span>
          </div>
          <h3 className="text-lg font-bold text-slate-100 mt-1 flex items-center gap-2">
            <Monitor className="w-5 h-5 text-cyan-400 animate-pulse" />
            Simulador Gráfico de Protoboard e Instrumentación Tinkercad
          </h3>
        </div>

        <a
          href="https://www.tinkercad.com/circuits"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition-all transform hover:scale-105"
        >
          <span>Abrir Tinkercad Oficial</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* VIRTUAL INSTRUMENT RACK & BREADBOARD CANVAS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT CONTROL RACK (Adjusters & Inputs) */}
        <div className="lg:col-span-5 bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
              <Settings2 className="w-4 h-4 text-cyan-400" /> Panel de Controles de la Fuente / Componente
            </h4>
            <span className="text-[10px] text-slate-400">Semana {weekId}</span>
          </div>

          {/* WEEK 1 CONTROLS */}
          {weekId === 1 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">Puntos de Medición del Multímetro:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setW1Component('diode_forward')}
                    className={`p-2.5 rounded-xl text-xs font-bold transition-all border text-left ${
                      w1Component === 'diode_forward'
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-750'
                    }`}
                  >
                    Diodo 1N4007 (Directa)
                  </button>
                  <button
                    onClick={() => setW1Component('diode_reverse')}
                    className={`p-2.5 rounded-xl text-xs font-bold transition-all border text-left ${
                      w1Component === 'diode_reverse'
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-750'
                    }`}
                  >
                    Diodo 1N4007 (Inversa)
                  </button>
                  <button
                    onClick={() => setW1Component('bjt_be')}
                    className={`p-2.5 rounded-xl text-xs font-bold transition-all border text-left ${
                      w1Component === 'bjt_be'
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-750'
                    }`}
                  >
                    2N2222 (Junta B-E)
                  </button>
                  <button
                    onClick={() => setW1Component('bjt_bc')}
                    className={`p-2.5 rounded-xl text-xs font-bold transition-all border text-left ${
                      w1Component === 'bjt_bc'
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-750'
                    }`}
                  >
                    2N2222 (Junta B-C)
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">Simular Estado Físico del Componente:</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setW1DiodeState('good')}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg border ${
                      w1DiodeState === 'good' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500' : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    Componente Sano
                  </button>
                  <button
                    onClick={() => setW1DiodeState('open')}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg border ${
                      w1DiodeState === 'open' ? 'bg-amber-500/20 text-amber-300 border-amber-500' : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    Abierto (Fault)
                  </button>
                  <button
                    onClick={() => setW1DiodeState('short')}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg border ${
                      w1DiodeState === 'short' ? 'bg-rose-500/20 text-rose-300 border-rose-500' : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    Corto (Short)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* WEEK 2 CONTROLS */}
          {weekId === 2 && (
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-semibold">Fuente DC Variable Tinkercad ($V_S$):</span>
                  <span className="text-cyan-300 font-bold font-mono">{w2Vs.toFixed(2)} V</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="12"
                  step="0.1"
                  value={w2Vs}
                  onChange={(e) => setW2Vs(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>0.0 V</span>
                  <span>0.7 V (Umbral)</span>
                  <span>6.0 V</span>
                  <span>12.0 V</span>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Resistencia de Limitación ($R_1$):</label>
                <select
                  value={w2Resistor}
                  onChange={(e) => setW2Resistor(Number(e.target.value))}
                  className="w-full p-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-200 font-bold focus:outline-none focus:border-cyan-500"
                >
                  <option value={330}>330 Ω (Protección Estándar)</option>
                  <option value={1000}>1 kΩ (Practica Tinkercad Docente)</option>
                  <option value={2200}>2.2 kΩ (Alta Impedancia)</option>
                </select>
              </div>
            </div>
          )}

          {/* WEEK 3 CONTROLS */}
          {weekId === 3 && (
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-semibold">Fuente Base Tinkercad ($V_{BB}$):</span>
                  <span className="text-cyan-300 font-bold font-mono">{w3Vbb.toFixed(1)} V</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.1"
                  value={w3Vbb}
                  onChange={(e) => setW3Vbb(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-semibold">Fuente Colector Tinkercad ($V_{CC}$):</span>
                  <span className="text-cyan-300 font-bold font-mono">{w3Vcc.toFixed(1)} V</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="15"
                  step="0.5"
                  value={w3Vcc}
                  onChange={(e) => setW3Vcc(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Resistencia de Base ($R_B$):</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setW3RbMode(100000)}
                    className={`p-2 rounded-xl text-xs font-bold border ${
                      w3RbMode === 100000 ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500' : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    100 kΩ (Región Activa)
                  </button>
                  <button
                    onClick={() => setW3RbMode(10000)}
                    className={`p-2 rounded-xl text-xs font-bold border ${
                      w3RbMode === 10000 ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500' : 'bg-slate-800 text-slate-400 border-slate-700'
                    }`}
                  >
                    10 kΩ (Saturación)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* WEEK 4 CONTROLS */}
          {weekId === 4 && (
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-semibold">Potenciómetro de Compuerta ($V_{GS}$):</span>
                  <span className="text-cyan-300 font-bold font-mono">{w4VgsPot.toFixed(2)} V</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="6"
                  step="0.05"
                  value={w4VgsPot}
                  onChange={(e) => setW4VgsPot(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>0.0V (Corte)</span>
                  <span className="text-cyan-400 font-bold">3.2V (Vth Umbral)</span>
                  <span>6.0V (Conducción)</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-semibold">Alimentación Drenador Tinkercad ($V_{DD}$):</span>
                  <span className="text-slate-300 font-bold font-mono">{w4Vdd.toFixed(1)} V</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="20"
                  step="1"
                  value={w4Vdd}
                  onChange={(e) => setW4Vdd(parseFloat(e.target.value))}
                  className="w-full accent-slate-400 bg-slate-800 h-2 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>

        {/* RIGHT DISPLAY: GRAPHICAL BREADBOARD & DIGITAL METERS */}
        <div className="lg:col-span-7 bg-slate-900/60 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
          
          {/* TINKERCAD DIGITAL MULTIMETER DISPLAY PANEL */}
          <div className="bg-slate-950 p-4 rounded-2xl border-2 border-slate-800 shadow-inner">
            <div className="flex justify-between items-center mb-2 border-b border-slate-900 pb-1.5">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 font-mono">
                TINKERCAD VIRTUAL MULTIMETER MULTI-1
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            </div>

            {/* BIG LCD DIGITAL READING */}
            <div className="bg-[#1a2e22] p-4 rounded-xl border border-emerald-800/40 text-right font-mono shadow-inner">
              {weekId === 1 && (
                <div>
                  <div className="text-3xl font-extrabold text-emerald-400 tracking-wider">
                    {getW1Reading().reading}
                  </div>
                  <div className={`text-xs mt-1 font-sans text-left font-bold ${getW1Reading().color}`}>
                    {getW1Reading().status}
                  </div>
                </div>
              )}

              {weekId === 2 && (
                <div className="grid grid-cols-2 gap-4 text-left">
                  <div>
                    <span className="text-[10px] text-emerald-500/80 block uppercase">Voltímetro $V_D$ (Diodo)</span>
                    <span className="text-2xl font-extrabold text-emerald-400">{w2Data.vd.toFixed(3)} V</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-emerald-500/80 block uppercase">Amperímetro $I_D$</span>
                    <span className="text-2xl font-extrabold text-cyan-400">{w2Data.idMA.toFixed(2)} mA</span>
                  </div>
                </div>
              )}

              {weekId === 3 && (
                <div className="grid grid-cols-3 gap-2 text-left">
                  <div>
                    <span className="text-[10px] text-emerald-500/80 block uppercase">Corriente Base $I_B$</span>
                    <span className="text-lg font-bold text-amber-300">{w3Data.ibUA.toFixed(1)} µA</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-500/80 block uppercase">Corriente Colector $I_C$</span>
                    <span className="text-lg font-bold text-cyan-300">{w3Data.icMA.toFixed(2)} mA</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-emerald-500/80 block uppercase">Voltaje $V_{CE}$</span>
                    <span className="text-lg font-bold text-emerald-400">{w3Data.vce.toFixed(2)} V</span>
                  </div>
                </div>
              )}

              {weekId === 4 && (
                <div className="grid grid-cols-3 gap-2 text-left">
                  <div>
                    <span className="text-[10px] text-emerald-500/80 block uppercase">Entrada $V_{GS}$</span>
                    <span className="text-lg font-bold text-cyan-300">{w4VgsPot.toFixed(2)} V</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-500/80 block uppercase">Corriente Drenador $I_D$</span>
                    <span className="text-lg font-bold text-amber-300">{w4Data.idMA.toFixed(1)} mA</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-emerald-500/80 block uppercase">Voltaje $V_{DS}$</span>
                    <span className="text-lg font-bold text-emerald-400">{w4Data.vds.toFixed(2)} V</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* VISUAL PROTOBOARD SCHEMATIC GRAPHIC (Tinkercad Style) */}
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-slate-400">
              <span>Vista de Montaje en Protoboard Virtual:</span>
              <span className="text-cyan-400 font-mono text-[10px]">Tinkercad Circuits Layout v2.4</span>
            </div>

            {/* SVG BREADBOARD GRAPHIC */}
            <div className="w-full h-44 bg-[#23272e] rounded-xl border border-slate-700 relative overflow-hidden flex items-center justify-center p-2">
              {/* Breadboard Holes Grid Simulation */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:12px_12px]"></div>

              {/* WEEK SPECIFIC GRAPHICAL SCHEMATIC */}
              {weekId === 1 && (
                <div className="flex items-center gap-8 z-10">
                  {/* Diode Graphical Component */}
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-6 bg-slate-900 rounded-full border-2 border-slate-600 relative flex items-center justify-end px-2">
                      <div className="w-3 h-full bg-slate-300 absolute right-3"></div>
                      <span className="text-[9px] text-slate-400 font-mono font-bold mr-6">1N4007</span>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 font-mono">Ánodo (+) — [Franja] — Cátodo (-)</span>
                  </div>

                  {/* Multimeter Probes */}
                  <div className="flex flex-col gap-2 text-[10px] font-mono">
                    <div className="flex items-center gap-1.5 text-rose-400">
                      <div className="w-3 h-3 rounded-full bg-rose-500"></div> Punta ROJA (+)
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <div className="w-3 h-3 rounded-full bg-slate-700"></div> Punta NEGRA (-)
                    </div>
                  </div>
                </div>
              )}

              {weekId === 2 && (
                <div className="flex items-center justify-around w-full z-10 text-xs">
                  {/* Power Supply Box */}
                  <div className="bg-slate-800 p-2.5 rounded-lg border border-slate-600 text-center font-mono">
                    <div className="text-[9px] text-cyan-400 uppercase font-bold">Fuente DC</div>
                    <div className="text-sm font-bold text-slate-100">{w2Vs.toFixed(1)}V</div>
                  </div>

                  {/* Wire Arrow */}
                  <div className="h-0.5 w-8 bg-rose-500 relative">
                    <div className="absolute -top-1 right-0 text-rose-500 font-bold">►</div>
                  </div>

                  {/* Resistor */}
                  <div className="bg-amber-100 text-slate-900 font-mono text-[10px] px-2 py-1 rounded font-bold border border-amber-400">
                    R1 ({w2Resistor} Ω)
                  </div>

                  {/* Wire Arrow */}
                  <div className="h-0.5 w-8 bg-cyan-400 relative">
                    <div className="absolute -top-1 right-0 text-cyan-400 font-bold">►</div>
                  </div>

                  {/* Diode */}
                  <div className="bg-slate-950 px-3 py-1 rounded-full border border-slate-600 text-cyan-300 font-mono text-[10px] font-bold">
                    1N4007 (VD={w2Data.vd.toFixed(2)}V)
                  </div>
                </div>
              )}

              {weekId === 3 && (
                <div className="flex items-center justify-around w-full z-10 font-mono text-xs">
                  <div className="bg-slate-800 p-2 rounded border border-slate-700 text-center">
                    <span className="text-[9px] text-amber-400 block">BASE (IB)</span>
                    <span className="font-bold text-slate-100">{w3Data.ibUA.toFixed(1)} µA</span>
                  </div>

                  <div className="w-12 h-12 bg-cyan-950/80 rounded-full border-2 border-cyan-500 flex flex-col items-center justify-center text-[10px] text-cyan-300 font-bold">
                    <span>2N2222</span>
                    <span className="text-[8px] text-emerald-400">NPN</span>
                  </div>

                  <div className="bg-slate-800 p-2 rounded border border-slate-700 text-center">
                    <span className="text-[9px] text-cyan-400 block">COLECTOR (IC)</span>
                    <span className="font-bold text-slate-100">{w3Data.icMA.toFixed(2)} mA</span>
                  </div>
                </div>
              )}

              {weekId === 4 && (
                <div className="flex items-center justify-around w-full z-10 font-mono text-xs">
                  <div className="bg-slate-800 p-2 rounded border border-slate-700 text-center">
                    <span className="text-[9px] text-cyan-400 block font-bold">GATE ($V_{GS}$)</span>
                    <span className="font-bold text-slate-100">{w4VgsPot.toFixed(2)} V</span>
                  </div>

                  <div className="w-14 h-14 bg-slate-900 rounded-lg border-2 border-amber-500 flex flex-col items-center justify-center text-[10px] text-amber-300 font-bold p-1">
                    <span>IRF540N</span>
                    <span className="text-[8px] text-emerald-400">Canal N</span>
                  </div>

                  <div className="bg-slate-800 p-2 rounded border border-slate-700 text-center">
                    <span className="text-[9px] text-amber-400 block font-bold">DRAIN ($I_D$)</span>
                    <span className="font-bold text-slate-100">{w4Data.idMA.toFixed(1)} mA</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* SIMULATION RESULT SUMMARY FOOTER */}
          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-slate-300 font-semibold">Estado de Simulación:</span>
              <span className="text-emerald-400 font-bold">
                {weekId === 1 && 'Prueba de Multímetro Activa'}
                {weekId === 2 && `Resistencia Dinámica rd ≈ ${isFinite(w2Data.rd) ? w2Data.rd.toFixed(1) + ' Ω' : 'Infinita'}`}
                {weekId === 3 && (w3Data.isSat ? 'Saturación Completa (Switch ON)' : `Región Activa (hFE = ${w3Data.hfeMeasured.toFixed(0)})`)}
                {weekId === 4 && `${w4Data.mode} (% Error Vth = ${w4ErrorPercent.toFixed(2)}%)`}
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
