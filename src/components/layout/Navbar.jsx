import React, { useState } from 'react';
import { COURSE_INFO } from '../../data/courseData';
import { Cpu, BookOpen, Wrench, FileText, Menu, X, Zap, Award, Sparkles, Palette } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, currentWeek, setCurrentWeek, currentTheme, setCurrentTheme }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);

  const navItems = [
    { id: 'week-1', label: 'Semana 1', sub: 'Fundamentos' },
    { id: 'week-2', label: 'Semana 2', sub: 'Curva I-V Diodo' },
    { id: 'week-3', label: 'Semana 3', sub: 'Ganancia BJT (hFE)' },
    { id: 'week-4', label: 'Semana 4', sub: 'ESD y Reporte' },
  ];

  const themes = [
    { id: 'cyberpunk', name: '🌌 Cyberpunk Neon', color: 'bg-cyan-500' },
    { id: 'matrix', name: '⚡ Matrix Emerald', color: 'bg-emerald-500' },
    { id: 'amber', name: '🔥 Amber Sunset', color: 'bg-amber-500' },
    { id: 'solar', name: '💎 Solar Flare', color: 'bg-sky-400' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-cyan-500/20 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => { setActiveTab('week'); setCurrentWeek(1); }}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-violet-600 p-0.5 shadow-lg shadow-cyan-500/25 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Cpu className="w-5 h-5 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <div>
              <h1 className="text-base font-extrabold tracking-tight text-white flex items-center gap-2 font-heading">
                Semiconductor <span className="text-gradient-cyan">Master Lab</span>
                <span className="text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-2 py-0.5 rounded-full font-mono flex items-center gap-1 shadow-sm">
                  <Sparkles className="w-2.5 h-2.5 text-cyan-400 animate-spin" /> PRO
                </span>
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
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex flex-col items-center relative ${
                    isActive
                      ? 'bg-gradient-to-b from-cyan-500/20 to-cyan-950/40 text-cyan-300 border border-cyan-500/50 shadow-lg shadow-cyan-500/10'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-[10px] opacity-75 font-normal">{item.sub}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 w-6 h-0.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#06b6d4]"></span>
                  )}
                </button>
              );
            })}

            <div className="h-6 w-px bg-slate-800/80 mx-1"></div>

            {/* Extra Tools Tabs */}
            <button
              onClick={() => setActiveTab('tools')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'tools'
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/25 border border-violet-400/30'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <Wrench className="w-4 h-4 text-violet-300" /> Laboratorio Virtual
            </button>

            <button
              onClick={() => setActiveTab('reports')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'reports'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-lg shadow-emerald-500/25 font-bold border border-emerald-400/40'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4 text-emerald-400" /> Reportes PDF
            </button>

            {/* Dynamic Theme Picker Dropdown */}
            <div className="relative pl-1">
              <button
                onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 text-xs font-bold flex items-center gap-1.5 transition-all"
                title="Cambiar Apariencia / Tema"
              >
                <Palette className="w-4 h-4 text-cyan-400" />
                <span className="hidden lg:inline">Apariencia</span>
              </button>

              {themeDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-950 border border-cyan-500/30 rounded-2xl shadow-2xl p-2 space-y-1 z-50 animate-in fade-in duration-150">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block px-2 py-1">
                    Seleccionar Tema Visual:
                  </span>
                  {themes.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setCurrentTheme(t.id);
                        setThemeDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-between ${
                        currentTheme === t.id
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                          : 'text-slate-300 hover:bg-slate-900'
                      }`}
                    >
                      <span>{t.name}</span>
                      <span className={`w-2.5 h-2.5 rounded-full ${t.color}`}></span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
              className="p-2 rounded-lg bg-slate-800 text-cyan-400 border border-slate-700"
            >
              <Palette className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 backdrop-blur-xl border-b border-slate-800 p-4 space-y-2 animate-in slide-in-from-top duration-200">
          {navItems.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab('week');
                setCurrentWeek(idx + 1);
                setMobileMenuOpen(false);
              }}
              className="w-full text-left p-3 rounded-xl text-sm font-bold text-slate-200 hover:bg-slate-800/80 flex justify-between items-center border border-slate-800/60"
            >
              <span>{item.label} — {item.sub}</span>
              <BookOpen className="w-4 h-4 text-cyan-400" />
            </button>
          ))}
          <div className="border-t border-slate-800/80 pt-3 space-y-2">
            <button
              onClick={() => { setActiveTab('tools'); setMobileMenuOpen(false); }}
              className="w-full text-left p-3 rounded-xl text-sm font-bold text-violet-300 hover:bg-slate-800/80 flex justify-between items-center border border-slate-800/60 bg-violet-950/20"
            >
              <span>Laboratorio Virtual y Simuladores</span>
              <Wrench className="w-4 h-4 text-violet-400" />
            </button>
            <button
              onClick={() => { setActiveTab('reports'); setMobileMenuOpen(false); }}
              className="w-full text-left p-3 rounded-xl text-sm font-bold text-emerald-300 hover:bg-slate-800/80 flex justify-between items-center border border-slate-800/60 bg-emerald-950/20"
            >
              <span>Generador de Reportes PDF</span>
              <FileText className="w-4 h-4 text-emerald-400" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
