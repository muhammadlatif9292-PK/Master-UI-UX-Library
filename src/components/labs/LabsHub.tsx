/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, Suspense, lazy } from 'react';
import {
  Sliders,
  Zap,
  Music,
  Vibrate,
  Gauge,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Activity,
  Award,
  Cpu,
  BookOpen,
  Eye,
  Settings2,
  Workflow,
  CheckCircle2,
} from 'lucide-react';
import { CATALOG_REGISTRY } from '../../design-system/catalog/catalogRegistry';
import { useExperienceLevel } from '../../design-system/experience/ExperienceLevelContext';

const TokenPlayground = lazy(() => import('../TokenPlayground').then((m) => ({ default: m.TokenPlayground })));
const MotionLab = lazy(() => import('../MotionLab').then((m) => ({ default: m.MotionLab })));
const SoundLab = lazy(() => import('../SoundLab').then((m) => ({ default: m.SoundLab })));
const HapticLab = lazy(() => import('../HapticLab').then((m) => ({ default: m.HapticLab })));
const PerformanceLab = lazy(() => import('../performance/PerformanceLab').then((m) => ({ default: m.PerformanceLab })));
const AccessibilityLab = lazy(() => import('../accessibility/AccessibilityLab').then((m) => ({ default: m.AccessibilityLab })));
const ResponsiveTestingLab = lazy(() => import('../responsive/ResponsiveTestingLab').then((m) => ({ default: m.ResponsiveTestingLab })));
const VariantScalingStudio = lazy(() => import('../VariantScalingStudio').then((m) => ({ default: m.VariantScalingStudio })));
const CuratorReviewStudio = lazy(() => import('../CuratorReviewStudio').then((m) => ({ default: m.CuratorReviewStudio })));
const ProvenanceLab = lazy(() => import('../provenance/ProvenanceLab').then((m) => ({ default: m.ProvenanceLab })));
const ReuseExportStudio = lazy(() => import('../export/ReuseExportStudio').then((m) => ({ default: m.ReuseExportStudio })));
const StateInspector = lazy(() => import('../StateInspector').then((m) => ({ default: m.StateInspector })));
const EventBusInspector = lazy(() => import('../EventBusInspector').then((m) => ({ default: m.EventBusInspector })));
const ArchitectureDemonstration = lazy(() => import('../ArchitectureDemonstration').then((m) => ({ default: m.ArchitectureDemonstration })));

export type LabGoal = 'tune' | 'understand' | 'create' | 'curate';

export type LabToolId =
  | 'motion'
  | 'sound'
  | 'haptics'
  | 'performance'
  | 'accessibility'
  | 'responsive'
  | 'tokens'
  | 'events'
  | 'architecture'
  | 'variant-scaling'
  | 'inspector'
  | 'curator-review'
  | 'provenance'
  | 'export';

interface LabToolMeta {
  id: LabToolId;
  goal: LabGoal;
  label: string;
  shortDesc: string;
  icon: any;
  badge?: string;
}

export const LAB_TOOLS: LabToolMeta[] = [
  // TUNE (Sensory & Runtime Quality)
  { id: 'motion', goal: 'tune', label: 'Motion Physics', shortDesc: '24 spring physics primitives & ease curves', icon: Zap, badge: '24 Springs' },
  { id: 'sound', goal: 'tune', label: 'Sound Synthesizer', shortDesc: 'Web Audio polyphonic tones & chords', icon: Music, badge: 'Web Audio' },
  { id: 'haptics', goal: 'tune', label: 'Tactile Haptics', shortDesc: 'Navigator vibration pulse patterns', icon: Vibrate, badge: 'Haptics' },
  { id: 'performance', goal: 'tune', label: 'Performance Tiers', shortDesc: 'Tiers 1-3 Governor & idle loop limiter', icon: Gauge, badge: 'Tiers 1-3' },
  { id: 'accessibility', goal: 'tune', label: 'WCAG AAA Audit', shortDesc: '12-vector contrast & screen-reader tester', icon: ShieldCheck, badge: '12-Vector' },
  { id: 'responsive', goal: 'tune', label: '7-Device Simulator', shortDesc: 'Foldable, mobile, tablet & ultra-wide testing', icon: Smartphone, badge: '7 Devices' },

  // UNDERSTAND (Tokens & Architecture)
  { id: 'tokens', goal: 'understand', label: 'Tokens & Themes', shortDesc: 'Interactive color, border & typography tokens', icon: Sliders, badge: '12 Archetypes' },
  { id: 'events', goal: 'understand', label: 'Experience Event Bus', shortDesc: 'Decoupled pub/sub telemetry stream', icon: Activity, badge: 'Telemetry' },
  { id: 'architecture', goal: 'understand', label: 'System Architecture', shortDesc: 'Complete domain engine layout & contracts', icon: BookOpen, badge: 'Specs' },

  // CREATE (Generation & Inspection)
  { id: 'variant-scaling', goal: 'create', label: 'Create More Variations', shortDesc: 'Algorithmic 52+ variant permutation scaling', icon: Sparkles, badge: '52 Variants' },
  { id: 'inspector', goal: 'create', label: '5D States Inspector', shortDesc: 'Test hover, focus, press, error & loading', icon: Eye, badge: '5D States' },

  // CURATE (Certification & Export)
  { id: 'curator-review', goal: 'curate', label: 'Review & Quality', shortDesc: 'Production certification & scorecards', icon: Award, badge: 'Production' },
  { id: 'provenance', goal: 'curate', label: 'Source & License', shortDesc: 'SPDX 2.3 licensing, authors & SHA-256 hashes', icon: ShieldCheck, badge: 'SPDX 2.3' },
  { id: 'export', goal: 'curate', label: 'Use in My App', shortDesc: 'Multi-format React/Vue/HTML/Prompt exporter', icon: Cpu, badge: 'Export' },
];

