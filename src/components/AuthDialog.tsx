import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { login, register } from '../services/auth';
import type { LoginRequest, RegisterRequest } from '../types/auth';

interface AuthDialogProps {
  onSuccess?: () => void;
  onClose?: () => void;
  trigger?: React.ReactNode;
}

const AuthDialog: React.FC<AuthDialogProps> = ({ onSuccess, onClose, trigger }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();
  const { setUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    
    try {
      if (isRegistering) {
        const data: RegisterRequest = {
          email: formData.get('email') as string,
          phone_number: formData.get('phone_number') as string,
          password: formData.get('password') as string,
        };
        const response = await register(data);
        localStorage.setItem('token', response.data.token);
        setUser(response.data.user);
      } else {
        const data: LoginRequest = {
          identifier: formData.get('email') as string,
          password: formData.get('password') as string,
        };
        const response = await login(data);
        localStorage.setItem('token', response.data.token);
        setUser(response.data.user);
      }
      
      setIsOpen(false);
      onSuccess?.();
    } catch (err) {
      setError(t('auth.error'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  const DialogTrigger = trigger || (
    <button className="px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground transition-colors text-sm font-medium">
      {t('auth.login')}
    </button>
  );

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        {DialogTrigger}
      </Dialog.Trigger>
      
      <Dialog.Portal>
        <Dialog.Overlay 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 data-[state=open]:animate-fade-in" 
        />
        <Dialog.Content 
          className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-md
            bg-surface border border-border shadow-2xl p-6 rounded-2xl z-50 data-[state=open]:animate-fade-in"
        >
          <div className="flex items-center gap-3 mb-6">
            {isRegistering && (
              <button
                onClick={() => setIsRegistering(false)}
                className="p-2 -ml-2 hover:bg-surface-secondary rounded-lg transition-colors text-white/80 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <Dialog.Title className="text-xl font-semibold text-white">
              {t(isRegistering ? 'auth.register' : 'auth.login')}
            </Dialog.Title>
            <Dialog.Close className="p-2 hover:bg-surface-secondary rounded-lg transition-colors text-white/80 hover:text-white ml-auto">
              <X className="w-4 h-4" />
            </Dialog.Close>
          </div>
          
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
            
            {isRegistering && (
              <div>
                <label className="block text-sm text-muted-foreground mb-1.5">
                  {t('auth.phoneNumber')}
                </label>
                <input
                  type="tel"
                  name="phone_number"
                  className="w-full bg-surface-secondary px-4 py-3 rounded-xl text-white border border-border
                    focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/20 transition-all"
                  placeholder="+995"
                  required
                />
              </div>
            )}
            
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

            {isRegistering && (
              <div>
                <label className="block text-sm text-muted-foreground mb-1.5">
                  {t('auth.confirmPassword')}
                </label>
                <input
                  type="password"
                  name="password_confirmation"
                  className="w-full bg-surface-secondary px-4 py-3 rounded-xl text-white border border-border
                    focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/20 transition-all"
                  placeholder="••••••••"
                  minLength={8}
                  required
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 active:bg-primary/80 text-primary-foreground 
                py-3 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t(isRegistering ? 'auth.register' : 'auth.login')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button 
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-sm text-muted-foreground hover:text-white transition-colors"
            >
              {t(isRegistering ? 'auth.haveAccount' : 'auth.noAccount')}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default AuthDialog;