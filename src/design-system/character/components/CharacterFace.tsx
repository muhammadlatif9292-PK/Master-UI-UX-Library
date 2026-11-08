/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MouthShape, CharacterPalette, CharacterReaction } from '../types';

interface CharacterFaceProps {
  mouthShape?: MouthShape;
  palette: CharacterPalette;
  reaction?: CharacterReaction;
  showBlush?: boolean;
  size?: number;
  reducedMotion?: boolean;
}

export const CharacterFace: React.FC<CharacterFaceProps> = ({
  mouthShape = 'smile',
  palette,
  reaction = 'none',
  showBlush = false,
  size = 120,
  reducedMotion = false,
}) => {
  const mouthWidth = size * 0.28;
  const mouthHeight = size * 0.16;

  const renderMouth = () => {
    switch (mouthShape) {
      case 'smile':
        return (
          <path
            d={`M 0,0 Q ${mouthWidth * 0.5},${mouthHeight * 0.8} ${mouthWidth},0`}
            fill="none"
            stroke={palette.primary}
            strokeWidth={size * 0.045}
            strokeLinecap="round"
          />
        );
      case 'big-smile':
        return (
          <path
            d={`M 0,0 Q ${mouthWidth * 0.5},${mouthHeight * 1.2} ${mouthWidth},0 Z`}
            fill={palette.primary}
            stroke={palette.secondary}
            strokeWidth={size * 0.03}
          />
        );
      case 'open':
      case 'talk':
        return (
          <ellipse
            cx={mouthWidth * 0.5}
            cy={mouthHeight * 0.4}
            rx={mouthWidth * 0.35}
            ry={mouthHeight * 0.45}
            fill="#060911"
            stroke={palette.primary}
            strokeWidth={size * 0.04}
          />
        );
      case 'surprised':
        return (
          <circle
            cx={mouthWidth * 0.5}
            cy={mouthHeight * 0.4}
            r={mouthWidth * 0.32}
            fill="#060911"
            stroke={palette.secondary}
            strokeWidth={size * 0.04}
          />
        );
      case 'frown':
        return (
          <path
            d={`M 0,${mouthHeight * 0.6} Q ${mouthWidth * 0.5},${-mouthHeight * 0.3} ${mouthWidth},${mouthHeight * 0.6}`}
            fill="none"
            stroke={palette.primary}
            strokeWidth={size * 0.045}
            strokeLinecap="round"
          />
        );
      case 'smirk':
        return (
          <path
            d={`M 0,${mouthHeight * 0.3} Q ${mouthWidth * 0.6},${mouthHeight * 0.6} ${mouthWidth},0`}
            fill="none"
            stroke={palette.primary}
            strokeWidth={size * 0.045}
            strokeLinecap="round"
          />
        );
      case 'cat':
        return (
          <path
            d={`M 0,0 Q ${mouthWidth * 0.25},${mouthHeight * 0.5} ${mouthWidth * 0.5},0 Q ${mouthWidth * 0.75},${mouthHeight * 0.5} ${mouthWidth},0`}
            fill="none"
            stroke={palette.primary}
            strokeWidth={size * 0.04}
            strokeLinecap="round"
          />
        );
      case 'flat':
        return (
          <line
            x1={0}
            y1={mouthHeight * 0.2}
            x2={mouthWidth}
            y2={mouthHeight * 0.2}
            stroke={palette.primary}
            strokeWidth={size * 0.04}
            strokeLinecap="round"
          />
        );
      case 'neutral':
      default:
        return (
          <path
            d={`M 0,0 Q ${mouthWidth * 0.5},${mouthHeight * 0.3} ${mouthWidth},0`}
            fill="none"
            stroke={palette.primary}
            strokeWidth={size * 0.04}
            strokeLinecap="round"
          />
        );
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center pointer-events-none select-none">
      {/* Blush cheeks */}
      {showBlush && (
        <div
          className="absolute flex items-center justify-between w-full px-2 -top-1 pointer-events-none"
          style={{ width: size * 0.9 }}
        >
          <div
            className="rounded-full blur-[2px] opacity-75"
            style={{
              width: size * 0.16,
              height: size * 0.09,
              backgroundColor: palette.blushColor || '#f43f5e',
            }}
          />
          <div
            className="rounded-full blur-[2px] opacity-75"
            style={{
              width: size * 0.16,
              height: size * 0.09,
              backgroundColor: palette.blushColor || '#f43f5e',
            }}
          />
        </div>
      )}

      {/* Mouth Graphic */}
      <svg
        width={mouthWidth}
        height={mouthHeight}
        viewBox={`0 0 ${mouthWidth} ${mouthHeight}`}
        className="overflow-visible"
      >
        {renderMouth()}
      </svg>

      {/* Reaction Particles / Micro-emotes */}
      <AnimatePresence>
        {reaction === 'sweat' && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.6 }}
            className="absolute -top-12 -right-4 text-sky-400 font-mono text-lg font-bold"
          >
            💧
          </motion.div>
        )}

        {reaction === 'heart' && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 0 }}
            animate={{ opacity: 1, scale: [0, 1.2, 1], y: -20 }}
            exit={{ opacity: 0, scale: 0.4 }}
            className="absolute -top-14 text-rose-400 text-xl font-bold"
          >
            💖
          </motion.div>
        )}

        {reaction === 'sparkle' && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: [0, 1.3, 1], rotate: [0, 45, 90] }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute -top-14 text-amber-300 text-xl font-bold"
          >
            ✨
          </motion.div>
        )}

        {reaction === 'question' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: -16, rotate: [0, 15, 0] }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute -top-14 -right-3 text-sky-300 font-mono text-xl font-bold"
          >
            ❓
          </motion.div>
        )}

        {reaction === 'alert' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: [1, 1.3, 1] }}
            exit={{ opacity: 0, scale: 0 }}
            className="absolute -top-14 text-red-500 font-mono text-xl font-bold"
          >
            ⚠️
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
