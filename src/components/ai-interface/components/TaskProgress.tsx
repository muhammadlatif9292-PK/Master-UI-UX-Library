/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StyleRecipe, TaskStepItem } from '../types';
import { CheckCircle2, Clock, Play, RotateCcw, ChevronRight, ChevronDown, Activity, AlertCircle } from 'lucide-react';

interface TaskProgressProps {
  recipe: StyleRecipe;
  steps?: TaskStepItem[];
  title?: string;
}

export function TaskProgress({
  recipe,
  title = 'Autonomous Agent Workflow Pipeline',
  steps = [
    {
      id: 'step-1',
      title: 'Analyze Requirements & Extract AST Intent',
      description: 'Parsed conversational parameters and established interface boundary constraints.',
      status: 'completed',
      startedAt: 1720000000000,
      completedAt: 1720000000280,
      subTasks: [
        { id: 'sub-1', title: 'Token budget calculation (12.4k allocated)', done: true },
        { id: 'sub-2', title: 'Identify required component families', done: true },
      ],
    },
    {
      id: 'step-2',
      title: 'Parallel Web Search & Grounding Ingestion',
      description: 'Fetched official Gemini 2.5 Live API and Tailwind CSS v4 design specifications.',
      status: 'completed',
      startedAt: 1720000000280,
      completedAt: 1720000000620,
      subTasks: [
        { id: 'sub-3', title: 'Query ai.google.dev live docs', done: true },
        { id: 'sub-4', title: 'Validate schema against W3C WAI-ARIA 1.2', done: true },
      ],
    },
    {
      id: 'step-3',
      title: 'Synthesize TypeScript Interfaces & Props Contract',
      description: 'Generated 18 component primitives and 11 distinct visual style recipes.',
      status: 'in_progress',
      startedAt: 1720000000620,
      subTasks: [
        { id: 'sub-5', title: 'Build ThinkingState with honest telemetry', done: true },
        { id: 'sub-6', title: 'Assemble kinetic SVG/Canvas AI Orb', done: false },
      ],
    },
    {
      id: 'step-4',
      title: 'Static Verification & Production Build',
      description: 'Run TypeScript compiler and ESLint validation suite to ensure zero warnings.',
      status: 'pending',
      subTasks: [
        { id: 'sub-7', title: 'Execute compile_applet build verification', done: false },
        { id: 'sub-8', title: 'Confirm 60fps rendering in sandboxed preview', done: false },
      ],
    },
  ],
}: TaskProgressProps) {
  const [expandedStep, setExpandedStep] = useState<string | null>('step-3');

  const completedCount = steps.filter((s) => s.status === 'completed').length;
  const progressPercent = (completedCount / steps.length) * 100;

  return (
    <div className={`p-5 rounded-2xl border space-y-4 ${recipe.borderClass} ${recipe.cardClass}`}>
      {/* Header Pipeline Info */}
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/30">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-white">{title}</h4>
            <p className="text-[11px] text-zinc-400">Authentic multi-stage execution DAG</p>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono text-[11px]">
          <span className={`px-2 py-0.5 rounded ${recipe.badgeClass}`}>
            {completedCount} / {steps.length} STEPS DONE
          </span>
        </div>
      </div>

      {/* Linear Overall Progress Bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-[11px] font-mono text-zinc-400">
          <span>Overall Workflow Completion</span>
          <span className="text-emerald-400 font-bold">{progressPercent.toFixed(0)}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-zinc-900 border border-white/5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sky-500 to-emerald-400 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Stepper Steps List */}
      <div className="space-y-2 pt-1">
        {steps.map((step, idx) => {
          const isDone = step.status === 'completed';
          const isCurrent = step.status === 'in_progress';
          const isPending = step.status === 'pending';
          const isExpanded = expandedStep === step.id;

          const durationMs =
            step.startedAt && step.completedAt ? step.completedAt - step.startedAt : undefined;

          return (
            <div
              key={step.id}
              className={`rounded-xl border transition-all overflow-hidden ${
                isCurrent
                  ? 'border-sky-500/50 bg-sky-950/20 shadow-md'
                  : isDone
                  ? 'border-white/10 bg-black/30'
                  : 'border-white/5 bg-black/10 opacity-70'
              }`}
            >
              {/* Step Header */}
              <button
                onClick={() => setExpandedStep(isExpanded ? null : step.id)}
                className="w-full p-3 flex items-center justify-between gap-3 text-left hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Status Indicator Icon */}
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[10px] font-bold shrink-0 ${
                      isDone
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : isCurrent
                        ? 'bg-sky-500/30 text-sky-300 border border-sky-400 animate-pulse'
                        : 'bg-zinc-800 text-zinc-500 border border-zinc-700'
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                  </div>

                  <div className="min-w-0">
                    <span
                      className={`text-xs font-semibold block truncate ${
                        isCurrent ? 'text-sky-300' : isDone ? 'text-white' : 'text-zinc-400'
                      }`}
                    >
                      {step.title}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      {isDone ? 'Completed' : isCurrent ? 'Active Execution' : 'Queued'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 font-mono text-[10px] text-zinc-400 shrink-0">
                  {durationMs && <span>{durationMs}ms</span>}
                  {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </div>
              </button>

              {/* Step Expanded Details */}
              {isExpanded && (
                <div className="px-4 pb-3 pt-1 border-t border-white/5 space-y-2 text-xs">
                  <p className="text-zinc-300 font-sans text-xs leading-relaxed">
                    {step.description}
                  </p>

                  {step.subTasks && step.subTasks.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-white/5 font-mono text-[11px]">
                      <span className="text-[10px] uppercase font-bold text-zinc-500">
                        Sub-Task Verification
                      </span>
                      {step.subTasks.map((sub) => (
                        <div key={sub.id} className="flex items-center gap-2 text-zinc-400">
                          <CheckCircle2
                            className={`w-3.5 h-3.5 ${
                              sub.done ? 'text-emerald-400' : 'text-zinc-700'
                            }`}
                          />
                          <span className={sub.done ? 'text-zinc-200' : 'text-zinc-500'}>
                            {sub.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
