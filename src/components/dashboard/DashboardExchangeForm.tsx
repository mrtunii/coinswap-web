import React, { useState, useEffect } from 'react';
import { ArrowDown, Info } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import TokenSelect from '../TokenSelect';
import BankSelect from '../BankSelect';
import AddressBookSelect from './AddressBookSelect';
import { Token } from '../../types';

const defaultToken: Token = {
  id: 'usdt-bep20',
  name: 'USDT',
  network: 'Binance Chain',
  icon: 'https://cryptologos.cc/logos/tether-usdt-logo.png',
  networkIcon: 'https://cryptologos.cc/logos/bnb-bnb-logo.png'
};

const EXCHANGE_RATE = 2.5;

const DashboardExchangeForm = () => {
  const { t } = useTranslation();
  const [cryptoAmount, setCryptoAmount] = useState('');
  const [gelAmount, setGelAmount] = useState('');
  const [selectedToken, setSelectedToken] = useState<Token>(defaultToken);
  const [selectedBank, setSelectedBank] = useState('bog-gel');
  const [activeTab, setActiveTab] = useState('sell');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [selectedIBAN, setSelectedIBAN] = useState('');

  const handleCryptoAmountChange = (value: string) => {
    if (/^\d*\.?\d*$/.test(value)) {
      setCryptoAmount(value);
      setGelAmount(value ? (parseFloat(value) * EXCHANGE_RATE).toFixed(2) : '');
    }
  };

  const handleGelAmountChange = (value: string) => {
    if (/^\d*\.?\d*$/.test(value)) {
      setGelAmount(value);
      setCryptoAmount(value ? (parseFloat(value) / EXCHANGE_RATE).toFixed(2) : '');
    }
  };

  const handleExchange = () => {
    // TODO: Implement exchange logic
    console.log('Processing exchange...');
  };

  const resetAmounts = () => {
    setCryptoAmount('');
    setGelAmount('');
  };

  useEffect(() => {
    resetAmounts();
  }, [activeTab]);

  return (
    <div className="glass-effect rounded-2xl">
      <Tabs defaultValue="sell" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="sell">{t('exchange.sell')}</TabsTrigger>
          <TabsTrigger value="buy">{t('exchange.buy')}</TabsTrigger>
        </TabsList>

        <div className="p-5 space-y-4">
          <TabsContent value="sell" className="space-y-4 mt-0">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-muted-foreground">{t('exchange.send')}</label>
                <span className="text-xs text-muted-foreground">
                  {t('exchange.min')}: 50 USDT
                </span>
              </div>
              <div className="space-y-2">
                <TokenSelect
                  selectedToken={selectedToken}
                  onSelect={setSelectedToken}
                  onClose={() => {}}
                  fullWidth
                />
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    value={cryptoAmount}
                    onChange={(e) => handleCryptoAmountChange(e.target.value)}
                    className="w-full bg-surface-secondary px-4 py-3.5 rounded-xl text-white border border-border
                             placeholder-muted focus:outline-none focus:border-border-active transition-colors"
                    placeholder="0.00"
                  />
                  <button 
                    className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 text-xs text-primary 
                             hover:text-primary/80 transition-colors font-medium"
                    onClick={() => handleCryptoAmountChange('100')}
                  >
                    MAX
                  </button>
                </div>
              </div>
            </div>

            <div className="relative flex justify-center py-2">
              <div className="absolute inset-x-0 top-1/2 h-px bg-border"></div>
              <button className="relative z-10 p-2 rounded-xl bg-surface-secondary border border-border 
                             hover:border-border-active transition-all duration-300 group">
                <ArrowDown className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors" />
              </button>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-muted-foreground">{t('exchange.receive')}</label>
                <span className="text-xs text-muted-foreground">
                  {t('exchange.rate')}: 1 USDT = {EXCHANGE_RATE} GEL
                </span>
              </div>
              <div className="space-y-2">
                <BankSelect selected={selectedBank} onSelect={setSelectedBank} fullWidth />
                <AddressBookSelect
                  type="bank"
                  value={selectedIBAN}
                  onChange={setSelectedIBAN}
                  onBankChange={setSelectedBank}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="buy" className="space-y-4 mt-0">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-muted-foreground">{t('exchange.send')}</label>
                <span className="text-xs text-muted-foreground">
                  {t('exchange.min')}: 100 GEL
                </span>
              </div>
              <div className="space-y-2">
                <BankSelect selected={selectedBank} onSelect={setSelectedBank} fullWidth />
                <AddressBookSelect
                  type="bank"
                  value={selectedIBAN}
                  onChange={setSelectedIBAN}
                  onBankChange={setSelectedBank}
                />
                <input
                  type="text"
                  inputMode="decimal"
                  value={gelAmount}
                  onChange={(e) => handleGelAmountChange(e.target.value)}
                  className="w-full bg-surface-secondary px-4 py-3.5 rounded-xl text-white border border-border
                           placeholder-muted focus:outline-none focus:border-border-active transition-colors"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="relative flex justify-center py-2">
              <div className="absolute inset-x-0 top-1/2 h-px bg-border"></div>
              <button className="relative z-10 p-2 rounded-xl bg-surface-secondary border border-border 
                             hover:border-border-active transition-all duration-300 group">
                <ArrowDown className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors" />
              </button>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-muted-foreground">{t('exchange.receive')}</label>
                <span className="text-xs text-muted-foreground">
                  {t('exchange.rate')}: 1 USDT = {EXCHANGE_RATE} GEL
                </span>
              </div>
              <div className="space-y-2">
                <TokenSelect
                  selectedToken={selectedToken}
                  onSelect={setSelectedToken}
                  onClose={() => {}}
                  fullWidth
                />
                <AddressBookSelect
                  type="crypto"
                  value={selectedAddress}
                  onChange={setSelectedAddress}
                />
              </div>
            </div>
          </TabsContent>

          <div className="space-y-2">
            <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-surface-secondary/50 border border-border">
              <div className="flex items-center gap-2 text-sm">
                <Info className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{t('exchange.fee')}</span>
              </div>
              <span className="text-sm">0.5%</span>
            </div>
          </div>

          <button
            onClick={handleExchange}
            className={`w-full py-3.5 rounded-xl font-medium transition-colors ${
              !cryptoAmount || !gelAmount || !selectedAddress || !selectedIBAN
                ? 'bg-muted cursor-not-allowed'
                : activeTab === 'buy'
                  ? 'bg-secondary hover:bg-secondary/90 text-secondary-foreground'
                  : 'bg-primary hover:bg-primary/90 text-primary-foreground'
            }`}
            disabled={!cryptoAmount || !gelAmount || !selectedAddress || !selectedIBAN}
          >
            {t('exchange.exchange')}
          </button>

          <p className="text-center text-sm text-muted-foreground">
            {t('exchange.termsAgree')}
          </p>
        </div>
      </Tabs>
    </div>
  );
};

export default DashboardExchangeForm;