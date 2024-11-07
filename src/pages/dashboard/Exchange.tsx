import React from 'react';
import { TrendingUp, Users, Repeat, Clock } from 'lucide-react';
import DashboardExchangeForm from '../../components/dashboard/DashboardExchangeForm';
import ExchangeLimits from '../../components/dashboard/ExchangeLimits';

const Exchange = () => {
  const stats = [
    {
      icon: <TrendingUp className="w-6 h-6 text-primary" />,
      value: "₾25M+",
      label: "24 საათში გაცვლილი",
      change: "+12.5%"
    },
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      value: "50K+",
      label: "აქტიური მომხმარებელი",
      change: "+8.3%"
    },
    {
      icon: <Repeat className="w-6 h-6 text-primary" />,
      value: "1M+",
      label: "წარმატებული გარიგება"
    },
    {
      icon: <Clock className="w-6 h-6 text-primary" />,
      value: "2.5 წთ",
      label: "საშუალო გაცვლის დრო"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="glass-effect p-6 rounded-xl">
            <div className="flex items-center gap-4 mb-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10">
                {stat.icon}
              </div>
              <div>
                <h4 className="text-2xl font-bold">{stat.value}</h4>
                {stat.change && (
                  <span className="text-xs font-medium text-primary">
                    {stat.change} (24სთ)
                  </span>
                )}
              </div>
            </div>
            <p className="text-sm text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr,400px] gap-6">
        <div className="space-y-6">
          <DashboardExchangeForm />
        </div>
        
        <div>
          <ExchangeLimits />
        </div>
      </div>
    </div>
  );
};

export default Exchange;