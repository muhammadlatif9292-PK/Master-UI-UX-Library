/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useWorkflow } from '../WorkflowContext';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Clock,
  Gauge,
  Flame,
} from 'lucide-react';

export const TimelineControls: React.FC = () => {
  const {
    isExecuting,
    runGraph,
    pauseGraph,
    executionStep,
    stepForward,
    stepBack,
    playbackSpeed,
    setPlaybackSpeed,
    showTimeline,
  } = useWorkflow();

  if (!showTimeline) return null;

  const totalSteps = 5;

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 bg-slate-900/95 border border-slate-700/80 rounded-2xl shadow-2xl px-4 py-2.5 flex items-center gap-4 text-slate-200 backdrop-blur-xl select-none">
      {/* Time Control Buttons */}
      <div className="flex items-center gap-1">
        <button
          onClick={stepBack}
          className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-300 disabled:opacity-40"
          disabled={executionStep === 0}
          title="Step Back"
        >
          <SkipBack className="w-4 h-4" />
        </button>

        <button
          onClick={isExecuting ? pauseGraph : runGraph}
          className="p-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-xl font-bold transition-all"
        >
          {isExecuting ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
        </button>

        <button
          onClick={stepForward}
          className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-300 disabled:opacity-40"
          disabled={executionStep >= totalSteps}
          title="Step Forward"
        >
          <SkipForward className="w-4 h-4" />
        </button>
      </div>

      {/* Progress Timeline Scrubber */}
      <div className="flex flex-col gap-1 w-64">
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-cyan-400" />
            <span>EXECUTION TIMELINE</span>
          </span>
          <span className="text-cyan-300 font-bold">Step {executionStep} / {totalSteps}</span>
        </div>

        {/* Step Track */}
        <div className="relative w-full h-2 bg-slate-950 rounded-full border border-slate-800 overflow-hidden flex items-center">
          <div
            style={{ width: `${(executionStep / totalSteps) * 100}%` }}
            className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-300"
          />
        </div>
      </div>

      <div className="w-px h-6 bg-slate-800" />

      {/* Speed Multipliers */}
      <div className="flex items-center gap-1">
        <Gauge className="w-3.5 h-3.5 text-slate-400 mr-1" />
        {[0.5, 1, 2, 5].map((spd) => (
          <button
            key={spd}
            onClick={() => setPlaybackSpeed(spd)}
            className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-colors ${
              playbackSpeed === spd
                ? 'bg-cyan-500 text-slate-950'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {spd}x
          </button>
        ))}
      </div>
    </div>
  );
};
