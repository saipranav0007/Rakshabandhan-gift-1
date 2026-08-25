import React, { useState } from 'react';
import { ArrowDown, Heart, Shield, UserCheck, PhoneCall, Sparkles, CheckCircle2 } from 'lucide-react';
import { soundEngine } from '../../services/audioService';

export const SupportInteraction: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [isCalled, setIsCalled] = useState<boolean>(false);

  const supportPairs = [
    {
      trigger: 'WHEN YOU NEED A RIDE OR BACKUP',
      response: 'BROTHER ON SPEED DIAL 🚗',
      icon: Shield,
      color: 'border-festive-gold/30 hover:border-festive-gold',
      accent: 'text-festive-amber',
    },
    {
      trigger: 'WHEN WE FIGHT OVER SILLY THINGS',
      response: 'PEACE RESTORED IN 10 MIN 🤝',
      icon: Heart,
      color: 'border-festive-rose/30 hover:border-festive-rose',
      accent: 'text-festive-rose',
    },
    {
      trigger: 'WHEN YOU HAVE LIFE DRAMA / SECRETS',
      response: 'TELL YOUR BROTHER FIRST 📱',
      icon: UserCheck,
      color: 'border-amber-400/40 hover:border-amber-300',
      accent: 'text-amber-300',
    },
  ];

  const handleSimulateCall = () => {
    soundEngine.playChimeSound();
    setIsCalled(true);
    setTimeout(() => setIsCalled(false), 4000);
  };

  return (
    <section className="py-20 px-4 max-w-4xl mx-auto relative z-10" id="why-special">
      
      {/* Chapter Tag */}
      <div className="text-center space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-festive-gold/10 border border-festive-gold/30 text-festive-amber text-xs font-mono uppercase tracking-widest">
          <Heart className="w-3.5 h-3.5 fill-festive-amber" />
          <span>Chapter 11 • Your 24/7 Designated Safe Space</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold gold-text-gradient glow-gold">
          Your 24/7 Designated Emergency Contact
        </h2>
        <p className="text-slate-300 text-sm sm:text-base font-sans max-w-lg mx-auto">
          Whatever it is — school, friends, problems, or random excitement — you can always come to me first.
        </p>
      </div>

      {/* 3 Interactive Situation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
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
                <p className="font-serif font-bold text-xs sm:text-sm text-slate-200">
                  {pair.trigger}
                </p>
              </div>

              {/* Arrow */}
              <ArrowDown className="w-4 h-4 text-festive-amber/60 animate-bounce" />

              {/* Response */}
              <div className="w-full pt-3 border-t border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                  Brother's Response
                </span>
                <p className={`font-serif font-black text-sm sm:text-base tracking-wide ${pair.accent}`}>
                  {pair.response}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 24/7 Hotline Interactive Banner */}
      <div className="glass-panel-gold rounded-3xl p-6 sm:p-8 border border-festive-gold/30 shadow-2xl max-w-xl mx-auto text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 rounded-full bg-festive-gold/15 text-festive-amber animate-pulse">
            <PhoneCall className="w-6 h-6" />
          </div>
          <div className="text-left">
            <h4 className="font-serif font-bold text-base text-festive-cream">
              Brother's Lifelong Hotline
            </h4>
            <p className="text-xs text-slate-400">
              Zero judgment • Zero conditions • 100% Availability
            </p>
          </div>
        </div>

        <button
          onClick={handleSimulateCall}
          className="px-6 py-2.5 rounded-full bg-gradient-to-r from-festive-gold to-festive-amber text-slate-950 font-serif font-bold text-xs sm:text-sm shadow-md hover:scale-105 transition-all flex items-center justify-center gap-2 mx-auto"
        >
          <Sparkles className="w-4 h-4 text-slate-950" />
          <span>{isCalled ? 'Connected! Annaya is listening... ❤️' : 'Test Hotline Connection 📞'}</span>
        </button>

        {isCalled && (
          <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center justify-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Connection 100% Active. Always here for you, Akkoi!</span>
          </div>
        )}
      </div>

    </section>
  );
};
