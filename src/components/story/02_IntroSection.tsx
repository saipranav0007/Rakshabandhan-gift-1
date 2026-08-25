import React from 'react';
import { Sparkles, Compass, Heart } from 'lucide-react';
import { soundEngine } from '../../services/audioService';

interface IntroSectionProps {
  onStartStory: () => void;
}

export const IntroSection: React.FC<IntroSectionProps> = ({ onStartStory }) => {
  const handleStart = () => {
    soundEngine.playPopSound();
    onStartStory();
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16 text-center relative z-10">
      <div className="max-w-2xl w-full mx-auto space-y-8">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-festive-crimson/10 border border-festive-crimson/30 text-festive-rose text-xs font-semibold uppercase tracking-widest shadow-inner">
          <Heart className="w-3.5 h-3.5 fill-festive-rose" />
          <span>A Brother's Rakhi Tribute</span>
        </div>

        {/* Names */}
        <div className="space-y-3">
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-wider text-slate-100 uppercase">
            SRIVALLI
          </h1>
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-festive-gold" />
            <span className="font-handwritten text-4xl sm:text-6xl text-festive-amber glow-gold font-bold">
              Akkoi
            </span>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-festive-gold" />
          </div>
        </div>

        {/* Relationship Definition */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-4 border border-festive-gold/20 shadow-2xl">
          <p className="font-serif text-xl sm:text-2xl text-festive-cream font-medium">
            "My big sister."
          </p>

          <p className="font-sans text-base sm:text-lg text-slate-300 leading-relaxed max-w-lg mx-auto">
            The person I've been annoying, fighting with, laughing with, and growing up with.
          </p>

          <div className="pt-2 flex items-center justify-center gap-6 text-xs text-slate-400 font-mono">
            <span className="px-3 py-1 rounded-full bg-obsidian-900/80 border border-slate-800">
              Akkoi • 21
            </span>
            <span className="text-festive-gold">✦</span>
            <span className="px-3 py-1 rounded-full bg-obsidian-900/80 border border-slate-800">
              Brother • 18
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-4 pt-2">
          <p className="font-serif text-base sm:text-lg text-slate-300 italic">
            Let's go back for a moment.
          </p>

          <button
            onClick={handleStart}
            className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-serif font-bold text-slate-950 bg-gradient-to-r from-festive-gold via-festive-amber to-festive-gold hover:scale-105 transition-all duration-300 shadow-xl shadow-festive-amber/25 tracking-wider text-sm sm:text-base"
            id="start-story-btn"
          >
            <Compass className="w-4 h-4 text-slate-950 transition-transform group-hover:rotate-45" />
            <span>START OUR STORY</span>
            <Sparkles className="w-4 h-4 text-slate-950" />
          </button>
        </div>

      </div>
    </section>
  );
};
