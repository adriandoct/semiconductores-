import React, { useState } from 'react';
import { BookOpen, Wrench, CheckCircle2, XCircle, HelpCircle, ShieldAlert, Award, ChevronDown, ChevronUp, Eye, EyeOff, Zap, CheckSquare, Square, RotateCcw, Sparkles, ExternalLink, Monitor, Cpu } from 'lucide-react';
import DiodeIVSimulator from '../simulators/DiodeIVSimulator';
import BJTCurveSimulator from '../simulators/BJTCurveSimulator';
import MOSFETSimulator from '../simulators/MOSFETSimulator';
import TinkercadCircuitSimulator from '../simulators/TinkercadCircuitSimulator';

export default function WeekView({ weekData }) {
  const [activeTab, setActiveTab] = useState('theory'); // 'theory' | 'lab' | 'quiz'
  
  // Accordion state for lab steps
  const [expandedStep, setExpandedStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState({});
  const [showSolutions, setShowSolutions] = useState(false);
  const [showTinkercad, setShowTinkercad] = useState(true);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const toggleStepCompleted = (stepNum) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [stepNum]: !prev[stepNum]
    }));
  };

  const handleOptionSelect = (questionId, optionIdx) => {
    if (submittedQuiz) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx
    }));
  };

  const calculateScore = () => {
    let score = 0;
    weekData.quiz.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setSubmittedQuiz(false);
  };

  const completedStepsCount = Object.values(completedSteps).filter(Boolean).length;
  const labProgressPct = Math.round((completedStepsCount / weekData.labPractice.steps.length) * 100);

  return (
    <div className="space-y-6">
      {/* Header Banner for Week */}
      <div className="relative overflow-hidden rounded-3xl border border-cyan-500/30 p-6 md:p-8 bg-slate-900/90 shadow-2xl bg-circuit-pattern">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-md shadow-cyan-500/20">
              {weekData.badge}
            </span>
            <span className="bg-slate-800/80 text-cyan-300 border border-slate-700 text-xs font-mono px-3 py-1 rounded-full">
              Mantenimiento de Sistemas Electrónicos — Submódulo 2
            </span>
            <span className="bg-slate-800/80 text-slate-300 border border-slate-700 text-xs font-mono px-3 py-1 rounded-full">
              {weekData.hours}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight font-heading">
            {weekData.title}
          </h2>

          <p className="text-slate-300 text-sm md:text-base max-w-3xl leading-relaxed">
            {weekData.subtitle}
          </p>

          {/* Tab Selection Navigation Bar */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-800/80">
            <button
              onClick={() => setActiveTab('theory')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                activeTab === 'theory'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-lg shadow-cyan-500/25 border border-cyan-400/40'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/60'
              }`}
            >
              <BookOpen className="w-4 h-4" /> 📘 1. Contenido Teórico & Simuladores
            </button>

            <button
              onClick={() => setActiveTab('lab')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                activeTab === 'lab'
                  ? 'bg-gradient-to-r from-violet-500 to-indigo-600 text-white shadow-lg shadow-violet-500/25 border border-violet-400/40'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/60'
              }`}
            >
              <Wrench className="w-4 h-4" /> 🔬 2. Práctica del Viernes & Tinkercad
              {completedStepsCount > 0 && (
                <span className="ml-1 text-[10px] bg-emerald-500 text-slate-950 font-mono px-1.5 py-0.5 rounded-full font-bold">
                  {completedStepsCount}/{weekData.labPractice.steps.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 ${
                activeTab === 'quiz'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-lg shadow-emerald-500/25 border border-emerald-400/40'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/60'
              }`}
            >
              <Award className="w-4 h-4" /> 📝 3. Cuestionario ({weekData.quiz.length} Preguntas)
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: THEORY & SIMULATORS */}
      {activeTab === 'theory' && (
        <div className="space-y-6">
          {/* Embedded Interactive Physics Simulator */}
          {weekData.id === 2 && <DiodeIVSimulator />}
          {weekData.id === 3 && <BJTCurveSimulator />}
          {weekData.id === 4 && <MOSFETSimulator />}

          {/* Theory Cards */}
          <div className="grid grid-cols-1 gap-6">
            {weekData.theorySections.map((sec, idx) => (
              <div 
                key={sec.id} 
                className="glassmorphism-card p-6 md:p-8 rounded-3xl space-y-4"
              >
                <div className="flex items-center gap-3 border-b border-slate-800/80 pb-3">
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold font-mono text-sm shrink-0">
                    1.{idx + 1}
                  </div>
                  <h3 className="text-xl font-extrabold text-white font-heading">
                    {sec.title}
                  </h3>
                </div>

                <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-line font-sans">
                  {sec.content}
                </div>

                {/* Key Points Badge Box */}
                <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800/80 space-y-3">
                  <h4 className="text-xs font-extrabold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5 font-heading">
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    Conceptos Clave y Puntos de Verificación de Examen:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300">
                    {sec.keyPoints.map((kp, kpIdx) => (
                      <div key={kpIdx} className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{kp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: FRIDAY LAB PRACTICE & TINKERCAD GRAPHICAL SOLUTIONS */}
      {activeTab === 'lab' && (
        <div className="space-y-6">
          <div className="glassmorphism-card p-6 md:p-8 rounded-3xl space-y-6">
            
            {/* Header & Lab Progress Tracker */}
            <div className="flex flex-wrap justify-between items-start gap-4 border-b border-slate-800/80 pb-4">
              <div>
                <span className="text-xs font-extrabold text-violet-400 uppercase tracking-wider block mb-1">
                  Guía Práctica de Laboratorio Presencial & Simulación Tinkercad
                </span>
                <h3 className="text-2xl md:text-3xl font-black text-white font-heading">
                  {weekData.labPractice.title}
                </h3>
              </div>

              {/* Progress Ring */}
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Progreso de la Práctica</span>
                  <span className="text-base font-extrabold text-emerald-400 font-mono">
                    {completedStepsCount} de {weekData.labPractice.steps.length} Pasos ({labProgressPct}%)
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-900 border-2 border-emerald-500/40 flex items-center justify-center font-bold text-xs text-emerald-400 font-mono">
                  {labProgressPct}%
                </div>
              </div>
            </div>

            {/* Objective Banner */}
            <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-5 rounded-2xl border-l-4 border-cyan-500 border-t border-r border-b border-slate-800 text-sm text-slate-200">
              <strong className="text-cyan-400 block font-heading mb-1 text-base">Objetivo de Aprendizaje:</strong>
              <p className="leading-relaxed text-slate-300">{weekData.labPractice.objective}</p>
            </div>

            {/* TINKERCAD GRAPHICAL SOLUTION BOX FOR TEACHERS & INTERACTIVE SIMULATOR */}
            {weekData.labPractice.tinkercadGuide && (
              <div className="space-y-6">
                {/* Live Virtual Circuit Simulator for Tinkercad */}
                <TinkercadCircuitSimulator weekId={weekData.id} />

                {/* Text Blueprint & Solucionario Guide */}
                <div className="bg-slate-950 p-6 rounded-3xl border border-cyan-500/40 space-y-4 shadow-xl">
                  <div className="flex flex-wrap justify-between items-center border-b border-slate-800 pb-3 gap-2">
                    <h4 className="font-extrabold text-base text-cyan-300 flex items-center gap-2 font-heading">
                      <Monitor className="w-5 h-5 text-cyan-400 animate-pulse" />
                      {weekData.labPractice.tinkercadGuide.title}
                    </h4>
                    <a
                      href={weekData.labPractice.tinkercadGuide.tinkercadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-bold rounded-xl border border-cyan-500/40 flex items-center gap-1.5 transition-colors"
                    >
                      <span>Abrir en Tinkercad Circuits</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-2">
                    <strong className="text-slate-200 block text-sm font-heading">Plano de Conexiones en Protoboard (Tinkercad):</strong>
                    <p className="leading-relaxed text-slate-300">{weekData.labPractice.tinkercadGuide.breadboardSetup}</p>
                  </div>

                  {/* Specific Wiring Steps */}
                  <div className="space-y-2">
                    <strong className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                      Conexiones de Cableado Virtual (Tinkercad):
                    </strong>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                      {weekData.labPractice.tinkercadGuide.wiringDetails.map((wire, wIdx) => (
                        <div key={wIdx} className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 flex items-start gap-2">
                          <Cpu className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{wire}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Expected Readings Table in Tinkercad */}
                  <div className="space-y-2 pt-2">
                    <strong className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                      Respuestas y Lecturas Esperadas en Pantalla de Tinkercad (Solucionario Docente):
                    </strong>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-900 text-slate-400 uppercase font-mono">
                          <tr>
                            <th className="p-2.5">Prueba / Parámetro</th>
                            <th className="p-2.5">Lectura en Tinkercad</th>
                            <th className="p-2.5">Estado / Dictamen</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800 font-mono">
                          {weekData.labPractice.tinkercadGuide.expectedVirtualReadings.map((r, rIdx) => (
                            <tr key={rIdx} className="hover:bg-slate-900/50">
                              <td className="p-2.5 text-slate-200 font-sans">{r.test}</td>
                              <td className="p-2.5 text-cyan-300 font-bold">{r.value}</td>
                              <td className="p-2.5 text-emerald-400">{r.status}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Materials & Safety Side-by-Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Hardware Checklist */}
              <div className="bg-slate-950/90 p-5 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="font-bold text-sm text-cyan-400 flex items-center gap-2 font-heading">
                  <Wrench className="w-4 h-4 text-cyan-400" /> Materiales e Instrumentación Requerida
                </h4>
                <div className="space-y-2 text-xs text-slate-300">
                  {weekData.labPractice.materials.map((mat, i) => (
                    <div key={i} className="flex items-center gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80">
                      <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                      <span>{mat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Safety Rules */}
              <div className="bg-slate-950/90 p-5 rounded-2xl border border-amber-500/30 space-y-3">
                <h4 className="font-bold text-sm text-amber-400 flex items-center gap-2 font-heading">
                  <ShieldAlert className="w-4 h-4 text-amber-400" /> Protocolo de Seguridad ESD e Higiene
                </h4>
                <div className="space-y-2 text-xs text-slate-300">
                  {weekData.labPractice.safetyNotes.map((sn, i) => (
                    <div key={i} className="flex items-start gap-2 bg-amber-950/20 p-2.5 rounded-xl border border-amber-500/20">
                      <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{sn}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive Step-by-Step Accordion */}
            <div className="space-y-4 pt-2">
              <h4 className="font-bold text-lg text-white font-heading border-b border-slate-800 pb-2">
                Procedimiento Experimental Guiado Paso a Paso
              </h4>

              {weekData.labPractice.steps.map((step) => {
                const isOpen = expandedStep === step.stepNumber;
                const isDone = !!completedSteps[step.stepNumber];

                return (
                  <div
                    key={step.stepNumber}
                    className={`rounded-2xl border transition-all ${
                      isDone
                        ? 'bg-emerald-950/20 border-emerald-500/40'
                        : isOpen
                        ? 'bg-slate-900 border-cyan-500/50 shadow-lg shadow-cyan-500/10'
                        : 'bg-slate-950 border-slate-800'
                    }`}
                  >
                    <div className="p-4 flex items-center justify-between text-left font-semibold text-sm text-white">
                      <button
                        onClick={() => setExpandedStep(isOpen ? null : step.stepNumber)}
                        className="flex items-center gap-3 flex-1 text-left"
                      >
                        <span className={`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 border ${
                          isDone
                            ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                            : 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40'
                        }`}>
                          {step.stepNumber}
                        </span>
                        <span className={`font-heading text-base ${isDone ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                          {step.title}
                        </span>
                      </button>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleStepCompleted(step.stepNumber)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                            isDone
                              ? 'bg-emerald-500 text-slate-950 font-bold'
                              : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
                          }`}
                        >
                          {isDone ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                          <span>{isDone ? 'Completado' : 'Marcar Paso'}</span>
                        </button>
                        <button onClick={() => setExpandedStep(isOpen ? null : step.stepNumber)}>
                          {isOpen ? <ChevronUp className="w-5 h-5 text-cyan-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                        </button>
                      </div>
                    </div>

                    {isOpen && (
                      <div className="p-5 pt-0 border-t border-slate-800/80 space-y-3 text-xs text-slate-300">
                        <p className="leading-relaxed text-slate-200 text-sm">{step.description}</p>
                        <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/30 text-emerald-300 font-mono">
                          <strong className="text-emerald-400 font-sans block mb-1 text-xs">Lectura / Resultado Esperado en Pantalla:</strong>
                          {step.expectedResult}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Teacher Solution Revealer Toggle */}
            <div className="mt-8 pt-6 border-t border-slate-800">
              <button
                onClick={() => setShowSolutions(!showSolutions)}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-extrabold rounded-xl border border-amber-500/40 flex items-center gap-2 transition-all shadow-md"
              >
                {showSolutions ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showSolutions ? "Ocultar Criterios y Solucionario" : "Mostrar Criterios de Evaluación y Solucionario Técnico"}
              </button>

              {showSolutions && (
                <div className="mt-4 bg-amber-950/20 p-6 rounded-2xl border border-amber-500/40 space-y-3 text-xs text-slate-200 animate-in fade-in duration-200">
                  <h5 className="font-bold text-amber-400 text-sm flex items-center gap-2 font-heading">
                    <Zap className="w-4 h-4" /> {weekData.labPractice.solutionGuide.title}
                  </h5>
                  <div className="space-y-2 text-slate-300">
                    {weekData.labPractice.solutionGuide.items.map((item, idx) => (
                      <div key={idx} className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: EVALUATION QUIZ ENGINE */}
      {activeTab === 'quiz' && (
        <div className="space-y-6">
          <div className="glassmorphism-card p-6 md:p-8 rounded-3xl space-y-6">
            
            {/* Quiz Header Score Card */}
            <div className="flex flex-wrap justify-between items-center border-b border-slate-800/80 pb-4 gap-4">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                  Evaluación Diagnóstica Autocorregible
                </span>
                <h3 className="text-2xl font-black text-white font-heading">
                  Cuestionario de Evaluación ({weekData.quiz.length} Preguntas)
                </h3>
              </div>

              {submittedQuiz && (
                <div className="bg-slate-950 p-4 rounded-2xl border border-emerald-500/40 text-center flex items-center gap-4">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Calificación Obtenida</span>
                    <span className="text-3xl font-black text-emerald-400 font-mono">
                      {calculateScore()} / {weekData.quiz.length}
                    </span>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center font-bold text-emerald-400 font-mono text-sm">
                    {Math.round((calculateScore() / weekData.quiz.length) * 100)}%
                  </div>
                </div>
              )}
            </div>

            {/* Questions List */}
            <div className="space-y-6">
              {weekData.quiz.map((q, idx) => {
                const userChoice = selectedAnswers[q.id];
                const isCorrect = userChoice === q.correctIndex;

                return (
                  <div
                    key={q.id}
                    className={`p-6 rounded-2xl border transition-all ${
                      submittedQuiz
                        ? isCorrect
                          ? 'bg-emerald-950/20 border-emerald-500/40 shadow-lg shadow-emerald-500/5'
                          : 'bg-red-950/20 border-red-500/40 shadow-lg shadow-red-500/5'
                        : 'bg-slate-950 border-slate-800'
                    }`}
                  >
                    <h4 className="font-bold text-base text-white mb-4 flex items-start gap-2.5 font-heading">
                      <span className="w-7 h-7 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center font-mono font-bold text-xs shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{q.question}</span>
                    </h4>

                    <div className="space-y-2.5">
                      {q.options.map((opt, optIdx) => {
                        const isThisSelected = userChoice === optIdx;
                        let optionStyle = "bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800/80";

                        if (submittedQuiz) {
                          if (optIdx === q.correctIndex) {
                            optionStyle = "bg-emerald-900/60 border-emerald-500 text-emerald-200 font-semibold shadow-md shadow-emerald-500/10";
                          } else if (isThisSelected && !isCorrect) {
                            optionStyle = "bg-red-900/60 border-red-500 text-red-200 line-through opacity-80";
                          }
                        } else if (isThisSelected) {
                          optionStyle = "bg-cyan-500/20 border-cyan-400 text-cyan-300 font-semibold shadow-md shadow-cyan-500/10";
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={submittedQuiz}
                            onClick={() => handleOptionSelect(q.id, optIdx)}
                            className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between ${optionStyle}`}
                          >
                            <span>{opt}</span>
                            {submittedQuiz && optIdx === q.correctIndex && (
                              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />
                            )}
                            {submittedQuiz && isThisSelected && !isCorrect && (
                              <XCircle className="w-5 h-5 text-red-400 shrink-0 ml-2" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Scientific Explanation Box */}
                    {submittedQuiz && (
                      <div className="mt-4 p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 space-y-1">
                        <strong className="text-cyan-400 font-heading block text-sm">Fundamento Científico y Explicación:</strong>
                        <p className="leading-relaxed">{q.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
              {!submittedQuiz ? (
                <button
                  disabled={Object.keys(selectedAnswers).length < weekData.quiz.length}
                  onClick={() => setSubmittedQuiz(true)}
                  className={`px-8 py-3.5 font-extrabold rounded-xl text-sm transition-all shadow-lg font-heading ${
                    Object.keys(selectedAnswers).length === weekData.quiz.length
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 cursor-pointer shadow-emerald-500/25 hover:scale-105'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                  }`}
                >
                  Calificar Examen y Ver Explicaciones
                </button>
              ) : (
                <button
                  onClick={resetQuiz}
                  className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-cyan-300 font-extrabold rounded-xl text-sm transition-all border border-slate-700 flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" /> Reiniciar Cuestionario
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
