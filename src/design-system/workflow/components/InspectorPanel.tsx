/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useWorkflow } from '../WorkflowContext';
import { PORT_TYPE_COLORS } from '../styles';
import {
  SlidersHorizontal,
  X,
  Bot,
  Terminal,
  Activity,
  OctagonAlert,
  CheckCircle2,
  Code,
  Trash2,
  Copy,
  AlertTriangle,
  Play,
  Sparkles,
  Layers,
} from 'lucide-react';

export const InspectorPanel: React.FC = () => {
  const {
    nodes,
    selectedNodeIds,
    updateNode,
    deleteNode,
    duplicateNode,
    toggleBreakpoint,
    showInspector,
    setShowInspector,
    logs,
  } = useWorkflow();

  const [activeTab, setActiveTab] = useState<'params' | 'ports' | 'logs' | 'json'>('params');

  if (!showInspector) return null;

  const selectedNode = nodes.find(n => selectedNodeIds.includes(n.id)) || nodes[0];

  return (
    <div className="absolute top-16 right-4 z-30 w-80 bg-slate-900/95 border border-slate-700/80 rounded-2xl shadow-2xl text-slate-100 backdrop-blur-xl flex flex-col max-h-[82vh] overflow-hidden select-none">
      {/* Inspector Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-950/60">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
          <span className="font-semibold text-xs tracking-wide uppercase font-mono">NODE INSPECTOR</span>
        </div>
        <button
          onClick={() => setShowInspector(false)}
          className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-slate-200"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {selectedNode ? (
        <>
          {/* Selected Node Header Summary */}
          <div className="p-4 bg-slate-950/40 border-b border-slate-800 space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <input
                  type="text"
                  value={selectedNode.title}
                  onChange={(e) => updateNode(selectedNode.id, { title: e.target.value })}
                  className="bg-transparent text-sm font-bold text-slate-100 hover:bg-slate-800/50 rounded px-1 -ml-1 border border-transparent focus:border-cyan-400 outline-none w-48"
                />
                <div className="text-[10px] font-mono text-slate-400 mt-0.5 flex items-center gap-2">
                  <span>ID: {selectedNode.id}</span>
                  <span className="bg-slate-800 px-1.5 py-0.2 rounded text-cyan-300">{selectedNode.category}</span>
                </div>
              </div>

              {/* Status Pill */}
              <div
                className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase flex items-center gap-1 ${
                  selectedNode.status === 'error'
                    ? 'bg-rose-950 text-rose-300 border border-rose-700'
                    : selectedNode.status === 'success'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                    : selectedNode.status === 'running'
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-700 animate-pulse'
                    : 'bg-slate-800 text-slate-300'
                }`}
              >
                {selectedNode.status === 'error' && <OctagonAlert className="w-3 h-3 text-rose-400" />}
                {selectedNode.status === 'success' && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                <span>{selectedNode.status}</span>
              </div>
            </div>

            {/* AI Token Usage / Latency */}
            <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-800/60">
              {selectedNode.executionTimeMs && (
                <div className="flex items-center gap-1">
                  <Activity className="w-3 h-3 text-cyan-400" />
                  <span>{selectedNode.executionTimeMs} ms</span>
                </div>
              )}
              {selectedNode.tokensUsed && (
                <div className="flex items-center gap-1 text-purple-300">
                  <Sparkles className="w-3 h-3 text-purple-400" />
                  <span>{selectedNode.tokensUsed} tokens</span>
                </div>
              )}
            </div>
          </div>

          {/* Diagnostic Error Banner if present */}
          {selectedNode.errorMessage && (
            <div className="p-3 bg-rose-950/80 border-b border-rose-800 text-xs text-rose-200 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-rose-300">
                <OctagonAlert className="w-4 h-4 text-rose-400" />
                <span>Diagnostic Exception ({selectedNode.errorCode})</span>
              </div>
              <p className="text-[11px] leading-relaxed text-rose-200">{selectedNode.errorMessage}</p>
              <button
                onClick={() => updateNode(selectedNode.id, { status: 'idle', errorMessage: undefined })}
                className="mt-1 px-2 py-0.5 bg-rose-900 hover:bg-rose-800 text-rose-100 rounded text-[10px] font-mono"
              >
                Clear Error & Retry
              </button>
            </div>
          )}

          {/* Sub-Tabs */}
          <div className="flex border-b border-slate-800 text-xs font-semibold text-slate-400 bg-slate-950/80">
            <button
              onClick={() => setActiveTab('params')}
              className={`flex-1 py-2 text-center border-b-2 ${
                activeTab === 'params' ? 'border-cyan-400 text-cyan-300' : 'border-transparent hover:text-slate-200'
              }`}
            >
              Parameters
            </button>
            <button
              onClick={() => setActiveTab('ports')}
              className={`flex-1 py-2 text-center border-b-2 ${
                activeTab === 'ports' ? 'border-cyan-400 text-cyan-300' : 'border-transparent hover:text-slate-200'
              }`}
            >
              Ports ({selectedNode.inputs.length + selectedNode.outputs.length})
            </button>
            <button
              onClick={() => setActiveTab('logs')}
              className={`flex-1 py-2 text-center border-b-2 ${
                activeTab === 'logs' ? 'border-cyan-400 text-cyan-300' : 'border-transparent hover:text-slate-200'
              }`}
            >
              Logs
            </button>
            <button
              onClick={() => setActiveTab('json')}
              className={`flex-1 py-2 text-center border-b-2 ${
                activeTab === 'json' ? 'border-cyan-400 text-cyan-300' : 'border-transparent hover:text-slate-200'
              }`}
            >
              JSON
            </button>
          </div>

          {/* Tab Content Body */}
          <div className="p-4 overflow-y-auto space-y-4 text-xs flex-1">
            {activeTab === 'params' && (
              <div className="space-y-3">
                <div className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider">
                  Configurable Variables
                </div>
                {Object.entries(selectedNode.parameters || {}).map(([key, value]) => (
                  <div key={key} className="space-y-1">
                    <label className="text-slate-300 font-mono text-[11px] block">{key}</label>
                    <input
                      type="text"
                      value={String(value)}
                      onChange={(e) => {
                        updateNode(selectedNode.id, {
                          parameters: { ...selectedNode.parameters, [key]: e.target.value },
                        });
                      }}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-100 font-mono text-xs focus:border-cyan-400 outline-none"
                    />
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'ports' && (
              <div className="space-y-3">
                {/* Inputs */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Inputs ({selectedNode.inputs.length})</div>
                  {selectedNode.inputs.map((p) => (
                    <div key={p.id} className="p-2 bg-slate-950/60 rounded-lg border border-slate-800 flex items-center justify-between">
                      <div className="font-semibold text-slate-200">{p.name}</div>
                      <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded uppercase border ${PORT_TYPE_COLORS[p.type]?.text} ${PORT_TYPE_COLORS[p.type]?.border}`}>
                        {p.type}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Outputs */}
                <div className="space-y-1.5 pt-2 border-t border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Outputs ({selectedNode.outputs.length})</div>
                  {selectedNode.outputs.map((p) => (
                    <div key={p.id} className="p-2 bg-slate-950/60 rounded-lg border border-slate-800 flex items-center justify-between">
                      <div className="font-semibold text-slate-200">{p.name}</div>
                      <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded uppercase border ${PORT_TYPE_COLORS[p.type]?.text} ${PORT_TYPE_COLORS[p.type]?.border}`}>
                        {p.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'logs' && (
              <div className="space-y-2 font-mono text-[11px] max-h-60 overflow-y-auto">
                {logs
                  .filter(l => l.nodeId === selectedNode.id || l.nodeId === 'engine' || l.nodeId === 'system')
                  .map(log => (
                    <div key={log.id} className="p-2 bg-slate-950 rounded border border-slate-800 text-slate-300 space-y-0.5">
                      <div className="flex items-center justify-between text-[9px] text-slate-500">
                        <span>{log.timestamp}</span>
                        <span className={log.level === 'error' ? 'text-rose-400 font-bold' : log.level === 'success' ? 'text-emerald-400' : 'text-cyan-400'}>
                          {log.level.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-[10px]">{log.message}</div>
                    </div>
                  ))}
              </div>
            )}

            {activeTab === 'json' && (
              <pre className="p-3 bg-slate-950 rounded-lg text-[10px] font-mono text-cyan-300 overflow-x-auto border border-slate-800 max-h-60">
                {JSON.stringify(selectedNode, null, 2)}
              </pre>
            )}
          </div>

          {/* Quick Actions Footer */}
          <div className="p-3 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between gap-2">
            <button
              onClick={() => toggleBreakpoint(selectedNode.id)}
              className={`px-2.5 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 ${
                selectedNode.hasBreakpoint
                  ? 'bg-rose-950 border-rose-700 text-rose-300'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              {selectedNode.hasBreakpoint ? 'BP Active' : 'Set BP'}
            </button>

            <button
              onClick={() => duplicateNode(selectedNode.id)}
              className="p-1.5 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 hover:bg-slate-700"
              title="Duplicate Node"
            >
              <Copy className="w-4 h-4" />
            </button>

            <button
              onClick={() => deleteNode(selectedNode.id)}
              className="p-1.5 bg-rose-950 border border-rose-800 rounded-lg text-rose-400 hover:bg-rose-900"
              title="Delete Node"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </>
      ) : (
        <div className="p-8 text-center text-slate-500 text-xs">
          Select a node on the canvas to inspect properties.
        </div>
      )}
    </div>
  );
};
