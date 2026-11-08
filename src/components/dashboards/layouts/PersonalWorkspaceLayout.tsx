/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { VisualRecipeStyle } from '../types';
import { LineChartPrimitive } from '../data-components/LineChartPrimitive';
import { RadialChartPrimitive } from '../data-components/RadialChartPrimitive';
import { ProgressPrimitive } from '../data-components/ProgressPrimitive';
import { HeatmapPrimitive } from '../data-components/HeatmapPrimitive';
import { SparklinePrimitive } from '../data-components/SparklinePrimitive';
import { User, CheckSquare, Clock, Flame, Calendar, Sparkles } from 'lucide-react';

export function PersonalWorkspaceLayout({ recipe }: { recipe: VisualRecipeStyle }) {
  const [focusActive, setFocusActive] = useState(false);
  const [tasks, setTasks] = useState([
    { id: '1', text: 'Synthesize Master UX Design Tokens', done: true },
    { id: '2', text: 'Profile WebGL Shader Fragment Performance', done: true },
    { id: '3', text: 'Deploy Dashboard Catalog to Production', done: false },
    { id: '4', text: 'Write Architectural Whitepaper on UI Synthesis', done: false },
  ]);

  const toggleTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  return (
    <div className="space-y-6">
      {/* Personalized Welcome Header */}
      <div className={`p-4 rounded-xl border ${recipe.borderClass} ${recipe.cardClass} flex flex-wrap items-center justify-between gap-4`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-sky-500/20 border border-sky-500/40 flex items-center justify-center text-sky-300 font-bold">
            JD
          </div>
          <div>
            <h2 className={`text-base font-bold ${recipe.textPrimary}`}>Welcome back, Senior Engineer</h2>
            <p className={`text-xs ${recipe.textMuted}`}>3 of 4 daily sprint goals achieved | 14 day focus streak</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setFocusActive(!focusActive)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1.5 transition-all ${
              focusActive ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse' : 'bg-white/5 text-zinc-300 border-white/10'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{focusActive ? 'DEEP FOCUS (24:12)' : 'START POMODORO'}</span>
          </button>
        </div>
      </div>

      {/* Personal KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SparklinePrimitive label="Sprint Velocity" value="48 Story Pts" delta="+12%" isPositive={true} recipe={recipe} />
        <SparklinePrimitive label="Code Commits" value="24 commits" delta="+8" isPositive={true} recipe={recipe} />
        <SparklinePrimitive label="Focus Time" value="5.8 hrs" delta="+45 min" isPositive={true} recipe={recipe} />
        <SparklinePrimitive label="PR Review Speed" value="42 min" delta="-15 min" isPositive={true} recipe={recipe} />
      </div>

      {/* Workspace Grid: Tasks + Heatmap + Output Line */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Interactive Tasks */}
        <div className={`p-4 rounded-xl border ${recipe.borderClass} ${recipe.cardClass} flex flex-col justify-between`}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className={`text-sm font-semibold ${recipe.textPrimary}`}>Today's Action Items</h4>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${recipe.badgeClass}`}>
                {tasks.filter((t) => t.done).length}/{tasks.length} Done
              </span>
            </div>
            <div className="space-y-2.5">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`p-2.5 rounded-lg border transition-all cursor-pointer flex items-center gap-3 ${
                    task.done
                      ? 'bg-white/5 border-white/10 line-through text-zinc-500'
                      : 'bg-white/10 border-white/15 text-white hover:border-sky-400/40'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-sm border flex items-center justify-center ${
                      task.done ? 'bg-emerald-500 border-emerald-400' : 'border-zinc-400'
                    }`}
                  >
                    {task.done && <CheckSquare className="w-3 h-3 text-white" />}
                  </div>
                  <span className="text-xs font-medium">{task.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
            <span className={recipe.textMuted}>Daily Streak</span>
            <span className="text-amber-400 font-bold flex items-center gap-1 font-mono">
              <Flame className="w-3.5 h-3.5" /> 14 Days Active
            </span>
          </div>
        </div>

        {/* Center & Right Column: Chart + Heatmap */}
        <div className="lg:col-span-2 space-y-6">
          <LineChartPrimitive recipe={recipe} title="Weekly Focus & Flow Time (Hours)" unit="h" height={190} />
          <HeatmapPrimitive recipe={recipe} title="Commit & Activity Distribution Matrix" />
        </div>
      </div>
    </div>
  );
}
