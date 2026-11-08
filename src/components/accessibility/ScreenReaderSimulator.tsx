/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useAccessibility } from '../../design-system/accessibility/AccessibilityContext';
import { Radio, Volume2, Trash2, Send, MessageSquare, ShieldCheck, Tag } from 'lucide-react';

export function ScreenReaderSimulator() {
  const { announcements, announce, clearAnnouncements, settings, toggleSetting } = useAccessibility();
  const [customSpeechText, setCustomSpeechText] = useState<string>('');
  const [selectedPoliteness, setSelectedPoliteness] = useState<'polite' | 'assertive'>('polite');

  const handleSendCustomAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSpeechText.trim()) return;
    announce(customSpeechText.trim(), selectedPoliteness);
    setCustomSpeechText('');
  };

  const sampleRoles = [
    { role: 'button', name: 'Synthesize Experience', state: 'aria-pressed="false"', live: 'polite' },
    { role: 'switch', name: 'High Contrast Mode', state: 'aria-checked="true"', live: 'assertive' },
    { role: 'tab', name: 'Accessibility Lab', state: 'aria-selected="true"', live: 'none' },
    { role: 'slider', name: 'Kinetic Spring Stiffness', state: 'aria-valuenow="180"', live: 'polite' },
    { role: 'alert', name: 'Recipe auto-harmonized', state: 'role="alert"', live: 'assertive' },
  ];

  return (
    <div className="p-6 rounded-3xl bg-zinc-950/80 border border-zinc-800 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white font-mono flex items-center gap-2">
            <Radio className="w-4 h-4 text-cyan-400" /> Screen Reader & ARIA Live Region Simulator
          </h3>
          <p className="text-xs text-zinc-400">
            Real-time transcript of vocalized assistive technology speech, live announcements, and semantic role nodes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleSetting('screenReaderLabels')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border ${
              settings.screenReaderLabels
                ? 'bg-cyan-500 text-black border-cyan-400'
                : 'bg-white/5 text-zinc-300 border-white/10 hover:bg-white/10'
            }`}
          >
            {settings.screenReaderLabels ? 'Hide Visual ARIA Badges' : 'Show Visual ARIA Badges'}
          </button>

          <button
            onClick={clearAnnouncements}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10 transition-all"
            title="Clear Stream"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Live Vocalization Stream Log */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Stream Transcript Feed */}
        <div className="lg:col-span-7 space-y-3">
          <div className="text-xs font-mono uppercase text-zinc-400 flex items-center justify-between">
            <span>Assistive Audio Vocalization Log</span>
            <span className="text-[10px] text-cyan-400">{announcements.length} event(s) recorded</span>
          </div>

          <div className="h-64 overflow-y-auto p-4 rounded-2xl bg-black/60 border border-zinc-800 space-y-2.5 font-mono text-xs">
            {announcements.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-2">
                <Volume2 className="w-8 h-8 opacity-40" />
                <p>No active announcements yet. Interact with components or trigger a speech test below.</p>
              </div>
            ) : (
              announcements.map((item) => (
                <div
                  key={item.id}
                  className={`p-3 rounded-xl border transition-all animate-fadeIn ${
                    item.politeness === 'assertive'
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                      : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] opacity-75 pb-1">
                    <span className="uppercase font-bold tracking-wider flex items-center gap-1">
                      <Tag className="w-3 h-3" /> aria-live="{item.politeness}"
                    </span>
                    <span>{item.timestamp}</span>
                  </div>
                  <div className="text-sm font-semibold text-white">"{item.message}"</div>
                </div>
              ))
            )}
          </div>

          {/* Test Speech Dispatcher Form */}
          <form onSubmit={handleSendCustomAnnouncement} className="flex gap-2">
            <input
              type="text"
              value={customSpeechText}
              onChange={(e) => setCustomSpeechText(e.target.value)}
              placeholder="Type simulated screen reader announcement..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-black/40 border border-zinc-700 text-xs font-mono text-white focus:outline-none focus:border-cyan-400"
            />
            <select
              value={selectedPoliteness}
              onChange={(e) => setSelectedPoliteness(e.target.value as any)}
              className="px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-700 text-xs font-mono text-zinc-300 focus:outline-none"
            >
              <option value="polite">Polite</option>
              <option value="assertive">Assertive</option>
            </select>
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-lg shadow-cyan-500/20"
            >
              <Send className="w-3.5 h-3.5" /> Announce
            </button>
          </form>
        </div>

        {/* Semantic Role Inspector Table */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono uppercase text-zinc-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Semantic Role & Name Tree</span>
          </div>

          <div className="space-y-2">
            {sampleRoles.map((item, idx) => (
              <div
                key={idx}
                onClick={() => announce(`${item.name}, ${item.role}, ${item.state}`, item.live === 'assertive' ? 'assertive' : 'polite')}
                className="p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-cyan-500/50 cursor-pointer transition-all space-y-1.5 font-mono text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{item.name}</span>
                  <span className="px-2 py-0.5 rounded-md bg-white/10 text-cyan-300 text-[10px]">
                    role="{item.role}"
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-zinc-400">
                  <span className="text-amber-300">{item.state}</span>
                  <span>Click to Audition Speech</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
