import React, { useState } from 'react';
import { Eye } from 'lucide-react';

export const PerspectiveComparison: React.FC = () => {
  const [sliderPos, setSliderPos] = useState<number>(50); // 0 to 100

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPos(Number(e.target.value));
  };

  const points = [
    {
      world: 'The confident, independent big sister who handles everything on her own.',
      brother: 'The sister who calls me first whenever anything dramatic happens in her day.',
    },
    {
      world: 'Strict, bossy, and always ready to argue her point with 100% authority.',
      brother: 'Makes up in 10 minutes, shares snacks, and secretly cares more than anyone.',
    },
    {
      world: 'Keeps her thoughts guarded and only lets people see what she wants them to see.',
      brother: 'Zero secrets withheld — trusts her younger brother with complete openness.',
    },
  ];

  return (
    <section className="py-24 px-4 max-w-4xl mx-auto relative z-10" id="perspective-comparison">
      
      {/* Chapter Badge */}
      <div className="text-center space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-festive-gold/10 border border-festive-gold/30 text-festive-amber text-xs font-mono uppercase tracking-widest">
          <Eye className="w-3.5 h-3.5" />
          <span>Chapter 09 • Sibling Truth</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold gold-text-gradient glow-gold">
          What Everyone Sees vs What I Know
        </h2>
        <p className="text-slate-300 text-sm sm:text-base font-sans max-w-lg mx-auto">
          The rest of the world sees one version of you. But as your brother, I know the real Akkoi.
        </p>
      </div>

      {/* Interactive Dual Perspective Slider */}
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-festive-gold/25 shadow-2xl space-y-8 max-w-3xl mx-auto">
        
        {/* Slider Controls */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs sm:text-sm font-serif font-bold">
            <span className={`transition-colors ${sliderPos < 50 ? 'text-festive-amber' : 'text-slate-500'}`}>
              🌍 What Everyone Sees
            </span>
            <span className={`transition-colors ${sliderPos >= 50 ? 'text-festive-rose' : 'text-slate-500'}`}>
              ❤️ What Your Brother Knows
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={sliderPos}
            onChange={handleSliderChange}
            className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-festive-amber"
          />

          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>Slide left for exterior</span>
            <span>Slide right for sibling bond</span>
          </div>
        </div>

        {/* 3 Interactive Comparison Pairs */}
        <div className="space-y-4">
          {points.map((p, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-2xl bg-obsidian-950/80 border border-slate-800 space-y-3 transition-all"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                {/* World View */}
                <div
                  className={`p-3.5 rounded-xl transition-all duration-300 ${
                    sliderPos <= 60
                      ? 'bg-slate-900/90 text-slate-200 border border-slate-700'
                      : 'opacity-40 text-slate-500'
                  }`}
                >
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                    To The Outside World:
                  </span>
                  <p className="text-xs sm:text-sm font-sans leading-relaxed">
                    {p.world}
                  </p>
                </div>

                {/* Brother View */}
                <div
                  className={`p-3.5 rounded-xl transition-all duration-300 ${
                    sliderPos >= 40
                      ? 'bg-festive-rose/10 text-rose-100 border border-festive-rose/40 shadow-md'
                      : 'opacity-40 text-slate-500'
                  }`}
                >
                  <span className="text-[10px] font-mono text-festive-rose uppercase tracking-wider block mb-1">
                    To Your Brother:
                  </span>
                  <p className="text-xs sm:text-sm font-sans leading-relaxed font-medium">
                    {p.brother}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Conclusion */}
        <div className="pt-4 border-t border-slate-800 text-center space-y-2">
          <p className="text-xs font-mono text-festive-amber uppercase tracking-widest">
            Sibling Truth:
          </p>
          <blockquote className="font-serif text-lg sm:text-xl font-bold text-festive-cream glow-gold">
            "You will always have someone who understands you without explanations."
          </blockquote>
        </div>

      </div>

    </section>
  );
};
