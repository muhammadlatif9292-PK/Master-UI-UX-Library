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
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  RefreshCw,
  Play,
  RotateCcw,
  Zap,
  Plus,
  Settings,
  ChevronDown,
  Trash2,
  Compass,
  Search,
  Camera,
  Heart,
  Volume2 as VolumeIcon,
  Download,
  Lock,
} from 'lucide-react';

interface ButtonVariantPreviewProps {
  entry: CatalogEntry;
  onClose?: () => void;
}

export function ButtonVariantPreview({ entry, onClose }: ButtonVariantPreviewProps) {
  const { theme } = useTheme();
  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();

  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'handoff'>('preview');
  const [forcedState, setForcedState] = useState<'interactive' | 'idle' | 'hover' | 'focus' | 'press' | 'disabled' | 'loading' | 'success' | 'error'>('interactive');
  const [interactiveStatus, setInteractiveStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [holdProgress, setHoldProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isSpeedDialOpen, setIsSpeedDialOpen] = useState(false);
  const [progressPercent, setProgressPercent] = useState(45);
  const holdIntervalRef = useRef<any>(null);

  // Sound trigger only when assigned/meaningful
  const handleButtonTrigger = () => {
    if (forcedState === 'disabled' || forcedState === 'loading') return;

    if (entry.soundStyle && entry.soundStyle !== 'None') {
      if (entry.soundStyle.toLowerCase().includes('glass') || entry.soundStyle.toLowerCase().includes('crystal')) {
        playSound('glass', 'MICRO');
      } else if (entry.soundStyle.toLowerCase().includes('bubble') || entry.soundStyle.toLowerCase().includes('pop')) {
        playSound('pop', 'MICRO');
      } else if (entry.soundStyle.toLowerCase().includes('warning') || entry.soundStyle.toLowerCase().includes('error')) {
        playSound('warning', 'NOTIFICATION');
      } else if (entry.soundStyle.toLowerCase().includes('success') || entry.soundStyle.toLowerCase().includes('positive')) {
        playSound('chime', 'NOTIFICATION');
      } else if (entry.soundStyle.toLowerCase().includes('switch') || entry.soundStyle.toLowerCase().includes('click')) {
        playSound('press', 'MICRO');
      } else {
        playSound('press', 'MICRO');
      }
    }

    if (entry.hapticStyle) {
      if (entry.hapticStyle.toLowerCase().includes('heavy')) {
        triggerHaptic('heavy');
      } else if (entry.hapticStyle.toLowerCase().includes('pulse') || entry.hapticStyle.toLowerCase().includes('success')) {
        triggerHaptic('success');
      } else {
        triggerHaptic('press');
      }
    }

    // Toggle favorite state
    if (entry.id.includes('favorite') || entry.id.includes('heart') || entry.id.includes('bookmark')) {
      setIsFavorited(!isFavorited);
    }

    // Toggle speed dial
    if (entry.id.includes('speeddial') || entry.id.includes('fab')) {
      setIsSpeedDialOpen(!isSpeedDialOpen);
    }

    // Simulate async resolution if button is an async or loading or morphing type
    if (entry.tags.includes('morphing') || entry.tags.includes('loading') || entry.tags.includes('ai') || entry.id.includes('generative')) {
      setInteractiveStatus('loading');
      setTimeout(() => {
        setInteractiveStatus('success');
        setTimeout(() => setInteractiveStatus('idle'), 2500);
      }, 1500);
    }
  };

  // Hold to confirm physics
  const startHold = () => {
    if (forcedState === 'disabled') return;
    setIsHolding(true);
    let current = 0;
    holdIntervalRef.current = setInterval(() => {
      current += 5;
      setHoldProgress(current);
      if (current >= 100) {
        clearInterval(holdIntervalRef.current);
        setIsHolding(false);
        setHoldProgress(100);
        playSound('chime', 'NOTIFICATION');
        triggerHaptic('success');
        setInteractiveStatus('success');
        setTimeout(() => {
          setHoldProgress(0);
          setInteractiveStatus('idle');
        }, 2000);
      }
    }, 40);
  };

  const endHold = () => {
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
    }
    if (holdProgress < 100) {
      setHoldProgress(0);
    }
    setIsHolding(false);
  };

  useEffect(() => {
    return () => {
      if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    };
  }, []);

  const currentState = forcedState === 'interactive' ? interactiveStatus : forcedState;

  return (
    <div className={`p-6 md:p-12 rounded-3xl ${theme.surface.primary} border ${theme.border.default} space-y-8 shadow-2xl max-w-5xl mx-auto`}>
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase">
              Action Family • {entry.component}
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
            <Eye className="w-4 h-4" /> Live Preview
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
          {/* State Controller Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-black/40 p-3.5 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Simulate State:</span>
              <div className="flex flex-wrap items-center gap-1.5">
                {(['interactive', 'idle', 'hover', 'focus', 'press', 'disabled', 'loading', 'success', 'error'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setForcedState(st)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono capitalize transition-all ${
                      forcedState === st
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
                <Volume2 className="w-3.5 h-3.5" /> Sound: {entry.soundStyle}
              </span>
              <span className="flex items-center gap-1 text-purple-400">
                <Vibrate className="w-3.5 h-3.5" /> Haptic: {entry.hapticStyle}
              </span>
              <span className="flex items-center gap-1 text-emerald-400">
                <Shield className="w-3.5 h-3.5" /> A11y: {entry.accessibility}
              </span>
            </div>
          </div>

          {/* Interactive Live Canvas */}
          <div className="min-h-[380px] p-12 rounded-3xl bg-zinc-950 border border-white/10 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl">
            {/* Background Grid Accent */}
            <div className="absolute inset-0 bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

            {/* Hold to Confirm Variant */}
            {entry.id.includes('hold-to-confirm') ? (
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div
                  onMouseDown={startHold}
                  onMouseUp={endHold}
                  onTouchStart={startHold}
                  onTouchEnd={endHold}
                  className={`relative cursor-pointer select-none px-10 py-4 rounded-2xl bg-zinc-900 border-2 overflow-hidden transition-all duration-200 ${
                    isHolding ? 'scale-95 border-amber-400 shadow-lg shadow-amber-500/20' : 'border-amber-500/50 hover:border-amber-400'
                  }`}
                >
                  <div
                    className="absolute top-0 bottom-0 left-0 bg-amber-500/30 transition-all"
                    style={{ width: `${holdProgress}%` }}
                  />
                  <div className="relative z-10 flex items-center gap-3 font-mono font-bold text-sm text-amber-400">
                    <Lock className="w-4 h-4" />
                    <span>{holdProgress >= 100 ? 'CONFIRMED!' : isHolding ? `Holding... ${holdProgress}%` : 'Press & Hold 1.5s'}</span>
                  </div>
                </div>
                <span className="text-[11px] font-mono text-zinc-500">Hold mouse or touch to test safety threshold</span>
              </div>
            ) : entry.id.includes('swipe-to-unlock') ? (
              /* Swipe to Unlock Variant */
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="relative w-80 h-14 rounded-full bg-zinc-900 border border-white/20 p-1.5 flex items-center shadow-2xl overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-cyan-500/20 transition-all"
                    style={{ width: `${sliderPosition + 40}px` }}
                  />
                  <div
                    onMouseDown={() => {
                      setSliderPosition(220);
                      playSound('chime', 'NOTIFICATION');
                      triggerHaptic('success');
                      setTimeout(() => setSliderPosition(0), 1200);
                    }}
                    style={{ transform: `translateX(${sliderPosition}px)` }}
                    className="w-11 h-11 rounded-full bg-cyan-500 text-zinc-950 font-bold flex items-center justify-center cursor-grab active:cursor-grabbing shadow-lg shadow-cyan-500/40 transition-transform duration-300"
                  >
                    →
                  </div>
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-mono tracking-widest text-zinc-400 pointer-events-none uppercase">
                    {sliderPosition >= 200 ? 'UNLOCKED' : 'Slide To Execute'}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-zinc-500">Click arrow to trigger slide transition</span>
              </div>
            ) : entry.id.includes('speeddial') || entry.id.includes('fab') ? (
              /* Speed Dial Expanding FAB */
              <div className="relative z-10 flex flex-col items-center gap-4">
                <div className="relative flex flex-col items-center">
                  {isSpeedDialOpen && (
                    <div className="mb-4 flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200">
                      <button
                        onClick={handleButtonTrigger}
                        className="w-11 h-11 rounded-full bg-cyan-500 text-zinc-950 flex items-center justify-center shadow-lg hover:scale-110 active:scale-90 transition-transform"
                      >
                        <Sparkles className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleButtonTrigger}
                        className="w-11 h-11 rounded-full bg-purple-500 text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-90 transition-transform"
                      >
                        <Search className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                  <button
                    onClick={handleButtonTrigger}
                    className={`w-16 h-16 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-2xl flex items-center justify-center transition-all ${
                      isSpeedDialOpen ? 'rotate-45 bg-zinc-800' : 'hover:scale-110 active:scale-95'
                    }`}
                  >
                    <Plus className="w-7 h-7" />
                  </button>
                </div>
                <span className="text-[11px] font-mono text-zinc-500">Click FAB to expand speed-dial cluster</span>
              </div>
            ) : entry.id.includes('progress-inline') || entry.id.includes('pie-fill') ? (
              /* Progress Button Simulation */
              <div className="relative z-10 flex flex-col items-center gap-4">
                <button
                  onClick={() => {
                    setProgressPercent((prev) => (prev >= 100 ? 0 : prev + 25));
                    handleButtonTrigger();
                  }}
                  className="relative w-60 py-3.5 rounded-2xl bg-zinc-900 border border-cyan-500/50 overflow-hidden text-xs font-mono font-bold text-white shadow-xl hover:border-cyan-400 active:scale-98 transition-all"
                >
                  <div
                    className="absolute inset-y-0 left-0 bg-cyan-500/30 transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Upload Stream: {progressPercent}%</span>
                  </span>
                </button>
                <span className="text-[11px] font-mono text-zinc-500">Click to advance progress percentage</span>
              </div>
            ) : entry.id.includes('favorite') || entry.id.includes('heart') ? (
              /* Favorite Heart Toggle */
              <div className="relative z-10 flex flex-col items-center gap-4">
                <button
                  onClick={handleButtonTrigger}
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isFavorited
                      ? 'bg-red-500/20 text-red-500 border border-red-500/40 scale-110 shadow-lg shadow-red-500/30'
                      : 'bg-zinc-900 text-zinc-400 border border-white/10 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  <Heart className={`w-6 h-6 ${isFavorited ? 'fill-current' : ''}`} />
                </button>
                <span className="text-[11px] font-mono text-zinc-500">
                  {isFavorited ? 'Bookmarked in Personal Collection' : 'Click to trigger like particle micro-interaction'}
                </span>
              </div>
            ) : (
              /* Dynamic Standard / Styled Action Button */
              <div className="relative z-10 flex flex-col items-center gap-4">
                <button
                  onClick={handleButtonTrigger}
                  disabled={currentState === 'disabled'}
                  className={`relative select-none font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2.5 ${
                    /* Material / Visual Style Adaptations */
                    entry.id.includes('neon') || entry.id.includes('cyber')
                      ? 'px-8 py-3.5 rounded-xl bg-black border-2 border-cyan-400 text-cyan-400 font-mono tracking-widest shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:bg-cyan-400 hover:text-black active:scale-95'
                      : entry.id.includes('brutalist')
                      ? 'px-8 py-3.5 rounded-xl bg-yellow-400 border-3 border-black text-black font-black text-sm shadow-[5px_5px_0_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_#000]'
                      : entry.id.includes('glass') || entry.id.includes('crystal')
                      ? 'px-8 py-3.5 rounded-full bg-white/10 backdrop-blur-2xl border border-white/30 text-white shadow-2xl hover:bg-white/20 active:scale-95'
                      : entry.id.includes('liquid')
                      ? 'px-8 py-3.5 rounded-2xl bg-gradient-to-r from-teal-400 to-cyan-500 text-zinc-950 font-bold shadow-xl shadow-cyan-500/30 hover:scale-105 active:scale-95'
                      : entry.id.includes('titanium') || entry.id.includes('metallic')
                      ? 'px-8 py-3.5 rounded-xl bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900 text-zinc-100 border border-zinc-500/40 shadow-inner hover:brightness-110 active:brightness-95'
                      : entry.id.includes('gold') || entry.id.includes('luxury')
                      ? 'px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 text-zinc-950 font-bold uppercase tracking-wider shadow-xl hover:shadow-amber-500/30 hover:brightness-110 active:scale-95'
                      : entry.id.includes('danger') || entry.id.includes('destructive')
                      ? 'px-8 py-3.5 rounded-xl bg-red-600/20 border-2 border-red-500 text-red-400 shadow-lg shadow-red-500/20 hover:bg-red-600 hover:text-white active:scale-95'
                      : entry.id.includes('ai') || entry.id.includes('generative')
                      ? 'px-8 py-3.5 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold shadow-xl shadow-purple-500/30 hover:scale-105 active:scale-95'
                      : entry.id.includes('mechanical') || entry.id.includes('tactile')
                      ? 'px-7 py-4 rounded-xl bg-zinc-900 border-2 border-zinc-700 text-cyan-400 font-mono shadow-[0_6px_0_#27272a] active:shadow-none active:translate-y-[6px]'
                      : 'px-8 py-3.5 rounded-2xl bg-cyan-500 text-zinc-950 font-bold shadow-lg shadow-cyan-500/20 hover:bg-cyan-400 active:scale-95'
                  } ${
                    currentState === 'hover' ? 'brightness-125 scale-105' : ''
                  } ${
                    currentState === 'focus' ? 'ring-4 ring-cyan-400/50' : ''
                  } ${
                    currentState === 'press' ? 'scale-95 brightness-90' : ''
                  } ${
                    currentState === 'disabled' ? 'opacity-40 cursor-not-allowed filter grayscale' : 'cursor-pointer'
                  }`}
                >
                  {currentState === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : currentState === 'success' ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Action Resolved</span>
                    </>
                  ) : currentState === 'error' ? (
                    <>
                      <AlertCircle className="w-4 h-4 text-red-400" />
                      <span>Execution Halted</span>
                    </>
                  ) : (
                    <>
                      {entry.tags.includes('ai') && <Sparkles className="w-4 h-4 animate-pulse" />}
                      {entry.component === 'IconButton' && <Settings className="w-5 h-5" />}
                      <span>{entry.name.replace(' Button', '').replace(' Action', '')}</span>
                    </>
                  )}
                </button>

                <span className="text-[11px] font-mono text-zinc-500">
                  Current Simulation State:{' '}
                  <span className="text-cyan-400 font-bold uppercase">{currentState}</span>
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
