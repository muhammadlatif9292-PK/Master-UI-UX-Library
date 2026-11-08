/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface AccessibilitySettings {
  // Motion & Vestibular Safety
  reducedMotion: boolean;
  
  // Visual Perception & Surface Rendering
  reducedTransparency: boolean;
  reducedEffects: boolean;
  highContrast: boolean;
  largeText: boolean;
  nonColorIndicators: boolean;
  
  // Sensory & Modality Channels
  soundOff: boolean;
  hapticOff: boolean;
  
  // Keyboard & Focus Operability
  keyboardNavigation: boolean;
  visibleFocus: boolean;
  
  // Screen Reader & Semantics
  screenReaderLabels: boolean;
  semanticStates: boolean;

  // Visual Simulation Lenses
  colorVisionFilter: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';
  showTouchTargetBoundaries: boolean;
  showFocusOrderOverlay: boolean;
  showContrastRatios: boolean;
  showScreenReaderOverlay: boolean;
}

export type AccessibilityPresetId =
  | 'default'
  | 'wcag-aaa'
  | 'vestibular-safe'
  | 'low-vision'
  | 'motor-keyboard'
  | 'silent-tactile-free'
  | 'screen-reader-audit';

export interface AccessibilityPreset {
  id: AccessibilityPresetId;
  name: string;
  badge: string;
  description: string;
  iconName: string;
  settings: Partial<AccessibilitySettings>;
}

export interface ContrastResult {
  fgColor: string;
  bgColor: string;
  ratio: number;
  normalTextAA: boolean;
  normalTextAAA: boolean;
  largeTextAA: boolean;
  largeTextAAA: boolean;
  uiComponentAA: boolean;
}

export interface TouchTargetEvaluation {
  id: string;
  elementName: string;
  width: number;
  height: number;
  meetsMin24: boolean;
  meetsWCAG44: boolean;
  meetsStrict48: boolean;
  recommendation: string;
}

export interface AuditIssue {
  id: string;
  category: 'contrast' | 'focus' | 'keyboard' | 'touch-targets' | 'state-communication' | 'motion' | 'sound-dependence';
  severity: 'critical' | 'serious' | 'moderate' | 'compliant';
  wcagCriterion: string;
  title: string;
  description: string;
  affectedComponent: string;
  remediation: string;
  autoFixAvailable: boolean;
  autoFixAction?: () => void;
}

export interface LiveAnnouncement {
  id: string;
  message: string;
  politeness: 'polite' | 'assertive';
  timestamp: string;
}
