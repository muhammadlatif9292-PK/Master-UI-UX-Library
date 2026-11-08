/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ANIMATION_PROVENANCE_REGISTRY } from '../../design-system/provenance/animationProvenanceRegistry';
import { AnimationProvenanceMetadata } from '../../design-system/provenance/provenanceTypes';
import { ProvenanceBadge } from './ProvenanceBadge';
import {
  Play,
  RotateCcw,
  Sparkles,
  Activity,
  Layers,
  Scale,
  Building,
  FileText,
  ExternalLink,
  Code,
  Zap,
} from 'lucide-react';

export const AnimationAssetInspector: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState<string>('spring');
  const [animationTick, setAnimationTick] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'interactive' | 'physics' | 'licensing'>('interactive');

  const animationKeys = Object.keys(ANIMATION_PROVENANCE_REGISTRY);
  const currentMeta: AnimationProvenanceMetadata = ANIMATION_PROVENANCE_REGISTRY[selectedKey] || ANIMATION_PROVENANCE_REGISTRY['spring'];

  const triggerReplay = () => {
    setAnimationTick((prev) => prev + 1);
  };

  // Live specimen dynamic styling based on selected motion key
  const getAnimationPreviewStyles = () => {
    switch (selectedKey) {
      case 'fade':
        return 'animate-[pulse_1.5s_ease-in-out_infinite]';
      case 'bounce':
        return 'animate-bounce';
      case 'glow':
        return 'animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite] shadow-2xl shadow-cyan-500/80 border-cyan-400';
      case 'orbit':
        return 'animate-[spin_4s_linear_infinite]';
      case 'elastic':
        return 'hover:scale-125 transition-transform duration-300 ease-[cubic-bezier(0.68,-0.6,0.32,1.6)]';
      default:
        return 'hover:scale-110 active:scale-95 transition-all duration-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="p-6 rounded-3xl bg-zinc-900/80 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono mb-2">
            <Activity className="w-3.5 h-3.5 animate-pulse" /> Animation Asset Provenance & Licensing Registry
          </div>
          <h2 className="text-xl md:text-2xl font-bold font-mono text-white">Motion Primitives & Physics Engines</h2>
          <p className="text-xs md:text-sm text-zinc-400 font-mono mt-1">
            Every animation asset carries full math specifications, engine dependencies, and upstream license metadata.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={triggerReplay}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold font-mono text-xs shadow-lg shadow-cyan-500/20 transition-all active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Replay Motion</span>
          </button>
        </div>
      </div>

      {/* Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {animationKeys.map((key) => {
          const isSelected = selectedKey === key;
          const meta = ANIMATION_PROVENANCE_REGISTRY[key];
          return (
            <button
              key={key}
              onClick={() => {
                setSelectedKey(key);
                triggerReplay();
              }}
              className={`px-3.5 py-2 rounded-2xl text-xs font-mono shrink-0 transition-all flex items-center gap-2 border ${
                isSelected
                  ? 'bg-purple-600 border-purple-400 text-white font-bold shadow-lg shadow-purple-500/30'
                  : 'bg-zinc-900/60 border-white/10 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              <Zap className="w-3 h-3 text-cyan-400" />
              <span className="uppercase">{key}</span>
              <span className="text-[10px] opacity-70">({meta.license})</span>
            </button>
          );
        })}
      </div>

      {/* Main Two-Column Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Visual Animation Stage */}
        <div className="lg:col-span-6 p-8 rounded-3xl bg-zinc-950 border border-white/10 flex flex-col justify-between min-h-[380px] relative overflow-hidden">
          {/* Background Grid Accent */}
          <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

          {/* Top Bar */}
          <div className="flex items-center justify-between relative z-10">
            <span className="text-xs font-mono text-zinc-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Interactive Specimen Stage</span>
            </span>
            <ProvenanceBadge type={currentMeta.provenanceType} size="sm" />
          </div>

          {/* Center Visual Specimen */}
          <div key={animationTick} className="my-auto py-10 flex flex-col items-center justify-center relative z-10">
            <div
              className={`p-6 md:p-8 rounded-3xl bg-gradient-to-br from-cyan-500/20 to-purple-600/30 border border-cyan-500/40 text-center cursor-pointer shadow-xl ${getAnimationPreviewStyles()}`}
              onClick={triggerReplay}
            >
              <div className="w-14 h-14 mx-auto rounded-2xl bg-cyan-500/30 border border-cyan-400/50 flex items-center justify-center text-cyan-300 mb-3 shadow-inner">
                <Activity className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold font-mono text-white capitalize">{selectedKey} Dynamics</h4>
              <p className="text-xs text-cyan-300 font-mono mt-1">{currentMeta.animationType}</p>
            </div>
            <p className="text-[11px] font-mono text-zinc-500 mt-4">
              Click specimen or Replay button to trigger transition cycle.
            </p>
          </div>

          {/* Bottom Telemetry Bar */}
          <div className="flex items-center justify-between text-xs font-mono p-3 rounded-xl bg-black/60 border border-white/5 relative z-10 text-zinc-400">
            <span>Target: <strong className="text-emerald-400">{currentMeta.fpsTarget || 60} FPS</strong></span>
            <span>Engine: <strong className="text-cyan-300">{currentMeta.engine}</strong></span>
          </div>
        </div>

        {/* Right Column: Licensing, Physics & Specification Matrix */}
        <div className="lg:col-span-6 space-y-4">
          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-zinc-900 border border-white/10">
            <button
              onClick={() => setActiveTab('interactive')}
              className={`flex-1 py-2 rounded-xl text-xs font-mono transition-all ${
                activeTab === 'interactive' ? 'bg-cyan-500 text-zinc-950 font-bold shadow' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Overview & Notes
            </button>
            <button
              onClick={() => setActiveTab('physics')}
              className={`flex-1 py-2 rounded-xl text-xs font-mono transition-all ${
                activeTab === 'physics' ? 'bg-cyan-500 text-zinc-950 font-bold shadow' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Physics Math Spec
            </button>
            <button
              onClick={() => setActiveTab('licensing')}
              className={`flex-1 py-2 rounded-xl text-xs font-mono transition-all ${
                activeTab === 'licensing' ? 'bg-cyan-500 text-zinc-950 font-bold shadow' : 'text-zinc-400 hover:text-white'
              }`}
            >
              License & Attribution
            </button>
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'interactive' && (
            <div className="p-6 rounded-3xl bg-zinc-900/70 border border-white/10 space-y-4 text-xs font-mono">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-zinc-400">Animation Primitive:</span>
                <span className="text-white font-bold text-sm uppercase">{selectedKey}</span>
              </div>

              <div className="space-y-1">
                <span className="text-zinc-400 block font-bold text-[10px] uppercase">Mathematical Formulation:</span>
                <p className="text-cyan-300 font-semibold">{currentMeta.animationType}</p>
              </div>

              <div className="space-y-1">
                <span className="text-zinc-400 block font-bold text-[10px] uppercase">Implementation Notes:</span>
                <p className="text-zinc-300 leading-relaxed p-3 rounded-xl bg-black/40 border border-white/5">
                  {currentMeta.notes}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-zinc-500 block text-[10px]">Source Concept:</span>
                  <span className="text-white font-medium break-words">{currentMeta.source}</span>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-zinc-500 block text-[10px]">Author / Vendor:</span>
                  <span className="text-white font-medium">{currentMeta.authorVendor || 'Project Team'}</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Physics Math */}
          {activeTab === 'physics' && (
            <div className="p-6 rounded-3xl bg-zinc-900/70 border border-white/10 space-y-4 text-xs font-mono">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase text-[10px]">
                  <Code className="w-3.5 h-3.5" />
                  <span>Exact Timing & Physics Parameter Declaration</span>
                </div>
                <pre className="p-4 rounded-2xl bg-black/80 border border-cyan-500/30 text-cyan-300 overflow-x-auto">
                  {currentMeta.timingSpec || '// Standard CSS transition'}
                </pre>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
                <span className="text-zinc-400 block font-bold text-[10px] uppercase">Runtime Engine Pipeline:</span>
                <p className="text-zinc-300">{currentMeta.engine}</p>
                <span className="text-[11px] text-zinc-500 block">
                  Hardware accelerated via GPU compositor layers and automatically paused by <code className="text-amber-400">usePreventIdleLoop</code> on inactive tabs.
                </span>
              </div>
            </div>
          )}

          {/* Tab 3: Licensing & Attribution */}
          {activeTab === 'licensing' && (
            <div className="p-6 rounded-3xl bg-zinc-900/70 border border-white/10 space-y-4 text-xs font-mono">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-zinc-500 block text-[10px] uppercase font-bold">License:</span>
                  <span className="text-amber-300 font-bold text-sm">{currentMeta.license}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <span className="text-zinc-500 block text-[10px] uppercase font-bold">Attribution Requirement:</span>
                  <span className="text-emerald-300 font-semibold">{currentMeta.attributionRequirement}</span>
                </div>
              </div>

              {currentMeta.licenseUrl && (
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                  <span className="text-zinc-400">Upstream License URL:</span>
                  <a
                    href={currentMeta.licenseUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 underline"
                  >
                    <span>View License</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}

              <div className="space-y-2 pt-1">
                <span className="text-zinc-400 block font-bold text-[10px] uppercase">Catalog Entry JSDoc Metadata:</span>
                <pre className="p-3 rounded-xl bg-black/80 border border-white/10 text-[11px] text-zinc-300 whitespace-pre">
{`/**
 * @animationPrimitive ${selectedKey}
 * @mathModel ${currentMeta.animationType}
 * @engine ${currentMeta.engine}
 * @license ${currentMeta.license}
 * @provenance ${currentMeta.provenanceType}
 */`}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
