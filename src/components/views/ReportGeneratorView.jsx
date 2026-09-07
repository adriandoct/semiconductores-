import React, { useState } from 'react';
import { FileText, Printer, Plus, Trash2, CheckCircle2, AlertOctagon, Download } from 'lucide-react';

export default function ReportGeneratorView() {
  const [studentName, setStudentName] = useState("");
  const [institution, setInstitution] = useState("CECyTE / CBTis / DGETI");
  const [practiceTitle, setPracticeTitle] = useState("Práctica 2: Caracterización de Curva I-V del Diodo 1N4007");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [conclusions, setConclusions] = useState("El diodo 1N4007 probado cumple con las especificaciones del fabricante. Se observó una caída de voltaje de 0.68V a 10mA con un porcentaje de error del 3.5% respecto al valor teórico ideal.");

  const [measurements, setMeasurements] = useState([
    { id: 1, param: "Voltaje Directo VD (10mA)", teo: 0.70, exp: 0.68, unit: "V" },
    { id: 2, param: "Corriente Inversa IS (-10V)", teo: 0.0, exp: 0.0, unit: "uA" },
    { id: 3, param: "Resistencia Dinámica rd", teo: 6.5, exp: 6.8, unit: "Ω" },
    { id: 4, param: "Voltaje de Codo Vknee", teo: 0.60, exp: 0.58, unit: "V" }
  ]);

  const addRow = () => {
    setMeasurements([
      ...measurements,
      { id: Date.now(), param: "Nuevo Parámetro", teo: 1.0, exp: 1.0, unit: "V" }
    ]);
  };

  const removeRow = (id) => {
    setMeasurements(measurements.filter(m => m.id !== id));
  };

  const updateRow = (id, field, value) => {
    setMeasurements(measurements.map(m => {
      if (m.id === id) {
        return { ...m, [field]: value };
      }
      return m;
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Control Panel (Hidden on Print) */}
      <div className="print:hidden card glassmorphism p-6 rounded-2xl border border-cyan-500/20 shadow-xl bg-slate-900/80 text-white">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-slate-700/60 pb-4">
          <div>
            <h3 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
              <FileText className="w-6 h-6 text-cyan-400" />
              Generador de Reportes Técnicos e Informes de Laboratorio
            </h3>
            <p className="text-sm text-slate-400">
              Llene los datos experimentales para calcular % de error y exportar en formato listo para imprimir o PDF.
            </p>
          </div>
          <button
            onClick={handlePrint}
            className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg flex items-center gap-2 transition-all hover:scale-105"
          >
            <Printer className="w-5 h-5" /> Imprimir / Guardar como PDF
          </button>
        </div>

        {/* Form Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1">Nombre del Alumno / Equipo:</label>
            <input
              type="text"
              value={studentName}
              placeholder="Ej: Adrian Silva / Equipo 3"
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-cyan-300 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1">Institución / Plantel:</label>
            <input
              type="text"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-cyan-300 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1">Título de la Práctica:</label>
            <input
              type="text"
              value={practiceTitle}
              onChange={(e) => setPracticeTitle(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-cyan-300 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1">Fecha de Realización:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-cyan-300 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        {/* Data Table Inputs */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-bold text-sm text-slate-300">Tabla de Datos Teóricos vs Experimentales</h4>
            <button
              onClick={addRow}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-bold rounded-lg border border-slate-700 flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Agregar Medición
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider">
                <tr>
                  <th className="p-3">Parámetro</th>
                  <th className="p-3">Teórico (X_teo)</th>
                  <th className="p-3">Experimental (X_exp)</th>
                  <th className="p-3">Unidad</th>
                  <th className="p-3">% Error Calculado</th>
                  <th className="p-3 text-center">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {measurements.map((m) => {
                  const teoVal = parseFloat(m.teo) || 0.001;
                  const expVal = parseFloat(m.exp) || 0.001;
                  const errorPct = Math.abs((expVal - teoVal) / teoVal) * 100;

                  return (
                    <tr key={m.id} className="hover:bg-slate-800/40">
                      <td className="p-2">
                        <input
                          type="text"
                          value={m.param}
                          onChange={(e) => updateRow(m.id, 'param', e.target.value)}
                          className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1 text-white"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="number"
                          step="0.01"
                          value={m.teo}
                          onChange={(e) => updateRow(m.id, 'teo', parseFloat(e.target.value))}
                          className="w-24 bg-slate-800 border border-slate-700 rounded px-2 py-1 text-cyan-300 font-mono"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="number"
                          step="0.01"
                          value={m.exp}
                          onChange={(e) => updateRow(m.id, 'exp', parseFloat(e.target.value))}
                          className="w-24 bg-slate-800 border border-slate-700 rounded px-2 py-1 text-emerald-300 font-mono"
                        />
                      </td>
                      <td className="p-2">
                        <input
                          type="text"
                          value={m.unit}
                          onChange={(e) => updateRow(m.id, 'unit', e.target.value)}
                          className="w-16 bg-slate-800 border border-slate-700 rounded px-2 py-1 text-slate-300"
                        />
                      </td>
                      <td className="p-2 font-mono font-bold">
                        <span className={errorPct > 10 ? "text-amber-400" : "text-emerald-400"}>
                          {errorPct.toFixed(2)} %
                        </span>
                      </td>
                      <td className="p-2 text-center">
                        <button
                          onClick={() => removeRow(m.id)}
                          className="text-red-400 hover:text-red-300 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-4">
            <label className="text-xs font-semibold text-slate-400 block mb-1">Conclusión y Dictamen Técnico:</label>
            <textarea
              rows={3}
              value={conclusions}
              onChange={(e) => setConclusions(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>
      </div>

      {/* Formal Printable Document View */}
      <div className="bg-white text-slate-900 p-8 rounded-2xl shadow-2xl print:shadow-none border border-slate-300 font-sans max-w-4xl mx-auto">
        {/* Header */}
        <div className="border-b-2 border-slate-900 pb-4 mb-6 flex justify-between items-start">
          <div>
            <h1 className="text-xl font-bold uppercase tracking-wider text-slate-900">
              {institution || "INSTITUCIÓN EDUCATIVA / LABORATORIO"}
            </h1>
            <h2 className="text-base font-semibold text-blue-900 mt-1">
              REPORTE TÉCNICO DE CARACTERIZACIÓN DE DISPOSITIVOS SEMICONDUCTORES
            </h2>
            <p className="text-xs text-slate-600 font-medium mt-1">{practiceTitle}</p>
          </div>
          <div className="text-right text-xs text-slate-600 font-mono">
            <p><strong>Fecha:</strong> {date}</p>
            <p><strong>Alumno:</strong> {studentName || "Sin especificar"}</p>
          </div>
        </div>

        {/* Body Table */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2 border-l-4 border-blue-900 pl-2">
            1. Tabla Comparativa de Mediciones Experimentales
          </h3>

          <table className="w-full text-left border-collapse border border-slate-300 text-xs">
            <thead>
              <tr className="bg-slate-100 text-slate-800 font-bold border-b border-slate-300">
                <th className="p-2 border border-slate-300">Parámetro</th>
                <th className="p-2 border border-slate-300 text-right">Valor Teórico</th>
                <th className="p-2 border border-slate-300 text-right">Valor Medido</th>
                <th className="p-2 border border-slate-300 text-right">% Porcentaje Error</th>
                <th className="p-2 border border-slate-300 text-center">Dictamen</th>
              </tr>
            </thead>
            <tbody>
              {measurements.map((m) => {
                const teoVal = parseFloat(m.teo) || 0.001;
                const expVal = parseFloat(m.exp) || 0.001;
                const errorPct = Math.abs((expVal - teoVal) / teoVal) * 100;
                const isPass = errorPct <= 10.0;

                return (
                  <tr key={m.id} className="border-b border-slate-200">
                    <td className="p-2 border border-slate-300 font-medium">{m.param}</td>
                    <td className="p-2 border border-slate-300 text-right font-mono">{m.teo} {m.unit}</td>
                    <td className="p-2 border border-slate-300 text-right font-mono">{m.exp} {m.unit}</td>
                    <td className="p-2 border border-slate-300 text-right font-mono font-bold">
                      {errorPct.toFixed(2)} %
                    </td>
                    <td className="p-2 border border-slate-300 text-center font-bold">
                      <span className={isPass ? "text-emerald-700" : "text-amber-700"}>
                        {isPass ? "CONFORME" : "TOLERANCIA ALTA"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Formula breakdown */}
        <div className="mb-6 bg-slate-50 p-4 rounded border border-slate-200 text-xs">
          <p className="font-bold text-slate-800 mb-1">Ecuación de Porcentaje de Error Utilizada:</p>
          <p className="font-mono text-slate-700">
            % Error = | ( Valor_Experimental - Valor_Teórico ) / Valor_Teórico | × 100%
          </p>
        </div>

        {/* Conclusions */}
        <div className="mb-8">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2 border-l-4 border-blue-900 pl-2">
            2. Dictamen Técnico y Conclusiones del Laboratorio
          </h3>
          <p className="text-xs text-slate-700 leading-relaxed border p-3 rounded bg-slate-50 font-serif">
            {conclusions}
          </p>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-2 gap-12 pt-8 border-t border-slate-400 text-center text-xs">
          <div>
            <div className="border-b border-slate-400 pb-1 mb-1"></div>
            <p className="font-bold">{studentName || "Firma del Alumno"}</p>
            <p className="text-slate-500">Estudiante Responsable</p>
          </div>
          <div>
            <div className="border-b border-slate-400 pb-1 mb-1"></div>
            <p className="font-bold">Firma del Docente Evaluador</p>
            <p className="text-slate-500">Laboratorio de Electrónica</p>
          </div>
        </div>
      </div>
    </div>
  );
}
