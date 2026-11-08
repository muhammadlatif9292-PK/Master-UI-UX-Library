/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StyleRecipe, MessageItem } from '../types';
import { Bot, User, Copy, Check, RotateCcw, ThumbsUp, ThumbsDown, Sparkles } from 'lucide-react';
import { Citations } from './Citations';
import { Attachments } from './Attachments';
import { ToolExecution } from './ToolExecution';
import { ThinkingState } from './ThinkingState';
import { CodeBlock } from './CodeBlock';

interface MessageBubblesProps {
  key?: React.Key;
  recipe: StyleRecipe;
  message: MessageItem;
  onRetry?: (id: string) => void;
}

export function MessageBubbles({ recipe, message, onRetry }: MessageBubblesProps) {
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);

  const isUser = message.role === 'user';
  const isAssistant = message.role === 'assistant';

  const copyContent = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex gap-3 text-xs md:text-sm ${isUser ? 'justify-end' : 'justify-start'}`}>
      {/* Assistant Avatar */}
      {!isUser && (
        <div className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center border shadow-xs ${recipe.borderClass} ${recipe.badgeClass}`}>
          <Bot className="w-4 h-4 text-sky-400" />
        </div>
      )}

      {/* Bubble Container */}
      <div className={`max-w-[88%] md:max-w-[78%] space-y-2.5 ${isUser ? 'items-end' : 'items-start'}`}>
        {/* User / Assistant Badge & Timestamp */}
        <div className={`flex items-center gap-2 text-[10px] font-mono text-zinc-500 ${isUser ? 'justify-end' : 'justify-start'}`}>
          <span className="font-semibold text-zinc-400">
            {isUser ? 'You' : 'Gemini AI Assistant'}
          </span>
          <span>•</span>
          <span>{message.timestamp}</span>
          {message.tokenCount && (
            <>
              <span>•</span>
              <span>{message.tokenCount} tokens</span>
            </>
          )}
        </div>

        {/* User Attachments if any */}
        {message.attachments && message.attachments.length > 0 && (
          <Attachments recipe={recipe} attachments={message.attachments} interactive={false} />
        )}

        {/* Assistant Thinking Step Accordion if any */}
        {message.thinking && (
          <ThinkingState
            recipe={recipe}
            totalDurationMs={message.thinking.durationMs}
            totalTokens={message.thinking.tokensUsed}
          />
        )}

        {/* Assistant Tool Execution Cards */}
        {message.tools && message.tools.length > 0 && (
          <div className="space-y-2">
            {message.tools.map((tool) => (
              <ToolExecution key={tool.id} recipe={recipe} tool={tool} />
            ))}
          </div>
        )}

        {/* Message Body Content */}
        <div
          className={`p-4 rounded-2xl leading-relaxed whitespace-pre-wrap ${
            isUser ? recipe.bubbleUser : recipe.bubbleAssistant
          }`}
        >
          {message.content}
        </div>

        {/* Assistant Code Artifacts */}
        {message.artifacts && message.artifacts.length > 0 && (
          <div className="space-y-2">
            {message.artifacts.map((art) => (
              <CodeBlock
                key={art.id}
                recipe={recipe}
                code={art.code}
                language={art.language}
                filename={`${art.title}.${art.language === 'typescript' ? 'ts' : 'js'}`}
              />
            ))}
          </div>
        )}

        {/* Grounding Citations */}
        {message.citations && message.citations.length > 0 && (
          <Citations recipe={recipe} citations={message.citations} />
        )}

        {/* Bottom Actions Toolbar for Assistant Messages */}
        {isAssistant && (
          <div className="flex items-center gap-1 text-zinc-400 text-xs pt-1">
            <button
              onClick={copyContent}
              className="p-1.5 rounded-md hover:bg-white/10 hover:text-white transition-colors"
              title="Copy Message"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>

            {onRetry && (
              <button
                onClick={() => onRetry(message.id)}
                className="p-1.5 rounded-md hover:bg-white/10 hover:text-white transition-colors"
                title="Regenerate Response"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              onClick={() => setFeedback(feedback === 'up' ? null : 'up')}
              className={`p-1.5 rounded-md transition-colors ${
                feedback === 'up' ? 'text-emerald-400 bg-emerald-500/10' : 'hover:bg-white/10 hover:text-white'
              }`}
              title="Helpful response"
            >
              <ThumbsUp className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setFeedback(feedback === 'down' ? null : 'down')}
              className={`p-1.5 rounded-md transition-colors ${
                feedback === 'down' ? 'text-rose-400 bg-rose-500/10' : 'hover:bg-white/10 hover:text-white'
              }`}
              title="Report issue"
            >
              <ThumbsDown className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center border shadow-xs ${recipe.borderClass} bg-zinc-800 text-zinc-200`}>
          <User className="w-4 h-4" />
        </div>
      )}
    </div>
  );
}
