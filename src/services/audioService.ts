class AudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private isMuted = false;
  private masterGain: GainNode | null = null;
  private ambientInterval: number | null = null;
  private customAudio: HTMLAudioElement | null = null;
  private customAudioUrl: string = '';

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
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

    // Start Generative Ambient Sitar-Harp Chords
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
      this.masterGain.gain.setTargetAtTime(this.isMuted ? 0 : 0.3, this.ctx.currentTime, 0.1);
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

    // Warm pentatonic frequencies (Bansuri/Tanpura inspired gentle notes: C4, D4, E4, G4, A4, C5, D5, E5)
    const scale = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];

    const playHarmonicNote = (freq: number, duration: number, isBass = false) => {
      if (!this.ctx || !this.masterGain || !this.isPlaying || this.isMuted) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = isBass ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(isBass ? 350 : 1200, this.ctx.currentTime);

      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(isBass ? 0.2 : 0.08, now + 1.2);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + duration + 0.1);
    };

    // Play initial drone
    playHarmonicNote(130.81, 7, true); // C3 warm drone

    let step = 0;
    this.ambientInterval = window.setInterval(() => {
      if (!this.isPlaying || this.isMuted) return;
      step++;

      // Drone every few ticks
      if (step % 4 === 0) {
        playHarmonicNote(130.81, 6, true);
        if (step % 8 === 0) {
          playHarmonicNote(196.00, 5, true); // G3
        }
      }

      // Melodic notes
      const randomNote = scale[Math.floor(Math.random() * scale.length)];
      playHarmonicNote(randomNote, 3.5);

      if (Math.random() > 0.5) {
        const harmonyNote = scale[Math.floor(Math.random() * scale.length)];
        setTimeout(() => {
          playHarmonicNote(harmonyNote, 3.0);
        }, 600);
      }
    }, 1800);
  }

  public playChimeSound() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    // Sacred bell / celebratory wind chime harmonics
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

  public playPaperSound() {
    this.initContext();
    if (!this.ctx || !this.masterGain || this.isMuted) return;

    // Soft parchment rustle
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
    gain.gain.linearRampToValueAtTime(0.06, now + 0.03);
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
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(640, now + 0.08);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.1);
  }
}

export const soundEngine = new AudioEngine();
