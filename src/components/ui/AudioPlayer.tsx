import React, { useState } from 'react';
import { Volume2, VolumeX, Music, Settings, Check } from 'lucide-react';
import { soundEngine } from '../../services/audioService';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(soundEngine.getIsPlaying());
  const [isMuted, setIsMuted] = useState<boolean>(soundEngine.getIsMuted());
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

  const handleSaveAudioUrl = () => {
    soundEngine.setCustomAudioUrl(customUrl.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setShowSettings(false);
    }, 1200);
  };

  return (
    <>
      {/* Floating Audio Pill */}
      <div className="fixed top-4 right-4 z-40 flex items-center gap-1.5 p-1.5 sm:px-3 sm:py-2 rounded-full glass-panel border border-festive-gold/30 shadow-lg backdrop-blur-md">
        <button
          onClick={handleTogglePlayMute}
          className="flex items-center gap-2 text-xs sm:text-sm font-medium text-festive-cream hover:text-festive-amber transition-colors p-1 sm:px-2"
          aria-label={isMuted || !isPlaying ? 'Unmute music' : 'Mute music'}
          title={isMuted || !isPlaying ? 'Play nostalgic ambient music' : 'Mute music'}
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
            {isMuted || !isPlaying ? 'Music Off' : 'Soundtrack'}
          </span>
        </button>

        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-1.5 rounded-full text-slate-400 hover:text-festive-amber hover:bg-white/5 transition-all"
          title="Audio settings"
          aria-label="Audio settings"
        >
          <Settings className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Audio Settings Modal */}
      {showSettings && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setShowSettings(false)}
        >
          <div 
            className="w-full max-w-md glass-panel-gold rounded-2xl p-6 border border-festive-amber/40 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-xl bg-festive-gold/10 border border-festive-gold/30 text-festive-amber">
                <Music className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-festive-cream">
                  Background Music Settings
                </h3>
                <p className="text-xs text-slate-400">
                  Built-in ambient soundscape or custom audio track
                </p>
              </div>
            </div>

            <div className="space-y-4 text-sm">
              <div className="p-3 rounded-xl bg-obsidian-900/80 border border-slate-800">
                <div className="text-xs font-semibold text-festive-amber uppercase tracking-wider mb-1">
                  Current Mode
                </div>
                <p className="text-xs text-slate-300">
                  {customUrl ? 'Custom Audio URL' : 'Generative Indian Ambient Harmonies (Raag & Chimes)'}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Custom Audio File URL (Optional MP3)
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/our-song.mp3"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-obsidian-900 border border-slate-700 text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-festive-amber"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Leave blank to use the soothing generative sitar & harp chords.
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSettings(false)}
                  className="px-3.5 py-1.5 rounded-lg text-xs text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveAudioUrl}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-festive-gold to-festive-amber text-slate-950 hover:brightness-110 transition-all shadow-md"
                >
                  {savedSuccess ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Applied!
                    </>
                  ) : (
                    'Apply Soundtrack'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
