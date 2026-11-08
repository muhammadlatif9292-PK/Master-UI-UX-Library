/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { EyeShape, EyeStyle, CharacterPalette } from '../types';
import { GazeVector } from '../CharacterAttentionEngine';

interface CharacterEyeSystemProps {
  shape?: EyeShape;
  style?: EyeStyle;
  gaze?: GazeVector;
  palette: CharacterPalette;
  eyebrowTilt?: number; // -20 to +20 deg
  size?: number; // width in px
  reducedMotion?: boolean;
}

export const CharacterEyeSystem: React.FC<CharacterEyeSystemProps> = ({
  shape = 'normal',
  style = 'digital-led',
  gaze = { x: 0, y: 0, distance: 0, isBlinking: false, pupilDilation: 1 },
  palette,
  eyebrowTilt = 0,
  size = 120,
  reducedMotion = false,
}) => {
  // Eye center offset based on gaze tracking (clamped)
  const maxPupilOffset = size * 0.14;
  const pupilX = reducedMotion ? 0 : gaze.x * maxPupilOffset;
  const pupilY = reducedMotion ? 0 : gaze.y * maxPupilOffset;
  const isBlinking = gaze.isBlinking && !reducedMotion;

  const eyeWidth = size * 0.32;
  const eyeHeight = size * 0.42;
  const eyeSpacing = size * 0.22;

  // Render individual eye graphic
  const renderEyeShape = (isLeft: boolean) => {
    // If blinking, render closed flat arc
    if (isBlinking || shape === 'sleepy') {
      return (
        <path
          d={`M 0,${eyeHeight * 0.15} Q ${eyeWidth * 0.5},${eyeHeight * 0.35} ${eyeWidth},${eyeHeight * 0.15}`}
          fill="none"
          stroke={palette.eyeColor}
          strokeWidth={size * 0.05}
          strokeLinecap="round"
        />
      );
    }

    if (shape === 'wink-left' && isLeft) {
      return (
        <path
          d={`M 0,${eyeHeight * 0.15} Q ${eyeWidth * 0.5},${eyeHeight * 0.35} ${eyeWidth},${eyeHeight * 0.15}`}
          fill="none"
          stroke={palette.eyeColor}
          strokeWidth={size * 0.05}
          strokeLinecap="round"
        />
      );
    }

    if (shape === 'wink-right' && !isLeft) {
      return (
        <path
          d={`M 0,${eyeHeight * 0.15} Q ${eyeWidth * 0.5},${eyeHeight * 0.35} ${eyeWidth},${eyeHeight * 0.15}`}
          fill="none"
          stroke={palette.eyeColor}
          strokeWidth={size * 0.05}
          strokeLinecap="round"
        />
      );
    }

    if (shape === 'happy') {
      return (
        <path
          d={`M 0,${eyeHeight * 0.25} Q ${eyeWidth * 0.5},${-eyeHeight * 0.1} ${eyeWidth},${eyeHeight * 0.25}`}
          fill="none"
          stroke={palette.eyeColor}
          strokeWidth={size * 0.06}
          strokeLinecap="round"
        />
      );
    }

    if (shape === 'x-eyes') {
      const halfW = eyeWidth * 0.5;
      const halfH = eyeHeight * 0.5;
      return (
        <g stroke={palette.eyeColor} strokeWidth={size * 0.06} strokeLinecap="round">
          <line x1={0} y1={0} x2={eyeWidth} y2={eyeHeight} />
          <line x1={eyeWidth} y1={0} x2={0} y2={eyeHeight} />
        </g>
      );
    }

    if (shape === 'stars') {
      const cx = eyeWidth * 0.5;
      const cy = eyeHeight * 0.5;
      const r = eyeWidth * 0.5;
      return (
        <path
          d={`M ${cx},${cy - r} L ${cx + r * 0.3},${cy - r * 0.3} L ${cx + r},${cy} L ${cx + r * 0.3},${cy + r * 0.3} L ${cx},${cy + r} L ${cx - r * 0.3},${cy + r * 0.3} L ${cx - r},${cy} L ${cx - r * 0.3},${cy - r * 0.3} Z`}
          fill={palette.eyeColor}
          filter="drop-shadow(0 0 6px rgba(255,255,255,0.8))"
        />
      );
    }

    if (shape === 'hearts') {
      const cx = eyeWidth * 0.5;
      const cy = eyeHeight * 0.5;
      return (
        <path
          d={`M ${cx},${cy + eyeHeight * 0.35} C ${cx - eyeWidth * 0.6},${cy} ${cx - eyeWidth * 0.5},${cy - eyeHeight * 0.45} ${cx},${cy - eyeHeight * 0.2} C ${cx + eyeWidth * 0.5},${cy - eyeHeight * 0.45} ${cx + eyeWidth * 0.6},${cy} ${cx},${cy + eyeHeight * 0.35} Z`}
          fill={palette.accent || '#f43f5e'}
          filter="drop-shadow(0 0 4px rgba(244,63,94,0.7))"
        />
      );
    }

    if (shape === 'squint') {
      return (
        <g>
          <ellipse
            cx={eyeWidth * 0.5}
            cy={eyeHeight * 0.5}
            rx={eyeWidth * 0.48}
            ry={eyeHeight * 0.2}
            fill="#090c14"
            stroke={palette.primary}
            strokeWidth={size * 0.03}
          />
          {/* Pupil */}
          <circle
            cx={eyeWidth * 0.5 + pupilX}
            cy={eyeHeight * 0.5 + pupilY * 0.5}
            r={size * 0.05 * gaze.pupilDilation}
            fill={palette.eyeColor}
          />
        </g>
      );
    }

    // Default / Normal / Wide / Suspicious
    const rx = shape === 'wide' ? eyeWidth * 0.54 : shape === 'suspicious' ? eyeWidth * 0.42 : eyeWidth * 0.48;
    const ry = shape === 'wide' ? eyeHeight * 0.54 : shape === 'suspicious' ? eyeHeight * 0.32 : eyeHeight * 0.48;

    return (
      <g>
        {/* Eye Socket / Outer Sclera */}
        <ellipse
          cx={eyeWidth * 0.5}
          cy={eyeHeight * 0.5}
          rx={rx}
          ry={ry}
          fill="#060911"
          stroke={palette.secondary}
          strokeWidth={size * 0.035}
          className="transition-all duration-150"
        />

        {/* Digital Grid pattern for LED style */}
        {style === 'digital-led' && (
          <ellipse
            cx={eyeWidth * 0.5}
            cy={eyeHeight * 0.5}
            rx={rx * 0.9}
            ry={ry * 0.9}
            fill="none"
            stroke={palette.primary}
            strokeWidth={0.5}
            strokeDasharray="2 3"
            opacity={0.4}
          />
        )}

        {/* Iris / Pupil Group with Look-At translation */}
        <g
          transform={`translate(${pupilX}, ${pupilY})`}
          className="transition-transform duration-100 ease-out"
        >
          <circle
            cx={eyeWidth * 0.5}
            cy={eyeHeight * 0.5}
            r={size * 0.09 * gaze.pupilDilation}
            fill={palette.eyeColor}
            filter={`drop-shadow(0 0 ${size * 0.04}px ${palette.glow})`}
          />
          {/* Specular Glint Highlight */}
          <circle
            cx={eyeWidth * 0.5 - size * 0.03}
            cy={eyeHeight * 0.5 - size * 0.03}
            r={size * 0.028}
            fill="#ffffff"
            opacity={0.9}
          />
          <circle
            cx={eyeWidth * 0.5 + size * 0.025}
            cy={eyeHeight * 0.5 + size * 0.025}
            r={size * 0.015}
            fill="#ffffff"
            opacity={0.6}
          />
        </g>
      </g>
    );
  };

  // Eyebrow geometry
  const leftBrowTilt = eyebrowTilt;
  const rightBrowTilt = -eyebrowTilt;

  return (
    <svg
      width={size}
      height={size * 0.65}
      viewBox={`0 0 ${size} ${size * 0.65}`}
      className="overflow-visible select-none"
    >
      {/* Left Eyebrow */}
      <g
        transform={`translate(${size * 0.15 + eyeWidth * 0.5}, ${size * 0.12}) rotate(${leftBrowTilt})`}
        className="transition-transform duration-200 ease-out"
      >
        <line
          x1={-eyeWidth * 0.45}
          y1={0}
          x2={eyeWidth * 0.45}
          y2={0}
          stroke={palette.secondary}
          strokeWidth={size * 0.04}
          strokeLinecap="round"
        />
      </g>

      {/* Right Eyebrow */}
      <g
        transform={`translate(${size * 0.15 + eyeWidth + eyeSpacing + eyeWidth * 0.5}, ${size * 0.12}) rotate(${rightBrowTilt})`}
        className="transition-transform duration-200 ease-out"
      >
        <line
          x1={-eyeWidth * 0.45}
          y1={0}
          x2={eyeWidth * 0.45}
          y2={0}
          stroke={palette.secondary}
          strokeWidth={size * 0.04}
          strokeLinecap="round"
        />
      </g>

      {/* Left Eye */}
      <g transform={`translate(${size * 0.15}, ${size * 0.2})`}>
        {renderEyeShape(true)}
      </g>

      {/* Right Eye */}
      <g transform={`translate(${size * 0.15 + eyeWidth + eyeSpacing}, ${size * 0.2})`}>
        {renderEyeShape(false)}
      </g>
    </svg>
  );
};
