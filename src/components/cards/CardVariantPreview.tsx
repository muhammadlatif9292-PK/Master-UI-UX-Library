/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../design-system/tokens/ThemeContext';
import { useSound } from '../../design-system/sound/SoundContext';
import { useHaptics } from '../../design-system/haptics/HapticContext';
import { CatalogEntry } from '../../design-system/catalog/catalogTypes';
import { CodeViewer } from '../CodeViewer';
import { AiHandoffGenerator } from '../AiHandoffGenerator';
import {
  Eye,
  FileCode,
  Cpu,
  Volume2,
  Vibrate,
  Shield,
  Layers,
  Sparkles,
  Zap,
  TrendingUp,
  Music,
  Play,
  Pause,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  ChevronDown,
  LayoutGrid,
  Check,
  RotateCcw,
  Maximize2,
  Minimize2,
  Move,
  Share2,
  ExternalLink,
  ChevronRight,
  Terminal,
  Activity,
  Award,
} from 'lucide-react';

interface CardVariantPreviewProps {
  entry: CatalogEntry;
  onClose?: () => void;
}

type CardState =
  | 'idle'
  | 'hover'
  | 'focus'
  | 'pressed'
  | 'expanded'
  | 'selected'
  | 'loading'
  | 'success'
  | 'error'
  | 'disabled'
  | 'dragging';

