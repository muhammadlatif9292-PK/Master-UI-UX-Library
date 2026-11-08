/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SoundKey, SoundCategory } from './soundTypes';

class ProceduralSoundEngine {
  private ctx: AudioContext | null = null;
  private ambientGain: GainNode | null = null;
  private ambientOsc: OscillatorNode | null = null;
  private currentAmbientKey: SoundKey | null = null;

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public playSound(key: SoundKey, category: SoundCategory, uiVolume: number = 0.2, ambientVolume: number = 0.1, enabled: boolean = true) {
    if (!enabled || uiVolume <= 0) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const masterGain = this.ctx.createGain();
    masterGain.connect(this.ctx.destination);

    // Apply volume scaling based on category
    const isAmbient = category === 'AMBIENT';
    const volume = isAmbient ? ambientVolume : uiVolume;
    masterGain.gain.setValueAtTime(Math.min(Math.max(volume, 0), 1), now);

    switch (key) {
      // MICRO
      case 'tap':
      case 'press': {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(200, now + 0.04);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(now);
        osc.stop(now + 0.04);
        break;
      }
      case 'release':
      case 'focus': {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(500, now + 0.05);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(now);
        osc.stop(now + 0.05);
        break;
      }
      case 'selection':
      case 'toggle': {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.04); // E5
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(now);
        osc.stop(now + 0.08);
        break;
      }
      case 'drag-start':
      case 'expand': {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.linearRampToValueAtTime(600, now + 0.1);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(now);
        osc.stop(now + 0.1);
        break;
      }
      case 'drag-end':
      case 'collapse':
      case 'snap': {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.linearRampToValueAtTime(300, now + 0.08);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(now);
        osc.stop(now + 0.08);
        break;
      }

      // NAVIGATION
      case 'screen-enter':
      case 'tab-change':
      case 'forward': {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(now);
        osc.stop(now + 0.12);
        break;
      }
      case 'screen-exit':
      case 'back': {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.12);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(now);
        osc.stop(now + 0.12);
        break;
      }
      case 'drawer-open':
      case 'search-activate': {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(350, now);
        osc.frequency.exponentialRampToValueAtTime(700, now + 0.15);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(now);
        osc.stop(now + 0.15);
        break;
      }
      case 'drawer-close': {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(700, now);
        osc.frequency.exponentialRampToValueAtTime(350, now + 0.15);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(now);
        osc.stop(now + 0.15);
        break;
      }

      // STATE
      case 'success':
      case 'completion': {
        const nowTime = now;
        [523.25, 659.25, 783.99].forEach((freq, i) => {
          const osc = this.ctx!.createOscillator();
          const gain = this.ctx!.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, nowTime + i * 0.06);
          gain.gain.setValueAtTime(0.2, nowTime + i * 0.06);
          gain.gain.exponentialRampToValueAtTime(0.001, nowTime + i * 0.06 + 0.15);
          osc.connect(gain);
          gain.connect(masterGain);
          osc.start(nowTime + i * 0.06);
          osc.stop(nowTime + i * 0.06 + 0.15);
        });
        break;
      }
      case 'error': {
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc1.type = 'sawtooth';
        osc2.type = 'sawtooth';
        osc1.frequency.setValueAtTime(150, now);
        osc2.frequency.setValueAtTime(155, now);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(masterGain);
        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.25);
        osc2.stop(now + 0.25);
        break;
      }
      case 'warning': {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.setValueAtTime(300, now + 0.1);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(now);
        osc.stop(now + 0.2);
        break;
      }
      case 'processing':
      case 'notification': {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(1000, now + 0.1);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(now);
        osc.stop(now + 0.1);
        break;
      }

      // HERO
      case 'major-completion':
      case 'major-achievement':
      case 'major-scene-transition': {
        const chords = [523.25, 659.25, 783.99, 1046.5];
        chords.forEach((freq, i) => {
          const osc = this.ctx!.createOscillator();
          const gain = this.ctx!.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + i * 0.08);
          gain.gain.setValueAtTime(0.25, now + i * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.4);
          osc.connect(gain);
          gain.connect(masterGain);
          osc.start(now + i * 0.08);
          osc.stop(now + i * 0.08 + 0.4);
        });
        break;
      }

      // AMBIENT (Continuous drone loop simulation)
      case 'laboratory':
      case 'observatory':
      case 'deep-space':
      case 'ai-environment':
      case 'simulation': {
        if (this.currentAmbientKey === key && this.ambientOsc) {
          // Stop ambient if toggled again
          this.stopAmbient();
          break;
        }
        this.stopAmbient();
        this.currentAmbientKey = key;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = key === 'observatory' ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(key === 'deep-space' ? 110 : 220, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(Math.max(ambientVolume, 0.01), now + 1.0);

        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(now);
        this.ambientOsc = osc;
        this.ambientGain = gain;
        break;
      }
    }
  }

  public stopAmbient() {
    if (this.ambientOsc && this.ambientGain && this.ctx) {
      try {
        const now = this.ctx.currentTime;
        this.ambientGain.gain.linearRampToValueAtTime(0.0001, now + 0.5);
        this.ambientOsc.stop(now + 0.5);
      } catch (e) {
        // ignore
      }
      this.ambientOsc = null;
      this.ambientGain = null;
      this.currentAmbientKey = null;
    }
  }
}

export const proceduralSoundEngine = new ProceduralSoundEngine();
