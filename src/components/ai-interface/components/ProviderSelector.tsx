/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StyleRecipe, ProviderInfo } from '../types';
import { Server, Activity, CheckCircle2, AlertCircle, RefreshCw, Cpu, HardDrive } from 'lucide-react';

interface ProviderSelectorProps {
  recipe: StyleRecipe;
  selectedProviderId?: string;
  onSelectProvider?: (provider: ProviderInfo) => void;
}

export const AVAILABLE_PROVIDERS: ProviderInfo[] = [
  {
    id: 'google-ai-studio',
    name: 'Google AI Studio & Vertex AI',
    endpoint: 'https://generativelanguage.googleapis.com/v1beta',
    status: 'operational',
    pingMs: 24,
    availableModels: 12,
  },
  {
    id: 'anthropic-direct',
    name: 'Anthropic Cloud API',
    endpoint: 'https://api.anthropic.com/v1',
    status: 'operational',
    pingMs: 48,
    availableModels: 6,
  },
  {
    id: 'openai-direct',
    name: 'OpenAI Direct API',
    endpoint: 'https://api.openai.com/v1',
    status: 'operational',
    pingMs: 52,
    availableModels: 8,
  },
  {
    id: 'ollama-local',
    name: 'Ollama Local Daemon',
    endpoint: 'http://localhost:11434',
    status: 'operational',
    pingMs: 2,
    availableModels: 4,
  },
  {
    id: 'groq-lpu',
    name: 'Groq LPU Inference Cloud',
    endpoint: 'https://api.groq.com/openai/v1',
    status: 'operational',
    pingMs: 18,
    availableModels: 5,
  },
];

export function ProviderSelector({
  recipe,
  selectedProviderId = 'google-ai-studio',
  onSelectProvider,
}: ProviderSelectorProps) {
  const [currentId, setCurrentId] = useState(selectedProviderId);

  const handleSelect = (provider: ProviderInfo) => {
    setCurrentId(provider.id);
    if (onSelectProvider) onSelectProvider(provider);
  };

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {AVAILABLE_PROVIDERS.map((provider) => {
          const isSelected = provider.id === currentId;

          return (
            <div
              key={provider.id}
              onClick={() => handleSelect(provider)}
              className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                recipe.borderClass
              } ${recipe.cardClass} ${
                isSelected
                  ? 'ring-2 ring-emerald-500 border-transparent bg-emerald-950/20'
                  : 'hover:border-white/30 hover:bg-white/5'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-semibold text-white truncate">{provider.name}</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-1.5 py-0.2 rounded border border-emerald-800">
                  {provider.pingMs}ms
                </span>
              </div>

              <div className="font-mono text-[10px] text-zinc-500 truncate mb-2">
                {provider.endpoint}
              </div>

              <div className="flex items-center justify-between text-[10px] text-zinc-400 pt-1.5 border-t border-white/5 font-mono">
                <span>{provider.availableModels} models ready</span>
                <span className="text-emerald-400 font-semibold uppercase">{provider.status}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
