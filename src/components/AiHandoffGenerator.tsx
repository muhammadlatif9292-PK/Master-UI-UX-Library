/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useTheme } from '../design-system/tokens/ThemeContext';
import { CatalogEntry } from '../design-system/catalog/catalogTypes';
import {
  generateImplementationGradeHandoff,
  TargetFramework,
  AppContext,
  Language,
  CssStrategy,
  OutputMode,
} from './handoffGenerator';
import {
  Cpu,
  Copy,
  Check,
  FileText,
  Sparkles,
  Terminal,
  Download,
  Layers,
  Shield,
  Zap,
  Sliders,
  Code2,
  Boxes,
  Palette,
  FileCode,
} from 'lucide-react';

interface AiHandoffGeneratorProps {
  entry: CatalogEntry;
}

export function AiHandoffGenerator({ entry }: AiHandoffGeneratorProps) {
  const { theme } = useTheme();

  // Generator Options State
  const [targetFramework, setTargetFramework] = useState<TargetFramework>('react');
  const [appContext, setAppContext] = useState<AppContext>('standalone');
  const [language, setLanguage] = useState<Language>('typescript');
  const [cssStrategy, setCssStrategy] = useState<CssStrategy>('tailwind-v4');
  const [outputMode, setOutputMode] = useState<OutputMode>('both');

  const [copied, setCopied] = useState<boolean>(false);

  const fullHandoffText = generateImplementationGradeHandoff(entry, {
    targetFramework,
    appContext,
    language,
    cssStrategy,
    outputMode,
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(fullHandoffText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([fullHandoffText], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${entry.id}-ai-handoff-spec.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`p-6 md:p-8 rounded-3xl ${theme.surface.primary} border ${theme.border.default} space-y-8 shadow-2xl font-sans`}>
      {/* Header & Main Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/40">
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              Implementation-Grade AI Handoff Studio <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30 font-bold uppercase">PROMPT 10 COMPLIANT</span>
            </h3>
            <p className="text-xs opacity-70">Generate precise 19-section AI specifications for Claude, Gemini, ChatGPT &amp; Antigravity agents.</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 font-mono">
          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-zinc-950 font-bold text-xs transition-all flex items-center gap-2 shadow-lg shadow-purple-500/20"
          >
            {copied ? <Check className="w-4 h-4 stroke-[3]" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Handoff Copied!' : 'Copy AI Prompt Spec'}</span>
          </button>

          <button
            onClick={handleDownloadMarkdown}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20"
          >
            <Download className="w-4 h-4" />
            <span>Download Spec (.md)</span>
          </button>
        </div>
      </div>

      {/* Target Options Control Panel */}
      <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-4 font-mono text-xs">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <span className="font-bold text-cyan-400 flex items-center gap-2 uppercase tracking-wider text-[11px]">
            <Sliders className="w-4 h-4" /> Target Framework &amp; Integration Parameters
          </span>
          <span className="text-[10px] text-zinc-500">Tailored AI Output Engine</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Target Framework */}
          <div className="space-y-1">
            <label className="text-[10px] text-zinc-400 font-bold uppercase block flex items-center gap-1">
              <Code2 className="w-3 h-3 text-cyan-400" /> Framework
            </label>
            <select
              value={targetFramework}
              onChange={(e) => setTargetFramework(e.target.value as TargetFramework)}
              className="w-full px-2.5 py-1.5 rounded-xl bg-black/60 border border-zinc-700 text-white text-xs focus:outline-none focus:border-purple-500 font-mono"
            >
              <option value="react">React 18+</option>
              <option value="nextjs">Next.js 14+</option>
              <option value="vue">Vue 3 SFC</option>
              <option value="svelte">Svelte 5</option>
              <option value="html">Vanilla HTML/JS</option>
            </select>
          </div>

          {/* App Context */}
          <div className="space-y-1">
            <label className="text-[10px] text-zinc-400 font-bold uppercase block flex items-center gap-1">
              <Boxes className="w-3 h-3 text-purple-400" /> App Context
            </label>
            <select
              value={appContext}
              onChange={(e) => setAppContext(e.target.value as AppContext)}
              className="w-full px-2.5 py-1.5 rounded-xl bg-black/60 border border-zinc-700 text-white text-xs focus:outline-none focus:border-purple-500 font-mono"
            >
              <option value="standalone">New Standalone</option>
              <option value="tailwind-app">Existing Tailwind</option>
              <option value="mui-app">Existing Material UI</option>
              <option value="custom-ds">Custom System</option>
            </select>
          </div>

          {/* Language */}
          <div className="space-y-1">
            <label className="text-[10px] text-zinc-400 font-bold uppercase block flex items-center gap-1">
              <FileCode className="w-3 h-3 text-emerald-400" /> Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="w-full px-2.5 py-1.5 rounded-xl bg-black/60 border border-zinc-700 text-white text-xs focus:outline-none focus:border-purple-500 font-mono"
            >
              <option value="typescript">TypeScript</option>
              <option value="javascript">JavaScript</option>
            </select>
          </div>

          {/* CSS Strategy */}
          <div className="space-y-1">
            <label className="text-[10px] text-zinc-400 font-bold uppercase block flex items-center gap-1">
              <Palette className="w-3 h-3 text-amber-400" /> CSS Strategy
            </label>
            <select
              value={cssStrategy}
              onChange={(e) => setCssStrategy(e.target.value as CssStrategy)}
              className="w-full px-2.5 py-1.5 rounded-xl bg-black/60 border border-zinc-700 text-white text-xs focus:outline-none focus:border-purple-500 font-mono"
            >
              <option value="tailwind-v4">Tailwind v4 (@import)</option>
              <option value="tailwind-v3">Tailwind v3 (config)</option>
              <option value="css-modules">CSS Modules</option>
              <option value="styled-components">Styled Components</option>
            </select>
          </div>

          {/* Output Mode */}
          <div className="space-y-1">
            <label className="text-[10px] text-zinc-400 font-bold uppercase block flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-rose-400" /> Output Content
            </label>
            <select
              value={outputMode}
              onChange={(e) => setOutputMode(e.target.value as OutputMode)}
              className="w-full px-2.5 py-1.5 rounded-xl bg-black/60 border border-zinc-700 text-white text-xs focus:outline-none focus:border-purple-500 font-mono"
            >
              <option value="both">Prompt Spec &amp; Code</option>
              <option value="prompt">Prompt Spec Only</option>
              <option value="code">Source Code Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Structured 19-Section Specification Output */}
      <div className="space-y-3 font-mono text-xs">
        <div className="flex items-center justify-between text-purple-400">
          <span className="flex items-center gap-2 font-bold uppercase tracking-wider text-[11px]">
            <Sparkles className="w-4 h-4" /> Implementation-Grade Specification Output (19 Structured Sections)
          </span>
          <span className="text-[10px] text-zinc-500">Ready to copy &amp; paste into LLM prompt window</span>
        </div>

        <pre className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 text-zinc-200 font-mono text-xs overflow-x-auto max-h-[500px] leading-relaxed whitespace-pre-wrap shadow-2xl">
          <code>{fullHandoffText}</code>
        </pre>
      </div>
    </div>
  );
}
