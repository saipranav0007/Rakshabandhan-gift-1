import React, { useState, useEffect } from 'react';
import { RefreshCw, Zap } from 'lucide-react';
import { soundEngine } from '../../services/audioService';

export const SiblingChaosMachine: React.FC = () => {
  const siblingSteps = [
    { title: 'FIGHT', subtitle: 'Over the smallest things', emoji: '🥊', color: 'from-rose-500/20 to-red-500/10 border-rose-500/40' },
    { title: 'TEASE', subtitle: 'Calling each other weird names', emoji: '😜', color: 'from-amber-500/20 to-yellow-500/10 border-amber-500/40' },
    { title: 'ANNOY', subtitle: 'Master level trolling', emoji: '😈', color: 'from-orange-500/20 to-amber-500/10 border-orange-500/40' },
    { title: 'LAUGH', subtitle: 'Remembering stupid jokes', emoji: '🤣', color: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/40' },
    { title: 'FORGET', subtitle: 'Acting like nothing happened', emoji: '🤝', color: 'from-sky-500/20 to-blue-500/10 border-sky-500/40' },
    { title: 'REPEAT', subtitle: 'Starting all over again', emoji: '🔄', color: 'from-purple-500/20 to-pink-500/10 border-purple-500/40' },
  ];

  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [isLooping, setIsLooping] = useState<boolean>(false);

  useEffect(() => {
    let interval: number;
    if (isLooping) {
      interval = window.setInterval(() => {
        setActiveIdx((prev) => (prev + 1) % siblingSteps.length);
        soundEngine.playPopSound();
      }, 700);
    }
    return () => clearInterval(interval);
  }, [isLooping, siblingSteps.length]);

  const handleNext = () => {
    soundEngine.playPopSound();
    setActiveIdx((prev) => (prev + 1) % siblingSteps.length);
  };

  const handleToggleLoop = () => {
    soundEngine.playPopSound();
    setIsLooping(!isLooping);
  };

  return (
    <section className="py-20 px-4 max-w-4xl mx-auto text-center relative z-10">
      
      {/* Header */}
      <div className="space-y-3 mb-10">
        <h2 className="font-serif text-2xl sm:text-4xl font-bold text-slate-100">
          Things only siblings can do
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 font-sans">
          The official infinite sibling operating loop
        </p>
      </div>

      {/* Sibling Cycle Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-8">
        {siblingSteps.map((step, idx) => {
          const isActive = activeIdx === idx;
          return (
            <div
              key={step.title}
              onClick={() => {
                setActiveIdx(idx);
                soundEngine.playPopSound();
              }}
              className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col items-center justify-between text-center relative ${
                isActive
                  ? `bg-gradient-to-b ${step.color} scale-105 shadow-xl ring-2 ring-festive-amber`
                  : 'bg-obsidian-900/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:scale-100'
              }`}
            >
              <div className="text-3xl mb-2">{step.emoji}</div>
              <div>
                <h4 className="font-serif font-black text-sm tracking-wider text-festive-cream">
                  {step.title}
                </h4>
                <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">
                  {step.subtitle}
                </p>
              </div>

              {isActive && (
                <span className="absolute -top-2 -right-1 w-3 h-3 rounded-full bg-festive-amber animate-ping" />
              )}
            </div>
          );
        })}
      </div>

      {/* Loop Controls */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={handleNext}
          className="px-5 py-2.5 rounded-full bg-obsidian-800 border border-slate-700 hover:border-festive-amber text-xs font-semibold text-slate-200 transition-all flex items-center gap-2"
        >
          <Zap className="w-3.5 h-3.5 text-festive-amber" />
          <span>Next Sibling Step</span>
        </button>

        <button
          onClick={handleToggleLoop}
          className={`px-5 py-2.5 rounded-full border text-xs font-semibold transition-all flex items-center gap-2 ${
            isLooping
              ? 'bg-festive-amber text-slate-950 border-festive-amber shadow-lg shadow-festive-amber/30'
              : 'bg-obsidian-800 border-slate-700 hover:border-festive-amber text-slate-200'
          }`}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLooping ? 'animate-spin' : ''}`} />
          <span>{isLooping ? 'Pause Loop' : 'Run Sibling Loop'}</span>
        </button>
      </div>

      {/* Tagline */}
      <div className="mt-8">
        <p className="font-handwritten text-3xl sm:text-4xl text-festive-amber font-bold">
          "That's basically us. 😂"
        </p>
      </div>

    </section>
  );
};