export function CardVariantPreview({ entry, onClose }: CardVariantPreviewProps) {
  const { theme } = useTheme();
  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();

  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'handoff'>('preview');
  const [cardState, setCardState] = useState<CardState>('idle');

  // Interactive local states for rich card behaviors
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [pricingInterval, setPricingInterval] = useState<'monthly' | 'annual'>('monthly');
  const [actionToggle, setActionToggle] = useState(true);
  const [actionExecuting, setActionExecuting] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [stackIndex, setStackIndex] = useState(0);
  const [simulationNodes, setSimulationNodes] = useState<Array<{ id: number; x: number; y: number; vx: number; vy: number; color: string }>>([
    { id: 1, x: 40, y: 50, vx: 1.5, vy: 1.2, color: '#06b6d4' },
    { id: 2, x: 120, y: 70, vx: -1.2, vy: 1.0, color: '#a855f7' },
    { id: 3, x: 200, y: 40, vx: 0.8, vy: -1.4, color: '#10b981' },
  ]);
  const [reasoningOpen, setReasoningOpen] = useState(true);

  // Tilt Card tracking
  const [tiltStyle, setTiltStyle] = useState<{ rx: number; ry: number; glareX: number; glareY: number }>({
    rx: 0,
    ry: 0,
    glareX: 50,
    glareY: 50,
  });
  const tiltCardRef = useRef<HTMLDivElement>(null);

  // Magnetic Card tracking
  const [magneticOffset, setMagneticOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Sync expanded/selected with cardState if simulated
  useEffect(() => {
    if (cardState === 'expanded') setIsExpanded(true);
    if (cardState === 'selected') setIsSelected(true);
  }, [cardState]);

  // Tilt Card pointer movement
  const handleTiltMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltCardRef.current || cardState === 'disabled') return;
    const rect = tiltCardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rx = ((y - cy) / cy) * -12;
    const ry = ((x - cx) / cx) * 12;
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setTiltStyle({ rx, ry, glareX, glareY });
  };

  const handleTiltMouseLeave = () => {
    setTiltStyle({ rx: 0, ry: 0, glareX: 50, glareY: 50 });
  };

  // Magnetic proximity tracking
  const handleMagneticMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardState === 'disabled') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMagneticOffset({ x: Math.max(-20, Math.min(20, x * 0.15)), y: Math.max(-20, Math.min(20, y * 0.15)) });
  };

  const handleMagneticLeave = () => {
    setMagneticOffset({ x: 0, y: 0 });
  };

  // Simulation particle spawn
  const handleSimulationClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const colors = ['#06b6d4', '#a855f7', '#ec4899', '#10b981', '#f59e0b'];
    const newNode = {
      id: Date.now() + Math.random(),
      x,
      y,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      color: colors[Math.floor(Math.random() * colors.length)],
    };
    setSimulationNodes((prev) => [...prev.slice(-12), newNode]);
    playSound('pop', 'MICRO');
    triggerHaptic('press');
  };

  // Trigger Action Card task
  const handleTriggerAction = () => {
    setActionExecuting(true);
    playSound('press', 'MICRO');
    triggerHaptic('heavy');
    setTimeout(() => {
      setActionExecuting(false);
      playSound('chime', 'NOTIFICATION');
      triggerHaptic('success');
    }, 1200);
  };

  // Compute State CSS Classes
  const getStateClass = () => {
    switch (cardState) {
      case 'hover':
        return 'scale-[1.02] border-cyan-400 shadow-2xl shadow-cyan-500/10';
      case 'focus':
        return 'ring-4 ring-cyan-500/40 border-cyan-400';
      case 'pressed':
        return 'scale-[0.98] translate-y-1 brightness-90';
      case 'selected':
        return 'ring-2 ring-cyan-400 border-cyan-400 bg-cyan-950/20';
      case 'loading':
        return 'animate-pulse opacity-80';
      case 'success':
        return 'border-emerald-500 ring-2 ring-emerald-500/20';
      case 'error':
        return 'border-red-500 ring-2 ring-red-500/20';
      case 'disabled':
        return 'opacity-40 pointer-events-none grayscale';
      case 'dragging':
        return 'cursor-grabbing rotate-1 scale-105 shadow-2xl z-20 border-cyan-400';
      default:
        return '';
    }
  };

  const stackCards = [
    { title: 'Deterministic State Engine', version: 'v4.2', tag: 'CORE ARCHITECTURE', status: 'Optimal' },
    { title: 'Generative Token Pipeline', version: 'v3.8', tag: 'NEURAL STREAMING', status: 'Accelerated' },
    { title: 'Distributed Edge Routing', version: 'v5.0', tag: 'INFRASTRUCTURE', status: 'Synchronized' },
  ];

  return (
    <div className={`p-6 md:p-12 rounded-3xl ${theme.surface.primary} border ${theme.border.default} space-y-8 shadow-2xl max-w-5xl mx-auto`}>
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase">
              Card & Bento Suite • {entry.component}
            </span>
            <span className="text-xs font-mono opacity-60">v{entry.version}</span>
            <span className="px-2 py-0.5 rounded-full bg-white/5 text-[10px] font-mono text-zinc-400 uppercase">
              {entry.visualStyle}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white">{entry.name}</h2>
          <p className="text-xs opacity-70 max-w-2xl">{entry.description}</p>
        </div>

        <div className="flex items-center gap-2 bg-black/30 p-1.5 rounded-2xl border border-white/10 shrink-0">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-2 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all ${
              activeTab === 'preview' ? 'bg-cyan-500 text-zinc-950 font-bold shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Eye className="w-4 h-4" /> Live Interactive
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-4 py-2 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all ${
              activeTab === 'code' ? 'bg-cyan-500 text-zinc-950 font-bold shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <FileCode className="w-4 h-4" /> Code
          </button>
          <button
            onClick={() => setActiveTab('handoff')}
            className={`px-4 py-2 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all ${
              activeTab === 'handoff' ? 'bg-purple-500 text-zinc-950 font-bold shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Cpu className="w-4 h-4" /> AI Handoff
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-zinc-300"
            >
              Close
            </button>
          )}
        </div>
      </div>

      {activeTab === 'code' ? (
        <CodeViewer entry={entry} />
      ) : activeTab === 'handoff' ? (
        <AiHandoffGenerator entry={entry} />
      ) : (
        <div className="space-y-6">
          {/* Universal State Simulator Bar (Supports all 11 requested states) */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-black/40 p-3.5 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Simulate State:</span>
              <div className="flex flex-wrap items-center gap-1.5">
                {(
                  [
                    'idle',
                    'hover',
                    'focus',
                    'pressed',
                    'expanded',
                    'selected',
                    'loading',
                    'success',
                    'error',
                    'disabled',
                    'dragging',
                  ] as CardState[]
                ).map((st) => (
                  <button
                    key={st}
                    onClick={() => {
                      setCardState(st);
                      playSound('press', 'MICRO');
                      triggerHaptic('press');
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono capitalize transition-all ${
                      cardState === st
                        ? 'bg-cyan-500 text-zinc-950 font-bold shadow-sm'
                        : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1 text-cyan-400">
                <Volume2 className="w-3.5 h-3.5" /> {entry.soundStyle}
              </span>
              <span className="flex items-center gap-1 text-purple-400">
                <Vibrate className="w-3.5 h-3.5" /> {entry.hapticStyle}
              </span>
              <span className="flex items-center gap-1 text-emerald-400">
                <Shield className="w-3.5 h-3.5" /> {entry.accessibility} Level
              </span>
            </div>
          </div>

          {/* Interactive Card Stage Viewport */}
          <div className="min-h-[440px] p-6 md:p-12 rounded-3xl bg-zinc-950 border border-white/10 flex items-center justify-center relative overflow-hidden shadow-2xl">
            {/* Ambient Background Grid Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

            <div className="w-full max-w-2xl relative z-10">
              
              {/* 1. Glass Card */}
              {entry.id.includes('glass') && !entry.id.includes('spatial') ? (
                <div
                  onClick={() => setIsSelected(!isSelected)}
                  className={`relative p-8 rounded-3xl bg-white/[0.08] dark:bg-black/[0.4] backdrop-blur-2xl border border-white/[0.2] shadow-2xl transition-all cursor-pointer overflow-hidden space-y-6 ${getStateClass()}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 text-xs font-mono font-bold">
                      OPTICAL GLASS // REFRACTION
                    </span>
                    <span className="text-xs font-mono text-zinc-400">BLUR: 24px • 120 FPS</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white tracking-tight">Frosted Translucent Matrix</h3>
                    <p className="text-xs text-zinc-300 mt-2 leading-relaxed">
                      Engineered with optical backdrop-filter refraction and noise-dithered sub-surface scatter, guaranteeing AAA textual contrast across dynamic light backgrounds.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-[10px] font-mono text-zinc-400 uppercase">Specular Luminance</div>
                      <div className="text-base font-bold text-white font-mono">0.84 cd/m²</div>
                    </div>
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                      <div className="text-[10px] font-mono text-zinc-400 uppercase">GPU Fill Time</div>
                      <div className="text-base font-bold text-cyan-400 font-mono">0.14 ms</div>
                    </div>
                  </div>
                </div>
              ) : entry.id.includes('bento') ? (
                /* 2. Bento Grid / Bento Card */
                <div className={`p-6 md:p-8 rounded-3xl bg-zinc-900/90 border border-white/15 shadow-2xl space-y-6 transition-all ${getStateClass()}`}>
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold">
                      <LayoutGrid className="w-4 h-4" /> BENTO TELEMETRY SUITE
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold flex items-center gap-1">
                      <Activity className="w-3.5 h-3.5" /> SHARD ACTIVE
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                      <div className="text-[10px] font-mono text-zinc-400 uppercase">Ingress Rate</div>
                      <div className="text-xl font-bold font-mono text-white">4.82 GB/s</div>
                      <div className="text-[10px] text-emerald-400 font-mono">+14.2% Delta</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                      <div className="text-[10px] font-mono text-zinc-400 uppercase">Roundtrip RTT</div>
                      <div className="text-xl font-bold font-mono text-cyan-400">1.28 ms</div>
                      <div className="text-[10px] text-cyan-400 font-mono">Zero Jitter</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-1">
                      <div className="text-[10px] font-mono text-zinc-400 uppercase">Core Efficiency</div>
                      <div className="text-xl font-bold font-mono text-purple-400">99.98%</div>
                      <div className="text-[10px] text-purple-400 font-mono">Calibrated</div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/20 flex items-center justify-between">
                    <div className="text-xs text-zinc-300">Automatic auto-flow layout balancing active across viewport breakpoints.</div>
                    <button
                      onClick={() => {
                        playSound('chime', 'NOTIFICATION');
                        triggerHaptic('success');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs shrink-0 ml-3"
                    >
                      Optimize Bento
                    </button>
                  </div>
                </div>
              ) : entry.id.includes('hero') ? (
                /* 3. Hero Card */
                <div className={`relative p-8 md:p-10 rounded-3xl bg-zinc-950 border border-cyan-500/30 overflow-hidden shadow-2xl space-y-6 transition-all ${getStateClass()}`}>
                  <div className="absolute -top-20 -right-20 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
                  <div className="relative z-10 space-y-4 max-w-xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold">
                      <Zap className="w-3.5 h-3.5" /> FLAGSHIP ANNOUNCEMENT
                    </div>
                    <h2 className="text-3xl font-black text-white tracking-tight leading-tight">
                      Quantum Deterministic Token Engine
                    </h2>
                    <p className="text-xs md:text-sm text-zinc-300 leading-relaxed">
                      Instantaneous compilation of rich design system primitives with physical sound feedback, adaptive haptics, and zero layout shift across devices.
                    </p>
                    <div className="flex flex-wrap gap-3 pt-2">
                      <button
                        onClick={() => {
                          playSound('press', 'ACTION');
                          triggerHaptic('heavy');
                        }}
                        className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs shadow-lg transition-all flex items-center gap-1.5"
                      >
                        Launch Infrastructure <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => playSound('press', 'MICRO')}
                        className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-mono transition-all"
                      >
                        Read Documentation
                      </button>
                    </div>
                  </div>
                </div>
              ) : entry.id.includes('floating') ? (
                /* 4. Floating Anti-Gravity Card */
                <div className="space-y-4 text-center">
                  <div
                    className={`p-8 rounded-3xl bg-zinc-900 border border-white/15 shadow-2xl transition-transform duration-500 hover:-translate-y-3 cursor-pointer ${getStateClass()}`}
                    onClick={() => {
                      playSound('pop', 'MICRO');
                      triggerHaptic('press');
                    }}
                  >
                    <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono font-bold">
                      ANTI-GRAVITY SUSPENSION
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-3">Weightless Spatial Surface</h3>
                    <p className="text-xs text-zinc-400 mt-2">
                      Hover to accelerate vertical sine oscillation and expand the ambient occlusion ground shadow below.
                    </p>
                  </div>
                  <div className="w-2/3 h-3.5 mx-auto bg-black/50 rounded-full blur-md transition-all duration-500 hover:scale-90 hover:opacity-30" />
                </div>
              ) : entry.id.includes('tilt') ? (
                /* 5. Tilt 3D Gyroscope Card */
                <div
                  ref={tiltCardRef}
                  onMouseMove={handleTiltMouseMove}
                  onMouseLeave={handleTiltMouseLeave}
                  style={{
                    transform: `perspective(1000px) rotateX(${tiltStyle.rx}deg) rotateY(${tiltStyle.ry}deg)`,
                  }}
                  className={`p-8 rounded-3xl bg-zinc-900 border border-cyan-500/40 shadow-2xl relative overflow-hidden transition-transform duration-100 ease-out cursor-crosshair space-y-6 ${getStateClass()}`}
                >
                  <div
                    style={{
                      background: `radial-gradient(circle at ${tiltStyle.glareX}% ${tiltStyle.glareY}%, rgba(255,255,255,0.15), transparent 60%)`,
                    }}
                    className="absolute inset-0 pointer-events-none"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-cyan-400">3D GYRO PERSPECTIVE</span>
                    <span className="text-[10px] font-mono text-zinc-500">RX: {tiltStyle.rx.toFixed(1)}° • RY: {tiltStyle.ry.toFixed(1)}°</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Spatial Parallax Surface</h3>
                    <p className="text-xs text-zinc-400 mt-2">Move your pointer across this card to compute real-time perspective matrices and specular glare reflections.</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-black/40 border border-white/5 text-xs text-cyan-300 font-mono">
                    transform: perspective(1000px) rotateX({tiltStyle.rx.toFixed(1)}deg) rotateY({tiltStyle.ry.toFixed(1)}deg)
                  </div>
                </div>
              ) : entry.id.includes('magnetic') ? (
                /* 6. Magnetic Card */
                <div
                  onMouseMove={handleMagneticMove}
                  onMouseLeave={handleMagneticLeave}
                  style={{
                    transform: `translate(${magneticOffset.x}px, ${magneticOffset.y}px)`,
                  }}
                  className={`p-8 rounded-3xl bg-zinc-900 border border-purple-500/40 shadow-2xl transition-transform duration-150 ease-out cursor-pointer space-y-4 ${getStateClass()}`}
                  onClick={() => {
                    playSound('press', 'MICRO');
                    triggerHaptic('press');
                  }}
                >
                  <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono font-bold">
                    MAGNETIC FIELD ANCHOR
                  </span>
                  <h3 className="text-xl font-bold text-white">Proximity Gravity Snapping</h3>
                  <p className="text-xs text-zinc-400">Move your cursor within this frame to experience elastic spring displacement.</p>
                  <div className="text-[11px] font-mono text-purple-300">Offset ΔX: {magneticOffset.x.toFixed(1)}px | ΔY: {magneticOffset.y.toFixed(1)}px</div>
                </div>
              ) : entry.id.includes('expandable') ? (
                /* 7. Expandable Drawer Card */
                <div className={`p-6 rounded-3xl bg-zinc-900 border border-white/15 shadow-2xl space-y-4 transition-all ${getStateClass()}`}>
                  <div
                    onClick={() => {
                      setIsExpanded(!isExpanded);
                      playSound('pop', 'MICRO');
                      triggerHaptic('press');
                    }}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <div>
                      <span className="text-[10px] font-mono text-cyan-400 uppercase">CLUSTER SHARD #04</span>
                      <h3 className="text-lg font-bold text-white">Distributed Postgres Node</h3>
                    </div>
                    <button className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-cyan-400 transition-transform">
                      <ChevronDown className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="pt-4 border-t border-white/10 space-y-3 animate-fadeIn">
                      <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                        <div className="p-3 rounded-xl bg-black/40">
                          <span className="text-zinc-400">Active Connections</span>
                          <div className="text-base font-bold text-white">1,482 / 2,000</div>
                        </div>
                        <div className="p-3 rounded-xl bg-black/40">
                          <span className="text-zinc-400">Replication Lag</span>
                          <div className="text-base font-bold text-emerald-400">0.02 ms</div>
                        </div>
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        Automatic horizontal sharding configured across asia-east, us-central, and eu-west regions with deterministic sub-second failover.
                      </p>
                    </div>
                  )}
                </div>
              ) : entry.id.includes('morphing') ? (
                /* 8. Morphing Card */
                <div
                  onClick={() => {
                    setIsExpanded(!isExpanded);
                    playSound('press', 'MICRO');
                    triggerHaptic('press');
                  }}
                  className={`p-6 md:p-8 rounded-3xl bg-gradient-to-br from-zinc-900 to-black border border-white/15 shadow-2xl transition-all cursor-pointer space-y-4 ${
                    isExpanded ? 'ring-2 ring-cyan-400' : ''
                  } ${getStateClass()}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold">
                      {isExpanded ? 'EXPANDED VIEW' : 'COMPACT VIEW'}
                    </span>
                    <button className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                      {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />} Click to Morph
                    </button>
                  </div>
                  <h3 className="text-xl font-bold text-white">FLIP Fluid Geometric Transition</h3>
                  <p className="text-xs text-zinc-400">
                    Shared element coordinates interpolate seamlessly without triggering full React tree re-mounts.
                  </p>
                  {isExpanded && (
                    <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300 space-y-1">
                      <div>Matrix Morph State: Active</div>
                      <div>Render Frame Rate: 120 FPS Native</div>
                    </div>
                  )}
                </div>
              ) : entry.id.includes('stack') ? (
                /* 9. Stack Cascading Card Deck */
                <div className="space-y-4 text-center">
                  <div className="relative w-full max-w-md h-72 mx-auto">
                    {/* Background Cards */}
                    <div className="absolute top-6 inset-x-6 h-60 rounded-3xl bg-zinc-800 border border-white/5 opacity-40 scale-90" />
                    <div className="absolute top-3 inset-x-3 h-60 rounded-3xl bg-zinc-850 border border-white/10 opacity-70 scale-95" />

                    {/* Active Top Card */}
                    <div
                      onClick={() => {
                        setStackIndex((prev) => (prev + 1) % stackCards.length);
                        playSound('pop', 'MICRO');
                        triggerHaptic('press');
                      }}
                      className={`absolute top-0 inset-x-0 h-60 p-6 rounded-3xl bg-zinc-900 border border-white/20 shadow-2xl flex flex-col justify-between text-left cursor-pointer transition-all ${getStateClass()}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-400 text-[10px] font-mono font-bold">
                          {stackCards[stackIndex].tag}
                        </span>
                        <span className="text-xs font-mono text-zinc-400">
                          {stackIndex + 1} OF {stackCards.length}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{stackCards[stackIndex].title}</h3>
                        <p className="text-xs text-zinc-400 mt-1">Status: {stackCards[stackIndex].status}</p>
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400">
                        <span>Click to Cycle Next Deck Card</span>
                        <span>{stackCards[stackIndex].version}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : entry.id.includes('layered') ? (
                /* 10. Multi-Strata Layered Depth Card */
                <div
                  className={`relative p-8 rounded-3xl bg-zinc-900 border border-white/15 shadow-2xl group overflow-hidden space-y-6 cursor-pointer ${getStateClass()}`}
                  onClick={() => {
                    playSound('press', 'MICRO');
                    triggerHaptic('press');
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/15 via-purple-500/10 to-transparent group-hover:scale-105 transition-transform duration-500 pointer-events-none" />
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-mono">
                      Z-STRATA // DEPTH 3
                    </span>
                    <span className="text-xs font-mono text-zinc-400">PARALLAX PLANE</span>
                  </div>
                  <div className="relative z-10 space-y-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                    <h3 className="text-2xl font-bold text-white">Multi-Strata Parallax Depth</h3>
                    <p className="text-xs text-zinc-300 leading-relaxed">
                      Differential hover velocity separates background textures, graphical badges, and typographic foreground across realistic physical depth planes.
                    </p>
                  </div>
                </div>
              ) : entry.id.includes('spatial') ? (
                /* 11. Spatial VisionOS Glass Plate */
                <div
                  onClick={() => {
                    playSound('press', 'MICRO');
                    triggerHaptic('press');
                  }}
                  className={`p-8 rounded-[36px] bg-white/[0.08] dark:bg-black/[0.45] backdrop-blur-3xl border border-white/[0.3] shadow-[0_25px_60px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(255,255,255,0.5)] cursor-pointer space-y-6 transition-all ${getStateClass()}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center text-white shadow-lg">
                      <Sparkles className="w-6 h-6 text-cyan-300" />
                    </div>
                    <span className="text-xs font-mono text-white/70 uppercase tracking-widest">VISIONOS SPATIAL</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white tracking-tight">Volumetric Spatial Glass</h3>
                    <p className="text-xs text-white/80 mt-2 leading-relaxed">
                      Features thick optical acrylic bevels, real-time environment light sampling, and gaze focus highlights.
                    </p>
                  </div>
                </div>
              ) : entry.id.includes('3d') || entry.component === 'ThreeDimensionalCard' ? (
                /* 12. 3D Isometric Extruded Slab Card */
                <div
                  onClick={() => {
                    playSound('press', 'MICRO');
                    triggerHaptic('heavy');
                  }}
                  className={`p-8 rounded-3xl bg-zinc-900 border-2 border-zinc-650 shadow-[0_10px_0_#18181b,0_20px_25px_rgba(0,0,0,0.6)] active:translate-y-2 active:shadow-[0_2px_0_#18181b] transition-all cursor-pointer space-y-4 ${getStateClass()}`}
                >
                  <span className="px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-cyan-400 text-xs font-mono font-bold">
                    EXTRUDED SLAB // M-08
                  </span>
                  <h3 className="text-2xl font-bold text-white font-mono">MECHANICAL INDUSTRIAL DECK</h3>
                  <p className="text-xs text-zinc-400">Click to actuate physical hydraulic spring depression with hard zero-blur shadow offset.</p>
                </div>
              ) : entry.id.includes('editorial') ? (
                /* 13. Editorial Magazine Card */
                <div className={`p-8 md:p-10 rounded-3xl bg-zinc-950 border border-white/15 shadow-2xl space-y-6 ${getStateClass()}`}>
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase">ESSAY // VOL. 28</span>
                    <span className="text-xs font-mono text-zinc-500">AUGUST 2026</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-serif italic text-white leading-tight">
                    The Ephemeral Aesthetics of Digital Architecture
                  </h2>
                  <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
                    Crafting digital interfaces that respect spatial rhythm, typographic density, and human attention without unrequested decorative friction.
                  </p>
                  <div className="pt-2 flex items-center justify-between border-t border-white/10 text-xs font-mono text-zinc-400">
                    <span>By Dr. Alex Vance</span>
                    <span className="text-cyan-400 underline cursor-pointer">Read Full Article →</span>
                  </div>
                </div>
              ) : entry.id.includes('data') && !entry.id.includes('kpi') ? (
                /* 14. Real-time Telemetry Data Card */
                <div className={`p-6 md:p-8 rounded-3xl bg-zinc-900 border border-white/15 shadow-2xl space-y-6 ${getStateClass()}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-zinc-400">INGRESS THROUGHPUT PIPELINE</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-mono font-bold animate-pulse">
                      LIVE
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold font-mono text-white">4.82</span>
                    <span className="text-sm text-zinc-400 font-mono">GB/sec</span>
                  </div>
                  <div className="h-16 w-full flex items-end gap-1.5 pt-2">
                    {[35, 60, 45, 80, 95, 70, 85, 65, 90, 100, 75, 88].map((h, i) => (
                      <div
                        key={i}
                        style={{ height: `${h}%` }}
                        className="flex-1 bg-cyan-500/30 hover:bg-cyan-400 rounded-t transition-all cursor-pointer"
                        onClick={() => playSound('press', 'MICRO')}
                      />
                    ))}
                  </div>
                </div>
              ) : entry.id.includes('kpi') ? (
                /* 15. Executive KPI Card */
                <div className={`p-6 md:p-8 rounded-3xl bg-zinc-900 border border-white/15 shadow-2xl space-y-6 ${getStateClass()}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">MONTHLY RECURRING REVENUE</span>
                    <span className="inline-flex items-center gap-1 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full font-bold">
                      <TrendingUp className="w-3.5 h-3.5" /> +18.4% DELTA
                    </span>
                  </div>
                  <div>
                    <div className="text-4xl font-black font-mono text-white">$148,290</div>
                    <div className="text-xs text-zinc-400 mt-1 font-mono">Target: $160,000 (92.6% achieved)</div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="w-full h-2.5 rounded-full bg-zinc-800 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 w-[92.6%]" />
                    </div>
                  </div>
                </div>
              ) : entry.id.includes('media') ? (
                /* 16. Rich Media Card */
                <div className={`p-6 md:p-8 rounded-3xl bg-zinc-900 border border-white/15 shadow-2xl space-y-6 ${getStateClass()}`}>
                  <div className="flex gap-4 items-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-500 to-cyan-400 flex items-center justify-center text-zinc-950 font-bold text-xl shadow-lg">
                      <Music className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base">Atmospheric Resonance</h4>
                      <p className="text-xs text-zinc-400">DeepMind Ambient Soundscape</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => {
                        setIsPlayingAudio(!isPlayingAudio);
                        playSound('pop', 'MICRO');
                        triggerHaptic('press');
                      }}
                      className="w-10 h-10 rounded-full bg-cyan-500 hover:bg-cyan-400 text-zinc-950 flex items-center justify-center font-bold transition-all shadow-md"
                    >
                      {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                    </button>
                    <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden cursor-pointer">
                      <div className="h-full bg-cyan-400 w-1/3" />
                    </div>
                    <span className="text-xs font-mono text-zinc-400">01:42 / 04:15</span>
                  </div>
                </div>
              ) : entry.id.includes('profile') ? (
                /* 17. Profile Card */
                <div className={`p-6 md:p-8 rounded-3xl bg-zinc-900 border border-white/15 shadow-2xl space-y-6 ${getStateClass()}`}>
                  <div className="flex items-center justify-between">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-indigo-600 flex items-center justify-center font-bold text-white text-xl shadow-md">
                        AV
                      </div>
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-zinc-900" />
                    </div>
                    <button
                      onClick={() => {
                        setIsFollowed(!isFollowed);
                        playSound('chime', 'NOTIFICATION');
                        triggerHaptic('success');
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        isFollowed ? 'bg-cyan-500 text-zinc-950' : 'bg-white/10 hover:bg-white/20 text-white'
                      }`}
                    >
                      {isFollowed ? 'Connected ✓' : 'Connect'}
                    </button>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      Dr. Alex Vance <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1">Principal Systems Architect @ Google DeepMind</p>
                  </div>
                  <div className="flex gap-4 border-t border-white/10 pt-4 text-xs font-mono">
                    <div>
                      <span className="font-bold text-white">12.4k</span> <span className="text-zinc-500">Subscribers</span>
                    </div>
                    <div>
                      <span className="font-bold text-white">48</span> <span className="text-zinc-500">Artifacts</span>
                    </div>
                  </div>
                </div>
              ) : entry.id.includes('feature') ? (
                /* 18. Feature Card */
                <div className={`p-6 md:p-8 rounded-3xl bg-zinc-900 border border-white/15 shadow-2xl space-y-4 ${getStateClass()}`}>
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Sub-Millisecond Edge Routing</h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Compute generative UI components globally across 300+ edge data centers with zero cold starts.
                  </p>
                  <ul className="text-xs text-zinc-300 space-y-2 font-mono pt-2">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400" /> Zero Cold-Start Overheads
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400" /> Automatic Brotli & Zstd Compression
                    </li>
                  </ul>
                </div>
              ) : entry.id.includes('comparison') ? (
                /* 19. Comparison & Pricing Card */
                <div className={`relative p-8 rounded-3xl bg-zinc-900 border-2 border-cyan-500 shadow-2xl space-y-6 ${getStateClass()}`}>
                  <div className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-cyan-500 text-zinc-950 font-bold font-mono text-[10px] uppercase">
                    MOST POPULAR
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-white">Enterprise Tier</h3>
                      <p className="text-xs text-zinc-400 mt-1">For mission-critical production clusters</p>
                    </div>
                    <div className="flex items-center bg-black/40 p-1 rounded-xl border border-white/10 text-xs font-mono">
                      <button
                        onClick={() => setPricingInterval('monthly')}
                        className={`px-2.5 py-1 rounded-lg transition-all ${
                          pricingInterval === 'monthly' ? 'bg-cyan-500 text-zinc-950 font-bold' : 'text-zinc-400'
                        }`}
                      >
                        Mo
                      </button>
                      <button
                        onClick={() => setPricingInterval('annual')}
                        className={`px-2.5 py-1 rounded-lg transition-all ${
                          pricingInterval === 'annual' ? 'bg-cyan-500 text-zinc-950 font-bold' : 'text-zinc-400'
                        }`}
                      >
                        Yr
                      </button>
                    </div>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold font-mono text-white">
                      {pricingInterval === 'monthly' ? '$49' : '$39'}
                    </span>
                    <span className="text-xs text-zinc-400 font-mono">/ seat / month</span>
                  </div>
                  <button
                    onClick={() => {
                      playSound('press', 'ACTION');
                      triggerHaptic('heavy');
                    }}
                    className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs shadow-lg transition-all"
                  >
                    Deploy Enterprise Tier
                  </button>
                </div>
              ) : entry.id.includes('action') ? (
                /* 20. Action & Task Card */
                <div className={`p-6 md:p-8 rounded-3xl bg-zinc-900 border border-white/15 shadow-2xl space-y-6 ${getStateClass()}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-white text-base">Automated Snapshot Pipeline</h4>
                      <p className="text-xs text-zinc-400">Daily incremental backup at 03:00 UTC</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={actionToggle}
                      onChange={(e) => {
                        setActionToggle(e.target.checked);
                        playSound('press', 'MICRO');
                      }}
                      className="w-5 h-5 accent-cyan-500 rounded cursor-pointer"
                    />
                  </div>
                  <div className="pt-2 border-t border-white/10 flex gap-2">
                    <button
                      onClick={handleTriggerAction}
                      disabled={actionExecuting}
                      className="flex-1 py-2.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-400 text-xs font-mono font-bold transition-all flex items-center justify-center gap-2"
                    >
                      {actionExecuting ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                          Executing Snapshot...
                        </>
                      ) : (
                        'Trigger Immediate Snapshot'
                      )}
                    </button>
                  </div>
                </div>
              ) : entry.id.includes('instrument') ? (
                /* 21. Avionics Instrument Dial Card */
                <div className={`p-6 md:p-8 rounded-3xl bg-black border border-cyan-500/50 shadow-[0_0_25px_rgba(6,182,212,0.15)] font-mono space-y-6 ${getStateClass()}`}>
                  <div className="flex items-center justify-between text-xs text-cyan-400">
                    <span>TELEMETRY AVIONICS MFD</span>
                    <span className="animate-pulse flex items-center gap-1">● ONLINE</span>
                  </div>
                  <div className="flex items-center justify-center py-2">
                    <div className="w-36 h-36 rounded-full border-4 border-cyan-500/30 border-t-cyan-400 flex flex-col items-center justify-center rotate-45 shadow-inner">
                      <span className="text-3xl font-black text-cyan-300 font-mono -rotate-45">8,420</span>
                      <span className="text-[10px] text-cyan-500 -rotate-45">RPM // MAIN CORE</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-[11px] text-zinc-400 pt-2 border-t border-zinc-800">
                    <span>THRUST: 94.2%</span>
                    <span className="text-emerald-400">TEMP: 412°K (NORMAL)</span>
                  </div>
                </div>
              ) : entry.id.includes('simulation') ? (
                /* 22. Simulation Particle Sandbox Card */
                <div className={`p-6 md:p-8 rounded-3xl bg-zinc-950 border border-purple-500/40 shadow-2xl space-y-4 ${getStateClass()}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-purple-400">PHYSICS VERLET SANDBOX</span>
                    <span className="text-xs font-mono text-zinc-500">CLICK CANVAS TO SPAWN</span>
                  </div>
                  <div
                    onClick={handleSimulationClick}
                    className="h-44 rounded-2xl bg-black/60 border border-white/10 relative overflow-hidden cursor-crosshair flex items-center justify-center"
                  >
                    {simulationNodes.map((n) => (
                      <div
                        key={n.id}
                        style={{
                          left: `${n.x}px`,
                          top: `${n.y}px`,
                          backgroundColor: n.color,
                        }}
                        className="absolute w-3.5 h-3.5 rounded-full shadow-lg animate-bounce pointer-events-none"
                      />
                    ))}
                    <div className="text-xs text-zinc-500 font-mono select-none pointer-events-none">
                      Interactive Particle Attractor Zone ({simulationNodes.length} active)
                    </div>
                  </div>
                </div>
              ) : entry.id.includes('ai') ? (
                /* 23. AI Gemini Copilot & Reasoning Card */
                <div className={`relative p-6 md:p-8 rounded-3xl bg-gradient-to-br from-zinc-950 to-zinc-900 border border-purple-500/40 shadow-2xl space-y-4 ${getStateClass()}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-purple-400 font-mono text-xs font-bold">
                      <Sparkles className="w-4 h-4 text-purple-400 animate-spin" /> GEMINI 2.5 FLASH COPILOT
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      REASONING (1.4s)
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-black/50 border border-white/5 space-y-2">
                    <div
                      onClick={() => setReasoningOpen(!reasoningOpen)}
                      className="flex items-center justify-between cursor-pointer text-xs font-mono text-purple-300"
                    >
                      <span>Chain-of-Thought Trace</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${reasoningOpen ? 'rotate-180' : ''}`} />
                    </div>
                    {reasoningOpen && (
                      <p className="text-xs text-zinc-400 font-mono leading-relaxed pt-1">
                        1. Analyzed token hierarchy for card surfaces.<br />
                        2. Verified WCAG AA contrast against dark obsidian background.<br />
                        3. Injected micro-sound triggers for tangible interaction.
                      </p>
                    )}
                  </div>

                  <p className="text-xs text-white font-sans leading-relaxed">
                    "Synthesized optimal spatial layout parameters with deterministic rendering performance."
                  </p>
                </div>
              ) : entry.id.includes('timeline') ? (
                /* 24. Timeline Milestone Audit Card */
                <div className={`p-6 md:p-8 rounded-3xl bg-zinc-900 border border-white/15 shadow-2xl space-y-6 ${getStateClass()}`}>
                  <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider">DEPLOYMENT AUDIT TIMELINE</h4>
                  <div className="space-y-4 relative pl-5 before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
                    <div className="relative flex items-start gap-3">
                      <span className="absolute -left-5 top-1.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-4 ring-emerald-500/20" />
                      <div>
                        <div className="text-xs font-bold text-white">Production Release v4.5.0 Shipped</div>
                        <div className="text-[10px] text-zinc-500 font-mono">12m ago • Alex Vance</div>
                      </div>
                    </div>
                    <div className="relative flex items-start gap-3">
                      <span className="absolute -left-5 top-1.5 w-2.5 h-2.5 rounded-full bg-cyan-400" />
                      <div>
                        <div className="text-xs font-bold text-white">Bento Grid Performance Validation</div>
                        <div className="text-[10px] text-zinc-500 font-mono">1h ago • System Bot</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Standard Generic Card */
                <div className={`p-8 rounded-3xl bg-zinc-900 border border-white/15 shadow-2xl space-y-4 ${getStateClass()}`}>
                  <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono font-bold">
                    SURFACE // {entry.component}
                  </span>
                  <h3 className="text-2xl font-bold text-white">{entry.name}</h3>
                  <p className="text-xs text-zinc-300 leading-relaxed">{entry.description}</p>
                </div>
              )}

              {/* State Indicator */}
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 pt-4">
                <span>Accessibility Level: <strong className="text-emerald-400">{entry.accessibility}</strong></span>
                <span className="text-cyan-400 font-bold uppercase">{cardState} STATE ACTIVE</span>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
