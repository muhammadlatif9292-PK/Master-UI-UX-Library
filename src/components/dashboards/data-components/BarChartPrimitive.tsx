/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { VisualRecipeStyle } from '../types';
import { VISUAL_RECIPES } from '../recipes';

interface BarChartProps {
  data?: { label: string; value: number; value2?: number; category?: string }[];
  recipe?: VisualRecipeStyle;
  height?: number;
  layout?: 'vertical' | 'horizontal';
  title?: string;
  unit?: string;
}

const DEFAULT_DATA = [
  { label: 'Compute', value: 84, value2: 62 },
  { label: 'Memory', value: 92, value2: 78 },
  { label: 'Storage', value: 45, value2: 40 },
  { label: 'Network', value: 68, value2: 55 },
  { label: 'GPU Pool', value: 96, value2: 88 },
  { label: 'Cache Hit', value: 74, value2: 60 },
];

export function BarChartPrimitive({
  data = DEFAULT_DATA,
  recipe = VISUAL_RECIPES['scientific'],
  height = 200,
  layout = 'vertical',
  title = 'Resource Allocation Matrix',
  unit = '%',
}: BarChartProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const maxValue = Math.max(...data.flatMap((d) => [d.value, d.value2 ?? 0])) * 1.15;
  const padding = { top: 20, right: 20, bottom: 30, left: 35 };
  const width = 500;
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  const barGroupWidth = innerWidth / data.length;
  const barWidth = barGroupWidth * 0.35;

  return (
    <div
      role="region"
      aria-label={`${title} bar chart`}
      tabIndex={0}
      className={`p-4 rounded-xl border ${recipe.borderClass} ${recipe.cardClass} relative overflow-hidden focus:outline-none focus:ring-1 focus:ring-sky-500`}
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className={`text-sm font-semibold ${recipe.textPrimary}`}>{title}</h4>
          <p className={`text-xs ${recipe.textMuted}`}>Comparative capacity telemetry</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs" style={{ backgroundColor: recipe.accentColor }} />
            <span className={recipe.textSecondary}>Allocated</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs" style={{ backgroundColor: recipe.secondaryColor }} />
            <span className={recipe.textSecondary}>Reserved</span>
          </span>
        </div>
      </div>

      <div className="relative w-full" style={{ height }}>
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible" role="img">
          {/* Y Axis Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((r, i) => {
            const y = padding.top + innerHeight * r;
            const val = maxValue * (1 - r);
            return (
              <g key={i}>
                <line
                  x1={padding.left}
                  y1={y}
                  x2={width - padding.right}
                  y2={y}
                  stroke={recipe.gridLineColor}
                  strokeDasharray="2 2"
                />
                <text
                  x={padding.left - 6}
                  y={y + 3}
                  fill="currentColor"
                  className={`text-[10px] ${recipe.textMuted}`}
                  textAnchor="end"
                >
                  {val.toFixed(0)}
                </text>
              </g>
            );
          })}

          {/* Bars */}
          {data.map((d, i) => {
            const groupX = padding.left + i * barGroupWidth;
            const h1 = (d.value / maxValue) * innerHeight;
            const y1 = padding.top + innerHeight - h1;
            const isHovered = hoverIndex === i;

            const hasVal2 = d.value2 !== undefined;
            const h2 = hasVal2 ? (d.value2! / maxValue) * innerHeight : 0;
            const y2 = padding.top + innerHeight - h2;

            return (
              <g
                key={i}
                className="cursor-pointer transition-opacity"
                opacity={hoverIndex !== null && !isHovered ? 0.45 : 1}
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                {/* Bar 1 */}
                <rect
                  x={groupX + (barGroupWidth - (hasVal2 ? barWidth * 2 + 4 : barWidth)) / 2}
                  y={y1}
                  width={barWidth}
                  height={h1}
                  rx="3"
                  fill={recipe.accentColor}
                  filter={isHovered && recipe.glowEffect !== 'none' ? `drop-shadow(0 0 8px ${recipe.accentColor})` : undefined}
                />

                {/* Bar 2 */}
                {hasVal2 && (
                  <rect
                    x={groupX + (barGroupWidth - (barWidth * 2 + 4)) / 2 + barWidth + 4}
                    y={y2}
                    width={barWidth}
                    height={h2}
                    rx="3"
                    fill={recipe.secondaryColor}
                  />
                )}

                {/* Value on top of Bar 1 when hovered */}
                {isHovered && (
                  <text
                    x={groupX + barGroupWidth / 2}
                    y={Math.min(y1, y2) - 6}
                    fill="currentColor"
                    className={`text-[11px] font-bold ${recipe.textPrimary}`}
                    textAnchor="middle"
                  >
                    {d.value}{unit}
                  </text>
                )}

                {/* X Axis Label */}
                <text
                  x={groupX + barGroupWidth / 2}
                  y={height - padding.bottom + 16}
                  fill="currentColor"
                  className={`text-[10px] ${recipe.textSecondary} font-medium`}
                  textAnchor="middle"
                >
                  {d.label}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Floating Tooltip */}
        {hoverIndex !== null && (
          <div
            className="absolute pointer-events-none z-20 px-2 py-1 rounded-md border text-xs shadow-xl backdrop-blur-md"
            style={{
              backgroundColor: recipe.tooltipBg,
              borderColor: recipe.borderClass,
              left: `${((padding.left + hoverIndex * barGroupWidth + barGroupWidth / 2) / width) * 100}%`,
              top: '6px',
              transform: 'translateX(-50%)',
            }}
          >
            <div className={`font-semibold ${recipe.textPrimary}`}>{data[hoverIndex].label}</div>
            <div className="text-xs text-white">
              Allocated: <strong style={{ color: recipe.accentColor }}>{data[hoverIndex].value}{unit}</strong>
            </div>
            {data[hoverIndex].value2 !== undefined && (
              <div className="text-xs text-slate-300">
                Reserved: <strong style={{ color: recipe.secondaryColor }}>{data[hoverIndex].value2}{unit}</strong>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
