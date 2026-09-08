import React, { useState, useEffect } from 'react';
import { FEEDBACK_VIDEOS } from '../../data/videoData';
import { 
  X, 
  Play, 
  CheckSquare, 
  Square, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Minimize2, 
  Film, 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  Info,
  ExternalLink,
  Tv
} from 'lucide-react';

export default function VideoModal({ isOpen, onClose, currentVideoId, onSelectVideo }) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [completedPoints, setCompletedPoints] = useState({});
  const [activeTab, setActiveTab] = useState('takeaways'); // 'takeaways' | 'playlist'

  // Close on ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentVideo = FEEDBACK_VIDEOS.find((v) => v.id === currentVideoId) || FEEDBACK_VIDEOS[0];
  const currentIndex = FEEDBACK_VIDEOS.findIndex((v) => v.id === currentVideo.id);
  const prevVideo = FEEDBACK_VIDEOS[currentIndex - 1] || FEEDBACK_VIDEOS[FEEDBACK_VIDEOS.length - 1];
  const nextVideo = FEEDBACK_VIDEOS[currentIndex + 1] || FEEDBACK_VIDEOS[0];

  const togglePoint = (idx) => {
    const key = `${currentVideo.id}_point_${idx}`;
    setCompletedPoints((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const iframeSrc = `https://www.youtube-nocookie.com/embed/${currentVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Window Container */}
      <div 
        className={`w-full bg-slate-900/95 border border-cyan-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${
          isMinimized 
            ? 'max-w-md h-auto fixed bottom-6 right-6 z-50 border-cyan-400' 
            : 'max-w-5xl max-h-[92vh]'
        }`}
      >
        {/* Window Top Titlebar */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between shrink-0 select-none">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 flex items-center justify-center shadow-md shadow-cyan-500/20 shrink-0">
              <Tv className="w-4 h-4 text-slate-950 font-bold" />
            </div>
            <div className="truncate">
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-2 py-0.5 rounded-full font-mono font-bold uppercase tracking-wider">
                  Retroalimentación en Video
                </span>
                <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
                  Semana {currentVideo.weekId}
                </span>
              </div>
              <h3 className="text-xs sm:text-sm font-extrabold text-white truncate font-heading">
                {currentVideo.title}
              </h3>
            </div>
          </div>

          {/* Window Control Buttons */}
          <div className="flex items-center gap-1.5 shrink-0 ml-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-800 transition-colors"
              title={isMinimized ? 'Restaurar Ventana' : 'Minimizar Ventana'}
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-950/40 transition-colors"
              title="Cerrar Ventana (ESC)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Minimized Compact Mode */}
        {isMinimized ? (
          <div className="p-4 space-y-3 bg-slate-950">
            <p className="text-xs text-slate-300 font-bold truncate">{currentVideo.title}</p>
            <div className="flex items-center justify-between gap-2">
              <button
                onClick={() => setIsMinimized(false)}
                className="px-3 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-extrabold text-xs flex items-center gap-1 hover:bg-cyan-400 transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-slate-950" /> Expandir reproductor
              </button>
              <button
                onClick={onClose}
                className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700"
              >
                Cerrar
              </button>
            </div>
          </div>
        ) : (
          /* Normal Expanded Modal Content */
          <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col lg:flex-row">
            
            {/* Left Column: Video Player & Main Controls */}
            <div className="lg:w-2/3 p-4 sm:p-5 flex flex-col space-y-4 border-b lg:border-b-0 lg:border-r border-slate-800 bg-slate-950/50">
              
              {/* Responsive Iframe Container */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-2xl group">
                <iframe
                  src={iframeSrc}
                  title={currentVideo.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Video Info Bar */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs text-cyan-400 font-bold flex items-center gap-1 font-mono">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    {currentVideo.subtitle}
                  </span>
                  <span className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full font-mono">
                    ⏱️ Duración: {currentVideo.duration}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-sans bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
                  {currentVideo.description}
                </p>
              </div>

              {/* Prev / Next Video Quick Bar */}
              <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/80">
                <button
                  onClick={() => onSelectVideo(prevVideo.id)}
                  className="px-3.5 py-2 rounded-xl bg-slate-850 hover:bg-slate-800 text-xs text-slate-300 font-bold flex items-center gap-1.5 border border-slate-800 transition-all hover:text-white"
                >
                  <ChevronLeft className="w-4 h-4 text-cyan-400" />
                  <span className="truncate max-w-[120px] sm:max-w-[160px]">{prevVideo.title}</span>
                </button>

                <a
                  href={`https://www.youtube.com/watch?v=${currentVideo.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-1 text-[11px] text-slate-400 hover:text-cyan-300 transition-colors font-mono"
                >
                  <span>Abrir en YouTube</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  onClick={() => onSelectVideo(nextVideo.id)}
                  className="px-3.5 py-2 rounded-xl bg-slate-850 hover:bg-slate-800 text-xs text-slate-300 font-bold flex items-center gap-1.5 border border-slate-800 transition-all hover:text-white"
                >
                  <span className="truncate max-w-[120px] sm:max-w-[160px]">{nextVideo.title}</span>
                  <ChevronRight className="w-4 h-4 text-cyan-400" />
                </button>
              </div>
            </div>

            {/* Right Column: Key Takeaways & Video Playlist Selector */}
            <div className="lg:w-1/3 p-4 sm:p-5 flex flex-col space-y-4 bg-slate-900/40">
              
              {/* Tab Selector inside Modal Sidebar */}
              <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800">
                <button
                  onClick={() => setActiveTab('takeaways')}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'takeaways'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> Puntos Clave
                </button>
                <button
                  onClick={() => setActiveTab('playlist')}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
                    activeTab === 'playlist'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Film className="w-3.5 h-3.5" /> Videoteca ({FEEDBACK_VIDEOS.length})
                </button>
              </div>

              {/* Tab 1: Key Takeaways Checklist */}
              {activeTab === 'takeaways' && (
                <div className="space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-extrabold text-cyan-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-cyan-400" /> Conclusiones & Aprendizaje
                      </h4>
                    </div>

                    <div className="space-y-2">
                      {currentVideo.keyTakeaways.map((point, idx) => {
                        const isDone = completedPoints[`${currentVideo.id}_point_${idx}`];
                        return (
                          <div
                            key={idx}
                            onClick={() => togglePoint(idx)}
                            className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                              isDone
                                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                                : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            <button className="mt-0.5 shrink-0 text-cyan-400">
                              {isDone ? (
                                <CheckSquare className="w-4 h-4 text-emerald-400" />
                              ) : (
                                <Square className="w-4 h-4 text-slate-500" />
                              )}
                            </button>
                            <span className={`text-xs leading-relaxed ${isDone ? 'line-through opacity-80' : ''}`}>
                              {point}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Recommendation Note */}
                  <div className="bg-slate-950/90 p-3 rounded-2xl border border-cyan-500/20 space-y-1">
                    <span className="text-[10px] font-bold text-cyan-400 uppercase font-mono flex items-center gap-1">
                      <Info className="w-3 h-3 text-cyan-400" /> Recomendación Docente:
                    </span>
                    <p className="text-[11px] text-slate-300 leading-relaxed italic">
                      "{currentVideo.recommendedFor}"
                    </p>
                  </div>
                </div>
              )}

              {/* Tab 2: Playlist Video Selector */}
              {activeTab === 'playlist' && (
                <div className="space-y-2 max-h-[360px] overflow-y-auto custom-scrollbar pr-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block mb-2">
                    Seleccionar Video de Retroalimentación:
                  </span>
                  {FEEDBACK_VIDEOS.map((vid) => {
                    const isSelected = vid.id === currentVideo.id;
                    return (
                      <button
                        key={vid.id}
                        onClick={() => onSelectVideo(vid.id)}
                        className={`w-full p-2.5 rounded-2xl text-left transition-all border flex items-center gap-3 ${
                          isSelected
                            ? 'bg-gradient-to-r from-cyan-950/80 to-slate-900 border-cyan-400/80 text-white shadow-md'
                            : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                        }`}
                      >
                        <div className="relative w-16 h-10 rounded-xl overflow-hidden bg-slate-950 shrink-0 border border-slate-800">
                          <img
                            src={vid.thumbnailUrl}
                            alt={vid.title}
                            className="w-full h-full object-cover opacity-80"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40">
                            <Play className={`w-3.5 h-3.5 ${isSelected ? 'fill-cyan-400 text-cyan-400' : 'fill-white text-white'}`} />
                          </div>
                        </div>

                        <div className="truncate flex-1">
                          <span className="text-[9px] font-mono font-bold text-cyan-400 block uppercase">
                            Semana {vid.weekId} • {vid.duration}
                          </span>
                          <h5 className="text-xs font-bold text-slate-200 truncate">{vid.title}</h5>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
