/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useGeneral } from '../GeneralContext';
import {
  CheckCircle2,
  Clock,
  AlertOctagon,
  ChevronRight,
  Sparkles,
  GitBranch,
  Terminal,
  ArrowRight,
  Layers,
} from 'lucide-react';

export interface TimelineMilestone {
  id: string;
  phase: string;
  title: string;
  description: string;
  timestamp: string;
  duration: string;
  status: 'completed' | 'current' | 'pending' | 'blocked';
  tags: string[];
  logsSnippet?: string;
}

export const TimelineView: React.FC = () => {
  const { recipeConfig, stateMode } = useGeneral();
  const [orientation, setOrientation] = useState<'vertical' | 'horizontal'>('vertical');
  const [expandedId, setExpandedId] = useState<string | null>('m-2');

  const milestones: TimelineMilestone[] = [
    {
      id: 'm-1',
      phase: 'Phase 01',
      title: 'Dataset Ingestion & Tokenizer Harmonization',
      description: 'Streamed 1.2 trillion tokens across 128 distributed worker nodes with zero byte-level corruption.',
      timestamp: '04:15:00 UTC',
      duration: '42m 18s',
      status: 'completed',
      tags: ['data-pipeline', 'sharding'],
      logsSnippet: '[INFO] 128/128 shards partitioned. Token dictionary hash verified: 0x8F4A.',
    },
    {
      id: 'm-2',
      phase: 'Phase 02',
      title: 'Distributed Transformer Matrix Pre-training',
      description: 'Active pipeline parallelism across TPU v5e pod. Gradient norm convergence within 1.2% variance.',
      timestamp: '04:57:18 UTC',
      duration: 'In Progress (2h 14m)',
      status: 'current',
      tags: ['training', 'tpu-pod'],
      logsSnippet: '[STEP 48200] loss: 0.1428 | lr: 1.2e-4 | grad_norm: 0.88 | throughput: 420k tok/s',
    },
    {
      id: 'm-3',
      phase: 'Phase 03',
      title: 'Reinforcement Learning from AI Feedback (RLAIF)',
      description: 'Constitutional rule checks and iterative preference scoring against adversarial benchmarks.',
      timestamp: 'Pending',
      duration: '~1h 30m est.',
      status: 'pending',
      tags: ['alignment', 'constitutional-ai'],
    },
    {
      id: 'm-4',
      phase: 'Phase 04',
      title: 'Quantization & Production Gateway Release',
      description: 'INT8 and FP8 kernel compilation for edge acceleration and zero-latency serving.',
      timestamp: 'Pending',
      duration: '~20m est.',
      status: 'pending',
      tags: ['int8', 'serving-gateway'],
    },
  ];

  const getStatusIcon = (status: TimelineMilestone['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case 'current':
        return (
          <span className="relative flex h-5 w-5 items-center justify-center">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-indigo-500"></span>
          </span>
        );
      case 'blocked':
        return <AlertOctagon className="w-5 h-5 text-rose-400" />;
      default:
        return <Clock className="w-5 h-5 text-slate-600" />;
    }
  };

  return (
    <div className={`rounded-3xl border ${recipeConfig.cardBg} ${recipeConfig.border} ${recipeConfig.fontFamily} shadow-2xl p-6 space-y-6 select-none max-w-3xl`}>
      {/* Header & Orientation Toggle */}
      <div className="flex items-center justify-between pb-3 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-2xl bg-black/40 border border-white/10 text-indigo-400">
            <GitBranch className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`font-bold text-base ${recipeConfig.textPrimary}`}>Execution Milestone Pipeline</h3>
            <p className={`text-xs ${recipeConfig.textSecondary}`}>
              Multi-phase training execution timeline and telemetry progression
            </p>
          </div>
        </div>

        <div className="flex items-center bg-black/40 p-0.5 rounded-xl border border-white/5 text-xs font-mono">
          <button
            onClick={() => setOrientation('vertical')}
            className={`px-3 py-1 rounded-lg ${orientation === 'vertical' ? `${recipeConfig.accentBg}` : 'text-slate-400 hover:text-white'}`}
          >
            Vertical
          </button>
          <button
            onClick={() => setOrientation('horizontal')}
            className={`px-3 py-1 rounded-lg ${orientation === 'horizontal' ? `${recipeConfig.accentBg}` : 'text-slate-400 hover:text-white'}`}
          >
            Horizontal
          </button>
        </div>
      </div>

      {/* Main Timeline View */}
      {orientation === 'vertical' ? (
        <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-800">
          {milestones.map((m) => {
            const isExpanded = expandedId === m.id;

            return (
              <div key={m.id} className="relative group">
                {/* Timeline Node Dot */}
                <div className="absolute -left-6 top-1 transform -translate-x-1/2 bg-slate-950 p-1 rounded-full border border-slate-800">
                  {getStatusIcon(m.status)}
                </div>

                {/* Milestone Card */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : m.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    m.status === 'current'
                      ? 'border-indigo-500/60 bg-indigo-500/10 shadow-lg'
                      : `${recipeConfig.border} bg-black/30 hover:border-slate-600`
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-md border ${recipeConfig.badgeBg}`}>
                        {m.phase}
                      </span>
                      <h4 className={`font-bold text-sm ${recipeConfig.textPrimary}`}>{m.title}</h4>
                    </div>

                    <div className={`text-[11px] font-mono ${recipeConfig.textSecondary} flex items-center gap-2`}>
                      <span>{m.timestamp}</span>
                      <span>•</span>
                      <span className="text-slate-300 font-semibold">{m.duration}</span>
                    </div>
                  </div>

                  <p className={`text-xs ${recipeConfig.textSecondary} mt-2 leading-relaxed`}>
                    {m.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {m.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-lg bg-black/40 border border-white/5 text-[10px] font-mono text-slate-400">
                        #{t}
                      </span>
                    ))}
                  </div>

                  {/* Expanded Logs Snippet */}
                  {isExpanded && m.logsSnippet && (
                    <div className="mt-3 p-3 rounded-xl bg-black/80 border border-white/10 font-mono text-[11px] text-emerald-400 flex items-start gap-2">
                      <Terminal className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <div className="overflow-x-auto">{m.logsSnippet}</div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Horizontal Timeline */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {milestones.map((m) => (
            <div
              key={m.id}
              className={`p-4 rounded-2xl border flex flex-col justify-between gap-3 ${
                m.status === 'current'
                  ? 'border-indigo-500/60 bg-indigo-500/10'
                  : `${recipeConfig.border} bg-black/30`
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${recipeConfig.badgeBg}`}>
                  {m.phase}
                </span>
                {getStatusIcon(m.status)}
              </div>

              <div className="space-y-1">
                <h4 className={`font-bold text-xs ${recipeConfig.textPrimary}`}>{m.title}</h4>
                <div className={`text-[10px] font-mono ${recipeConfig.textSecondary}`}>{m.duration}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
