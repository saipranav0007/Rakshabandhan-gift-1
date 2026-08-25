import React from 'react';
import { Milestone } from 'lucide-react';

export const GrowingUpTimeline: React.FC = () => {
  const milestones = [
    { label: 'CHILDHOOD', desc: 'Where two siblings started the journey', icon: '🌱' },
    { label: 'UNCLE CHIPS', desc: 'Eating together & doing nothing important', icon: '🍿' },
    { label: 'STORIES', desc: 'Sharing everything on our minds', icon: '💬' },
    { label: 'FIGHTS', desc: 'The inevitable sibling chaos & arguments', icon: '🥊' },
    { label: 'LAUGHTER', desc: 'Stupid nicknames and inside jokes', icon: '😂' },
    { label: 'GROWING UP', desc: 'Growing older but staying close', icon: '✨' },
    { label: 'TODAY', desc: 'Forever big sister & younger brother', icon: '❤️' },
  ];

  return (
    <section className="py-24 px-4 max-w-3xl mx-auto relative z-10" id="growing-up-timeline">
      
      {/* Header */}
      <div className="text-center space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-festive-gold/10 border border-festive-gold/25 text-festive-amber text-xs font-mono uppercase tracking-widest">
          <Milestone className="w-3.5 h-3.5" />
          <span>Chapter 04 • Growing Up</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold gold-text-gradient glow-gold">
          Somewhere between childhood and now...
        </h2>
        <p className="text-slate-400 text-sm max-w-md mx-auto font-sans">
          How our bond grew naturally from little kids to today
        </p>
      </div>

      {/* Timeline Tree */}
      <div className="relative border-l-2 border-festive-gold/30 ml-4 sm:ml-32 space-y-8 pb-4">
        {milestones.map((item, idx) => (
          <div key={item.label} className="relative pl-8 group">
            
            {/* Timeline Node Icon */}
            <div className="absolute -left-4 top-1 w-8 h-8 rounded-full bg-obsidian-900 border-2 border-festive-gold flex items-center justify-center text-sm shadow-md group-hover:scale-110 group-hover:border-festive-amber transition-all">
              <span>{item.icon}</span>
            </div>

            {/* Content Card */}
            <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-slate-800/80 group-hover:border-festive-gold/40 transition-all duration-300 transform group-hover:translate-x-1">
              <span className="text-[11px] font-mono font-bold text-festive-amber uppercase tracking-wider block mb-1">
                Step 0{idx + 1}
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-festive-cream">
                {item.label}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-sans">
                {item.desc}
              </p>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
};
