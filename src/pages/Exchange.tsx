import React from 'react';
import ExchangeForm from '../components/ExchangeForm';
import Stats from '../components/Stats';
import Features from '../components/Features';

const Exchange = () => {
  return (
    <main className="container mx-auto px-4">
      <div className="min-h-[calc(100vh-4rem)] py-12">
        <div className="grid lg:grid-cols-[2fr,620px] gap-4 items-center mb-20">
          <div className="lg:max-w-[700px] space-y-4 animate-slide-down">
            <h1 className="text-[3.3rem] font-bold leading-tight">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                კრიპტოვალუტის გაცვლა
              </span>
              <br />
              მარტივად და სწრაფად
            </h1>
            <p className="text-base text-muted-foreground">
              გაცვალეთ კრიპტოვალუტა ლარში საუკეთესო კურსით, უსაფრთხოდ და სწრაფად
            </p>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-surface-secondary/50">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                <span className="text-sm">24/7 ავტომატური გაცვლა</span>
              </div>
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-surface-secondary/50">
                <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></div>
                <span className="text-sm">დაცული გარიგებები</span>
              </div>
            </div>
          </div>
          
          <div className="w-full">
            <ExchangeForm />
          </div>
        </div>

        <Stats />
        <Features />
      </div>
    </main>
  );
};

export default Exchange;