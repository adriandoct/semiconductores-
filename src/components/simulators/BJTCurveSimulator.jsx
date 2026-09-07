import React, { useState, useMemo } from 'react';
import { Cpu, Sliders, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function BJTCurveSimulator() {
  const [iBaseMicro, setIBaseMicro] = useState(30); // uA
  const [vcc, setVcc] = useState(12); // Volts
  const [rc, setRc] = useState(1000); // Ohms
  const [betaNominal, setBetaNominal] = useState(150); // hFE

  // Calculated Parameters
  const iBase = iBaseMicro * 1e-6; // Amperes

  // Maximum possible saturation collector current I_C(sat)
  const vceSat = 0.2; // Volts
  const iCollectorSat = (vcc - vceSat) / rc; // Amperes

  // Active region theoretical IC
  const iCollectorActive = betaNominal * iBase;

  // Determine actual Operating Point (Q-Point)
  const isSaturation = iCollectorActive >= iCollectorSat;
  const isCutoff = iBaseMicro <= 0.5;

  const iCollectorQ = isCutoff 
    ? 0 
    : isSaturation 
    ? iCollectorSat 
    : iCollectorActive;

  const vceQ = isCutoff 
    ? vcc 
    : isSaturation 
    ? vceSat 
    : vcc - iCollectorQ * rc;

  const powerDissipationmW = (vceQ * iCollectorQ) * 1000;

  // Effective hFE
  const effectiveHfe = iBaseMicro > 0 ? (iCollectorQ * 1e6) / iBaseMicro : 0;

  // Draw Load Line and Family Curves
  const chartWidth = 450;
  const chartHeight = 260;
  const pad = 40;

  // Max scale values for chart: VCE max = 15V, IC max = 25mA
  const maxVceScale = 15;
  const maxIcScale = 25; // mA

  // Load line endpoints: (0, VCC / RC) and (VCC, 0)
  const loadLineX1 = pad + (0 / maxVceScale) * (chartWidth - 2 * pad);
  const loadLineY1 = (chartHeight - pad) - Math.min((vcc / rc) * 1000 / maxIcScale, 1) * (chartHeight - 2 * pad);

  const loadLineX2 = pad + Math.min(vcc / maxVceScale, 1) * (chartWidth - 2 * pad);
  const loadLineY2 = chartHeight - pad;

  // Q-Point coords on SVG
  const qPointX = pad + (Math.min(vceQ, maxVceScale) / maxVceScale) * (chartWidth - 2 * pad);
  const qPointY = (chartHeight - pad) - (Math.min(iCollectorQ * 1000, maxIcScale) / maxIcScale) * (chartHeight - 2 * pad);

  // Generate Family Curves for IB = 10, 20, 30, 40, 50 uA
  const familyCurves = [10, 20, 30, 40, 50].map((ibMicro) => {
    const ib = ibMicro * 1e-6;
    const icActivemA = (betaNominal * ib) * 1000;
    const pts = [];

    for (let v = 0; v <= maxVceScale; v += 0.5) {
      // Saturation slope below VceSat (0.2V), then flat active region
      let icmA;
      if (v < 0.2) {
        icmA = (v / 0.2) * icActivemA;
      } else {
        // Small Early effect slope for realism
        icmA = icActivemA * (1 + (v - 0.2) / 100);
      }
      const x = pad + (v / maxVceScale) * (chartWidth - 2 * pad);
      const y = (chartHeight - pad) - Math.min(icmA / maxIcScale, 1) * (chartHeight - 2 * pad);
      pts.push({ x, y, v, icmA });
    }

    const d = pts.reduce((acc, p, idx) => (idx === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`), '');
    return { ibMicro, d, isSelected: Math.abs(ibMicro - iBaseMicro) < 5 };
  });

  return (
    <div className="card glassmorphism p-6 rounded-2xl border border-violet-500/20 shadow-xl bg-slate-900/80 text-white">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-slate-700/60 pb-4">
        <div>
          <h3 className="text-xl font-bold text-violet-400 flex items-center gap-2">
            <Cpu className="w-6 h-6 text-violet-400 animate-pulse" />
            Simulador del Transistor BJT en Emisor Común (hFE)
          </h3>
          <p className="text-sm text-slate-400">
            Visualización del punto de operación Q (VCEQ, ICQ) y recta de carga DC
          </p>
        </div>
        <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
          <span className="text-xs text-slate-400">Región de Trabajo:</span>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
            isCutoff ? 'bg-slate-700 text-slate-300' :
            isSaturation ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' :
            'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
          }`}>
            {isCutoff ? 'Corte (Switch OFF)' : isSaturation ? 'Saturación (Switch ON)' : 'Región Activa Lineal'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-5 bg-slate-800/40 p-4 rounded-xl border border-slate-700/50">
          {/* Slider: IB */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <label className="text-slate-300 font-medium">Corriente de Base ($I_B$):</label>
              <span className="text-violet-400 font-mono font-bold">{iBaseMicro} µA</span>
            </div>
            <input
              type="range"
              min="0"
              max="60"
              step="1"
              value={iBaseMicro}
              onChange={(e) => setIBaseMicro(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-violet-400"
            />
          </div>

          {/* Slider: VCC */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <label className="text-slate-300 font-medium">Fuente VCC:</label>
              <span className="text-cyan-400 font-mono font-bold">{vcc} V</span>
            </div>
            <input
              type="range"
              min="3"
              max="15"
              step="0.5"
              value={vcc}
              onChange={(e) => setVcc(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
          </div>

          {/* Slider: RC */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <label className="text-slate-300 font-medium">Resistencia Colector ($R_C$):</label>
              <span className="text-emerald-400 font-mono font-bold">{rc} Ω</span>
            </div>
            <input
              type="range"
              min="330"
              max="3300"
              step="50"
              value={rc}
              onChange={(e) => setRc(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
          </div>

          {/* Slider: Nominal Gain hFE */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <label className="text-slate-300 font-medium">Ganancia Nominal (hFE):</label>
              <span className="text-amber-400 font-mono font-bold">{betaNominal}</span>
            </div>
            <input
              type="range"
              min="50"
              max="350"
              step="10"
              value={betaNominal}
              onChange={(e) => setBetaNominal(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
          </div>

          {/* Measurements Output */}
          <div className="pt-2 border-t border-slate-700/60 space-y-2">
            <div className="flex justify-between items-center text-sm p-2 rounded bg-slate-900/60">
              <span className="text-slate-400">Corriente Colector (ICQ):</span>
              <span className="font-mono text-emerald-400 font-bold text-base">
                {(iCollectorQ * 1000).toFixed(2)} mA
              </span>
            </div>

            <div className="flex justify-between items-center text-sm p-2 rounded bg-slate-900/60">
              <span className="text-slate-400">Voltaje Colector-Emisor (VCEQ):</span>
              <span className="font-mono text-cyan-400 font-bold text-base">
                {vceQ.toFixed(2)} V
              </span>
            </div>

            <div className="flex justify-between items-center text-sm p-2 rounded bg-slate-900/60">
              <span className="text-slate-400">Ganancia Efectiva (hFE):</span>
              <span className="font-mono text-amber-300 font-bold text-base">
                {effectiveHfe.toFixed(1)}
              </span>
            </div>

            <div className="flex justify-between items-center text-xs p-2 rounded bg-slate-900/40 text-slate-400">
              <span>Potencia Disipada ($P_D$):</span>
              <span className={`font-mono font-bold ${powerDissipationmW > 500 ? 'text-red-400' : 'text-slate-300'}`}>
                {powerDissipationmW.toFixed(1)} mW {powerDissipationmW > 500 && '(¡Atención límite!)'}
              </span>
            </div>
          </div>
        </div>

        {/* SVG Chart Column */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-slate-950 p-4 rounded-xl border border-slate-800">
          <div className="text-xs text-slate-400 mb-2 flex justify-between items-center">
            <span className="font-semibold text-violet-400">Familia de Curvas $I_C$ vs $V_{CE}$ & Recta de Carga</span>
            <span className="text-[11px] text-slate-500">Punto Q (Pulsante en Amarillo)</span>
          </div>

          <div className="w-full overflow-hidden flex justify-center items-center">
            <svg viewBox="0 0 450 260" className="w-full h-auto max-h-[300px]">
              {/* Grid Lines */}
              {[0, 5, 10, 15, 20, 25].map((val) => {
                const y = (260 - 40) - (val / 25) * (260 - 80);
                return (
                  <g key={`y-${val}`}>
                    <line x1="40" y1={y} x2="410" y2={y} stroke="#334155" strokeDasharray="3 3" strokeWidth="1" />
                    <text x="32" y={y + 4} fill="#64748b" fontSize="10" textAnchor="end">{val}mA</text>
                  </g>
                );
              })}

              {[0, 3, 6, 9, 12, 15].map((v) => {
                const x = 40 + (v / 15) * (450 - 80);
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

              {/* Family Curves */}
              {familyCurves.map((curve) => (
                <path
                  key={`fc-${curve.ibMicro}`}
                  d={curve.d}
                  fill="none"
                  stroke={curve.isSelected ? "#a855f7" : "#475569"}
                  strokeWidth={curve.isSelected ? "2.5" : "1.2"}
                />
              ))}

              {/* Load Line DC */}
              <line
                x1={loadLineX1}
                y1={loadLineY1}
                x2={loadLineX2}
                y2={loadLineY2}
                stroke="#10b981"
                strokeWidth="2.5"
              />

              {/* Q-Point */}
              <g>
                <circle cx={qPointX} cy={qPointY} r="7" fill="#f59e0b" className="animate-ping opacity-75" />
                <circle cx={qPointX} cy={qPointY} r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
                <text x={qPointX + 10} y={qPointY - 8} fill="#f59e0b" fontSize="11" fontWeight="bold">
                  Q ({vceQ.toFixed(1)}V, {(iCollectorQ * 1000).toFixed(1)}mA)
                </text>
              </g>
            </svg>
          </div>

          <div className="mt-3 bg-slate-900/90 p-3 rounded-lg border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
            <Sliders className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
            <span>
              <strong>Fórmula Clave:</strong> En la región activa $I_C = h_{FE} \cdot I_B$. Si $I_B \cdot h_{FE} &gt; I_{C(sat)}$, el transistor se satura y $V_{CE}$ cae a $\sim 0.2\text{V}$.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
