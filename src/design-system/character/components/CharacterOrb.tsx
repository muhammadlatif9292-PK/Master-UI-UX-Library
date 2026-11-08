/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import {
  CharacterState,
  CharacterEmotion,
  CharacterReaction,
  EyeShape,
  CharacterPalette,
} from '../types';
import { GazeVector } from '../CharacterAttentionEngine';
import { CharacterEyeSystem } from './CharacterEyeSystem';

interface CharacterOrbProps {
  state?: CharacterState;
  emotion?: CharacterEmotion;
  reaction?: CharacterReaction;
  eyeShape?: EyeShape;
  palette: CharacterPalette;
  gaze?: GazeVector;
  size?: number;
  showEyes?: boolean;
  reducedMotion?: boolean;
}

export const CharacterOrb: React.FC<CharacterOrbProps> = ({
  state = 'idle',
  emotion = 'neutral',
  reaction = 'none',
  eyeShape = 'normal',
  palette,
  gaze = { x: 0, y: 0, distance: 0, isBlinking: false, pupilDilation: 1 },
  size = 180,
  showEyes = true,
  reducedMotion = false,
}) => {
  const isOffline = state === 'offline';
  const pulseSpeed = state === 'processing' ? 1.2 : state === 'listening' ? 1.5 : 3.0;

  return (
    <div
      className={`relative flex items-center justify-center select-none ${
        isOffline ? 'grayscale opacity-40' : ''
      }`}
      style={{ width: size, height: size }}
    >
      {/* Layer 1: Ambient Outer Flare */}
      <div
        className="absolute rounded-full blur-2xl pointer-events-none transition-all duration-700"
        style={{
          width: size * 0.9,
          height: size * 0.9,
          backgroundColor: palette.glow,
          opacity: state === 'thinking' || state === 'processing' ? 0.7 : 0.4,
        }}
      />

      {/* Layer 2: Orbital Ring (Rotates in Thinking/Processing) */}
      <motion.div
        animate={
          reducedMotion
            ? {}
            : state === 'thinking' || state === 'processing'
            ? { rotate: 360 }
            : { rotate: [0, 180, 360] }
        }
        transition={{
          duration: state === 'thinking' ? 4 : 12,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute rounded-full border border-dashed pointer-events-none"
        style={{
          width: size * 0.88,
          height: size * 0.88,
          borderColor: palette.secondary,
          opacity: 0.5,
        }}
      >
        {/* Orbital Satellite Node */}
        <div
          className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full shadow-md"
          style={{
            backgroundColor: palette.accent || palette.primary,
            boxShadow: `0 0 8px ${palette.glow}`,
          }}
        />
      </motion.div>

      {/* Layer 3: Main Glowing Fluid Core */}
      <motion.div
        animate={
          reducedMotion
            ? {}
            : state === 'listening'
            ? { scale: [1, 1.08, 0.96, 1] }
            : { scale: [0.97, 1.03, 0.97] }
        }
        transition={{ duration: pulseSpeed, repeat: Infinity, ease: 'easeInOut' }}
        className="relative rounded-full flex items-center justify-center shadow-2xl border-2 overflow-hidden"
        style={{
          width: size * 0.7,
          height: size * 0.7,
          backgroundColor: palette.bodyBg || '#080d1a',
          borderColor: palette.primary,
          boxShadow: `0 0 32px ${palette.glow}, inset 0 0 20px ${palette.secondary}44`,
        }}
      >
        {/* Internal Plasma Gradient */}
        <div
          className="absolute inset-0 rounded-full opacity-40 mix-blend-screen"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${palette.secondary}, transparent 70%)`,
          }}
        />

        {/* Optional Embedded Minimal Eye System */}
        {showEyes && (
          <div className="relative z-10 scale-75">
            <CharacterEyeSystem
              shape={eyeShape}
              style="minimal-dot"
              gaze={gaze}
              palette={palette}
              size={size * 0.55}
              reducedMotion={reducedMotion}
            />
          </div>
        )}
      </motion.div>
    </div>
  );
};
