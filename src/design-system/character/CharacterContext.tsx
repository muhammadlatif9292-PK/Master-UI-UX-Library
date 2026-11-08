/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useEffect, useState, useRef, useMemo, useCallback } from 'react';
import {
  CharacterForm,
  CharacterState,
  CharacterEmotion,
  CharacterGesture,
  CharacterReaction,
  EyeShape,
  MouthShape,
  EyeStyle,
  AccessoryType,
  AttentionTarget,
  SpeechMessage,
  CharacterPalette,
} from './types';
import { CHARACTER_PALETTES, getStateExpressionDefaults } from './palettes';
import { CharacterStateMachine } from './CharacterStateMachine';
import { CharacterAttentionEngine, GazeVector } from './CharacterAttentionEngine';
import { experienceEventBus } from '../events/experienceEventBus';
import { ExperienceEventPayload } from '../events/eventBusTypes';

export interface CharacterContextValue {
  form: CharacterForm;
  setForm: (form: CharacterForm) => void;
  state: CharacterState;
  setState: (state: CharacterState, force?: boolean) => void;
  previousState: CharacterState;
  emotion: CharacterEmotion;
  setEmotion: (emotion: CharacterEmotion) => void;
  gesture: CharacterGesture;
  setGesture: (gesture: CharacterGesture) => void;
  reaction: CharacterReaction;
  triggerReaction: (reaction: CharacterReaction, durationMs?: number) => void;
  eyeShape: EyeShape;
  setEyeShape: (shape: EyeShape) => void;
  mouthShape: MouthShape;
  setMouthShape: (shape: MouthShape) => void;
  eyeStyle: EyeStyle;
  setEyeStyle: (style: EyeStyle) => void;
  accessory: AccessoryType;
  setAccessory: (acc: AccessoryType) => void;
  palette: CharacterPalette;
  setPalette: (palette: CharacterPalette) => void;
  paletteKey: string;
  setPaletteKey: (key: string) => void;
  gaze: GazeVector;
  attentionTarget: AttentionTarget | null;
  lookAt: (xOrElement: number | HTMLElement | string, y?: number, durationMs?: number) => void;
  clearAttention: () => void;
  speech: SpeechMessage | null;
  speak: (text: string, options?: Partial<SpeechMessage>) => void;
  dismissSpeech: () => void;
  reducedMotion: boolean;
  setReducedMotion: (enabled: boolean) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  eventBridgeEnabled: boolean;
  setEventBridgeEnabled: (enabled: boolean) => void;
  stateHistory: { state: CharacterState; timestamp: number }[];
  eventLog: ExperienceEventPayload[];
}

const CharacterContext = createContext<CharacterContextValue | null>(null);