export const LAB_GOALS: { id: LabGoal; label: string; description: string; icon: any }[] = [
  { id: 'tune', label: 'Tune & Polish', description: 'Sensory physics, device simulation, sound, haptics & performance', icon: Zap },
  { id: 'understand', label: 'Understand', description: 'Design tokens, color themes, event streams & architecture', icon: BookOpen },
  { id: 'create', label: 'Create & Test', description: 'Variant scaling studio & deep 5D interactive state testing', icon: Sparkles },
  { id: 'curate', label: 'Curate & Export', description: 'Quality scorecards, licensing provenance & app integration exports', icon: CheckCircle2 },
];

interface LabsHubProps {
  initialTool?: LabToolId;
}

export function LabsHub({ initialTool = 'motion' }: LabsHubProps) {
  const { setExperienceLevel, isStandard, isAdvanced } = useExperienceLevel();
  const [activeTool, setActiveTool] = useState<LabToolId>(initialTool);
  const [inspectorEntryId, setInspectorEntryId] = useState<string>(CATALOG_REGISTRY[0]?.id || 'cinematic-mascot-auth');
  const [selectedExportEntryId, setSelectedExportEntryId] = useState<string>(CATALOG_REGISTRY[0]?.id || 'cinematic-mascot-auth');

  const currentTool = LAB_TOOLS.find((t) => t.id === activeTool) || LAB_TOOLS[0];
  const activeGoal = LAB_GOALS.find((g) => g.id === currentTool.goal) || LAB_GOALS[0];

  const inspectorEntry = CATALOG_REGISTRY.find((c) => c.id === inspectorEntryId) || CATALOG_REGISTRY[0];
  const exportEntry = CATALOG_REGISTRY.find((c) => c.id === selectedExportEntryId) || CATALOG_REGISTRY[0];

  return (
    <div className="space-y-6">
      {/* Standard Mode Banner */}
      {isStandard && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-950/40 via-zinc-900 to-cyan-950/40 border border-purple-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-purple-500/20 border border-purple-500/40 text-purple-300 font-bold">
                Standard Mode Active
              </span>
              <span className="text-xs font-semibold text-zinc-300">
                Complexity hidden by default
              </span>
            </div>
            <p className="text-xs text-zinc-400 max-w-2xl">
              Standard mode keeps your workspace clean, revealing core tools (Home, Explore, Preview, Customize, Compare, Save, Code, AI Prompt). Switch to Advanced Mode to unlock all 14 laboratory engines, raw token JSON, and deep internal specs.
            </p>
          </div>
          <button
            onClick={() => setExperienceLevel('advanced')}
            className="px-4 py-2 rounded-xl bg-purple-500 text-white font-semibold text-xs shrink-0 hover:bg-purple-400 shadow-md shadow-purple-500/20 transition-all font-mono"
          >
            Enable Advanced Mode
          </button>
        </div>
      )}

      {/* 1. Goal-Oriented Header and Tool Selector */}
      <div className="p-5 sm:p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800/90 shadow-xl space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                ADVANCED LABS
              </span>
              <span className="text-xs text-zinc-400 font-mono">
                {activeGoal.label}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              {React.createElement(currentTool.icon, { className: 'w-6 h-6 text-cyan-400' })}
              {currentTool.label}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl">
              {currentTool.shortDesc}
            </p>
          </div>
        </div>

        {/* Goal Categories Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-zinc-800/60">
          {LAB_GOALS.map((goal) => {
            const GoalIcon = goal.icon;
            const isGoalActive = currentTool.goal === goal.id;
            const toolsInGoal = LAB_TOOLS.filter((t) => t.goal === goal.id);

            return (
              <div
                key={goal.id}
                className={`p-3 rounded-xl border transition-all ${
                  isGoalActive
                    ? 'bg-zinc-950/90 border-cyan-500/40 ring-1 ring-cyan-500/20'
                    : 'bg-zinc-950/40 border-zinc-800/60'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <GoalIcon className={`w-4 h-4 ${isGoalActive ? 'text-cyan-400' : 'text-zinc-500'}`} />
                  <span className={`text-xs font-bold ${isGoalActive ? 'text-cyan-300' : 'text-zinc-400'}`}>
                    {goal.label}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {toolsInGoal.map((tool) => {
                    const isSelected = activeTool === tool.id;
                    return (
                      <button
                        key={tool.id}
                        onClick={() => setActiveTool(tool.id)}
                        className={`text-[11px] px-2 py-1 rounded-lg font-medium transition-all ${
                          isSelected
                            ? 'bg-cyan-500 text-zinc-950 font-bold shadow-sm'
                            : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                        }`}
                      >
                        {tool.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Tool Specific Content View */}
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-20 text-zinc-500 font-mono text-xs gap-3">
            <div className="w-4 h-4 rounded-full border-2 border-cyan-500/40 border-t-cyan-400 animate-spin" />
            Loading laboratory engine...
          </div>
        }
      >
        {activeTool === 'motion' && <MotionLab />}
        {activeTool === 'sound' && <SoundLab />}
        {activeTool === 'haptics' && <HapticLab />}
        {activeTool === 'performance' && <PerformanceLab />}
        {activeTool === 'accessibility' && <AccessibilityLab />}
        {activeTool === 'responsive' && <ResponsiveTestingLab />}
        {activeTool === 'tokens' && <TokenPlayground />}
        {activeTool === 'events' && <EventBusInspector />}
        {activeTool === 'architecture' && <ArchitectureDemonstration />}
        {activeTool === 'variant-scaling' && <VariantScalingStudio />}
        {activeTool === 'curator-review' && <CuratorReviewStudio />}
        {activeTool === 'provenance' && <ProvenanceLab />}

        {activeTool === 'inspector' && (
          <div className="space-y-6 max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-zinc-900/90 p-4 rounded-2xl border border-zinc-800 font-mono text-xs gap-3">
              <span className="text-zinc-400">Selected Specimen for 5D States Inspection:</span>
              <select
                value={inspectorEntryId}
                onChange={(e) => setInspectorEntryId(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-black/60 border border-zinc-700 text-cyan-400 font-bold font-mono focus:outline-none focus:border-cyan-500"
              >
                {CATALOG_REGISTRY.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.family})
                  </option>
                ))}
              </select>
            </div>
            <StateInspector entry={inspectorEntry} />
          </div>
        )}

        {activeTool === 'export' && (
          <div className="space-y-6">
            <div className="p-4 sm:p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
              <div className="space-y-1">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-400 block">
                  REUSE &amp; EXPORT STUDIO SELECTOR
                </span>
                <h3 className="text-base font-bold text-white">Select Component Specimen for Multi-Format Export</h3>
                <p className="text-xs text-zinc-400">
                  Choose from {CATALOG_REGISTRY.length} registered production components to view self-contained code, recipes, prompts, and ZIP archives.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={selectedExportEntryId}
                  onChange={(e) => setSelectedExportEntryId(e.target.value)}
                  aria-label="Select Component Specimen for Multi-Format Export"
                  className="bg-black/60 border border-cyan-500/40 rounded-xl px-4 py-2 text-xs text-cyan-300 font-mono focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer"
                >
                  {CATALOG_REGISTRY.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.component}) — v{c.version} [{c.family}]
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <ReuseExportStudio entry={exportEntry} />
          </div>
        )}
      </Suspense>
    </div>
  );
}
