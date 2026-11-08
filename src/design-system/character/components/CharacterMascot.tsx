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
  AccessoryType,
  CharacterPalette,
} from '../types';
import { GazeVector } from '../CharacterAttentionEngine';
import { CharacterEyeSystem } from './CharacterEyeSystem';
import { CharacterFace } from './CharacterFace';

interface CharacterMascotProps {
  state?: CharacterState;
  emotion?: CharacterEmotion;
  gesture?: CharacterGesture;
  reaction?: CharacterReaction;
  eyeShape?: EyeShape;
  mouthShape?: MouthShape;
  eyeStyle?: EyeStyle;
  accessory?: AccessoryType;
  palette: CharacterPalette;
  gaze?: GazeVector;
  size?: number; // Base width in px (default 180)
  reducedMotion?: boolean;
  isListening?: boolean;
}

export const CharacterMascot: React.FC<CharacterMascotProps> = ({
  state = 'idle',
  emotion = 'neutral',
  gesture = 'none',
  reaction = 'none',
  eyeShape = 'normal',
  mouthShape = 'smile',
  eyeStyle = 'digital-led',
  accessory = 'none',
  palette,
  gaze = { x: 0, y: 0, distance: 0, isBlinking: false, pupilDilation: 1 },
  size = 180,
  reducedMotion = false,
}) => {
  // Head rotation calculation based on gaze and state
  const headRotX = reducedMotion ? 0 : gaze.y * 8;
  const headRotY = reducedMotion ? 0 : gaze.x * 12;

  // Head tilt for confusion, listening, thinking
  let headTilt = 0;
  if (state === 'confused') headTilt = 12;
  else if (state === 'listening') headTilt = -8;
  else if (state === 'thinking') headTilt = 6;

  // Subtle breathing animation duration
  const breathDuration = state === 'sleeping' ? 4.8 : state === 'processing' ? 1.6 : 3.4;

  const isOffline = state === 'offline';
  const showBlush = emotion === 'happy' || emotion === 'excited' || state === 'celebrating';

  return (
    <div
      className={`relative flex flex-col items-center justify-center select-none ${
        isOffline ? 'grayscale opacity-50' : ''
      }`}
      style={{ width: size, height: size * 1.25 }}
    >
      {/* Outer Glow Halo Ring */}
      <div
        className="absolute rounded-full pointer-events-none transition-all duration-500 blur-xl"
        style={{
          width: size * 0.9,
          height: size * 0.9,
          top: size * 0.1,
          backgroundColor: isOffline ? 'transparent' : palette.glow,
          opacity: state === 'thinking' || state === 'processing' ? 0.7 : 0.35,
        }}
      />

      {/* Floating Accessory: Halo */}
      {accessory === 'halo' && (
        <motion.div
          animate={reducedMotion ? {} : { y: [-2, 2, -2] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-4 z-20"
        >
          <div
            className="w-24 h-6 rounded-full border-2 shadow-lg"
            style={{
              borderColor: '#fbbf24',
              boxShadow: '0 0 16px rgba(251, 191, 36, 0.8)',
            }}
          />
        </motion.div>
      )}

      {/* Floating Accessory: Wizard Hat */}
      {accessory === 'wizard-hat' && (
        <div className="absolute -top-16 z-20 flex flex-col items-center">
          <div
            className="w-0 h-0 border-l-[28px] border-l-transparent border-r-[28px] border-r-transparent border-b-[50px]"
            style={{ borderBottomColor: palette.primary }}
          />
          <div
            className="w-24 h-3 rounded-full -mt-1 shadow-md"
            style={{ backgroundColor: palette.accent || '#8b5cf6' }}
          />
          <span className="absolute text-yellow-300 text-xs top-4">⭐</span>
        </div>
      )}

      {/* Mascot Main Breathing / Hover Motion Container */}
      <motion.div
        animate={
          reducedMotion
            ? {}
            : state === 'sleeping'
            ? { y: [0, 4, 0] }
            : state === 'celebrating'
            ? { y: [0, -12, 0], scale: [1, 1.04, 1] }
            : { y: [-3, 3, -3] }
        }
        transition={{
          duration: breathDuration,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative flex flex-col items-center z-10"
        style={{
          transform: `perspective(400px) rotateX(${headRotX}deg) rotateY(${headRotY}deg) rotateZ(${headTilt}deg)`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        {/* Antenna / Star Top */}
        <div className="relative flex flex-col items-center -mb-2 z-0">
          <div
            className="w-1.5 h-6 rounded-full"
            style={{ backgroundColor: palette.primary }}
          />
          <div
            className="w-4 h-4 rounded-full -mt-2 shadow-md transition-transform"
            style={{
              backgroundColor: accessory === 'antenna-star' ? '#facc15' : palette.secondary,
              boxShadow: `0 0 10px ${palette.glow}`,
            }}
          >
            {accessory === 'antenna-star' && (
              <span className="text-[10px] flex items-center justify-center font-bold text-black">★</span>
            )}
          </div>
        </div>

        {/* Head Shell */}
        <div
          className="relative rounded-[36px] flex flex-col items-center justify-center shadow-2xl border-2 transition-colors duration-300"
          style={{
            width: size * 0.82,
            height: size * 0.72,
            backgroundColor: palette.bodyBg || '#0c1322',
            borderColor: palette.primary,
            boxShadow: `0 8px 32px rgba(0, 0, 0, 0.6), inset 0 0 16px ${palette.glow}`,
          }}
        >
          {/* Audio Pulsing Ears (Left & Right) */}
          <div
            className="absolute -left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-8 rounded-l-xl border-l-2 border-y-2 flex items-center justify-center"
            style={{
              backgroundColor: palette.bodyBg,
              borderColor: palette.primary,
            }}
          >
            {state === 'listening' && (
              <motion.div
                animate={{ height: ['20%', '80%', '20%'] }}
                transition={{ duration: 0.6, repeat: Infinity }}
                className="w-1 rounded-full bg-sky-400"
              />
            )}
          </div>
          <div
            className="absolute -right-3.5 top-1/2 -translate-y-1/2 w-3.5 h-8 rounded-r-xl border-r-2 border-y-2 flex items-center justify-center"
            style={{
              backgroundColor: palette.bodyBg,
              borderColor: palette.primary,
            }}
          >
            {state === 'listening' && (
              <motion.div
                animate={{ height: ['20%', '80%', '20%'] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                className="w-1 rounded-full bg-sky-400"
              />
            )}
          </div>

          {/* Accessory: Headphones */}
          {accessory === 'headphones' && (
            <div className="absolute -top-3 w-full flex items-center justify-between px-[-10px] pointer-events-none z-20">
              <div
                className="w-4 h-12 rounded-lg border shadow-md -ml-3"
                style={{ backgroundColor: palette.secondary, borderColor: '#fff' }}
              />
              <div
                className="w-full h-4 border-t-4 rounded-t-full -mt-8"
                style={{ borderColor: palette.secondary }}
              />
              <div
                className="w-4 h-12 rounded-lg border shadow-md -mr-3"
                style={{ backgroundColor: palette.secondary, borderColor: '#fff' }}
              />
            </div>
          )}

          {/* Screen Glass Visor */}
          <div
            className="relative rounded-[26px] p-2 flex flex-col items-center justify-center shadow-inner overflow-hidden"
            style={{
              width: size * 0.72,
              height: size * 0.58,
              backgroundColor: '#040711',
              border: `1px solid ${palette.primary}44`,
            }}
          >
            {/* Ambient Visor Specular Reflection */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-[26px] pointer-events-none" />

            {/* Accessory: Glasses */}
            {accessory === 'glasses' && (
              <div className="absolute top-4 w-full flex items-center justify-center gap-2 z-20 pointer-events-none">
                <div
                  className="w-10 h-6 rounded-md border-2"
                  style={{ borderColor: '#38bdf8', backgroundColor: 'rgba(56, 189, 248, 0.15)' }}
                />
                <div className="w-2 h-0.5 bg-sky-400" />
                <div
                  className="w-10 h-6 rounded-md border-2"
                  style={{ borderColor: '#38bdf8', backgroundColor: 'rgba(56, 189, 248, 0.15)' }}
                />
              </div>
            )}

            {/* Accessory: Cyber Visor */}
            {accessory === 'visor' && (
              <div
                className="absolute top-6 w-full h-5 rounded-full border shadow-lg z-20 pointer-events-none"
                style={{
                  backgroundColor: 'rgba(236, 72, 153, 0.4)',
                  borderColor: '#ec4899',
                  boxShadow: '0 0 12px rgba(236, 72, 153, 0.8)',
                }}
              />
            )}

            {/* Eyes Subsystem */}
            <CharacterEyeSystem
              shape={eyeShape}
              style={eyeStyle}
              gaze={gaze}
              palette={palette}
              size={size * 0.65}
              reducedMotion={reducedMotion}
            />

            {/* Face & Mouth Subsystem */}
            <div className="mt-1">
              <CharacterFace
                mouthShape={mouthShape}
                palette={palette}
                reaction={reaction}
                showBlush={showBlush}
                size={size * 0.65}
                reducedMotion={reducedMotion}
              />
            </div>
          </div>
        </div>

        {/* Mascot Torso / Body Base */}
        <div
          className="rounded-[20px] -mt-2 border flex items-center justify-center shadow-lg"
          style={{
            width: size * 0.46,
            height: size * 0.28,
            backgroundColor: palette.bodyBg,
            borderColor: palette.primary,
          }}
        >
          {/* Chest Indicator Light */}
          <div
            className="w-3 h-3 rounded-full transition-all duration-300"
            style={{
              backgroundColor:
                state === 'error'
                  ? '#ef4444'
                  : state === 'warning'
                  ? '#f59e0b'
                  : state === 'success' || state === 'celebrating'
                  ? '#10b981'
                  : palette.secondary,
              boxShadow: `0 0 8px ${
                state === 'error'
                  ? '#ef4444'
                  : state === 'warning'
                  ? '#f59e0b'
                  : palette.glow
              }`,
            }}
          />
        </div>

        {/* Floating Magnetic Hands & Gesture System */}
        {renderGestureHands(gesture, size, palette, reducedMotion)}
      </motion.div>
    </div>
  );
};

function renderGestureHands(
  gesture: CharacterGesture | string,
  size: number,
  palette: CharacterPalette,
  reducedMotion: boolean
) {
  const handSize = size * 0.16;

  switch (gesture) {
    case 'wave':
      return (
        <div className="absolute top-1/2 w-full flex items-center justify-between pointer-events-none">
          {/* Left Hand Normal */}
          <div
            className="rounded-full border shadow-md -ml-3"
            style={{
              width: handSize,
              height: handSize,
              backgroundColor: palette.bodyBg,
              borderColor: palette.primary,
            }}
          />
          {/* Right Hand Waving */}
          <motion.div
            animate={reducedMotion ? {} : { rotate: [0, 24, -12, 24, 0], y: [-4, -8, -4] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="rounded-full border shadow-md -mr-4 flex items-center justify-center font-bold text-xs"
            style={{
              width: handSize * 1.1,
              height: handSize * 1.1,
              backgroundColor: palette.bodyBg,
              borderColor: palette.secondary,
            }}
          >
            👋
          </motion.div>
        </div>
      );

    case 'chin-tap':
      return (
        <div className="absolute bottom-4 right-8 pointer-events-none z-30">
          <motion.div
            animate={reducedMotion ? {} : { y: [0, -3, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="rounded-full border shadow-md flex items-center justify-center text-xs"
            style={{
              width: handSize,
              height: handSize,
              backgroundColor: palette.bodyBg,
              borderColor: palette.secondary,
            }}
          >
            🤔
          </motion.div>
        </div>
      );

    case 'point-left':
      return (
        <div className="absolute top-1/2 -left-6 pointer-events-none z-30">
          <motion.div
            animate={reducedMotion ? {} : { x: [0, -6, 0] }}
            transition={{ duration: 0.9, repeat: Infinity }}
            className="rounded-full border shadow-md flex items-center justify-center text-xs"
            style={{
              width: handSize,
              height: handSize,
              backgroundColor: palette.bodyBg,
              borderColor: palette.secondary,
            }}
          >
            👈
          </motion.div>
        </div>
      );

    case 'point-right':
      return (
        <div className="absolute top-1/2 -right-6 pointer-events-none z-30">
          <motion.div
            animate={reducedMotion ? {} : { x: [0, 6, 0] }}
            transition={{ duration: 0.9, repeat: Infinity }}
            className="rounded-full border shadow-md flex items-center justify-center text-xs"
            style={{
              width: handSize,
              height: handSize,
              backgroundColor: palette.bodyBg,
              borderColor: palette.secondary,
            }}
          >
            👉
          </motion.div>
        </div>
      );

    case 'clap':
      return (
        <div className="absolute bottom-2 w-full flex items-center justify-center gap-2 pointer-events-none z-30">
          <motion.div
            animate={reducedMotion ? {} : { x: [0, 6, 0] }}
            transition={{ duration: 0.4, repeat: Infinity }}
            className="rounded-full border shadow-md"
            style={{
              width: handSize,
              height: handSize,
              backgroundColor: palette.bodyBg,
              borderColor: palette.primary,
            }}
          />
          <motion.div
            animate={reducedMotion ? {} : { x: [0, -6, 0] }}
            transition={{ duration: 0.4, repeat: Infinity }}
            className="rounded-full border shadow-md"
            style={{
              width: handSize,
              height: handSize,
              backgroundColor: palette.bodyBg,
              borderColor: palette.primary,
            }}
          />
        </div>
      );

    case 'confetti':
    case 'celebrate':
      return (
        <div className="absolute -top-4 w-full flex items-center justify-between px-[-8px] pointer-events-none z-30">
          <motion.div
            animate={reducedMotion ? {} : { y: [0, -8, 0], rotate: [-15, -25, -15] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="rounded-full border shadow-md flex items-center justify-center text-xs -ml-4"
            style={{
              width: handSize,
              height: handSize,
              backgroundColor: palette.bodyBg,
              borderColor: palette.secondary,
            }}
          >
            ✨
          </motion.div>
          <motion.div
            animate={reducedMotion ? {} : { y: [0, -8, 0], rotate: [15, 25, 15] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: 0.1 }}
            className="rounded-full border shadow-md flex items-center justify-center text-xs -mr-4"
            style={{
              width: handSize,
              height: handSize,
              backgroundColor: palette.bodyBg,
              borderColor: palette.secondary,
            }}
          >
            🎉
          </motion.div>
        </div>
      );

    case 'type-hands':
      return (
        <div className="absolute bottom-0 w-full flex items-center justify-center gap-4 pointer-events-none z-30">
          <motion.div
            animate={reducedMotion ? {} : { y: [0, -4, 0] }}
            transition={{ duration: 0.25, repeat: Infinity }}
            className="rounded-full border shadow-md"
            style={{
              width: handSize,
              height: handSize,
              backgroundColor: palette.bodyBg,
              borderColor: palette.primary,
            }}
          />
          <motion.div
            animate={reducedMotion ? {} : { y: [0, -4, 0] }}
            transition={{ duration: 0.25, repeat: Infinity, delay: 0.12 }}
            className="rounded-full border shadow-md"
            style={{
              width: handSize,
              height: handSize,
              backgroundColor: palette.bodyBg,
              borderColor: palette.secondary,
            }}
          />
        </div>
      );

    case 'shield':
      return (
        <div className="absolute top-1/3 w-full flex items-center justify-center gap-1 pointer-events-none z-30">
          <div
            className="rounded-2xl border-2 shadow-lg flex items-center justify-center text-xs"
            style={{
              width: handSize * 2,
              height: handSize * 1.5,
              backgroundColor: palette.bodyBg,
              borderColor: '#f59e0b',
            }}
          >
            🛡️
          </div>
        </div>
      );

    case 'shrug':
      return (
        <div className="absolute top-1/2 w-full flex items-center justify-between pointer-events-none z-30">
          <div
            className="rounded-full border shadow-md -ml-4"
            style={{
              width: handSize,
              height: handSize,
              backgroundColor: palette.bodyBg,
              borderColor: palette.secondary,
            }}
          />
          <div
            className="rounded-full border shadow-md -mr-4"
            style={{
              width: handSize,
              height: handSize,
              backgroundColor: palette.bodyBg,
              borderColor: palette.secondary,
            }}
          />
        </div>
      );

    default:
      // Subtle idle floating hands
      return (
        <div className="absolute top-1/2 w-full flex items-center justify-between px-[-4px] pointer-events-none">
          <div
            className="rounded-full border shadow-sm -ml-2 transition-transform"
            style={{
              width: handSize * 0.85,
              height: handSize * 0.85,
              backgroundColor: palette.bodyBg,
              borderColor: palette.primary,
            }}
          />
          <div
            className="rounded-full border shadow-sm -mr-2 transition-transform"
            style={{
              width: handSize * 0.85,
              height: handSize * 0.85,
              backgroundColor: palette.bodyBg,
              borderColor: palette.primary,
            }}
          />
        </div>
      );
  }
}
