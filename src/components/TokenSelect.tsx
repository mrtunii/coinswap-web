import React, { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { Token } from '../types';

interface TokenSelectProps {
  selectedToken: Token;
  onSelect: (token: Token) => void;
  onClose: () => void;
  fullWidth?: boolean;
}

const tokens: Token[] = [
  {
    id: 'usdt-bep20',
    name: 'USDT',
    network: 'Binance Chain',
    icon: 'https://cryptologos.cc/logos/tether-usdt-logo.png',
    networkIcon: 'https://cryptologos.cc/logos/bnb-bnb-logo.png'
  },
  {
    id: 'usdt-solana',
    name: 'USDT',
    network: 'Solana Network',
    icon: 'https://cryptologos.cc/logos/tether-usdt-logo.png',
    networkIcon: 'https://cryptologos.cc/logos/solana-sol-logo.png'
  },
  {
    id: 'usdt-trc20',
    name: 'USDT',
    network: 'Tron Network',
    icon: 'https://cryptologos.cc/logos/tether-usdt-logo.png',
    networkIcon: 'https://cryptologos.cc/logos/tron-trx-logo.png'
  },
  {
    id: 'usdt-polygon',
    name: 'USDT',
    network: 'Polygon Network',
    icon: 'https://cryptologos.cc/logos/tether-usdt-logo.png',
    networkIcon: 'https://cryptologos.cc/logos/polygon-matic-logo.png'
  }
];

const TokenSelect: React.FC<TokenSelectProps> = ({ selectedToken, onSelect, onClose, fullWidth }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredTokens = tokens.filter(token => 
    token.name.toLowerCase().includes(search.toLowerCase()) ||
    token.network.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-[52px] flex items-center justify-between gap-2 px-3 rounded-xl bg-surface-secondary border border-border
                 hover:border-primary/30 transition-all duration-300"
      >
        <div className="flex items-center gap-2">
          <img src={selectedToken.icon} alt={selectedToken.name} className="w-5 h-5" />
          <span className="font-medium">{selectedToken.name}</span>
          <img src={selectedToken.networkIcon} alt={selectedToken.network} className="w-4 h-4" />
        </div>
        <ChevronDown className="w-4 h-4 text-muted-foreground" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 rounded-xl bg-surface-secondary border border-border 
                     shadow-xl z-50">
          <div className="p-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="მოძებნეთ ტოკენი ან ქსელი..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-surface px-10 py-2.5 rounded-lg text-white border border-border
                         placeholder-muted focus:outline-none focus:border-border-active transition-colors"
              />
            </div>
          </div>

          <div className="max-h-72 overflow-y-auto">
            {filteredTokens.map((token) => (
              <button
                key={token.id}
                onClick={() => {
                  onSelect(token);
                  setIsOpen(false);
                }}
                className="w-full px-3 py-2.5 flex items-center gap-3 hover:bg-surface/50 transition-colors"
              >
                <img src={token.icon} alt={token.name} className="w-6 h-6" />
                <div className="flex-1 text-left">
                  <div className="font-medium">{token.name}</div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1.5">
                    <img src={token.networkIcon} alt={token.network} className="w-3.5 h-3.5" />
                    {token.network}
                  </div>
                </div>
                {selectedToken.id === token.id && (
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

export default TokenSelect;