/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StyleRecipe } from '../types';
import { Bot, Sparkles, Smile, MessageSquare, ArrowRight, Heart, Zap, Award } from 'lucide-react';

export type CompanionMood = 'supportive' | 'analytical' | 'creative' | 'curious' | 'focused';

interface AiCompanionProps {
  recipe: StyleRecipe;
  name?: string;
  role?: string;
  mood?: CompanionMood;
  onSelectSuggestion?: (suggestion: string) => void;
}

export function AiCompanion({
  recipe,
  name = 'Aria',
  role = 'Design Architect & Systems Lead',
  mood = 'supportive',
  onSelectSuggestion,
}: AiCompanionProps) {
  const [currentMood, setCurrentMood] = useState<CompanionMood>(mood);

  const proactiveSuggestions = [
    'Refactor container padding for strict mathematical scale',
    'Generate interactive Voice State visualizer',
    'Review task DAG stepper for real telemetry verification',
    'Audit WCAG 2.1 AA color contrast compliance',
  ];

  const moodColors = {
    supportive: 'from-emerald-500 to-teal-600 ring-emerald-500/30',
    analytical: 'from-sky-500 to-blue-600 ring-sky-500/30',
    creative: 'from-violet-500 to-pink-600 ring-violet-500/30',
    curious: 'from-amber-500 to-orange-600 ring-amber-500/30',
    focused: 'from-rose-500 to-indigo-600 ring-rose-500/30',
  };

  return (
    <div className={`p-5 rounded-2xl border space-y-4 ${recipe.borderClass} ${recipe.cardClass}`}>
      {/* Companion Card Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Avatar with Emotion Halo */}
          <div className="relative">
            <div
              className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${moodColors[currentMood]} p-0.5 shadow-lg ring-4 flex items-center justify-center transition-all duration-500`}
            >
              <div className="w-full h-full bg-zinc-900 rounded-[14px] flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
            </div>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-zinc-900 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-sm text-white">{name}</h4>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase ${recipe.badgeClass}`}>
                {currentMood}
              </span>
            </div>
            <p className="text-xs text-zinc-400">{role}</p>
          </div>
        </div>

        {/* Mood Selector Buttons */}
        <div className="hidden sm:flex items-center gap-1 p-1 rounded-lg bg-black/40 border border-white/10 text-xs">
          {(['supportive', 'analytical', 'creative', 'focused'] as CompanionMood[]).map((m) => (
            <button
              key={m}
              onClick={() => setCurrentMood(m)}
              className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase transition-colors cursor-pointer ${
                currentMood === m
                  ? 'bg-white/20 text-white font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Proactive Thought Quote */}
      <div className="p-3 rounded-xl bg-black/30 border border-white/5 space-y-1">
        <div className="flex items-center gap-1.5 text-[11px] text-sky-400 font-mono">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Proactive Insight:</span>
        </div>
        <p className="text-xs text-zinc-200 leading-relaxed font-sans">
          "I noticed you're exploring the AI Interface catalog. All components are configured with authentic system states and zero mock delays."
        </p>
      </div>

      {/* Proactive Suggestion Chips */}
      <div className="space-y-2">
        <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">
          SUGGESTED NEXT STEPS
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {proactiveSuggestions.map((s, idx) => (
            <button
              key={idx}
              onClick={() => onSelectSuggestion && onSelectSuggestion(s)}
              className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-left text-xs text-zinc-300 hover:text-white flex items-center justify-between gap-2 group transition-all cursor-pointer"
            >
              <span className="truncate">{s}</span>
              <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-sky-400 shrink-0 transition-colors" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
