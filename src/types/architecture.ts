/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type DesignArchetype =
  | 'restrained-luxury'
  | 'cinematic-dark'
  | 'futuristic-cyber'
  | 'scientific-lab'
  | 'neumorphic-glass'
  | 'mechanical-tactile'
  | 'brutalist-grid'
  | 'editorial-serif'
  | 'minimal-monastic'
  | 'biomorphic-organic'
  | 'retro-computing'
  | 'ai-character';

export type ComponentFamilyId =
  | 'login'
  | 'navigation'
  | 'buttons'
  | 'cards'
  | 'inputs'
  | 'dashboards'
  | 'settings'
  | 'onboarding'
  | 'modals'
  | 'feedback'
  | 'ai-interfaces'
  | 'spatial-interfaces'
  | 'simulation-controls';

export type SemanticComponentState =
  | 'idle'
  | 'hover'
  | 'focus'
  | 'active'
  | 'submitting'
  | 'success'
  | 'error'
  | 'disabled'
  | 'loading';

export interface LightingRecipe {
  specularHighlight: boolean;
  ambientGlow: string;
  shadowDepth: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'cinematic' | 'brutalist';
  surfaceTexture?: 'matte' | 'glossy' | 'frosted' | 'brushed-metal' | 'carbon';
  blurLevel: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'backdrop-xl';
}

export interface StyleRecipe {
  id: string;
  name: string;
  archetype: DesignArchetype;
  wrapperClasses: string;
  surfaceClasses: string;
  lighting: LightingRecipe;
  borderClasses: string;
  typography: {
    fontFamily: string;
    titleClasses: string;
    bodyClasses: string;
    labelClasses: string;
    monoClasses: string;
  };
  inputClasses: {
    base: string;
    focus: string;
    error: string;
    success: string;
    placeholder: string;
  };
  buttonClasses: {
    primary: string;
    secondary: string;
    ghost: string;
  };
  badgeClasses: string;
  customDecorations?: string; // e.g., corner markers, scanlines, grid lines
}

export interface MotionRecipe {
  id: string;
  name: string;
  spring: {
    stiffness: number;
    damping: number;
    mass: number;
  };
  transitions: {
    duration: number;
    ease: number[] | string;
  };
  hoverScale: number;
  tapScale: number;
  layoutAnimation: boolean;
  entranceAnimation: 'fade' | 'slide-up' | 'scale-bounce' | 'glitch' | 'matrix-reveal' | 'luxury-wipe';
}

export interface SoundRecipe {
  enabled: boolean;
  soundType: 'none' | 'soft-click' | 'glass-tap' | 'laser-beep' | 'mechanical-thud' | 'chime' | 'retro-beep';
  frequency?: number;
  volume: number; // 0.0 to 1.0
}

export interface HapticRecipe {
  enabled: boolean;
  pattern: number | number[]; // Vibration API patterns
}

export interface InteractionRecipe {
  sound: SoundRecipe;
  haptic: HapticRecipe;
  cursorEffect?: 'none' | 'spotlight' | 'magnetic' | 'trail';
}

export interface AccessibilityProfile {
  wcagTarget: 'AA' | 'AAA';
  contrastRatio: number;
  screenReaderAnnouncement: string;
  keyboardNavigable: boolean;
  focusRingClasses: string;
  ariaLandmarks: string[];
}

export interface ResponsiveProfile {
  minWidthSupport: string;
  fluidScaling: boolean;
  touchTargetMinimumPx: number;
  breakpointBehavior: 'stack' | 'collapse' | 'scroll' | 'shrink';
}

export interface PerformanceProfile {
  tier: 'tier-1-ultra' | 'tier-2-standard' | 'tier-3-lightweight';
  estimatedFps: 60 | 120;
  domNodeComplexity: 'low' | 'medium' | 'high';
  gpuAccelerated: boolean;
  lazyLoadable: boolean;
}

export interface DependencyMetadata {
  packages: string[];
  tailwindPluginsNeeded: string[];
  requiredEnvVars?: string[];
}

export interface CodeArtifact {
  fileName: string;
  language: 'typescript' | 'tsx' | 'css';
  rawCode: string;
  dependencies: DependencyMetadata;
}

export interface AISpecification {
  promptTemplate: string;
  designIntent: string;
  colorHexCodes: string[];
  animationParameters: {
    stiffness: number;
    damping: number;
    entryStyle: string;
  };
  accessibilityNotes: string;
  suggestedPromptForCursor: string;
}

export interface ComponentVariant {
  id: string;
  name: string;
  familyId: ComponentFamilyId;
  archetype: DesignArchetype;
  description: string;
  version: string;
  author: string;
  createdAt: string;
  
  // Decoupled Recipes
  styleRecipe: StyleRecipe;
  motionRecipe: MotionRecipe;
  interactionRecipe: InteractionRecipe;
  
  // Profiles
  accessibility: AccessibilityProfile;
  responsive: ResponsiveProfile;
  performance: PerformanceProfile;
  
  // Artifacts & AI
  codeArtifact: CodeArtifact;
  aiSpecification: AISpecification;
  
  // Tags & Curation
  tags: string[];
  isFeatured?: boolean;
}

export interface ComponentDefinition {
  familyId: ComponentFamilyId;
  name: string;
  description: string;
  iconName: string;
  headlessStateInterface: string;
  defaultVariantId: string;
  variants: ComponentVariant[];
}

export interface CatalogEntry {
  id: string;
  componentFamily: ComponentFamilyId;
  variantCount: number;
  supportedArchetypes: DesignArchetype[];
  updatedAt: string;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  icon: string;
  variantIds: string[];
  createdAt: string;
  updatedAt: string;
}
