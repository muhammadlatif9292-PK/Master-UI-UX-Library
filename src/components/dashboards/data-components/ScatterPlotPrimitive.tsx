/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { VisualRecipeStyle, ScatterPoint } from '../types';
import { VISUAL_RECIPES } from '../recipes';

interface ScatterPlotProps {
  data?: ScatterPoint[];
  recipe?: VisualRecipeStyle;
  height?: number;
  title?: string;
  xLabel?: string;
  yLabel?: string;
}

const DEFAULT_POINTS: ScatterPoint[] = [
  { x: 15, y: 82, size: 6, label: 'Model Gemma-7B', category: 'Inference' },
  { x: 28, y: 64, size: 8, label: 'Model Llama-3', category: 'Inference' },
  { x: 45, y: 92, size: 10, label: 'Cluster Alpha', category: 'Training' },
  { x: 62, y: 48, size: 5, label: 'Cache Edge 01', category: 'Cache' },
  { x: 74, y: 76, size: 9, label: 'Cluster Beta', category: 'Training' },
  { x: 88, y: 89, size: 12, label: 'Deep Research Agent', category: 'Agent' },
  { x: 35, y: 35, size: 4, label: 'Cold Storage Archive', category: 'Storage' },
  { x: 55, y: 70, size: 7, label: 'Model Claude-3.5', category: 'Inference' },
  { x: 82, y: 42, size: 6, label: 'Vector Index Milvus', category: 'Cache' },
  { x: 92, y: 60, size: 8, label: 'Embedding Worker 04', category: 'Agent' },
];

export function ScatterPlotPrimitive({
  data = DEFAULT_POINTS,
  recipe = VISUAL_RECIPES['scientific'],
  height = 200,
  title = 'Multi-Dimensional Cluster Coordinates',
  xLabel = 'Throughput (MB/s)',
  yLabel = 'Accuracy Index (%)',
}: ScatterPlotProps) {
  const [hoveredPoint, setHoveredPoint] = useState<ScatterPoint | null>(null);

  const padding = { top: 20, right: 25, bottom: 35, left: 40 };
  const width = 500;
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  const getX = (val: number) => padding.left + (val / 100) * innerWidth;
  const getY = (val: number) => padding.top + innerHeight - (val / 100) * innerHeight;

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Inference':
        return recipe.accentColor;
      case 'Training':
        return recipe.secondaryColor;
      case 'Agent':
        return recipe.tertiaryColor;
      default:
        return '#e2e8f0';
    }
  };

  return (
    <div
      role="region"
      aria-label={`${title} scatter plot`}
      tabIndex={0}
      className={`p-4 rounded-xl border ${recipe.borderClass} ${recipe.cardClass} relative overflow-hidden focus:outline-none focus:ring-1 focus:ring-sky-500`}
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className={`text-sm font-semibold ${recipe.textPrimary}`}>{title}</h4>
          <p className={`text-xs ${recipe.textMuted}`}>{xLabel} vs {yLabel}</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: recipe.accentColor }} />
            <span className={recipe.textSecondary}>Inference</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: recipe.secondaryColor }} />
            <span className={recipe.textSecondary}>Training</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: recipe.tertiaryColor }} />
            <span className={recipe.textSecondary}>Agent</span>
          </span>
        </div>
      </div>

      <div className="relative w-full" style={{ height }}>
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible" role="img">
          {/* Cartesian Grid lines */}
          {[0, 25, 50, 75, 100].map((val) => {
            const y = getY(val);
            const x = getX(val);
            return (
              <g key={val}>
                {/* Horizontal */}
                <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke={recipe.gridLineColor} strokeDasharray="2 2" />
                <text x={padding.left - 6} y={y + 3} fill="currentColor" className={`text-[9px] ${recipe.textMuted}`} textAnchor="end">
                  {val}
                </text>
                {/* Vertical */}
                <line x1={x} y1={padding.top} x2={x} y2={height - padding.bottom} stroke={recipe.gridLineColor} strokeDasharray="2 2" />
                <text x={x} y={height - padding.bottom + 14} fill="currentColor" className={`text-[9px] ${recipe.textMuted}`} textAnchor="middle">
                  {val}
                </text>
              </g>
            );
          })}

          {/* Scatter Points */}
          {data.map((pt, i) => {
            const cx = getX(pt.x);
            const cy = getY(pt.y);
            const r = pt.size || 6;
            const col = getCategoryColor(pt.category);
            const isHovered = hoveredPoint?.label === pt.label;

            return (
              <g
                key={i}
                className="cursor-pointer transition-transform"
                onMouseEnter={() => setHoveredPoint(pt)}
                onMouseLeave={() => setHoveredPoint(null)}
              >
                {/* Outer halo */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isHovered ? r + 5 : r}
                  fill={col}
                  fillOpacity={isHovered ? '0.45' : '0.25'}
                  stroke={col}
                  strokeWidth={isHovered ? '2' : '1'}
                />
                {/* Center dot */}
                <circle cx={cx} cy={cy} r={isHovered ? 4 : 2.5} fill="#ffffff" />
              </g>
            );
          })}
        </svg>

        {/* Floating Tooltip */}
        {hoveredPoint && (
          <div
            className="absolute pointer-events-none z-20 px-2.5 py-1.5 rounded-lg border text-xs shadow-xl backdrop-blur-md"
            style={{
              backgroundColor: recipe.tooltipBg,
              borderColor: recipe.borderClass,
              left: `${(getX(hoveredPoint.x) / width) * 100}%`,
              top: '8px',
              transform: 'translateX(-50%)',
            }}
          >
            <div className={`font-semibold ${recipe.textPrimary}`}>{hoveredPoint.label}</div>
            <div className={`text-[11px] ${recipe.textSecondary}`}>
              X: <strong className="text-white">{hoveredPoint.x}</strong> | Y: <strong className="text-white">{hoveredPoint.y}</strong>
            </div>
            <span className={`text-[10px] inline-block px-1.5 py-0.2 mt-0.5 rounded-xs ${recipe.badgeClass}`}>
              {hoveredPoint.category}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
