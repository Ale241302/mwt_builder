import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Search, Filter, MoreVertical, LogOut, LayoutGrid, 
  Zap, User as UserIcon, Copy, Edit, Trash2, Check, X,
  Sun, Moon
} from 'lucide-react';
import axios from 'axios';
import { useTheme } from '../context/ThemeContext';

const Dashboard = () => {
  const { isLightMode, toggleTheme } = useTheme();
  const [artefactos, setArtefactos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [errorModal, setErrorModal] = useState({ show: false, message: '' });
  const [confirmModal, setConfirmModal] = useState({ show: false, id: null, title: '' });
  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    fetchArtefactos();
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpenId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchArtefactos = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/artefactos/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setArtefactos(response.data);
    } catch (err) {
      console.error('Error fetching artefactos', err);
      if (err.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleDuplicate = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:8000/api/artefactos/${id}/duplicate/`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchArtefactos();
      setMenuOpenId(null);
    } catch (err) {
      if (err.response?.status === 401) return navigate('/login');
      setErrorModal({ show: true, message: 'Error duplicando: ' + err.message });
    }
  };

  const handleDelete = async () => {
    const id = confirmModal.id;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8000/api/artefactos/${id}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setArtefactos(artefactos.filter(a => a.id !== id));
      setConfirmModal({ show: false, id: null, title: '' });
    } catch (err) {
      if (err.response?.status === 401) return navigate('/login');
      setErrorModal({ show: true, message: 'Error eliminando: ' + err.message });
    }
  };

  const handleOpenMenu = (e, id) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMenuPosition({
      top: rect.bottom + window.scrollY + 8,
      left: rect.right - 192 // Width of the menu (w-48 = 12rem = 192px)
    });
    setMenuOpenId(id);
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Published' ? 'Draft' : 'Published';
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:8000/api/artefactos/${id}/`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setArtefactos(artefactos.map(a => a.id === id ? { ...a, status: newStatus } : a));
    } catch (err) {
      if (err.response?.status === 401) return navigate('/login');
      setErrorModal({ show: true, message: 'No se pudo actualizar el estado: ' + err.message });
    }
  };

  const confirmDelete = (id, title) => {
    setConfirmModal({ show: true, id, title });
    setMenuOpenId(null);
  };

  return (
    <div className={`min-h-screen ${isLightMode ? 'bg-[#F8FAFC]' : 'bg-[#0B1E3A]'} ${isLightMode ? 'text-[#0B1E3A]' : 'text-white'} selection:bg-mwt-turquoise/30 relative overflow-hidden transition-colors duration-500`}>
      {/* Background Ambient Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#481EE3]/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[#00B286]/10 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0B1E3A]/70 border-b border-white/5 px-8 h-20 flex justify-between items-center">
        <div className="flex items-center gap-4 group cursor-pointer" onClick={() => navigate('/')}>
          <div className="relative">
            <div className="absolute inset-0 bg-mwt-turquoise blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <img 
              src="https://mwt.one/images/Recurso%203logo_login.png" 
              alt="MWT Builder" 
              className="h-9 w-auto relative z-10 transition-transform group-hover:scale-110 object-contain" 
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">MWT Builder</h1>
            <span className="text-[9px] text-mwt-turquoise font-bold tracking-[0.3em] uppercase opacity-60">Admin Dashboard</span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <button 
            onClick={toggleTheme}
            className="p-2.5 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10 transition-all active:scale-90 text-white/40 hover:text-mwt-turquoise"
            title={isLightMode ? 'Cambiar a Modo Oscuro' : 'Cambiar a Modo Luz'}
          >
            {isLightMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>

          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-default">
            <div className="w-2 h-2 rounded-full bg-mwt-turquoise animate-pulse"></div>
            <span className="text-xs font-semibold text-white/60">Server Online</span>
          </div>

          <button 
            onClick={() => navigate('/artefactos/nuevo')}
            className="group relative bg-[#00B286] hover:bg-[#1DE394] text-white hover:text-[#0B1E3A] px-6 py-2.5 rounded-full flex items-center gap-2 font-bold transition-all shadow-lg hover:shadow-[#1DE394]/20 active:scale-95 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
            <Plus className="h-4 w-4 relative z-10" /> 
            <span className="relative z-10">Nuevo registro</span>
          </button>
          
          <button 
            onClick={handleLogout} 
            className="p-2.5 rounded-full hover:bg-red-500/10 text-white/40 hover:text-red-400 transition-all active:scale-90"
            title="Cerrar sesión"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </header>

      <main className="p-8 relative z-10 max-w-7xl mx-auto space-y-8 animate-slide-up">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: 'Total Artefactos', value: artefactos.length, icon: LayoutGrid, color: '#3083FE' },
            { label: 'Publicados', value: artefactos.filter(a => a.status === 'Published').length, icon: Zap, color: '#1DE394' },
          ].map((stat, i) => (
            <div key={i} className={`glass-card p-6 rounded-3xl group hover:border-mwt-turquoise/30 transition-all animate-scale-in ${isLightMode ? 'bg-white border-slate-200' : ''}`} style={{ animationDelay: `${i * 100}ms` }}>
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <p className={`text-[10px] font-bold uppercase tracking-widest ${isLightMode ? 'text-slate-400' : 'text-white/40'}`}>{stat.label}</p>
                  <h3 className={`text-3xl font-bold ${isLightMode ? 'text-[#0B1E3A]' : 'text-white'}`}>{stat.value}</h3>
                </div>
                <div className={`p-3 rounded-2xl ${isLightMode ? 'bg-slate-50' : 'bg-white/5'} group-hover:scale-110 transition-transform`} style={{ color: stat.color }}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters & Search */}
        <div className="glass p-4 rounded-2xl flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-4 items-center flex-1 min-w-[300px]">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
              <input 
                type="text" 
                placeholder="Buscar por nombre..." 
                className={`w-full pl-12 pr-4 py-2.5 ${isLightMode ? 'bg-white border-slate-200 text-slate-900' : 'bg-white/5 border-white/5'} border rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-mwt-turquoise focus:bg-white/10 transition-all`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {['Tipo', 'Estado', 'Idioma'].map(filter => (
              <button key={filter} className={`flex items-center gap-2 px-4 py-2 ${isLightMode ? 'bg-white border-slate-200 text-slate-500' : 'bg-white/5 border-white/5 text-white/60'} border rounded-xl text-[10px] font-bold hover:text-mwt-turquoise hover:bg-white/10 transition-all uppercase tracking-widest`}>
                {filter} <Filter className="h-3 w-3" />
              </button>
            ))}
          </div>
        </div>

        {/* Table Container */}
        <div className="glass-card rounded-3xl border border-white/5 relative">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className={`${isLightMode ? 'bg-slate-100' : 'bg-white/5'} ${isLightMode ? 'text-slate-500' : 'text-white/30'} uppercase text-[10px] font-extrabold tracking-[0.2em] border-b ${isLightMode ? 'border-slate-200' : 'border-white/5'}`}>
                  <th className="px-8 py-5 w-10"><input type="checkbox" className={`rounded-sm ${isLightMode ? 'border-slate-300' : 'border-white/20'} bg-transparent text-mwt-turquoise`} /></th>
                  <th className="px-8 py-5">Nombre del Artefacto</th>
                  <th className="px-8 py-5">Autor</th>
                  <th className="px-8 py-5">Última Modificación</th>
                  <th className="px-8 py-5">Estado</th>
                  <th className="px-8 py-5 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className={`${isLightMode ? 'divide-slate-200' : 'divide-white/5'}`}>
                {(artefactos.filter(a => a.title.toLowerCase().includes(searchTerm.toLowerCase()))).map((art, i) => (
                  <tr key={art.id} className={`${isLightMode ? 'hover:bg-slate-50' : 'hover:bg-white/[0.02]'} transition-colors group animate-slide-up`} style={{ animationDelay: `${(i + 1) * 50}ms` }}>
                    <td className="px-8 py-5"><input type="checkbox" className={`rounded-sm ${isLightMode ? 'border-slate-300' : 'border-white/10'} bg-transparent text-mwt-turquoise`} /></td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3 font-semibold group-hover:text-mwt-turquoise transition-colors">
                        <div className="p-2 rounded bg-gradient-to-br from-mwt-royal-blue/20 to-mwt-cyan/20 text-white/80 shrink-0">
                          <LayoutGrid className="h-4 w-4" />
                        </div>
                        <div>
                          <p className={`font-bold ${isLightMode ? 'text-slate-800' : 'text-white/90'}`}>{art.title}</p>
                          <span className={`text-[10px] ${isLightMode ? 'text-slate-400' : 'text-white/20'} font-mono tracking-tighter`}>ID: {String(art.id).split('-')[0]}...</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className={`flex items-center gap-2 ${isLightMode ? 'text-slate-600' : 'text-white/60'}`}>
                        <div className={`w-6 h-6 rounded-full ${isLightMode ? 'bg-slate-200' : 'bg-white/10'} flex items-center justify-center`}>
                          <UserIcon className="h-3 w-3" />
                        </div>
                        <span className="text-xs font-semibold">{art.created_by_name}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <p className={`text-xs ${isLightMode ? 'text-slate-400' : 'text-white/40'} font-medium`}>Actualizado: 12 Abr 2026</p>
                    </td>
                    <td className="px-8 py-5">
                      <div 
                        onClick={() => handleToggleStatus(art.id, art.status)}
                        className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-all duration-300 relative border ${
                          art.status === 'Published' 
                            ? (isLightMode ? 'bg-[#1DE394]/20 border-[#1DE394]/30' : 'bg-[#1DE394]/20 border-[#1DE394]/30') 
                            : (isLightMode ? 'bg-slate-200 border-slate-300' : 'bg-white/5 border-white/5')
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full transition-all duration-300 flex items-center justify-center ${
                          art.status === 'Published' 
                            ? 'translate-x-6 bg-[#1DE394] shadow-lg shadow-[#1DE394]/40' 
                            : 'translate-x-0 bg-white/20 shadow-none'
                        }`}>
                          {art.status === 'Published' ? <Check className="h-2 w-2 text-[#0B1E3A] stroke-[4]" /> : <X className="h-2 w-2 text-white/40 stroke-[4]" />}
                        </div>
                        <span className={`absolute left-14 top-1/2 -translate-y-1/2 text-[9px] font-black uppercase tracking-widest whitespace-nowrap transition-opacity ${
                          art.status === 'Published' ? 'text-[#1DE394]' : (isLightMode ? 'text-slate-400' : 'text-white/20')
                        }`}>
                          {art.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button 
                        onClick={(e) => handleOpenMenu(e, art.id)}
                        className={`p-2 rounded-lg transition-all ${
                          menuOpenId === art.id 
                            ? 'bg-mwt-turquoise/20 text-mwt-turquoise' 
                            : (isLightMode ? 'text-slate-400 hover:text-mwt-turquoise hover:bg-slate-100' : 'text-white/20 hover:text-mwt-turquoise hover:bg-white/5 border border-transparent hover:border-white/10')
                        }`}
                      >
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
                {loading && (
                  <tr>
                    <td colSpan="6" className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center gap-4 text-mwt-turquoise">
                        <div className="w-10 h-10 border-4 border-current border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-xs font-bold uppercase tracking-widest text-white/30 animate-pulse">Sincronizando registros...</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className={`px-8 py-6 ${isLightMode ? 'bg-slate-50' : 'bg-white/[0.03]'} border-t ${isLightMode ? 'border-slate-200' : 'border-white/5'} flex justify-between items-center text-[10px] font-bold ${isLightMode ? 'text-slate-400' : 'text-white/20'} uppercase tracking-widest`}>
            <span>Repositorio: {artefactos.length} artefactos</span>
            <div className="flex gap-4">
              <button className={`${isLightMode ? 'hover:text-mwt-turquoise' : 'hover:text-white'} transition-colors disabled:opacity-20 flex items-center gap-1`} disabled>ANTERIOR</button>
              <button className={`${isLightMode ? 'hover:text-mwt-turquoise' : 'hover:text-white'} transition-colors flex items-center gap-1`}>SIGUIENTE</button>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Menu - Fixed Position (Safe from Clipping) */}
      {menuOpenId && (
        <div 
          ref={menuRef}
          className={`fixed glass-card ${isLightMode ? 'bg-white border-slate-200 shadow-xl' : 'border-white/10 shadow-2xl'} border rounded-2xl z-[9000] p-2 animate-scale-in w-48`}
          style={{ top: menuPosition.top, left: menuPosition.left }}
        >
          <button 
            onClick={() => handleDuplicate(menuOpenId)}
            className={`w-full flex items-center gap-3 px-4 py-3 text-[10px] font-bold ${isLightMode ? 'text-slate-600' : 'text-white/60'} hover:text-mwt-turquoise ${isLightMode ? 'hover:bg-slate-50' : 'hover:bg-mwt-turquoise/10'} rounded-xl transition-all`}
          >
            <Copy className="h-3.5 w-3.5" /> DUPLICAR
          </button>
          <button 
            onClick={() => { navigate(`/artefactos/editar/${menuOpenId}`); setMenuOpenId(null); }}
            className={`w-full flex items-center gap-3 px-4 py-3 text-[10px] font-bold ${isLightMode ? 'text-slate-600' : 'text-white/60'} hover:text-mwt-royal-blue ${isLightMode ? 'hover:bg-slate-50' : 'hover:bg-mwt-royal-blue/10'} rounded-xl transition-all`}
          >
            <Edit className="h-3.5 w-3.5" /> EDITAR
          </button>
          <div className={`h-px ${isLightMode ? 'bg-slate-100' : 'bg-white/5'} my-1 mx-2`}></div>
          <button 
            onClick={() => confirmDelete(menuOpenId, artefactos.find(a => a.id === menuOpenId)?.title)}
            className={`w-full flex items-center gap-3 px-4 py-3 text-[10px] font-bold ${isLightMode ? 'text-red-500/70' : 'text-red-400/60'} hover:text-red-400 ${isLightMode ? 'hover:bg-red-50' : 'hover:bg-red-400/10'} rounded-xl transition-all`}
          >
            <Trash2 className="h-3.5 w-3.5" /> ELIMINAR
          </button>
        </div>
      )}

      {/* Custom Confirmation Modal */}
      {confirmModal.show && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-[#0B1E3A]/80 backdrop-blur-sm animate-fade-in">
          <div className="glass-card max-w-sm w-full p-8 rounded-3xl border border-white/10 shadow-2xl animate-scale-in">
            <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-400 mb-6 mx-auto">
              <Trash2 className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-center mb-2">¿Eliminar artefacto?</h3>
            <p className="text-sm text-white/40 text-center mb-8">Esta acción borrará <span className="text-white">"{confirmModal.title}"</span> de forma permanente.</p>
            <div className="flex gap-3">
              <button 
                onClick={() => setConfirmModal({ show: false, id: null, title: '' })}
                className="flex-1 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold transition-all"
              >
                CANCELAR
              </button>
              <button 
                onClick={handleDelete}
                className="flex-1 px-6 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-xs font-bold transition-all shadow-lg shadow-red-500/20"
              >
                ELIMINAR
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Error Modal */}
      {errorModal.show && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-[#0B1E3A]/80 backdrop-blur-sm animate-fade-in">
          <div className="glass-card max-w-sm w-full p-8 rounded-3xl border border-red-500/20 shadow-2xl animate-scale-in">
            <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-400 mb-6 mx-auto">
              <LogOut className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-center mb-2">¡Ups! Algo salió mal</h3>
            <p className="text-sm text-white/40 text-center mb-8">{errorModal.message}</p>
            <button 
              onClick={() => setErrorModal({ show: false, message: '' })}
              className="w-full px-6 py-3 rounded-xl bg-mwt-turquoise text-[#0B1E3A] text-xs font-bold hover:brightness-110 transition-all"
            >
              ENTENDIDO
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
