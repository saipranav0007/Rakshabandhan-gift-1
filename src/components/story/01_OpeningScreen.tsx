import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Heart, Flame } from 'lucide-react';
import { soundEngine } from '../../services/audioService';

interface OpeningScreenProps {
  onEnter: () => void;
}

export const OpeningScreen: React.FC<OpeningScreenProps> = ({ onEnter }) => {
  const [step, setStep] = useState<number>(0);
  const [diyaLit, setDiyaLit] = useState<boolean>(false);

  useEffect(() => {
    // Progressive timed reveals
    const timer1 = setTimeout(() => setStep(1), 600);   // "AKKOI..."
    const timer2 = setTimeout(() => setStep(2), 1800);  // "I made something for you."
    const timer3 = setTimeout(() => setStep(3), 3200);  // "Before you say anything..."
    const timer4 = setTimeout(() => setStep(4), 4600);  // "...yes, this is actually for you. 😂"
    const timer5 = setTimeout(() => setStep(5), 5800);  // "Come with me." + ENTER button

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, []);

  const handleLightDiya = () => {
    if (diyaLit) return;
    soundEngine.playDiyaLightSound();
    setDiyaLit(true);
  };

  const handleEnterClick = async () => {
    soundEngine.playDiyaLightSound();
    await soundEngine.startMusic();
    onEnter();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-obsidian-950 text-center overflow-hidden select-none">
      {/* Background Soft Glow */}
      <div className="absolute w-96 h-96 rounded-full bg-festive-amber/15 blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute w-80 h-80 rounded-full bg-festive-crimson/15 blur-3xl pointer-events-none -bottom-10 -right-10" />

      <div className="max-w-xl w-full flex flex-col items-center space-y-6 relative z-10">
        
        {/* Interactive Opening Diya */}
        <div 
          onClick={handleLightDiya}
          className="cursor-pointer group flex flex-col items-center mb-2"
          title="Tap to light the Diya"
        >
          <div className="relative w-16 h-16 flex items-center justify-center">
            {diyaLit ? (
              <div className="relative">
                <div className="w-7 h-11 bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-100 rounded-full blur-[1px] animate-pulse" />
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-3 h-5 bg-white rounded-full blur-[0.5px]" />
              </div>
            ) : (
              <div className="p-3 rounded-full bg-white/5 border border-festive-gold/30 group-hover:scale-110 transition-transform">
                <Flame className="w-8 h-8 text-festive-amber animate-pulse" />
              </div>
            )}
          </div>
          <span className="text-[10px] font-mono text-festive-amber/80 uppercase tracking-widest mt-1">
            {diyaLit ? 'Sacred Diya Lit ✨' : 'Tap to Light 🪔'}
          </span>
        </div>

        {/* Step 1: AKKOI... */}
        {step >= 1 && (
          <div className="animate-fadeIn transition-all duration-700">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-mono tracking-widest uppercase text-festive-amber bg-festive-amber/10 border border-festive-amber/25 mb-3">
              <Sparkles className="w-3 h-3 text-festive-amber" />
              Raksha Bandhan Digital Tribute
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-black gold-text-gradient glow-gold tracking-wide">
              AKKOI...
            </h1>
          </div>
        )}

        {/* Step 2: I made something for you */}
        {step >= 2 && (
          <p className="font-serif text-xl sm:text-2xl text-slate-200 animate-fadeIn transition-all duration-700">
            I made something special for you.
          </p>
        )}

        {/* Step 3: But before you say anything... */}
        {step >= 3 && (
          <p className="font-sans text-base sm:text-lg text-slate-400 italic animate-fadeIn transition-all duration-700">
            Before you start asking questions...
          </p>
        )}

        {/* Step 4: ...yes, this is actually for you. 😂 */}
        {step >= 4 && (
          <div className="glass-panel px-6 py-3 rounded-2xl border border-festive-gold/30 animate-fadeIn transition-all duration-700 transform hover:scale-105">
            <p className="font-handwritten text-2xl sm:text-3xl text-festive-amber flex items-center justify-center gap-2 font-bold">
              <span>...yes, this is actually for you.</span>
              <span className="text-2xl">😂</span>
            </p>
          </div>
        )}

        {/* Step 5: Come with me + ENTER */}
        {step >= 5 && (
          <div className="pt-4 flex flex-col items-center gap-4 animate-fadeIn transition-all duration-700">
            <p className="font-serif text-lg text-festive-cream/90 flex items-center gap-2">
              <span>Come take a look.</span>
              <Heart className="w-4 h-4 text-festive-rose fill-festive-rose animate-pulse" />
            </p>

            <button
              onClick={handleEnterClick}
              className="group relative inline-flex items-center gap-3 px-9 py-4 rounded-full font-serif font-bold text-slate-950 bg-gradient-to-r from-festive-amber via-festive-gold to-festive-amber hover:brightness-110 shadow-xl shadow-festive-amber/30 hover:shadow-festive-amber/50 transition-all duration-300 transform active:scale-95 text-base sm:text-lg tracking-wider"
              id="enter-experience-btn"
            >
              <span>ENTER EXPERIENCE 🌸</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5" />
            </button>
            <span className="text-[11px] text-slate-400 font-sans tracking-wide">
              (Turn on sound for ambient Indian raags & instruments 🎵)
            </span>
          </div>
        )}

        {/* Skip Button */}
        {step < 5 && (
          <button
            onClick={() => setStep(5)}
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors pt-2 underline underline-offset-4"
          >
            Skip to enter
          </button>
        )}

      </div>
    </div>
  );
};
