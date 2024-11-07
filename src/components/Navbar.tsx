import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Wallet, UserCircle2 } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuth();
  
  return (
    <nav className="h-16 border-b border-border backdrop-blur-sm bg-background/80 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Wallet className="w-4 h-4 text-primary" />
              </div>
              <span className="text-lg font-medium">CoinSwap</span>
            </Link>

            <div className="flex items-center gap-6">
              <Link 
                to="/" 
                className={`text-sm ${location.pathname === '/' ? 'text-white' : 'text-muted-foreground'} hover:text-white transition-colors`}
              >
                {t('exchange.exchange')}
              </Link>
              <Link 
                to="/help" 
                className={`text-sm ${location.pathname === '/help' ? 'text-white' : 'text-muted-foreground'} hover:text-white transition-colors`}
              >
                {t('common.help')}
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            {isAuthenticated ? (
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-surface-secondary">
                <UserCircle2 className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">{user?.email}</span>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl text-sm font-medium text-white hover:text-primary transition-colors"
                >
                  {t('auth.login')}
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground transition-colors text-sm font-medium"
                >
                  {t('auth.register')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;