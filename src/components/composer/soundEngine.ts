/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SoundSynthesizerId, IntensityLevel } from './types';

class ExperienceSoundSynthesizer {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private init() {
    if (typeof window === 'undefined') return;
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playSound(
    soundId: SoundSynthesizerId,
    eventType: 'click' | 'hover' | 'toggle' | 'slider' | 'scan' | 'success' = 'click',
    intensity: IntensityLevel = 'balanced'
  ) {
    if (soundId === 'mute' || this.isMuted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const masterGain = this.ctx.createGain();
    masterGain.connect(this.ctx.destination);

    // Calculate volume multiplier based on intensity and event
    let intensityGain = 0.25;
    if (intensity === 'subtle') intensityGain = 0.12;
    if (intensity === 'expressive') intensityGain = 0.4;
    if (intensity === 'extreme') intensityGain = 0.65;

    if (eventType === 'hover') intensityGain *= 0.35;
    if (eventType === 'slider') intensityGain *= 0.5;

    masterGain.gain.setValueAtTime(Math.min(intensityGain, 0.8), now);

    switch (soundId) {
      case 'crystal-sound': {
        // Pristine crystalline bell with harmonic overtone chime (A5, C#6, E6, G#6)
        const frequencies = eventType === 'success' 
          ? [880, 1108.73, 1318.51, 1661.22] 
          : eventType === 'hover' 
            ? [1318.51] 
            : [880, 1318.51];
        
        frequencies.forEach((freq, idx) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq * (1 + idx * 0.003), now);

          const decay = eventType === 'success' ? 0.8 : 0.35;
          gain.gain.setValueAtTime(0.3 / (idx + 1), now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + decay);

          osc.connect(gain);
          gain.connect(masterGain);
          osc.start(now);
          osc.stop(now + decay);
        });
        break;
      }

      case 'cybernetic-click': {
        // High-pass digital relay snap
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'square';
        const baseFreq = eventType === 'hover' ? 1800 : 1200;
        osc.frequency.setValueAtTime(baseFreq, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);

        filter.type = 'highpass';
        filter.frequency.setValueAtTime(800, now);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);
        osc.start(now);
        osc.stop(now + 0.05);
        break;
      }

      case 'analog-thud': {
        // Deep acoustic membrane thud
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(140, now);
        osc.frequency.exponentialRampToValueAtTime(45, now + 0.12);

        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(now);
        osc.stop(now + 0.14);
        break;
      }

      case 'harmonic-hum': {
        // Ethereal chord pad
        const chordNotes = [440, 554.37, 659.25]; // A major
        chordNotes.forEach((freq, idx) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);

          gain.gain.setValueAtTime(0.08, now);
          gain.gain.linearRampToValueAtTime(0.18 / (idx + 1), now + 0.08);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

          osc.connect(gain);
          gain.connect(masterGain);
          osc.start(now);
          osc.stop(now + 0.5);
        });
        break;
      }

      case 'minimal-pip': {
        // Crisp micro sine pip
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(950, now);

        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(now);
        osc.stop(now + 0.035);
        break;
      }

      case 'futuristic-chord': {
        // Polyphonic synthetic triad (C5 - E5 - G5 - B5)
        const notes = [523.25, 659.25, 783.99, 987.77];
        notes.forEach((freq, idx) => {
          if (!this.ctx) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(freq, now);

          const filter = this.ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(2400, now);
          filter.frequency.exponentialRampToValueAtTime(400, now + 0.4);

          gain.gain.setValueAtTime(0.15 / (idx + 1), now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(masterGain);
          osc.start(now);
          osc.stop(now + 0.45);
        });
        break;
      }

      case 'sub-bass-pulse': {
        // Deep 60Hz sub pressure
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(65, now);
        osc.frequency.exponentialRampToValueAtTime(35, now + 0.22);

        gain.gain.setValueAtTime(0.7, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(now);
        osc.stop(now + 0.25);
        break;
      }

      default:
        break;
    }
  }

  public toggleMute(muted?: boolean) {
    this.isMuted = muted !== undefined ? muted : !this.isMuted;
    return this.isMuted;
  }
}

export const soundSynthesizer = new ExperienceSoundSynthesizer();
