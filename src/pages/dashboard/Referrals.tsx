import React, { useState } from 'react';
import { Copy, Share2, Check, ArrowRight, Gift, Users, Coins } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface ReferralAction {
  id: string;
  type: 'signup' | 'transaction';
  email: string;
  date: string;
  tokens: number;
  status: 'pending' | 'completed';
}

const Referrals = () => {
  const { user } = useAuth();
  const [copied, setCopied] = useState<'link' | 'code' | null>(null);
  
  const referralLink = `https://coinswap.ge/register?ref=${user?.id}`;
  const referralCode = user?.id?.slice(0, 8).toUpperCase();

  const stats = [
    {
      icon: <Users className="w-5 h-5 text-primary" />,
      label: 'მოწვეული მეგობრები',
      value: '12'
    },
    {
      icon: <Coins className="w-5 h-5 text-primary" />,
      label: 'მიღებული SWAPS',
      value: '600'
    },
    {
      icon: <Gift className="w-5 h-5 text-primary" />,
      label: 'დასაჩუქრებული SWAPS',
      value: '300'
    }
  ];

  const referralActions: ReferralAction[] = [
    {
      id: '1',
      type: 'signup',
      email: 'john.doe@example.com',
      date: '2024-03-15',
      tokens: 50,
      status: 'completed'
    },
    {
      id: '2',
      type: 'transaction',
      email: 'jane.smith@example.com',
      date: '2024-03-14',
      tokens: 50,
      status: 'completed'
    },
    {
      id: '3',
      type: 'signup',
      email: 'mike.brown@example.com',
      date: '2024-03-13',
      tokens: 50,
      status: 'pending'
    }
  ];

  const handleCopy = (type: 'link' | 'code') => {
    const text = type === 'link' ? referralLink : referralCode;
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'CoinSwap - Crypto Exchange',
          text: 'Join CoinSwap using my referral link and get 50 SWAPS tokens!',
          url: referralLink
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="glass-effect p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-primary/10">
                {stat.icon}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="glass-effect rounded-xl">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-semibold mb-2">მოიწვიე მეგობრები</h2>
          <p className="text-muted-foreground">
            გააზიარე შენი უნიკალური ბმული ან კოდი მეგობრებთან და მიიღე 50 SWAPS ტოკენი
            ყოველი მეგობრის რეგისტრაციაზე და ტრანზაქციაზე
          </p>
        </div>

        <div className="p-6 border-b border-border space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-1 px-4 py-3 rounded-xl bg-surface-secondary border border-border font-mono text-sm">
              {referralLink}
            </div>
            <button
              onClick={() => handleCopy('link')}
              className="p-3 rounded-xl bg-surface-secondary border border-border hover:bg-surface-accent/10 transition-colors"
            >
              {copied === 'link' ? (
                <Check className="w-5 h-5 text-primary" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={handleShare}
              className="p-3 rounded-xl bg-surface-secondary border border-border hover:bg-surface-accent/10 transition-colors"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 px-4 py-3 rounded-xl bg-surface-secondary border border-border font-mono text-sm">
              {referralCode}
            </div>
            <button
              onClick={() => handleCopy('code')}
              className="p-3 rounded-xl bg-surface-secondary border border-border hover:bg-surface-accent/10 transition-colors"
            >
              {copied === 'code' ? (
                <Check className="w-5 h-5 text-primary" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <div className="p-6 border-b border-border">
          <h3 className="font-semibold mb-6">როგორ მუშაობს?</h3>
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm text-primary">1</span>
              </div>
              <div className="font-medium">გააზიარე შენი რეფერალ კოდი</div>
              <p className="text-sm text-muted-foreground">
                გაუზიარე შენი უნიკალური ბმული ან კოდი მეგობრებს
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm text-primary">2</span>
              </div>
              <div className="font-medium">მეგობარი რეგისტრირდება</div>
              <p className="text-sm text-muted-foreground">
                როდესაც მეგობარი დარეგისტრირდება შენი კოდით, ორივე მიიღებთ 50 SWAPS ტოკენს
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm text-primary">3</span>
              </div>
              <div className="font-medium">მეგობარი ახორციელებს გაცვლას</div>
              <p className="text-sm text-muted-foreground">
                მეგობრის პირველ გაცვლაზე კიდევ მიიღებთ 50-50 SWAPS ტოკენს
              </p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-border">
          {referralActions.map((action) => (
            <div key={action.id} className="p-6 flex items-center gap-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                {action.type === 'signup' ? (
                  <Users className="w-5 h-5 text-primary" />
                ) : (
                  <ArrowRight className="w-5 h-5 text-primary" />
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{action.email}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-surface-accent/20">
                    {action.type === 'signup' ? 'რეგისტრაცია' : 'ტრანზაქცია'}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {new Date(action.date).toLocaleDateString('ka-GE', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center gap-1 justify-end mb-1">
                  <Coins className="w-4 h-4 text-primary" />
                  <span className="font-medium">+{action.tokens} SWAPS</span>
                </div>
                <div className="text-xs">
                  {action.status === 'completed' ? (
                    <span className="text-primary">დარიცხულია</span>
                  ) : (
                    <span className="text-yellow-500">მიმდინარე</span>
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

export default Referrals;