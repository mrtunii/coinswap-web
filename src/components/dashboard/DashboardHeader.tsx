import React from 'react';
import { Bell, UserCircle2, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import LanguageSwitcher from '../LanguageSwitcher';

const limits = [
  {
    period: 'დღიური',
    limit: '₾4,500',
    used: '₾2,500',
    percentage: 55
  },
  {
    period: 'კვირის',
    limit: '₾10,000',
    used: '₾4,800',
    percentage: 48
  },
  {
    period: 'თვის',
    limit: '₾50,000',
    used: '₾15,600',
    percentage: 31
  }
];

const DashboardHeader = () => {
  const { user } = useAuth();
  const [showLimits, setShowLimits] = React.useState(false);

  return (
    <header className="h-16 border-b border-border bg-surface-secondary/50 backdrop-blur-sm px-6 relative z-50">
      <div className="h-full flex items-center justify-between">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        
        <div className="flex items-center gap-6">
          {/* Limits */}
          <div className="flex items-center gap-4">
            {limits.map((limit, index) => (
              <div 
                key={index}
                className="relative group"
                onMouseEnter={() => setShowLimits(true)}
                onMouseLeave={() => setShowLimits(false)}
              >
                <div className="flex items-center gap-2">
                  <div className="w-20 h-1.5 bg-surface rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${limit.percentage}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{limit.period}</span>
                </div>

                {/* Tooltip */}
                <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 p-3 rounded-lg bg-surface-secondary border border-border
                              shadow-lg transition-opacity duration-200 ${showLimits ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                  <div className="text-sm whitespace-nowrap">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertCircle className="w-4 h-4 text-primary" />
                      <span>{limit.period} ლიმიტი</span>
                    </div>
                    <div className="font-medium">
                      {limit.used} / <span className="text-primary">{limit.limit}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <LanguageSwitcher />
          
          <button className="p-2 rounded-lg hover:bg-surface-accent/10 transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
          </button>
          
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-surface-secondary">
            <UserCircle2 className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">{user?.email}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;