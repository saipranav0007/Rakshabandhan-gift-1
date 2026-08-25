import React, { useState } from 'react';
import { Gift, Mail, Sparkles, Heart } from 'lucide-react';
import { soundEngine } from '../../services/audioService';

interface GiftRevealProps {
  onOpenGift: () => void;
  isOpened: boolean;
}

export const GiftReveal: React.FC<GiftRevealProps> = ({ onOpenGift, isOpened }) => {
  const [isUnsealing, setIsUnsealing] = useState<boolean>(false);

  const handleOpen = () => {
    if (isOpened || isUnsealing) return;
    setIsUnsealing(true);
    soundEngine.playPaperSound();
    soundEngine.playChimeSound();

    setTimeout(() => {
      setIsUnsealing(false);
      onOpenGift();
      soundEngine.playSweetSound();
    }, 600);
  };

  return (
    <section className="py-20 px-4 max-w-3xl mx-auto text-center relative z-10" id="the-gift-reveal">
      
      <div className="space-y-6">
        
        {/* Playful Brother Intro */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-festive-gold/25 space-y-4 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-festive-gold/15 border border-festive-gold/30 text-festive-amber text-xs font-mono uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-festive-amber" />
            <span>Chapter 13 • The Digital Gift</span>
          </div>

          <p className="font-sans text-base sm:text-lg text-slate-300">
            I know I should probably give you an expensive gift...
          </p>
          <p className="font-handwritten text-2xl sm:text-3xl text-festive-amber font-bold">
            "...but you already know me." 😂
          </p>
          <div className="pt-2 border-t border-slate-800">
            <p className="font-serif text-lg text-slate-200">
              So instead of money... <span className="font-bold text-festive-cream glow-gold">A lifelong promise.</span>
            </p>
          </div>
        </div>

        {/* The 3D Wax-Sealed Gift Envelope */}
        <div className="py-6 flex flex-col items-center">
          
          <div 
            onClick={!isOpened ? handleOpen : undefined}
            className={`relative max-w-md w-full p-6 sm:p-8 rounded-3xl border-2 transition-all duration-500 cursor-pointer ${
              isOpened
                ? 'bg-obsidian-900/90 border-festive-gold/40 shadow-xl'
                : isUnsealing
                ? 'scale-105 bg-festive-gold/20 border-festive-amber'
                : 'glass-panel-gold border-festive-amber/50 shadow-2xl hover:scale-105 animate-pulse'
            }`}
          >
            {/* Wax Seal / Medallion */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-festive-crimson to-festive-ruby border-2 border-festive-amber mx-auto flex items-center justify-center text-festive-cream shadow-xl mb-4 transform hover:rotate-12 transition-transform">
              <Mail className="w-8 h-8 text-festive-cream" />
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-festive-cream mb-2">
              For Srivalli (Akkoi) ❤️
            </h3>
            <p className="text-xs text-festive-amber/80 font-mono uppercase tracking-widest mb-6">
              Brother's Sacred Raksha Promise
            </p>

            {!isOpened ? (
              <button
                onClick={handleOpen}
                className="w-full py-3.5 rounded-full font-serif font-bold text-slate-950 bg-gradient-to-r from-festive-gold via-festive-amber to-festive-gold hover:brightness-110 shadow-lg shadow-festive-amber/30 text-sm sm:text-base tracking-wider flex items-center justify-center gap-2"
                id="open-gift-btn"
              >
                <Gift className="w-4 h-4 text-slate-950" />
                <span>{isUnsealing ? 'UNSEALING WAX STAMP...' : 'BREAK WAX SEAL & OPEN PROMISE 📜'}</span>
              </button>
            ) : (
              <div className="text-xs text-festive-amber font-serif italic flex items-center justify-center gap-2">
                <Heart className="w-4 h-4 text-festive-rose fill-festive-rose" />
                <span>Promise Unsealed & Revealed Below</span>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
