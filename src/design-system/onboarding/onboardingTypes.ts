/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type OnboardingPatternType =
  | 'cinematic-story'
  | 'horizontal-carousel'
  | 'vertical-story'
  | 'interactive-scene'
  | 'character-guide'
  | 'progressive-reveal'
  | 'swipe-narrative'
  | 'animated-illustration'
  | '3d-object-intro'
  | 'choose-your-path'
  | 'personalization'
  | 'progressive-setup'
  | 'interactive-tutorial'
  | 'spotlight-walkthrough'
  | 'gesture-tutorial'
  | 'achievement-onboarding';

export interface OnboardingStep {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  targetSelector?: string;
  badge?: string;
  icon?: string;
  image?: string;
  actionText?: string;
  secondaryActionText?: string;
  interactiveTask?: {
    instruction: string;
    targetValue?: string;
    completedMessage?: string;
  };
}

export interface CoachMarkConfig {
  id: string;
  targetId: string;
  title: string;
  description: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  badge?: string;
  stepIndex?: number;
  totalSteps?: number;
}

export interface ContextualHintConfig {
  id: string;
  label: string;
  content: string;
  type?: 'inline' | 'floating' | 'beacon' | 'pill';
  dismissible?: boolean;
}

export interface SpotlightTargetRect {
  x: number;
  y: number;
  width: number;
  height: number;
  borderRadius?: number;
}
