import React, { useState } from 'react';
import { CnasLogo } from './ui/CnasLogo';

interface LoginProps {
  onLoginSuccess: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Petit délai pour l'animation
    setTimeout(() => {
      if (username === 'cnas' && password === '17') {
        setError('');
        onLoginSuccess();
      } else {
        setError('Nom d\'utilisateur ou mot de passe incorrect.');
        setIsLoading(false);
      }
    }, 300);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '1rem', 
      backgroundColor: '#f1f5f9',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ 
        width: '100%',
        maxWidth: '400px',
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '0.75rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        zIndex: 10
      }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
            <CnasLogo style={{ width: '96px', height: '96px' }} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '0.5rem', margin: '0 0 0.5rem 0' }}>
            Authentification
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#64748b', margin: '0' }}>
            Veuillez vous connecter pour continuer.
          </p>
        </div>
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="username" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#334155', marginBottom: '0.5rem' }}>
              Nom d'utilisateur
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Entrez votre nom d'utilisateur"
              style={{
                display: 'block',
                width: '100%',
                padding: '0.625rem 0.75rem',
                backgroundColor: 'white',
                border: '1px solid #cbd5e1',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                color: '#0f172a',
                boxSizing: 'border-box',
                outline: 'none'
              }}
              required
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="password" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#334155', marginBottom: '0.5rem' }}>
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entrez votre mot de passe"
              style={{
                display: 'block',
                width: '100%',
                padding: '0.625rem 0.75rem',
                backgroundColor: 'white',
                border: '1px solid #cbd5e1',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                color: '#0f172a',
                boxSizing: 'border-box',
                outline: 'none'
              }}
              required
            />
          </div>
          {error && (
            <p style={{ 
              fontSize: '0.875rem', 
              color: '#dc2626', 
              textAlign: 'center', 
              padding: '0.625rem', 
              backgroundColor: '#fee2e2', 
              borderRadius: '0.375rem',
              marginBottom: '1rem',
              margin: '0 0 1rem 0'
            }}>
              {error}
            </p>
          )}
          <div style={{ marginBottom: '1rem' }}>
            <button 
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '0.625rem 1rem',
                backgroundColor: isLoading ? '#93c5fd' : '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                opacity: isLoading ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = '#1d4ed8';
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = '#2563eb';
                  e.currentTarget.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
                }
              }}
            >
              {isLoading ? 'Connexion...' : 'Se connecter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};