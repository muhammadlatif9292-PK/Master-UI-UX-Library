/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import {
  CharacterState,
  CharacterEmotion,
  CharacterGesture,
  CharacterReaction,
  EyeShape,
  EyeStyle,
  MouthShape,
  CharacterPalette,
} from '../types';
import { GazeVector } from '../CharacterAttentionEngine';
import { CharacterEyeSystem } from './CharacterEyeSystem';
import { CharacterFace } from './CharacterFace';

interface CharacterAvatarProps {
  state?: CharacterState;
  emotion?: CharacterEmotion;
  gesture?: CharacterGesture;
  reaction?: CharacterReaction;
  eyeShape?: EyeShape;
  mouthShape?: MouthShape;
  eyeStyle?: EyeStyle;
  palette: CharacterPalette;
  gaze?: GazeVector;
  size?: number;
  reducedMotion?: boolean;
}

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  state = 'idle',
  emotion = 'neutral',
  gesture = 'none',
  reaction = 'none',
  eyeShape = 'normal',
  mouthShape = 'smile',
  eyeStyle = 'organic-anime',
  palette,
  gaze = { x: 0, y: 0, distance: 0, isBlinking: false, pupilDilation: 1 },
  size = 180,
  reducedMotion = false,
}) => {
  const headRotX = reducedMotion ? 0 : gaze.y * 6;
  const headRotY = reducedMotion ? 0 : gaze.x * 10;
  const showBlush = emotion === 'happy' || emotion === 'excited' || state === 'celebrating';

  return (
    <div
      className="relative flex flex-col items-center justify-center select-none"
      style={{ width: size, height: size * 1.25 }}
    >
      {/* Background Soft Aura Glow */}
      <div
        className="absolute rounded-full blur-2xl pointer-events-none transition-all duration-700"
        style={{
          width: size * 0.9,
          height: size * 0.9,
          backgroundColor: palette.glow,
          opacity: 0.35,
        }}
      />

      {/* Main Avatar Body */}
      <motion.div
        animate={
          reducedMotion
            ? {}
            : { y: [-2, 2, -2] }
        }
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        className="relative flex flex-col items-center z-10"
        style={{
          transform: `perspective(360px) rotateX(${headRotX}deg) rotateY(${headRotY}deg)`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        {/* Stylized Hair / Hood Cap */}
        <div
          className="rounded-t-[42px] border-t-2 border-x-2 -mb-6 z-20"
          style={{
            width: size * 0.78,
            height: size * 0.32,
            backgroundColor: palette.primary,
            borderColor: palette.secondary,
          }}
        />

        {/* Head Shell */}
        <div
          className="relative rounded-[32px] p-3 flex flex-col items-center justify-center shadow-xl border-2 z-10"
          style={{
            width: size * 0.72,
            height: size * 0.72,
            backgroundColor: palette.bodyBg || '#0f172a',
            borderColor: palette.secondary,
            boxShadow: `0 10px 30px rgba(0,0,0,0.5), inset 0 0 14px ${palette.glow}`,
          }}
        >
          {/* Eyes */}
          <CharacterEyeSystem
            shape={eyeShape}
            style={eyeStyle}
            gaze={gaze}
            palette={palette}
            size={size * 0.58}
            reducedMotion={reducedMotion}
          />

          {/* Face */}
          <div className="mt-2">
            <CharacterFace
              mouthShape={mouthShape}
              palette={palette}
              reaction={reaction}
              showBlush={showBlush}
              size={size * 0.58}
              reducedMotion={reducedMotion}
            />
          </div>
        </div>

        {/* Shoulders & Jacket Silhouette */}
        <div
          className="rounded-t-[28px] -mt-3 border-t-2 border-x-2 flex items-center justify-center shadow-lg"
          style={{
            width: size * 0.9,
            height: size * 0.35,
            backgroundColor: '#090d16',
            borderColor: palette.primary,
          }}
        >
          <div
            className="w-8 h-1 rounded-full"
            style={{ backgroundColor: palette.secondary }}
          />
        </div>
      </motion.div>
    </div>
  );
};
