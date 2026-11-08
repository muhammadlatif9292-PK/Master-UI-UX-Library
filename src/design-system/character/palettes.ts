/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CharacterPalette, CharacterEmotion, CharacterState, EyeShape, MouthShape } from './types';

export const CHARACTER_PALETTES: Record<string, CharacterPalette> = {
  cyberCyan: {
    id: 'cyberCyan',
    name: 'Cyber Cyan',
    primary: '#0ea5e9', // sky-500
    secondary: '#38bdf8', // sky-400
    accent: '#818cf8', // indigo-400
    glow: 'rgba(14, 165, 233, 0.4)',
    eyeColor: '#38bdf8',
    blushColor: '#f43f5e',
    bodyBg: '#0c1322',
  },
  neonViolet: {
    id: 'neonViolet',
    name: 'Neon Violet',
    primary: '#8b5cf6', // violet-500
    secondary: '#a78bfa', // violet-400
    accent: '#ec4899', // pink-500
    glow: 'rgba(139, 92, 246, 0.4)',
    eyeColor: '#c084fc',
    blushColor: '#f472b6',
    bodyBg: '#130d24',
  },
  emeraldMatrix: {
    id: 'emeraldMatrix',
    name: 'Emerald Matrix',
    primary: '#10b981', // emerald-500
    secondary: '#34d399', // emerald-400
    accent: '#06b6d4', // cyan-500
    glow: 'rgba(16, 185, 129, 0.4)',
    eyeColor: '#34d399',
    blushColor: '#fb7185',
    bodyBg: '#091c15',
  },
  solarAmber: {
    id: 'solarAmber',
    name: 'Solar Amber',
    primary: '#f59e0b', // amber-500
    secondary: '#fbbf24', // amber-400
    accent: '#ef4444', // red-500
    glow: 'rgba(245, 158, 11, 0.4)',
    eyeColor: '#fbbf24',
    blushColor: '#fb923c',
    bodyBg: '#1c140a',
  },
  ghostMono: {
    id: 'ghostMono',
    name: 'Ghost Monochrome',
    primary: '#e4e4e7', // zinc-200
    secondary: '#a1a1aa', // zinc-400
    accent: '#71717a', // zinc-500
    glow: 'rgba(228, 228, 231, 0.3)',
    eyeColor: '#ffffff',
    blushColor: '#71717a',
    bodyBg: '#18181b',
  },
  roseQuartz: {
    id: 'roseQuartz',
    name: 'Rose Quartz',
    primary: '#f43f5e', // rose-500
    secondary: '#fb7185', // rose-400
    accent: '#c084fc', // purple-400
    glow: 'rgba(244, 63, 94, 0.4)',
    eyeColor: '#fb7185',
    blushColor: '#fda4af',
    bodyBg: '#210c14',
  },
};

/**
 * Maps each state to baseline facial expression parameters
 */
export function getStateExpressionDefaults(state: CharacterState): {
  eyeShape: EyeShape;
  mouthShape: MouthShape;
  emotion: CharacterEmotion;
  eyebrowTilt: number; // degrees -20 to 20
  pulseSpeed: number; // seconds
} {
  switch (state) {
    case 'idle':
      return { eyeShape: 'normal', mouthShape: 'smile', emotion: 'neutral', eyebrowTilt: 0, pulseSpeed: 3.5 };
    case 'watching':
      return { eyeShape: 'normal', mouthShape: 'neutral', emotion: 'focused', eyebrowTilt: -4, pulseSpeed: 2.8 };
    case 'listening':
      return { eyeShape: 'happy', mouthShape: 'smile', emotion: 'friendly', eyebrowTilt: 6, pulseSpeed: 2.0 };
    case 'thinking':
      return { eyeShape: 'squint', mouthShape: 'flat', emotion: 'analytical', eyebrowTilt: 12, pulseSpeed: 1.8 };
    case 'processing':
      return { eyeShape: 'normal', mouthShape: 'open', emotion: 'analytical', eyebrowTilt: 0, pulseSpeed: 1.2 };
    case 'typing':
      return { eyeShape: 'happy', mouthShape: 'smile', emotion: 'focused', eyebrowTilt: 4, pulseSpeed: 1.5 };
    case 'success':
      return { eyeShape: 'stars', mouthShape: 'big-smile', emotion: 'proud', eyebrowTilt: 8, pulseSpeed: 2.0 };
    case 'celebrating':
      return { eyeShape: 'hearts', mouthShape: 'big-smile', emotion: 'excited', eyebrowTilt: 14, pulseSpeed: 1.0 };
    case 'confused':
      return { eyeShape: 'wink-left', mouthShape: 'smirk', emotion: 'curious', eyebrowTilt: -16, pulseSpeed: 2.5 };
    case 'warning':
      return { eyeShape: 'suspicious', mouthShape: 'frown', emotion: 'worried', eyebrowTilt: -10, pulseSpeed: 1.4 };
    case 'error':
      return { eyeShape: 'x-eyes', mouthShape: 'frown', emotion: 'worried', eyebrowTilt: -14, pulseSpeed: 1.0 };
    case 'sleeping':
      return { eyeShape: 'sleepy', mouthShape: 'cat', emotion: 'sleepy', eyebrowTilt: 0, pulseSpeed: 5.0 };
    case 'offline':
      return { eyeShape: 'sleepy', mouthShape: 'flat', emotion: 'neutral', eyebrowTilt: 0, pulseSpeed: 8.0 };
    default:
      return { eyeShape: 'normal', mouthShape: 'smile', emotion: 'neutral', eyebrowTilt: 0, pulseSpeed: 3.5 };
  }
}
