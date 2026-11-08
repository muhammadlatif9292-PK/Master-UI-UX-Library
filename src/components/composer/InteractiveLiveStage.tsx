/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  ExperienceRecipe,
  VisualOption,
  MotionOption,
  InteractionOption,
  LightingOption,
  SoundOption,
  HapticOption,
  TypographyOption,
  ThemeOption,
} from './types';
import {
  VISUAL_OPTIONS,
  MOTION_OPTIONS,
  INTERACTION_OPTIONS,
  LIGHTING_OPTIONS,
  SOUND_OPTIONS,
  HAPTIC_OPTIONS,
  TYPOGRAPHY_OPTIONS,
  THEME_OPTIONS,
} from './composerData';
import { soundSynthesizer } from './soundEngine';
import { triggerHaptic } from './hapticEngine';
import { experienceEventBus } from '../../design-system/events/experienceEventBus';
import { ExperienceEventType } from '../../design-system/events/eventBusTypes';
import {
  Sparkles,
  Zap,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RotateCcw,
  CheckCircle2,
  Fingerprint,
  Activity,
  Sliders,
  ShieldCheck,
  Radio,
  Cpu,
  Layers,
  Flame,
  MousePointer,
  Gauge,
  Music,
} from 'lucide-react';

interface InteractiveLiveStageProps {
  recipe: ExperienceRecipe;
  onUpdateRecipe?: (updates: Partial<ExperienceRecipe>) => void;
  isCompact?: boolean;
  stageTitle?: string;
}

