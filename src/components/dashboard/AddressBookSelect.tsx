import React, { useState } from 'react';
import { ChevronDown, Plus, Copy, Trash2, Check } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Select from '@radix-ui/react-select';
import { cn } from '../../lib/utils';

interface Address {
  id: string;
  name: string;
  value: string;
  type: 'crypto' | 'bank';
  network?: string;
  bankName?: string;
}

interface AddressBookSelectProps {
  type: 'crypto' | 'bank';
  value: string;
  onChange: (value: string) => void;
  onNetworkChange?: (network: string) => void;
  onBankChange?: (bank: string) => void;
  className?: string;
}

const networks = [
  { value: 'trc20', label: 'Tron (TRC20)' },
  { value: 'bep20', label: 'BNB Smart Chain (BEP20)' },
  { value: 'erc20', label: 'Ethereum (ERC20)' },
  { value: 'sol', label: 'Solana' },
];

const banks = [
  { value: 'bog', label: 'Bank of Georgia' },
  { value: 'tbc', label: 'TBC Bank' },
  { value: 'liberty', label: 'Liberty Bank' },
];

const AddressBookSelect: React.FC<AddressBookSelectProps> = ({
  type,
  value,
  onChange,
  onNetworkChange,
  onBankChange,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      name: 'ძირითადი TRC20',
      value: 'TNx2fE9...',
      type: 'crypto',
      network: 'TRC20'
    },
    {
      id: '2',
      name: 'BOG USD',
      value: 'GE29BG00...',
      type: 'bank',
      bankName: 'Bank of Georgia'
    }
  ]);
  const [newAddress, setNewAddress] = useState<Partial<Address>>({
    type,
    name: '',
    value: ''
  });
  const [copied, setCopied] = useState<string | null>(null);

  const filteredAddresses = addresses.filter(addr => addr.type === type);

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopied(value);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleAddAddress = () => {
    if (newAddress.name && newAddress.value) {
      const address = {
        id: Math.random().toString(),
        name: newAddress.name,
        value: newAddress.value,
        type,
        network: newAddress.network,
        bankName: newAddress.bankName
      };
      setAddresses(prev => [...prev, address]);
      onChange(newAddress.value);
      if (type === 'crypto' && onNetworkChange && newAddress.network) {
        onNetworkChange(newAddress.network);
      }
      if (type === 'bank' && onBankChange && newAddress.bankName) {
        onBankChange(newAddress.bankName);
      }
      setNewAddress({ type, name: '', value: '' });
      setShowAddDialog(false);
    }
  };

  const handleDelete = (id: string) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
  };

  const handleSelect = (address: Address) => {
    onChange(address.value);
    if (type === 'crypto' && onNetworkChange && address.network) {
      onNetworkChange(address.network);
    }
    if (type === 'bank' && onBankChange && address.bankName) {
      onBankChange(address.bankName);
    }
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full bg-surface-secondary px-4 py-3.5 rounded-xl text-white border border-border cursor-pointer",
          "hover:border-primary/30 transition-all duration-300",
          className
        )}
      >
        <div className="flex items-center justify-between">
          <span className={value ? undefined : "text-muted-foreground"}>
            {value || `აირჩიეთ ${type === 'crypto' ? 'მისამართი' : 'IBAN'}`}
          </span>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 rounded-xl bg-surface-secondary border border-border 
                     shadow-xl z-50 divide-y divide-border animate-fade-in">
          {filteredAddresses.map((address) => (
            <div 
              key={address.id}
              className="p-3 hover:bg-surface/50 transition-colors cursor-pointer"
              onClick={() => handleSelect(address)}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="font-medium">{address.name}</div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(address.value);
                    }}
                    className="p-1 hover:bg-surface-accent/20 rounded transition-colors"
                  >
                    {copied === address.value ? (
                      <Check className="w-4 h-4 text-primary" />
                    ) : (
                      <Copy className="w-4 h-4 text-muted-foreground" />
                    )}
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(address.id);
                    }}
                    className="p-1 hover:bg-red-500/20 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-muted-foreground hover:text-red-500" />
                  </button>
                </div>
              </div>
              <div className="text-sm text-muted-foreground font-mono flex items-center gap-2">
                {address.value}
                {address.network && (
                  <span className="text-xs px-1.5 py-0.5 rounded bg-surface-accent/20">
                    {address.network}
                  </span>
                )}
                {address.bankName && (
                  <span className="text-xs px-1.5 py-0.5 rounded bg-surface-accent/20">
                    {address.bankName}
                  </span>
                )}
              </div>
            </div>
          ))}

          <button
            onClick={() => setShowAddDialog(true)}
            className="w-full p-3 flex items-center gap-2 text-sm text-primary hover:bg-surface/50 transition-colors"
          >
            <Plus className="w-4 h-4" />
            ახალი მისამართის დამატება
          </button>
        </div>
      )}

      <Dialog.Root open={showAddDialog} onOpenChange={setShowAddDialog}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />
          <Dialog.Content className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-md
            bg-surface border border-border shadow-2xl p-6 rounded-2xl z-50">
            <Dialog.Title className="text-xl font-semibold mb-4">
              {type === 'crypto' ? 'ახალი კრიპტო მისამართი' : 'ახალი საბანკო ანგარიში'}
            </Dialog.Title>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-muted-foreground mb-1.5">
                  სახელი
                </label>
                <input
                  type="text"
                  value={newAddress.name}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-surface-secondary px-4 py-3 rounded-xl text-white border border-border
                    focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/20 transition-all"
                  placeholder="მაგ: ძირითადი TRC20"
                />
              </div>

              {type === 'crypto' && (
                <div>
                  <label className="block text-sm text-muted-foreground mb-1.5">
                    ქსელი
                  </label>
                  <Select.Root
                    value={newAddress.network}
                    onValueChange={(value) => setNewAddress(prev => ({ ...prev, network: value }))}
                  >
                    <Select.Trigger className="w-full bg-surface-secondary px-4 py-3 rounded-xl text-white border border-border
                      focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/20 transition-all flex items-center justify-between">
                      <Select.Value placeholder="აირჩიეთ ქსელი" />
                      <Select.Icon>
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      </Select.Icon>
                    </Select.Trigger>

                    <Select.Portal>
                      <Select.Content className="bg-surface-secondary border border-border rounded-xl shadow-xl overflow-hidden z-[100]">
                        <Select.Viewport>
                          {networks.map((network) => (
                            <Select.Item
                              key={network.value}
                              value={network.value}
                              className="px-4 py-2.5 text-sm cursor-pointer hover:bg-surface/50 focus:bg-surface/50 outline-none"
                            >
                              <Select.ItemText>{network.label}</Select.ItemText>
                            </Select.Item>
                          ))}
                        </Select.Viewport>
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                </div>
              )}

              {type === 'bank' && (
                <div>
                  <label className="block text-sm text-muted-foreground mb-1.5">
                    ბანკი
                  </label>
                  <Select.Root
                    value={newAddress.bankName}
                    onValueChange={(value) => setNewAddress(prev => ({ ...prev, bankName: value }))}
                  >
                    <Select.Trigger className="w-full bg-surface-secondary px-4 py-3 rounded-xl text-white border border-border
                      focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/20 transition-all flex items-center justify-between">
                      <Select.Value placeholder="აირჩიეთ ბანკი" />
                      <Select.Icon>
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      </Select.Icon>
                    </Select.Trigger>

                    <Select.Portal>
                      <Select.Content className="bg-surface-secondary border border-border rounded-xl shadow-xl overflow-hidden z-[100]">
                        <Select.Viewport>
                          {banks.map((bank) => (
                            <Select.Item
                              key={bank.value}
                              value={bank.value}
                              className="px-4 py-2.5 text-sm cursor-pointer hover:bg-surface/50 focus:bg-surface/50 outline-none"
                            >
                              <Select.ItemText>{bank.label}</Select.ItemText>
                            </Select.Item>
                          ))}
                        </Select.Viewport>
                      </Select.Content>
                    </Select.Portal>
                  </Select.Root>
                </div>
              )}

              <div>
                <label className="block text-sm text-muted-foreground mb-1.5">
                  {type === 'crypto' ? 'კრიპტო მისამართი' : 'IBAN'}
                </label>
                <input
                  type="text"
                  value={newAddress.value}
                  onChange={(e) => setNewAddress(prev => ({ ...prev, value: e.target.value }))}
                  className="w-full bg-surface-secondary px-4 py-3 rounded-xl text-white border border-border
                    focus:outline-none focus:border-primary/30 focus:ring-1 focus:ring-primary/20 transition-all"
                  placeholder={type === 'crypto' ? 'მაგ: TNx2fE9...' : 'მაგ: GE29BG00...'}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowAddDialog(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium hover:bg-surface-accent/10 transition-colors"
              >
                გაუქმება
              </button>
              <button
                onClick={handleAddAddress}
                disabled={!newAddress.name || !newAddress.value || 
                  (type === 'crypto' && !newAddress.network) || 
                  (type === 'bank' && !newAddress.bankName)}
                className="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground
                         transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                დამატება
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default AddressBookSelect;