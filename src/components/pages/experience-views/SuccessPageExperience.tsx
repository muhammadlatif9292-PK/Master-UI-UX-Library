/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Copy,
  Check,
  ShieldCheck,
  Download,
  Share2,
  Layers,
  Server,
} from 'lucide-react';
import { PageStyleRecipe } from '../recipes';

interface Props {
  recipe: PageStyleRecipe;
}

export const SuccessPageExperience: React.FC<Props> = ({ recipe }) => {
  const [copiedHash, setCopiedHash] = useState(false);
  const receiptHash = '0x8f4b2910a3c20098fbc188402941aa89201948ac01924b176';

  const handleCopy = () => {
    navigator.clipboard.writeText(receiptHash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className={`w-full min-h-[850px] ${recipe.bodyBg} flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans`}>
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-xl relative z-10 space-y-6 text-center">
        {/* Success Icon */}
        <div className="space-y-3">
          <div className="w-24 h-24 mx-auto rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-inner animate-bounce" style={{ animationDuration: '2s' }}>
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-mono text-emerald-400 font-bold tracking-widest uppercase">
              DEPLOYMENT VERIFIED // ZERO FAULTS
            </span>
            <h1 className={`text-2xl font-extrabold tracking-tight ${recipe.textPrimary}`}>
              Quantum Model Shard Deployed
            </h1>
            <p className={`text-xs max-w-md mx-auto ${recipe.textSecondary}`}>
              All 128 cluster nodes have loaded the model weights and verified zero-copy memory ring buffers.
            </p>
          </div>
        </div>

        {/* Cryptographic Receipt Card */}
        <div className={`p-6 rounded-3xl border ${recipe.cardBorder} ${recipe.cardBg} backdrop-blur-xl shadow-2xl space-y-4 text-left`}>
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-bold text-slate-200">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Immutable Cryptographic Audit Receipt</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800">
              SIGNED
            </span>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="p-3 rounded-2xl bg-black/50 border border-slate-800 flex items-center justify-between text-slate-300">
              <span className="text-slate-500 text-[11px]">HASH:</span>
              <span className="text-emerald-300 truncate max-w-[280px]">{receiptHash}</span>
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all text-xs"
              >
                {copiedHash ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
              <div className="p-3 rounded-2xl bg-black/30 border border-slate-800">
                <span className="block text-slate-500 text-[10px]">DEPLOYED NODES</span>
                <span className="text-white font-bold">128 / 128 ACTIVE</span>
              </div>
              <div className="p-3 rounded-2xl bg-black/30 border border-slate-800">
                <span className="block text-slate-500 text-[10px]">INFERENCE LATENCY</span>
                <span className="text-emerald-400 font-bold">1.24ms P99</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => alert('Navigating to Live Operations Dashboard...')}
            className={`w-full sm:w-auto px-6 py-3 rounded-2xl text-xs font-bold ${recipe.accentBg} flex items-center justify-center gap-2 shadow-lg`}
          >
            <span>Open Cluster Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => alert('Downloading GPG-signed Audit Certificate PDF...')}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl text-xs font-semibold bg-slate-800/80 hover:bg-slate-700 text-slate-200 flex items-center justify-center gap-2"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Certificate</span>
          </button>
        </div>
      </div>
    </div>
  );
};
