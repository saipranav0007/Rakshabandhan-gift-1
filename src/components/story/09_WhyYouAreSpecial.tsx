import React from 'react';
import { Heart } from 'lucide-react';

export const WhyYouAreSpecial: React.FC = () => {
  return (
    <section className="py-24 px-4 max-w-3xl mx-auto text-center relative z-10" id="why-special">
      
      {/* Chapter Tag */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-festive-gold/10 border border-festive-gold/30 text-festive-amber text-xs font-mono uppercase tracking-widest mb-6">
        <Heart className="w-3.5 h-3.5 fill-festive-amber" />
        <span>Chapter 03 • From The Heart</span>
      </div>

      {/* Gentle Atmospheric Card */}
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-festive-gold/25 shadow-2xl space-y-10 relative">
        
        {/* Header */}
        <div className="space-y-2">
          <h2 className="font-serif text-2xl sm:text-3xl text-slate-300 italic font-normal">
            Jokes apart...
          </h2>
          <div className="h-[1px] w-16 bg-festive-gold/40 mx-auto" />
        </div>

        {/* The 4 Core Truths */}
        <div className="space-y-6 text-left max-w-xl mx-auto font-sans">
          
          <div className="p-4 rounded-2xl bg-obsidian-900/60 border border-slate-800 flex items-start gap-4">
            <span className="text-festive-amber text-lg mt-0.5">✦</span>
            <p className="text-base sm:text-xl text-slate-100 font-medium">
              You always support me when I need something.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-obsidian-900/60 border border-slate-800 flex items-start gap-4">
            <span className="text-festive-amber text-lg mt-0.5">✦</span>
            <div>
              <p className="text-sm text-slate-400 italic">Even when we fight...</p>
              <p className="text-base sm:text-xl text-slate-100 font-medium mt-0.5">
                You still care about me.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-obsidian-900/60 border border-slate-800 flex items-start gap-4">
            <span className="text-festive-amber text-lg mt-0.5">✦</span>
            <p className="text-base sm:text-xl text-slate-100 font-medium">
              You understand me better than most people.
            </p>
          </div>

        </div>

        {/* Climax Statement */}
        <div className="pt-8 border-t border-slate-800/80 space-y-3">
          <p className="font-sans text-sm sm:text-base text-festive-amber uppercase tracking-widest">
            And that's why...
          </p>
          <h3 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold gold-text-gradient glow-gold">
            You are very special to me.
          </h3>
        </div>

      </div>
    </section>
  );
};
