/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Search,
  SlidersHorizontal,
  Sparkles,
  Layers,
  Database,
  ArrowUpDown,
  Hash,
} from 'lucide-react';
import { PageStyleRecipe } from '../recipes';
import { FilterSystem } from '../../../design-system/general/components/FilterSystem';
import { SearchResultCards } from '../../../design-system/general/components/SearchResultCards';
import { PaginationControls } from '../../../design-system/general/components/PaginationControls';

interface Props {
  recipe: PageStyleRecipe;
}

export const SearchPageExperience: React.FC<Props> = ({ recipe }) => {
  const [query, setQuery] = useState('quantum attention mechanism zero-copy');
  const [entityType, setEntityType] = useState<'all' | 'papers' | 'models' | 'datasets'>('all');

  return (
    <div className={`w-full min-h-[850px] ${recipe.bodyBg} flex flex-col font-sans`}>
      {/* Search Header */}
      <header className={`px-6 py-5 border-b ${recipe.divider} ${recipe.headerBg} sticky top-0 z-20 space-y-4`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h1 className={`font-extrabold text-lg ${recipe.textPrimary}`}>
                Semantic Vector & Catalog Search
              </h1>
              <p className={`text-xs ${recipe.textSecondary}`}>
                Cosine similarity scoring across 1.4 million academic papers, model weights, and datasets
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold">
              1,428,940 VECTORS INDEXED
            </span>
          </div>
        </div>

        {/* Global Search Input Box */}
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by keywords, natural language query, or cosine embedding..."
              className={`w-full pl-12 pr-28 py-3.5 rounded-2xl text-xs font-mono ${recipe.inputBg} border ${recipe.inputBorder} ${recipe.textPrimary} outline-none shadow-xl ${recipe.ringFocus}`}
            />
            <button
              type="button"
              className={`absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl text-xs font-bold ${recipe.accentBg}`}
            >
              Search
            </button>
          </div>
        </div>
      </header>

      {/* Main Split Grid (Filters on Left, Result Cards on Right) */}
      <main className="max-w-7xl mx-auto w-full p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        {/* Left Column: Faceted Filter System (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className={`font-bold text-xs ${recipe.textPrimary} flex items-center gap-2`}>
              <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
              <span>Faceted Search Parameters</span>
            </h3>
          </div>
          <FilterSystem />
        </div>

        {/* Right Column: Search Result Cards & Pagination (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
            <span className="text-slate-400">
              Showing <strong>24 results</strong> (matched in 8.4ms)
            </span>
            <div className="flex items-center gap-2 font-mono text-slate-400">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>Sort: Cosine Relevance</span>
            </div>
          </div>

          <SearchResultCards />

          {/* Pagination Controls */}
          <div className="pt-4 border-t border-slate-800">
            <PaginationControls />
          </div>
        </div>
      </main>
    </div>
  );
};
