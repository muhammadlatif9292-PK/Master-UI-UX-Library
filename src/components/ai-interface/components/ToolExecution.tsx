/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StyleRecipe, ToolCallItem } from '../types';
import { Wrench, Terminal, ChevronDown, ChevronRight, CheckCircle2, AlertTriangle, Clock, Copy, Check } from 'lucide-react';

interface ToolExecutionProps {
  key?: React.Key;
  recipe: StyleRecipe;
  tool?: ToolCallItem;
}

export function ToolExecution({
  recipe,
  tool = {
    id: 'call_9921_web_search',
    name: 'web_search',
    arguments: {
      query: 'Gemini 2.5 Flash Live API multimodal streaming websocket spec',
      domain: 'ai.google.dev',
      freshness: '2026-latest',
    },
    status: 'completed',
    durationMs: 342,
    output: {
      status: 200,
      total_results: 4,
      sources: [
        {
          title: 'Google GenAI SDK Live API Realtime Audio / Video Session Guide',
          url: 'https://ai.google.dev/gemini-api/docs/live-api',
          relevance: 0.98,
        },
        {
          title: 'Bi-directional WebSocket streaming with Gemini 2.5 Flash',
          url: 'https://cloud.google.com/vertex-ai/docs/generative-ai/multimodal/live-stream',
          relevance: 0.94,
        },
      ],
    },
  },
}: ToolExecutionProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'output' | 'arguments'>('output');
  const [copied, setCopied] = useState(false);

  const isCompleted = tool.status === 'completed';
  const isRunning = tool.status === 'running' || tool.status === 'invoked';
  const isFailed = tool.status === 'failed';

  const copyData = () => {
    navigator.clipboard.writeText(
      JSON.stringify(activeTab === 'output' ? tool.output : tool.arguments, null, 2)
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`rounded-xl border overflow-hidden transition-all ${recipe.borderClass} ${recipe.cardClass}`}>
      {/* Header Bar */}
      <div className="p-3 bg-black/40 flex items-center justify-between gap-3 text-xs">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2.5 min-w-0 text-left cursor-pointer hover:opacity-80"
        >
          <div
            className={`p-1.5 rounded-lg border ${
              isCompleted
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : isRunning
                ? 'bg-amber-500/10 text-amber-300 border-amber-500/30 animate-pulse'
                : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-white">tool_call:</span>
              <span className="font-mono text-sky-400 font-semibold">{tool.name}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded uppercase ${
                  isCompleted
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    : isRunning
                    ? 'bg-amber-950 text-amber-300 border border-amber-800 animate-pulse'
                    : 'bg-rose-950 text-rose-400 border border-rose-800'
                }`}
              >
                {tool.status}
              </span>
            </div>
          </div>
        </button>

        <div className="flex items-center gap-3 font-mono text-[11px] text-zinc-400">
          {tool.durationMs && (
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-zinc-500" />
              <span>{tool.durationMs}ms</span>
            </div>
          )}
          <button onClick={() => setIsOpen(!isOpen)} className="text-zinc-400 hover:text-white">
            {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expanded Payload & Args */}
      {isOpen && (
        <div className="p-3 border-t border-white/5 space-y-3 font-mono text-xs">
          {/* Sub Tab Switcher */}
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('output')}
                className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                  activeTab === 'output'
                    ? 'bg-white/10 text-white font-bold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Output Payload ({tool.output ? Object.keys(tool.output).length : 0} keys)
              </button>
              <button
                onClick={() => setActiveTab('arguments')}
                className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                  activeTab === 'arguments'
                    ? 'bg-white/10 text-white font-bold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Input Arguments
              </button>
            </div>

            <button
              onClick={copyData}
              className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-white"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied' : 'Copy JSON'}</span>
            </button>
          </div>

          {/* JSON Tree View */}
          <pre className="p-3 rounded-lg bg-black/80 border border-white/10 text-emerald-300 overflow-x-auto text-[11px] leading-relaxed max-h-48">
            {JSON.stringify(activeTab === 'output' ? tool.output : tool.arguments, null, 2)}
          </pre>

          <div className="flex items-center justify-between text-[10px] text-zinc-500">
            <span>Call ID: {tool.id}</span>
            <span>Security Sandbox: Level 3 Isolation</span>
          </div>
        </div>
      )}
    </div>
  );
}
