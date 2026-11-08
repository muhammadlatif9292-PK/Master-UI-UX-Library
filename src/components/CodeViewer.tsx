/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useTheme } from '../design-system/tokens/ThemeContext';
import { CatalogEntry } from '../design-system/catalog/catalogTypes';
import { generateFullComponentCode } from './codeGenerator';
import {
  Code,
  Copy,
  Check,
  FileCode,
  Layers,
  Package,
  Shield,
  AlertTriangle,
  ExternalLink,
  Terminal,
  FileText,
  Sparkles,
  Smartphone,
} from 'lucide-react';

interface CodeViewerProps {
  entry: CatalogEntry;
}

export type CodeTab = 'source' | 'usage' | 'recipe' | 'styles' | 'a11y' | 'dependencies';

export function CodeViewer({ entry }: CodeViewerProps) {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<CodeTab>('source');
  const [copied, setCopied] = useState<boolean>(false);

  const codeData = generateFullComponentCode(entry);

  const getActiveCodeContent = (): string => {
    switch (activeTab) {
      case 'source':
        return codeData.sourceCode;
      case 'usage':
        return codeData.usageCode;
      case 'recipe':
        return codeData.recipeCode;
      case 'styles':
        return codeData.stylesAndAssets;
      case 'a11y':
        return codeData.accessibilityAndResponsiveNotes;
      case 'dependencies':
        return JSON.stringify(
          {
            component: entry.component,
            family: entry.family,
            version: entry.version,
            license: entry.license,
            dependencies: codeData.dependencies,
            performanceTier: entry.performanceTier,
            accessibilityRating: entry.accessibility,
            sourceInspiration: entry.sourceInspiration,
          },
          null,
          2
        );
      default:
        return codeData.sourceCode;
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`p-6 md:p-8 rounded-3xl ${theme.surface.primary} border ${theme.border.default} space-y-6 shadow-2xl font-sans`}>
      {/* Header & Copy Action */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
            <FileCode className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              {entry.name} <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 uppercase">v{entry.version}</span>
            </h3>
            <p className="text-xs opacity-70">Implementation-Grade Production Code, Recipes, Assets &amp; Specifications</p>
          </div>
        </div>

        <button
          onClick={() => handleCopy(getActiveCodeContent())}
          className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20"
        >
          {copied ? <Check className="w-4 h-4 stroke-[3]" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Copied File!' : 'Copy Current Code'}</span>
        </button>
      </div>

      {/* Dependencies Warning */}
      {codeData.dependencies.length > 0 && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-3 font-mono">
          <AlertTriangle className="w-5 h-5 shrink-0 text-amber-400 mt-0.5" />
          <div>
            <strong className="font-bold">Required Dependencies:</strong>{' '}
            <span className="underline">{codeData.dependencies.join(', ')}</span>. Make sure these packages are installed before importing this component into your codebase.
          </div>
        </div>
      )}

      {/* File Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3 overflow-x-auto font-mono">
        {[
          { id: 'source', label: `${entry.component}.tsx`, icon: FileCode },
          { id: 'usage', label: 'AppExample.tsx', icon: Code },
          { id: 'recipe', label: 'recipe.ts', icon: Layers },
          { id: 'styles', label: 'styles-and-assets.css', icon: Sparkles },
          { id: 'a11y', label: 'a11y-and-responsive.md', icon: Smartphone },
          { id: 'dependencies', label: 'dependencies.json', icon: Package },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as CodeTab)}
              className={`px-3.5 py-2 rounded-xl text-xs flex items-center gap-2 transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-cyan-500 text-zinc-950 font-bold shadow-md'
                  : 'bg-black/40 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Code Display Area */}
      <div className="relative rounded-2xl bg-zinc-950 border border-zinc-800 overflow-hidden font-mono text-xs shadow-2xl">
        <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/90 border-b border-zinc-800 text-[10px] text-zinc-400">
          <span className="flex items-center gap-1.5 font-bold text-cyan-400">
            <Terminal className="w-3.5 h-3.5" /> File: {activeTab === 'source' ? `${entry.component}.tsx` : activeTab === 'usage' ? 'AppExample.tsx' : activeTab === 'recipe' ? 'recipe.ts' : activeTab === 'styles' ? 'styles.css' : activeTab === 'a11y' ? 'a11y-notes.md' : 'dependencies.json'}
          </span>
          <span className="text-zinc-500">License: {entry.license}</span>
        </div>

        <div className="p-4 overflow-x-auto max-h-[480px] flex">
          {/* Line Numbers */}
          <div className="pr-4 select-none text-zinc-600 text-right space-y-1 font-mono">
            {getActiveCodeContent().split('\n').map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>

          {/* Code Body */}
          <pre className="flex-1 text-zinc-200 space-y-1 font-mono leading-relaxed">
            <code>{getActiveCodeContent()}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}
