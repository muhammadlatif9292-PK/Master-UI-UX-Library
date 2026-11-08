/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StyleRecipe } from '../types';
import { BrainCircuit, ChevronDown, ChevronRight, Clock, Cpu, CheckCircle2, AlertCircle } from 'lucide-react';

interface ThinkingStateProps {
  recipe: StyleRecipe;
  isExpandedDefault?: boolean;
  activeStage?: string;
  stages?: {
    id: string;
    title: string;
    description: string;
    status: 'completed' | 'active' | 'pending';
    durationMs?: number;
    tokensUsed?: number;
  }[];
  totalDurationMs?: number;
  totalTokens?: number;
}

export function ThinkingState({
  recipe,
  isExpandedDefault = false,
  activeStage = 'Evaluating constraint satisfaction and formulating solution schema',
  stages = [
    {
      id: 's1',
      title: 'Context Window & Schema Ingestion',
      description: 'Parsed 14 workspace source files (128.4k tokens). Identified AST dependencies.',
      status: 'completed',
      durationMs: 240,
      tokensUsed: 450,
    },
    {
      id: 's2',
      title: 'Constraint Satisfaction & Rule Verification',
      description: 'Auditing WCAG AA contrast rules and verifying single-view container layout boundaries.',
      status: 'completed',
      durationMs: 380,
      tokensUsed: 620,
    },
    {
      id: 's3',
      title: 'Plan Formulation & Tool Selection',
      description: 'Selected web_search and code synthesis tools with deterministic parameter validation.',
      status: 'completed',
      durationMs: 190,
      tokensUsed: 310,
    },
    {
      id: 's4',
      title: 'Code Generation & Syntax Optimization',
      description: 'Synthesizing TypeScript interfaces, props contracts, and SVG vector paths.',
      status: 'active',
      durationMs: 410,
      tokensUsed: 890,
    },
  ],
  totalDurationMs = 1220,
  totalTokens = 2270,
}: ThinkingStateProps) {
  const [isExpanded, setIsExpanded] = useState(isExpandedDefault);

  const completedCount = stages.filter((s) => s.status === 'completed').length;
  const isRunning = stages.some((s) => s.status === 'active');

  return (
    <div
      className={`rounded-xl border transition-all duration-200 overflow-hidden ${
        recipe.borderClass
      } ${
        isRunning ? 'bg-black/40 shadow-[0_0_15px_rgba(255,255,255,0.03)]' : 'bg-black/20'
      }`}
    >
      {/* Header Bar */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-3 flex items-center justify-between gap-3 text-left hover:bg-white/5 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative">
            <BrainCircuit
              className={`w-4 h-4 ${
                isRunning ? 'text-violet-400 animate-pulse' : 'text-zinc-400'
              }`}
            />
            {isRunning && (
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-violet-400 animate-ping" />
            )}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-zinc-200">
                {isRunning ? 'Reasoning in progress...' : 'Thought Process'}
              </span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${recipe.badgeClass}`}>
                {completedCount}/{stages.length} stages verified
              </span>
            </div>
            {isRunning && (
              <p className="text-[11px] text-zinc-400 truncate max-w-md font-mono mt-0.5">
                Current step: {activeStage}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-400 shrink-0">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-zinc-500" />
            <span>{(totalDurationMs / 1000).toFixed(2)}s</span>
          </div>
          <div className="hidden sm:flex items-center gap-1">
            <Cpu className="w-3 h-3 text-zinc-500" />
            <span>{totalTokens} tokens</span>
          </div>
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 text-zinc-400" />
          ) : (
            <ChevronRight className="w-4 h-4 text-zinc-400" />
          )}
        </div>
      </button>

      {/* Expanded Reasoning Accordion */}
      {isExpanded && (
        <div className="px-4 pb-4 pt-2 border-t border-white/5 space-y-3 font-mono text-xs">
          <div className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">
            SYSTEM EXECUTION TIMELINE (AUTHENTIC TELEMETRY)
          </div>

          <div className="space-y-2 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[1px] before:bg-zinc-800">
            {stages.map((stage) => {
              const isDone = stage.status === 'completed';
              const isActive = stage.status === 'active';

              return (
                <div key={stage.id} className="relative pl-6 space-y-0.5">
                  {/* Status Indicator Dot */}
                  <div
                    className={`absolute left-0 top-1 w-4 h-4 rounded-full flex items-center justify-center -translate-x-1/2 ${
                      isDone
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : isActive
                        ? 'bg-violet-500/30 text-violet-300 ring-2 ring-violet-500/50 animate-pulse'
                        : 'bg-zinc-800 text-zinc-600'
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-3 h-3" />
                    ) : (
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          isActive ? 'bg-violet-400' : 'bg-zinc-600'
                        }`}
                      />
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className={isActive ? 'text-violet-300' : isDone ? 'text-zinc-200' : 'text-zinc-500'}>
                      {stage.title}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-normal">
                      {stage.durationMs ? `${stage.durationMs}ms` : 'pending'}
                    </span>
                  </div>

                  <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                    {stage.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-zinc-500">
            <span>Verified against system constraint engine</span>
            <span>Reasoning budget: 4,096 tokens</span>
          </div>
        </div>
      )}
    </div>
  );
}
