import React from 'react';
import { COURSE_INFO } from '../../data/courseData';
import { Cpu, ShieldCheck, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-10 mt-16 text-xs print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Brand Info */}
        <div className="md:col-span-5 space-y-3">
          <div className="flex items-center gap-2 text-white font-extrabold text-base">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <span>{COURSE_INFO.title}</span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed">
            {COURSE_INFO.subtitle}. Diseñado para apoyar la formación de técnicos e ingenieros en la caracterización práctica, medición en multímetro, cálculo de tolerancias y simulaciones físicas de semiconductores.
          </p>
          <div className="flex items-center gap-2 text-emerald-400 text-[11px] font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Normas ESD ANSI/ESD S20.20 & Ecuaciones Físicas de Shockley</span>
          </div>
        </div>

        {/* Modules Navigation Summary */}
        <div className="md:col-span-4 space-y-2">
          <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">
            Estructura Modular del Curso (40h)
          </h4>
          <ul className="space-y-1 text-[11px] text-slate-400">
            <li><strong>Módulo 1:</strong> Fundamentos de la Unión P-N, Diodos y Multímetro</li>
            <li><strong>Módulo 2:</strong> Ecuación de Shockley y Curva I-V del 1N4007</li>
            <li><strong>Módulo 3:</strong> Ganancia hFE y Transistor BJT 2N2222</li>
            <li><strong>Módulo 4:</strong> Protección ESD, MOSFETs y Proyecto Integrador</li>
          </ul>
        </div>

        {/* Technical Credits */}
        <div className="md:col-span-3 space-y-2">
          <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">
            Información Institucional
          </h4>
          <p className="text-[11px] text-slate-400">
            <strong>Dirigido a:</strong> {COURSE_INFO.targetAudience}
          </p>
          <p className="text-[11px] text-slate-400">
            <strong>Duración:</strong> {COURSE_INFO.duration}
          </p>
          <div className="pt-2 text-[10px] text-slate-500 flex items-center gap-1">
            <span>Plataforma interactiva optimizada para educación técnica.</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-4 border-t border-slate-900 text-center text-slate-600 text-[11px]">
        © {new Date().getFullYear()} Semiconductor Master Lab Pro. Todos los derechos reservados.
      </div>
    </footer>
  );
}
