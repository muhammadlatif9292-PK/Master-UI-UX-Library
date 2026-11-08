/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  BrainCircuit,
  Sparkles,
  Send,
  Code2,
  Terminal,
  SlidersHorizontal,
  Bot,
  Copy,
  Check,
  RotateCw,
  Cpu,
  Layers,
  ChevronRight,
  Maximize2,
  FileCode,
  Paperclip,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import { PageStyleRecipe } from '../recipes';

interface Props {
  recipe: PageStyleRecipe;
}

export const AiWorkspacePageExperience: React.FC<Props> = ({ recipe }) => {
  const [model, setModel] = useState<'gemini-3.7-flash' | 'gemini-3.7-thinking' | 'quantum-agent-v4'>('gemini-3.7-flash');
  const [prompt, setPrompt] = useState('Synthesize a multi-agent orchestration architecture for real-time quantum telemetry stream filtering.');
  const [temperature, setTemperature] = useState(0.7);
  const [thinkingBudget, setThinkingBudget] = useState(8192);
  const [activeTab, setActiveTab] = useState<'chat' | 'artifacts' | 'reasoning' | 'config'>('chat');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const [messages, setMessages] = useState<
    { role: 'user' | 'assistant'; text: string; time: string; tokens?: number; thinkingTrace?: string[] }[]
  >([
    {
      role: 'user',
      text: 'Analyze the recent high-frequency tensor anomaly detected on Node Cluster Alpha and suggest mitigation steps.',
      time: '10:42 AM',
    },
    {
      role: 'assistant',
      text: 'Based on the telemetry logs from Node Cluster Alpha, the 1.24ms jitter corresponds to a cache line contention event in the unified memory allocator. Here is the recommended mitigation pipeline:',
      time: '10:43 AM',
      tokens: 412,
      thinkingTrace: [
        'Inspecting raw memory allocation metrics across 128 compute shards...',
        'Identified NUMA node latency spike on socket 0: 42.8ns -> 190.2ns.',
        'Synthesizing kernel memory lock alleviation patch...',
      ],
    },
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const userMsg = { role: 'user' as const, text: prompt, time: 'Just now' };
    setMessages((prev) => [...prev, userMsg]);
    setPrompt('');
    setIsGenerating(true);

    setTimeout(() => {
      setIsGenerating(false);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant' as const,
          text: 'Generated optimized multi-agent dispatch rule: Memory locks repartitioned with zero-copy ring buffers. All shards nominal.',
          time: 'Just now',
          tokens: 284,
          thinkingTrace: ['Validating shard isolation bounds...', 'Verified zero memory leakage.'],
        },
      ]);
    }, 1500);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(`// Quantum Dispatch Engine v4.2\nexport function dispatchTelemetryRingBuffer(shards: number) {\n  return shards.map(s => allocateZeroCopyLock(s));\n}`);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className={`w-full min-h-[850px] ${recipe.bodyBg} flex flex-col font-sans`}>
      {/* Top Header */}
      <header className={`px-6 py-4 border-b ${recipe.divider} ${recipe.headerBg} flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-20`}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className={`font-extrabold text-lg ${recipe.textPrimary}`}>
                AI Research & Multi-Agent Studio
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold">
                GEMINI 3.7 FLASH
              </span>
            </div>
            <p className={`text-xs ${recipe.textSecondary}`}>
              Multi-modal cognitive reasoning workspace with real-time thinking traces
            </p>
          </div>
        </div>

        {/* Model Selector & Parameters */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-black/40 px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-mono">
            <Bot className="w-3.5 h-3.5 text-indigo-400" />
            <select
              value={model}
              onChange={(e) => setModel(e.target.value as any)}
              className="bg-transparent text-xs text-slate-200 outline-none cursor-pointer"
            >
              <option value="gemini-3.7-flash" className="bg-slate-900">Gemini 3.7 Flash</option>
              <option value="gemini-3.7-thinking" className="bg-slate-900">Gemini 3.7 Thinking Mode</option>
              <option value="quantum-agent-v4" className="bg-slate-900">Quantum Agent v4.2</option>
            </select>
          </div>

          <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-slate-800 text-xs font-medium">
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-3 py-1 rounded-lg transition-all ${activeTab === 'chat' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400'}`}
            >
              Workspace
            </button>
            <button
              onClick={() => setActiveTab('config')}
              className={`px-3 py-1 rounded-lg transition-all ${activeTab === 'config' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400'}`}
            >
              Model Config
            </button>
          </div>
        </div>
      </header>

      {/* Main Studio Body: Split View (Chat + Thought Stream on Left, Artifact Canvas on Right) */}
      <div className="flex-1 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
        {/* Left Column: Interactive Chat & Reasoning (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          {/* Message Stream */}
          <div className={`flex-1 min-h-[420px] max-h-[550px] overflow-y-auto p-5 rounded-3xl border ${recipe.cardBorder} ${recipe.cardBg} backdrop-blur-md space-y-5 scrollbar-thin`}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col space-y-2 ${
                  msg.role === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500">
                  <span className="font-bold text-slate-400">
                    {msg.role === 'user' ? 'Principal Researcher' : 'Gemini Agent'}
                  </span>
                  <span>• {msg.time}</span>
                  {msg.tokens && <span className="text-indigo-400 font-bold">({msg.tokens} tokens)</span>}
                </div>

                <div
                  className={`p-4 rounded-2xl text-xs leading-relaxed max-w-[85%] ${
                    msg.role === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none shadow-md'
                      : 'bg-black/50 border border-slate-800 text-slate-200 rounded-bl-none shadow-inner'
                  }`}
                >
                  {msg.thinkingTrace && (
                    <div className="mb-3 p-3 rounded-xl bg-indigo-950/40 border border-indigo-800/40 text-[11px] font-mono space-y-1.5 text-indigo-300">
                      <div className="flex items-center gap-1.5 font-bold text-indigo-400">
                        <Zap className="w-3.5 h-3.5" />
                        <span>Thinking Trace ({msg.thinkingTrace.length} cognitive hops)</span>
                      </div>
                      {msg.thinkingTrace.map((trace, tIdx) => (
                        <div key={tIdx} className="flex items-center gap-1.5 text-slate-400">
                          <ChevronRight className="w-3 h-3 text-indigo-500" />
                          <span>{trace}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}

            {isGenerating && (
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-indigo-950/30 border border-indigo-800/30 text-indigo-400 text-xs font-mono animate-pulse">
                <RotateCw className="w-3.5 h-3.5 animate-spin" />
                <span>Gemini 3.7 synthesizing reasoning graph and kernel buffer patch...</span>
              </div>
            )}
          </div>

          {/* Prompt Ingress Station */}
          <form onSubmit={handleSend} className={`p-4 rounded-3xl border ${recipe.cardBorder} ${recipe.cardBg} backdrop-blur-md space-y-3`}>
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Multi-modal Context Ready
              </span>
              <span className="font-mono text-[11px]">Tokens: 1,420 / 128k</span>
            </div>

            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Ask Gemini to synthesize architectures, debug quantum telemetry, or inspect kernel logs..."
                rows={3}
                className={`w-full p-3.5 rounded-2xl text-xs font-mono ${recipe.inputBg} border ${recipe.inputBorder} ${recipe.textPrimary} outline-none resize-none ${recipe.ringFocus}`}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button type="button" className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1">
                  <Paperclip className="w-3.5 h-3.5" />
                  <span className="text-[11px]">Attach Logs</span>
                </button>
                <button type="button" className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1">
                  <Code2 className="w-3.5 h-3.5" />
                  <span className="text-[11px]">AST Format</span>
                </button>
              </div>

              <button
                type="submit"
                disabled={isGenerating}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 ${recipe.accentBg} shadow-md`}
              >
                <span>Dispatch Prompt</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Code & Artifact Canvas / Model Knobs (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Artifact Code Viewer */}
          <div className={`p-6 rounded-3xl border ${recipe.cardBorder} ${recipe.cardBg} backdrop-blur-md space-y-4`}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-xs text-white">dispatch-ring-buffer.ts</span>
              </div>
              <button
                onClick={handleCopyCode}
                className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1 font-mono"
              >
                {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedCode ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <pre className="p-4 rounded-2xl bg-black/60 border border-slate-800 text-[11px] font-mono text-emerald-300 overflow-x-auto leading-relaxed">
{`// Quantum Dispatch Engine v4.2
export interface TelemetryBuffer {
  shardId: string;
  byteCapacity: number;
  allocatedLocks: number;
}

export function dispatchTelemetryRingBuffer(
  shards: TelemetryBuffer[]
): Promise<boolean> {
  return Promise.all(
    shards.map(s => allocateZeroCopyLock(s.shardId))
  ).then(() => true);
}`}
            </pre>

            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2 text-xs text-emerald-300">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>Compilation verified: Zero type errors in AST synthesis.</span>
            </div>
          </div>

          {/* Model Knobs & Hyperparameters */}
          <div className={`p-6 rounded-3xl border ${recipe.cardBorder} ${recipe.cardBg} backdrop-blur-md space-y-4`}>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
              <SlidersHorizontal className="w-4 h-4 text-indigo-400" />
              <span>Inference Hyperparameters</span>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>Temperature:</span>
                  <span className="text-white font-bold">{temperature}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>Thinking Budget (Tokens):</span>
                  <span className="text-indigo-400 font-bold">{thinkingBudget}</span>
                </div>
                <input
                  type="range"
                  min={1024}
                  max={16384}
                  step={1024}
                  value={thinkingBudget}
                  onChange={(e) => setThinkingBudget(parseInt(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
