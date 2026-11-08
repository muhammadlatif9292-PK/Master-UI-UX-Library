/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HapticEvent, HapticIntensity } from './hapticTypes';

class HapticEngine {
  public isSupported(): boolean {
    return typeof window !== 'undefined' && typeof navigator !== 'undefined' && 'vibrate' in navigator;
  }

  public trigger(event: HapticEvent, intensity: HapticIntensity = 'normal', enabled: boolean = true, simulatedUnsupported: boolean = false) {
    if (!enabled || intensity === 'off') return;
    if (simulatedUnsupported || !this.isSupported()) {
      // Graceful degradation / simulation log
      return;
    }

    const multiplier = intensity === 'subtle' ? 0.6 : intensity === 'vivid' ? 1.6 : 1.0;

    try {
      switch (event) {
        case 'tap':
          navigator.vibrate(Math.round(15 * multiplier));
          break;
        case 'press':
          navigator.vibrate(Math.round(25 * multiplier));
          break;
        case 'selection':
          navigator.vibrate(Math.round(20 * multiplier));
          break;
        case 'toggle':
          navigator.vibrate([Math.round(10 * multiplier), 30, Math.round(15 * multiplier)]);
          break;
        case 'snap':
          navigator.vibrate(Math.round(35 * multiplier));
          break;
        case 'drag':
          navigator.vibrate(Math.round(8 * multiplier));
          break;
        case 'boundary':
          navigator.vibrate([Math.round(40 * multiplier), 50, Math.round(40 * multiplier)]);
          break;
        case 'success':
          navigator.vibrate([Math.round(30 * multiplier), 50, Math.round(60 * multiplier)]);
          break;
        case 'warning':
          navigator.vibrate([Math.round(50 * multiplier), 80, Math.round(50 * multiplier)]);
          break;
        case 'error':
          navigator.vibrate([Math.round(80 * multiplier), 60, Math.round(80 * multiplier), 60, Math.round(80 * multiplier)]);
          break;
        case 'completion':
          navigator.vibrate([Math.round(20 * multiplier), 40, Math.round(20 * multiplier), 40, Math.round(80 * multiplier)]);
          break;
        default:
          navigator.vibrate(15);
      }
    } catch (e) {
      // Silently ignore if vibration permission is restricted
    }
  }
}

export const hapticEngine = new HapticEngine();
