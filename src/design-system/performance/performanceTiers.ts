/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PerformanceTierConfig, PerformanceTierId } from './types';

export const PERFORMANCE_TIERS: Record<PerformanceTierId, PerformanceTierConfig> = {
  'tier1-low': {
    id: 'tier1-low',
    tierNumber: 1,
    name: 'Tier 1 Low (Eco / Battery Saver)',
    shortLabel: 'Tier 1 Low',
    tagline: 'Minimal blur, zero or few particles, simple transitions',
    description:
      'Engineered for low-spec hardware, mobile battery saving, or ultra-fast rendering. Bypasses expensive backdrop filters, heavy box shadows, 3D matrices, and continuous RAF loops.',
    targetDevice: 'Low-end mobile, battery saver mode, integrated graphics, low-spec VMs',
    blur: {
      level: 'minimal',
      backdropBlurClass: 'backdrop-blur-none bg-zinc-900/95',
      maxBlurPx: 0,
      multiLayerGlass: false,
    },
    particles: {
      enabled: false,
      maxParticles: 0,
      physicsSimulation: false,
      collisionDetection: false,
      velocityTrails: false,
    },
    motion: {
      transitionType: 'simple-css',
      durationMultiplier: 0.8,
      springStiffness: 400,
      springDamping: 35,
      layoutAnimation: false,
      continuousRafLoops: false,
    },
    lighting: {
      specularHighlight: false,
      dynamicSpotlight: false,
      volumetricBloom: false,
      causticGlow: false,
      glowShadowClass: 'shadow-none border border-white/10',
    },
    spatial3D: {
      enabled: false,
      perspectivePx: 0,
      maxTiltAngleDeg: 0,
      zLayerSeparationPx: 0,
      render3DMeshGeometry: false,
    },
    budget: {
      targetFps: 60,
      maxDomNodes: 150,
      gpuLoadTarget: 'ultra-low',
    },
  },

  'tier2-standard': {
    id: 'tier2-standard',
    tierNumber: 2,
    name: 'Tier 2 Standard (Balanced)',
    shortLabel: 'Tier 2 Standard',
    tagline: 'Normal glass, moderate effects, standard motion',
    description:
      'The balanced default for mainstream laptops, modern tablets, and standard desktop browsers. Provides authentic frosted glass, smooth spring physics, subtle ambient glow, and conservative particle counts.',
    targetDevice: 'Standard laptops, modern smartphones, iPad/tablets, desktop browsers',
    blur: {
      level: 'normal',
      backdropBlurClass: 'backdrop-blur-md bg-zinc-900/80',
      maxBlurPx: 12,
      multiLayerGlass: false,
    },
    particles: {
      enabled: true,
      maxParticles: 15,
      physicsSimulation: false,
      collisionDetection: false,
      velocityTrails: false,
    },
    motion: {
      transitionType: 'standard-spring',
      durationMultiplier: 1.0,
      springStiffness: 260,
      springDamping: 20,
      layoutAnimation: true,
      continuousRafLoops: false, // strictly on-demand
    },
    lighting: {
      specularHighlight: true,
      dynamicSpotlight: false,
      volumetricBloom: false,
      causticGlow: false,
      glowShadowClass: 'shadow-lg shadow-cyan-500/10 border border-white/15',
    },
    spatial3D: {
      enabled: false,
      perspectivePx: 1000,
      maxTiltAngleDeg: 5,
      zLayerSeparationPx: 10,
      render3DMeshGeometry: false,
    },
    budget: {
      targetFps: 60,
      maxDomNodes: 400,
      gpuLoadTarget: 'moderate',
    },
  },

  'tier3-high': {
    id: 'tier3-high',
    tierNumber: 3,
    name: 'Tier 3 High (Ultra Fidelity)',
    shortLabel: 'Tier 3 High',
    tagline: 'Advanced lighting, rich particles, spatial 3D effects',
    description:
      'Uncompromising visual fidelity for high-performance workstations, discrete GPUs, and pro displays. Employs volumetric bloom, 6-DOF parallax 3D tilt, interactive 60+ particle physics, specular light tracking, and real-time geometry.',
    targetDevice: 'Discrete GPUs (RTX/Apple M-series Pro/Max), high-refresh 120Hz/144Hz gaming/workstation rigs',
    blur: {
      level: 'advanced',
      backdropBlurClass: 'backdrop-blur-2xl bg-zinc-900/60',
      maxBlurPx: 32,
      multiLayerGlass: true,
    },
    particles: {
      enabled: true,
      maxParticles: 60,
      physicsSimulation: true,
      collisionDetection: true,
      velocityTrails: true,
    },
    motion: {
      transitionType: 'advanced-spring-physics',
      durationMultiplier: 1.2,
      springStiffness: 220,
      springDamping: 15,
      layoutAnimation: true,
      continuousRafLoops: true, // with idle pausing guard
    },
    lighting: {
      specularHighlight: true,
      dynamicSpotlight: true,
      volumetricBloom: true,
      causticGlow: true,
      glowShadowClass: 'shadow-2xl shadow-cyan-500/25 border border-cyan-500/40 ring-1 ring-cyan-400/20',
    },
    spatial3D: {
      enabled: true,
      perspectivePx: 1000,
      maxTiltAngleDeg: 18,
      zLayerSeparationPx: 30,
      render3DMeshGeometry: true,
    },
    budget: {
      targetFps: 120,
      maxDomNodes: 1200,
      gpuLoadTarget: 'high-fidelity',
    },
  },
};

export const DEFAULT_PERFORMANCE_TIER: PerformanceTierId = 'tier2-standard';

export function getTierConfig(tier: PerformanceTierId): PerformanceTierConfig {
  return PERFORMANCE_TIERS[tier] || PERFORMANCE_TIERS['tier2-standard'];
}
