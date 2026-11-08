/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, Suspense, lazy } from 'react';
import { Star, Bookmark, GitCompare, Sparkles, Plus, Layers, ArrowRight } from 'lucide-react';

const PersonalOrganizer = lazy(() => import('../PersonalOrganizer').then((m) => ({ default: m.PersonalOrganizer })));
const ComparisonMatrix = lazy(() => import('../ComparisonMatrix').then((m) => ({ default: m.ComparisonMatrix })));

export type CollectionsSubTab = 'favorites' | 'collections' | 'compare';

interface CollectionsHubProps {
  initialTab?: CollectionsSubTab;
  onNavigateToExplore?: () => void;
}

export function CollectionsHub({
  initialTab = 'favorites',
  onNavigateToExplore,
}: CollectionsHubProps) {
  const [activeTab, setActiveTab] = useState<CollectionsSubTab>(initialTab);

  const tabs: { id: CollectionsSubTab; label: string; icon: any; desc: string }[] = [
    { id: 'favorites', label: 'Favorites', icon: Star, desc: 'Starred components and instant access specimens' },
    { id: 'collections', label: 'My Project Collections', icon: Bookmark, desc: 'Organized design sets for target applications' },
    { id: 'compare', label: 'Side-by-Side Compare', icon: GitCompare, desc: 'Compare 2 to 4 components, physics, and a11y scores' },
  ];

  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <div className="space-y-6">
      {/* Header and Switcher */}
      <div className="p-5 sm:p-6 rounded-2xl bg-zinc-900/80 border border-zinc-800/90 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-cyan-400 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                PERSONAL WORKSPACE
              </span>
              <span className="text-xs text-zinc-400 font-mono">
                {currentTab.label}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
              {React.createElement(currentTab.icon, { className: 'w-6 h-6 text-cyan-400' })}
              {currentTab.label}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl">
              {currentTab.desc}
            </p>
          </div>

          {onNavigateToExplore && (
            <button
              onClick={onNavigateToExplore}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 border border-zinc-700 transition-all self-start md:self-auto"
            >
              <span>Explore Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Sub-tab Navigation */}
        <div className="flex items-center gap-2 border-t border-zinc-800/60 pt-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-cyan-500 text-zinc-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'bg-zinc-950/60 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-zinc-950' : 'text-zinc-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-20 text-zinc-500 font-mono text-xs gap-3">
            <div className="w-4 h-4 rounded-full border-2 border-cyan-500/40 border-t-cyan-400 animate-spin" />
            Loading personal workspace...
          </div>
        }
      >
        {activeTab === 'compare' ? (
          <ComparisonMatrix />
        ) : (
          <PersonalOrganizer onSelectEntry={onNavigateToExplore} />
        )}
      </Suspense>
    </div>
  );
}
