import React, { useState } from 'react';
import { Laugh, Smile } from 'lucide-react';
import { soundEngine } from '../../services/audioService';

export const DustbinIncident: React.FC = () => {
  const [revealed, setRevealed] = useState<boolean>(false);

  const handleReveal = () => {
    soundEngine.playPopSound();
    setRevealed(true);
  };

  return (
    <section className="py-20 px-4 max-w-3xl mx-auto text-center relative z-10" id="dustbin-memory">
      
      {/* Chapter Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-festive-rose/15 border border-festive-rose/30 text-festive-rose text-xs font-mono uppercase tracking-widest mb-6">
        <Laugh className="w-3.5 h-3.5" />
        <span>Chapter 02 • Sibling Chaos</span>
      </div>

      {/* Main Container */}
      <div className="glass-panel-crimson rounded-3xl p-6 sm:p-10 border border-festive-rose/30 shadow-2xl space-y-7 relative overflow-hidden">
        
        {/* Playful background watermark */}
        <div className="absolute -right-6 -bottom-6 text-9xl opacity-5 select-none pointer-events-none">
          😂
        </div>

        {/* Heading */}
        <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-100">
          Okay... we need to talk about this one.
        </h2>

        <p className="font-sans text-base sm:text-lg text-slate-300">
          Do you remember the day I called you...
        </p>

        {/* The Reveal Card */}
        {!revealed ? (
          <div className="py-6">
            <button
              onClick={handleReveal}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-festive-rose to-festive-crimson hover:scale-105 transition-all text-white font-serif font-bold text-lg shadow-lg shadow-festive-crimson/30 inline-flex items-center gap-3 animate-pulse"
              id="reveal-dustbin-btn"
            >
              <Smile className="w-5 h-5" />
              <span>TAP TO REVEAL EMBARRASSING MEMORY 😂</span>
            </button>
          </div>
        ) : (
          <div className="space-y-6 animate-fadeIn transition-all duration-700">
            {/* Dramatic Highlight */}
            <div className="py-4 px-6 rounded-2xl bg-obsidian-950/80 border-2 border-festive-rose/60 max-w-md mx-auto shadow-2xl">
              <span className="font-serif text-4xl sm:text-6xl font-black text-festive-rose glow-crimson tracking-widest uppercase">
                "DUSTBIN"
              </span>
            </div>

            {/* The Context */}
            <div className="space-y-3 font-sans text-base sm:text-lg text-slate-200">
              <p className="font-semibold text-festive-amber">
                ...at your tuition.
              </p>
              <p className="font-handwritten text-2xl sm:text-3xl text-rose-300">
                And you were SO embarrassed. 😂
              </p>
            </div>

            {/* Sibling Reflection */}
            <div className="pt-6 border-t border-festive-rose/20 max-w-lg mx-auto space-y-3">
              <p className="text-slate-300 italic">
                Okay, I know... I probably shouldn't have done that.
              </p>
              <p className="font-serif text-lg sm:text-xl font-bold text-festive-cream glow-gold">
                "But honestly... that's one of those ridiculous memories I'll never forget."
              </p>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
