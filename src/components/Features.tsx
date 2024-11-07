import React from 'react';
import { Shield, Zap, Users, Gift, Coins, Clock, Phone, Lock } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "უსაფრთხო გარიგებები",
      description: "თქვენი კრიპტოვალუტა დაცულია უახლესი უსაფრთხოების სისტემებით"
    },
    {
      icon: <Zap className="w-6 h-6 text-primary" />,
      title: "სწრაფი გაცვლა",
      description: "გაცვალეთ კრიპტოვალუტა წამებში, მარტივად და სწრაფად"
    },
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: "რეფერალური სისტემა",
      description: "მოიწვიეთ მეგობრები და მიიღეთ ბონუსები ყოველ გაცვლაზე"
    },
    {
      icon: <Gift className="w-6 h-6 text-primary" />,
      title: "გათამაშებები",
      description: "მიიღეთ მონაწილეობა ყოველკვირეულ გათამაშებებში და მოიგეთ პრიზები"
    },
    {
      icon: <Coins className="w-6 h-6 text-primary" />,
      title: "საუკეთესო კურსი",
      description: "ვუზრუნველყოფთ ბაზარზე საუკეთესო გაცვლის კურსს"
    },
    {
      icon: <Clock className="w-6 h-6 text-primary" />,
      title: "24/7 გაცვლა",
      description: "გაცვალეთ კრიპტოვალუტა ნებისმიერ დროს, შეზღუდვების გარეშე"
    },
    {
      icon: <Phone className="w-6 h-6 text-primary" />,
      title: "მობილური ხელმისაწვდომობა",
      description: "გამოიყენეთ ჩვენი სერვისი ნებისმიერი მოწყობილობიდან"
    },
    {
      icon: <Lock className="w-6 h-6 text-primary" />,
      title: "KYC ვერიფიკაცია",
      description: "უსაფრთხო და სწრაფი ვერიფიკაცია SumSub-ის მეშვეობით"
    }
  ];

  return (
    <div className="mt-24">
      <h2 className="text-3xl font-bold text-center mb-16 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        რატომ CoinSwap?
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="glass-effect p-6 rounded-xl hover:bg-gray-800/50 transition-all duration-300 hover-scale group"
          >
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-300">
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;