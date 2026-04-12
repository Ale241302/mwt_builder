import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Builder from './components/Builder';
import Preview from './components/Preview';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('accessToken'));

  // Listen for storage changes (for multiple tabs, but also useful for reactivity)
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('accessToken'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const ProtectedRoute = ({ children }) => {
    const hasToken = !!localStorage.getItem('accessToken');
    if (!hasToken) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login onLogin={() => setToken(localStorage.getItem('accessToken'))} />} />
          
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/artefactos/nuevo" element={
            <ProtectedRoute>
              <Builder />
            </ProtectedRoute>
          } />
          
          <Route path="/artefactos/editar/:id" element={
            <ProtectedRoute>
              <Builder />
            </ProtectedRoute>
          } />

          <Route path="/artefactos/preview/:id" element={
            <ProtectedRoute>
              <Preview />
            </ProtectedRoute>
          } />
          
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
