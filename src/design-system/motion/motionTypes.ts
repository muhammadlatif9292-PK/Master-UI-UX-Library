/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type MotionPrimitive =
  | 'fade'
  | 'slide'
  | 'scale'
  | 'spring'
  | 'bounce'
  | 'elastic'
  | 'morph'
  | 'glow'
  | 'blur'
  | 'float'
  | 'pulse'
  | 'shake'
  | 'reveal'
  | 'collapse'
  | 'expand'
  | 'orbit'
  | 'parallax'
  | 'magnetic'
  | 'liquid'
  | 'ripple'
  | 'snap'
  | 'dissolve'
  | 'gather'
  | 'scatter';

export type MotionPreset =
  | 'instant'
  | 'subtle'
  | 'soft'
  | 'fluid'
  | 'spring'
  | 'elastic'
  | 'expressive'
  | 'cinematic'
  | 'hero';

export type MotionIntensityLevel = 0 | 1 | 2 | 3 | 4; // 0: Off, 1: Subtle, 2: Normal, 3: Expressive, 4: Cinematic

export interface MotionConfig {
  preset: MotionPreset;
  intensity: MotionIntensityLevel;
  reducedMotion: boolean;
}
