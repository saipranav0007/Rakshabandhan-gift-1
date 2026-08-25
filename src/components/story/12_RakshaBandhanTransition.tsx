import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

export const RakshaBandhanTransition: React.FC = () => {
  return (
    <section className="py-24 px-4 max-w-4xl mx-auto text-center relative z-10" id="raksha-bandhan-wishes">
      
      {/* Festive Radial Glow */}
      <div className="absolute inset-0 bg-festive-crimson/5 rounded-full blur-3xl pointer-events-none" />

      <div className="space-y-8 relative">
        
        {/* Subtle lines */}
        <div className="space-y-3 font-sans text-base sm:text-xl text-slate-300">
          <p className="italic text-slate-400">We've grown up.</p>
          <p className="italic text-slate-300">We've changed.</p>
          <p className="italic text-slate-200">We still fight.</p>
        </div>

        {/* Pivot */}
        <div className="py-4">
          <span className="text-xs font-mono text-festive-amber uppercase tracking-widest block mb-2">
            The unchanging truth
          </span>
          <p className="font-serif text-2xl sm:text-3xl text-festive-cream font-medium">
            "But one thing hasn't changed."
          </p>
          <p className="font-handwritten text-3xl sm:text-4xl text-festive-amber font-bold mt-2">
            I'll always be your brother.
          </p>
        </div>

        {/* Main Banner */}
        <div className="glass-panel-gold p-8 sm:p-12 rounded-3xl border-2 border-festive-amber/40 shadow-2xl max-w-2xl mx-auto relative overflow-hidden">
          
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-festive-crimson/20 border border-festive-crimson/40 text-festive-rose text-xs font-mono uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sacred Festive Festival</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold text-festive-cream glow-gold leading-tight">
            HAPPY RAKSHA BANDHAN, AKKOI
          </h2>

          <div className="flex items-center justify-center gap-2 mt-4 text-festive-rose">
            <Heart className="w-8 h-8 fill-festive-rose animate-pulse" />
          </div>

        </div>

      </div>
    </section>
  );
};
