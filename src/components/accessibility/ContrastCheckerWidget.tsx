/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { calculateContrastRatio } from '../../design-system/accessibility/a11yAuditor';
import { ContrastResult } from '../../design-system/accessibility/types';
import { Eye, Check, X, Sparkles, RefreshCw, Layers } from 'lucide-react';

export function ContrastCheckerWidget() {
  const [fgColor, setFgColor] = useState<string>('#00e5ff');
  const [bgColor, setBgColor] = useState<string>('#090d16');
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');

  const result: ContrastResult = calculateContrastRatio(fgColor, bgColor);

  const curatedPalettes: Array<{ name: string; fg: string; bg: string }> = [
    { name: 'Cyan Neon on Void (AAA)', fg: '#00e5ff', bg: '#090d16' },
    { name: 'Pure White on Obsidian (AAA)', fg: '#ffffff', bg: '#0a0a0b' },
    { name: 'Amber Gold on Slate (AA)', fg: '#f59e0b', bg: '#1e293b' },
    { name: 'Emerald on Deep Matrix (AAA)', fg: '#10b981', bg: '#02140e' },
    { name: 'Muted Zinc on Obsidian (Fails)', fg: '#71717a', bg: '#09090b' },
    { name: 'Ultra Platinum on Charcoal (AAA)', fg: '#f4f4f6', bg: '#18181b' },
  ];

  // Auto-optimize foreground to achieve AAA (7:1)
  const autoOptimizeContrast = () => {
    // If dark bg, boost brightness toward white; if light bg, push toward black
    const bgNum = parseInt(bgColor.replace('#', ''), 16);
    const r = (bgNum >> 16) & 255;
    const g = (bgNum >> 8) & 255;
    const b = bgNum & 255;
    const isDark = (r * 0.299 + g * 0.587 + b * 0.114) < 128;

    if (isDark) {
      setFgColor('#ffffff');
    } else {
      setFgColor('#0a0a0b');
    }
  };

  return (
    <div className="p-6 rounded-3xl bg-zinc-950/80 border border-zinc-800 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
            <Eye className="w-4 h-4 text-cyan-400" /> WCAG 2.2 Relative Luminance & Contrast Analyzer
          </h3>
          <p className="text-xs text-zinc-400">
            Calculates exact mathematical contrast ratios according to ISO-9241-392 and WCAG 2.2 algorithms.
          </p>
        </div>

        <button
          onClick={autoOptimizeContrast}
          className="px-3.5 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold flex items-center gap-1.5 transition-all self-start md:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5" /> Auto-Harmonize to AAA (7.0+)
        </button>
      </div>

      {/* Color Inputs & Quick Select */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-black/40 border border-zinc-800 space-y-2">
          <label className="text-xs font-mono font-bold text-zinc-300 block">Foreground (Text / Icon)</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={fgColor}
              onChange={(e) => setFgColor(e.target.value)}
              className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border-0"
            />
            <input
              type="text"
              value={fgColor}
              onChange={(e) => setFgColor(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs font-mono text-white"
            />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-black/40 border border-zinc-800 space-y-2">
          <label className="text-xs font-mono font-bold text-zinc-300 block">Background (Surface)</label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-10 h-10 rounded-xl cursor-pointer bg-transparent border-0"
            />
            <input
              type="text"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-xs font-mono text-white"
            />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-black/40 border border-zinc-800 space-y-2">
          <label className="text-xs font-mono font-bold text-zinc-300 block">Tested Typography Scale</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setFontSize('normal')}
              className={`py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
                fontSize === 'normal'
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800'
              }`}
            >
              Body (16px)
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
                fontSize === 'large'
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800'
              }`}
            >
              Large (18pt+)
            </button>
          </div>
        </div>
      </div>

      {/* Preset Swatches */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mr-2">Preset Pairs:</span>
        {curatedPalettes.map((p) => (
          <button
            key={p.name}
            onClick={() => {
              setFgColor(p.fg);
              setBgColor(p.bg);
            }}
            className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-zinc-300 flex items-center gap-1.5 transition-all"
          >
            <span className="w-2.5 h-2.5 rounded-full border border-white/20" style={{ backgroundColor: p.fg }} />
            <span>{p.name}</span>
          </button>
        ))}
      </div>

      {/* Results Matrix & Live Sample Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Visual Live Sample */}
        <div
          className="lg:col-span-6 p-6 rounded-2xl border flex flex-col justify-between transition-colors shadow-inner"
          style={{ backgroundColor: bgColor, borderColor: `${fgColor}40` }}
        >
          <div className="space-y-3">
            <div className="text-xs font-mono font-bold uppercase tracking-wider opacity-80" style={{ color: fgColor }}>
              Live Sample Render
            </div>
            <h4
              className={`font-bold tracking-tight ${fontSize === 'large' ? 'text-2xl' : 'text-lg'}`}
              style={{ color: fgColor }}
            >
              The quick brown fox jumps over the lazy dog.
            </h4>
            <p className="text-xs leading-relaxed opacity-90" style={{ color: fgColor }}>
              This typography preview tests baseline readability, tracking, and edge acuity against background luminance.
            </p>
          </div>

          <div className="pt-4 flex items-center gap-3">
            <button
              className="px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all border"
              style={{
                backgroundColor: `${fgColor}20`,
                color: fgColor,
                borderColor: fgColor,
              }}
            >
              Interactive Button
            </button>
            <span className="text-[11px] font-mono" style={{ color: fgColor }}>
              Ratio: {result.ratio}:1
            </span>
          </div>
        </div>

        {/* WCAG Compliance Badge Table */}
        <div className="lg:col-span-6 p-5 rounded-2xl bg-black/50 border border-zinc-800 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <span className="text-xs font-mono uppercase text-zinc-400">Calculated Contrast Ratio</span>
            <span
              className={`text-2xl font-mono font-black ${
                result.ratio >= 7.0
                  ? 'text-emerald-400'
                  : result.ratio >= 4.5
                    ? 'text-cyan-400'
                    : result.ratio >= 3.0
                      ? 'text-amber-400'
                      : 'text-red-400'
              }`}
            >
              {result.ratio} : 1
            </span>
          </div>

          <div className="space-y-2">
            {[
              { label: 'Normal Text (Level AA ≥ 4.5:1)', passed: result.normalTextAA },
              { label: 'Normal Text (Level AAA ≥ 7.0:1)', passed: result.normalTextAAA },
              { label: 'Large Text (Level AA ≥ 3.0:1)', passed: result.largeTextAA },
              { label: 'Large Text (Level AAA ≥ 4.5:1)', passed: result.largeTextAAA },
              { label: 'UI Components & State Borders (≥ 3.0:1)', passed: result.uiComponentAA },
            ].map((check) => (
              <div
                key={check.label}
                className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-xs font-mono"
              >
                <span className="text-zinc-300">{check.label}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                    check.passed
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-red-500/20 text-red-400 border border-red-500/40'
                  }`}
                >
                  {check.passed ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                  {check.passed ? 'PASSED' : 'FAILED'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
