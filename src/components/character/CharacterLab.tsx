/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bot,
  Sparkles,
  Eye,
  Smile,
  Mic,
  Activity,
  Zap,
  Sliders,
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
  Shield,
  Layers,
  Radio,
  Check,
  Copy,
  AlertTriangle,
  Code2,
  ChevronRight,
  Terminal,
  Heart,
  HelpCircle,
  Clock,
  Compass,
} from 'lucide-react';
import {
  CharacterProvider,
  useCharacter,
  CharacterForm,
  CharacterState,
  CharacterEmotion,
  CharacterGesture,
  CharacterReaction,
  EyeShape,
  EyeStyle,
  MouthShape,
  AccessoryType,
  CharacterHost,
} from '../../design-system/character';
import { CHARACTER_PALETTES } from '../../design-system/character/palettes';
import { experienceEventBus } from '../../design-system/events/experienceEventBus';
import { ExperienceEventType } from '../../design-system/events/eventBusTypes';
import { useSound } from '../../design-system/sound/SoundContext';
import { useHaptics } from '../../design-system/haptics/HapticContext';

export function CharacterLab() {
  return (
    <CharacterProvider initialForm="mascot" initialState="idle" initialPalette="cyberCyan">
      <CharacterLabInner />
    </CharacterProvider>
  );
}

