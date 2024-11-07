import React, { useState } from 'react';
import { User, Phone, Lock, Shield, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../contexts/AuthContext';
import * as Tabs from '@radix-ui/react-tabs';

const Settings = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpdateEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      // TODO: Implement email update
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess('ელ.ფოსტა წარმატებით განახლდა');
    } catch (err) {
      setError('დაფიქსირდა შეცდომა');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePhone = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);
    const phone = formData.get('phone') as string;
    const password = formData.get('password') as string;

    try {
      // TODO: Implement phone update
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess('ტელეფონის ნომერი წარმატებით განახლდა');
    } catch (err) {
      setError('დაფიქსირდა შეცდომა');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(e.currentTarget);
    const currentPassword = formData.get('currentPassword') as string;
    const newPassword = formData.get('newPassword') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (newPassword !== confirmPassword) {
      setError('პაროლები არ ემთხვევა');
      setLoading(false);
      return;
    }

    try {
      // TODO: Implement password update
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess('პაროლი წარმატებით განახლდა');
    } catch (err) {
      setError('დაფიქსირდა შეცდომა');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="glass-effect p-6 rounded-xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-primary/10">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">ანგარიშის პარამეტრები</h2>
            <p className="text-sm text-muted-foreground">
              მართეთ თქვენი ანგარიშის უსაფრთხოება და პერსონალური ინფორმაცია
            </p>
          </div>
        </div>

        <Tabs.Root defaultValue="email" className="space-y-6">
          <Tabs.List className="flex space-x-2 border-b border-border">
            <Tabs.Trigger
              value="email"
              className="px-4 py-2 text-sm font-medium text-muted-foreground data-[state=active]:text-primary
                       data-[state=active]:border-b-2 data-[state=active]:border-primary -mb-px transition-colors"
            >
              ელ.ფოსტა
            </Tabs.Trigger>
            <Tabs.Trigger
              value="phone"
              className="px-4 py-2 text-sm font-medium text-muted-foreground data-[state=active]:text-primary
                       data-[state=active]:border-b-2 data-[state=active]:border-primary -mb-px transition-colors"
            >
              ტელეფონი
            </Tabs.Trigger>
            <Tabs.Trigger
              value="password"
              className="px-4 py-2 text-sm font-medium text-muted-foreground data-[state=active]:text-primary
                       data-[state=active]:border-b-2 data-[state=active]:border-primary -mb-px transition-colors"
            >
              პაროლი
            </Tabs.Trigger>
          </Tabs.List>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-500 text-sm flex items-center gap-2">
              <Shield className="w-4 h-4" />
              {success}
            </div>
          )}

          <Tabs.Content value="email" className="space-y-4">
            <div className="p-4 rounded-lg bg-surface-secondary/50 border border-border">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">მიმდინარე ელ.ფოსტა</div>
                  <div className="font-medium">{user?.email}</div>
                </div>
              </div>
            </div>

            <form onSubmit={handleUpdateEmail} className="space-y-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-1.5">
                  ახალი ელ.ფოსტა
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full bg-surface-secondary px-4 py-3 rounded-xl text-white border border-border
                    focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-1.5">
                  პაროლი
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  className="w-full bg-surface-secondary px-4 py-3 rounded-xl text-white border border-border
                    focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/20 transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium
                       py-3 rounded-xl transition-colors disabled:opacity-50"
              >
                განახლება
              </button>
            </form>
          </Tabs.Content>

          <Tabs.Content value="phone" className="space-y-4">
            <div className="p-4 rounded-lg bg-surface-secondary/50 border border-border">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">მიმდინარე ნომერი</div>
                  <div className="font-medium">{user?.phone_number}</div>
                </div>
              </div>
            </div>

            <form onSubmit={handleUpdatePhone} className="space-y-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-1.5">
                  ახალი ნომერი
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="w-full bg-surface-secondary px-4 py-3 rounded-xl text-white border border-border
                    focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-1.5">
                  პაროლი
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  className="w-full bg-surface-secondary px-4 py-3 rounded-xl text-white border border-border
                    focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/20 transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium
                       py-3 rounded-xl transition-colors disabled:opacity-50"
              >
                განახლება
              </button>
            </form>
          </Tabs.Content>

          <Tabs.Content value="password" className="space-y-4">
            <div className="p-4 rounded-lg bg-surface-secondary/50 border border-border">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-muted-foreground" />
                <div>
                  <div className="text-sm text-muted-foreground">პაროლის განახლება</div>
                  <div className="text-sm text-muted-foreground">
                    რეკომენდირებულია პაროლის პერიოდული განახლება უსაფრთხოების მიზნით
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-1.5">
                  მიმდინარე პაროლი
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  required
                  className="w-full bg-surface-secondary px-4 py-3 rounded-xl text-white border border-border
                    focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-1.5">
                  ახალი პაროლი
                </label>
                <input
                  type="password"
                  name="newPassword"
                  required
                  minLength={8}
                  className="w-full bg-surface-secondary px-4 py-3 rounded-xl text-white border border-border
                    focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-1.5">
                  გაიმეორეთ ახალი პაროლი
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  minLength={8}
                  className="w-full bg-surface-secondary px-4 py-3 rounded-xl text-white border border-border
                    focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/20 transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium
                       py-3 rounded-xl transition-colors disabled:opacity-50"
              >
                განახლება
              </button>
            </form>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  );
};

export default Settings;