/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useTheme } from '../design-system/tokens/ThemeContext';
import { useMotion } from '../design-system/motion/MotionContext';
import { useSound } from '../design-system/sound/SoundContext';
import { useHaptics } from '../design-system/haptics/HapticContext';
import { useExperienceEvents } from '../design-system/events/ExperienceEventContext';
import { useAccessibility } from '../design-system/accessibility/AccessibilityContext';
import { useOrganization } from '../design-system/catalog/OrganizationContext';
import { useExperienceLevel } from '../design-system/experience/ExperienceLevelContext';
import { useLibraryOnboarding } from '../design-system/onboarding/LibraryOnboardingContext';
import { LibraryOnboardingModal } from './onboarding/LibraryOnboardingModal';
import { FocusTrap } from '../design-system/overlay/FocusTrap';

// Core Primary Hubs
import { HomeCommandCenter } from './HomeCommandCenter';
import { ExploreHub, ExploreCategory } from './explore/ExploreHub';
import { LabsHub, LabToolId } from './labs/LabsHub';
import { CollectionsHub, CollectionsSubTab } from './collections/CollectionsHub';
import { CommandPaletteModal } from './shell/CommandPaletteModal';
import { InspectorToolRail } from './shell/InspectorToolRail';
import { CATALOG_REGISTRY } from '../design-system/catalog/catalogRegistry';
import { CatalogEntry } from '../design-system/catalog/catalogTypes';
import { VariantDetailPage } from './detail/VariantDetailPage';

// Lazy load Customize (Composer)
const ExperienceComposerLab = lazy(() => import('./composer/ExperienceComposerLab').then((m) => ({ default: m.ExperienceComposerLab })));

import {
  Home,
  Compass,
  Wand2,
  Bookmark,
  FlaskConical,
  Settings,
  Search,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  PanelLeftClose,
  PanelLeft,
  Volume2,
  VolumeX,
  Vibrate,
  Sliders,
  Command,
  ArrowUpRight,
  HelpCircle,
} from 'lucide-react';

export type PrimaryTab = 'home' | 'explore' | 'customize' | 'collections' | 'labs' | 'settings';

export type LegacyTabId =
  | PrimaryTab
  | ExploreCategory
  | LabToolId
  | CollectionsSubTab
  | 'components'
  | 'themes'
  | 'ai-export'
  | 'composer';

