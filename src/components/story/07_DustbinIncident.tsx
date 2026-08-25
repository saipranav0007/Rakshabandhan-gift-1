import React, { useState } from 'react';
import { Laugh, Smile, Ghost } from 'lucide-react';
import { soundEngine } from '../../services/audioService';

export const DustbinIncident: React.FC = () => {
  const [revealedDustbin, setRevealedDustbin] = useState<boolean>(false);
  const [revealedGhost, setRevealedGhost] = useState<boolean>(false);

  const handleRevealDustbin = () => {
    soundEngine.playBuzzerSound();
    setRevealedDustbin(true);
  };

  const handleRevealGhost = () => {
    soundEngine.playPopSound();
    setRevealedGhost(true);
  };

  return (
    <section className="py-24 px-4 max-w-4xl mx-auto text-center relative z-10" id="dustbin-memory">
      
      {/* Chapter Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-festive-rose/15 border border-festive-rose/30 text-festive-rose text-xs font-mono uppercase tracking-widest mb-6">
        <Laugh className="w-3.5 h-3.5" />
        <span>Chapter 05 • Sibling Embarrassing Flashbacks</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        
        {/* Card 1: The Legendary Tuition Dustbin Incident */}
        <div className="glass-panel-crimson rounded-3xl p-6 sm:p-8 border border-festive-rose/30 shadow-2xl space-y-6 flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-3">
            <span className="text-3xl">🗑️</span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-100">
              The Tuition Incident
            </h3>
            <p className="font-sans text-xs sm:text-sm text-slate-300">
              Do you remember the day I called you...
            </p>
          </div>

          {!revealedDustbin ? (
            <button
              onClick={handleRevealDustbin}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-festive-rose to-festive-crimson hover:scale-105 transition-all text-white font-serif font-bold text-sm shadow-lg shadow-festive-crimson/30 inline-flex items-center justify-center gap-2"
              id="reveal-dustbin-btn"
            >
              <Smile className="w-4 h-4" />
              <span>TAP TO REVEAL NICKNAME 😂</span>
            </button>
          ) : (
            <div className="space-y-4 animate-fadeIn">
              <div className="py-3 px-4 rounded-2xl bg-obsidian-950/90 border-2 border-festive-rose/60 shadow-xl">
                <span className="font-serif text-2xl sm:text-4xl font-black text-festive-rose glow-crimson tracking-widest uppercase">
                  "DUSTBIN"
                </span>
              </div>
              <p className="font-sans text-xs sm:text-sm text-slate-200">
                ...in front of everyone at your tuition! And your face went 100% red with embarrassment. 😂
              </p>
              <p className="font-handwritten text-lg text-rose-300">
                "I probably shouldn't have done that... but it's unforgettable."
              </p>
            </div>
          )}

          <div className="pt-3 border-t border-festive-rose/20 text-[10px] text-slate-400 font-mono">
            STATUS: Legendary Sibling Memory
          </div>
        </div>

        {/* Card 2: The Ghost Game Flashback */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-festive-gold/30 shadow-2xl space-y-6 flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-3">
            <span className="text-3xl">👻</span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-festive-cream">
              The Ghost Game
            </h3>
            <p className="font-sans text-xs sm:text-sm text-slate-300">
              Why did we think playing in total darkness was a brilliant idea?
            </p>
          </div>

          {!revealedGhost ? (
            <button
              onClick={handleRevealGhost}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-festive-gold to-festive-amber hover:scale-105 transition-all text-slate-950 font-serif font-bold text-sm shadow-lg shadow-festive-amber/30 inline-flex items-center justify-center gap-2"
            >
              <Ghost className="w-4 h-4" />
              <span>TAP TO REVEAL COURAGE 🕯️</span>
            </button>
          ) : (
            <div className="space-y-4 animate-fadeIn">
              <div className="py-3 px-4 rounded-2xl bg-obsidian-950/90 border border-festive-gold/60 shadow-xl">
                <span className="font-serif text-lg sm:text-xl font-bold text-festive-amber">
                  Pure Chaotic Bravery 🕯️
                </span>
              </div>
              <p className="font-sans text-xs sm:text-sm text-slate-200">
                Turned off all the lights, got completely terrified within 30 seconds, and ran back together laughing like crazy!
              </p>
              <p className="font-handwritten text-lg text-festive-cream">
                "Surviving chaotic childhood games side-by-side."
              </p>
            </div>
          )}

          <div className="pt-3 border-t border-festive-gold/20 text-[10px] text-slate-400 font-mono">
            STATUS: 100% Fearless Sibling Duo
          </div>
        </div>

      </div>

    </section>
  );
};
