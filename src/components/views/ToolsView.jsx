import React, { useState } from 'react';
import DiodeIVSimulator from '../simulators/DiodeIVSimulator';
import BJTCurveSimulator from '../simulators/BJTCurveSimulator';
import MOSFETSimulator from '../simulators/MOSFETSimulator';
import OscilloscopeSimulator from '../simulators/OscilloscopeSimulator';
import TinkercadCircuitSimulator from '../simulators/TinkercadCircuitSimulator';
import PinoutInspector from '../pinouts/PinoutInspector';
import { Activity, Cpu, Zap, Eye, Calculator, Radio, Monitor, Tv } from 'lucide-react';

export default function ToolsView({ onOpenVideoModal }) {
  const [selectedTool, setSelectedTool] = useState('tinkercad'); // 'tinkercad' | 'diode' | 'oscilloscope' | 'bjt' | 'mosfet' | 'pinout'
  const [tinkercadWeek, setTinkercadWeek] = useState(1);

  return (
    <div className="space-y-6">
      {/* Tool Selector Bar */}
      <div className="glassmorphism-card p-5 rounded-3xl border border-cyan-500/30 bg-slate-900/90 text-white flex flex-wrap items-center justify-between gap-4 shadow-2xl">
        <div className="flex items-center justify-between w-full sm:w-auto gap-4">
          <div>
            <h2 className="text-xl font-black text-white flex items-center gap-2 font-heading">
              <Calculator className="w-6 h-6 text-cyan-400" />
              Laboratorio Virtual & Workbench de Caracterización
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Simulación interactiva de parámetros físicos y análisis de semiconductores en tiempo real
            </p>
          </div>

          <button
            onClick={() => onOpenVideoModal && onOpenVideoModal()}
            className="px-3.5 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm shrink-0"
          >
            <Tv className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>Videoteca 🎬</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTool('tinkercad')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              selectedTool === 'tinkercad'
                ? 'bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/25 border border-cyan-300'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700'
            }`}
          >
            <Monitor className="w-4 h-4 text-cyan-950" /> Tinkercad Circuits
          </button>

          <button
            onClick={() => setSelectedTool('diode')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              selectedTool === 'diode'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg shadow-cyan-500/25 border border-cyan-400/40'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700'
            }`}
          >
            <Activity className="w-4 h-4 text-cyan-300" /> Diodo I-V
          </button>

          <button
            onClick={() => setSelectedTool('oscilloscope')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              selectedTool === 'oscilloscope'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-lg shadow-emerald-500/25 border border-emerald-400/40'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700'
            }`}
          >
            <Radio className="w-4 h-4 text-emerald-300" /> Osciloscopio & AC
          </button>

          <button
            onClick={() => setSelectedTool('bjt')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              selectedTool === 'bjt'
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25 border border-violet-400/40'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700'
            }`}
          >
            <Cpu className="w-4 h-4 text-violet-300" /> BJT (hFE)
          </button>

          <button
            onClick={() => setSelectedTool('mosfet')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              selectedTool === 'mosfet'
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 shadow-lg shadow-amber-500/25 border border-amber-400/40'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-300" /> MOSFET (VGS)
          </button>

          <button
            onClick={() => setSelectedTool('pinout')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              selectedTool === 'pinout'
                ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg shadow-pink-500/25 border border-pink-400/40'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700'
            }`}
          >
            <Eye className="w-4 h-4 text-pink-300" /> Pinouts & Multímetro
          </button>
        </div>
      </div>

      {/* Render Active Tool */}
      <div>
        {selectedTool === 'tinkercad' && (
          <div className="space-y-4">
            <div className="flex gap-2 bg-slate-900 p-2 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-slate-400 self-center px-2">Seleccionar Circuito Tinkercad:</span>
              {[1, 2, 3, 4].map((w) => (
                <button
                  key={w}
                  onClick={() => setTinkercadWeek(w)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    tinkercadWeek === w
                      ? 'bg-cyan-500 text-slate-950'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Semana {w}
                </button>
              ))}
            </div>
            <TinkercadCircuitSimulator weekId={tinkercadWeek} />
          </div>
        )}
        {selectedTool === 'diode' && <DiodeIVSimulator />}
        {selectedTool === 'oscilloscope' && <OscilloscopeSimulator />}
        {selectedTool === 'bjt' && <BJTCurveSimulator />}
        {selectedTool === 'mosfet' && <MOSFETSimulator />}
        {selectedTool === 'pinout' && <PinoutInspector />}
      </div>
    </div>
  );
}
