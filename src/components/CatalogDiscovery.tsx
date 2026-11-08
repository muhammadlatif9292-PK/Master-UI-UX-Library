/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useTheme } from '../design-system/tokens/ThemeContext';
import { useSound } from '../design-system/sound/SoundContext';
import { useExperienceEvents } from '../design-system/events/ExperienceEventContext';
import { useOrganization } from '../design-system/catalog/OrganizationContext';
import { CATALOG_REGISTRY } from '../design-system/catalog/catalogRegistry';
import { CatalogEntry } from '../design-system/catalog/catalogTypes';
import { VariantDetailPage } from './detail/VariantDetailPage';
import { VisualShowroomCard } from './VisualShowroomCard';
import { ProvenanceBadge } from './provenance/ProvenanceBadge';
import { ARCHETYPE_TOKENS } from '../design-system/tokens';
import {
  Search,
  Filter,
  Star,
  Bookmark,
  Sparkles,
  ChevronRight,
  ChevronDown,
  SlidersHorizontal,
  Tag as TagIcon,
  X,
  Shield,
  Zap,
  Music,
  Vibrate,
  LayoutGrid,
  List,
  RotateCcw,
  Sliders,
  Check,
  Cpu,
  Layers,
  Activity,
  Box,
  Bot,
  Globe,
  FlaskConical,
  Workflow,
  Compass,
  MousePointerClick,
  Keyboard,
  Eye,
  Info,
  ShieldCheck,
  LayoutDashboard,
  MonitorCheck,
  Palette,
  Flame,
  CheckCircle2,
  Gauge,
  Volume2,
  Smartphone,
} from 'lucide-react';

interface CatalogDiscoveryProps {
  onSelectEntry?: (entry: CatalogEntry) => void;
  initialCategory?: string;
  onNavigateToCategoryStudio?: (categoryId: string) => void;
}

// Simple, understandable Visual Categories
export const VISUAL_CATEGORIES = [
  {
    id: 'all',
    label: 'All Components',
    shortLabel: 'All',
    icon: Box,
    description: 'Master registry across all categories',
    count: CATALOG_REGISTRY.length,
    accentColor: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-400',
  },
  {
    id: 'auth',
    label: 'Logins & Auth',
    shortLabel: 'Auth',
    icon: ShieldCheck,
    description: 'Liquid glass, biometric, mascot companion & MFA logins',
    count: 120,
    accentColor: 'from-indigo-500/20 to-purple-500/20 border-indigo-500/30 text-indigo-400',
  },
  {
    id: 'navigation',
    label: 'Navigation & Docks',
    shortLabel: 'Navigation',
    icon: Compass,
    description: 'Header docks, dynamic islands, command rails & menus',
    count: 58,
    accentColor: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-400',
  },
  {
    id: 'buttons',
    label: 'Buttons & Actions',
    shortLabel: 'Buttons',
    icon: MousePointerClick,
    description: 'Tactile switchgear, neon glow & magnetic buttons',
    count: 51,
    accentColor: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400',
  },
  {
    id: 'inputs',
    label: 'Inputs & Forms',
    shortLabel: 'Inputs',
    icon: Keyboard,
    description: 'Floating labels, biometric fields & rotary dials',
    count: 49,
    accentColor: 'from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400',
  },
  {
    id: 'cards',
    label: 'Cards & Bento',
    shortLabel: 'Cards',
    icon: LayoutGrid,
    description: '3D parallax, cyber HUD & frosted glass bento tiles',
    count: 35,
    accentColor: 'from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400',
  },
  {
    id: 'dashboards',
    label: 'Dashboards & Charts',
    shortLabel: 'Dashboards',
    icon: LayoutDashboard,
    description: 'Real-time telemetry, KPI widgets & analytics suites',
    count: 24,
    accentColor: 'from-rose-500/20 to-red-500/20 border-rose-500/30 text-rose-400',
  },
  {
    id: 'ai-interface',
    label: 'AI & Mascots',
    shortLabel: 'AI Workspaces',
    icon: Bot,
    description: 'Streaming chats, reactive companions & prompt bars',
    count: 28,
    accentColor: 'from-violet-500/20 to-indigo-500/20 border-violet-500/30 text-violet-400',
  },
  {
    id: 'spatial',
    label: 'Spatial & 3D',
    shortLabel: 'Spatial 3D',
    icon: Globe,
    description: 'Holographic cubes, parallax tilt & WebGL shaders',
    count: 14,
    accentColor: 'from-cyan-500/20 to-teal-500/20 border-cyan-500/30 text-cyan-400',
  },
  {
    id: 'scientific',
    label: 'Scientific & Nodes',
    shortLabel: 'Scientific',
    icon: FlaskConical,
    description: 'Oscilloscopes, spectrograms & node graph editors',
    count: 22,
    accentColor: 'from-sky-500/20 to-blue-500/20 border-sky-500/30 text-sky-400',
  },
  {
    id: 'pages',
    label: 'Page Experiences',
    shortLabel: 'Full Pages',
    icon: MonitorCheck,
    description: '16 complete multi-section full-page templates',
    count: 16,
    accentColor: 'from-emerald-500/20 to-cyan-500/20 border-emerald-500/30 text-emerald-400',
  },
];

