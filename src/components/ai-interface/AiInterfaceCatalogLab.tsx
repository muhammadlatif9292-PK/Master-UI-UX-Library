/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bot,
  Sparkles,
  Layers,
  BrainCircuit,
  Wrench,
  BookOpen,
  Paperclip,
  Code2,
  Terminal,
  Activity,
  Mic,
  Scan,
  Zap,
  Sliders,
  Check,
  Copy,
  ChevronRight,
  Eye,
  Radio,
  Share2,
  RefreshCw,
  Cpu,
  Shield,
  HelpCircle,
  Play,
  RotateCcw,
} from 'lucide-react';
import { useSound } from '../../design-system/sound/SoundContext';
import { useHaptics } from '../../design-system/haptics/HapticContext';
import { AiComponentType, AiStyleFamily, StyleRecipe, MessageItem } from './types';
import { AI_STYLE_RECIPES } from './styles';
import {
  ChatShell,
  MessageBubbles,
  StreamingResponse,
  ThinkingState,
  ToolExecution,
  Citations,
  Attachments,
  CodeBlock,
  CommandInput,
  ModelSelector,
  ProviderSelector,
  StatusIndicator,
  AiOrb,
  AiCompanion,
  VoiceState,
  MultimodalPanel,
  ArtifactViewer,
  TaskProgress,
} from './components';

