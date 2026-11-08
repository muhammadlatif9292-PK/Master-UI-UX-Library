/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PerformanceTierId = 'tier1-low' | 'tier2-standard' | 'tier3-high';

export interface PerformanceTierConfig {
  id: PerformanceTierId;
  tierNumber: 1 | 2 | 3;
  name: string;
  shortLabel: string;
  tagline: string;
  description: string;
  targetDevice: string;
  
  // Blur & Glass Features
  blur: {
    level: 'none' | 'minimal' | 'normal' | 'advanced';
    backdropBlurClass: string;
    maxBlurPx: number;
    multiLayerGlass: boolean;
  };

  // Particles & Particle Physics
  particles: {
    enabled: boolean;
    maxParticles: number;
    physicsSimulation: boolean;
    collisionDetection: boolean;
    velocityTrails: boolean;
  };

  // Motion & Transitions
  motion: {
    transitionType: 'simple-css' | 'standard-spring' | 'advanced-spring-physics';
    durationMultiplier: number;
    springStiffness: number;
    springDamping: number;
    layoutAnimation: boolean;
    continuousRafLoops: boolean;
  };

  // Lighting & Bloom
  lighting: {
    specularHighlight: boolean;
    dynamicSpotlight: boolean;
    volumetricBloom: boolean;
    causticGlow: boolean;
    glowShadowClass: string;
  };

  // Spatial & 3D Perspective
  spatial3D: {
    enabled: boolean;
    perspectivePx: number;
    maxTiltAngleDeg: number;
    zLayerSeparationPx: number;
    render3DMeshGeometry: boolean;
  };

  // Resource & Performance Budget
  budget: {
    targetFps: 60 | 120;
    maxDomNodes: number;
    gpuLoadTarget: 'ultra-low' | 'moderate' | 'high-fidelity';
  };
}

export interface ExpensiveEffectsRegistry {
  backdropFiltersCount: number;
  canvasRafLoopsCount: number;
  active3DTransformsCount: number;
  particleEnginesCount: number;
  shadowFiltersCount: number;
}

export interface PerformanceTelemetry {
  fps: number;
  frameTimeMs: number;
  droppedFramesCount: number;
  isIdlePaused: boolean;
  isTabHidden: boolean;
  activeEffects: ExpensiveEffectsRegistry;
  recommendedTier: PerformanceTierId;
}

export interface TierFallbackProps<T = any> {
  low: T;
  standard?: T;
  high?: T;
}
