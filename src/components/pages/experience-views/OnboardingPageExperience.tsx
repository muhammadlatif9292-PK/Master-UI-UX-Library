/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Compass,
  Cpu,
  Layers,
  Shield,
  Play,
  Database,
  Rocket,
} from 'lucide-react';
import { PageStyleRecipe } from '../recipes';

interface Props {
  recipe: PageStyleRecipe;
}

export const OnboardingPageExperience: React.FC<Props> = ({ recipe }) => {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [completedItems, setCompletedItems] = useState<string[]>(['profile']);

  const toggleItem = (id: string) => {
    if (completedItems.includes(id)) {
      setCompletedItems(completedItems.filter((i) => i !== id));
    } else {
      setCompletedItems([...completedItems, id]);
    }
  };

  const steps = [
    {
      num: 1,
      title: 'Welcome to Apex Telemetry',
      desc: 'Let us tour the distributed telemetry matrix and configure your first compute enclave.',
      icon: Compass,
    },
    {
      num: 2,
      title: 'Connect Your First GPU Cluster',
      desc: 'Link NVIDIA H100 or Quantum Simulator nodes with zero-configuration agent daemons.',
      icon: Cpu,
    },
    {
      num: 3,
      title: 'Define Zero-Trust Security Policies',
      desc: 'Enforce hardware-backed 2FA and role-based cryptographic signing across your team.',
      icon: Shield,
    },
    {
      num: 4,
      title: 'Launch Your First Multi-Agent Pipeline',
      desc: 'Deploy Gemini 3.7 cognitive agents with live thinking traces and telemetry monitoring.',
      icon: Rocket,
    },
  ];

  const current = steps[activeStep - 1];
  const Icon = current.icon;

  return (
    <div className={`w-full min-h-[850px] ${recipe.bodyBg} flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans`}>
      <div className="w-full max-w-2xl relative z-10 space-y-6">
        {/* Onboarding Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
            <Icon className="w-8 h-8" />
          </div>
          <h1 className={`text-2xl font-extrabold tracking-tight ${recipe.textPrimary}`}>
            {current.title}
          </h1>
          <p className={`text-xs max-w-md mx-auto ${recipe.textSecondary}`}>
            {current.desc}
          </p>
        </div>

        {/* Step Progress Bar */}
        <div className="grid grid-cols-4 gap-2">
          {steps.map((s) => (
            <div key={s.num} className="space-y-1.5">
              <div
                className={`h-1.5 rounded-full transition-all ${
                  activeStep >= s.num ? 'bg-indigo-500 shadow-sm shadow-indigo-500/50' : 'bg-slate-800'
                }`}
              />
              <span className={`text-[10px] font-mono block text-center ${activeStep >= s.num ? 'text-indigo-400 font-bold' : 'text-slate-600'}`}>
                STEP {s.num}
              </span>
            </div>
          ))}
        </div>

        {/* Interactive Step Card */}
        <div className={`p-8 rounded-3xl border ${recipe.cardBorder} ${recipe.cardBg} backdrop-blur-xl shadow-2xl space-y-6`}>
          {activeStep === 1 && (
            <div className="space-y-4">
              <h4 className="font-bold text-sm text-white">Quick Start Checklist</h4>
              <div className="space-y-2">
                {[
                  { id: 'profile', label: 'Configure researcher credentials & public SSH key' },
                  { id: 'nodes', label: 'Authorize cluster node discovery protocol' },
                  { id: 'telemetry', label: 'Subscribe to real-time P99 latency alerts' },
                  { id: 'sample-data', label: 'Seed workspace with sample quantum spectroscopy dataset' },
                ].map((item) => {
                  const isDone = completedItems.includes(item.id);
                  return (
                    <button
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between text-xs transition-all ${
                        isDone
                          ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                          : 'border-slate-800 bg-black/30 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span>{item.label}</span>
                      <CheckCircle2 className={`w-4 h-4 ${isDone ? 'text-emerald-400' : 'text-slate-600'}`} />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-black/60 border border-slate-800 font-mono text-xs text-indigo-300 space-y-2">
                <div className="text-slate-500">// Run this command on your compute node:</div>
                <div className="text-white font-bold select-all bg-slate-900 p-2.5 rounded-xl border border-slate-700">
                  curl -sSL https://get.apex-telemetry.io/agent | sh --enclave=quantum-alpha
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Waiting for daemon handshake ping...</span>
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div className="space-y-3 text-xs text-slate-300">
              <p>Select the default authorization mode for your research team:</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/40 space-y-1">
                  <span className="font-bold text-white block">Strict Zero-Trust</span>
                  <span className="text-[11px] text-slate-400">Hardware YubiKey required for every dispatch</span>
                </div>
                <div className="p-4 rounded-2xl bg-black/40 border border-slate-800 space-y-1">
                  <span className="font-bold text-white block">Standard RBAC</span>
                  <span className="text-[11px] text-slate-400">Time-based JWT tokens with 8hr expiry</span>
                </div>
              </div>
            </div>
          )}

          {activeStep === 4 && (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
              <Sparkles className="w-10 h-10 text-emerald-400 mx-auto" />
              <h3 className="font-bold text-white text-base">Onboarding Complete!</h3>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                Your workspace is configured with high-performance telemetry pipelines and AI cognitive tools.
              </p>
            </div>
          )}

          {/* Navigation Stepper */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            {activeStep > 1 ? (
              <button
                type="button"
                onClick={() => setActiveStep(activeStep - 1)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Previous
              </button>
            ) : <div />}

            {activeStep < 4 ? (
              <button
                type="button"
                onClick={() => setActiveStep(activeStep + 1)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 ${recipe.accentBg}`}
              >
                Next Step <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => alert('Launching full dashboard experience...')}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-black flex items-center gap-2 shadow-lg"
              >
                <Rocket className="w-4 h-4" /> Enter Workspace Dashboard
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
