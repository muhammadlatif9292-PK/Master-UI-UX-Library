/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect } from 'react';
import {
  CharacterForm,
  CharacterState,
  CharacterEmotion,
  CharacterGesture,
  CharacterReaction,
  EyeShape,
  EyeStyle,
  MouthShape,
  AccessoryType,
  CharacterPalette,
  SpeechMessage,
} from '../types';
import { useCharacter } from '../CharacterContext';
import { CharacterMascot } from './CharacterMascot';
import { CharacterAvatar } from './CharacterAvatar';
import { CharacterOrb } from './CharacterOrb';
import { CharacterEyeSystem } from './CharacterEyeSystem';
import { CharacterFace } from './CharacterFace';
import { CharacterSpeechBubble } from './CharacterSpeechBubble';

export interface CharacterHostProps {
  form?: CharacterForm;
  state?: CharacterState;
  emotion?: CharacterEmotion;
  gesture?: CharacterGesture;
  reaction?: CharacterReaction;
  eyeShape?: EyeShape;
  mouthShape?: MouthShape;
  eyeStyle?: EyeStyle;
  accessory?: AccessoryType;
  palette?: CharacterPalette;
  size?: 'sm' | 'md' | 'lg' | 'hero' | 'docked' | number;
  showSpeechBubble?: boolean;
  onActionClick?: (actionId: string) => void;
  className?: string;
  onClick?: () => void;
}

const SIZE_MAP = {
  sm: 100,
  md: 140,
  lg: 180,
  hero: 240,
  docked: 110,
};

export const CharacterHost: React.FC<CharacterHostProps> = ({
  form: propForm,
  state: propState,
  emotion: propEmotion,
  gesture: propGesture,
  reaction: propReaction,
  eyeShape: propEyeShape,
  mouthShape: propMouthShape,
  eyeStyle: propEyeStyle,
  accessory: propAccessory,
  palette: propPalette,
  size = 'lg',
  showSpeechBubble = true,
  onActionClick,
  className = '',
  onClick,
}) => {
  // Read from CharacterContext fallback
  let ctx: any = null;
  try {
    ctx = useCharacter();
  } catch (e) {
    // context not available, use props
  }

  const form = propForm ?? ctx?.form ?? 'mascot';
  const state = propState ?? ctx?.state ?? 'idle';
  const emotion = propEmotion ?? ctx?.emotion ?? 'neutral';
  const gesture = propGesture ?? ctx?.gesture ?? 'none';
  const reaction = propReaction ?? ctx?.reaction ?? 'none';
  const eyeShape = propEyeShape ?? ctx?.eyeShape ?? 'normal';
  const mouthShape = propMouthShape ?? ctx?.mouthShape ?? 'smile';
  const eyeStyle = propEyeStyle ?? ctx?.eyeStyle ?? 'digital-led';
  const accessory = propAccessory ?? ctx?.accessory ?? 'none';
  const palette = propPalette ?? ctx?.palette ?? {
    id: 'cyberCyan',
    name: 'Cyber Cyan',
    primary: '#0ea5e9',
    secondary: '#38bdf8',
    accent: '#818cf8',
    glow: 'rgba(14, 165, 233, 0.4)',
    eyeColor: '#38bdf8',
    blushColor: '#f43f5e',
    bodyBg: '#0c1322',
  };
  const gaze = ctx?.gaze ?? { x: 0, y: 0, distance: 0, isBlinking: false, pupilDilation: 1 };
  const speech = ctx?.speech ?? null;
  const reducedMotion = ctx?.reducedMotion ?? false;

  const numericSize = typeof size === 'number' ? size : SIZE_MAP[size] || 180;
  const isDocked = size === 'docked';

  const containerRef = useRef<HTMLDivElement>(null);

  const renderCharacterBody = () => {
    switch (form) {
      case 'avatar':
        return (
          <CharacterAvatar
            state={state}
            emotion={emotion}
            gesture={gesture}
            reaction={reaction}
            eyeShape={eyeShape}
            mouthShape={mouthShape}
            eyeStyle={eyeStyle}
            palette={palette}
            gaze={gaze}
            size={numericSize}
            reducedMotion={reducedMotion}
          />
        );

      case 'orb':
        return (
          <CharacterOrb
            state={state}
            emotion={emotion}
            reaction={reaction}
            eyeShape={eyeShape}
            palette={palette}
            gaze={gaze}
            size={numericSize}
            showEyes={true}
            reducedMotion={reducedMotion}
          />
        );

      case 'eyes-only':
        return (
          <div className="p-4 rounded-2xl bg-black/40 border border-zinc-800 shadow-xl">
            <CharacterEyeSystem
              shape={eyeShape}
              style={eyeStyle}
              gaze={gaze}
              palette={palette}
              size={numericSize}
              reducedMotion={reducedMotion}
            />
          </div>
        );

      case 'face-only':
        return (
          <div className="p-6 rounded-3xl bg-black/60 border border-zinc-800 shadow-2xl flex flex-col items-center gap-3">
            <CharacterEyeSystem
              shape={eyeShape}
              style={eyeStyle}
              gaze={gaze}
              palette={palette}
              size={numericSize * 0.8}
              reducedMotion={reducedMotion}
            />
            <CharacterFace
              mouthShape={mouthShape}
              palette={palette}
              reaction={reaction}
              showBlush={true}
              size={numericSize * 0.8}
              reducedMotion={reducedMotion}
            />
          </div>
        );

      case 'mascot':
      default:
        return (
          <CharacterMascot
            state={state}
            emotion={emotion}
            gesture={gesture}
            reaction={reaction}
            eyeShape={eyeShape}
            mouthShape={mouthShape}
            eyeStyle={eyeStyle}
            accessory={accessory}
            palette={palette}
            gaze={gaze}
            size={numericSize}
            reducedMotion={reducedMotion}
          />
        );
    }
  };

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center ${
        isDocked ? 'fixed bottom-6 right-6 z-50' : ''
      } ${className}`}
      role="region"
      aria-label={`Character Assistant in ${state} state`}
    >
      {/* Speech Bubble (Rendered above character) */}
      {showSpeechBubble && speech && (
        <div className="absolute bottom-full mb-3 z-30 pointer-events-auto">
          <CharacterSpeechBubble
            speech={speech}
            palette={palette}
            onDismiss={() => ctx?.dismissSpeech()}
            onActionClick={onActionClick}
            reducedMotion={reducedMotion}
          />
        </div>
      )}

      {/* Render Character Representation */}
      <div className="relative cursor-pointer transition-transform duration-200 hover:scale-[1.02]">
        {renderCharacterBody()}
      </div>
    </div>
  );
};
