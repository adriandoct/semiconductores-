import React from 'react';
import { Tv, Sparkles, Film } from 'lucide-react';
import { FEEDBACK_VIDEOS } from '../../data/videoData';

export default function FloatingVideoButton({ onOpenVideos }) {
  return (
    <div className="fixed bottom-6 right-6 z-40 group">
      <button
        onClick={onOpenVideos}
        className="relative px-4 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 text-slate-950 font-extrabold text-xs shadow-2xl shadow-cyan-500/40 border border-cyan-300 flex items-center gap-2.5 transition-all transform hover:scale-105 active:scale-95 group-hover:shadow-cyan-400/60"
        title="Abrir Videoteca de Retroalimentación en Ventana"
      >
        <div className="relative">
          <Tv className="w-5 h-5 fill-slate-950 text-slate-950 animate-bounce" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-300 animate-ping"></span>
        </div>
        
        <span className="hidden sm:inline font-heading tracking-wide">
          Videos de Retroalimentación
        </span>
        
        <span className="bg-slate-950 text-cyan-300 text-[10px] font-mono px-2 py-0.5 rounded-full border border-cyan-500/40">
          {FEEDBACK_VIDEOS.length}
        </span>
      </button>
    </div>
  );
}
