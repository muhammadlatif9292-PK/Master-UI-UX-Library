/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useTheme } from '../design-system/tokens/ThemeContext';
import { useSound } from '../design-system/sound/SoundContext';
import { useHaptics } from '../design-system/haptics/HapticContext';
import { DesignArchetype } from '../types/architecture';
import { MASTER_STYLE_VOCABULARY, StyleVocabularyEntry } from '../design-system/archetypes/styleVocabularyData';
import { ARCHETYPE_TOKENS } from '../design-system/tokens';
import { motion, AnimatePresence } from 'motion/react';
import {
  Palette,
  Sparkles,
  Type,
  Sun,
  Zap,
  MousePointerClick,
  Volume2,
  Vibrate,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Layers,
  Compass,
  Code2,
  Maximize2,
  Copy,
  Check,
  Eye,
  Sliders,
  Box,
} from 'lucide-react';

const ARCHETYPE_KEYS: DesignArchetype[] = [
  'restrained-luxury',
  'cinematic-dark',
  'futuristic-cyber',
  'scientific-lab',
  'neumorphic-glass',
  'mechanical-tactile',
  'brutalist-grid',
  'editorial-serif',
  'minimal-monastic',
  'biomorphic-organic',
  'retro-computing',
  'ai-character',
];

export function StyleExplorer() {
  const { theme } = useTheme();
  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();

  const [selectedArchetype, setSelectedArchetype] = useState<DesignArchetype>('restrained-luxury');
  const [activeTab, setActiveTab] = useState<'overview' | 'tokens' | 'typography' | 'motion' | 'sound' | 'fits' | 'specimen'>('overview');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Live Specimen Interactive State Controls
  const [specimenState, setSpecimenState] = useState<'idle' | 'hover' | 'loading' | 'success' | 'error' | 'disabled'>('idle');
  const [specimenValue, setSpecimenValue] = useState<string>('Production Data Stream');

  const activeStyle: StyleVocabularyEntry = MASTER_STYLE_VOCABULARY[selectedArchetype];
  const tokenPalette = ARCHETYPE_TOKENS[selectedArchetype];

  const handleSelectStyle = (id: DesignArchetype) => {
    setSelectedArchetype(id);
    playSound('click', 'SURFACE');
    triggerHaptic('selection');
  };

  const handleTriggerSpecimenAction = (type: 'success' | 'error' | 'loading') => {
    setSpecimenState(type);
    if (type === 'success') {
      playSound('success', 'STATE');
      triggerHaptic('success');
    } else if (type === 'error') {
      playSound('error', 'STATE');
      triggerHaptic('error');
    }
    setTimeout(() => {
      setSpecimenState('idle');
    }, 2500);
  };

  const handleCopyTokens = () => {
    const tokenExport = JSON.stringify(tokenPalette, null, 2);
    navigator.clipboard.writeText(tokenExport);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className={`min-h-screen ${theme.bg.canvas} ${theme.text.primary} font-sans space-y-8 p-6 md:p-10 max-w-7xl mx-auto`}>
      {/* Header Banner */}
      <div className={`p-8 rounded-3xl ${theme.surface.primary} border ${theme.border.default} shadow-2xl space-y-4 relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-2">
              <Compass className="w-3.5 h-3.5 animate-pulse" /> Master Style Vocabulary Studio (12 Design Archetypes)
            </div>
            <h1 className="text-2xl md:text-4xl font-bold tracking-tight">Style Explorer</h1>
            <p className="text-xs md:text-sm opacity-75 mt-1 max-w-2xl leading-relaxed">
              Understand what a design archetype means before applying it. Explore mood, design intent, materials, typography, lighting, motion, interaction, sound synthesis, component fits, and poor-fit semantic warnings.
            </p>
          </div>

          <button
            onClick={handleCopyTokens}
            className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20 shrink-0 font-mono"
          >
            {copiedCode ? <Check className="w-4 h-4 stroke-[3]" /> : <Copy className="w-4 h-4" />}
            <span>{copiedCode ? 'Tokens Copied!' : 'Export Style Tokens JSON'}</span>
          </button>
        </div>

        {/* Style Selector Grid / Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-4 border-t border-white/10 relative z-10">
          {ARCHETYPE_KEYS.map((id) => {
            const style = MASTER_STYLE_VOCABULARY[id];
            const isSelected = selectedArchetype === id;
            return (
              <button
                key={id}
                onClick={() => handleSelectStyle(id)}
                className={`p-3 rounded-2xl text-left transition-all border font-mono flex flex-col justify-between h-20 ${
                  isSelected
                    ? 'bg-cyan-500 text-zinc-950 border-cyan-400 font-bold shadow-xl scale-[1.02] ring-2 ring-cyan-400/50'
                    : 'bg-black/30 hover:bg-white/10 border-white/10 text-zinc-300 hover:text-white'
                }`}
              >
                <div className="text-[11px] font-bold truncate">{style.name}</div>
                <div className={`text-[9px] line-clamp-1 opacity-80 font-sans ${isSelected ? 'text-zinc-900' : 'text-zinc-400'}`}>
                  {style.materials[0]}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Active Archetype Detail Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Archetype Vocabulary Overview & Dimensions (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Main Title Banner for Selected Archetype */}
          <div className={`p-8 rounded-3xl ${tokenPalette.surfacePrimary} border ${tokenPalette.borderDefault} ${tokenPalette.accentGlow} space-y-4 relative overflow-hidden transition-all duration-300`}>
            <div className="flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold uppercase border ${tokenPalette.borderDefault} ${tokenPalette.accentPrimary}`}>
                {activeStyle.id}
              </span>
              <span className="text-xs font-mono opacity-70">10-Vector Style Specification</span>
            </div>

            <div>
              <h2 className={`text-2xl md:text-3xl font-bold tracking-tight ${tokenPalette.textPrimary}`} style={{ fontFamily: activeStyle.typographyTendency.titleFont }}>
                {activeStyle.name}
              </h2>
              <p className={`text-xs font-mono mt-1 ${tokenPalette.accentPrimary}`}>{activeStyle.subtitle}</p>
            </div>

            {/* Mood & Design Intent */}
            <div className="space-y-3 pt-2 border-t border-white/10">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase font-bold text-cyan-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Archetype Mood
                </span>
                <p className="text-xs leading-relaxed opacity-90">{activeStyle.mood}</p>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase font-bold text-cyan-400 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5" /> Architectural Rationale &amp; Design Intent
                </span>
                <p className="text-xs leading-relaxed opacity-80 font-sans">{activeStyle.designIntent}</p>
              </div>
            </div>

            {/* Materials Cloud */}
            <div className="pt-2">
              <span className="text-[10px] font-mono uppercase font-bold opacity-70 block mb-2">Tactile Surface Materials:</span>
              <div className="flex flex-wrap gap-2 font-mono text-xs">
                {activeStyle.materials.map((mat, i) => (
                  <span key={i} className="px-3 py-1 rounded-xl bg-black/40 border border-white/10 text-zinc-200">
                    {mat}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Section Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-white/10 pb-3 overflow-x-auto font-mono">
            {[
              { id: 'overview', label: '1. Tokens & Color Architecture', icon: Palette },
              { id: 'typography', label: '2. Typography & Scale', icon: Type },
              { id: 'motion', label: '3. Motion, Lighting & Physics', icon: Zap },
              { id: 'sound', label: '4. Sound & Haptics Signature', icon: Volume2 },
              { id: 'fits', label: '5. Best Fits & Poor-Fit Warnings', icon: ShieldAlert },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-2 rounded-xl text-xs flex items-center gap-2 transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-cyan-500 text-zinc-950 font-bold shadow-md'
                      : 'bg-black/40 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab 1: Tokens & Color Architecture */}
          {activeTab === 'overview' && (
            <div className={`p-6 md:p-8 rounded-3xl ${theme.surface.primary} border ${theme.border.default} space-y-6 shadow-xl`}>
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                  <Palette className="w-4 h-4 text-cyan-400" /> Color Architecture &amp; Contrast Audit
                </h3>
                <span className="text-xs font-mono opacity-60">WCAG AAA/AA Compliant Swatches</span>
              </div>

              {/* Swatch Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeStyle.colorsTokens.map((token, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-3 font-mono">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-8 h-8 rounded-xl border border-white/20 shadow-inner shrink-0"
                          style={{ backgroundColor: token.hex }}
                        />
                        <div>
                          <div className="font-bold text-xs text-white">{token.name}</div>
                          <div className="text-[10px] text-zinc-400">{token.hex}</div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 text-[10px] border border-cyan-500/30">
                        {token.contrastRatio}
                      </span>
                    </div>

                    <div className="text-[10px] text-zinc-400 pt-1 border-t border-zinc-800 flex items-center justify-between">
                      <span>Role: {token.role}</span>
                      <span className="text-zinc-500">{token.cssVar}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Typography & Scale */}
          {activeTab === 'typography' && (
            <div className={`p-6 md:p-8 rounded-3xl ${theme.surface.primary} border ${theme.border.default} space-y-6 shadow-xl`}>
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                  <Type className="w-4 h-4 text-cyan-400" /> Typographic Tendency &amp; Hierarchy Rules
                </h3>
                <span className="text-xs font-mono opacity-60">Scale Ratio &amp; Case Policies</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-2">
                  <span className="text-[10px] text-cyan-400 uppercase font-bold block">Display Title Font</span>
                  <p className="text-base font-bold text-white">{activeStyle.typographyTendency.titleFont}</p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-2">
                  <span className="text-[10px] text-cyan-400 uppercase font-bold block">Body &amp; Input Copy</span>
                  <p className="text-base font-bold text-white">{activeStyle.typographyTendency.bodyFont}</p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-2">
                  <span className="text-[10px] text-cyan-400 uppercase font-bold block">Step Scale &amp; Tracking</span>
                  <p className="text-xs text-zinc-200">{activeStyle.typographyTendency.scale}</p>
                  <p className="text-[10px] text-zinc-400">{activeStyle.typographyTendency.tracking}</p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-2">
                  <span className="text-[10px] text-cyan-400 uppercase font-bold block">Case Transformation Rule</span>
                  <p className="text-xs text-zinc-200">{activeStyle.typographyTendency.caseRule}</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-xs font-sans text-cyan-200 leading-relaxed">
                <strong>Typographic Rationale:</strong> {activeStyle.typographyTendency.description}
              </div>
            </div>
          )}

          {/* Tab 3: Motion, Lighting & Physics */}
          {activeTab === 'motion' && (
            <div className={`p-6 md:p-8 rounded-3xl ${theme.surface.primary} border ${theme.border.default} space-y-6 shadow-xl`}>
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                  <Zap className="w-4 h-4 text-cyan-400" /> Motion Tendency, Lighting &amp; Physics Profile
                </h3>
                <span className="text-xs font-mono opacity-60">Spring Parameters &amp; Specular Edges</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                {/* Lighting Specification */}
                <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-3">
                  <span className="text-xs font-bold text-cyan-400 flex items-center gap-2 uppercase">
                    <Sun className="w-4 h-4" /> Lighting &amp; Elevation
                  </span>
                  <div className="space-y-1.5 text-[11px] text-zinc-300">
                    <div><strong>Ambient Glow:</strong> {activeStyle.lighting.ambientGlow}</div>
                    <div><strong>Specular Edge:</strong> {activeStyle.lighting.specularEdge}</div>
                    <div><strong>Shadow Depth:</strong> {activeStyle.lighting.shadowType}</div>
                    <div><strong>Blur Level:</strong> {activeStyle.lighting.blurDepth}</div>
                  </div>
                </div>

                {/* Motion Specification */}
                <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-3">
                  <span className="text-xs font-bold text-cyan-400 flex items-center gap-2 uppercase">
                    <Zap className="w-4 h-4" /> Motion &amp; Spring Physics
                  </span>
                  <div className="space-y-1.5 text-[11px] text-zinc-300">
                    <div><strong>Physics Profile:</strong> {activeStyle.motionTendency.physicsProfile}</div>
                    <div><strong>Spring Parameters:</strong> {activeStyle.motionTendency.springParams}</div>
                    <div><strong>Duration:</strong> {activeStyle.motionTendency.duration}</div>
                    <div><strong>Easing:</strong> {activeStyle.motionTendency.easing}</div>
                  </div>
                </div>
              </div>

              {/* Interaction Tendency */}
              <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-3 font-mono text-xs">
                <span className="text-xs font-bold text-cyan-400 flex items-center gap-2 uppercase">
                  <MousePointerClick className="w-4 h-4" /> Interaction &amp; Cursor Behaviors
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-zinc-300">
                  <div><strong>Press Feedback:</strong> {activeStyle.interactionTendency.pressFeedback}</div>
                  <div><strong>Cursor Effect:</strong> {activeStyle.interactionTendency.cursorEffect}</div>
                  <div><strong>Hover Shift:</strong> {activeStyle.interactionTendency.hoverTransform}</div>
                  <div><strong>Active Focus:</strong> {activeStyle.interactionTendency.activeState}</div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Sound & Haptics Signature */}
          {activeTab === 'sound' && (
            <div className={`p-6 md:p-8 rounded-3xl ${theme.surface.primary} border ${theme.border.default} space-y-6 shadow-xl`}>
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-cyan-400" /> Multi-Sensory Sound &amp; Haptic Signature
                </h3>
                <span className="text-xs font-mono opacity-60">Procedural Synthesis Triggers</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                {/* Sound Synthesis */}
                <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-cyan-400 flex items-center gap-2 uppercase">
                      <Volume2 className="w-4 h-4" /> Sound Synthesis
                    </span>
                    <button
                      onClick={() => playSound('success', 'STATE')}
                      className="px-3 py-1 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-[10px] transition-all flex items-center gap-1"
                    >
                      <Volume2 className="w-3 h-3" /> Test Tone
                    </button>
                  </div>
                  <div className="space-y-1.5 text-[11px] text-zinc-300">
                    <div><strong>Tone Type:</strong> {activeStyle.soundTendency.toneType}</div>
                    <div><strong>Frequency:</strong> {activeStyle.soundTendency.frequency}</div>
                    <div><strong>Waveform:</strong> {activeStyle.soundTendency.waveform}</div>
                    <div className="text-zinc-400 font-sans text-xs pt-1">{activeStyle.soundTendency.description}</div>
                  </div>
                </div>

                {/* Haptics */}
                <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-400 flex items-center gap-2 uppercase">
                      <Vibrate className="w-4 h-4" /> Haptic Vibration
                    </span>
                    <button
                      onClick={() => triggerHaptic('success')}
                      className="px-3 py-1 rounded-lg bg-purple-500 hover:bg-purple-400 text-zinc-950 font-bold text-[10px] transition-all flex items-center gap-1"
                    >
                      <Vibrate className="w-3 h-3" /> Test Vibration
                    </button>
                  </div>
                  <div className="space-y-1.5 text-[11px] text-zinc-300">
                    <div><strong>Pattern Name:</strong> {activeStyle.hapticTendency.patternName}</div>
                    <div><strong>Vibration Pattern:</strong> {activeStyle.hapticTendency.vibrationMs}</div>
                    <div className="text-zinc-400 font-sans text-xs pt-1">{activeStyle.hapticTendency.description}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 5: Best Fits & Poor-Fit Warnings */}
          {activeTab === 'fits' && (
            <div className={`p-6 md:p-8 rounded-3xl ${theme.surface.primary} border ${theme.border.default} space-y-6 shadow-xl`}>
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="font-bold text-sm uppercase tracking-wider flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-cyan-400" /> Best Component Fits &amp; Poor-Fit Warnings
                </h3>
                <span className="text-xs font-mono opacity-60">Semantic Guidance &amp; Safeguards</span>
              </div>

              {/* Best Fits */}
              <div className="space-y-3 font-mono text-xs">
                <span className="text-xs font-bold text-emerald-400 uppercase flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Recommended Ideal Component Fits
                </span>
                <div className="grid grid-cols-1 gap-2.5">
                  {activeStyle.bestComponentFits.map((fit, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                      <div>
                        <strong className="font-bold text-white block">{fit.name}</strong>
                        <span className="text-[11px] opacity-80 font-sans">{fit.rationale}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Poor-Fit Warnings */}
              <div className="space-y-3 font-mono text-xs pt-4 border-t border-white/10">
                <span className="text-xs font-bold text-rose-400 uppercase flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" /> Poor Semantic Fit Warnings (Do Not Apply Here)
                </span>
                <div className="grid grid-cols-1 gap-2.5">
                  {activeStyle.poorFitWarnings.map((warn, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-200 flex items-start gap-3">
                      <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                      <div>
                        <div className="flex items-center gap-2">
                          <strong className="font-bold text-white">{warn.context}</strong>
                          <span className="text-[9px] uppercase px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold border border-rose-500/40">
                            {warn.severity} warning
                          </span>
                        </div>
                        <span className="text-[11px] opacity-80 font-sans block mt-1">{warn.warningText}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Live Interactive Rendered Specimen Stage (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className={`p-6 rounded-3xl ${theme.surface.primary} border ${theme.border.default} space-y-5 shadow-2xl sticky top-20`}>
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <Eye className="w-4 h-4 text-cyan-400" /> Live Interactive Specimen
                </h3>
                <p className="text-[10px] text-zinc-400 font-mono">Rendered with {activeStyle.name} tokens</p>
              </div>

              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 uppercase">
                Interactive
              </span>
            </div>

            {/* State Trigger Toolbar */}
            <div className="space-y-2 font-mono text-[10px]">
              <span className="text-zinc-400 uppercase font-bold block">Simulate Component State:</span>
              <div className="grid grid-cols-3 gap-1.5">
                {(['idle', 'loading', 'success', 'error'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleTriggerSpecimenAction(st as any)}
                    className={`py-1.5 px-2 rounded-lg font-bold uppercase transition-all ${
                      specimenState === st
                        ? 'bg-cyan-500 text-zinc-950 shadow-md'
                        : 'bg-black/40 border border-white/10 text-zinc-300 hover:text-white'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Rendered Live Component Specimen Box */}
            <div className="p-4 rounded-2xl bg-black/60 border border-zinc-800 flex items-center justify-center min-h-[300px]">
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className={`w-full p-6 rounded-3xl ${tokenPalette.surfacePrimary} border ${tokenPalette.borderDefault} ${tokenPalette.accentGlow} space-y-4 shadow-2xl relative overflow-hidden`}
              >
                {/* Specular Rim Light */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border ${tokenPalette.borderDefault} ${tokenPalette.accentPrimary}`}>
                    {activeStyle.id}
                  </span>
                  <Sparkles className={`w-4 h-4 ${tokenPalette.accentPrimary}`} />
                </div>

                <div className="space-y-1">
                  <h4 className={`text-base font-bold ${tokenPalette.textPrimary}`} style={{ fontFamily: activeStyle.typographyTendency.titleFont }}>
                    {activeStyle.name} Specimen
                  </h4>
                  <p className={`text-[11px] ${tokenPalette.textSecondary} font-mono`}>{activeStyle.materials[0]}</p>
                </div>

                {/* Input Field Simulation */}
                <div className="space-y-1 font-mono text-[10px]">
                  <label className="text-zinc-400 uppercase font-bold block">Input Field</label>
                  <input
                    type="text"
                    value={specimenValue}
                    onChange={(e) => setSpecimenValue(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white focus:outline-none focus:border-cyan-400 text-xs"
                  />
                </div>

                {/* Feedback Messages */}
                {specimenState === 'success' && (
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px] flex items-center gap-2 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Action completed successfully!</span>
                  </div>
                )}

                {specimenState === 'error' && (
                  <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-[10px] flex items-center gap-2 font-mono">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                    <span>Error detected in parameters!</span>
                  </div>
                )}

                {/* Primary Action Button */}
                <button
                  onClick={() => handleTriggerSpecimenAction('success')}
                  className={`w-full py-2.5 px-3 rounded-xl font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all shadow-lg ${
                    specimenState === 'loading' ? 'bg-cyan-500/50 text-white cursor-wait' : 'bg-cyan-500 hover:bg-cyan-400 text-zinc-950'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{specimenState === 'loading' ? 'Processing...' : 'Execute Action'}</span>
                </button>
              </motion.div>
            </div>

            {/* Quick Summary Metadata */}
            <div className="p-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-1.5 font-mono text-[10px] text-zinc-400">
              <div className="flex items-center justify-between">
                <span>Title Font:</span>
                <span className="text-white font-bold">{activeStyle.typographyTendency.titleFont.split('/')[0]}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Sound Signature:</span>
                <span className="text-white font-bold">{activeStyle.soundTendency.toneType.split('&')[0]}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Haptic Pulse:</span>
                <span className="text-white font-bold">{activeStyle.hapticTendency.patternName}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
