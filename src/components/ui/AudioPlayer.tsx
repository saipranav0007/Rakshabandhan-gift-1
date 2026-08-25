import React, { useState } from 'react';
import { Volume2, VolumeX, Music, Settings, Check, Sparkles } from 'lucide-react';
import { soundEngine, type MusicMood } from '../../services/audioService';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(soundEngine.getIsPlaying());
  const [isMuted, setIsMuted] = useState<boolean>(soundEngine.getIsMuted());
  const [mood, setMood] = useState<MusicMood>(soundEngine.getMood());
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [customUrl, setCustomUrl] = useState<string>(soundEngine.getCustomAudioUrl());
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const handleTogglePlayMute = async () => {
    if (!isPlaying) {
      await soundEngine.startMusic();
      setIsPlaying(true);
      setIsMuted(false);
    } else {
      const muted = soundEngine.toggleMute();
      setIsMuted(muted);
    }
  };

  const handleMoodSelect = (m: MusicMood) => {
    setMood(m);
    soundEngine.setMood(m);
    soundEngine.playPopSound();
  };

  const handleSaveAudioUrl = () => {
    soundEngine.setCustomAudioUrl(customUrl.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setShowSettings(false);
    }, 1200);
  };

  const moodsList: { id: MusicMood; label: string; icon: string; desc: string }[] = [
    { id: 'sacred', label: 'Sacred & Devotional', icon: '🪔', desc: 'Sitar, tanpura & bansuri raags' },
    { id: 'emotional', label: 'Emotional & Nostalgic', icon: '✨', desc: 'Tender chords & soothing harmonics' },
    { id: 'playful', label: 'Playful Sibling Vibe', icon: '🎸', desc: 'Upbeat acoustic pentatonic rhythm' },
  ];

  return (
    <>
      {/* Floating Audio Pill */}
      <div className="fixed top-4 right-4 z-40 flex items-center gap-1.5 p-1.5 sm:px-3 sm:py-2 rounded-full glass-panel border border-festive-gold/30 shadow-lg backdrop-blur-md">
        <button
          onClick={handleTogglePlayMute}
          className="flex items-center gap-2 text-xs sm:text-sm font-medium text-festive-cream hover:text-festive-amber transition-colors p-1 sm:px-2"
          aria-label={isMuted || !isPlaying ? 'Unmute music' : 'Mute music'}
          title={isMuted || !isPlaying ? 'Play ambient music' : 'Mute music'}
        >
          {isMuted || !isPlaying ? (
            <VolumeX className="w-4 h-4 text-slate-400" />
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-festive-amber animate-pulse" />
              {/* Mini equalizer bars */}
              <div className="hidden sm:flex items-end gap-0.5 h-3">
                <span className="w-0.5 bg-festive-amber animate-[bounce_1s_infinite_100ms] h-2" />
                <span className="w-0.5 bg-festive-gold animate-[bounce_1s_infinite_300ms] h-3" />
                <span className="w-0.5 bg-festive-rose animate-[bounce_1s_infinite_200ms] h-1.5" />
              </div>
            </>
          )}
          <span className="text-xs tracking-wide">
            {isMuted || !isPlaying ? 'Music Off' : `${mood === 'sacred' ? 'Sacred 🪔' : mood === 'emotional' ? 'Emotional ✨' : 'Playful 🎸'}`}
          </span>
        </button>

        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-1.5 rounded-full text-slate-400 hover:text-festive-amber hover:bg-white/5 transition-all"
          title="Audio settings & mood"
          aria-label="Audio settings"
        >
          <Settings className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Audio Settings Modal */}
      {showSettings && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn"
          onClick={() => setShowSettings(false)}
        >
          <div 
            className="w-full max-w-md glass-panel-gold rounded-3xl p-6 sm:p-7 border border-festive-amber/40 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="p-3 rounded-2xl bg-festive-gold/15 border border-festive-gold/30 text-festive-amber">
                <Music className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-festive-cream">
                  Soundtrack & Ambient Moods
                </h3>
                <p className="text-xs text-slate-400">
                  Select live generative mood or custom MP3 song
                </p>
              </div>
            </div>

            <div className="space-y-4 text-sm">
              {/* Mood Selector Cards */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-festive-amber mb-2">
                  Select Live Soundtrack Mood
                </label>
                <div className="space-y-2">
                  {moodsList.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleMoodSelect(item.id)}
                      className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all duration-300 ${
                        mood === item.id && !customUrl
                          ? 'bg-festive-amber/15 border-festive-amber text-festive-cream shadow-md scale-[1.02]'
                          : 'bg-obsidian-900/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{item.icon}</span>
                        <div>
                          <p className="text-xs font-serif font-bold text-festive-cream">
                            {item.label}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                      {mood === item.id && !customUrl && (
                        <span className="px-2 py-0.5 rounded-full bg-festive-amber/20 text-festive-amber text-[10px] font-mono font-bold">
                          Active
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Audio URL */}
              <div className="pt-2">
                <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                  Custom MP3 Track URL (Optional)
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/our-favorite-song.mp3"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-obsidian-900 border border-slate-700 text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-festive-amber"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Leave blank to use the handcrafted live Web Audio synthesizer.
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playChimeSound();
                  }}
                  className="flex items-center gap-1.5 text-xs text-festive-amber hover:underline"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Test Chime FX</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowSettings(false)}
                    className="px-3.5 py-1.5 rounded-xl text-xs text-slate-400 hover:text-white transition-colors"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveAudioUrl}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-festive-gold to-festive-amber text-slate-950 hover:brightness-110 transition-all shadow-md font-serif"
                  >
                    {savedSuccess ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Applied!</span>
                      </>
                    ) : (
                      <span>Save & Apply</span>
                    )}
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};
