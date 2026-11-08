/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useGeneral } from '../GeneralContext';
import {
  Filter,
  X,
  RotateCcw,
  SlidersHorizontal,
  CheckSquare,
  Square,
  Sparkles,
  ChevronDown,
} from 'lucide-react';

export const FilterSystem: React.FC = () => {
  const { recipeConfig, stateMode } = useGeneral();

  const [selectedHardware, setSelectedHardware] = useState<string[]>(['TPU v5e', 'H100 NVLink']);
  const [selectedLicenses, setSelectedLicenses] = useState<string[]>(['Apache 2.0']);
  const [maxLatency, setMaxLatency] = useState<number>(45); // ms
  const [minAccuracy, setMinAccuracy] = useState<number>(95); // %

  const hardwareOptions = ['TPU v5e', 'TPU v5p', 'H100 NVLink', 'A100 SXM4', 'B200 Blackwell'];
  const licenseOptions = ['Apache 2.0', 'MIT', 'OpenRAIL-M', 'Commercial Enterprise'];

  const toggleHardware = (hw: string) => {
    setSelectedHardware((prev) =>
      prev.includes(hw) ? prev.filter((item) => item !== hw) : [...prev, hw]
    );
  };

  const toggleLicense = (lic: string) => {
    setSelectedLicenses((prev) =>
      prev.includes(lic) ? prev.filter((item) => item !== lic) : [...prev, lic]
    );
  };

  const clearAllFilters = () => {
    setSelectedHardware([]);
    setSelectedLicenses([]);
    setMaxLatency(100);
    setMinAccuracy(80);
  };

  const totalActiveFilters =
    selectedHardware.length +
    selectedLicenses.length +
    (maxLatency < 100 ? 1 : 0) +
    (minAccuracy > 80 ? 1 : 0);

  return (
    <div className={`rounded-3xl border ${recipeConfig.cardBg} ${recipeConfig.border} ${recipeConfig.fontFamily} shadow-2xl p-6 space-y-6 select-none max-w-xl`}>
      {/* Top Header & Reset Action */}
      <div className="flex items-center justify-between pb-3 border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-black/40 border border-white/10 text-indigo-400">
            <Filter className="w-4 h-4" />
          </div>
          <div>
            <h3 className={`font-bold text-sm md:text-base ${recipeConfig.textPrimary}`}>
              Faceted Workspace Filters
            </h3>
            <span className={`text-xs ${recipeConfig.textSecondary}`}>
              {totalActiveFilters} criteria currently applied
            </span>
          </div>
        </div>

        {totalActiveFilters > 0 && (
          <button
            onClick={clearAllFilters}
            className="flex items-center gap-1 text-xs font-mono text-rose-400 hover:text-rose-300 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        )}
      </div>

      {/* Active Filter Badges */}
      {totalActiveFilters > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 p-3 rounded-2xl bg-black/40 border border-white/5">
          <span className={`text-[10px] font-mono uppercase ${recipeConfig.textSecondary} mr-1`}>Active:</span>
          {selectedHardware.map((hw) => (
            <span
              key={hw}
              onClick={() => toggleHardware(hw)}
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-mono border cursor-pointer ${recipeConfig.badgeBg} hover:opacity-80`}
            >
              <span>{hw}</span>
              <X className="w-3 h-3" />
            </span>
          ))}
          {selectedLicenses.map((lic) => (
            <span
              key={lic}
              onClick={() => toggleLicense(lic)}
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-mono border cursor-pointer ${recipeConfig.badgeBg} hover:opacity-80`}
            >
              <span>{lic}</span>
              <X className="w-3 h-3" />
            </span>
          ))}
          {maxLatency < 100 && (
            <span
              onClick={() => setMaxLatency(100)}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-mono border bg-amber-950/80 text-amber-300 border-amber-800 cursor-pointer"
            >
              <span>Max Latency: {maxLatency}ms</span>
              <X className="w-3 h-3" />
            </span>
          )}
        </div>
      )}

      {/* Filter Sections */}
      <div className="space-y-5 text-xs">
        {/* Hardware Acceleration Checklist */}
        <div className="space-y-2.5">
          <label className={`font-bold font-mono uppercase tracking-wider ${recipeConfig.textSecondary} block`}>
            Target Accelerator Fabric
          </label>
          <div className="grid grid-cols-2 gap-2">
            {hardwareOptions.map((hw) => {
              const isChecked = selectedHardware.includes(hw);
              return (
                <div
                  key={hw}
                  onClick={() => toggleHardware(hw)}
                  className={`p-2.5 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${
                    isChecked
                      ? 'border-indigo-500/80 bg-indigo-500/10 text-white'
                      : 'border-white/5 bg-black/30 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {isChecked ? (
                    <CheckSquare className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-600 flex-shrink-0" />
                  )}
                  <span className="font-semibold truncate">{hw}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sliders: Max Latency & Min Accuracy */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-black/30 border border-white/5">
          {/* Latency Range */}
          <div className="space-y-2">
            <div className="flex justify-between font-mono">
              <span className={recipeConfig.textSecondary}>Max RTT Latency</span>
              <span className={`font-bold ${recipeConfig.accentText}`}>{maxLatency} ms</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={maxLatency}
              onChange={(e) => setMaxLatency(Number(e.target.value))}
              className="w-full accent-indigo-500 h-1.5 bg-black/60 rounded-lg cursor-pointer"
            />
          </div>

          {/* Min Accuracy */}
          <div className="space-y-2">
            <div className="flex justify-between font-mono">
              <span className={recipeConfig.textSecondary}>Min Accuracy Score</span>
              <span className={`font-bold ${recipeConfig.accentText}`}>{minAccuracy}%</span>
            </div>
            <input
              type="range"
              min="80"
              max="99"
              value={minAccuracy}
              onChange={(e) => setMinAccuracy(Number(e.target.value))}
              className="w-full accent-indigo-500 h-1.5 bg-black/60 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* License Selector */}
        <div className="space-y-2.5">
          <label className={`font-bold font-mono uppercase tracking-wider ${recipeConfig.textSecondary} block`}>
            Software License Tier
          </label>
          <div className="flex flex-wrap gap-2">
            {licenseOptions.map((lic) => {
              const isChecked = selectedLicenses.includes(lic);
              return (
                <button
                  key={lic}
                  onClick={() => toggleLicense(lic)}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-mono transition-all ${
                    isChecked
                      ? `${recipeConfig.accentBg} shadow-md`
                      : 'border-white/5 bg-black/30 text-slate-400 hover:text-white'
                  }`}
                >
                  {lic}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
