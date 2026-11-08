/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useTheme } from '../../design-system/tokens/ThemeContext';
import { useSound } from '../../design-system/sound/SoundContext';
import { useHaptics } from '../../design-system/haptics/HapticContext';
import { useExperienceEvents } from '../../design-system/events/ExperienceEventContext';
import { CatalogEntry } from '../../design-system/catalog/catalogTypes';
import { CodeViewer } from '../CodeViewer';
import { AiHandoffGenerator } from '../AiHandoffGenerator';
import {
  Compass,
  Home,
  Search,
  Bell,
  User,
  Settings,
  Shield,
  Sparkles,
  Layers,
  Terminal,
  Eye,
  FileCode,
  Cpu,
  CheckCircle2,
  Volume2,
  Vibrate,
  Smartphone,
  Monitor,
  ArrowRight,
} from 'lucide-react';

interface NavigationVariantPreviewProps {
  entry: CatalogEntry;
  onClose?: () => void;
}

export function NavigationVariantPreview({ entry, onClose }: NavigationVariantPreviewProps) {
  const { theme } = useTheme();
  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();
  const { emit } = useExperienceEvents();

  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'handoff'>('preview');
  const [selectedRoute, setSelectedRoute] = useState('home');
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [testState, setTestState] = useState<'active' | 'focus' | 'pressed' | 'disabled' | 'expanded'>('active');

  // Interactive state helpers
  const [commandQuery, setCommandQuery] = useState('');
  const [isMenuExpanded, setIsMenuExpanded] = useState(false);
  const [gestureDeltaX, setGestureDeltaX] = useState(0);

  const navRoutes = [
    { id: 'home', label: 'Home', icon: Home, badge: '3' },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'alerts', label: 'Alerts', icon: Bell, badge: '9+' },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const filteredCommandRoutes = navRoutes.filter((r) =>
    r.label.toLowerCase().includes(commandQuery.toLowerCase()) || r.id.toLowerCase().includes(commandQuery.toLowerCase())
  );

  const handleRouteChange = (id: string) => {
    if (testState === 'disabled') return;
    setSelectedRoute(id);
    emit('navigation.changed', entry.id, { routeId: id, soundStyle: entry.soundStyle, hapticStyle: entry.hapticStyle });
  };

  return (
    <div className={`p-6 md:p-12 rounded-3xl ${theme.surface.primary} border ${theme.border.default} space-y-8 shadow-2xl max-w-5xl mx-auto`}>
      {/* Header & View Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase">
              {entry.family} Family • {entry.visualStyle}
            </span>
            <span className="text-xs font-mono opacity-60">v{entry.version}</span>
          </div>
          <h2 className="text-2xl font-bold text-white">{entry.name}</h2>
          <p className="text-xs opacity-70 max-w-2xl">{entry.description}</p>
        </div>

        <div className="flex items-center gap-2 bg-black/30 p-1.5 rounded-2xl border border-white/10 shrink-0">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-2 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all ${
              activeTab === 'preview' ? 'bg-cyan-500 text-zinc-950 font-bold shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Eye className="w-4 h-4" /> Live Preview
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-4 py-2 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all ${
              activeTab === 'code' ? 'bg-cyan-500 text-zinc-950 font-bold shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <FileCode className="w-4 h-4" /> Code
          </button>
          <button
            onClick={() => setActiveTab('handoff')}
            className={`px-4 py-2 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all ${
              activeTab === 'handoff' ? 'bg-purple-500 text-zinc-950 font-bold shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Cpu className="w-4 h-4" /> AI Handoff
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-zinc-300"
            >
              Close
            </button>
          )}
        </div>
      </div>

      {activeTab === 'code' ? (
        <CodeViewer entry={entry} />
      ) : activeTab === 'handoff' ? (
        <AiHandoffGenerator entry={entry} />
      ) : (
        <div className="space-y-6">
          {/* Controls Bar: State Testing & Viewport Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-black/30 p-3 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase opacity-60 px-1">Test State:</span>
              {(['active', 'focus', 'pressed', 'disabled', 'expanded'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setTestState(st)}
                  className={`px-3 py-1 rounded-xl text-xs font-mono uppercase transition-all ${
                    testState === st
                      ? 'bg-cyan-500 text-zinc-950 font-bold shadow'
                      : 'bg-white/5 border border-white/10 text-zinc-400 hover:text-white'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('desktop')}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1 ${
                  viewMode === 'desktop' ? 'bg-white/15 text-white font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" /> Desktop
              </button>
              <button
                onClick={() => setViewMode('mobile')}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1 ${
                  viewMode === 'mobile' ? 'bg-white/15 text-white font-bold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" /> Mobile
              </button>
            </div>
          </div>

          {/* Interactive Sandbox Simulator Stage */}
          <div className={`p-8 md:p-12 rounded-3xl relative overflow-hidden transition-all duration-500 shadow-2xl border flex flex-col justify-between items-center ${
            viewMode === 'mobile' ? 'max-w-sm mx-auto h-[550px]' : 'w-full h-[480px]'
          } ${
            entry.id.includes('holographic') || entry.id.includes('hud') ? 'bg-zinc-950 border-cyan-500/40 text-cyan-400 shadow-cyan-500/20' :
            entry.id.includes('editorial') ? 'bg-stone-900 border-amber-200/30 text-amber-100 font-serif' :
            entry.id.includes('glass') || entry.id.includes('dock') ? 'bg-gradient-to-tr from-cyan-950 via-slate-900 to-indigo-950 border-cyan-500/30' :
            'bg-gradient-to-br from-zinc-900 via-zinc-950 to-indigo-950 border-white/10 text-white'
          }`}>
            
            {/* Active Route Screen Display */}
            <div className="text-center space-y-3 my-auto z-10 max-w-md">
              <span className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest border ${
                testState === 'disabled' ? 'bg-rose-500/20 border-rose-500/40 text-rose-300' : 'bg-white/10 border-white/20 text-cyan-300'
              }`}>
                Active Route: {selectedRoute} {testState === 'disabled' ? '(Disabled State Active)' : ''}
              </span>
              <h3 className="text-2xl font-bold tracking-tight">Currently inspecting "{selectedRoute}" view</h3>
              <p className="text-xs opacity-70">
                Interact with the {entry.name} navigation paradigm. Discoverability, state feedback, and touch bounds verified.
              </p>
            </div>

            {/* Bespoke Visual Navigation Paradigms */}

            {/* 1. Command Palette Navigation */}
            {entry.id.includes('command') && (
              <div className="w-full max-w-md bg-zinc-950/90 border border-cyan-500/40 rounded-2xl p-4 shadow-2xl space-y-3 z-20">
                <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                  <Search className="w-4 h-4 text-cyan-400" />
                  <input
                    type="text"
                    placeholder="Type command or route (e.g. Home, Alerts)..."
                    value={commandQuery}
                    onChange={(e) => setCommandQuery(e.target.value)}
                    className="w-full bg-transparent text-xs text-white focus:outline-none font-mono"
                  />
                  <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-mono text-zinc-400">Cmd+K</span>
                </div>
                <div className="space-y-1 max-h-40 overflow-y-auto">
                  {filteredCommandRoutes.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => handleRouteChange(r.id)}
                      className={`w-full px-3 py-2 rounded-xl text-xs font-mono flex items-center justify-between transition-all ${
                        selectedRoute === r.id ? 'bg-cyan-500 text-zinc-950 font-bold' : 'hover:bg-white/10 text-zinc-300'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <r.icon className="w-3.5 h-3.5" /> {r.label}
                      </span>
                      <span className="text-[10px] opacity-60 uppercase">{r.id}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Radial Menu Navigation */}
            {entry.id.includes('radial') && (
              <div className="relative w-48 h-48 flex items-center justify-center my-auto z-20">
                <button
                  onClick={() => setIsMenuExpanded(!isMenuExpanded)}
                  className="w-16 h-16 rounded-full bg-cyan-500 text-zinc-950 font-bold flex items-center justify-center shadow-2xl z-30 hover:scale-110 transition-transform"
                >
                  <Compass className="w-8 h-8 animate-spin-slow" />
                </button>
                {navRoutes.map((r, idx) => {
                  const angle = (idx * (360 / navRoutes.length) - 90) * (Math.PI / 180);
                  const radius = isMenuExpanded ? 80 : 0;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  const Icon = r.icon;
                  return (
                    <button
                      key={r.id}
                      onClick={() => handleRouteChange(r.id)}
                      style={{ transform: `translate(${x}px, ${y}px)` }}
                      className={`absolute w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 shadow-xl ${
                        selectedRoute === r.id ? 'bg-cyan-400 text-zinc-950 scale-125 ring-2 ring-cyan-300' : 'bg-zinc-800 text-white hover:bg-zinc-700'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </button>
                  );
                })}
              </div>
            )}

            {/* 3. Gesture Navigation Simulator */}
            {entry.id.includes('gesture') && (
              <div className="w-full max-w-sm bg-black/40 border border-white/20 rounded-2xl p-4 text-center space-y-3 z-20">
                <span className="text-[10px] font-mono text-cyan-400 uppercase">Swipe Left or Right to Switch Routes</span>
                <div
                  onMouseDown={(e) => setGestureDeltaX(e.clientX)}
                  onMouseUp={(e) => {
                    const diff = e.clientX - gestureDeltaX;
                    if (diff > 50) handleRouteChange('home');
                    if (diff < -50) handleRouteChange('explore');
                  }}
                  className="p-6 rounded-xl bg-white/5 border border-dashed border-white/20 cursor-grab active:cursor-grabbing text-xs font-mono opacity-80"
                >
                  ← Drag Cursor / Swipe Touch Screen →
                </div>
              </div>
            )}

            {/* 4. Default / Standard Bottom Bar / Floating Dock / Rail */}
            {!entry.id.includes('command') && !entry.id.includes('radial') && !entry.id.includes('gesture') && (
              <div className="w-full flex justify-center pb-4 z-20">
                <div className={`flex items-center gap-2 p-2 rounded-2xl backdrop-blur-2xl border shadow-2xl transition-all ${
                  entry.id.includes('glass') || entry.id.includes('dock') ? 'bg-black/40 border-cyan-500/30 shadow-cyan-500/10' :
                  entry.id.includes('editorial') ? 'bg-stone-950 border-amber-500/30' :
                  'bg-black/60 border-white/15'
                }`}>
                  {navRoutes.map((route) => {
                    const Icon = route.icon;
                    const isActive = selectedRoute === route.id;
                    const isDisabled = testState === 'disabled';
                    return (
                      <button
                        key={route.id}
                        disabled={isDisabled}
                        onClick={() => handleRouteChange(route.id)}
                        className={`relative px-4 py-2.5 rounded-xl text-xs font-mono flex items-center gap-2 transition-all group ${
                          isDisabled ? 'opacity-40 cursor-not-allowed' :
                          isActive
                            ? testState === 'pressed'
                              ? 'bg-cyan-600 text-zinc-950 scale-95 font-bold shadow'
                              : 'bg-cyan-500 text-zinc-950 font-bold shadow-lg shadow-cyan-500/30 scale-105'
                            : testState === 'focus'
                            ? 'ring-2 ring-cyan-400 bg-white/10 text-white'
                            : 'text-zinc-300 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="hidden sm:inline">{route.label}</span>
                        {route.badge && (
                          <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold ${
                            isActive ? 'bg-zinc-950 text-cyan-300' : 'bg-cyan-500 text-zinc-950'
                          }`}>
                            {route.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
