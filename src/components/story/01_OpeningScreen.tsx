import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';
import { soundEngine } from '../../services/audioService';

interface OpeningScreenProps {
  onEnter: () => void;
}

export const OpeningScreen: React.FC<OpeningScreenProps> = ({ onEnter }) => {
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    // Progressive timed reveals
    const timer1 = setTimeout(() => setStep(1), 800);   // "AKKOI..."
    const timer2 = setTimeout(() => setStep(2), 2200);  // "I made something for you."
    const timer3 = setTimeout(() => setStep(3), 4000);  // "But before you say anything..."
    const timer4 = setTimeout(() => setStep(4), 5800);  // "...yes, this is actually for you. 😂"
    const timer5 = setTimeout(() => setStep(5), 7200);  // "Come with me." + ENTER button

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, []);

  const handleEnterClick = async () => {
    soundEngine.playChimeSound();
    await soundEngine.startMusic();
    onEnter();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-obsidian-950 text-center overflow-hidden select-none">
      {/* Background Soft Glow */}
      <div className="absolute w-96 h-96 rounded-full bg-festive-amber/10 blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute w-80 h-80 rounded-full bg-festive-crimson/10 blur-3xl pointer-events-none -bottom-10 -right-10" />

      <div className="max-w-xl w-full flex flex-col items-center space-y-7 relative z-10">
        
        {/* Step 1: AKKOI... */}
        {step >= 1 && (
          <div className="animate-fadeIn transition-all duration-1000">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase text-festive-amber bg-festive-amber/10 border border-festive-amber/20 mb-4">
              <Sparkles className="w-3 h-3 text-festive-amber" />
              Special Digital Gift
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-bold gold-text-gradient glow-gold tracking-wide">
              AKKOI...
            </h1>
          </div>
        )}

        {/* Step 2: I made something for you */}
        {step >= 2 && (
          <p className="font-serif text-xl sm:text-2xl text-slate-200 animate-fadeIn transition-all duration-1000">
            I made something for you.
          </p>
        )}

        {/* Step 3: But before you say anything... */}
        {step >= 3 && (
          <p className="font-sans text-base sm:text-lg text-slate-400 italic animate-fadeIn transition-all duration-1000">
            But before you say anything...
          </p>
        )}

        {/* Step 4: ...yes, this is actually for you. 😂 */}
        {step >= 4 && (
          <div className="glass-panel px-6 py-3 rounded-2xl border border-festive-gold/30 animate-fadeIn transition-all duration-1000 transform hover:scale-105">
            <p className="font-handwritten text-2xl sm:text-3xl text-festive-amber flex items-center justify-center gap-2">
              <span>...yes, this is actually for you.</span>
              <span className="text-2xl">😂</span>
            </p>
          </div>
        )}

        {/* Step 5: Come with me + ENTER */}
        {step >= 5 && (
          <div className="pt-6 flex flex-col items-center gap-5 animate-fadeIn transition-all duration-1000">
            <p className="font-serif text-lg text-festive-cream/90 flex items-center gap-2">
              <span>Come with me.</span>
              <Heart className="w-4 h-4 text-festive-rose fill-festive-rose animate-pulse" />
            </p>

            <button
              onClick={handleEnterClick}
              className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-serif font-bold text-slate-950 bg-gradient-to-r from-festive-amber via-festive-gold to-festive-amber hover:brightness-110 shadow-lg shadow-festive-amber/20 hover:shadow-festive-amber/40 transition-all duration-300 transform active:scale-95 text-base sm:text-lg tracking-wider"
              id="enter-experience-btn"
            >
              <span>ENTER</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
            <span className="text-[11px] text-slate-500 font-sans tracking-wide">
              (Headphones recommended for music)
            </span>
          </div>
        )}

        {/* Skip Button if user wants instant entrance */}
        {step < 5 && (
          <button
            onClick={() => setStep(5)}
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors pt-4 underline underline-offset-4"
          >
            Skip animation
          </button>
        )}

      </div>
    </div>
  );
};