export function MasterLibraryApp() {
  const { theme, activeThemeId, setThemeId, allThemes } = useTheme();
  const { intensity, setIntensity } = useMotion();
  const { soundEnabled, setSoundEnabled, playSound } = useSound();
  const { hapticsEnabled, setHapticsEnabled } = useHaptics();
  const { emit } = useExperienceEvents();
  const { activePresetId } = useAccessibility();
  const { favoritesCount, collectionsCount, recordView } = useOrganization();
  const { experienceLevel, setExperienceLevel, toggleExperienceLevel, isAdvanced, isStandard } = useExperienceLevel();
  const { reopenTour, dontShowAgain, setDontShowAgain } = useLibraryOnboarding();

  const [activePrimaryTab, setActivePrimaryTab] = useState<PrimaryTab>('home');
  const [activeExploreCategory, setActiveExploreCategory] = useState<ExploreCategory>('all');
  const [activeLabTool, setActiveLabTool] = useState<LabToolId>('motion');
  const [activeCollectionsSubTab, setActiveCollectionsSubTab] = useState<CollectionsSubTab>('favorites');
  const [selectedVariantEntry, setSelectedVariantEntry] = useState<CatalogEntry | null>(null);

  const [recentTabs, setRecentTabs] = useState<string[]>(['explore', 'auth', 'customize', 'motion']);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);
  const [inspectorRailOpen, setInspectorRailOpen] = useState<boolean>(false);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      } else if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        setCommandPaletteOpen(true);
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        setSidebarCollapsed((prev) => !prev);
      } else if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Universal Navigation Dispatcher (supports both primary tabs and legacy/sub-routes)
  const handleTabChange = (destination: string) => {
    setMobileMenuOpen(false);
    playSound('tab-change', 'NAVIGATION');

    // 0. Component Direct Matches
    if (destination.startsWith('comp:') || destination.startsWith('component:')) {
      const compId = destination.replace(/^(comp|component):/, '');
      const entry = CATALOG_REGISTRY.find((e) => e.id === compId || e.component.toLowerCase() === compId.toLowerCase());
      if (entry) {
        setSelectedVariantEntry(entry);
        recordView(entry.id);
        setActivePrimaryTab('explore');
        setRecentTabs((prev) => Array.from(new Set([entry.name, ...prev])).slice(0, 6));
        emit('navigation.changed', 'explore', { component: entry.id });
        return;
      }
    }

    setSelectedVariantEntry(null);

    // 1. Primary Direct Matches
    if (destination === 'home') {
      setActivePrimaryTab('home');
      emit('navigation.changed', 'home', { tab: 'home' });
      return;
    }

    if (destination === 'customize' || destination === 'composer') {
      setActivePrimaryTab('customize');
      setRecentTabs((prev) => Array.from(new Set(['customize', ...prev])).slice(0, 6));
      emit('navigation.changed', 'customize', { tab: 'customize' });
      return;
    }

    if (destination === 'settings') {
      setActivePrimaryTab('settings');
      emit('navigation.changed', 'settings', { tab: 'settings' });
      return;
    }

    // 2. Collections & Compare Matches
    if (destination === 'collections' || destination === 'favorites' || destination === 'compare') {
      setActivePrimaryTab('collections');
      setActiveCollectionsSubTab(destination === 'compare' ? 'compare' : destination === 'collections' ? 'collections' : 'favorites');
      setRecentTabs((prev) => Array.from(new Set(['collections', ...prev])).slice(0, 6));
      emit('navigation.changed', 'collections', { tab: destination });
      return;
    }

    // 3. Explore & Component Catalog Matches
    const exploreMatches: Record<string, ExploreCategory> = {
      explore: 'all',
      components: 'all',
      all: 'all',
      auth: 'auth',
      navigation: 'navigation',
      buttons: 'buttons',
      inputs: 'inputs',
      cards: 'cards',
      styles: 'styles',
      controls: 'controls',
      overlay: 'overlay',
      feedback: 'feedback',
      dashboards: 'dashboards',
      'ai-interface': 'ai-interface',
      character: 'character',
      spatial: 'spatial',
      scientific: 'scientific',
      workflow: 'workflow',
      pages: 'pages',
      'page-experiences': 'pages',
      general: 'general',
      onboarding: 'onboarding',
    };

    if (exploreMatches[destination]) {
      setActivePrimaryTab('explore');
      setActiveExploreCategory(exploreMatches[destination]);
      setRecentTabs((prev) => Array.from(new Set([destination, ...prev])).slice(0, 6));
      emit('navigation.changed', 'explore', { category: exploreMatches[destination] });
      return;
    }

    // 4. Labs & Advanced Matches
    const labMatches: Record<string, LabToolId> = {
      labs: 'motion',
      motion: 'motion',
      sound: 'sound',
      haptics: 'haptics',
      performance: 'performance',
      accessibility: 'accessibility',
      responsive: 'responsive',
      tokens: 'tokens',
      themes: 'tokens',
      events: 'events',
      architecture: 'architecture',
      'variant-scaling': 'variant-scaling',
      inspector: 'inspector',
      'curator-review': 'curator-review',
      provenance: 'provenance',
      export: 'export',
      'ai-export': 'export',
    };

    if (labMatches[destination]) {
      setActivePrimaryTab('labs');
      setActiveLabTool(labMatches[destination]);
      setRecentTabs((prev) => Array.from(new Set([destination, ...prev])).slice(0, 6));
      emit('navigation.changed', 'labs', { tool: labMatches[destination] });
      return;
    }

    // Default Fallback
    setActivePrimaryTab('explore');
    setActiveExploreCategory('all');
  };

  const primaryNavItems: {
    id: PrimaryTab;
    label: string;
    description: string;
    icon: any;
    badge?: string;
  }[] = [
    { id: 'home', label: 'Home', description: 'Start here & search intent', icon: Home },
    { id: 'explore', label: 'Explore', description: 'Components, styles & 16 families', icon: Compass, badge: `${CATALOG_REGISTRY.length}+` },
    { id: 'customize', label: 'Customize', description: 'Design recipe composer & mixer', icon: Wand2 },
    { id: 'collections', label: 'Collections', description: 'Favorites, projects & compare', icon: Bookmark, badge: `${favoritesCount + collectionsCount}` },
    {
      id: 'labs',
      label: isAdvanced ? 'Labs / Advanced' : 'Labs (Standard)',
      description: isAdvanced ? 'Sensory, performance & tokens' : 'Click to enable Advanced Mode',
      icon: FlaskConical,
      badge: isAdvanced ? '14' : 'Locked',
    },
  ];

  return (
    <div className={`min-h-screen bg-zinc-950 ${theme.text.primary} flex flex-col font-sans transition-colors duration-300 selection:bg-cyan-500 selection:text-zinc-950`}>
      {/* 1. Compact Top Bar */}
      <header className="h-14 border-b border-zinc-800/80 bg-zinc-950/90 sticky top-0 z-50 px-4 flex items-center justify-between gap-4 backdrop-blur-xl shrink-0">
        <div className="flex items-center gap-3">
          {/* Mobile Drawer Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
            aria-label="Toggle Mobile Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

          {/* Desktop Sidebar Collapse Toggle */}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden md:flex p-2 rounded-xl bg-zinc-900/60 border border-zinc-800 text-zinc-400 hover:text-cyan-400 transition-colors"
            title={sidebarCollapsed ? 'Expand Sidebar (⌘B)' : 'Collapse Sidebar (⌘B)'}
          >
            {sidebarCollapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
          </button>

          {/* Brand Logo & Title */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => handleTabChange('home')}>
            <div className="p-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs sm:text-sm tracking-tight text-white font-mono">
                Master UI/UX
              </span>
              <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono font-semibold">
                Design Library
              </span>
            </div>
          </div>
        </div>

        {/* 2. Global Command & Search Bar */}
        <div className="flex-1 max-w-md mx-2 hidden md:block">
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 text-xs font-sans transition-all group"
          >
            <div className="flex items-center gap-2.5">
              <Search className="w-3.5 h-3.5 text-zinc-500 group-hover:text-cyan-400 transition-colors" />
              <span className="truncate">Search components, styles, prompts...</span>
            </div>
            <kbd className="hidden lg:flex items-center gap-1 px-1.5 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-[10px] font-mono text-zinc-400 shrink-0">
              <Command className="w-2.5 h-2.5" /> K
            </kbd>
          </button>
        </div>

        {/* 3. Global Status & Quick Controls */}
        <div className="flex items-center gap-2">
          {/* Mobile Search Icon Button */}
          <button
            onClick={() => setCommandPaletteOpen(true)}
            className="md:hidden p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300"
            aria-label="Open Command Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Persistent Experience Level Mode Switch (Standard vs Advanced) */}
          <button
            onClick={() => {
              toggleExperienceLevel();
              playSound('selection', 'MICRO');
            }}
            className={`px-2.5 py-1.5 rounded-xl border transition-all text-xs font-mono font-bold flex items-center gap-1.5 shadow-sm ${
              isAdvanced
                ? 'bg-purple-500/20 border-purple-500/50 text-purple-300 hover:bg-purple-500/30 shadow-purple-500/10'
                : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20'
            }`}
            title={
              isAdvanced
                ? 'Mode: Advanced (Click to switch to Standard Mode)'
                : 'Mode: Standard (Click to switch to Advanced Mode)'
            }
            aria-label={`Current Mode: ${experienceLevel}. Click to switch.`}
          >
            <span className={`w-2 h-2 rounded-full ${isAdvanced ? 'bg-purple-400 animate-pulse' : 'bg-cyan-400'}`} />
            <span className="hidden sm:inline font-sans font-semibold">
              {isAdvanced ? 'Advanced Mode' : 'Standard Mode'}
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 font-mono uppercase">
              {experienceLevel}
            </span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-2 rounded-xl border transition-all text-xs flex items-center gap-1 ${
              soundEnabled
                ? 'bg-purple-500/10 border-purple-500/30 text-purple-300'
                : 'bg-zinc-900 border-zinc-800 text-zinc-500'
            }`}
            title={soundEnabled ? 'Web Audio Sound Enabled' : 'Web Audio Muted'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-purple-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Haptics Toggle */}
          <button
            onClick={() => setHapticsEnabled(!hapticsEnabled)}
            className={`hidden sm:flex p-2 rounded-xl border transition-all text-xs ${
              hapticsEnabled
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : 'bg-zinc-900 border-zinc-800 text-zinc-500'
            }`}
            title={hapticsEnabled ? 'Haptics Active' : 'Haptics Disabled'}
          >
            <Vibrate className="w-4 h-4" />
          </button>

          {/* Inspector Rail Toggle */}
          <button
            onClick={() => setInspectorRailOpen(!inspectorRailOpen)}
            className={`p-2 rounded-xl border transition-all ${
              inspectorRailOpen
                ? 'bg-cyan-500 text-zinc-950 border-cyan-400 font-bold'
                : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white'
            }`}
            title="Toggle Live Style & Motion Inspector"
          >
            <Sliders className="w-4 h-4" />
          </button>

          {/* Guided Tour / Onboarding Button */}
          <button
            onClick={() => {
              playSound('selection', 'MICRO');
              reopenTour();
            }}
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
            title="Take 1-Minute Guided Tour"
            aria-label="Reopen Guided Onboarding Tour"
          >
            <HelpCircle className="w-4 h-4 text-cyan-400" />
          </button>
        </div>
      </header>

      {/* Main Layout Shell */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* 4. Streamlined Left Navigation Sidebar */}
        <aside
          role="navigation"
          aria-label="Primary"
          className={`${
            sidebarCollapsed ? 'w-16' : 'w-64'
          } border-r border-zinc-800/80 bg-zinc-950 hidden md:flex flex-col shrink-0 overflow-y-auto p-3 justify-between transition-all duration-300 select-none z-30`}
        >
          <div className="space-y-1.5">
            {!sidebarCollapsed && (
              <div className="px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
                Menu
              </div>
            )}

            {primaryNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePrimaryTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  title={sidebarCollapsed ? `${item.label} — ${item.description}` : undefined}
                  aria-current={isActive ? 'page' : undefined}
                  className={`w-full flex items-center ${
                    sidebarCollapsed ? 'justify-center p-2.5' : 'justify-between px-3 py-2.5'
                  } rounded-xl text-xs font-semibold transition-all touch-press ${
                    isActive
                      ? 'bg-cyan-500 text-zinc-950 font-bold shadow-md shadow-cyan-500/20'
                      : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/80 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-zinc-950' : 'text-zinc-400'}`} />
                    {!sidebarCollapsed && (
                      <div className="text-left truncate">
                        <span className="block truncate">{item.label}</span>
                      </div>
                    )}
                  </div>
                  {!sidebarCollapsed && item.badge && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-mono shrink-0 ${
                        isActive ? 'bg-zinc-950/20 text-zinc-950 font-bold' : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom Settings Button */}
          <div className="pt-3 border-t border-zinc-800/80">
            <button
              onClick={() => handleTabChange('settings')}
              title={sidebarCollapsed ? 'Settings & Preferences' : undefined}
              className={`w-full flex items-center ${
                sidebarCollapsed ? 'justify-center p-2.5' : 'px-3 py-2'
              } rounded-xl text-xs font-medium transition-all ${
                activePrimaryTab === 'settings'
                  ? 'bg-zinc-800 text-cyan-300 font-bold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60'
              }`}
            >
              <Settings className="w-4 h-4 shrink-0" />
              {!sidebarCollapsed && <span className="ml-3 truncate">Settings</span>}
            </button>
          </div>
        </aside>

        {/* Adaptive Mobile Drawer */}
        {mobileMenuOpen && (
          <FocusTrap
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-2xl md:hidden flex flex-col p-5 space-y-4 animate-modal-entry"
            onEscape={() => setMobileMenuOpen(false)}
          >
            <div role="dialog" aria-modal="true" aria-label="Navigation menu" className="flex flex-col h-full space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <span className="font-bold text-sm text-cyan-400 font-mono">Master UI/UX Library</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close navigation menu"
                  className="p-2 rounded-xl bg-zinc-800 text-zinc-300 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav aria-label="Primary" className="space-y-2 overflow-y-auto flex-1 pr-1">
                {primaryNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activePrimaryTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleTabChange(item.id)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium ${
                        isActive
                          ? 'bg-cyan-500 text-zinc-950 font-bold shadow-lg shadow-cyan-500/20'
                          : 'text-zinc-300 bg-zinc-900/60 border border-zinc-800/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${isActive ? 'text-zinc-950' : 'text-cyan-400'}`} />
                        <div className="text-left">
                          <span className="block font-semibold">{item.label}</span>
                          <span className={`text-xs block ${isActive ? 'text-zinc-900' : 'text-zinc-500'}`}>
                            {item.description}
                          </span>
                        </div>
                      </div>
                      {item.badge && (
                        <span className={`px-2 py-0.5 rounded-full text-xs font-mono ${isActive ? 'bg-zinc-950/20 text-zinc-950' : 'bg-zinc-800 text-zinc-400'}`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}

                <button
                  onClick={() => handleTabChange('settings')}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-zinc-400 bg-zinc-900/40 border border-zinc-800/40"
                >
                  <Settings className="w-5 h-5 text-zinc-500" />
                  <span>Settings &amp; Preferences</span>
                </button>
              </nav>
            </div>
          </FocusTrap>
        )}

        {/* 5. Main Canvas Workspace */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {/* Breadcrumb Bar */}
          <div className="h-10 border-b border-zinc-800/60 bg-zinc-950/60 px-4 md:px-8 flex items-center justify-between gap-4 text-xs font-mono shrink-0 select-none">
            <div className="flex items-center gap-2 truncate text-zinc-400">
              <span className="hover:text-zinc-200 cursor-pointer" onClick={() => handleTabChange('home')}>
                Library
              </span>
              <span>/</span>
              <span
                className="hover:text-zinc-200 cursor-pointer capitalize"
                onClick={() => {
                  setSelectedVariantEntry(null);
                  handleTabChange('explore');
                }}
              >
                {activePrimaryTab}
              </span>
              {selectedVariantEntry ? (
                <>
                  <span>/</span>
                  <span className="text-zinc-400 capitalize">{selectedVariantEntry.family}</span>
                  <span>/</span>
                  <span className="text-cyan-400 font-bold truncate max-w-[200px]">{selectedVariantEntry.name}</span>
                </>
              ) : (
                <>
                  {activePrimaryTab === 'explore' && (
                    <>
                      <span>/</span>
                      <span className="text-zinc-300 capitalize">{activeExploreCategory}</span>
                    </>
                  )}
                  {activePrimaryTab === 'labs' && (
                    <>
                      <span>/</span>
                      <span className="text-zinc-300 capitalize">{activeLabTool}</span>
                    </>
                  )}
                </>
              )}
            </div>

            <div className="hidden sm:flex items-center gap-3 shrink-0">
              <button
                onClick={() => handleTabChange('compare')}
                className="hover:text-cyan-300 transition-colors flex items-center gap-1.5 text-zinc-400"
              >
                Compare
              </button>
              <button
                onClick={() => handleTabChange('export')}
                className="hover:text-cyan-300 transition-colors flex items-center gap-1.5 text-zinc-400"
              >
                Use in My App
              </button>
            </div>
          </div>

          {/* Primary Main Content View */}
          <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6" key={activePrimaryTab}>
            <div className="max-w-7xl mx-auto space-y-6 animate-page-entry">
              {activePrimaryTab === 'home' && (
                <HomeCommandCenter
                  onNavigate={handleTabChange}
                  onOpenCommandPalette={() => setCommandPaletteOpen(true)}
                  onSelectEntry={(entry) => {
                    setSelectedVariantEntry(entry);
                    recordView(entry.id);
                    setActivePrimaryTab('explore');
                  }}
                  recentTabs={recentTabs}
                  favoritesCount={favoritesCount}
                  collectionsCount={collectionsCount}
                />
              )}

              {activePrimaryTab === 'explore' && (
                selectedVariantEntry ? (
                  <VariantDetailPage
                    entry={selectedVariantEntry}
                    onBack={() => setSelectedVariantEntry(null)}
                    onNavigateToCustomize={(specimenId) => {
                      setSelectedVariantEntry(null);
                      handleTabChange('customize');
                    }}
                    onNavigateToCompare={(specimenId) => {
                      setSelectedVariantEntry(null);
                      handleTabChange('compare');
                    }}
                    onSelectSiblingEntry={(sibling) => setSelectedVariantEntry(sibling)}
                  />
                ) : (
                  <ExploreHub
                    initialCategory={activeExploreCategory}
                    onSelectEntry={(entry) => {
                      setSelectedVariantEntry(entry);
                      recordView(entry.id);
                    }}
                    onNavigateToCustomize={(specimenId) => handleTabChange('customize')}
                    onNavigateToCompare={(specimenId) => handleTabChange('compare')}
                    onNavigateToCode={(specimenId) => handleTabChange('export')}
                  />
                )
              )}

              <Suspense
                fallback={
                  <div className="flex items-center justify-center py-20 text-zinc-500 font-mono text-xs gap-3">
                    <div className="w-4 h-4 rounded-full border-2 border-cyan-500/40 border-t-cyan-400 animate-spin" />
                    Loading module…
                  </div>
                }
              >
                {activePrimaryTab === 'customize' && <ExperienceComposerLab />}
              </Suspense>

              {activePrimaryTab === 'collections' && (
                <CollectionsHub
                  initialTab={activeCollectionsSubTab}
                  onNavigateToExplore={() => handleTabChange('explore')}
                />
              )}

              {activePrimaryTab === 'labs' && (
                <LabsHub initialTool={activeLabTool} />
              )}

              {activePrimaryTab === 'settings' && (
                <div className="p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 space-y-6 shadow-xl max-w-4xl mx-auto">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold text-white tracking-tight">Library Preferences &amp; Global Controls</h2>
                      <p className="text-xs text-zinc-400">Manage experience complexity, themes, motion intensity, and sensory feedback.</p>
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-bold">
                      Mode: {experienceLevel.toUpperCase()}
                    </span>
                  </div>

                  {/* Guided Onboarding Tour Card */}
                  <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <div className="space-y-1">
                        <h3 className="font-semibold text-sm text-zinc-200 flex items-center gap-2">
                          <HelpCircle className="w-4 h-4 text-cyan-400" />
                          Library Guided Onboarding Tour
                        </h3>
                        <p className="text-xs text-zinc-400">
                          Short 5-step walkthrough explaining component discovery, 5D state machines, archetype mixing, and React / Gemini AI prompt exports.
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          playSound('selection', 'MICRO');
                          reopenTour();
                        }}
                        className="px-4 py-2 rounded-xl bg-cyan-500 text-zinc-950 hover:bg-cyan-400 font-bold text-xs flex items-center gap-2 shadow-md shadow-cyan-500/20 transition-all font-mono"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Reopen Guided Tour</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-zinc-900 text-xs">
                      <span className="text-zinc-400">Startup Behavior:</span>
                      <button
                        onClick={() => setDontShowAgain(!dontShowAgain)}
                        className="flex items-center gap-2 text-cyan-300 font-mono text-xs hover:text-cyan-200"
                      >
                        <span className={`w-2 h-2 rounded-full ${dontShowAgain ? 'bg-amber-400' : 'bg-cyan-400'}`} />
                        <span>{dontShowAgain ? 'Disabled on Startup (Hidden)' : 'Prompt on Startup (Active)'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Experience Level Standard / Advanced Persistent Card */}
                  <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="font-semibold text-sm text-zinc-200 flex items-center gap-2">
                          <Sliders className="w-4 h-4 text-cyan-400" />
                          Experience Level Complexity Mode
                        </h3>
                        <p className="text-xs text-zinc-400">
                          Controls whether internal laboratory engines, motion physics, and token inspection are hidden by default or fully exposed.
                        </p>
                      </div>

                      <div className="flex items-center gap-2 bg-zinc-900 p-1 rounded-xl border border-zinc-800">
                        <button
                          onClick={() => {
                            setExperienceLevel('standard');
                            playSound('selection', 'MICRO');
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            isStandard
                              ? 'bg-cyan-500 text-zinc-950 font-bold shadow-md'
                              : 'text-zinc-400 hover:text-white'
                          }`}
                        >
                          Standard Mode
                        </button>
                        <button
                          onClick={() => {
                            setExperienceLevel('advanced');
                            playSound('selection', 'MICRO');
                          }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                            isAdvanced
                              ? 'bg-purple-500 text-white font-bold shadow-md shadow-purple-500/20'
                              : 'text-zinc-400 hover:text-white'
                          }`}
                        >
                          Advanced Mode
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${isStandard ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-200' : 'bg-zinc-900/40 border-zinc-800 text-zinc-400'}`}>
                        <div className="font-bold flex items-center justify-between">
                          <span>Standard Mode (Focused Workspaces)</span>
                          {isStandard && <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-cyan-500 text-zinc-950 font-extrabold">ACTIVE</span>}
                        </div>
                        <p className="text-[11px] leading-relaxed opacity-90">
                          Exposes only core workflows: Home, Explore, Preview, Customize, Compare, Save, Code, and AI Prompt briefs. Advanced tools are cleanly hidden.
                        </p>
                      </div>

                      <div className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${isAdvanced ? 'bg-purple-500/10 border-purple-500/40 text-purple-200' : 'bg-zinc-900/40 border-zinc-800 text-zinc-400'}`}>
                        <div className="font-bold flex items-center justify-between">
                          <span>Advanced Mode (Deep Technical Inspection)</span>
                          {isAdvanced && <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-purple-500 text-white font-extrabold">ACTIVE</span>}
                        </div>
                        <p className="text-[11px] leading-relaxed opacity-90">
                          Exposes deep tools: Tokens, Motion internals, Sound synthesizer, Haptics, Performance, Accessibility, Provenance, Telemetry &amp; Architecture.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
                      <h3 className="font-semibold text-sm text-zinc-200">Theme Archetype Selection</h3>
                      <select
                        value={activeThemeId}
                        onChange={(e) => setThemeId(e.target.value as any)}
                        className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-cyan-300"
                      >
                        {Object.keys(allThemes).map((id) => (
                          <option key={id} value={id} className="bg-zinc-900 text-white">
                            {allThemes[id as keyof typeof allThemes].name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
                      <h3 className="font-semibold text-sm text-zinc-200">Motion Intensity Level</h3>
                      <div className="flex gap-2">
                        {[0, 1, 2, 3, 4].map((lvl) => (
                          <button
                            key={lvl}
                            onClick={() => setIntensity(lvl as any)}
                            className={`flex-1 py-2 rounded-xl text-xs font-mono font-bold ${
                              intensity === lvl ? 'bg-cyan-500 text-zinc-950' : 'bg-zinc-900 border border-zinc-800 text-zinc-400'
                            }`}
                          >
                            {lvl}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>

        {/* 6. Contextual Inspector Tool Rail */}
        <InspectorToolRail isOpen={inspectorRailOpen} onClose={() => setInspectorRailOpen(false)} />
      </div>

      {/* 7. Global Command Search Modal */}
      <CommandPaletteModal
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onSelectTab={(tabId) => handleTabChange(tabId)}
        onSelectComponent={(entryId) => {
          const entry = CATALOG_REGISTRY.find((e) => e.id === entryId);
          if (entry) {
            setSelectedVariantEntry(entry);
            setActivePrimaryTab('explore');
            setCommandPaletteOpen(false);
          }
        }}
      />
      {/* 8. Guided Library Onboarding Modal */}
      <LibraryOnboardingModal />
    </div>
  );
}
