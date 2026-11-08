/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  GeneralProvider,
  useGeneral,
  GENERAL_RECIPES,
  GeneralStyleRecipe,
  ComponentStateMode,
  MediaControls,
  FileUpload,
  FileBrowser,
  TableControls,
  ProfileCard,
  AccountSettings,
  NotificationCenter,
  TimelineView,
  ActivityFeed,
  SearchResultCards,
  FilterSystem,
  PaginationControls,
  DateTimeControls,
  PermissionMatrix,
} from '../../design-system/general';
import { GENERAL_CATALOG } from '../../design-system/catalog/generalRegistry';

import {
  Layers,
  PlaySquare,
  UploadCloud,
  FolderTree,
  Table,
  UserCheck,
  Settings,
  Bell,
  GitCommit,
  Activity,
  Search,
  SlidersHorizontal,
  Hash,
  Calendar,
  Shield,
  Code2,
  Sparkles,
  Copy,
  Check,
  Palette,
  Eye,
  Sliders,
  CheckCircle2,
  Info,
} from 'lucide-react';

type FamilyTab =
  | 'all'
  | 'media'
  | 'upload'
  | 'browser'
  | 'tables'
  | 'profiles'
  | 'settings'
  | 'notifications'
  | 'timeline'
  | 'activity'
  | 'search'
  | 'filters'
  | 'pagination'
  | 'datetime'
  | 'permissions';

