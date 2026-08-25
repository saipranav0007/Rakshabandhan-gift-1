import React, { useState, useEffect } from 'react';
import { Compass, Sparkles, X } from 'lucide-react';
import { soundEngine } from '../../services/audioService';

interface ChapterNavProps {
  activeSection: string;
}

export const ChapterNav: React.FC<ChapterNavProps> = () => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentChapter, setCurrentChapter] = useState<string>('Introduction');

  const chapters = [
    { id: 'intro-section', title: 'Intro', fullTitle: '00. For Srivalli (Akkoi)', emoji: '👑' },
    { id: 'daily-broadcast', title: 'Daily Broadcast', fullTitle: '01. The Daily Presentation Drama', emoji: '🎙️' },
    { id: 'childhood-chapter', title: 'Childhood', fullTitle: '02. Where It All Began', emoji: '🌱' },
    { id: 'uncle-chips-section', title: 'Uncle Chips', fullTitle: '03. The Uncle Chips Chronicles', emoji: '🥔' },
    { id: 'memories-gallery', title: 'Scrapbook', fullTitle: '04. Memory Scrapbook & Real Photos', emoji: '📸' },
    { id: 'dustbin-memory', title: 'Dustbin Roast', fullTitle: '05. The Tuition Incident & Flashback', emoji: '😂' },
    { id: 'sibling-chaos-fight', title: 'Fight Simulator', fullTitle: '06. Sibling Fight Simulator & 10-Min Rule', emoji: '🥊' },
    { id: 'official-titles', title: 'Akkoi Titles', fullTitle: '07. Official Titles & Telugu Roasts', emoji: '🏆' },
    { id: 'random-dreams', title: '3 AM Masterplans', fullTitle: '08. Random Dreams & Mansion Plans', emoji: '🚀' },
    { id: 'perspective-comparison', title: 'What I Know', fullTitle: '09. What Everyone Sees vs Brother Knows', emoji: '✨' },
    { id: 'sibling-coupons', title: 'Lifetime Vouchers', fullTitle: '10. Redeemable Sibling Coupons', emoji: '🎟️' },
    { id: 'why-special', title: 'Why Special', fullTitle: '11. From The Heart & Designated Contact', emoji: '❤️' },
    { id: 'rakhi-ceremony', title: 'Rakhi Ritual', fullTitle: '12. 4-Step Interactive Sacred Rakhi Ritual', emoji: '🪔' },
    { id: 'the-gift-reveal', title: 'Promise Letter', fullTitle: '13. Brother\'s Sacred Promise Letter', emoji: '📜' },
    { id: 'final-highlight', title: 'Certificate', fullTitle: '14. Sibling Certificate of Honor', emoji: '🎖️' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(scrolled);

      // Detect active chapter based on scroll
      for (let i = chapters.length - 1; i >= 0; i--) {
        const el = document.getElementById(chapters[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4) {
            setCurrentChapter(chapters[i].title);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [chapters]);

  const scrollToChapter = (id: string) => {
    soundEngine.playPopSound();
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Scroll Progress Line */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/5 z-50 pointer-events-none">
        <div 
          className="h-full bg-gradient-to-r from-festive-amber via-festive-gold to-festive-rose transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Chapter Quick-Jump Pill (Top Left) */}
      <div className="fixed top-4 left-4 z-40">
        <button
          onClick={() => {
            soundEngine.playPopSound();
            setIsOpen(!isOpen);
          }}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full glass-panel border border-festive-gold/30 shadow-lg backdrop-blur-md text-xs font-serif font-medium text-festive-cream hover:text-festive-amber hover:border-festive-amber transition-all group"
          title="Open Chapter Index"
        >
          <Compass className="w-3.5 h-3.5 text-festive-amber group-hover:rotate-45 transition-transform" />
          <span className="hidden sm:inline font-mono text-[11px] text-festive-amber font-bold">
            CHAPTER:
          </span>
          <span className="font-semibold">{currentChapter}</span>
        </button>
      </div>

      {/* Chapter Drawer / Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="w-full max-w-lg glass-panel-gold rounded-3xl p-6 sm:p-7 border border-festive-amber/40 shadow-2xl relative max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-festive-gold/20 mb-4">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-festive-amber" />
                <h3 className="font-serif text-lg font-bold text-festive-cream">
                  Chapters of Our Story
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chapter Items List */}
            <div className="overflow-y-auto space-y-2 pr-1 custom-scrollbar flex-1">
              {chapters.map((ch, idx) => (
                <button
                  key={ch.id}
                  onClick={() => scrollToChapter(ch.id)}
                  className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all duration-200 ${
                    currentChapter === ch.title
                      ? 'bg-festive-amber/20 border-festive-amber text-festive-cream font-bold scale-[1.01]'
                      : 'bg-obsidian-900/70 border-slate-800 text-slate-300 hover:border-festive-gold/40 hover:bg-obsidian-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{ch.emoji}</span>
                    <span className="text-xs sm:text-sm font-serif">
                      {ch.fullTitle}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-festive-amber/80">
                    0{idx + 1}
                  </span>
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800 text-center text-[11px] text-slate-400 font-sans">
              Tap any chapter to jump directly to that memory or ritual.
            </div>
          </div>
        </div>
      )}
    </>
  );
};
