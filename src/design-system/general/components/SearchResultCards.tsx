/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useGeneral } from '../GeneralContext';
import {
  Search,
  BookOpen,
  Cpu,
  Database,
  Code2,
  ExternalLink,
  Download,
  Bookmark,
  Share2,
  Sparkles,
  CheckCircle2,
  SlidersHorizontal,
} from 'lucide-react';

export interface SearchResultItem {
  id: string;
  type: 'paper' | 'model' | 'dataset' | 'code';
  title: string;
  snippet: string;
  authors: string[];
  date: string;
  relevanceScore: number; // 0-100
  tags: string[];
  stats: { label: string; value: string }[];
}

export const SearchResultCards: React.FC = () => {
  const { recipeConfig, stateMode } = useGeneral();
  const [searchQuery, setSearchQuery] = useState('quantum attention mechanism');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['res-1']);

  const results: SearchResultItem[] = [
    {
      id: 'res-1',
      type: 'paper',
      title: 'Scalable Quantum Attention Architectures for Multimodal Reasoning',
      snippet: 'We introduce a novel parameterized quantum circuit serving as an attention operator within deep neural networks, demonstrating quadratic speedup on dense matrix tensor contractions.',
      authors: ['Elena Vance', 'T. Gallagher', 'Y. LeCun'],
      date: 'Aug 2026',
      relevanceScore: 98,
      tags: ['Quantum ML', 'Attention', 'Topological Computing'],
      stats: [
        { label: 'Citations', value: '412' },
        { label: 'Impact Factor', value: '8.4' },
      ],
    },
    {
      id: 'res-2',
      type: 'model',
      title: 'quantum-gemini-sparse-flash-128b',
      snippet: 'Quantized 128-billion parameter MoE checkpoint fine-tuned with quantum-assisted loss objective for physical simulation synthesis.',
      authors: ['Google DeepMind', 'Studio Research Lab'],
      date: 'Jul 2026',
      relevanceScore: 94,
      tags: ['MoE', 'FP8-Quantized', 'Physics-Engine'],
      stats: [
        { label: 'Downloads', value: '89.4k' },
        { label: 'Parameters', value: '128B' },
      ],
    },
    {
      id: 'res-3',
      type: 'code',
      title: 'google-deepmind / quantum-tensor-kernels',
      snippet: 'High-performance CUDA/ROCm C++ and Triton bindings for quantum Hilbert-space state manipulation in PyTorch and JAX.',
      authors: ['Core Compiler Team'],
      date: 'Updated 2d ago',
      relevanceScore: 89,
      tags: ['Triton', 'CUDA', 'JAX-Accelerated'],
      stats: [
        { label: 'Stars', value: '3,840' },
        { label: 'Forks', value: '492' },
      ],
    },
  ];

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getTypeIcon = (type: SearchResultItem['type']) => {
    switch (type) {
      case 'paper':
        return <BookOpen className="w-4 h-4 text-purple-400" />;
      case 'model':
        return <Cpu className="w-4 h-4 text-indigo-400" />;
      case 'dataset':
        return <Database className="w-4 h-4 text-emerald-400" />;
      default:
        return <Code2 className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div className={`rounded-3xl border ${recipeConfig.cardBg} ${recipeConfig.border} ${recipeConfig.fontFamily} shadow-2xl p-6 space-y-5 select-none max-w-3xl`}>
      {/* Search Input Bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2.5 rounded-2xl border text-xs ${recipeConfig.inputBg} outline-none`}
            placeholder="Search research papers, weights, codebases..."
          />
        </div>
        <button className={`px-4 py-2.5 rounded-2xl font-bold text-xs ${recipeConfig.accentBg} flex items-center gap-1.5 shadow-lg flex-shrink-0`}>
          <Sparkles className="w-3.5 h-3.5" />
          <span>Semantic Search</span>
        </button>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs font-mono text-slate-400">
        <span>Found <strong>{results.length}</strong> top verified assets</span>
        <span>Relevance Ranking: <strong>Vector Cosine (k=3)</strong></span>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        {results.map((item) => {
          const isBookmarked = bookmarkedIds.includes(item.id);

          return (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border ${recipeConfig.border} bg-black/30 space-y-3 transition-all hover:border-slate-600`}
            >
              {/* Card Top Row: Type, Title, Relevance Gauge */}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-black/50 border border-white/5">
                      {getTypeIcon(item.type)}
                    </div>
                    <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${recipeConfig.badgeBg}`}>
                      {item.type}
                    </span>
                    <span className={`text-[11px] font-mono ${recipeConfig.textSecondary}`}>
                      {item.date} • {item.authors.join(', ')}
                    </span>
                  </div>

                  <h4 className={`text-sm md:text-base font-bold ${recipeConfig.textPrimary} hover:underline cursor-pointer pt-1`}>
                    {item.title}
                  </h4>
                </div>

                {/* Relevance Score Pill */}
                <div className="flex flex-col items-end flex-shrink-0">
                  <div className="flex items-center gap-1 text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-xl border border-emerald-800">
                    <Sparkles className="w-3 h-3" />
                    <span>{item.relevanceScore}% Match</span>
                  </div>
                </div>
              </div>

              {/* Snippet Description */}
              <p className={`text-xs ${recipeConfig.textSecondary} leading-relaxed`}>
                {item.snippet}
              </p>

              {/* Bottom Meta & Actions Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-white/5">
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-md bg-black/40 border border-white/5 text-[10px] font-mono text-slate-400">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Card Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleBookmark(item.id)}
                    className={`p-2 rounded-xl border transition-all ${
                      isBookmarked
                        ? 'bg-amber-950 border-amber-800 text-amber-300'
                        : 'border-white/5 text-slate-400 hover:text-white bg-black/40'
                    }`}
                    title="Bookmark Asset"
                  >
                    <Bookmark className="w-3.5 h-3.5 fill-current" />
                  </button>

                  <button className="px-3 py-1.5 rounded-xl border border-white/10 bg-black/40 hover:bg-white/5 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-all">
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>View Record</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
