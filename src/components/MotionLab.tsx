/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useMotion } from '../design-system/motion/MotionContext';
import { MotionPrimitive, MotionPreset, MotionIntensityLevel } from '../design-system/motion/motionTypes';
import { getMotionPrimitiveVariants, MOTION_PRESETS } from '../design-system/motion/motionSystem';
import { Zap, Play, RotateCcw, Code, Sliders, Shield, Sparkles, Layers } from 'lucide-react';

const ALL_PRIMITIVES: MotionPrimitive[] = [
  'fade', 'slide', 'scale', 'spring', 'bounce', 'elastic', 'morph', 'glow',
  'blur', 'float', 'pulse', 'shake', 'reveal', 'collapse', 'expand', 'orbit',
  'parallax', 'magnetic', 'liquid', 'ripple', 'snap', 'dissolve', 'gather', 'scatter'
];

const ALL_PRESETS: MotionPreset[] = [
  'instant', 'subtle', 'soft', 'fluid', 'spring', 'elastic', 'expressive', 'cinematic', 'hero'
];

export function MotionLab() {
  const { intensity, setIntensity, defaultPreset, setDefaultPreset, reducedMotion, setReducedMotion } = useMotion();

  const [selectedPrimitive, setSelectedPrimitive] = useState<MotionPrimitive>('spring');
  const [selectedPreset, setSelectedPreset] = useState<MotionPreset>('fluid');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [keyTrigger, setKeyTrigger] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

  const variants = getMotionPrimitiveVariants(selectedPrimitive, selectedPreset, intensity, reducedMotion);

  const handleTriggerReplay = () => {
    setIsPlaying(false);
    setKeyTrigger((prev) => prev + 1);
    setTimeout(() => setIsPlaying(true), 50);
  };

  const codeSnippet = `import { motion } from 'motion/react';
import { getMotionPrimitiveVariants } from '@/design-system/motion/motionSystem';

// Using primitive: '${selectedPrimitive}' with preset: '${selectedPreset}' at intensity: ${intensity}
const variants = getMotionPrimitiveVariants('${selectedPrimitive}', '${selectedPreset}', ${intensity}, ${reducedMotion});

export function AnimatedComponent() {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      whileHover="hover"
      className="p-6 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-white"
    >
      Motion Primitive Component
    </motion.div>
  );
}`;

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-zinc-100 flex flex-col font-sans selection:bg-cyan-500/30">
      {/* Top Controls Header */}
      <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-50 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-cyan-500/20 to-purple-600/20 rounded-xl border border-cyan-500/30 text-cyan-400">
            <Zap className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight flex items-center gap-2">
              Motion Laboratory <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">24 Primitives & 9 Presets</span>
            </h1>
            <p className="text-xs text-zinc-400">Centralized kinetic engine with global intensity scaling and reduced-motion support.</p>
          </div>
        </div>

        {/* Global Controls */}
        <div className="flex items-center gap-4 flex-wrap">
          {/* Intensity Slider */}
          <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-xl text-xs">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span className="text-zinc-400">Intensity:</span>
            <div className="flex items-center gap-1 font-mono font-bold">
              {[0, 1, 2, 3, 4].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setIntensity(lvl as MotionIntensityLevel)}
                  className={`w-6 h-6 rounded-lg transition-all ${
                    intensity === lvl ? 'bg-cyan-500 text-zinc-950 shadow-md' : 'bg-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
            <span className="text-[10px] text-zinc-500 ml-1">
              ({['Off', 'Subtle', 'Normal', 'Expressive', 'Cinematic'][intensity]})
            </span>
          </div>

          {/* Reduced Motion Toggle */}
          <button
            onClick={() => setReducedMotion(!reducedMotion)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all flex items-center gap-1.5 ${
              reducedMotion
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Reduced Motion: {reducedMotion ? 'ON' : 'OFF'}</span>
          </button>
        </div>
      </header>

      {/* Main Studio Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Sidebar: Primitives & Presets Picker */}
        <div className="lg:col-span-1 space-y-6">
          {/* Motion Presets */}
          <div className="p-5 bg-zinc-900/80 rounded-2xl border border-zinc-800 space-y-3 backdrop-blur-xl">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Motion Presets (9)</h2>
            <div className="grid grid-cols-3 gap-1.5">
              {ALL_PRESETS.map((preset) => (
                <button
                  key={preset}
                  onClick={() => setSelectedPreset(preset)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs capitalize transition-all ${
                    selectedPreset === preset
                      ? 'bg-cyan-500 text-zinc-950 font-bold shadow-md'
                      : 'bg-black/30 border border-zinc-800 text-zinc-300 hover:bg-zinc-800'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Motion Primitives List */}
          <div className="p-5 bg-zinc-900/80 rounded-2xl border border-zinc-800 space-y-3 backdrop-blur-xl">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Motion Primitives (24)</h2>
            <div className="max-h-[350px] overflow-y-auto space-y-1 pr-1 custom-scrollbar">
              {ALL_PRIMITIVES.map((prim) => (
                <button
                  key={prim}
                  onClick={() => {
                    setSelectedPrimitive(prim);
                    handleTriggerReplay();
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-mono capitalize transition-all flex items-center justify-between ${
                    selectedPrimitive === prim
                      ? 'bg-cyan-500/10 border border-cyan-500/50 text-cyan-300 font-bold shadow-md'
                      : 'bg-black/20 border border-zinc-800/60 text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                  }`}
                >
                  <span>{prim}</span>
                  {selectedPrimitive === prim && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Stage & Inspector */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          {/* Tab Switcher */}
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  activeTab === 'preview'
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-lg'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <Play className="w-4 h-4" /> Live Preview Stage
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  activeTab === 'code'
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-lg'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <Code className="w-4 h-4" /> Code Artifact & Spec
              </button>
            </div>

            <button
              onClick={handleTriggerReplay}
              className="px-3 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-xs font-medium text-zinc-300 hover:text-white flex items-center gap-1.5 transition-all shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Replay Animation
            </button>
          </div>

          {activeTab === 'preview' ? (
            <div className="flex-1 flex flex-col items-center justify-center p-12 rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-black border border-zinc-800 shadow-2xl relative overflow-hidden min-h-[450px]">
              {/* Background Ambient Grid */}
              <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

              {/* Animated Target Component */}
              <AnimatePresence mode="wait">
                {isPlaying && (
                  <motion.div
                    key={keyTrigger}
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    whileHover="hover"
                    className="p-8 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-blue-600/20 to-purple-600/20 border border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.2)] backdrop-blur-xl text-center space-y-3 max-w-sm w-full cursor-pointer select-none"
                  >
                    <div className="w-12 h-12 bg-cyan-500/20 border border-cyan-500/40 rounded-xl flex items-center justify-center mx-auto text-cyan-400">
                      <Sparkles className="w-6 h-6 animate-spin-slow" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-white capitalize">{selectedPrimitive} Primitive</h3>
                      <p className="text-xs text-zinc-400 font-mono mt-1">
                        Preset: {selectedPreset} | Intensity: {intensity}
                      </p>
                    </div>
                    <div className="pt-2">
                      <span className="text-[10px] px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-mono">
                        {reducedMotion ? 'Reduced Motion Fallback Active' : 'Active Motion Engine'}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="absolute bottom-4 text-xs text-zinc-500 font-mono">
                Click &apos;Replay Animation&apos; to re-trigger entrance physics.
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-400">Generated Motion Artifact</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(codeSnippet);
                    alert('Motion artifact copied to clipboard!');
                  }}
                  className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-semibold rounded-lg text-xs transition-all"
                >
                  Copy Code
                </button>
              </div>
              <pre className="p-6 bg-zinc-950 rounded-2xl border border-zinc-800 text-zinc-300 font-mono text-xs overflow-x-auto">
                <code>{codeSnippet}</code>
              </pre>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
