/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { StyleRecipe } from '../types';
import {
  Send,
  Square,
  Mic,
  Paperclip,
  Sparkles,
  Command,
  Search,
  Code,
  Image as ImageIcon,
  FileText,
  Bot,
  Zap,
} from 'lucide-react';

interface CommandInputProps {
  recipe: StyleRecipe;
  onSend?: (text: string) => void;
  onStop?: () => void;
  isGenerating?: boolean;
  tokenBudget?: { current: number; max: number };
  placeholder?: string;
}

export function CommandInput({
  recipe,
  onSend,
  onStop,
  isGenerating = false,
  tokenBudget = { current: 1420, max: 8192 },
  placeholder = 'Ask anything, type / for commands, or @ to switch models...',
}: CommandInputProps) {
  const [text, setText] = useState('');
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [showAtMenu, setShowAtMenu] = useState(false);
  const [selectedModel, setSelectedModel] = useState('Gemini 2.5 Flash');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const slashCommands = [
    { cmd: '/search', label: 'Deep Web Search', icon: Search, desc: 'Ground query with live Google Search' },
    { cmd: '/code', label: 'Synthesize Module', icon: Code, desc: 'Generate verified TypeScript architecture' },
    { cmd: '/image', label: 'Generate Visual Asset', icon: ImageIcon, desc: 'Create high-res UI mockups & illustrations' },
    { cmd: '/audit', label: 'WCAG & Security Audit', icon: Zap, desc: 'Analyze accessibility & token leakages' },
  ];

  const atModels = [
    { name: 'Gemini 2.5 Flash', badge: 'Fast & Low Latency' },
    { name: 'Gemini 2.5 Pro', badge: 'Complex Reasoning' },
    { name: 'Gemini Flash-Thinking', badge: 'Deep Reasoning CoT' },
    { name: 'Claude 3.5 Sonnet', badge: 'Code & Artifacts' },
  ];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setText(val);
    if (val.endsWith('/')) {
      setShowSlashMenu(true);
      setShowAtMenu(false);
    } else if (val.endsWith('@')) {
      setShowAtMenu(true);
      setShowSlashMenu(false);
    } else {
      setShowSlashMenu(false);
      setShowAtMenu(false);
    }
  };

  const handleSubmit = () => {
    if (!text.trim() || isGenerating) return;
    if (onSend) onSend(text);
    setText('');
    setShowSlashMenu(false);
    setShowAtMenu(false);
  };

  const insertSlash = (cmd: string) => {
    setText((prev) => prev.slice(0, -1) + cmd + ' ');
    setShowSlashMenu(false);
    textareaRef.current?.focus();
  };

  const selectModel = (modelName: string) => {
    setSelectedModel(modelName);
    setText((prev) => prev.slice(0, -1));
    setShowAtMenu(false);
    textareaRef.current?.focus();
  };

  const tokenPercentage = Math.min(100, (tokenBudget.current / tokenBudget.max) * 100);

  return (
    <div className="relative w-full space-y-2">
      {/* Slash Command Popup */}
      {showSlashMenu && (
        <div className={`absolute bottom-full mb-2 left-0 right-0 max-w-md p-2 rounded-xl border ${recipe.borderClass} ${recipe.cardClass} shadow-2xl z-30 space-y-1 animate-in fade-in slide-in-from-bottom-2`}>
          <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-mono">
            QUICK ACTIONS (SLASH COMMANDS)
          </div>
          {slashCommands.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.cmd}
                onClick={() => insertSlash(item.cmd)}
                className="w-full p-2 rounded-lg flex items-center justify-between text-left hover:bg-white/10 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded bg-sky-500/20 text-sky-400">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-mono text-xs font-semibold text-white">{item.cmd}</span>
                    <p className="text-[11px] text-zinc-400">{item.desc}</p>
                  </div>
                </div>
                <span className="text-[10px] text-zinc-500 font-mono group-hover:text-white">SELECT</span>
              </button>
            );
          })}
        </div>
      )}

      {/* @ Mention Model Switcher Popup */}
      {showAtMenu && (
        <div className={`absolute bottom-full mb-2 left-0 right-0 max-w-sm p-2 rounded-xl border ${recipe.borderClass} ${recipe.cardClass} shadow-2xl z-30 space-y-1 animate-in fade-in slide-in-from-bottom-2`}>
          <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-500 font-mono">
            TARGET MODEL SELECTOR
          </div>
          {atModels.map((m) => (
            <button
              key={m.name}
              onClick={() => selectModel(m.name)}
              className="w-full p-2 rounded-lg flex items-center justify-between text-left hover:bg-white/10 transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Bot className="w-3.5 h-3.5 text-violet-400" />
                <span className="text-xs font-semibold text-white">{m.name}</span>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-zinc-300 font-mono">
                {m.badge}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Input Shell Container */}
      <div className={`p-3 rounded-2xl border transition-all ${recipe.borderClass} ${recipe.cardClass} ${recipe.inputBg} focus-within:ring-2 focus-within:ring-sky-500/40`}>
        {/* Model & Command Header Pill */}
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5 text-[11px]">
          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded-full font-mono flex items-center gap-1.5 ${recipe.badgeClass}`}>
              <Sparkles className="w-3 h-3 text-sky-400" />
              <span>{selectedModel}</span>
            </span>
            <span className="text-zinc-500 hidden sm:inline">Ctrl+Enter to send</span>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500">
            <span>{tokenBudget.current} / {tokenBudget.max} tokens</span>
            <div className="w-12 h-1.5 rounded-full bg-zinc-800 overflow-hidden">
              <div
                className={`h-full transition-all ${
                  tokenPercentage > 85 ? 'bg-rose-500' : 'bg-sky-400'
                }`}
                style={{ width: `${tokenPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={2}
          className="w-full bg-transparent text-xs md:text-sm text-white placeholder-zinc-500 focus:outline-none resize-none leading-relaxed"
        />

        {/* Bottom Toolbar Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Attach File or Code"
            >
              <Paperclip className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Voice Input (Speech-to-Text)"
            >
              <Mic className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setShowSlashMenu(!showSlashMenu)}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1 text-[11px] font-mono"
              title="Slash Commands"
            >
              <Command className="w-3.5 h-3.5" />
              <span>/</span>
            </button>
          </div>

          <div>
            {isGenerating ? (
              <button
                type="button"
                onClick={onStop}
                className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-lg shadow-rose-900/30 transition-all cursor-pointer"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>Stop</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!text.trim()}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  text.trim()
                    ? `${recipe.accentClass} ${recipe.accentGlow}`
                    : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                }`}
              >
                <span>Send</span>
                <Send className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
