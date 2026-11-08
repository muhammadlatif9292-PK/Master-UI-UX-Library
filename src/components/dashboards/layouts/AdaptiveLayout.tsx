/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { VisualRecipeStyle } from '../types';
import { LineChartPrimitive } from '../data-components/LineChartPrimitive';
import { BarChartPrimitive } from '../data-components/BarChartPrimitive';
import { GaugeMeterPrimitive } from '../data-components/GaugeMeterPrimitive';
import { SparklinePrimitive } from '../data-components/SparklinePrimitive';
import { Smartphone, Tablet, Monitor, Tv } from 'lucide-react';

export function AdaptiveLayout({ recipe }: { recipe: VisualRecipeStyle }) {
  const [deviceMode, setDeviceMode] = useState<'mobile' | 'tablet' | 'desktop' | 'ultrawide'>('desktop');

  const getContainerWidth = () => {
    switch (deviceMode) {
      case 'mobile':
        return 'max-w-[390px]';
      case 'tablet':
        return 'max-w-[768px]';
      case 'desktop':
        return 'max-w-[1140px]';
      case 'ultrawide':
        return 'max-w-full';
    }
  };

  return (
    <div className="space-y-4">
      {/* Device Breakpoint Simulator Header */}
      <div className={`p-4 rounded-xl border ${recipe.borderClass} ${recipe.cardClass} flex flex-wrap items-center justify-between gap-4`}>
        <div>
          <h3 className={`text-sm font-bold ${recipe.textPrimary}`}>Adaptive Breakpoint Simulator</h3>
          <p className={`text-xs ${recipe.textMuted}`}>Test fluid component reflow across viewport boundaries</p>
        </div>

        <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10 text-xs">
          <button
            onClick={() => setDeviceMode('mobile')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              deviceMode === 'mobile' ? 'bg-sky-500 text-white font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile (390px)</span>
          </button>
          <button
            onClick={() => setDeviceMode('tablet')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              deviceMode === 'tablet' ? 'bg-sky-500 text-white font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span>Tablet (768px)</span>
          </button>
          <button
            onClick={() => setDeviceMode('desktop')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              deviceMode === 'desktop' ? 'bg-sky-500 text-white font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop (1140px)</span>
          </button>
          <button
            onClick={() => setDeviceMode('ultrawide')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              deviceMode === 'ultrawide' ? 'bg-sky-500 text-white font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Tv className="w-3.5 h-3.5" />
            <span>Ultra-Wide</span>
          </button>
        </div>
      </div>

      {/* Simulated Device Frame Container */}
      <div className="flex justify-center p-4 bg-black/30 rounded-2xl border border-white/5 transition-all duration-500">
        <div className={`w-full ${getContainerWidth()} transition-all duration-500 space-y-4`}>
          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <SparklinePrimitive label="Fluid Traffic" value="84.2k" delta="+14%" isPositive={true} recipe={recipe} />
            <SparklinePrimitive label="Conversion Velocity" value="3.82%" delta="+0.4%" isPositive={true} recipe={recipe} />
            <SparklinePrimitive label="Bounce Ratio" value="18.9%" delta="-2.1%" isPositive={true} recipe={recipe} />
          </div>

          {/* Adaptive Charts */}
          <div className={`grid ${deviceMode === 'mobile' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'} gap-4`}>
            <LineChartPrimitive recipe={recipe} title="Reflow Trajectory Curve" height={200} />
            <BarChartPrimitive recipe={recipe} title="Adaptive Grid Density" height={200} />
          </div>

          <GaugeMeterPrimitive recipe={recipe} value={84} title="Fluid Breakpoint Gauge" size={170} />
        </div>
      </div>
    </div>
  );
}
