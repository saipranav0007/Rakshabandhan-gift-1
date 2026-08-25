import React from 'react';
import { Clock } from 'lucide-react';
import photo1 from '../../assets/photos/photo1_childhood.png';

export const ChildhoodSection: React.FC = () => {
  return (
    <section className="py-20 px-4 max-w-3xl mx-auto text-center relative z-10" id="childhood-chapter">
      
      {/* Chapter Tag */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-festive-gold/10 border border-festive-gold/25 text-festive-amber text-xs font-mono tracking-widest uppercase mb-6">
        <Clock className="w-3.5 h-3.5" />
        <span>Chapter 01 • Childhood</span>
      </div>

      {/* Heading */}
      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold gold-text-gradient glow-gold mb-12">
        Where it all feels different
      </h2>

      {/* Narrative Card */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-festive-gold/20 shadow-2xl space-y-6 relative overflow-hidden">
        
        {/* Subtle decorative background watermark */}
        <div className="absolute -right-8 -bottom-8 font-serif text-8xl font-black text-white/[0.02] select-none pointer-events-none">
          01
        </div>

        <div className="space-y-4 font-sans text-base sm:text-xl text-slate-300">
          <p className="opacity-75 italic text-slate-400">
            Before all the fights...
          </p>
          <p className="opacity-85 italic text-slate-300">
            Before all the arguments...
          </p>
          <p className="opacity-95 italic text-slate-200">
            Before all the annoying each other...
          </p>
        </div>

        {/* Childhood Memory Photo */}
        <div className="mx-auto max-w-xs sm:max-w-sm rounded-2xl overflow-hidden border border-amber-300/40 shadow-2xl p-2 bg-amber-50/10 backdrop-blur-sm transform -rotate-1 hover:rotate-0 transition-transform duration-500">
          <img
            src={photo1}
            alt="Childhood Days"
            className="w-full aspect-[4/3.5] object-cover rounded-xl"
          />
        </div>

        <div className="pt-4 border-t border-slate-800">
          <p className="font-serif text-xl sm:text-2xl font-medium text-festive-cream leading-relaxed">
            "There were just two siblings spending time together."
          </p>
        </div>

      </div>
    </section>
  );
};
