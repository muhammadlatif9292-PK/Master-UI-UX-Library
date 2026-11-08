/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ContrastResult, AuditIssue, TouchTargetEvaluation } from './types';

// Convert Hex to RGB
export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  let cleanHex = hex.replace('#', '').trim();
  if (cleanHex.length === 3) {
    cleanHex = cleanHex
      .split('')
      .map((c) => c + c)
      .join('');
  }
  const num = parseInt(cleanHex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

// Calculate Relative Luminance according to WCAG 2.2 (sRGB)
export function getRelativeLuminance(rgb: { r: number; g: number; b: number }): number {
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// Calculate WCAG Contrast Ratio between two colors
export function calculateContrastRatio(fgHex: string, bgHex: string): ContrastResult {
  const fgRgb = hexToRgb(fgHex);
  const bgRgb = hexToRgb(bgHex);
  const l1 = getRelativeLuminance(fgRgb);
  const l2 = getRelativeLuminance(bgRgb);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  const ratio = (lighter + 0.05) / (darker + 0.05);
  const roundedRatio = Math.round(ratio * 100) / 100;

  return {
    fgColor: fgHex,
    bgColor: bgHex,
    ratio: roundedRatio,
    normalTextAA: roundedRatio >= 4.5,
    normalTextAAA: roundedRatio >= 7.0,
    largeTextAA: roundedRatio >= 3.0,
    largeTextAAA: roundedRatio >= 4.5,
    uiComponentAA: roundedRatio >= 3.0,
  };
}

// Catalog of Design System Audit Items
export const CATALOG_AUDIT_DATA: AuditIssue[] = [
  // 1. Contrast
  {
    id: 'contrast-1',
    category: 'contrast',
    severity: 'compliant',
    wcagCriterion: 'WCAG 1.4.3 (Level AA) & 1.4.6 (Level AAA)',
    title: 'Text on High-Contrast Canvas (14.2:1)',
    description: 'High-contrast text tokens (#FFFFFF on #0A0A0B and #121215) exceed the 7:1 AAA strict contrast threshold.',
    affectedComponent: 'Typography, Cards, Dialogs, General Suite',
    remediation: 'Compliant by default. Keep secondary text above 4.5:1 ratio.',
    autoFixAvailable: false,
  },
  {
    id: 'contrast-2',
    category: 'contrast',
    severity: 'moderate',
    wcagCriterion: 'WCAG 1.4.11 Non-text Contrast (Level AA)',
    title: 'Subtle Ghost Borders on Dark Acrylic Glass (2.4:1)',
    description: 'Translucent borders (e.g. border-white/10) provide aesthetic depth but fall below the 3.0:1 requirement for functional state boundaries in low-light environments.',
    affectedComponent: 'Obsidian Glass Surface, Frosted Acrylic Controls',
    remediation: 'In High Contrast mode, replace alpha borders with solid 2px #38BDF8 or #FFFFFF borders.',
    autoFixAvailable: true,
  },
  {
    id: 'contrast-3',
    category: 'contrast',
    severity: 'compliant',
    wcagCriterion: 'WCAG 1.4.1 Use of Color (Level A)',
    title: 'Multi-Modal Status Indicators (Non-Color Dependent)',
    description: 'System statuses incorporate explicit icons (Check, AlertTriangle, XCircle, Info) alongside color fills so information is never conveyed by color alone.',
    affectedComponent: 'StatusBadges, FormValidation, ToastAlerts',
    remediation: 'Ensure text labels or ARIA descriptions accompany all iconography.',
    autoFixAvailable: false,
  },

  // 2. Focus
  {
    id: 'focus-1',
    category: 'focus',
    severity: 'serious',
    wcagCriterion: 'WCAG 2.4.7 Focus Visible (Level AA) & 2.4.11 Focus Appearance (Level AAA)',
    title: 'Default Browser Focus Ring Suppression',
    description: 'When focus-visible outlines are suppressed for purely mouse interactions, keyboard focus must provide a prominent 2px-3px contrast ring with offset.',
    affectedComponent: 'Buttons, Inputs, Tabs, Workflow Nodes',
    remediation: 'Apply global high-visibility focus indicator: focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 focus-visible:ring-4 focus-visible:ring-black.',
    autoFixAvailable: true,
  },
  {
    id: 'focus-2',
    category: 'focus',
    severity: 'compliant',
    wcagCriterion: 'WCAG 2.1.2 No Keyboard Trap (Level A)',
    title: 'Modal & Overlay Focus Trapping with Escape Dismissal',
    description: 'Dialogs, drawers, and modal sheets trap focus within their container and restore focus to the triggering element upon pressing Escape.',
    affectedComponent: 'CodeExporterModal, OverlayDialogs, CommandPalette',
    remediation: 'Maintain current focus restoration ref hooks.',
    autoFixAvailable: false,
  },

  // 3. Keyboard
  {
    id: 'keyboard-1',
    category: 'keyboard',
    severity: 'compliant',
    wcagCriterion: 'WCAG 2.1.1 Keyboard (Level A)',
    title: 'Dual Actuation for Custom Buttons & Interactive Cards',
    description: 'All interactive elements support actuation via both Enter key and Space key with appropriate keydown preventDefault handling.',
    affectedComponent: 'CustomActionButtons, Sliders, ToggleSwitches',
    remediation: 'Ensure roving tabindex is applied on radio groups and tablists.',
    autoFixAvailable: false,
  },
  {
    id: 'keyboard-2',
    category: 'keyboard',
    severity: 'moderate',
    wcagCriterion: 'WCAG 2.1.1 Keyboard Navigation for Spatial/Graph Nodes',
    title: 'Workflow Canvas Node Keyboard Traversal',
    description: 'Canvas drag-and-drop graphs require arrow-key node stepping and port-to-port keyboard wiring shortcuts.',
    affectedComponent: 'WorkflowNodeGraph, Spatial 3D Stage',
    remediation: 'Implement Tab roving and Arrow key spatial displacement vectors.',
    autoFixAvailable: true,
  },

  // 4. Touch Targets
  {
    id: 'touch-1',
    category: 'touch-targets',
    severity: 'serious',
    wcagCriterion: 'WCAG 2.5.8 Target Size (Minimum 24x24px Level AA, Enhanced 44x44px AAA)',
    title: 'Micro-Icon Action Triggers (< 32px)',
    description: 'Secondary icon-only triggers (such as favorite stars or delete buttons) measure 28x28px, which is under the optimal 44x44px touch target boundary for mobile/touch screens.',
    affectedComponent: 'PresetRecipeCards, TableActions, TabCloseIcons',
    remediation: 'Add transparent padding/hitbox expansion to maintain at least 44x44px touch bounding boxes without bloating visual density.',
    autoFixAvailable: true,
  },
  {
    id: 'touch-2',
    category: 'touch-targets',
    severity: 'compliant',
    wcagCriterion: 'WCAG 2.5.8 Target Size for Primary Actions',
    title: 'Primary Form Buttons & Controls (> 48px Height)',
    description: 'All primary buttons, input fields, select menus, and modal actions provide 44px to 52px touch bounding heights.',
    affectedComponent: 'PrimaryButtons, FormInputs, ComposerSliders',
    remediation: 'Compliant. Maintain touch-target standards across all responsive breakpoints.',
    autoFixAvailable: false,
  },

  // 5. State Communication
  {
    id: 'state-1',
    category: 'state-communication',
    severity: 'compliant',
    wcagCriterion: 'WCAG 4.1.2 Name, Role, Value (Level A)',
    title: 'Semantic ARIA Attributes on Toggle Controls',
    description: 'Toggle switches, favorite bookmarks, and expansion panels communicate their current binary state via aria-pressed, aria-checked, and aria-expanded.',
    affectedComponent: 'SwitchToggles, FilterChips, Accordions, RecipeComparator',
    remediation: 'Compliant. Continue auditing custom widgets.',
    autoFixAvailable: false,
  },
  {
    id: 'state-2',
    category: 'state-communication',
    severity: 'moderate',
    wcagCriterion: 'WCAG 4.1.3 Status Messages (Level AA)',
    title: 'Live Announcer for Procedural State Synthesizer',
    description: 'When synthesizing acoustic sounds or changing experience recipes, a polite aria-live region must announce the updated recipe name to screen readers.',
    affectedComponent: 'ExperienceComposerLab, AudioEngine, Notifications',
    remediation: 'Route status notifications through the central AriaLiveAnnouncer component.',
    autoFixAvailable: true,
  },

  // 6. Motion
  {
    id: 'motion-1',
    category: 'motion',
    severity: 'serious',
    wcagCriterion: 'WCAG 2.3.3 Animation from Interactions (Level AAA)',
    title: 'Physics Springs & Parallax 3D Tilt without Reduced Motion Override',
    description: 'Continuous 3D tilt tracking and spring recoil can trigger vestibular discomfort or nausea in motion-sensitive individuals.',
    affectedComponent: 'InteractiveLiveStage, SpatialStage, ParallaxCards',
    remediation: 'Enforce prefers-reduced-motion queries: clamp transform values to 0px, set spring duration to 0s, and substitute spring bounces with subtle instantaneous opacity transitions.',
    autoFixAvailable: true,
  },
  {
    id: 'motion-2',
    category: 'motion',
    severity: 'compliant',
    wcagCriterion: 'WCAG 2.3.1 Three Flashes or Below Threshold (Level A)',
    title: 'Strobe & Glitch Frequency Guard (< 2 Hz)',
    description: 'All glitch temporal profiles and cyber lighting pulses are constrained below 2 Hz to eliminate photo-epileptic seizure risks.',
    affectedComponent: 'GlitchProfiles, LaserEdgeTracer, CyberHUD',
    remediation: 'Compliant. Hard-lock maximum strobe pulse frequencies.',
    autoFixAvailable: false,
  },

  // 7. Sound & Multi-Sensory Dependence
  {
    id: 'sound-1',
    category: 'sound-dependence',
    severity: 'compliant',
    wcagCriterion: 'WCAG 1.3.3 Sensory Characteristics (Level A)',
    title: 'Audio-Visual Redundancy (Zero Sound Dependence)',
    description: 'Every synthesized tone (chimes, clicks, pips, chords) is accompanied by visible state changes, ripple animations, or toast indicators so no critical information depends on hearing.',
    affectedComponent: 'SoundLab, ExperienceComposerLab, FormSubmissions',
    remediation: 'Ensure haptic and visual cues function completely when sound is toggled off.',
    autoFixAvailable: false,
  },
  {
    id: 'sound-2',
    category: 'sound-dependence',
    severity: 'compliant',
    wcagCriterion: 'WCAG 1.4.2 Audio Control (Level A)',
    title: 'Explicit Audio Master Switch & No Autoplay',
    description: 'No background music or acoustic audio autoplays upon page load; all audio synthesis requires direct user interaction and can be instantly silenced via the master mute switch.',
    affectedComponent: 'AudioEngine, SoundSynthesizer',
    remediation: 'Compliant by design.',
    autoFixAvailable: false,
  },
];

// Calculate Scorecard Summary
export function calculateAuditScorecard(issues: AuditIssue[]) {
  const total = issues.length;
  const critical = issues.filter((i) => i.severity === 'critical').length;
  const serious = issues.filter((i) => i.severity === 'serious').length;
  const moderate = issues.filter((i) => i.severity === 'moderate').length;
  const compliant = issues.filter((i) => i.severity === 'compliant').length;

  const score = Math.round(((compliant * 1.0 + moderate * 0.7 + serious * 0.3) / total) * 100);

  return {
    total,
    critical,
    serious,
    moderate,
    compliant,
    score,
    wcagLevelEstimate: critical > 0 ? 'Failing Level A' : serious > 0 ? 'WCAG 2.2 Level A' : moderate > 0 ? 'WCAG 2.2 Level AA' : 'WCAG 2.2 Level AAA Compliant',
  };
}
