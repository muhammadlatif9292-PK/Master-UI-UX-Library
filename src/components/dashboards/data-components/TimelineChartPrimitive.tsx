/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { VisualRecipeStyle } from '../types';
import { VISUAL_RECIPES } from '../recipes';
import { CheckCircle2, Clock, AlertTriangle, Play, ShieldAlert } from 'lucide-react';

interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  category: 'deploy' | 'incident' | 'security' | 'checkpoint' | 'scale';
  description: string;
  duration?: string;
  status: 'completed' | 'in-progress' | 'warning' | 'pending';
}

const DEFAULT_EVENTS: TimelineEvent[] = [
  {
    id: '1',
    time: '20:15:30',
    title: 'Cluster Autoscale Triggered',
    category: 'scale',
    description: 'Expanded pool from 32 to 64 A100 GPU nodes due to batch queue surge.',
    duration: '42s',
    status: 'completed',
  },
  {
    id: '2',
    time: '20:18:12',
    title: 'Zero-Downtime Rollout v4.8.0',
    category: 'deploy',
    description: 'Canary deployment shifted to 100% ingress traffic. Latency p99 at 14ms.',
    duration: '1m 20s',
    status: 'completed',
  },
  {
    id: '3',
    time: '20:20:45',
    title: 'Distributed Model Checkpoint',
    category: 'checkpoint',
    description: 'Flushed 82.4 GB state tensors to dual-redundant NVMe cache storage.',
    duration: 'Active',
    status: 'in-progress',
  },
  {
    id: '4',
    time: '20:22:00',
    title: 'TLS Certificate Renewal',
    category: 'security',
    description: 'Renewed wildcard mTLS certificates across 18 edge ingress gateways.',
    duration: 'Pending',
    status: 'pending',
  },
];

export function TimelineChartPrimitive({
  events = DEFAULT_EVENTS,
  recipe = VISUAL_RECIPES['editorial'],
  title = 'Chronological Event Horizon',
}: {
  events?: TimelineEvent[];
  recipe?: VisualRecipeStyle;
  title?: string;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const getStatusIcon = (status: TimelineEvent['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case 'in-progress':
        return <Play className="w-3.5 h-3.5 text-sky-400 animate-pulse" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      default:
        return <Clock className="w-3.5 h-3.5 text-zinc-500" />;
    }
  };

  return (
    <div
      role="region"
      aria-label={`${title} timeline`}
      tabIndex={0}
      className={`p-4 rounded-xl border ${recipe.borderClass} ${recipe.cardClass} relative overflow-hidden focus:outline-none focus:ring-1 focus:ring-sky-500`}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className={`text-sm font-semibold ${recipe.textPrimary}`}>{title}</h4>
          <p className={`text-xs ${recipe.textMuted}`}>Chronological audit trail & ops milestones</p>
        </div>
        <span className={`text-[10px] px-2 py-0.5 rounded-sm font-mono ${recipe.badgeClass}`}>Real-Time Log</span>
      </div>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-white/10">
        {events.map((evt) => {
          const isSelected = selectedId === evt.id;

          return (
            <div
              key={evt.id}
              className={`relative cursor-pointer transition-all ${isSelected ? 'translate-x-1' : ''}`}
              onClick={() => setSelectedId(isSelected ? null : evt.id)}
            >
              {/* Timeline node icon */}
              <div className="absolute -left-[30px] top-0 w-5 h-5 rounded-full bg-slate-900 border border-white/20 flex items-center justify-center">
                {getStatusIcon(evt.status)}
              </div>

              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-zinc-400">{evt.time}</span>
                    <span className={`text-xs font-semibold ${recipe.textPrimary}`}>{evt.title}</span>
                  </div>
                  <p className={`text-xs ${recipe.textSecondary} mt-0.5 leading-relaxed`}>{evt.description}</p>
                </div>
                {evt.duration && (
                  <span className={`text-[10px] font-mono shrink-0 px-1.5 py-0.5 rounded-xs ${recipe.badgeClass}`}>
                    {evt.duration}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
