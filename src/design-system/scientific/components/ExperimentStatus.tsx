/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useScientific } from '../ScientificContext';
import { Terminal, Play, Pause, RefreshCw, CheckCircle2, AlertOctagon, Cpu, ShieldAlert } from 'lucide-react';

export type ExperimentState =
  | 'IDLE'
  | 'CALIBRATING'
  | 'RUNNING'
  | 'SAMPLING'
  | 'PAUSED'
  | 'CONVERGED'
  | 'ANOMALY';

export const ExperimentStatus: React.FC = () => {
  const { familyConfig } = useScientific();

  const [state, setState] = useState<ExperimentState>('RUNNING');
  const [progress, setProgress] = useState(64.2); // %
  const [elapsed, setElapsed] = useState(142); // Seconds
  const [logs, setLogs] = useState<string[]>([
    '[18:40:02] INITIALIZING EXPERIMENT EXP-8802 (SUPERCONDUCTIVITY SYNTHESIS)',
    '[18:40:05] CALIBRATING OPTICAL SPECTROMETER... OK',
    '[18:40:12] LASER PUMP REACHED 100% OPERATIONAL POWER',
    '[18:41:20] SAMPLING PHASE AT T=77K (2,000 SAMPLES INGESTED)',
    '[18:42:04] DATA CONVERGENCE INDEX: 0.9984 (STABLE)',
  ]);

  // Simulate progress
  useEffect(() => {
    if (state !== 'RUNNING' && state !== 'SAMPLING') return;
    const interval = setInterval(() => {
      setElapsed((e) => e + 1);
      setProgress((p) => {
        const next = p + 0.5;
        if (next >= 100) {
          setState('CONVERGED');
          return 100;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [state]);

  const handleSetState = (newState: ExperimentState) => {
    setState(newState);
    const timestamp = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev, `[${timestamp}] STATE MACHINE TRANSITION: -> ${newState}`]);
  };

  const getStateBadge = () => {
    switch (state) {
      case 'RUNNING':
        return <span className="px-3 py-1 text-xs font-mono font-bold rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400 flex items-center gap-1.5"><RefreshCw className="w-3.5 h-3.5 animate-spin" /> RUNNING IN PROGRESS</span>;
      case 'CALIBRATING':
        return <span className="px-3 py-1 text-xs font-mono font-bold rounded bg-amber-500/20 text-amber-300 border border-amber-400 flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5 animate-pulse" /> CALIBRATING SENSORS</span>;
      case 'CONVERGED':
        return <span className="px-3 py-1 text-xs font-mono font-bold rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400 flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5" /> CONVERGED & COMPLETED</span>;
      case 'ANOMALY':
        return <span className="px-3 py-1 text-xs font-mono font-bold rounded bg-red-500/20 text-red-300 border border-red-400 flex items-center gap-1.5"><AlertOctagon className="w-3.5 h-3.5" /> ANOMALY DETECTED</span>;
      case 'PAUSED':
        return <span className="px-3 py-1 text-xs font-mono font-bold rounded bg-slate-500/20 text-slate-300 border border-slate-400 flex items-center gap-1.5"><Pause className="w-3.5 h-3.5" /> PAUSED BY OPERATOR</span>;
      default:
        return <span className="px-3 py-1 text-xs font-mono font-bold rounded bg-slate-800 text-slate-400">IDLE</span>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div>
          <h3 className={`text-lg font-bold ${familyConfig.textPrimary} flex items-center gap-2`}>
            <Terminal className={`w-5 h-5 ${familyConfig.accentText}`} />
            Experiment Lifecycle & State Machine Control
          </h3>
          <p className={`text-xs ${familyConfig.textSecondary}`}>
            Strict experiment run states, execution timers, progress bars, and realtime console event terminal.
          </p>
        </div>

        <div>{getStateBadge()}</div>
      </div>

      <div className={`p-5 rounded-xl ${familyConfig.cardClass} space-y-4`}>
        {/* Progress & Run Info Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <div>
            <span className="opacity-50 block">RUN ID: EXP-8802-ALPHA</span>
            <span className="text-base font-bold text-white">HIGH-PRESSURE SYNTHESIS RUN</span>
          </div>

          <div className="flex items-center gap-4">
            <div>
              <span className="opacity-50 block">ELAPSED TIME</span>
              <span className="text-cyan-400 font-bold">{elapsed}s</span>
            </div>
            <div>
              <span className="opacity-50 block">PROGRESS</span>
              <span className="text-emerald-400 font-bold">{progress.toFixed(1)}%</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-3 w-full bg-black/60 rounded-full border border-white/10 overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* State Machine Control Buttons */}
        <div className="pt-2">
          <span className="text-[10px] font-mono opacity-60 block mb-1.5">STATE TRANSITION TRIGGERS:</span>
          <div className="flex flex-wrap gap-1.5 font-mono text-xs">
            {(['IDLE', 'CALIBRATING', 'RUNNING', 'PAUSED', 'CONVERGED', 'ANOMALY'] as const).map((s) => (
              <button
                key={s}
                onClick={() => handleSetState(s)}
                className={`px-2.5 py-1 rounded transition-colors ${
                  state === s
                    ? 'bg-cyan-500 text-black font-bold'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Log Terminal Window */}
        <div className="p-3 rounded-lg bg-black/80 border border-white/10 font-mono text-[11px] text-slate-300 space-y-1 h-28 overflow-y-auto">
          <div className="text-cyan-400 font-bold pb-1 mb-1 border-b border-white/10 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5" /> SYSTEM RUN LOG TERMINAL
          </div>
          {logs.map((log, idx) => (
            <div key={idx} className="leading-tight">
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
