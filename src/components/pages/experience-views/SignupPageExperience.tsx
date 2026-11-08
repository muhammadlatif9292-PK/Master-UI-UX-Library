/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { UserPlus, Building, ShieldCheck, Check, ArrowRight, ArrowLeft, Sparkles, CheckCircle2, Server, Key, Lock } from 'lucide-react';
import { PageStyleRecipe } from '../recipes';

interface Props {
  recipe: PageStyleRecipe;
}

export const SignupPageExperience: React.FC<Props> = ({ recipe }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [formData, setFormData] = useState({
    fullName: 'Dr. Elena Rostova',
    email: 'e.rostova@quantum-lab.org',
    role: 'Principal Investigator',
    organizationName: 'Quantum Dynamics Institute',
    clusterTier: 'High-Performance GPU Cluster',
    dataRegion: 'US-East (Virginia - ISO-27001)',
    twoFactorEnforced: true,
  });

  return (
    <div className={`w-full min-h-[720px] ${recipe.bodyBg} flex flex-col items-center justify-center p-6 relative overflow-hidden`}>
      <div className="w-full max-w-xl relative z-10 space-y-6">
        {/* Header Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
            <UserPlus className="w-7 h-7" />
          </div>
          <h1 className={`text-2xl font-extrabold tracking-tight ${recipe.textPrimary}`}>
            Create Research Workspace
          </h1>
          <p className={`text-xs ${recipe.textSecondary}`}>
            Provision a multi-tenant telemetry and AI compute environment
          </p>
        </div>

        {/* Step Progression Bar */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { num: 1, label: 'Identity' },
            { num: 2, label: 'Organization' },
            { num: 3, label: 'Cluster Tier' },
            { num: 4, label: 'Verify' },
          ].map((s) => (
            <div key={s.num} className="space-y-1.5">
              <div
                className={`h-1.5 rounded-full transition-all ${
                  step >= s.num ? 'bg-indigo-500 shadow-sm shadow-indigo-500/50' : 'bg-slate-800'
                }`}
              />
              <div className="flex items-center gap-1.5 text-[11px] font-mono">
                <span className={step >= s.num ? 'text-indigo-400 font-bold' : 'text-slate-600'}>
                  0{s.num}
                </span>
                <span className={step >= s.num ? recipe.textPrimary : 'text-slate-500'}>
                  {s.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className={`p-8 rounded-3xl border ${recipe.cardBorder} ${recipe.cardBg} backdrop-blur-xl shadow-2xl space-y-6`}>
          {step === 1 && (
            <div className="space-y-4">
              <h3 className={`text-sm font-bold ${recipe.textPrimary} flex items-center gap-2`}>
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
                Researcher Credentials
              </h3>
              <div className="space-y-3">
                <div>
                  <label className={`text-xs font-semibold ${recipe.textSecondary}`}>Full Name</label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className={`w-full mt-1 px-4 py-2.5 rounded-xl text-xs font-mono ${recipe.inputBg} border ${recipe.inputBorder} ${recipe.textPrimary} outline-none ${recipe.ringFocus}`}
                  />
                </div>
                <div>
                  <label className={`text-xs font-semibold ${recipe.textSecondary}`}>Institutional Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full mt-1 px-4 py-2.5 rounded-xl text-xs font-mono ${recipe.inputBg} border ${recipe.inputBorder} ${recipe.textPrimary} outline-none ${recipe.ringFocus}`}
                  />
                </div>
                <div>
                  <label className={`text-xs font-semibold ${recipe.textSecondary}`}>Domain Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className={`w-full mt-1 px-4 py-2.5 rounded-xl text-xs font-mono ${recipe.inputBg} border ${recipe.inputBorder} ${recipe.textPrimary} outline-none ${recipe.ringFocus}`}
                  >
                    <option>Principal Investigator</option>
                    <option>Quantum Computing Researcher</option>
                    <option>ML Infrastructure Engineer</option>
                    <option>Bio-Informatics Data Scientist</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className={`text-sm font-bold ${recipe.textPrimary} flex items-center gap-2`}>
                <Building className="w-4 h-4 text-indigo-400" />
                Laboratory & Institution Profile
              </h3>
              <div className="space-y-3">
                <div>
                  <label className={`text-xs font-semibold ${recipe.textSecondary}`}>Institute / Enterprise Name</label>
                  <input
                    type="text"
                    value={formData.organizationName}
                    onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                    className={`w-full mt-1 px-4 py-2.5 rounded-xl text-xs font-mono ${recipe.inputBg} border ${recipe.inputBorder} ${recipe.textPrimary} outline-none ${recipe.ringFocus}`}
                  />
                </div>
                <div>
                  <label className={`text-xs font-semibold ${recipe.textSecondary}`}>Compliance Standard</label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <div className="p-3 rounded-xl bg-slate-800/60 border border-indigo-500/40 text-xs text-slate-200">
                      <span className="font-bold text-indigo-300 block">SOC-2 Type II</span>
                      <span className="text-[10px] text-slate-400">Continuous cryptographic logging</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700 text-xs text-slate-200">
                      <span className="font-bold text-slate-300 block">HIPAA / GxP</span>
                      <span className="text-[10px] text-slate-400">Clinical bio-data isolation</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className={`text-sm font-bold ${recipe.textPrimary} flex items-center gap-2`}>
                <Server className="w-4 h-4 text-indigo-400" />
                Compute Cluster & Region Allocation
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { name: 'Standard Cluster', specs: '8x vCPU / 32GB RAM / 100GB NVMe', tag: 'Included' },
                  { name: 'High-Performance GPU', specs: '4x NVIDIA H100 / 128GB Unified VRAM', tag: 'Recommended' },
                  { name: 'Quantum Simulation Pod', specs: 'State Vector / 64 Qubit Simulator', tag: 'Specialized' },
                  { name: 'Edge Telemetry Ingress', specs: 'Low-latency distributed broker nodes', tag: 'Real-time' },
                ].map((tier) => (
                  <button
                    key={tier.name}
                    type="button"
                    onClick={() => setFormData({ ...formData, clusterTier: tier.name })}
                    className={`p-3.5 rounded-2xl text-left border transition-all ${
                      formData.clusterTier === tier.name
                        ? 'border-indigo-500 bg-indigo-500/10 shadow-md'
                        : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-white">{tier.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 font-mono">
                        {tier.tag}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">{tier.specs}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Workspace Architecture Ready to Deploy</span>
                </div>
                <p className="text-xs text-slate-300">
                  Provisioning dedicated tenant container for <strong>{formData.organizationName}</strong> under <strong>{formData.fullName}</strong>.
                </p>
              </div>

              <div className="space-y-2 text-xs font-mono bg-black/40 p-4 rounded-2xl border border-slate-800 text-slate-300">
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-500">Principal Identity:</span>
                  <span>{formData.email}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-500">Assigned Role:</span>
                  <span className="text-indigo-400">{formData.role}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Compute Allocation:</span>
                  <span className="text-emerald-400">{formData.clusterTier}</span>
                </div>
              </div>
            </div>
          )}

          {/* Stepper Navigation Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((step - 1) as any)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
            ) : <div />}

            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep((step + 1) as any)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 ${recipe.accentBg}`}
              >
                Continue <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => alert('Provisioning workspace cluster nodes...')}
                className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-black flex items-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <Sparkles className="w-4 h-4" /> Provision & Launch Workspace
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
