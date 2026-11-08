/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StyleRecipe, ModelInfo } from '../types';
import { Bot, Zap, Brain, Code2, Sparkles, Check, ChevronDown } from 'lucide-react';

interface ModelSelectorProps {
  recipe: StyleRecipe;
  selectedModelId?: string;
  onSelectModel?: (model: ModelInfo) => void;
  layout?: 'dropdown' | 'grid';
}

export const AVAILABLE_MODELS: ModelInfo[] = [
  {
    id: 'gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    provider: 'Google DeepMind',
    contextWindow: '1,048,576 tokens',
    latencyTier: 'Ultra-Low',
    pricing: '$0.075 / 1M tokens',
    capabilities: ['multimodal', 'fast', 'function-calling', 'code'],
    description: 'Ultra high-speed multimodal reasoning model built for sub-second agentic loops.',
  },
  {
    id: 'gemini-2.5-pro',
    name: 'Gemini 2.5 Pro',
    provider: 'Google DeepMind',
    contextWindow: '2,097,152 tokens',
    latencyTier: 'Medium',
    pricing: '$1.25 / 1M tokens',
    capabilities: ['multimodal', 'reasoning', 'code', 'function-calling'],
    description: 'State-of-the-art multi-step reasoning, heavy code synthesis, and long-context analysis.',
  },
  {
    id: 'gemini-flash-thinking',
    name: 'Gemini Flash-Thinking',
    provider: 'Google DeepMind',
    contextWindow: '1,048,576 tokens',
    latencyTier: 'Deep-Reasoning',
    pricing: '$0.15 / 1M tokens',
    capabilities: ['reasoning', 'multimodal', 'code'],
    description: 'Exposes verifiable intermediate Chain-of-Thought reasoning steps for complex problems.',
  },
  {
    id: 'claude-3-5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    contextWindow: '200,000 tokens',
    latencyTier: 'Low',
    pricing: '$3.00 / 1M tokens',
    capabilities: ['code', 'reasoning', 'multimodal'],
    description: 'Nuanced writing, artifact generation, and precision software engineering.',
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    contextWindow: '128,000 tokens',
    latencyTier: 'Low',
    pricing: '$2.50 / 1M tokens',
    capabilities: ['multimodal', 'fast', 'function-calling'],
    description: 'Omni-modal model capable of real-time audio, text, and vision inference.',
  },
  {
    id: 'deepseek-r1',
    name: 'DeepSeek R1',
    provider: 'DeepSeek AI',
    contextWindow: '64,000 tokens',
    latencyTier: 'Deep-Reasoning',
    pricing: '$0.55 / 1M tokens',
    capabilities: ['reasoning', 'code'],
    description: 'Open-weight reinforcement learning reasoning model optimized for mathematical logic.',
  },
];

export function ModelSelector({
  recipe,
  selectedModelId = 'gemini-2.5-flash',
  onSelectModel,
  layout = 'grid',
}: ModelSelectorProps) {
  const [currentId, setCurrentId] = useState(selectedModelId);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  const selectedModel = AVAILABLE_MODELS.find((m) => m.id === currentId) || AVAILABLE_MODELS[0];

  const handleSelect = (model: ModelInfo) => {
    setCurrentId(model.id);
    if (onSelectModel) onSelectModel(model);
    setIsOpenDropdown(false);
  };

  if (layout === 'dropdown') {
    return (
      <div className="relative w-full max-w-xs">
        <button
          onClick={() => setIsOpenDropdown(!isOpenDropdown)}
          className={`w-full p-2.5 rounded-xl border flex items-center justify-between gap-2 text-xs text-left cursor-pointer transition-all ${
            recipe.borderClass
          } ${recipe.cardClass} hover:border-white/30`}
        >
          <div className="flex items-center gap-2 min-w-0">
            <Bot className="w-4 h-4 text-sky-400 shrink-0" />
            <div className="min-w-0">
              <span className="font-semibold text-white block truncate">{selectedModel.name}</span>
              <span className="text-[10px] text-zinc-400 font-mono">{selectedModel.latencyTier} • {selectedModel.contextWindow}</span>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0" />
        </button>

        {isOpenDropdown && (
          <div className={`absolute top-full mt-1.5 left-0 right-0 p-1.5 rounded-xl border ${recipe.borderClass} ${recipe.cardClass} shadow-2xl z-30 space-y-1 animate-in fade-in`}>
            {AVAILABLE_MODELS.map((m) => (
              <button
                key={m.id}
                onClick={() => handleSelect(m)}
                className={`w-full p-2 rounded-lg flex items-center justify-between text-left text-xs transition-colors ${
                  m.id === currentId ? 'bg-sky-500/20 text-sky-200 border border-sky-500/30' : 'hover:bg-white/10 text-zinc-300'
                }`}
              >
                <div>
                  <div className="font-semibold text-white">{m.name}</div>
                  <div className="text-[10px] text-zinc-400 font-mono">{m.provider}</div>
                </div>
                {m.id === currentId && <Check className="w-3.5 h-3.5 text-sky-400" />}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {AVAILABLE_MODELS.map((model) => {
        const isSelected = model.id === currentId;

        return (
          <div
            key={model.id}
            onClick={() => handleSelect(model)}
            className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
              recipe.borderClass
            } ${recipe.cardClass} ${
              isSelected
                ? 'ring-2 ring-sky-500 border-transparent shadow-lg shadow-sky-500/10'
                : 'hover:border-white/30 hover:bg-white/5'
            }`}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <span className="font-semibold text-sm text-white block">{model.name}</span>
                <span className="text-[10px] text-zinc-400 font-mono">{model.provider}</span>
              </div>
              <span
                className={`text-[10px] px-2 py-0.5 rounded font-mono uppercase font-bold ${
                  model.latencyTier === 'Ultra-Low'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    : model.latencyTier === 'Deep-Reasoning'
                    ? 'bg-violet-950 text-violet-300 border border-violet-800'
                    : 'bg-sky-950 text-sky-300 border border-sky-800'
                }`}
              >
                {model.latencyTier}
              </span>
            </div>

            <p className="text-[11px] text-zinc-400 mb-3 line-clamp-2 leading-relaxed">
              {model.description}
            </p>

            <div className="space-y-1.5 pt-2 border-t border-white/5 font-mono text-[10px] text-zinc-400">
              <div className="flex justify-between">
                <span>Context Window:</span>
                <span className="text-zinc-200">{model.contextWindow}</span>
              </div>
              <div className="flex justify-between">
                <span>Pricing:</span>
                <span className="text-zinc-200">{model.pricing}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mt-3">
              {model.capabilities.map((cap) => (
                <span
                  key={cap}
                  className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-zinc-300 font-mono uppercase"
                >
                  {cap}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
