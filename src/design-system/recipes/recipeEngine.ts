/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { StyleRecipe, MotionRecipe, InteractionRecipe, SemanticComponentState } from '../../types/architecture';
import { ARCHETYPE_TOKENS } from '../tokens';

/**
 * Helper to generate a standardized StyleRecipe for any archetype.
 */
export function createStyleRecipeFromArchetype(
  id: string,
  name: string,
  archetype: keyof typeof ARCHETYPE_TOKENS,
  overrides?: Partial<StyleRecipe>
): StyleRecipe {
  const tokens = ARCHETYPE_TOKENS[archetype];

  const defaultRecipe: StyleRecipe = {
    id,
    name,
    archetype,
    wrapperClasses: `w-full max-w-md mx-auto p-8 rounded-2xl ${tokens.bgCanvas} transition-all duration-300`,
    surfaceClasses: `${tokens.surfacePrimary} p-6 rounded-xl ${tokens.borderDefault} ${tokens.accentGlow}`,
    lighting: {
      specularHighlight: true,
      ambientGlow: tokens.accentGlow,
      shadowDepth: archetype === 'brutalist-grid' ? 'brutalist' : 'cinematic',
      blurLevel: 'backdrop-xl',
    },
    borderClasses: `border ${tokens.borderDefault}`,
    typography: {
      fontFamily: tokens.fontFamilyTitle,
      titleClasses: `text-2xl font-bold tracking-tight ${tokens.textPrimary}`,
      bodyClasses: `text-sm ${tokens.textSecondary}`,
      labelClasses: `text-xs font-medium uppercase tracking-wider ${tokens.textSecondary}`,
      monoClasses: `font-mono text-xs ${tokens.accentPrimary}`,
    },
    inputClasses: {
      base: `w-full px-4 py-3 rounded-lg bg-black/20 border ${tokens.borderDefault} ${tokens.textPrimary} placeholder:text-zinc-500 focus:outline-none transition-all`,
      focus: `ring-2 ring-offset-2 ring-offset-black/50 ring-cyan-400`,
      error: `border-red-500 text-red-200 focus:ring-red-400`,
      success: `border-emerald-500 text-emerald-200 focus:ring-emerald-400`,
      placeholder: `text-zinc-500`,
    },
    buttonClasses: {
      primary: `w-full py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg hover:opacity-95 active:scale-[0.98]`,
      secondary: `w-full py-3 px-4 rounded-lg font-medium border ${tokens.borderDefault} ${tokens.textPrimary} hover:bg-white/5 active:scale-[0.98] transition-all`,
      ghost: `p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-all`,
    },
    badgeClasses: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/10 ${tokens.textPrimary}`,
    ...overrides,
  };

  return defaultRecipe;
}

/**
 * Standard Motion Recipes for animations
 */
export const STANDARD_MOTION_RECIPES: Record<string, MotionRecipe> = {
  smoothSpring: {
    id: 'motion-smooth-spring',
    name: 'Smooth Organic Spring',
    spring: { stiffness: 300, damping: 25, mass: 1 },
    transitions: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
    hoverScale: 1.02,
    tapScale: 0.97,
    layoutAnimation: true,
    entranceAnimation: 'slide-up',
  },
  cyberGlitch: {
    id: 'motion-cyber-glitch',
    name: 'Cyber HUD Snap',
    spring: { stiffness: 500, damping: 15, mass: 0.5 },
    transitions: { duration: 0.15, ease: 'easeOut' },
    hoverScale: 1.04,
    tapScale: 0.95,
    layoutAnimation: true,
    entranceAnimation: 'glitch',
  },
  luxuryFluid: {
    id: 'motion-luxury-fluid',
    name: 'Restrained Luxury Glide',
    spring: { stiffness: 180, damping: 30, mass: 1.2 },
    transitions: { duration: 0.6, ease: [0.25, 1, 0.5, 1] },
    hoverScale: 1.01,
    tapScale: 0.99,
    layoutAnimation: true,
    entranceAnimation: 'luxury-wipe',
  },
};

/**
 * Standard Sensory Recipes
 */
export const STANDARD_SENSORY_RECIPES: Record<string, InteractionRecipe> = {
  subtleGlass: {
    sound: { enabled: true, soundType: 'glass-tap', volume: 0.2 },
    haptic: { enabled: true, pattern: 10 },
    cursorEffect: 'spotlight',
  },
  cyberTerminal: {
    sound: { enabled: true, soundType: 'laser-beep', volume: 0.15 },
    haptic: { enabled: true, pattern: [15, 30, 15] },
    cursorEffect: 'none',
  },
  mechanicalClick: {
    sound: { enabled: true, soundType: 'mechanical-thud', volume: 0.3 },
    haptic: { enabled: true, pattern: 25 },
    cursorEffect: 'none',
  },
  silent: {
    sound: { enabled: false, soundType: 'none', volume: 0 },
    haptic: { enabled: false, pattern: 0 },
    cursorEffect: 'none',
  },
};
