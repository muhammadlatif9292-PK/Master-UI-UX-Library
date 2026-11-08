/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ExperienceRecipe, ConflictWarning } from './types';

export function analyzeRecipeConflicts(recipe: ExperienceRecipe): ConflictWarning[] {
  const warnings: ConflictWarning[] = [];

  // 1. Extreme Intensity + Eco Performance Tier (Heavy 3D/Motion on low tier)
  if (recipe.intensity === 'extreme' && recipe.performanceTier === 'eco') {
    warnings.push({
      id: 'extreme-intensity-eco-tier',
      severity: 'critical',
      title: 'Heavy Motion / 3D Overhead on Low Performance Tier',
      message: '100% extreme intensity (heavy particle grids and high-frequency spring physics) degrades rendering performance on Eco (30fps) tier devices.',
      affectedFields: ['intensity', 'performanceTier'],
      autoFixProposal: {
        label: 'Auto-Harmonize: Upgrade to Ultra Tier (120fps)',
        patch: { performanceTier: 'ultra' },
      },
    });
  }

  // 2. Heavy 3D Material / Physics on Low Performance Tier
  if ((recipe.visual === 'claymorphic-soft' || recipe.visual === 'holographic-quartz') && recipe.performanceTier === 'eco') {
    warnings.push({
      id: 'heavy-3d-eco-tier',
      severity: 'critical',
      title: 'Heavy 3D Material Filter on Low Tier',
      message: 'Multi-layer claymorphic volumetric shadows and holographic quartz backdrop filters cause GPU frame drops on low-power devices.',
      affectedFields: ['visual', 'performanceTier'],
      autoFixProposal: {
        label: 'Auto-Harmonize: Set Frosted Glass Visual Style',
        patch: { visual: 'frosted-glass' },
      },
    });
  }

  // 3. Glitch Temporal / Hyper Kinetic Motion on Eco Performance Tier
  if ((recipe.motion === 'glitch-temporal' || recipe.motion === 'hyper-kinetic') && recipe.performanceTier === 'eco') {
    warnings.push({
      id: 'glitch-motion-eco-tier',
      severity: 'warning',
      title: 'High-Frequency Motion Overhead on Eco Tier',
      message: 'Glitch temporal keyframes and hyper-kinetic springs cause frame stutters on 30fps low-power devices.',
      affectedFields: ['motion', 'performanceTier'],
      autoFixProposal: {
        label: 'Auto-Harmonize: Switch to Snappy Mechanical Motion',
        patch: { motion: 'snappy-mechanical' },
      },
    });
  }

  // 4. Volumetric Bloom or Neon Strobe + Minimalist Mono Visual (Semantic / Material Conflict)
  if ((recipe.lighting === 'volumetric-bloom' || recipe.lighting === 'neon-strobe') && recipe.visual === 'minimalist-mono') {
    warnings.push({
      id: 'bloom-minimalist-conflict',
      severity: 'warning',
      title: 'Visual Material & Lighting Semantic Conflict',
      message: 'Volumetric color bloom overrides the stark high-contrast monastic purity of the Minimalist Mono aesthetic.',
      affectedFields: ['lighting', 'visual'],
      autoFixProposal: {
        label: 'Auto-Harmonize: Set Ambient Specular Lighting',
        patch: { lighting: 'ambient-specular' },
      },
    });
  }

  // 5. Cyber Neon Wireframe without Lighting
  if (recipe.lighting === 'no-lighting' && recipe.visual === 'cyber-neon') {
    warnings.push({
      id: 'cyber-neon-unlit',
      severity: 'info',
      title: 'Cyber HUD Without Luminescence',
      message: 'Cyber Neon wireframes look dramatically richer with Reactive Edge or Rim Glow lighting enabled.',
      affectedFields: ['lighting', 'visual'],
      autoFixProposal: {
        label: 'Auto-Harmonize: Enable Reactive Edge Light',
        patch: { lighting: 'reactive-edge' },
      },
    });
  }

  // 6. Heavy Impact Haptic + Muted Audio (Auditory / Tactile Asymmetry)
  if (recipe.haptic === 'heavy-impact' && recipe.sound === 'mute') {
    warnings.push({
      id: 'heavy-haptic-silent',
      severity: 'info',
      title: 'Auditory-Tactile Sound Mute Asymmetry',
      message: 'Heavy 60ms physical haptic impacts feel uncoordinated when audio synthesizer sound output is muted.',
      affectedFields: ['sound', 'haptic'],
      autoFixProposal: {
        label: 'Auto-Harmonize: Pair with Analog Thud Sound',
        patch: { sound: 'analog-thud' },
      },
    });
  }

  // 7. Reduced-Motion Override Conflict
  if (recipe.motion === 'hyper-kinetic' && recipe.intensity === 'extreme') {
    warnings.push({
      id: 'reduced-motion-accessibility-conflict',
      severity: 'warning',
      title: 'Accessibility Reduced-Motion Threshold Warning',
      message: 'Hyper-kinetic extreme motion exceeds WCAG 2.2 AAA vestibulation safety thresholds for sensitive users.',
      affectedFields: ['motion', 'intensity'],
      autoFixProposal: {
        label: 'Auto-Harmonize: Set Smooth Sine Motion Profile',
        patch: { motion: 'smooth-sine', intensity: 'balanced' },
      },
    });
  }

  return warnings;
}
