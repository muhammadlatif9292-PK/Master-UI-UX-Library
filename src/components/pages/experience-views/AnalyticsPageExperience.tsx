/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  BarChart3,
  Calendar,
  Download,
  Filter,
  TrendingUp,
  ArrowUpRight,
  PieChart,
  Activity,
  Layers,
} from 'lucide-react';
import { PageStyleRecipe } from '../recipes';
import { DateTimeControls } from '../../../design-system/general/components/DateTimeControls';

interface Props {
  recipe: PageStyleRecipe;
}

export const AnalyticsPageExperience: React.FC<Props> = ({ recipe }) => {
  const [metricTab, setMetricTab] = useState<'latency' | 'throughput' | 'errors' | 'cost'>('latency');

  return (
    <div className={`w-full min-h-[850px] ${recipe.bodyBg} flex flex-col font-sans`}>
      {/* Analytics Header */}
      <header className={`px-6 py-4 border-b ${recipe.divider} ${recipe.headerBg} flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-20`}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h1 className={`font-extrabold text-lg ${recipe.textPrimary}`}>
              Deep Observability & Telemetry Analytics
            </h1>
            <p className={`text-xs ${recipe.textSecondary}`}>
              P99 latency analysis, kernel anomaly detection, and capacity forecasting
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all">
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </header>

      {/* Main Analytics Container */}
      <main className="p-6 max-w-7xl mx-auto w-full space-y-6 flex-1">
        {/* Temporal Range Selector Block */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-slate-300 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-400" />
            <span>Temporal Window & Timezone Synchronization</span>
          </h3>
          <DateTimeControls />
        </div>

        {/* Analytic Curves & Breakdown Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chart (2 Cols) */}
          <div className={`lg:col-span-2 p-6 rounded-3xl border ${recipe.cardBorder} ${recipe.cardBg} backdrop-blur-md space-y-4`}>
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-white">Inference Latency Percentiles (P50 / P95 / P99)</h4>
              <div className="flex gap-2 text-xs font-mono">
                <span className="text-emerald-400">P50: 0.8ms</span>
                <span className="text-indigo-400">P95: 1.4ms</span>
                <span className="text-rose-400">P99: 2.1ms</span>
              </div>
            </div>

            {/* Custom Multi-Tier Histogram Display */}
            <div className="h-60 w-full flex items-end gap-2 pt-6">
              {[
                { p50: 30, p95: 55, p99: 75 },
                { p50: 32, p95: 58, p99: 78 },
                { p50: 28, p95: 52, p99: 72 },
                { p50: 35, p95: 62, p99: 85 },
                { p50: 38, p95: 68, p99: 92 },
                { p50: 31, p95: 54, p99: 74 },
                { p50: 29, p95: 50, p99: 70 },
                { p50: 33, p95: 60, p99: 80 },
                { p50: 36, p95: 65, p99: 88 },
                { p50: 30, p95: 52, p99: 71 },
                { p50: 27, p95: 48, p99: 68 },
                { p50: 32, p95: 57, p99: 79 },
              ].map((bar, idx) => (
                <div key={idx} className="flex-1 flex flex-col justify-end h-full gap-1 items-center">
                  <div style={{ height: `${bar.p99}%` }} className="w-full bg-rose-500/20 rounded-t border-t border-rose-500/40 relative group">
                    <div style={{ height: `${bar.p95}%` }} className="w-full bg-indigo-500/40 border-t border-indigo-400">
                      <div style={{ height: `${bar.p50}%` }} className="w-full bg-emerald-500/70 border-t border-emerald-300" />
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">M{idx + 1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Regional Traffic & Error Breakdown (1 Col) */}
          <div className={`p-6 rounded-3xl border ${recipe.cardBorder} ${recipe.cardBg} backdrop-blur-md space-y-4`}>
            <h4 className="font-bold text-sm text-white">Geographic Shard Routing</h4>
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>US-East (Virginia)</span>
                  <span className="font-mono text-indigo-400">46.2%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full w-[46.2%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>EU-West (Frankfurt)</span>
                  <span className="font-mono text-cyan-400">31.8%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-cyan-400 h-full w-[31.8%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>AP-East (Tokyo)</span>
                  <span className="font-mono text-emerald-400">22.0%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-400 h-full w-[22%]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
