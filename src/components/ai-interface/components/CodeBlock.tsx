/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { StyleRecipe } from '../types';
import { Copy, Check, Play, Terminal, Code2, Sparkles, CheckCircle2 } from 'lucide-react';

interface CodeBlockProps {
  key?: React.Key;
  recipe: StyleRecipe;
  code?: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  canExecute?: boolean;
}

export function CodeBlock({
  recipe,
  code = `import { GoogleGenAI } from "@google/genai";

// Initialize the Google GenAI SDK client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function synthesizeResponse(prompt: string) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      temperature: 0.2,
      thinkingConfig: {
        thinkingBudget: 2048,
      },
    },
  });

  return response.text;
}`,
  language = 'typescript',
  filename = 'geminiService.ts',
  showLineNumbers = true,
  canExecute = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [executionOutput, setExecutionOutput] = useState<string | null>(null);

  const lines = code.split('\n');

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runCode = () => {
    setIsRunning(true);
    setExecutionOutput(null);
    setTimeout(() => {
      setIsRunning(false);
      setExecutionOutput(`[Process terminated with exit code 0 in 184ms]\n> Response tokens generated: 432\n> Status: Verified OK`);
    }, 1200);
  };

  return (
    <div className={`rounded-xl border overflow-hidden font-mono text-xs ${recipe.borderClass} ${recipe.codeBg}`}>
      {/* Header Bar */}
      <div className="px-3 py-2 bg-black/60 border-b border-white/10 flex items-center justify-between gap-3 text-zinc-300">
        <div className="flex items-center gap-2">
          <Code2 className="w-3.5 h-3.5 text-sky-400" />
          <span className="font-semibold text-white">{filename}</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/10 text-zinc-400 uppercase">
            {language}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {canExecute && (
            <button
              onClick={runCode}
              disabled={isRunning}
              className={`px-2 py-1 rounded flex items-center gap-1 text-[11px] transition-colors ${
                isRunning
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/30'
              }`}
            >
              <Play className={`w-3 h-3 ${isRunning ? 'animate-spin' : ''}`} />
              <span>{isRunning ? 'Executing...' : 'Run'}</span>
            </button>
          )}

          <button
            onClick={copyCode}
            className="p-1 rounded hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
            title="Copy Code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Code Editor Body */}
      <div className="p-3 overflow-x-auto max-h-80 select-text">
        <table className="w-full text-left border-collapse">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-white/5 transition-colors">
                {showLineNumbers && (
                  <td className="pr-4 text-right select-none text-zinc-600 w-8 align-top text-[11px]">
                    {idx + 1}
                  </td>
                )}
                <td className="whitespace-pre text-zinc-200 leading-relaxed font-mono">
                  {/* Basic syntax highlight tinting */}
                  {line.includes('import') || line.includes('export') || line.includes('const') || line.includes('async') || line.includes('await') ? (
                    <span className="text-sky-300">{line}</span>
                  ) : line.includes('//') ? (
                    <span className="text-zinc-500 italic">{line}</span>
                  ) : line.includes('model:') || line.includes('apiKey:') ? (
                    <span className="text-emerald-300">{line}</span>
                  ) : (
                    line
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Execution Output Console */}
      {executionOutput && (
        <div className="p-3 bg-black/90 border-t border-white/10 text-emerald-400 space-y-1 font-mono text-[11px]">
          <div className="flex items-center justify-between text-zinc-400 text-[10px] pb-1 border-b border-white/5">
            <span className="flex items-center gap-1">
              <Terminal className="w-3 h-3 text-emerald-400" /> Output Console
            </span>
            <button onClick={() => setExecutionOutput(null)} className="hover:text-white">Clear</button>
          </div>
          <pre className="whitespace-pre-wrap">{executionOutput}</pre>
        </div>
      )}
    </div>
  );
}
