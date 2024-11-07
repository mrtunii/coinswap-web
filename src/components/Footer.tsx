import React from 'react';
import { Github, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-surface-accent/10 py-8 mt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-8">
            <a href="#" className="text-white/60 hover:text-primary transition-colors">
              მთავარი
            </a>
            <a href="#" className="text-white/60 hover:text-primary transition-colors">
              ჩვენს შესახებ
            </a>
            <a href="#" className="text-white/60 hover:text-primary transition-colors">
              დახმარება
            </a>
            <a href="#" className="text-white/60 hover:text-primary transition-colors">
              კონტაქტი
            </a>
          </div>
          
          <div className="flex items-center gap-4">
            <a href="#" className="text-white/60 hover:text-primary transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-white/60 hover:text-primary transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-surface-accent/10 text-center text-sm text-white/40">
          © 2024 CoinSwap. ყველა უფლება დაცულია.
        </div>
      </div>
    </footer>
  );
};

export default Footer;