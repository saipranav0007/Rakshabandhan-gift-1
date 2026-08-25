import React, { useState } from 'react';
import { ArrowDown, Heart, Shield, UserCheck } from 'lucide-react';
import { soundEngine } from '../../services/audioService';

export const SupportInteraction: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const supportPairs = [
    {
      trigger: 'WHEN I NEED YOU',
      response: "YOU'RE THERE",
      icon: Shield,
      color: 'border-festive-gold/30 hover:border-festive-gold',
      accent: 'text-festive-amber',
    },
    {
      trigger: 'WHEN WE FIGHT',
      response: 'YOU STILL CARE',
      icon: Heart,
      color: 'border-festive-rose/30 hover:border-festive-rose',
      accent: 'text-festive-rose',
    },
    {
      trigger: 'WHEN I NEED SOMEONE WHO UNDERSTANDS',
      response: 'AKKOI',
      icon: UserCheck,
      color: 'border-amber-400/40 hover:border-amber-300',
      accent: 'text-amber-300',
    },
  ];

  return (
    <section className="py-16 px-4 max-w-4xl mx-auto relative z-10">
      <div className="text-center mb-8">
        <p className="text-xs font-mono text-slate-400 uppercase tracking-widest">
          Interactive Connection
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {supportPairs.map((pair, idx) => {
          const Icon = pair.icon;
          const isSelected = activeCard === idx;

          return (
            <div
              key={pair.trigger}
              onClick={() => {
                soundEngine.playPopSound();
                setActiveCard(isSelected ? null : idx);
              }}
              className={`glass-panel p-6 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col items-center justify-between text-center space-y-4 ${pair.color} ${
                isSelected ? 'scale-105 shadow-2xl bg-obsidian-900/90' : 'hover:-translate-y-1'
              }`}
            >
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-festive-cream">
                <Icon className="w-6 h-6" />
              </div>

              {/* Trigger */}
              <div className="space-y-1">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  Situation
                </span>
                <p className="font-serif font-bold text-sm sm:text-base text-slate-200">
                  {pair.trigger}
                </p>
              </div>

              {/* Arrow */}
              <ArrowDown className="w-4 h-4 text-festive-amber/60 animate-bounce" />

              {/* Response */}
              <div className="w-full pt-3 border-t border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                  Akkoi's Response
                </span>
                <p className={`font-serif font-black text-lg sm:text-xl tracking-wide ${pair.accent}`}>
                  {pair.response}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
