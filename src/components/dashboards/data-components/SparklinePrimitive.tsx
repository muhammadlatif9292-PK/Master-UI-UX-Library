/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { VisualRecipeStyle } from '../types';
import { VISUAL_RECIPES } from '../recipes';

interface SparklineProps {
  data?: number[];
  label?: string;
  value?: string | number;
  delta?: string;
  isPositive?: boolean;
  recipe?: VisualRecipeStyle;
  width?: number;
  height?: number;
  fill?: boolean;
}

export function SparklinePrimitive({
  data = [12, 18, 15, 24, 22, 35, 42, 38, 48, 55, 52, 64],
  label = 'Inference Throughput',
  value = '2,840 req/s',
  delta = '+18.4%',
  isPositive = true,
  recipe = VISUAL_RECIPES['luminous-data'],
  width = 140,
  height = 42,
  fill = true,
}: SparklineProps) {
  const min = Math.min(...data);
  const max = Math.max(...data) || 1;
  const range = max - min || 1;

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - 4 - ((d - min) / range) * (height - 8);
    return `${x},${y}`;
  });

  const linePath = `M ${points.join(' L ')}`;
  const areaPath = `M 0,${height} L ${points.join(' L ')} L ${width},${height} Z`;

  const sparkColor = isPositive ? recipe.accentColor : '#ef4444';

  return (
    <div
      role="region"
      aria-label={`${label} sparkline`}
      tabIndex={0}
      className={`p-3.5 rounded-xl border ${recipe.borderClass} ${recipe.cardClass} flex items-center justify-between gap-4 focus:outline-none focus:ring-1 focus:ring-sky-500`}
    >
      <div>
        <span className={`text-xs ${recipe.textMuted} block`}>{label}</span>
        <div className={`text-lg font-bold font-mono ${recipe.textPrimary} mt-0.5`}>{value}</div>
        <div className="flex items-center gap-1.5 mt-1">
          <span
            className={`text-[10px] font-bold px-1.5 py-0.2 rounded-xs font-mono ${
              isPositive
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
            }`}
          >
            {delta}
          </span>
          <span className={`text-[10px] ${recipe.textMuted}`}>vs prev hr</span>
        </div>
      </div>

      {/* SVG Micro Sparkline */}
      <div className="relative" style={{ width, height }}>
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible" role="img">
          <defs>
            <linearGradient id={`sparkGrad-${recipe.id}-${label.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={sparkColor} stopOpacity="0.4" />
              <stop offset="100%" stopColor={sparkColor} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {fill && <path d={areaPath} fill={`url(#sparkGrad-${recipe.id}-${label.replace(/\s+/g, '')})`} />}
          <path
            d={linePath}
            fill="none"
            stroke={sparkColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Terminal node point */}
          <circle
            cx={width}
            cy={height - 4 - ((data[data.length - 1] - min) / range) * (height - 8)}
            r="3"
            fill="#ffffff"
            stroke={sparkColor}
            strokeWidth="1.5"
          />
        </svg>
      </div>
    </div>
  );
}
