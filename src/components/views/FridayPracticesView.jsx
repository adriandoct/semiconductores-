import React, { useState } from 'react';
import { WEEKS_DATA } from '../../data/courseData';
import TinkercadCircuitSimulator from '../simulators/TinkercadCircuitSimulator';
import { Monitor, Cpu, ExternalLink, ShieldCheck, CheckCircle2, FileText, Sparkles, AlertTriangle, Layers, BookOpen, Tv } from 'lucide-react';

export default function FridayPracticesView({ onOpenVideoModal }) {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const weekData = WEEKS_DATA.find((w) => w.id === selectedWeek) || WEEKS_DATA[0];
  const tinkercadGuide = weekData.labPractice.tinkercadGuide;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glassmorphism-card p-6 rounded-3xl border border-cyan-500/30 bg-slate-900/90 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-3 py-0.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono">
                Solucionario Oficial en Tinkercad
              </span>
              <span className="text-xs text-slate-400 font-mono">Laboratorio de los Viernes</span>
            </div>
            <h2 className="text-2xl font-black text-white flex items-center gap-2 font-heading">
              <Monitor className="w-7 h-7 text-cyan-400 animate-pulse" />
              Prácticas de los Viernes en Tinkercad Circuits
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl mt-1 leading-relaxed">
              Guía de ensamble gráfico, mapas de conexiones en Protoboard virtual, instrumentación en vivo y solucionario para docentes y estudiantes de semiconductores.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onOpenVideoModal && onOpenVideoModal(selectedWeek === 1 ? 'vid-tinkercad-tutorial' : selectedWeek === 2 ? 'vid-diode-iv-curve' : selectedWeek === 3 ? 'vid-bjt-hfe' : 'vid-esd-safety')}
              className="px-4 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-violet-500/25 flex items-center gap-2 transition-all transform hover:scale-105 border border-violet-400/40"
            >
              <Tv className="w-4 h-4 text-cyan-300" />
              <span>Ver Video Tutorial 🎬</span>
            </button>

            <a
              href="https://www.tinkercad.com/circuits"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs rounded-2xl shadow-lg shadow-cyan-500/25 flex items-center gap-2 transition-all transform hover:scale-105"
            >
              <span>Abrir Tinkercad</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Friday Practice Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
          {WEEKS_DATA.map((w) => {
            const isSelected = selectedWeek === w.id;
            return (
              <button
                key={w.id}
                onClick={() => setSelectedWeek(w.id)}
                className={`p-3.5 rounded-2xl text-left transition-all border relative overflow-hidden ${
                  isSelected
                    ? 'bg-gradient-to-br from-cyan-950/80 to-slate-900 border-cyan-400/80 text-white shadow-xl shadow-cyan-500/10'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-850 hover:text-slate-200'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className={`text-[10px] font-extrabold uppercase font-mono px-2 py-0.5 rounded-md ${
                    isSelected ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                  }`}>
                    Viernes Semana {w.id}
                  </span>
                  {isSelected && <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />}
                </div>
                <h4 className="text-xs font-bold truncate text-slate-100">{w.labPractice.title.split(':')[1] || w.labPractice.title}</h4>
                {isSelected && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Practice Content Card */}
      <div className="space-y-6">
        
        {/* Practice Overview & Objective */}
        <div className="bg-slate-900/80 p-5 rounded-3xl border border-slate-800 space-y-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white font-heading">{weekData.labPractice.title}</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
            <strong className="text-cyan-400">Objetivo del Laboratorio: </strong>
            {weekData.labPractice.objective}
          </p>
        </div>

        {/* Live Virtual Circuit Simulator Component */}
        <TinkercadCircuitSimulator weekId={selectedWeek} />

        {/* Solucionario Docente & Wiring Blueprint */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Wiring & Setup Details */}
          <div className="lg:col-span-6 bg-slate-950 p-5 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
            <h4 className="text-sm font-bold text-cyan-300 flex items-center gap-2 font-heading border-b border-slate-800 pb-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              Conexiones de Cableado Virtual (Tinkercad Circuits)
            </h4>

            <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-1">
              <strong className="text-slate-200 block font-heading">Montaje en Protoboard:</strong>
              <p className="leading-relaxed">{tinkercadGuide.breadboardSetup}</p>
            </div>

            <div className="space-y-2">
              <strong className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Detalle Paso a Paso de Conexiones:
              </strong>
              <div className="space-y-2">
                {tinkercadGuide.wiringDetails.map((wire, idx) => (
                  <div key={idx} className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{wire}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Materials List */}
            <div className="pt-2">
              <strong className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Materiales Necesarios:
              </strong>
              <div className="flex flex-wrap gap-1.5">
                {weekData.labPractice.materials.map((mat, mIdx) => (
                  <span key={mIdx} className="px-2.5 py-1 bg-slate-900 text-slate-300 text-[11px] rounded-lg border border-slate-800 font-mono">
                    • {mat}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Solucionario Docente Readings Table */}
          <div className="lg:col-span-6 bg-slate-950 p-5 rounded-3xl border border-slate-800 space-y-4 shadow-xl flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2 font-heading border-b border-slate-800 pb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Solucionario y Lecturas Esperadas en Tinkercad
              </h4>

              <div className="overflow-x-auto mt-3">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-slate-400 uppercase font-mono">
                    <tr>
                      <th className="p-2.5">Parámetro / Prueba</th>
                      <th className="p-2.5">Lectura Tinkercad</th>
                      <th className="p-2.5">Dictamen</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono">
                    {tinkercadGuide.expectedVirtualReadings.map((r, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-900/50">
                        <td className="p-2.5 text-slate-200 font-sans font-medium">{r.test}</td>
                        <td className="p-2.5 text-cyan-300 font-bold">{r.value}</td>
                        <td className="p-2.5 text-emerald-400 font-semibold">{r.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Diagnosis Criteria Guide */}
              <div className="mt-4 bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 space-y-2 text-xs">
                <strong className="text-slate-200 block font-heading">{weekData.labPractice.solutionGuide.title}:</strong>
                <ul className="space-y-1 text-slate-300 list-disc list-inside">
                  {weekData.labPractice.solutionGuide.items.map((item, iIdx) => (
                    <li key={iIdx} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-cyan-300">$1</strong>') }}></li>
                  ))}
                </ul>
              </div>
            </div>

            {/* ESD Safety Banner */}
            <div className="bg-amber-950/20 p-3 rounded-2xl border border-amber-500/30 flex items-center gap-3 text-xs text-amber-300 mt-4">
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
              <span>{weekData.labPractice.safetyNotes[0]}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
