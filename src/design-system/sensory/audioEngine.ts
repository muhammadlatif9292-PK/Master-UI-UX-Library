/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SoundRecipe } from '../../types/architecture';
import { proceduralSoundEngine } from '../sound/soundEngine';
import { hapticEngine } from '../haptics/hapticEngine';
import { SoundKey } from '../sound/soundTypes';

class AudioSynthesizerEngine {
  private isMuted: boolean = false;

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getMuted() {
    return this.isMuted;
  }

  public playSound(recipe: SoundRecipe) {
    if (this.isMuted || !recipe.enabled || recipe.soundType === 'none') return;

    let soundKey: SoundKey = 'tap';
    switch (recipe.soundType) {
      case 'glass-tap':
        soundKey = 'press';
        break;
      case 'laser-beep':
        soundKey = 'search-activate';
        break;
      case 'mechanical-thud':
        soundKey = 'toggle';
        break;
      case 'chime':
        soundKey = 'success';
        break;
      case 'soft-click':
      default:
        soundKey = 'tap';
        break;
    }

    proceduralSoundEngine.playSound(soundKey, 'MICRO', recipe.volume, 0.1, !this.isMuted);
  }

  public triggerHaptic(pattern: number | number[]) {
    if (typeof pattern === 'number') {
      hapticEngine.trigger('tap', 'normal', !this.isMuted);
    } else if (Array.isArray(pattern)) {
      hapticEngine.trigger('selection', 'normal', !this.isMuted);
    }
  }
}

export const audioEngine = new AudioSynthesizerEngine();

