/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ThemeId =
  | 'obsidian'
  | 'aurora'
  | 'observatory'
  | 'laboratory'
  | 'quantum'
  | 'neon-noir'
  | 'crystal'
  | 'deep-space'
  | 'command'
  | 'tactile'
  | 'companion'
  | 'minimal-cinema';

export interface SemanticThemeTokens {
  id: ThemeId;
  name: string;
  description: string;
  category: 'dark' | 'light' | 'translucent' | 'editorial';
  
  bg: {
    canvas: string;
    subtle: string;
  };
  
  surface: {
    primary: string;
    secondary: string;
    elevated: string;
  };
  
  text: {
    primary: string;
    secondary: string;
    muted: string;
    inverse: string;
  };
  
  accent: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  
  state: {
    success: string;
    warning: string;
    error: string;
    info: string;
  };
  
  focus: {
    ring: string;
  };
  
  shadow: {
    soft: string;
    deep: string;
    glowPrimary: string;
  };
  
  border: {
    default: string;
    subtle: string;
    active: string;
  };
  
  typography: {
    fontFamilyTitle: string;
    fontFamilyBody: string;
    fontFamilyMono: string;
  };

  lighting: {
    ambientGlow: string;
    specularHighlightClass: string;
  };
}

export const THEMES: Record<ThemeId, SemanticThemeTokens> = {
  obsidian: {
    id: 'obsidian',
    name: 'Obsidian',
    description: 'Deep luxurious dark obsidian with subtle bronze & gold warm highlights.',
    category: 'dark',
    bg: { canvas: 'bg-[#0A0A0C]', subtle: 'bg-[#121216]' },
    surface: { primary: 'bg-[#16161A]/90 backdrop-blur-xl', secondary: 'bg-[#1F1F24]', elevated: 'bg-[#282830]' },
    text: { primary: 'text-[#F4F4F6]', secondary: 'text-[#A1A1AA]', muted: 'text-[#71717A]', inverse: 'text-zinc-950' },
    accent: { primary: 'text-[#D4AF37]', secondary: 'text-[#E5C158]', tertiary: 'text-[#9A7B2C]' },
    state: { success: 'text-emerald-400', warning: 'text-amber-400', error: 'text-rose-400', info: 'text-sky-400' },
    focus: { ring: 'ring-2 ring-[#D4AF37] ring-offset-2 ring-offset-[#0A0A0C]' },
    shadow: { soft: 'shadow-[0_4px_20px_-2px_rgba(0,0,0,0.5)]', deep: 'shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)]', glowPrimary: 'shadow-[0_0_30px_rgba(212,175,55,0.15)]' },
    border: { default: 'border-[#D4AF37]/30', subtle: 'border-white/10', active: 'border-[#D4AF37]' },
    typography: { fontFamilyTitle: 'Playfair Display, serif', fontFamilyBody: 'Plus Jakarta Sans, sans-serif', fontFamilyMono: 'JetBrains Mono, monospace' },
    lighting: { ambientGlow: 'bg-amber-500/10', specularHighlightClass: 'bg-gradient-to-tr from-white/10 to-transparent' },
  },
  aurora: {
    id: 'aurora',
    name: 'Aurora',
    description: 'Deep boreal blue and green gradient backdrop with luminescent teal accents.',
    category: 'dark',
    bg: { canvas: 'bg-gradient-to-br from-slate-950 via-teal-950 to-emerald-950', subtle: 'bg-teal-950/40' },
    surface: { primary: 'bg-slate-900/80 backdrop-blur-2xl', secondary: 'bg-teal-900/30', elevated: 'bg-teal-800/40' },
    text: { primary: 'text-teal-50', secondary: 'text-teal-200/70', muted: 'text-teal-400/50', inverse: 'text-slate-950' },
    accent: { primary: 'text-teal-400', secondary: 'text-emerald-300', tertiary: 'text-cyan-400' },
    state: { success: 'text-emerald-300', warning: 'text-amber-300', error: 'text-rose-300', info: 'text-cyan-300' },
    focus: { ring: 'ring-2 ring-teal-400 ring-offset-2 ring-offset-slate-950' },
    shadow: { soft: 'shadow-[0_4px_25px_-2px_rgba(20,184,166,0.15)]', deep: 'shadow-[0_25px_50px_-12px_rgba(4,47,46,0.6)]', glowPrimary: 'shadow-[0_0_40px_rgba(20,184,166,0.3)]' },
    border: { default: 'border-teal-500/30', subtle: 'border-teal-500/10', active: 'border-teal-400' },
    typography: { fontFamilyTitle: 'Outfit, sans-serif', fontFamilyBody: 'Inter, sans-serif', fontFamilyMono: 'JetBrains Mono, monospace' },
    lighting: { ambientGlow: 'bg-teal-500/20', specularHighlightClass: 'bg-gradient-to-tr from-teal-400/20 to-transparent' },
  },
  observatory: {
    id: 'observatory',
    name: 'Observatory',
    description: 'Precision deep space navy with telemetry cyan and amber instrument readouts.',
    category: 'dark',
    bg: { canvas: 'bg-[#030712]', subtle: 'bg-[#0B0F19]' },
    surface: { primary: 'bg-[#0F172A]/90 backdrop-blur-md', secondary: 'bg-[#1E293B]', elevated: 'bg-[#334155]' },
    text: { primary: 'text-slate-100', secondary: 'text-slate-400', muted: 'text-slate-500', inverse: 'text-slate-950' },
    accent: { primary: 'text-cyan-400', secondary: 'text-amber-400', tertiary: 'text-blue-500' },
    state: { success: 'text-emerald-400', warning: 'text-amber-400', error: 'text-red-400', info: 'text-cyan-400' },
    focus: { ring: 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-slate-950' },
    shadow: { soft: 'shadow-[0_4px_20px_-2px_rgba(6,182,212,0.2)]', deep: 'shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)]', glowPrimary: 'shadow-[0_0_35px_rgba(6,182,212,0.3)]' },
    border: { default: 'border-cyan-500/30', subtle: 'border-slate-800', active: 'border-cyan-400' },
    typography: { fontFamilyTitle: 'Share Tech Mono, monospace', fontFamilyBody: 'Inter, sans-serif', fontFamilyMono: 'Share Tech Mono, monospace' },
    lighting: { ambientGlow: 'bg-cyan-500/10', specularHighlightClass: 'bg-gradient-to-tr from-cyan-400/20 to-transparent' },
  },
  laboratory: {
    id: 'laboratory',
    name: 'Laboratory',
    description: 'Clean clinical white and slate canvas with precise grid lines and blue scientific accents.',
    category: 'light',
    bg: { canvas: 'bg-[#F8FAFC]', subtle: 'bg-[#F1F5F9]' },
    surface: { primary: 'bg-white border border-slate-200/80 shadow-sm', secondary: 'bg-slate-100', elevated: 'bg-white shadow-md' },
    text: { primary: 'text-slate-900', secondary: 'text-slate-600', muted: 'text-slate-400', inverse: 'text-white' },
    accent: { primary: 'text-blue-600', secondary: 'text-indigo-600', tertiary: 'text-sky-500' },
    state: { success: 'text-emerald-600', warning: 'text-amber-600', error: 'text-rose-600', info: 'text-blue-600' },
    focus: { ring: 'ring-2 ring-blue-600 ring-offset-2 ring-offset-white' },
    shadow: { soft: 'shadow-[0_4px_12px_rgba(0,0,0,0.05)]', deep: 'shadow-[0_20px_30px_-10px_rgba(0,0,0,0.1)]', glowPrimary: 'shadow-[0_0_20px_rgba(37,99,235,0.15)]' },
    border: { default: 'border-slate-300', subtle: 'border-slate-200', active: 'border-blue-600' },
    typography: { fontFamilyTitle: 'Inter, sans-serif', fontFamilyBody: 'Inter, sans-serif', fontFamilyMono: 'JetBrains Mono, monospace' },
    lighting: { ambientGlow: 'bg-blue-500/5', specularHighlightClass: 'bg-gradient-to-tr from-white to-transparent' },
  },
  quantum: {
    id: 'quantum',
    name: 'Quantum',
    description: 'Cosmic deep purple and indigo backdrop with energetic violet and magenta pulses.',
    category: 'dark',
    bg: { canvas: 'bg-[#0F071F]', subtle: 'bg-[#180E2E]' },
    surface: { primary: 'bg-[#221342]/90 backdrop-blur-2xl', secondary: 'bg-[#2E1A5B]', elevated: 'bg-[#3D237A]' },
    text: { primary: 'text-purple-50', secondary: 'text-purple-200/70', muted: 'text-purple-400/50', inverse: 'text-purple-950' },
    accent: { primary: 'text-fuchsia-400', secondary: 'text-violet-400', tertiary: 'text-pink-400' },
    state: { success: 'text-emerald-400', warning: 'text-amber-400', error: 'text-rose-400', info: 'text-fuchsia-400' },
    focus: { ring: 'ring-2 ring-fuchsia-400 ring-offset-2 ring-offset-[#0F071F]' },
    shadow: { soft: 'shadow-[0_4px_25px_-2px_rgba(217,70,239,0.2)]', deep: 'shadow-[0_25px_50px_-12px_rgba(15,7,31,0.8)]', glowPrimary: 'shadow-[0_0_40px_rgba(217,70,239,0.35)]' },
    border: { default: 'border-fuchsia-500/30', subtle: 'border-purple-900', active: 'border-fuchsia-400' },
    typography: { fontFamilyTitle: 'Outfit, sans-serif', fontFamilyBody: 'Inter, sans-serif', fontFamilyMono: 'JetBrains Mono, monospace' },
    lighting: { ambientGlow: 'bg-fuchsia-500/20', specularHighlightClass: 'bg-gradient-to-tr from-fuchsia-400/20 to-transparent' },
  },
  'neon-noir': {
    id: 'neon-noir',
    name: 'Neon Noir',
    description: 'Dark cyber-alley neon purple, hot pink, and turquoise glow aesthetics.',
    category: 'dark',
    bg: { canvas: 'bg-[#090214]', subtle: 'bg-[#130526]' },
    surface: { primary: 'bg-[#1A0933]/95 backdrop-blur-xl border border-[#FF007F]/40', secondary: 'bg-[#260D4D]', elevated: 'bg-[#331266]' },
    text: { primary: 'text-[#00FFCC]', secondary: 'text-[#FF80BF]', muted: 'text-[#804060]', inverse: 'text-black' },
    accent: { primary: 'text-[#FF007F]', secondary: 'text-[#00FFCC]', tertiary: 'text-[#FFFF00]' },
    state: { success: 'text-[#00FFCC]', warning: 'text-[#FFFF00]', error: 'text-[#FF0033]', info: 'text-[#00CCCC]' },
    focus: { ring: 'ring-2 ring-[#FF007F] ring-offset-2 ring-offset-[#090214]' },
    shadow: { soft: 'shadow-[0_0_20px_rgba(255,0,127,0.3)]', deep: 'shadow-[0_0_50px_rgba(255,0,127,0.5)]', glowPrimary: 'shadow-[0_0_35px_rgba(0,255,204,0.4)]' },
    border: { default: 'border-[#FF007F]/50', subtle: 'border-purple-900/55', active: 'border-[#00FFCC]' },
    typography: { fontFamilyTitle: 'VT323, monospace', fontFamilyBody: 'Share Tech Mono, monospace', fontFamilyMono: 'VT323, monospace' },
    lighting: { ambientGlow: 'bg-pink-600/20', specularHighlightClass: 'bg-gradient-to-tr from-cyan-400/30 to-transparent' },
  },
  crystal: {
    id: 'crystal',
    name: 'Crystal',
    description: 'Pristine translucent frosted glass over soft multi-hued illumination gradients.',
    category: 'translucent',
    bg: { canvas: 'bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-950', subtle: 'bg-white/5' },
    surface: { primary: 'bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]', secondary: 'bg-white/5', elevated: 'bg-white/15 backdrop-blur-3xl' },
    text: { primary: 'text-white', secondary: 'text-white/80', muted: 'text-white/50', inverse: 'text-slate-900' },
    accent: { primary: 'text-sky-300', secondary: 'text-purple-300', tertiary: 'text-pink-300' },
    state: { success: 'text-emerald-300', warning: 'text-amber-300', error: 'text-rose-300', info: 'text-sky-300' },
    focus: { ring: 'ring-2 ring-white/60 ring-offset-2 ring-offset-indigo-950' },
    shadow: { soft: 'shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]', deep: 'shadow-[0_20px_50px_rgba(0,0,0,0.5)]', glowPrimary: 'shadow-[0_0_40px_rgba(255,255,255,0.2)]' },
    border: { default: 'border-white/20', subtle: 'border-white/10', active: 'border-white/50' },
    typography: { fontFamilyTitle: 'Outfit, sans-serif', fontFamilyBody: 'Inter, sans-serif', fontFamilyMono: 'JetBrains Mono, monospace' },
    lighting: { ambientGlow: 'bg-white/10', specularHighlightClass: 'bg-gradient-to-tr from-white/30 to-transparent' },
  },
  'deep-space': {
    id: 'deep-space',
    name: 'Deep Space',
    description: 'Absolute abyss black background with stellar blue and pure starlight white.',
    category: 'dark',
    bg: { canvas: 'bg-[#000002]', subtle: 'bg-[#05050A]' },
    surface: { primary: 'bg-[#0A0A12]/90 backdrop-blur-2xl', secondary: 'bg-[#121220]', elevated: 'bg-[#1A1A30]' },
    text: { primary: 'text-slate-100', secondary: 'text-slate-400', muted: 'text-slate-600', inverse: 'text-black' },
    accent: { primary: 'text-blue-400', secondary: 'text-indigo-400', tertiary: 'text-sky-300' },
    state: { success: 'text-emerald-400', warning: 'text-amber-400', error: 'text-red-400', info: 'text-blue-400' },
    focus: { ring: 'ring-2 ring-blue-500 ring-offset-2 ring-offset-[#000002]' },
    shadow: { soft: 'shadow-[0_4px_25px_-2px_rgba(59,130,246,0.15)]', deep: 'shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9)]', glowPrimary: 'shadow-[0_0_35px_rgba(59,130,246,0.25)]' },
    border: { default: 'border-blue-500/20', subtle: 'border-slate-900', active: 'border-blue-400' },
    typography: { fontFamilyTitle: 'Outfit, sans-serif', fontFamilyBody: 'Inter, sans-serif', fontFamilyMono: 'JetBrains Mono, monospace' },
    lighting: { ambientGlow: 'bg-blue-600/10', specularHighlightClass: 'bg-gradient-to-tr from-blue-400/15 to-transparent' },
  },
  command: {
    id: 'command',
    name: 'Command',
    description: 'Military-grade matte dark grey with tactical amber and steel accents.',
    category: 'dark',
    bg: { canvas: 'bg-[#121214]', subtle: 'bg-[#1A1A1D]' },
    surface: { primary: 'bg-[#202024]/95 border border-zinc-700/60', secondary: 'bg-[#2A2A30]', elevated: 'bg-[#36363D]' },
    text: { primary: 'text-zinc-100', secondary: 'text-zinc-400', muted: 'text-zinc-500', inverse: 'text-zinc-950' },
    accent: { primary: 'text-amber-500', secondary: 'text-yellow-400', tertiary: 'text-orange-500' },
    state: { success: 'text-emerald-500', warning: 'text-amber-500', error: 'text-red-500', info: 'text-sky-500' },
    focus: { ring: 'ring-2 ring-amber-500 ring-offset-2 ring-offset-[#121214]' },
    shadow: { soft: 'shadow-[0_4px_16px_rgba(0,0,0,0.4)]', deep: 'shadow-[0_20px_40px_rgba(0,0,0,0.7)]', glowPrimary: 'shadow-[0_0_25px_rgba(245,158,11,0.2)]' },
    border: { default: 'border-zinc-700', subtle: 'border-zinc-800', active: 'border-amber-500' },
    typography: { fontFamilyTitle: 'Space Grotesk, sans-serif', fontFamilyBody: 'Inter, sans-serif', fontFamilyMono: 'JetBrains Mono, monospace' },
    lighting: { ambientGlow: 'bg-amber-500/10', specularHighlightClass: 'bg-gradient-to-tr from-amber-500/15 to-transparent' },
  },
  tactile: {
    id: 'tactile',
    name: 'Tactile',
    description: 'Warm paper and stamped zinc mechanical instrument feel with debossed edges.',
    category: 'light',
    bg: { canvas: 'bg-[#E4E4E7]', subtle: 'bg-[#D4D4D8]' },
    surface: { primary: 'bg-[#F4F4F5] border-t border-l border-white shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),0_8px_16px_rgba(0,0,0,0.1)]', secondary: 'bg-[#E4E4E7]', elevated: 'bg-white shadow-lg' },
    text: { primary: 'text-zinc-900', secondary: 'text-zinc-600', muted: 'text-zinc-500', inverse: 'text-white' },
    accent: { primary: 'text-orange-600', secondary: 'text-amber-600', tertiary: 'text-zinc-900' },
    state: { success: 'text-emerald-600', warning: 'text-amber-600', error: 'text-rose-600', info: 'text-blue-600' },
    focus: { ring: 'ring-2 ring-orange-600 ring-offset-2 ring-offset-[#E4E4E7]' },
    shadow: { soft: 'shadow-[0_4px_12px_rgba(0,0,0,0.1)]', deep: 'shadow-[0_15px_30px_rgba(0,0,0,0.2)]', glowPrimary: 'shadow-[0_0_20px_rgba(234,88,12,0.15)]' },
    border: { default: 'border-zinc-400', subtle: 'border-zinc-300', active: 'border-orange-600' },
    typography: { fontFamilyTitle: 'Space Grotesk, sans-serif', fontFamilyBody: 'Inter, sans-serif', fontFamilyMono: 'JetBrains Mono, monospace' },
    lighting: { ambientGlow: 'bg-orange-500/10', specularHighlightClass: 'bg-gradient-to-tr from-white to-transparent' },
  },
  companion: {
    id: 'companion',
    name: 'Companion',
    description: 'Friendly warm indigo and soft slate AI character assistant workspace.',
    category: 'dark',
    bg: { canvas: 'bg-[#0B0F19]', subtle: 'bg-[#111827]' },
    surface: { primary: 'bg-gradient-to-b from-slate-900/90 to-indigo-950/90 backdrop-blur-xl border border-indigo-500/30 rounded-2xl', secondary: 'bg-indigo-950/40', elevated: 'bg-indigo-900/50' },
    text: { primary: 'text-indigo-50', secondary: 'text-indigo-200/80', muted: 'text-indigo-400/50', inverse: 'text-indigo-950' },
    accent: { primary: 'text-indigo-400', secondary: 'text-purple-400', tertiary: 'text-sky-400' },
    state: { success: 'text-emerald-400', warning: 'text-amber-400', error: 'text-rose-400', info: 'text-indigo-400' },
    focus: { ring: 'ring-2 ring-indigo-400 ring-offset-2 ring-offset-[#0B0F19]' },
    shadow: { soft: 'shadow-[0_4px_25px_-2px_rgba(99,102,241,0.2)]', deep: 'shadow-[0_25px_50px_-12px_rgba(11,15,25,0.8)]', glowPrimary: 'shadow-[0_0_35px_rgba(99,102,241,0.3)]' },
    border: { default: 'border-indigo-500/30', subtle: 'border-slate-800', active: 'border-indigo-400' },
    typography: { fontFamilyTitle: 'Outfit, sans-serif', fontFamilyBody: 'Inter, sans-serif', fontFamilyMono: 'JetBrains Mono, monospace' },
    lighting: { ambientGlow: 'bg-indigo-500/20', specularHighlightClass: 'bg-gradient-to-tr from-indigo-400/20 to-transparent' },
  },
  'minimal-cinema': {
    id: 'minimal-cinema',
    name: 'Minimal Cinema',
    description: 'Pure high-contrast black and white editorial serif minimalism. Clean, sophisticated, timeless.',
    category: 'editorial',
    bg: { canvas: 'bg-[#000000]', subtle: 'bg-[#0A0A0A]' },
    surface: { primary: 'bg-[#111111] border border-white/15', secondary: 'bg-[#1A1A1A]', elevated: 'bg-[#222222]' },
    text: { primary: 'text-white', secondary: 'text-zinc-400', muted: 'text-zinc-600', inverse: 'text-black' },
    accent: { primary: 'text-white', secondary: 'text-zinc-300', tertiary: 'text-zinc-500' },
    state: { success: 'text-emerald-400', warning: 'text-amber-400', error: 'text-red-400', info: 'text-white' },
    focus: { ring: 'ring-2 ring-white ring-offset-2 ring-offset-black' },
    shadow: { soft: 'shadow-[0_4px_20px_rgba(255,255,255,0.05)]', deep: 'shadow-[0_20px_50px_rgba(0,0,0,0.9)]', glowPrimary: 'shadow-[0_0_30px_rgba(255,255,255,0.1)]' },
    border: { default: 'border-white/20', subtle: 'border-white/10', active: 'border-white' },
    typography: { fontFamilyTitle: 'Playfair Display, serif', fontFamilyBody: 'Lora, serif', fontFamilyMono: 'JetBrains Mono, monospace' },
    lighting: { ambientGlow: 'bg-white/5', specularHighlightClass: 'bg-gradient-to-tr from-white/15 to-transparent' },
  },
};
