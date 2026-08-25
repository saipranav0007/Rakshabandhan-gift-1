import React, { useState } from 'react';
import { Sparkles, Edit3, Maximize2, Camera, Calendar } from 'lucide-react';
import type { PhotoMemory } from '../../types/memory';
import { PhotoCustomizerModal } from './06_PhotoCustomizerModal';
import { Lightbox } from '../ui/Lightbox';
import { soundEngine } from '../../services/audioService';

interface PhotoScrapbookProps {
  photos: PhotoMemory[];
  onPhotoUpdated: (updated: PhotoMemory) => void;
}

export const PhotoScrapbook: React.FC<PhotoScrapbookProps> = ({ photos, onPhotoUpdated }) => {
  const [selectedForCustomization, setSelectedForCustomization] = useState<PhotoMemory | null>(null);
  const [selectedForLightbox, setSelectedForLightbox] = useState<PhotoMemory | null>(null);

  // We show slots 1 to 6 here; slot 7 is reserved for the Final Photo climax
  const scrapbookPhotos = photos.filter((p) => p.slotNumber <= 6);

  const handleOpenCustomizer = (photo: PhotoMemory, e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playPopSound();
    setSelectedForCustomization(photo);
  };

  const handleOpenLightbox = (photo: PhotoMemory) => {
    soundEngine.playPopSound();
    setSelectedForLightbox(photo);
  };

  return (
    <section className="py-20 px-4 max-w-6xl mx-auto relative z-10" id="memories-gallery">
      
      {/* Section Header */}
      <div className="text-center space-y-4 mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-festive-gold/10 border border-festive-gold/30 text-festive-amber text-xs font-mono uppercase tracking-widest">
          <Camera className="w-3.5 h-3.5" />
          <span>Our Memory Scrapbook</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl font-bold gold-text-gradient glow-gold">
          Chapters of You & Me
        </h2>
        <p className="font-sans text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
          Every photo is a snapshot of our journey together. Tap any memory to view full screen or customize with our real photos.
        </p>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {scrapbookPhotos.map((photo, idx) => {
          const tiltClass = idx % 2 === 0 ? 'hover:-rotate-1' : 'hover:rotate-1';

          return (
            <div
              key={photo.id}
              onClick={() => handleOpenLightbox(photo)}
              className={`group relative bg-amber-50/95 text-slate-900 rounded-2xl p-4 sm:p-5 shadow-2xl border border-amber-200/80 transition-all duration-300 transform hover:-translate-y-1.5 ${tiltClass} cursor-pointer flex flex-col justify-between`}
            >
              {/* Vintage Tape Header */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-amber-200/90 -rotate-2 border border-amber-300 shadow-sm opacity-90 z-10" />

              {/* Photo Media Slot */}
              <div className="relative w-full aspect-[4/4.8] bg-slate-950 rounded-xl overflow-hidden shadow-inner border border-amber-300/40">
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <span className="p-2.5 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>

                {/* Slot Badge */}
                <div className="absolute top-2.5 left-2.5 z-10">
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-sm text-[11px] font-mono font-bold text-amber-300 border border-amber-400/30">
                    PHOTO 0{photo.slotNumber}
                  </span>
                </div>
              </div>

              {/* Captions & Notes */}
              <div className="mt-4 space-y-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-bold text-slate-900 tracking-tight line-clamp-1">
                    {photo.title}
                  </h3>
                  {photo.dateLabel && (
                    <span className="text-[11px] font-sans text-amber-900/80 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-amber-700" />
                      {photo.dateLabel}
                    </span>
                  )}
                </div>

                <p className="font-handwritten text-base text-slate-700 leading-snug line-clamp-2">
                  "{photo.description}"
                </p>
              </div>

              {/* Card Footer: Customize Photo CTA */}
              <div className="mt-4 pt-3 border-t border-amber-200/80 flex items-center justify-between text-xs">
                <span className="text-[11px] font-sans text-amber-800/80 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  {photo.customUploaded ? 'Real Photo' : 'Default Scrapbook'}
                </span>

                <button
                  type="button"
                  onClick={(e) => handleOpenCustomizer(photo, e)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-200/80 hover:bg-amber-300 text-amber-950 font-medium transition-colors border border-amber-300"
                  aria-label={`Customize photo ${photo.slotNumber}`}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Customize</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Customizer Modal */}
      <PhotoCustomizerModal
        photo={selectedForCustomization}
        isOpen={Boolean(selectedForCustomization)}
        onClose={() => setSelectedForCustomization(null)}
        onPhotoUpdated={onPhotoUpdated}
      />

      {/* Lightbox Preview */}
      <Lightbox
        photo={selectedForLightbox}
        onClose={() => setSelectedForLightbox(null)}
      />

    </section>
  );
};
