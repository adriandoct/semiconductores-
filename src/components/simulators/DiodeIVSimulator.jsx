import React, { useState, useMemo } from 'react';
import { Activity, Flame, Zap, RefreshCw, AlertCircle } from 'lucide-react';

export default function DiodeIVSimulator() {
  const [vDiode, setVDiode] = useState(0.68); // Volts
  const [tempC, setTempC] = useState(25); // Celsius
  const [isNanoA, setIsNanoA] = useState(1); // nA base saturation current

  // Constants
  const eta = 1.2; // Idealization factor
  const k = 1.380649e-23;
  const q = 1.602176634e-19;

  // Temperature dependent calculations
  const tempK = tempC + 273.15;
  const vThermal = (k * tempK) / q; // Volts (~0.02585 V at 25C)
  
  // Saturation current scales with temperature (doubles every ~10 deg C)
  const baseIs = isNanoA * 1e-9;
  const iSat = baseIs * Math.pow(2, (tempC - 25) / 10);

  // Calculate current I_D using Shockley Equation
  const iDiode = useMemo(() => {
    if (vDiode <= -5) return -iSat;
    const expTerm = Math.exp(vDiode / (eta * vThermal));
    return iSat * (expTerm - 1);
  }, [vDiode, eta, vThermal, iSat]);

  // Dynamic resistance r_d = (eta * V_T) / I_D
  const dynamicResistance = useMemo(() => {
    if (iDiode <= 1e-6) return Infinity;
    return (eta * vThermal) / iDiode;
  }, [eta, vThermal, iDiode]);

  // Generate points for I-V curve SVG
  const curvePoints = useMemo(() => {
    const points = [];
    const width = 450;
    const height = 260;
    const padding = 40;

    // Voltage scale: 0V to 0.9V mapped to X (padding to width - padding)
    // Current scale: 0mA to 20mA mapped to Y (height - padding to padding)
    for (let v = 0; v <= 0.9; v += 0.01) {
      const expVal = Math.exp(v / (eta * vThermal));
      const currentA = iSat * (expVal - 1);
      const currentMA = currentA * 1000;

      const x = padding + (v / 0.9) * (width - 2 * padding);
      const clampI = Math.min(currentMA, 20); // Clamp to 20mA for chart
      const y = (height - padding) - (clampI / 20) * (height - 2 * padding);

      points.push({ v, iMA: currentMA, x, y });
    }
    return points;
  }, [eta, vThermal, iSat]);

  // Current operational point coordinates
  const currentMA = iDiode * 1000;
  const clampedMA = Math.min(Math.max(currentMA, 0), 20);
  const pointX = 40 + (Math.min(vDiode, 0.9) / 0.9) * (450 - 80);
  const pointY = (260 - 40) - (clampedMA / 20) * (260 - 80);

  const pathD = curvePoints.reduce((acc, p, idx) => {
    return idx === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  return (
    <div className="card glassmorphism p-6 rounded-2xl border border-cyan-500/20 shadow-xl bg-slate-900/80 text-white">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-slate-700/60 pb-4">
        <div>
          <h3 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
            <Activity className="w-6 h-6 text-cyan-400 animate-pulse" />
            Simulador de Curva Característica I-V del Diodo
          </h3>
          <p className="text-sm text-slate-400">
            Modelación de Ecuación de Shockley y cálculo de resistencia dinámica en tiempo real
          </p>
        </div>
        <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
          <span className="text-xs text-slate-400">Estado:</span>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
            currentMA > 1 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' :
            currentMA > 0.05 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' :
            'bg-slate-700 text-slate-300'
          }`}>
            {currentMA > 1 ? 'Conducción Directa Active' : currentMA > 0.05 ? 'Zona Umbral (Knee)' : 'Bloqueo (Off)'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Controls Column */}
        <div className="lg:col-span-5 space-y-5 bg-slate-800/40 p-4 rounded-xl border border-slate-700/50">
          {/* Slider 1: VD */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <label className="text-slate-300 font-medium flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" /> Voltaje Diodo ($V_D$):
              </label>
              <span className="text-cyan-400 font-mono font-bold">{vDiode.toFixed(3)} V</span>
            </div>
            <input
              type="range"
              min="0.0"
              max="0.85"
              step="0.005"
              value={vDiode}
              onChange={(e) => setVDiode(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1">
              <span>0.0V</span>
              <span>0.5V (Knee)</span>
              <span>0.85V</span>
            </div>
          </div>

          {/* Slider 2: Temperature */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <label className="text-slate-300 font-medium flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-red-400" /> Temperatura ($T$):
              </label>
              <span className="text-red-400 font-mono font-bold">{tempC} °C</span>
            </div>
            <input
              type="range"
              min="0"
              max="80"
              step="1"
              value={tempC}
              onChange={(e) => setTempC(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-red-400"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1">
              <span>0°C (Frío)</span>
              <span>25°C (Ambiente)</span>
              <span>80°C (Caliente)</span>
            </div>
          </div>

          {/* Slider 3: Saturation Current IS */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <label className="text-slate-300 font-medium flex items-center gap-1.5">
                <RefreshCw className="w-4 h-4 text-emerald-400" /> Corriente $I_S$ a 25°C:
              </label>
              <span className="text-emerald-400 font-mono font-bold">{isNanoA} nA</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="10"
              step="0.1"
              value={isNanoA}
              onChange={(e) => setIsNanoA(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
          </div>

          {/* Calculated Output Specs */}
          <div className="pt-2 border-t border-slate-700/60 space-y-2">
            <div className="flex justify-between items-center text-sm p-2 rounded bg-slate-900/60">
              <span className="text-slate-400">Corriente Diodo ($I_D$):</span>
              <span className="font-mono text-emerald-400 font-bold text-base">
                {currentMA >= 1000 
                  ? `${(currentMA / 1000).toFixed(3)} A` 
                  : `${currentMA.toFixed(3)} mA`}
              </span>
            </div>

            <div className="flex justify-between items-center text-sm p-2 rounded bg-slate-900/60">
              <span className="text-slate-400">Resistencia Dinámica ($r_d$):</span>
              <span className="font-mono text-cyan-300 font-bold text-base">
                {dynamicResistance === Infinity
                  ? '∞ Ω'
                  : dynamicResistance < 1000
                  ? `${dynamicResistance.toFixed(2)} Ω`
                  : `${(dynamicResistance / 1000).toFixed(2)} kΩ`}
              </span>
            </div>

            <div className="flex justify-between items-center text-xs p-2 rounded bg-slate-900/40 text-slate-400">
              <span>Voltaje Térmico ($V_T$):</span>
              <span className="font-mono text-slate-300">{(vThermal * 1000).toFixed(2)} mV</span>
            </div>
          </div>
        </div>

        {/* Right SVG Chart Column */}
        <div className="lg:col-span-7 flex flex-col justify-between bg-slate-950 p-4 rounded-xl border border-slate-800 relative">
          <div className="text-xs text-slate-400 mb-2 flex justify-between items-center">
            <span className="font-semibold text-cyan-400">Gráfica I_D vs V_D (Escala 0-20mA)</span>
            <span className="text-[11px] text-slate-500">Curva Exponencial Shockley</span>
          </div>

          <div className="w-full overflow-hidden flex justify-center items-center">
            <svg viewBox="0 0 450 260" className="w-full h-auto max-h-[300px]">
              {/* Grid Lines */}
              {[0, 5, 10, 15, 20].map((val) => {
                const y = (260 - 40) - (val / 20) * (260 - 80);
                return (
                  <g key={`y-${val}`}>
                    <line x1="40" y1={y} x2="410" y2={y} stroke="#334155" strokeDasharray="3 3" strokeWidth="1" />
                    <text x="32" y={y + 4} fill="#64748b" fontSize="10" textAnchor="end">{val}mA</text>
                  </g>
                );
              })}

              {[0, 0.2, 0.4, 0.6, 0.7, 0.8].map((v) => {
                const x = 40 + (v / 0.9) * (450 - 80);
                return (
                  <g key={`x-${v}`}>
                    <line x1={x} y1="20" x2={x} y2="220" stroke="#334155" strokeDasharray="3 3" strokeWidth="1" />
                    <text x={x} y="238" fill="#64748b" fontSize="10" textAnchor="middle">{v}V</text>
                  </g>
                );
              })}

              {/* Main Axes */}
              <line x1="40" y1="220" x2="415" y2="220" stroke="#94a3b8" strokeWidth="2" />
              <line x1="40" y1="20" x2="40" y2="220" stroke="#94a3b8" strokeWidth="2" />

              {/* Curve Line */}
              <path d={pathD} fill="none" stroke="#06b6d4" strokeWidth="3" strokeLinecap="round" />

              {/* Operating Point Indicator */}
              {vDiode <= 0.9 && (
                <g>
                  {/* Vertical & Horizontal Projection lines */}
                  <line x1={pointX} y1="220" x2={pointX} y2={pointY} stroke="#f59e0b" strokeDasharray="4 4" strokeWidth="1.5" />
                  <line x1="40" y1={pointY} x2={pointX} y2={pointY} stroke="#f59e0b" strokeDasharray="4 4" strokeWidth="1.5" />

                  {/* Pulsing Point Marker */}
                  <circle cx={pointX} cy={pointY} r="7" fill="#f59e0b" className="animate-ping opacity-75" />
                  <circle cx={pointX} cy={pointY} r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
                </g>
              )}
            </svg>
          </div>

          <div className="mt-3 bg-slate-900/90 p-3 rounded-lg border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <span>
              <strong>Observación pedagógica:</strong> Al elevar la temperatura ($T$), el voltaje térmico $V_T$ incrementa y la corriente $I_S$ aumenta exponencialmente, desplazando el codo de la curva hacia la izquierda.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
