import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await axios.post('http://localhost:8000/api/login/', {
        username,
        password,
      });
      
      localStorage.setItem('token', response.data.access);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      if (onLogin) onLogin();
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1E3A] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambient Blurs using Corporate Colors */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#00B286]/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#1DE394]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-md w-full backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl p-10 relative z-10">
        <div className="flex flex-col items-center mb-10">
          <img 
            src="https://mwt.one//images/2024/12/04/recurso-1logo_foot.png" 
            alt="MWT ONE" 
            className="h-12 mb-6 object-contain filter brightness-0 invert" 
          />
          <p className="text-[#1DE394]/60 text-[10px] tracking-widest uppercase font-bold">Ingresa tus credenciales para continuar</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-200 p-3 rounded-lg mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1 font-bold">Usuario</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-4 w-4 text-[#1DE394]/40" />
              </div>
              <input
                type="text"
                className="block w-full pl-11 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#1DE394]/50 focus:bg-white/10 transition-all text-white placeholder-white/10 text-sm"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase tracking-widest text-white/40 ml-1 font-bold">Contraseña</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-[#1DE394]/40" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                className="block w-full pl-11 pr-11 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#1DE394]/50 focus:bg-white/10 transition-all text-white placeholder-white/10 text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-white/20 hover:text-[#1DE394]" />
                ) : (
                  <Eye className="h-4 w-4 text-white/20 hover:text-[#1DE394]" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#1DE394] hover:bg-[#00B286] text-[#0B1E3A] font-extrabold py-4 px-4 rounded-xl transition-all shadow-lg shadow-[#1DE394]/20 text-xs uppercase tracking-[0.2em] mt-6"
          >
            Ingresar a la plataforma
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
