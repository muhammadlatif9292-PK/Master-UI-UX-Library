/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Inbox,
  Sparkles,
  Plus,
  UploadCloud,
  FileCode,
  Layers,
  Database,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import { PageStyleRecipe } from '../recipes';
import { FileUpload } from '../../../design-system/general/components/FileUpload';

interface Props {
  recipe: PageStyleRecipe;
}

export const EmptyStatePageExperience: React.FC<Props> = ({ recipe }) => {
  const [seeded, setSeeded] = useState(false);

  return (
    <div className={`w-full min-h-[850px] ${recipe.bodyBg} flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans`}>
      <div className="w-full max-w-2xl relative z-10 space-y-6 text-center">
        {/* Empty State Hero Illustration */}
        <div className="space-y-3">
          <div className="w-24 h-24 mx-auto rounded-3xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-inner">
            <Inbox className="w-12 h-12" />
          </div>
          <h1 className={`text-2xl font-extrabold tracking-tight ${recipe.textPrimary}`}>
            No Active Telemetry Streams Found
          </h1>
          <p className={`text-xs max-w-md mx-auto ${recipe.textSecondary}`}>
            Your workspace node cluster is online, but no telemetry ingest queues or model artifacts have been initialized yet.
          </p>
        </div>

        {/* Quick-Start Starter Template Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
          <div className={`p-5 rounded-2xl border ${recipe.cardBorder} ${recipe.cardBg} backdrop-blur-md space-y-2 hover:border-indigo-500 transition-all cursor-pointer group`}>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 w-fit">
              <Sparkles className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-xs text-white group-hover:text-indigo-400">Quantum Simulator</h4>
            <p className="text-[11px] text-slate-400">Pre-configured 64-qubit state vector simulation deck.</p>
          </div>

          <div className={`p-5 rounded-2xl border ${recipe.cardBorder} ${recipe.cardBg} backdrop-blur-md space-y-2 hover:border-cyan-500 transition-all cursor-pointer group`}>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 w-fit">
              <Database className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-xs text-white group-hover:text-cyan-400">High-Throughput Ingress</h4>
            <p className="text-[11px] text-slate-400">Benchmarked Kafka / WebRTC high-velocity telemetry pipeline.</p>
          </div>

          <div className={`p-5 rounded-2xl border ${recipe.cardBorder} ${recipe.cardBg} backdrop-blur-md space-y-2 hover:border-emerald-500 transition-all cursor-pointer group`}>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit">
              <FileCode className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-xs text-white group-hover:text-emerald-400">Multi-Agent Sandbox</h4>
            <p className="text-[11px] text-slate-400">Gemini 3.7 multi-agent reasoning orchestrator.</p>
          </div>
        </div>

        {/* Ingress Upload Dropzone */}
        <div className="text-left space-y-2">
          <span className="text-xs font-bold text-slate-300">Or drag and drop existing model weights or telemetry CSVs:</span>
          <FileUpload />
        </div>

        {/* One-Click Sample Data Seed CTA */}
        <div className="pt-2">
          <button
            onClick={() => setSeeded(!seeded)}
            className={`px-6 py-3 rounded-2xl text-xs font-bold transition-all shadow-lg ${
              seeded ? 'bg-emerald-600 text-white' : recipe.accentBg
            }`}
          >
            {seeded ? (
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Sample Telemetry Seeded! Redirecting...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Seed Workspace with Sample Data
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
