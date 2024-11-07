import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { login } from '../services/auth';
import type { LoginRequest } from '../types/auth';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    
    try {
      const data: LoginRequest = {
        identifier: formData.get('email') as string,
        password: formData.get('password') as string,
      };
      const response = await login(data);
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      navigate('/dashboard');
    } catch (err) {
      setError(t('auth.error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-md mx-auto">
        <div className="glass-effect p-8 rounded-2xl">
          <h1 className="text-2xl font-bold mb-6">{t('auth.login')}</h1>
          
          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-sm text-muted-foreground mb-1.5">
                {t('auth.email')}
              </label>
              <input
                type="email"
                name="email"
                className="w-full bg-surface-secondary px-4 py-3 rounded-xl text-white border border-border
                  focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/20 transition-all"
                placeholder="mail@example.com"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm text-muted-foreground mb-1.5">
                {t('auth.password')}
              </label>
              <input
                type="password"
                name="password"
                className="w-full bg-surface-secondary px-4 py-3 rounded-xl text-white border border-border
                  focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/20 transition-all"
                placeholder="••••••••"
                minLength={8}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 active:bg-primary/80 text-primary-foreground 
                py-3 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t('auth.login')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link 
              to="/register"
              className="text-sm text-muted-foreground hover:text-white transition-colors"
            >
              {t('auth.noAccount')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;