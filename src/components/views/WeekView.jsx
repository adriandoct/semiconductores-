import React, { useState } from 'react';
import { BookOpen, Wrench, CheckCircle2, XCircle, HelpCircle, ShieldAlert, Award, ChevronDown, ChevronUp, Eye, EyeOff, Zap } from 'lucide-react';
import DiodeIVSimulator from '../simulators/DiodeIVSimulator';
import BJTCurveSimulator from '../simulators/BJTCurveSimulator';
import MOSFETSimulator from '../simulators/MOSFETSimulator';

export default function WeekView({ weekData }) {
  const [activeTab, setActiveTab] = useState('theory'); // 'theory' | 'lab' | 'quiz'
  
  // Accordion state for lab steps
  const [expandedStep, setExpandedStep] = useState(1);
  const [showSolutions, setShowSolutions] = useState(false);

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);

  const handleOptionSelect = (questionId, optionIdx) => {
    if (submittedQuiz) return; // Lock if submitted
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

  return (
    <div className="space-y-6">
      {/* Header Banner for Week */}
      <div className="glassmorphism p-6 rounded-2xl border border-cyan-500/20 shadow-xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950 text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -z-0"></div>
        <div className="relative z-10 flex flex-wrap justify-between items-start gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {weekData.badge}
              </span>
              <span className="text-slate-400 text-xs font-mono">{weekData.hours}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              {weekData.title}
            </h2>
            <p className="text-slate-300 text-sm mt-1 max-w-3xl">
              {weekData.subtitle}
            </p>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-slate-800">
          <button
            onClick={() => setActiveTab('theory')}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'theory'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" /> 1. Contenido Teórico & Simuladores
          </button>

          <button
            onClick={() => setActiveTab('lab')}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'lab'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Wrench className="w-4 h-4" /> 2. Práctica del Viernes
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
              activeTab === 'quiz'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Award className="w-4 h-4" /> 3. Cuestionario de Evaluación ({weekData.quiz.length} Preguntas)
          </button>
        </div>
      </div>

      {/* TAB 1: THEORY & SIMULATORS */}
      {activeTab === 'theory' && (
        <div className="space-y-6">
          {/* Embedded Simulator for current week */}
          {weekData.id === 2 && <DiodeIVSimulator />}
          {weekData.id === 3 && <BJTCurveSimulator />}
          {weekData.id === 4 && <MOSFETSimulator />}

          {/* Theory Sections Cards */}
          <div className="grid grid-cols-1 gap-6">
            {weekData.theorySections.map((sec) => (
              <div key={sec.id} className="card glassmorphism p-6 rounded-2xl border border-slate-800 bg-slate-900/80 text-white space-y-4">
                <h3 className="text-xl font-bold text-cyan-300 border-b border-slate-800 pb-2">
                  {sec.title}
                </h3>
                <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-line font-sans">
                  {sec.content}
                </div>

                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                  <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
                    Conceptos Clave y Puntos de Verificación:
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
                    {sec.keyPoints.map((kp, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{kp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: FRIDAY LAB PRACTICE */}
      {activeTab === 'lab' && (
        <div className="space-y-6">
          <div className="card glassmorphism p-6 rounded-2xl border border-cyan-500/20 shadow-xl bg-slate-900/80 text-white">
            <h3 className="text-2xl font-extrabold text-cyan-300 mb-2">
              {weekData.labPractice.title}
            </h3>
            <p className="text-slate-300 text-sm mb-6 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <strong>Objetivo de Aprendizaje:</strong> {weekData.labPractice.objective}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Hardware Materials List */}
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                <h4 className="font-bold text-sm text-cyan-400 flex items-center gap-2">
                  <Wrench className="w-4 h-4" /> Materiales e Instrumentación Requerida
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {weekData.labPractice.materials.map((mat, i) => (
                    <li key={i} className="flex items-center gap-2 border-b border-slate-900 pb-1">
                      <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                      <span>{mat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Safety Rules */}
              <div className="bg-slate-950 p-5 rounded-xl border border-amber-500/30 space-y-3">
                <h4 className="font-bold text-sm text-amber-400 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4" /> Protocolo de Seguridad e Higiene ESD
                </h4>
                <ul className="space-y-2 text-xs text-slate-300">
                  {weekData.labPractice.safetyNotes.map((sn, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{sn}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Interactive Step-by-Step Accordion */}
            <div className="space-y-4">
              <h4 className="font-bold text-lg text-slate-200 border-b border-slate-800 pb-2">
                Procedimiento Experimental Guiado Paso a Paso
              </h4>

              {weekData.labPractice.steps.map((step) => {
                const isOpen = expandedStep === step.stepNumber;
                return (
                  <div
                    key={step.stepNumber}
                    className={`rounded-xl border transition-all ${
                      isOpen ? 'bg-slate-800/80 border-cyan-500/50 shadow-lg' : 'bg-slate-950 border-slate-800'
                    }`}
                  >
                    <button
                      onClick={() => setExpandedStep(isOpen ? null : step.stepNumber)}
                      className="w-full p-4 flex items-center justify-between text-left font-semibold text-sm text-white"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center font-bold text-xs shrink-0">
                          {step.stepNumber}
                        </span>
                        <span>{step.title}</span>
                      </div>
                      {isOpen ? <ChevronUp className="w-5 h-5 text-cyan-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                    </button>

                    {isOpen && (
                      <div className="p-4 pt-0 border-t border-slate-800/60 space-y-3 text-xs text-slate-300">
                        <p className="leading-relaxed text-slate-200 text-sm">{step.description}</p>
                        <div className="bg-slate-900 p-3 rounded-lg border border-slate-700/60 text-emerald-300">
                          <strong>Resultado Esperado en Pantalla:</strong> {step.expectedResult}
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
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold rounded-xl border border-amber-500/30 flex items-center gap-2 transition-colors"
              >
                {showSolutions ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showSolutions ? "Ocultar Criterios y Solucionario" : "Mostrar Criterios de Evaluación y Solucionario"}
              </button>

              {showSolutions && (
                <div className="mt-4 bg-amber-500/10 p-5 rounded-xl border border-amber-500/30 space-y-3 text-xs text-slate-200">
                  <h5 className="font-bold text-amber-400 text-sm flex items-center gap-2">
                    <Zap className="w-4 h-4" /> {weekData.labPractice.solutionGuide.title}
                  </h5>
                  <ul className="space-y-2 list-disc pl-4 text-slate-300">
                    {weekData.labPractice.solutionGuide.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: GAMIFIED QUIZ HUB */}
      {activeTab === 'quiz' && (
        <div className="space-y-6">
          <div className="card glassmorphism p-6 rounded-2xl border border-cyan-500/20 shadow-xl bg-slate-900/80 text-white">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-6">
              <div>
                <h3 className="text-xl font-bold text-cyan-300">
                  Evaluación Diagostica y Cuestionario de Aprendizaje
                </h3>
                <p className="text-xs text-slate-400">
                  Responda las {weekData.quiz.length} preguntas de opción múltiple para comprobar sus conocimientos.
                </p>
              </div>
              {submittedQuiz && (
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Puntaje Final:</span>
                  <span className="text-2xl font-extrabold text-emerald-400 font-mono">
                    {calculateScore()} / {weekData.quiz.length}
                  </span>
                </div>
              )}
            </div>

            {/* Questions List */}
            <div className="space-y-6">
              {weekData.quiz.map((q, idx) => {
                const isSelected = selectedAnswers[q.id] !== undefined;
                const userChoice = selectedAnswers[q.id];
                const isCorrect = userChoice === q.correctIndex;

                return (
                  <div
                    key={q.id}
                    className={`p-5 rounded-xl border transition-all ${
                      submittedQuiz
                        ? isCorrect
                          ? 'bg-emerald-950/30 border-emerald-500/40'
                          : 'bg-red-950/30 border-red-500/40'
                        : 'bg-slate-950 border-slate-800'
                    }`}
                  >
                    <h4 className="font-bold text-sm text-slate-100 mb-3 flex items-start gap-2">
                      <span className="text-cyan-400 font-mono">{idx + 1}.</span>
                      <span>{q.question}</span>
                    </h4>

                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => {
                        const isThisSelected = userChoice === optIdx;
                        let optionStyle = "bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800";

                        if (submittedQuiz) {
                          if (optIdx === q.correctIndex) {
                            optionStyle = "bg-emerald-900/60 border-emerald-500 text-emerald-200 font-semibold";
                          } else if (isThisSelected && !isCorrect) {
                            optionStyle = "bg-red-900/60 border-red-500 text-red-200 line-through";
                          }
                        } else if (isThisSelected) {
                          optionStyle = "bg-cyan-500/20 border-cyan-400 text-cyan-300 font-semibold";
                        }

                        return (
                          <button
                            key={optIdx}
                            disabled={submittedQuiz}
                            onClick={() => handleOptionSelect(q.id, optIdx)}
                            className={`w-full text-left p-3 rounded-lg border text-xs transition-all flex items-center justify-between ${optionStyle}`}
                          >
                            <span>{opt}</span>
                            {submittedQuiz && optIdx === q.correctIndex && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            )}
                            {submittedQuiz && isThisSelected && !isCorrect && (
                              <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Scientific Explanation Box */}
                    {submittedQuiz && (
                      <div className="mt-3 p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
                        <strong className="text-cyan-400 block mb-1">Fundamento Científico:</strong>
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 pt-4 border-t border-slate-800 flex justify-between items-center">
              {!submittedQuiz ? (
                <button
                  disabled={Object.keys(selectedAnswers).length < weekData.quiz.length}
                  onClick={() => setSubmittedQuiz(true)}
                  className={`px-6 py-3 font-bold rounded-xl text-sm transition-all shadow-lg ${
                    Object.keys(selectedAnswers).length === weekData.quiz.length
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 cursor-pointer shadow-emerald-500/20'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Calificar y Ver Explicaciones
                </button>
              ) : (
                <button
                  onClick={resetQuiz}
                  className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold rounded-xl text-sm transition-colors"
                >
                  Reiniciar Cuestionario
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
