/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StyleRecipe, ArtifactItem } from '../types';
import {
  Code2,
  Eye,
  FileText,
  Copy,
  Check,
  Download,
  Maximize2,
  History,
  Sparkles,
  Layers,
} from 'lucide-react';
import { CodeBlock } from './CodeBlock';

interface ArtifactViewerProps {
  recipe: StyleRecipe;
  artifact?: ArtifactItem;
}

export function ArtifactViewer({
  recipe,
  artifact = {
    id: 'art-772',
    title: 'KineticDashboardCard',
    language: 'typescript',
    version: 3,
    type: 'react',
    code: `import React from 'react';
import { Activity, Zap } from 'lucide-react';

export function KineticDashboardCard() {
  return (
    <div className="p-4 rounded-xl border border-sky-500/30 bg-slate-950/80 text-white space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-sky-400" />
          <span className="font-mono text-xs font-bold">TELEMETRY_CORE</span>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded bg-sky-950 text-sky-300 font-mono">LIVE</span>
      </div>
      <div className="text-2xl font-bold font-mono">99.98%</div>
      <p className="text-xs text-slate-400">Zero dropped packet telemetry</p>
    </div>
  );
}`,
  },
}: ArtifactViewerProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'diff'>('preview');
  const [version, setVersion] = useState(artifact.version);
  const [copied, setCopied] = useState(false);

  const copyCode = () => {
    navigator.clipboard.writeText(artifact.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`rounded-2xl border overflow-hidden ${recipe.borderClass} ${recipe.cardClass} flex flex-col h-[480px]`}>
      {/* Artifact Top Bar */}
      <div className="px-4 py-3 bg-black/60 border-b border-white/10 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/30">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">{artifact.title}</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/10 text-zinc-300">
                v{version}.0
              </span>
            </div>
            <span className="text-[10px] text-zinc-400 font-mono">Interactive Component Artifact</span>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-black/40 border border-white/10">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-1 rounded-lg flex items-center gap-1.5 text-xs transition-colors cursor-pointer ${
              activeTab === 'preview'
                ? 'bg-sky-500 text-white font-bold shadow-xs'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`px-3 py-1 rounded-lg flex items-center gap-1.5 text-xs transition-colors cursor-pointer ${
              activeTab === 'code'
                ? 'bg-sky-500 text-white font-bold shadow-xs'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Code</span>
          </button>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-1">
          <button
            onClick={copyCode}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Copy Artifact Code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Artifact Content Area */}
      <div className="flex-1 p-4 overflow-y-auto bg-black/30">
        {activeTab === 'preview' ? (
          <div className="h-full flex items-center justify-center p-6 border border-dashed border-white/10 rounded-xl bg-black/50">
            {/* Live Interactive Mock Render of Artifact */}
            <div className="w-full max-w-sm p-5 rounded-2xl border border-sky-500/40 bg-slate-900/90 text-white space-y-3 shadow-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-xs font-bold text-sky-300">TELEMETRY_LIVE</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-sky-950 text-sky-200 border border-sky-800 font-mono">
                  v3.0 SYNTHESIZED
                </span>
              </div>
              <div className="text-3xl font-mono font-bold text-white tracking-tight">99.98%</div>
              <p className="text-xs text-slate-300">
                Active zero-dropped buffer connection with verified system telemetry.
              </p>
            </div>
          </div>
        ) : (
          <CodeBlock
            recipe={recipe}
            code={artifact.code}
            language={artifact.language}
            filename={`${artifact.title}.tsx`}
          />
        )}
      </div>

      {/* Artifact Version Breadcrumbs */}
      <div className="px-4 py-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-400 bg-black/40">
        <div className="flex items-center gap-2">
          <History className="w-3.5 h-3.5 text-zinc-500" />
          <span>Versions:</span>
          {[1, 2, 3].map((v) => (
            <button
              key={v}
              onClick={() => setVersion(v)}
              className={`px-1.5 py-0.2 rounded cursor-pointer ${
                version === v ? 'bg-sky-500 text-white font-bold' : 'hover:bg-white/10 text-zinc-400'
              }`}
            >
              v{v}
            </button>
          ))}
        </div>
        <span className="text-emerald-400">TypeScript Compilation: OK (0 errors)</span>
      </div>
    </div>
  );
}
