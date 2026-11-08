/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { VisualRecipeStyle, HeatmapCell } from '../types';
import { VISUAL_RECIPES } from '../recipes';

interface HeatmapProps {
  data?: HeatmapCell[];
  days?: string[];
  hours?: string[];
  recipe?: VisualRecipeStyle;
  title?: string;
}

const DEFAULT_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const DEFAULT_HOURS = ['00', '03', '06', '09', '12', '15', '18', '21'];

// Generate deterministic activity matrix
const GENERATE_SAMPLE_HEATMAP = (): HeatmapCell[] => {
  const cells: HeatmapCell[] = [];
  for (let d = 0; d < 7; d++) {
    for (let h = 0; h < 8; h++) {
      const isPeak = (d >= 0 && d <= 4) && (h >= 3 && h <= 5);
      const rand = Math.sin(d * 1.5 + h * 2.2) * 35 + (isPeak ? 55 : 25);
      const val = Math.max(0, Math.min(100, Math.round(rand)));
      cells.push({ x: d, y: h, value: val, label: `${DEFAULT_DAYS[d]} @ ${DEFAULT_HOURS[h]}:00` });
    }
  }
  return cells;
};

export function HeatmapPrimitive({
  data = GENERATE_SAMPLE_HEATMAP(),
  days = DEFAULT_DAYS,
  hours = DEFAULT_HOURS,
  recipe = VISUAL_RECIPES['luminous-data'],
  title = 'Workload Intensity Distribution',
}: HeatmapProps) {
  const [hoverCell, setHoverCell] = useState<HeatmapCell | null>(null);

  const getCellColor = (val: number) => {
    if (val === 0) return 'rgba(255,255,255,0.03)';
    const ratio = val / 100;
    if (recipe.id === 'neon') {
      return `rgba(163, 230, 53, ${0.15 + ratio * 0.85})`;
    }
    if (recipe.id === 'quantum') {
      return `rgba(139, 92, 246, ${0.15 + ratio * 0.85})`;
    }
    return `rgba(56, 189, 248, ${0.12 + ratio * 0.88})`;
  };

  return (
    <div
      role="region"
      aria-label={`${title} heatmap`}
      tabIndex={0}
      className={`p-4 rounded-xl border ${recipe.borderClass} ${recipe.cardClass} relative overflow-hidden focus:outline-none focus:ring-1 focus:ring-sky-500`}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className={`text-sm font-semibold ${recipe.textPrimary}`}>{title}</h4>
          <p className={`text-xs ${recipe.textMuted}`}>Hourly server core contention</p>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-zinc-400">
          <span>Low</span>
          <div className="flex gap-0.5">
            <span className="w-2.5 h-2.5 rounded-xs" style={{ backgroundColor: getCellColor(15) }} />
            <span className="w-2.5 h-2.5 rounded-xs" style={{ backgroundColor: getCellColor(45) }} />
            <span className="w-2.5 h-2.5 rounded-xs" style={{ backgroundColor: getCellColor(75) }} />
            <span className="w-2.5 h-2.5 rounded-xs" style={{ backgroundColor: getCellColor(98) }} />
          </div>
          <span>High</span>
        </div>
      </div>

      {/* Matrix Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-[320px]">
          {/* Hour headers */}
          <div className="grid grid-cols-9 gap-1 mb-1 text-[10px] font-mono text-zinc-500">
            <div />
            {hours.map((h, i) => (
              <div key={i} className="text-center">{h}h</div>
            ))}
          </div>

          {/* Day rows */}
          {days.map((day, dIdx) => (
            <div key={day} className="grid grid-cols-9 gap-1 mb-1 items-center">
              <div className={`text-[10px] font-mono font-medium ${recipe.textSecondary}`}>{day}</div>
              {hours.map((_, hIdx) => {
                const cell = data.find((c) => c.x === dIdx && c.y === hIdx) || { x: dIdx, y: hIdx, value: 0 };
                const isHovered = hoverCell?.x === dIdx && hoverCell?.y === hIdx;

                return (
                  <div
                    key={hIdx}
                    className="aspect-square rounded-xs transition-all duration-150 cursor-pointer relative"
                    style={{
                      backgroundColor: getCellColor(cell.value),
                      transform: isHovered ? 'scale(1.18)' : 'scale(1)',
                      zIndex: isHovered ? 10 : 1,
                      border: isHovered ? `1px solid ${recipe.accentColor}` : '1px solid transparent',
                      boxShadow: isHovered ? `0 0 10px ${recipe.accentColor}` : 'none',
                    }}
                    onMouseEnter={() => setHoverCell(cell)}
                    onMouseLeave={() => setHoverCell(null)}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Tooltip */}
      {hoverCell && (
        <div
          className="mt-3 p-2 rounded-lg border text-xs flex items-center justify-between backdrop-blur-md"
          style={{ backgroundColor: recipe.tooltipBg, borderColor: recipe.borderClass }}
        >
          <span className={recipe.textPrimary}>
            {hoverCell.label || `Day ${days[hoverCell.x]} @ ${hours[hoverCell.y]}:00`}
          </span>
          <span className="font-mono font-bold" style={{ color: recipe.accentColor }}>
            {hoverCell.value}% utilization
          </span>
        </div>
      )}
    </div>
  );
}
