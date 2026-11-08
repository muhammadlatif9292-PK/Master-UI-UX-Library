/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  WorkflowProvider,
  useWorkflow,
  WORKFLOW_STYLES,
  WorkflowStyle,
  WorkflowCanvas,
} from '../../design-system/workflow';

import {
  Workflow,
  Sparkles,
  Layers,
  Magnet,
  Zap,
  Bot,
  SlidersHorizontal,
  Play,
  Maximize2,
  HelpCircle,
  Terminal,
  Grid,
  Map,
  Keyboard,
  ShieldAlert,
} from 'lucide-react';

const WorkflowCatalogLabContent: React.FC = () => {
  const {
    style,
    setStyle,
    styleConfig,
    runGraph,
    isExecuting,
    nodes,
    connections,
    magneticSnapping,
    setMagneticSnapping,
    setCommandPaletteOpen,
    autoLayout,
    fitView,
  } = useWorkflow();

  const [activeTab, setActiveTab] = useState<'canvas' | 'components' | 'styles' | 'shortcuts'>('canvas');

  const presets = Object.values(WORKFLOW_STYLES);

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 p-4 md:p-6 space-y-6 select-none font-sans">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl text-cyan-400">
                <Workflow className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white flex items-center gap-3">
                  Workflow / Node Interface Catalog Lab
                </h1>
                <p className="text-xs md:text-sm text-slate-400 mt-0.5">
                  15 Specialized Node Components • 11 Visual Styles • Magnetic Snapping • Animated DAG Execution
                </p>
              </div>
            </div>
          </div>

          {/* Quick Metrics & Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="px-3 py-1.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs font-mono text-slate-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Nodes: <strong className="text-cyan-400">{nodes.length}</strong></span>
              <span>Wires: <strong className="text-purple-400">{connections.length}</strong></span>
            </div>

            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700/80 rounded-xl text-xs font-bold text-slate-100 flex items-center gap-2 shadow-lg transition-all"
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Command Palette</span>
              <kbd className="text-[10px] font-mono bg-slate-950 px-1.5 py-0.5 rounded text-slate-400 border border-slate-800">⌘K</kbd>
            </button>

            <button
              onClick={runGraph}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-xl transition-all ${
                isExecuting
                  ? 'bg-amber-500 text-slate-950 animate-pulse'
                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
              }`}
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{isExecuting ? 'Executing Flow...' : 'Execute DAG Flow'}</span>
            </button>
          </div>
        </div>

        {/* Visual Styles Quick Ribbon (11 Styles) */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[11px] font-mono text-slate-500 uppercase font-bold pr-2 flex-shrink-0 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            Style Theme:
          </span>
          {presets.map((p) => (
            <button
              key={p.id}
              onClick={() => setStyle(p.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all flex-shrink-0 flex items-center gap-1.5 border ${
                style === p.id
                  ? 'bg-cyan-950 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.3)]'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <span>{p.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Interactive View Tabs */}
      <div className="flex border-b border-slate-800 text-xs font-bold text-slate-400 gap-6">
        <button
          onClick={() => setActiveTab('canvas')}
          className={`pb-3 border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'canvas' ? 'border-cyan-400 text-cyan-300' : 'border-transparent hover:text-slate-200'
          }`}
        >
          <Workflow className="w-4 h-4" />
          <span>Interactive Node Canvas</span>
        </button>
        <button
          onClick={() => setActiveTab('components')}
          className={`pb-3 border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'components' ? 'border-cyan-400 text-cyan-300' : 'border-transparent hover:text-slate-200'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>15 Component Specs</span>
        </button>
        <button
          onClick={() => setActiveTab('styles')}
          className={`pb-3 border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'styles' ? 'border-cyan-400 text-cyan-300' : 'border-transparent hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>11 Visual Style Matrices</span>
        </button>
        <button
          onClick={() => setActiveTab('shortcuts')}
          className={`pb-3 border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'shortcuts' ? 'border-cyan-400 text-cyan-300' : 'border-transparent hover:text-slate-200'
          }`}
        >
          <Keyboard className="w-4 h-4" />
          <span>Keyboard & Accessibility</span>
        </button>
      </div>

      {/* View Content */}
      {activeTab === 'canvas' && (
        <div className="space-y-4">
          {/* Active Canvas Frame */}
          <div className="rounded-3xl border border-slate-800 overflow-hidden shadow-2xl relative bg-slate-950">
            <WorkflowCanvas />
          </div>
        </div>
      )}

      {activeTab === 'components' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Node Container', desc: 'Canvas node container with collapse, execution state glow, error callouts.', icon: Workflow },
            { title: 'Node Header', desc: 'Header bar with icons, title, token usage badge, and context menu.', icon: Bot },
            { title: 'Input Port', desc: 'Magnetically snappable connection target with type color coding.', icon: Magnet },
            { title: 'Output Port', desc: 'Source output port for wire dragging and data payload output.', icon: Zap },
            { title: 'Connection Cables', desc: 'Interactive Bezier/Orthogonal wires with animated flow particles.', icon: Layers },
            { title: 'Canvas Minimap', desc: 'Interactive thumbnail overview map with viewport frustum box.', icon: Map },
            { title: 'Node Inspector', desc: 'Side drawer for inspecting node properties, parameters, and logs.', icon: SlidersHorizontal },
            { title: 'Command Palette', desc: 'Cmd+K quick search launcher to add nodes and execute commands.', icon: Sparkles },
            { title: 'Node Toolbar', desc: 'Floating controls for zoom, fit view, auto-layout, and style themes.', icon: Grid },
            { title: 'Selection Box', desc: 'Marquee drag box for selecting multiple nodes simultaneously.', icon: Maximize2 },
            { title: 'Drag Handles', desc: 'Grip handle for node canvas positioning and wire creation.', icon: Layers },
            { title: 'Grouping Frame', desc: 'Collapsible bounding box frame wrapping child nodes into clusters.', icon: Layers },
            { title: 'Timeline Scrubber', desc: 'Step-by-step playback timeline scrubber with speed toggles.', icon: Play },
            { title: 'Execution Engine', desc: 'DAG runner simulating node state transitions and particle flows.', icon: Terminal },
            { title: 'Error Marker', desc: 'Diagnostic callout for failing nodes with error codes and retry.', icon: ShieldAlert },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-2 hover:border-slate-700 transition-all">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                  <Icon className="w-4 h-4" />
                  <span>{item.title}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'styles' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {presets.map((p) => (
            <div
              key={p.id}
              onClick={() => setStyle(p.id)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                style === p.id
                  ? 'bg-slate-900 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.2)]'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-slate-100">{p.name}</span>
                <span className="text-[10px] font-mono bg-slate-950 px-2 py-0.5 rounded text-cyan-400 uppercase">
                  {p.id}
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'shortcuts' && (
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4 max-w-2xl">
          <h3 className="text-sm font-bold text-cyan-400 uppercase font-mono tracking-wider">Keyboard Shortcuts & Accessibility</h3>
          <div className="space-y-2 text-xs font-mono text-slate-300">
            <div className="flex justify-between p-2 bg-slate-950 rounded border border-slate-800">
              <span>Open Command Palette</span>
              <kbd className="text-cyan-400 font-bold">Cmd / Ctrl + K</kbd>
            </div>
            <div className="flex justify-between p-2 bg-slate-950 rounded border border-slate-800">
              <span>Delete Selected Nodes / Wires</span>
              <kbd className="text-rose-400 font-bold">Delete / Backspace</kbd>
            </div>
            <div className="flex justify-between p-2 bg-slate-950 rounded border border-slate-800">
              <span>Select All Nodes</span>
              <kbd className="text-purple-400 font-bold">Cmd / Ctrl + A</kbd>
            </div>
            <div className="flex justify-between p-2 bg-slate-950 rounded border border-slate-800">
              <span>Run / Pause Execution</span>
              <kbd className="text-emerald-400 font-bold">Spacebar</kbd>
            </div>
            <div className="flex justify-between p-2 bg-slate-950 rounded border border-slate-800">
              <span>Marquee Multi-Select Box</span>
              <kbd className="text-amber-400 font-bold">Shift + Drag Canvas</kbd>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const WorkflowCatalogLab: React.FC = () => {
  return (
    <WorkflowProvider>
      <WorkflowCatalogLabContent />
    </WorkflowProvider>
  );
};
