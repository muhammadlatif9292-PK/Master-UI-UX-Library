/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Sliders,
  Code,
  Copy,
  Check,
  Zap,
  Volume2,
  Vibrate,
  Layers,
  HelpCircle,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Info,
  Terminal,
  Activity,
  Smile,
  ChevronRight,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';
import { CatalogEntry } from '../../design-system/catalog/catalogTypes';
import { FeedbackVisualLanguage, StateVariant, ProgressMode, SuccessAnimationType } from '../../design-system/feedback/feedbackTypes';
import {
  Toast,
  Snackbar,
  Banner,
  Alert,
  Tooltip,
  StatusBadge,
  ProgressBar,
  Loader,
  Skeleton,
  EmptyState,
  ErrorState,
  WarningState,
  SuccessState,
  Confirmation,
  UndoBar,
} from '../../design-system/feedback/FeedbackComponents';
import { useFeedback } from '../../design-system/feedback/FeedbackContext';
import { useSound } from '../../design-system/sound/SoundContext';
import { useHaptics } from '../../design-system/haptics/HapticContext';

interface FeedbackVariantPreviewProps {
  entry: CatalogEntry;
  onOpenAiHandoff?: (entry: CatalogEntry) => void;
}

export function FeedbackVariantPreview({ entry, onOpenAiHandoff }: FeedbackVariantPreviewProps) {
  const { activeLanguage, setActiveLanguage, showToast, showSnackbar, showBanner, triggerSuccess, triggerError } = useFeedback();
  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();

  // Local interactive controls
  const [selectedVariant, setSelectedVariant] = useState<StateVariant>('success');
  const [progressVal, setProgressVal] = useState<number>(64);
  const [progressMode, setProgressMode] = useState<ProgressMode>('determinate');
  const [successAnimType, setSuccessAnimType] = useState<SuccessAnimationType>('spring-confirm');
  const [loaderType, setLoaderType] = useState<'spinner' | 'dots' | 'radar' | 'orbit' | 'bars'>('orbit');
  const [copiedCode, setCopiedCode] = useState(false);
  const [undoCounter, setUndoCounter] = useState(0);

  const visualLanguages: { id: FeedbackVisualLanguage; label: string; desc: string }[] = [
    { id: 'glass', label: 'Spatial Glass', desc: 'Frosted backdrop blur with specular rims' },
    { id: 'minimal', label: 'Swiss Minimal', desc: 'High contrast borders and refined grayscale' },
    { id: 'cyber', label: 'Cyber Telemetry', desc: 'Monospace, neon accents, and edge telemetry lines' },
    { id: 'brutalist', label: 'Neo-Brutalist', desc: 'High contrast graphic borders and offset shadows' },
    { id: 'companion', label: 'Soft Companion', desc: 'Rounded friendly micro-reassurance' },
    { id: 'editorial', label: 'Editorial Serene', desc: 'Understated serif styling and divider rules' },
  ];

  const successArchetypes: { id: SuccessAnimationType; label: string; icon: any; note: string }[] = [
    { id: 'subtle-glow', label: 'Subtle Glow', icon: Sparkles, note: 'Soft emerald radiance pulse' },
    { id: 'spring-confirm', label: 'Spring Confirm', icon: CheckCircle2, note: 'Physics-driven icon snap' },
    { id: 'morph', label: 'Morphing Check', icon: Zap, note: 'Vector rotation & path morph' },
    { id: 'restrained-particles', label: 'Restrained Sparks', icon: Sparkles, note: 'Minimal micro-dots' },
    { id: 'character-reaction', label: 'Character React', icon: Smile, note: 'Friendly gentle reassurance' },
    { id: 'harmonic-chime', label: 'Harmonic Triad', icon: Volume2, note: 'Tuned C5-E5-G5 triad' },
  ];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(entry.codeArtifact);
    setCopiedCode(true);
    playSound('tap', 'MICRO');
    triggerHaptic('light');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const renderComponentInteractive = () => {
    switch (entry.id) {
      case 'feedback-toast':
        return (
          <div className="space-y-4">
            <Toast
              title="Transaction verified in block #9812"
              message="Cryptographic verification took 142ms. Zero validation errors."
              variant={selectedVariant}
              language={activeLanguage}
              actionLabel="View Explorer"
              undoable
              onUndo={() => {
                setUndoCounter((c) => c + 1);
                playSound('toggle', 'MICRO');
              }}
              onAction={() => playSound('tap', 'MICRO')}
            />
            <div className="flex flex-wrap gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  showToast({
                    variant: selectedVariant,
                    title: `Live Global Toast (${selectedVariant.toUpperCase()})`,
                    message: 'Dispatched through centralized FeedbackContext queue with sound & haptic sync.',
                    undoable: true,
                    onUndo: () => console.log('Undo triggered'),
                  });
                }}
                className="px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Spawn Live Global Toast
              </button>
            </div>
          </div>
        );

      case 'feedback-snackbar':
        return (
          <div className="space-y-4">
            <Snackbar
              message='Project "Quantum Telemetry v3" archived.'
              actionLabel="Undo"
              language={activeLanguage}
              onAction={() => {
                setUndoCounter((c) => c + 1);
                playSound('toggle', 'MICRO');
              }}
            />
            <div className="flex flex-wrap gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  showSnackbar('Message moved to Trash folder.', 'Undo', () => {
                    playSound('toggle', 'MICRO');
                  });
                }}
                className="px-3.5 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Spawn Bottom-Docked Snackbar
              </button>
            </div>
          </div>
        );

      case 'feedback-banner':
        return (
          <Banner
            title="Scheduled Database Maintenance Tonight"
            message="Database read replicas will undergo automated zero-downtime rolling patch updates at 02:00 UTC."
            variant={selectedVariant}
            language={activeLanguage}
            actionLabel="View Status Page"
            onAction={() => playSound('tap', 'MICRO')}
          />
        );

      case 'feedback-alert':
        return (
          <Alert
            title="Two-Factor Authentication Enforced"
            message="Your organization policy requires hardware key or authenticator app enrollment before accessing staging environments."
            variant={selectedVariant}
            language={activeLanguage}
          />
        );

      case 'feedback-tooltip':
        return (
          <div className="p-8 flex items-center justify-center gap-4 bg-zinc-950/40 rounded-2xl border border-zinc-800/80">
            <Tooltip content="Execute batch compilation test" shortcut="⌘B" language={activeLanguage} position="top">
              <button
                type="button"
                className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold border border-zinc-700 transition-colors shadow-lg"
              >
                Hover Me (Top Tooltip)
              </button>
            </Tooltip>

            <Tooltip content="Revert local staged modifications" shortcut="⌘Z" language={activeLanguage} position="bottom">
              <button
                type="button"
                className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold border border-zinc-700 transition-colors shadow-lg"
              >
                Hover Me (Bottom Tooltip)
              </button>
            </Tooltip>
          </div>
        );

      case 'feedback-badge':
        return (
          <div className="flex flex-wrap items-center gap-3 p-6 bg-zinc-950/40 rounded-2xl border border-zinc-800/80">
            <StatusBadge label="All Systems Operational" variant="success" pulse language={activeLanguage} />
            <StatusBadge label="Cluster Degraded" variant="warning" pulse language={activeLanguage} />
            <StatusBadge label="Worker Offline" variant="error" language={activeLanguage} />
            <StatusBadge label="Syncing Telemetry" variant="info" pulse language={activeLanguage} />
            <StatusBadge label="Draft Mode" variant="neutral" language={activeLanguage} />
          </div>
        );

      case 'feedback-progress':
        return (
          <div className="space-y-6 p-6 bg-zinc-950/40 rounded-2xl border border-zinc-800/80">
            <div className="flex flex-wrap gap-2 pb-2">
              {(['determinate', 'indeterminate', 'segmented', 'circular'] as ProgressMode[]).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => {
                    setProgressMode(m);
                    playSound('tap', 'MICRO');
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-mono uppercase transition-colors ${
                    progressMode === m ? 'bg-cyan-500 text-black font-bold' : 'bg-zinc-900 text-zinc-400 hover:text-white'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            <ProgressBar
              value={progressVal}
              mode={progressMode}
              segments={6}
              label="Neural Vector Indexing"
              variant={selectedVariant}
              language={activeLanguage}
            />

            {progressMode !== 'indeterminate' && (
              <div className="flex items-center gap-3 pt-2">
                <span className="text-xs text-zinc-400 font-mono">Adjust Progress:</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progressVal}
                  onChange={(e) => setProgressVal(Number(e.target.value))}
                  className="flex-1 accent-cyan-400"
                />
                <span className="text-xs font-mono font-bold text-white w-10 text-right">{progressVal}%</span>
              </div>
            )}
          </div>
        );

      case 'feedback-loader':
        return (
          <div className="space-y-6 p-6 bg-zinc-950/40 rounded-2xl border border-zinc-800/80">
            <div className="flex flex-wrap gap-2 pb-2">
              {(['spinner', 'dots', 'radar', 'orbit', 'bars'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    setLoaderType(type);
                    playSound('tap', 'MICRO');
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-mono uppercase transition-colors ${
                    loaderType === type ? 'bg-cyan-500 text-black font-bold' : 'bg-zinc-900 text-zinc-400 hover:text-white'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-center p-8 bg-zinc-900/50 rounded-xl border border-zinc-800">
              <Loader type={loaderType} size="lg" variant={selectedVariant} language={activeLanguage} />
            </div>
          </div>
        );

      case 'feedback-skeleton':
        return (
          <div className="space-y-4 p-6 bg-zinc-950/40 rounded-2xl border border-zinc-800/80">
            <p className="text-xs text-zinc-400 font-mono">Wave Shimmering Layout Skeletons:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Skeleton variant="avatar-row" language={activeLanguage} />
              <Skeleton variant="text" language={activeLanguage} />
            </div>
            <Skeleton variant="card" language={activeLanguage} />
          </div>
        );

      case 'feedback-empty':
        return (
          <EmptyState
            title="Zero telemetry telemetry traces recorded"
            description="Activate live probes or query database collections to inspect real-time logs."
            actionLabel="Initialize Active Probe"
            onAction={() => {
              triggerSuccess('Active probe initiated', 'Streaming real-time metrics.');
            }}
            language={activeLanguage}
          />
        );

      case 'feedback-error':
        return (
          <div className="space-y-4">
            <ErrorState
              code="ERR_UPSTREAM_GATEWAY_504"
              title="Cluster gateway unreachable"
              message="The primary node failed to respond within 4500ms. Local state is safely preserved and automatic retry token generated."
              onRetry={() => {
                playSound('processing', 'STATE');
                setTimeout(() => {
                  triggerSuccess('Gateway recovered', 'Secure websocket reconnect verified.');
                }, 800);
              }}
              onDiagnose={() => playSound('notification', 'STATE')}
              language={activeLanguage}
            />
          </div>
        );

      case 'feedback-warning':
        return (
          <WarningState
            title="Bandwidth quota threshold reached (88%)"
            message="Outbound egress reached 8.8 GB. Throttling will activate once 10.0 GB threshold is crossed."
            actionLabel="Increase Limit"
            onAction={() => triggerSuccess('Limit updated', 'Allocated 25 GB egress headroom.')}
            language={activeLanguage}
          />
        );

      case 'feedback-success':
        return (
          <div className="space-y-4">
            {/* Success Archetype Selector */}
            <div className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800 space-y-2">
              <span className="text-[11px] font-mono uppercase text-zinc-400">Select Restrained Archetype:</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {successArchetypes.map((arch) => (
                  <button
                    key={arch.id}
                    type="button"
                    onClick={() => {
                      setSuccessAnimType(arch.id);
                      playSound('success', 'STATE');
                      triggerHaptic('success');
                    }}
                    className={`p-2 rounded-lg text-left text-xs transition-all border ${
                      successAnimType === arch.id
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 shadow-sm'
                        : 'bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <div className="font-bold flex items-center gap-1.5">
                      <arch.icon className="w-3.5 h-3.5" />
                      <span>{arch.label}</span>
                    </div>
                    <p className="text-[10px] text-zinc-500 mt-0.5">{arch.note}</p>
                  </button>
                ))}
              </div>
            </div>

            <SuccessState
              title="Deployment verified & active"
              message="Artifact bundle hash SHA-256 confirmed across 24 global edge servers."
              animationType={successAnimType}
              language={activeLanguage}
              onDone={() => playSound('toggle', 'MICRO')}
            />
          </div>
        );

      case 'feedback-confirmation':
        return (
          <Confirmation
            title="Permanently remove database replica?"
            description="This will de-provision read instance `us-east-1a`. All traffic will fail over seamlessly to `us-east-1b`."
            confirmLabel="Remove Replica"
            cancelLabel="Keep Running"
            destructive
            onConfirm={() => triggerSuccess('Replica decommissioned', 'Traffic rerouted.')}
            onCancel={() => playSound('collapse', 'MICRO')}
            language={activeLanguage}
          />
        );

      case 'feedback-undo':
        return (
          <div className="space-y-4">
            <UndoBar
              message={`Deleted file "telemetry_logs_2026.csv"`}
              duration={5}
              onUndo={() => {
                setUndoCounter((c) => c + 1);
                triggerSuccess('File restored', 'Recovered to original directory.');
              }}
              language={activeLanguage}
            />
            <p className="text-xs font-mono text-zinc-400">Total undos executed this session: <span className="text-cyan-400 font-bold">{undoCounter}</span></p>
          </div>
        );

      default:
        return <Toast title="Preview component" message={entry.description} variant={selectedVariant} language={activeLanguage} />;
    }
  };

  return (
    <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-6">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white tracking-tight">{entry.name}</h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800 uppercase">
              {entry.family}
            </span>
          </div>
          <p className="text-xs text-zinc-400 max-w-xl">{entry.description}</p>
        </div>

        <div className="flex items-center gap-2">
          {onOpenAiHandoff && (
            <button
              type="button"
              onClick={() => onOpenAiHandoff(entry)}
              className="px-3 py-1.5 rounded-xl bg-purple-950/80 hover:bg-purple-900 border border-purple-800 text-purple-300 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Spec</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleCopyCode}
            className="px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedCode ? 'Copied' : 'Copy JSX'}</span>
          </button>
        </div>
      </div>

      {/* Visual Language Switcher Bar */}
      <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase text-zinc-400 flex items-center gap-1.5">
            <Sliders className="w-3 h-3 text-cyan-400" />
            <span>Active Visual Language:</span>
          </span>
          <span className="text-xs font-bold text-cyan-400 uppercase font-mono">{activeLanguage}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {visualLanguages.map((lang) => (
            <button
              key={lang.id}
              type="button"
              onClick={() => {
                setActiveLanguage(lang.id);
                playSound('SWITCH');
                triggerHaptic('light');
              }}
              className={`p-2 rounded-xl text-left border transition-all ${
                activeLanguage === lang.id
                  ? 'bg-cyan-500/10 border-cyan-500 text-cyan-300 shadow-md ring-1 ring-cyan-500/30'
                  : 'bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
              }`}
            >
              <p className="text-xs font-bold">{lang.label}</p>
              <p className="text-[9px] text-zinc-500 line-clamp-1 mt-0.5">{lang.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Semantic Variant Pills */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono text-zinc-400 mr-2">State Variant:</span>
        {(['success', 'error', 'warning', 'info', 'neutral'] as StateVariant[]).map((v) => (
          <button
            key={v}
            type="button"
            onClick={() => {
              setSelectedVariant(v);
              playSound(v === 'error' ? 'error' : v === 'warning' ? 'warning' : 'tap', 'STATE');
            }}
            className={`px-3 py-1 rounded-lg text-xs font-medium uppercase transition-colors ${
              selectedVariant === v
                ? v === 'success' ? 'bg-emerald-500 text-black font-bold' :
                  v === 'error' ? 'bg-rose-500 text-white font-bold' :
                  v === 'warning' ? 'bg-amber-400 text-black font-bold' :
                  v === 'info' ? 'bg-cyan-400 text-black font-bold' :
                  'bg-zinc-200 text-black font-bold'
                : 'bg-zinc-900 text-zinc-400 hover:text-white'
            }`}
          >
            {v}
          </button>
        ))}
      </div>

      {/* Live Interactive Canvas */}
      <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/80 min-h-[220px] flex items-center justify-center">
        <div className="w-full max-w-xl">
          {renderComponentInteractive()}
        </div>
      </div>

      {/* Deep Specification Breakdown */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
          <span className="text-[10px] font-mono uppercase text-zinc-400">Sound Profile</span>
          <p className="text-xs font-bold text-cyan-400 truncate">{entry.soundStyle}</p>
        </div>
        <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
          <span className="text-[10px] font-mono uppercase text-zinc-400">Motion System</span>
          <p className="text-xs font-bold text-emerald-400 truncate">{entry.motionStyle}</p>
        </div>
        <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
          <span className="text-[10px] font-mono uppercase text-zinc-400">Accessibility</span>
          <p className="text-xs font-bold text-purple-400">WCAG {entry.accessibility}</p>
        </div>
        <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
          <span className="text-[10px] font-mono uppercase text-zinc-400">Performance</span>
          <p className="text-xs font-bold text-amber-400 capitalize">{entry.performanceTier}</p>
        </div>
      </div>
    </div>
  );
}
