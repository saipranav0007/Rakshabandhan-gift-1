import React, { useState } from 'react';
import { Heart, Camera, RotateCcw, Share2, Check, Award } from 'lucide-react';
import type { PhotoMemory } from '../../types/memory';
import { PhotoCustomizerModal } from './06_PhotoCustomizerModal';
import { Lightbox } from '../ui/Lightbox';
import { soundEngine } from '../../services/audioService';

interface FinalHighlightProps {
  finalPhoto: PhotoMemory;
  onPhotoUpdated: (updated: PhotoMemory) => void;
  onRestart: () => void;
}

export const FinalHighlight: React.FC<FinalHighlightProps> = ({
  finalPhoto,
  onPhotoUpdated,
  onRestart,
}) => {
  const [showCustomizer, setShowCustomizer] = useState<boolean>(false);
  const [showLightbox, setShowLightbox] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    soundEngine.playChimeSound();
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="py-24 px-4 max-w-4xl mx-auto text-center relative z-10" id="final-highlight">
      
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-festive-amber/5 rounded-full blur-3xl pointer-events-none" />

      <div className="space-y-14 relative">
        
        {/* Large Elegant Climax Text */}
        <div className="space-y-6 max-w-2xl mx-auto">
          <p className="font-serif text-xl sm:text-2xl text-festive-amber uppercase tracking-widest font-semibold">
            NO MATTER WHAT HAPPENS...
          </p>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold gold-text-gradient glow-gold leading-tight">
            I'LL ALWAYS BE THERE FOR YOU, AKKOI. ❤️
          </h2>

          <p className="font-sans text-base sm:text-lg text-slate-300">
            "That's the one gift and promise that will never expire."
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-festive-crimson/15 border border-festive-crimson/30 text-festive-rose text-xs font-mono tracking-widest uppercase">
            <Heart className="w-3.5 h-3.5 fill-festive-rose" />
            <span>Happy Raksha Bandhan 2026</span>
          </div>
        </div>

        {/* Final Climax Photo (Slot 7) */}
        <div className="pt-4 flex flex-col items-center">
          <div className="relative p-5 pb-6 bg-amber-50/95 text-slate-900 rounded-2xl shadow-2xl max-w-sm w-full border-2 border-amber-300 transform rotate-1 hover:rotate-0 transition-transform duration-300">
            
            {/* Top Tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-amber-200/90 -rotate-1 border border-amber-300 shadow-sm opacity-90 z-10" />

            {/* Photo Container */}
            <div 
              onClick={() => {
                soundEngine.playPopSound();
                setShowLightbox(true);
              }}
              className="relative w-full aspect-[4/4.8] bg-slate-950 rounded-xl overflow-hidden shadow-inner border border-amber-300/50 cursor-pointer group"
            >
              <img
                src={finalPhoto.imageUrl}
                alt="One last memory"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-mono">
                Tap to view full screen
              </div>
            </div>

            {/* Polaroid Captions */}
            <div className="mt-4 text-center space-y-1">
              <p className="font-serif text-base font-bold text-slate-900">
                {finalPhoto.title || 'Raksha Bandhan Celebration'}
              </p>
              <p className="font-handwritten text-2xl text-festive-ruby font-bold">
                "{finalPhoto.description || 'Until the next fight... I will always be there for you! 😂❤️'}"
              </p>
            </div>

            {/* Customize button */}
            <div className="mt-4 pt-3 border-t border-amber-200/80 flex items-center justify-between">
              <span className="text-[11px] text-amber-900/80 font-sans">
                {finalPhoto.customUploaded ? 'Custom Photo' : 'Final Photo Slot 07'}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  soundEngine.playPopSound();
                  setShowCustomizer(true);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-200 hover:bg-amber-300 text-amber-950 text-xs font-medium transition-colors border border-amber-300"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Customize Final Photo</span>
              </button>
            </div>

          </div>
        </div>

        {/* Digital Sibling Certificate of Honor */}
        <div className="pt-6 max-w-2xl mx-auto">
          <div className="parchment p-6 sm:p-10 rounded-3xl border-2 border-festive-gold/40 shadow-2xl relative overflow-hidden text-left space-y-6">
            
            <div className="flex items-center justify-between border-b border-festive-gold/30 pb-4">
              <div className="flex items-center gap-2.5">
                <Award className="w-6 h-6 text-festive-amber" />
                <span className="font-mono text-xs uppercase tracking-widest text-festive-amber font-bold">
                  Official Sibling Certificate of Honor
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                REG: #AKKOI-2026-FOREVER
              </span>
            </div>

            <div className="space-y-2 text-center py-2">
              <p className="text-xs uppercase tracking-widest text-slate-300 font-mono">
                This certifies that
              </p>
              <h3 className="font-serif text-2xl sm:text-4xl font-black gold-text-gradient glow-gold tracking-wide">
                SRIVALLI (AKKOI) ❤️
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 font-sans leading-relaxed max-w-md mx-auto">
                is officially declared the Best Big Sister in the Universe, endowed with lifetime listening rights, unlimited teasing privileges, and unconditional brotherly protection.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-festive-gold/20 pt-4 text-xs font-mono">
              <div>
                <span className="text-slate-400 block mb-0.5">Conferred By:</span>
                <span className="text-festive-cream font-bold">Her Younger Brother</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block mb-0.5">Validity:</span>
                <span className="text-emerald-400 font-bold">Eternal & Infinite</span>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handleCopyLink}
            className="px-6 py-3 rounded-full bg-obsidian-900 border border-festive-gold/40 hover:border-festive-amber text-xs sm:text-sm font-serif font-bold text-festive-cream hover:text-white transition-all flex items-center gap-2 shadow-lg hover:scale-105"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Link Copied! Share with Akkoi 💌</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-festive-amber" />
                <span>Share Gift With Akkoi</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              soundEngine.playPopSound();
              onRestart();
            }}
            className="px-6 py-3 rounded-full bg-obsidian-900 border border-slate-700 hover:border-festive-gold text-xs sm:text-sm font-serif font-bold text-slate-300 hover:text-white transition-all flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4 text-festive-gold" />
            <span>Re-experience From Beginning</span>
          </button>
        </div>

        {/* Closing Signature */}
        <div className="pt-6 text-center text-xs text-slate-500 font-mono">
          Handcrafted with love, laughter & nostalgia by your younger brother • Happy Raksha Bandhan ❤️
        </div>

      </div>

      {/* Customizer for Final Photo */}
      <PhotoCustomizerModal
        photo={finalPhoto}
        isOpen={showCustomizer}
        onClose={() => setShowCustomizer(false)}
        onPhotoUpdated={onPhotoUpdated}
      />

      {/* Lightbox for Final Photo */}
      <Lightbox
        photo={showLightbox ? finalPhoto : null}
        onClose={() => setShowLightbox(false)}
      />

    </section>
  );
};
