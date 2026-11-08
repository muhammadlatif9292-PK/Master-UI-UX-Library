/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Check,
  X,
  Play,
  Pause,
  RotateCcw,
  Zap,
  Code,
  Layers,
  Sliders,
  Shield,
  Bot,
  Compass,
  Cpu,
  Target,
  Trophy,
  Award,
  ArrowRight,
  Eye,
  Hand,
  Volume2,
  MousePointer,
  CheckCircle2,
  HelpCircle,
  Activity,
  Maximize2,
  UserCheck,
  Compass as CompassIcon,
  Box,
  Palette,
  Terminal,
  Clock,
} from 'lucide-react';
import { useSound } from '../sound/SoundContext';
import { useHaptics } from '../haptics/HapticContext';
import { OnboardingStep } from './onboardingTypes';

// Shared Props for Pattern Components
interface PatternBaseProps {
  onComplete?: () => void;
  onSkip?: () => void;
}

/**
 * 1. CINEMATIC STORY PATTERN
 * Widescreen aspect narrative, atmospheric gradient transitions,
 * key phrase reveals, instant skip button.
 */
export function CinematicStoryPattern({ onComplete, onSkip }: PatternBaseProps) {
  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      badge: 'ACT I: THE MONOLITH',
      title: 'Beyond Standard Component Systems',
      subtitle: 'Where every interaction mimics genuine physical instruments.',
      bgGradient: 'from-blue-950 via-zinc-950 to-black',
      highlight: '99.4% Latency Reduction',
      quote: 'Built with microsecond-calibrated physics, audio feedback, and tactile detents.',
    },
    {
      badge: 'ACT II: THE INSTRUMENT',
      title: 'True Tactile Craftsmanship',
      subtitle: 'Bourdon pressure gauges, ballistic VU meters, and knurled polar encoders.',
      bgGradient: 'from-amber-950 via-zinc-950 to-black',
      highlight: '13 Physical Primitives',
      quote: 'Every component communicates its physical metaphor through haptics, acoustics, and inertia.',
    },
    {
      badge: 'ACT III: THE WORKSPACE',
      title: 'Your Design Laboratory Awaits',
      subtitle: 'Assemble, test, and extract production-ready React JSX artifacts in seconds.',
      bgGradient: 'from-emerald-950 via-zinc-950 to-black',
      highlight: 'Production Ready',
      quote: 'Engineered for zero-lag responsiveness and WCAG AAA compliance.',
    },
  ];

  const slide = slides[currentSlide];
  const isLast = currentSlide === slides.length - 1;

  return (
    <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${slide.bgGradient} border border-zinc-800 p-8 min-h-[380px] flex flex-col justify-between text-white shadow-2xl transition-all duration-700`}>
      {/* Top Navigation / Skip */}
      <div className="flex items-center justify-between relative z-10">
        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-white/10 border border-white/20 text-cyan-300">
          {slide.badge}
        </span>
        <button
          type="button"
          onClick={() => {
            playSound('tap', 'MICRO');
            onSkip?.();
          }}
          className="text-xs text-zinc-400 hover:text-white px-3 py-1 rounded-lg bg-zinc-900/60 border border-zinc-800 transition-colors"
        >
          Skip Cinematic
        </button>
      </div>

      {/* Hero Cinematic Text */}
      <div className="space-y-4 max-w-2xl py-6 relative z-10">
        <motion.h2
          key={slide.title}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl sm:text-3xl font-extrabold tracking-tight"
        >
          {slide.title}
        </motion.h2>
        <motion.p
          key={slide.subtitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-sm text-zinc-300 leading-relaxed"
        >
          {slide.subtitle}
        </motion.p>
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-cyan-300">
          {slide.quote}
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="flex items-center justify-between relative z-10 pt-4 border-t border-white/10">
        <div className="flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentSlide ? 'w-8 bg-cyan-400' : 'w-2 bg-zinc-700 hover:bg-zinc-500'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          {currentSlide > 0 && (
            <button
              type="button"
              onClick={() => setCurrentSlide((s) => s - 1)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-300 hover:text-white"
            >
              Back
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              if (isLast) {
                playSound('SUCCESS');
                triggerHaptic('success');
                onComplete?.();
              } else {
                playSound('SWITCH');
                triggerHaptic('light');
                setCurrentSlide((s) => s + 1);
              }
            }}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold flex items-center gap-2 transition-all shadow-lg active:scale-95"
          >
            <span>{isLast ? 'Enter System' : 'Continue Narrative'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * 2. HORIZONTAL CAROUSEL PATTERN
 * Gesture-driven horizontal card deck with smooth drag snap and indicator dots.
 */
export function HorizontalCarouselPattern({ onComplete, onSkip }: PatternBaseProps) {
  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();
  const [index, setIndex] = useState(0);

  const cards = [
    {
      icon: Sliders,
      title: 'Precision Physical Controls',
      desc: 'Rotary knobs, Bourdon pressure meters, dual faders, and mechanical switches with calibrated physics.',
      tag: 'PRIMITIVES',
    },
    {
      icon: Volume2,
      title: 'Acoustic Sound Synth',
      desc: 'Harmonic sine/square synth audio feedback for every switch flip, dial detent, and pressure dump.',
      tag: 'ACOUSTICS',
    },
    {
      icon: Zap,
      title: 'Sub-Millisecond Haptics',
      desc: 'Hardware-synchronized vibration profiles for tactile detents, boundaries, and confirmations.',
      tag: 'HAPTICS',
    },
    {
      icon: Shield,
      title: 'Enterprise Accessibility',
      desc: 'WCAG AAA color contrast, ARIA 1.2 roles, and full keyboard navigation support baked in.',
      tag: 'COMPLIANCE',
    },
  ];

  return (
    <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span>Horizontal Carousel Deck</span>
          </h3>
          <p className="text-xs text-zinc-400">Swipe or navigate between feature cards.</p>
        </div>
        <button
          type="button"
          onClick={onSkip}
          className="text-xs text-zinc-400 hover:text-white px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800"
        >
          Skip
        </button>
      </div>

      <div className="relative overflow-hidden min-h-[200px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.2 }}
            className="w-full p-6 rounded-2xl bg-zinc-900/90 border border-zinc-700/80 shadow-xl space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800">
                {cards[index].tag}
              </span>
              <span className="text-xs font-mono text-zinc-400">
                {index + 1} / {cards.length}
              </span>
            </div>
            <h4 className="text-lg font-bold text-white">{cards[index].title}</h4>
            <p className="text-xs text-zinc-300 leading-relaxed">{cards[index].desc}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          disabled={index === 0}
          onClick={() => {
            playSound('tap', 'MICRO');
            setIndex((i) => Math.max(0, i - 1));
          }}
          className={`p-2 rounded-xl border border-zinc-800 transition-colors ${
            index === 0 ? 'text-zinc-600 opacity-40' : 'text-white hover:bg-zinc-900'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1.5">
          {cards.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? 'w-6 bg-cyan-400' : 'w-2 bg-zinc-700'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => {
            if (index === cards.length - 1) {
              playSound('SUCCESS');
              onComplete?.();
            } else {
              playSound('SWITCH');
              setIndex((i) => i + 1);
            }
          }}
          className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold flex items-center gap-1 transition-all"
        >
          <span>{index === cards.length - 1 ? 'Finish' : 'Next'}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

/**
 * 3. VERTICAL STORY PATTERN
 * Reel-style vertical cards with auto-fill progress bars and tap-to-advance.
 */
export function VerticalStoryPattern({ onComplete, onSkip }: PatternBaseProps) {
  const [activeStory, setActiveStory] = useState(0);
  const { playSound } = useSound();

  const stories = [
    {
      title: 'Instant UI Generation',
      snippet: 'Type plain English and watch production TypeScript render instantly.',
      badge: '01 SPEED',
    },
    {
      title: 'Zero Latency Controls',
      snippet: 'Rotary knobs, sliders, and switches with 60 FPS physics loops.',
      badge: '02 REAL-TIME',
    },
    {
      title: 'Export & Deploy',
      snippet: 'Copy modular self-contained components directly into your application.',
      badge: '03 READY',
    },
  ];

  return (
    <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 max-w-md mx-auto space-y-4">
      {/* Story Timeline Bars */}
      <div className="flex items-center gap-1">
        {stories.map((_, idx) => (
          <div key={idx} className="h-1 flex-1 rounded-full bg-zinc-800 overflow-hidden">
            <div
              className={`h-full bg-cyan-400 transition-all duration-300 ${
                idx < activeStory ? 'w-full' : idx === activeStory ? 'w-full' : 'w-0'
              }`}
            />
          </div>
        ))}
      </div>

      {/* Story Card Frame */}
      <div
        onClick={() => {
          playSound('SWITCH');
          if (activeStory < stories.length - 1) setActiveStory((s) => s + 1);
          else onComplete?.();
        }}
        className="p-8 rounded-2xl bg-gradient-to-b from-zinc-900 to-black border border-zinc-700/80 min-h-[260px] flex flex-col justify-between cursor-pointer group shadow-2xl"
      >
        <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase">
          {stories[activeStory].badge}
        </span>

        <div className="space-y-2">
          <h4 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
            {stories[activeStory].title}
          </h4>
          <p className="text-xs text-zinc-300 leading-relaxed">{stories[activeStory].snippet}</p>
        </div>

        <div className="text-[11px] font-mono text-zinc-500 flex items-center justify-between">
          <span>Tap anywhere to advance</span>
          <ArrowRight className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      <div className="flex justify-between items-center text-xs">
        <button type="button" onClick={onSkip} className="text-zinc-500 hover:text-zinc-300">
          Skip Story
        </button>
        <span className="text-zinc-500 font-mono">
          Story {activeStory + 1} of {stories.length}
        </span>
      </div>
    </div>
  );
}

/**
 * 4. INTERACTIVE SCENE PATTERN
 * Mini playground stage where users perform live actions to advance.
 */
export function InteractiveScenePattern({ onComplete }: PatternBaseProps) {
  const [dialValue, setDialValue] = useState(20);
  const [switchOn, setSwitchOn] = useState(false);
  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();

  const isReady = dialValue >= 70 && switchOn;

  return (
    <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-6">
      <div className="space-y-1">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Interactive Scene Stage</span>
        </h3>
        <p className="text-xs text-zinc-400">
          Complete the physical actions below to calibrate your workspace session.
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
        {/* Step 1: Engage Switch */}
        <div className="space-y-3">
          <span className="text-xs font-mono uppercase text-zinc-400 flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${switchOn ? 'bg-emerald-400' : 'bg-zinc-600'}`} />
            Step 1: Power Interlock
          </span>
          <button
            type="button"
            onClick={() => {
              setSwitchOn(!switchOn);
              playSound('ACTION');
              triggerHaptic('heavy');
            }}
            className={`w-full py-3 rounded-xl font-bold text-xs border transition-all ${
              switchOn
                ? 'bg-emerald-500 text-black border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700'
            }`}
          >
            {switchOn ? 'REACTOR ENGAGED (ACTIVE)' : 'CLICK TO FLIP INTERLOCK'}
          </button>
        </div>

        {/* Step 2: Dial Threshold */}
        <div className="space-y-3">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-zinc-400">Step 2: Calibrate &gt; 70%</span>
            <span className="text-cyan-400 font-bold">{dialValue}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={dialValue}
            onChange={(e) => {
              setDialValue(Number(e.target.value));
              if (Number(e.target.value) % 10 === 0) playSound('tap', 'MICRO');
            }}
            className="w-full accent-cyan-400"
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <span className="text-xs font-mono text-zinc-400">
          Status: {isReady ? <span className="text-emerald-400 font-bold">CALIBRATED</span> : 'Awaiting Input'}
        </span>

        <button
          type="button"
          disabled={!isReady}
          onClick={() => {
            playSound('SUCCESS');
            triggerHaptic('success');
            onComplete?.();
          }}
          className={`px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
            isReady
              ? 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-lg scale-105'
              : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
          }`}
        >
          <span>Complete Calibration</span>
          <Check className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

/**
 * 5. CHARACTER GUIDE PATTERN
 * Interactive AI Assistant mascot with dialogue bubbles and reactive speech.
 */
export function CharacterGuidePattern({ onComplete }: PatternBaseProps) {
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const { playSound } = useSound();

  const script = [
    "Greetings! I'm your Laboratory AI Assistant.",
    'Every UI primitive you see here is fully customizable and production-ready.',
    "Let's dive into the workspace and start constructing your design system!",
  ];

  return (
    <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-6">
      <div className="flex items-start gap-4">
        {/* Animated Avatar Mascot */}
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-xl shrink-0">
          <Bot className="w-7 h-7 animate-pulse" />
        </div>

        {/* Mascot Speech Bubble */}
        <div className="flex-1 p-4 rounded-2xl bg-zinc-900 border border-zinc-700 text-white space-y-2 relative">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold">Lab Assistant AI</span>
            <span className="text-xs font-mono text-zinc-500">{dialogueIndex + 1}/3</span>
          </div>
          <p className="text-xs text-zinc-200 leading-relaxed">{script[dialogueIndex]}</p>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={() => {
            playSound('SWITCH');
            if (dialogueIndex < script.length - 1) setDialogueIndex((d) => d + 1);
            else onComplete?.();
          }}
          className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold flex items-center gap-1"
        >
          <span>{dialogueIndex === script.length - 1 ? 'Start Exploring' : 'Continue'}</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

/**
 * 6. PROGRESSIVE REVEAL PATTERN
 * Stepwise unmasking of UI zones as the user unlocks each layer.
 */
export function ProgressiveRevealPattern({ onComplete }: PatternBaseProps) {
  const [unlockedLevel, setUnlockedLevel] = useState(1);
  const { playSound } = useSound();

  const zones = [
    { level: 1, title: 'Layer 1: Foundational Tokens', desc: 'Colors, typography mathematical scales, and CSS spacing rules.' },
    { level: 2, title: 'Layer 2: Tactile Physical Controls', desc: 'Knobs, meters, gauges, and bistable switches with acoustic feedback.' },
    { level: 3, title: 'Layer 3: Compound Layouts & Racks', desc: 'Avionics dashboards, audio mixing boards, and telemetry slabs.' },
  ];

  return (
    <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
      <div className="space-y-1">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span>Progressive Reveal Architecture</span>
        </h3>
        <p className="text-xs text-zinc-400">Unlock each progressive layer to understand the design hierarchy.</p>
      </div>

      <div className="space-y-3">
        {zones.map((zone) => {
          const isUnlocked = unlockedLevel >= zone.level;
          return (
            <div
              key={zone.level}
              className={`p-4 rounded-2xl border transition-all ${
                isUnlocked
                  ? 'bg-zinc-900/90 border-cyan-500/40 text-white shadow-md'
                  : 'bg-zinc-950/40 border-zinc-900 text-zinc-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold">{zone.title}</span>
                {isUnlocked ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <span className="text-[10px] font-mono bg-zinc-900 px-2 py-0.5 rounded text-zinc-500">LOCKED</span>
                )}
              </div>
              <p className="text-xs text-zinc-400 mt-1">{zone.desc}</p>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between items-center pt-2">
        <span className="text-xs font-mono text-zinc-400">Unlocked: {unlockedLevel}/3</span>
        <button
          type="button"
          onClick={() => {
            playSound('SWITCH');
            if (unlockedLevel < 3) setUnlockedLevel((l) => l + 1);
            else onComplete?.();
          }}
          className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold"
        >
          {unlockedLevel < 3 ? `Unlock Layer ${unlockedLevel + 1}` : 'All Layers Unlocked (Finish)'}
        </button>
      </div>
    </div>
  );
}

/**
 * 7. SWIPE NARRATIVE PATTERN
 * Touch/Mouse card discard and stack swipe interaction.
 */
export function SwipeNarrativePattern({ onComplete }: PatternBaseProps) {
  const [cardsLeft, setCardsLeft] = useState(['Design Precision', 'Acoustic Sound Synth', 'WCAG AAA Accessibility']);
  const { playSound } = useSound();

  const handleDismiss = () => {
    playSound('ACTION');
    setCardsLeft((prev) => prev.slice(1));
    if (cardsLeft.length <= 1) onComplete?.();
  };

  return (
    <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4 max-w-md mx-auto">
      <div className="space-y-0.5">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Hand className="w-4 h-4 text-cyan-400" />
          <span>Swipe Card Narrative</span>
        </h3>
        <p className="text-xs text-zinc-400">Swipe or tap discard to process each narrative card.</p>
      </div>

      <div className="h-44 relative flex items-center justify-center">
        {cardsLeft.length > 0 ? (
          <motion.div
            key={cardsLeft[0]}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ x: 200, opacity: 0 }}
            className="w-full h-full p-6 rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-cyan-500/40 text-white flex flex-col justify-between shadow-xl"
          >
            <span className="text-[10px] font-mono text-cyan-400 uppercase">Interactive Stack</span>
            <h4 className="text-lg font-bold">{cardsLeft[0]}</h4>
            <div className="flex justify-between items-center">
              <span className="text-[11px] text-zinc-400">{cardsLeft.length} cards remaining</span>
              <button
                type="button"
                onClick={handleDismiss}
                className="px-3 py-1.5 rounded-lg bg-cyan-500 text-black text-xs font-bold"
              >
                Discard / Next
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="text-center text-xs text-emerald-400 font-mono">All cards reviewed!</div>
        )}
      </div>
    </div>
  );
}

/**
 * 8. ANIMATED ILLUSTRATION PATTERN
 * Vector physics motion sequences illustrating concepts without blocking user flow.
 */
export function AnimatedIllustrationPattern({ onComplete }: PatternBaseProps) {
  const [pulse, setPulse] = useState(true);

  return (
    <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400" />
          <span>Vector Signal Illustration</span>
        </h3>
        <button
          type="button"
          onClick={() => setPulse(!pulse)}
          className="text-xs font-mono text-cyan-400 hover:underline"
        >
          {pulse ? 'Pause Wave' : 'Resume Wave'}
        </button>
      </div>

      {/* SVG Animated Waveform */}
      <div className="h-32 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden relative">
        <div className="flex items-center gap-2">
          {[40, 65, 90, 30, 75, 100, 50, 85, 60, 45, 95, 35].map((height, i) => (
            <motion.div
              key={i}
              animate={pulse ? { height: [height * 0.4, height, height * 0.4] } : {}}
              transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.1 }}
              style={{ height }}
              className="w-2.5 rounded-full bg-gradient-to-t from-cyan-600 to-cyan-300 shadow-[0_0_8px_rgba(6,182,212,0.5)]"
            />
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onComplete}
          className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold"
        >
          Continue Exploring
        </button>
      </div>
    </div>
  );
}

/**
 * 9. 3D OBJECT INTRODUCTION PATTERN
 * Interactive 3D CSS perspective model with rotational drag inspection and pin markers.
 */
export function ThreeDObjectIntroPattern({ onComplete }: PatternBaseProps) {
  const [rotation, setRotation] = useState(25);
  const { playSound } = useSound();

  return (
    <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-6">
      <div className="space-y-1">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Box className="w-4 h-4 text-cyan-400" />
          <span>3D Spatial Component Inspection</span>
        </h3>
        <p className="text-xs text-zinc-400">Scrub the 3D perspective slider to rotate and inspect structural angles.</p>
      </div>

      {/* 3D Perspective Stage */}
      <div className="h-44 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center perspective-[800px] overflow-hidden">
        <div
          style={{
            transform: `rotateY(${rotation}deg) rotateX(15deg)`,
            transformStyle: 'preserve-3d',
            transition: 'transform 0.1s ease-out',
          }}
          className="w-48 h-28 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-700 border-2 border-white/40 shadow-2xl flex flex-col items-center justify-center text-white font-mono text-xs"
        >
          <span className="font-bold tracking-wider">TACTILE SLAB</span>
          <span className="text-[10px] text-cyan-200">Angle: {rotation}°</span>
        </div>
      </div>

      {/* Angle Scrub */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-mono text-zinc-400">
          <span>Rotate Stage</span>
          <span className="text-cyan-400">{rotation}°</span>
        </div>
        <input
          type="range"
          min="-60"
          max="60"
          value={rotation}
          onChange={(e) => {
            setRotation(Number(e.target.value));
            playSound('tap', 'MICRO');
          }}
          className="w-full accent-cyan-400"
        />
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onComplete}
          className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold"
        >
          Confirm Perspective
        </button>
      </div>
    </div>
  );
}

/**
 * 10. CHOOSE-YOUR-PATH PATTERN
 * Branching role selector (Developer, Designer, Architect, Executive) tailoring the tour.
 */
export function ChooseYourPathPattern({ onComplete }: PatternBaseProps) {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const { playSound } = useSound();

  const roles = [
    { id: 'engineer', title: 'Frontend Engineer', desc: 'Focus on TypeScript props, sound engine APIs, and clean hooks.' },
    { id: 'designer', title: 'Product Designer', desc: 'Focus on mathematical typography scales, haptics, and spatial lighting.' },
    { id: 'architect', title: 'Systems Architect', desc: 'Focus on token hierarchies, accessibility compliance, and build bundles.' },
  ];

  return (
    <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-6">
      <div className="space-y-1">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <CompassIcon className="w-4 h-4 text-cyan-400" />
          <span>Choose Your Learning Path</span>
        </h3>
        <p className="text-xs text-zinc-400">Select your discipline to personalize your workspace experience.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {roles.map((role) => (
          <button
            key={role.id}
            type="button"
            onClick={() => {
              setSelectedRole(role.id);
              playSound('SWITCH');
            }}
            className={`p-4 rounded-2xl text-left border transition-all ${
              selectedRole === role.id
                ? 'bg-cyan-500/10 border-cyan-500 text-cyan-300 shadow-md ring-1 ring-cyan-500/30'
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
            }`}
          >
            <h4 className="text-xs font-bold text-white">{role.title}</h4>
            <p className="text-[11px] text-zinc-400 mt-1">{role.desc}</p>
          </button>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          disabled={!selectedRole}
          onClick={onComplete}
          className={`px-5 py-2 rounded-xl text-xs font-bold ${
            selectedRole ? 'bg-cyan-500 hover:bg-cyan-400 text-black' : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
          }`}
        >
          Begin Tailored Tour
        </button>
      </div>
    </div>
  );
}

/**
 * 11. PERSONALIZATION PATTERN
 * Live interactive configuration toggles (sound, haptics, theme).
 */
export function PersonalizationPattern({ onComplete }: PatternBaseProps) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hapticsEnabled, setHapticsEnabled] = useState(true);
  const [themeMode, setThemeMode] = useState('dark');
  const { playSound } = useSound();

  return (
    <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-6">
      <div className="space-y-1">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Palette className="w-4 h-4 text-cyan-400" />
          <span>Personalize Sensory Preferences</span>
        </h3>
        <p className="text-xs text-zinc-400">Configure your sensory feedback channels.</p>
      </div>

      <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-4 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-zinc-300 font-medium">Synthesizer Sound Effects</span>
          <button
            type="button"
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              playSound('SWITCH');
            }}
            className={`px-3 py-1 rounded-lg font-mono font-bold ${
              soundEnabled ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-zinc-800 text-zinc-400'
            }`}
          >
            {soundEnabled ? 'ENABLED' : 'MUTED'}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-zinc-300 font-medium">Vibration & Haptics</span>
          <button
            type="button"
            onClick={() => {
              setHapticsEnabled(!hapticsEnabled);
              playSound('SWITCH');
            }}
            className={`px-3 py-1 rounded-lg font-mono font-bold ${
              hapticsEnabled ? 'bg-cyan-950 text-cyan-300 border border-cyan-800' : 'bg-zinc-800 text-zinc-400'
            }`}
          >
            {hapticsEnabled ? 'ENABLED' : 'DISABLED'}
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onComplete}
          className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold"
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
}

/**
 * 12. PROGRESSIVE SETUP PATTERN
 * Modular checklist setup with instant live preview.
 */
export function ProgressiveSetupPattern({ onComplete }: PatternBaseProps) {
  const [completedItems, setCompletedItems] = useState<string[]>(['repo']);
  const { playSound } = useSound();

  const toggleItem = (id: string) => {
    playSound('SWITCH');
    if (completedItems.includes(id)) {
      setCompletedItems(completedItems.filter((i) => i !== id));
    } else {
      setCompletedItems([...completedItems, id]);
    }
  };

  return (
    <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-6">
      <div className="space-y-1">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          <span>Progressive Environment Checklist</span>
        </h3>
        <p className="text-xs text-zinc-400">Complete setup checkpoints before deploying to production.</p>
      </div>

      <div className="space-y-2">
        {[
          { id: 'repo', label: 'Verify repository manifest & dependencies' },
          { id: 'tokens', label: 'Initialize typography and color mathematical scale' },
          { id: 'audio', label: 'Calibrate Web Audio API synthesizer contexts' },
        ].map((item) => {
          const isDone = completedItems.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => toggleItem(item.id)}
              className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between text-xs transition-all ${
                isDone ? 'bg-zinc-900 border-cyan-500/40 text-white' : 'bg-zinc-950 border-zinc-800 text-zinc-400'
              }`}
            >
              <span>{item.label}</span>
              <div
                className={`w-5 h-5 rounded-lg flex items-center justify-center border ${
                  isDone ? 'bg-cyan-500 border-cyan-400 text-black' : 'border-zinc-700'
                }`}
              >
                {isDone && <Check className="w-3 h-3" />}
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex justify-between items-center pt-2">
        <span className="text-xs font-mono text-zinc-400">{completedItems.length}/3 Complete</span>
        <button
          type="button"
          onClick={onComplete}
          className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold"
        >
          Confirm Setup
        </button>
      </div>
    </div>
  );
}

/**
 * 13. INTERACTIVE TUTORIAL PATTERN
 * Hands-on sandbox task simulator.
 */
export function InteractiveTutorialPattern({ onComplete }: PatternBaseProps) {
  const [taskText, setTaskText] = useState('');
  const isCorrect = taskText.trim().toLowerCase() === 'deploy';
  const { playSound } = useSound();

  return (
    <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-6">
      <div className="space-y-1">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span>Interactive Task Simulator</span>
        </h3>
        <p className="text-xs text-zinc-400">Type "deploy" in the terminal below to execute the verification task.</p>
      </div>

      <div className="p-4 rounded-2xl bg-black border border-zinc-800 font-mono text-xs text-zinc-300 space-y-2">
        <div className="text-zinc-500">$ system.verify --cluster</div>
        <div className="flex items-center gap-2">
          <span className="text-cyan-400">&gt;</span>
          <input
            type="text"
            placeholder="Type 'deploy'"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            className="bg-transparent text-white focus:outline-none w-full"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          disabled={!isCorrect}
          onClick={() => {
            playSound('SUCCESS');
            onComplete?.();
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold ${
            isCorrect ? 'bg-emerald-500 text-black' : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
          }`}
        >
          Execute Command & Complete
        </button>
      </div>
    </div>
  );
}

/**
 * 14. SPOTLIGHT WALKTHROUGH PATTERN
 * Multi-step guided interface walkthrough simulator.
 */
export function SpotlightWalkthroughPattern({ onComplete }: PatternBaseProps) {
  const [activeStep, setActiveStep] = useState(0);
  const { playSound } = useSound();

  const steps = [
    { title: 'Step 1: Component Explorer', desc: 'Browse all 13 physical controls and 19 interaction styles.' },
    { title: 'Step 2: Interactive Sandbox', desc: 'Scrub knobs, inject pressure, and test haptic detents live.' },
    { title: 'Step 3: AI Code Artifact Export', desc: 'Copy production TypeScript code or feed AI specification prompts.' },
  ];

  return (
    <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-6">
      <div className="space-y-1">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Target className="w-4 h-4 text-cyan-400" />
          <span>Spotlight Walkthrough Simulator</span>
        </h3>
        <p className="text-xs text-zinc-400">Step-by-step guided focus system.</p>
      </div>

      <div className="p-6 rounded-2xl bg-zinc-900 border border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.15)] space-y-2">
        <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">Step {activeStep + 1} of 3</span>
        <h4 className="text-base font-bold text-white">{steps[activeStep].title}</h4>
        <p className="text-xs text-zinc-300">{steps[activeStep].desc}</p>
      </div>

      <div className="flex justify-between items-center">
        <button
          type="button"
          disabled={activeStep === 0}
          onClick={() => {
            playSound('tap', 'MICRO');
            setActiveStep((s) => s - 1);
          }}
          className="text-xs text-zinc-400 disabled:opacity-30"
        >
          Previous
        </button>

        <button
          type="button"
          onClick={() => {
            playSound('SWITCH');
            if (activeStep < 2) setActiveStep((s) => s + 1);
            else onComplete?.();
          }}
          className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold"
        >
          {activeStep === 2 ? 'Finish Walkthrough' : 'Next Step'}
        </button>
      </div>
    </div>
  );
}

/**
 * 15. GESTURE TUTORIAL PATTERN
 * Visual finger/cursor animation showing pinch, swipe, double-tap, long-press gestures.
 */
export function GestureTutorialPattern({ onComplete }: PatternBaseProps) {
  const [gesture, setGesture] = useState<'tap' | 'drag' | 'hold'>('drag');
  const { playSound } = useSound();

  return (
    <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-6">
      <div className="space-y-1">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <MousePointer className="w-4 h-4 text-cyan-400" />
          <span>Gesture Demonstration</span>
        </h3>
        <p className="text-xs text-zinc-400">Preview multi-touch and pointer gesture interactions.</p>
      </div>

      <div className="flex gap-2">
        {(['drag', 'tap', 'hold'] as const).map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => {
              setGesture(g);
              playSound('tap', 'MICRO');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono uppercase font-bold border transition-all ${
              gesture === g ? 'bg-cyan-500 text-black border-cyan-400' : 'bg-zinc-900 text-zinc-400 border-zinc-800'
            }`}
          >
            {g} Gesture
          </button>
        ))}
      </div>

      <div className="h-36 rounded-2xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-center relative overflow-hidden">
        <motion.div
          animate={
            gesture === 'drag'
              ? { x: [-80, 80, -80] }
              : gesture === 'tap'
              ? { scale: [1, 0.85, 1], opacity: [0.8, 1, 0.8] }
              : { scale: [1, 1.2, 1] }
          }
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-12 h-12 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
        >
          <Hand className="w-5 h-5" />
        </motion.div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onComplete}
          className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold"
        >
          Got it
        </button>
      </div>
    </div>
  );
}

/**
 * 16. ACHIEVEMENT ONBOARDING PATTERN
 * Gamified milestone badges with XP progress bar and celebratory micro-rewards.
 */
export function AchievementOnboardingPattern({ onComplete }: PatternBaseProps) {
  const [xp, setXp] = useState(60);
  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();

  const handleClaim = () => {
    playSound('SUCCESS');
    triggerHaptic('success');
    setXp((x) => Math.min(100, x + 20));
  };

  return (
    <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Achievement Milestones</span>
          </h3>
          <p className="text-xs text-zinc-400">Earn mastery XP as you configure and discover components.</p>
        </div>
        <div className="px-3 py-1 rounded-full bg-amber-950/80 border border-amber-800 text-amber-300 font-mono text-xs font-bold">
          {xp} / 100 XP
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 rounded-full bg-zinc-900 overflow-hidden">
        <div
          style={{ width: `${xp}%` }}
          className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 transition-all duration-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center gap-3">
          <Award className="w-6 h-6 text-amber-400" />
          <div className="space-y-0.5">
            <span className="text-xs font-bold text-white">First Control Flipped</span>
            <p className="text-[10px] text-zinc-400">+20 XP Earned</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleClaim}
          className="p-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-amber-500/40 flex items-center justify-between text-xs text-amber-300 font-bold transition-all"
        >
          <span>Claim Explorer Reward</span>
          <Sparkles className="w-4 h-4 text-amber-400" />
        </button>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onComplete}
          className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold"
        >
          Complete Onboarding
        </button>
      </div>
    </div>
  );
}
