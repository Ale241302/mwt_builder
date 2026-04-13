import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { Check, X, Play } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function CodeEditorModal({ onClose, onSave, initialField }) {
  const { isLightMode } = useTheme();
  
  // States
  const [language, setLanguage] = useState(initialField?.language || 'python');
  const [code, setCode] = useState(initialField?.code || '');
  const [previewOut, setPreviewOut] = useState('');
  
  const getExtensions = () => {
    switch(language) {
      case 'python': return [python()];
      case 'javascript': return [javascript()];
      case 'react': return [javascript({ jsx: true })];
      case 'html': return [html()];
      default: return [];
    }
  };

  const handleSave = () => {
    onSave({ ...initialField, language, code });
  };

  const handlePreview = () => {
    setPreviewOut('La previsualización interactiva completa está en el Preview. Guarde y abra "Vista Previa" para ejecutar este código en un iframe.');
  };

  return (
    <div className="fixed inset-0 bg-[#0B1E3A]/90 backdrop-blur-xl flex items-center justify-center z-[150] p-6 animate-scale-in">
      <div className={`border p-8 rounded-[2.5rem] shadow-2xl max-w-4xl w-full flex flex-col max-h-[90vh] ${isLightMode ? 'bg-white border-slate-200' : 'bg-[#0B1E3A] border-white/10'}`}>
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className={`text-2xl font-bold ${isLightMode ? 'text-slate-800' : 'text-white'}`}>Editor de Código</h3>
            <p className={`text-sm ${isLightMode ? 'text-slate-500' : 'text-white/40'} tracking-widest uppercase mt-1 text-[10px] font-bold`}>
              {initialField?.label || 'Bloque de Ejecución'}
            </p>
          </div>
          
          <select 
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className={`p-3 rounded-xl border font-bold text-sm outline-none cursor-pointer ${
              isLightMode 
                ? 'bg-slate-100 border-slate-200 text-slate-800 focus:border-mwt-turquoise' 
                : 'bg-white/5 border-white/10 text-white focus:border-mwt-turquoise'
            }`}
          >
            <option value="python" className={isLightMode ? 'text-slate-800' : 'text-[#0B1E3A]'}>Python (Pyodide)</option>
            <option value="javascript" className={isLightMode ? 'text-slate-800' : 'text-[#0B1E3A]'}>JS (Vanilla)</option>
            <option value="react" className={isLightMode ? 'text-slate-800' : 'text-[#0B1E3A]'}>React (JSX)</option>
            <option value="html" className={isLightMode ? 'text-slate-800' : 'text-[#0B1E3A]'}>HTML/CSS</option>
          </select>
        </div>

        {/* Editor Area */}
        <div className="flex-1 overflow-hidden flex flex-col gap-4 min-h-[300px]">
          <div className="flex-1 border border-white/10 rounded-2xl overflow-hidden shadow-inner relative z-0">
            <CodeMirror
              value={code}
              height="100%"
              theme={isLightMode ? "light" : "dark"}
              extensions={getExtensions()}
              onChange={(val) => setCode(val)}
              className="h-full text-base"
              style={{ minHeight: '300px', height: '100%' }}
            />
          </div>
          
          {previewOut && (
            <div className={`p-4 rounded-xl text-xs font-bold font-mono border ${isLightMode ? 'bg-slate-100 border-slate-200 text-slate-600' : 'bg-white/5 border-white/10 text-white/60'}`}>
              &gt; {previewOut}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-6 gap-4">
          <button 
            onClick={onClose}
            className={`px-6 py-3 rounded-xl font-bold transition-all uppercase tracking-widest text-[10px] ${
              isLightMode ? 'text-slate-500 hover:bg-slate-100' : 'text-white/40 hover:bg-white/5'
            }`}
          >
            Cancelar
          </button>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={handlePreview}
              className={`flex items-center gap-2 px-6 py-3 border rounded-xl font-bold transition-all uppercase tracking-widest text-[10px] ${
                isLightMode ? 'border-slate-200 text-slate-600 hover:border-slate-400' : 'border-white/10 text-white/60 hover:border-white/30 hover:bg-white/5'
              }`}
            >
              <Play className="w-3 h-3" />
              Verificar
            </button>

            <button 
              onClick={handleSave}
              className="flex items-center gap-2 px-8 py-3 bg-mwt-turquoise hover:bg-[#00B286] text-[#0B1E3A] font-extrabold rounded-xl shadow-xl shadow-mwt-turquoise/10 transition-all active:scale-95 uppercase tracking-widest text-[10px]"
            >
              <Check className="w-4 h-4" />
              Guardar Código
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
