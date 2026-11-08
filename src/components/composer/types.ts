/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type VisualStyleId =
  | 'obsidian'
  | 'frosted-glass'
  | 'cyber-neon'
  | 'clean-editorial'
  | 'holographic-quartz'
  | 'titanium-brushed'
  | 'velvet-void'
  | 'claymorphic-soft'
  | 'minimalist-mono'
  | 'solar-flare';

export type MotionProfileId =
  | 'spring-physics'
  | 'liquid-inertia'
  | 'snappy-mechanical'
  | 'glitch-temporal'
  | 'smooth-sine'
  | 'hyper-kinetic'
  | 'zero-gravity';

export type InteractionPhysicsId =
  | 'magnetic-pull'
  | 'tilt-parallax'
  | 'ripple-burst'
  | 'elastic-stretch'
  | 'direct-drag'
  | 'orbital-hover'
  | 'micro-tick';

export type LightingGlowId =
  | 'reactive-edge'
  | 'volumetric-bloom'
  | 'spotlight-tracker'
  | 'ambient-specular'
  | 'rim-glow'
  | 'sunbeam-caustic'
  | 'neon-strobe'
  | 'no-lighting';

export type SoundSynthesizerId =
  | 'crystal-sound'
  | 'cybernetic-click'
  | 'analog-thud'
  | 'harmonic-hum'
  | 'minimal-pip'
  | 'futuristic-chord'
  | 'sub-bass-pulse'
  | 'mute';

export type HapticFeedbackId =
  | 'soft-haptic'
  | 'crisp-snap'
  | 'double-pulse'
  | 'heavy-impact'
  | 'tactile-tick'
  | 'sub-bass-tremor'
  | 'none';

export type TypographySystemId =
  | 'cinematic-serif'
  | 'mono-tech'
  | 'modern-neo-grotesque'
  | 'editorial-flare'
  | 'brutalist-sans'
  | 'futuristic-display';

export type ThemePaletteId =
  | 'obsidian-void'
  | 'deep-space-cyan'
  | 'solar-flare-amber'
  | 'emerald-matrix'
  | 'aurora-violet'
  | 'monochromatic-platinum'
  | 'warm-editorial-sand'
  | 'sunset-cyberpunk';

export type IntensityLevel = 'subtle' | 'balanced' | 'expressive' | 'extreme';

export type PerformanceTier = 'ultra' | 'balanced' | 'eco';

export interface VisualOption {
  id: VisualStyleId;
  name: string;
  description: string;
  tagline: string;
  surfaceClass: string;
  borderClass: string;
  glowClass: string;
  backdropFilter: string;
  previewGradient: string;
  refractionIndex: number;
}

export interface MotionOption {
  id: MotionProfileId;
  name: string;
  description: string;
  tagline: string;
  stiffness: number;
  damping: number;
  mass: number;
  duration: number;
  ease: string;
  hoverScale: number;
  tapScale: number;
  badge: string;
}

export interface InteractionOption {
  id: InteractionPhysicsId;
  name: string;
  description: string;
  tagline: string;
  magneticStrength: number;
  tiltMaxAngle: number;
  elasticMultiplier: number;
  cursorEffect: string;
  gestureFeedback: string;
}

export interface LightingOption {
  id: LightingGlowId;
  name: string;
  description: string;
  tagline: string;
  glowSpread: string;
  glowColor: string;
  lightTracking: boolean;
  edgeTracing: boolean;
  specularSheen: boolean;
}

export interface SoundOption {
  id: SoundSynthesizerId;
  name: string;
  description: string;
  tagline: string;
  soundType: 'sine' | 'triangle' | 'square' | 'sawtooth' | 'noise' | 'chord';
  baseFreq: number;
  decayTime: number;
  harmonicCount: number;
  previewChime: string;
}

export interface HapticOption {
  id: HapticFeedbackId;
  name: string;
  description: string;
  tagline: string;
  vibratePattern: number[];
  intensityStrength: number;
  tactileSensation: string;
}

export interface TypographyOption {
  id: TypographySystemId;
  name: string;
  description: string;
  tagline: string;
  titleFont: string;
  bodyFont: string;
  monoFont: string;
  titleTracking: string;
  titleWeight: string;
}

export interface ThemeOption {
  id: ThemePaletteId;
  name: string;
  description: string;
  tagline: string;
  bgCanvas: string;
  surfacePrimary: string;
  surfaceSecondary: string;
  borderDefault: string;
  accentPrimary: string;
  accentSecondary: string;
  textPrimary: string;
  textSecondary: string;
  accentHex: string;
  secondaryHex: string;
  previewSwatch: string;
}

export interface ExperienceRecipe {
  id: string;
  name: string;
  description: string;
  visual: VisualStyleId;
  motion: MotionProfileId;
  interaction: InteractionPhysicsId;
  lighting: LightingGlowId;
  sound: SoundSynthesizerId;
  haptic: HapticFeedbackId;
  typography: TypographySystemId;
  theme: ThemePaletteId;
  intensity: IntensityLevel;
  performanceTier: PerformanceTier;
  tags: string[];
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
  customNotes?: string;
}

export interface ConflictWarning {
  id: string;
  severity: 'warning' | 'info' | 'critical';
  title: string;
  message: string;
  affectedFields: Array<keyof ExperienceRecipe>;
  autoFixProposal?: {
    label: string;
    patch: Partial<ExperienceRecipe>;
  };
}
