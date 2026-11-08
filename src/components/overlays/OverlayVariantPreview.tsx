/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Shield,
  Layers,
  Code,
  Copy,
  Check,
  Zap,
  Sliders,
  Eye,
  Info,
  Maximize2,
  Terminal,
} from 'lucide-react';
import { CatalogEntry } from '../../design-system/catalog/catalogTypes';
import { InteractionModel, OverlayVisualTheme } from '../../design-system/overlay/overlayTypes';
import { INTERACTION_MODELS } from '../../design-system/overlay/interactionModels';
import {
  DropdownDemo,
  ContextMenuDemo,
  CommandPaletteDemo,
  TabsDemo,
  AnimatedTabsDemo,
  ModalDemo,
  AlertDialogDemo,
  DrawerDemo,
  SideSheetDemo,
  BottomSheetDemo,
  PopoverDemo,
  TooltipDemo,
  SpotlightTourDemo,
  LightboxDemo,
  PropertyInspectorDemo,
} from './OverlayComponents';
import { useSound } from '../../design-system/sound/SoundContext';
import { useHaptics } from '../../design-system/haptics/HapticContext';

interface OverlayVariantPreviewProps {
  entry: CatalogEntry;
  onOpenAiHandoff?: (entry: CatalogEntry) => void;
}

