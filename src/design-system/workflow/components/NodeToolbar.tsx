/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useWorkflow } from '../WorkflowContext';
import { WORKFLOW_STYLES } from '../styles';
import { WorkflowStyle, WireRouteType } from '../types';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Grid,
  Magnet,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Palette,
  Spline,
  Download,
  Trash2,
  SlidersHorizontal,
  Map,
  Sparkles,
  Layers,
} from 'lucide-react';

export const NodeToolbar: React.FC = () => {
  const {
    zoom,
    setZoom,
    fitView,
    autoLayout,
    runGraph,
    pauseGraph,
    resetExecution,
    isExecuting,
    snapToGrid,
    setSnapToGrid,
    magneticSnapping,
    setMagneticSnapping,
    style,
    setStyle,
    routeType,
    setRouteType,
    setCommandPaletteOpen,
    showMinimap,
    setShowMinimap,
    showInspector,
    setShowInspector,
    exportGraphJSON,
    clearAll,
  } = useWorkflow();

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-slate-900/95 border border-slate-700/80 rounded-2xl shadow-2xl p-1.5 flex items-center gap-1.5 text-slate-200 select-none backdrop-blur-xl">
      {/* Run / Pause Controls */}
      <button
        onClick={isExecuting ? pauseGraph : runGraph}
        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md ${
          isExecuting
            ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 animate-pulse'
            : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
        }`}
      >
        {isExecuting ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
        <span>{isExecuting ? 'Pause' : 'Run Graph'}</span>
      </button>

      <button
        onClick={resetExecution}
        className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded-lg"
        title="Reset Execution State"
      >
        <RotateCcw className="w-4 h-4" />
      </button>

      <div className="w-px h-5 bg-slate-800 my-auto" />

      {/* Add Node Launcher */}
      <button
        onClick={() => setCommandPaletteOpen(true)}
        className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700/80 rounded-xl text-xs font-semibold text-slate-100 flex items-center gap-1.5"
      >
        <Plus className="w-3.5 h-3.5 text-cyan-400" />
        <span>Add Node</span>
        <kbd className="text-[9px] font-mono bg-slate-950 px-1 py-0.2 rounded border border-slate-800 text-slate-400">⌘K</kbd>
      </button>

      {/* Auto Layout */}
      <button
        onClick={autoLayout}
        className="p-1.5 hover:bg-slate-800 text-slate-300 rounded-lg flex items-center gap-1 text-xs"
        title="Auto-Align DAG Layout"
      >
        <Sparkles className="w-4 h-4 text-purple-400" />
      </button>

      <div className="w-px h-5 bg-slate-800 my-auto" />

      {/* Zoom Controls */}
      <div className="flex items-center gap-0.5 bg-slate-950/60 rounded-xl p-0.5 border border-slate-800">
        <button
          onClick={() => setZoom(z => Math.max(0.4, z - 0.1))}
          className="p-1 hover:bg-slate-800 rounded text-slate-300"
          title="Zoom Out"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
        <span className="text-[10px] font-mono w-10 text-center text-cyan-300">{Math.round(zoom * 100)}%</span>
        <button
          onClick={() => setZoom(z => Math.min(2.0, z + 0.1))}
          className="p-1 hover:bg-slate-800 rounded text-slate-300"
          title="Zoom In"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={fitView}
          className="p-1 hover:bg-slate-800 rounded text-slate-300"
          title="Fit View"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="w-px h-5 bg-slate-800 my-auto" />

      {/* Snap & Magnetic Toggles */}
      <button
        onClick={() => setSnapToGrid(!snapToGrid)}
        className={`p-1.5 rounded-lg border transition-colors ${
          snapToGrid ? 'bg-cyan-950 border-cyan-700 text-cyan-300' : 'bg-slate-800 border-slate-700 text-slate-500'
        }`}
        title="Toggle Grid Snap"
      >
        <Grid className="w-4 h-4" />
      </button>

      <button
        onClick={() => setMagneticSnapping(!magneticSnapping)}
        className={`p-1.5 rounded-lg border transition-colors ${
          magneticSnapping ? 'bg-cyan-950 border-cyan-700 text-cyan-300' : 'bg-slate-800 border-slate-700 text-slate-500'
        }`}
        title="Toggle Magnetic Port Snapping"
      >
        <Magnet className="w-4 h-4" />
      </button>

      <div className="w-px h-5 bg-slate-800 my-auto" />

      {/* Wire Route Selector */}
      <div className="flex items-center gap-1">
        <Spline className="w-3.5 h-3.5 text-slate-400" />
        <select
          value={routeType}
          onChange={(e) => setRouteType(e.target.value as WireRouteType)}
          className="bg-slate-950 border border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-200 outline-none font-mono"
        >
          <option value="bezier">Bezier</option>
          <option value="orthogonal">Orthogonal</option>
          <option value="straight">Straight</option>
          <option value="step">Step</option>
        </select>
      </div>

      {/* Visual Style Selector (11 Styles) */}
      <div className="flex items-center gap-1">
        <Palette className="w-3.5 h-3.5 text-purple-400" />
        <select
          value={style}
          onChange={(e) => setStyle(e.target.value as WorkflowStyle)}
          className="bg-slate-950 border border-purple-800/80 rounded-lg px-2 py-1 text-xs text-purple-200 outline-none font-mono font-semibold"
        >
          {Object.values(WORKFLOW_STYLES).map(st => (
            <option key={st.id} value={st.id}>
              {st.name}
            </option>
          ))}
        </select>
      </div>

      <div className="w-px h-5 bg-slate-800 my-auto" />

      {/* Side View Toggles */}
      <button
        onClick={() => setShowMinimap(!showMinimap)}
        className={`p-1.5 rounded-lg border ${
          showMinimap ? 'bg-slate-800 border-slate-600 text-cyan-300' : 'bg-slate-950 border-slate-800 text-slate-500'
        }`}
        title="Toggle Minimap"
      >
        <Map className="w-4 h-4" />
      </button>

      <button
        onClick={() => setShowInspector(!showInspector)}
        className={`p-1.5 rounded-lg border ${
          showInspector ? 'bg-slate-800 border-slate-600 text-cyan-300' : 'bg-slate-950 border-slate-800 text-slate-500'
        }`}
        title="Toggle Inspector Drawer"
      >
        <SlidersHorizontal className="w-4 h-4" />
      </button>

      {/* Export & Clear */}
      <button
        onClick={() => {
          const json = exportGraphJSON();
          const blob = new Blob([json], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'workflow-graph.json';
          a.click();
        }}
        className="p-1.5 hover:bg-slate-800 text-slate-300 rounded-lg"
        title="Export Graph JSON"
      >
        <Download className="w-4 h-4" />
      </button>

      <button
        onClick={clearAll}
        className="p-1.5 hover:bg-rose-950 text-rose-400 rounded-lg"
        title="Clear All Nodes"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};
