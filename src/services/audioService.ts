import { settingsService } from './settingsService';

type SoundType = 
  | 'button-hover'
  | 'button-click'
  | 'menu-open'
  | 'menu-close'
  | 'magic-cast'
  | 'dominance-burst'
  | 'companion-assist'
  | 'heroine-damage'
  | 'enemy-hit'
  | 'checkpoint-activate';

type MusicTrack = 'menu' | 'gremlin-woods' | 'boss' | 'victory' | 'none';

class AudioService {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private currentMusicTrack: MusicTrack = 'none';
  private musicOscillators: OscillatorNode[] = [];
  private isInitialized = false;

  constructor() {
    // Lazy initialize on first user interaction
    if (typeof window !== 'undefined') {
      const initAudio = () => {
        this.init();
        window.removeEventListener('click', initAudio);
        window.removeEventListener('keydown', initAudio);
        window.removeEventListener('touchstart', initAudio);
      };
      window.addEventListener('click', initAudio, { once: true });
      window.addEventListener('keydown', initAudio, { once: true });
      window.addEventListener('touchstart', initAudio, { once: true });
    }
  }

  private init() {
    if (this.isInitialized) return;
    try {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtxClass) return;

      this.ctx = new AudioCtxClass();
      this.masterGain = this.ctx.createGain();
      this.musicGain = this.ctx.createGain();
      this.sfxGain = this.ctx.createGain();

      this.musicGain.connect(this.masterGain);
      this.sfxGain.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);

      this.updateVolumes();
      this.isInitialized = true;
    } catch (e) {
      console.warn('[AudioService] Could not initialize Web Audio:', e);
    }
  }

  public updateVolumes() {
    if (!this.ctx || !this.masterGain || !this.musicGain || !this.sfxGain) return;
    const settings = settingsService.getSettings();

    const isMuted = settings.audio.muted;
    const master = isMuted ? 0 : settings.audio.masterVolume / 100;
    const music = settings.audio.musicVolume / 100;
    const sfx = settings.audio.sfxVolume / 100;

    const now = this.ctx.currentTime;
    this.masterGain.gain.setValueAtTime(master, now);
    this.musicGain.gain.setValueAtTime(music * 0.4, now); // Ambient balance
    this.sfxGain.gain.setValueAtTime(sfx * 0.6, now);
  }

  public playSound(type: SoundType) {
    if (!this.ctx || !this.sfxGain) {
      this.init();
      if (!this.ctx || !this.sfxGain) return;
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const settings = settingsService.getSettings();
    if (settings.audio.muted || settings.audio.sfxVolume === 0) return;

    const now = this.ctx.currentTime;

    switch (type) {
      case 'button-hover': {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.08); // A5

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(now);
        osc.stop(now + 0.08);
        break;
      }

      case 'button-click': {
        // Magical crystal chime
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc1.type = 'triangle';
        osc2.type = 'sine';
        osc1.frequency.setValueAtTime(523.25, now); // C5
        osc1.frequency.exponentialRampToValueAtTime(1046.50, now + 0.15); // C6
        osc2.frequency.setValueAtTime(659.25, now); // E5
        osc2.frequency.exponentialRampToValueAtTime(1318.51, now + 0.18); // E6

        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(this.sfxGain);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.22);
        osc2.stop(now + 0.22);
        break;
      }

      case 'magic-cast': {
        // Love magic staff sound: high twinkling sweep
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(1760, now + 0.25);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(now);
        osc.stop(now + 0.3);
        break;
      }

      case 'dominance-burst': {
        // Heavy resonant sub-bass surge
        const osc = this.ctx.createOscillator();
        const subOsc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        subOsc.type = 'sine';
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.exponentialRampToValueAtTime(40, now + 0.6);
        subOsc.frequency.setValueAtTime(80, now);
        subOsc.frequency.exponentialRampToValueAtTime(30, now + 0.7);

        gain.gain.setValueAtTime(0.35, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

        osc.connect(gain);
        subOsc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now);
        subOsc.start(now);
        osc.stop(now + 0.7);
        subOsc.stop(now + 0.7);
        break;
      }

      case 'companion-assist': {
        // Princess protective blessing harmonic chord
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
          if (!this.ctx || !this.sfxGain) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.05);

          gain.gain.setValueAtTime(0.12, now + idx * 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5 + idx * 0.05);

          osc.connect(gain);
          gain.connect(this.sfxGain);
          osc.start(now + idx * 0.05);
          osc.stop(now + 0.5 + idx * 0.05);
        });
        break;
      }

      case 'checkpoint-activate': {
        // Shrine resonance sound
        [440, 554.37, 659.25, 880].forEach((freq, idx) => {
          if (!this.ctx || !this.sfxGain) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);

          gain.gain.setValueAtTime(0.15, now + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

          osc.connect(gain);
          gain.connect(this.sfxGain);
          osc.start(now + idx * 0.08);
          osc.stop(now + 0.8);
        });
        break;
      }

      case 'enemy-hit': {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(80, now + 0.12);

        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

        osc.connect(gain);
        gain.connect(this.sfxGain);
        osc.start(now);
        osc.stop(now + 0.12);
        break;
      }

      default:
        break;
    }
  }

  public playMusic(track: MusicTrack) {
    if (this.currentMusicTrack === track) return;
    this.stopMusic();

    this.currentMusicTrack = track;
    if (track === 'none') return;

    if (!this.ctx || !this.musicGain) {
      this.init();
      if (!this.ctx || !this.musicGain) return;
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const settings = settingsService.getSettings();
    if (settings.audio.muted || settings.audio.musicVolume === 0) return;

    // Procedural ambient anime fantasy chord progression pad
    const chords: Record<MusicTrack, number[][]> = {
      menu: [
        [220, 261.63, 329.63, 440], // A minor
        [174.61, 220, 261.63, 349.23], // F major
        [261.63, 329.63, 392, 523.25], // C major
        [196, 246.94, 293.66, 392], // G major
      ],
      'gremlin-woods': [
        [146.83, 174.61, 220, 293.66], // D minor
        [130.81, 164.81, 196, 261.63], // C minor/ambient
        [116.54, 146.83, 174.61, 233.08], // Bb
        [164.81, 196, 246.94, 329.63], // E minor
      ],
      boss: [
        [110, 130.81, 164.81, 220],
        [98, 123.47, 146.83, 196],
      ],
      victory: [
        [261.63, 329.63, 392, 523.25],
        [349.23, 440, 523.25, 698.46],
      ],
      none: [],
    };

    const trackChords = chords[track];
    if (!trackChords || trackChords.length === 0) return;

    // Create a gentle pulsing pad loop
    const fundamental = trackChords[0];
    fundamental.forEach(freq => {
      if (!this.ctx || !this.musicGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);

      osc.connect(gain);
      gain.connect(this.musicGain);
      osc.start();

      this.musicOscillators.push(osc);
    });
  }

  public stopMusic() {
    this.musicOscillators.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // already stopped
      }
    });
    this.musicOscillators = [];
    this.currentMusicTrack = 'none';
  }
}

export const audioService = new AudioService();
