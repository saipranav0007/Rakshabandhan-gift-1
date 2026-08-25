import React, { useState } from 'react';
import { Heart, Camera, RotateCcw, Share2, Check } from 'lucide-react';
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
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 px-4 max-w-4xl mx-auto text-center relative z-10" id="final-highlight">
      
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-festive-amber/5 rounded-full blur-3xl pointer-events-none" />

      <div className="space-y-12 relative">
        
        {/* Large Elegant Climax Text */}
        <div className="space-y-6 max-w-2xl mx-auto">
          <p className="font-serif text-xl sm:text-2xl text-festive-amber uppercase tracking-widest font-semibold">
            NO MATTER WHAT HAPPENS...
          </p>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold gold-text-gradient glow-gold leading-tight">
            I'LL ALWAYS BE THERE FOR YOU, AKKOI. ❤️
          </h2>

          <p className="font-sans text-base sm:text-lg text-slate-300">
            "That's the one gift I can promise."
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-festive-crimson/15 border border-festive-crimson/30 text-festive-rose text-xs font-mono tracking-widest uppercase">
            <Heart className="w-3.5 h-3.5 fill-festive-rose" />
            <span>Happy Raksha Bandhan</span>
          </div>
        </div>

        {/* Final Photo Frame (Slot 7) */}
        <div className="pt-6 flex flex-col items-center">
          <div className="relative p-5 pb-6 bg-amber-50/95 text-slate-900 rounded-2xl shadow-2xl max-w-sm w-full border border-amber-200 transform rotate-1 hover:rotate-0 transition-transform duration-300">
            
            {/* Top Tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-amber-200/90 -rotate-1 border border-amber-300 shadow-sm opacity-90 z-10" />

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
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-mono">
                Tap to view full screen
              </div>
            </div>

            {/* Polaroid Captions */}
            <div className="mt-4 text-center space-y-1">
              <p className="font-serif text-base font-bold text-slate-900">
                {finalPhoto.title || 'One last memory.'}
              </p>
              <p className="font-handwritten text-2xl text-festive-ruby font-bold">
                "{finalPhoto.description || 'Until the next fight. 😂❤️'}"
              </p>
            </div>

            {/* Customize button */}
            <div className="mt-4 pt-3 border-t border-amber-200/80 flex items-center justify-between">
              <span className="text-[11px] text-amber-900/80 font-sans">
                {finalPhoto.customUploaded ? 'Real Photo' : 'Final Photo Slot'}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  soundEngine.playPopSound();
                  setShowCustomizer(true);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-200 hover:bg-amber-300 text-amber-950 text-xs font-medium transition-colors"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Customize Final Photo</span>
              </button>
            </div>

          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handleCopyLink}
            className="px-5 py-2.5 rounded-full bg-obsidian-900 border border-slate-700 hover:border-festive-amber text-xs font-semibold text-slate-200 transition-all flex items-center gap-2"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Link Copied to Share with Akkoi!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-festive-amber" />
                <span>Share With Akkoi</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              soundEngine.playPopSound();
              onRestart();
            }}
            className="px-5 py-2.5 rounded-full bg-obsidian-900 border border-slate-700 hover:border-festive-gold text-xs font-semibold text-slate-200 transition-all flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4 text-festive-gold" />
            <span>Experience From Beginning</span>
          </button>
        </div>

        {/* Closing Signature */}
        <div className="pt-8 text-center text-xs text-slate-500 font-mono">
          Made with love & nostalgia by your younger brother • 2026
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
