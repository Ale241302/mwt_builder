import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Type, Hash, AlignLeft, Calendar, CheckSquare, FileUp, 
  ChevronDown, Radio, ChevronLeft, Send, Sparkles, LayoutGrid
} from 'lucide-react';
import api from '../api/config';
import { useTheme } from '../context/ThemeContext';

const Preview = () => {
  const { isLightMode } = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id === 'local') {
      const localData = sessionStorage.getItem('preview_data');
      if (localData) {
        setData(JSON.parse(localData));
      }
      setLoading(false);
    } else {
      fetchArtefacto();
    }
  }, [id]);

  const fetchArtefacto = async () => {
    try {
      const response = await api.get(`/api/artefactos/${id}/`);
      setData({
        title: response.data.title,
        sections: response.data.structure_json.sections || []
      });
    } catch (err) {
      console.error('Error loading preview', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B1E3A] flex flex-col items-center justify-center text-white">
        <div className="w-12 h-12 border-4 border-mwt-turquoise border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">Generando Vista Previa...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#0B1E3A] flex flex-col items-center justify-center text-white p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">No se encontraron datos para la vista previa</h2>
        <button 
          onClick={() => window.close()}
          className="px-8 py-3 bg-white/5 hover:bg-white/10 rounded-full font-bold transition-all text-xs uppercase tracking-widest border border-white/10"
        >
          Cerrar Ventana
        </button>
      </div>
    );
  }

  const renderField = (field) => {
    const commonClasses = `w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-1 focus:ring-mwt-turquoise outline-none transition-all text-sm placeholder:text-white/10`;
    
    switch (field.type) {
      case 'textarea':
        return <textarea className={`${commonClasses} min-h-[100px] resize-none`} placeholder="..." />;
      case 'select':
        return (
          <div className="relative group">
            <select className={`${commonClasses} appearance-none pr-10 hover:border-white/20 cursor-pointer`}>
              <option value="" disabled selected>Seleccionar...</option>
              {field.options?.map((opt, i) => (
                <option key={i} value={typeof opt === 'string' ? opt : opt.label}>
                  {typeof opt === 'string' ? opt : opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20 pointer-events-none group-hover:text-mwt-turquoise transition-colors" />
          </div>
        );
      case 'radio':
        return (
          <div className="space-y-3 mt-2">
            {field.options?.map((opt, i) => (
              <label key={i} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input type="radio" name={field.id} className="peer appearance-none w-5 h-5 border border-white/20 rounded-full checked:border-mwt-turquoise checked:border-[5px] transition-all" />
                  <div className="absolute w-2 h-2 bg-mwt-blue-dark rounded-full opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                </div>
                <span className="text-sm text-white/60 group-hover:text-white transition-colors">
                  {typeof opt === 'string' ? opt : opt.label}
                </span>
              </label>
            ))}
          </div>
        );
      case 'checkbox':
        return (
          <label className="flex items-center gap-3 cursor-pointer group mt-2">
            <input type="checkbox" className="appearance-none w-5 h-5 border border-white/20 rounded-lg checked:bg-mwt-turquoise transition-all cursor-pointer relative after:content-['✓'] after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:text-[#0B1E3A] after:font-bold after:text-xs after:opacity-0 checked:after:opacity-100" />
            <span className="text-sm text-white/60 group-hover:text-white transition-colors">{field.label}</span>
          </label>
        );
      default:
        return <input type={field.type === 'number' ? 'number' : field.type === 'date' ? 'date' : 'text'} className={commonClasses} placeholder="..." />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 bg-[#0B1E3A] text-white selection:bg-mwt-turquoise/30 relative overflow-x-hidden p-8 md:p-12`}>
      {/* Background Blurs */}
      <div className="fixed top-[-10%] left-[-5%] w-[50%] h-[50%] bg-mwt-turquoise/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-mwt-royal-blue/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto space-y-12 animate-slide-up">
        {/* Header - Preview Decoration */}
        <div className="flex items-center justify-between pb-8 border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group animate-pulse">
              <Sparkles className="h-6 w-6 text-mwt-turquoise" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                {data.title}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[9px] font-bold text-mwt-turquoise uppercase tracking-[0.4em] opacity-60">Vista Previa Corporativa</span>
                <div className="w-1 h-1 rounded-full bg-white/20"></div>
                <span className="text-[9px] font-bold text-white/20 uppercase tracking-[0.4em]">Id: {id}</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => window.close()}
            className="hidden md:flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" /> Volver al Editor
          </button>
        </div>

        {/* Form Body */}
        <form className="space-y-10 pb-20" onSubmit={(e) => e.preventDefault()}>
          {data.sections.map((section, sIdx) => (
            <div 
              key={section.id} 
              className="glass-card rounded-[2.5rem] p-4 border border-white/5 overflow-hidden animate-scale-in"
              style={{ animationDelay: `${sIdx * 100}ms` }}
            >
              <div className="bg-white/[0.02] px-8 py-4 border-b border-white/5 -m-4 mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-mwt-turquoise"></div>
                  <span className="text-[10px] font-extrabold text-white/20 uppercase tracking-[0.2em]">Sección {sIdx + 1}</span>
                </div>
                <LayoutGrid className="h-3.5 w-3.5 text-white/10" />
              </div>

              <div className={`grid gap-8 p-6 ${
                section.columns.length === 1 ? 'grid-cols-1' : 
                section.columns.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 
                'grid-cols-1 md:grid-cols-3'
              }`}>
                {section.columns.map((column) => (
                  <div key={column.id} className="space-y-8 h-full min-h-[20px]">
                    {column.fields.map((field) => (
                      <div key={field.id} className="space-y-3 group/field">
                        {field.type !== 'checkbox' && (
                          <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-1 group-hover/field:text-mwt-turquoise transition-colors block">
                            {field.label}
                          </label>
                        )}
                        {renderField(field)}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Submit Button Section */}
          <div className="flex justify-center pt-8 animate-slide-up" style={{ animationDelay: `${data.sections.length * 100}ms` }}>
            <button 
              type="submit"
              className="group relative bg-[#1DE394] hover:bg-[#00B286] text-[#0B1E3A] px-12 py-4 rounded-full font-bold shadow-2xl shadow-[#1DE394]/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-3 uppercase tracking-[0.3em] text-xs"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 rounded-full"></div>
              <Send className="h-4 w-4 relative z-10" /> 
              <span className="relative z-10">Enviar Formulario</span>
            </button>
          </div>
        </form>
      </div>

      {/* Floating Badge */}
      <div className="fixed bottom-8 right-8 px-4 py-2 bg-mwt-turquoise/10 backdrop-blur-md border border-mwt-turquoise/20 rounded-full flex items-center gap-2 animate-bounce">
        <div className="w-2 h-2 rounded-full bg-mwt-turquoise"></div>
        <span className="text-[8px] font-black text-mwt-turquoise uppercase tracking-widest">Entorno Seguro de Pruebas</span>
      </div>
    </div>
  );
};

export default Preview;
