/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { VisualRecipeStyle } from '../types';
import { VISUAL_RECIPES } from '../recipes';

interface AreaChartProps {
  data?: { x: string; y: number; y2?: number }[];
  recipe?: VisualRecipeStyle;
  height?: number;
  stacked?: boolean;
  title?: string;
  unit?: string;
}

const DEFAULT_DATA = [
  { x: 'Jan', y: 45, y2: 25 },
  { x: 'Feb', y: 52, y2: 30 },
  { x: 'Mar', y: 58, y2: 38 },
  { x: 'Apr', y: 65, y2: 42 },
  { x: 'May', y: 80, y2: 55 },
  { x: 'Jun', y: 74, y2: 48 },
  { x: 'Jul', y: 95, y2: 60 },
  { x: 'Aug', y: 88, y2: 52 },
];

export function AreaChartPrimitive({
  data = DEFAULT_DATA,
  recipe = VISUAL_RECIPES['glass-data'],
  height = 200,
  stacked = false,
  title = 'Aggregate Spectral Density',
  unit = 'kOps',
}: AreaChartProps) {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const padding = { top: 20, right: 20, bottom: 30, left: 35 };
  const width = 500;
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  const maxY = Math.max(...data.map((d) => (stacked ? d.y + (d.y2 || 0) : Math.max(d.y, d.y2 || 0)))) * 1.15;
  const minY = 0;

  const getX = (index: number) => padding.left + (index / (data.length - 1)) * innerWidth;
  const getY = (val: number) => padding.top + innerHeight - ((val - minY) / (maxY - minY)) * innerHeight;

  // Build Area 1 path
  const line1Points = data.map((d, i) => `${getX(i)},${getY(d.y)}`).join(' L ');
  const area1Path = `M ${getX(0)},${height - padding.bottom} L ${line1Points} L ${getX(data.length - 1)},${height - padding.bottom} Z`;

  // Build Area 2 path
  const hasSeries2 = data.some((d) => d.y2 !== undefined);
  const line2Points = hasSeries2 ? data.map((d, i) => `${getX(i)},${getY(d.y2 || 0)}`).join(' L ') : '';
  const area2Path = hasSeries2
    ? `M ${getX(0)},${height - padding.bottom} L ${line2Points} L ${getX(data.length - 1)},${height - padding.bottom} Z`
    : '';

  const hovered = hoverIndex !== null ? data[hoverIndex] : null;

  return (
    <div
      role="region"
      aria-label={`${title} area chart`}
      tabIndex={0}
      className={`p-4 rounded-xl border ${recipe.borderClass} ${recipe.cardClass} relative overflow-hidden focus:outline-none focus:ring-1 focus:ring-sky-500`}
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className={`text-sm font-semibold ${recipe.textPrimary}`}>{title}</h4>
          <p className={`text-xs ${recipe.textMuted}`}>Stacked volume distribution</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: recipe.accentColor }} />
            <span className={recipe.textSecondary}>Primary Flow</span>
          </span>
          {hasSeries2 && (
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: recipe.secondaryColor }} />
              <span className={recipe.textSecondary}>Base Ingress</span>
            </span>
          )}
        </div>
      </div>

      <div className="relative w-full" style={{ height }}>
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible" role="img">
          <defs>
            <linearGradient id={`areaGrad1-${recipe.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={recipe.accentColor} stopOpacity="0.45" />
              <stop offset="100%" stopColor={recipe.accentColor} stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id={`areaGrad2-${recipe.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={recipe.secondaryColor} stopOpacity="0.35" />
              <stop offset="100%" stopColor={recipe.secondaryColor} stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.33, 0.66, 1].map((r, i) => {
            const y = padding.top + innerHeight * r;
            const val = maxY - (maxY - minY) * r;
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

          {/* Area 2 (secondary) */}
          {hasSeries2 && (
            <>
              <path d={area2Path} fill={`url(#areaGrad2-${recipe.id})`} />
              <path d={`M ${line2Points}`} fill="none" stroke={recipe.secondaryColor} strokeWidth="1.5" />
            </>
          )}

          {/* Area 1 (primary) */}
          <path d={area1Path} fill={`url(#areaGrad1-${recipe.id})`} />
          <path
            d={`M ${line1Points}`}
            fill="none"
            stroke={recipe.accentColor}
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Hover Column Indicator */}
          {hoverIndex !== null && (
            <g>
              <line
                x1={getX(hoverIndex)}
                y1={padding.top}
                x2={getX(hoverIndex)}
                y2={height - padding.bottom}
                stroke={recipe.accentColor}
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              <circle
                cx={getX(hoverIndex)}
                cy={getY(data[hoverIndex].y)}
                r="4.5"
                fill="#ffffff"
                stroke={recipe.accentColor}
                strokeWidth="2"
              />
            </g>
          )}

          {/* X Axis Labels */}
          {data.map((d, i) => (
            <text
              key={i}
              x={getX(i)}
              y={height - padding.bottom + 14}
              fill="currentColor"
              className={`text-[10px] ${recipe.textMuted}`}
              textAnchor="middle"
            >
              {d.x}
            </text>
          ))}

          {/* Hover capture areas */}
          {data.map((_, i) => (
            <rect
              key={i}
              x={getX(i) - innerWidth / (data.length * 2)}
              y={padding.top}
              width={innerWidth / data.length}
              height={innerHeight}
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
            />
          ))}
        </svg>

        {/* Tooltip */}
        {hovered && hoverIndex !== null && (
          <div
            className="absolute pointer-events-none z-20 px-2 py-1 rounded-md border text-xs shadow-xl backdrop-blur-md"
            style={{
              backgroundColor: recipe.tooltipBg,
              borderColor: recipe.borderClass,
              left: `${(getX(hoverIndex) / width) * 100}%`,
              top: '8px',
              transform: 'translateX(-50%)',
            }}
          >
            <div className={`font-semibold ${recipe.textPrimary}`}>{hovered.x}</div>
            <div className={`text-xs ${recipe.textSecondary}`}>
              Primary: <strong style={{ color: recipe.accentColor }}>{hovered.y} {unit}</strong>
            </div>
            {hasSeries2 && hovered.y2 !== undefined && (
              <div className={`text-xs ${recipe.textSecondary}`}>
                Secondary: <strong style={{ color: recipe.secondaryColor }}>{hovered.y2} {unit}</strong>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
