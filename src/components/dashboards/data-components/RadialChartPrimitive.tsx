/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { VisualRecipeStyle } from '../types';
import { VISUAL_RECIPES } from '../recipes';

interface RadialRing {
  label: string;
  value: number; // 0 - 100
  color?: string;
}

interface RadialChartProps {
  rings?: RadialRing[];
  recipe?: VisualRecipeStyle;
  size?: number;
  title?: string;
  centerLabel?: string;
  centerValue?: string;
}

const DEFAULT_RINGS: RadialRing[] = [
  { label: 'Cluster Alpha', value: 88, color: '#38bdf8' },
  { label: 'Neural Mesh', value: 65, color: '#818cf8' },
  { label: 'Vector Cache', value: 42, color: '#34d399' },
];

export function RadialChartPrimitive({
  rings = DEFAULT_RINGS,
  recipe = VISUAL_RECIPES['quantum'],
  size = 200,
  title = 'Multi-Ring Convergence',
  centerLabel = 'Core Load',
  centerValue = '78.4%',
}: RadialChartProps) {
  const [hoverRing, setHoverRing] = useState<number | null>(null);

  const center = size / 2;
  const strokeWidth = 10;
  const gap = 6;
  const outerRadius = center - 16;

  return (
    <div
      role="region"
      aria-label={`${title} radial chart`}
      tabIndex={0}
      className={`p-4 rounded-xl border ${recipe.borderClass} ${recipe.cardClass} relative flex flex-col items-center justify-between focus:outline-none focus:ring-1 focus:ring-sky-500`}
    >
      <div className="w-full flex items-center justify-between mb-2">
        <h4 className={`text-sm font-semibold ${recipe.textPrimary}`}>{title}</h4>
        <span className={`text-[10px] px-2 py-0.5 rounded-full ${recipe.badgeClass}`}>Radial Matrix</span>
      </div>

      <div className="relative flex items-center justify-center my-2" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible" role="img">
          {rings.map((ring, i) => {
            const radius = outerRadius - i * (strokeWidth + gap);
            const circumference = 2 * Math.PI * radius;
            const progress = (ring.value / 100) * circumference;
            const ringColor = ring.color || (i === 0 ? recipe.accentColor : i === 1 ? recipe.secondaryColor : recipe.tertiaryColor);
            const isHovered = hoverRing === i;

            return (
              <g
                key={i}
                className="cursor-pointer transition-all"
                onMouseEnter={() => setHoverRing(i)}
                onMouseLeave={() => setHoverRing(null)}
              >
                {/* Background track */}
                <circle
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="none"
                  stroke={recipe.gridLineColor}
                  strokeWidth={strokeWidth}
                  opacity="0.5"
                />

                {/* Progress arc */}
                <circle
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="none"
                  stroke={ringColor}
                  strokeWidth={strokeWidth}
                  strokeDasharray={`${progress} ${circumference}`}
                  strokeDashoffset={0}
                  strokeLinecap="round"
                  transform={`rotate(-90 ${center} ${center})`}
                  className="transition-all duration-700 ease-out"
                  filter={isHovered && recipe.glowEffect !== 'none' ? `drop-shadow(0 0 8px ${ringColor})` : undefined}
                />
              </g>
            );
          })}
        </svg>

        {/* Center Readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
          <span className={`text-xs ${recipe.textMuted} uppercase tracking-wider`}>
            {hoverRing !== null ? rings[hoverRing].label : centerLabel}
          </span>
          <span className={`text-xl font-bold font-mono ${recipe.textPrimary}`}>
            {hoverRing !== null ? `${rings[hoverRing].value}%` : centerValue}
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="w-full grid grid-cols-3 gap-2 mt-2 pt-3 border-t border-white/5 text-center">
        {rings.map((ring, i) => {
          const ringColor = ring.color || (i === 0 ? recipe.accentColor : i === 1 ? recipe.secondaryColor : recipe.tertiaryColor);
          return (
            <div
              key={i}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                hoverRing === i ? 'border-white/30 bg-white/5' : 'border-transparent'
              }`}
              onMouseEnter={() => setHoverRing(i)}
              onMouseLeave={() => setHoverRing(null)}
            >
              <div className="flex items-center justify-center gap-1.5 mb-0.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: ringColor }} />
                <span className={`text-[10px] truncate ${recipe.textSecondary}`}>{ring.label}</span>
              </div>
              <div className={`text-xs font-mono font-bold ${recipe.textPrimary}`}>{ring.value}%</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
