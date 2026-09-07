import React, { useState } from 'react';
import { COURSE_INFO } from '../../data/courseData';
import { Cpu, BookOpen, Wrench, FileText, Menu, X, Zap, Award } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, currentWeek, setCurrentWeek }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'week-1', label: 'Semana 1', sub: 'Fundamentos' },
    { id: 'week-2', label: 'Semana 2', sub: 'Curva I-V Diodo' },
    { id: 'week-3', label: 'Semana 3', sub: 'Ganancia BJT (hFE)' },
    { id: 'week-4', label: 'Semana 4', sub: 'ESD y Reporte' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/90 border-b border-cyan-500/20 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => { setActiveTab('week'); setCurrentWeek(1); }}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Cpu className="w-5 h-5 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <div>
              <h1 className="text-base font-extrabold tracking-tight text-white flex items-center gap-2">
                Semiconductor <span className="text-cyan-400">Master Lab</span>
                <span className="text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-1.5 py-0.5 rounded font-mono">PRO</span>
              </h1>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Caracterización Práctica de Semiconductores (40 Horas)
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item, idx) => {
              const weekNum = idx + 1;
              const isActive = activeTab === 'week' && currentWeek === weekNum;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab('week');
                    setCurrentWeek(weekNum);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex flex-col items-center ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-lg'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-[10px] opacity-75 font-normal">{item.sub}</span>
                </button>
              );
            })}

            <div className="h-6 w-px bg-slate-800 mx-2"></div>

            {/* Extra Tools Tabs */}
            <button
              onClick={() => setActiveTab('tools')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'tools'
                  ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/20'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Wrench className="w-4 h-4 text-violet-400" /> Laboratorio Virtual
            </button>

            <button
              onClick={() => setActiveTab('reports')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'reports'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <FileText className="w-4 h-4 text-emerald-400" /> Reportes PDF
            </button>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 p-4 space-y-2">
          {navItems.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab('week');
                setCurrentWeek(idx + 1);
                setMobileMenuOpen(false);
              }}
              className="w-full text-left p-2.5 rounded-lg text-sm font-bold text-slate-200 hover:bg-slate-800 flex justify-between items-center"
            >
              <span>{item.label} — {item.sub}</span>
              <BookOpen className="w-4 h-4 text-cyan-400" />
            </button>
          ))}
          <div className="border-t border-slate-800 pt-2 space-y-2">
            <button
              onClick={() => { setActiveTab('tools'); setMobileMenuOpen(false); }}
              className="w-full text-left p-2.5 rounded-lg text-sm font-bold text-violet-300 hover:bg-slate-800 flex justify-between items-center"
            >
              <span>Laboratorio Virtual y Simuladores</span>
              <Wrench className="w-4 h-4" />
            </button>
            <button
              onClick={() => { setActiveTab('reports'); setMobileMenuOpen(false); }}
              className="w-full text-left p-2.5 rounded-lg text-sm font-bold text-emerald-300 hover:bg-slate-800 flex justify-between items-center"
            >
              <span>Generador de Reportes PDF</span>
              <FileText className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
