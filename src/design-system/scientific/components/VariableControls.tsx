/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useScientific } from '../ScientificContext';
import { SlidersHorizontal, Lock, Unlock, Plus, Minus, ArrowUpDown } from 'lucide-react';

export const VariableControls: React.FC = () => {
  const { familyConfig } = useScientific();

  const [paramVal, setParamVal] = useState(1.4205);
  const [isLocked, setIsLocked] = useState(false);
  const [useLogScale, setUseLogScale] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<'Tesla' | 'Gauss' | 'mTesla'>('Tesla');

  const minLimit = 0.0001;
  const maxLimit = 10.0;

  const handleStep = (step: number) => {
    if (isLocked) return;
    setParamVal((prev) => Math.min(maxLimit, Math.max(minLimit, Number((prev + step).toFixed(4)))));
  };

  const getConvertedVal = () => {
    if (selectedUnit === 'Gauss') return paramVal * 10000;
    if (selectedUnit === 'mTesla') return paramVal * 1000;
    return paramVal;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div>
          <h3 className={`text-lg font-bold ${familyConfig.textPrimary} flex items-center gap-2`}>
            <SlidersHorizontal className={`w-5 h-5 ${familyConfig.accentText}`} />
            Precision Variable Parameter Controls
          </h3>
          <p className={`text-xs ${familyConfig.textSecondary}`}>
            Multi-step incrementors, logarithmic scale switches, boundary range locks, and unit converters.
          </p>
        </div>

        <button
          onClick={() => setIsLocked(!isLocked)}
          className={`px-3 py-1.5 rounded text-xs font-mono font-bold flex items-center gap-1.5 border ${
            isLocked
              ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
              : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
          }`}
        >
          {isLocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
          {isLocked ? 'BOUNDARY LOCKED' : 'EDITABLE'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Fine Stepper Box */}
        <div className={`p-5 rounded-xl ${familyConfig.cardClass} space-y-4`}>
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="font-bold opacity-80">MAGNETIC FIELD DENSITY [B0]</span>
            <span className="text-cyan-400">RANGE: {minLimit} - {maxLimit} T</span>
          </div>

          <div className="p-4 rounded-lg bg-black/50 border border-white/10 flex items-baseline justify-between font-mono">
            <div>
              <div className="text-[10px] opacity-50 mb-1">EFFECTIVE VALUE</div>
              <div className="text-3xl font-bold text-white">
                {getConvertedVal().toFixed(4)}{' '}
                <span className="text-sm text-cyan-400">{selectedUnit}</span>
              </div>
            </div>

            {/* Unit Dropdown */}
            <div className="flex gap-1 bg-black/60 p-1 rounded border border-white/10 text-xs">
              {(['Tesla', 'mTesla', 'Gauss'] as const).map((u) => (
                <button
                  key={u}
                  onClick={() => setSelectedUnit(u)}
                  className={`px-2 py-0.5 rounded font-bold ${
                    selectedUnit === u ? 'bg-cyan-500/30 text-cyan-300' : 'text-white/40'
                  }`}
                >
                  {u}
                </button>
              ))}
            </div>
          </div>

          {/* Stepper Buttons */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono opacity-60 block">PRECISION INCREMENT STEPPERS</span>
            <div className="grid grid-cols-3 gap-2 font-mono text-xs">
              <button
                disabled={isLocked}
                onClick={() => handleStep(-0.001)}
                className="p-2 rounded bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center gap-1 disabled:opacity-30"
              >
                <Minus className="w-3 h-3" /> 0.001
              </button>
              <button
                disabled={isLocked}
                onClick={() => handleStep(-0.01)}
                className="p-2 rounded bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center gap-1 disabled:opacity-30"
              >
                <Minus className="w-3 h-3" /> 0.01
              </button>
              <button
                disabled={isLocked}
                onClick={() => handleStep(-0.1)}
                className="p-2 rounded bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center gap-1 disabled:opacity-30"
              >
                <Minus className="w-3 h-3" /> 0.1
              </button>

              <button
                disabled={isLocked}
                onClick={() => handleStep(0.001)}
                className="p-2 rounded bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center gap-1 disabled:opacity-30"
              >
                <Plus className="w-3 h-3" /> 0.001
              </button>
              <button
                disabled={isLocked}
                onClick={() => handleStep(0.01)}
                className="p-2 rounded bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center gap-1 disabled:opacity-30"
              >
                <Plus className="w-3 h-3" /> 0.01
              </button>
              <button
                disabled={isLocked}
                onClick={() => handleStep(0.1)}
                className="p-2 rounded bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center gap-1 disabled:opacity-30"
              >
                <Plus className="w-3 h-3" /> 0.1
              </button>
            </div>
          </div>
        </div>

        {/* Logarithmic Scaling Card */}
        <div className={`p-5 rounded-xl ${familyConfig.cardClass} space-y-4`}>
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="font-bold opacity-80">LOGARITHMIC SCALE RESPONSE</span>
            <button
              onClick={() => setUseLogScale(!useLogScale)}
              className={`px-2 py-1 rounded text-[10px] font-bold border ${
                useLogScale ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400' : 'bg-white/5 border-white/10'
              }`}
            >
              LOG10 MODE: {useLogScale ? 'ON' : 'OFF'}
            </button>
          </div>

          <div className="p-4 rounded-lg bg-black/50 border border-white/10 font-mono text-xs space-y-2">
            <div className="flex justify-between">
              <span className="opacity-60">RAW MAGNITUDE:</span>
              <span className="text-white font-bold">{paramVal}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-60">LOG10 DECADES:</span>
              <span className="text-cyan-400 font-bold">{Math.log10(paramVal).toFixed(4)}</span>
            </div>
          </div>

          <div className="pt-2 border-t border-white/10 text-[10px] font-mono opacity-50">
            Safety interlock limits parameter excursions to safe hardware tolerance boundaries.
          </div>
        </div>
      </div>
    </div>
  );
};
