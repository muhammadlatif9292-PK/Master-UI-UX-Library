/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  AlertTriangle,
  RefreshCw,
  Terminal,
  Home,
  LifeBuoy,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Cpu,
  Layers,
} from 'lucide-react';
import { PageStyleRecipe } from '../recipes';

interface Props {
  recipe: PageStyleRecipe;
}

export const ErrorPageExperience: React.FC<Props> = ({ recipe }) => {
  const [showStackTrace, setShowStackTrace] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const [retrySuccess, setRetrySuccess] = useState(false);

  const handleRetry = () => {
    setIsRetrying(true);
    setTimeout(() => {
      setIsRetrying(false);
      setRetrySuccess(true);
    }, 1200);
  };

  return (
    <div className={`w-full min-h-[850px] ${recipe.bodyBg} flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans`}>
      <div className="w-full max-w-xl relative z-10 space-y-6 text-center">
        {/* Error Hero Icon */}
        <div className="space-y-3">
          <div className="w-24 h-24 mx-auto rounded-3xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shadow-inner animate-pulse">
            <AlertTriangle className="w-12 h-12" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-mono text-rose-400 font-bold tracking-widest uppercase">
              STATUS CODE: 503 SERVICE UNAVAILABLE
            </span>
            <h1 className={`text-2xl font-extrabold tracking-tight ${recipe.textPrimary}`}>
              Quantum Shard Enclave Timeout
            </h1>
            <p className={`text-xs max-w-md mx-auto ${recipe.textSecondary}`}>
              The requested compute shard (NODE-08-ALPHA) failed to respond within the 2,500ms zero-trust SLA window.
            </p>
          </div>
        </div>

        {/* Retry State or Actions Card */}
        <div className={`p-6 rounded-3xl border ${recipe.cardBorder} ${recipe.cardBg} backdrop-blur-xl shadow-2xl space-y-4 text-left`}>
          {retrySuccess ? (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Route recovered! Subkey re-authenticated on backup shard.</span>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={handleRetry}
                disabled={isRetrying}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center gap-2 transition-all shadow-md"
              >
                {isRetrying ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Attempting Shard Reconnection...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    <span>Retry Diagnostic Handshake</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setShowStackTrace(!showStackTrace)}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-mono"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>{showStackTrace ? 'Hide Stack Trace' : 'View Cryptographic Trace'}</span>
                {showStackTrace ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
          )}

          {showStackTrace && (
            <pre className="p-4 rounded-2xl bg-black/80 border border-rose-900/40 text-[11px] font-mono text-rose-300 overflow-x-auto leading-relaxed">
{`[ApexError 0x7FA29B]: Shard Handshake Timeout
  at EnclaveClient.dispatchRPC (/src/core/enclave.ts:142:19)
  at async RouteTelemetryPacket (/src/ingress/router.ts:88:5)
  at async ShardManager.acquireLock (/src/core/shards.ts:312:12)
Timestamp: 2026-08-28T05:26:32.418Z
Trace ID: trc-94182-bf42-9901`}
            </pre>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-center gap-4 text-xs">
          <a href="#" className="text-slate-400 hover:text-white flex items-center gap-1">
            <Home className="w-3.5 h-3.5" /> Return to Dashboard
          </a>
          <span className="text-slate-700">•</span>
          <a href="#" className="text-slate-400 hover:text-white flex items-center gap-1">
            <LifeBuoy className="w-3.5 h-3.5" /> Contact Incident Support
          </a>
        </div>
      </div>
    </div>
  );
};
