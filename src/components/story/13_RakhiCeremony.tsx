import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle, Flame } from 'lucide-react';
import { soundEngine } from '../../services/audioService';

interface RakhiCeremonyProps {
  onCeremonyComplete: () => void;
}

export const RakhiCeremony: React.FC<RakhiCeremonyProps> = ({ onCeremonyComplete }) => {
  const [currentStep, setCurrentStep] = useState<number>(1); // 1: Diya, 2: Tilak, 3: Sweet, 4: Rakhi, 5: Completed
  const [isDiyaLit, setIsDiyaLit] = useState<boolean>(false);
  const [isTilakApplied, setIsTilakApplied] = useState<boolean>(false);
  const [isSweetFed, setIsSweetFed] = useState<boolean>(false);
  const [isRakhiTied, setIsRakhiTied] = useState<boolean>(false);
  const [isTying, setIsTying] = useState<boolean>(false);

  // Step 1: Light Diya
  const handleLightDiya = () => {
    if (isDiyaLit) return;
    soundEngine.playDiyaLightSound();
    setIsDiyaLit(true);
    setTimeout(() => setCurrentStep(2), 700);
  };

  // Step 2: Apply Tilak
  const handleApplyTilak = () => {
    if (isTilakApplied) return;
    soundEngine.playTilakSound();
    setIsTilakApplied(true);
    setTimeout(() => setCurrentStep(3), 700);
  };

  // Step 3: Offer Sweet
  const handleOfferSweet = () => {
    if (isSweetFed) return;
    soundEngine.playSweetSound();
    setIsSweetFed(true);
    setTimeout(() => setCurrentStep(4), 700);
  };

  // Step 4: Tie Rakhi
  const handleTieRakhi = () => {
    if (isRakhiTied || isTying) return;
    setIsTying(true);
    soundEngine.playChimeSound();

    setTimeout(() => {
      setIsRakhiTied(true);
      setIsTying(false);
      setCurrentStep(5);
      soundEngine.playRakhiTieFanfare();

      // Massive Multi-Stage Confetti Explosion
      const end = Date.now() + 2500;
      const colors = ['#f59e0b', '#fbbf24', '#f43f5e', '#e11d48', '#fef3c7', '#38bdf8'];

      (function frame() {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();

      onCeremonyComplete();
    }, 1400);
  };

  return (
    <section className="py-24 px-4 max-w-4xl mx-auto text-center relative z-10" id="rakhi-ceremony">
      
      {/* Chapter Tag */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-festive-gold/15 border border-festive-gold/30 text-festive-amber text-xs font-mono uppercase tracking-widest mb-6">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Chapter 12 • Sacred Interactive Ritual</span>
      </div>

      <h2 className="font-serif text-3xl sm:text-5xl font-bold gold-text-gradient glow-gold mb-3">
        Interactive 4-Step Rakhi Ceremony
      </h2>
      <p className="text-slate-300 text-sm sm:text-base font-sans max-w-md mx-auto mb-10">
        Perform the full traditional ritual for your younger brother with sacred light, tilak, sweets, and the sacred Rakhi thread.
      </p>

      {/* Ritual Progress Stepper */}
      <div className="grid grid-cols-4 gap-2 max-w-xl mx-auto mb-8">
        {[
          { step: 1, label: 'Light Diya', icon: '🪔', done: isDiyaLit },
          { step: 2, label: 'Apply Tilak', icon: '✨', done: isTilakApplied },
          { step: 3, label: 'Feed Sweet', icon: '🍬', done: isSweetFed },
          { step: 4, label: 'Tie Rakhi', icon: '🪢', done: isRakhiTied },
        ].map((s) => (
          <div
            key={s.step}
            className={`p-2.5 rounded-2xl border text-center transition-all duration-300 ${
              s.done
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300'
                : currentStep === s.step
                ? 'bg-festive-amber/20 border-festive-amber text-festive-cream scale-105 shadow-md'
                : 'bg-obsidian-900/60 border-slate-800 text-slate-500'
            }`}
          >
            <span className="text-xl sm:text-2xl block mb-1">{s.icon}</span>
            <span className="text-[10px] sm:text-xs font-serif font-bold block truncate">
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Ceremonial Sacred Altar Plate / Thali */}
      <div className="glass-panel-gold rounded-3xl p-6 sm:p-12 border-2 border-festive-gold/40 shadow-2xl relative overflow-hidden flex flex-col items-center max-w-2xl mx-auto">
        
        {/* Background glow */}
        <div className={`absolute inset-0 bg-festive-amber/15 blur-3xl transition-opacity duration-1000 ${isRakhiTied ? 'opacity-100' : 'opacity-40'}`} />

        {/* 1. Sacred Diya & Tilak Interactive Display */}
        <div className="flex items-center justify-center gap-8 mb-8">
          
          {/* Diya Box */}
          <div
            onClick={handleLightDiya}
            className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col items-center ${
              isDiyaLit
                ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_25px_rgba(245,158,11,0.5)] scale-105'
                : 'bg-obsidian-900/80 border-slate-700 hover:border-amber-400 hover:scale-105 animate-pulse'
            }`}
            title="Tap to light sacred Diya"
          >
            <div className="relative w-12 h-12 flex items-center justify-center">
              {isDiyaLit ? (
                <div className="relative">
                  <div className="w-5 h-8 bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 rounded-full blur-[1px] animate-pulse" />
                  <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-4 bg-white rounded-full blur-[0.5px]" />
                </div>
              ) : (
                <Flame className="w-8 h-8 text-slate-600" />
              )}
            </div>
            <span className="text-[11px] font-mono mt-2 font-bold uppercase tracking-wider text-festive-amber">
              {isDiyaLit ? 'Diya Lit 🔥' : 'Tap to Light 🪔'}
            </span>
          </div>

          {/* Tilak & Kumkum Box */}
          <div
            onClick={handleApplyTilak}
            className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col items-center ${
              isTilakApplied
                ? 'bg-rose-500/20 border-rose-400 text-rose-300 shadow-[0_0_25px_rgba(244,63,94,0.5)] scale-105'
                : currentStep >= 2
                ? 'bg-obsidian-900/80 border-slate-700 hover:border-rose-400 hover:scale-105 animate-pulse'
                : 'bg-obsidian-900/40 border-slate-800 text-slate-600 opacity-60'
            }`}
            title="Tap to apply Tilak"
          >
            <div className="w-12 h-12 flex items-center justify-center text-3xl">
              {isTilakApplied ? '🔴' : '✨'}
            </div>
            <span className="text-[11px] font-mono mt-2 font-bold uppercase tracking-wider text-festive-rose">
              {isTilakApplied ? 'Tilak Applied ✨' : 'Apply Tilak 🔴'}
            </span>
          </div>

          {/* Sweet Offering Box */}
          <div
            onClick={handleOfferSweet}
            className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col items-center ${
              isSweetFed
                ? 'bg-yellow-500/20 border-yellow-400 text-yellow-300 shadow-[0_0_25px_rgba(234,179,8,0.5)] scale-105'
                : currentStep >= 3
                ? 'bg-obsidian-900/80 border-slate-700 hover:border-yellow-400 hover:scale-105 animate-pulse'
                : 'bg-obsidian-900/40 border-slate-800 text-slate-600 opacity-60'
            }`}
            title="Tap to offer sweet"
          >
            <div className="w-12 h-12 flex items-center justify-center text-3xl">
              🍬
            </div>
            <span className="text-[11px] font-mono mt-2 font-bold uppercase tracking-wider text-yellow-300">
              {isSweetFed ? 'Sweet Fed 😋' : 'Feed Sweet 🍬'}
            </span>
          </div>

        </div>

        {/* 2. Wrist & Rakhi Interactive Tying Section */}
        <div className="relative w-full max-w-md h-56 sm:h-64 flex flex-col items-center justify-center my-2">
          
          {/* Brother's Wrist Silhouette */}
          <div className="relative w-64 sm:w-72 h-14 bg-gradient-to-r from-amber-950/80 via-amber-900/60 to-amber-950/80 rounded-full border border-festive-gold/30 shadow-2xl flex items-center justify-center overflow-hidden">
            <span className="text-xs font-serif tracking-widest text-festive-cream/60 uppercase">
              Brother's Wrist
            </span>

            {/* Sacred Golden Tying Threads */}
            {(isRakhiTied || isTying) && (
              <>
                <div className="absolute inset-x-0 h-2 bg-gradient-to-r from-festive-gold via-festive-amber to-festive-rose animate-pulse" />
                <div className="absolute left-1/2 -translate-x-1/2 w-48 h-1 bg-yellow-200 blur-[1px]" />
              </>
            )}
          </div>

          {/* Ornate Rakhi Motif */}
          <div 
            onClick={handleTieRakhi}
            className={`absolute z-20 transition-all duration-700 cursor-pointer ${
              isRakhiTied
                ? 'scale-115'
                : isTying
                ? 'scale-125 animate-spin'
                : currentStep >= 4
                ? 'hover:scale-110 animate-bounce'
                : 'opacity-60 scale-95'
            }`}
          >
            <svg 
              viewBox="0 0 160 160" 
              className="w-28 h-28 sm:w-36 sm:h-36 drop-shadow-[0_0_25px_rgba(245,158,11,0.7)]"
            >
              <defs>
                <radialGradient id="rakhiCenterUpgraded" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fff7ed" />
                  <stop offset="40%" stopColor="#fbbf24" />
                  <stop offset="80%" stopColor="#e11d48" />
                  <stop offset="100%" stopColor="#78350f" />
                </radialGradient>
                <linearGradient id="rakhiGoldUpgraded" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fef3c7" />
                  <stop offset="50%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#d97706" />
                </linearGradient>
              </defs>

              {/* Outer Golden Petals */}
              <g transform="translate(80,80)">
                {Array.from({ length: 12 }).map((_, i) => (
                  <circle
                    key={i}
                    cx="0"
                    cy="-45"
                    r="8"
                    fill="url(#rakhiGoldUpgraded)"
                    stroke="#b45309"
                    strokeWidth="1"
                    transform={`rotate(${i * 30})`}
                  />
                ))}
              </g>

              {/* Crimson Ring */}
              <circle cx="80" cy="80" r="42" fill="#9f1239" stroke="#fbbf24" strokeWidth="2.5" />

              {/* Golden Inner Star Rays */}
              <g transform="translate(80,80)">
                {Array.from({ length: 8 }).map((_, i) => (
                  <rect
                    key={i}
                    x="-2"
                    y="-34"
                    width="4"
                    height="12"
                    rx="2"
                    fill="#fef3c7"
                    transform={`rotate(${i * 45})`}
                  />
                ))}
              </g>

              {/* Central Core Bead */}
              <circle cx="80" cy="80" r="24" fill="url(#rakhiCenterUpgraded)" stroke="#fef3c7" strokeWidth="2" />
              <circle cx="80" cy="80" r="10" fill="#fff" opacity="0.9" />

              {/* Trailing Silk Threads */}
              <path d="M 0,80 Q 40,70 80,80" stroke="#f59e0b" strokeWidth="3.5" fill="none" strokeDasharray="4 2" />
              <path d="M 80,80 Q 120,90 160,80" stroke="#f59e0b" strokeWidth="3.5" fill="none" strokeDasharray="4 2" />
            </svg>
          </div>

        </div>

        {/* 3. Action Button & Feedback */}
        <div className="mt-6 space-y-4 w-full">
          {!isRakhiTied ? (
            <button
              onClick={handleTieRakhi}
              disabled={isTying}
              className="w-full sm:w-auto px-8 py-4 rounded-full font-serif font-bold text-slate-950 bg-gradient-to-r from-festive-gold via-festive-amber to-festive-gold hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-festive-amber/30 text-sm sm:text-base flex items-center justify-center gap-3 mx-auto tracking-wider"
              id="tie-rakhi-btn"
            >
              <Sparkles className="w-5 h-5 text-slate-950 animate-spin" />
              <span>{isTying ? 'Tying Sacred Rakhi...' : "STEP 4: TIE SACRED RAKHI ON BROTHER'S WRIST 🌸"}</span>
            </button>
          ) : (
            <div className="space-y-3 animate-fadeIn">
              <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-semibold">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Rakhi Successfully Tied! Sibling Bond Sealed Forever ❤️</span>
              </div>
              <p className="font-handwritten text-2xl sm:text-3xl text-festive-amber font-bold">
                "Blessings received. Now open the digital gift envelope below..."
              </p>
            </div>
          )}
        </div>

      </div>

    </section>
  );
};