export function InteractiveLiveStage({
  recipe,
  onUpdateRecipe,
  isCompact = false,
  stageTitle,
}: InteractiveLiveStageProps) {
  const visual: VisualOption = VISUAL_OPTIONS.find((v) => v.id === recipe.visual) || VISUAL_OPTIONS[0];
  const motion: MotionOption = MOTION_OPTIONS.find((m) => m.id === recipe.motion) || MOTION_OPTIONS[0];
  const interaction: InteractionOption = INTERACTION_OPTIONS.find((i) => i.id === recipe.interaction) || INTERACTION_OPTIONS[0];
  const lighting: LightingOption = LIGHTING_OPTIONS.find((l) => l.id === recipe.lighting) || LIGHTING_OPTIONS[0];
  const sound: SoundOption = SOUND_OPTIONS.find((s) => s.id === recipe.sound) || SOUND_OPTIONS[0];
  const haptic: HapticOption = HAPTIC_OPTIONS.find((h) => h.id === recipe.haptic) || HAPTIC_OPTIONS[0];
  const typography: TypographyOption = TYPOGRAPHY_OPTIONS.find((t) => t.id === recipe.typography) || TYPOGRAPHY_OPTIONS[0];
  const theme: ThemeOption = THEME_OPTIONS.find((t) => t.id === recipe.theme) || THEME_OPTIONS[0];

  // Stage Interactive States
  const [sliderValue, setSliderValue] = useState<number>(68);
  const [toggleState, setToggleState] = useState<boolean>(true);
  const [activeSegment, setActiveSegment] = useState<string>('telemetry');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanComplete, setScanComplete] = useState<boolean>(false);
  const [lastEventName, setLastEventName] = useState<string>('System Initialized');
  const [fps, setFps] = useState<number>(60);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isTheater, setIsTheater] = useState<boolean>(false);
  const [hapticRipple, setHapticRipple] = useState<boolean>(false);

  // Mouse coordinate tracker for 3D Tilt and Reactive Edge Lighting
  const cardRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number; normX: number; normY: number }>({
    x: 0,
    y: 0,
    normX: 0,
    normY: 0,
  });
  const [buttonOffset, setButtonOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // FPS ticker simulation based on performance tier
  useEffect(() => {
    const targetFps = recipe.performanceTier === 'ultra' ? 120 : recipe.performanceTier === 'balanced' ? 60 : 30;
    const interval = setInterval(() => {
      setFps(targetFps - Math.floor(Math.random() * 3));
    }, 1200);
    return () => clearInterval(interval);
  }, [recipe.performanceTier]);

  // Handle Card Mouse Move (Tilt Parallax & Edge Light)
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = (x / rect.width - 0.5) * 2; // -1 to 1
    const normY = (y / rect.height - 0.5) * 2; // -1 to 1

    setMousePos({ x, y, normX, normY });
  };

  const handleCardMouseLeave = () => {
    setMousePos({ x: 0, y: 0, normX: 0, normY: 0 });
    setButtonOffset({ x: 0, y: 0 });
  };

  // Handle Magnetic Button Pull
  const handleButtonMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (interaction.id !== 'magnetic-pull' && interaction.id !== 'orbital-hover') return;
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const pull = interaction.magneticStrength * (recipe.intensity === 'extreme' ? 1.6 : recipe.intensity === 'subtle' ? 0.4 : 1.0);
    setButtonOffset({ x: x * pull, y: y * pull });
  };

  const handleButtonMouseLeave = () => {
    setButtonOffset({ x: 0, y: 0 });
  };

  // Sensory Dispatch Helper via Semantic Event Bus
  const triggerSensory = (
    eventLabel: string,
    soundType: 'click' | 'hover' | 'toggle' | 'slider' | 'scan' | 'success' = 'click',
    eventType: ExperienceEventType = 'interaction.confirmed'
  ) => {
    setLastEventName(eventLabel);

    experienceEventBus.emit(eventType, 'interactive-live-stage', {
      label: eventLabel,
      composerRecipe: recipe,
      soundEventType: soundType,
      muteSound: isMuted,
      intensity: recipe.intensity,
    });

    setHapticRipple(true);
    setTimeout(() => setHapticRipple(false), 400);
  };

  // Biometric Scan Trigger
  const handleStartScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    setScanComplete(false);
    triggerSensory('Biometric Verification Enclave Active', 'scan', 'state.loading');

    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
      triggerSensory('Quantum Enclave Signature Verified', 'success', 'state.success');
    }, 1200);
  };

  // Compute 3D Transform based on Motion & Interaction
  const tiltDeg = interaction.tiltMaxAngle * (recipe.intensity === 'extreme' ? 1.5 : recipe.intensity === 'subtle' ? 0.4 : 1.0);
  const cardTransform =
    interaction.id === 'tilt-parallax'
      ? `perspective(1000px) rotateX(${-mousePos.normY * tiltDeg}deg) rotateY(${mousePos.normX * tiltDeg}deg) scale3d(1.01, 1.01, 1.01)`
      : interaction.id === 'elastic-stretch'
        ? `scale(${1 + Math.abs(mousePos.normX) * 0.03}, ${1 + Math.abs(mousePos.normY) * 0.03})`
        : motion.id === 'zero-gravity'
          ? `perspective(800px) translate3d(${mousePos.normX * 8}px, ${mousePos.normY * 8}px, 12px) rotate(${mousePos.normX * 1.5}deg)`
          : 'none';

  // Compute Spring Transition Timing
  const transitionDuration =
    recipe.performanceTier === 'eco'
      ? '0.1s'
      : `${motion.duration * (recipe.intensity === 'extreme' ? 0.7 : recipe.intensity === 'subtle' ? 1.4 : 1.0)}s`;

  // Lighting classes & gradient computations
  const getLightingStyle = () => {
    if (lighting.id === 'reactive-edge') {
      return {
        background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(34, 211, 238, 0.25), transparent 70%)`,
      };
    }
    if (lighting.id === 'spotlight-tracker') {
      return {
        background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.15), transparent 80%)`,
      };
    }
    if (lighting.id === 'volumetric-bloom') {
      return {
        boxShadow: `0 0 70px -10px ${theme.accentHex}40, 0 0 120px -20px ${theme.secondaryHex}30`,
      };
    }
    if (lighting.id === 'sunbeam-caustic') {
      return {
        background: `linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, transparent 40%, rgba(217, 70, 239, 0.08) 70%, transparent 100%)`,
      };
    }
    return {};
  };

  return (
    <div
      className={`relative rounded-3xl overflow-hidden transition-all duration-700 ${theme.bgCanvas} ${
        isTheater ? 'fixed inset-4 z-50 shadow-2xl ring-2 ring-cyan-500/40 p-6 md:p-10' : 'p-4 md:p-8'
      }`}
      style={{
        fontFamily: typography.id === 'cinematic-serif' ? 'serif' : typography.id === 'mono-tech' ? 'monospace' : 'sans-serif',
      }}
    >
      {/* Background Ambience & Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(${theme.accentHex} 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      {/* Top Stage Control Header */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-cyan-400 shadow-inner flex items-center gap-2">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-white">Live Render Stage</span>
          </div>
          {stageTitle && <span className="text-xs font-semibold text-zinc-300 font-mono">[{stageTitle}]</span>}
        </div>

        {/* HUD Telemetry Badges */}
        <div className="flex items-center gap-2 text-[11px] font-mono">
          <div className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-zinc-300">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>{fps} FPS</span>
          </div>

          <div className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-zinc-300">
            <Gauge className="w-3.5 h-3.5 text-cyan-400" />
            <span className="capitalize">{recipe.intensity} ({recipe.intensity === 'subtle' ? '20%' : recipe.intensity === 'balanced' ? '50%' : recipe.intensity === 'expressive' ? '80%' : '100%'})</span>
          </div>

          <button
            onClick={() => {
              const muted = !isMuted;
              setIsMuted(muted);
              soundSynthesizer.toggleMute(muted);
              triggerSensory(muted ? 'Sound Muted' : 'Sound Unmuted', 'toggle');
            }}
            className={`p-2 rounded-xl border transition-all ${
              isMuted
                ? 'bg-red-500/10 border-red-500/30 text-red-400'
                : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
            }`}
            title={isMuted ? 'Unmute Sound Synthesizer' : 'Mute Sound Synthesizer'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => setIsTheater(!isTheater)}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white transition-all"
            title={isTheater ? 'Exit Theater Mode' : 'Fullscreen Theater Mode'}
          >
            {isTheater ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Interactive Stage Body */}
      <div className="relative z-10 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive 3D Synthesized Card */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div
            ref={cardRef}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
            className={`w-full max-w-lg rounded-3xl p-6 md:p-8 transition-transform duration-300 relative overflow-hidden group cursor-crosshair ${visual.surfaceClass} ${visual.borderClass}`}
            style={{
              transform: cardTransform,
              transition: `transform ${transitionDuration} ${motion.ease}`,
              ...getLightingStyle(),
            }}
          >
            {/* Reactive Edge Perimeter Light Trace */}
            {lighting.edgeTracing && (
              <div
                className="absolute inset-0 pointer-events-none rounded-3xl border-2 transition-opacity duration-300 opacity-60 group-hover:opacity-100"
                style={{
                  borderColor: theme.accentHex,
                  boxShadow: `0 0 25px ${theme.accentHex}80, inset 0 0 15px ${theme.accentHex}40`,
                }}
              />
            )}

            {/* Top Card Navigation & Badge */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-3 h-3 rounded-full animate-pulse"
                  style={{ backgroundColor: theme.accentHex }}
                />
                <span className={`text-xs font-mono uppercase tracking-wider ${theme.textSecondary}`}>
                  {recipe.name || 'Custom Synthesized Recipe'}
                </span>
              </div>
              <span
                className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase border"
                style={{
                  backgroundColor: `${theme.accentHex}15`,
                  borderColor: `${theme.accentHex}40`,
                  color: theme.accentHex,
                }}
              >
                {visual.name}
              </span>
            </div>

            {/* Card Main Typography */}
            <div className="space-y-2 mb-6">
              <h3 className={`text-2xl md:text-3xl ${typography.titleWeight} ${typography.titleTracking} ${theme.textPrimary}`}>
                Zero-Trust Cognitive Enclave
              </h3>
              <p className={`text-xs md:text-sm leading-relaxed ${theme.textSecondary}`}>
                Combining <strong className="text-white">{visual.name}</strong> visual refraction with{' '}
                <strong className="text-white">{motion.name}</strong> spring physics,{' '}
                <strong className="text-white">{interaction.name}</strong> attraction, and{' '}
                <strong className="text-white">{sound.name}</strong> procedural audio.
              </p>
            </div>

            {/* Interactive Segments Switcher */}
            <div className="p-1 rounded-2xl bg-black/40 border border-white/10 flex items-center gap-1 mb-6">
              {['telemetry', 'parameters', 'enclave'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveSegment(tab);
                    triggerSensory(`Switched to tab: ${tab}`, 'click');
                  }}
                  onMouseEnter={() => triggerSensory(`Hover tab: ${tab}`, 'hover')}
                  className={`flex-1 py-2 px-3 rounded-xl text-xs font-mono font-medium transition-all ${
                    activeSegment === tab
                      ? 'bg-white/15 text-white shadow-md'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Tab 1: Live Interactive Telemetry & Slider */}
            {activeSegment === 'telemetry' && (
              <div className="space-y-5">
                {/* Interactive Tactile Continuous Slider */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className={theme.textSecondary}>Superconducting Flux Gain</span>
                    <span className="font-bold text-white">{sliderValue}%</span>
                  </div>
                  <div className="relative flex items-center">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={sliderValue}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        setSliderValue(val);
                        if (val % 4 === 0) {
                          triggerSensory(`Slider adjusted: ${val}%`, 'slider');
                        }
                      }}
                      className="w-full h-2 rounded-lg bg-black/50 appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Interactive Toggle Switch */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3">
                    <Radio className="w-4 h-4 text-cyan-400" />
                    <div>
                      <div className="text-xs font-semibold text-white">Quantum Phase Coherence</div>
                      <div className="text-[10px] text-zinc-400 font-mono">Active lock: 4.887 GHz</div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const next = !toggleState;
                      setToggleState(next);
                      triggerSensory(`Phase Coherence ${next ? 'Engaged' : 'Disengaged'}`, 'toggle');
                    }}
                    className={`w-12 h-6 rounded-full transition-colors relative p-0.5 border ${
                      toggleState
                        ? 'bg-cyan-500/80 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                        : 'bg-zinc-800 border-zinc-700'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white transition-transform ${
                        toggleState ? 'translate-x-6' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            )}

            {/* Tab 2: Parameter Matrix */}
            {activeSegment === 'parameters' && (
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <div className="text-[10px] text-zinc-400 uppercase">Spring Stiffness</div>
                  <div className="font-bold text-cyan-300">{motion.stiffness} N/m</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <div className="text-[10px] text-zinc-400 uppercase">Damping Ratio</div>
                  <div className="font-bold text-violet-300">{motion.damping} Ns/m</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <div className="text-[10px] text-zinc-400 uppercase">Audio Base Freq</div>
                  <div className="font-bold text-emerald-300">{sound.baseFreq > 0 ? `${sound.baseFreq} Hz` : 'Silent'}</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <div className="text-[10px] text-zinc-400 uppercase">Haptic Actuation</div>
                  <div className="font-bold text-amber-300">{haptic.vibratePattern.join('-') || '0'} ms</div>
                </div>
              </div>
            )}

            {/* Tab 3: Enclave Verification Scanner */}
            {activeSegment === 'enclave' && (
              <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/10 text-center space-y-3">
                <button
                  onClick={handleStartScan}
                  disabled={isScanning}
                  className={`p-4 rounded-full border transition-all ${
                    isScanning
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 animate-pulse scale-110 shadow-[0_0_30px_rgba(6,182,212,0.6)]'
                      : scanComplete
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                        : 'bg-white/10 border-white/20 text-white hover:scale-105'
                  }`}
                >
                  {scanComplete ? (
                    <ShieldCheck className="w-8 h-8 text-emerald-400" />
                  ) : (
                    <Fingerprint className="w-8 h-8" />
                  )}
                </button>
                <div>
                  <div className="text-xs font-bold text-white font-mono">
                    {isScanning
                      ? 'Authenticating Quantum Enclave...'
                      : scanComplete
                        ? 'Verification Cryptographically Verified'
                        : 'Tap Fingerprint to Actuate Sensor'}
                  </div>
                  <div className="text-[10px] text-zinc-400 font-mono mt-0.5">
                    {isScanning ? 'Streaming sub-harmonic challenge...' : 'Zero-knowledge biometric enclave pass'}
                  </div>
                </div>
              </div>
            )}

            {/* Magnetic Pull Action Trigger Button */}
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between gap-4">
              <button
                ref={buttonRef}
                onMouseMove={handleButtonMouseMove}
                onMouseLeave={handleButtonMouseLeave}
                onClick={() => triggerSensory('Primary Trigger Actuated', 'success')}
                onMouseEnter={() => triggerSensory('Magnetic Button Focused', 'hover')}
                style={{
                  transform: `translate3d(${buttonOffset.x}px, ${buttonOffset.y}px, 0px)`,
                  transition:
                    buttonOffset.x === 0
                      ? `transform ${transitionDuration} ${motion.ease}`
                      : 'none',
                  backgroundColor: theme.accentHex,
                  color: '#000000',
                  boxShadow: `0 0 25px ${theme.accentHex}60`,
                }}
                className="flex-1 py-3.5 px-6 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-95 active:scale-95 transition-all shadow-xl font-mono"
              >
                <Zap className="w-4 h-4 fill-current" />
                <span>Execute Trigger ({interaction.name})</span>
              </button>

              <button
                onClick={() => {
                  setSliderValue(50);
                  setToggleState(true);
                  setScanComplete(false);
                  triggerSensory('Stage Reset', 'click');
                }}
                className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
                title="Reset Stage"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Experience Synthesizer Composition Inspector */}
        <div className="lg:col-span-5 space-y-4">
          {/* Active Event Feed Card */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-zinc-400 flex items-center gap-1.5">
                <MousePointer className="w-3.5 h-3.5 text-cyan-400" /> Last Sensory Event
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono">
                LIVE
              </span>
            </div>
            <div className="text-sm font-semibold text-white font-mono truncate">
              {lastEventName}
            </div>
            {hapticRipple && (
              <div className="flex items-center gap-2 text-[11px] text-amber-300 font-mono animate-pulse">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Haptic Pulse: {haptic.name} ({haptic.vibratePattern.join(', ')}ms)</span>
              </div>
            )}
          </div>

          {/* 10 Dimension Recipe Pill Stack */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center justify-between">
              <span>Synthesized Ingredients</span>
              <span className="text-cyan-400 font-bold">10 / 10 Active</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-black/30 border border-white/5 space-y-0.5">
                <div className="text-[10px] text-zinc-400">1. Visual</div>
                <div className="font-bold text-white truncate">{visual.name}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-black/30 border border-white/5 space-y-0.5">
                <div className="text-[10px] text-zinc-400">2. Motion</div>
                <div className="font-bold text-white truncate">{motion.name}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-black/30 border border-white/5 space-y-0.5">
                <div className="text-[10px] text-zinc-400">3. Interaction</div>
                <div className="font-bold text-white truncate">{interaction.name}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-black/30 border border-white/5 space-y-0.5">
                <div className="text-[10px] text-zinc-400">4. Lighting</div>
                <div className="font-bold text-white truncate">{lighting.name}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-black/30 border border-white/5 space-y-0.5">
                <div className="text-[10px] text-zinc-400">5. Sound</div>
                <div className="font-bold text-white truncate">{sound.name}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-black/30 border border-white/5 space-y-0.5">
                <div className="text-[10px] text-zinc-400">6. Haptic</div>
                <div className="font-bold text-white truncate">{haptic.name}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-black/30 border border-white/5 space-y-0.5">
                <div className="text-[10px] text-zinc-400">7. Typography</div>
                <div className="font-bold text-white truncate">{typography.name}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-black/30 border border-white/5 space-y-0.5">
                <div className="text-[10px] text-zinc-400">8. Theme</div>
                <div className="font-bold text-white truncate">{theme.name}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-black/30 border border-white/5 space-y-0.5">
                <div className="text-[10px] text-zinc-400">9. Intensity</div>
                <div className="font-bold text-cyan-300 capitalize">{recipe.intensity}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-black/30 border border-white/5 space-y-0.5">
                <div className="text-[10px] text-zinc-400">10. Perf Tier</div>
                <div className="font-bold text-emerald-300 uppercase">{recipe.performanceTier}</div>
              </div>
            </div>
          </div>

          {/* Sound Audition Trigger Bar */}
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Music className="w-4 h-4 text-cyan-400" />
              <div>
                <div className="text-xs font-semibold text-white font-mono">Audition Sound</div>
                <div className="text-[10px] text-zinc-400 font-mono">{sound.previewChime}</div>
              </div>
            </div>
            <button
              onClick={() => triggerSensory('Sound Preview Triggered', 'success')}
              className="px-3.5 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold transition-all"
            >
              Play Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
