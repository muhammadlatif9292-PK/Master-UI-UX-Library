/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { VisualRecipeStyle } from '../types';
import { VISUAL_RECIPES } from '../recipes';

interface ProgressItem {
  id: string;
  label: string;
  value: number; // 0 - 100
  eta?: string;
  status?: string;
  color?: string;
}

interface ProgressProps {
  items?: ProgressItem[];
  recipe?: VisualRecipeStyle;
  title?: string;
}

const DEFAULT_ITEMS: ProgressItem[] = [
  { id: '1', label: 'Dataset Ingestion & Embedding', value: 92, eta: '12s remaining', status: 'Optimal' },
  { id: '2', label: 'Multi-GPU Sharded Checkpoint', value: 68, eta: '2m 14s', status: 'Writing' },
  { id: '3', label: 'Quantization & TensorRT Prune', value: 44, eta: '5m 40s', status: 'Active' },
  { id: '4', label: 'E2E Model Verification & Latency Test', value: 15, eta: '12m 00s', status: 'Queued' },
];

export function ProgressPrimitive({
  items = DEFAULT_ITEMS,
  recipe = VISUAL_RECIPES['luminous-data'],
  title = 'Autonomous Pipeline Progress',
}: ProgressProps) {
  return (
    <div
      role="region"
      aria-label={`${title} progress list`}
      tabIndex={0}
      className={`p-4 rounded-xl border ${recipe.borderClass} ${recipe.cardClass} relative overflow-hidden focus:outline-none focus:ring-1 focus:ring-sky-500`}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className={`text-sm font-semibold ${recipe.textPrimary}`}>{title}</h4>
          <p className={`text-xs ${recipe.textMuted}`}>Concurrent compilation tasks</p>
        </div>
        <span className={`text-[10px] px-2 py-0.5 rounded-full ${recipe.badgeClass}`}>4 Workers Live</span>
      </div>

      <div className="space-y-4">
        {items.map((item, idx) => {
          const itemColor = item.color || (idx === 0 ? recipe.accentColor : idx === 1 ? recipe.secondaryColor : recipe.tertiaryColor);

          return (
            <div key={item.id} className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <span className={`font-medium ${recipe.textPrimary}`}>{item.label}</span>
                  {item.status && (
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-xs font-mono ${recipe.badgeClass}`}>
                      {item.status}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 font-mono">
                  {item.eta && <span className={`text-[11px] ${recipe.textMuted}`}>{item.eta}</span>}
                  <span className={`font-bold ${recipe.textPrimary}`}>{item.value}%</span>
                </div>
              </div>

              {/* Progress Track */}
              <div className="relative h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out relative"
                  style={{
                    width: `${item.value}%`,
                    backgroundColor: itemColor,
                    boxShadow: recipe.glowEffect !== 'none' ? `0 0 10px ${itemColor}` : undefined,
                  }}
                >
                  {/* Subtle animated stripe shine */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
