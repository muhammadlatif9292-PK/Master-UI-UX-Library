/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  ShieldAlert,
  Radio,
  Server,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Bell,
  Cpu,
  RefreshCw,
  Zap,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import { PageStyleRecipe } from '../recipes';
import { NotificationCenter } from '../../../design-system/general/components/NotificationCenter';

interface Props {
  recipe: PageStyleRecipe;
}

export const CommandCenterPageExperience: React.FC<Props> = ({ recipe }) => {
  const [activeDefcon, setActiveDefcon] = useState<1 | 2 | 3 | 4 | 5>(5);

  const nodes = Array.from({ length: 32 }, (_, i) => ({
    id: `NODE-0${i + 1}`,
    status: i === 7 ? 'critical' : i === 14 ? 'warning' : 'healthy',
    load: Math.floor(Math.random() * 40) + 50,
  }));

  return (
    <div className={`w-full min-h-[850px] ${recipe.bodyBg} flex flex-col font-sans`}>
      {/* NOC Header */}
      <header className={`px-6 py-4 border-b ${recipe.divider} ${recipe.headerBg} flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-20`}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className={`font-extrabold text-lg ${recipe.textPrimary}`}>
                Network Operations Center & Incident Command Deck
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold">
                INCIDENT TRIAGE ACTIVE
              </span>
            </div>
            <p className={`text-xs ${recipe.textSecondary}`}>
              Global multi-region telemetry matrix and automated mitigation routing
            </p>
          </div>
        </div>

        {/* DEFCON Level Selector */}
        <div className="flex items-center gap-1.5 bg-black/50 p-1 rounded-xl border border-slate-800 text-xs font-mono">
          <span className="text-slate-400 px-2 text-[11px]">SECURITY STATE:</span>
          {([5, 4, 3, 2, 1] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setActiveDefcon(lvl)}
              className={`px-2 py-1 rounded-lg font-bold ${
                activeDefcon === lvl
                  ? lvl <= 2
                    ? 'bg-rose-600 text-white'
                    : 'bg-amber-600 text-black'
                  : 'text-slate-500 hover:text-white'
              }`}
            >
              DEFCON {lvl}
            </button>
          ))}
        </div>
      </header>

      {/* Main Command Center Grid */}
      <main className="p-6 max-w-7xl mx-auto w-full space-y-6 flex-1">
        {/* Real-time Global Node Cluster Matrix */}
        <div className={`p-6 rounded-3xl border ${recipe.cardBorder} ${recipe.cardBg} backdrop-blur-md space-y-4`}>
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Server className="w-4 h-4 text-amber-400" />
              <span>32-Node High-Density Infrastructure Mesh</span>
            </h3>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1 text-emerald-400"><span className="w-2 h-2 rounded-full bg-emerald-500" /> 30 Healthy</span>
              <span className="flex items-center gap-1 text-amber-400"><span className="w-2 h-2 rounded-full bg-amber-500" /> 1 Warning</span>
              <span className="flex items-center gap-1 text-rose-400"><span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" /> 1 Degraded</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2.5">
            {nodes.map((node) => (
              <div
                key={node.id}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  node.status === 'critical'
                    ? 'bg-rose-500/20 border-rose-500 text-rose-300 animate-pulse'
                    : node.status === 'warning'
                    ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                    : 'bg-black/40 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="text-[10px] font-mono text-slate-500">{node.id}</div>
                <div className="font-bold text-xs font-mono my-0.5">{node.load}%</div>
                <div className={`text-[9px] font-bold uppercase ${
                  node.status === 'critical' ? 'text-rose-400' : node.status === 'warning' ? 'text-amber-400' : 'text-emerald-400'
                }`}>
                  {node.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Split View: Live Incident Alert Feed (6 Cols) & Automated Mitigation Pipeline (6 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="font-bold text-xs text-white flex items-center gap-2">
              <Bell className="w-4 h-4 text-indigo-400" />
              <span>Real-Time Alert Feed & Triage</span>
            </h3>
            <NotificationCenter />
          </div>

          <div className={`p-6 rounded-3xl border ${recipe.cardBorder} ${recipe.cardBg} backdrop-blur-md space-y-4`}>
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>Automated Mitigation Routing Playbook</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-4 rounded-2xl bg-black/40 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white">Rule 14-B: High-Jitter Shard Evacuation</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono">ENABLED</span>
                </div>
                <p className="text-slate-400">
                  Automatically drain ingress packets from pods exceeding P99 threshold of 2.50ms and redirect to warm replica pool.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-white">Rule 22-A: Cryptographic Token Revocation</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono">ENABLED</span>
                </div>
                <p className="text-slate-400">
                  Instantly blacklist JWT subkeys if unauthorized RPC calls are detected from unknown ASNs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
