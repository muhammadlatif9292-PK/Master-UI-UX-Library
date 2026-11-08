/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { VisualRecipeStyle } from '../types';
import { VISUAL_RECIPES } from '../recipes';

interface LineChartProps {
  data?: { x: string; y: number; y2?: number }[];
  recipe?: VisualRecipeStyle;
  height?: number;
  showPoints?: boolean;
  showGrid?: boolean;
  showTooltip?: boolean;
  title?: string;
  series1Label?: string;
  series2Label?: string;
  unit?: string;
}

const DEFAULT_DATA = [
  { x: '00:00', y: 32, y2: 45 },
  { x: '03:00', y: 48, y2: 52 },
  { x: '06:00', y: 42, y2: 38 },
  { x: '09:00', y: 78, y2: 65 },
  { x: '12:00', y: 92, y2: 84 },
  { x: '15:00', y: 85, y2: 70 },
  { x: '18:00', y: 64, y2: 60 },
  { x: '21:00', y: 55, y2: 48 },
  { x: '24:00', y: 40, y2: 35 },
];

export function LineChartPrimitive({
  data = DEFAULT_DATA,
  recipe = VISUAL_RECIPES['luminous-data'],
  height = 200,
  showPoints = true,
  showGrid = true,
  showTooltip = true,
  title = 'Real-Time Vector Trajectory',
  series1Label = 'Primary Signal',
  series2Label = 'Secondary Reference',
  unit = 'MB/s',
}: LineChartProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const padding = { top: 20, right: 25, bottom: 30, left: 35 };
  const width = 500;
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  const allY = data.flatMap((d) => [d.y, d.y2 ?? d.y]);
  const minY = Math.min(...allY) * 0.85;
  const maxY = Math.max(...allY) * 1.15 || 100;

  const getX = (index: number) => padding.left + (index / (data.length - 1)) * innerWidth;
  const getY = (val: number) => padding.top + innerHeight - ((val - minY) / (maxY - minY)) * innerHeight;

  // Build SVG path strings
  const path1 = data.reduce((acc, curr, i) => {
    const x = getX(i);
    const y = getY(curr.y);
    return i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, '');

  const hasSeries2 = data.some((d) => d.y2 !== undefined);
  const path2 = hasSeries2
    ? data.reduce((acc, curr, i) => {
        const x = getX(i);
        const y = getY(curr.y2 || 0);
        return i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
      }, '')
    : '';

  const hoveredItem = hoverIndex !== null ? data[hoverIndex] : null;

  return (
    <div
      role="region"
      aria-label={`${title} chart`}
      tabIndex={0}
      className={`p-4 rounded-xl border ${recipe.borderClass} ${recipe.cardClass} relative overflow-hidden focus:outline-none focus:ring-1 focus:ring-sky-500`}
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className={`text-sm font-semibold ${recipe.textPrimary}`}>{title}</h4>
          <p className={`text-xs ${recipe.textMuted}`}>Continuous stream telemetry</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: recipe.accentColor }} />
            <span className={recipe.textSecondary}>{series1Label}</span>
          </div>
          {hasSeries2 && (
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: recipe.secondaryColor }} />
              <span className={recipe.textSecondary}>{series2Label}</span>
            </div>
          )}
        </div>
      </div>

      <div className="relative w-full" style={{ height }}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
          role="img"
          aria-label={`Line chart showing ${series1Label} values from ${minY.toFixed(0)} to ${maxY.toFixed(0)}`}
        >
          <defs>
            <linearGradient id={`lineGrad1-${recipe.id}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={recipe.accentColor} stopOpacity="0.8" />
              <stop offset="100%" stopColor={recipe.accentColor} stopOpacity="1" />
            </linearGradient>
            <linearGradient id={`lineGrad2-${recipe.id}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={recipe.secondaryColor} stopOpacity="0.8" />
              <stop offset="100%" stopColor={recipe.secondaryColor} stopOpacity="1" />
            </linearGradient>
            <filter id={`glow-${recipe.id}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Grid lines */}
          {showGrid && (
            <g className="grid-lines" opacity="0.7">
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
                const y = padding.top + innerHeight * ratio;
                const val = maxY - (maxY - minY) * ratio;
                return (
                  <g key={i}>
                    <line
                      x1={padding.left}
                      y1={y}
                      x2={width - padding.right}
                      y2={y}
                      stroke={recipe.gridLineColor}
                      strokeDasharray="3 3"
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
            </g>
          )}

          {/* X Axis Ticks */}
          {data.map((d, i) => {
            const x = getX(i);
            return (
              <g key={i}>
                <line
                  x1={x}
                  y1={height - padding.bottom}
                  x2={x}
                  y2={height - padding.bottom + 4}
                  stroke={recipe.gridLineColor}
                />
                <text
                  x={x}
                  y={height - padding.bottom + 14}
                  fill="currentColor"
                  className={`text-[10px] ${recipe.textMuted}`}
                  textAnchor="middle"
                >
                  {d.x}
                </text>
              </g>
            );
          })}

          {/* Series 2 Path */}
          {hasSeries2 && (
            <path
              d={path2}
              fill="none"
              stroke={recipe.secondaryColor}
              strokeWidth="2"
              strokeDasharray="4 3"
              className="transition-all duration-300"
            />
          )}

          {/* Series 1 Path */}
          <path
            d={path1}
            fill="none"
            stroke={recipe.accentColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={recipe.glowEffect !== 'none' ? `url(#glow-${recipe.id})` : undefined}
            className="transition-all duration-300"
          />

          {/* Hover Crosshair */}
          {hoverIndex !== null && (
            <g>
              <line
                x1={getX(hoverIndex)}
                y1={padding.top}
                x2={getX(hoverIndex)}
                y2={height - padding.bottom}
                stroke={recipe.accentColor}
                strokeWidth="1.5"
                strokeDasharray="2 2"
                opacity="0.8"
              />
              <circle
                cx={getX(hoverIndex)}
                cy={getY(data[hoverIndex].y)}
                r="5"
                fill={recipe.accentColor}
                stroke="#fff"
                strokeWidth="2"
              />
              {hasSeries2 && data[hoverIndex].y2 !== undefined && (
                <circle
                  cx={getX(hoverIndex)}
                  cy={getY(data[hoverIndex].y2!)}
                  r="4"
                  fill={recipe.secondaryColor}
                  stroke="#fff"
                  strokeWidth="1.5"
                />
              )}
            </g>
          )}

          {/* Points */}
          {showPoints &&
            data.map((d, i) => (
              <circle
                key={i}
                cx={getX(i)}
                cy={getY(d.y)}
                r={hoverIndex === i ? 6 : 3.5}
                fill={hoverIndex === i ? '#ffffff' : recipe.accentColor}
                stroke={recipe.accentColor}
                strokeWidth="1.5"
                className="cursor-pointer transition-all"
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
              />
            ))}

          {/* Invisible hover capture zones */}
          {data.map((_, i) => {
            const x = getX(i);
            const w = innerWidth / data.length;
            return (
              <rect
                key={i}
                x={x - w / 2}
                y={padding.top}
                width={w}
                height={innerHeight}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHoverIndex(i)}
                onMouseLeave={() => setHoverIndex(null)}
              />
            );
          })}
        </svg>

        {/* Accessible Floating Tooltip */}
        {showTooltip && hoveredItem && hoverIndex !== null && (
          <div
            className="absolute pointer-events-none z-20 px-2.5 py-1.5 rounded-lg border text-xs shadow-xl backdrop-blur-md transition-transform"
            style={{
              backgroundColor: recipe.tooltipBg,
              borderColor: recipe.accentColor,
              left: `${(getX(hoverIndex) / width) * 100}%`,
              top: '10px',
              transform: 'translateX(-50%)',
            }}
          >
            <div className={`font-mono font-semibold ${recipe.textPrimary}`}>{hoveredItem.x}</div>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: recipe.accentColor }} />
              <span className={recipe.textSecondary}>
                {series1Label}: <strong className="text-white">{hoveredItem.y} {unit}</strong>
              </span>
            </div>
            {hasSeries2 && hoveredItem.y2 !== undefined && (
              <div className="flex items-center gap-2 mt-0.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: recipe.secondaryColor }} />
                <span className={recipe.textSecondary}>
                  {series2Label}: <strong className="text-white">{hoveredItem.y2} {unit}</strong>
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
