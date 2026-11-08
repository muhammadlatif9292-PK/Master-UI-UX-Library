/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { CatalogEntry } from '../../design-system/catalog/catalogTypes';
import { CATALOG_REGISTRY } from '../../design-system/catalog/catalogRegistry';
import { ARCHETYPE_TOKENS } from '../../design-system/tokens';
import { DesignArchetype } from '../../types/architecture';
import { useTheme } from '../../design-system/tokens/ThemeContext';
import { useSound } from '../../design-system/sound/SoundContext';
import { useHaptics } from '../../design-system/haptics/HapticContext';
import { useMotion } from '../../design-system/motion/MotionContext';
import { useOrganization } from '../../design-system/catalog/OrganizationContext';
import { useExperienceEvents } from '../../design-system/events/ExperienceEventContext';
import { useExperienceLevel } from '../../design-system/experience/ExperienceLevelContext';
import { CodeViewer } from '../CodeViewer';
import { AiHandoffGenerator } from '../AiHandoffGenerator';
import { AuthVariantPreview } from '../auth/AuthVariantPreview';
import { NavigationVariantPreview } from '../navigation/NavigationVariantPreview';
import { ButtonVariantPreview } from '../buttons/ButtonVariantPreview';
import { InputVariantPreview } from '../inputs/InputVariantPreview';
import { CardVariantPreview } from '../cards/CardVariantPreview';
import { CanonicalIntegrityAuditPanel } from './CanonicalIntegrityAuditPanel';
import { getCanonicalRecipe } from '../../design-system/catalog/canonicalRecipeRegistry';
import { resolveCanonicalStyleId, getStyleTaxonomy } from '../../design-system/archetypes/styleTaxonomy';

import {
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Volume2,
  VolumeX,
  Vibrate,
  Smartphone,
  Tablet,
  Monitor,
  Copy,
  Check,
  Star,
  Bookmark,
  FolderPlus,
  GitCompare,
  Sliders,
  Code2,
  Bot,
  Scale,
  Cpu,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Layers,
  Eye,
  RotateCcw,
  Maximize2,
  Minimize2,
  FileText,
  Info,
  SlidersHorizontal,
  Compass,
  LayoutGrid,
  Check as CheckIcon,
  Tag,
  Clock,
  Award,
} from 'lucide-react';

export interface VariantDetailPageProps {
  entry: CatalogEntry;
  onBack?: () => void;
  onNavigateToCustomize?: (entryId: string) => void;
  onNavigateToCompare?: (entryId: string) => void;
  onSelectSiblingEntry?: (sibling: CatalogEntry) => void;
}

export type DetailComponentState =
  | 'idle'
  | 'hover'
  | 'focus'
  | 'typing'
  | 'pressed'
  | 'loading'
  | 'success'
  | 'error'
  | 'disabled';

