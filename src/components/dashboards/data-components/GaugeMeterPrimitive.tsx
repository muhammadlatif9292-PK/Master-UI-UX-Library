/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { VisualRecipeStyle } from '../types';
import { VISUAL_RECIPES } from '../recipes';

interface GaugeProps {
  value?: number; // 0 - 100
  min?: number;
  max?: number;
  recipe?: VisualRecipeStyle;
  size?: number;
  title?: string;
  unit?: string;
  warningThreshold?: number;
  criticalThreshold?: number;
}

export function GaugeMeterPrimitive({
  value = 74.2,
  min = 0,
  max = 100,
  recipe = VISUAL_RECIPES['laboratory'],
  size = 200,
  title = 'Turbine Kinetic Pressure',
  unit = 'PSI',
  warningThreshold = 75,
  criticalThreshold = 90,
}: GaugeProps) {
  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  const center = size / 2;
  const radius = size * 0.38;
  const strokeWidth = size * 0.08;

  // Arc angles from 135deg to 405deg (270deg sweep)
  const startAngle = 135;
  const endAngle = 405;
  const angleRange = endAngle - startAngle;

  const currentAngle = startAngle + (percentage / 100) * angleRange;

  const polarToCartesian = (centerX: number, centerY: number, r: number, angleInDegrees: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + r * Math.cos(angleInRadians),
      y: centerY + r * Math.sin(angleInRadians),
    };
  };

  const describeArc = (x: number, y: number, r: number, startA: number, endA: number) => {
    const start = polarToCartesian(x, y, r, endA);
    const end = polarToCartesian(x, y, r, startA);
    const largeArcFlag = endA - startA <= 180 ? '0' : '1';
    return ['M', start.x, start.y, 'A', r, r, 0, largeArcFlag, 0, end.x, end.y].join(' ');
  };

  const trackPath = describeArc(center, center, radius, startAngle, endAngle);
  const activePath = describeArc(center, center, radius, startAngle, currentAngle);

  // Status color calculation
  const isCritical = percentage >= criticalThreshold;
  const isWarning = percentage >= warningThreshold && !isCritical;
  const activeColor = isCritical ? '#ef4444' : isWarning ? '#f59e0b' : recipe.accentColor;

  // Needle calculations
  const needleLength = radius * 0.75;
  const needleTip = polarToCartesian(center, center, needleLength, currentAngle);

  return (
    <div
      role="region"
      aria-label={`${title} dial gauge`}
      tabIndex={0}
      className={`p-4 rounded-xl border ${recipe.borderClass} ${recipe.cardClass} relative flex flex-col items-center justify-between focus:outline-none focus:ring-1 focus:ring-sky-500`}
    >
      <div className="w-full flex items-center justify-between mb-1">
        <h4 className={`text-sm font-semibold ${recipe.textPrimary}`}>{title}</h4>
        <span
          className={`text-[10px] px-2 py-0.5 rounded-sm font-mono uppercase font-bold ${
            isCritical
              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
              : isWarning
              ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
              : recipe.badgeClass
          }`}
        >
          {isCritical ? 'CRITICAL' : isWarning ? 'WARNING' : 'NOMINAL'}
        </span>
      </div>

      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible" role="img">
          {/* Background Track */}
          <path
            d={trackPath}
            fill="none"
            stroke={recipe.gridLineColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Warning / Critical zone markers */}
          <path
            d={describeArc(center, center, radius, startAngle + (warningThreshold / 100) * angleRange, endAngle)}
            fill="none"
            stroke="rgba(239, 68, 68, 0.25)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Active progress arc */}
          <path
            d={activePath}
            fill="none"
            stroke={activeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            className="transition-all duration-500"
            filter={recipe.glowEffect !== 'none' ? `drop-shadow(0 0 8px ${activeColor})` : undefined}
          />

          {/* Dial Ticks */}
          {[0, 25, 50, 75, 100].map((t) => {
            const angle = startAngle + (t / 100) * angleRange;
            const p1 = polarToCartesian(center, center, radius - strokeWidth / 2 - 2, angle);
            const p2 = polarToCartesian(center, center, radius - strokeWidth / 2 - 8, angle);
            return (
              <line
                key={t}
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                stroke={recipe.textMuted}
                strokeWidth={t === 0 || t === 50 || t === 100 ? '2' : '1'}
              />
            );
          })}

          {/* Needle */}
          <line
            x1={center}
            y1={center}
            x2={needleTip.x}
            y2={needleTip.y}
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="transition-all duration-300"
          />
          <circle cx={center} cy={center} r="6" fill={activeColor} stroke="#ffffff" strokeWidth="2" />
        </svg>

        {/* Center Digital Readout */}
        <div className="absolute bottom-6 flex flex-col items-center text-center">
          <span className={`text-2xl font-bold font-mono ${recipe.textPrimary}`}>
            {value.toFixed(1)}
          </span>
          <span className={`text-[11px] font-mono ${recipe.textSecondary} -mt-0.5`}>
            {unit} (Range {min}-{max})
          </span>
        </div>
      </div>

      <div className="w-full flex justify-between text-[11px] font-mono px-2 pt-2 border-t border-white/5">
        <span className={recipe.textMuted}>{min} {unit}</span>
        <span className={recipe.textSecondary}>Threshold {warningThreshold}%</span>
        <span className={recipe.textMuted}>{max} {unit}</span>
      </div>
    </div>
  );
}
