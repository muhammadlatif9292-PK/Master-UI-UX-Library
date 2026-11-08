/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { VisualRecipeStyle } from '../types';
import { VISUAL_RECIPES } from '../recipes';
import { ArrowUpRight, ArrowDownRight, GitCompare } from 'lucide-react';

interface ComparisonProps {
  recipe?: VisualRecipeStyle;
  height?: number;
  title?: string;
  variantA?: string;
  variantB?: string;
  data?: { category: string; baseline: number; candidate: number }[];
}

const DEFAULT_COMPARISON = [
  { category: 'Cold Boot (ms)', baseline: 420, candidate: 180 },
  { category: 'Memory Peak (MB)', baseline: 850, candidate: 520 },
  { category: 'Token Gen (t/s)', baseline: 65, candidate: 128 },
  { category: 'P99 Latency (ms)', baseline: 95, candidate: 38 },
  { category: 'CPU Utilization (%)', baseline: 82, candidate: 46 },
];

export function ComparisonGraphPrimitive({
  recipe = VISUAL_RECIPES['quantum'],
  title = 'A/B Architecture Delta Matrix',
  variantA = 'Architecture v1 (Baseline)',
  variantB = 'Optimized v2 (Candidate)',
  data = DEFAULT_COMPARISON,
}: ComparisonProps) {
  return (
    <div
      role="region"
      aria-label={`${title} comparison`}
      tabIndex={0}
      className={`p-4 rounded-xl border ${recipe.borderClass} ${recipe.cardClass} relative overflow-hidden focus:outline-none focus:ring-1 focus:ring-sky-500`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <GitCompare className="w-4 h-4 text-violet-400" />
          <div>
            <h4 className={`text-sm font-semibold ${recipe.textPrimary}`}>{title}</h4>
            <p className={`text-xs ${recipe.textMuted}`}>Comparative benchmark variance</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-slate-600" />
            <span className={recipe.textSecondary}>{variantA}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs" style={{ backgroundColor: recipe.accentColor }} />
            <span className={recipe.textSecondary}>{variantB}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3.5">
        {data.map((item, idx) => {
          const maxVal = Math.max(item.baseline, item.candidate) * 1.2;
          const isBetter = item.candidate > item.baseline;
          const diffPct = Math.round(((item.candidate - item.baseline) / item.baseline) * 100);

          return (
            <div key={idx} className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className={`font-medium ${recipe.textPrimary}`}>{item.category}</span>
                <div className="flex items-center gap-2 font-mono">
                  <span className="text-zinc-500">{item.baseline} vs <strong className="text-white">{item.candidate}</strong></span>
                  <span
                    className={`flex items-center text-[10px] font-bold px-1.5 py-0.2 rounded-xs ${
                      diffPct > 0
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-sky-500/20 text-sky-400 border border-sky-500/40'
                    }`}
                  >
                    {diffPct > 0 ? `+${diffPct}%` : `${diffPct}%`}
                  </span>
                </div>
              </div>

              {/* Stacked comparison bars */}
              <div className="space-y-1">
                {/* Baseline Bar */}
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-slate-600 rounded-full"
                    style={{ width: `${(item.baseline / maxVal) * 100}%` }}
                  />
                </div>
                {/* Candidate Bar */}
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(item.candidate / maxVal) * 100}%`,
                      backgroundColor: recipe.accentColor,
                      boxShadow: recipe.glowEffect !== 'none' ? `0 0 8px ${recipe.accentColor}` : undefined,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
