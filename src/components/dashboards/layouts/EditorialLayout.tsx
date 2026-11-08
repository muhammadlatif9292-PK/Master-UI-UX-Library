/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { VisualRecipeStyle } from '../types';
import { VISUAL_RECIPES } from '../recipes';
import { LineChartPrimitive } from '../data-components/LineChartPrimitive';
import { BarChartPrimitive } from '../data-components/BarChartPrimitive';
import { TimelineChartPrimitive } from '../data-components/TimelineChartPrimitive';
import { SparklinePrimitive } from '../data-components/SparklinePrimitive';
import { BookOpen, TrendingUp, Quote } from 'lucide-react';

export function EditorialLayout({ recipe = VISUAL_RECIPES['editorial'] }: { recipe?: VisualRecipeStyle }) {
  const editorialRecipe = VISUAL_RECIPES['editorial'];

  return (
    <div className="space-y-6 bg-stone-950 p-6 md:p-8 rounded-2xl border border-stone-800 text-stone-200">
      {/* Editorial Headline Header */}
      <div className="border-b-2 border-stone-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-serif text-amber-500 uppercase tracking-widest mb-1">
          <BookOpen className="w-3.5 h-3.5" />
          <span>The Global Macroeconomics & Compute Quarterly</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-stone-100 leading-tight">
          The Great GPU Reallocation: How Sovereign AI Infrastructure Is Reshaping Energy Grids
        </h1>
        <p className="text-sm md:text-base text-stone-400 font-sans mt-2 max-w-3xl leading-relaxed">
          An empirical investigation into distributed data center thermal dissipation, localized power constraints, and the shifting calculus of multi-gigawatt sovereign cluster deployments across three continents.
        </p>
      </div>

      {/* 2-Column Article Layout: Narrative & Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Main Charts with Editorial Captions */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <LineChartPrimitive
              recipe={editorialRecipe}
              title="Fig 1.1: Megawatt Ingress vs. Token Output Efficiency"
              series1Label="Generation Yield"
              series2Label="Thermal Dissipation"
              unit="MW"
              height={230}
            />
            <p className="text-xs text-stone-400 font-sans mt-2 italic">
              Source: Global Energy Research Lab. Data normalized across 24 enterprise facilities over 180 operational cycles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BarChartPrimitive
              recipe={editorialRecipe}
              title="Fig 1.2: Capital Outlay by Tier"
              unit="B$"
            />
            <div className="p-4 rounded-xl border border-stone-800 bg-stone-900 flex flex-col justify-between">
              <Quote className="w-6 h-6 text-amber-500/40" />
              <blockquote className="text-sm font-serif italic text-stone-300 my-2 leading-relaxed">
                “We are witnessing an unprecedented convergence where computational bandwidth is constrained not by silicon design, but by transformer substation availability.”
              </blockquote>
              <div className="text-xs font-sans text-stone-400">— Dr. Elaine Vance, Director of Systems Infrastructure</div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Key Takeaways and Milestones */}
        <div className="space-y-6">
          <div className="p-4 rounded-xl border border-stone-800 bg-stone-900/60">
            <h4 className="font-serif font-bold text-stone-100 text-sm mb-3">Key Empirical Takeaways</h4>
            <ul className="space-y-2.5 text-xs text-stone-300 leading-relaxed list-disc list-inside">
              <li>High-voltage direct current (HVDC) transmission reduces line losses by 14.2% across remote desert data parks.</li>
              <li>Liquid cooling immersion tanks demonstrate 2.1x longevity gains on solder interconnect reliability.</li>
              <li>Peak power demand shifts by up to 6 hours when scheduling non-urgent model fine-tuning jobs.</li>
            </ul>
          </div>

          <TimelineChartPrimitive recipe={editorialRecipe} title="Chronology of Power Agreements" />
        </div>
      </div>
    </div>
  );
}
