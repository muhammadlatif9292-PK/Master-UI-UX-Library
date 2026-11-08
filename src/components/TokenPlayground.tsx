/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useTheme } from '../design-system/tokens/ThemeContext';
import { ThemeId } from '../design-system/tokens/themeTokens';
import { SPACING, RADII, SHADOWS, BLURS, ELEVATION, Z_INDEX, MOTION_DURATIONS, MOTION_EASINGS, RESPONSIVE_BREAKPOINTS } from '../design-system/tokens/coreTokens';
import { Palette, Type, Box, Layers, Zap, Sliders, Eye, Check, Shield } from 'lucide-react';

export function TokenPlayground() {
  const { activeThemeId, theme, setThemeId, allThemes } = useTheme();
  const [activeTab, setActiveTab] = useState<'overview' | 'colors' | 'typography' | 'elevation' | 'motion' | 'preview'>('overview');

  const themeKeys = Object.keys(allThemes) as ThemeId[];

  return (
    <div className={`min-h-screen ${theme.bg.canvas} ${theme.text.primary} transition-colors duration-500 flex flex-col font-sans`}>
      {/* Top Header & Theme Switcher Bar */}
      <header className={`border-b ${theme.border.default} ${theme.surface.primary} sticky top-0 z-50 px-6 py-4 flex flex-wrap items-center justify-between gap-4 backdrop-blur-xl`}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-white/10 border border-white/20 text-current shadow-lg">
            <Palette className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight flex items-center gap-2">
              Design Token Foundation & Playground
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/10 border border-white/20 font-mono">
                {theme.name} Theme Active
              </span>
            </h1>
            <p className="text-xs opacity-70">Centralized tokens, semantic variables, and live 12-theme switching.</p>
          </div>
        </div>

        {/* Theme Selector Dropdown / Pills */}
        <div className="flex items-center gap-2 overflow-x-auto py-1 max-w-full">
          <span className="text-xs opacity-70 font-mono shrink-0 mr-1">Themes:</span>
          {themeKeys.map((id) => {
            const t = allThemes[id];
            const isActive = activeThemeId === id;
            return (
              <button
                key={id}
                onClick={() => setThemeId(id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-white text-zinc-950 font-bold shadow-md scale-105'
                    : 'bg-white/5 hover:bg-white/10 opacity-80 hover:opacity-100'
                }`}
              >
                {isActive && <Check className="w-3 h-3 text-zinc-950" />}
                {t.name}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Navigation Tabs */}
      <div className={`border-b ${theme.border.default} px-6 py-2 flex items-center gap-2 overflow-x-auto bg-black/20`}>
        {[
          { id: 'overview', label: 'Token Architecture', icon: Box },
          { id: 'colors', label: 'Semantic & Color Tokens', icon: Palette },
          { id: 'typography', label: 'Typography Scale', icon: Type },
          { id: 'elevation', label: 'Elevation & Blur', icon: Layers },
          { id: 'motion', label: 'Motion & Timing', icon: Zap },
          { id: 'preview', label: 'Live Theme Component Test', icon: Eye },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 shrink-0 ${
                isActive
                  ? 'bg-white/10 border border-white/20 shadow-md'
                  : 'opacity-70 hover:opacity-100 hover:bg-white/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8 space-y-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className={`p-8 rounded-2xl ${theme.surface.primary} ${theme.border.default} border shadow-xl space-y-4`}>
              <h2 className="text-xl font-bold">Centralized Token Architecture</h2>
              <p className="text-sm opacity-80 leading-relaxed">
                Zero magic numbers are scattered across components. All visual properties—colors, typography, spacing, radii, borders, shadows, blur, opacity, elevation, z-index, motion durations, easings, and breakpoints—are governed by centralized tokens and semantic variables.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <div className={`p-4 rounded-xl ${theme.surface.secondary} border ${theme.border.subtle}`}>
                  <span className="text-xs font-mono opacity-65 block mb-1">Semantic Layer</span>
                  <h3 className="font-semibold text-sm mb-2">Semantic Tokens</h3>
                  <p className="text-xs opacity-75">`surface.primary`, `text.muted`, `state.success`, `focus.ring` automatically adapt across all 12 themes.</p>
                </div>
                <div className={`p-4 rounded-xl ${theme.surface.secondary} border ${theme.border.subtle}`}>
                  <span className="text-xs font-mono opacity-65 block mb-1">Theme Overrides</span>
                  <h3 className="font-semibold text-sm mb-2">12 Distinct Themes</h3>
                  <p className="text-xs opacity-75">Obsidian, Aurora, Observatory, Laboratory, Quantum, Neon Noir, Crystal, Deep Space, Command, Tactile, Companion, Minimal Cinema.</p>
                </div>
                <div className={`p-4 rounded-xl ${theme.surface.secondary} border ${theme.border.subtle}`}>
                  <span className="text-xs font-mono opacity-65 block mb-1">Scale Consistency</span>
                  <h3 className="font-semibold text-sm mb-2">Core Tokens</h3>
                  <p className="text-xs opacity-75">Standardized spacing, radii, shadows, z-index, and motion easings shared globally.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'colors' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold">Semantic Color & Surface Tokens</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className={`p-4 rounded-xl ${theme.surface.primary} border ${theme.border.default} space-y-2`}>
                <span className="text-xs font-mono opacity-70">surface.primary</span>
                <div className={`h-16 rounded-lg ${theme.surface.primary} border ${theme.border.subtle} flex items-center justify-center text-xs font-mono`}>
                  Primary Surface
                </div>
              </div>

              <div className={`p-4 rounded-xl ${theme.surface.primary} border ${theme.border.default} space-y-2`}>
                <span className="text-xs font-mono opacity-70">surface.secondary</span>
                <div className={`h-16 rounded-lg ${theme.surface.secondary} border ${theme.border.subtle} flex items-center justify-center text-xs font-mono`}>
                  Secondary Surface
                </div>
              </div>

              <div className={`p-4 rounded-xl ${theme.surface.primary} border ${theme.border.default} space-y-2`}>
                <span className="text-xs font-mono opacity-70">accent.primary</span>
                <div className={`h-16 rounded-lg bg-white/5 border ${theme.border.subtle} flex items-center justify-center font-bold ${theme.accent.primary}`}>
                  Accent Highlight
                </div>
              </div>

              <div className={`p-4 rounded-xl ${theme.surface.primary} border ${theme.border.default} space-y-2`}>
                <span className="text-xs font-mono opacity-70">focus.ring</span>
                <div className={`h-16 rounded-lg bg-white/5 border ${theme.border.subtle} ${theme.focus.ring} flex items-center justify-center text-xs font-mono`}>
                  Focus Ring State
                </div>
              </div>
            </div>

            <h3 className="text-md font-semibold pt-4">Semantic State Colors</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className={`p-4 rounded-xl ${theme.surface.primary} border ${theme.border.default} flex items-center justify-between`}>
                <span className="text-xs font-mono">state.success</span>
                <span className={`font-bold ${theme.state.success}`}>● Success</span>
              </div>
              <div className={`p-4 rounded-xl ${theme.surface.primary} border ${theme.border.default} flex items-center justify-between`}>
                <span className="text-xs font-mono">state.warning</span>
                <span className={`font-bold ${theme.state.warning}`}>● Warning</span>
              </div>
              <div className={`p-4 rounded-xl ${theme.surface.primary} border ${theme.border.default} flex items-center justify-between`}>
                <span className="text-xs font-mono">state.error</span>
                <span className={`font-bold ${theme.state.error}`}>● Error</span>
              </div>
              <div className={`p-4 rounded-xl ${theme.surface.primary} border ${theme.border.default} flex items-center justify-between`}>
                <span className="text-xs font-mono">state.info</span>
                <span className={`font-bold ${theme.state.info}`}>● Info</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'typography' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold">Typography Token System</h2>
            <div className={`p-6 rounded-2xl ${theme.surface.primary} border ${theme.border.default} space-y-6`}>
              <div>
                <span className="text-xs font-mono opacity-65">Title Font Family: {theme.typography.fontFamilyTitle}</span>
                <h3 className="text-3xl font-bold mt-1" style={{ fontFamily: theme.typography.fontFamilyTitle }}>
                  The Quick Brown Fox Jumps Over The Lazy Dog
                </h3>
              </div>
              <hr className={theme.border.subtle} />
              <div>
                <span className="text-xs font-mono opacity-65">Body Font Family: {theme.typography.fontFamilyBody}</span>
                <p className="text-base mt-1 leading-relaxed opacity-85" style={{ fontFamily: theme.typography.fontFamilyBody }}>
                  Design systems require harmonious typographic scaling to ensure absolute legibility across desktop viewports, mobile screens, and spatial interfaces. Every character is optically weighted.
                </p>
              </div>
              <hr className={theme.border.subtle} />
              <div>
                <span className="text-xs font-mono opacity-65">Monospace Font Family: {theme.typography.fontFamilyMono}</span>
                <p className="text-sm mt-1 font-mono p-3 rounded-lg bg-black/20" style={{ fontFamily: theme.typography.fontFamilyMono }}>
                  const tokenSystem = &quot;active&quot;; // telemetry.fps = 120.0;
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'elevation' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold">Elevation, Shadows & Blur Tokens</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={`p-6 rounded-2xl ${theme.surface.primary} border ${theme.border.default} ${theme.shadow.soft} space-y-2`}>
                <h3 className="font-semibold text-sm">shadow.soft</h3>
                <p className="text-xs opacity-75">Subtle depth for card containers and floating pills.</p>
              </div>
              <div className={`p-6 rounded-2xl ${theme.surface.primary} border ${theme.border.default} ${theme.shadow.deep} space-y-2`}>
                <h3 className="font-semibold text-sm">shadow.deep</h3>
                <p className="text-xs opacity-75">Heavy shadow for modals, drawers, and floating panels.</p>
              </div>
              <div className={`p-6 rounded-2xl ${theme.surface.primary} border ${theme.border.default} ${theme.shadow.glowPrimary} space-y-2`}>
                <h3 className="font-semibold text-sm">glow.primary</h3>
                <p className="text-xs opacity-75">Active focus or primary brand illumination glow.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'motion' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold">Motion Durations & Easings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-6 rounded-xl ${theme.surface.primary} border ${theme.border.default} space-y-4`}>
                <h3 className="font-semibold text-sm">Durations</h3>
                <div className="space-y-2 text-xs font-mono">
                  {Object.entries(MOTION_DURATIONS).map(([k, v]) => (
                    <div key={k} className="flex justify-between py-1 border-b border-white/10">
                      <span className="opacity-70">{k}:</span>
                      <span className={theme.accent.primary}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`p-6 rounded-xl ${theme.surface.primary} border ${theme.border.default} space-y-4`}>
                <h3 className="font-semibold text-sm">Easings</h3>
                <div className="space-y-2 text-xs font-mono">
                  {Object.entries(MOTION_EASINGS).map(([k, v]) => (
                    <div key={k} className="flex justify-between py-1 border-b border-white/10">
                      <span className="opacity-70">{k}:</span>
                      <span className={theme.accent.primary}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'preview' && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold">Live Component Test Under Active Theme ({theme.name})</h2>
            <p className="text-xs opacity-75">Verifying that UI components dynamically inherit theme tokens without hardcoded colors.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Login Card Preview */}
              <div className={`p-8 rounded-2xl ${theme.surface.primary} border ${theme.border.default} ${theme.shadow.deep} space-y-6`}>
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl bg-white/10 border ${theme.border.subtle} ${theme.accent.primary}`}>
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold" style={{ fontFamily: theme.typography.fontFamilyTitle }}>
                      Secure Workspace
                    </h3>
                    <p className="text-xs opacity-70" style={{ fontFamily: theme.typography.fontFamilyBody }}>
                      Inheriting {theme.name} tokens instantly
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider opacity-75">Email Address</label>
                    <input
                      type="email"
                      placeholder="architect@domain.com"
                      className={`w-full px-4 py-3 rounded-lg bg-black/20 border ${theme.border.default} ${theme.text.primary} placeholder:opacity-40 focus:outline-none ${theme.focus.ring} transition-all`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider opacity-75">Password</label>
                    <input
                      type="password"
                      placeholder="••••••••••••"
                      className={`w-full px-4 py-3 rounded-lg bg-black/20 border ${theme.border.default} ${theme.text.primary} placeholder:opacity-40 focus:outline-none ${theme.focus.ring} transition-all`}
                    />
                  </div>

                  <button
                    onClick={() => alert(`Action executed under ${theme.name} theme!`)}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-all shadow-lg bg-white text-zinc-950 hover:opacity-90 active:scale-[0.98] ${theme.shadow.glowPrimary}`}
                  >
                    Authenticate with Theme
                  </button>
                </div>
              </div>

              {/* Status Badges & Cards */}
              <div className="space-y-6">
                <div className={`p-6 rounded-2xl ${theme.surface.primary} border ${theme.border.default} space-y-4`}>
                  <h3 className="font-semibold text-sm">Theme Semantic States</h3>
                  <div className="flex flex-wrap gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 ${theme.state.success}`}>
                      Success State
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 border border-amber-500/30 ${theme.state.warning}`}>
                      Warning State
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 border border-rose-500/30 ${theme.state.error}`}>
                      Error State
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 border border-sky-500/30 ${theme.state.info}`}>
                      Info State
                    </span>
                  </div>
                </div>

                <div className={`p-6 rounded-2xl ${theme.surface.secondary} border ${theme.border.subtle} space-y-3`}>
                  <h3 className="font-semibold text-sm">Secondary Surface Box</h3>
                  <p className="text-xs opacity-75 leading-relaxed">
                    This container uses `surface.secondary` and `border.subtle`. Notice how switching themes instantly transforms the entire palette seamlessly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
