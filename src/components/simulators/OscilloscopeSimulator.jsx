import React, { useState, useMemo } from 'react';
import { Radio, Sliders, Activity, Zap, CheckCircle2, Shield } from 'lucide-react';

export default function OscilloscopeSimulator() {
  const [peakVoltage, setPeakVoltage] = useState(12); // Volts peak (Vp)
  const [rectifierMode, setRectifierMode] = useState('fullwave'); // 'ac' | 'halfwave' | 'fullwave' | 'filtered'
  const [filterCapacitance, setFilterCapacitance] = useState(100); // uF microfarads

  // Constants
  const diodeDrop = 0.7; // Volts for 1N4007

  // Calculated Output Electrical Metrics
  const metrics = useMemo(() => {
    const vRMS = peakVoltage / Math.sqrt(2); // V_rms for AC

    if (rectifierMode === 'ac') {
      return { vRMS: vRMS.toFixed(2), vDC: '0.00', vPeakOut: peakVoltage.toFixed(2), ripple: '100 %' };
    }
    if (rectifierMode === 'halfwave') {
      const vPeakOut = Math.max(peakVoltage - diodeDrop, 0);
      const vDC = vPeakOut / Math.PI;
      return { vRMS: (vPeakOut / 2).toFixed(2), vDC: vDC.toFixed(2), vPeakOut: vPeakOut.toFixed(2), ripple: '121 %' };
    }
    if (rectifierMode === 'fullwave') {
      const vPeakOut = Math.max(peakVoltage - 2 * diodeDrop, 0);
      const vDC = (2 * vPeakOut) / Math.PI;
      return { vRMS: (vPeakOut / Math.sqrt(2)).toFixed(2), vDC: vDC.toFixed(2), vPeakOut: vPeakOut.toFixed(2), ripple: '48 %' };
    }
    // Filtered with Capacitor
    const vPeakOut = Math.max(peakVoltage - 2 * diodeDrop, 0);
    // V_ripple approx = I / (2 * f * C)
    const loadResistance = 1000; // 1k ohm
    const f = 60; // 60 Hz
    const rippleV = (vPeakOut / (2 * f * loadResistance * (filterCapacitance * 1e-6)));
    const clampRipple = Math.min(rippleV, vPeakOut * 0.8);
    const vDC = vPeakOut - (clampRipple / 2);

    return {
      vRMS: (vPeakOut / Math.sqrt(2)).toFixed(2),
      vDC: Math.max(vDC, 0).toFixed(2),
      vPeakOut: vPeakOut.toFixed(2),
      ripple: `${((clampRipple / vDC) * 100).toFixed(1)} %`
    };
  }, [peakVoltage, rectifierMode, filterCapacitance]);

  // Generate SVG Waveform Points
  const waveformPoints = useMemo(() => {
    const pts = [];
    const w = 450;
    const h = 240;
    const pad = 30;
    const centerY = h / 2;

    const scaleY = (h - 2 * pad) / (2 * 25); // Scale for max 25V

    for (let x = pad; x <= w - pad; x += 2) {
      // Map x to angle (3 full sine cycles across width)
      const angle = ((x - pad) / (w - 2 * pad)) * (6 * Math.PI);
      const rawSine = Math.sin(angle) * peakVoltage;
      let outV = rawSine;

      if (rectifierMode === 'halfwave') {
        outV = rawSine > diodeDrop ? rawSine - diodeDrop : 0;
      } else if (rectifierMode === 'fullwave') {
        const absSine = Math.abs(rawSine);
        outV = absSine > 2 * diodeDrop ? absSine - 2 * diodeDrop : 0;
      } else if (rectifierMode === 'filtered') {
        const absSine = Math.abs(rawSine);
        const peakOut = Math.max(peakVoltage - 2 * diodeDrop, 0);
        const f = 60;
        const R = 1000;
        const C = filterCapacitance * 1e-6;
        const rippleV = peakOut / (2 * f * R * C);
        const minV = Math.max(peakOut - rippleV, 0);

        // Exponential discharge approximation
        const phase = angle % Math.PI;
        if (phase < Math.PI / 3) {
          outV = Math.max(absSine - 2 * diodeDrop, minV);
        } else {
          outV = minV + (peakOut - minV) * Math.exp(-phase / 2);
        }
      }

      const y = centerY - outV * scaleY;
      pts.push({ x, y });
    }

    return pts.reduce((acc, p, idx) => (idx === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`), '');
  }, [peakVoltage, rectifierMode, filterCapacitance]);

  return (
    <div className="card glassmorphism-card p-6 rounded-3xl border border-cyan-500/30 shadow-2xl bg-slate-900/90 text-white space-y-6">
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-xl font-black text-white flex items-center gap-2 font-heading">
            <Radio className="w-6 h-6 text-cyan-400 animate-pulse" />
            Osciloscopio & Rectificación de Onda Completa (1N4007)
          </h3>
          <p className="text-xs text-slate-400">
            Simulación de rectificador de puente de diodos, filtrado capacitivo y forma de onda en tiempo real
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 p-2 rounded-xl border border-slate-800">
          <span className="text-xs text-slate-400 font-bold">Modo Seleccionado:</span>
          <span className="text-xs font-mono font-bold text-cyan-300 uppercase bg-cyan-500/20 px-2 py-0.5 rounded border border-cyan-500/40">
            {rectifierMode}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Controls */}
        <div className="lg:col-span-5 space-y-5 bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
          {/* Mode Selector */}
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-2 font-heading">
              Seleccionar Circuito Rectificador:
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => setRectifierMode('ac')}
                className={`p-2.5 rounded-xl font-bold transition-all border text-left ${
                  rectifierMode === 'ac'
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                1. Entrada AC Pura
              </button>

              <button
                onClick={() => setRectifierMode('halfwave')}
                className={`p-2.5 rounded-xl font-bold transition-all border text-left ${
                  rectifierMode === 'halfwave'
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                2. Media Onda (1 Diodo)
              </button>

              <button
                onClick={() => setRectifierMode('fullwave')}
                className={`p-2.5 rounded-xl font-bold transition-all border text-left ${
                  rectifierMode === 'fullwave'
                    ? 'bg-violet-500/20 border-violet-400 text-violet-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                3. Puente Completo (4 Diodos)
              </button>

              <button
                onClick={() => setRectifierMode('filtered')}
                className={`p-2.5 rounded-xl font-bold transition-all border text-left ${
                  rectifierMode === 'filtered'
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                4. Filtrado Capacitivo (DC)
              </button>
            </div>
          </div>

          {/* Slider 1: Peak Voltage */}
          <div>
            <div className="flex justify-between text-xs mb-1 font-semibold">
              <span className="text-slate-300">Voltaje Pico de Entrada ($V_p$):</span>
              <span className="text-cyan-400 font-mono font-bold">{peakVoltage} Vp</span>
            </div>
            <input
              type="range"
              min="5"
              max="24"
              step="1"
              value={peakVoltage}
              onChange={(e) => setPeakVoltage(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>

          {/* Slider 2: Capacitance (Only visible in filtered mode) */}
          {rectifierMode === 'filtered' && (
            <div className="animate-in fade-in duration-200">
              <div className="flex justify-between text-xs mb-1 font-semibold">
                <span className="text-slate-300">Capacitor de Filtro ($C$):</span>
                <span className="text-emerald-400 font-mono font-bold">{filterCapacitance} µF</span>
              </div>
              <input
                type="range"
                min="10"
                max="470"
                step="10"
                value={filterCapacitance}
                onChange={(e) => setFilterCapacitance(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
            </div>
          )}

          {/* Calculated Output Metrics */}
          <div className="pt-3 border-t border-slate-800 space-y-2 text-xs font-mono">
            <div className="flex justify-between items-center p-2 rounded-lg bg-slate-900">
              <span className="text-slate-400 font-sans">Voltaje Continuo DC ($V_{dc}$):</span>
              <span className="text-emerald-400 font-bold text-sm">{metrics.vDC} V</span>
            </div>

            <div className="flex justify-between items-center p-2 rounded-lg bg-slate-900">
              <span className="text-slate-400 font-sans">Voltaje Eficaz RMS ($V_{rms}$):</span>
              <span className="text-cyan-400 font-bold">{metrics.vRMS} V</span>
            </div>

            <div className="flex justify-between items-center p-2 rounded-lg bg-slate-900">
              <span className="text-slate-400 font-sans">Factor de Rizado (Ripple):</span>
              <span className="text-amber-400 font-bold">{metrics.ripple}</span>
            </div>
          </div>
        </div>

        {/* Right Cathode Ray SVG Screen */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-slate-950 p-4 rounded-2xl border border-slate-800 relative">
          <div className="text-xs text-slate-400 mb-2 flex justify-between items-center font-mono">
            <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              Osciloscopio Canal A (CH1) — CRT 60Hz
            </span>
            <span className="text-[11px] text-slate-500">2V / Div — 5ms / Div</span>
          </div>

          {/* SVG Cathode Grid */}
          <div className="w-full overflow-hidden flex justify-center items-center rounded-xl border border-emerald-500/30 bg-slate-950 shadow-[inset_0_0_30px_rgba(16,185,129,0.15)]">
            <svg viewBox="0 0 450 240" className="w-full h-auto">
              {/* Cathode Ray Green Grid Lines */}
              {[30, 60, 90, 120, 150, 180, 210].map((y) => (
                <line key={`grid-y-${y}`} x1="30" y1={y} x2="420" y2={y} stroke="#064e3b" strokeDasharray="2 2" strokeWidth="1" />
              ))}

              {[30, 95, 160, 225, 290, 355, 420].map((x) => (
                <line key={`grid-x-${x}`} x1={x} y1="30" x2={x} y2="210" stroke="#064e3b" strokeDasharray="2 2" strokeWidth="1" />
              ))}

              {/* Zero Volt Axis Line */}
              <line x1="30" y1="120" x2="420" y2="120" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" />
              <text x="35" y="115" fill="#10b981" fontSize="10" fontWeight="bold">0V GND</text>

              {/* Waveform Line */}
              <path
                d={waveformPoints}
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
                strokeLinecap="round"
                style={{ filter: 'drop-shadow(0 0 8px #10b981)' }}
              />
            </svg>
          </div>

          <div className="mt-3 bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
            <Zap className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span>
              <strong>Observación pedagógica:</strong> El puente de 4 diodos 1N4007 invierte los semiciclos negativos a positivos. El capacitor almacena energía durante los picos y la entrega a la carga durante los valles, aplanando la tensión DC.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
