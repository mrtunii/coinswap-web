import React, { useState } from 'react';
import { ChevronDown, Building2 } from 'lucide-react';

interface BankSelectProps {
  selected: string;
  onSelect: (bank: string) => void;
  fullWidth?: boolean;
}

const banks = [
  {
    id: 'bog-usd',
    name: 'Bank of Georgia USD',
    icon: 'https://bankofgeorgia.ge/assets/logo-responsive.svg'
  },
  {
    id: 'bog-gel',
    name: 'Bank of Georgia GEL',
    icon: 'https://bankofgeorgia.ge/assets/logo-responsive.svg'
  }
];

const BankSelect: React.FC<BankSelectProps> = ({ selected, onSelect, fullWidth }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedBank = banks.find(bank => bank.id === selected) || banks[0];

  return (
    <div className="relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-[52px] flex items-center justify-between gap-2 px-3 rounded-xl bg-surface-secondary border border-border
                 hover:border-primary/30 transition-all duration-300 group"
      >
        <div className="flex items-center gap-2">
          {selectedBank.icon ? (
            <img src={selectedBank.icon} alt={selectedBank.name} className="h-6 w-auto object-contain" />
          ) : (
            <Building2 className="w-5 h-5" />
          )}
          <span className="font-medium">{selectedBank.name}</span>
        </div>
        <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 rounded-xl bg-surface-secondary border border-border 
                     shadow-xl z-50 animate-fade-in">
          <div className="py-1">
            {banks.map((bank) => (
              <button
                key={bank.id}
                onClick={() => {
                  onSelect(bank.id);
                  setIsOpen(false);
                }}
                className="w-full px-3 py-2.5 flex items-center gap-3 hover:bg-surface/50 transition-colors group"
              >
                {bank.icon ? (
                  <img src={bank.icon} alt={bank.name} className="h-7 w-auto object-contain" />
                ) : (
                  <Building2 className="w-6 h-6" />
                )}
                <div className="flex-1 text-left">
                  <div className="font-medium group-hover:text-white transition-colors">{bank.name}</div>
                </div>
                {selected === bank.id && (
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BankSelect;