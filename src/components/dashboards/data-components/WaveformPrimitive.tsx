/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { VisualRecipeStyle } from '../types';
import { VISUAL_RECIPES } from '../recipes';
import { Play, Pause, RefreshCw, Volume2 } from 'lucide-react';

interface WaveformProps {
  recipe?: VisualRecipeStyle;
  barsCount?: number;
  height?: number;
  title?: string;
}

export function WaveformPrimitive({
  recipe = VISUAL_RECIPES['neon'],
  barsCount = 48,
  height = 160,
  title = 'Spectral Acoustic Frequency Spectrum',
}: WaveformProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [frequencies, setFrequencies] = useState<number[]>(() =>
    Array.from({ length: barsCount }, (_, i) => Math.sin(i * 0.2) * 40 + Math.random() * 30 + 20)
  );

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setFrequencies((prev) =>
        prev.map((val, i) => {
          const delta = (Math.random() - 0.48) * 16;
          const baseline = Math.sin(Date.now() * 0.003 + i * 0.25) * 35 + 45;
          return Math.max(8, Math.min(95, Math.round(baseline + delta)));
        })
      );
    }, 120);
    return () => clearInterval(interval);
  }, [isPlaying, barsCount]);

  return (
    <div
      role="region"
      aria-label={`${title} waveform`}
      tabIndex={0}
      className={`p-4 rounded-xl border ${recipe.borderClass} ${recipe.cardClass} relative overflow-hidden focus:outline-none focus:ring-1 focus:ring-sky-500`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-lime-400" />
          <h4 className={`text-sm font-semibold ${recipe.textPrimary}`}>{title}</h4>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`p-1.5 rounded-lg border text-xs flex items-center gap-1.5 transition-all ${
              isPlaying ? 'bg-lime-400/20 text-lime-300 border-lime-400/40' : 'bg-white/5 text-zinc-300 border-white/10'
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span className="font-mono text-[10px]">{isPlaying ? 'LIVE STREAM' : 'PAUSED'}</span>
          </button>
        </div>
      </div>

      {/* Waveform Bar Graphic */}
      <div className="relative flex items-center justify-between gap-[2px] h-[100px] px-2 bg-black/40 rounded-lg border border-white/5 overflow-hidden">
        {frequencies.map((freq, i) => {
          const isHigh = freq > 75;
          const barColor = isHigh ? '#f43f5e' : freq > 50 ? recipe.accentColor : recipe.secondaryColor;

          return (
            <div key={i} className="flex-1 flex flex-col items-center justify-center h-full gap-[1px]">
              {/* Top mirror bar */}
              <div
                className="w-full rounded-t-[1px] transition-all duration-100 ease-out"
                style={{
                  height: `${freq * 0.45}%`,
                  backgroundColor: barColor,
                  opacity: 0.85,
                  boxShadow: isHigh && recipe.glowEffect !== 'none' ? `0 0 6px ${barColor}` : undefined,
                }}
              />
              {/* Bottom mirror bar */}
              <div
                className="w-full rounded-b-[1px] transition-all duration-100 ease-out"
                style={{
                  height: `${freq * 0.45}%`,
                  backgroundColor: barColor,
                  opacity: 0.5,
                }}
              />
            </div>
          );
        })}
      </div>

      <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 mt-2 px-1">
        <span>20 Hz (Sub)</span>
        <span>1.2 kHz (Mid)</span>
        <span>8.5 kHz (Presence)</span>
        <span>22 kHz (Air)</span>
      </div>
    </div>
  );
}
