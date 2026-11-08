/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  ExperienceEventType,
  ExperienceEventPayload,
  EventListener,
  SensoryRecipes,
  MotionRecipe,
  SoundRecipe,
  HapticRecipe,
} from './eventBusTypes';
import { ThemeId } from '../tokens/themeTokens';
import { proceduralSoundEngine } from '../sound/soundEngine';
import { hapticEngine } from '../haptics/hapticEngine';
import { soundSynthesizer } from '../../components/composer/soundEngine';
import { triggerHaptic } from '../../components/composer/hapticEngine';
import { SoundKey, SoundCategory } from '../sound/soundTypes';
import { HapticEvent } from '../haptics/hapticTypes';

export function resolveSensoryRecipes(
  type: ExperienceEventType,
  metadata?: Record<string, unknown>
): SensoryRecipes {
  const customMotion = metadata?.motionRecipe as MotionRecipe | undefined;
  const customSound = metadata?.soundRecipe as SoundRecipe | undefined;
  const customHaptic = metadata?.hapticRecipe as HapticRecipe | undefined;

  let defaultMotion: MotionRecipe = { profile: 'spring-tactile', type: 'scale', scale: 0.98 };
  let defaultSound: SoundRecipe = { key: 'selection', category: 'MICRO', enabled: true };
  let defaultHaptic: HapticRecipe = { event: 'selection', enabled: true };

  switch (type) {
    case 'interaction.started':
      defaultMotion = { profile: 'snappy-press', type: 'scale', scale: 0.96, stiffness: 400, damping: 25 };
      defaultSound = { key: 'press', category: 'MICRO', enabled: true };
      defaultHaptic = { event: 'press', enabled: true };
      break;

    case 'interaction.confirmed':
      defaultMotion = { profile: 'snappy-bounce', type: 'bounce', scale: [1.04, 1.0], stiffness: 500, damping: 15 };
      defaultSound = { key: 'selection', category: 'MICRO', enabled: true };
      defaultHaptic = { event: 'selection', enabled: true };
      break;

    case 'interaction.cancelled':
      defaultMotion = { profile: 'smooth-glide', type: 'scale', scale: 1.0, stiffness: 300, damping: 20 };
      defaultSound = { key: 'release', category: 'MICRO', enabled: true };
      defaultHaptic = { event: 'snap', enabled: true };
      break;

    case 'navigation.changed':
      defaultMotion = { profile: 'smooth-glide', type: 'slide', duration: 0.25 };
      defaultSound = { key: 'tab-change', category: 'NAVIGATION', enabled: true };
      defaultHaptic = { event: 'selection', enabled: true };
      break;

    case 'selection.changed':
      defaultMotion = { profile: 'spring-tactile', type: 'pulse', scale: [1.02, 1.0] };
      defaultSound = { key: 'selection', category: 'MICRO', enabled: true };
      defaultHaptic = { event: 'selection', enabled: true };
      break;

    case 'focus.entered':
      defaultMotion = { profile: 'gentle-fade', type: 'glow' };
      defaultSound = { key: 'focus', category: 'MICRO', enabled: true };
      defaultHaptic = { event: 'tap', enabled: true };
      break;

    case 'focus.exited':
      defaultMotion = { profile: 'gentle-fade', type: 'scale', scale: 1.0 };
      defaultSound = { key: 'release', category: 'MICRO', enabled: true };
      defaultHaptic = { enabled: false };
      break;

    case 'drag.started':
      defaultMotion = { profile: 'spring-tactile', type: 'lift', scale: 1.05 };
      defaultSound = { key: 'drag-start', category: 'MICRO', enabled: true };
      defaultHaptic = { event: 'drag', enabled: true };
      break;

    case 'drag.completed':
      defaultMotion = { profile: 'snappy-bounce', type: 'scale', scale: 1.0 };
      defaultSound = { key: 'drag-end', category: 'MICRO', enabled: true };
      defaultHaptic = { event: 'snap', enabled: true };
      break;

    case 'state.success':
      defaultMotion = { profile: 'snappy-bounce', type: 'bounce', scale: [1.1, 1.0] };
      defaultSound = { key: 'success', category: 'STATE', enabled: true };
      defaultHaptic = { event: 'success', enabled: true };
      break;

    case 'state.error':
      defaultMotion = { profile: 'shake-error', type: 'shake' };
      defaultSound = { key: 'error', category: 'STATE', enabled: true };
      defaultHaptic = { event: 'error', enabled: true };
      break;

    case 'state.warning':
      defaultMotion = { profile: 'pulse-warning', type: 'pulse' };
      defaultSound = { key: 'warning', category: 'STATE', enabled: true };
      defaultHaptic = { event: 'warning', enabled: true };
      break;

    case 'state.loading':
      defaultMotion = { profile: 'continuous-spin', type: 'glow' };
      defaultSound = { key: 'processing', category: 'STATE', enabled: true };
      defaultHaptic = { event: 'toggle', enabled: true };
      break;

    case 'ai.started':
      defaultMotion = { profile: 'shimmer-pulse', type: 'glow' };
      defaultSound = { key: 'processing', category: 'STATE', enabled: true };
      defaultHaptic = { event: 'toggle', enabled: true };
      break;

    case 'ai.completed':
      defaultMotion = { profile: 'glow-burst', type: 'bounce', scale: [1.08, 1.0] };
      defaultSound = { key: 'completion', category: 'STATE', enabled: true };
      defaultHaptic = { event: 'completion', enabled: true };
      break;

    case 'simulation.started':
      defaultMotion = { profile: 'expand-view', type: 'slide' };
      defaultSound = { key: 'drawer-open', category: 'NAVIGATION', enabled: true };
      defaultHaptic = { event: 'toggle', enabled: true };
      break;

    case 'simulation.completed':
      defaultMotion = { profile: 'hero-burst', type: 'bounce', scale: [1.12, 1.0] };
      defaultSound = { key: 'major-completion', category: 'HERO', enabled: true };
      defaultHaptic = { event: 'completion', enabled: true };
      break;
  }

  // Handle composer recipe in metadata
  if (metadata?.composerRecipe) {
    const rec = metadata.composerRecipe as any;
    if (rec.sound) {
      defaultSound = {
        soundSynthesizerId: rec.sound,
        eventType: (metadata.soundEventType as any) || 'click',
        enabled: metadata?.muteSound !== true && metadata?.sound !== false,
      };
    }
    if (rec.haptic) {
      defaultHaptic = {
        hapticFeedbackId: rec.haptic,
        enabled: metadata?.muteHaptic !== true && metadata?.haptic !== false,
      };
    }
  }

  if (metadata?.muteSound === true || metadata?.sound === false) {
    defaultSound.enabled = false;
  }
  if (metadata?.muteHaptic === true || metadata?.haptic === false) {
    defaultHaptic.enabled = false;
  }

  if (metadata?.soundKey) {
    defaultSound.key = metadata.soundKey as SoundKey;
  }
  if (metadata?.soundCategory) {
    defaultSound.category = metadata.soundCategory as SoundCategory;
  }
  if (metadata?.hapticEvent) {
    defaultHaptic.event = metadata.hapticEvent as HapticEvent;
  }

  return {
    motion: customMotion || defaultMotion,
    sound: customSound || defaultSound,
    haptic: customHaptic || defaultHaptic,
  };
}