const GeneralCatalogLabContent: React.FC = () => {
  const {
    recipe,
    setRecipe,
    recipeConfig,
    stateMode,
    setStateMode,
    isCompact,
    setIsCompact,
  } = useGeneral();

  const [activeTab, setActiveTab] = useState<FamilyTab>('all');
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  const [activeViewPanel, setActiveViewPanel] = useState<'preview' | 'code' | 'ai' | 'metadata'>('preview');

  const tabs: { id: FamilyTab; label: string; icon: any; catalogId: string }[] = [
    { id: 'all', label: 'All 14 Families', icon: Layers, catalogId: '' },
    { id: 'media', label: 'Media Controls', icon: PlaySquare, catalogId: 'general-media-controls' },
    { id: 'upload', label: 'File Upload', icon: UploadCloud, catalogId: 'general-file-upload' },
    { id: 'browser', label: 'File Browser', icon: FolderTree, catalogId: 'general-file-browser' },
    { id: 'tables', label: 'Tables & Grids', icon: Table, catalogId: 'general-tables' },
    { id: 'profiles', label: 'Profiles & Bios', icon: UserCheck, catalogId: 'general-profiles' },
    { id: 'settings', label: 'Account Settings', icon: Settings, catalogId: 'general-account-settings' },
    { id: 'notifications', label: 'Notifications', icon: Bell, catalogId: 'general-notifications' },
    { id: 'timeline', label: 'Timeline & Pipeline', icon: GitCommit, catalogId: 'general-timeline' },
    { id: 'activity', label: 'Activity Feed', icon: Activity, catalogId: 'general-activity-feed' },
    { id: 'search', label: 'Search Result Cards', icon: Search, catalogId: 'general-search-result-cards' },
    { id: 'filters', label: 'Faceted Filters', icon: SlidersHorizontal, catalogId: 'general-filters' },
    { id: 'pagination', label: 'Pagination Controls', icon: Hash, catalogId: 'general-pagination' },
    { id: 'datetime', label: 'Date/Time Controls', icon: Calendar, catalogId: 'general-date-time' },
    { id: 'permissions', label: 'Permission Controls', icon: Shield, catalogId: 'general-permissions' },
  ];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const currentEntry = GENERAL_CATALOG.find(
    (entry) => entry.id === tabs.find((t) => t.id === activeTab)?.catalogId
  ) || GENERAL_CATALOG[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none">
      {/* Top Header & Recipe Bar */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md px-6 py-4 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 shadow-inner">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-lg md:text-xl text-white tracking-tight">
                  General-Purpose Catalog Architecture
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-950 border border-indigo-700 text-indigo-300">
                  14 System Families
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Multi-recipe design system with exposed states, responsive modes, code previews, and AI specifications
              </p>
            </div>
          </div>

          {/* Style Recipe Switcher & State Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Recipe Selector */}
            <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-2xl border border-slate-800">
              <Palette className="w-3.5 h-3.5 text-slate-400 ml-2" />
              <select
                value={recipe}
                onChange={(e) => setRecipe(e.target.value as GeneralStyleRecipe)}
                className="bg-transparent text-xs font-semibold text-slate-200 outline-none pr-3 py-1 cursor-pointer"
              >
                {Object.values(GENERAL_RECIPES).map((r) => (
                  <option key={r.id} value={r.id} className="bg-slate-900 text-white">
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            {/* State Mode Selector */}
            <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-2xl border border-slate-800 text-xs font-mono">
              <span className="text-slate-500 pl-2 text-[11px]">State:</span>
              {(['interactive', 'loading', 'error', 'disabled', 'empty'] as ComponentStateMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setStateMode(mode)}
                  className={`px-2.5 py-1 rounded-xl capitalize text-[11px] transition-colors ${
                    stateMode === mode
                      ? 'bg-indigo-600 text-white font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Family Tab Strip */}
      <div className="border-b border-slate-800/80 bg-slate-900/30 px-6 overflow-x-auto scrollbar-thin">
        <div className="max-w-7xl mx-auto flex items-center gap-1 py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-indigo-600/30 border border-indigo-500/60 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Workspace Area: View Switcher (Preview / Code / AI Prompt / Metadata) */}
      <main className="max-w-7xl mx-auto w-full px-6 py-6 flex-1 space-y-6">
        {/* Component Header & Inspection Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/60">
          <div>
            <h2 className="text-xl font-extrabold text-white">
              {tabs.find((t) => t.id === activeTab)?.label}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Active Style Recipe: <span className="text-indigo-400 font-bold">{recipeConfig.name}</span> • {recipeConfig.description}
            </p>
          </div>

          <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-2xl border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setActiveViewPanel('preview')}
              className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all ${
                activeViewPanel === 'preview' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Live Preview</span>
            </button>

            <button
              onClick={() => setActiveViewPanel('code')}
              className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all ${
                activeViewPanel === 'code' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>React Code</span>
            </button>

            <button
              onClick={() => setActiveViewPanel('ai')}
              className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all ${
                activeViewPanel === 'ai' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Spec Prompt</span>
            </button>

            <button
              onClick={() => setActiveViewPanel('metadata')}
              className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all ${
                activeViewPanel === 'metadata' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Info className="w-3.5 h-3.5" />
              <span>Metadata</span>
            </button>
          </div>
        </div>

        {/* View 1: LIVE INTERACTIVE PREVIEW */}
        {activeViewPanel === 'preview' && (
          <div className="space-y-8">
            {/* Show Specific Component or All in Modular Flow */}
            {(activeTab === 'all' || activeTab === 'media') && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <PlaySquare className="w-4 h-4 text-indigo-400" />
                  <h3 className="font-bold text-sm text-slate-200">1. Media Controls Family</h3>
                </div>
                <MediaControls />
              </div>
            )}

            {(activeTab === 'all' || activeTab === 'upload') && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <UploadCloud className="w-4 h-4 text-indigo-400" />
                  <h3 className="font-bold text-sm text-slate-200">2. File Upload Family</h3>
                </div>
                <FileUpload />
              </div>
            )}

            {(activeTab === 'all' || activeTab === 'browser') && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <FolderTree className="w-4 h-4 text-indigo-400" />
                  <h3 className="font-bold text-sm text-slate-200">3. File Browser Family</h3>
                </div>
                <FileBrowser />
              </div>
            )}

            {(activeTab === 'all' || activeTab === 'tables') && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Table className="w-4 h-4 text-indigo-400" />
                  <h3 className="font-bold text-sm text-slate-200">4. Tables & Data Grids Family</h3>
                </div>
                <TableControls />
              </div>
            )}

            {(activeTab === 'all' || activeTab === 'profiles') && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-indigo-400" />
                  <h3 className="font-bold text-sm text-slate-200">5. Profiles & Bios Family</h3>
                </div>
                <ProfileCard />
              </div>
            )}

            {(activeTab === 'all' || activeTab === 'settings') && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-indigo-400" />
                  <h3 className="font-bold text-sm text-slate-200">6. Account Settings Family</h3>
                </div>
                <AccountSettings />
              </div>
            )}

            {(activeTab === 'all' || activeTab === 'notifications') && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-indigo-400" />
                  <h3 className="font-bold text-sm text-slate-200">7. Notifications Family</h3>
                </div>
                <NotificationCenter />
              </div>
            )}

            {(activeTab === 'all' || activeTab === 'timeline') && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <GitCommit className="w-4 h-4 text-indigo-400" />
                  <h3 className="font-bold text-sm text-slate-200">8. Timeline & Pipeline Family</h3>
                </div>
                <TimelineView />
              </div>
            )}

            {(activeTab === 'all' || activeTab === 'activity') && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-indigo-400" />
                  <h3 className="font-bold text-sm text-slate-200">9. Activity Feed Family</h3>
                </div>
                <ActivityFeed />
              </div>
            )}

            {(activeTab === 'all' || activeTab === 'search') && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-indigo-400" />
                  <h3 className="font-bold text-sm text-slate-200">10. Search Result Cards Family</h3>
                </div>
                <SearchResultCards />
              </div>
            )}

            {(activeTab === 'all' || activeTab === 'filters') && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-indigo-400" />
                  <h3 className="font-bold text-sm text-slate-200">11. Faceted Filters Family</h3>
                </div>
                <FilterSystem />
              </div>
            )}

            {(activeTab === 'all' || activeTab === 'pagination') && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Hash className="w-4 h-4 text-indigo-400" />
                  <h3 className="font-bold text-sm text-slate-200">12. Pagination Controls Family</h3>
                </div>
                <PaginationControls />
              </div>
            )}

            {(activeTab === 'all' || activeTab === 'datetime') && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-400" />
                  <h3 className="font-bold text-sm text-slate-200">13. Date/Time Controls Family</h3>
                </div>
                <DateTimeControls />
              </div>
            )}

            {(activeTab === 'all' || activeTab === 'permissions') && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-indigo-400" />
                  <h3 className="font-bold text-sm text-slate-200">14. Permission Controls Family</h3>
                </div>
                <PermissionMatrix />
              </div>
            )}
          </div>
        )}

        {/* View 2: CODE SNIPPET */}
        {activeViewPanel === 'code' && (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-indigo-400 font-bold">
                <Code2 className="w-4 h-4" />
                <span>React Component Export • {currentEntry.component}</span>
              </div>
              <button
                onClick={() => handleCopy(currentEntry.codeArtifact, 'code')}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5 transition-all text-xs font-semibold"
              >
                {copiedCodeId === 'code' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCodeId === 'code' ? 'Copied' : 'Copy JSX'}</span>
              </button>
            </div>
            <pre className="p-4 rounded-2xl bg-black/60 border border-slate-800/80 text-indigo-300 overflow-x-auto leading-relaxed">
              {currentEntry.codeArtifact}
            </pre>
          </div>
        )}

        {/* View 3: AI SPEC PROMPT */}
        {activeViewPanel === 'ai' && (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 space-y-4 text-xs font-mono">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2 text-indigo-400 font-bold">
                <Sparkles className="w-4 h-4" />
                <span>AI Prompt Specification for Gemini</span>
              </div>
              <button
                onClick={() => handleCopy(currentEntry.aiSpecification, 'ai')}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1.5 transition-all text-xs font-semibold"
              >
                {copiedCodeId === 'ai' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCodeId === 'ai' ? 'Copied' : 'Copy Prompt'}</span>
              </button>
            </div>
            <p className="p-4 rounded-2xl bg-black/60 border border-slate-800/80 text-slate-300 leading-relaxed">
              {currentEntry.aiSpecification}
            </p>
          </div>
        )}

        {/* View 4: METADATA */}
        {activeViewPanel === 'metadata' && (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 space-y-5 text-xs font-mono">
            <div className="flex items-center gap-2 text-indigo-400 font-bold pb-3 border-b border-slate-800">
              <Info className="w-4 h-4" />
              <span>Catalog Registry Metadata • {currentEntry.name}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-black/40 border border-slate-800/80 space-y-1">
                <span className="text-slate-500 uppercase text-[10px]">Family Category</span>
                <div className="text-white font-bold text-sm capitalize">{currentEntry.family}</div>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-slate-800/80 space-y-1">
                <span className="text-slate-500 uppercase text-[10px]">Accessibility Level</span>
                <div className="text-emerald-400 font-bold text-sm">WCAG {currentEntry.accessibility}</div>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-slate-800/80 space-y-1">
                <span className="text-slate-500 uppercase text-[10px]">Performance Tier</span>
                <div className="text-indigo-400 font-bold text-sm capitalize">{currentEntry.performanceTier}</div>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-slate-800/80 space-y-1">
                <span className="text-slate-500 uppercase text-[10px]">Responsive Policy</span>
                <div className="text-slate-200 text-xs">{currentEntry.responsiveBehavior}</div>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-slate-800/80 space-y-1">
                <span className="text-slate-500 uppercase text-[10px]">Interactive States</span>
                <div className="text-slate-200 text-xs">{currentEntry.states.join(', ')}</div>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-slate-800/80 space-y-1">
                <span className="text-slate-500 uppercase text-[10px]">System License</span>
                <div className="text-slate-200 text-xs">{currentEntry.license} (Version {currentEntry.version})</div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export const GeneralCatalogLab: React.FC = () => {
  return (
    <GeneralProvider>
      <GeneralCatalogLabContent />
    </GeneralProvider>
  );
};
