import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, CheckCircle } from 'lucide-react';
import { DiyaFlame } from '../ui/DiyaFlame';
import { soundEngine } from '../../services/audioService';

interface RakhiCeremonyProps {
  onCeremonyComplete: () => void;
}

export const RakhiCeremony: React.FC<RakhiCeremonyProps> = ({ onCeremonyComplete }) => {
  const [isTied, setIsTied] = useState<boolean>(false);
  const [isTying, setIsTying] = useState<boolean>(false);

  const handleTieRakhi = () => {
    if (isTied || isTying) return;

    setIsTying(true);
    soundEngine.playChimeSound();

    setTimeout(() => {
      setIsTied(true);
      setIsTying(false);

      // Trigger festive golden and rose confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#fbbf24', '#f43f5e', '#e11d48', '#fef3c7'],
      });

      onCeremonyComplete();
    }, 1200);
  };

  return (
    <section className="py-24 px-4 max-w-4xl mx-auto text-center relative z-10" id="rakhi-ceremony">
      
      {/* Chapter Tag */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-festive-gold/15 border border-festive-gold/30 text-festive-amber text-xs font-mono uppercase tracking-widest mb-6">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Sacred Interactive Ritual</span>
      </div>

      <h2 className="font-serif text-3xl sm:text-5xl font-bold gold-text-gradient glow-gold mb-3">
        Interactive Rakhi Ceremony
      </h2>
      <p className="text-slate-300 text-sm sm:text-base font-sans max-w-md mx-auto mb-10">
        Tie the sacred Rakhi thread of lifelong love, teasing, and brotherly protection.
      </p>

      {/* Ceremonial Sacred Altar Card */}
      <div className="glass-panel-gold rounded-3xl p-8 sm:p-12 border-2 border-festive-gold/30 shadow-2xl relative overflow-hidden flex flex-col items-center">
        
        {/* Background Diya glow aura */}
        <div className={`absolute inset-0 bg-festive-amber/10 blur-3xl transition-opacity duration-1000 ${isTied ? 'opacity-90' : 'opacity-40'}`} />

        {/* Traditional Diya at the Top of Altar */}
        <div className="mb-8">
          <DiyaFlame size="lg" isInteractive />
          <span className="text-[11px] font-mono text-festive-amber/80 tracking-widest uppercase block mt-2">
            Sacred Diya
          </span>
        </div>

        {/* Wrist & Rakhi Interactive Area */}
        <div className="relative w-full max-w-md h-56 sm:h-64 flex flex-col items-center justify-center">
          
          {/* Brother's Wrist Silhouette */}
          <div className="relative w-64 sm:w-72 h-14 bg-gradient-to-r from-amber-950/80 via-amber-900/60 to-amber-950/80 rounded-full border border-festive-gold/30 shadow-2xl flex items-center justify-center overflow-hidden">
            <span className="text-xs font-serif tracking-widest text-festive-cream/60 uppercase">
              Brother's Wrist
            </span>

            {/* Sacred Golden Tying Threads (Visible when tied or tying) */}
            {(isTied || isTying) && (
              <>
                <div className="absolute inset-x-0 h-2 bg-gradient-to-r from-festive-gold via-festive-amber to-festive-rose animate-pulse" />
                <div className="absolute left-1/2 -translate-x-1/2 w-44 h-1 bg-yellow-200 blur-[1px]" />
              </>
            )}
          </div>

          {/* Rakhi Sacred Motif */}
          <div 
            onClick={handleTieRakhi}
            className={`absolute z-20 transition-all duration-700 cursor-pointer ${
              isTied
                ? 'scale-110'
                : isTying
                ? 'scale-125 animate-spin'
                : 'hover:scale-105 animate-bounce'
            }`}
          >
            {/* Ornate Rakhi SVG */}
            <svg 
              viewBox="0 0 160 160" 
              className="w-28 h-28 sm:w-36 sm:h-36 drop-shadow-[0_0_20px_rgba(245,158,11,0.6)]"
            >
              <defs>
                <radialGradient id="rakhiCenter" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fff7ed" />
                  <stop offset="40%" stopColor="#fbbf24" />
                  <stop offset="80%" stopColor="#e11d48" />
                  <stop offset="100%" stopColor="#78350f" />
                </radialGradient>
                <linearGradient id="rakhiGold" x1="0%" y1="0%" x2="100%" y2="100%">
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
                    fill="url(#rakhiGold)"
                    stroke="#b45309"
                    strokeWidth="1"
                    transform={`rotate(${i * 30})`}
                  />
                ))}
              </g>

              {/* Crimson Ring */}
              <circle cx="80" cy="80" r="42" fill="#9f1239" stroke="#fbbf24" strokeWidth="2.5" />

              {/* Golden Inner Star / Rays */}
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
              <circle cx="80" cy="80" r="24" fill="url(#rakhiCenter)" stroke="#fef3c7" strokeWidth="2" />
              <circle cx="80" cy="80" r="10" fill="#fff" opacity="0.9" />

              {/* Decorative Threads trailing off */}
              <path d="M 0,80 Q 40,70 80,80" stroke="#f59e0b" strokeWidth="3" fill="none" strokeDasharray="4 2" />
              <path d="M 80,80 Q 120,90 160,80" stroke="#f59e0b" strokeWidth="3" fill="none" strokeDasharray="4 2" />
            </svg>
          </div>

        </div>

        {/* Action Button & Status */}
        <div className="mt-8 space-y-4">
          {!isTied ? (
            <button
              onClick={handleTieRakhi}
              disabled={isTying}
              className="px-8 py-4 rounded-full font-serif font-bold text-slate-950 bg-gradient-to-r from-festive-gold via-festive-amber to-festive-gold hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-festive-amber/30 text-base sm:text-lg flex items-center gap-3"
              id="tie-rakhi-btn"
            >
              <Sparkles className="w-5 h-5 text-slate-950 animate-spin" />
              <span>{isTying ? 'Tying Rakhi...' : "TAP TO TIE RAKHI ON BROTHER'S WRIST 🪢"}</span>
            </button>
          ) : (
            <div className="space-y-3 animate-fadeIn">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-semibold">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Rakhi Successfully Tied with Brotherly Love!</span>
              </div>
              <p className="font-handwritten text-2xl sm:text-3xl text-festive-amber font-bold">
                "Blessings received. Now it's time for the gift..."
              </p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
