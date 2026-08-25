import React, { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { soundEngine } from '../../services/audioService';
import photo2 from '../../assets/photos/photo2_fair_caps.png';

export const UncleChipsMemory: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const memoryElements = [
    { title: 'Food & Snacks', desc: 'Sharing that iconic green snack packet', icon: '🥔' },
    { title: 'Childhood Talks', desc: 'Endless random sibling conversations', icon: '💬' },
    { title: 'Matching Fair Caps', desc: 'Zero worries, full excitement', icon: '🧢' },
    { title: 'Uncle Chips', desc: 'Our timeless childhood bond', icon: '✨' },
  ];

  const handleStepClick = (idx: number) => {
    soundEngine.playSweetSound();
    setActiveStep(Math.max(activeStep, idx + 1));
  };

  return (
    <section className="py-20 px-4 max-w-4xl mx-auto relative z-10" id="uncle-chips-section">
      
      {/* Main Anchor Card */}
      <div className="glass-panel-gold rounded-3xl p-6 sm:p-10 border border-festive-gold/30 shadow-2xl relative overflow-hidden">
        
        {/* Glowing aura */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-festive-amber/10 blur-3xl pointer-events-none" />

        {/* Heading & Badge */}
        <div className="text-center space-y-4 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-festive-gold/15 border border-festive-gold/30 text-festive-amber text-xs font-mono uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-festive-amber" />
            <span>Chapter 03 • Childhood Anchor Memory</span>
          </div>

          <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-festive-cream tracking-wide">
            Do you remember Uncle Chips?
          </h3>
          <p className="font-handwritten text-xl sm:text-2xl text-festive-amber font-bold">
            I think I was around 1st class.
          </p>
        </div>

        {/* Nostalgic Scrapbook Box */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Vintage Polaroid / Illustrated Memory Frame */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative p-4 pb-6 bg-amber-50/95 text-slate-900 rounded-2xl shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-300 max-w-xs w-full border border-amber-200">
              {/* Top Pin/Tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-amber-200/90 -rotate-3 border border-amber-300/60 shadow-sm opacity-90" />
              
              {/* Memory artwork container */}
              <div className="w-full aspect-square rounded-xl border border-amber-200/80 overflow-hidden relative group bg-slate-900">
                <img
                  src={photo2}
                  alt="Uncle Chips & Outing Days"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-3 text-left">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300">
                    1st Class Memories
                  </span>
                  <span className="font-serif text-sm font-bold text-white">
                    Stories, Snacks & Zero Worries
                  </span>
                </div>
              </div>

              {/* Polaroid Bottom Note */}
              <div className="text-center mt-3">
                <p className="font-handwritten text-xl text-slate-800 font-bold">
                  "Best times ever."
                </p>
              </div>
            </div>
          </div>

          {/* Narrative Story Lines */}
          <div className="md:col-span-7 space-y-4">
            <div className="space-y-3 font-sans text-base sm:text-lg text-slate-200 leading-relaxed">
              <p className="flex items-start gap-2.5">
                <span className="text-festive-amber mt-1">✦</span>
                <span>We used to eat Uncle Chips together...</span>
              </p>
              <p className="flex items-start gap-2.5">
                <span className="text-festive-amber mt-1">✦</span>
                <span>...exchange lots of stories and funny gossip...</span>
              </p>
              <p className="flex items-start gap-2.5">
                <span className="text-festive-amber mt-1">✦</span>
                <span>...and spend hours just talking and doing absolutely nothing important.</span>
              </p>
            </div>

            {/* Emotional Anchor Highlight */}
            <div className="pt-4 border-t border-festive-gold/20">
              <p className="text-xs font-mono text-festive-amber/80 uppercase tracking-widest mb-1">
                Looking back across the years...
              </p>
              <blockquote className="font-serif text-xl sm:text-2xl font-bold text-festive-cream glow-gold leading-snug">
                "Those simple childhood afternoons were some of the best moments we ever spent together."
              </blockquote>
            </div>
          </div>

        </div>

        {/* Interactive Memory Tokens */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-center">
          <p className="font-serif text-lg text-festive-cream mb-2">
            Tap the nostalgic tokens to unlock memories:
          </p>
          <p className="text-xs text-slate-400 mb-6">
            (Interactive childhood relics)
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {memoryElements.map((elem, idx) => {
              const isRevealed = activeStep > idx;
              return (
                <button
                  key={elem.title}
                  onClick={() => handleStepClick(idx)}
                  className={`p-3.5 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center text-center ${
                    isRevealed
                      ? 'bg-festive-gold/15 border-festive-amber text-festive-cream shadow-md scale-100'
                      : 'bg-obsidian-900/60 border-slate-800 text-slate-400 hover:border-festive-gold/40 hover:bg-obsidian-800'
                  }`}
                >
                  <span className="text-2xl mb-1.5">{elem.icon}</span>
                  <span className="font-serif font-bold text-xs sm:text-sm">
                    {elem.title}
                  </span>
                  {isRevealed && (
                    <span className="text-[11px] text-festive-amber mt-1 font-sans">
                      {elem.desc}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Final conclusion */}
          {activeStep >= 4 && (
            <div className="mt-6 p-4 rounded-2xl bg-festive-crimson/10 border border-festive-crimson/30 max-w-md mx-auto animate-fadeIn">
              <p className="font-handwritten text-2xl text-festive-rose font-bold flex items-center justify-center gap-2">
                <Heart className="w-5 h-5 fill-festive-rose" />
                <span>Simple things. Best memories forever.</span>
              </p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
