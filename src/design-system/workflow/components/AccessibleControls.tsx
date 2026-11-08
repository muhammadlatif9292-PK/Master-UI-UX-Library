/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useWorkflow } from '../WorkflowContext';
import { Keyboard, ArrowRight, Check, X, Disc } from 'lucide-react';

export const AccessibleControls: React.FC = () => {
  const {
    nodes,
    accessibleNavActive,
    setAccessibleNavActive,
    focusedNodeId,
    setFocusedNodeId,
    focusedPortId,
    setFocusedPortId,
    addConnection,
    selectNode,
  } = useWorkflow();

  const [selectedSourcePort, setSelectedSourcePort] = useState<{ nodeId: string; portId: string; name: string } | null>(null);
  const [announcement, setAnnouncement] = useState('Keyboard accessible workflow mode available.');

  if (!accessibleNavActive) {
    return (
      <button
        onClick={() => {
          setAccessibleNavActive(true);
          setAnnouncement('Keyboard navigation enabled. Use Tab or Arrow keys to browse nodes.');
        }}
        className="absolute top-4 right-4 z-30 px-3 py-1.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs font-medium text-slate-200 hover:text-white shadow-lg flex items-center gap-1.5 backdrop-blur-md"
        title="Enable Keyboard Nav & Screen Reader Mode"
      >
        <Keyboard className="w-3.5 h-3.5 text-cyan-400" />
        <span>Keyboard Mode</span>
      </button>
    );
  }

  const currentNode = nodes.find(n => n.id === focusedNodeId) || nodes[0];

  const handleConnectPort = (nodeId: string, portId: string, portName: string, isInput: boolean) => {
    if (!selectedSourcePort) {
      if (isInput) {
        setAnnouncement('Please select an Output port first before choosing an Input target.');
        return;
      }
      setSelectedSourcePort({ nodeId, portId, name: portName });
      setAnnouncement(`Selected source output port ${portName}. Now select a target input port to complete connection.`);
    } else {
      if (!isInput) {
        setAnnouncement('Target port must be an Input port.');
        return;
      }
      const success = addConnection(selectedSourcePort.nodeId, selectedSourcePort.portId, nodeId, portId);
      if (success) {
        setAnnouncement(`Successfully connected ${selectedSourcePort.name} to ${portName}.`);
      } else {
        setAnnouncement('Failed to connect ports. Verify ports are on different nodes.');
      }
      setSelectedSourcePort(null);
    }
  };

  return (
    <div className="absolute top-16 left-4 z-40 w-96 bg-slate-900/95 border-2 border-cyan-500/80 rounded-2xl shadow-2xl p-4 text-slate-100 backdrop-blur-2xl flex flex-col gap-3 select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Keyboard className="w-4 h-4 text-cyan-400" />
          <span className="font-bold text-xs uppercase font-mono tracking-wider text-cyan-300">
            ACCESSIBLE KEYBOARD NAVIGATION
          </span>
        </div>
        <button
          onClick={() => setAccessibleNavActive(false)}
          className="p-1 hover:bg-slate-800 rounded text-slate-400"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Screen Reader Live Region */}
      <div aria-live="polite" className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-xs text-cyan-200 font-mono">
        🔊 {announcement}
      </div>

      {/* Node Selector List */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-mono uppercase text-slate-400 font-bold block">1. Select Active Node</label>
        <select
          value={focusedNodeId || ''}
          onChange={(e) => {
            setFocusedNodeId(e.target.value);
            selectNode(e.target.value);
            const n = nodes.find(node => node.id === e.target.value);
            setAnnouncement(`Focused node: ${n?.title}. Has ${n?.inputs.length} inputs and ${n?.outputs.length} outputs.`);
          }}
          className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs font-semibold text-slate-100 outline-none focus:border-cyan-400"
        >
          {nodes.map(n => (
            <option key={n.id} value={n.id}>
              [{n.category}] {n.title} ({n.status})
            </option>
          ))}
        </select>
      </div>

      {/* Output & Input Ports keyboard selection */}
      {currentNode && (
        <div className="space-y-3 pt-2 border-t border-slate-800">
          {/* Outputs */}
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Outputs (Click to Pick Source)</span>
            {currentNode.outputs.map(p => (
              <button
                key={p.id}
                onClick={() => handleConnectPort(currentNode.id, p.id, p.name, false)}
                className={`w-full text-left p-2 rounded-lg border text-xs font-mono flex items-center justify-between ${
                  selectedSourcePort?.portId === p.id
                    ? 'bg-purple-950 border-purple-500 text-purple-200 font-bold'
                    : 'bg-slate-950/80 border-slate-800 text-slate-200 hover:bg-slate-800'
                }`}
              >
                <span>OUT: {p.name} ({p.type})</span>
                {selectedSourcePort?.portId === p.id ? <Check className="w-3.5 h-3.5 text-purple-400" /> : <ArrowRight className="w-3.5 h-3.5 text-slate-500" />}
              </button>
            ))}
          </div>

          {/* Inputs */}
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Inputs (Click to Complete Target)</span>
            {currentNode.inputs.map(p => (
              <button
                key={p.id}
                onClick={() => handleConnectPort(currentNode.id, p.id, p.name, true)}
                className="w-full text-left p-2 rounded-lg border border-slate-800 bg-slate-950/80 hover:bg-slate-800 text-slate-200 text-xs font-mono flex items-center justify-between"
              >
                <span>IN: {p.name} ({p.type})</span>
                <Disc className="w-3.5 h-3.5 text-cyan-400" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
