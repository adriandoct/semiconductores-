import React, { useState, useMemo } from 'react';
import { Zap, AlertTriangle, CheckCircle } from 'lucide-react';

export default function MOSFETSimulator() {
  const [vgs, setVgs] = useState(4.5); // Gate-Source voltage
  const [vds, setVds] = useState(6.0); // Drain-Source voltage
  const [vth, setVth] = useState(3.0); // Threshold voltage
  const [kn, setKn] = useState(2.0); // Transconductance parameter A/V^2

  // Determine State
  const vOverdrive = vgs - vth; // V_GS - V_th

  const isCutoff = vgs <= vth;
  const isTriode = !isCutoff && vds < vOverdrive;
  const isSaturation = !isCutoff && vds >= vOverdrive;

  // Calculate Drain Current ID
  const idCurrent = useMemo(() => {
    if (isCutoff) return 0;
    if (isTriode) {
      return kn * (vOverdrive * vds - 0.5 * Math.pow(vds, 2));
    }
    // Saturation region
    return 0.5 * kn * Math.pow(vOverdrive, 2);
  }, [isCutoff, isTriode, kn, vOverdrive, vds]);

  const powermW = (vds * idCurrent) * 1000;

  // SVG Chart Dimensions
  const w = 450;
  const h = 260;
  const pad = 40;

  // Scale: VGS from 0 to 10V, ID from 0 to 40A
  const maxVgs = 10;
  const maxId = 40;

  // Generate Transfer Curve ID vs VGS at current VDS
  const transferPoints = useMemo(() => {
    const pts = [];
    for (let v = 0; v <= maxVgs; v += 0.2) {
      let current = 0;
      const vod = v - vth;
      if (v > vth) {
        if (vds < vod) {
          current = kn * (vod * vds - 0.5 * Math.pow(vds, 2));
        } else {
          current = 0.5 * kn * Math.pow(vod, 2);
        }
      }
      const x = pad + (v / maxVgs) * (w - 2 * pad);
      const clampI = Math.min(current, maxId);
      const y = (h - pad) - (clampI / maxId) * (h - 2 * pad);
      pts.push({ x, y });
    }
    return pts;
  }, [kn, vth, vds]);

  const pathD = transferPoints.reduce((acc, p, idx) => (idx === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`), '');

  // Current Point on SVG
  const curX = pad + (Math.min(vgs, maxVgs) / maxVgs) * (w - 2 * pad);
  const curY = (h - pad) - (Math.min(idCurrent, maxId) / maxId) * (h - 2 * pad);

  return (
    <div className="card glassmorphism p-6 rounded-2xl border border-emerald-500/20 shadow-xl bg-slate-900/80 text-white">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-slate-700/60 pb-4">
        <div>
          <h3 className="text-xl font-bold text-emerald-400 flex items-center gap-2">
            <Zap className="w-6 h-6 text-emerald-400 animate-pulse" />
            Simulador de Transistor MOSFET Canal N (IRF540)
          </h3>
          <p className="text-sm text-slate-400">
            Característica de transferencia $I_D$ vs $V_{GS}$ y zonas de Triodo / Saturación
          </p>
        </div>
        <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
          <span className="text-xs text-slate-400">Región Operativa:</span>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
            isCutoff ? 'bg-slate-700 text-slate-300' :
            isTriode ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' :
            'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
          }`}>
            {isCutoff ? 'Corte (VGS < Vth)' : isTriode ? 'Región Óhmica / Triodo' : 'Región de Saturación activa'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-5 bg-slate-800/40 p-4 rounded-xl border border-slate-700/50">
          {/* Slider: VGS */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <label className="text-slate-300 font-medium">Voltaje Compuerta-Surtidor (VGS):</label>
              <span className="text-emerald-400 font-mono font-bold">{vgs.toFixed(2)} V</span>
            </div>
            <input
              type="range"
              min="0"
              max="9.0"
              step="0.1"
              value={vgs}
              onChange={(e) => setVgs(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
          </div>

          {/* Slider: VDS */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <label className="text-slate-300 font-medium">Voltaje Drenador-Surtidor (VDS):</label>
              <span className="text-cyan-400 font-mono font-bold">{vds.toFixed(2)} V</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="12.0"
              step="0.2"
              value={vds}
              onChange={(e) => setVds(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>

          {/* Slider: Vth */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <label className="text-slate-300 font-medium">Voltaje de Umbral (Vth):</label>
              <span className="text-amber-400 font-mono font-bold">{vth.toFixed(1)} V</span>
            </div>
            <input
              type="range"
              min="1.5"
              max="5.0"
              step="0.1"
              value={vth}
              onChange={(e) => setVth(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
          </div>

          {/* Outputs */}
          <div className="pt-2 border-t border-slate-700/60 space-y-2">
            <div className="flex justify-between items-center text-sm p-2 rounded bg-slate-900/60">
              <span className="text-slate-400">Corriente Drenador ($I_D$):</span>
              <span className="font-mono text-emerald-400 font-bold text-base">
                {idCurrent.toFixed(2)} A
              </span>
            </div>

            <div className="flex justify-between items-center text-sm p-2 rounded bg-slate-900/60">
              <span className="text-slate-400">Voltaje Overdrive (VGS - Vth):</span>
              <span className="font-mono text-cyan-400 font-bold text-base">
                {vOverdrive > 0 ? `${vOverdrive.toFixed(2)} V` : '0 V (Canal sin formar)'}
              </span>
            </div>

            <div className="flex justify-between items-center text-xs p-2 rounded bg-slate-900/40 text-slate-400">
              <span>Potencia Disipada ($P_D$):</span>
              <span className="font-mono text-slate-300">{(powermW / 1000).toFixed(2)} W</span>
            </div>
          </div>
        </div>

        {/* Chart Column */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="text-xs text-slate-400 mb-2 flex justify-between items-center">
            <span className="font-semibold text-emerald-400">Curva de Transferencia ID vs VGS</span>
            <span className="text-[11px] text-slate-500">Umbral $V_{th} = {vth}V$</span>
          </div>

          <div className="w-full overflow-hidden flex justify-center items-center">
            <svg viewBox="0 0 450 260" className="w-full h-auto max-h-[300px]">
              {/* Grid */}
              {[0, 10, 20, 30, 40].map((val) => {
                const y = (h - pad) - (val / maxId) * (h - 2 * pad);
                return (
                  <g key={`y-${val}`}>
                    <line x1="40" y1={y} x2="410" y2={y} stroke="#334155" strokeDasharray="3 3" strokeWidth="1" />
                    <text x="32" y={y + 4} fill="#64748b" fontSize="10" textAnchor="end">{val}A</text>
                  </g>
                );
              })}

              {[0, 2, 4, 6, 8, 10].map((v) => {
                const x = pad + (v / maxVgs) * (w - 2 * pad);
                return (
                  <g key={`x-${v}`}>
                    <line x1={x} y1="20" x2={x} y2="220" stroke="#334155" strokeDasharray="3 3" strokeWidth="1" />
                    <text x={x} y="238" fill="#64748b" fontSize="10" textAnchor="middle">{v}V</text>
                  </g>
                );
              })}

              {/* Axes */}
              <line x1="40" y1="220" x2="415" y2="220" stroke="#94a3b8" strokeWidth="2" />
              <line x1="40" y1="20" x2="40" y2="220" stroke="#94a3b8" strokeWidth="2" />

              {/* Transfer Curve */}
              <path d={pathD} fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />

              {/* Threshold Marker */}
              {vth <= maxVgs && (
                <g>
                  {(() => {
                    const vx = pad + (vth / maxVgs) * (w - 2 * pad);
                    return (
                      <>
                        <line x1={vx} y1="20" x2={vx} y2="220" stroke="#f59e0b" strokeDasharray="2 2" strokeWidth="1.5" />
                        <text x={vx} y="15" fill="#f59e0b" fontSize="10" textAnchor="middle" fontWeight="bold">Vth</text>
                      </>
                    );
                  })()}
                </g>
              )}

              {/* Operating Point */}
              {vgs <= maxVgs && (
                <g>
                  <circle cx={curX} cy={curY} r="7" fill="#38bdf8" className="animate-ping opacity-75" />
                  <circle cx={curX} cy={curY} r="5" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
                </g>
              )}
            </svg>
          </div>

          <div className="mt-3 bg-slate-900/90 p-3 rounded-lg border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              <strong>Diferencia clave con BJT:</strong> El MOSFET es un dispositivo controlado por **voltaje** ($V_{GS}$) a través de un aislante de óxido de silicio con corriente de compuerta $I_G \approx 0$.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
