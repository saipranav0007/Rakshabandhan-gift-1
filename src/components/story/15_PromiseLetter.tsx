import React from 'react';
import { Heart, Sparkles, Feather } from 'lucide-react';

interface PromiseLetterProps {
  isVisible: boolean;
}

export const PromiseLetter: React.FC<PromiseLetterProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <section className="py-16 px-4 max-w-3xl mx-auto relative z-10 animate-fadeIn" id="promise-letter">
      
      {/* Parchment Letter Container */}
      <div className="parchment p-6 sm:p-12 md:p-14 rounded-3xl text-slate-100 shadow-[0_25px_60px_rgba(0,0,0,0.9)] relative overflow-hidden border-2 border-festive-gold/40">
        
        {/* Golden Corner Flourishes */}
        <div className="absolute top-4 left-4 text-festive-gold/50 text-xl font-serif select-none">✦</div>
        <div className="absolute top-4 right-4 text-festive-gold/50 text-xl font-serif select-none">✦</div>
        <div className="absolute bottom-4 left-4 text-festive-gold/50 text-xl font-serif select-none">✦</div>
        <div className="absolute bottom-4 right-4 text-festive-gold/50 text-xl font-serif select-none">✦</div>

        {/* Letter Header */}
        <div className="text-center pb-6 border-b border-festive-gold/20 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-festive-gold/15 text-festive-amber text-xs font-mono tracking-widest uppercase mb-3 border border-festive-gold/30">
            <Feather className="w-3.5 h-3.5" />
            <span>Brother's Sacred Handwritten Vow</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-festive-cream glow-gold">
            For My Akkoi ❤️
          </h2>
        </div>

        {/* Verbatim Letter Content with Handwritten & Serif Balance */}
        <div className="space-y-6 font-handwritten text-2xl sm:text-3xl text-amber-100/95 leading-relaxed tracking-wide">
          
          <p className="font-serif text-xl sm:text-2xl text-festive-amber font-semibold">
            No matter what happens,
          </p>

          <p className="text-festive-cream font-medium">
            I promise I will be there — at every time, in every situation, for you.
          </p>

          <div className="space-y-2 text-slate-200">
            <p>You can fight with me.</p>
            <p>You can get angry with me.</p>
            <p className="flex items-center gap-2 flex-wrap">
              <span>You can even call me the most annoying brother in the world.</span>
              <span className="text-2xl">😂</span>
            </p>
          </div>

          <div className="py-2">
            <p className="text-festive-amber">But whenever you need me,</p>
            <p className="font-serif text-2xl sm:text-4xl font-bold text-festive-cream glow-gold mt-1">
              I'll always be there.
            </p>
          </div>

          <p className="text-slate-300">
            That's the one promise I can give you with 100% conviction.
          </p>

          <div className="p-4 rounded-2xl bg-black/40 border border-festive-gold/20 space-y-2">
            <p className="text-amber-200/90 flex items-center gap-2 flex-wrap">
              <span>And please... don't expect costly gifts from me.</span>
              <span className="text-2xl">😭😂</span>
            </p>
            <p className="text-slate-300 text-xl sm:text-2xl">
              You know I'm still your brother.
            </p>
          </div>

          <div className="pt-4 space-y-3">
            <p className="text-slate-400 italic text-xl sm:text-2xl">
              But jokes apart...
            </p>
            <p className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold gold-text-gradient glow-gold flex items-center gap-2 flex-wrap">
              <span>I'll always be there for you, Akkoi.</span>
              <Heart className="w-7 h-7 text-festive-rose fill-festive-rose inline" />
            </p>
          </div>

          {/* Signature */}
          <div className="pt-8 text-right space-y-1">
            <p className="font-serif text-sm uppercase tracking-widest text-slate-400 font-mono">
              Signed with lifelong love,
            </p>
            <p className="font-handwritten text-3xl sm:text-5xl text-festive-amber font-bold">
              — Your Brother (Annaya)
            </p>
          </div>

        </div>

        {/* Bottom Seal Accent */}
        <div className="mt-10 pt-6 border-t border-festive-gold/20 flex items-center justify-center gap-3 text-festive-amber/80 text-xs font-mono">
          <Sparkles className="w-4 h-4" />
          <span>UNCONDITIONAL SIBLING PLEDGE • RAKSHA BANDHAN</span>
          <Sparkles className="w-4 h-4" />
        </div>

      </div>
    </section>
  );
};
