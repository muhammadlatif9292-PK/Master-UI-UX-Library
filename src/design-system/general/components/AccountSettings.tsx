/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useGeneral } from '../GeneralContext';
import {
  Shield,
  Bell,
  Key,
  Palette,
  Trash2,
  CheckCircle2,
  Copy,
  Eye,
  EyeOff,
  Save,
  AlertTriangle,
  Smartphone,
  Mail,
  Zap,
} from 'lucide-react';

export const AccountSettings: React.FC = () => {
  const { recipeConfig, stateMode } = useGeneral();
  const [activeTab, setActiveTab] = useState<'security' | 'api' | 'notifications' | 'danger'>('security');

  // Security Settings State
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState('30');
  const [ipRestricted, setIpRestricted] = useState(false);

  // API Key State
  const [showKey, setShowKey] = useState(false);
  const [apiKey, setApiKey] = useState('sk_prod_live_89a42f7c0019b8823d');
  const [copied, setCopied] = useState(false);

  // Notification toggles
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [pushTelemetry, setPushTelemetry] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`rounded-3xl border ${recipeConfig.cardBg} ${recipeConfig.border} ${recipeConfig.fontFamily} shadow-2xl overflow-hidden select-none max-w-3xl`}>
      {/* Settings Navigation Tabs */}
      <div className="flex border-b border-white/5 bg-black/40 text-xs font-bold text-slate-400 overflow-x-auto">
        <button
          onClick={() => setActiveTab('security')}
          className={`px-5 py-3.5 border-b-2 flex items-center gap-2 transition-all flex-shrink-0 ${
            activeTab === 'security'
              ? `border-indigo-400 ${recipeConfig.textPrimary} bg-white/5`
              : 'border-transparent hover:text-white'
          }`}
        >
          <Shield className="w-4 h-4 text-indigo-400" />
          <span>Security & 2FA</span>
        </button>

        <button
          onClick={() => setActiveTab('api')}
          className={`px-5 py-3.5 border-b-2 flex items-center gap-2 transition-all flex-shrink-0 ${
            activeTab === 'api'
              ? `border-indigo-400 ${recipeConfig.textPrimary} bg-white/5`
              : 'border-transparent hover:text-white'
          }`}
        >
          <Key className="w-4 h-4 text-cyan-400" />
          <span>API Access Keys</span>
        </button>

        <button
          onClick={() => setActiveTab('notifications')}
          className={`px-5 py-3.5 border-b-2 flex items-center gap-2 transition-all flex-shrink-0 ${
            activeTab === 'notifications'
              ? `border-indigo-400 ${recipeConfig.textPrimary} bg-white/5`
              : 'border-transparent hover:text-white'
          }`}
        >
          <Bell className="w-4 h-4 text-amber-400" />
          <span>Notifications</span>
        </button>

        <button
          onClick={() => setActiveTab('danger')}
          className={`px-5 py-3.5 border-b-2 flex items-center gap-2 transition-all flex-shrink-0 ${
            activeTab === 'danger'
              ? `border-rose-500 text-rose-300 bg-rose-950/20`
              : 'border-transparent text-rose-400/70 hover:text-rose-300'
          }`}
        >
          <Trash2 className="w-4 h-4 text-rose-400" />
          <span>Danger Zone</span>
        </button>
      </div>

      {/* Main Settings Body */}
      <div className="p-6 space-y-6">
        {activeTab === 'security' && (
          <div className="space-y-5">
            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <h4 className={`font-bold text-sm ${recipeConfig.textPrimary}`}>
                    Two-Factor Hardware Token (FIDO2 / WebAuthn)
                  </h4>
                </div>
                <p className={`text-xs ${recipeConfig.textSecondary}`}>
                  Requires a physical security key or TOTP authenticator app for signing authorization payloads.
                </p>
              </div>

              {/* Toggle Switch */}
              <button
                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                className={`w-12 h-6 rounded-full transition-colors p-0.5 flex-shrink-0 ${
                  twoFactorEnabled ? 'bg-emerald-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    twoFactorEnabled ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <h4 className={`font-bold text-sm ${recipeConfig.textPrimary}`}>
                  Autonomous Session Inactivity Timeout
                </h4>
                <p className={`text-xs ${recipeConfig.textSecondary}`}>
                  Automatically terminate active workspace token if idle.
                </p>
              </div>

              <select
                value={sessionTimeout}
                onChange={(e) => setSessionTimeout(e.target.value)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-mono ${recipeConfig.inputBg} outline-none`}
              >
                <option value="15">15 Minutes</option>
                <option value="30">30 Minutes</option>
                <option value="60">1 Hour</option>
                <option value="240">4 Hours</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === 'api' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className={`text-xs font-mono font-bold uppercase ${recipeConfig.textSecondary}`}>
                Primary Production API Key
              </label>
              <div className="flex items-center gap-2">
                <div className={`flex-1 flex items-center justify-between px-3 py-2 rounded-xl border font-mono text-xs ${recipeConfig.inputBg}`}>
                  <span>{showKey ? apiKey : '••••••••••••••••••••••••••••••••••••••••'}</span>
                  <button
                    onClick={() => setShowKey(!showKey)}
                    className="text-slate-400 hover:text-white"
                  >
                    {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                <button
                  onClick={handleCopyKey}
                  className={`px-4 py-2 rounded-xl border font-semibold text-xs flex items-center gap-1.5 transition-all ${
                    copied
                      ? 'bg-emerald-950 border-emerald-700 text-emerald-300'
                      : `${recipeConfig.accentBg}`
                  }`}
                >
                  {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <div className="p-3 bg-amber-950/40 border border-amber-800/60 rounded-xl text-xs text-amber-200 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>
                Do not commit API credentials to client-side bundles or public repositories. Store in server environment variables.
              </span>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-4">
            {[
              {
                title: 'High-Severity Cluster Anomaly Alerts',
                desc: 'Immediate dispatch on node failure or quantum decoherence spike.',
                checked: emailAlerts,
                setter: setEmailAlerts,
              },
              {
                title: 'Real-time WebSocket Telemetry Push',
                desc: 'Continuous event dispatch stream in active workspace sessions.',
                checked: pushTelemetry,
                setter: setPushTelemetry,
              },
              {
                title: 'Weekly Optimization & Model Benchmark Digest',
                desc: 'Consolidated performance analysis and parameter recommendations.',
                checked: weeklyDigest,
                setter: setWeeklyDigest,
              },
            ].map((n, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <div className={`font-bold text-xs ${recipeConfig.textPrimary}`}>{n.title}</div>
                  <div className={`text-[11px] ${recipeConfig.textSecondary}`}>{n.desc}</div>
                </div>
                <button
                  onClick={() => n.setter(!n.checked)}
                  className={`w-11 h-6 rounded-full transition-colors p-0.5 flex-shrink-0 ${
                    n.checked ? 'bg-indigo-600' : 'bg-slate-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      n.checked ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'danger' && (
          <div className="p-5 rounded-2xl bg-rose-950/30 border border-rose-800/80 space-y-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-sm text-rose-200">Decommission Cluster Account</h4>
                <p className="text-xs text-rose-300/80 mt-1 leading-relaxed">
                  Permanently delete your workspace organization, revoke all live API keys, and purge fine-tuned checkpoints from cold storage.
                </p>
              </div>
            </div>

            <button className="px-4 py-2 bg-rose-900 hover:bg-rose-800 text-white rounded-xl text-xs font-bold transition-all shadow-lg flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              <span>Purge Workspace Data</span>
            </button>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
          <button className={`px-4 py-2 rounded-xl text-xs font-semibold ${recipeConfig.textSecondary} hover:text-white`}>
            Discard Changes
          </button>
          <button className={`px-5 py-2 rounded-xl text-xs font-bold ${recipeConfig.accentBg} flex items-center gap-1.5 shadow-lg`}>
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>
      </div>
    </div>
  );
};
