/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { VisualRecipeStyle } from '../types';
import { VISUAL_RECIPES } from '../recipes';
import { LineChartPrimitive } from '../data-components/LineChartPrimitive';
import { RadialChartPrimitive } from '../data-components/RadialChartPrimitive';
import { ScatterPlotPrimitive } from '../data-components/ScatterPlotPrimitive';
import { ProgressPrimitive } from '../data-components/ProgressPrimitive';
import { SparklinePrimitive } from '../data-components/SparklinePrimitive';
import { ComparisonGraphPrimitive } from '../data-components/ComparisonGraphPrimitive';
import { Bot, Cpu, Sparkles, BrainCircuit, Activity } from 'lucide-react';

export function AiDashboardLayout({ recipe = VISUAL_RECIPES['quantum'] }: { recipe?: VisualRecipeStyle }) {
  const aiRecipe = VISUAL_RECIPES['quantum'];
  const [selectedAgent, setSelectedAgent] = useState('agent-deep-research');

  return (
    <div className="space-y-6">
      {/* AI Intelligence Studio Header */}
      <div className={`p-4 rounded-xl border ${aiRecipe.borderClass} ${aiRecipe.cardClass} flex flex-wrap items-center justify-between gap-4`}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-violet-500/20 border border-violet-500/40 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
            <BrainCircuit className="w-5 h-5 text-violet-300" />
          </div>
          <div>
            <h2 className="text-base font-bold text-violet-50">Gemini Neural Operations & Agent Swarm</h2>
            <p className="text-xs text-violet-300/80">32 Autonomous Sub-Agents Active | 4.2M Tokens/min</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-violet-300 font-mono">Agent Pool:</span>
          <select
            value={selectedAgent}
            onChange={(e) => setSelectedAgent(e.target.value)}
            className="bg-black/60 border border-violet-500/40 text-violet-200 text-xs rounded-lg px-2.5 py-1.5 font-mono focus:outline-none focus:border-violet-400"
          >
            <option value="agent-deep-research">Antigravity Deep Research Agent</option>
            <option value="agent-code-synth">Gemini Code Synthesizer v2.5</option>
            <option value="agent-eval">Multi-Turn Alignment Evaluator</option>
          </select>
        </div>
      </div>

      {/* Top AI Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SparklinePrimitive label="Token Ingestion" value="4.82 M/min" delta="+22%" isPositive={true} recipe={aiRecipe} />
        <SparklinePrimitive label="Time-to-First-Token" value="112 ms" delta="-18 ms" isPositive={true} recipe={aiRecipe} />
        <SparklinePrimitive label="Tool Calling Accuracy" value="99.4%" delta="+0.6%" isPositive={true} recipe={aiRecipe} />
        <SparklinePrimitive label="KV Cache Re-use" value="91.8%" delta="+3.2%" isPositive={true} recipe={aiRecipe} />
      </div>

      {/* Main 2-Column AI Deep View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LineChartPrimitive
            recipe={aiRecipe}
            title="Token Generation Velocity vs. Context Window Depth"
            series1Label="Generation Yield (t/s)"
            series2Label="KV Cache Latency (ms)"
            unit="t/s"
            height={240}
          />
        </div>
        <div className="lg:col-span-1">
          <RadialChartPrimitive
            recipe={aiRecipe}
            title="Agent Confidence & Entropy"
            centerLabel="Alignment"
            centerValue="98.7%"
            size={200}
          />
        </div>
      </div>

      {/* Bottom Scatter & Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ScatterPlotPrimitive
          recipe={aiRecipe}
          title="Multi-Model Benchmark: Latency vs. Reasoning Score"
          xLabel="Inference Latency (ms)"
          yLabel="MMLU-Pro Accuracy (%)"
        />
        <ComparisonGraphPrimitive
          recipe={aiRecipe}
          title="Flash-Lite vs. Pro 2.5 Throughput Metrics"
          variantA="Gemini 1.5 Pro"
          variantB="Gemini 2.5 Flash-Thinking"
        />
      </div>
    </div>
  );
}
