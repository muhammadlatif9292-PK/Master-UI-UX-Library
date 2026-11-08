/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Search,
  X,
  Box,
  Sparkles,
  Command,
  ShieldCheck,
  Zap,
  Palette,
  Layers,
  CornerDownLeft,
  Bookmark,
  Star,
  Sliders,
  Volume2,
  VolumeX,
  Vibrate,
  Cpu,
  Activity,
  FlaskConical,
  Smartphone,
  Eye,
  FileCode,
  CheckCircle2,
  Wand2,
  Compass,
  ArrowRight,
  Shield,
  Music,
  HelpCircle,
} from 'lucide-react';
import { CATALOG_REGISTRY } from '../../design-system/catalog/catalogRegistry';
import { CatalogEntry } from '../../design-system/catalog/catalogTypes';
import { ARCHETYPE_TOKENS } from '../../design-system/tokens';
import { DesignArchetype } from '../../types/architecture';
import { useSound } from '../../design-system/sound/SoundContext';
import { useHaptics } from '../../design-system/haptics/HapticContext';
import { useExperienceLevel } from '../../design-system/experience/ExperienceLevelContext';
import { useLibraryOnboarding } from '../../design-system/onboarding/LibraryOnboardingContext';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tabId: string) => void;
  onSelectComponent?: (entryId: string) => void;
}

type CommandItemType = 'component' | 'style' | 'saved' | 'action' | 'lab';

interface CommandItem {
  id: string;
  type: CommandItemType;
  title: string;
  subtitle: string;
  group: 'Components' | 'Styles' | 'Saved Designs' | 'Actions' | 'Advanced / Labs';
  badge?: string;
  icon: any;
  action: () => void;
  searchTerms: string;
}