function CharacterLabInner() {
  const {
    form,
    setForm,
    state,
    setState,
    previousState,
    emotion,
    setEmotion,
    gesture,
    setGesture,
    reaction,
    triggerReaction,
    eyeShape,
    setEyeShape,
    mouthShape,
    setMouthShape,
    eyeStyle,
    setEyeStyle,
    accessory,
    setAccessory,
    palette,
    paletteKey,
    setPaletteKey,
    gaze,
    lookAt,
    clearAttention,
    speech,
    speak,
    dismissSpeech,
    reducedMotion,
    setReducedMotion,
    isMuted,
    setIsMuted,
    eventBridgeEnabled,
    setEventBridgeEnabled,
    eventLog,
  } = useCharacter();

  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();

  // Navigation tab in lab
  const [activeTab, setActiveTab] = useState<'states' | 'attention' | 'events' | 'gestures' | 'customizer' | 'api'>('states');
  const [customDialogue, setCustomDialogue] = useState('Hello! I am your contextual companion. How can I assist you today?');
  const [dialogueEmotion, setDialogueEmotion] = useState<CharacterEmotion>('friendly');
  const [isDockedMode, setIsDockedMode] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // 13 States definition
  const allStates: { id: CharacterState; label: string; desc: string; icon: string; category: string }[] = [
    { id: 'idle', label: 'Idle', desc: 'Subtle breathing & organic blink', icon: '🌱', category: 'Ambient' },
    { id: 'watching', label: 'Watching', desc: 'Contextual gaze tracking target', icon: '👀', category: 'Attention' },
    { id: 'listening', label: 'Listening', desc: 'Tilted head & audio-pulse ears', icon: '🎧', category: 'Perception' },
    { id: 'thinking', label: 'Thinking', desc: 'Gazing upward & chin-tap pose', icon: '🤔', category: 'Cognition' },
    { id: 'processing', label: 'Processing', desc: 'Orbital energy ring compute cycle', icon: '⚙️', category: 'Cognition' },
    { id: 'typing', label: 'Typing', desc: 'Rapid magnetic hands generation', icon: '⌨️', category: 'Action' },
    { id: 'success', label: 'Success', desc: 'Starry eyes & proud celebratory nod', icon: '✨', category: 'Outcome' },
    { id: 'celebrating', label: 'Celebrating', desc: 'Confetti bursts & joyous hops', icon: '🎉', category: 'Outcome' },
    { id: 'confused', label: 'Confused', desc: 'Tilted head & curiosity smirk', icon: '❓', category: 'Affect' },
    { id: 'warning', label: 'Warning', desc: 'Amber pulse & protective shield', icon: '⚠️', category: 'Alert' },
    { id: 'error', label: 'Error', desc: 'X-eyes & apologetic sweat drop', icon: '❌', category: 'Alert' },
    { id: 'sleeping', label: 'Sleeping', desc: 'Peaceful breathing & low power', icon: '💤', category: 'Rest' },
    { id: 'offline', label: 'Offline', desc: 'Grayscale & powered-down mode', icon: '🔌', category: 'Rest' },
  ];

  // Forms definition
  const forms: { id: CharacterForm; name: string; icon: any }[] = [
    { id: 'mascot', name: 'Cyber Mascot', icon: Bot },
    { id: 'avatar', name: 'Digital Avatar', icon: Sparkles },
    { id: 'orb', name: 'Kinetic Orb', icon: Activity },
    { id: 'face-only', name: 'Face Only', icon: Smile },
    { id: 'eyes-only', name: 'Eyes Only', icon: Eye },
  ];

  // Gestures list
  const gestures: { id: CharacterGesture; label: string; icon: string }[] = [
    { id: 'wave', label: 'Wave', icon: '👋' },
    { id: 'chin-tap', label: 'Thinking Chin-Tap', icon: '🤔' },
    { id: 'point-left', label: 'Point Left', icon: '👈' },
    { id: 'point-right', label: 'Point Right', icon: '👉' },
    { id: 'clap', label: 'Clap Hands', icon: '👏' },
    { id: 'confetti', label: 'Confetti Burst', icon: '🎉' },
    { id: 'type-hands', label: 'Type Keyboard', icon: '⌨️' },
    { id: 'shield', label: 'Shield Pose', icon: '🛡️' },
    { id: 'shrug', label: 'Shrug Shoulders', icon: '🤷' },
    { id: 'celebrate', label: 'Celebrate Arms', icon: '🙌' },
    { id: 'none', label: 'Rest Hands', icon: '✋' },
  ];

  // Reactions list
  const reactions: { id: CharacterReaction; label: string; icon: string }[] = [
    { id: 'sparkle', label: 'Sparkle Pop', icon: '✨' },
    { id: 'heart', label: 'Heart Pop', icon: '💖' },
    { id: 'sweat', label: 'Sweat Drop', icon: '💧' },
    { id: 'question', label: 'Question Mark', icon: '❓' },
    { id: 'alert', label: 'Alert Jolt', icon: '⚠️' },
  ];

  const handleStateClick = (s: CharacterState) => {
    setState(s);
    playSound('soft-click');
    triggerHaptic('medium');
  };

  const handleSpeakSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customDialogue.trim()) return;
    speak(customDialogue, {
      emotion: dialogueEmotion,
      actions: [
        { label: 'Acknowledge', actionId: 'ack', variant: 'primary' },
        { label: 'Dismiss', actionId: 'dismiss', variant: 'secondary' },
      ],
      autoDismissMs: 6000,
    });
    playSound('chime');
    triggerHaptic('light');
  };

  const handleDispatchEvent = (type: ExperienceEventType, label: string) => {
    experienceEventBus.emit(type, 'character-lab-bridge', { source: 'lab-trigger', label });
    playSound('notification');
    triggerHaptic('medium');
  };

  const copyCode = () => {
    const snippet = `import { CharacterProvider, CharacterHost, useCharacter } from '@/design-system/character';\n\n// 1. Wrap your application tree\n<CharacterProvider initialForm="${form}" initialPalette="${paletteKey}">\n  {/* 2. Place character anywhere or docked */}\n  <CharacterHost size="lg" />\n</CharacterProvider>\n\n// 3. Reactively control from any hook/component\nconst { setState, speak, lookAt } = useCharacter();\nsetState('celebrating');\nspeak('Awesome job!');`;
    navigator.clipboard.writeText(snippet);
    setCopiedCode(true);
    playSound('chime');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-zinc-100 flex flex-col font-sans">
      {/* Top Banner */}
      <header className="p-6 md:p-8 border-b border-zinc-800/80 bg-zinc-950/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/20">
                <Bot className="w-5 h-5" />
              </div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <span>Character & Mascot Architecture Laboratory</span>
                <span className="text-xs font-mono font-normal px-2.5 py-0.5 rounded-full bg-sky-950 text-sky-300 border border-sky-800">
                  v3.0 FSM
                </span>
              </h1>
            </div>
            <p className="text-xs md:text-sm text-zinc-400 max-w-2xl leading-relaxed">
              Expressive, multi-representation character system with 13 states, contextual attention tracking, semantic event bus reactivity, and non-intrusive organic micro-motion.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 font-mono text-xs">
            <div className="p-3 rounded-xl bg-black/40 border border-zinc-800 text-center">
              <span className="text-lg font-bold text-sky-400 block">13</span>
              <span className="text-[10px] text-zinc-500 uppercase">States</span>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-zinc-800 text-center">
              <span className="text-lg font-bold text-emerald-400 block">5</span>
              <span className="text-[10px] text-zinc-500 uppercase">Forms</span>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-zinc-800 text-center">
              <span className="text-lg font-bold text-violet-400 block">12</span>
              <span className="text-[10px] text-zinc-500 uppercase">Gestures</span>
            </div>
          </div>
        </div>

        {/* Global Navigation Tabs */}
        <div className="max-w-7xl mx-auto flex items-center gap-2 mt-6 pt-4 border-t border-zinc-800/60 overflow-x-auto text-xs font-mono">
          {[
            { id: 'states', label: '13 Core States Matrix', icon: Layers },
            { id: 'attention', label: 'Attention & Gaze Tracking', icon: Eye },
            { id: 'events', label: 'Semantic Event Bus Bridge', icon: Zap },
            { id: 'gestures', label: 'Gestures & Micro-Reactions', icon: Sparkles },
            { id: 'customizer', label: 'Palettes & Accessories', icon: Sliders },
            { id: 'api', label: 'Architecture & React Hooks', icon: Code2 },
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

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 space-y-6">
        {/* TOP SECTION: LIVE CHARACTER STAGE & QUICK CONTROLS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Interactive Character Stage Canvas */}
          <div className="lg:col-span-7 p-6 md:p-8 rounded-3xl bg-zinc-950/90 border border-zinc-800 shadow-2xl relative flex flex-col items-center justify-between min-h-[460px] overflow-hidden">
            {/* Ambient Background Grid */}
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-30 pointer-events-none" />

            {/* Stage Header Info */}
            <div className="w-full flex items-center justify-between z-10 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full animate-pulse"
                  style={{ backgroundColor: palette.secondary }}
                />
                <span className="font-bold text-white uppercase">{state}</span>
                <span className="text-zinc-600">|</span>
                <span className="text-zinc-300">Emotion: {emotion}</span>
              </div>

              {/* Form Switcher Pill Group */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-black/60 border border-zinc-800">
                {forms.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => {
                      setForm(f.id);
                      playSound('soft-click');
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[11px] transition-all cursor-pointer ${
                      form === f.id
                        ? 'bg-sky-500 text-white font-bold'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Centered Character & Speech Bubble */}
            <div className="my-auto py-8 z-10 flex flex-col items-center">
              <CharacterHost
                size={isDockedMode ? 'docked' : 200}
                onActionClick={(act) => {
                  if (act === 'ack') {
                    setState('success');
                    triggerReaction('sparkle');
                    speak('Thank you for confirming!', { emotion: 'happy' });
                  } else {
                    dismissSpeech();
                  }
                }}
              />
            </div>

            {/* Stage Footer Status & Telemetry */}
            <div className="w-full flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-zinc-800/80 z-10 text-xs font-mono text-zinc-400">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-sky-400" />
                  <span>Gaze: ({gaze.x.toFixed(2)}, {gaze.y.toFixed(2)})</span>
                </span>
                {reducedMotion && (
                  <span className="px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800 text-[10px]">
                    Reduced Motion Active
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsDockedMode(!isDockedMode)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] border transition-colors cursor-pointer ${
                    isDockedMode
                      ? 'bg-indigo-500 text-white border-indigo-400'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800'
                  }`}
                >
                  {isDockedMode ? 'Docked (Corner Mode)' : 'Dock in Corner'}
                </button>
                <button
                  onClick={() => setReducedMotion(!reducedMotion)}
                  className="px-2.5 py-1 rounded-lg text-[11px] bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 cursor-pointer"
                >
                  {reducedMotion ? 'Enable Motion' : 'Reduce Motion'}
                </button>
              </div>
            </div>
          </div>

          {/* Right: Real-time Dialogue & Speech Controller */}
          <div className="lg:col-span-5 p-6 rounded-3xl bg-zinc-950/90 border border-zinc-800 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-zinc-800">
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-sky-400" />
                  <span>Dialogue & Speech Orchestrator</span>
                </h3>
                <span className="text-[10px] font-mono text-zinc-400">Typewriter Engine</span>
              </div>

              <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
                Send contextual speech bubbles with typewriter animations, interactive action chips, and custom emotional tones.
              </p>

              <form onSubmit={handleSpeakSubmit} className="space-y-3">
                <div>
                  <label className="text-[11px] font-mono text-zinc-400 block mb-1">
                    CHARACTER MESSAGE:
                  </label>
                  <textarea
                    value={customDialogue}
                    onChange={(e) => setCustomDialogue(e.target.value)}
                    rows={3}
                    className="w-full p-3 rounded-xl bg-black/60 border border-zinc-800 text-xs text-zinc-100 focus:outline-none focus:border-sky-500 resize-none font-sans"
                    placeholder="Enter speech balloon text..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-mono text-zinc-400 block mb-1">
                      MOOD / EMOTION:
                    </label>
                    <select
                      value={dialogueEmotion}
                      onChange={(e) => setDialogueEmotion(e.target.value as any)}
                      className="w-full p-2.5 rounded-xl bg-black/60 border border-zinc-800 text-xs text-zinc-200 focus:outline-none focus:border-sky-500"
                    >
                      <option value="neutral">Neutral</option>
                      <option value="happy">Happy</option>
                      <option value="excited">Excited</option>
                      <option value="curious">Curious</option>
                      <option value="focused">Focused</option>
                      <option value="worried">Worried (Alert)</option>
                      <option value="proud">Proud</option>
                      <option value="friendly">Friendly</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-zinc-400 block mb-1">
                      QUICK TRIGGERS:
                    </label>
                    <div className="flex gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          setCustomDialogue('Task completed in 140ms with zero errors!');
                          setDialogueEmotion('happy');
                        }}
                        className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-xs border border-zinc-800 text-zinc-300"
                        title="Success Prompt"
                      >
                        ✨
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setCustomDialogue('Warning: API connection lost. Retrying in 3s...');
                          setDialogueEmotion('worried');
                        }}
                        className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-xs border border-zinc-800 text-zinc-300"
                        title="Alert Prompt"
                      >
                        ⚠️
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setCustomDialogue('Analyzing cognitive telemetry and verifying tokens...');
                          setDialogueEmotion('focused');
                        }}
                        className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-xs border border-zinc-800 text-zinc-300"
                        title="Thinking Prompt"
                      >
                        🤔
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Send Speech Bubble</span>
                  </button>

                  {speech && (
                    <button
                      type="button"
                      onClick={dismissSpeech}
                      className="py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs border border-zinc-800 cursor-pointer"
                    >
                      Dismiss
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Quick State Chips */}
            <div className="pt-3 border-t border-zinc-800">
              <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-2">
                Fast State Switch:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(['idle', 'thinking', 'success', 'celebrating', 'confused', 'error'] as CharacterState[]).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStateClick(st)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono cursor-pointer transition-all ${
                      state === st
                        ? 'bg-white text-black font-bold'
                        : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* TAB 1: 13 CORE STATES MATRIX */}
        {activeTab === 'states' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-black/40 border border-zinc-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-white">13 Production Character States Matrix</h3>
                <p className="text-xs text-zinc-400">
                  Each state configures procedural eyes, mouth visemes, breathing cycle, and interrupt priorities.
                </p>
              </div>
              <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-sky-950 text-sky-300 border border-sky-800">
                FSM Active
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {allStates.map((st) => {
                const isActive = state === st.id;
                return (
                  <div
                    key={st.id}
                    onClick={() => handleStateClick(st.id)}
                    className={`p-4 rounded-2xl border text-xs cursor-pointer transition-all relative overflow-hidden ${
                      isActive
                        ? 'bg-sky-500/10 border-sky-500/80 shadow-lg shadow-sky-500/10 ring-1 ring-sky-500'
                        : 'bg-zinc-950/80 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/60'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{st.icon}</span>
                        <span className="font-bold text-sm text-white capitalize">{st.label}</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                        {st.category}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-400 mb-3 leading-relaxed">{st.desc}</p>

                    <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60 text-[11px] font-mono">
                      <span className={isActive ? 'text-sky-400 font-bold' : 'text-zinc-500'}>
                        {isActive ? '● CURRENT STATE' : 'Click to Trigger'}
                      </span>
                      <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-sky-400' : 'text-zinc-600'}`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: ATTENTION SYSTEM & FOCAL TARGETS */}
        {activeTab === 'attention' && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-black/40 border border-zinc-800">
              <h3 className="font-bold text-sm text-white">Contextual Attention & Gaze Engine</h3>
              <p className="text-xs text-zinc-400">
                Hover, focus, or click any interactive element below to watch the mascot orient its gaze toward the element in real-time.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Target 1: Form Input */}
              <div
                id="target-input"
                onMouseEnter={() => lookAt('#target-input', 0, 3000)}
                className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3"
              >
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>TARGET 1: FORM INPUT</span>
                  <span className="text-sky-400">HOVER / FOCUS ME</span>
                </div>
                <input
                  type="text"
                  placeholder="Focus here to attract gaze..."
                  onFocus={() => {
                    lookAt('#target-input', 0, 4000);
                    setState('watching');
                  }}
                  onBlur={() => clearAttention()}
                  className="w-full p-3 rounded-xl bg-black/60 border border-zinc-800 text-xs text-white focus:outline-none focus:border-sky-500"
                />
                <p className="text-[11px] text-zinc-500">Mascot calculates element center and aligns pupil vectors smoothly.</p>
              </div>

              {/* Target 2: Critical Delete Button */}
              <div
                id="target-delete-btn"
                onMouseEnter={() => {
                  lookAt('#target-delete-btn', 0, 3000);
                  setState('warning');
                }}
                onMouseLeave={() => setState('idle')}
                className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3"
              >
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>TARGET 2: DANGER TRIGGER</span>
                  <span className="text-rose-400">HOVER TO WARN</span>
                </div>
                <button
                  onClick={() => {
                    setState('warning');
                    triggerReaction('alert');
                    speak('Careful! Deleting data is permanent.', { emotion: 'worried' });
                  }}
                  className="w-full py-3 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30 font-bold text-xs transition-colors cursor-pointer"
                >
                  Delete Critical Database Record
                </button>
                <p className="text-[11px] text-zinc-500">Triggers alert reaction and amber eyebrow tilt.</p>
              </div>

              {/* Target 3: Code Block */}
              <div
                id="target-code-block"
                onMouseEnter={() => {
                  lookAt('#target-code-block', 0, 3000);
                  setState('thinking');
                }}
                onMouseLeave={() => setState('idle')}
                className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3 font-mono text-xs"
              >
                <div className="flex items-center justify-between text-zinc-400">
                  <span>TARGET 3: CODE INSPECT</span>
                  <span className="text-emerald-400">HOVER TO ANALYZE</span>
                </div>
                <div className="p-3 rounded-xl bg-black/80 border border-zinc-800 text-zinc-300 text-[11px]">
                  <code>const gaze = attentionEngine.track();</code>
                </div>
                <p className="text-[11px] text-zinc-500 font-sans">Character switches to analytical thinking expression.</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SEMANTIC EVENT BUS BRIDGE */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-black/40 border border-zinc-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-white">Experience Event Bus Reactivity</h3>
                <p className="text-xs text-zinc-400">
                  The character subscribes to the global ExperienceEventBus to automatically respond to user milestones, errors, and workflows.
                </p>
              </div>
              <button
                onClick={() => setEventBridgeEnabled(!eventBridgeEnabled)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono border transition-colors cursor-pointer ${
                  eventBridgeEnabled
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                    : 'bg-zinc-900 text-zinc-400 border-zinc-800'
                }`}
              >
                {eventBridgeEnabled ? 'Bridge: Active' : 'Bridge: Paused'}
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Event Dispatchers */}
              <div className="lg:col-span-6 space-y-3">
                <span className="text-xs font-mono text-zinc-400 font-semibold block">
                  TRIGGER SEMANTIC BUS EVENTS:
                </span>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <button
                    onClick={() => handleDispatchEvent('state.success', 'Form submission succeeded')}
                    className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/20 font-bold text-left transition-colors cursor-pointer"
                  >
                    🎉 emit(&apos;state.success&apos;)
                    <span className="block text-[10px] font-normal text-zinc-400 mt-1">Triggers celebrating + sparkles</span>
                  </button>

                  <button
                    onClick={() => handleDispatchEvent('state.error', 'Network timeout 504')}
                    className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/40 text-rose-300 hover:bg-rose-500/20 font-bold text-left transition-colors cursor-pointer"
                  >
                    ❌ emit(&apos;state.error&apos;)
                    <span className="block text-[10px] font-normal text-zinc-400 mt-1">Triggers error state + alert speech</span>
                  </button>

                  <button
                    onClick={() => handleDispatchEvent('ai.started', 'Generating cognitive synthesis')}
                    className="p-3.5 rounded-xl bg-sky-500/10 border border-sky-500/40 text-sky-300 hover:bg-sky-500/20 font-bold text-left transition-colors cursor-pointer"
                  >
                    ⚡ emit(&apos;ai.started&apos;)
                    <span className="block text-[10px] font-normal text-zinc-400 mt-1">Triggers thinking + chin-tap pose</span>
                  </button>

                  <button
                    onClick={() => handleDispatchEvent('ai.completed', 'Model response delivered')}
                    className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/40 text-indigo-300 hover:bg-indigo-500/20 font-bold text-left transition-colors cursor-pointer"
                  >
                    ✨ emit(&apos;ai.completed&apos;)
                    <span className="block text-[10px] font-normal text-zinc-400 mt-1">Triggers success nod + idle fallback</span>
                  </button>
                </div>
              </div>

              {/* Event Log Ticker */}
              <div className="lg:col-span-6 p-4 rounded-2xl bg-black/60 border border-zinc-800 space-y-2">
                <span className="text-xs font-mono text-zinc-400 font-semibold block">
                  REAL-TIME BUS EVENT LOG ({eventLog.length})
                </span>
                <div className="space-y-1.5 max-h-48 overflow-y-auto font-mono text-[11px]">
                  {eventLog.length === 0 ? (
                    <div className="p-4 text-center text-zinc-600">No events logged yet. Trigger an event above.</div>
                  ) : (
                    eventLog.map((ev, idx) => (
                      <div
                        key={idx}
                        className="p-2 rounded-lg bg-zinc-900/60 border border-zinc-800/80 flex items-center justify-between"
                      >
                        <span className="text-sky-400">{ev.type}</span>
                        <span className="text-zinc-500 text-[10px]">{new Date(ev.timestamp).toLocaleTimeString()}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: GESTURES & MICRO-REACTIONS STUDIO */}
        {activeTab === 'gestures' && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-black/40 border border-zinc-800">
              <h3 className="font-bold text-sm text-white">Gestures & Micro-Emote Studio</h3>
              <p className="text-xs text-zinc-400">
                Trigger animated magnetic hands, confetti bursts, clapping, or transient facial particles.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Gestures */}
              <div className="space-y-3">
                <span className="text-xs font-mono text-zinc-400 font-semibold block">
                  MAGNETIC HAND GESTURES (12):
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {gestures.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => {
                        setGesture(g.id);
                        playSound('soft-click');
                      }}
                      className={`p-3 rounded-xl border flex items-center gap-2.5 transition-all cursor-pointer ${
                        gesture === g.id
                          ? 'bg-sky-500 text-white font-bold border-sky-400 shadow-md'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800'
                      }`}
                    >
                      <span className="text-sm">{g.icon}</span>
                      <span>{g.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Reactions */}
              <div className="space-y-3">
                <span className="text-xs font-mono text-zinc-400 font-semibold block">
                  TRANSIENT MICRO-REACTIONS (8):
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {reactions.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => {
                        triggerReaction(r.id, 2500);
                        playSound('pop');
                      }}
                      className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 flex items-center gap-2.5 transition-all cursor-pointer"
                    >
                      <span className="text-sm">{r.icon}</span>
                      <span>{r.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: CUSTOMIZER & STYLING SUITE */}
        {activeTab === 'customizer' && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-black/40 border border-zinc-800">
              <h3 className="font-bold text-sm text-white">Visual Customization & Accessories</h3>
              <p className="text-xs text-zinc-400">
                Configure color palettes, procedural eye styles, and floating accessories.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Color Palettes */}
              <div className="space-y-3">
                <span className="text-xs font-mono text-zinc-400 font-semibold block">
                  CHROMATIC PALETTES:
                </span>
                <div className="space-y-2">
                  {Object.values(CHARACTER_PALETTES).map((pal) => (
                    <button
                      key={pal.id}
                      onClick={() => {
                        setPaletteKey(pal.id);
                        playSound('selection');
                      }}
                      className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                        paletteKey === pal.id
                          ? 'bg-zinc-800 border-white text-white font-bold'
                          : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <span className="text-xs">{pal.name}</span>
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/40"
                          style={{ backgroundColor: pal.primary }}
                        />
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/40"
                          style={{ backgroundColor: pal.secondary }}
                        />
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/40"
                          style={{ backgroundColor: pal.accent }}
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Accessories */}
              <div className="space-y-3">
                <span className="text-xs font-mono text-zinc-400 font-semibold block">
                  ACCESSORIES:
                </span>
                <div className="space-y-2 text-xs">
                  {[
                    { id: 'none', label: 'None (Default)' },
                    { id: 'headphones', label: 'DJ Headphones' },
                    { id: 'glasses', label: 'Smart HUD Glasses' },
                    { id: 'halo', label: 'Angel Golden Halo' },
                    { id: 'wizard-hat', label: 'Wizard Star Hat' },
                    { id: 'antenna-star', label: 'Antenna Star Top' },
                    { id: 'visor', label: 'Cyberpunk Visor' },
                  ].map((acc) => (
                    <button
                      key={acc.id}
                      onClick={() => {
                        setAccessory(acc.id as any);
                        playSound('soft-click');
                      }}
                      className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        accessory === acc.id
                          ? 'bg-sky-500/20 border-sky-500 text-sky-200 font-bold'
                          : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {acc.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Eye Styles */}
              <div className="space-y-3">
                <span className="text-xs font-mono text-zinc-400 font-semibold block">
                  EYE PROCEDURAL STYLES:
                </span>
                <div className="space-y-2 text-xs">
                  {[
                    { id: 'digital-led', label: 'Digital LED Matrix' },
                    { id: 'organic-anime', label: 'Organic Anime Specular' },
                    { id: 'geometric-cyber', label: 'Geometric Cyber' },
                    { id: 'minimal-dot', label: 'Minimal Clean Dot' },
                  ].map((es) => (
                    <button
                      key={es.id}
                      onClick={() => {
                        setEyeStyle(es.id as any);
                        playSound('soft-click');
                      }}
                      className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        eyeStyle === es.id
                          ? 'bg-sky-500/20 border-sky-500 text-sky-200 font-bold'
                          : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {es.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: ARCHITECTURE & REACT CODE GENERATOR */}
        {activeTab === 'api' && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-black/40 border border-zinc-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-white">Developer API & Embedding Guide</h3>
                <p className="text-xs text-zinc-400">
                  Drop the character system into any view with a single React component and declarative hook controls.
                </p>
              </div>

              <button
                onClick={copyCode}
                className="px-3.5 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-mono text-zinc-200 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Copied' : 'Copy JSX'}</span>
              </button>
            </div>

            <div className="p-5 rounded-2xl bg-black/80 border border-zinc-800 font-mono text-xs text-zinc-300 space-y-4">
              <div className="text-zinc-500">// 1. Embed CharacterProvider at your application root</div>
              <pre className="text-sky-300 overflow-x-auto">
{`import { CharacterProvider, CharacterHost, useCharacter } from '@/design-system/character';

export function App() {
  return (
    <CharacterProvider initialForm="mascot" initialPalette="cyberCyan">
      <YourContent />
      {/* Floating or docked character */}
      <CharacterHost size="lg" />
    </CharacterProvider>
  );
}`}
              </pre>

              <div className="text-zinc-500 pt-2 border-t border-zinc-800">// 2. Trigger states and speech anywhere in React hooks</div>
              <pre className="text-emerald-300 overflow-x-auto">
{`const { setState, speak, lookAt, triggerReaction } = useCharacter();

// Example: Trigger on successful checkout
setState('celebrating');
triggerReaction('sparkle');
speak('Order confirmed! We are preparing your shipment.', {
  emotion: 'happy',
  autoDismissMs: 5000,
});`}
              </pre>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
