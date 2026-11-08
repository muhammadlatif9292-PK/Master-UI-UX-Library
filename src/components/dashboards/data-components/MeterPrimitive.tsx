/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { VisualRecipeStyle } from '../types';
import { VISUAL_RECIPES } from '../recipes';

interface MeterProps {
  channels?: { label: string; value: number; peak: number }[];
  recipe?: VisualRecipeStyle;
  segments?: number;
  title?: string;
}

const DEFAULT_CHANNELS = [
  { label: 'Bus L', value: 82, peak: 91 },
  { label: 'Bus R', value: 76, peak: 87 },
  { label: 'Sub Mono', value: 64, peak: 72 },
  { label: 'Aux Feed', value: 45, peak: 58 },
];

export function MeterPrimitive({
  channels = DEFAULT_CHANNELS,
  recipe = VISUAL_RECIPES['neon'],
  segments = 24,
  title = 'Multi-Channel Precision VU Meter',
}: MeterProps) {
  return (
    <div
      role="region"
      aria-label={`${title} meter`}
      tabIndex={0}
      className={`p-4 rounded-xl border ${recipe.borderClass} ${recipe.cardClass} relative overflow-hidden focus:outline-none focus:ring-1 focus:ring-sky-500`}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className={`text-sm font-semibold ${recipe.textPrimary}`}>{title}</h4>
          <p className={`text-xs ${recipe.textMuted}`}>Peak-hold signal attenuation</p>
        </div>
        <span className={`text-[10px] px-2 py-0.5 rounded-sm font-mono ${recipe.badgeClass}`}>0 dBFS Calibrated</span>
      </div>

      <div className="space-y-3">
        {channels.map((ch, idx) => {
          const activeSegments = Math.round((ch.value / 100) * segments);
          const peakSegment = Math.round((ch.peak / 100) * segments);

          return (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className={recipe.textPrimary}>{ch.label}</span>
                <span className={recipe.textSecondary}>
                  {ch.value}% <span className="text-zinc-500">(Peak {ch.peak}%)</span>
                </span>
              </div>

              {/* Segmented meter bar */}
              <div className="flex items-center gap-[2px] h-4 p-1 rounded-sm bg-black/40 border border-white/5">
                {Array.from({ length: segments }).map((_, sIdx) => {
                  const isFilled = sIdx < activeSegments;
                  const isPeak = sIdx === peakSegment - 1;
                  const ratio = sIdx / segments;

                  // Color gradient logic: green -> yellow -> red
                  let segColor = recipe.accentColor;
                  if (ratio > 0.85) segColor = '#ef4444';
                  else if (ratio > 0.7) segColor = '#f59e0b';

                  return (
                    <div
                      key={sIdx}
                      className="flex-1 h-full rounded-[1px] transition-all duration-150"
                      style={{
                        backgroundColor: isFilled ? segColor : isPeak ? '#ffffff' : 'rgba(255,255,255,0.06)',
                        boxShadow: isFilled && ratio > 0.7 ? `0 0 6px ${segColor}` : isPeak ? '0 0 8px #ffffff' : 'none',
                        opacity: isFilled || isPeak ? 1 : 0.4,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between text-[9px] font-mono text-zinc-500 mt-3 pt-2 border-t border-white/5">
        <span>-∞ dB</span>
        <span>-24 dB</span>
        <span>-12 dB</span>
        <span>-6 dB</span>
        <span className="text-rose-400 font-bold">0 dB (CLIP)</span>
      </div>
    </div>
  );
}
