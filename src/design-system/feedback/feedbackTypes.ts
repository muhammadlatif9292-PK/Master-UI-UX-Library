/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type FeedbackType =
  | 'toast'
  | 'snackbar'
  | 'banner'
  | 'alert'
  | 'tooltip'
  | 'badge'
  | 'progress'
  | 'loader'
  | 'skeleton'
  | 'empty'
  | 'error'
  | 'warning'
  | 'success'
  | 'confirmation'
  | 'undo';

export type FeedbackVisualLanguage =
  | 'glass'        // Spatial Glass / Translucent Refraction
  | 'minimal'      // Swiss Minimal / High Contrast Dark & Light
  | 'cyber'        // Cybernetic Telemetry / High-Tech Neon Accent
  | 'brutalist'    // Neo-Brutalist / Bold Graphic Contrast & Clean Insets
  | 'companion'    // Soft Organic Companion / Friendly Micro-reassurance
  | 'editorial';   // Editorial Serene / Understated Elegance

export type StateVariant = 'info' | 'success' | 'warning' | 'error' | 'neutral';

export type ProgressMode = 'determinate' | 'indeterminate' | 'stepped' | 'circular' | 'segmented';

export type SuccessAnimationType =
  | 'subtle-glow'
  | 'spring-confirm'
  | 'morph'
  | 'restrained-particles'
  | 'character-reaction'
  | 'harmonic-chime';

export interface FeedbackCatalogItem {
  id: string;
  component: string;
  name: string;
  category: 'notification' | 'inline' | 'progress' | 'structural' | 'action';
  description: string;
  supportedLanguages: FeedbackVisualLanguage[];
  supportedSuccessBehaviors?: SuccessAnimationType[];
  tags: string[];
  keyHighlights: string[];
}
