import React from 'react';
import { AlertCircle, ArrowUpRight, TrendingUp } from 'lucide-react';

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

const transactions = [
  {
    id: '1',
    type: 'sell',
    fromAmount: '1,200',
    fromCurrency: 'USDT',
    fromNetwork: 'TRC20',
    toAmount: '3,000',
    toCurrency: 'GEL',
    date: '2024-03-15 14:30'
  },
  {
    id: '2',
    type: 'buy',
    fromAmount: '2,000',
    fromCurrency: 'GEL',
    toAmount: '800',
    toCurrency: 'USDT',
    toNetwork: 'BEP20',
    date: '2024-03-15 12:15'
  },
  {
    id: '3',
    type: 'sell',
    fromAmount: '500',
    fromCurrency: 'USDT',
    fromNetwork: 'SOL',
    toAmount: '1,250',
    toCurrency: 'GEL',
    date: '2024-03-15 10:45'
  }
];

const ExchangeLimits = () => {
  return (
    <div className="space-y-6">
      {/* Limits */}
      <div className="glass-effect rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <AlertCircle className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">გაცვლის ლიმიტები</h2>
        </div>

        <div className="space-y-6">
          {limits.map((limit, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">{limit.period}</span>
                <span className="text-sm">
                  {limit.used} / <span className="text-primary">{limit.limit}</span>
                </span>
              </div>
              <div className="h-2 bg-surface rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${limit.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="glass-effect rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">ბოლო ტრანზაქციები</h2>
          </div>
          <button className="text-sm text-primary hover:text-primary/80 transition-colors">
            ყველას ნახვა
          </button>
        </div>

        <div className="space-y-4">
          {transactions.map((tx) => (
            <div 
              key={tx.id}
              className="flex items-center justify-between p-3 rounded-lg bg-surface-secondary/50 border border-border"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <ArrowUpRight 
                    className={`w-4 h-4 ${tx.type === 'sell' ? 'text-red-500 rotate-45' : 'text-green-500 -rotate-45'}`}
                  />
                  <span className="font-medium">
                    {tx.type === 'sell' ? 'გაყიდვა' : 'ყიდვა'}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {new Date(tx.date).toLocaleString('ka-GE', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium flex items-center gap-1.5 justify-end">
                  {tx.fromAmount} {tx.fromCurrency}
                  {tx.fromNetwork && (
                    <span className="text-xs px-1.5 py-0.5 rounded bg-surface-accent/20">
                      {tx.fromNetwork}
                    </span>
                  )}
                </div>
                <div className="text-xs text-muted-foreground flex items-center gap-1.5 justify-end mt-0.5">
                  {tx.toAmount} {tx.toCurrency}
                  {tx.toNetwork && (
                    <span className="text-xs px-1.5 py-0.5 rounded bg-surface-accent/20">
                      {tx.toNetwork}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExchangeLimits;