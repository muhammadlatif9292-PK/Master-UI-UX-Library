/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useWorkflow } from '../WorkflowContext';
import {
  Search,
  X,
  Bot,
  FileText,
  Sliders,
  Workflow,
  Terminal,
  Play,
  Grid,
  Trash2,
  Download,
  Plus,
  Sparkles,
} from 'lucide-react';

export const CommandPalette: React.FC = () => {
  const {
    isCommandPaletteOpen,
    setCommandPaletteOpen,
    addNode,
    runGraph,
    autoLayout,
    fitView,
    clearAll,
    exportGraphJSON,
  } = useWorkflow();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!isCommandPaletteOpen) return null;

  const catalogTemplates = [
    // Nodes
    { type: 'node', id: 'tmpl-prompt', title: 'Input Prompt Stream', category: 'Input' as const, desc: 'Live text stream or user input string.' },
    { type: 'node', id: 'tmpl-vector', title: 'Pinecone Vector Store', category: 'Input' as const, desc: 'Vector similarity search & document retrieval.' },
    { type: 'node', id: 'tmpl-gemini', title: 'Gemini 1.5 Pro Reasoner', category: 'AI & LLM' as const, desc: 'Multimodal LLM reasoning & function calling.' },
    { type: 'node', id: 'tmpl-guardrail', title: 'Safety & Policy Evaluator', category: 'Logic' as const, desc: 'Content safety & policy compliance gate.' },
    { type: 'node', id: 'tmpl-code', title: 'Python Code Sandbox', category: 'Transform' as const, desc: 'Isolated script execution node.' },
    { type: 'node', id: 'tmpl-image', title: 'Vision & Image Filter', category: 'Transform' as const, desc: 'Image resizing, OCR, or bounding box detection.' },
    { type: 'node', id: 'tmpl-markdown', title: 'Markdown Renderer', category: 'Output' as const, desc: 'Formatted report generator & HTML sink.' },

    // Commands
    { type: 'cmd', id: 'cmd-run', title: 'Run Graph Execution', category: 'Canvas Command' as const, desc: 'Execute DAG node pipeline.', action: runGraph },
    { type: 'cmd', id: 'cmd-align', title: 'Auto-Align DAG Layout', category: 'Canvas Command' as const, desc: 'Topological node arrangement.', action: autoLayout },
    { type: 'cmd', id: 'cmd-fit', title: 'Fit View to Canvas', category: 'Canvas Command' as const, desc: 'Recenter canvas view.', action: fitView },
    { type: 'cmd', id: 'cmd-clear', title: 'Clear Canvas Nodes', category: 'Canvas Command' as const, desc: 'Remove all nodes and wires.', action: clearAll },
  ];

  const filtered = catalogTemplates.filter(
    t => t.title.toLowerCase().includes(query.toLowerCase()) || t.desc.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (item: typeof catalogTemplates[0]) => {
    if (item.type === 'cmd' && item.action) {
      item.action();
    } else if (item.type === 'node') {
      addNode({
        title: item.title,
        category: item.category as any,
        position: { x: 300, y: 200 },
      });
    }
    setCommandPaletteOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-start justify-center pt-24 px-4 select-none">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col text-slate-100">
        {/* Search Bar Header */}
        <div className="flex items-center px-4 py-3 border-b border-slate-800 bg-slate-950/60">
          <Search className="w-5 h-5 text-cyan-400 mr-3" />
          <input
            type="text"
            autoFocus
            placeholder="Search nodes to add or canvas commands... (Cmd+K)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 outline-none font-sans"
          />
          <button
            onClick={() => setCommandPaletteOpen(false)}
            className="p-1 text-slate-400 hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Catalog Items List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1">
          {filtered.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => handleSelect(item)}
              onMouseEnter={() => setSelectedIndex(idx)}
              className={`p-3 rounded-xl flex items-center justify-between cursor-pointer transition-colors ${
                idx === selectedIndex ? 'bg-slate-800 border border-slate-700/80 text-white' : 'hover:bg-slate-800/50 text-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400">
                  {item.type === 'cmd' ? <Sparkles className="w-4 h-4 text-purple-400" /> : <Plus className="w-4 h-4 text-cyan-400" />}
                </div>
                <div>
                  <div className="font-semibold text-xs text-slate-100">{item.title}</div>
                  <div className="text-[10px] text-slate-400">{item.desc}</div>
                </div>
              </div>

              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-400 uppercase">
                {item.category}
              </span>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="p-8 text-center text-slate-500 text-xs">
              No nodes or commands matching "{query}".
            </div>
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="p-2.5 bg-slate-950/80 border-t border-slate-800 text-[10px] font-mono text-slate-500 flex justify-between px-4">
          <span>Navigate: ↑↓ | Select: Enter</span>
          <span>Close: ESC</span>
        </div>
      </div>
    </div>
  );
};
