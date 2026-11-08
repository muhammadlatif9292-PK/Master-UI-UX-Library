/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { HapticFeedbackId, IntensityLevel } from './types';
import { HAPTIC_OPTIONS } from './composerData';

export function triggerHaptic(
  hapticId: HapticFeedbackId,
  intensity: IntensityLevel = 'balanced'
): { pattern: number[]; supported: boolean } {
  if (hapticId === 'none') {
    return { pattern: [], supported: false };
  }

  const option = HAPTIC_OPTIONS.find((h) => h.id === hapticId);
  if (!option || !option.vibratePattern.length) {
    return { pattern: [], supported: false };
  }

  // Adjust duration multiplier based on intensity
  let multiplier = 1.0;
  if (intensity === 'subtle') multiplier = 0.7;
  if (intensity === 'expressive') multiplier = 1.3;
  if (intensity === 'extreme') multiplier = 1.8;

  const adjustedPattern = option.vibratePattern.map((p) => Math.round(p * multiplier));

  let supported = false;
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    try {
      supported = navigator.vibrate(adjustedPattern);
    } catch {
      supported = false;
    }
  }

  return { pattern: adjustedPattern, supported };
}
