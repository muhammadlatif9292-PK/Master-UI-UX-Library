/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TouchTargetEvaluation } from '../../design-system/accessibility/types';
import { Target, Check, AlertCircle, Sparkles, Smartphone, Hand } from 'lucide-react';

export function TouchTargetInspector() {
  const [activeTargetSize, setActiveTargetSize] = useState<44 | 48 | 24>(44);
  const [tapCoordinates, setTapCoordinates] = useState<{ x: number; y: number } | null>(null);
  const [lastTappedId, setLastTappedId] = useState<string | null>(null);

  const sampleTargets: Array<{ id: string; name: string; width: number; height: number; icon: string }> = [
    { id: 'btn-primary', name: 'Primary Action CTA', width: 140, height: 48, icon: '⚡' },
    { id: 'btn-icon-std', name: 'Standard Icon Button', width: 44, height: 44, icon: '⚙️' },
    { id: 'btn-micro-chip', name: 'Micro Filter Chip (Small)', width: 68, height: 28, icon: '🏷️' },
    { id: 'btn-pill-tag', name: 'Interactive Pill Badge', width: 90, height: 36, icon: '⭐' },
    { id: 'btn-switch-thumb', name: 'Toggle Switch Thumb', width: 52, height: 32, icon: '🔘' },
    { id: 'btn-fab', name: 'Floating Action Anchor', width: 56, height: 56, icon: '➕' },
  ];

  const handleStageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTapCoordinates({
      x: Math.round(e.clientX - rect.left),
      y: Math.round(e.clientY - rect.top),
    });
  };

  return (
    <div className="p-6 rounded-3xl bg-zinc-950/80 border border-zinc-800 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
            <Target className="w-4 h-4 text-cyan-400" /> Touch Target & Spatial Hitbox Inspector
          </h3>
          <p className="text-xs text-zinc-400">
            Validates compliance against WCAG 2.2 Success Criterion 2.5.8 (Target Size Minimum 24px, AA 44px, AAA 48px).
          </p>
        </div>

        {/* Target Threshold Switcher */}
        <div className="flex items-center gap-2 bg-black/40 p-1.5 rounded-2xl border border-zinc-800 self-start md:self-auto">
          {[
            { size: 24, label: 'Min (24px)' },
            { size: 44, label: 'WCAG AA (44px)' },
            { size: 48, label: 'Strict AAA (48px)' },
          ].map((t) => (
            <button
              key={t.size}
              onClick={() => setActiveTargetSize(t.size as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                activeTargetSize === t.size
                  ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Hitbox Simulation Grid */}
      <div
        onClick={handleStageClick}
        className="p-8 rounded-3xl bg-black/60 border border-zinc-800 relative overflow-hidden min-h-[260px] flex flex-wrap items-center justify-around gap-6 cursor-crosshair select-none"
      >
        {/* Tap Ripple Marker */}
        {tapCoordinates && (
          <div
            className="absolute w-8 h-8 rounded-full border-2 border-cyan-400 bg-cyan-400/20 pointer-events-none -translate-x-1/2 -translate-y-1/2 animate-ping"
            style={{ left: tapCoordinates.x, top: tapCoordinates.y }}
          />
        )}

        {sampleTargets.map((item) => {
          const isHeightCompliant = item.height >= activeTargetSize;
          const isWidthCompliant = item.width >= activeTargetSize;
          const isCompliant = isHeightCompliant && isWidthCompliant;

          return (
            <div key={item.id} className="relative group flex flex-col items-center gap-2">
              {/* Virtual 44/48px Target Halo Boundary */}
              <div
                className={`absolute inset-0 m-auto pointer-events-none rounded-2xl border-2 transition-all ${
                  isCompliant
                    ? 'border-emerald-500/40 bg-emerald-500/5'
                    : 'border-dashed border-red-500/60 bg-red-500/10'
                }`}
                style={{
                  minWidth: `${activeTargetSize}px`,
                  minHeight: `${activeTargetSize}px`,
                  transform: 'scale(1.08)',
                }}
              />

              {/* Physical Rendered Element */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLastTappedId(item.id);
                }}
                className={`relative z-10 px-4 py-2.5 rounded-xl font-mono text-xs font-bold flex items-center gap-2 transition-all border ${
                  isCompliant
                    ? 'bg-zinc-900/90 text-white border-zinc-700 hover:border-cyan-400'
                    : 'bg-red-950/40 text-red-200 border-red-800 hover:border-red-400'
                }`}
                style={{
                  width: item.width,
                  height: item.height,
                  justifyContent: 'center',
                }}
              >
                <span>{item.icon}</span>
                <span className="truncate">{item.name}</span>
              </button>

              {/* Dimension Metrics Tooltip */}
              <div className="flex items-center gap-1.5 text-[10px] font-mono">
                <span className="text-zinc-400">
                  {item.width}x{item.height}px
                </span>
                {isCompliant ? (
                  <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center gap-0.5">
                    <Check className="w-2.5 h-2.5" /> OK
                  </span>
                ) : (
                  <span className="px-1.5 py-0.5 rounded-full bg-red-500/20 text-red-400 font-bold flex items-center gap-0.5">
                    <AlertCircle className="w-2.5 h-2.5" /> -{activeTargetSize - item.height}px
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Target Feedback Readout */}
      <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2 text-zinc-300">
          <Hand className="w-4 h-4 text-cyan-400" />
          <span>
            {lastTappedId
              ? `Last Actuated Target: "${lastTappedId}"`
              : 'Tap anywhere in the stage to test tactile contact precision.'}
          </span>
        </div>

        {tapCoordinates && (
          <span className="text-zinc-500">
            Coordinates: X:{tapCoordinates.x}px, Y:{tapCoordinates.y}px
          </span>
        )}
      </div>
    </div>
  );
}
