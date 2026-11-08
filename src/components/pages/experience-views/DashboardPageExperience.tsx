/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  LayoutDashboard,
  Activity,
  Cpu,
  Database,
  ShieldCheck,
  TrendingUp,
  Server,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Sliders,
  Filter,
  Download,
  MoreVertical,
  CheckCircle,
  AlertTriangle,
  Layers,
} from 'lucide-react';
import { PageStyleRecipe } from '../recipes';
import { TableControls } from '../../../design-system/general/components/TableControls';
import { ActivityFeed } from '../../../design-system/general/components/ActivityFeed';
import { NotificationCenter } from '../../../design-system/general/components/NotificationCenter';

interface Props {
  recipe: PageStyleRecipe;
}

export const DashboardPageExperience: React.FC<Props> = ({ recipe }) => {
  const [timeRange, setTimeRange] = useState<'1h' | '24h' | '7d' | '30d'>('24h');
  const [activeTab, setActiveTab] = useState<'overview' | 'telemetry' | 'nodes' | 'logs'>('overview');

  const stats = [
    {
      title: 'Aggregate Throughput',
      value: '48.2 GB/s',
      change: '+14.6%',
      isPositive: true,
      sub: 'Across 128 cluster nodes',
      icon: Activity,
    },
    {
      title: 'Neural Inference Latency',
      value: '1.24 ms',
      change: '-0.32 ms',
      isPositive: true,
      sub: 'P99 SLA: < 2.50 ms',
      icon: Cpu,
    },
    {
      title: 'Active Compute Shards',
      value: '1,024 / 1,024',
      change: '100% Up',
      isPositive: true,
      sub: 'Zero degraded pods',
      icon: Server,
    },
    {
      title: 'Memory Footprint',
      value: '74.2%',
      change: '+3.1%',
      isPositive: false,
      sub: '18.9 TB allocated',
      icon: Database,
    },
  ];

  return (
    <div className={`w-full min-h-[850px] ${recipe.bodyBg} flex flex-col font-sans`}>
      {/* Top Workspace Header Bar */}
      <header className={`px-6 py-4 border-b ${recipe.divider} ${recipe.headerBg} flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-20`}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
            <LayoutDashboard className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className={`font-extrabold text-lg ${recipe.textPrimary}`}>
                Cluster Operations & Telemetry Deck
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">
                LIVE PRODUCTION
              </span>
            </div>
            <p className={`text-xs ${recipe.textSecondary}`}>
              Real-time multi-agent execution pipeline & distributed telemetry matrix
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Time Range Chips */}
          <div className="flex items-center bg-black/40 p-1 rounded-xl border border-slate-800 text-xs font-mono">
            {(['1h', '24h', '7d', '30d'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  timeRange === range
                    ? 'bg-indigo-600 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          <button className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-all text-xs flex items-center gap-1.5">
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Sync Data</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="p-6 max-w-7xl mx-auto w-full space-y-6 flex-1">
        {/* KPI Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className={`p-5 rounded-3xl border ${recipe.cardBorder} ${recipe.cardBg} backdrop-blur-md space-y-3 transition-all ${recipe.cardHoverBorder} shadow-sm`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-medium ${recipe.textMuted}`}>{stat.title}</span>
                  <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="flex items-baseline justify-between">
                  <div className={`text-2xl font-extrabold font-mono ${recipe.textPrimary}`}>
                    {stat.value}
                  </div>
                  <div
                    className={`flex items-center text-xs font-bold ${
                      stat.isPositive ? 'text-emerald-400' : 'text-amber-400'
                    }`}
                  >
                    {stat.isPositive ? (
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowDownRight className="w-3.5 h-3.5" />
                    )}
                    <span>{stat.change}</span>
                  </div>
                </div>

                <div className={`text-[11px] ${recipe.textSecondary} flex items-center justify-between pt-1 border-t ${recipe.divider}`}>
                  <span>{stat.sub}</span>
                  <span className="text-[10px] text-emerald-400 font-mono">NOMINAL</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Multi-Component Bento Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart / Telemetry Stream (2 Cols) */}
          <div className={`lg:col-span-2 p-6 rounded-3xl border ${recipe.cardBorder} ${recipe.cardBg} backdrop-blur-md space-y-5`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
              <div>
                <h3 className={`font-bold text-sm ${recipe.textPrimary} flex items-center gap-2`}>
                  <TrendingUp className="w-4 h-4 text-indigo-400" />
                  Distributed Load & Memory Allocation (Live Telemetry)
                </h3>
                <p className={`text-xs ${recipe.textMuted}`}>
                  Sample rate: 100ms • GPU Memory vs Cluster Queue Ingress
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-[11px] text-indigo-400 font-mono">
                  <span className="w-2 h-2 rounded-full bg-indigo-500" /> Ingress
                </span>
                <span className="flex items-center gap-1 text-[11px] text-cyan-400 font-mono">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" /> Memory
                </span>
              </div>
            </div>

            {/* Visual Telemetry Bars */}
            <div className="h-56 w-full flex items-end gap-1.5 pt-4">
              {[
                35, 42, 58, 65, 48, 52, 70, 85, 92, 78, 64, 72, 88, 95, 82, 76, 68, 74, 89, 94,
                80, 85, 91, 78, 62, 58, 73, 86, 92, 88, 95, 100, 84, 76, 82, 90, 85, 78, 69, 74,
              ].map((val, idx) => (
                <div key={idx} className="flex-1 flex flex-col justify-end h-full group relative">
                  <div
                    style={{ height: `${val}%` }}
                    className="w-full rounded-t-sm bg-gradient-to-t from-indigo-600/40 via-indigo-500 to-cyan-400 transition-all group-hover:brightness-125"
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3 pt-3 border-t border-slate-800 text-xs font-mono">
              <div className="p-3 rounded-2xl bg-black/40 border border-slate-800">
                <span className="text-slate-500 text-[10px] block">PEAK LOAD</span>
                <span className="font-bold text-white">98.4% at 04:12 UTC</span>
              </div>
              <div className="p-3 rounded-2xl bg-black/40 border border-slate-800">
                <span className="text-slate-500 text-[10px] block">AVG EFFICIENCY</span>
                <span className="font-bold text-emerald-400">99.18% Optimal</span>
              </div>
              <div className="p-3 rounded-2xl bg-black/40 border border-slate-800">
                <span className="text-slate-500 text-[10px] block">TOTAL PACKETS</span>
                <span className="font-bold text-cyan-400">14.8 Billion</span>
              </div>
            </div>
          </div>

          {/* Activity Feed Sidebar (1 Col) */}
          <div className="space-y-4">
            <ActivityFeed />
          </div>
        </div>

        {/* Telemetry Data Grid Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className={`font-bold text-sm ${recipe.textPrimary} flex items-center gap-2`}>
              <Server className="w-4 h-4 text-indigo-400" />
              Node Cluster Telemetry & Active Shards
            </h3>
            <span className="text-xs text-slate-400 font-mono">128 Nodes Total • 4 Shards Active</span>
          </div>
          <TableControls />
        </div>
      </main>
    </div>
  );
};
