/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useExperienceEvents } from '../design-system/events/ExperienceEventContext';
import { ExperienceEventType, ExperienceEventPayload } from '../design-system/events/eventBusTypes';
import { useTheme } from '../design-system/tokens/ThemeContext';
import { Radio, Send, Trash2, CheckCircle2, AlertTriangle, Cpu, Navigation, Activity, Shield } from 'lucide-react';

const ALL_EVENT_TYPES: ExperienceEventType[] = [
  'interaction.started',
  'interaction.confirmed',
  'interaction.cancelled',
  'navigation.changed',
  'selection.changed',
  'focus.entered',
  'focus.exited',
  'drag.started',
  'drag.completed',
  'state.success',
  'state.error',
  'state.warning',
  'state.loading',
  'ai.started',
  'ai.completed',
  'simulation.started',
  'simulation.completed',
];

export function EventBusInspector() {
  const { emit, history, clearHistory } = useExperienceEvents();
  const { theme, activeThemeId } = useTheme();
  const [selectedEventType, setSelectedEventType] = useState<ExperienceEventType>('interaction.confirmed');
  const [sourceIdInput, setSourceIdInput] = useState<string>('TestButton-01');
  const [lastExpression, setLastExpression] = useState<string>('');

  useEffect(() => {
    const handleCustomEvent = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && customEvent.detail.description) {
        setLastExpression(customEvent.detail.description);
      }
    };
    window.addEventListener('experience-event-dispatched', handleCustomEvent);
    return () => window.removeEventListener('experience-event-dispatched', handleCustomEvent);
  }, []);

  const handleEmitTestEvent = () => {
    emit(selectedEventType, sourceIdInput, { manualTest: true, themeContext: activeThemeId });
  };

  return (
    <div className={`min-h-screen ${theme.bg.canvas} ${theme.text.primary} p-6 md:p-8 space-y-8 font-sans`}>
      {/* Header */}
      <div className={`p-6 rounded-2xl ${theme.surface.primary} border ${theme.border.default} shadow-xl flex flex-wrap items-center justify-between gap-4 backdrop-blur-xl`}>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-white/10 border border-white/20 text-current shadow-lg">
            <Radio className="w-6 h-6 animate-pulse text-cyan-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">Semantic Experience Event Bus Inspector</h1>
            <p className="text-xs opacity-70">Decoupled pub/sub event contract translating semantic signals into theme-aware sensory expressions.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
            Active Theme Recipe: <strong className={theme.accent.primary}>{theme.name}</strong>
          </span>
        </div>
      </div>

      {/* Main Grid: Test Emitter & Live Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Col: Test Event Emitter */}
        <div className={`p-6 rounded-2xl ${theme.surface.primary} border ${theme.border.default} space-y-6 shadow-lg lg:col-span-1`}>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-sm flex items-center gap-2">
              <Send className="w-4 h-4 text-cyan-400" /> Test Event Emitter
            </h2>
            <span className="text-[10px] font-mono opacity-60">Interactive Dispatcher</span>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider opacity-75">Event Type</label>
              <select
                value={selectedEventType}
                onChange={(e) => setSelectedEventType(e.target.value as ExperienceEventType)}
                className={`w-full px-3 py-2.5 rounded-lg bg-black/30 border ${theme.border.default} ${theme.text.primary} text-xs font-mono focus:outline-none ${theme.focus.ring}`}
              >
                {ALL_EVENT_TYPES.map((ev) => (
                  <option key={ev} value={ev} className="bg-zinc-900 text-white">
                    {ev}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider opacity-75">Source Component ID</label>
              <input
                type="text"
                value={sourceIdInput}
                onChange={(e) => setSourceIdInput(e.target.value)}
                className={`w-full px-3 py-2.5 rounded-lg bg-black/30 border ${theme.border.default} ${theme.text.primary} text-xs font-mono focus:outline-none ${theme.focus.ring}`}
              />
            </div>

            <button
              onClick={handleEmitTestEvent}
              className={`w-full py-3 px-4 rounded-xl font-medium transition-all shadow-lg bg-white text-zinc-950 hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-2 text-xs font-mono`}
            >
              <Send className="w-3.5 h-3.5" /> Emit Semantic Event
            </button>
          </div>

          {/* Sensory Expression Preview Box */}
          {lastExpression && (
            <div className={`p-4 rounded-xl ${theme.surface.secondary} border ${theme.border.subtle} space-y-2`}>
              <span className="text-[10px] font-mono opacity-60 uppercase tracking-wider">Live Sensory Translation</span>
              <p className="text-xs font-mono text-cyan-300 leading-relaxed">{lastExpression}</p>
            </div>
          )}
        </div>

        {/* Right Col: Live Event History & Event Contract Documentation */}
        <div className="lg:col-span-2 space-y-6">
          <div className={`p-6 rounded-2xl ${theme.surface.primary} border ${theme.border.default} space-y-4 shadow-lg`}>
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-sm flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" /> Live Event Inspector ({history.length} events logged)
              </h2>
              {history.length > 0 && (
                <button
                  onClick={clearHistory}
                  className="px-3 py-1 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-1 hover:bg-rose-500/20 transition-all"
                >
                  <Trash2 className="w-3 h-3" /> Clear History
                </button>
              )}
            </div>

            <div className="max-h-[300px] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
              {history.length === 0 ? (
                <div className="text-center py-12 text-xs opacity-50 font-mono">
                  No events emitted yet. Use the Test Emitter or interact with app components.
                </div>
              ) : (
                history.map((ev, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl bg-black/20 border ${theme.border.subtle} flex items-center justify-between text-xs font-mono`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                      <div>
                        <span className="font-bold text-white">{ev.type}</span>
                        {ev.sourceId && <span className="opacity-60 ml-2">[{ev.sourceId}]</span>}
                      </div>
                    </div>
                    <span className="opacity-50 text-[10px]">
                      {new Date(ev.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Event Contract Documentation */}
          <div className={`p-6 rounded-2xl ${theme.surface.primary} border ${theme.border.default} space-y-4 shadow-lg`}>
            <h2 className="font-semibold text-sm flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-400" /> Event Contract & Architecture Rules
            </h2>
            <div className="text-xs opacity-80 space-y-3 leading-relaxed">
              <p>
                <strong>Decoupled Architecture:</strong> Individual UI components never directly couple with sound synthesis, raw haptics, or specific theme lighting. Instead, components emit semantic events like <code className="text-cyan-300 font-mono">interaction.confirmed</code> or <code className="text-cyan-300 font-mono">state.success</code>.
              </p>
              <p>
                <strong>Theme Sensory Translation:</strong> The active theme recipe dynamically dictates how each event is expressed (e.g., Obsidian triggers warm gold resonance, Observatory plays telemetry beeps, and Minimal Cinema keeps silent editorial precision).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