export function CommandPaletteModal({
  isOpen,
  onClose,
  onSelectTab,
  onSelectComponent,
}: CommandPaletteModalProps) {
  const { soundEnabled, setSoundEnabled, playSound } = useSound();
  const { hapticsEnabled, setHapticsEnabled } = useHaptics();
  const { experienceLevel, toggleExperienceLevel, isAdvanced } = useExperienceLevel();
  const { reopenTour } = useLibraryOnboarding();

  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'components' | 'styles' | 'saved' | 'actions' | 'labs'>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setActiveFilter('all');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
      playSound('selection', 'MICRO');
    }
  }, [isOpen, playSound]);

  // Build the complete prioritized items list
  const allItems: CommandItem[] = useMemo(() => {
    // 1. COMPONENTS (Top Priority)
    const components: CommandItem[] = CATALOG_REGISTRY.map((c) => ({
      id: `comp-${c.id}`,
      type: 'component',
      title: c.name,
      subtitle: `${c.component} • ${c.family.toUpperCase()} • ${c.visualStyle}`,
      group: 'Components',
      badge: c.family,
      icon: Box,
      searchTerms: `${c.name} ${c.component} ${c.family} ${c.visualStyle} ${c.tags.join(' ')} ${c.description}`,
      action: () => {
        if (onSelectComponent) {
          onSelectComponent(c.id);
        } else {
          onSelectTab('components');
        }
      },
    }));

    // 2. STYLES & ARCHETYPES
    const styles: CommandItem[] = Object.keys(ARCHETYPE_TOKENS).map((key) => {
      const arch = ARCHETYPE_TOKENS[key as DesignArchetype];
      return {
        id: `style-${key}`,
        type: 'style',
        title: arch?.name || key,
        subtitle: `Design Archetype Token Preset • ${key}`,
        group: 'Styles',
        badge: 'Archetype',
        icon: Palette,
        searchTerms: `${arch?.name || ''} ${key} style archetype theme token palette`,
        action: () => onSelectTab('styles'),
      };
    });

    // 3. SAVED DESIGNS & COLLECTIONS
    const savedDesigns: CommandItem[] = [
      {
        id: 'saved-favorites',
        type: 'saved',
        title: 'Favorites',
        subtitle: 'View your bookmarked and starred UI components',
        group: 'Saved Designs',
        badge: 'Bookmarks',
        icon: Star,
        searchTerms: 'favorites starred bookmarks saved components',
        action: () => onSelectTab('favorites'),
      },
      {
        id: 'saved-collections',
        type: 'saved',
        title: 'Project Collections',
        subtitle: 'Manage curated component sets and workspace boards',
        group: 'Saved Designs',
        badge: 'Workspaces',
        icon: Bookmark,
        searchTerms: 'collections projects workspaces boards curated saved',
        action: () => onSelectTab('collections'),
      },
      {
        id: 'saved-compare',
        type: 'saved',
        title: 'Side-by-Side Comparison Matrix',
        subtitle: 'Compare component specs, accessibility & performance metrics',
        group: 'Saved Designs',
        badge: 'Compare',
        icon: Layers,
        searchTerms: 'compare matrix side-by-side diff comparison specs',
        action: () => onSelectTab('compare'),
      },
    ];

    // 4. USEFUL ACTIONS
    const actions: CommandItem[] = [
      {
        id: 'act-composer',
        type: 'action',
        title: 'Open Experience Composer',
        subtitle: 'Customize design tokens, surface physics, glow & padding scales',
        group: 'Actions',
        badge: 'Composer',
        icon: Wand2,
        searchTerms: 'customize composer mixer customize tokens styles props edit theme',
        action: () => onSelectTab('customize'),
      },
      {
        id: 'act-scaling',
        type: 'action',
        title: 'Generate 50+ Algorithmic Variants',
        subtitle: 'Explore algorithmic permutations & state scaling engine',
        group: 'Actions',
        badge: 'Generator',
        icon: Sparkles,
        searchTerms: 'variant scaling generator 50+ permutations variations studio',
        action: () => onSelectTab('variant-scaling'),
      },
      {
        id: 'act-export',
        type: 'action',
        title: 'Export AI Prompts & Production Code',
        subtitle: 'Generate structured Gemini/Claude handoff briefs & React code',
        group: 'Actions',
        badge: 'Export',
        icon: FileCode,
        searchTerms: 'export ai prompt brief handoff react vue code copy generator',
        action: () => onSelectTab('ai-export'),
      },
      {
        id: 'act-sound-toggle',
        type: 'action',
        title: soundEnabled ? 'Mute Procedural Web Audio' : 'Enable Procedural Web Audio',
        subtitle: soundEnabled ? 'Disable 440Hz micro-tones & melodic feedback' : 'Activate harmonic synthesizer audio cues',
        group: 'Actions',
        badge: soundEnabled ? 'Audio ON' : 'Audio OFF',
        icon: soundEnabled ? VolumeX : Volume2,
        searchTerms: 'sound audio web audio synth oscillator mute enable toggle sound',
        action: () => setSoundEnabled(!soundEnabled),
      },
      {
        id: 'act-haptics-toggle',
        type: 'action',
        title: hapticsEnabled ? 'Disable Vibration Haptics' : 'Enable Vibration Haptics',
        subtitle: hapticsEnabled ? 'Turn off navigator vibration feedback' : 'Activate mobile tactile haptic pulses',
        group: 'Actions',
        badge: hapticsEnabled ? 'Haptics ON' : 'Haptics OFF',
        icon: Vibrate,
        searchTerms: 'haptics vibration tactile touch navigator pulse feedback',
        action: () => setHapticsEnabled(!hapticsEnabled),
      },
      {
        id: 'act-experience-toggle',
        type: 'action',
        title: isAdvanced ? 'Switch to Standard Experience Mode' : 'Switch to Advanced Experience Mode',
        subtitle: isAdvanced
          ? 'Hide internal laboratory tools & technical complexity by default'
          : 'Unlock all 14 laboratory engines, raw tokens & deep specs',
        group: 'Actions',
        badge: experienceLevel.toUpperCase(),
        icon: Sliders,
        searchTerms: 'experience level standard advanced mode toggle switch complexity focus',
        action: () => toggleExperienceLevel(),
      },
      {
        id: 'act-onboarding-tour',
        type: 'action',
        title: 'Take 1-Minute Library Onboarding Tour',
        subtitle: 'Quick 5-step walkthrough of component discovery, preview, customization, save, & export',
        group: 'Actions',
        badge: 'Guided Tour',
        icon: HelpCircle,
        searchTerms: 'onboarding tour help guide walk-through start step intro overview help',
        action: () => {
          onClose();
          reopenTour();
        },
      },
    ];

    // 5. ADVANCED / LABS (Grouped cleanly behind Advanced/Labs)
    const labs: CommandItem[] = [
      {
        id: 'lab-motion',
        type: 'lab',
        title: 'Motion Physics System Lab',
        subtitle: 'Inspect 24 spring physics curves, dampening & duration tokens',
        group: 'Advanced / Labs',
        badge: 'Lab',
        icon: Zap,
        searchTerms: 'motion physics spring animation easing dampening curve transitions',
        action: () => onSelectTab('motion'),
      },
      {
        id: 'lab-sound',
        type: 'lab',
        title: 'Procedural Web Audio Lab',
        subtitle: 'Oscillator harmonics, frequency filters & audio ADSR envelope',
        group: 'Advanced / Labs',
        badge: 'Lab',
        icon: Music,
        searchTerms: 'sound synthesizer audio oscillator web audio procedural tones',
        action: () => onSelectTab('sound'),
      },
      {
        id: 'lab-haptics',
        type: 'lab',
        title: 'Navigator Vibration Haptics Lab',
        subtitle: 'Vibration pattern designer & tactile pulse waveform generator',
        group: 'Advanced / Labs',
        badge: 'Lab',
        icon: Vibrate,
        searchTerms: 'haptics vibration tactile mobile motor lab pulses',
        action: () => onSelectTab('haptics'),
      },
      {
        id: 'lab-performance',
        type: 'lab',
        title: 'Performance Governor & Loop Idle Lab',
        subtitle: 'Tier 1-3 FPS metrics, idle loop safety governor & GPU telemetry',
        group: 'Advanced / Labs',
        badge: 'Lab',
        icon: Cpu,
        searchTerms: 'performance governor fps benchmark tier loop idle gpu metrics memory',
        action: () => onSelectTab('performance'),
      },
      {
        id: 'lab-a11y',
        type: 'lab',
        title: 'WCAG 2.2 AAA Accessibility Auditor',
        subtitle: '12-vector contrast, target size, focus ring & ARIA compliance',
        group: 'Advanced / Labs',
        badge: 'Lab',
        icon: ShieldCheck,
        searchTerms: 'accessibility a11y wcag aaa contrast screen reader aria audit',
        action: () => onSelectTab('accessibility'),
      },
      {
        id: 'lab-responsive',
        type: 'lab',
        title: 'Responsive 7-Device Simulator',
        subtitle: 'Simulate iPhone, iPad, Android, desktop & ultra-wide viewports',
        group: 'Advanced / Labs',
        badge: 'Lab',
        icon: Smartphone,
        searchTerms: 'responsive device mobile tablet iphone ipad simulator screen viewports',
        action: () => onSelectTab('responsive'),
      },
      {
        id: 'lab-tokens',
        type: 'lab',
        title: 'Design Token & Math Scale Lab',
        subtitle: 'Typographic step ratios, optical radii & CSS variable registry',
        group: 'Advanced / Labs',
        badge: 'Lab',
        icon: Layers,
        searchTerms: 'tokens typography math scale ratio css variables design system',
        action: () => onSelectTab('tokens'),
      },
      {
        id: 'lab-provenance',
        type: 'lab',
        title: 'SPDX 2.3 Asset Provenance & License Lab',
        subtitle: 'License audit, artifact origin & authorship verification',
        group: 'Advanced / Labs',
        badge: 'Lab',
        icon: Shield,
        searchTerms: 'provenance spdx license attribution author legal audit',
        action: () => onSelectTab('provenance'),
      },
      {
        id: 'lab-events',
        type: 'lab',
        title: 'Interactive Experience Event Bus Telemetry',
        subtitle: 'Inspect real-time event logs, selection streams & state triggers',
        group: 'Advanced / Labs',
        badge: 'Lab',
        icon: Activity,
        searchTerms: 'events telemetry stream event bus logs diagnostics activity',
        action: () => onSelectTab('events'),
      },
      {
        id: 'lab-review',
        type: 'lab',
        title: 'Curator 28-Point Quality Review Lab',
        subtitle: 'System QA checklist & automated compliance rubric',
        group: 'Advanced / Labs',
        badge: 'Lab',
        icon: CheckCircle2,
        searchTerms: 'curator review quality rubric checklist qa audit testing',
        action: () => onSelectTab('curator-review'),
      },
    ];

    return [...components, ...styles, ...savedDesigns, ...actions, ...labs];
  }, [onSelectComponent, onSelectTab, soundEnabled, setSoundEnabled, hapticsEnabled, setHapticsEnabled]);

  // Filter and prioritize based on query and active filter chip
  const filteredItems = useMemo(() => {
    const rawQuery = query.trim().toLowerCase();
    const queryTokens = rawQuery.split(/\s+/).filter(Boolean);

    let candidates = allItems;

    // Filter by category chip
    if (activeFilter === 'components') {
      candidates = candidates.filter((item) => item.type === 'component');
    } else if (activeFilter === 'styles') {
      candidates = candidates.filter((item) => item.type === 'style');
    } else if (activeFilter === 'saved') {
      candidates = candidates.filter((item) => item.type === 'saved');
    } else if (activeFilter === 'actions') {
      candidates = candidates.filter((item) => item.type === 'action');
    } else if (activeFilter === 'labs') {
      candidates = candidates.filter((item) => item.type === 'lab');
    }

    if (queryTokens.length === 0) {
      // Default view: Curated Top Picks prioritized (Flagships, Styles, Saved, Actions, Labs)
      if (activeFilter === 'all') {
        const flagshipComponents = candidates.filter((c) =>
          c.type === 'component' &&
          (c.id.includes('auth-cinematic-mascot') ||
           c.id.includes('auth-aurora-glass') ||
           c.id.includes('card-cyber-hud') ||
           c.id.includes('btn-tactile-switch') ||
           c.id.includes('nav-liquid-dock') ||
           c.id.includes('input-biometric-auth'))
        );
        const topStyles = candidates.filter((c) => c.type === 'style').slice(0, 4);
        const topSaved = candidates.filter((c) => c.type === 'saved');
        const topActions = candidates.filter((c) => c.type === 'action').slice(0, 3);
        const topLabs = candidates.filter((c) => c.type === 'lab').slice(0, 2);

        return [...flagshipComponents, ...topStyles, ...topSaved, ...topActions, ...topLabs];
      }
      return candidates.slice(0, 20);
    }

    // Scoring Multi-Token Search
    return candidates
      .map((item) => {
        let score = 0;
        let matched = true;
        const text = `${item.title} ${item.subtitle} ${item.group} ${item.searchTerms}`.toLowerCase();

        for (const token of queryTokens) {
          if (!text.includes(token)) {
            matched = false;
            break;
          }
          if (item.title.toLowerCase().includes(token)) score += 20;
          if (item.subtitle.toLowerCase().includes(token)) score += 10;
          if (item.group.toLowerCase().includes(token)) score += 5;
          score += 1;
        }

        // Priority weighting: Components (10) -> Styles (8) -> Saved (6) -> Actions (4) -> Labs (2)
        if (item.type === 'component') score += 10;
        else if (item.type === 'style') score += 8;
        else if (item.type === 'saved') score += 6;
        else if (item.type === 'action') score += 4;
        else if (item.type === 'lab') score += 2;

        return { item, matched, score };
      })
      .filter(({ matched }) => matched)
      .sort((a, b) => b.score - a.score)
      .map(({ item }) => item)
      .slice(0, 25);
  }, [allItems, query, activeFilter]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
      listRef.current?.children[selectedIndex + 1]?.scrollIntoView?.({ block: 'nearest' });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
      listRef.current?.children[selectedIndex - 1]?.scrollIntoView?.({ block: 'nearest' });
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        filteredItems[selectedIndex].action();
        onClose();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-12 sm:pt-20 px-4 animate-modal-entry">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command Palette"
        className="w-full max-w-2xl bg-zinc-950 border border-cyan-500/30 rounded-2xl shadow-[0_0_80px_rgba(6,182,212,0.15)] overflow-hidden flex flex-col focus:outline-none"
        onKeyDown={handleKeyDown}
      >
        {/* Search Header */}
        <div className="p-4 border-b border-zinc-800/80 flex items-center gap-3 bg-zinc-900/60">
          <Search className="w-5 h-5 text-cyan-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search 300+ components, styles, saved designs, actions, or labs..."
            className="w-full bg-transparent text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none font-sans"
            role="combobox"
            aria-expanded={filteredItems.length > 0}
            aria-controls="command-palette-listbox"
            aria-autocomplete="list"
            aria-activedescendant={filteredItems[selectedIndex] ? `cmd-item-${filteredItems[selectedIndex].id}` : undefined}
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                setSelectedIndex(0);
                playSound('reset', 'MICRO');
              }}
              className="p-1 text-zinc-500 hover:text-white"
              aria-label="Clear search query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            aria-label="Close command palette"
            className="p-1.5 rounded-lg bg-zinc-800/60 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Priority Category Tabs */}
        <div className="px-3 py-2 bg-black/40 border-b border-zinc-800/60 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs font-mono">
          <button
            onClick={() => {
              setActiveFilter('all');
              setSelectedIndex(0);
              playSound('selection', 'MICRO');
            }}
            className={`px-2.5 py-1 rounded-lg transition-colors font-bold ${
              activeFilter === 'all' ? 'bg-cyan-500 text-zinc-950 shadow-sm' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            All
          </button>
          <button
            onClick={() => {
              setActiveFilter('components');
              setSelectedIndex(0);
              playSound('selection', 'MICRO');
            }}
            className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 font-bold ${
              activeFilter === 'components' ? 'bg-cyan-500 text-zinc-950 shadow-sm' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            <Box className="w-3 h-3" /> Components
          </button>
          <button
            onClick={() => {
              setActiveFilter('styles');
              setSelectedIndex(0);
              playSound('selection', 'MICRO');
            }}
            className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 font-bold ${
              activeFilter === 'styles' ? 'bg-amber-500 text-zinc-950 shadow-sm' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            <Palette className="w-3 h-3" /> Styles
          </button>
          <button
            onClick={() => {
              setActiveFilter('saved');
              setSelectedIndex(0);
              playSound('selection', 'MICRO');
            }}
            className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 font-bold ${
              activeFilter === 'saved' ? 'bg-purple-500 text-zinc-950 shadow-sm' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            <Bookmark className="w-3 h-3" /> Saved Designs
          </button>
          <button
            onClick={() => {
              setActiveFilter('actions');
              setSelectedIndex(0);
              playSound('selection', 'MICRO');
            }}
            className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 font-bold ${
              activeFilter === 'actions' ? 'bg-emerald-500 text-zinc-950 shadow-sm' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            <Zap className="w-3 h-3" /> Actions
          </button>
          <button
            onClick={() => {
              setActiveFilter('labs');
              setSelectedIndex(0);
              playSound('selection', 'MICRO');
            }}
            className={`px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1 font-bold ${
              activeFilter === 'labs' ? 'bg-blue-500 text-zinc-950 shadow-sm' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            <FlaskConical className="w-3 h-3" /> Advanced / Labs
          </button>
        </div>

        {/* Results List */}
        <div
          ref={listRef}
          id="command-palette-listbox"
          role="listbox"
          aria-label="Command palette results"
          className="max-h-[22rem] overflow-y-auto p-2 space-y-1"
        >
          {filteredItems.length === 0 ? (
            <div role="status" className="py-12 text-center text-zinc-500 text-xs font-mono space-y-2">
              <p>No results found for &ldquo;{query}&rdquo;.</p>
              <p className="text-[11px] text-zinc-600">Try searching for &ldquo;login&rdquo;, &ldquo;button&rdquo;, &ldquo;cyberpunk&rdquo;, &ldquo;audio&rdquo;, or &ldquo;motion&rdquo;.</p>
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const Icon = item.icon;
              const isSelected = index === selectedIndex;

              // Group tag styling
              let groupColor = 'bg-zinc-800 text-zinc-400';
              if (item.type === 'component') groupColor = 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20';
              else if (item.type === 'style') groupColor = 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
              else if (item.type === 'saved') groupColor = 'bg-purple-500/10 text-purple-400 border border-purple-500/20';
              else if (item.type === 'action') groupColor = 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
              else if (item.type === 'lab') groupColor = 'bg-blue-500/10 text-blue-400 border border-blue-500/20';

              return (
                <button
                  key={item.id}
                  id={`cmd-item-${item.id}`}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    item.action();
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl flex items-center justify-between gap-3 transition-colors ${
                    isSelected
                      ? 'bg-cyan-500/15 text-white border border-cyan-500/40 shadow-sm'
                      : 'text-zinc-300 hover:bg-zinc-900 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`p-2 rounded-xl shrink-0 ${
                        isSelected
                          ? 'bg-cyan-500 text-zinc-950 shadow-md'
                          : 'bg-zinc-900 border border-zinc-800 text-cyan-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold truncate text-white">{item.title}</span>
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded font-bold shrink-0 ${groupColor}`}>
                          {item.group}
                        </span>
                        {item.badge && item.group === 'Components' && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 shrink-0">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-zinc-400 truncate mt-0.5">{item.subtitle}</p>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="flex items-center gap-1 text-[10px] font-mono text-cyan-400 shrink-0">
                      <span>{item.type === 'component' ? 'Inspect Detail' : 'Open'}</span>
                      <CornerDownLeft className="w-3.5 h-3.5" />
                    </div>
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Footer info & keyboard guides */}
        <div className="p-3 bg-zinc-900/90 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-300 text-[10px]">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-300 text-[10px]">↓</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-300 text-[10px]">↵</kbd>
              Open Specimen
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-300 text-[10px]">Esc</kbd>
              Close
            </span>
          </div>
          <span aria-live="polite">Showing {filteredItems.length} options</span>
        </div>
      </div>
    </div>
  );
}
