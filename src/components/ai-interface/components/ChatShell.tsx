/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { StyleRecipe, MessageItem } from '../types';
import { Bot, Sparkles, Settings, ArrowDown, Trash2, Shield, Activity, RefreshCw } from 'lucide-react';
import { MessageBubbles } from './MessageBubbles';
import { CommandInput } from './CommandInput';
import { StatusIndicator } from './StatusIndicator';

interface ChatShellProps {
  recipe: StyleRecipe;
  initialMessages?: MessageItem[];
  modelName?: string;
  isLiveStream?: boolean;
}

export function ChatShell({
  recipe,
  initialMessages = [
    {
      id: 'm1',
      role: 'user',
      content: 'Can you analyze the system telemetry and generate a robust TypeScript model with thinking and tool execution support?',
      timestamp: '10:42 AM',
      tokenCount: 42,
    },
    {
      id: 'm2',
      role: 'assistant',
      content: `I've analyzed your request and verified the constraint parameters. Here is the verified agent architecture with full telemetry and grounding citations.`,
      timestamp: '10:42 AM',
      tokenCount: 680,
      thinking: {
        steps: ['Context window ingested', 'Constraint verification passed', 'Code synthesized'],
        durationMs: 940,
        tokensUsed: 1840,
      },
      tools: [
        {
          id: 't-1',
          name: 'workspace_ast_inspector',
          arguments: { target: 'src/components/ai-interface', depth: 2 },
          status: 'completed',
          durationMs: 210,
          output: { filesAnalyzed: 18, errorsFound: 0, complianceLevel: 'Strict' },
        },
      ],
      citations: [
        {
          id: 'c-1',
          index: 1,
          title: 'Google GenAI SDK Documentation',
          url: 'https://ai.google.dev',
          domain: 'ai.google.dev',
          snippet: 'Official TypeScript client for Gemini 2.5 Flash and Gemini 2.5 Pro.',
          relevanceScore: 0.99,
        },
      ],
    },
  ],
  modelName = 'Gemini 2.5 Flash',
  isLiveStream = false,
}: ChatShellProps) {
  const [messages, setMessages] = useState<MessageItem[]>(initialMessages);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showScrollBottom, setShowScrollBottom] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const isFar = scrollHeight - scrollTop - clientHeight > 100;
    setShowScrollBottom(isFar);
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  };

  const handleSendMessage = (text: string) => {
    const userMsg: MessageItem = {
      id: `usr_${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      tokenCount: Math.round(text.length / 4),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsGenerating(true);

    // Simulate genuine assistant turn with real phases
    setTimeout(() => {
      const assistantMsg: MessageItem = {
        id: `ast_${Date.now()}`,
        role: 'assistant',
        content: `Acknowledged: "${text}". I have processed your request through the system telemetry pipeline and validated all design constraints.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        tokenCount: 240,
        thinking: {
          steps: ['Constraint check completed', 'Output synthesis finished'],
          durationMs: 460,
          tokensUsed: 890,
        },
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsGenerating(false);
      setTimeout(scrollToBottom, 50);
    }, 1200);
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className={`flex flex-col h-[650px] w-full rounded-2xl border overflow-hidden relative ${recipe.borderClass} ${recipe.bgClass}`}>
      {/* Top Navigation Bar */}
      <div className={`p-3.5 border-b flex items-center justify-between gap-3 ${recipe.borderClass} bg-black/40 backdrop-blur-md z-10`}>
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl border flex items-center justify-center ${recipe.borderClass} ${recipe.badgeClass}`}>
            <Bot className="w-4 h-4 text-sky-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-xs text-white">{modelName}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] text-zinc-400 font-mono">1.0M Context</span>
            </div>
            <p className="text-[11px] text-zinc-400">Low-latency multimodal agent session</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <StatusIndicator recipe={recipe} compact />
          </div>
          <button
            onClick={clearChat}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Clear Chat History"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 p-4 md:p-6 overflow-y-auto space-y-6 scroll-smooth"
      >
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3 text-zinc-500">
            <div className={`p-3 rounded-2xl border ${recipe.borderClass} bg-white/5`}>
              <Sparkles className="w-6 h-6 text-sky-400" />
            </div>
            <div className="space-y-1 max-w-sm">
              <h4 className="text-sm font-semibold text-white">Start a new conversation</h4>
              <p className="text-xs text-zinc-400">
                Ask questions, generate TypeScript code blocks, trigger tool calls, or switch models.
              </p>
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <MessageBubbles key={msg.id} recipe={recipe} message={msg} />
          ))
        )}

        {isGenerating && (
          <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono animate-pulse pl-11">
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-sky-400" />
            <span>Agent synthesizing response telemetry...</span>
          </div>
        )}
      </div>

      {/* Floating Scroll-to-Bottom Button */}
      {showScrollBottom && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-24 right-6 p-2 rounded-full bg-sky-600 text-white shadow-lg hover:bg-sky-500 transition-all z-20"
          title="Jump to latest message"
        >
          <ArrowDown className="w-4 h-4" />
        </button>
      )}

      {/* Docked Command Input Footer */}
      <div className={`p-4 border-t ${recipe.borderClass} bg-black/40 backdrop-blur-md`}>
        <CommandInput
          recipe={recipe}
          onSend={handleSendMessage}
          onStop={() => setIsGenerating(false)}
          isGenerating={isGenerating}
        />
      </div>
    </div>
  );
}
