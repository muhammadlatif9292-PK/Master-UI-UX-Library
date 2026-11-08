/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StyleRecipe } from '../types';
import { Activity, ShieldCheck, Cpu, HardDrive, Wifi, Zap } from 'lucide-react';

interface StatusIndicatorProps {
  recipe: StyleRecipe;
  compact?: boolean;
  tpmUsed?: number;
  tpmMax?: number;
  rpmUsed?: number;
  rpmMax?: number;
  latencyMs?: number;
  queueDepth?: number;
}

export function StatusIndicator({
  recipe,
  compact = false,
  tpmUsed = 42800,
  tpmMax = 1000000,
  rpmUsed = 84,
  rpmMax = 360,
  latencyMs = 142,
  queueDepth = 0,
}: StatusIndicatorProps) {
  const tpmPercentage = (tpmUsed / tpmMax) * 100;
  const rpmPercentage = (rpmUsed / rpmMax) * 100;

  if (compact) {
    return (
      <div className={`flex items-center gap-2 px-2.5 py-1 rounded-lg border text-[11px] font-mono ${recipe.borderClass} ${recipe.cardClass}`}>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-zinc-200">API Active</span>
        </div>
        <span className="text-zinc-600">|</span>
        <span className="text-sky-400">{latencyMs}ms</span>
        <span className="text-zinc-600">|</span>
        <span className="text-zinc-400">{rpmUsed} RPM</span>
      </div>
    );
  }

  return (
    <div className={`p-4 rounded-xl border space-y-3 font-mono text-xs ${recipe.borderClass} ${recipe.cardClass}`}>
      {/* Header Status */}
      <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Activity className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="font-bold text-white flex items-center gap-1.5">
              <span>SYSTEM INFERENCE STATUS</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                HEALTHY
              </span>
            </div>
            <span className="text-[10px] text-zinc-400">All edge inference clusters active</span>
          </div>
        </div>

        <div className="text-right text-[11px] text-zinc-400">
          <div>Avg Latency: <span className="text-emerald-400 font-bold">{latencyMs}ms</span></div>
          <div>Queue: <span className="text-white">{queueDepth} requests</span></div>
        </div>
      </div>

      {/* Rate Limits & Quotas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        {/* Tokens Per Minute */}
        <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-zinc-400 flex items-center gap-1">
              <Cpu className="w-3 h-3 text-sky-400" /> TPM Budget
            </span>
            <span className="text-zinc-200">{(tpmUsed / 1000).toFixed(1)}k / {(tpmMax / 1000).toFixed(0)}k</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
            <div
              className="h-full bg-sky-400 transition-all duration-300"
              style={{ width: `${tpmPercentage}%` }}
            />
          </div>
          <div className="text-[9px] text-zinc-500 text-right">
            {(100 - tpmPercentage).toFixed(0)}% available
          </div>
        </div>

        {/* Requests Per Minute */}
        <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-zinc-400 flex items-center gap-1">
              <Zap className="w-3 h-3 text-emerald-400" /> RPM Limit
            </span>
            <span className="text-zinc-200">{rpmUsed} / {rpmMax}</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
            <div
              className="h-full bg-emerald-400 transition-all duration-300"
              style={{ width: `${rpmPercentage}%` }}
            />
          </div>
          <div className="text-[9px] text-zinc-500 text-right">
            {(100 - rpmPercentage).toFixed(0)}% available
          </div>
        </div>
      </div>
    </div>
  );
}