class ExperienceEventBus {
  private listeners: Set<EventListener> = new Set();
  private history: ExperienceEventPayload[] = [];
  private maxHistoryLength = 50;

  public subscribe(listener: EventListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public emit(
    type: ExperienceEventType,
    sourceId?: string,
    metadata?: Record<string, unknown>,
    activeTheme: ThemeId = 'obsidian'
  ) {
    const recipes = resolveSensoryRecipes(type, metadata);

    const payload: ExperienceEventPayload = {
      type,
      sourceId,
      timestamp: Date.now(),
      metadata,
      sensoryRecipes: recipes,
    };

    // Store in history
    this.history = [payload, ...this.history].slice(0, this.maxHistoryLength);

    // Notify listeners
    this.listeners.forEach((listener) => {
      try {
        listener(payload);
      } catch (err) {
        console.error('Error in ExperienceEventBus listener:', err);
      }
    });

    // Orchestrate sensory feedback execution
    this.expressSensoryFeedback(payload, activeTheme);
  }

  public getHistory(): ExperienceEventPayload[] {
    return this.history;
  }

  public clearHistory() {
    this.history = [];
  }

  private expressSensoryFeedback(payload: ExperienceEventPayload, theme: ThemeId) {
    if (typeof window === 'undefined') return;

    const recipes = payload.sensoryRecipes;

    // 1. Execute Sound Engine
    if (recipes?.sound && recipes.sound.enabled !== false) {
      if (recipes.sound.soundSynthesizerId) {
        soundSynthesizer.playSound(
          recipes.sound.soundSynthesizerId as any,
          recipes.sound.eventType || 'click',
          (payload.metadata?.intensity as any) || 'balanced'
        );
      } else if (recipes.sound.key) {
        proceduralSoundEngine.playSound(
          recipes.sound.key,
          recipes.sound.category || 'MICRO'
        );
      }
    }

    // 2. Execute Haptic Engine
    if (recipes?.haptic && recipes.haptic.enabled !== false) {
      if (recipes.haptic.hapticFeedbackId) {
        triggerHaptic(
          recipes.haptic.hapticFeedbackId as any,
          (payload.metadata?.intensity as any) || 'balanced'
        );
      } else if (recipes.haptic.event) {
        hapticEngine.trigger(recipes.haptic.event);
      }
    }

    // Theme-specific sensory expression description for debugging/telemetry
    let description = `[${theme}] Event Bus Orchestrated: ${payload.type} -> Motion(${recipes?.motion?.profile}), Sound(${recipes?.sound?.key || recipes?.sound?.soundSynthesizerId || 'none'}), Haptic(${recipes?.haptic?.event || recipes?.haptic?.hapticFeedbackId || 'none'})`;

    // Dispatch custom DOM event for debugging / telemetry / Inspector tools
    window.dispatchEvent(
      new CustomEvent('experience-event-dispatched', {
        detail: { payload, theme, description, sensoryRecipes: recipes },
      })
    );
  }
}

export const experienceEventBus = new ExperienceEventBus();

