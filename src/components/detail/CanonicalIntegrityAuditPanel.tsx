/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CatalogEntry } from '../../design-system/catalog/catalogTypes';
import { getCanonicalRecipe } from '../../design-system/catalog/canonicalRecipeRegistry';
import { auditRecipeIntegrity } from '../../design-system/catalog/recipeIntegrityChecker';
import { ShieldCheck, ShieldAlert, CheckCircle2, AlertTriangle, RefreshCw, Cpu, Layers, Sparkles } from 'lucide-react';

interface CanonicalIntegrityAuditPanelProps {
  entry: CatalogEntry;
}

export function CanonicalIntegrityAuditPanel({ entry }: CanonicalIntegrityAuditPanelProps) {
  const recipe = getCanonicalRecipe(entry);
  const [auditResult, setAuditResult] = useState(() => auditRecipeIntegrity(entry, recipe));
  const [rechecking, setRechecking] = useState(false);

  const handleRecheck = () => {
    setRechecking(true);
    setTimeout(() => {
      const freshRecipe = getCanonicalRecipe(entry);
      setAuditResult(auditRecipeIntegrity(entry, freshRecipe));
      setRechecking(false);
    }, 400);
  };

  return (
    <div className="p-6 md:p-8 rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-5">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-2xl border ${
            auditResult.overallPassed
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
              : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
          }`}>
            {auditResult.overallPassed ? (
              <ShieldCheck className="w-6 h-6 animate-pulse" />
            ) : (
              <ShieldAlert className="w-6 h-6" />
            )}
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Canonical Identity Integrity Audit
              <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border font-bold uppercase ${
                auditResult.overallPassed
                  ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
              }`}>
                {auditResult.scorePercentage}% SCORE
              </span>
            </h3>
            <p className="text-xs text-zinc-400">
              Validating Preview, Code, AI Prompt, and Metadata against 5 integrity vectors.
            </p>
          </div>
        </div>

        <button
          onClick={handleRecheck}
          disabled={rechecking}
          className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-mono text-xs font-bold transition-all flex items-center gap-2 shrink-0 self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${rechecking ? 'animate-spin text-cyan-400' : ''}`} />
          <span>{rechecking ? 'Auditing...' : 'Run Audit'}</span>
        </button>
      </div>

      {/* 5 Integrity Check Vectors Grid */}
      <div className="space-y-3 font-mono text-xs">
        <div className="text-zinc-400 font-bold uppercase tracking-wider text-[11px] flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          <span>Integrity Vector Results ({auditResult.passedCount}/{auditResult.totalCount} Passed)</span>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {auditResult.checks.map((check) => (
            <div
              key={check.vector}
              className={`p-4 rounded-2xl border transition-all space-y-2 ${
                check.passed
                  ? 'bg-zinc-900/60 border-zinc-800/80 text-zinc-200'
                  : check.severity === 'error'
                  ? 'bg-rose-950/20 border-rose-500/40 text-rose-200'
                  : 'bg-amber-950/20 border-amber-500/40 text-amber-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {check.passed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  )}
                  <span className="font-bold text-xs text-white">{check.name}</span>
                </div>
                <span
                  className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                    check.passed
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                      : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                  }`}
                >
                  {check.passed ? 'PASSED' : 'FLAGGED'}
                </span>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed pl-6">{check.message}</p>

              {check.details && check.details.length > 0 && (
                <div className="pl-6 pt-1 space-y-0.5 text-[11px] text-zinc-500">
                  {check.details.map((d, i) => (
                    <div key={i}>• {d}</div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Surface Synchronization Indicator */}
      <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs flex items-center gap-3">
        <Sparkles className="w-5 h-5 text-cyan-400 shrink-0 animate-pulse" />
        <div>
          <span className="font-bold uppercase block text-[11px] text-cyan-200">Single Canonical Identity Synchronized</span>
          <span className="text-[11px] opacity-80">
            Live Preview, Code Generator, AI Prompt Studio, and Metadata originate from recipe object: <strong className="text-white">{recipe.recipeName}</strong>.
          </span>
        </div>
      </div>
    </div>
  );
}