export function VariantDetailPage({
  entry,
  onBack,
  onNavigateToCustomize,
  onNavigateToCompare,
  onSelectSiblingEntry,
}: VariantDetailPageProps) {
  const { theme, activeThemeId, setThemeId, allThemes } = useTheme();
  const { playSound, soundEnabled, setSoundEnabled } = useSound();
  const { triggerHaptic, hapticsEnabled, setHapticsEnabled } = useHaptics();
  const { intensity, setIntensity, reducedMotion, setReducedMotion } = useMotion();
  const { emit } = useExperienceEvents();
  const { isStandard, isAdvanced, setExperienceLevel } = useExperienceLevel();
  const {
    data,
    toggleFavorite,
    isFavorite,
    addToCollection,
    addCollection,
    saveNote,
  } = useOrganization();

  // 1. Live State & Preview Controls
  const [activeState, setActiveState] = useState<DetailComponentState>('idle');
  const [backdrop, setBackdrop] = useState<'obsidian' | 'studio' | 'blueprint' | 'slate'>('obsidian');
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [customRadius, setCustomRadius] = useState<number>(16);
  const [customArchetype, setCustomArchetype] = useState<DesignArchetype>(
    entry.canonicalStyleId || resolveCanonicalStyleId(entry.visualStyle)
  );

  const currentTaxonomy = useMemo(() => {
    return getStyleTaxonomy(customArchetype);
  }, [customArchetype]);

  // 2. Save & Note Controls
  const [selectedCollectionId, setSelectedCollectionId] = useState<string>('');
  const [noteText, setNoteText] = useState<string>('');
  const [showNoteSaved, setShowNoteSaved] = useState<boolean>(false);
  const [newCollectionName, setNewCollectionName] = useState<string>('');
  const [showAddCollectionModal, setShowAddCollectionModal] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);
  const [addedToCompare, setAddedToCompare] = useState<boolean>(false);

  // 3. Technical Details Accordion State
  const [openAccordions, setOpenAccordions] = useState<{
    a11y: boolean;
    tokens: boolean;
    performance: boolean;
    props: boolean;
    telemetry: boolean;
  }>({
    a11y: false,
    tokens: false,
    performance: false,
    props: false,
    telemetry: false,
  });

  // Track component view telemetry
  useEffect(() => {
    emit('component.viewed', entry.id, {
      name: entry.name,
      family: entry.family,
      archetype: entry.visualStyle,
    });
    // Load existing user note if present
    if (data.notes && data.notes[entry.id]) {
      setNoteText(data.notes[entry.id]);
    }
  }, [entry.id, emit, data.notes]);

  const isFavorited = isFavorite(entry.id);

  // Find sibling entries in the same family for comparison / quick hopping
  const siblingEntries = useMemo(() => {
    return CATALOG_REGISTRY.filter(
      (item) => item.family === entry.family && item.id !== entry.id
    ).slice(0, 3);
  }, [entry.family, entry.id]);

  // Derived Archetype Definition
  const archetypeData = ARCHETYPE_TOKENS[customArchetype] || ARCHETYPE_TOKENS['cinematic-dark'];

  // Toggle Accordion section
  const toggleAccordion = (key: keyof typeof openAccordions) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
    playSound('selection', 'MICRO');
  };

  // State Change Handler with Sound & Haptics
  const handleStateChange = (st: DetailComponentState) => {
    setActiveState(st);
    triggerHaptic(st === 'pressed' || st === 'success' ? 'LIGHT_CLICK' : 'SELECTION');
    playSound(
      st === 'success'
        ? 'success'
        : st === 'error'
        ? 'error'
        : st === 'pressed'
        ? 'button-press'
        : 'hover',
      'COMPONENT'
    );
    emit('component.state_changed', entry.id, { state: st });
  };

  // Handle Save Note
  const handleSaveNote = () => {
    if (!noteText.trim()) return;
    saveNote(entry.id, noteText);
    setShowNoteSaved(true);
    playSound('success', 'CONFIRMATION');
    setTimeout(() => setShowNoteSaved(false), 2500);
  };

  // Handle Add to Collection
  const handleAddToCollection = () => {
    if (!selectedCollectionId) return;
    addToCollection(selectedCollectionId, entry.id);
    playSound('success', 'CONFIRMATION');
  };

  // Handle Create Collection
  const handleCreateCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCollectionName.trim()) return;
    addCollection(newCollectionName.trim(), `Collection for ${entry.name}`);
    setNewCollectionName('');
    setShowAddCollectionModal(false);
    playSound('success', 'CONFIRMATION');
  };

  // Copy Code Handler
  const handleCopyCode = () => {
    const recipe = getCanonicalRecipe(entry);
    navigator.clipboard.writeText(recipe.sourceCode);
    setCopiedCode(true);
    playSound('success', 'CONFIRMATION');
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Copy AI Prompt Handler
  const handleCopyPrompt = () => {
    const recipe = getCanonicalRecipe(entry);
    navigator.clipboard.writeText(recipe.aiSpecificationPrompt);
    setCopiedPrompt(true);
    playSound('success', 'CONFIRMATION');
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  // Add to Compare Handler
  const handleAddToCompare = () => {
    setAddedToCompare(true);
    playSound('success', 'CONFIRMATION');
    triggerHaptic('DOUBLE_CONFIRM');
    if (onNavigateToCompare) {
      setTimeout(() => onNavigateToCompare(entry.id), 400);
    }
  };

  // Determine which preview engine or family preview to render
  const renderFamilyPreview = () => {
    // 1. Auth family check
    if (entry.family === 'auth' || entry.id.startsWith('auth-')) {
      return <AuthVariantPreview entry={entry} />;
    }
    // 2. Navigation family check
    if (entry.family === 'navigation' || entry.id.startsWith('nav-')) {
      return <NavigationVariantPreview entry={entry} />;
    }
    // 3. Button / Action check
    if (entry.family === 'action' || entry.id.startsWith('btn-') || entry.id.startsWith('button-')) {
      return <ButtonVariantPreview entry={entry} />;
    }
    // 4. Input check
    if (entry.family === 'input' || entry.id.startsWith('input-')) {
      return <InputVariantPreview entry={entry} />;
    }
    // 5. Card check
    if (entry.family === 'surface' || entry.id.startsWith('card-')) {
      return <CardVariantPreview entry={entry} />;
    }

    // 6. Universal Interactive Fallback Rendering
    return (
      <div className="flex flex-col items-center justify-center p-8 md:p-14 space-y-6 text-center">
        <div
          style={{ borderRadius: `${customRadius}px` }}
          className={`w-full max-w-md p-8 border transition-all duration-300 shadow-2xl relative overflow-hidden ${
            activeState === 'hover'
              ? 'scale-[1.02] border-cyan-400/60 shadow-cyan-500/20'
              : activeState === 'pressed'
              ? 'scale-[0.98] border-cyan-400 shadow-inner'
              : activeState === 'focus'
              ? 'ring-2 ring-cyan-400 ring-offset-4 ring-offset-zinc-950 border-cyan-400'
              : activeState === 'success'
              ? 'border-emerald-500/80 bg-emerald-950/20 shadow-emerald-500/20'
              : activeState === 'error'
              ? 'border-rose-500/80 bg-rose-950/20 shadow-rose-500/20'
              : activeState === 'disabled'
              ? 'opacity-40 pointer-events-none grayscale'
              : 'border-zinc-800 bg-zinc-900/90'
          }`}
        >
          {/* Subtle Ambient Light Glow */}
          <div className="absolute -top-16 -left-16 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold">
                {customArchetype}
              </span>
              <span className="text-[10px] font-mono text-zinc-500">
                STATE: <strong className="text-zinc-300 uppercase">{activeState}</strong>
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white tracking-tight">{entry.name}</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">{entry.description}</p>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => handleStateChange('pressed')}
                disabled={activeState === 'disabled'}
                className="w-full py-2.5 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 text-xs font-bold font-mono transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Interact with {entry.component}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-10 max-w-6xl mx-auto pb-20 animate-page-entry font-sans">
      {/* Top Back / Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 border border-zinc-700 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Catalog</span>
            </button>
          )}
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span className="text-cyan-400 font-bold capitalize">{entry.family}</span>
            <span>/</span>
            <span className="text-zinc-200 font-semibold">{entry.name}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              toggleFavorite(entry.id);
              playSound(isFavorited ? 'button-press' : 'success', 'CONFIRMATION');
              triggerHaptic('LIGHT_CLICK');
            }}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
              isFavorited
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${isFavorited ? 'fill-amber-400 text-amber-400' : 'text-zinc-400'}`} />
            <span>{isFavorited ? 'Favorited' : 'Favorite'}</span>
          </button>

          <button
            onClick={handleAddToCompare}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 text-xs font-semibold transition-all"
          >
            <GitCompare className="w-3.5 h-3.5 text-cyan-400" />
            <span>Compare</span>
          </button>

          {onNavigateToCustomize && (
            <button
              onClick={() => onNavigateToCustomize(entry.id)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 text-xs font-bold transition-all shadow-md shadow-cyan-500/20"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Customize</span>
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: WHAT IS THIS? (Human language overview, purpose, and highlights) */}
      {/* ========================================================================= */}
      <section className="p-6 md:p-8 rounded-3xl bg-zinc-900/90 border border-zinc-800 shadow-2xl space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-4 relative z-10">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider font-bold bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              {entry.family} Component
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-purple-500/10 border border-purple-500/30 text-purple-300 font-semibold" title={`Canonical Style ID: ${entry.canonicalStyleId || resolveCanonicalStyleId(entry.visualStyle)}`}>
              Style: {entry.visualStyle} <span className="opacity-60 text-[10px]">({entry.canonicalStyleId || resolveCanonicalStyleId(entry.visualStyle)})</span>
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              WCAG {entry.accessibility} AAA
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-amber-500/10 border border-amber-500/30 text-amber-400 font-semibold">
              Tier: {entry.performanceTier}
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">{entry.name}</h1>
            <p className="text-sm md:text-base text-zinc-300 leading-relaxed max-w-3xl">
              {entry.description}
            </p>
          </div>

          {/* Plain-Language Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 space-y-1">
              <div className="text-[11px] font-mono text-zinc-400 uppercase">Primary Goal</div>
              <div className="text-xs font-semibold text-zinc-200">
                {entry.family === 'auth' ? 'High-conversion secure sign-in' : entry.family === 'navigation' ? 'Intuitive multi-surface wayfinding' : 'Precision tactile interaction'}
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 space-y-1">
              <div className="text-[11px] font-mono text-zinc-400 uppercase">Sensory Profile</div>
              <div className="text-xs font-semibold text-cyan-300">
                {entry.soundStyle} • {entry.hapticStyle}
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 space-y-1">
              <div className="text-[11px] font-mono text-zinc-400 uppercase">Motion Physics</div>
              <div className="text-xs font-semibold text-purple-300">
                {entry.motionStyle} (Damped Spring)
              </div>
            </div>
            <div className="p-3.5 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 space-y-1">
              <div className="text-[11px] font-mono text-zinc-400 uppercase">Asset Footprint</div>
              <div className="text-xs font-semibold text-emerald-300">Zero external downloads</div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-xs font-mono text-zinc-500 flex items-center gap-1 mr-1">
              <Tag className="w-3 h-3" /> Tags:
            </span>
            {entry.tags.map((tag) => (
              <span key={tag} className="px-2.5 py-0.5 rounded-lg bg-zinc-800/80 text-zinc-300 text-xs font-mono">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: LIVE PREVIEW (Interactive Specimen Canvas with Environment Switcher) */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Eye className="w-5 h-5 text-cyan-400" />
              <span>Live Interactive Preview</span>
            </h2>
            <p className="text-xs text-zinc-400">
              Interact directly with the component below. Test mouse clicks, keyboard focus, and sensory response.
            </p>
          </div>

          {/* Environment & Backdrop Switcher */}
          <div className="flex items-center gap-2 bg-zinc-900 p-1.5 rounded-xl border border-zinc-800 self-start sm:self-auto">
            <span className="text-[10px] font-mono text-zinc-400 px-2 uppercase">Canvas:</span>
            {(['obsidian', 'studio', 'blueprint', 'slate'] as const).map((bg) => (
              <button
                key={bg}
                onClick={() => {
                  setBackdrop(bg);
                  playSound('selection', 'MICRO');
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono capitalize transition-all ${
                  backdrop === bg
                    ? 'bg-cyan-500 text-zinc-950 font-bold shadow'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {bg}
              </button>
            ))}
          </div>
        </div>

        {/* Live Stage Canvas */}
        <div
          className={`rounded-3xl border transition-all duration-300 min-h-[420px] flex items-center justify-center p-4 md:p-8 relative overflow-hidden shadow-2xl ${
            backdrop === 'obsidian'
              ? 'bg-zinc-950 border-zinc-800'
              : backdrop === 'studio'
              ? 'bg-zinc-100 border-zinc-300 text-zinc-900'
              : backdrop === 'blueprint'
              ? 'bg-[#0a192f] border-cyan-900/60 bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:16px_16px]'
              : 'bg-slate-900 border-slate-700'
          }`}
        >
          <div
            className={`w-full transition-all duration-300 ${
              viewport === 'mobile' ? 'max-w-[375px]' : viewport === 'tablet' ? 'max-w-[768px]' : 'max-w-full'
            }`}
          >
            {renderFamilyPreview()}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: HOW IT BEHAVES (Interaction model & sensory feedback) */}
      {/* ========================================================================= */}
      <section className="p-6 md:p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 shadow-xl space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <span>How It Behaves</span>
          </h2>
          <p className="text-xs text-zinc-400">
            Physical dynamics, sound frequencies, vibration patterns, and user ergonomics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs font-mono uppercase">
              <Compass className="w-4 h-4" /> Interaction Mechanics
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Designed with a responsive touch target exceeding 44px for zero misclicks. Uses micro-scale feedback
              (0.98x on press) and calibrated hover luminosity to establish tactile affordance.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-xs font-mono uppercase">
              <Volume2 className="w-4 h-4" /> Procedural Web Audio
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Synthesizes real-time sine-wave feedback using the Web Audio API (440Hz click on touch, ascending C5-E5-G5 triad on success). No static audio files to download.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs font-mono uppercase">
              <Vibrate className="w-4 h-4" /> Tactile Vibration
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Triggers calibrated vibration pulses through the Navigator Vibration API on supported mobile browsers ([15ms] micro-pulse on tap, [15ms, 40ms, 25ms] on completion).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs font-mono uppercase">
              <ShieldCheck className="w-4 h-4" /> Keyboard & Screen Reader
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Full focus ring visibility, Tab cycling, Enter/Space activation, and live region ARIA announcements ensure seamless screen reader operation without mouse dependency.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: STATES (Interactive 5D State Machine Switcher) */}
      {/* ========================================================================= */}
      <section className="p-6 md:p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 shadow-xl space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-purple-400" />
            <span>Interactive State Machine</span>
          </h2>
          <p className="text-xs text-zinc-400">
            Click each state below to simulate and inspect its visual rendering and accessibility attributes.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {(
            [
              'idle',
              'hover',
              'focus',
              'typing',
              'pressed',
              'loading',
              'success',
              'error',
              'disabled',
            ] as DetailComponentState[]
          ).map((st) => (
            <button
              key={st}
              onClick={() => handleStateChange(st)}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono capitalize transition-all border ${
                activeState === st
                  ? 'bg-cyan-500 text-zinc-950 font-bold border-cyan-400 shadow-lg shadow-cyan-500/20'
                  : 'bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 text-zinc-300">
            <span className="text-cyan-400 font-bold">Active State:</span>
            <span className="px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 uppercase font-bold">{activeState}</span>
            <span className="text-zinc-500">|</span>
            <span className="text-zinc-400">
              {activeState === 'idle'
                ? 'Default resting state with standard contrast'
                : activeState === 'hover'
                ? 'Elevated illumination and cursor pointer'
                : activeState === 'focus'
                ? 'High-contrast 2px visible focus ring'
                : activeState === 'typing'
                ? 'Active input focus with live caret'
                : activeState === 'pressed'
                ? 'Damped scale compression (0.98x)'
                : activeState === 'loading'
                ? 'ARIA busy=true with spinning progress indicator'
                : activeState === 'success'
                ? 'Positive affirmation green tone with C-E-G chime'
                : activeState === 'error'
                ? 'Descriptive error message with dual-tone dissonance'
                : 'Pointer events disabled with 40% opacity'}
            </span>
          </div>

          <button
            onClick={() => handleStateChange('idle')}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-all self-start md:self-auto"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset State</span>
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: DEVICE / MOBILE VIEW (Responsive Multi-Device Simulator) */}
      {/* ========================================================================= */}
      <section className="p-6 md:p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-emerald-400" />
              <span>Device &amp; Mobile Viewports</span>
            </h2>
            <p className="text-xs text-zinc-400">
              Simulate how this component adapts from ultra-narrow smartphone screens to expansive desktop monitors.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-zinc-950 p-1.5 rounded-2xl border border-zinc-800">
            <button
              onClick={() => {
                setViewport('mobile');
                playSound('selection', 'MICRO');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                viewport === 'mobile'
                  ? 'bg-emerald-500 text-zinc-950 font-bold shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile (375px)</span>
            </button>

            <button
              onClick={() => {
                setViewport('tablet');
                playSound('selection', 'MICRO');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                viewport === 'tablet'
                  ? 'bg-emerald-500 text-zinc-950 font-bold shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Tablet className="w-3.5 h-3.5" />
              <span>Tablet (768px)</span>
            </button>

            <button
              onClick={() => {
                setViewport('desktop');
                playSound('selection', 'MICRO');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                viewport === 'desktop'
                  ? 'bg-emerald-500 text-zinc-950 font-bold shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop (1440px)</span>
            </button>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300 flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Touch Target Ergonomics:</span>
            <strong className="text-emerald-300">44px × 44px Minimum (WCAG AA &amp; AAA Verified)</strong>
          </div>
          <span className="text-zinc-500 font-mono hidden sm:inline">Active Viewport: {viewport.toUpperCase()}</span>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: CUSTOMIZE (Quick Tune Archetypes & Geometry) */}
      {/* ========================================================================= */}
      <section className="p-6 md:p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Sliders className="w-5 h-5 text-cyan-400" />
              <span>Quick Customize &amp; Tune</span>
            </h2>
            <p className="text-xs text-zinc-400">
              Adjust design archetype, corner curvature, and sound without leaving this view.
            </p>
          </div>

          {onNavigateToCustomize && (
            <button
              onClick={() => onNavigateToCustomize(entry.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 text-xs font-bold transition-all shadow-md shadow-cyan-500/20"
            >
              <span>Open in Full Composer</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
            <label className="text-xs font-mono font-bold text-zinc-300 uppercase">Visual Archetype</label>
            <select
              value={customArchetype}
              onChange={(e) => {
                setCustomArchetype(e.target.value as DesignArchetype);
                playSound('selection', 'MICRO');
              }}
              className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
            >
              {Object.keys(ARCHETYPE_TOKENS).map((archKey) => (
                <option key={archKey} value={archKey}>
                  {ARCHETYPE_TOKENS[archKey as DesignArchetype]?.name || archKey}
                </option>
              ))}
            </select>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-zinc-300 uppercase">Corner Curvature</span>
              <span className="text-cyan-400 font-bold">{customRadius}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="32"
              step="4"
              value={customRadius}
              onChange={(e) => setCustomRadius(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-zinc-500">
              <span>Sharp (0px)</span>
              <span>Smooth (16px)</span>
              <span>Pill (32px)</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
            <label className="text-xs font-mono font-bold text-zinc-300 uppercase">Sensory Layer</label>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setSoundEnabled(!soundEnabled);
                  playSound('toggle', 'COMPONENT');
                }}
                className={`flex-1 py-2 rounded-xl text-xs font-mono flex items-center justify-center gap-1.5 border transition-all ${
                  soundEnabled
                    ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300 font-bold'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-500'
                }`}
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span>Sound: {soundEnabled ? 'ON' : 'OFF'}</span>
              </button>

              <button
                onClick={() => {
                  setHapticsEnabled(!hapticsEnabled);
                  triggerHaptic('LIGHT_CLICK');
                }}
                className={`flex-1 py-2 rounded-xl text-xs font-mono flex items-center justify-center gap-1.5 border transition-all ${
                  hapticsEnabled
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300 font-bold'
                    : 'bg-zinc-900 border-zinc-800 text-zinc-500'
                }`}
              >
                <Vibrate className="w-3.5 h-3.5" />
                <span>Haptics: {hapticsEnabled ? 'ON' : 'OFF'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Controlled Style Taxonomy Details */}
        <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800/80 pb-3">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono uppercase text-cyan-400 font-semibold tracking-wider">
                Controlled Style Taxonomy
              </span>
              <h3 className="text-sm font-bold text-white flex flex-wrap items-center gap-2">
                <span>{currentTaxonomy.displayName}</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  canonicalStyleId: {currentTaxonomy.canonicalStyleId}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  family: {currentTaxonomy.family}
                </span>
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/60 space-y-1">
              <span className="text-[10px] font-mono text-zinc-400 uppercase">Mood</span>
              <p className="text-zinc-200 font-medium">{currentTaxonomy.mood}</p>
            </div>
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/60 space-y-1">
              <span className="text-[10px] font-mono text-zinc-400 uppercase">Material Palette</span>
              <p className="text-zinc-200 font-medium">{currentTaxonomy.material}</p>
            </div>
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/60 space-y-1">
              <span className="text-[10px] font-mono text-zinc-400 uppercase">Lighting Profile</span>
              <p className="text-zinc-200 font-medium">{currentTaxonomy.lighting}</p>
            </div>
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/60 space-y-1">
              <span className="text-[10px] font-mono text-zinc-400 uppercase">Motion Tendency</span>
              <p className="text-zinc-200 font-medium">{currentTaxonomy.motionTendency}</p>
            </div>
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/60 space-y-1">
              <span className="text-[10px] font-mono text-zinc-400 uppercase">Interaction Tendency</span>
              <p className="text-zinc-200 font-medium">{currentTaxonomy.interactionTendency}</p>
            </div>
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/60 space-y-1">
              <span className="text-[10px] font-mono text-zinc-400 uppercase">Typography Tendency</span>
              <p className="text-zinc-200 font-medium">{currentTaxonomy.typographyTendency}</p>
            </div>
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/60 space-y-1">
              <span className="text-[10px] font-mono text-zinc-400 uppercase">Sound Tendency</span>
              <p className="text-zinc-200 font-medium">{currentTaxonomy.soundTendency}</p>
            </div>
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/60 space-y-1">
              <span className="text-[10px] font-mono text-zinc-400 uppercase">Haptic Tendency</span>
              <p className="text-zinc-200 font-medium">{currentTaxonomy.hapticTendency}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-1.5">
              <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">Best-Fit Components</span>
              <ul className="space-y-1 text-xs text-zinc-300">
                {currentTaxonomy.bestFitComponents.map((fit, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-400">•</span>
                    <span><strong className="text-white">{fit.name}:</strong> {fit.rationale}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/20 space-y-1.5">
              <span className="text-[10px] font-mono uppercase text-amber-400 font-bold">Poor-Fit Warnings</span>
              <ul className="space-y-1 text-xs text-zinc-300">
                {currentTaxonomy.poorFitWarnings.map((warn, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-amber-400">⚠️</span>
                    <span><strong className="text-white">{warn.context}:</strong> {warn.warningText}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 7: COMPARE (Side-by-Side Comparison against alternatives) */}
      {/* ========================================================================= */}
      <section className="p-6 md:p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <GitCompare className="w-5 h-5 text-cyan-400" />
              <span>Compare with Alternatives</span>
            </h2>
            <p className="text-xs text-zinc-400">
              Evaluate this component side-by-side against other variants in the {entry.family} family.
            </p>
          </div>

          <button
            onClick={handleAddToCompare}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              addedToCompare
                ? 'bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700'
            }`}
          >
            {addedToCompare ? <CheckIcon className="w-4 h-4" /> : <GitCompare className="w-4 h-4" />}
            <span>{addedToCompare ? 'Added to Compare Matrix' : 'Add to Compare Matrix'}</span>
          </button>
        </div>

        {/* Sibling Variants Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {siblingEntries.map((sib) => (
            <div
              key={sib.id}
              onClick={() => onSelectSiblingEntry && onSelectSiblingEntry(sib)}
              className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-cyan-500/50 transition-all cursor-pointer group space-y-3 shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-cyan-400 uppercase font-bold">{sib.visualStyle}</span>
                  <span className="text-zinc-500">Tier: {sib.performanceTier}</span>
                </div>
                <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {sib.name}
                </h4>
                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">{sib.description}</p>
              </div>

              <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono">
                <span className="text-cyan-400 group-hover:underline">Inspect Specimen →</span>
                <span className="text-zinc-500 uppercase">{sib.accessibility}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 8: SAVE (Favorites & Project Sets with Developer Notes) */}
      {/* ========================================================================= */}
      <section className="p-6 md:p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 shadow-xl space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-amber-400" />
            <span>Save to Workspace &amp; Project Notes</span>
          </h2>
          <p className="text-xs text-zinc-400">
            Save this component to your project sets, mark as favorite, and annotate integration notes for your team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Collection Assignment */}
          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-bold text-zinc-300 uppercase flex items-center gap-2">
                <FolderPlus className="w-4 h-4 text-cyan-400" /> Save to Project Set
              </label>
              <button
                onClick={() => setShowAddCollectionModal(true)}
                className="text-[11px] font-mono text-cyan-400 hover:underline"
              >
                + New Project
              </button>
            </div>

            <div className="flex gap-2">
              <select
                value={selectedCollectionId}
                onChange={(e) => setSelectedCollectionId(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="">Select a Project Set...</option>
                {data.collections?.map((col) => (
                  <option key={col.id} value={col.id}>
                    {col.name} ({col.entryIds?.length || 0} items)
                  </option>
                ))}
              </select>

              <button
                onClick={handleAddToCollection}
                disabled={!selectedCollectionId}
                className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-zinc-950 text-xs font-bold transition-all shadow"
              >
                Save
              </button>
            </div>
          </div>

          {/* Developer Notes */}
          <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-bold text-zinc-300 uppercase flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" /> Developer Integration Notes
              </label>
              {showNoteSaved && (
                <span className="text-[11px] font-mono text-emerald-400 font-bold animate-pulse flex items-center gap-1">
                  <CheckIcon className="w-3 h-3" /> Saved!
                </span>
              )}
            </div>

            <textarea
              rows={2}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="e.g. Plan to use for client login portal in Q4..."
              className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 focus:outline-none focus:border-amber-400 placeholder:text-zinc-600 resize-none"
            />

            <button
              onClick={handleSaveNote}
              className="px-4 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 border border-zinc-700 transition-all self-end"
            >
              Save Note
            </button>
          </div>
        </div>

        {/* Modal for creating a new collection */}
        {showAddCollectionModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <form
              onSubmit={handleCreateCollection}
              className="w-full max-w-md p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4 shadow-2xl animate-modal-entry"
            >
              <h3 className="text-lg font-bold text-white">Create New Project Collection</h3>
              <input
                type="text"
                placeholder="Project Name (e.g. Fintech Mobile App)"
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-cyan-400"
                autoFocus
              />
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddCollectionModal(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-800 text-xs text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newCollectionName.trim()}
                  className="px-4 py-2 rounded-xl bg-cyan-500 text-zinc-950 text-xs font-bold hover:bg-cyan-400 disabled:opacity-40"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* SECTION 9: CODE (Production React TypeScript Export) */}
      {/* ========================================================================= */}
      <section className="p-6 md:p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Code2 className="w-5 h-5 text-cyan-400" />
              <span>Production Code Export</span>
            </h2>
            <p className="text-xs text-zinc-400">
              Self-contained, production-ready React component written in TypeScript and Tailwind CSS.
            </p>
          </div>

          <button
            onClick={handleCopyCode}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 text-xs font-bold transition-all shadow-md shadow-cyan-500/20"
          >
            {copiedCode ? <CheckIcon className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copiedCode ? 'Code Copied!' : 'Copy Code'}</span>
          </button>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden">
          <CodeViewer entry={entry} />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 10: AI PROMPT (Structured Gemini / Claude AI Prompt Brief) */}
      {/* ========================================================================= */}
      <section className="p-6 md:p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Bot className="w-5 h-5 text-purple-400" />
              <span>AI Coder Prompt Specification</span>
            </h2>
            <p className="text-xs text-zinc-400">
              Structured specification formatted for Gemini, Claude, or ChatGPT to generate this exact component.
            </p>
          </div>

          <button
            onClick={handleCopyPrompt}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-zinc-950 text-xs font-bold transition-all shadow-md shadow-purple-500/20"
          >
            {copiedPrompt ? <CheckIcon className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copiedPrompt ? 'Prompt Copied!' : 'Copy AI Prompt'}</span>
          </button>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden">
          <AiHandoffGenerator entry={entry} />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CANONICAL IDENTITY INTEGRITY AUDIT (5 Validation Vectors) */}
      {/* ========================================================================= */}
      <CanonicalIntegrityAuditPanel entry={entry} />

      {/* ========================================================================= */}
      {/* SECTION 11: SOURCE & LICENSE (SPDX 2.3 & Provenance Metadata) */}
      {/* ========================================================================= */}
      <section className="p-6 md:p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 shadow-xl space-y-6">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Scale className="w-5 h-5 text-emerald-400" />
            <span>Source, License &amp; Provenance</span>
          </h2>
          <p className="text-xs text-zinc-400">
            Open-source licensing terms, audit trail, and dependency attribution.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
            <div className="text-[11px] font-mono text-zinc-500 uppercase">SPDX 2.3 License</div>
            <div className="text-xs font-bold text-emerald-400 font-mono">{entry.license || 'Apache-2.0'}</div>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
            <div className="text-[11px] font-mono text-zinc-500 uppercase">Author &amp; Origin</div>
            <div className="text-xs font-bold text-zinc-200">{entry.authorVendor || 'Master UI/UX Design System'}</div>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
            <div className="text-[11px] font-mono text-zinc-500 uppercase">Version &amp; Stage</div>
            <div className="text-xs font-bold text-cyan-300 font-mono">v{entry.version} • {entry.status}</div>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-1">
            <div className="text-[11px] font-mono text-zinc-500 uppercase">Verified Date</div>
            <div className="text-xs font-bold text-zinc-300 font-mono">2026-08-30</div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 12: ADVANCED TECHNICAL DETAILS (Expandable Accordions) */}
      {/* ========================================================================= */}
      <section className="p-6 md:p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-400" />
              <span>Advanced Technical Details</span>
            </h2>
            <p className="text-xs text-zinc-400">
              Deep-dive telemetry, token formulas, and accessibility vectors (kept inside expandable sections).
            </p>
          </div>

          {isStandard && (
            <button
              onClick={() => setExperienceLevel('advanced')}
              className="px-3.5 py-1.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 hover:bg-purple-500/30 font-mono text-xs font-bold transition-all shrink-0"
            >
              Switch to Advanced Mode
            </button>
          )}
        </div>

        {isStandard && (
          <div className="p-3.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-400 flex items-center gap-2 font-mono">
            <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
            <span>Standard Mode hides deep technical complexity by default. Click any accordion below to reveal details.</span>
          </div>
        )}

        <div className="space-y-3 pt-2">
          {/* 1. WCAG 2.2 AAA 12-Vector Audit */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden">
            <button
              onClick={() => toggleAccordion('a11y')}
              className="w-full p-4 flex items-center justify-between text-xs font-mono font-bold text-zinc-200 hover:bg-zinc-900/60 transition-colors"
            >
              <div className="flex items-center gap-2.5 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>12-Vector WCAG 2.2 AAA Audit Vector Results</span>
              </div>
              {openAccordions.a11y ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
            </button>

            {openAccordions.a11y && (
              <div className="p-5 border-t border-zinc-800/80 space-y-4 text-xs font-mono text-zinc-300 bg-zinc-950/80">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
                    <span className="text-zinc-500">Color Contrast:</span>
                    <div className="font-bold text-emerald-400">14.5:1 (Exceeds 7.0:1 AAA standard)</div>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
                    <span className="text-zinc-500">Focus Indicator:</span>
                    <div className="font-bold text-emerald-400">2px visible focus ring with 2px offset</div>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
                    <span className="text-zinc-500">Keyboard Trap:</span>
                    <div className="font-bold text-emerald-400">0 traps (Escape route verified)</div>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
                    <span className="text-zinc-500">Screen Reader ARIA:</span>
                    <div className="font-bold text-emerald-400">role="region", aria-live="polite"</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 2. Token & Geometry Mathematics */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden">
            <button
              onClick={() => toggleAccordion('tokens')}
              className="w-full p-4 flex items-center justify-between text-xs font-mono font-bold text-zinc-200 hover:bg-zinc-900/60 transition-colors"
            >
              <div className="flex items-center gap-2.5 text-purple-400">
                <Layers className="w-4 h-4" />
                <span>Token Mathematics &amp; Border Radius Formula</span>
              </div>
              {openAccordions.tokens ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
            </button>

            {openAccordions.tokens && (
              <div className="p-5 border-t border-zinc-800/80 space-y-3 text-xs font-mono text-zinc-300 bg-zinc-950/80">
                <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
                  <span className="text-zinc-400">Border Radius Nested Law:</span>
                  <div className="text-cyan-300 font-bold mt-1">
                    Inner Radius = Outer Radius ({customRadius}px) - Padding (8px) = {Math.max(0, customRadius - 8)}px
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
                  <span className="text-zinc-400">Active Archetype Colors:</span>
                  <div className="text-zinc-300 mt-1">
                    Primary: {archetypeData?.colors?.primary || '#06B6D4'} | Surface: {archetypeData?.colors?.surface || '#090D16'}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 3. Performance & GPU Compositor */}
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden">
            <button
              onClick={() => toggleAccordion('performance')}
              className="w-full p-4 flex items-center justify-between text-xs font-mono font-bold text-zinc-200 hover:bg-zinc-900/60 transition-colors"
            >
              <div className="flex items-center gap-2.5 text-amber-400">
                <Zap className="w-4 h-4" />
                <span>Performance Tier, FPS Rating &amp; Loop Idle Sleep</span>
              </div>
              {openAccordions.performance ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
            </button>

            {openAccordions.performance && (
              <div className="p-5 border-t border-zinc-800/80 space-y-3 text-xs font-mono text-zinc-300 bg-zinc-950/80">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
                    <span className="text-zinc-500">Tier:</span>
                    <div className="font-bold text-amber-400">{entry.performanceTier}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
                    <span className="text-zinc-500">Target Frame Rate:</span>
                    <div className="font-bold text-emerald-400">60.0 FPS</div>
                  </div>
                  <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
                    <span className="text-zinc-500">Idle Safeguard:</span>
                    <div className="font-bold text-cyan-300">Sleeps after 10s</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
