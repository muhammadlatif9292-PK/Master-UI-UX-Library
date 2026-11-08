/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  Code2,
  Play,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Award,
  Layers,
} from 'lucide-react';
import { PageStyleRecipe } from '../recipes';
import { MediaControls } from '../../../design-system/general/components/MediaControls';

interface Props {
  recipe: PageStyleRecipe;
}

export const EducationPageExperience: React.FC<Props> = ({ recipe }) => {
  const [activeLesson, setActiveLesson] = useState<number>(3);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const lessons = [
    { num: 1, title: 'Introduction to Quantum Telemetry & Qubits', completed: true, duration: '12 min' },
    { num: 2, title: 'Superposition & Phase Decoherence Mitigation', completed: true, duration: '18 min' },
    { num: 3, title: 'Zero-Copy Ring Buffer Architecture in TypeScript', completed: false, duration: '24 min' },
    { num: 4, title: 'Multi-Agent State Synchronization & Consensus', completed: false, duration: '30 min' },
    { num: 5, title: 'Hardware Security Enclaves & FIDO2 Cryptography', completed: false, duration: '20 min' },
  ];

  return (
    <div className={`w-full min-h-[850px] ${recipe.bodyBg} flex flex-col font-sans`}>
      {/* Education Header */}
      <header className={`px-6 py-4 border-b ${recipe.divider} ${recipe.headerBg} flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-20`}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className={`font-extrabold text-lg ${recipe.textPrimary}`}>
                Advanced Distributed Systems & AI Masterclass
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-indigo-950 border border-indigo-700 text-indigo-300 font-bold">
                MODULE 3 OF 5
              </span>
            </div>
            <p className={`text-xs ${recipe.textSecondary}`}>
              Hands-on interactive engineering lab & architectural certification
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono">Progress: 60%</span>
          <div className="w-28 bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-indigo-500 h-full w-3/5" />
          </div>
        </div>
      </header>

      {/* Main Educational Workspace (Curriculum on Left, Active Lesson Sandbox on Right) */}
      <main className="max-w-7xl mx-auto w-full p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        {/* Left Column: Syllabus & Lesson Navigator (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-bold text-xs text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <span>Curriculum Outline</span>
            </h3>
          </div>

          <div className="space-y-2">
            {lessons.map((lesson) => (
              <button
                key={lesson.num}
                onClick={() => setActiveLesson(lesson.num)}
                className={`w-full p-4 rounded-2xl text-left border transition-all flex items-start gap-3 ${
                  activeLesson === lesson.num
                    ? 'border-indigo-500 bg-indigo-500/10 shadow-md'
                    : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
                }`}
              >
                <div className="mt-0.5">
                  {lesson.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center text-[10px] text-slate-400">
                      {lesson.num}
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="text-xs font-bold text-slate-100">{lesson.title}</div>
                  <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-2">
                    <span>{lesson.duration}</span>
                    <span>• Interactive Lab</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Interactive Lesson Deck & Code Walkthrough (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Lecture Media Player */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-300">Synchronized Audio Lecture & Waveform</h3>
            <MediaControls />
          </div>

          {/* Interactive Code Exercise & Sandbox */}
          <div className={`p-6 rounded-3xl border ${recipe.cardBorder} ${recipe.cardBg} backdrop-blur-md space-y-4`}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h4 className="font-bold text-sm text-white flex items-center gap-2">
                <Code2 className="w-4 h-4 text-indigo-400" />
                <span>Hands-on Challenge: Complete the Ring Buffer Dispatcher</span>
              </h4>
              <span className="text-xs font-mono text-emerald-400">TEST SUITE: 3/3 PASSING</span>
            </div>

            <pre className="p-4 rounded-2xl bg-black/60 border border-slate-800 text-xs font-mono text-indigo-300 overflow-x-auto leading-relaxed">
{`function allocateBuffer(capacity: number): Uint8Array {
  // Step 1: Pre-allocate contiguous shared ArrayBuffer
  const shared = new SharedArrayBuffer(capacity);
  return new Uint8Array(shared);
}`}
            </pre>
          </div>

          {/* Concept Check Quiz */}
          <div className={`p-6 rounded-3xl border ${recipe.cardBorder} ${recipe.cardBg} backdrop-blur-md space-y-4`}>
            <h4 className="font-bold text-sm text-white flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span>Concept Check: Why is SharedArrayBuffer used for zero-copy ring buffers?</span>
            </h4>

            <div className="space-y-2">
              {[
                'To allow multiple worker threads direct atomic access without serialization overhead.',
                'To automatically encrypt memory packets on the client browser.',
                'To prevent any CPU cache line contention forever.',
              ].map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => { setSelectedQuizOption(idx); setQuizSubmitted(false); }}
                  className={`w-full p-3.5 rounded-xl text-left text-xs border transition-all ${
                    selectedQuizOption === idx
                      ? 'border-indigo-500 bg-indigo-500/20 text-white font-bold'
                      : 'border-slate-800 bg-black/40 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            <button
              onClick={() => setQuizSubmitted(true)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold ${recipe.accentBg}`}
            >
              Submit Answer
            </button>

            {quizSubmitted && (
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Correct! SharedArrayBuffer enables zero-copy atomic memory access between threads.</span>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