// Simple Intent Filter Pills
export const INTENT_FILTERS = [
  { id: 'all', label: 'All Intents', icon: Sparkles },
  { id: 'production', label: 'Production Ready', icon: CheckCircle2, description: 'Stable releases verified for production' },
  { id: 'interactive', label: 'Interactive & Physics', icon: Activity, description: 'State machines, drag, and spring physics' },
  { id: 'auth-security', label: 'Auth & Security', icon: ShieldCheck, description: 'Sign-in, MFA, biometrics and passkeys' },
  { id: 'data-viz', label: 'Data & Telemetry', icon: LayoutDashboard, description: 'Charts, analytics and metrics dashboards' },
  { id: 'mobile-touch', label: 'Mobile Ergonomics', icon: Smartphone, description: '44px+ touch targets & gesture responsiveness' },
  { id: 'sensory-sound', label: 'Sound & Haptics', icon: Volume2, description: 'Procedural Web Audio & vibration feedback' },
];

export function CatalogDiscovery({
  onSelectEntry,
  initialCategory = 'all',
  onNavigateToCategoryStudio,
}: CatalogDiscoveryProps) {
  const { theme } = useTheme();
  const { playSound } = useSound();
  const { emit } = useExperienceEvents();
  const { isFavorite, toggleFavorite } = useOrganization();

  const searchInputRef = useRef<HTMLInputElement>(null);

  const [searchQuery, setSearchQuery] = useState('');

  // 1. Core Simple Controls (Default Visible)
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedStyle, setSelectedStyle] = useState<string>('all');
  const [selectedIntent, setSelectedIntent] = useState<string>('all');
  const [onlyFavorites, setOnlyFavorites] = useState<boolean>(false);

  // 2. Technical Filters (Progressively Revealed behind More Filters)
  const [showMoreFilters, setShowMoreFilters] = useState<boolean>(false);
  const [selectedAccessibility, setSelectedAccessibility] = useState<string>('all');
  const [selectedPerformance, setSelectedPerformance] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedMotion, setSelectedMotion] = useState<string>('all');
  const [selectedSound, setSelectedSound] = useState<string>('all');
  const [selectedDependency, setSelectedDependency] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [onlyCollections, setOnlyCollections] = useState<boolean>(false);

  // View Mode & Sorting
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'family' | 'version' | 'status' | 'performance'>('name');
  const [selectedEntry, setSelectedEntry] = useState<CatalogEntry | null>(null);

  const handleInspectEntry = (entry: CatalogEntry) => {
    playSound('selection', 'MICRO');
    if (onSelectEntry) {
      onSelectEntry(entry);
    } else {
      setSelectedEntry(entry);
    }
  };

  if (selectedEntry) {
    return (
      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        <VariantDetailPage
          entry={selectedEntry}
          onBack={() => setSelectedEntry(null)}
          onSelectSiblingEntry={(sibling) => setSelectedEntry(sibling)}
        />
      </div>
    );
  }

  // Keyboard shortcut listener (⌘K or /)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
        playSound('selection', 'MICRO');
      } else if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        searchInputRef.current?.focus();
        playSound('selection', 'MICRO');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playSound]);

  // Extract all unique values dynamically for technical filter options
  const allTags = useMemo(() => {
    const set = new Set<string>();
    CATALOG_REGISTRY.forEach((e) => e.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, []);

  const allDependencies = useMemo(() => {
    const set = new Set<string>();
    CATALOG_REGISTRY.forEach((e) => e.dependencies.forEach((d) => set.add(d)));
    return Array.from(set).sort();
  }, []);

  // Multi-Token Fuzzy Search and Filter Engine
  const filteredEntries = useMemo(() => {
    const queryTokens = searchQuery.trim().toLowerCase().split(/\s+/).filter(Boolean);

    return CATALOG_REGISTRY
      .map((item) => {
        // Multi-attribute searchable string
        const searchableText = [
          item.name,
          item.description,
          item.component,
          item.family,
          ...item.tags,
          item.mood,
          item.visualStyle,
          item.motionStyle,
          item.interactionStyle,
          item.soundStyle,
          item.hapticStyle,
          item.accessibility,
          item.performanceTier,
          ...item.dependencies,
          item.status,
          item.sourceInspiration || '',
        ]
          .join(' ')
          .toLowerCase();

        // Calculate query match score
        let matchesSearch = true;
        let score = 0;

        for (const token of queryTokens) {
          if (!searchableText.includes(token)) {
            matchesSearch = false;
            break;
          } else {
            if (item.name.toLowerCase().includes(token)) score += 10;
            if (item.family.toLowerCase().includes(token)) score += 5;
            if (item.tags.some((t) => t.toLowerCase().includes(token))) score += 4;
            score += 1;
          }
        }

        return { item, matchesSearch, score };
      })
      .filter(({ item, matchesSearch }) => {
        if (!matchesSearch) return false;

        // 1. Simple Category Filter
        if (selectedCategory !== 'all') {
          const familyStr = item.family as string;
          if (selectedCategory === 'ai-interface' && familyStr !== 'ai-interface' && familyStr !== 'character') return false;
          else if (selectedCategory === 'scientific' && familyStr !== 'scientific' && familyStr !== 'workflow') return false;
          else if (selectedCategory !== 'ai-interface' && selectedCategory !== 'scientific' && familyStr !== selectedCategory) return false;
        }

        // 2. Style Family Archetype Filter
        if (selectedStyle !== 'all' && !item.visualStyle.toLowerCase().includes(selectedStyle.toLowerCase())) return false;

        // 3. Simple Intent Filter
        if (selectedIntent !== 'all') {
          const statusStr = item.status as string;
          const familyStr = item.family as string;
          if (selectedIntent === 'production' && statusStr !== 'stable' && statusStr !== 'flagship') return false;
          if (selectedIntent === 'interactive' && !item.interactionStyle.includes('interactive') && !item.interactionStyle.includes('state')) return false;
          if (selectedIntent === 'auth-security' && familyStr !== 'auth') return false;
          if (selectedIntent === 'data-viz' && familyStr !== 'dashboards' && !item.tags.includes('data')) return false;
          if (selectedIntent === 'mobile-touch' && !item.tags.includes('touch') && !item.tags.includes('mobile')) return false;
          if (selectedIntent === 'sensory-sound' && item.soundStyle === 'none' && item.hapticStyle === 'none') return false;
        }

        // 4. Favorites Only Filter
        if (onlyFavorites && !isFavorite(item.id)) return false;

        // 5. Technical Filters (Progressively Revealed)
        if (selectedAccessibility !== 'all' && item.accessibility !== selectedAccessibility) return false;
        if (selectedPerformance !== 'all' && item.performanceTier !== selectedPerformance) return false;
        if (selectedStatus !== 'all' && item.status !== selectedStatus) return false;
        if (selectedMotion !== 'all' && !item.motionStyle.toLowerCase().includes(selectedMotion.toLowerCase())) return false;
        if (selectedSound !== 'all' && !item.soundStyle.toLowerCase().includes(selectedSound.toLowerCase())) return false;
        if (selectedDependency !== 'all' && !item.dependencies.includes(selectedDependency)) return false;
        if (selectedTag !== 'all' && !item.tags.includes(selectedTag)) return false;
        if (onlyCollections && !item.collection) return false;

        return true;
      })
      .sort((a, b) => {
        if (queryTokens.length > 0) {
          return b.score - a.score;
        }
        if (sortBy === 'name') return a.item.name.localeCompare(b.item.name);
        if (sortBy === 'family') return a.item.family.localeCompare(b.item.family);
        if (sortBy === 'version') return b.item.version.localeCompare(a.item.version);
        if (sortBy === 'status') return a.item.status.localeCompare(b.item.status);
        if (sortBy === 'performance') return a.item.performanceTier.localeCompare(b.item.performanceTier);
        return 0;
      })
      .map(({ item }) => item);
  }, [
    searchQuery,
    selectedCategory,
    selectedStyle,
    selectedIntent,
    onlyFavorites,
    isFavorite,
    selectedAccessibility,
    selectedPerformance,
    selectedStatus,
    selectedMotion,
    selectedSound,
    selectedDependency,
    selectedTag,
    onlyCollections,
    sortBy,
  ]);

  // Count active technical filters
  const technicalFilterCount =
    (selectedAccessibility !== 'all' ? 1 : 0) +
    (selectedPerformance !== 'all' ? 1 : 0) +
    (selectedStatus !== 'all' ? 1 : 0) +
    (selectedMotion !== 'all' ? 1 : 0) +
    (selectedSound !== 'all' ? 1 : 0) +
    (selectedDependency !== 'all' ? 1 : 0) +
    (selectedTag !== 'all' ? 1 : 0) +
    (onlyCollections ? 1 : 0);

  const totalActiveFilterCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedStyle !== 'all' ? 1 : 0) +
    (selectedIntent !== 'all' ? 1 : 0) +
    (onlyFavorites ? 1 : 0) +
    technicalFilterCount;

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedStyle('all');
    setSelectedIntent('all');
    setOnlyFavorites(false);
    setSelectedAccessibility('all');
    setSelectedPerformance('all');
    setSelectedStatus('all');
    setSelectedMotion('all');
    setSelectedSound('all');
    setSelectedDependency('all');
    setSelectedTag('all');
    setOnlyCollections(false);
    playSound('reset', 'MICRO');
  };

  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const isFav = isFavorite(id);
    toggleFavorite(id);
    emit('selection.confirmed', id, { action: isFav ? 'favorite_removed' : 'favorite_added' });
    playSound('selection', 'MICRO');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* 1. Welcoming Header: "What are you looking for?" */}
      <div className={`p-6 sm:p-8 rounded-3xl ${theme.surface.primary} border ${theme.border.default} shadow-2xl space-y-6`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>EXPLORE MASTER CATALOG</span>
              <span className="text-zinc-500">•</span>
              <span className="text-zinc-400 font-normal">{CATALOG_REGISTRY.length} Production UI Specimens</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
              What are you looking for?
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl leading-relaxed">
              Find production-ready components by visual category, design style, or natural intent.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start lg:self-center">
            {/* View Mode Switcher */}
            <div className="flex items-center p-1 rounded-xl bg-black/40 border border-zinc-800">
              <button
                onClick={() => {
                  setViewMode('grid');
                  playSound('selection', 'MICRO');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-colors ${
                  viewMode === 'grid' ? 'bg-cyan-500 text-zinc-950 shadow-md' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" /> Grid
              </button>
              <button
                onClick={() => {
                  setViewMode('table');
                  playSound('selection', 'MICRO');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-colors ${
                  viewMode === 'table' ? 'bg-cyan-500 text-zinc-950 shadow-md' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <List className="w-3.5 h-3.5" /> Table
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-zinc-500 hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 rounded-xl bg-black/40 border border-zinc-800 text-xs font-mono text-zinc-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="name">Name (A-Z)</option>
                <option value="family">Category Family</option>
                <option value="version">Version (Newest)</option>
                <option value="status">Status</option>
                <option value="performance">Performance Tier</option>
              </select>
            </div>
          </div>
        </div>

        {/* 2. Primary Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 pointer-events-none" />
          <input
            ref={searchInputRef}
            type="text"
            placeholder='Search 300+ components, styles, or intents (e.g. "liquid glass login", "tactile switch", "kpi telemetry")...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-24 py-3.5 rounded-2xl bg-black/50 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                playSound('reset', 'MICRO');
              }}
              className="absolute right-12 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <kbd className="absolute right-3.5 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-[10px] font-mono text-zinc-400 pointer-events-none">
            ⌘K
          </kbd>
        </div>

        {/* 3. Visual & Understandable Component Categories */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" /> Component Categories
            </span>
            <span className="text-zinc-500">Select to focus</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
            {VISUAL_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    playSound('tab-change', 'NAVIGATION');
                  }}
                  className={`p-3 rounded-2xl text-left transition-all relative group flex flex-col justify-between border ${
                    isSelected
                      ? 'bg-cyan-500/10 border-cyan-400 text-white shadow-lg shadow-cyan-500/10 ring-1 ring-cyan-400/30'
                      : 'bg-black/30 border-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <div
                      className={`p-1.5 rounded-xl ${
                        isSelected ? 'bg-cyan-500 text-zinc-950' : 'bg-zinc-800/80 text-zinc-400 group-hover:text-cyan-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full font-bold ${
                        isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-zinc-800/60 text-zinc-500'
                      }`}
                    >
                      {cat.count}
                    </span>
                  </div>

                  <div>
                    <div className={`text-xs font-bold ${isSelected ? 'text-cyan-300' : 'text-zinc-200 group-hover:text-white'}`}>
                      {cat.shortLabel}
                    </div>
                    <div className="text-[10px] text-zinc-500 line-clamp-1 mt-0.5">
                      {cat.label}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Style Family (Archetypes) Strip */}
        <div className="space-y-2 pt-2 border-t border-zinc-800/80">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-zinc-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-amber-400" /> Style Family (Design Archetype)
            </span>
            <span className="text-zinc-500">12 Archetypes</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <button
              onClick={() => {
                setSelectedStyle('all');
                playSound('selection', 'MICRO');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold shrink-0 transition-all ${
                selectedStyle === 'all'
                  ? 'bg-amber-500 text-zinc-950 shadow-md'
                  : 'bg-black/30 border border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              All Styles
            </button>
            {Object.keys(ARCHETYPE_TOKENS).map((key) => {
              const token = ARCHETYPE_TOKENS[key as any];
              const isSelected = selectedStyle === key;
              return (
                <button
                  key={key}
                  onClick={() => {
                    setSelectedStyle(isSelected ? 'all' : key);
                    playSound('selection', 'MICRO');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium shrink-0 transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-amber-400/20 border-amber-400 text-amber-300 font-bold ring-1 ring-amber-400/40'
                      : 'bg-black/30 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>{token?.name || key}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. Simple Intent Filters + Favorites + More Filters Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-800/80">
          {/* Quick Intent Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar">
            <span className="text-[10px] font-mono text-zinc-500 shrink-0 mr-1">Intent:</span>
            {INTENT_FILTERS.map((intent) => {
              const Icon = intent.icon;
              const isSelected = selectedIntent === intent.id;
              return (
                <button
                  key={intent.id}
                  onClick={() => {
                    setSelectedIntent(intent.id);
                    playSound('selection', 'MICRO');
                  }}
                  className={`px-2.5 py-1 rounded-xl text-xs font-medium shrink-0 transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-cyan-500 text-zinc-950 font-bold shadow-md shadow-cyan-500/20'
                      : 'bg-black/30 border border-zinc-800 text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{intent.label}</span>
                </button>
              );
            })}
          </div>

          {/* Action Buttons: Favorites Only + More Filters Toggle + Reset */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setOnlyFavorites(!onlyFavorites);
                playSound('selection', 'MICRO');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold inline-flex items-center gap-1.5 transition-all ${
                onlyFavorites
                  ? 'bg-amber-500 text-zinc-950 shadow-md shadow-amber-500/20'
                  : 'bg-black/40 border border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-zinc-950' : ''}`} />
              <span>Favorites</span>
            </button>

            <button
              onClick={() => {
                setShowMoreFilters(!showMoreFilters);
                playSound('selection', 'MICRO');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold inline-flex items-center gap-1.5 transition-all ${
                showMoreFilters || technicalFilterCount > 0
                  ? 'bg-zinc-800 border border-cyan-500/50 text-cyan-300 shadow-md'
                  : 'bg-black/40 border border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>More Filters</span>
              {technicalFilterCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-cyan-500 text-zinc-950 text-[10px] font-bold">
                  {technicalFilterCount}
                </span>
              )}
              <ChevronDown className={`w-3 h-3 transition-transform ${showMoreFilters ? 'rotate-180' : ''}`} />
            </button>

            {totalActiveFilterCount > 0 && (
              <button
                onClick={resetAllFilters}
                className="px-2.5 py-1.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono font-bold hover:bg-red-500/20 transition-all inline-flex items-center gap-1"
                title="Reset all filters"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* 6. PROGRESSIVELY REVEALED TECHNICAL FILTERS */}
        {showMoreFilters && (
          <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-cyan-500/20 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" /> Deep Technical &amp; Sensory Filters
              </span>
              <span className="text-[11px] font-mono text-zinc-500">
                Advanced governance &amp; internal taxonomy
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {/* Accessibility */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-emerald-400 font-bold flex items-center gap-1">
                  <Shield className="w-3 h-3" /> WCAG A11y
                </label>
                <select
                  value={selectedAccessibility}
                  onChange={(e) => setSelectedAccessibility(e.target.value)}
                  className="w-full px-2.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-200 focus:border-emerald-500"
                >
                  <option value="all">All Compliance</option>
                  <option value="AAA">AAA Compliance</option>
                  <option value="AA">AA Compliance</option>
                </select>
              </div>

              {/* Performance Tier */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-purple-400 font-bold flex items-center gap-1">
                  <Zap className="w-3 h-3" /> Perf Governor
                </label>
                <select
                  value={selectedPerformance}
                  onChange={(e) => setSelectedPerformance(e.target.value)}
                  className="w-full px-2.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-200 focus:border-purple-500"
                >
                  <option value="all">All Tiers</option>
                  <option value="ultra-fast">Tier 1: Ultra-Fast</option>
                  <option value="optimized">Tier 2: Optimized</option>
                  <option value="real-time">Tier 3: Real-Time</option>
                </select>
              </div>

              {/* Lifecycle Status */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-blue-400 font-bold flex items-center gap-1">
                  <Activity className="w-3 h-3" /> Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-2.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-200 focus:border-blue-500"
                >
                  <option value="all">All Statuses</option>
                  <option value="stable">Stable Production</option>
                  <option value="flagship">Flagship Specimen</option>
                  <option value="next-gen">Next-Gen Lab</option>
                  <option value="experimental">Experimental</option>
                </select>
              </div>

              {/* Motion Recipe */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-cyan-400 font-bold flex items-center gap-1">
                  <Activity className="w-3 h-3" /> Motion Recipe
                </label>
                <select
                  value={selectedMotion}
                  onChange={(e) => setSelectedMotion(e.target.value)}
                  className="w-full px-2.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-200 focus:border-cyan-500"
                >
                  <option value="all">All Motion</option>
                  <option value="subtle">Subtle Ease</option>
                  <option value="spring">Spring Physics</option>
                  <option value="fluid">Fluid Fade</option>
                  <option value="physics">Physics Based</option>
                </select>
              </div>

              {/* Sound Style */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-pink-400 font-bold flex items-center gap-1">
                  <Music className="w-3 h-3" /> Audio Synthesis
                </label>
                <select
                  value={selectedSound}
                  onChange={(e) => setSelectedSound(e.target.value)}
                  className="w-full px-2.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-200 focus:border-pink-500"
                >
                  <option value="all">All Audio</option>
                  <option value="sine">Procedural Sine</option>
                  <option value="polyphonic">Polyphonic Triads</option>
                  <option value="micro">Micro Clicks</option>
                  <option value="none">Silent</option>
                </select>
              </div>

              {/* Dependency */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-zinc-400 font-bold flex items-center gap-1">
                  <Box className="w-3 h-3" /> Dependencies
                </label>
                <select
                  value={selectedDependency}
                  onChange={(e) => setSelectedDependency(e.target.value)}
                  className="w-full px-2.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-200 focus:border-zinc-500"
                >
                  <option value="all">All Dependencies</option>
                  {allDependencies.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quick Tag Pills in More Filters */}
            <div className="pt-2 border-t border-zinc-800/60 flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-[10px] font-mono text-zinc-500 shrink-0">Tags:</span>
              <button
                onClick={() => setSelectedTag('all')}
                className={`px-2.5 py-0.5 rounded-lg text-[10px] font-mono shrink-0 transition-colors ${
                  selectedTag === 'all'
                    ? 'bg-cyan-500 text-zinc-950 font-bold'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
                }`}
              >
                All
              </button>
              {allTags.slice(0, 10).map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(selectedTag === tag ? 'all' : tag)}
                  className={`px-2.5 py-0.5 rounded-lg text-[10px] font-mono shrink-0 transition-colors ${
                    selectedTag === tag
                      ? 'bg-cyan-500 text-zinc-950 font-bold'
                      : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results Header Bar */}
      <div className="flex items-center justify-between px-2 text-xs font-mono text-zinc-400">
        <div className="flex items-center gap-2 font-bold">
          <span>Found {filteredEntries.length} {filteredEntries.length === 1 ? 'component' : 'components'}</span>
          {selectedCategory !== 'all' && (
            <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 uppercase text-[10px]">
              in {selectedCategory}
            </span>
          )}
          {selectedStyle !== 'all' && (
            <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 uppercase text-[10px]">
              style: {selectedStyle}
            </span>
          )}
        </div>

        {totalActiveFilterCount > 0 && (
          <button
            onClick={resetAllFilters}
            className="text-cyan-400 hover:underline flex items-center gap-1 font-bold"
          >
            <RotateCcw className="w-3 h-3" /> Clear filters
          </button>
        )}
      </div>

      {/* Results Display Area: Grid or Table Mode */}
      {filteredEntries.length === 0 ? (
        <div className="p-12 rounded-3xl bg-zinc-900/60 border border-zinc-800 text-center space-y-4">
          <div className="p-4 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 w-fit mx-auto">
            <Search className="w-8 h-8 opacity-70" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white">No Components Found</h3>
            <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
              We couldn't find any components matching your search or filters. Try adjusting keywords or clearing active filters.
            </p>
          </div>
          <button
            onClick={resetAllFilters}
            className="px-4 py-2 rounded-xl bg-cyan-500 text-zinc-950 font-bold text-xs font-mono shadow-lg hover:bg-cyan-400 transition-all inline-flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset All Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* Visual Showroom Card Grid Mode */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEntries.map((item) => (
            <VisualShowroomCard
              key={item.id}
              entry={item}
              onOpen={handleInspectEntry}
            />
          ))}
        </div>
      ) : (
        /* Data-Dense Table View Mode */
        <div className="p-4 rounded-3xl bg-zinc-900/80 border border-zinc-800 overflow-x-auto shadow-2xl">
          <table className="w-full text-left font-mono text-xs text-zinc-300">
            <thead>
              <tr className="border-b border-zinc-800 text-[11px] uppercase text-zinc-500 font-bold">
                <th className="pb-3 px-3">Name</th>
                <th className="pb-3 px-3">Family</th>
                <th className="pb-3 px-3">Visual Archetype</th>
                <th className="pb-3 px-3">Motion</th>
                <th className="pb-3 px-3">A11y</th>
                <th className="pb-3 px-3">Perf Tier</th>
                <th className="pb-3 px-3">Status</th>
                <th className="pb-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {filteredEntries.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => handleInspectEntry(item)}
                  className="hover:bg-zinc-800/50 transition-colors cursor-pointer group"
                >
                  <td className="py-3 px-3 font-bold text-white group-hover:text-cyan-300">
                    <div className="flex items-center gap-2">
                      <button onClick={(e) => handleToggleFavorite(item.id, e)} className="text-zinc-600 hover:text-amber-400" aria-label={`Favorite ${item.name}`}>
                        <Star className={`w-3.5 h-3.5 ${isFavorite(item.id) ? 'text-amber-400 fill-amber-400' : ''}`} />
                      </button>
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] uppercase font-bold">
                      {item.family}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-amber-300">{item.visualStyle}</td>
                  <td className="py-3 px-3 text-blue-300">{item.motionStyle}</td>
                  <td className="py-3 px-3 text-emerald-400 font-bold">{item.accessibility}</td>
                  <td className="py-3 px-3 text-purple-400 font-bold">{item.performanceTier}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 text-[10px]">
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <span className="text-cyan-400 group-hover:underline font-bold inline-flex items-center gap-1">
                      Inspect 12-Section <ChevronRight className="w-3 h-3" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
