import React, { useState } from 'react';
import { DATASHEETS_DATA } from '../../data/datasheets';
import { Search, Eye, HelpCircle, Shield, ArrowRight, Check } from 'lucide-react';

export default function PinoutInspector() {
  const [selectedId, setSelectedId] = useState("1N4007");
  const [activeTab, setActiveTab] = useState("pinout"); // 'pinout' | 'multimeter' | 'specs'

  const currentComp = DATASHEETS_DATA.find((c) => c.id === selectedId) || DATASHEETS_DATA[0];

  return (
    <div className="card glassmorphism p-6 rounded-2xl border border-cyan-500/20 shadow-xl bg-slate-900/80 text-white">
      {/* Title & Selector */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-slate-700/60 pb-4">
        <div>
          <h3 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
            <Eye className="w-6 h-6 text-cyan-400" />
            Inspector de Encapsulados, Terminales y Datasheets
          </h3>
          <p className="text-sm text-slate-400">
            Identificación de patillaje físico, polaridad y guía de medición en multímetro
          </p>
        </div>

        {/* Component Switcher Dropdown */}
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400 font-medium">Componente:</label>
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="bg-slate-800 border border-slate-600 text-cyan-300 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-cyan-400 font-bold"
          >
            {DATASHEETS_DATA.map((comp) => (
              <option key={comp.id} value={comp.id}>
                {comp.name} — ({comp.package})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-700 mb-6 gap-2">
        <button
          onClick={() => setActiveTab("pinout")}
          className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors flex items-center gap-2 ${
            activeTab === "pinout"
              ? "bg-slate-800 text-cyan-400 border-b-2 border-cyan-400"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Eye className="w-4 h-4" /> Distribución de Patillas
        </button>

        <button
          onClick={() => setActiveTab("multimeter")}
          className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors flex items-center gap-2 ${
            activeTab === "multimeter"
              ? "bg-slate-800 text-cyan-400 border-b-2 border-cyan-400"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <HelpCircle className="w-4 h-4" /> Guía de Medición con Multímetro
        </button>

        <button
          onClick={() => setActiveTab("specs")}
          className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors flex items-center gap-2 ${
            activeTab === "specs"
              ? "bg-slate-800 text-cyan-400 border-b-2 border-cyan-400"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          <Shield className="w-4 h-4" /> Especificaciones Datasheet
        </button>
      </div>

      {/* Content area */}
      {activeTab === "pinout" && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Left Diagram */}
          <div className="md:col-span-6 bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col items-center justify-center min-h-[240px]">
            <span className="text-xs text-slate-400 mb-4 font-semibold uppercase tracking-wider">
              Encapsulado {currentComp.package}
            </span>

            {/* Custom SVG Package Visualizations */}
            {currentComp.package.includes("DO-41") || currentComp.package.includes("DO-35") ? (
              <div className="flex flex-col items-center">
                <svg viewBox="0 0 300 90" className="w-64 h-auto">
                  {/* Left Wire */}
                  <line x1="20" y1="45" x2="80" y2="45" stroke="#cbd5e1" strokeWidth="4" />
                  {/* Body */}
                  <rect x="80" y="25" width="140" height="40" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                  {/* Cathode Band */}
                  <rect x="190" y="25" width="16" height="40" fill="#e2e8f0" />
                  {/* Right Wire */}
                  <line x1="220" y1="45" x2="280" y2="45" stroke="#cbd5e1" strokeWidth="4" />
                  {/* Labels */}
                  <text x="40" y="75" fill="#38bdf8" fontSize="12" fontWeight="bold">Ánodo (+)</text>
                  <text x="230" y="75" fill="#f43f5e" fontSize="12" fontWeight="bold">Cátodo (-)</text>
                </svg>
              </div>
            ) : currentComp.package.includes("TO-92") ? (
              <div className="flex flex-col items-center">
                <svg viewBox="0 0 240 180" className="w-56 h-auto">
                  {/* Package Body (D-Shape flat front) */}
                  <path d="M 60 20 A 60 60 0 0 1 180 20 L 180 60 L 60 60 Z" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
                  <rect x="60" y="60" width="120" height="15" fill="#0f172a" stroke="#64748b" strokeWidth="1" />
                  <text x="120" y="50" fill="#94a3b8" fontSize="11" textAnchor="middle">Vista Frontal Plana</text>
                  {/* Pins */}
                  <line x1="80" y1="75" x2="80" y2="150" stroke="#cbd5e1" strokeWidth="4" />
                  <line x1="120" y1="75" x2="120" y2="150" stroke="#cbd5e1" strokeWidth="4" />
                  <line x1="160" y1="75" x2="160" y2="150" stroke="#cbd5e1" strokeWidth="4" />
                  {/* Labels */}
                  <text x="80" y="170" fill="#38bdf8" fontSize="11" textAnchor="middle" fontWeight="bold">
                    {currentComp.pins[0]?.name.split(":")[1] || "1"}
                  </text>
                  <text x="120" y="170" fill="#a855f7" fontSize="11" textAnchor="middle" fontWeight="bold">
                    {currentComp.pins[1]?.name.split(":")[1] || "2"}
                  </text>
                  <text x="160" y="170" fill="#10b981" fontSize="11" textAnchor="middle" fontWeight="bold">
                    {currentComp.pins[2]?.name.split(":")[1] || "3"}
                  </text>
                </svg>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <svg viewBox="0 0 240 200" className="w-56 h-auto">
                  {/* TO-220 Metal Tab */}
                  <rect x="70" y="15" width="100" height="40" rx="4" fill="#94a3b8" stroke="#cbd5e1" strokeWidth="2" />
                  <circle cx="120" cy="30" r="10" fill="#0f172a" />
                  {/* Black Plastic Body */}
                  <rect x="60" y="50" width="120" height="70" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                  <text x="120" y="90" fill="#e2e8f0" fontSize="12" textAnchor="middle" fontWeight="bold">{currentComp.name}</text>
                  {/* Pins */}
                  <line x1="80" y1="120" x2="80" y2="180" stroke="#cbd5e1" strokeWidth="5" />
                  <line x1="120" y1="120" x2="120" y2="180" stroke="#cbd5e1" strokeWidth="5" />
                  <line x1="160" y1="120" x2="160" y2="180" stroke="#cbd5e1" strokeWidth="5" />
                  {/* Pin Labels */}
                  <text x="80" y="198" fill="#38bdf8" fontSize="11" textAnchor="middle" fontWeight="bold">1: Gate</text>
                  <text x="120" y="198" fill="#a855f7" fontSize="11" textAnchor="middle" fontWeight="bold">2: Drain</text>
                  <text x="160" y="198" fill="#10b981" fontSize="11" textAnchor="middle" fontWeight="bold">3: Source</text>
                </svg>
              </div>
            )}
          </div>

          {/* Right Pins Detail list */}
          <div className="md:col-span-6 space-y-4">
            <h4 className="font-bold text-lg text-slate-200 border-b border-slate-700 pb-2">
              Descripción de Terminales ({currentComp.pins.length} Pines)
            </h4>
            <div className="space-y-3">
              {currentComp.pins.map((pin, idx) => (
                <div key={idx} className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/60 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center font-bold text-sm shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <h5 className="font-semibold text-cyan-300 text-sm">{pin.name}</h5>
                    <p className="text-xs text-slate-300 mt-0.5">{pin.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-slate-800/30 p-3 rounded-lg border border-slate-700/40 text-xs text-slate-400 mt-4">
              <strong>Nota de encapsulado:</strong> {currentComp.description}
            </div>
          </div>
        </div>
      )}

      {activeTab === "multimeter" && (
        <div className="space-y-4 bg-slate-950 p-5 rounded-xl border border-slate-800">
          <h4 className="font-bold text-cyan-400 text-base flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-cyan-400" />
            Procedimiento de Prueba en Multímetro Digital para {currentComp.name}
          </h4>

          {currentComp.type.includes("Diodo") ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
                <h5 className="font-semibold text-emerald-400 mb-2 flex items-center gap-1.5">
                  <Check className="w-4 h-4" /> 1. Prueba en Polarización Directa
                </h5>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                  <li>Punta ROJA (+) al Ánodo (lado sin franja).</li>
                  <li>Punta NEGRA (-) al Cátodo (lado con franja).</li>
                  <li><strong className="text-cyan-300">Lectura esperada:</strong> {currentComp.specs.VF}</li>
                </ul>
              </div>

              <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
                <h5 className="font-semibold text-red-400 mb-2 flex items-center gap-1.5">
                  <ArrowRight className="w-4 h-4" /> 2. Prueba en Polarización Inversa
                </h5>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                  <li>Punta ROJA (+) al Cátodo.</li>
                  <li>Punta NEGRA (-) al Ánodo.</li>
                  <li><strong className="text-cyan-300">Lectura esperada:</strong> 'OL' (Circuito abierto / Bloqueo).</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900 p-4 rounded-lg border border-slate-800 text-xs text-slate-300 space-y-2">
              <p><strong>Identificación de Unión NPN en BJT:</strong></p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Colocar punta ROJA (+) en la patilla de Base.</li>
                <li>Probar con la NEGRA (-) en Emisor: Lectura típica de 0.68V - 0.72V.</li>
                <li>Probar con la NEGRA (-) en Colector: Lectura típica de 0.67V - 0.70V (ligeramente menor a B-E).</li>
                <li>Invertir la punta ROJA a Colector y NEGRA a Emisor: Debe marcar 'OL'.</li>
              </ol>
            </div>
          )}
        </div>
      )}

      {activeTab === "specs" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(currentComp.specs).map(([key, val]) => (
            <div key={key} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{key}</span>
              <span className="font-mono text-sm text-cyan-300 font-bold">{val}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
