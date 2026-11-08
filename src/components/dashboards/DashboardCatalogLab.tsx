/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DashboardLayoutType, VisualRecipeType, DataComponentType } from './types';
import { VISUAL_RECIPES } from './recipes';

// Layouts
import { ClassicGridLayout } from './layouts/ClassicGridLayout';
import { BentoLayout } from './layouts/BentoLayout';
import { CommandCenterLayout } from './layouts/CommandCenterLayout';
import { SpatialLayout } from './layouts/SpatialLayout';
import { CinematicLayout } from './layouts/CinematicLayout';
import { GlassLayout } from './layouts/GlassLayout';
import { HudLayout } from './layouts/HudLayout';
import { EditorialLayout } from './layouts/EditorialLayout';
import { ModularLayout } from './layouts/ModularLayout';
import { AdaptiveLayout } from './layouts/AdaptiveLayout';
import { AiDashboardLayout } from './layouts/AiDashboardLayout';
import { SimulationLayout } from './layouts/SimulationLayout';
import { ScientificLayout } from './layouts/ScientificLayout';
import { PersonalWorkspaceLayout } from './layouts/PersonalWorkspaceLayout';
import { CanvasLayout } from './layouts/CanvasLayout';
import { FloatingLayout } from './layouts/FloatingLayout';
import { ThreeDLayout } from './layouts/ThreeDLayout';

// Data Components
import { LineChartPrimitive } from './data-components/LineChartPrimitive';
import { AreaChartPrimitive } from './data-components/AreaChartPrimitive';
import { BarChartPrimitive } from './data-components/BarChartPrimitive';
import { RadialChartPrimitive } from './data-components/RadialChartPrimitive';
import { GaugeMeterPrimitive } from './data-components/GaugeMeterPrimitive';
import { MeterPrimitive } from './data-components/MeterPrimitive';
import { ProgressPrimitive } from './data-components/ProgressPrimitive';
import { SparklinePrimitive } from './data-components/SparklinePrimitive';
import { HeatmapPrimitive } from './data-components/HeatmapPrimitive';
import { ScatterPlotPrimitive } from './data-components/ScatterPlotPrimitive';
import { WaveformPrimitive } from './data-components/WaveformPrimitive';
import { TimelineChartPrimitive } from './data-components/TimelineChartPrimitive';
import { TelemetryStreamPrimitive } from './data-components/TelemetryStreamPrimitive';
import { LiveGraphPrimitive } from './data-components/LiveGraphPrimitive';
import { ComparisonGraphPrimitive } from './data-components/ComparisonGraphPrimitive';

import {
  LayoutDashboard,
  Palette,
  Layers,
  Code2,
  Copy,
  Check,
  Sparkles,
  Sliders,
  Maximize2,
  Box,
  Eye,
  Terminal,
  Grid,
  Search,
} from 'lucide-react';

