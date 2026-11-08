/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Shield, KeyRound, Lock, ArrowRight, Fingerprint, CheckCircle2, AlertCircle, Sparkles, RefreshCw, Cpu, Layers } from 'lucide-react';
import { PageStyleRecipe } from '../recipes';

interface Props {
  recipe: PageStyleRecipe;
}

export const LoginPageExperience: React.FC<Props> = ({ recipe }) => {
  const [authMethod, setAuthMethod] = useState<'password' | 'biometric' | 'magic-link' | 'sso'>('password');
  const [email, setEmail] = useState('lead.researcher@apex-telemetry.io');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState(['5', '8', '2', '', '', '']);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1200);
  };

  return (
    <div className={`w-full min-h-[720px] ${recipe.bodyBg} flex flex-col items-center justify-center p-6 relative overflow-hidden`}>
      {/* Subtle Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header telemetry / node ID */}
      <div className="absolute top-6 left-6 flex items-center gap-2 text-xs font-mono text-slate-500">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>NODE-SEC-492 // ZERO-TRUST AUTH PROXY</span>
      </div>

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Brand Lockup */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 shadow-inner">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className={`text-2xl font-extrabold tracking-tight ${recipe.textPrimary}`}>
            Apex Telemetry Portal
          </h1>
          <p className={`text-xs ${recipe.textSecondary}`}>
            Cryptographically verified single-sign-on & hardware access gateway
          </p>
        </div>

        {/* Authentication Container Card */}
        <div className={`p-8 rounded-3xl border ${recipe.cardBorder} ${recipe.cardBg} backdrop-blur-xl shadow-2xl space-y-6`}>
          {/* Method Selector Tabs */}
          <div className="grid grid-cols-4 gap-1 p-1 bg-black/40 rounded-2xl border border-white/5 text-xs font-medium">
            <button
              onClick={() => { setAuthMethod('password'); setSuccess(false); }}
              className={`py-1.5 rounded-xl transition-all ${authMethod === 'password' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              Password
            </button>
            <button
              onClick={() => { setAuthMethod('biometric'); setSuccess(false); }}
              className={`py-1.5 rounded-xl transition-all ${authMethod === 'biometric' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              Passkey
            </button>
            <button
              onClick={() => { setAuthMethod('magic-link'); setSuccess(false); }}
              className={`py-1.5 rounded-xl transition-all ${authMethod === 'magic-link' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              Magic Link
            </button>
            <button
              onClick={() => { setAuthMethod('sso'); setSuccess(false); }}
              className={`py-1.5 rounded-xl transition-all ${authMethod === 'sso' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              Org SSO
            </button>
          </div>

          {success ? (
            <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h3 className="font-bold text-white text-base">Session Cryptographically Verified</h3>
              <p className="text-xs text-slate-300">
                JWT certificate authorized for Node Cluster Alpha. Redirecting to workspace...
              </p>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-4/5 animate-pulse" />
              </div>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              {authMethod === 'password' && (
                <>
                  <div className="space-y-1.5">
                    <label className={`text-xs font-semibold ${recipe.textSecondary}`}>
                      Research Account Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-xl text-xs font-mono ${recipe.inputBg} border ${recipe.inputBorder} ${recipe.textPrimary} outline-none ${recipe.ringFocus}`}
                        placeholder="user@institution.org"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className={`text-xs font-semibold ${recipe.textSecondary}`}>
                        Hardware Security Pin / Password
                      </label>
                      <a href="#" className={`text-[11px] ${recipe.accentText} hover:underline`}>
                        Reset credentials?
                      </a>
                    </div>
                    <div className="relative">
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`w-full px-4 py-2.5 rounded-xl text-xs font-mono ${recipe.inputBg} border ${recipe.inputBorder} ${recipe.textPrimary} outline-none ${recipe.ringFocus}`}
                        placeholder="••••••••••••"
                        required
                      />
                    </div>
                  </div>

                  {/* 2FA Stepper Blocks */}
                  <div className="space-y-1.5 pt-1">
                    <label className={`text-xs font-semibold ${recipe.textSecondary} flex items-center justify-between`}>
                      <span>Authenticator 6-Digit Token</span>
                      <span className="text-[10px] text-emerald-400 font-mono">FIDO2 SYNCED</span>
                    </label>
                    <div className="grid grid-cols-6 gap-2">
                      {twoFactorCode.map((digit, idx) => (
                        <input
                          key={idx}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => {
                            const newCodes = [...twoFactorCode];
                            newCodes[idx] = e.target.value;
                            setTwoFactorCode(newCodes);
                          }}
                          className={`h-11 text-center font-mono font-bold text-sm rounded-xl ${recipe.inputBg} border ${recipe.inputBorder} ${recipe.textPrimary} outline-none ${recipe.ringFocus}`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-400">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-0"
                      />
                      <span>Enforce hardware session persistence</span>
                    </label>
                  </div>
                </>
              )}

              {authMethod === 'biometric' && (
                <div className="py-6 text-center space-y-4">
                  <div className="w-20 h-20 mx-auto rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-inner animate-pulse">
                    <Fingerprint className="w-10 h-10" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-white text-sm">Touch WebAuthn Touch ID / YubiKey</h4>
                    <p className="text-xs text-slate-400">
                      Secure biometric enclave handshake requested
                    </p>
                  </div>
                </div>
              )}

              {authMethod === 'magic-link' && (
                <div className="space-y-3 py-2">
                  <p className="text-xs text-slate-400">
                    We will send an encrypted one-time authorization link to your validated research email.
                  </p>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-4 py-2.5 rounded-xl text-xs font-mono ${recipe.inputBg} border ${recipe.inputBorder} ${recipe.textPrimary} outline-none`}
                    placeholder="name@organization.edu"
                  />
                </div>
              )}

              {authMethod === 'sso' && (
                <div className="space-y-3 py-2">
                  <p className="text-xs text-slate-400">
                    Authenticate via Enterprise SAML 2.0 or OIDC Identity Provider:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <button type="button" className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-indigo-500 text-xs font-semibold flex items-center justify-center gap-2 text-white">
                      <Cpu className="w-4 h-4 text-indigo-400" />
                      <span>Okta Verify</span>
                    </button>
                    <button type="button" className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-indigo-500 text-xs font-semibold flex items-center justify-center gap-2 text-white">
                      <Layers className="w-4 h-4 text-cyan-400" />
                      <span>Azure AD</span>
                    </button>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-lg ${recipe.accentBg}`}
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying Cryptographic Handshake...</span>
                  </>
                ) : (
                  <>
                    <span>Authenticate & Access Workspace</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Footer Security Badges */}
          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-emerald-400" /> AES-256 GCM
            </span>
            <span>Hardware Token: FIPS 140-3</span>
          </div>
        </div>

        {/* Bottom Signup Link */}
        <p className="text-center text-xs text-slate-400">
          Need provisioned access for your research group?{' '}
          <a href="#" className={`font-semibold ${recipe.accentText} hover:underline`}>
            Request Workspace Provisioning
          </a>
        </p>
      </div>
    </div>
  );
};
