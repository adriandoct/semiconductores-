import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroBanner from './components/layout/HeroBanner';
import WeekView from './components/views/WeekView';
import ToolsView from './components/views/ToolsView';
import FridayPracticesView from './components/views/FridayPracticesView';
import ReportGeneratorView from './components/views/ReportGeneratorView';
import VideoModal from './components/common/VideoModal';
import FloatingVideoButton from './components/common/FloatingVideoButton';
import { WEEKS_DATA } from './data/courseData';
import { FEEDBACK_VIDEOS } from './data/videoData';
import { BookOpen, Wrench, FileText, ChevronRight, Award, Zap } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('week'); // 'week' | 'friday' | 'tools' | 'reports'
  const [currentWeek, setCurrentWeek] = useState(1);
  const [theme, setTheme] = useState('cyberpunk'); // 'cyberpunk' | 'matrix' | 'amber' | 'solar'

  // Video Modal State
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState('vid-pn-junction');

  // Apply data-theme attribute to document body for dynamic CSS skinning
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const selectedWeekData = WEEKS_DATA.find((w) => w.id === currentWeek) || WEEKS_DATA[0];

  const handleOpenVideoModal = (videoId) => {
    if (videoId) {
      setActiveVideoId(videoId);
    } else {
      // Find a video matching currentWeek if available, else first video
      const matchingVideo = FEEDBACK_VIDEOS.find((v) => v.weekId === currentWeek);
      if (matchingVideo) {
        setActiveVideoId(matchingVideo.id);
      }
    }
    setIsVideoModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950 transition-colors duration-400">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentWeek={currentWeek}
        setCurrentWeek={setCurrentWeek}
        currentTheme={theme}
        setCurrentTheme={setTheme}
        onOpenVideoModal={handleOpenVideoModal}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Hero Presentation Banner */}
        {activeTab === 'week' && (
          <HeroBanner onExploreTools={() => setActiveTab('friday')} />
        )}

        {/* Quick Module Navigator Bar */}
        {activeTab === 'week' && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 glassmorphism">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
              <span>Módulo del Curso</span>
              <ChevronRight className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-300 font-bold">Semana {currentWeek} de 4</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {WEEKS_DATA.map((w) => (
                <button
                  key={w.id}
                  onClick={() => setCurrentWeek(w.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    currentWeek === w.id
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/20'
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
          <WeekView 
            weekData={selectedWeekData} 
            onOpenVideoModal={handleOpenVideoModal}
          />
        )}

        {activeTab === 'friday' && (
          <FridayPracticesView 
            onOpenVideoModal={handleOpenVideoModal}
          />
        )}

        {activeTab === 'tools' && (
          <ToolsView 
            onOpenVideoModal={handleOpenVideoModal}
          />
        )}

        {activeTab === 'reports' && (
          <ReportGeneratorView />
        )}
      </main>

      {/* Floating Video Access Button */}
      <FloatingVideoButton onOpenVideos={() => handleOpenVideoModal()} />

      {/* Retroalimentación Video Modal Player Window */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        currentVideoId={activeVideoId}
        onSelectVideo={(vId) => setActiveVideoId(vId)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
