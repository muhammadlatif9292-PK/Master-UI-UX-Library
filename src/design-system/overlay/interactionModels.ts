/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { InteractionModel, InteractionModelInfo, OverlayVisualTheme } from './overlayTypes';

export const INTERACTION_MODELS: InteractionModelInfo[] = [
  {
    id: 'spring',
    name: 'Harmonic Spring Damping',
    description: 'Natural kinetic spring physics with 400 stiffness and 28 damping ratio for responsive, organic deceleration.',
    physicsTag: 'Stiffness: 400 • Damping: 28',
    curve: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    recommendedUse: 'Modals, Dialogs, Context Menus, Tooltips',
  },
  {
    id: 'fade',
    name: 'Pure Alpha Opacity Dissolve',
    description: 'Ultra-clean opacity crossfade with hardware-accelerated composite layer rendering and zero layout shift.',
    physicsTag: 'Duration: 180ms • Easing: linear',
    curve: 'cubic-bezier(0.4, 0, 0.2, 1)',
    recommendedUse: 'Tooltips, Lightboxes, Subtle dropdowns',
  },
  {
    id: 'slide',
    name: 'Directional Translation Slide',
    description: 'Directional axis translation (left/right/top/bottom) matching natural drawer and sheet ingress gestures.',
    physicsTag: 'Duration: 280ms • Easing: ease-out',
    curve: 'cubic-bezier(0.16, 1, 0.3, 1)',
    recommendedUse: 'Side Sheets, Drawers, Bottom Sheets',
  },
  {
    id: 'morph',
    name: 'FLIP Shared Geometry Morph',
    description: 'Continuous geometric shape transformation expanding from anchor button bounding box to target surface.',
    physicsTag: 'FLIP Interpolation • 320ms',
    curve: 'cubic-bezier(0.2, 0.9, 0.1, 1.0)',
    recommendedUse: 'Command Palettes, Floating Panels, Popovers',
  },
  {
    id: 'portal',
    name: 'Direct Root Stacking Teleport',
    description: 'Teleports element directly to root DOM stacking container with deterministic z-index layering above all canvas nodes.',
    physicsTag: 'Root DOM Portal • Immediate',
    curve: 'cubic-bezier(0, 0, 0.2, 1)',
    recommendedUse: 'Dropdowns, Context Menus, Floating Inspectors',
  },
  {
    id: 'scale',
    name: 'Elastic Pop Scale',
    description: 'Elastic pop scaling from 0.85 to 1.03 with micro overshoot rebound for impactful presence.',
    physicsTag: 'Scale: 0.85 -> 1.03 -> 1.0',
    curve: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    recommendedUse: 'Confirmation Dialogs, Alert Badges, Hero Modals',
  },
  {
    id: 'spatial',
    name: 'Spatial VisionOS Z-Plane Depth',
    description: 'Volumetric 3D perspective translation along the Z-axis with dynamic specular rim illumination and gaze hover refraction.',
    physicsTag: 'Z-Translate: -40px -> 0px • Specular 3D',
    curve: 'perspective(1200px) translateZ(0)',
    recommendedUse: 'Spatial Cards, Lightboxes, Immersive Windows',
  },
  {
    id: 'liquid',
    name: 'Liquid Elastic Surface Flow',
    description: 'Organic fluid perimeter morphing with rubberized border radius deformation and smooth viscoelastic damping.',
    physicsTag: 'Fluid SVG Filter • Viscoelastic',
    curve: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
    recommendedUse: 'Bottom Sheets, Floating Action Wells, Popovers',
  },
  {
    id: 'glass',
    name: 'Refractive Glass Blur Bloom',
    description: 'Multi-pass optical backdrop-filter refraction with progressive noise scatter and perimeter rim specular glow.',
    physicsTag: 'Backdrop-filter: blur(24px) • Noise Dither',
    curve: 'cubic-bezier(0.25, 1, 0.5, 1)',
    recommendedUse: 'VisionOS Sheets, Floating Inspectors, Modern Modals',
  },
  {
    id: 'cinematic',
    name: 'Cinematic Spotlight Vignette',
    description: 'Darkened anamorphic backdrop vignette with focused radial illumination beam pinpointing interactive target.',
    physicsTag: 'Radial Anamorphic Vignette • 400ms',
    curve: 'cubic-bezier(0.22, 1, 0.36, 1)',
    recommendedUse: 'Spotlights, Guided Tours, Lightboxes',
  },
  {
    id: 'mechanical',
    name: 'Mechanical Hydraulic Snap',
    description: 'Zero-latency instant actuation with 2px hard offset shadow and tactile physical click depress.',
    physicsTag: '0ms Delay • Hard Offset Shadow',
    curve: 'steps(1, end)',
    recommendedUse: 'Industrial Tooling, Avionics Palettes, Cyberpunk HUDs',
  },
];

export function getVisualThemeClasses(theme: OverlayVisualTheme): {
  surface: string;
  border: string;
  backdrop: string;
  text: string;
  accent: string;
  glow: string;
} {
  switch (theme) {
    case 'glass':
      return {
        surface: 'bg-zinc-900/80 dark:bg-black/60 backdrop-blur-2xl',
        border: 'border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.3)]',
        backdrop: 'bg-black/60 backdrop-blur-md',
        text: 'text-white',
        accent: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
        glow: 'shadow-[0_0_30px_rgba(6,182,212,0.2)]',
      };
    case 'cyberpunk':
      return {
        surface: 'bg-black/95',
        border: 'border-2 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.4),inset_0_0_15px_rgba(6,182,212,0.15)]',
        backdrop: 'bg-zinc-950/85 backdrop-blur-sm',
        text: 'text-cyan-300 font-mono',
        accent: 'text-yellow-400 bg-cyan-950 border-cyan-400',
        glow: 'shadow-[0_0_40px_rgba(6,182,212,0.5)]',
      };
    case 'minimalist':
      return {
        surface: 'bg-zinc-900',
        border: 'border border-zinc-750 shadow-2xl',
        backdrop: 'bg-black/70 backdrop-blur-sm',
        text: 'text-zinc-100',
        accent: 'text-white bg-zinc-800 border-zinc-700',
        glow: 'shadow-2xl',
      };
    case 'brutalist':
      return {
        surface: 'bg-zinc-950',
        border: 'border-2 border-white shadow-[6px_6px_0px_#ffffff]',
        backdrop: 'bg-black/80',
        text: 'text-white font-mono',
        accent: 'text-black bg-white font-bold',
        glow: 'shadow-[8px_8px_0px_#22d3ee]',
      };
    case 'ambient':
      return {
        surface: 'bg-gradient-to-b from-zinc-900 via-zinc-950 to-black',
        border: 'border border-purple-500/30 shadow-[0_25px_60px_rgba(168,85,247,0.25)]',
        backdrop: 'bg-purple-950/40 backdrop-blur-lg',
        text: 'text-purple-100',
        accent: 'text-purple-300 bg-purple-500/20 border-purple-500/40',
        glow: 'shadow-[0_0_50px_rgba(168,85,247,0.3)]',
      };
    default:
      return {
        surface: 'bg-zinc-900',
        border: 'border border-white/15 shadow-2xl',
        backdrop: 'bg-black/60 backdrop-blur-sm',
        text: 'text-white',
        accent: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
        glow: 'shadow-xl',
      };
  }
}
