import React from 'react';
import { Cpu, Zap, Activity, ShieldCheck, Award, ArrowRight, Layers } from 'lucide-react';

export default function HeroBanner({ onExploreTools }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-slate-900/90 border border-cyan-500/30 p-6 md:p-8 shadow-2xl bg-circuit-pattern mb-8">
      {/* Background Radial Light Orbs */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 bg-violet-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Intro Text */}
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Laboratorio de Caracterización de Semiconductores</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight font-heading">
            Caracterización y Prueba de <span className="text-gradient-cyan">Semiconductores</span>
          </h1>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl font-sans">
            Plataforma interactiva para la enseñanza técnica de la unión P-N, diodos rectificadores, transistores BJT, MOSFETs de potencia y normas de seguridad ESD con simuladores físicos en tiempo real.
          </p>

          {/* Quick Metrics Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800 text-center">
              <span className="block text-xl font-extrabold text-cyan-400 font-mono">40 Horas</span>
              <span className="text-[11px] text-slate-400">Duración Total</span>
            </div>

            <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800 text-center">
              <span className="block text-xl font-extrabold text-violet-400 font-mono">4 Prácticas</span>
              <span className="text-[11px] text-slate-400">Laboratorio Viernes</span>
            </div>

            <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800 text-center">
              <span className="block text-xl font-extrabold text-emerald-400 font-mono">3 Simuladores</span>
              <span className="text-[11px] text-slate-400">Curvas I-V / hFE / VGS</span>
            </div>

            <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800 text-center">
              <span className="block text-xl font-extrabold text-amber-400 font-mono">20 Preguntas</span>
              <span className="text-[11px] text-slate-400">Evaluación Guiada</span>
            </div>
          </div>
        </div>

        {/* Right Interactive Card Preview */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-full bg-slate-950/90 p-5 rounded-2xl border border-slate-800 shadow-2xl relative space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" /> Dispositivos Soportados
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-mono">
                Hardware Calibrado
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center p-2 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <span className="font-semibold text-cyan-300">Diodo 1N4007 (DO-41)</span>
                <span className="font-mono text-slate-400">1000V / 1A</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <span className="font-semibold text-violet-300">Transistor 2N2222 (TO-92)</span>
                <span className="font-mono text-slate-400">hFE: 100-300</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <span className="font-semibold text-emerald-300">MOSFET IRF540 (TO-220)</span>
                <span className="font-mono text-slate-400">100V / 33A</span>
              </div>
            </div>

            <button
              onClick={onExploreTools}
              className="w-full py-2.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-slate-950 font-extrabold rounded-xl shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 text-xs transition-all hover:scale-[1.02]"
            >
              <span>Abrir Laboratorio Virtual</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
