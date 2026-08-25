import React, { useState } from 'react';
import { Rocket, CheckCircle2 } from 'lucide-react';
import { soundEngine } from '../../services/audioService';

export const RandomDreamsMasterplan: React.FC = () => {
  const [activePlanIdx, setActivePlanIdx] = useState<number>(0);

  const masterplans = [
    {
      title: 'THE HYPOTHETICAL MANSION 🏰',
      tag: '5-Year Masterplan',
      desc: 'Already debating the exact paint color and wall decor for a $10M luxury villa we do not own.',
      brotherTake: 'Brother: "I get the top-floor penthouse suite with the PlayStation setup."',
      akkoiTake: 'Akkoi: "Excuse me, I am the big sister so I get the entire master wing with 3 walk-in closets!" 😂',
      status: 'Debate active for 45 minutes straight',
      icon: '🏛️',
    },
    {
      title: 'THE $1B RANDOM STARTUP 💡',
      tag: 'Zero Budget • 100% Ambition',
      desc: 'Formulating a complete multinational corporate conglomerate over late-night snacks.',
      brotherTake: 'Brother: "I will handle tech and operations."',
      akkoiTake: 'Akkoi: "I will be the CEO, chief aesthetic director, and give all press interviews!" 💅',
      status: 'Business plan drawn on paper napkin',
      icon: '🚀',
    },
    {
      title: 'ANNOYING EVERYONE TOGETHER 😈',
      tag: 'Unstoppable Sibling Teamwork',
      desc: 'Sharing secret eye-contact across family dinners that nobody else in the room understands.',
      brotherTake: 'Teaming up to cause maximum friendly chaos with younger siblings & cousins.',
      akkoiTake: 'Flawless non-verbal telepathic synchronization achieved every single time.',
      status: '100% Sibling Win Rate',
      icon: '🤝',
    },
  ];

  const handleSelect = (idx: number) => {
    soundEngine.playPopSound();
    setActivePlanIdx(idx);
  };

  const current = masterplans[activePlanIdx];

  return (
    <section className="py-24 px-4 max-w-4xl mx-auto relative z-10" id="random-dreams">
      
      {/* Chapter Badge */}
      <div className="text-center space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-festive-gold/10 border border-festive-gold/30 text-festive-amber text-xs font-mono uppercase tracking-widest">
          <Rocket className="w-3.5 h-3.5" />
          <span>Chapter 08 • 3 AM Masterplans</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold gold-text-gradient glow-gold">
          Our Random Dreams & Late-Night Masterplans
        </h2>
        <p className="text-slate-300 text-sm sm:text-base font-sans max-w-lg mx-auto">
          Whenever we start talking about the future, we have a full 10-year masterplan ready within 3 minutes! 😂
        </p>
      </div>

      {/* Interactive Dream Board Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {masterplans.map((p, idx) => (
          <button
            key={p.title}
            onClick={() => handleSelect(idx)}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-serif font-bold transition-all duration-300 flex items-center gap-2 ${
              activePlanIdx === idx
                ? 'bg-gradient-to-r from-festive-gold to-festive-amber text-slate-950 shadow-lg scale-105'
                : 'bg-obsidian-900/80 text-slate-400 border border-slate-800 hover:border-festive-gold/40 hover:text-slate-200'
            }`}
          >
            <span>{p.icon}</span>
            <span>Plan 0{idx + 1}</span>
          </button>
        ))}
      </div>

      {/* Main Masterplan Card */}
      <div className="glass-panel-gold rounded-3xl p-6 sm:p-10 border border-festive-gold/30 shadow-2xl relative overflow-hidden max-w-2xl mx-auto space-y-6 animate-fadeIn key={activePlanIdx}">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-festive-amber block mb-1">
              {current.tag}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-festive-cream">
              {current.title}
            </h3>
          </div>
          <span className="text-4xl">{current.icon}</span>
        </div>

        {/* Description */}
        <p className="text-sm sm:text-base text-slate-200 font-sans leading-relaxed">
          {current.desc}
        </p>

        {/* Sibling Perspectives */}
        <div className="space-y-3 pt-2">
          <div className="p-3.5 rounded-2xl bg-obsidian-900/90 border border-slate-800 text-xs sm:text-sm font-sans flex items-start gap-2.5">
            <span className="text-festive-amber">✦</span>
            <p className="text-slate-200 font-medium">{current.brotherTake}</p>
          </div>

          <div className="p-3.5 rounded-2xl bg-obsidian-900/90 border border-festive-rose/30 text-xs sm:text-sm font-sans flex items-start gap-2.5">
            <span className="text-festive-rose">✦</span>
            <p className="text-rose-100 font-medium">{current.akkoiTake}</p>
          </div>
        </div>

        {/* Status */}
        <div className="p-3 rounded-2xl bg-black/40 border border-festive-gold/20 flex items-center justify-between text-xs">
          <span className="text-slate-400 font-mono">STATUS:</span>
          <span className="text-festive-amber font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            {current.status}
          </span>
        </div>

      </div>

      {/* Bottom Quote */}
      <div className="mt-10 text-center">
        <p className="font-handwritten text-2xl sm:text-3xl text-festive-amber font-bold">
          "Zero budget, zero limits, but 100% conviction with you." ❤️
        </p>
      </div>

    </section>
  );
};
