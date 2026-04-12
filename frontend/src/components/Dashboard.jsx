import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, MoreVertical, CheckCircle, XCircle } from 'lucide-react';
import axios from 'axios';

const Dashboard = () => {
  const [artefactos, setArtefactos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchArtefactos();
  }, []);

  const fetchArtefactos = async () => {
    try {
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
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-8 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-4">
          <img src="https://mwt.one/images/Recurso%203logo_login.png" alt="Favicon" className="h-8 w-8" />
          <h1 className="text-xl font-bold text-mwt-blue-dark">Bienvenido a MWT Builder</h1>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => navigate('/artefactos/nuevo')}
            className="bg-mwt-green-emerald text-white px-4 py-2 rounded-md flex items-center gap-2 font-medium hover:bg-opacity-90 transition-all shadow-sm"
          >
            <Plus className="h-4 w-4" /> Nuevo registro
          </button>
          <button onClick={handleLogout} className="text-gray-500 hover:text-gray-700 text-sm font-medium">Salir</button>
        </div>
      </header>

      <main className="p-8">
        {/* Actions Bar */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-wrap gap-4 items-center justify-between border border-gray-100">
          <div className="flex gap-4 items-center flex-1 min-w-[300px]">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search" 
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-mwt-turquoise"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select className="bg-gray-50 border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-600 outline-none">
              <option>Bulk Actions</option>
              <option>Delete</option>
              <option>Publish</option>
              <option>Unpublish</option>
            </select>
            <button className="bg-gray-100 px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200">Apply</button>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {['Page Type', 'Status', 'Access', 'Category', 'Language'].map(filter => (
              <button key={filter} className="flex items-center gap-1 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded text-xs text-gray-600 hover:bg-gray-100">
                {filter} <Filter className="h-3 w-3" />
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-500 uppercase text-[10px] font-bold tracking-wider border-b">
                <th className="px-6 py-3 w-10"><input type="checkbox" className="rounded border-gray-300" /></th>
                <th className="px-6 py-3">Nombre</th>
                <th className="px-6 py-3">Tipo</th>
                <th className="px-6 py-3">Autor</th>
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Idioma</th>
                <th className="px-6 py-3">Estado</th>
                <th className="px-6 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {artefactos.map((art) => (
                <tr key={art.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4"><input type="checkbox" className="rounded border-gray-300" /></td>
                  <td className="px-6 py-4 font-medium text-mwt-blue-dark">{art.title}</td>
                  <td className="px-6 py-4 text-gray-500">Artefacto</td>
                  <td className="px-6 py-4 text-gray-500">{art.created_by_name}</td>
                  <td className="px-6 py-4 text-gray-400 font-mono text-xs">{art.id}</td>
                  <td className="px-6 py-4 text-gray-500">Español (es-ES)</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Published
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {artefactos.length === 0 && (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center text-gray-500 italic">No hay registros aún. Crea tu primer artefacto.</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="px-6 py-4 border-t bg-gray-50 flex justify-between items-center text-xs text-gray-500">
            <span>Showing {artefactos.length} items</span>
            <div className="flex gap-2">
              <button className="px-2 py-1 border rounded bg-white">1</button>
              <button className="px-2 py-1 border rounded bg-white hover:bg-gray-100">Next</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