export function DashboardCatalogLab() {
  const [activeTab, setActiveTab] = useState<'layouts' | 'components' | 'recipes' | 'specs'>('layouts');
  const [selectedLayout, setSelectedLayout] = useState<DashboardLayoutType>('classic-grid');
  const [selectedRecipe, setSelectedRecipe] = useState<VisualRecipeType>('luminous-data');
  const [selectedComponent, setSelectedComponent] = useState<DataComponentType>('line');
  const [copiedCode, setCopiedCode] = useState(false);

  const recipe = VISUAL_RECIPES[selectedRecipe];

  const layoutList: { id: DashboardLayoutType; name: string; category: string; description: string }[] = [
    { id: 'classic-grid', name: 'Classic Grid', category: 'Standard', description: 'Symmetric multi-column metric tiles with balanced analytics flow.' },
    { id: 'bento', name: 'Bento Grid', category: 'Modern', description: 'Asymmetric multi-span card hierarchy with hero focus elements.' },
    { id: 'command-center', name: 'Command Center', category: 'Ops', description: '24/7 mission control ops room with emergency bus controls and telemetry.' },
    { id: 'spatial', name: 'Spatial', category: 'Immersive', description: 'Layered parallax canvas with Z-index elevation depth.' },
    { id: 'cinematic', name: 'Cinematic', category: 'Media', description: '21:9 ultra-wide dark backdrop with color-calibrated scopes.' },
    { id: 'glass', name: 'Glass Surface', category: 'Material', description: 'Frosted acrylic surfaces with specular light refraction.' },
    { id: 'hud', name: 'Tactical HUD', category: 'Sci-Fi', description: 'High-vis cyberpunk phosphors with crosshairs and corner brackets.' },
    { id: 'editorial', name: 'Editorial', category: 'Publishing', description: 'Data journalism article format with serif typography and narratives.' },
    { id: 'modular', name: 'Modular Workspace', category: 'Productivity', description: 'Customizable widget grid with dynamic span and visibility toggles.' },
    { id: 'adaptive', name: 'Adaptive Breakpoints', category: 'Responsive', description: 'Fluid reflow simulator across mobile, tablet, and ultrawide.' },
    { id: 'ai', name: 'AI Swarm Studio', category: 'Machine Learning', description: 'Gemini neural agent metrics, token velocity, and confidence rings.' },
    { id: 'simulation', name: 'Simulation Lab', category: 'Scientific', description: 'Monte Carlo physics engine with live parameter sliders and trajectories.' },
    { id: 'scientific', name: 'Scientific Lab', category: 'Scientific', description: 'Spectrometry interferometer with cryostat stats and Bragg scatter.' },
    { id: 'personal-workspace', name: 'Personal Workspace', category: 'Productivity', description: 'Engineer daily cockpit with sprint velocity, Pomodoro timer, and task items.' },
    { id: 'canvas', name: 'Infinite Canvas', category: 'Spatial', description: 'Zoomable, pannable unbounded node space with grid snapping.' },
    { id: 'floating', name: 'Floating PiP', category: 'Overlays', description: 'Picture-in-picture floating overlay widgets hovering above workspace.' },
    { id: '3d', name: '3D Perspective Matrix', category: 'Immersive', description: 'Isometric hardware-accelerated 3D tilt stage with extruded layers.' },
  ];

  const dataComponentList: { id: DataComponentType; name: string; type: string }[] = [
    { id: 'line', name: 'Line Chart', type: 'Vector Series' },
    { id: 'area', name: 'Area Chart', type: 'Volume Gradient' },
    { id: 'bar', name: 'Bar Chart', type: 'Categorical Matrix' },
    { id: 'radial', name: 'Radial Chart', type: 'Multi-Ring Convergence' },
    { id: 'gauge', name: 'Dial Gauge', type: 'Kinetic Dial' },
    { id: 'meter', name: 'VU Meter', type: 'Segmented Attenuation' },
    { id: 'progress', name: 'Progress Track', type: 'Pipeline Task Queue' },
    { id: 'sparkline', name: 'Micro Sparkline', type: 'Trend Delta Vector' },
    { id: 'heatmap', name: 'Activity Heatmap', type: '2D Coincidence Matrix' },
    { id: 'scatter', name: 'Scatter Plot', type: 'Cartesian Cluster' },
    { id: 'waveform', name: 'Acoustic Waveform', type: 'Spectral Harmonic Bar' },
    { id: 'timeline', name: 'Audit Timeline', type: 'Chronological Trail' },
    { id: 'telemetry', name: 'Telemetry Stream', type: 'UDP Packet Parser' },
    { id: 'live-graph', name: 'Live Oscilloscope', type: 'Real-Time Streaming' },
    { id: 'comparison-graph', name: 'A/B Comparison Graph', type: 'Benchmark Variance' },
  ];

  const copySnippet = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const getExportCode = () => {
    return `// ==========================================
// Dashboard Architecture: ${selectedLayout}
// Visual Recipe: ${recipe.name}
// Accessible, High-Contrast & High-Performance
// ==========================================

import React from 'react';
import { 
  LineChartPrimitive, 
  AreaChartPrimitive, 
  BarChartPrimitive,
  RadialChartPrimitive,
  GaugeMeterPrimitive,
  SparklinePrimitive 
} from '@/components/dashboards';

export function ProductionDashboard() {
  return (
    <div className="w-full min-h-screen ${recipe.containerClass} p-6 space-y-6">
      {/* Metric Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <SparklinePrimitive label="Active Ingress" value="4.82 TB" delta="+12.4%" />
        <SparklinePrimitive label="P99 Latency" value="14.2 ms" delta="-3.1 ms" />
      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <LineChartPrimitive title="Telemetry Ingress Stream" height={240} />
        </div>
        <div className="lg:col-span-1">
          <RadialChartPrimitive title="Cluster Health Rings" />
        </div>
      </div>
    </div>
  );
}`;
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Master Lab Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-zinc-950 border border-white/10 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-sky-500/20 border border-sky-500/40 shadow-[0_0_20px_rgba(56,189,248,0.25)]">
              <LayoutDashboard className="w-6 h-6 text-sky-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded-sm bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  17 LAYOUTS // 15 DATA COMPONENTS // 9 VISUAL RECIPES
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight mt-1">
                Dashboard & Data Visualization Catalog
              </h1>
              <p className="text-xs md:text-sm text-slate-300 mt-0.5">
                Accessible, high-contrast, zero-lag data visualization architectures and composable chart primitives.
              </p>
            </div>
          </div>

          {/* Navigation Mode Pill */}
          <div className="flex items-center gap-1 bg-black/50 p-1.5 rounded-xl border border-white/10 text-xs">
            <button
              onClick={() => setActiveTab('layouts')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'layouts' ? 'bg-sky-500 text-white font-bold shadow-md' : 'text-zinc-400 hover:text-white'
              }`}
            >
              17 Layouts
            </button>
            <button
              onClick={() => setActiveTab('components')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'components' ? 'bg-sky-500 text-white font-bold shadow-md' : 'text-zinc-400 hover:text-white'
              }`}
            >
              15 Data Components
            </button>
            <button
              onClick={() => setActiveTab('recipes')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'recipes' ? 'bg-sky-500 text-white font-bold shadow-md' : 'text-zinc-400 hover:text-white'
              }`}
            >
              9 Visual Recipes
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'specs' ? 'bg-sky-500 text-white font-bold shadow-md' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Code & Token Export
            </button>
          </div>
        </div>

        {/* Global Recipe Selector Ribbon */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-sky-400" />
            <span className="font-semibold text-white">Active Visual Recipe:</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {(Object.keys(VISUAL_RECIPES) as VisualRecipeType[]).map((recKey) => {
              const r = VISUAL_RECIPES[recKey];
              const isSelected = selectedRecipe === recKey;

              return (
                <button
                  key={recKey}
                  onClick={() => setSelectedRecipe(recKey)}
                  className={`px-2.5 py-1 rounded-lg border text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-sky-500/25 text-white border-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.3)] font-bold'
                      : 'bg-white/5 text-zinc-400 border-white/10 hover:border-white/20 hover:text-zinc-200'
                  }`}
                >
                  {r.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* TAB 1: 17 LAYOUTS */}
      {activeTab === 'layouts' && (
        <div className="space-y-6">
          {/* Layout Selector Chips */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
            <div className="text-xs font-semibold text-zinc-400 mb-2 uppercase tracking-wider">
              Select Architecture Layout (17 Types):
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-2">
              {layoutList.map((layout) => {
                const isSelected = selectedLayout === layout.id;

                return (
                  <button
                    key={layout.id}
                    onClick={() => setSelectedLayout(layout.id)}
                    className={`p-2 rounded-lg border text-left transition-all ${
                      isSelected
                        ? 'bg-sky-500/20 text-white border-sky-400 shadow-md font-bold'
                        : 'bg-black/30 text-zinc-400 border-white/5 hover:border-white/20 hover:text-zinc-200'
                    }`}
                  >
                    <div className="text-[11px] font-semibold truncate">{layout.name}</div>
                    <div className="text-[9px] text-zinc-500">{layout.category}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Layout Stage */}
          <div className={`p-6 rounded-2xl border ${recipe.borderClass} ${recipe.containerClass} shadow-2xl transition-all duration-300`}>
            {selectedLayout === 'classic-grid' && <ClassicGridLayout recipe={recipe} />}
            {selectedLayout === 'bento' && <BentoLayout recipe={recipe} />}
            {selectedLayout === 'command-center' && <CommandCenterLayout recipe={recipe} />}
            {selectedLayout === 'spatial' && <SpatialLayout recipe={recipe} />}
            {selectedLayout === 'cinematic' && <CinematicLayout recipe={recipe} />}
            {selectedLayout === 'glass' && <GlassLayout recipe={recipe} />}
            {selectedLayout === 'hud' && <HudLayout recipe={recipe} />}
            {selectedLayout === 'editorial' && <EditorialLayout recipe={recipe} />}
            {selectedLayout === 'modular' && <ModularLayout recipe={recipe} />}
            {selectedLayout === 'adaptive' && <AdaptiveLayout recipe={recipe} />}
            {selectedLayout === 'ai' && <AiDashboardLayout recipe={recipe} />}
            {selectedLayout === 'simulation' && <SimulationLayout recipe={recipe} />}
            {selectedLayout === 'scientific' && <ScientificLayout recipe={recipe} />}
            {selectedLayout === 'personal-workspace' && <PersonalWorkspaceLayout recipe={recipe} />}
            {selectedLayout === 'canvas' && <CanvasLayout recipe={recipe} />}
            {selectedLayout === 'floating' && <FloatingLayout recipe={recipe} />}
            {selectedLayout === '3d' && <ThreeDLayout recipe={recipe} />}
          </div>
        </div>
      )}

      {/* TAB 2: 15 DATA COMPONENTS */}
      {activeTab === 'components' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
            <div className="text-xs font-semibold text-zinc-400 mb-2 uppercase tracking-wider">
              Select Data Component (15 Primitives):
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {dataComponentList.map((comp) => {
                const isSelected = selectedComponent === comp.id;

                return (
                  <button
                    key={comp.id}
                    onClick={() => setSelectedComponent(comp.id)}
                    className={`p-2.5 rounded-lg border text-left transition-all ${
                      isSelected
                        ? 'bg-sky-500/20 text-white border-sky-400 shadow-md font-bold'
                        : 'bg-black/30 text-zinc-400 border-white/5 hover:border-white/20 hover:text-zinc-200'
                    }`}
                  >
                    <div className="text-xs font-semibold">{comp.name}</div>
                    <div className="text-[10px] text-zinc-500">{comp.type}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Component Live Inspector Box */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {selectedComponent === 'line' && <LineChartPrimitive recipe={recipe} />}
              {selectedComponent === 'area' && <AreaChartPrimitive recipe={recipe} />}
              {selectedComponent === 'bar' && <BarChartPrimitive recipe={recipe} />}
              {selectedComponent === 'radial' && <RadialChartPrimitive recipe={recipe} />}
              {selectedComponent === 'gauge' && <GaugeMeterPrimitive recipe={recipe} />}
              {selectedComponent === 'meter' && <MeterPrimitive recipe={recipe} />}
              {selectedComponent === 'progress' && <ProgressPrimitive recipe={recipe} />}
              {selectedComponent === 'sparkline' && <SparklinePrimitive recipe={recipe} />}
              {selectedComponent === 'heatmap' && <HeatmapPrimitive recipe={recipe} />}
              {selectedComponent === 'scatter' && <ScatterPlotPrimitive recipe={recipe} />}
              {selectedComponent === 'waveform' && <WaveformPrimitive recipe={recipe} />}
              {selectedComponent === 'timeline' && <TimelineChartPrimitive recipe={recipe} />}
              {selectedComponent === 'telemetry' && <TelemetryStreamPrimitive recipe={recipe} />}
              {selectedComponent === 'live-graph' && <LiveGraphPrimitive recipe={recipe} />}
              {selectedComponent === 'comparison-graph' && <ComparisonGraphPrimitive recipe={recipe} />}
            </div>

            {/* Component Metadata & Accessibility Panel */}
            <div className="p-5 rounded-xl border border-white/10 bg-slate-900/80 backdrop-blur-md space-y-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-sky-400 font-bold">ACCESSIBILITY & SPECS</span>
                <h3 className="text-base font-bold text-white mt-1">
                  {dataComponentList.find((c) => c.id === selectedComponent)?.name}
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Engineered with semantic SVG attributes, high-contrast palette tokens, and keyboard-navigable tooltips.
                </p>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-zinc-400">WCAG Contrast:</span>
                  <span className="text-emerald-400 font-bold font-mono">AAA Compliant (7:1+)</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-zinc-400">Rendering Engine:</span>
                  <span className="text-white font-mono">Vector SVG / GPU Raster</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-zinc-400">Screen Reader:</span>
                  <span className="text-sky-300 font-mono">role="region" + aria-label</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-zinc-400">Interactive Latency:</span>
                  <span className="text-emerald-400 font-mono font-bold">&lt; 1.2ms (Zero-Lag)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: 9 VISUAL RECIPES */}
      {activeTab === 'recipes' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(Object.keys(VISUAL_RECIPES) as VisualRecipeType[]).map((rKey) => {
              const rec = VISUAL_RECIPES[rKey];

              return (
                <div
                  key={rKey}
                  className={`p-5 rounded-2xl border ${rec.borderClass} ${rec.containerClass} space-y-4 shadow-xl cursor-pointer hover:scale-[1.02] transition-all`}
                  onClick={() => setSelectedRecipe(rKey)}
                >
                  <div className="flex items-center justify-between">
                    <h3 className={`text-base font-bold ${rec.textPrimary}`}>{rec.name}</h3>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${rec.badgeClass}`}>
                      {rec.id}
                    </span>
                  </div>
                  <p className={`text-xs ${rec.textSecondary} leading-relaxed`}>{rec.description}</p>

                  <div className="pt-2">
                    <SparklinePrimitive label="Sample Recipe Metric" value="94.2%" delta="+4.8%" isPositive={true} recipe={rec} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: CODE & TOKEN EXPORT */}
      {activeTab === 'specs' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl border border-white/10 bg-slate-950 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-sky-400" />
                <h3 className="text-base font-bold text-white">Full-Stack React / TypeScript Component Artifact</h3>
              </div>
              <button
                onClick={() => copySnippet(getExportCode())}
                className="px-3.5 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg transition-all"
              >
                {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedCode ? 'COPIED TO CLIPBOARD' : 'COPY TSX SNIPPET'}</span>
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-black/90 border border-white/10 text-xs font-mono text-sky-200 overflow-x-auto leading-relaxed max-h-[480px]">
              {getExportCode()}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
