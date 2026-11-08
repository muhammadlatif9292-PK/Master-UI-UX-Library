/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { VisualRecipeStyle } from '../types';
import { VISUAL_RECIPES } from '../recipes';
import { Play, Pause, RefreshCw, Activity } from 'lucide-react';

export function LiveGraphPrimitive({
  recipe = VISUAL_RECIPES['luminous-data'],
  height = 200,
  maxPoints = 25,
  title = 'Real-Time Dynamic Oscilloscope',
}: {
  recipe?: VisualRecipeStyle;
  height?: number;
  maxPoints?: number;
  title?: string;
}) {
  const [isRunning, setIsRunning] = useState(true);
  const [dataPoints, setDataPoints] = useState<number[]>(() =>
    Array.from({ length: maxPoints }, (_, i) => 50 + Math.sin(i * 0.4) * 25)
  );

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setDataPoints((prev) => {
        const last = prev[prev.length - 1] || 50;
        const change = (Math.random() - 0.49) * 18;
        const next = Math.max(10, Math.min(95, last + change));
        return [...prev.slice(1), Math.round(next * 10) / 10];
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isRunning]);

  const padding = { top: 20, right: 20, bottom: 25, left: 35 };
  const width = 500;
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  const minY = 0;
  const maxY = 100;

  const getX = (i: number) => padding.left + (i / (dataPoints.length - 1)) * innerWidth;
  const getY = (val: number) => padding.top + innerHeight - ((val - minY) / (maxY - minY)) * innerHeight;

  const points = dataPoints.map((d, i) => `${getX(i)},${getY(d)}`);
  const linePath = `M ${points.join(' L ')}`;
  const areaPath = `M ${getX(0)},${height - padding.bottom} L ${points.join(' L ')} L ${getX(dataPoints.length - 1)},${height - padding.bottom} Z`;

  const latestValue = dataPoints[dataPoints.length - 1] || 0;

  return (
    <div
      role="region"
      aria-label={`${title} live graph`}
      tabIndex={0}
      className={`p-4 rounded-xl border ${recipe.borderClass} ${recipe.cardClass} relative overflow-hidden focus:outline-none focus:ring-1 focus:ring-sky-500`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400" />
          <div>
            <h4 className={`text-sm font-semibold ${recipe.textPrimary}`}>{title}</h4>
            <p className={`text-xs ${recipe.textMuted}`}>5 Hz real-time sample frequency</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className={`text-base font-mono font-bold ${recipe.textPrimary}`}>{latestValue}%</div>
            <div className={`text-[10px] ${recipe.textMuted}`}>Live Amplitude</div>
          </div>
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-all ${
              isRunning ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'bg-white/5 text-zinc-400 border-white/10'
            }`}
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      <div className="relative w-full" style={{ height }}>
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible" role="img">
          <defs>
            <linearGradient id={`liveGrad-${recipe.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={recipe.accentColor} stopOpacity="0.4" />
              <stop offset="100%" stopColor={recipe.accentColor} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((r, i) => {
            const y = padding.top + innerHeight * r;
            return (
              <line
                key={i}
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                stroke={recipe.gridLineColor}
                strokeDasharray="2 2"
              />
            );
          })}

          {/* Area Fill */}
          <path d={areaPath} fill={`url(#liveGrad-${recipe.id})`} />

          {/* Line Path */}
          <path
            d={linePath}
            fill="none"
            stroke={recipe.accentColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={recipe.glowEffect !== 'none' ? `drop-shadow(0 0 8px ${recipe.accentColor})` : undefined}
          />

          {/* Live pulsing head */}
          <circle
            cx={getX(dataPoints.length - 1)}
            cy={getY(latestValue)}
            r="5"
            fill="#ffffff"
            stroke={recipe.accentColor}
            strokeWidth="2"
            className="animate-pulse"
          />
        </svg>
      </div>
    </div>
  );
}
