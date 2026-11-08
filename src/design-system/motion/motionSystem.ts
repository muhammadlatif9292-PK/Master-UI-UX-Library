/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MotionPrimitive, MotionPreset, MotionIntensityLevel } from './motionTypes';

export interface SpringSpec {
  stiffness: number;
  damping: number;
  mass: number;
}

export interface TransitionSpec {
  duration: number;
  ease?: number[] | string;
  repeat?: number;
  repeatType?: 'loop' | 'reverse' | 'mirror';
}

export const MOTION_PRESETS: Record<MotionPreset, { transition: TransitionSpec; spring?: SpringSpec; scale?: number }> = {
  instant: {
    transition: { duration: 0.05, ease: 'linear' },
    scale: 1,
  },
  subtle: {
    transition: { duration: 0.15, ease: [0.25, 1, 0.5, 1] },
    scale: 1.01,
  },
  soft: {
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
    scale: 1.02,
  },
  fluid: {
    transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] },
    scale: 1.03,
  },
  spring: {
    spring: { stiffness: 350, damping: 25, mass: 1 },
    transition: { duration: 0.4 },
    scale: 1.03,
  },
  elastic: {
    spring: { stiffness: 500, damping: 12, mass: 0.8 },
    transition: { duration: 0.6 },
    scale: 1.05,
  },
  expressive: {
    spring: { stiffness: 280, damping: 20, mass: 1.2 },
    transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
    scale: 1.06,
  },
  cinematic: {
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    scale: 1.04,
  },
  hero: {
    spring: { stiffness: 200, damping: 22, mass: 1.5 },
    transition: { duration: 1.0, ease: [0.25, 1, 0.5, 1] },
    scale: 1.08,
  },
};

/**
 * Returns motion properties for any of the 24 primitives scaled by intensity and reduced motion.
 */
export function getMotionPrimitiveVariants(
  primitive: MotionPrimitive,
  preset: MotionPreset = 'fluid',
  intensity: MotionIntensityLevel = 2,
  reducedMotion: boolean = false
) {
  if (intensity === 0 || reducedMotion) {
    return {
      initial: { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0, filter: 'blur(0px)' },
      animate: { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0, filter: 'blur(0px)' },
      exit: { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0, filter: 'blur(0px)' },
      transition: { duration: 0.01 },
    };
  }

  const pSpec = MOTION_PRESETS[preset];
  const mult = intensity * 0.35; // Scale effect by global intensity level (1 to 4)

  switch (primitive) {
    case 'fade':
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: pSpec.transition,
      };

    case 'slide':
      return {
        initial: { opacity: 0, y: 30 * mult },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -30 * mult },
        transition: pSpec.spring ? { type: 'spring', ...pSpec.spring } : pSpec.transition,
      };

    case 'scale':
      return {
        initial: { opacity: 0, scale: 0.9 + (0.1 / intensity) },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.9 },
        transition: pSpec.transition,
      };

    case 'spring':
      return {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.8 },
        transition: { type: 'spring', stiffness: 300 * intensity, damping: 20 },
      };

    case 'bounce':
      return {
        initial: { y: -40 * mult, opacity: 0 },
        animate: { y: [0, -15 * mult, 0], opacity: 1 },
        transition: { duration: 0.6, times: [0, 0.6, 1] },
      };

    case 'elastic':
      return {
        initial: { scale: 0.3, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        transition: { type: 'spring', stiffness: 400, damping: 10 },
      };

    case 'morph':
      return {
        initial: { borderRadius: '50%', scale: 0.8, opacity: 0 },
        animate: { borderRadius: '16px', scale: 1, opacity: 1 },
        transition: pSpec.transition,
      };

    case 'glow':
      return {
        initial: { boxShadow: '0 0 0px rgba(56,189,248,0)' },
        animate: { boxShadow: `0 0 ${25 * mult}px rgba(56,189,248,0.5)` },
        transition: { repeat: Infinity, repeatType: 'reverse', duration: 1.2 / intensity },
      };

    case 'blur':
      return {
        initial: { filter: 'blur(16px)', opacity: 0 },
        animate: { filter: 'blur(0px)', opacity: 1 },
        transition: pSpec.transition,
      };

    case 'float':
      return {
        animate: { y: [-8 * mult, 8 * mult, -8 * mult] },
        transition: { repeat: Infinity, ease: 'easeInOut', duration: 3 / intensity },
      };

    case 'pulse':
      return {
        animate: { scale: [1, 1.04 + (0.02 * mult), 1] },
        transition: { repeat: Infinity, ease: 'easeInOut', duration: 1.5 },
      };

    case 'shake':
      return {
        animate: { x: [-6 * mult, 6 * mult, -4 * mult, 4 * mult, 0] },
        transition: { duration: 0.4 },
      };

    case 'reveal':
      return {
        initial: { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        animate: { clipPath: 'inset(0 0% 0 0)', opacity: 1 },
        transition: pSpec.transition,
      };

    case 'collapse':
    case 'expand':
      return {
        initial: { height: 0, opacity: 0, overflow: 'hidden' },
        animate: { height: 'auto', opacity: 1, overflow: 'hidden' },
        exit: { height: 0, opacity: 0, overflow: 'hidden' },
        transition: pSpec.transition,
      };

    case 'orbit':
      return {
        animate: { rotate: 360 },
        transition: { repeat: Infinity, ease: 'linear', duration: 8 / intensity },
      };

    case 'parallax':
      return {
        initial: { y: 20 * mult, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: pSpec.transition,
      };

    case 'magnetic':
      return {
        hover: { scale: pSpec.scale || 1.03, transition: { type: 'spring', stiffness: 400, damping: 25 } },
      };

    case 'liquid':
      return {
        animate: { borderRadius: ['20% 80% 60% 40%', '60% 40% 80% 20%', '20% 80% 60% 40%'] },
        transition: { repeat: Infinity, duration: 4, ease: 'easeInOut' },
      };

    case 'ripple':
      return {
        initial: { scale: 0, opacity: 0.8 },
        animate: { scale: 2.5, opacity: 0 },
        transition: { duration: 0.6 },
      };

    case 'snap':
      return {
        initial: { scale: 1.15, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        transition: { type: 'spring', stiffness: 600, damping: 30 },
      };

    case 'dissolve':
      return {
        initial: { filter: 'contrast(150%) blur(8px)', opacity: 0 },
        animate: { filter: 'contrast(100%) blur(0px)', opacity: 1 },
        transition: { duration: 0.5 },
      };

    case 'gather':
      return {
        initial: { scale: 1.5, opacity: 0, filter: 'blur(10px)' },
        animate: { scale: 1, opacity: 1, filter: 'blur(0px)' },
        transition: pSpec.transition,
      };

    case 'scatter':
      return {
        initial: { x: 50 * mult, y: -30 * mult, opacity: 0 },
        animate: { x: 0, y: 0, opacity: 1 },
        transition: pSpec.spring ? { type: 'spring', ...pSpec.spring } : pSpec.transition,
      };

    default:
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: pSpec.transition,
      };
  }
}
