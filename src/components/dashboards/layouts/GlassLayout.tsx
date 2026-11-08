/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { VisualRecipeStyle } from '../types';
import { VISUAL_RECIPES } from '../recipes';
import { LineChartPrimitive } from '../data-components/LineChartPrimitive';
import { RadialChartPrimitive } from '../data-components/RadialChartPrimitive';
import { AreaChartPrimitive } from '../data-components/AreaChartPrimitive';
import { SparklinePrimitive } from '../data-components/SparklinePrimitive';
import { ComparisonGraphPrimitive } from '../data-components/ComparisonGraphPrimitive';
import { Sparkles, Layers } from 'lucide-react';

export function GlassLayout({ recipe = VISUAL_RECIPES['glass-data'] }: { recipe?: VisualRecipeStyle }) {
  const glassRecipe = VISUAL_RECIPES['glass-data'];

  return (
    <div className="relative p-6 rounded-3xl bg-slate-950/80 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden">
      {/* Dynamic Background Glow Orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-6 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
            <Sparkles className="w-5 h-5 text-sky-300" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">Frosted Crystal Analytics</h2>
            <p className="text-xs text-slate-300">Specularity & backdrop refraction engine</p>
          </div>
        </div>
        <span className="text-xs px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium">
          Multi-Layer Acrylic
        </span>
      </div>

      {/* 3-Column Glass Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <LineChartPrimitive recipe={glassRecipe} title="Luminous Fluid Stream" height={220} />
        </div>
        <div className="md:col-span-1">
          <RadialChartPrimitive recipe={glassRecipe} title="Prism Convergence" size={190} />
        </div>
      </div>

      {/* Bottom Glass Row */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <AreaChartPrimitive recipe={glassRecipe} title="Atmospheric Attenuation" height={190} />
        <ComparisonGraphPrimitive recipe={glassRecipe} title="Optical Refraction Index" />
      </div>
    </div>
  );
}
