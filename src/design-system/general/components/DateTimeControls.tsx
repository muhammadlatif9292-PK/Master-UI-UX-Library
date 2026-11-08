/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useGeneral } from '../GeneralContext';
import {
  Calendar as CalendarIcon,
  Clock,
  Globe,
  ChevronLeft,
  ChevronRight,
  Check,
  Sparkles,
} from 'lucide-react';

export const DateTimeControls: React.FC = () => {
  const { recipeConfig, stateMode } = useGeneral();
  const [selectedDay, setSelectedDay] = useState<number>(28);
  const [currentMonth, setCurrentMonth] = useState('August 2026');
  const [selectedPreset, setSelectedPreset] = useState<string>('today');
  const [timeHour, setTimeHour] = useState('14');
  const [timeMin, setTimeMin] = useState('30');
  const [timezone, setTimezone] = useState('UTC');

  const presets = [
    { id: 'today', label: 'Today' },
    { id: '7d', label: 'Last 7 Days' },
    { id: '30d', label: 'Last 30 Days' },
    { id: 'mtd', label: 'Month to Date' },
    { id: 'custom', label: 'Custom Window' },
  ];

  // Calendar days grid generator for August (31 days starting on Saturday)
  const daysInMonth = 31;
  const startOffset = 6; // starts on Saturday

  return (
    <div className={`rounded-3xl border ${recipeConfig.cardBg} ${recipeConfig.border} ${recipeConfig.fontFamily} shadow-2xl p-6 space-y-6 select-none max-w-2xl`}>
      {/* Top Header & Presets */}
      <div className="space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-black/40 border border-white/10 text-indigo-400">
              <CalendarIcon className="w-4 h-4" />
            </div>
            <div>
              <h4 className={`font-bold text-sm md:text-base ${recipeConfig.textPrimary}`}>
                Temporal & Range Controls
              </h4>
              <p className={`text-xs ${recipeConfig.textSecondary}`}>
                Select date window and synchronized UTC execution timestamps
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 bg-black/40 px-2.5 py-1 rounded-xl border border-white/5 text-xs font-mono">
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="bg-transparent text-slate-300 outline-none cursor-pointer"
            >
              <option value="UTC">UTC (Universal)</option>
              <option value="EST">EST (UTC-5)</option>
              <option value="PST">PST (UTC-8)</option>
              <option value="CET">CET (UTC+1)</option>
              <option value="JST">JST (UTC+9)</option>
            </select>
          </div>
        </div>

        {/* Preset Chips */}
        <div className="flex flex-wrap gap-1.5">
          {presets.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPreset(p.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                selectedPreset === p.id
                  ? `${recipeConfig.accentBg} shadow-md`
                  : 'bg-black/30 text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Month Calendar & Time Picker */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {/* Calendar View */}
        <div className="space-y-3 p-4 rounded-2xl bg-black/30 border border-white/5">
          <div className="flex items-center justify-between pb-2">
            <h5 className={`font-bold text-xs ${recipeConfig.textPrimary}`}>{currentMonth}</h5>
            <div className="flex items-center gap-1">
              <button className="p-1 text-slate-400 hover:text-white rounded-lg">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="p-1 text-slate-400 hover:text-white rounded-lg">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Weekday Labels */}
          <div className="grid grid-cols-7 text-center font-mono text-[10px] uppercase text-slate-500 font-bold">
            <span>Su</span>
            <span>Mo</span>
            <span>Tu</span>
            <span>We</span>
            <span>Th</span>
            <span>Fr</span>
            <span>Sa</span>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center font-mono text-xs">
            {/* Empty slots for offset */}
            {Array.from({ length: startOffset }).map((_, idx) => (
              <div key={`offset-${idx}`} className="p-2 opacity-10">
                {26 + idx}
              </div>
            ))}

            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const day = idx + 1;
              const isSelected = selectedDay === day;

              return (
                <button
                  key={`day-${day}`}
                  onClick={() => setSelectedDay(day)}
                  className={`p-2 rounded-xl transition-all font-bold ${
                    isSelected
                      ? `${recipeConfig.accentBg} shadow-md scale-105`
                      : 'hover:bg-white/5 text-slate-300'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Spinner & Output Telemetry */}
        <div className="space-y-4 flex flex-col justify-between">
          <div className="p-4 rounded-2xl bg-black/30 border border-white/5 space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-white/5">
              <Clock className="w-4 h-4 text-indigo-400" />
              <span className={`text-xs font-mono font-bold uppercase ${recipeConfig.textPrimary}`}>
                Time Target
              </span>
            </div>

            <div className="flex items-center justify-center gap-3 py-2">
              <input
                type="number"
                min="0"
                max="23"
                value={timeHour}
                onChange={(e) => setTimeHour(e.target.value.padStart(2, '0'))}
                className={`w-16 p-3 text-center rounded-2xl text-xl font-mono font-extrabold border ${recipeConfig.inputBg} outline-none`}
              />
              <span className="text-2xl font-mono font-bold text-slate-500">:</span>
              <input
                type="number"
                min="0"
                max="59"
                value={timeMin}
                onChange={(e) => setTimeMin(e.target.value.padStart(2, '0'))}
                className={`w-16 p-3 text-center rounded-2xl text-xl font-mono font-extrabold border ${recipeConfig.inputBg} outline-none`}
              />
            </div>
          </div>

          {/* Formatted Output Capsule */}
          <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-800/60 font-mono text-xs space-y-1">
            <div className="text-[10px] text-indigo-300 font-bold uppercase">Evaluated Temporal Timestamp</div>
            <div className="text-white font-extrabold text-sm">
              2026-08-{String(selectedDay).padStart(2, '0')}T{timeHour}:{timeMin}:00 {timezone}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
