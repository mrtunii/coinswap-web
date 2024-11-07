import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Wallet, LayoutDashboard, RefreshCcw, Users, Settings, Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useTranslation } from 'react-i18next';

const menuItems = [
  {
    path: '/dashboard/exchange',
    icon: <LayoutDashboard className="w-5 h-5" />,
    label: 'exchange.exchange'
  },
  {
    path: '/dashboard/referrals',
    icon: <Users className="w-5 h-5" />,
    label: 'referral.title'
  },
  {
    path: '/dashboard/settings',
    icon: <Settings className="w-5 h-5" />,
    label: 'settings.title'
  }
];

const DashboardSidebar = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-surface border border-border"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-40 w-64 bg-surface border-r border-border transition-transform lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-4">
          <Link to="/" className="flex items-center gap-2 px-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Wallet className="w-4 h-4 text-primary" />
            </div>
            <span className="text-lg font-medium">CoinSwap</span>
          </Link>

          <nav className="mt-8 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  location.pathname === item.path
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-white hover:bg-surface-accent/10"
                )}
              >
                {item.icon}
                {t(item.label)}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default DashboardSidebar;