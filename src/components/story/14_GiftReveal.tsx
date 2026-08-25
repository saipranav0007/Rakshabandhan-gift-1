import React from 'react';
import { Gift, Mail, Sparkles } from 'lucide-react';
import { soundEngine } from '../../services/audioService';

interface GiftRevealProps {
  onOpenGift: () => void;
  isOpened: boolean;
}

export const GiftReveal: React.FC<GiftRevealProps> = ({ onOpenGift, isOpened }) => {
  const handleOpen = () => {
    soundEngine.playPaperSound();
    soundEngine.playChimeSound();
    onOpenGift();
  };

  return (
    <section className="py-20 px-4 max-w-3xl mx-auto text-center relative z-10" id="the-gift-reveal">
      
      <div className="space-y-6">
        
        {/* Playful Brother Intro */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-festive-gold/20 space-y-4 max-w-xl mx-auto">
          <p className="font-sans text-base sm:text-lg text-slate-300">
            I know I should probably give you an expensive gift...
          </p>
          <p className="font-handwritten text-2xl sm:text-3xl text-festive-amber font-bold">
            "...but you already know me." 😂
          </p>
          <div className="pt-2 border-t border-slate-800">
            <p className="font-serif text-lg text-slate-200">
              So instead... <span className="font-bold text-festive-cream glow-gold">A promise.</span>
            </p>
          </div>
        </div>

        {/* The Gift Envelope */}
        <div className="py-6 flex flex-col items-center">
          
          <div 
            onClick={!isOpened ? handleOpen : undefined}
            className={`relative max-w-sm w-full p-6 sm:p-8 rounded-3xl border-2 transition-all duration-500 cursor-pointer ${
              isOpened
                ? 'bg-obsidian-900 border-festive-gold/40 shadow-xl'
                : 'glass-panel-gold border-festive-amber/50 shadow-2xl hover:scale-105 animate-pulse'
            }`}
          >
            {/* Wax Seal / Medallion */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-festive-crimson to-festive-ruby border-2 border-festive-amber mx-auto flex items-center justify-center text-festive-cream shadow-xl mb-4">
              <Mail className="w-8 h-8 text-festive-cream" />
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-festive-cream mb-2">
              For Srivalli (Akkoi)
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
                <span>OPEN YOUR GIFT</span>
              </button>
            ) : (
              <div className="text-xs text-slate-400 font-sans italic flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-festive-amber" />
                <span>Gift Unsealed Below</span>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
