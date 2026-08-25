import React, { useState } from 'react';
import { Swords, RefreshCw, Flame, HeartHandshake, CheckCircle } from 'lucide-react';
import { soundEngine } from '../../services/audioService';

export const SiblingChaosMachine: React.FC = () => {
  const [activeStage, setActiveStage] = useState<number>(0);
  const [timerSeconds, setTimerSeconds] = useState<number>(600);
  const [isFastForwarding, setIsFastForwarding] = useState<boolean>(false);

  const fightPhases = [
    {
      step: 1,
      title: 'SOMETHING TINY HAPPENS',
      subtitle: 'The remote, misplaced charger, or sarcastic comment',
      emoji: '⚡',
      dialogue: 'Akkoi: "Why did you touch my things?!" 😤',
      reaction: 'Brother: "I did not even touch anything!" 🙄',
      badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    },
    {
      step: 2,
      title: 'THE OLYMPIC ARGUMENT',
      subtitle: 'High stakes drama activated immediately',
      emoji: '🔥',
      dialogue: 'Akkoi starts the fight with maximum conviction.',
      reaction: 'Brother deploys full counter-offensive. Self-control: 0%. 😂',
      badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
    },
    {
      step: 3,
      title: 'STRICT RADIO SILENCE',
      subtitle: 'The most intense silence known to mankind',
      emoji: '🤐',
      dialogue: '*Strict radio silence maintained across the entire room*',
      reaction: 'Folded arms. Serious facial expressions. Zero eye contact.',
      badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
    },
    {
      step: 4,
      title: 'THE 10-MINUTE RULE',
      subtitle: 'Our undefeated record of making up within 600s',
      emoji: '⏳',
      dialogue: 'Maximum anger duration: exactly 10 minutes.',
      reaction: 'Nobody even remembers how the fight started in the first place! 💀',
      badgeColor: 'text-sky-400 bg-sky-500/10 border-sky-500/30',
    },
    {
      step: 5,
      title: 'PEACE 100% RESTORED',
      subtitle: 'Instant bond restoration over food & gossip',
      emoji: '🤝',
      dialogue: '"Want some Uncle Chips / Tea?" — "Yes." 😂❤️',
      reaction: 'Flawless sibling synchronization achieved. Ready to repeat tomorrow!',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    },
  ];

  const handleNextStage = () => {
    soundEngine.playPopSound();
    setActiveStage((prev) => (prev + 1) % fightPhases.length);
  };

  const handleFastForward = () => {
    soundEngine.playChimeSound();
    setIsFastForwarding(true);
    let sec = timerSeconds;
    const interval = window.setInterval(() => {
      sec -= 80;
      if (sec <= 0) {
        window.clearInterval(interval);
        setTimerSeconds(0);
        setIsFastForwarding(false);
        setActiveStage(4); // Jump to peace restored
        soundEngine.playSweetSound();
      } else {
        setTimerSeconds(sec);
      }
    }, 80);
  };

  const handleReset = () => {
    soundEngine.playPopSound();
    setActiveStage(0);
    setTimerSeconds(600);
    setIsFastForwarding(false);
  };

  const current = fightPhases[activeStage];

  return (
    <section className="py-24 px-4 max-w-4xl mx-auto text-center relative z-10" id="sibling-chaos-fight">
      
      {/* Chapter Badge */}
      <div className="space-y-4 mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-festive-rose/10 border border-festive-rose/30 text-festive-rose text-xs font-mono uppercase tracking-widest">
          <Swords className="w-3.5 h-3.5" />
          <span>Chapter 06 • Sibling Fight Simulator</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold gold-text-gradient glow-gold">
          The Anatomy of an Akkoi & Brother Fight
        </h2>
        <p className="text-slate-300 text-sm sm:text-base font-sans max-w-md mx-auto">
          We fight, we get angry, we stop talking... and then 10 minutes later we are laughing again.
        </p>
      </div>

      {/* Main Interactive Stage Box */}
      <div className="glass-panel-gold rounded-3xl p-6 sm:p-10 border border-festive-gold/30 shadow-2xl relative overflow-hidden max-w-2xl mx-auto mb-10">
        
        {/* Phase Indicator Pills */}
        <div className="flex items-center justify-between gap-1 sm:gap-2 mb-8 border-b border-slate-800 pb-4 overflow-x-auto">
          {fightPhases.map((phase, idx) => (
            <button
              key={phase.step}
              onClick={() => {
                soundEngine.playPopSound();
                setActiveStage(idx);
              }}
              className={`flex-1 min-w-[50px] py-1.5 px-2 rounded-xl text-xs font-mono transition-all duration-300 ${
                activeStage === idx
                  ? 'bg-festive-amber text-slate-950 font-bold scale-105 shadow-md'
                  : idx < activeStage
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-obsidian-900/80 text-slate-500 border border-slate-800'
              }`}
            >
              <span>Phase 0{phase.step}</span>
            </button>
          ))}
        </div>

        {/* Active Phase Card */}
        <div className="space-y-6 animate-fadeIn key={activeStage}">
          
          <div className="text-5xl sm:text-6xl animate-bounce">
            {current.emoji}
          </div>

          <div className="space-y-2">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border ${current.badgeColor}`}>
              Phase {current.step}: {current.title}
            </span>
            <p className="text-xs sm:text-sm text-slate-400 font-sans">
              {current.subtitle}
            </p>
          </div>

          {/* Sibling Dialogue Boxes */}
          <div className="space-y-3 max-w-md mx-auto text-left">
            <div className="p-3.5 rounded-2xl bg-obsidian-900/90 border border-rose-500/30 text-rose-200 text-xs sm:text-sm font-sans flex items-start gap-2.5">
              <span className="text-lg">👑</span>
              <p className="font-medium">{current.dialogue}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-obsidian-900/90 border border-festive-gold/30 text-festive-cream text-xs sm:text-sm font-sans flex items-start gap-2.5">
              <span className="text-lg">👦</span>
              <p className="font-medium">{current.reaction}</p>
            </div>
          </div>

          {/* Special 10-Minute Timer in Phase 3 & 4 */}
          {(activeStage === 2 || activeStage === 3) && (
            <div className="p-4 rounded-2xl bg-obsidian-950/80 border border-slate-800 max-w-sm mx-auto space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>ANGER COOLDOWN TIMER:</span>
                <span className="text-festive-amber font-bold text-base">
                  {Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, '0')}
                </span>
              </div>

              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500 transition-all duration-100"
                  style={{ width: `${((600 - timerSeconds) / 600) * 100}%` }}
                />
              </div>

              <button
                onClick={handleFastForward}
                disabled={isFastForwarding || timerSeconds <= 0}
                className="w-full py-2 rounded-xl text-xs font-serif font-bold bg-gradient-to-r from-festive-gold to-festive-amber text-slate-950 hover:brightness-110 shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Flame className="w-3.5 h-3.5 text-slate-950" />
                <span>{isFastForwarding ? 'Fast-Forwarding 10 Minutes...' : 'Fast-Forward Sibling Cooldown ⏩'}</span>
              </button>
            </div>
          )}

          {/* Phase 5 Complete State */}
          {activeStage === 4 && (
            <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 max-w-sm mx-auto space-y-1 animate-fadeIn">
              <div className="flex items-center justify-center gap-2 font-serif font-bold text-sm">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Sibling Bond Status: 100% Intact</span>
              </div>
              <p className="text-[11px] text-slate-300 font-sans">
                Undefeated lifetime sibling record: 0 permanent grudges.
              </p>
            </div>
          )}

        </div>

        {/* Controls */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handleNextStage}
            className="px-6 py-2.5 rounded-full font-serif font-bold text-slate-950 bg-gradient-to-r from-festive-gold via-festive-amber to-festive-gold hover:brightness-110 shadow-lg shadow-festive-amber/20 text-xs sm:text-sm tracking-wider transition-all"
          >
            {activeStage === 4 ? 'Cycle Sibling Loop 🔄' : 'Next Fight Stage 🥊'}
          </button>

          <button
            onClick={handleReset}
            className="px-4 py-2.5 rounded-full bg-obsidian-900 border border-slate-700 hover:border-festive-gold text-xs font-semibold text-slate-300 transition-all flex items-center gap-1.5"
          >
            <RefreshCw className="w-3 h-3 text-festive-amber" />
            <span>Reset Simulator</span>
          </button>
        </div>

      </div>

      {/* Quote */}
      <div className="text-center">
        <p className="font-handwritten text-2xl sm:text-3xl text-festive-amber font-bold flex items-center justify-center gap-2">
          <HeartHandshake className="w-5 h-5 text-festive-amber" />
          <span>"Even when we fight... I'll always be your brother."</span>
        </p>
      </div>

    </section>
  );
};