export function OverlayVariantPreview({ entry, onOpenAiHandoff }: OverlayVariantPreviewProps) {
  const [selectedModel, setSelectedModel] = useState<InteractionModel>('spring');
  const [selectedTheme, setSelectedTheme] = useState<OverlayVisualTheme>('glass');
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'aiprompt' | 'accessibility'>('preview');
  const [copiedCode, setCopiedCode] = useState(false);

  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();

  const currentModelInfo = INTERACTION_MODELS.find((m) => m.id === selectedModel) || INTERACTION_MODELS[0];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(entry.codeArtifact);
    setCopiedCode(true);
    playSound('SUCCESS');
    triggerHaptic('success');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Render the appropriate interactive demo based on component ID
  const renderInteractiveComponent = () => {
    switch (entry.id) {
      case 'overlay-dropdown':
        return <DropdownDemo visualTheme={selectedTheme} interactionModel={selectedModel} />;
      case 'overlay-context-menu':
        return <ContextMenuDemo visualTheme={selectedTheme} interactionModel={selectedModel} />;
      case 'overlay-command-palette':
        return <CommandPaletteDemo visualTheme={selectedTheme} interactionModel={selectedModel} />;
      case 'overlay-tabs':
        return <TabsDemo visualTheme={selectedTheme} />;
      case 'overlay-animated-tabs':
        return <AnimatedTabsDemo />;
      case 'overlay-modal':
        return <ModalDemo visualTheme={selectedTheme} interactionModel={selectedModel} />;
      case 'overlay-dialog':
        return <AlertDialogDemo visualTheme={selectedTheme} interactionModel={selectedModel} />;
      case 'overlay-drawer':
        return <DrawerDemo visualTheme={selectedTheme} interactionModel={selectedModel} />;
      case 'overlay-side-sheet':
        return <SideSheetDemo visualTheme={selectedTheme} />;
      case 'overlay-bottom-sheet':
        return <BottomSheetDemo visualTheme={selectedTheme} />;
      case 'overlay-popover':
        return <PopoverDemo visualTheme={selectedTheme} />;
      case 'overlay-tooltip':
        return <TooltipDemo />;
      case 'overlay-spotlight':
        return <SpotlightTourDemo />;
      case 'overlay-lightbox':
        return <LightboxDemo />;
      case 'overlay-inspector':
        return <PropertyInspectorDemo visualTheme={selectedTheme} />;
      default:
        return <DropdownDemo visualTheme={selectedTheme} interactionModel={selectedModel} />;
    }
  };

  return (
    <div className="w-full rounded-3xl bg-zinc-950 border border-zinc-800 p-6 space-y-6 shadow-2xl">
      {/* Component Title & Metadata Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-zinc-800">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-cyan-950 text-cyan-300 border border-cyan-800">
              {entry.family}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-emerald-950 text-emerald-300 border border-emerald-800">
              WCAG {entry.accessibility}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-purple-950 text-purple-300 border border-purple-800">
              {entry.performanceTier}
            </span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">{entry.name}</h2>
          <p className="text-xs text-zinc-400 max-w-2xl">{entry.description}</p>
        </div>

        {/* AI Handoff & Code Buttons */}
        <div className="flex items-center gap-2">
          {onOpenAiHandoff && (
            <button
              type="button"
              onClick={() => onOpenAiHandoff(entry)}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>AI Handoff Spec</span>
            </button>
          )}
          <button
            type="button"
            onClick={handleCopyCode}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 flex items-center gap-1.5 transition-colors"
          >
            {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
            <span>{copiedCode ? 'Copied' : 'Copy JSX'}</span>
          </button>
        </div>
      </div>

      {/* Laboratory Control Knobs: Interaction Models & Visual Themes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800">
        {/* Interaction Model Selector */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              Interaction & Animation Physics (11 Models)
            </span>
            <span className="text-[10px] font-mono text-cyan-400">{currentModelInfo.physicsTag}</span>
          </label>
          <div className="flex flex-wrap gap-1.5">
            {INTERACTION_MODELS.map((model) => (
              <button
                key={model.id}
                type="button"
                onClick={() => {
                  setSelectedModel(model.id);
                  playSound('SWITCH');
                  triggerHaptic('light');
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                  selectedModel === model.id
                    ? 'bg-cyan-500 text-black font-bold shadow-md'
                    : 'bg-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-750'
                }`}
              >
                {model.id}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-zinc-400 italic mt-1">{currentModelInfo.description}</p>
        </div>

        {/* Visual Theme Selector */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-purple-400" />
            Visual Style Archetype (5 Themes)
          </label>
          <div className="flex flex-wrap gap-1.5">
            {(['glass', 'cyberpunk', 'minimalist', 'brutalist', 'ambient'] as OverlayVisualTheme[]).map((theme) => (
              <button
                key={theme}
                type="button"
                onClick={() => {
                  setSelectedTheme(theme);
                  playSound('SWITCH');
                  triggerHaptic('light');
                }}
                className={`px-3 py-1 rounded-lg text-[11px] font-semibold capitalize transition-all ${
                  selectedTheme === theme
                    ? 'bg-purple-600 text-white font-bold shadow-md'
                    : 'bg-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-750'
                }`}
              >
                {theme}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-zinc-400 italic mt-1">
            Current: <strong className="capitalize text-zinc-200">{selectedTheme}</strong> — {entry.lightingStyle}
          </p>
        </div>
      </div>

      {/* Tabs: Interactive Preview vs Source Code vs Accessibility Matrix */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
          {(['preview', 'code', 'aiprompt', 'accessibility'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setActiveTab(tab);
                playSound('SWITCH');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors ${
                activeTab === tab
                  ? 'bg-zinc-800 text-white border border-zinc-700'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {tab === 'aiprompt' ? 'AI Spec' : tab}
            </button>
          ))}
        </div>

        {/* Tab 1: Live Interactive Canvas */}
        {activeTab === 'preview' && (
          <div className="relative min-h-[320px] rounded-2xl bg-zinc-950/80 border border-zinc-800 p-8 flex flex-col items-center justify-center overflow-hidden">
            {/* Background grid pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

            <div className="relative z-10 w-full flex flex-col items-center justify-center">
              {renderInteractiveComponent()}
            </div>
          </div>
        )}

        {/* Tab 2: Code Viewer */}
        {activeTab === 'code' && (
          <div className="relative rounded-2xl bg-zinc-950 border border-zinc-800 p-4 font-mono text-xs text-cyan-300 overflow-x-auto">
            <pre>{entry.codeArtifact}</pre>
          </div>
        )}

        {/* Tab 3: AI Prompt Specification */}
        {activeTab === 'aiprompt' && (
          <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-800/50 text-xs text-purple-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-purple-300">
              <Sparkles className="w-4 h-4" />
              <span>Prompt for Agent Code Generation</span>
            </div>
            <p className="leading-relaxed font-mono text-[11px] bg-black/50 p-3 rounded-xl border border-purple-900/50">
              {entry.aiSpecification}
            </p>
          </div>
        )}

        {/* Tab 4: Accessibility Matrix */}
        {activeTab === 'accessibility' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-1">
              <span className="text-[10px] uppercase font-mono text-zinc-400">ARIA Compliance</span>
              <p className="text-xs font-bold text-emerald-400">Level {entry.accessibility} Certified</p>
              <p className="text-[11px] text-zinc-400">Full keyboard trapping, arrow cycling, role linkage.</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-1">
              <span className="text-[10px] uppercase font-mono text-zinc-400">Interaction Gestures</span>
              <p className="text-xs font-bold text-cyan-400">{entry.interactionStyle}</p>
              <p className="text-[11px] text-zinc-400">LIFO stack dismissal and focus restoration on unmount.</p>
            </div>
            <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-1">
              <span className="text-[10px] uppercase font-mono text-zinc-400">Collision Detection</span>
              <p className="text-xs font-bold text-purple-400">{entry.responsiveBehavior}</p>
              <p className="text-[11px] text-zinc-400">Auto-flips boundary quadrants on viewport edges.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
