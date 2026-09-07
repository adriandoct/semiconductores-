import React, { useState } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WeekView from './components/views/WeekView';
import ToolsView from './components/views/ToolsView';
import ReportGeneratorView from './components/views/ReportGeneratorView';
import { WEEKS_DATA } from './data/courseData';
import { BookOpen, Wrench, FileText, ChevronRight, Award, Zap } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('week'); // 'week' | 'tools' | 'reports'
  const [currentWeek, setCurrentWeek] = useState(1);

  const selectedWeekData = WEEKS_DATA.find((w) => w.id === currentWeek) || WEEKS_DATA[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentWeek={currentWeek}
        setCurrentWeek={setCurrentWeek}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Quick Module Navigator Bar */}
        {activeTab === 'week' && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 glassmorphism">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <span>Curso de Caracterización</span>
              <ChevronRight className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-300 font-bold">Semana {currentWeek} de 4</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {WEEKS_DATA.map((w) => (
                <button
                  key={w.id}
                  onClick={() => setCurrentWeek(w.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    currentWeek === w.id
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  Semana {w.id}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Dynamic Views */}
        {activeTab === 'week' && (
          <WeekView weekData={selectedWeekData} />
        )}

        {activeTab === 'tools' && (
          <ToolsView />
        )}

        {activeTab === 'reports' && (
          <ReportGeneratorView />
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
