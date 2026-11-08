/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Settings,
  Shield,
  Key,
  Users,
  CreditCard,
  Bell,
  Lock,
  Globe,
  Sliders,
  CheckCircle2,
  Trash2,
  Copy,
  Check,
} from 'lucide-react';
import { PageStyleRecipe } from '../recipes';
import { AccountSettings } from '../../../design-system/general/components/AccountSettings';
import { PermissionMatrix } from '../../../design-system/general/components/PermissionMatrix';

interface Props {
  recipe: PageStyleRecipe;
}

export const SettingsPageExperience: React.FC<Props> = ({ recipe }) => {
  const [activeSection, setActiveSection] = useState<'account' | 'permissions' | 'billing' | 'api-keys'>('account');

  return (
    <div className={`w-full min-h-[850px] ${recipe.bodyBg} flex flex-col font-sans`}>
      {/* Settings Header */}
      <header className={`px-6 py-4 border-b ${recipe.divider} ${recipe.headerBg} flex flex-col sm:flex-row sm:items-center justify-between gap-4 sticky top-0 z-20`}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
            <Settings className="w-5 h-5" />
          </div>
          <div>
            <h1 className={`font-extrabold text-lg ${recipe.textPrimary}`}>
              Workspace & Security Preferences
            </h1>
            <p className={`text-xs ${recipe.textSecondary}`}>
              Granular hardware 2FA, RBAC authority matrix, and API token governance
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-2xl border border-slate-800 text-xs font-semibold">
          <button
            onClick={() => setActiveSection('account')}
            className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all ${
              activeSection === 'account' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Security & 2FA</span>
          </button>
          <button
            onClick={() => setActiveSection('permissions')}
            className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all ${
              activeSection === 'permissions' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>RBAC Matrix</span>
          </button>
          <button
            onClick={() => setActiveSection('billing')}
            className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all ${
              activeSection === 'billing' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Compute Tier</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="p-6 max-w-7xl mx-auto w-full space-y-6 flex-1">
        {activeSection === 'account' && (
          <div className="space-y-6">
            <AccountSettings />
          </div>
        )}

        {activeSection === 'permissions' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-md space-y-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-400" />
                <span>Zero-Trust Role-Based Access Control (RBAC)</span>
              </h3>
              <p className="text-xs text-slate-400">
                Cryptographic authorization matrix defining role privileges across telemetry ingress, ML deployment, and administrative actions.
              </p>
            </div>
            <PermissionMatrix />
          </div>
        )}

        {activeSection === 'billing' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl border border-indigo-500/40 bg-indigo-950/20 backdrop-blur-md space-y-4">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-950 border border-indigo-700 text-indigo-300 text-[10px] font-mono font-bold">
                ACTIVE PLAN
              </span>
              <h3 className="text-xl font-extrabold text-white">Quantum Dedicated</h3>
              <div className="text-2xl font-mono font-bold text-indigo-400">$2,400 <span className="text-xs text-slate-400">/ mo</span></div>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 128 Dedicated GPU Nodes</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Continuous Audit Logging</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Zero-Trust Security Enclave</li>
              </ul>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
