import React from 'react';
import { TrendingUp, Users, Repeat, Clock } from 'lucide-react';

const StatCard = ({ icon, value, label, change }: { icon: React.ReactNode; value: string; label: string; change?: string }) => (
  <div className="glass-effect p-6 rounded-2xl relative overflow-hidden group hover-scale">
    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className="relative z-10">
      <div className="flex items-center gap-4 mb-3">
        <div className="p-2.5 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10">
          {icon}
        </div>
        <div>
          <h4 className="text-2xl font-bold">{value}</h4>
          {change && (
            <span className="text-xs font-medium text-primary">
              +{change} (24სთ)
            </span>
          )}
        </div>
      </div>
      <p className="text-sm text-gray-400">{label}</p>
    </div>
  </div>
);

const Stats = () => {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="grid md:grid-cols-4 gap-6">
        <StatCard
          icon={<TrendingUp className="w-6 h-6 text-primary" />}
          value="₾25M+"
          label="24 საათში გაცვლილი"
          change="12.5%"
        />
        <StatCard
          icon={<Users className="w-6 h-6 text-primary" />}
          value="50K+"
          label="აქტიური მომხმარებელი"
          change="8.3%"
        />
        <StatCard
          icon={<Repeat className="w-6 h-6 text-primary" />}
          value="1M+"
          label="წარმატებული გარიგება"
        />
        <StatCard
          icon={<Clock className="w-6 h-6 text-primary" />}
          value="2.5 წთ"
          label="საშუალო გაცვლის დრო"
        />
      </div>
    </div>
  );
};

export default Stats;