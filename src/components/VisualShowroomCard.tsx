/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CatalogEntry } from '../design-system/catalog/catalogTypes';
import { useOrganization } from '../design-system/catalog/OrganizationContext';
import { useSound } from '../design-system/sound/SoundContext';
import { useHaptics } from '../design-system/haptics/HapticContext';
import { ShowroomSpecimenRenderer, resolveArchetypeFromEntry } from './ShowroomSpecimenRenderer';
import { Star, ArrowRight } from 'lucide-react';

interface VisualShowroomCardProps {
  key?: React.Key;
  entry: CatalogEntry;
  onOpen: (entry: CatalogEntry) => void;
  onSelect?: (entry: CatalogEntry) => void;
  className?: string;
  isCompact?: boolean;
}

export function VisualShowroomCard({
  entry,
  onOpen,
  onSelect,
  className = '',
  isCompact = false,
}: VisualShowroomCardProps) {
  const { isFavorite, toggleFavorite } = useOrganization();
  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();

  const isFav = isFavorite(entry.id);
  const styleInfo = resolveArchetypeFromEntry(entry);

  const handleToggleFav = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(entry.id);
    playSound(isFav ? 'button-press' : 'success', 'CONFIRMATION');
    triggerHaptic('DOUBLE_CONFIRM');
  };

  const handleOpen = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (onSelect) {
      onSelect(entry);
    } else {
      onOpen(entry);
    }
  };

  const formatFamily = (fam: string) => {
    if (!fam) return 'Component';
    if (fam === 'action') return 'Button';
    if (fam === 'surface') return 'Card';
    if (fam === 'input') return 'Form Input';
    if (fam === 'navigation') return 'Navigation';
    if (fam === 'ai-interface' || fam === 'ai') return 'AI Interface';
    if (fam === 'page-experience' || fam === 'page') return 'Page Layout';
    return fam.charAt(0).toUpperCase() + fam.slice(1);
  };

  return (
    <div
      onClick={handleOpen}
      className={`group relative flex flex-col justify-between rounded-2xl md:rounded-3xl bg-zinc-900/90 border border-zinc-800 hover:border-cyan-500/50 shadow-xl transition-all duration-300 overflow-hidden hover:shadow-cyan-500/10 hover:-translate-y-1 cursor-pointer select-none ${className}`}
    >
      {/* 1. PREVIEW STAGE (Primary Dominant Area: ~65-75% height) */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] min-h-[180px] sm:min-h-[210px] bg-zinc-950/80 p-3 sm:p-4 flex items-center justify-center border-b border-zinc-800/80 overflow-hidden">
        {/* Subtle style-accurate glow effect */}
        <div className={`absolute inset-0 opacity-15 group-hover:opacity-30 transition-opacity pointer-events-none ${styleInfo.accentGlow}`} />

        {/* Live Visual Specimen Renderer */}
        <ShowroomSpecimenRenderer entry={entry} />

        {/* Top Right Quick Actions Overlay: Favorite Star Button */}
        <div className="absolute top-2.5 right-2.5 z-20">
          <button
            type="button"
            onClick={handleToggleFav}
            aria-label={isFav ? `Remove ${entry.name} from favorites` : `Save ${entry.name} to favorites`}
            title={isFav ? 'Favorited' : 'Save to Favorites'}
            className={`p-2 rounded-xl backdrop-blur-md transition-all duration-200 border ${
              isFav
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-400 shadow-lg shadow-amber-500/20'
                : 'bg-zinc-900/80 border-zinc-700/50 text-zinc-400 hover:text-white hover:bg-zinc-800'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${isFav ? 'fill-amber-400 text-amber-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* 2. CARD FOOTER & PRIMARY ACTION (Clean, Scannable Info & Open Button) */}
      <div className="p-3.5 sm:p-4 flex items-center justify-between gap-3 bg-zinc-900/95">
        <div className="min-w-0 flex-1 space-y-0.5">
          <h3 className="font-bold text-sm sm:text-base text-zinc-100 group-hover:text-cyan-300 transition-colors truncate">
            {entry.name}
          </h3>
          <p className="text-[11px] font-mono text-zinc-400 truncate flex items-center gap-1.5">
            <span className="capitalize font-semibold text-zinc-300">{formatFamily(entry.family)}</span>
            <span className="text-zinc-600">•</span>
            <span className="text-amber-400/90 truncate">{entry.visualStyle || 'Standard'}</span>
          </p>
        </div>

        {/* Primary Action Button: "Open" */}
        <button
          type="button"
          onClick={handleOpen}
          aria-label={`Open ${entry.name} detail view`}
          className="px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 hover:text-zinc-950 text-xs font-mono font-bold transition-all duration-200 flex items-center gap-1 shrink-0 shadow-sm"
        >
          <span>Open</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
