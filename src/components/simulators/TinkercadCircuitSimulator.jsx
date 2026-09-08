import React, { useState } from 'react';
import { Cpu, Zap, Activity, ShieldCheck, ExternalLink, RefreshCw, CheckCircle2, AlertTriangle, Monitor, Play, Settings2, Tv, Video, Layers, ChevronRight, Info, BookOpen } from 'lucide-react';
import { FEEDBACK_VIDEOS } from '../../data/videoData';

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

  // Video state for the inline short player
  const weekVideos = FEEDBACK_VIDEOS.filter((v) => v.weekId === weekId || (weekId === 1 && v.category === 'tinkercad'));
  const [selectedVideoId, setSelectedVideoId] = useState(weekVideos[0]?.id || 'vid-pn-junction');
  const activeVideo = FEEDBACK_VIDEOS.find((v) => v.id === selectedVideoId) || weekVideos[0] || FEEDBACK_VIDEOS[0];
  const [isPlayingInline, setIsPlayingInline] = useState(true);

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
  const computeW2Diode = () => {
    let vd = 0.68;
    const eta = 1.2;
    const Vt = 0.02585; // thermal voltage at 25C
    const Is = 1e-9; // 1nA

    if (w2Vs <= 0.3) {
      vd = w2Vs;
      return { vd, idMA: 0, rd: Infinity };
    }

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
    const Kn = 0.05; // A/V^2
    const rdsOn = 0.044; // 44 mOhm

    if (w4VgsPot < vth) {
      return { idMA: 0, vds: w4Vdd, mode: 'Corte (OFF)', statusColor: 'text-slate-400' };
    }

    const vgsOver = w4VgsPot - vth;
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
    <div className="bg-slate-950 rounded-3xl border border-cyan-500/40 p-5 md:p-7 space-y-8 shadow-2xl overflow-hidden">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono">
              Tinkercad Circuits Virtual Lab
            </span>
            <span className="text-xs text-slate-400 font-mono">Semana {weekId} — Práctica Guiada en Vivo</span>
          </div>
          <h3 className="text-xl md:text-2xl font-black text-white mt-1 flex items-center gap-2.5 font-heading">
            <Monitor className="w-6 h-6 text-cyan-400 animate-pulse" />
            Laboratorio Gráfico de Tinkercad: Video, Circuito y Simulación
          </h3>
        </div>

        <a
          href="https://www.tinkercad.com/circuits"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-cyan-500/25 flex items-center gap-2 transition-all transform hover:scale-105"
        >
          <span>Abrir Tinkercad Oficial</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: INLINE SHORT VIDEO PLAYER FOR THE WEEK'S PRACTICE             */}
      {/* ========================================================================= */}
      <div className="bg-slate-900/90 rounded-2xl border border-violet-500/40 p-5 space-y-4 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-violet-500/20 text-violet-300 border border-violet-500/30">
              <Tv className="w-5 h-5 text-violet-400 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-violet-400">
                Video Tutorial Explicativo Corto
              </span>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                {activeVideo.title}
                <span className="text-[10px] bg-slate-800 text-cyan-300 px-2 py-0.5 rounded-full font-mono">
                  {activeVideo.duration}
                </span>
              </h4>
            </div>
          </div>

          {/* Video Selector Tabs if week has multiple videos */}
          {weekVideos.length > 1 && (
            <div className="flex gap-1.5 flex-wrap">
              {weekVideos.map((v) => (
                <button
                  key={v.id}
                  onClick={() => {
                    setSelectedVideoId(v.id);
                    setIsPlayingInline(true);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all border ${
                    selectedVideoId === v.id
                      ? 'bg-violet-600 text-white border-violet-400 shadow-md shadow-violet-500/20'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                  }`}
                >
                  🎬 {v.title.split(' ')[0]}...
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Video Player Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          {/* Responsive 16:9 Iframe Embed */}
          <div className="lg:col-span-7 bg-slate-950 rounded-xl border border-slate-700 overflow-hidden shadow-2xl relative aspect-video group">
            {isPlayingInline ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=0&rel=0&modestbranding=1`}
                title={activeVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <div 
                className="w-full h-full bg-cover bg-center relative flex items-center justify-center cursor-pointer"
                style={{ backgroundImage: `url(${activeVideo.thumbnailUrl})` }}
                onClick={() => setIsPlayingInline(true)}
              >
                <div className="absolute inset-0 bg-slate-950/60 group-hover:bg-slate-950/40 transition-all flex flex-col items-center justify-center gap-3 p-4">
                  <div className="w-16 h-16 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center shadow-xl shadow-cyan-500/40 transform group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 fill-current ml-1" />
                  </div>
                  <span className="text-xs font-extrabold text-white bg-slate-900/90 px-3 py-1 rounded-full border border-slate-700">
                    Reproducir Práctica en Tinkercad ({activeVideo.duration})
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Video Key Takeaways & Summary Panel */}
          <div className="lg:col-span-5 space-y-3 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
            <h5 className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800 pb-2">
              <Info className="w-4 h-4 text-cyan-400" /> Puntos Clave de la Práctica en Video
            </h5>
            
            <p className="text-xs text-slate-300 leading-relaxed italic">
              "{activeVideo.subtitle || activeVideo.description}"
            </p>

            <ul className="space-y-1.5 text-xs text-slate-300">
              {activeVideo.keyTakeaways?.map((point, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 2: GRAPHICAL BREADBOARD CIRCUIT LAYOUT & SCHEMATIC IMAGE          */}
      {/* ========================================================================= */}
      <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-5 space-y-4 shadow-xl">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400">
              Visualizador Gráfico de Circuito
            </span>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              📐 Diagrama de Ensamble en Protoboard Tinkercad (Semana {weekId})
            </h4>
          </div>
          <span className="text-xs font-mono text-slate-400 bg-slate-950 px-3 py-1 rounded-full border border-slate-800">
            Protoboard Virtual HD
          </span>
        </div>

        {/* High Definition SVG Schematic Canvas */}
        <div className="w-full bg-[#1b1f27] rounded-2xl border border-slate-700 p-4 relative overflow-hidden flex flex-col items-center justify-center min-h-[220px]">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"></div>

          {/* WEEK SPECIFIC HD CIRCUIT SCHEMATIC */}
          {weekId === 1 && (
            <div className="w-full max-w-xl space-y-4 z-10 text-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Diode Setup Card */}
                <div className="bg-slate-900/90 p-4 rounded-xl border border-cyan-500/30 text-left space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-cyan-300">
                    <span>1. Diodo Rectificador 1N4007</span>
                    <span className="text-[10px] bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded">DO-41</span>
                  </div>
                  <div className="h-10 bg-slate-950 rounded-lg border border-slate-700 flex items-center justify-between px-4">
                    <span className="text-xs font-mono text-rose-400 font-bold">Ánodo (+)</span>
                    <div className="w-16 h-4 bg-slate-800 rounded border border-slate-600 relative flex items-center justify-end px-1">
                      <div className="w-2 h-full bg-slate-200 absolute right-2"></div>
                    </div>
                    <span className="text-xs font-mono text-slate-400 font-bold">Cátodo (-) [Franja]</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Prueba Multímetro en Directa: ~0.68V | Inversa: OL</p>
                </div>

                {/* Transistor BJT Setup Card */}
                <div className="bg-slate-900/90 p-4 rounded-xl border border-emerald-500/30 text-left space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold text-emerald-300">
                    <span>2. Transistor NPN 2N2222</span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">TO-92</span>
                  </div>
                  <div className="h-10 bg-slate-950 rounded-lg border border-slate-700 flex items-center justify-around font-mono text-xs">
                    <span className="text-amber-400 font-bold">Pin 1: Emisor</span>
                    <span className="text-cyan-400 font-bold">Pin 2: Base</span>
                    <span className="text-emerald-400 font-bold">Pin 3: Colector</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Junta B-E: 0.71V | Junta B-C: 0.69V</p>
                </div>
              </div>
            </div>
          )}

          {weekId === 2 && (
            <div className="w-full max-w-xl z-10 space-y-3">
              <div className="bg-slate-900/90 p-4 rounded-xl border border-cyan-500/30 font-mono text-xs space-y-3">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="text-cyan-300 font-bold text-sm">Circuito de Caracterización I-V (1N4007)</span>
                  <span className="text-slate-400">Resistencia R1 = 1 kΩ</span>
                </div>
                <div className="flex items-center justify-between gap-2 text-center">
                  <div className="p-2.5 bg-rose-950/60 rounded-lg border border-rose-600/40 text-rose-300">
                    <span className="block text-[10px]">Fuente DC</span>
                    <span className="font-bold">{w2Vs.toFixed(1)} V</span>
                  </div>
                  <span className="text-rose-400 text-lg">➔</span>
                  <div className="p-2.5 bg-amber-950/60 rounded-lg border border-amber-600/40 text-amber-300">
                    <span className="block text-[10px]">Amperímetro (Serie)</span>
                    <span className="font-bold">{w2Data.idMA.toFixed(2)} mA</span>
                  </div>
                  <span className="text-cyan-400 text-lg">➔</span>
                  <div className="p-2.5 bg-cyan-950/60 rounded-lg border border-cyan-600/40 text-cyan-300">
                    <span className="block text-[10px]">Diodo 1N4007</span>
                    <span className="font-bold">{w2Data.vd.toFixed(2)} V</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {weekId === 3 && (
            <div className="w-full max-w-xl z-10 space-y-3">
              <div className="bg-slate-900/90 p-4 rounded-xl border border-violet-500/30 font-mono text-xs space-y-3">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="text-violet-300 font-bold text-sm">Circuito Emisor Común (BJT 2N2222)</span>
                  <span className="text-slate-400">RC = 330 Ω | RB = {w3RbMode / 1000} kΩ</span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-2.5 bg-amber-950/60 rounded-lg border border-amber-600/40 text-amber-300">
                    <span className="block text-[10px]">Entrada Base (IB)</span>
                    <span className="font-bold">{w3Data.ibUA.toFixed(1)} µA</span>
                  </div>
                  <div className="p-2.5 bg-cyan-950/60 rounded-lg border border-cyan-600/40 text-cyan-300">
                    <span className="block text-[10px]">Ganancia Medida hFE</span>
                    <span className="font-bold text-emerald-400">{w3Data.hfeMeasured.toFixed(0)}</span>
                  </div>
                  <div className="p-2.5 bg-emerald-950/60 rounded-lg border border-emerald-600/40 text-emerald-300">
                    <span className="block text-[10px]">Salida Colector (IC)</span>
                    <span className="font-bold">{w3Data.icMA.toFixed(2)} mA</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {weekId === 4 && (
            <div className="w-full max-w-xl z-10 space-y-3">
              <div className="bg-slate-900/90 p-4 rounded-xl border border-emerald-500/30 font-mono text-xs space-y-3">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <span className="text-emerald-300 font-bold text-sm">Conmutación y Vth MOSFET Canal N (IRF540)</span>
                  <span className="text-slate-400">Protección ESD 1 MΩ Aislada</span>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-2.5 bg-cyan-950/60 rounded-lg border border-cyan-600/40 text-cyan-300">
                    <span className="block text-[10px]">Gate VGS Potenciómetro</span>
                    <span className="font-bold">{w4VgsPot.toFixed(2)} V</span>
                  </div>
                  <div className="p-2.5 bg-amber-950/60 rounded-lg border border-amber-600/40 text-amber-300">
                    <span className="block text-[10px]">Drain ID Resultante</span>
                    <span className="font-bold">{w4Data.idMA.toFixed(1)} mA</span>
                  </div>
                  <div className="p-2.5 bg-emerald-950/60 rounded-lg border border-emerald-600/40 text-emerald-300">
                    <span className="block text-[10px]">Voltaje VDS</span>
                    <span className="font-bold">{w4Data.vds.toFixed(2)} V</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 3: LIVE INTERACTIVE TINKERCAD SIMULATOR CONTROLS & METERS        */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            ⚡ Simulador Interactivo de Instrumentación Tinkercad en Tiempo Real
          </h4>
          <span className="text-xs text-slate-400 font-mono">Modo Interactivo Activo</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT CONTROL RACK (Adjusters & Inputs) */}
          <div className="lg:col-span-5 bg-slate-900/90 p-5 rounded-2xl border border-slate-800 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h5 className="text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                <Settings2 className="w-4 h-4 text-cyan-400" /> Panel de Ajustes y Perillas Tinkercad
              </h5>
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
                    <span className="text-slate-300 font-semibold">Fuente DC Variable Tinkercad (Vs):</span>
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
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Resistencia de Limitación (R1):</label>
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
                    <span className="text-slate-300 font-semibold">Fuente Base Tinkercad (VBB):</span>
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
                    <span className="text-slate-300 font-semibold">Fuente Colector Tinkercad (VCC):</span>
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
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Resistencia de Base (RB):</label>
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
                    <span className="text-slate-300 font-semibold">Potenciómetro de Compuerta (VGS):</span>
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
                    <span className="text-slate-300 font-semibold">Alimentación Drenador Tinkercad (VDD):</span>
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

          {/* RIGHT DISPLAY: LCD MULTIMETER RACK & SIMULATION READINGS */}
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
                      <span className="text-[10px] text-emerald-500/80 block uppercase">Voltímetro VD (Diodo)</span>
                      <span className="text-2xl font-extrabold text-emerald-400">{w2Data.vd.toFixed(3)} V</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-emerald-500/80 block uppercase">Amperímetro ID</span>
                      <span className="text-2xl font-extrabold text-cyan-400">{w2Data.idMA.toFixed(2)} mA</span>
                    </div>
                  </div>
                )}

                {weekId === 3 && (
                  <div className="grid grid-cols-3 gap-2 text-left">
                    <div>
                      <span className="text-[10px] text-emerald-500/80 block uppercase">Corriente Base IB</span>
                      <span className="text-lg font-bold text-amber-300">{w3Data.ibUA.toFixed(1)} µA</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-emerald-500/80 block uppercase">Corriente Colector IC</span>
                      <span className="text-lg font-bold text-cyan-300">{w3Data.icMA.toFixed(2)} mA</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-emerald-500/80 block uppercase">Voltaje VCE</span>
                      <span className="text-lg font-bold text-emerald-400">{w3Data.vce.toFixed(2)} V</span>
                    </div>
                  </div>
                )}

                {weekId === 4 && (
                  <div className="grid grid-cols-3 gap-2 text-left">
                    <div>
                      <span className="text-[10px] text-emerald-500/80 block uppercase">Entrada VGS</span>
                      <span className="text-lg font-bold text-cyan-300">{w4VgsPot.toFixed(2)} V</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-emerald-500/80 block uppercase">Corriente Drenador ID</span>
                      <span className="text-lg font-bold text-amber-300">{w4Data.idMA.toFixed(1)} mA</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-emerald-500/80 block uppercase">Voltaje VDS</span>
                      <span className="text-lg font-bold text-emerald-400">{w4Data.vds.toFixed(2)} V</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* SIMULATION RESULT SUMMARY FOOTER */}
            <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-300 font-semibold">Estado de la Simulación:</span>
                <span className="text-emerald-400 font-bold">
                  {weekId === 1 && 'Prueba de Multímetro Activa en Protoboard'}
                  {weekId === 2 && `Resistencia Dinámica rd ≈ ${isFinite(w2Data.rd) ? w2Data.rd.toFixed(1) + ' Ω' : 'Infinita'}`}
                  {weekId === 3 && (w3Data.isSat ? 'Saturación Completa (Switch ON)' : `Región Activa (hFE = ${w3Data.hfeMeasured.toFixed(0)})`)}
                  {weekId === 4 && `${w4Data.mode} (% Error Vth = ${w4ErrorPercent.toFixed(2)}%)`}
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
