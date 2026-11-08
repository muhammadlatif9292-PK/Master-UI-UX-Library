/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SoundKey, SoundCategory } from '../sound/soundTypes';
import { HapticEvent } from '../haptics/hapticTypes';

export type ExperienceEventType =
  | 'interaction.started'
  | 'interaction.confirmed'
  | 'interaction.cancelled'
  | 'navigation.changed'
  | 'selection.changed'
  | 'focus.entered'
  | 'focus.exited'
  | 'drag.started'
  | 'drag.completed'
  | 'state.success'
  | 'state.error'
  | 'state.warning'
  | 'state.loading'
  | 'ai.started'
  | 'ai.completed'
  | 'simulation.started'
  | 'simulation.completed';

export interface MotionRecipe {
  profile: string;
  type?: 'scale' | 'bounce' | 'slide' | 'shake' | 'pulse' | 'glow' | 'lift';
  scale?: number | number[];
  stiffness?: number;
  damping?: number;
  duration?: number;
}

export interface SoundRecipe {
  key?: SoundKey;
  category?: SoundCategory;
  soundSynthesizerId?: string;
  eventType?: 'click' | 'hover' | 'toggle' | 'slider' | 'scan' | 'success';
  volume?: number;
  enabled?: boolean;
}

export interface HapticRecipe {
  event?: HapticEvent;
  hapticFeedbackId?: string;
  pattern?: number[];
  enabled?: boolean;
}

export interface SensoryRecipes {
  motion?: MotionRecipe;
  sound?: SoundRecipe;
  haptic?: HapticRecipe;
}

export interface ExperienceEventPayload {
  type: ExperienceEventType;
  sourceId?: string;
  timestamp: number;
  metadata?: Record<string, unknown>;
  sensoryRecipes?: SensoryRecipes;
}

export type EventListener = (payload: ExperienceEventPayload) => void;

