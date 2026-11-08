/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { CARD_REGISTRY } from '../../design-system/catalog/cardRegistry';
import { CatalogEntry } from '../../design-system/catalog/catalogTypes';
import { VariantDetailPage } from '../detail/VariantDetailPage';
import { useTheme } from '../../design-system/tokens/ThemeContext';
import { useSound } from '../../design-system/sound/SoundContext';
import { useHaptics } from '../../design-system/haptics/HapticContext';
import { useOrganization } from '../../design-system/catalog/OrganizationContext';
import { VisualShowroomCard } from '../VisualShowroomCard';
import {
  LayoutGrid,
  Search,
  SlidersHorizontal,
  Sparkles,
  Layers,
  Volume2,
  Vibrate,
  Shield,
  ArrowUpRight,
  Filter,
  Check,
  Star,
  Zap,
  Grid,
} from 'lucide-react';

interface CardFamilyCatalogProps {
  onSelectEntry?: (entry: CatalogEntry) => void;
}

export function CardFamilyCatalog({ onSelectEntry }: CardFamilyCatalogProps) {
  const { theme } = useTheme();
  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();
  const { isFavorite } = useOrganization();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCollection, setSelectedCollection] = useState<string>('all');
  const [activeDetailEntry, setActiveDetailEntry] = useState<CatalogEntry | null>(null);
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  // Extract unique collections
  const collections = useMemo(() => {
    const set = new Set<string>();
    CARD_REGISTRY.forEach((entry) => {
      if (entry.collection) set.add(entry.collection);
    });
    return Array.from(set);
  }, []);

  // Filter cards
  const filteredCards = useMemo(() => {
    return CARD_REGISTRY.filter((entry) => {
      const matchesSearch =
        entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCollection =
        selectedCollection === 'all' || entry.collection === selectedCollection;

      const matchesFavorites = !favoritesOnly || isFavorite(entry.id);

      return matchesSearch && matchesCollection && matchesFavorites;
    });
  }, [searchQuery, selectedCollection, favoritesOnly, isFavorite]);

  const handleSelectCard = (entry: CatalogEntry) => {
    playSound('press', 'MICRO');
    triggerHaptic('press');
    if (onSelectEntry) {
      onSelectEntry(entry);
    } else {
      setActiveDetailEntry(entry);
    }
  };

  if (activeDetailEntry) {
    return (
      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        <VariantDetailPage
          entry={activeDetailEntry}
          onBack={() => setActiveDetailEntry(null)}
          onSelectSiblingEntry={(sibling) => setActiveDetailEntry(sibling)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto p-4 md:p-8">
      {/* Catalog Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold">
              SURFACE & ARCHITECTURE
            </span>
            <span className="text-xs font-mono text-zinc-400">
              {CARD_REGISTRY.length} Production Variants
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Card & Bento Architecture Suite</h1>
          <p className="text-xs md:text-sm text-zinc-400 max-w-3xl">
            Prioritizing strict content hierarchy, mathematical layout proportions, optical glass refraction, and robust interaction states without gratuitous decorative noise.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-mono text-zinc-400">WCAG Standard</div>
            <div className="text-sm font-bold font-mono text-emerald-400">AAA / AA Compliant</div>
          </div>
          <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <LayoutGrid className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-zinc-950/80 backdrop-blur-xl p-4 rounded-3xl border border-white/10 shadow-xl">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search glass, bento, hero, tilt, data, KPI, AI cards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-zinc-900/90 border border-white/10 text-white text-xs font-mono placeholder:text-zinc-500 focus:outline-none focus:border-cyan-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => {
              setSelectedCollection('all');
              playSound('press', 'MICRO');
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all ${
              selectedCollection === 'all'
                ? 'bg-cyan-500 text-zinc-950 font-bold'
                : 'bg-white/5 text-zinc-400 hover:text-white'
            }`}
          >
            All Categories ({CARD_REGISTRY.length})
          </button>
          {collections.map((col) => (
            <button
              key={col}
              onClick={() => {
                setSelectedCollection(col);
                playSound('press', 'MICRO');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all ${
                selectedCollection === col
                  ? 'bg-cyan-500 text-zinc-950 font-bold'
                  : 'bg-white/5 text-zinc-400 hover:text-white'
              }`}
            >
              {col}
            </button>
          ))}
          <button
            onClick={() => {
              setFavoritesOnly(!favoritesOnly);
              playSound('press', 'MICRO');
            }}
            className={`px-3 py-2 rounded-xl text-xs font-mono flex items-center gap-1 transition-all ${
              favoritesOnly ? 'bg-amber-500 text-zinc-950 font-bold' : 'bg-white/5 text-zinc-400 hover:text-white'
            }`}
          >
            <Star className="w-3.5 h-3.5" /> Curated
          </button>
        </div>
      </div>

      {/* Grid of Card Variants */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCards.map((entry) => (
          <VisualShowroomCard
            key={entry.id}
            entry={entry}
            onOpen={handleSelectCard}
          />
        ))}
      </div>
    </div>
  );
}
