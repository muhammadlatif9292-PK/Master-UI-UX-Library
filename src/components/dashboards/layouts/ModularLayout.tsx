/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { VisualRecipeStyle } from '../types';
import { LineChartPrimitive } from '../data-components/LineChartPrimitive';
import { BarChartPrimitive } from '../data-components/BarChartPrimitive';
import { RadialChartPrimitive } from '../data-components/RadialChartPrimitive';
import { GaugeMeterPrimitive } from '../data-components/GaugeMeterPrimitive';
import { LiveGraphPrimitive } from '../data-components/LiveGraphPrimitive';
import { SparklinePrimitive } from '../data-components/SparklinePrimitive';
import { LayoutGrid, Move, Eye, EyeOff, Plus, RotateCcw } from 'lucide-react';

interface WidgetConfig {
  id: string;
  title: string;
  type: 'line' | 'bar' | 'radial' | 'gauge' | 'live' | 'sparkline';
  visible: boolean;
  colSpan: 1 | 2 | 3;
}

export function ModularLayout({ recipe }: { recipe: VisualRecipeStyle }) {
  const [widgets, setWidgets] = useState<WidgetConfig[]>([
    { id: 'w1', title: 'Main Telemetry Line', type: 'line', visible: true, colSpan: 2 },
    { id: 'w2', title: 'Real-time Signal Live', type: 'live', visible: true, colSpan: 1 },
    { id: 'w3', title: 'Turbine Pressure Gauge', type: 'gauge', visible: true, colSpan: 1 },
    { id: 'w4', title: 'Cluster Resource Allocation', type: 'bar', visible: true, colSpan: 1 },
    { id: 'w5', title: 'Neural Convergence Radial', type: 'radial', visible: true, colSpan: 1 },
  ]);

  const toggleVisibility = (id: string) => {
    setWidgets(widgets.map((w) => (w.id === id ? { ...w, visible: !w.visible } : w)));
  };

  const toggleSpan = (id: string) => {
    setWidgets(
      widgets.map((w) =>
        w.id === id ? { ...w, colSpan: w.colSpan === 1 ? 2 : w.colSpan === 2 ? 3 : 1 } : w
      )
    );
  };

  const resetLayout = () => {
    setWidgets([
      { id: 'w1', title: 'Main Telemetry Line', type: 'line', visible: true, colSpan: 2 },
      { id: 'w2', title: 'Real-time Signal Live', type: 'live', visible: true, colSpan: 1 },
      { id: 'w3', title: 'Turbine Pressure Gauge', type: 'gauge', visible: true, colSpan: 1 },
      { id: 'w4', title: 'Cluster Resource Allocation', type: 'bar', visible: true, colSpan: 1 },
      { id: 'w5', title: 'Neural Convergence Radial', type: 'radial', visible: true, colSpan: 1 },
    ]);
  };

  return (
    <div className="space-y-4">
      {/* Modular Customizer Bar */}
      <div className={`p-4 rounded-xl border ${recipe.borderClass} ${recipe.cardClass} flex flex-wrap items-center justify-between gap-4`}>
        <div className="flex items-center gap-2">
          <LayoutGrid className="w-5 h-5 text-sky-400" />
          <div>
            <h3 className={`text-sm font-bold ${recipe.textPrimary}`}>Modular Dynamic Workspace</h3>
            <p className={`text-xs ${recipe.textMuted}`}>Toggle widget visibility and resize grid column spans dynamically</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {widgets.map((w) => (
            <button
              key={w.id}
              onClick={() => toggleVisibility(w.id)}
              className={`px-2.5 py-1 rounded-lg border text-xs flex items-center gap-1.5 transition-all ${
                w.visible
                  ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                  : 'bg-white/5 text-zinc-500 border-white/10 opacity-60'
              }`}
            >
              {w.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
              <span>{w.title.split(' ')[0]}</span>
            </button>
          ))}
          <button
            onClick={resetLayout}
            className="p-1.5 rounded-lg border border-white/10 text-zinc-400 hover:text-white bg-white/5"
            title="Reset Modular Layout"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Dynamic 3-Column Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {widgets.filter((w) => w.visible).map((w) => {
          let colClass = 'col-span-1';
          if (w.colSpan === 2) colClass = 'col-span-1 md:col-span-2 lg:col-span-2';
          if (w.colSpan === 3) colClass = 'col-span-1 md:col-span-2 lg:col-span-3';

          return (
            <div key={w.id} className={`${colClass} relative group transition-all duration-300`}>
              {/* Span size toggle pill in header */}
              <div className="absolute top-3 right-12 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => toggleSpan(w.id)}
                  className="px-2 py-0.5 rounded-sm bg-black/70 border border-white/20 text-[10px] font-mono text-zinc-300 hover:text-white"
                >
                  Span: {w.colSpan}x
                </button>
              </div>

              {w.type === 'line' && <LineChartPrimitive recipe={recipe} title={w.title} height={210} />}
              {w.type === 'live' && <LiveGraphPrimitive recipe={recipe} title={w.title} height={210} />}
              {w.type === 'gauge' && <GaugeMeterPrimitive recipe={recipe} title={w.title} size={180} />}
              {w.type === 'bar' && <BarChartPrimitive recipe={recipe} title={w.title} height={210} />}
              {w.type === 'radial' && <RadialChartPrimitive recipe={recipe} title={w.title} size={180} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
