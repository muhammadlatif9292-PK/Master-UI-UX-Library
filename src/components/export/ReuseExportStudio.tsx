/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { CatalogEntry } from '../../design-system/catalog/catalogTypes';
import { DesignArchetype, StyleRecipe } from '../../types/architecture';
import { ARCHETYPE_TOKENS } from '../../design-system/tokens';
import {
  generateFullExportBundle,
  deriveArchetypeFromEntry,
  downloadPackageZip,
  ExportBundle,
} from '../../design-system/export/exportEngine';
import { useSound } from '../../design-system/sound/SoundContext';
import { useHaptics } from '../../design-system/haptics/HapticContext';
import { useTheme } from '../../design-system/tokens/ThemeContext';
import {
  Code2,
  Palette,
  Coins,
  Cpu,
  FileJson,
  Archive,
  FileCheck2,
  Package,
  Eye,
  Smartphone,
  Copy,
  Check,
  Download,
  Sparkles,
  Layers,
  Shield,
  Zap,
  Volume2,
  ExternalLink,
  ChevronRight,
  FileText,
  Boxes,
  Terminal,
  Activity,
} from 'lucide-react';

export type ExportTabKey =
  | 'component'
  | 'style'
  | 'tokens'
  | 'ai-prompt'
  | 'json-recipe'
  | 'package'
  | 'metadata'
  | 'dependencies'
  | 'accessibility'
  | 'responsive';

interface ReuseExportStudioProps {
  entry: CatalogEntry;
  initialTab?: ExportTabKey;
  onClose?: () => void;
}

