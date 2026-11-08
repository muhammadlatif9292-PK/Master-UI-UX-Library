/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { VisualRecipeStyle } from '../types';
import { LineChartPrimitive } from '../data-components/LineChartPrimitive';
import { MeterPrimitive } from '../data-components/MeterPrimitive';
import { GaugeMeterPrimitive } from '../data-components/GaugeMeterPrimitive';
import { LiveGraphPrimitive } from '../data-components/LiveGraphPrimitive';
import { TelemetryStreamPrimitive } from '../data-components/TelemetryStreamPrimitive';
import { TimelineChartPrimitive } from '../data-components/TimelineChartPrimitive';
import { Shield, AlertOctagon, Radio, Lock, Activity, Server } from 'lucide-react';

export function CommandCenterLayout({ recipe }: { recipe: VisualRecipeStyle }) {
  const [defcon, setDefcon] = useState<'GREEN' | 'YELLOW' | 'RED'>('GREEN');
  const [emergencyLock, setEmergencyLock] = useState(false);

  return (
    <div className="space-y-4">
      {/* 24/7 Operations Header Bar */}
      <div className={`p-4 rounded-xl border ${recipe.borderClass} ${recipe.cardClass} flex flex-wrap items-center justify-between gap-4`}>
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
          <div>
            <h3 className={`text-base font-bold font-mono tracking-wider ${recipe.textPrimary}`}>
              GLOBAL OPERATIONS COMMAND CENTER (SEC-01)
            </h3>
            <p className={`text-xs ${recipe.textMuted}`}>UTC 20:25:10 | 18 Data Centers Online | 0 Critical Alarms</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* DEFCON Switcher */}
          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/10 text-xs font-mono">
            <span className="text-[10px] text-zinc-400 px-1">SECURITY:</span>
            {(['GREEN', 'YELLOW', 'RED'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setDefcon(lvl)}
                className={`px-2 py-0.5 rounded-sm font-bold transition-all ${
                  defcon === lvl
                    ? lvl === 'GREEN'
                      ? 'bg-emerald-500 text-white'
                      : lvl === 'YELLOW'
                      ? 'bg-amber-500 text-black'
                      : 'bg-rose-500 text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          {/* Emergency Lock */}
          <button
            onClick={() => setEmergencyLock(!emergencyLock)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
              emergencyLock
                ? 'bg-rose-600 text-white border-rose-400 shadow-[0_0_15px_rgba(225,29,72,0.5)]'
                : 'bg-white/5 text-zinc-300 border-white/10 hover:border-white/20'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            {emergencyLock ? 'CIRCUIT ISOLATED' : 'ISOLATE BUS'}
          </button>
        </div>
      </div>

      {/* Main Command Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left Column: Live Radar and Oscilloscope */}
        <div className="space-y-4">
          <LiveGraphPrimitive recipe={recipe} title="Ingress Packet Velocity" height={190} />
          <GaugeMeterPrimitive recipe={recipe} value={78.5} title="Main Reactor Turbine" size={175} />
        </div>

        {/* Center Column: Big Multi-Series Graph & Telemetry Table */}
        <div className="space-y-4">
          <LineChartPrimitive
            recipe={recipe}
            title="Global Spine Bandwidth (Tb/s)"
            series1Label="North America"
            series2Label="Trans-Pacific"
            height={190}
          />
          <TelemetryStreamPrimitive recipe={recipe} title="High-Speed Node Telemetry" />
        </div>

        {/* Right Column: Audio VU Meter and Event Audit Horizon */}
        <div className="space-y-4">
          <MeterPrimitive recipe={recipe} title="Interconnect Decibel Levels" />
          <TimelineChartPrimitive recipe={recipe} title="Critical Incident Trail" />
        </div>
      </div>
    </div>
  );
}
