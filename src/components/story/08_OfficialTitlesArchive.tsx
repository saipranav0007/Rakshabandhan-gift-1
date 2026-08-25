import React, { useState } from 'react';
import { Sparkles, Trophy } from 'lucide-react';
import { soundEngine } from '../../services/audioService';

interface BadgeCard {
  id: string;
  rank: string;
  title: string;
  teluguQuote?: string;
  roast: string;
  reality: string;
  icon: string;
  color: string;
  borderGlow: string;
}

export const OfficialTitlesArchive: React.FC = () => {
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});

  const badges: BadgeCard[] = [
    {
      id: 'title-1',
      rank: 'RANK 1: GOLD BADGE',
      title: 'The Nonstop 24/7 Broadcaster',
      roast: 'Can talk continuously for 3 hours about one singular incident with 47 side characters.',
      reality: 'And I wouldn\'t trade listening to your stories for anything in the world. ❤️',
      icon: '🎙️',
      color: 'from-amber-500/20 to-yellow-600/10',
      borderGlow: 'border-amber-500/40 hover:border-amber-400',
    },
    {
      id: 'title-2',
      rank: 'RANK 2: SUPREME CHAOS',
      title: '100% Efficiency Sibling Annoyer',
      roast: 'Expert in provoking arguments in 3.5 seconds and blaming me in front of everyone.',
      reality: 'The undisputed master of sibling psychological warfare! 😂',
      icon: '🌪️',
      color: 'from-rose-500/20 to-red-600/10',
      borderGlow: 'border-rose-500/40 hover:border-rose-400',
    },
    {
      id: 'title-3',
      rank: 'RANK 3: ICONIC TELUGU ROAST',
      title: 'The "Pandhi" Archive 🐷',
      teluguQuote: 'Prathi kukka ki oka roju vastundhi... niku tappa... enduku antey nuvvu pandhvi eyy! 😂',
      roast: 'No matter what happens, you are still my favorite target for this legendary punchline.',
      reality: 'You know it\'s true, don\'t even try to deny it! 💀',
      icon: '🐶',
      color: 'from-purple-500/20 to-pink-600/10',
      borderGlow: 'border-purple-500/40 hover:border-purple-400',
    },
    {
      id: 'title-4',
      rank: 'RANK 4: CULINARY DRAMA',
      title: 'Questionable Cooking Critic',
      roast: 'Feed her food, let her talk, ignore the high drama. Repeat daily.',
      reality: 'The only person allowed to steal my snacks without a declaration of war.',
      icon: '🍟',
      color: 'from-orange-500/20 to-amber-600/10',
      borderGlow: 'border-orange-500/40 hover:border-orange-400',
    },
    {
      id: 'title-5',
      rank: 'RANK 5: LIFELONG HONOR',
      title: 'Heart of Gold • Best Big Sister',
      roast: 'Acts tough and bossy, but is secretly the most caring sister anyone could have.',
      reality: 'My safe space, my guide, and my sister for life. ❤️',
      icon: '👑',
      color: 'from-festive-gold/30 to-amber-900/30',
      borderGlow: 'border-festive-gold hover:border-amber-300',
    },
  ];

  const handleCardClick = (id: string) => {
    soundEngine.playCardFlipSound();
    setFlipped((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="py-24 px-4 max-w-5xl mx-auto relative z-10" id="official-titles">
      
      {/* Chapter Badge */}
      <div className="text-center space-y-4 mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-festive-gold/10 border border-festive-gold/30 text-festive-amber text-xs font-mono uppercase tracking-widest">
          <Trophy className="w-3.5 h-3.5" />
          <span>Chapter 07 • Sibling Honours & Roasts</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold gold-text-gradient glow-gold">
          Akkoi's Official Titles & Badges
        </h2>
        <p className="text-slate-300 text-sm sm:text-base font-sans max-w-lg mx-auto">
          Officially certified and conferred by your younger brother with 0% filter and 100% love! (Tap cards to flip)
        </p>
      </div>

      {/* Grid of Badges */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {badges.map((b) => {
          const isFlipped = flipped[b.id];

          return (
            <div
              key={b.id}
              onClick={() => handleCardClick(b.id)}
              className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between text-left relative overflow-hidden bg-gradient-to-b ${b.color} ${b.borderGlow} ${
                isFlipped ? 'scale-[1.02] shadow-2xl bg-obsidian-950/90' : 'hover:-translate-y-1'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{b.icon}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-obsidian-950/80 border border-white/10 text-[10px] font-mono text-festive-amber font-bold">
                    {b.rank}
                  </span>
                </div>

                <h3 className="font-serif text-lg sm:text-xl font-bold text-festive-cream mb-2">
                  {b.title}
                </h3>

                {b.teluguQuote && (
                  <div className="p-3 rounded-2xl bg-black/50 border border-festive-gold/30 mb-3">
                    <p className="font-serif italic text-xs sm:text-sm text-festive-amber font-semibold leading-relaxed">
                      "{b.teluguQuote}"
                    </p>
                  </div>
                )}

                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mb-4">
                  {b.roast}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <p className="font-handwritten text-lg sm:text-xl text-festive-amber font-bold">
                  {b.reality}
                </p>
                <span className="text-[10px] font-mono text-slate-400">
                  {isFlipped ? '✦ Verified' : 'Tap to Flip'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Sibling Bottom Roast Note */}
      <div className="mt-12 text-center">
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-panel border border-festive-gold/30 text-xs font-mono text-festive-cream">
          <Sparkles className="w-3.5 h-3.5 text-festive-amber" />
          <span>Verdict: Annoying, dramatic, but irreplaceable. ❤️</span>
        </div>
      </div>

    </section>
  );
};