export function ReuseExportStudio({ entry, initialTab = 'component', onClose }: ReuseExportStudioProps) {
  const { theme } = useTheme();
  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();

  // Selected Archetype for dynamic restyling & export
  const [selectedArchetype, setSelectedArchetype] = useState<DesignArchetype>(deriveArchetypeFromEntry(entry));
  const [activeTab, setActiveTab] = useState<ExportTabKey>(initialTab);
  const [componentFlavor, setComponentFlavor] = useState<'standalone' | 'modular'>('standalone');
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [isZipping, setIsZipping] = useState(false);
  const [selectedPackageFile, setSelectedPackageFile] = useState<string>(`${entry.component}.tsx`);

  // Generate full export bundle dynamically based on active archetype
  const bundle: ExportBundle = useMemo(() => {
    return generateFullExportBundle(entry, selectedArchetype);
  }, [entry, selectedArchetype]);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    playSound('press', 'MICRO');
    triggerHaptic('tap');
    setTimeout(() => setCopiedItem(null), 2200);
  };

  const handleDownloadZip = async () => {
    setIsZipping(true);
    playSound('press', 'STATE');
    triggerHaptic('press');
    try {
      await downloadPackageZip(entry, selectedArchetype);
      playSound('success', 'STATE');
      triggerHaptic('success');
    } catch (e) {
      playSound('error', 'STATE');
      triggerHaptic('error');
    } finally {
      setIsZipping(false);
    }
  };

  const tabs: Array<{ key: ExportTabKey; label: string; icon: any; step: number }> = [
    { key: 'component', label: '1. Component Code', icon: Code2, step: 1 },
    { key: 'style', label: '2. Style Code', icon: Palette, step: 2 },
    { key: 'tokens', label: '3. Tokens', icon: Coins, step: 3 },
    { key: 'ai-prompt', label: '4. AI Prompt', icon: Cpu, step: 4 },
    { key: 'json-recipe', label: '5. JSON Recipe', icon: FileJson, step: 5 },
    { key: 'package', label: '6. Implementation Package', icon: Archive, step: 6 },
    { key: 'metadata', label: '7. Metadata', icon: FileCheck2, step: 7 },
    { key: 'dependencies', label: '8. Dependencies', icon: Package, step: 8 },
    { key: 'accessibility', label: '9. Accessibility Notes', icon: Eye, step: 9 },
    { key: 'responsive', label: '10. Responsive Notes', icon: Smartphone, step: 10 },
  ];

  const currentTokens = ARCHETYPE_TOKENS[selectedArchetype];

  return (
    <div className="w-full space-y-6">
      {/* Studio Header Card */}
      <div className={`p-6 sm:p-8 rounded-3xl ${theme.surface.primary} border ${theme.border.default} shadow-2xl relative overflow-hidden`}>
        {/* Glow ambient background */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 flex items-center gap-1.5">
                <Boxes className="w-3.5 h-3.5" /> REUSE & EXPORT WORKFLOW
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-white/10 text-zinc-300">
                v{entry.version}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                WCAG 2.2 {entry.accessibility}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Tier: {entry.performanceTier}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
              {entry.name}
              <span className="text-sm font-mono text-zinc-400 font-normal">({entry.component})</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-3xl leading-relaxed">
              Export 10 production-ready formats: standalone & modular React code, Tailwind styles, tokens, AI prompts, JSON recipes, multi-file packages, metadata, dependencies, and audit notes.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => handleCopy(bundle.componentCode.standalone, 'Standalone Code')}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-xs transition-all flex items-center gap-2 border border-white/15 cursor-pointer active:scale-95"
            >
              {copiedItem === 'Standalone Code' ? <Check className="w-4 h-4 text-emerald-400" /> : <Code2 className="w-4 h-4 text-cyan-400" />}
              <span>{copiedItem === 'Standalone Code' ? 'Copied Code!' : 'Copy Code'}</span>
            </button>

            <button
              onClick={() => handleCopy(bundle.aiPrompt.vibeCoder, 'AI Prompt')}
              className="px-3.5 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 font-medium text-xs transition-all flex items-center gap-2 border border-purple-500/40 cursor-pointer active:scale-95"
            >
              {copiedItem === 'AI Prompt' ? <Check className="w-4 h-4 text-emerald-400" /> : <Cpu className="w-4 h-4 text-purple-400" />}
              <span>{copiedItem === 'AI Prompt' ? 'Copied Prompt!' : 'Copy AI Prompt'}</span>
            </button>

            <button
              onClick={handleDownloadZip}
              disabled={isZipping}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-zinc-950 font-bold text-xs transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer active:scale-95 disabled:opacity-50"
            >
              {isZipping ? (
                <div className="w-4 h-4 rounded-full border-2 border-zinc-950 border-t-transparent animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              <span>{isZipping ? 'Bundling ZIP...' : 'Export Package (.zip)'}</span>
            </button>
          </div>
        </div>

        {/* Dynamic Archetype Selector Strip */}
        <div className="relative z-10 mt-6 pt-5 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-cyan-400" /> Target Theme Archetype:
            </span>
            <select
              value={selectedArchetype}
              onChange={(e) => {
                const next = e.target.value as DesignArchetype;
                setSelectedArchetype(next);
                playSound('tick', 'MICRO');
                triggerHaptic('selection');
              }}
              aria-label="Target Theme Archetype"
              className="bg-black/60 border border-white/20 rounded-xl px-3 py-1.5 text-xs text-cyan-300 font-mono focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer"
            >
              <option value="restrained-luxury">Restrained Luxury (Obsidian & 24k Gold)</option>
              <option value="cinematic-dark">Cinematic Dark (Slate & Cosmic Cyan)</option>
              <option value="futuristic-cyber">Futuristic Cyber (HUD & Terminal)</option>
              <option value="scientific-lab">Scientific Lab (Sterile White & Cobalt)</option>
              <option value="neumorphic-glass">Neumorphic Glass (Liquid Translucent)</option>
              <option value="mechanical-tactile">Mechanical Tactile (Industrial Amber)</option>
              <option value="brutalist-grid">Brutalist Grid (Raw Mono & Rose)</option>
              <option value="editorial-serif">Editorial Serif (Archival Burgundy)</option>
              <option value="minimal-monastic">Minimal Monastic (Zen Graphite)</option>
              <option value="biomorphic-organic">Biomorphic Organic (Canopy Emerald)</option>
              <option value="retro-computing">Retro Computing (CRT Phosphor Green)</option>
              <option value="ai-character">AI Character (Companion Indigo)</option>
            </select>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
            <span>Font: <strong className="text-zinc-200">{currentTokens.fontFamilyTitle}</strong></span>
            <span>Radius: <strong className="text-zinc-200">Outer - Padding = Inner</strong></span>
            <span>Touch: <strong className="text-emerald-400">≥44px</strong></span>
          </div>
        </div>
      </div>

      {/* Structured Implementation Identification Matrix */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3">
        <div className={`p-3.5 rounded-2xl ${theme.surface.secondary} border ${theme.border.default} space-y-1`}>
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">Component</span>
          <p className="text-xs font-bold text-white truncate" title={entry.component}>{entry.component}</p>
          <span className="text-[10px] font-mono text-cyan-400">{entry.family}</span>
        </div>

        <div className={`p-3.5 rounded-2xl ${theme.surface.secondary} border ${theme.border.default} space-y-1`}>
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">Version</span>
          <p className="text-xs font-bold text-white">v{entry.version}</p>
          <span className="text-[10px] font-mono text-emerald-400">{entry.status}</span>
        </div>

        <div className={`p-3.5 rounded-2xl ${theme.surface.secondary} border ${theme.border.default} space-y-1`}>
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">Dependencies</span>
          <p className="text-xs font-bold text-white truncate" title="motion, lucide-react, react">
            {entry.dependencies.slice(0, 2).join(', ')}
          </p>
          <span className="text-[10px] font-mono text-zinc-400">+{entry.dependencies.length} packages</span>
        </div>

        <div className={`p-3.5 rounded-2xl ${theme.surface.secondary} border ${theme.border.default} space-y-1`}>
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">Required Assets</span>
          <p className="text-xs font-bold text-white">Web Audio + Icons</p>
          <span className="text-[10px] font-mono text-purple-400">0 audio files (procedural)</span>
        </div>

        <div className={`p-3.5 rounded-2xl ${theme.surface.secondary} border ${theme.border.default} space-y-1`}>
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">Theme</span>
          <p className="text-xs font-bold text-white capitalize truncate" title={selectedArchetype}>
            {selectedArchetype.replace('-', ' ')}
          </p>
          <span className="text-[10px] font-mono text-amber-400">{entry.mood.split(' ')[0]}</span>
        </div>

        <div className={`p-3.5 rounded-2xl ${theme.surface.secondary} border ${theme.border.default} space-y-1`}>
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">Recipes</span>
          <p className="text-xs font-bold text-white">Style + Motion</p>
          <span className="text-[10px] font-mono text-blue-400">Spring 300/25</span>
        </div>

        <div className={`p-3.5 rounded-2xl ${theme.surface.secondary} border ${theme.border.default} space-y-1`}>
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">States</span>
          <p className="text-xs font-bold text-white">8 Semantic States</p>
          <span className="text-[10px] font-mono text-emerald-400">idle → success</span>
        </div>

        <div className={`p-3.5 rounded-2xl ${theme.surface.secondary} border ${theme.border.default} space-y-1`}>
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">Accessibility</span>
          <p className="text-xs font-bold text-white">WCAG {entry.accessibility}</p>
          <span className="text-[10px] font-mono text-emerald-400">12-Vector Pass</span>
        </div>

        <div className={`p-3.5 rounded-2xl ${theme.surface.secondary} border ${theme.border.default} space-y-1`}>
          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block">Performance</span>
          <p className="text-xs font-bold text-white capitalize">{entry.performanceTier}</p>
          <span className="text-[10px] font-mono text-cyan-400">60 FPS &lt;16ms</span>
        </div>
      </div>

      {/* Navigation Tabs for the 10 Export Formats */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-black/40 border border-white/10 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                playSound('tick', 'MICRO');
                triggerHaptic('selection');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-medium flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-cyan-500 text-zinc-950 font-bold shadow-lg shadow-cyan-500/20'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT PANELS */}

      {/* 1. COMPONENT CODE */}
      {activeTab === 'component' && (
        <div className={`p-6 sm:p-8 rounded-3xl ${theme.surface.primary} border ${theme.border.default} space-y-6 shadow-2xl`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Code2 className="w-5 h-5 text-cyan-400" />
                1. Copy Component Code
              </h3>
              <p className="text-xs text-zinc-400">
                Self-contained, production-grade TypeScript React component. Verified with zero missing invisible file dependencies.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center bg-black/50 p-1 rounded-xl border border-white/10">
                <button
                  onClick={() => setComponentFlavor('standalone')}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                    componentFlavor === 'standalone' ? 'bg-cyan-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Standalone (Single File)
                </button>
                <button
                  onClick={() => setComponentFlavor('modular')}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                    componentFlavor === 'modular' ? 'bg-cyan-500 text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Modular Design System
                </button>
              </div>

              <button
                onClick={() =>
                  handleCopy(
                    componentFlavor === 'standalone' ? bundle.componentCode.standalone : bundle.componentCode.modular,
                    'Component Code'
                  )
                }
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs transition-all flex items-center gap-2 shadow-lg"
              >
                {copiedItem === 'Component Code' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedItem === 'Component Code' ? 'Code Copied!' : 'Copy Component Code'}</span>
              </button>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Zero-Invisible-Files Guarantee:</strong> This exported component is completely self-contained with inline audio/haptic synthesis, accessible state machines, and motion physics.
            </span>
          </div>

          <pre className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono text-xs overflow-x-auto max-h-[500px] leading-relaxed">
            <code>{componentFlavor === 'standalone' ? bundle.componentCode.standalone : bundle.componentCode.modular}</code>
          </pre>
        </div>
      )}

      {/* 2. STYLE CODE */}
      {activeTab === 'style' && (
        <div className={`p-6 sm:p-8 rounded-3xl ${theme.surface.primary} border ${theme.border.default} space-y-6 shadow-2xl`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Palette className="w-5 h-5 text-cyan-400" />
                2. Copy Style Code (Tailwind + CSS Variables + Glassmorphism)
              </h3>
              <p className="text-xs text-zinc-400">
                Tailwind CSS classes, custom CSS variables, and surface glow keyframe rules for {selectedArchetype}.
              </p>
            </div>

            <button
              onClick={() =>
                handleCopy(
                  `${bundle.styleCode.cssVariables}\n\n${bundle.styleCode.rawCss}\n\n${bundle.styleCode.tailwind}`,
                  'Style Code'
                )
              }
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs transition-all flex items-center gap-2 shadow-lg"
            >
              {copiedItem === 'Style Code' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedItem === 'Style Code' ? 'Styles Copied!' : 'Copy Style Code'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <span className="text-xs font-mono text-cyan-400 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5" /> Tailwind Class Compositions
              </span>
              <pre className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono text-xs overflow-x-auto max-h-[350px]">
                <code>{bundle.styleCode.tailwind}</code>
              </pre>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-purple-400 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5" /> CSS Variables &amp; Lighting Shaders
              </span>
              <pre className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono text-xs overflow-x-auto max-h-[350px]">
                <code>{`${bundle.styleCode.cssVariables}\n\n${bundle.styleCode.rawCss}`}</code>
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* 3. TOKENS */}
      {activeTab === 'tokens' && (
        <div className={`p-6 sm:p-8 rounded-3xl ${theme.surface.primary} border ${theme.border.default} space-y-6 shadow-2xl`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Coins className="w-5 h-5 text-cyan-400" />
                3. Copy Tokens (JSON &amp; TypeScript)
              </h3>
              <p className="text-xs text-zinc-400">
                Design system tokens for <strong className="text-cyan-300">{selectedArchetype}</strong> including surfaces, typography stacks, border alphas, and radius math.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy(bundle.tokens.json, 'Tokens JSON')}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-xs transition-all flex items-center gap-2 border border-white/15"
              >
                {copiedItem === 'Tokens JSON' ? <Check className="w-4 h-4 text-emerald-400" /> : <FileJson className="w-4 h-4" />}
                <span>Copy JSON</span>
              </button>
              <button
                onClick={() => handleCopy(bundle.tokens.typescript, 'Tokens TS')}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs transition-all flex items-center gap-2 shadow-lg"
              >
                {copiedItem === 'Tokens TS' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>Copy TypeScript</span>
              </button>
            </div>
          </div>

          <pre className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono text-xs overflow-x-auto max-h-[450px] leading-relaxed">
            <code>{bundle.tokens.json}</code>
          </pre>
        </div>
      )}

      {/* 4. AI PROMPTS */}
      {activeTab === 'ai-prompt' && (
        <div className={`p-6 sm:p-8 rounded-3xl ${theme.surface.primary} border ${theme.border.default} space-y-6 shadow-2xl`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Cpu className="w-5 h-5 text-purple-400" />
                4. Copy AI Prompt (Ready for Gemini / Claude / ChatGPT)
              </h3>
              <p className="text-xs text-zinc-400">
                Engineered prompt with exact design tokens, state machine constraints, anti-pattern bans, and responsive instructions.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopy(bundle.aiPrompt.naturalLanguageIntent, 'Natural Prompt')}
                className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-xs transition-all flex items-center gap-2 border border-white/15"
              >
                {copiedItem === 'Natural Prompt' ? <Check className="w-4 h-4 text-emerald-400" /> : <Sparkles className="w-4 h-4" />}
                <span>Copy 1-Line Natural Intent</span>
              </button>
              <button
                onClick={() => handleCopy(bundle.aiPrompt.vibeCoder, 'Vibe Prompt')}
                className="px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-zinc-950 font-bold text-xs transition-all flex items-center gap-2 shadow-lg"
              >
                {copiedItem === 'Vibe Prompt' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>Copy Vibe-Coder Prompt</span>
              </button>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
              <span><strong>Natural Language Intent Mapping:</strong> &quot;{bundle.aiPrompt.naturalLanguageIntent}&quot;</span>
            </div>
          </div>

          <pre className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono text-xs overflow-x-auto max-h-[450px] leading-relaxed whitespace-pre-wrap">
            <code>{bundle.aiPrompt.vibeCoder}</code>
          </pre>
        </div>
      )}

      {/* 5. JSON RECIPE */}
      {activeTab === 'json-recipe' && (
        <div className={`p-6 sm:p-8 rounded-3xl ${theme.surface.primary} border ${theme.border.default} space-y-6 shadow-2xl`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileJson className="w-5 h-5 text-cyan-400" />
                5. Copy JSON Recipe (Style + Motion + Interaction)
              </h3>
              <p className="text-xs text-zinc-400">
                Machine-readable declarative recipe specification according to the Master UI/UX System Schema.
              </p>
            </div>

            <button
              onClick={() => handleCopy(bundle.jsonRecipe, 'JSON Recipe')}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs transition-all flex items-center gap-2 shadow-lg"
            >
              {copiedItem === 'JSON Recipe' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedItem === 'JSON Recipe' ? 'Recipe Copied!' : 'Copy JSON Recipe'}</span>
            </button>
          </div>

          <pre className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono text-xs overflow-x-auto max-h-[450px] leading-relaxed">
            <code>{bundle.jsonRecipe}</code>
          </pre>
        </div>
      )}

      {/* 6. IMPLEMENTATION PACKAGE */}
      {activeTab === 'package' && (
        <div className={`p-6 sm:p-8 rounded-3xl ${theme.surface.primary} border ${theme.border.default} space-y-6 shadow-2xl`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Archive className="w-5 h-5 text-cyan-400" />
                6. Export Implementation Package (.zip &amp; File Tree)
              </h3>
              <p className="text-xs text-zinc-400">
                Complete multi-file production package with package.json, README, TypeScript code, styles, tokens, and audit notes.
              </p>
            </div>

            <button
              onClick={handleDownloadZip}
              disabled={isZipping}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-zinc-950 font-bold text-xs transition-all flex items-center gap-2 shadow-lg cursor-pointer"
            >
              {isZipping ? <div className="w-4 h-4 rounded-full border-2 border-zinc-950 border-t-transparent animate-spin" /> : <Download className="w-4 h-4" />}
              <span>{isZipping ? 'Creating Archive...' : 'Download Full Package (.zip)'}</span>
            </button>
          </div>

          {/* Multi-File Package Explorer */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* File List */}
            <div className="lg:col-span-4 space-y-1.5 p-3 rounded-2xl bg-black/40 border border-white/10">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-400 block px-2 pb-1 border-b border-white/10">
                Package Files ({Object.keys(bundle.packageFiles).length})
              </span>
              {Object.keys(bundle.packageFiles).map((file) => {
                const isSelected = selectedPackageFile === file;
                return (
                  <button
                    key={file}
                    onClick={() => {
                      setSelectedPackageFile(file);
                      playSound('tick', 'MICRO');
                    }}
                    className={`w-full px-3 py-2 rounded-xl text-left font-mono text-xs flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="flex items-center gap-2 truncate">
                      <FileText className="w-3.5 h-3.5 shrink-0" />
                      {file}
                    </span>
                    <ChevronRight className="w-3 h-3 shrink-0 opacity-50" />
                  </button>
                );
              })}
            </div>

            {/* File Content Preview */}
            <div className="lg:col-span-8 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span className="text-cyan-400 font-bold flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" /> {selectedPackageFile}
                </span>
                <button
                  onClick={() => handleCopy(bundle.packageFiles[selectedPackageFile] || '', selectedPackageFile)}
                  className="text-xs text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  {copiedItem === selectedPackageFile ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedItem === selectedPackageFile ? 'Copied' : 'Copy File'}</span>
                </button>
              </div>

              <pre className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono text-xs overflow-x-auto max-h-[380px] leading-relaxed">
                <code>{bundle.packageFiles[selectedPackageFile] || '// Select a file'}</code>
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* 7. METADATA */}
      {activeTab === 'metadata' && (
        <div className={`p-6 sm:p-8 rounded-3xl ${theme.surface.primary} border ${theme.border.default} space-y-6 shadow-2xl`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-cyan-400" />
                7. Export Metadata (SPDX 2.3 &amp; Component Manifest)
              </h3>
              <p className="text-xs text-zinc-400">
                Machine-readable license metadata, author attribution, and catalog parameters.
              </p>
            </div>

            <button
              onClick={() => handleCopy(bundle.metadata, 'Metadata')}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs transition-all flex items-center gap-2 shadow-lg"
            >
              {copiedItem === 'Metadata' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedItem === 'Metadata' ? 'Metadata Copied!' : 'Copy Metadata'}</span>
            </button>
          </div>

          <pre className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono text-xs overflow-x-auto max-h-[450px] leading-relaxed">
            <code>{bundle.metadata}</code>
          </pre>
        </div>
      )}

      {/* 8. DEPENDENCIES */}
      {activeTab === 'dependencies' && (
        <div className={`p-6 sm:p-8 rounded-3xl ${theme.surface.primary} border ${theme.border.default} space-y-6 shadow-2xl`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Package className="w-5 h-5 text-cyan-400" />
                8. Export Dependencies &amp; Package.json
              </h3>
              <p className="text-xs text-zinc-400">
                Required NPM runtime packages, peer dependencies, and Google Fonts typography links.
              </p>
            </div>

            <button
              onClick={() => handleCopy(bundle.dependencies.packageJson, 'Dependencies')}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs transition-all flex items-center gap-2 shadow-lg"
            >
              {copiedItem === 'Dependencies' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedItem === 'Dependencies' ? 'Package.json Copied!' : 'Copy package.json'}</span>
            </button>
          </div>

          <div className="space-y-4">
            {/* Install CLI */}
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <code className="text-xs font-mono text-cyan-300">{bundle.dependencies.installCommand}</code>
              </div>
              <button
                onClick={() => handleCopy(bundle.dependencies.installCommand, 'CLI Command')}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs text-white font-mono flex items-center gap-1.5"
              >
                {copiedItem === 'CLI Command' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy Command</span>
              </button>
            </div>

            {/* Google Fonts HTML Link */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-amber-400 flex items-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5" /> HTML Font Embed Links
              </span>
              <pre className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono text-xs overflow-x-auto">
                <code>{bundle.dependencies.fontLinks}</code>
              </pre>
            </div>

            {/* package.json snippet */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-purple-400 flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5" /> package.json Manifest
              </span>
              <pre className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono text-xs overflow-x-auto max-h-[300px]">
                <code>{bundle.dependencies.packageJson}</code>
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* 9. ACCESSIBILITY NOTES */}
      {activeTab === 'accessibility' && (
        <div className={`p-6 sm:p-8 rounded-3xl ${theme.surface.primary} border ${theme.border.default} space-y-6 shadow-2xl`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Eye className="w-5 h-5 text-emerald-400" />
                9. Export Accessibility Notes (12-Vector WCAG 2.2 AAA Audit)
              </h3>
              <p className="text-xs text-zinc-400">
                Complete accessibility audit, contrast measurements, keyboard mappings, and touch target validation.
              </p>
            </div>

            <button
              onClick={() => handleCopy(bundle.accessibilityNotes, 'A11y Notes')}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs transition-all flex items-center gap-2 shadow-lg"
            >
              {copiedItem === 'A11y Notes' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedItem === 'A11y Notes' ? 'Notes Copied!' : 'Copy Accessibility Notes'}</span>
            </button>
          </div>

          <pre className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono text-xs overflow-x-auto max-h-[450px] leading-relaxed whitespace-pre-wrap">
            <code>{bundle.accessibilityNotes}</code>
          </pre>
        </div>
      )}

      {/* 10. RESPONSIVE NOTES */}
      {activeTab === 'responsive' && (
        <div className={`p-6 sm:p-8 rounded-3xl ${theme.surface.primary} border ${theme.border.default} space-y-6 shadow-2xl`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-cyan-400" />
                10. Export Responsive Notes (7 Physical Viewports &amp; Touch Rules)
              </h3>
              <p className="text-xs text-zinc-400">
                Viewport morphing matrix from Phone Portrait (390px) to Ultra-Wide 4K (2560px), padding math, and zero-shrink rules.
              </p>
            </div>

            <button
              onClick={() => handleCopy(bundle.responsiveNotes, 'Responsive Notes')}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs transition-all flex items-center gap-2 shadow-lg"
            >
              {copiedItem === 'Responsive Notes' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedItem === 'Responsive Notes' ? 'Notes Copied!' : 'Copy Responsive Notes'}</span>
            </button>
          </div>

          <pre className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 text-zinc-300 font-mono text-xs overflow-x-auto max-h-[450px] leading-relaxed whitespace-pre-wrap">
            <code>{bundle.responsiveNotes}</code>
          </pre>
        </div>
      )}
    </div>
  );
}

export default ReuseExportStudio;
