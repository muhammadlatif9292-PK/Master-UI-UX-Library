/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StyleRecipe, CitationItem } from '../types';
import { ExternalLink, Globe, BookOpen, Layers, Check, Copy } from 'lucide-react';

interface CitationsProps {
  recipe: StyleRecipe;
  citations?: CitationItem[];
  compact?: boolean;
}

export function Citations({
  recipe,
  citations = [
    {
      id: 'cit-1',
      index: 1,
      title: 'Google GenAI SDK Official API Reference & Live API Guidelines',
      url: 'https://ai.google.dev/gemini-api/docs/live-api',
      domain: 'ai.google.dev',
      snippet: 'The Live API enables low-latency bi-directional streaming for audio, video, and text sessions using WebSockets over TLS 1.3.',
      relevanceScore: 0.98,
    },
    {
      id: 'cit-2',
      index: 2,
      title: 'Tailwind CSS v4 Modern Engine Architecture & Cascade Layers',
      url: 'https://tailwindcss.com/docs/v4-beta',
      domain: 'tailwindcss.com',
      snippet: 'Tailwind v4 delivers zero-config CSS compilation with native color-mix support, container queries, and sub-millisecond build speeds.',
      relevanceScore: 0.94,
    },
    {
      id: 'cit-3',
      index: 3,
      title: 'W3C Accessible Rich Internet Applications (WAI-ARIA) 1.2 Specs',
      url: 'https://www.w3.org/TR/wai-aria-1.2',
      domain: 'w3.org',
      snippet: 'Live regions (aria-live="polite") ensure screen readers accurately announce asynchronous streaming responses without interrupting focus.',
      relevanceScore: 0.89,
    },
  ],
  compact = false,
}: CitationsProps) {
  const [activeCitation, setActiveCitation] = useState<CitationItem | null>(null);

  return (
    <div className="space-y-2">
      {/* Inline Badge Anchors */}
      <div className="flex flex-wrap items-center gap-1.5 text-xs">
        <span className="text-[11px] font-semibold text-zinc-400 flex items-center gap-1">
          <BookOpen className="w-3 h-3 text-sky-400" />
          Sources:
        </span>

        {citations.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCitation(activeCitation?.id === c.id ? null : c)}
            className={`px-2 py-0.5 rounded text-[11px] font-mono flex items-center gap-1 transition-all cursor-pointer ${
              activeCitation?.id === c.id
                ? 'bg-sky-500 text-white font-bold shadow-xs'
                : `${recipe.badgeClass} hover:bg-white/10`
            }`}
          >
            <span className="text-[10px] text-sky-400 font-bold">[{c.index}]</span>
            <span className="truncate max-w-[120px]">{c.domain}</span>
          </button>
        ))}
      </div>

      {/* Selected Citation Drawer Preview */}
      {activeCitation && (
        <div className={`p-3 rounded-xl border ${recipe.borderClass} ${recipe.cardClass} text-xs space-y-2 animate-in fade-in slide-in-from-top-1`}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded bg-sky-500/10 text-sky-400">
                <Globe className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="font-semibold text-white flex items-center gap-1.5">
                  <span>[{activeCitation.index}] {activeCitation.title}</span>
                </div>
                <span className="text-[11px] text-zinc-400 font-mono">{activeCitation.domain}</span>
              </div>
            </div>

            <a
              href={activeCitation.url}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-sky-400 transition-colors flex items-center gap-1 text-[11px]"
            >
              <span>Visit</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <p className="text-[11px] text-zinc-300 bg-black/40 p-2 rounded-lg border border-white/5 italic">
            "{activeCitation.snippet}"
          </p>

          <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono">
            <span>Relevance score: {(activeCitation.relevanceScore * 100).toFixed(0)}%</span>
            <span>Index Cache: Synced</span>
          </div>
        </div>
      )}
    </div>
  );
}