export function AiInterfaceCatalogLab() {
  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();

  // Active Navigation & View Modes
  const [activeTab, setActiveTab] = useState<'components' | 'styles' | 'workflow' | 'voice' | 'spec'>('components');
  const [selectedComponent, setSelectedComponent] = useState<AiComponentType>('chat-shell');
  const [selectedStyleFamily, setSelectedStyleFamily] = useState<AiStyleFamily>('minimal-ai');
  const [copiedCode, setCopiedCode] = useState(false);

  const recipe: StyleRecipe = AI_STYLE_RECIPES[selectedStyleFamily] || AI_STYLE_RECIPES['minimal-ai'];

  const componentList: { id: AiComponentType; name: string; category: string; icon: any }[] = [
    { id: 'chat-shell', name: 'Chat Shell', category: 'Conversation', icon: Bot },
    { id: 'message-bubbles', name: 'Message Bubbles', category: 'Conversation', icon: Bot },
    { id: 'streaming-response', name: 'Streaming Response', category: 'Synthesis', icon: Activity },
    { id: 'thinking-state', name: 'Thinking State (CoT)', category: 'Reasoning', icon: BrainCircuit },
    { id: 'tool-execution', name: 'Tool Execution', category: 'Agentic', icon: Wrench },
    { id: 'citations', name: 'Grounding Citations', category: 'Knowledge', icon: BookOpen },
    { id: 'attachments', name: 'Multimodal Shelf', category: 'Input', icon: Paperclip },
    { id: 'code-block', name: 'Code Block Runner', category: 'Developer', icon: Code2 },
    { id: 'command-input', name: 'Command & Prompt Bar', category: 'Input', icon: Terminal },
    { id: 'model-selector', name: 'Model Selector', category: 'Controls', icon: Sliders },
    { id: 'provider-selector', name: 'Provider Gateway', category: 'Infrastructure', icon: Cpu },
    { id: 'status-indicator', name: 'Inference Status', category: 'Telemetry', icon: Zap },
    { id: 'ai-orb', name: 'Kinetic AI Orb', category: 'Ambient & Voice', icon: Sparkles },
    { id: 'ai-companion', name: 'AI Companion', category: 'Empathy', icon: Bot },
    { id: 'voice-state', name: 'Voice & Waveform', category: 'Audio', icon: Mic },
    { id: 'multimodal-panel', name: 'Multimodal Vision', category: 'Perception', icon: Scan },
    { id: 'artifact-viewer', name: 'Artifact Canvas', category: 'Synthesis', icon: Layers },
    { id: 'task-progress', name: 'Task Progress DAG', category: 'Agentic', icon: Activity },
  ];

  const styleFamilies: { id: AiStyleFamily; name: string; tag: string }[] = [
    { id: 'minimal-ai', name: 'Minimal AI', tag: 'Monochrome' },
    { id: 'glass-ai', name: 'Glass AI', tag: 'Acrylic' },
    { id: 'cinematic-ai', name: 'Cinematic AI', tag: '21:9 Widescreen' },
    { id: 'orb-ai', name: 'Orb AI', tag: 'Kinetic Halos' },
    { id: 'companion-ai', name: 'Companion AI', tag: 'Empathetic' },
    { id: 'command-center-ai', name: 'Command Center', tag: 'Ops & HUD' },
    { id: 'spatial-ai', name: 'Spatial AI', tag: 'Z-Depth' },
    { id: 'holographic-ai', name: 'Holographic AI', tag: 'Scanlines' },
    { id: 'editorial-ai', name: 'Editorial AI', tag: 'Serif' },
    { id: 'laboratory-ai', name: 'Laboratory AI', tag: 'Scientific' },
    { id: 'terminal-ai', name: 'Terminal AI', tag: 'VT100' },
  ];

  const handleSelectComponent = (comp: AiComponentType) => {
    setSelectedComponent(comp);
    playSound('soft-click');
    triggerHaptic('light');
  };

  const handleSelectStyle = (style: AiStyleFamily) => {
    setSelectedStyleFamily(style);
    playSound('selection');
    triggerHaptic('medium');
  };

  const copyCodeSnippet = () => {
    const snippet = `// AI Interface Primitive: ${selectedComponent}\n// Style Family: ${recipe.name}\nimport { ${componentList.find(c => c.id === selectedComponent)?.name.replace(/\s+/g, '')} } from './components';\n\n<${componentList.find(c => c.id === selectedComponent)?.name.replace(/\s+/g, '')} recipe={recipe} />`;
    navigator.clipboard.writeText(snippet);
    setCopiedCode(true);
    playSound('chime');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-zinc-100 flex flex-col font-sans">
      {/* Top Hero Banner */}
      <header className="p-6 md:p-8 border-b border-zinc-800/80 bg-zinc-950/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/20">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <span>AI Interface & Cognitive Systems Catalog</span>
                <span className="text-xs font-mono font-normal px-2.5 py-0.5 rounded-full bg-sky-950 text-sky-300 border border-sky-800">
                  v2.5 Ready
                </span>
              </h1>
            </div>
            <p className="text-xs md:text-sm text-zinc-400 max-w-2xl leading-relaxed">
              18 production-grade cognitive UI components engineered across 11 visual style families. Features authentic system telemetry, zero fake progress, and real-time streaming buffers.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 font-mono text-xs">
            <div className="p-3 rounded-xl bg-black/40 border border-zinc-800 text-center">
              <span className="text-lg font-bold text-sky-400 block">18</span>
              <span className="text-[10px] text-zinc-500 uppercase">Components</span>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-zinc-800 text-center">
              <span className="text-lg font-bold text-emerald-400 block">11</span>
              <span className="text-[10px] text-zinc-500 uppercase">Style Recipes</span>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-zinc-800 text-center">
              <span className="text-lg font-bold text-violet-400 block">60fps</span>
              <span className="text-[10px] text-zinc-500 uppercase">Stream Buffer</span>
            </div>
          </div>
        </div>

        {/* Global Navigation Tabs */}
        <div className="max-w-7xl mx-auto flex items-center gap-2 mt-6 pt-4 border-t border-zinc-800/60 overflow-x-auto text-xs font-mono">
          {[
            { id: 'components', label: 'Component Primitives (18)', icon: Layers },
            { id: 'styles', label: '11 Style Families Gallery', icon: Sparkles },
            { id: 'workflow', label: 'Live Multi-Turn Agent Flow', icon: Bot },
            { id: 'voice', label: 'Orb & Voice Studio', icon: Mic },
            { id: 'spec', label: 'Architecture & Tokens', icon: Code2 },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  playSound('soft-click');
                }}
                className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-sky-500 text-white font-bold shadow-md shadow-sky-500/20'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 space-y-6">
        {/* Style Family Quick Bar (Available in All Tabs) */}
        <div className="p-3.5 rounded-2xl bg-black/40 border border-zinc-800 flex items-center justify-between gap-4 overflow-x-auto">
          <div className="flex items-center gap-2 shrink-0 text-xs font-mono text-zinc-400">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span className="font-bold text-white">Active Visual Style:</span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto">
            {styleFamilies.map((s) => (
              <button
                key={s.id}
                onClick={() => handleSelectStyle(s.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono whitespace-nowrap transition-all cursor-pointer ${
                  selectedStyleFamily === s.id
                    ? 'bg-white text-black font-bold shadow-xs'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                <span>{s.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* TAB 1: COMPONENT PRIMITIVES SANDBOX */}
        {activeTab === 'components' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Sidebar: 18 Components Switcher */}
            <div className="lg:col-span-4 space-y-3">
              <div className="p-3 rounded-xl bg-black/40 border border-zinc-800 text-xs font-mono font-semibold text-zinc-400 flex items-center justify-between">
                <span>SELECT AI COMPONENT ({componentList.length})</span>
                <span className="text-[10px] text-sky-400">INTERACTIVE</span>
              </div>

              <div className="space-y-1.5 max-h-[640px] overflow-y-auto pr-1">
                {componentList.map((item) => {
                  const Icon = item.icon;
                  const isSelected = selectedComponent === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectComponent(item.id)}
                      className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-sky-500/20 border-sky-500/60 text-white shadow-md'
                          : 'bg-zinc-900/40 border-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`p-2 rounded-lg ${
                            isSelected ? 'bg-sky-500 text-white' : 'bg-black/50 text-zinc-500'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0">
                          <span className="font-semibold text-xs text-white block truncate">
                            {item.name}
                          </span>
                          <span className="text-[10px] font-mono text-zinc-500">{item.category}</span>
                        </div>
                      </div>

                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${
                          isSelected ? 'text-sky-400 translate-x-0.5' : 'text-zinc-600'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Preview Canvas */}
            <div className="lg:col-span-8 space-y-4">
              {/* Preview Header & Code Copy */}
              <div className="p-4 rounded-xl bg-black/40 border border-zinc-800 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-white flex items-center gap-2">
                    <span>{componentList.find((c) => c.id === selectedComponent)?.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-zinc-800 text-zinc-300">
                      Recipe: {recipe.name}
                    </span>
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">{recipe.description}</p>
                </div>

                <button
                  onClick={copyCodeSnippet}
                  className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-mono text-zinc-200 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Copied' : 'Copy JSX'}</span>
                </button>
              </div>

              {/* Live Rendered Component Sandbox */}
              <div className="p-4 md:p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800 shadow-2xl relative min-h-[480px] flex items-center justify-center">
                {selectedComponent === 'chat-shell' && <ChatShell recipe={recipe} />}
                {selectedComponent === 'message-bubbles' && (
                  <div className="w-full space-y-4">
                    <MessageBubbles
                      recipe={recipe}
                      message={{
                        id: 'usr-1',
                        role: 'user',
                        content: 'Synthesize the multimodal token architecture and execute unit verification tests.',
                        timestamp: '10:45 AM',
                        tokenCount: 18,
                      }}
                    />
                    <MessageBubbles
                      recipe={recipe}
                      message={{
                        id: 'ast-1',
                        role: 'assistant',
                        content: 'Multimodal token architecture synthesized and validated against W3C accessibility rules.',
                        timestamp: '10:45 AM',
                        tokenCount: 420,
                        thinking: {
                          steps: ['Context ingested', 'Security verified'],
                          durationMs: 780,
                          tokensUsed: 1420,
                        },
                        tools: [
                          {
                            id: 'tool-audit',
                            name: 'wcag_audit_runner',
                            arguments: { strict: true },
                            status: 'completed',
                            durationMs: 140,
                            output: { status: 'passed', contrastRatio: 7.2 },
                          },
                        ],
                        citations: [
                          {
                            id: 'c1',
                            index: 1,
                            title: 'W3C Contrast Guidelines',
                            url: 'https://w3.org',
                            domain: 'w3.org',
                            snippet: 'Passes Level AAA criteria.',
                            relevanceScore: 0.99,
                          },
                        ],
                      }}
                    />
                  </div>
                )}
                {selectedComponent === 'streaming-response' && (
                  <div className="w-full max-w-2xl">
                    <StreamingResponse recipe={recipe} />
                  </div>
                )}
                {selectedComponent === 'thinking-state' && (
                  <div className="w-full max-w-2xl">
                    <ThinkingState recipe={recipe} isExpandedDefault={true} />
                  </div>
                )}
                {selectedComponent === 'tool-execution' && (
                  <div className="w-full max-w-2xl">
                    <ToolExecution recipe={recipe} />
                  </div>
                )}
                {selectedComponent === 'citations' && (
                  <div className="w-full max-w-2xl p-4 rounded-xl bg-black/40 border border-zinc-800">
                    <Citations recipe={recipe} />
                  </div>
                )}
                {selectedComponent === 'attachments' && (
                  <div className="w-full max-w-2xl p-4 rounded-xl bg-black/40 border border-zinc-800">
                    <Attachments recipe={recipe} />
                  </div>
                )}
                {selectedComponent === 'code-block' && (
                  <div className="w-full max-w-2xl">
                    <CodeBlock recipe={recipe} />
                  </div>
                )}
                {selectedComponent === 'command-input' && (
                  <div className="w-full max-w-2xl">
                    <CommandInput recipe={recipe} />
                  </div>
                )}
                {selectedComponent === 'model-selector' && (
                  <div className="w-full">
                    <ModelSelector recipe={recipe} />
                  </div>
                )}
                {selectedComponent === 'provider-selector' && (
                  <div className="w-full">
                    <ProviderSelector recipe={recipe} />
                  </div>
                )}
                {selectedComponent === 'status-indicator' && (
                  <div className="w-full max-w-xl">
                    <StatusIndicator recipe={recipe} />
                  </div>
                )}
                {selectedComponent === 'ai-orb' && (
                  <div className="w-full">
                    <AiOrb recipe={recipe} size="lg" />
                  </div>
                )}
                {selectedComponent === 'ai-companion' && (
                  <div className="w-full max-w-xl">
                    <AiCompanion recipe={recipe} />
                  </div>
                )}
                {selectedComponent === 'voice-state' && (
                  <div className="w-full max-w-xl">
                    <VoiceState recipe={recipe} />
                  </div>
                )}
                {selectedComponent === 'multimodal-panel' && (
                  <div className="w-full max-w-2xl">
                    <MultimodalPanel recipe={recipe} />
                  </div>
                )}
                {selectedComponent === 'artifact-viewer' && (
                  <div className="w-full max-w-3xl">
                    <ArtifactViewer recipe={recipe} />
                  </div>
                )}
                {selectedComponent === 'task-progress' && (
                  <div className="w-full max-w-2xl">
                    <TaskProgress recipe={recipe} />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: 11 STYLE FAMILIES GALLERY */}
        {activeTab === 'styles' && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-black/40 border border-zinc-800">
              <h3 className="font-bold text-sm text-white">Visual Style Families Matrix</h3>
              <p className="text-xs text-zinc-400">
                Compare how cognitive interface elements translate across all 11 design languages.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {styleFamilies.map((style) => {
                const r = AI_STYLE_RECIPES[style.id];
                return (
                  <div
                    key={style.id}
                    onClick={() => handleSelectStyle(style.id)}
                    className={`p-4 rounded-2xl border text-xs cursor-pointer transition-all ${
                      r.borderClass
                    } ${r.cardClass} ${
                      selectedStyleFamily === style.id ? 'ring-2 ring-sky-500 scale-[1.02]' : 'hover:opacity-90'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm text-white">{r.name}</span>
                      <span className={`text-[10px] font-mono px-2 py-0.2 rounded uppercase ${r.badgeClass}`}>
                        {style.tag}
                      </span>
                    </div>

                    <p className="text-[11px] text-zinc-400 mb-3 leading-relaxed">
                      {r.description}
                    </p>

                    {/* Preview Mini Mockup */}
                    <div className="p-3 rounded-xl bg-black/50 border border-white/5 space-y-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span className="font-mono text-[10px] text-zinc-300">GEMINI_STREAM_ACTIVE</span>
                      </div>
                      <div className={`p-2 rounded-lg text-[11px] ${r.bubbleAssistant}`}>
                        Synthesized cognitive response with authentic telemetry.
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: LIVE MULTI-TURN AGENT WORKFLOW */}
        {activeTab === 'workflow' && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-black/40 border border-zinc-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-white">Full-Spectrum Autonomous Agent Loop</h3>
                <p className="text-xs text-zinc-400">
                  Observe how Thinking State, Tool Execution, Citations, Streaming, and Artifact Generation work in harmony.
                </p>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                Zero Mock Delays
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Agent Step DAG */}
              <div className="lg:col-span-5 space-y-4">
                <TaskProgress recipe={recipe} />
                <StatusIndicator recipe={recipe} />
              </div>

              {/* Right Interactive Chat & Artifact View */}
              <div className="lg:col-span-7 space-y-4">
                <ChatShell recipe={recipe} />
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ORB & VOICE STUDIO */}
        {activeTab === 'voice' && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-black/40 border border-zinc-800">
              <h3 className="font-bold text-sm text-white">Voice & Ambient Kinetic Studio</h3>
              <p className="text-xs text-zinc-400">
                Live frequency spectrum visualizer, bi-directional voice streaming, and responsive SVG/Canvas energy orb.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800 flex flex-col items-center justify-center">
                <AiOrb recipe={recipe} size="hero" showControls={true} />
              </div>

              <div className="space-y-4">
                <VoiceState recipe={recipe} />
                <AiCompanion recipe={recipe} />
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: SPECIFICATION & DESIGN TOKENS */}
        {activeTab === 'spec' && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-black/40 border border-zinc-800">
              <h3 className="font-bold text-sm text-white">Cognitive UI Architectural Specification</h3>
              <p className="text-xs text-zinc-400">
                System contracts, WCAG AA compliance verification, and token budget rules.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-black/40 border border-zinc-800 space-y-2">
                <span className="font-bold text-sky-400 block text-sm">TELEMETRY RULES</span>
                <ul className="list-disc pl-4 space-y-1 text-zinc-300">
                  <li>Thinking states must communicate genuine phase completion times.</li>
                  <li>Never simulate artificial delays with fake setTimeout loops.</li>
                  <li>Token counts must reflect actual byte calculations.</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-zinc-800 space-y-2">
                <span className="font-bold text-emerald-400 block text-sm">STREAMING RESILIENCE</span>
                <ul className="list-disc pl-4 space-y-1 text-zinc-300">
                  <li>Buffers incoming SSE / WebSocket chunks with requestAnimationFrame.</li>
                  <li>Maintains steady 60fps without DOM reflow spikes.</li>
                  <li>Provides Pause, Resume, and Stop generation controls.</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
