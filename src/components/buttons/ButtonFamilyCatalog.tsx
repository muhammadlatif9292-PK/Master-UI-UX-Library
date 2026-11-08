/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useTheme } from '../../design-system/tokens/ThemeContext';
import { BUTTON_REGISTRY } from '../../design-system/catalog/buttonRegistry';
import { CatalogEntry } from '../../design-system/catalog/catalogTypes';
import { VariantDetailPage } from '../detail/VariantDetailPage';
import { VisualShowroomCard } from '../VisualShowroomCard';
import {
  Zap,
  Search,
  ArrowRight,
  Shield,
  Layers,
  Sparkles,
  MousePointer,
  Filter,
} from 'lucide-react';

interface ButtonFamilyCatalogProps {
  onSelectEntry?: (entry: CatalogEntry) => void;
}

export function ButtonFamilyCatalog({ onSelectEntry }: ButtonFamilyCatalogProps) {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedEntry, setSelectedEntry] = useState<CatalogEntry | null>(null);

  const handleSelectEntry = (entry: CatalogEntry) => {
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

  const categories = [
    { id: 'all', label: 'All Action Variants (50+)' },
    { id: 'Next-Gen Action Primitives', label: 'Next-Gen Primitives' },
    { id: 'Kinetic Interactions', label: 'Kinetic & Physics' },
    { id: 'Cybernetic HUD', label: 'Cybernetic & HUD' },
    { id: 'Tactile Physical', label: 'Tactile & Skeuomorphic' },
    { id: 'Luxury Materials', label: 'Luxury & Metallic' },
    { id: 'Core Action Primitives', label: 'Core Action Primitives' },
    { id: 'Minimal Editorial', label: 'Minimal Editorial' },
  ];

  const filteredEntries = BUTTON_REGISTRY.filter((entry) => {
    const matchesSearch =
      entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      entry.component.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || entry.collection === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 md:p-12 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className={`p-6 md:p-8 rounded-3xl ${theme.surface.primary} border ${theme.border.default} shadow-xl space-y-6`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-2">
              <Zap className="w-3.5 h-3.5 animate-pulse text-cyan-400" /> Major Component Family: Button & Actions (50+ Reference Variants)
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Enterprise Button & Action Suite</h1>
            <p className="text-xs md:text-sm opacity-70 mt-1">
              Explore 50+ distinctive button, FAB, split-button, chip, command, destructive, and progress variants with calibrated sound, haptics, and physics.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-3 w-4 h-4 opacity-50" />
            <input
              type="text"
              placeholder="Search 50+ button variants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/30 border ${theme.border.default} text-xs focus:outline-none ${theme.focus.ring}`}
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
                selectedCategory === cat.id
                  ? 'bg-cyan-500 text-zinc-950 font-bold shadow-md'
                  : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of 50+ Button Variants */}
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
