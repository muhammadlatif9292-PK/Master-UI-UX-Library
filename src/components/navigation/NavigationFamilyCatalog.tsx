/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useTheme } from '../../design-system/tokens/ThemeContext';
import { NAVIGATION_REGISTRY } from '../../design-system/catalog/navigationRegistry';
import { CatalogEntry } from '../../design-system/catalog/catalogTypes';
import { VariantDetailPage } from '../detail/VariantDetailPage';
import { VisualShowroomCard } from '../VisualShowroomCard';
import {
  Compass,
  Search,
  Sparkles,
  ArrowRight,
  Shield,
  Layers,
} from 'lucide-react';

interface NavigationFamilyCatalogProps {
  onSelectEntry?: (entry: CatalogEntry) => void;
}

export function NavigationFamilyCatalog({ onSelectEntry }: NavigationFamilyCatalogProps) {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNavEntry, setSelectedNavEntry] = useState<CatalogEntry | null>(null);

  const handleSelectEntry = (entry: CatalogEntry) => {
    if (onSelectEntry) {
      onSelectEntry(entry);
    } else {
      setSelectedNavEntry(entry);
    }
  };

  if (selectedNavEntry) {
    return (
      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        <VariantDetailPage
          entry={selectedNavEntry}
          onBack={() => setSelectedNavEntry(null)}
          onSelectSiblingEntry={(sibling) => setSelectedNavEntry(sibling)}
        />
      </div>
    );
  }

  const filteredEntries = NAVIGATION_REGISTRY.filter((entry) =>
    entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-6 md:p-12 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className={`p-6 md:p-8 rounded-3xl ${theme.surface.primary} border ${theme.border.default} shadow-xl space-y-6`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-2">
              <Compass className="w-3.5 h-3.5 animate-spin" /> Major Component Family: Navigation (50 Reference Variants)
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Enterprise Navigation & Wayfinding Suite</h1>
            <p className="text-xs md:text-sm opacity-70 mt-1">
              Explore 50 genuinely distinct navigation architectures ranging from floating glass docks and command palettes to radial menus and AI-contextual routers.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-3 w-4 h-4 opacity-50" />
            <input
              type="text"
              placeholder="Search 50 navigation variants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/30 border ${theme.border.default} text-xs focus:outline-none ${theme.focus.ring}`}
            />
          </div>
        </div>
      </div>

      {/* Grid of 50 Navigation Variants */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEntries.map((entry) => (
          <VisualShowroomCard
            key={entry.id}
            entry={entry}
            onOpen={handleSelectEntry}
          />
        ))}
      </div>
    </div>
  );
}
