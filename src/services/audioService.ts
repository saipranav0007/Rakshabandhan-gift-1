export type MusicMood = 'sacred' | 'emotional' | 'playful';

class AudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private isMuted = false;
  private masterGain: GainNode | null = null;
  private ambientInterval: number | null = null;
  private customAudio: HTMLAudioElement | null = null;
  private customAudioUrl: string = '';
  private currentMood: MusicMood = 'sacred';

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMood(mood: MusicMood) {
    this.currentMood = mood;
    if (this.isPlaying && !this.customAudioUrl) {
      this.playGenerativeAmbient();
    }
  }

  public getMood(): MusicMood {
    return this.currentMood;
  }

  public setCustomAudioUrl(url: string) {
    this.customAudioUrl = url;
    if (this.customAudio) {
      this.customAudio.pause();
      this.customAudio.src = url;
      if (this.isPlaying && !this.isMuted) {
        this.customAudio.play().catch(e => console.warn('Custom audio playback issue:', e));
      }
    }
  }

  public getCustomAudioUrl(): string {
    return this.customAudioUrl;
  }

  public async startMusic() {
    this.initContext();
    if (this.isPlaying) return;
    this.isPlaying = true;

    if (this.customAudioUrl) {
      if (!this.customAudio) {
        this.customAudio = new Audio(this.customAudioUrl);
        this.customAudio.loop = true;
      }
      this.customAudio.volume = this.isMuted ? 0 : 0.4;
      try {
        await this.customAudio.play();
        return;
      } catch (e) {
        console.warn('Custom audio play failed, falling back to generative synth:', e);
      }
    }

    this.playGenerativeAmbient();
  }

  public stopMusic() {
    this.isPlaying = false;
    if (this.ambientInterval) {
      window.clearInterval(this.ambientInterval);
      this.ambientInterval = null;
    }
    if (this.customAudio) {
      this.customAudio.pause();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.35, this.ctx.currentTime, 0.1);
    }
    if (this.customAudio) {
      this.customAudio.volume = this.isMuted ? 0 : 0.4;
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  private playGenerativeAmbient() {
    if (this.ambientInterval) window.clearInterval(this.ambientInterval);
    if (!this.ctx || !this.masterGain) return;

    // Mood scales
    // Sacred: Raag Bhairavi / Indian Pentatonic (Tanpura drone + Sitar / Bansuri resonance)
    const sacredScale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];
    // Emotional: Nostalgic major 7th / Lydian float (C, E, G, B, D, F#)
    const emotionalScale = [261.63, 329.63, 392.00, 493.88, 523.25, 587.33, 659.25, 739.99];
    // Playful: Upbeat acoustic pentatonic (G, A, B, D, E)
    const playfulScale = [196.00, 220.00, 246.94, 293.66, 329.63, 392.00, 440.00, 493.88, 587.33];

    const playHarmonicNote = (freq: number, duration: number, isBass = false) => {
      if (!this.ctx || !this.masterGain || !this.isPlaying || this.isMuted) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      if (this.currentMood === 'sacred') {
        osc.type = isBass ? 'triangle' : 'sine';
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(isBass ? 320 : 1200, this.ctx.currentTime);
      } else if (this.currentMood === 'emotional') {
        osc.type = isBass ? 'sine' : 'triangle';
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(isBass ? 280 : 1600, this.ctx.currentTime);
      } else {
        // playful
        osc.type = isBass ? 'triangle' : 'sawtooth';
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(isBass ? 400 : 900, this.ctx.currentTime);
      }

      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0, now);
      const targetGain = isBass ? 0.22 : 0.08;
      gain.gain.linearRampToValueAtTime(targetGain, now + 0.9);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + duration + 0.1);
    };

    // Drone
    playHarmonicNote(130.81, 8, true); // C3 warm drone

    let step = 0;
    const intervalTime = this.currentMood === 'playful' ? 1200 : 1800;

    this.ambientInterval = window.setInterval(() => {
      if (!this.isPlaying || this.isMuted) return;
      step++;

      // Periodic drone
      if (step % 4 === 0) {
        playHarmonicNote(130.81, 7, true);
        if (step % 8 === 0) {
          playHarmonicNote(196.00, 6, true); // G3
        }
      }

      const activeScale = 
        this.currentMood === 'sacred' ? sacredScale :
        this.currentMood === 'emotional' ? emotionalScale : playfulScale;

      const randomNote = activeScale[Math.floor(Math.random() * activeScale.length)];
      playHarmonicNote(randomNote, this.currentMood === 'playful' ? 2.2 : 3.6);

      if (Math.random() > 0.4) {
        const harmonyNote = activeScale[Math.floor(Math.random() * activeScale.length)];
        setTimeout(() => {
          playHarmonicNote(harmonyNote, 3.0);
        }, 500);
      }
    }, intervalTime);
  }

  // ==================== SOUND EFFECTS ====================

  public playChimeSound() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const freqs = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    freqs.forEach((freq, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const startTime = this.ctx.currentTime + idx * 0.08;
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.12, startTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 2.5);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(startTime);
      osc.stop(startTime + 2.6);
    });
  }

  public playDiyaLightSound() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    // Warm flame whoosh + rising chime
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.6);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(600, now);
    filter.Q.setValueAtTime(4, now);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.95);

    // Chime resonance
    setTimeout(() => this.playChimeSound(), 200);
  }

  public playTilakSound() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    // Sacred temple bell ring
    const now = this.ctx.currentTime;
    const freqs = [784, 1175, 1568];
    freqs.forEach((f, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.1 / (idx + 1), now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 1.9);
    });
  }

  public playSweetSound() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    // Sparkly sweet bite sound
    const now = this.ctx.currentTime;
    const notes = [659.25, 783.99, 987.77, 1318.51];
    notes.forEach((note, idx) => {
      if (!this.ctx || !this.masterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note, now + idx * 0.06);

      gain.gain.setValueAtTime(0, now + idx * 0.06);
      gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.06 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.4);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 0.45);
    });
  }

  public playRakhiTieFanfare() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    // Festive fanfare chord progression
    const chords = [
      [523.25, 659.25, 783.99], // C Major
      [587.33, 739.99, 880.00], // D Major
      [659.25, 830.61, 987.77], // E Major
      [1046.50, 1318.51, 1567.98] // High C Celebratory
    ];

    chords.forEach((chord, stepIdx) => {
      setTimeout(() => {
        chord.forEach(freq => {
          if (!this.ctx || !this.masterGain) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = stepIdx === 3 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

          const now = this.ctx.currentTime;
          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(0.1, now + 0.04);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + (stepIdx === 3 ? 2.5 : 0.6));

          osc.connect(gain);
          gain.connect(this.masterGain);

          osc.start(now);
          osc.stop(now + (stepIdx === 3 ? 2.6 : 0.7));
        });
      }, stepIdx * 220);
    });
  }

  public playBuzzerSound() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    // Playful buzzer / roast sound
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.linearRampToValueAtTime(110, now + 0.25);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.32);
  }

  public playStampSound() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    // Voucher redeem stamp thud + sparkle
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.12);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.16);

    setTimeout(() => this.playSweetSound(), 100);
  }

  public playPaperSound() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const bufferSize = this.ctx.sampleRate * 0.25;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1800, this.ctx.currentTime);
    filter.Q.setValueAtTime(3, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    noise.start(now);
    noise.stop(now + 0.26);
  }

  public playPopSound() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const now = this.ctx.currentTime;
    osc.frequency.setValueAtTime(340, now);
    osc.frequency.exponentialRampToValueAtTime(680, now + 0.08);

    gain.gain.setValueAtTime(0.09, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.1);
  }

  public playCardFlipSound() {
    this.playPopSound();
  }
}

export const soundEngine = new AudioEngine();
