import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Type, Hash, AlignLeft, Calendar, CheckSquare, FileUp, 
  ChevronDown, Radio, Plus, Settings, Trash2, Eye, Save, Move
} from 'lucide-react';
import axios from 'axios';

const FIELD_TYPES = [
  { id: 'text', icon: Type, label: 'Input type text' },
  { id: 'number', icon: Hash, label: 'Input type number' },
  { id: 'textarea', icon: AlignLeft, label: 'Textarea' },
  { id: 'date', icon: Calendar, label: 'Input date' },
  { id: 'checkbox', icon: CheckSquare, label: 'Checkbox' },
  { id: 'file', icon: FileUp, label: 'Upload file' },
  { id: 'select', icon: ChevronDown, label: 'Input select' },
  { id: 'radio', icon: Radio, label: 'Radio button' },
];

const Builder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('Nuevo Artefacto');
  const [sections, setSections] = useState([]);
  const [showSectionModal, setShowSectionModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [editingField, setEditingField] = useState(null);

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

  const addFieldToColumn = (sectionId, colId, typeId) => {
    const label = prompt('Etiqueta del campo:');
    if (!label) return;

    const newField = {
      id: `field-${Date.now()}`,
      type: typeId,
      label: label,
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
  };

  const handleSave = async () => {
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
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <header className="h-16 border-b px-6 flex items-center justify-between bg-white z-10 shadow-sm flex-shrink-0">
        <div className="flex items-center gap-4">
          <img src="https://mwt.one/images/Recurso%203logo_login.png" alt="Favicon" className="h-8 w-8" />
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            className="text-lg font-semibold text-gray-800 outline-none border-b-2 border-transparent focus:border-mwt-turquoise px-2"
          />
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-md transition-all flex items-center gap-2">
            <Eye className="h-4 w-4" /> Preview
          </button>
          <button 
            onClick={() => setShowSaveModal(true)}
            className="bg-mwt-green-emerald text-white px-6 py-2 rounded-md font-medium hover:bg-opacity-90 shadow-md flex items-center gap-2"
          >
            <Save className="h-4 w-4" /> Save
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Elements Tray */}
        <aside className="w-48 border-r bg-mwt-blue-dark overflow-y-auto p-4 flex flex-col gap-3">
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Elementos</h3>
          {FIELD_TYPES.map((type) => (
            <div 
              key={type.id}
              draggable
              onDragStart={(e) => e.dataTransfer.setData('fieldType', type.id)}
              className="bg-white/10 border border-white/5 cursor-grab p-3 rounded hover:bg-white/20 transition-all group flex items-center gap-3"
            >
              <type.icon className="h-4 w-4 text-mwt-turquoise group-hover:scale-110 transition-transform" />
              <span className="text-xs text-white font-medium">{type.label}</span>
            </div>
          ))}
        </aside>

        {/* Canvas Area */}
        <main className="flex-1 bg-gray-50 p-10 overflow-y-auto">
          <div className="max-w-5xl mx-auto space-y-8 pb-32">
            {sections.map((section) => (
              <div key={section.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden group/section">
                <div className="bg-gray-50 border-b px-6 py-2 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Sección {section.columns.length} Col</span>
                  <div className="flex gap-2">
                    <button className="p-1 hover:bg-gray-200 rounded"><Settings className="h-3 w-3 text-gray-500" /></button>
                    <button 
                      onClick={() => setSections(sections.filter(s => s.id !== section.id))}
                      className="p-1 hover:bg-red-100 rounded text-red-400"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                </div>
                
                <div className={`grid grid-cols-${section.columns.length} divide-x divide-gray-100`}>
                  {section.columns.map((column) => (
                    <div 
                      key={column.id} 
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        const typeId = e.dataTransfer.getData('fieldType');
                        if (typeId) addFieldToColumn(section.id, column.id, typeId);
                      }}
                      className="min-h-[120px] p-6 hover:bg-mwt-turquoise/5 transition-colors flex flex-col gap-4"
                    >
                      {column.fields.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-100 rounded-lg text-[10px] text-gray-300 gap-1">
                          <Plus className="h-4 w-4" />
                          <span>Arraste el input</span>
                        </div>
                      ) : (
                        column.fields.map(field => (
                          <div key={field.id} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col gap-3 group/field relative">
                            <div className="flex justify-between items-start">
                              <label className="text-xs font-bold text-gray-700 uppercase">{field.label}</label>
                              <div className="flex gap-1 opacity-0 group-hover/field:opacity-100 transition-opacity">
                                <button className="p-1 hover:bg-gray-100 rounded"><Settings className="h-3 w-3 text-gray-400 font-bold" /></button>
                                <button className="p-1 hover:bg-red-50 rounded text-red-300 hover:text-red-500"><Trash2 className="h-3 w-3" /></button>
                              </div>
                            </div>
                            <div className="h-10 border border-gray-100 rounded bg-gray-50"></div>
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
              className="w-full py-12 border-2 border-dashed border-gray-300 rounded-xl text-gray-400 hover:text-mwt-turquoise hover:border-mwt-turquoise hover:bg-mwt-turquoise/5 transition-all flex flex-col items-center gap-3 group"
            >
              <div className="bg-white p-3 rounded-full shadow-sm group-hover:scale-110 transition-transform">
                <Plus className="h-6 w-6" />
              </div>
              <span className="font-bold text-sm uppercase tracking-wider">Agregar sección</span>
            </button>
          </div>
        </main>
      </div>

      {/* Modals */}
      {showSectionModal && (
        <div className="fixed inset-0 bg-mwt-blue-dark/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full">
            <h3 className="text-lg font-bold text-mwt-blue-dark mb-6">¿Cuántas columnas deseas?</h3>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map(n => (
                <button 
                  key={n} 
                  onClick={() => handleAddSection(n)}
                  className="flex flex-col items-center gap-2 p-4 border-2 rounded-xl hover:border-mwt-turquoise hover:bg-mwt-turquoise/5 transition-all group"
                >
                  <div className="h-8 flex gap-1 items-end">
                    {Array.from({length: n}).map((_, i) => <div key={i} className="w-3 bg-gray-200 group-hover:bg-mwt-turquoise rounded-t" style={{height: '100%'}}></div>)}
                  </div>
                  <span className="text-xs font-bold">{n} COL</span>
                </button>
              ))}
            </div>
            <button onClick={() => setShowSectionModal(false)} className="w-full mt-8 py-3 text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors">CANCELAR</button>
          </div>
        </div>
      )}

      {showSaveModal && (
        <div className="fixed inset-0 bg-mwt-blue-dark/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full">
            <h3 className="text-lg font-bold text-mwt-blue-dark mb-2">Guardar Artefacto</h3>
            <p className="text-sm text-gray-500 mb-6">Confirma el nombre para finalizar</p>
            <input 
              type="text" 
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl mb-8 outline-none focus:ring-2 focus:ring-mwt-turquoise"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej: Formulario de Ventas"
            />
            <div className="flex gap-4">
              <button 
                onClick={() => setShowSaveModal(false)}
                className="flex-1 py-3 text-sm font-bold text-gray-400 hover:text-gray-600"
              >
                CANCELAR
              </button>
              <button 
                onClick={handleSave}
                className="flex-1 py-3 bg-mwt-green-emerald text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                CONFIRMAR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Builder;
