import React, { useEffect } from 'react';
import { X, Calendar, Sparkles } from 'lucide-react';
import type { PhotoMemory } from '../../types/memory';

interface LightboxProps {
  photo: PhotoMemory | null;
  onClose: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ photo, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!photo) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center bg-obsidian-900/90 border border-festive-amber/30 rounded-2xl p-4 sm:p-6 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 rounded-full bg-obsidian-800/80 border border-slate-700 text-slate-300 hover:text-white hover:bg-festive-crimson/30 transition-all"
          aria-label="Close photo preview"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Container */}
        <div className="w-full flex-1 min-h-[300px] max-h-[60vh] flex items-center justify-center overflow-hidden rounded-xl bg-black/60 border border-slate-800 relative group">
          <img
            src={photo.imageUrl}
            alt={photo.title}
            className="max-h-[60vh] w-auto max-w-full object-contain rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>

        {/* Metadata Details */}
        <div className="w-full mt-4 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800/80 pt-4">
          <div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <span className="text-xs uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-festive-gold/10 border border-festive-gold/30 text-festive-amber font-mono font-medium">
                Photo #{photo.slotNumber}
              </span>
              {photo.dateLabel && (
                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <Calendar className="w-3 h-3 text-festive-amber/80" />
                  {photo.dateLabel}
                </span>
              )}
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-festive-cream mt-1">
              {photo.title}
            </h3>
            <p className="text-sm text-slate-300 mt-1 max-w-xl font-sans">
              {photo.description}
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-festive-amber/80 bg-festive-amber/5 px-3 py-1.5 rounded-full border border-festive-amber/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Akkoi & Brother Memory</span>
          </div>
        </div>
      </div>
    </div>
  );
};