export function CharacterProvider({
  children,
  initialForm = 'mascot',
  initialState = 'idle',
  initialPalette = 'cyberCyan',
  enableEventBridge = true,
}: {
  children: React.ReactNode;
  initialForm?: CharacterForm;
  initialState?: CharacterState;
  initialPalette?: string;
  enableEventBridge?: boolean;
}) {
  const [form, setForm] = useState<CharacterForm>(initialForm);
  const [paletteKey, setPaletteKey] = useState<string>(initialPalette);
  const palette = CHARACTER_PALETTES[paletteKey] || CHARACTER_PALETTES.cyberCyan;

  const [state, setStateInternal] = useState<CharacterState>(initialState);
  const [previousState, setPreviousState] = useState<CharacterState>(initialState);
  const [emotion, setEmotion] = useState<CharacterEmotion>('neutral');
  const [gesture, setGesture] = useState<CharacterGesture>('none');
  const [reaction, setReaction] = useState<CharacterReaction>('none');
  const [eyeShape, setEyeShape] = useState<EyeShape>('normal');
  const [mouthShape, setMouthShape] = useState<MouthShape>('smile');
  const [eyeStyle, setEyeStyle] = useState<EyeStyle>('digital-led');
  const [accessory, setAccessory] = useState<AccessoryType>('none');
  const [speech, setSpeech] = useState<SpeechMessage | null>(null);
  const [attentionTarget, setAttentionTarget] = useState<AttentionTarget | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [eventBridgeEnabled, setEventBridgeEnabled] = useState(enableEventBridge);
  const [eventLog, setEventLog] = useState<ExperienceEventPayload[]>([]);

  // Reduced motion support
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  // State Machine instance
  const fsmRef = useRef<CharacterStateMachine | null>(null);
  if (!fsmRef.current) {
    fsmRef.current = new CharacterStateMachine(initialState);
  }

  // Attention Engine instance
  const attentionRef = useRef<CharacterAttentionEngine | null>(null);
  if (!attentionRef.current) {
    attentionRef.current = new CharacterAttentionEngine();
  }

  const [gaze, setGaze] = useState<GazeVector>({
    x: 0,
    y: 0,
    distance: 0,
    isBlinking: false,
    pupilDilation: 1,
  });

  // Keep gaze state updated
  useEffect(() => {
    const engine = attentionRef.current;
    if (!engine) return;
    const unsub = engine.subscribe((newGaze) => {
      setGaze(newGaze);
    });
    return unsub;
  }, []);

  // Sync state machine updates
  useEffect(() => {
    const fsm = fsmRef.current;
    if (!fsm) return;
    const unsub = fsm.subscribe((next, prev) => {
      setStateInternal(next);
      setPreviousState(prev);

      // Auto-update expression defaults on state transition
      const defaults = getStateExpressionDefaults(next);
      setEyeShape(defaults.eyeShape);
      setMouthShape(defaults.mouthShape);
      setEmotion(defaults.emotion);
    });
    return unsub;
  }, []);

  const setState = useCallback((nextState: CharacterState, force: boolean = true) => {
    fsmRef.current?.transition(nextState, force);
  }, []);

  const triggerReaction = useCallback((r: CharacterReaction, durationMs: number = 2000) => {
    setReaction(r);
    setTimeout(() => {
      setReaction('none');
    }, durationMs);
  }, []);

  const lookAt = useCallback((xOrElement: number | HTMLElement | string, y: number = 0, durationMs?: number) => {
    if (typeof xOrElement === 'number') {
      const target: AttentionTarget = { x: xOrElement, y, mode: 'fixed' };
      setAttentionTarget(target);
      attentionRef.current?.setAttentionTarget(target, durationMs);
    } else {
      attentionRef.current?.lookAtElement(xOrElement, durationMs || 3500);
    }
  }, []);

  const clearAttention = useCallback(() => {
    setAttentionTarget(null);
    attentionRef.current?.setAttentionTarget(null);
  }, []);

  const speak = useCallback((text: string, options?: Partial<SpeechMessage>) => {
    const msg: SpeechMessage = {
      id: `msg-${Date.now()}`,
      text,
      emotion: options?.emotion || 'neutral',
      actions: options?.actions,
      autoDismissMs: options?.autoDismissMs ?? 5000,
      isTyping: options?.isTyping ?? true,
      soundCue: options?.soundCue,
      timestamp: Date.now(),
    };
    setSpeech(msg);

    // Auto dismiss if configured
    if (msg.autoDismissMs && msg.autoDismissMs > 0) {
      setTimeout(() => {
        setSpeech((curr) => (curr?.id === msg.id ? null : curr));
      }, msg.autoDismissMs + (msg.isTyping ? 1200 : 0));
    }
  }, []);

  const dismissSpeech = useCallback(() => {
    setSpeech(null);
  }, []);

  // Semantic Event Bus Bridge
  useEffect(() => {
    if (!eventBridgeEnabled) return;

    const unsubscribe = experienceEventBus.subscribe((eventPayload) => {
      setEventLog((prev) => [eventPayload, ...prev].slice(0, 30));

      switch (eventPayload.type) {
        case 'state.error':
          setState('error');
          triggerReaction('alert');
          speak('Warning: A system error was encountered. Let me help you troubleshoot.', {
            emotion: 'worried',
            autoDismissMs: 5500,
          });
          break;

        case 'state.warning':
          setState('warning');
          triggerReaction('sweat');
          break;

        case 'state.success':
        case 'interaction.confirmed':
          setState('celebrating');
          triggerReaction('sparkle');
          setGesture('celebrate');
          speak('Success! The operation finished flawlessly.', {
            emotion: 'happy',
            autoDismissMs: 4000,
          });
          break;

        case 'ai.started':
        case 'simulation.started':
          setState('thinking');
          setGesture('chin-tap');
          break;

        case 'ai.completed':
        case 'simulation.completed':
          setState('success');
          setGesture('nod');
          break;

        case 'focus.entered':
          setState('watching');
          if (eventPayload.sourceId) {
            lookAt(`#${eventPayload.sourceId}`, 0, 3000);
          }
          break;

        case 'focus.exited':
          setState('idle');
          clearAttention();
          break;

        case 'drag.started':
          setState('watching');
          setGesture('point-right');
          break;

        case 'drag.completed':
          setState('idle');
          setGesture('none');
          break;

        default:
          break;
      }
    });

    return unsubscribe;
  }, [eventBridgeEnabled, setState, triggerReaction, speak, lookAt, clearAttention]);

  // Window cursor tracking for subtle attention
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      attentionRef.current?.updateCursorPosition(e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const value: CharacterContextValue = useMemo(
    () => ({
      form,
      setForm,
      state,
      setState,
      previousState,
      emotion,
      setEmotion,
      gesture,
      setGesture,
      reaction,
      triggerReaction,
      eyeShape,
      setEyeShape,
      mouthShape,
      setMouthShape,
      eyeStyle,
      setEyeStyle,
      accessory,
      setAccessory,
      palette,
      setPalette: (p: CharacterPalette) => {
        setPaletteKey(p.id);
      },
      paletteKey,
      setPaletteKey,
      gaze,
      attentionTarget,
      lookAt,
      clearAttention,
      speech,
      speak,
      dismissSpeech,
      reducedMotion,
      setReducedMotion,
      isMuted,
      setIsMuted,
      eventBridgeEnabled,
      setEventBridgeEnabled,
      stateHistory: fsmRef.current?.getHistory() || [],
      eventLog,
    }),
    [
      form,
      state,
      setState,
      previousState,
      emotion,
      gesture,
      reaction,
      triggerReaction,
      eyeShape,
      mouthShape,
      eyeStyle,
      accessory,
      palette,
      paletteKey,
      gaze,
      attentionTarget,
      lookAt,
      clearAttention,
      speech,
      speak,
      dismissSpeech,
      reducedMotion,
      isMuted,
      eventBridgeEnabled,
      eventLog,
    ]
  );

  return <CharacterContext.Provider value={value}>{children}</CharacterContext.Provider>;
}

export function useCharacter() {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error('useCharacter must be used within a <CharacterProvider>');
  }
  return context;
}
