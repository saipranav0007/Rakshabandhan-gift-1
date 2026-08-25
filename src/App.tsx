import { useState, useEffect } from 'react';
import type { PhotoMemory } from './types/memory';
import { DEFAULT_PHOTOS } from './data/defaultContent';
import { loadAllPhotos } from './services/photoStorage';
import { ParticleBackground } from './components/ui/ParticleBackground';
import { FloatingPetals } from './components/ui/FloatingPetals';
import { AudioPlayer } from './components/ui/AudioPlayer';
import { ChapterNav } from './components/ui/ChapterNav';

import { OpeningScreen } from './components/story/01_OpeningScreen';
import { IntroSection } from './components/story/02_IntroSection';
import { DailyBroadcastChat } from './components/story/01_DailyBroadcastChat';
import { ChildhoodSection } from './components/story/03_ChildhoodSection';
import { UncleChipsMemory } from './components/story/04_UncleChipsMemory';
import { PhotoScrapbook } from './components/story/05_PhotoScrapbook';
import { DustbinIncident } from './components/story/07_DustbinIncident';
import { SiblingChaosMachine } from './components/story/08_SiblingChaosMachine';
import { OfficialTitlesArchive } from './components/story/08_OfficialTitlesArchive';
import { RandomDreamsMasterplan } from './components/story/08_RandomDreamsMasterplan';
import { PerspectiveComparison } from './components/story/09_PerspectiveComparison';
import { SiblingCoupons } from './components/story/10_SiblingCoupons';
import { WhyYouAreSpecial } from './components/story/09_WhyYouAreSpecial';
import { SupportInteraction } from './components/story/10_SupportInteraction';
import { GrowingUpTimeline } from './components/story/11_GrowingUpTimeline';
import { RakshaBandhanTransition } from './components/story/12_RakshaBandhanTransition';
import { RakhiCeremony } from './components/story/13_RakhiCeremony';
import { GiftReveal } from './components/story/14_GiftReveal';
import { PromiseLetter } from './components/story/15_PromiseLetter';
import { FinalHighlight } from './components/story/16_FinalHighlight';

export function App() {
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const [photos, setPhotos] = useState<PhotoMemory[]>(DEFAULT_PHOTOS);
  const [isGiftOpened, setIsGiftOpened] = useState<boolean>(false);

  // Load photos persistently from IndexedDB on initial mount
  useEffect(() => {
    loadAllPhotos().then((stored) => {
      if (stored && stored.length > 0) {
        setPhotos(stored);
      }
    });
  }, []);

  const handlePhotoUpdated = (updated: PhotoMemory) => {
    setPhotos((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
  };

  const handleStartStory = () => {
    const el = document.getElementById('daily-broadcast');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRestart = () => {
    setHasEntered(false);
    setIsGiftOpened(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const finalPhoto = photos.find((p) => p.slotNumber === 7) || photos[photos.length - 1] || DEFAULT_PHOTOS[6];

  return (
    <main className="min-h-screen bg-obsidian-950 text-slate-100 relative overflow-x-hidden">
      {/* Dynamic Ambient Background Elements */}
      <ParticleBackground density={45} />
      <FloatingPetals />

      {/* Floating Audio Controller & Chapter Nav */}
      {hasEntered && (
        <>
          <AudioPlayer />
          <ChapterNav activeSection="intro-section" />
        </>
      )}

      {/* 01. Cinematic Opening Screen */}
      {!hasEntered ? (
        <OpeningScreen onEnter={() => setHasEntered(true)} />
      ) : (
        <div className="relative z-10 animate-fadeIn space-y-4">
          {/* 00. Introduction */}
          <IntroSection onStartStory={handleStartStory} />

          {/* 01. The Daily Broadcast & Sibling Connection */}
          <DailyBroadcastChat />

          {/* 02. Chapter 01: Childhood Beginnings */}
          <ChildhoodSection />

          {/* 03. Uncle Chips Memory */}
          <UncleChipsMemory />

          {/* 04. Photo Memories Scrapbook (Slots 1 to 6) */}
          <PhotoScrapbook
            photos={photos}
            onPhotoUpdated={handlePhotoUpdated}
          />

          {/* 05. Sibling Embarrassing Flashbacks (Dustbin & Ghost Game) */}
          <DustbinIncident />

          {/* 06. Sibling Fight Simulator & 10-Minute Rule */}
          <SiblingChaosMachine />

          {/* 07. Akkoi's Official Titles & Badges */}
          <OfficialTitlesArchive />

          {/* 08. Random Dreams & 3 AM Business Masterplans */}
          <RandomDreamsMasterplan />

          {/* 09. What Everyone Sees vs What Brother Knows */}
          <PerspectiveComparison />

          {/* 10. Sibling Lifetime Vouchers & Redeemable Coupons */}
          <SiblingCoupons />

          {/* 11. Why You Are Special & 24/7 Designated Safe Space */}
          <WhyYouAreSpecial />
          <SupportInteraction />

          {/* Growing Up Timeline */}
          <GrowingUpTimeline />

          {/* 12. Raksha Bandhan Celebration Transition */}
          <RakshaBandhanTransition />

          {/* 12. Interactive 4-Step Rakhi Ceremony */}
          <RakhiCeremony onCeremonyComplete={() => {}} />

          {/* 13. The Gift Envelope Reveal */}
          <GiftReveal
            onOpenGift={() => setIsGiftOpened(true)}
            isOpened={isGiftOpened}
          />

          {/* 13. Brother's Handwritten Promise Letter */}
          <PromiseLetter isVisible={isGiftOpened} />

          {/* 14. Final Highlight, Photo 7 & Sibling Certificate of Honor */}
          <FinalHighlight
            finalPhoto={finalPhoto}
            onPhotoUpdated={handlePhotoUpdated}
            onRestart={handleRestart}
          />
        </div>
      )}
    </main>
  );
}

export default App;
