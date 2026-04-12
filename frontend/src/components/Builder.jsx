import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Type, Hash, AlignLeft, Calendar, CheckSquare, FileUp, 
  ChevronDown, Radio, Plus, Settings, Trash2, Eye, Save, Move,
  ChevronLeft, Sparkles, AlertCircle, Copy, ShieldCheck, ChevronRight, List, Pencil,
  Sun, Moon
} from 'lucide-react';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';

const FIELD_TYPES = [
  { id: 'text', icon: Type, label: 'Texto' },
  { id: 'number', icon: Hash, label: 'Número' },
  { id: 'textarea', icon: AlignLeft, label: 'Área de Texto' },
  { id: 'date', icon: Calendar, label: 'Fecha' },
  { id: 'checkbox', icon: CheckSquare, label: 'Casilla' },
  { id: 'file', icon: FileUp, label: 'Archivo' },
  { id: 'select', icon: ChevronDown, label: 'Selección' },
  { id: 'radio', icon: Radio, label: 'Botón Radio' },
];

const Builder = () => {
  const { isLightMode, toggleTheme } = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('Nuevo Artefacto');
  const [sections, setSections] = useState([]);
  const [showSectionModal, setShowSectionModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  
  const [showFieldModal, setShowFieldModal] = useState(false);
  const [fieldLabel, setFieldLabel] = useState('');
  const [pendingFieldDrop, setPendingFieldDrop] = useState(null);
  
  const [isSaving, setIsSaving] = useState(false);
  
  // New States for Configuration Modals
  const [configSection, setConfigSection] = useState(null);
  const [showLayoutModal, setShowLayoutModal] = useState(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [permTarget, setPermTarget] = useState(null); // { type: 'section' | 'field', id, secId, colId }
  const [permMode, setPermMode] = useState('view'); // 'view' | 'edit'
  
  const [editField, setEditField] = useState(null); // { secId, colId, field }
  const [showEditFieldModal, setShowEditFieldModal] = useState(false);
  const [showSectionConfigModal, setShowSectionConfigModal] = useState(false);
  const [configTargetSection, setConfigTargetSection] = useState(null);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [optionsTarget, setOptionsTarget] = useState(null); // { secId, colId, fieldId, type, options }
  const [showOptionNameModal, setShowOptionNameModal] = useState(false);
  const [editingOption, setEditingOption] = useState(null); // { id, label }
  const [isAddingOption, setIsAddingOption] = useState(false);

  useEffect(() => {
    if (id) fetchArtefacto();
  }, [id]);

  const fetchArtefacto = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:8000/api/artefactos/${id}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTitle(response.data.title);
      setSections(response.data.structure_json.sections || []);
    } catch (err) {
      console.error('Error loading artefacto', err);
    }
  };

  const handleAddSection = (cols) => {
    const newSection = {
      id: `section-${Date.now()}`,
      columns: Array.from({ length: cols }, (_, i) => ({
        id: `col-${Date.now()}-${i}`,
        fields: []
      })),
      permissions: { view: 'Todos', edit: 'Todos' }
    };
    setSections([...sections, newSection]);
    setShowSectionModal(false);
  };

  const handleFieldDrop = (sectionId, colId, typeId) => {
    setPendingFieldDrop({ sectionId, colId, typeId });
    setFieldLabel('');
    setShowFieldModal(true);
  };

  const confirmAddField = () => {
    if (!fieldLabel.trim()) return;
    
    const { sectionId, colId, typeId } = pendingFieldDrop;
    const newField = {
      id: `field-${Date.now()}`,
      type: typeId,
      label: fieldLabel,
      options: [],
      permissions: { view: 'Todos', edit: 'Todos' }
    };

    setSections(sections.map(s => {
      if (s.id === sectionId) {
        return {
          ...s,
          columns: s.columns.map(c => {
            if (c.id === colId) {
              return { ...c, fields: [...c.fields, newField] };
            }
            return c;
          })
        };
      }
      return s;
    }));
    
    setShowFieldModal(false);
    setPendingFieldDrop(null);
  };

  const handleDuplicateSection = (id) => {
    const sectionIndex = sections.findIndex(s => s.id === id);
    if (sectionIndex === -1) return;
    
    const sectionToCopy = sections[sectionIndex];
    const newSection = {
      ...sectionToCopy,
      id: `section-${Date.now()}`,
      columns: sectionToCopy.columns.map(c => ({
        ...c,
        id: `col-${Date.now()}-${Math.random()}`,
        fields: c.fields.map(f => ({ ...f, id: `field-${Date.now()}-${Math.random()}` }))
      }))
    };
    
    const newSections = [...sections];
    newSections.splice(sectionIndex + 1, 0, newSection);
    setSections(newSections);
  };

  const handleDuplicateField = (secId, colId, fieldId) => {
    setSections(sections.map(s => {
      if (s.id === secId) {
        return {
          ...s,
          columns: s.columns.map(c => {
            if (c.id === colId) {
              const fieldIndex = c.fields.findIndex(f => f.id === fieldId);
              if (fieldIndex === -1) return c;
              const fieldToCopy = c.fields[fieldIndex];
              const newField = { ...fieldToCopy, id: `field-${Date.now()}` };
              const newFields = [...c.fields];
              newFields.splice(fieldIndex + 1, 0, newField);
              return { ...c, fields: newFields };
            }
            return c;
          })
        };
      }
      return s;
    }));
  };

  const handleDeleteField = (secId, colId, fieldId) => {
    setSections(sections.map(s => {
      if (s.id === secId) {
        return {
          ...s,
          columns: s.columns.map(c => {
            if (c.id === colId) {
              return { ...c, fields: c.fields.filter(f => f.id !== fieldId) };
            }
            return c;
          })
        };
      }
      return s;
    }));
  };

  const handleUpdateLayout = (sectionId, newColCount) => {
    setSections(sections.map(s => {
      if (s.id === sectionId) {
        // Collect all existing fields
        const allFields = s.columns.flatMap(c => c.fields);
        
        // Create new columns
        const newColumns = Array.from({ length: newColCount }, (_, i) => ({
          id: `col-${Date.now()}-${i}`,
          fields: i === 0 ? allFields : [] // All fields merge into the first column if reducing, or stay there if expanding
        }));
        
        return { ...s, columns: newColumns };
      }
      return s;
    }));
    setShowLayoutModal(false);
  };

  const handleUpdatePermissions = (type, updates, target) => {
    if (type === 'section') {
      setSections(sections.map(s => s.id === target.id ? { ...s, permissions: { ...s.permissions, ...updates } } : s));
    } else if (target.type === 'option') {
      setSections(sections.map(s => {
        if (s.id === target.secId) {
          return {
            ...s,
            columns: s.columns.map(c => {
              if (c.id === target.colId) {
                return {
                  ...c,
                  fields: c.fields.map(f => {
                    if (f.id === target.fieldId) {
                      return {
                        ...f,
                        options: f.options.map(o => o.id === target.optionId ? { ...o, permissions: { ...o.permissions, ...updates } } : o)
                      };
                    }
                    return f;
                  })
                };
              }
              return c;
            })
          };
        }
        return s;
      }));
    } else {
      setSections(sections.map(s => {
        if (s.id === target.secId) {
          return {
            ...s,
            columns: s.columns.map(c => {
              if (c.id === target.colId) {
                return {
                  ...c,
                  fields: c.fields.map(f => f.id === target.id ? { ...f, permissions: { ...f.permissions, ...updates } } : f)
                };
              }
              return c;
            })
          };
        }
        return s;
      }));
    }
    setShowPermissionsModal(false);
  };

  const handleUpdateFieldName = (secId, colId, fieldId, newLabel) => {
    setSections(sections.map(s => {
      if (s.id === secId) {
        return {
          ...s,
          columns: s.columns.map(c => {
            if (c.id === colId) {
              return {
                ...c,
                fields: c.fields.map(f => f.id === fieldId ? { ...f, label: newLabel } : f)
              };
            }
            return c;
          })
        };
      }
      return s;
    }));
    setShowEditFieldModal(false);
  };

  const handleUpdateOptions = (secId, colId, fieldId, newOptions) => {
    setSections(sections.map(s => {
      if (s.id === secId) {
        return {
          ...s,
          columns: s.columns.map(c => {
            if (c.id === colId) {
              return {
                ...c,
                fields: c.fields.map(f => f.id === fieldId ? { ...f, options: newOptions } : f)
              };
            }
            return c;
          })
        };
      }
      return s;
    }));
    setShowOptionsModal(false);
  };

  const handleMoveField = (srcSecId, srcColId, fieldId, destSecId, destColId) => {
    let fieldToMove = null;
    
    // 1. Find and Extract
    const nextSections = sections.map(s => {
      if (s.id === srcSecId) {
        return {
          ...s,
          columns: s.columns.map(c => {
            if (c.id === srcColId) {
              fieldToMove = c.fields.find(f => f.id === fieldId);
              return { ...c, fields: c.fields.filter(f => f.id !== fieldId) };
            }
            return c;
          })
        };
      }
      return s;
    });

    if (!fieldToMove) return;

    // 2. Insert into destination
    setSections(nextSections.map(s => {
      if (s.id === destSecId) {
        return {
          ...s,
          columns: s.columns.map(c => {
            if (c.id === destColId) {
              return { ...c, fields: [...c.fields, fieldToMove] };
            }
            return c;
          })
        };
      }
      return s;
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem('token');
      const data = {
        title: title,
        structure_json: { sections },
        status: 'Published'
      };
      
      if (id) {
        await axios.put(`http://localhost:8000/api/artefactos/${id}/`, data, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('http://localhost:8000/api/artefactos/', data, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      navigate('/dashboard');
    } catch (err) {
      alert('Error al guardar: ' + (err.response?.data?.detail || err.message));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1E3A] flex flex-col h-screen overflow-hidden text-white selection:bg-mwt-turquoise/30">
      {/* Background Ambient Blurs */}
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#1DE394]/5 rounded-full blur-[150px] pointer-events-none"></div>
      
      {/* Header */}
      <header className="h-20 border-b border-white/5 px-8 flex items-center justify-between backdrop-blur-md bg-[#0B1E3A]/80 z-20 flex-shrink-0 animate-slide-up">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigate('/dashboard')}
            className="p-2 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10 transition-all active:scale-90"
          >
            <ChevronLeft className="h-5 w-5 text-white/40" />
          </button>
          <div className="flex items-center gap-4">
            <div className="p-2 bg-gradient-to-br from-[#00B286] to-[#1DE394] rounded-xl shadow-lg shadow-[#00B286]/20 animate-pulse">
              <img src="https://mwt.one/images/Recurso%203logo_login.png" alt="Favicon" className="h-6 w-6 object-contain filter brightness-0 invert" />
            </div>
            <div className="flex flex-col">
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                className="text-lg font-bold bg-transparent outline-none border-b-2 border-transparent focus:border-mwt-turquoise/50 transition-all px-1 max-w-[300px]"
                placeholder="Nombre del Artefacto"
              />
              <span className="text-[9px] font-bold text-mwt-turquoise/60 uppercase tracking-[0.2em] ml-1">Builder Mode Alpha</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 mr-6 text-[10px] font-bold text-white/20 uppercase tracking-widest">
            <div className="w-1.5 h-1.5 rounded-full bg-mwt-turquoise animate-ping"></div>
            Auto-saving active
          </div>
          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10 transition-all active:scale-90 text-white/40 hover:text-mwt-turquoise"
            title={isLightMode ? 'Cambiar a Modo Oscuro' : 'Cambiar a Modo Luz'}
          >
            {isLightMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
          <button className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white rounded-full font-bold transition-all flex items-center gap-2 text-xs border border-white/5 uppercase tracking-widest">
            <Eye className="h-4 w-4" /> Vista Previa
          </button>
          <button 
            onClick={() => setShowSaveModal(true)}
            className="bg-[#1DE394] hover:bg-[#00B286] text-[#0B1E3A] px-8 py-2.5 rounded-full font-bold shadow-xl shadow-[#1DE394]/10 transition-all hover:shadow-[#1DE394]/30 active:scale-95 flex items-center gap-2 text-xs uppercase tracking-widest"
          >
            <Save className="h-4 w-4" /> Guardar
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative z-10 max-w-full">
        {/* Left Side Panel - Tools Section */}
        <aside className="w-64 border-r border-white/5 bg-[#0B1E3A]/60 backdrop-blur-xl overflow-y-auto p-6 flex flex-col gap-5 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-mwt-turquoise" />
            <h3 className="text-[10px] font-extrabold text-white/30 uppercase tracking-[0.3em]">Componentes</h3>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            {FIELD_TYPES.map((type) => (
              <div 
                key={type.id}
                draggable
                onDragStart={(e) => e.dataTransfer.setData('fieldType', type.id)}
                className="group p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-mwt-turquoise/30 hover:bg-white/5 cursor-grab active:cursor-grabbing transition-all flex items-center gap-4 animate-scale-in"
              >
                <div className="p-2.5 rounded-xl bg-white/5 group-hover:bg-mwt-turquoise group-hover:text-[#0B1E3A] transition-all">
                  <type.icon className="h-4 w-4" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-white/50 group-hover:text-white transition-colors">{type.label}</span>
                <Move className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-20 translate-x-1 group-hover:translate-x-0 transition-all" />
              </div>
            ))}
          </div>

          <div className="mt-auto p-4 rounded-2xl bg-gradient-to-br from-mwt-royal-blue/10 to-mwt-cyan/10 border border-white/5">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-3 w-3 text-mwt-cyan" />
              <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Arquitectura</span>
            </div>
            <p className="text-[10px] text-white/30 leading-relaxed font-medium">Arrastra elementos al lienzo para estructurar tu formulario dinámicamente.</p>
          </div>
        </aside>

        {/* Canvas Area */}
        <main className={`flex-1 ${isLightMode ? 'bg-[#F8FAFC]' : 'bg-white/[0.01]'} p-12 overflow-y-auto overflow-x-hidden transition-colors duration-500 animate-scale-in`} style={{ animationDelay: '200ms' }}>
          <div className="max-w-4xl mx-auto space-y-10 pb-40">
            {sections.map((section, sIndex) => (
              <div 
                key={section.id} 
                className="group glass-card rounded-[2rem] overflow-hidden border border-white/5 hover:border-white/20 transition-all animate-slide-up shadow-2xl shadow-black/20"
                style={{ animationDelay: `${(sIndex + 1) * 100}ms` }}
              >
                <div className={`${isLightMode ? 'bg-[#F1F5F9]' : 'bg-white/5'} border-b ${isLightMode ? 'border-slate-200' : 'border-white/5'} px-8 py-3 flex justify-between items-center`}>
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-mwt-turquoise"></div>
                    <span className={`text-[10px] font-extrabold ${isLightMode ? 'text-slate-400' : 'text-white/20'} uppercase tracking-[0.2em]`}>Sección {section.columns.length} Columnas</span>
                  </div>
                  <div className={`flex gap-2 ${isLightMode ? 'opacity-40 hover:opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
                    <button 
                      onClick={() => { setConfigSection(section); setShowLayoutModal(true); }}
                      className={`p-2 ${isLightMode ? 'hover:bg-slate-200' : 'hover:bg-white/5'} rounded-full transition-colors group/icon`}
                    >
                      <Settings className={`h-4 w-4 ${isLightMode ? 'text-slate-400' : 'text-white/20'} group-hover/icon:text-mwt-turquoise`} />
                    </button>
                    <button 
                      onClick={() => handleDuplicateSection(section.id)}
                      className={`p-2 ${isLightMode ? 'hover:bg-slate-200' : 'hover:bg-white/5'} rounded-full transition-colors group/icon`}
                    >
                      <Copy className={`h-4 w-4 ${isLightMode ? 'text-slate-400' : 'text-white/20'} group-hover/icon:text-mwt-royal-blue`} />
                    </button>
                    <button 
                      onClick={() => { setConfigTargetSection(section); setShowSectionConfigModal(true); }}
                      className={`p-2 ${isLightMode ? 'hover:bg-slate-200' : 'hover:bg-white/5'} rounded-full transition-colors group/icon`}
                    >
                      <ShieldCheck className={`h-4 w-4 ${isLightMode ? 'text-slate-400' : 'text-white/20'} group-hover/icon:text-mwt-cyan`} />
                    </button>
                    <button 
                      onClick={() => setSections(sections.filter(s => s.id !== section.id))}
                      className={`p-2 ${isLightMode ? 'hover:bg-red-50' : 'hover:bg-red-500/10'} rounded-full group/icon`}
                    >
                      <Trash2 className={`h-4 w-4 ${isLightMode ? 'text-red-300' : 'text-red-400/30'} group-hover/icon:text-red-400`} />
                    </button>
                  </div>
                </div>
                
                <div className={`grid ${
                  section.columns.length === 1 ? 'grid-cols-1' : 
                  section.columns.length === 2 ? 'grid-cols-2' : 
                  'grid-cols-3'
                } ${isLightMode ? 'divide-slate-200' : 'divide-white/5'} w-full`}>
                  {section.columns.map((column) => (
                    <div 
                      key={column.id} 
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        const typeId = e.dataTransfer.getData('fieldType');
                        const srcSecId = e.dataTransfer.getData('srcSecId');
                        const srcColId = e.dataTransfer.getData('srcColId');
                        const fieldId = e.dataTransfer.getData('fieldId');

                        if (typeId) {
                          handleFieldDrop(section.id, column.id, typeId);
                        } else if (fieldId) {
                          handleMoveField(srcSecId, srcColId, fieldId, section.id, column.id);
                        }
                      }}
                      className={`min-h-[160px] p-8 ${isLightMode ? 'hover:bg-mwt-turquoise/[0.03]' : 'hover:bg-mwt-turquoise/[0.02]'} transition-colors flex flex-col gap-6`}
                    >
                      {column.fields.length === 0 ? (
                        <div className={`flex-1 flex flex-col items-center justify-center border-2 border-dashed ${isLightMode ? 'border-slate-200 text-slate-300' : 'border-white/5 text-white/10'} rounded-3xl text-[10px] gap-3 group/drop transition-all hover:border-mwt-turquoise/30 hover:text-mwt-turquoise/50`}>
                          <Plus className="h-5 w-5 group-hover/drop:scale-125 transition-transform" />
                          <span className="font-bold uppercase tracking-widest">Soltar elemento</span>
                        </div>
                      ) : (
                        column.fields.map(field => (
                          <div 
                            key={field.id} 
                            draggable
                            onDragStart={(e) => {
                              e.dataTransfer.setData('srcSecId', section.id);
                              e.dataTransfer.setData('srcColId', column.id);
                              e.dataTransfer.setData('fieldId', field.id);
                            }}
                            className={`${isLightMode ? 'bg-white border-slate-200 shadow-sm shadow-slate-200/50' : 'bg-white/[0.03] border-white/5 shadow-inner'} p-5 rounded-2xl border flex flex-col gap-4 group/field relative animate-scale-in cursor-move active:scale-95 transition-all`}
                          >
                            <div className={`flex justify-between items-start ${isLightMode ? 'text-slate-800' : 'text-white'}`}>
                              <label className={`text-[10px] font-bold ${isLightMode ? 'text-slate-400' : 'text-white/30'} uppercase tracking-[0.15em] ml-1`}>{field.label}</label>
                              <div className={`flex gap-1 ${isLightMode ? 'opacity-40 hover:opacity-100' : 'opacity-0 group-hover/field:opacity-100'} transition-all scale-90 group-hover:scale-100`}>
                                {(field.type === 'select' || field.type === 'radio') && (
                                  <button 
                                    onClick={() => {
                                      const rawOptions = field.options || ['Opción 1', 'Opción 2'];
                                      const normalized = rawOptions.map(opt => {
                                        if (typeof opt === 'string') {
                                          return {
                                            id: `opt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                                            label: opt,
                                            permissions: { view: 'all', viewRoles: '' }
                                          };
                                        }
                                        return opt;
                                      });
                                      setOptionsTarget({
                                        secId: section.id,
                                        colId: column.id,
                                        fieldId: field.id,
                                        type: field.type,
                                        options: normalized
                                      });
                                      setShowOptionsModal(true);
                                    }}
                                    className={`p-1.5 ${isLightMode ? 'hover:bg-slate-100' : 'hover:bg-white/10'} rounded-lg transition-colors group/opt`}
                                  >
                                    <List className={`h-3.5 w-3.5 ${isLightMode ? 'text-slate-400' : 'text-white/20'} group-hover/opt:text-mwt-cyan`} />
                                  </button>
                                )}
                                <button 
                                  onClick={() => { setEditField({ secId: section.id, colId: column.id, field }); setShowEditFieldModal(true); }}
                                  className={`p-1.5 ${isLightMode ? 'hover:bg-slate-100' : 'hover:bg-white/10'} rounded-lg transition-colors group/icon`}
                                >
                                  <Settings className={`h-3.5 w-3.5 ${isLightMode ? 'text-slate-400' : 'text-white/30'} group-hover/ficon:text-mwt-turquoise`} />
                                </button>
                                <button 
                                  onClick={() => handleDuplicateField(section.id, column.id, field.id)}
                                  className={`p-1.5 ${isLightMode ? 'hover:bg-slate-100' : 'hover:bg-white/10'} rounded-lg group/ficon`}
                                >
                                  <Copy className={`h-3.5 w-3.5 ${isLightMode ? 'text-slate-400' : 'text-white/30'} group-hover/ficon:text-mwt-royal-blue`} />
                                </button>
                                <button 
                                  onClick={() => handleDeleteField(section.id, column.id, field.id)}
                                  className={`p-1.5 ${isLightMode ? 'hover:bg-red-50' : 'hover:bg-red-500/20'} rounded-lg ${isLightMode ? 'text-red-300' : 'text-red-400/30'} group-hover/ficon:text-red-400`}
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </div>
                            <div className={`h-11 ${isLightMode ? 'bg-[#F1F5F9]' : 'bg-white/[0.01]'} border ${isLightMode ? 'border-slate-200' : 'border-white/5'} rounded-xl flex items-center px-4`}>
                              <span className={`${isLightMode ? 'text-slate-400' : 'text-white/10'} text-[10px] font-medium tracking-widest uppercase`}>Input de {field.type}</span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <button 
              onClick={() => setShowSectionModal(true)}
              className={`w-full py-16 border-2 border-dashed ${isLightMode ? 'border-slate-200 bg-white shadow-sm' : 'border-white/5 bg-transparent'} rounded-[2.5rem] ${isLightMode ? 'text-slate-400' : 'text-white/20'} hover:text-mwt-turquoise hover:border-mwt-turquoise/30 hover:bg-mwt-turquoise/5 transition-all flex flex-col items-center gap-4 group animate-pulse`}
            >
              <div className={`p-4 rounded-full shadow-lg group-hover:scale-110 group-hover:bg-mwt-turquoise transition-all ${isLightMode ? 'bg-slate-50' : 'bg-white/5'}`}>
                <Plus className={`h-8 w-8 ${isLightMode ? 'text-slate-300' : 'text-white/40'} group-hover:text-[#0B1E3A]`} />
              </div>
              <span className={`font-extrabold text-[10px] uppercase tracking-[0.4em] ${isLightMode ? 'text-slate-400' : 'opacity-40'} group-hover:opacity-100`}>Configurar nueva sección</span>
            </button>
          </div>
        </main>
      </div>

      {/* Modern Dialogs */}
      {showSectionModal && (
        <div className="fixed inset-0 bg-[#0B1E3A]/90 backdrop-blur-xl flex items-center justify-center z-50 p-6 animate-scale-in">
          <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] shadow-2xl max-w-sm w-full animate-scale-in">
            <h3 className="text-xl font-bold mb-2">Editor de Rejilla</h3>
            <p className="text-[10px] text-white/30 mb-10 uppercase tracking-[0.2em] font-bold">Selecciona la distribución</p>
            <div className="grid grid-cols-3 gap-6">
              {[1, 2, 3].map(n => (
                <button 
                  key={n} 
                  onClick={() => handleAddSection(n)}
                  className="flex flex-col items-center gap-4 p-6 border border-white/5 bg-white/[0.02] rounded-3xl hover:border-mwt-turquoise hover:bg-mwt-turquoise/10 transition-all group active:scale-90"
                >
                  <div className="h-10 flex gap-2 items-end">
                    {Array.from({length: n}).map((_, i) => <div key={i} className="w-2.5 bg-white/10 group-hover:bg-mwt-turquoise rounded-t transition-all" style={{height: '100%'}}></div>)}
                  </div>
                  <span className="text-[10px] font-bold text-white/40 group-hover:text-white transition-colors">{n} COL</span>
                </button>
              ))}
            </div>
            <button onClick={() => setShowSectionModal(false)} className="w-full mt-10 py-3 text-[10px] font-bold text-white/20 hover:text-white transition-colors uppercase tracking-[0.2em]">Cerrar</button>
          </div>
        </div>
      )}

      {showFieldModal && (
        <div className="fixed inset-0 bg-[#0B1E3A]/90 backdrop-blur-xl flex items-center justify-center z-50 p-6 animate-scale-in">
          <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] shadow-2xl max-w-sm w-full">
            <h3 className="text-xl font-bold mb-2">Nuevo Campo</h3>
            <p className="text-sm text-white/30 mb-10 font-medium">Asigna un nombre descriptivo a este elemento.</p>
            <input 
              type="text" 
              className="w-full p-5 bg-white/5 border border-white/5 rounded-2xl mb-10 outline-none focus:ring-1 focus:ring-mwt-turquoise font-bold text-white placeholder-white/20"
              value={fieldLabel}
              onChange={(e) => setFieldLabel(e.target.value)}
              placeholder="Ej: Nombre Completo"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && confirmAddField()}
            />
            <div className="flex gap-4">
              <button 
                onClick={() => { setShowFieldModal(false); setPendingFieldDrop(null); }}
                className="flex-1 py-4 text-[10px] font-bold text-white/20 hover:text-white uppercase tracking-widest"
              >
                Cancelar
              </button>
              <button 
                onClick={confirmAddField}
                className="flex-1 py-4 bg-[#1DE394] hover:bg-[#00B286] text-[#0B1E3A] font-extrabold rounded-2xl shadow-xl transition-all active:scale-95 uppercase tracking-widest text-[10px]"
              >
                Agregar
              </button>
            </div>
          </div>
        </div>
      )}

      {showSaveModal && (
        <div className="fixed inset-0 bg-[#0B1E3A]/90 backdrop-blur-xl flex items-center justify-center z-50 p-6 animate-scale-in">
          <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] shadow-2xl max-w-sm w-full">
            <h3 className="text-xl font-bold mb-2">Finalizar Artefacto</h3>
            <p className="text-sm text-white/30 mb-10">Define el nombre de identificación para el sistema digital.</p>
            <input 
              type="text" 
              className="w-full p-5 bg-white/5 border border-white/5 rounded-2xl mb-10 outline-none focus:ring-1 focus:ring-mwt-turquoise font-bold text-white placeholder-white/10"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Ficha de Inscripción"
            />
            <div className="flex gap-4">
              <button 
                onClick={() => setShowSaveModal(false)}
                className="flex-1 py-4 text-[10px] font-bold text-white/20 hover:text-white uppercase tracking-widest"
              >
                Cancelar
              </button>
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="flex-1 py-4 bg-[#1DE394] hover:bg-[#00B286] text-[#0B1E3A] font-extrabold rounded-2xl shadow-xl transition-all active:scale-95 disabled:opacity-50 uppercase tracking-widest text-[10px]"
              >
                {isSaving ? 'Guardando...' : 'Confirmar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Grid Layout Modal */}
      {showLayoutModal && (
        <div className="fixed inset-0 bg-[#0B1E3A]/90 backdrop-blur-xl flex items-center justify-center z-[100] p-6 animate-scale-in">
          <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] shadow-2xl max-w-sm w-full animate-scale-in">
            <h3 className="text-xl font-bold mb-2">Rejilla de Sección</h3>
            <p className="text-[10px] text-white/30 mb-10 uppercase tracking-[0.2em] font-bold">Cambiar distribución</p>
            <div className="grid grid-cols-3 gap-6">
              {[1, 2, 3].map(n => (
                <button 
                  key={n} 
                  onClick={() => handleUpdateLayout(configSection.id, n)}
                  className={`flex flex-col items-center gap-4 p-6 border rounded-3xl transition-all group active:scale-90 ${
                    configSection?.columns.length === n ? 'border-mwt-turquoise bg-mwt-turquoise/10' : 'border-white/5 bg-white/[0.02] hover:border-white/20'
                  }`}
                >
                  <div className="h-10 flex gap-2 items-end">
                    {Array.from({length: n}).map((_, i) => <div key={i} className="w-2.5 bg-white/10 group-hover:bg-mwt-turquoise rounded-t transition-all" style={{height: '100%'}}></div>)}
                  </div>
                  <span className="text-[10px] font-bold text-white/40 group-hover:text-white transition-colors">{n} COL</span>
                </button>
              ))}
            </div>
            <button onClick={() => setShowLayoutModal(false)} className="w-full mt-10 py-3 text-[10px] font-bold text-white/20 hover:text-white transition-colors uppercase tracking-[0.2em]">Cerrar</button>
          </div>
        </div>
      )}

      {/* Permissions Modal */}
      {showPermissionsModal && (
        <div className="fixed inset-0 bg-[#0B1E3A]/90 backdrop-blur-xl flex items-center justify-center z-[200] p-6 animate-scale-in">
          <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] shadow-2xl max-w-md w-full">
            <h3 className="text-xl font-bold mb-2">Permisos de {permMode === 'view' ? 'Visualización' : 'Edición'}</h3>
            <p className="text-sm text-white/30 mb-8 font-medium">Define quién puede {permMode === 'view' ? 'ver' : 'modificar'} este elemento.</p>
            
            <div className="space-y-3">
              {[
                { id: 'Todos', label: 'Todo el mundo' },
                { id: 'CEO&Admin', label: 'CEO & Administradores' },
                { id: 'Custom', label: 'Roles Personalizados' },
              ].map(opt => (
                <button 
                  key={opt.id}
                  onClick={() => handleUpdatePermissions(permTarget.type, { [permMode]: opt.id }, permTarget)}
                  className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-mwt-turquoise/30 transition-all group"
                >
                  <span className="text-xs font-bold text-white/60 group-hover:text-white uppercase tracking-wider">{opt.label}</span>
                  <ChevronRight className="h-4 w-4 text-white/10 group-hover:text-mwt-turquoise" />
                </button>
              ))}
            </div>

            <div className="mt-8 p-6 bg-[#00B286]/5 border border-[#00B286]/10 rounded-2xl">
              <p className="text-[10px] font-bold text-[#1DE394] uppercase tracking-widest mb-3">Roles {permMode === 'view' ? 'Vista' : 'Edición'} (separar por ;)</p>
              <input 
                type="text" 
                placeholder="Vendedor;Operador"
                defaultValue={permTarget.type === 'section' 
                  ? sections.find(s => s.id === permTarget.id)?.permissions[permMode === 'view' ? 'viewRoles' : 'editRoles']
                  : sections.find(s => s.id === permTarget.secId)?.columns.find(c => c.id === permTarget.colId)?.fields.find(f => f.id === permTarget.id)?.permissions[permMode === 'view' ? 'viewRoles' : 'editRoles']}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-mwt-turquoise"
                onBlur={(e) => handleUpdatePermissions(permTarget.type, { [permMode === 'view' ? 'viewRoles' : 'editRoles']: e.target.value }, permTarget)}
              />
            </div>

            <button onClick={() => setShowPermissionsModal(false)} className="w-full mt-8 py-3 text-[10px] font-bold text-white/20 hover:text-white transition-colors uppercase tracking-[0.2em]">Finalizar</button>
          </div>
        </div>
      )}

      {/* Edit Field Modal */}
      {showEditFieldModal && (
        <div className="fixed inset-0 bg-[#0B1E3A]/90 backdrop-blur-xl flex items-center justify-center z-[100] p-6 animate-scale-in">
          <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] shadow-2xl max-w-sm w-full">
            <h3 className="text-xl font-bold mb-2">Configurar Input</h3>
            <p className="text-sm text-white/30 mb-8 font-medium">Personaliza las propiedades del campo.</p>
            
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-bold text-mwt-turquoise uppercase tracking-[0.2em] mb-2 block">Nombre del Label</label>
                <input 
                  type="text" 
                  defaultValue={editField.field.label}
                  className="w-full p-4 bg-white/5 border border-white/10 rounded-xl outline-none focus:ring-1 focus:ring-mwt-turquoise font-bold text-white"
                  onBlur={(e) => handleUpdateFieldName(editField.secId, editField.colId, editField.field.id, e.target.value)}
                />
              </div>

              <div className="space-y-3">
                <button 
                  onClick={() => {
                    setPermTarget({ type: 'field', id: editField.field.id, secId: editField.secId, colId: editField.colId });
                    setPermMode('view');
                    setShowEditFieldModal(false);
                    setShowPermissionsModal(true);
                  }}
                  className="w-full flex items-center justify-between p-4 rounded-xl bg-mwt-royal-blue/10 border border-mwt-royal-blue/20 hover:bg-mwt-royal-blue/20 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Eye className="h-4 w-4 text-mwt-cyan" />
                    <span className="text-xs font-bold uppercase tracking-wider">Permisos de Vista</span>
                  </div>
                  <ChevronRight className="h-4 w-4 opacity-30" />
                </button>

                <button 
                  onClick={() => {
                    setPermTarget({ type: 'field', id: editField.field.id, secId: editField.secId, colId: editField.colId });
                    setPermMode('edit');
                    setShowEditFieldModal(false);
                    setShowPermissionsModal(true);
                  }}
                  className="w-full flex items-center justify-between p-4 rounded-xl bg-mwt-turquoise/10 border border-mwt-turquoise/20 hover:bg-mwt-turquoise/20 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Settings className="h-4 w-4 text-mwt-turquoise" />
                    <span className="text-xs font-bold uppercase tracking-wider">Permisos de Edición</span>
                  </div>
                  <ChevronRight className="h-4 w-4 opacity-30" />
                </button>
              </div>
            </div>

            <button 
              onClick={() => setShowEditFieldModal(false)} 
              className="w-full mt-10 py-4 bg-[#1DE394] text-[#0B1E3A] font-extrabold rounded-2xl shadow-xl hover:brightness-110 transition-all uppercase tracking-widest text-[10px]"
            >
              Confirmar Cambios
            </button>
          </div>
        </div>
      )}

      {/* Section Config Modal (Permissions Choice) */}
      {showSectionConfigModal && (
        <div className="fixed inset-0 bg-[#0B1E3A]/90 backdrop-blur-xl flex items-center justify-center z-[100] p-6 animate-scale-in">
          <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] shadow-2xl max-w-sm w-full">
            <h3 className="text-xl font-bold mb-2">Permisos de Sección</h3>
            <p className="text-sm text-white/30 mb-8 font-medium">Gestiona los niveles de acceso de esta sección.</p>
            
            <div className="space-y-3">
              <button 
                onClick={() => {
                  setPermTarget({ type: 'section', id: configTargetSection.id });
                  setPermMode('view');
                  setShowSectionConfigModal(false);
                  setShowPermissionsModal(true);
                }}
                className="w-full flex items-center justify-between p-4 rounded-xl bg-mwt-royal-blue/10 border border-mwt-royal-blue/20 hover:bg-mwt-royal-blue/20 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Eye className="h-4 w-4 text-mwt-cyan" />
                  <span className="text-xs font-bold uppercase tracking-wider">Permisos de Vista</span>
                </div>
                <ChevronRight className="h-4 w-4 opacity-30" />
              </button>

              <button 
                onClick={() => {
                  setPermTarget({ type: 'section', id: configTargetSection.id });
                  setPermMode('edit');
                  setShowSectionConfigModal(false);
                  setShowPermissionsModal(true);
                }}
                className="w-full flex items-center justify-between p-4 rounded-xl bg-mwt-turquoise/10 border border-mwt-turquoise/20 hover:bg-mwt-turquoise/20 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Settings className="h-4 w-4 text-mwt-turquoise" />
                  <span className="text-xs font-bold uppercase tracking-wider">Permisos de Edición</span>
                </div>
                <ChevronRight className="h-4 w-4 opacity-30" />
              </button>
            </div>

            <button 
              onClick={() => setShowSectionConfigModal(false)} 
              className="w-full mt-10 py-3 text-[10px] font-bold text-white/20 hover:text-white transition-colors uppercase tracking-[0.2em]"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Options Modal (For Select and Radio) */}
      {showOptionsModal && optionsTarget && (
        <div className="fixed inset-0 bg-[#0B1E3A]/90 backdrop-blur-xl flex items-center justify-center z-[110] p-6 animate-scale-in">
          <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] shadow-2xl max-w-xl w-full">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-xl font-bold mb-2">Gestionar Opciones</h3>
                <p className="text-sm text-white/30 font-medium">
                  {optionsTarget.type === 'radio' 
                    ? 'Botón Radio: Mínimo 2, Máximo 3 opciones.' 
                    : 'Select: Lista completa de registros.'}
                </p>
              </div>
              <button 
                onClick={() => {
                  if (optionsTarget.type === 'radio' && optionsTarget.options.length >= 3) return;
                  setIsAddingOption(true);
                  setEditingOption({ label: '' });
                  setShowOptionNameModal(true);
                }}
                disabled={optionsTarget.type === 'radio' && optionsTarget.options.length >= 3}
                className="flex items-center gap-2 px-5 py-2.5 bg-mwt-cyan text-[#0B1E3A] rounded-xl text-xs font-bold hover:brightness-110 transition-all disabled:opacity-20 translate-y-1"
              >
                <Plus className="h-3.5 w-3.5" />
                Añadir Opción
              </button>
            </div>
            
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {optionsTarget.options.length === 0 && (
                <div className="py-12 text-center border-2 border-dashed border-white/5 rounded-3xl">
                  <p className="text-xs font-bold text-white/10 uppercase tracking-widest">No hay opciones configuradas</p>
                </div>
              )}
              {optionsTarget.options.map((option, idx) => (
                <div key={option.id} className="flex items-center justify-between p-4 bg-white/[0.03] border border-white/5 rounded-2xl group/opt-item hover:bg-white/[0.05] transition-all">
                  <span className="text-sm font-medium text-white/70 ml-2">{option.label}</span>
                  
                  <div className="flex items-center gap-1 opacity-0 group-hover/opt-item:opacity-100 transition-all">
                    <button 
                      onClick={() => {
                        setEditingOption(option);
                        setIsAddingOption(false);
                        setShowOptionNameModal(true);
                      }}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/20 hover:text-mwt-turquoise"
                      title="Editar Nombre"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button 
                      onClick={() => {
                        setPermTarget({ 
                          type: 'option', 
                          secId: optionsTarget.secId, 
                          colId: optionsTarget.colId, 
                          fieldId: optionsTarget.fieldId,
                          optionId: option.id
                        });
                        setPermMode('view');
                        setShowPermissionsModal(true);
                      }}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/20 hover:text-mwt-cyan"
                      title="Permisos de Opción"
                    >
                      <ShieldCheck className="h-3.5 w-3.5" />
                    </button>
                    <button 
                      onClick={() => {
                        if (optionsTarget.type === 'radio' && optionsTarget.options.length >= 3) return;
                        const newOpt = { ...option, id: `opt_${Date.now()}` };
                        const newOpts = [...optionsTarget.options];
                        newOpts.splice(idx + 1, 0, newOpt);
                        setOptionsTarget({ ...optionsTarget, options: newOpts });
                      }}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/20 hover:text-mwt-royal-blue"
                      title="Duplicar"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                    <button 
                      onClick={() => {
                        if (optionsTarget.type === 'radio' && optionsTarget.options.length <= 2) return;
                        const newOpts = optionsTarget.options.filter(o => o.id !== option.id);
                        setOptionsTarget({ ...optionsTarget, options: newOpts });
                      }}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/10 hover:text-red-500"
                      title="Eliminar"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex gap-4">
              <button 
                onClick={() => handleUpdateOptions(optionsTarget.secId, optionsTarget.colId, optionsTarget.fieldId, optionsTarget.options)}
                className="flex-1 py-4 bg-[#1DE394] text-[#0B1E3A] font-extrabold rounded-2xl shadow-xl hover:brightness-110 transition-all uppercase tracking-widest text-[10px]"
              >
                Finalizar Cambios
              </button>
              <button 
                onClick={() => setShowOptionsModal(false)}
                className="px-8 py-4 bg-white/5 text-white/50 font-bold rounded-2xl hover:bg-white/10 transition-all uppercase tracking-widest text-[10px]"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Option Name Input Modal (Sub-modal) */}
      {showOptionNameModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[120] p-6 animate-scale-in">
          <div className="bg-[#0B1E3A] border border-white/10 p-10 rounded-[2.5rem] shadow-3xl max-w-sm w-full">
            <h3 className="text-xl font-bold mb-2">{isAddingOption ? 'Añadir Opción' : 'Editar Opción'}</h3>
            <p className="text-sm text-white/30 mb-8 font-medium">Escribe el nombre que tendrá esta opción.</p>
            
            <input 
              type="text"
              autoFocus
              value={editingOption?.label || ''}
              onChange={(e) => setEditingOption(prev => ({ ...prev, label: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 px-6 py-4 rounded-2xl text-base focus:border-mwt-cyan/50 outline-none transition-all font-semibold mb-8"
              placeholder="Nombre de la opción..."
              onKeyDown={(e) => {
                if (e.key === 'Enter' && editingOption?.label) {
                  const saveBtn = e.currentTarget.parentElement.querySelector('#save-option-btn');
                  if (saveBtn) saveBtn.click();
                }
              }}
            />

            <div className="flex flex-col gap-2">
              <button 
                id="save-option-btn"
                onClick={() => {
                  if (!editingOption?.label) return;
                  if (isAddingOption) {
                    const newOpt = {
                      id: `opt_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
                      label: editingOption.label,
                      permissions: { view: 'all', viewRoles: '' }
                    };
                    setOptionsTarget(prev => ({ 
                      ...prev, 
                      options: [...(prev?.options || []), newOpt] 
                    }));
                  } else {
                    setOptionsTarget(prev => ({ 
                      ...prev, 
                      options: prev.options.map(o => o.id === editingOption.id ? { ...o, label: editingOption.label } : o) 
                    }));
                  }
                  setShowOptionNameModal(false);
                }}
                className="w-full py-4 bg-mwt-cyan text-[#0B1E3A] font-extrabold rounded-2xl shadow-xl hover:brightness-110 transition-all uppercase tracking-widest text-[10px]"
              >
                {isAddingOption ? 'Agregar a la Lista' : 'Guardar Nombre'}
              </button>
              <button 
                onClick={() => setShowOptionNameModal(false)}
                className="w-full py-4 text-[10px] font-bold text-white/20 hover:text-white transition-colors uppercase tracking-[0.2em]"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Builder;
