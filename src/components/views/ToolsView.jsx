import React, { useState } from 'react';
import DiodeIVSimulator from '../simulators/DiodeIVSimulator';
import BJTCurveSimulator from '../simulators/BJTCurveSimulator';
import MOSFETSimulator from '../simulators/MOSFETSimulator';
import PinoutInspector from '../pinouts/PinoutInspector';
import { Activity, Cpu, Zap, Eye, Calculator } from 'lucide-react';

export default function ToolsView() {
  const [selectedTool, setSelectedTool] = useState('diode'); // 'diode' | 'bjt' | 'mosfet' | 'pinout'

  return (
    <div className="space-y-6">
      {/* Tool Selector Bar */}
      <div className="glassmorphism p-4 rounded-2xl border border-cyan-500/20 bg-slate-900/80 text-white flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-xl font-extrabold text-cyan-400 flex items-center gap-2">
          <Calculator className="w-6 h-6 text-cyan-400" />
          Laboratorio Virtual & Workbench de Caracterización
        </h2>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTool('diode')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedTool === 'diode'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Activity className="w-4 h-4" /> Diodo I-V
          </button>

          <button
            onClick={() => setSelectedTool('bjt')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedTool === 'bjt'
                ? 'bg-violet-500 text-white shadow-md shadow-violet-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Cpu className="w-4 h-4" /> BJT (hFE)
          </button>

          <button
            onClick={() => setSelectedTool('mosfet')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedTool === 'mosfet'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Zap className="w-4 h-4" /> MOSFET (VGS)
          </button>

          <button
            onClick={() => setSelectedTool('pinout')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedTool === 'pinout'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Eye className="w-4 h-4" /> Pinouts & Multímetro
          </button>
        </div>
      </div>

      {/* Render Active Tool */}
      <div>
        {selectedTool === 'diode' && <DiodeIVSimulator />}
        {selectedTool === 'bjt' && <BJTCurveSimulator />}
        {selectedTool === 'mosfet' && <MOSFETSimulator />}
        {selectedTool === 'pinout' && <PinoutInspector />}
      </div>
    </div>
  );
}
