/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useTheme } from '../../design-system/tokens/ThemeContext';
import { useSound } from '../../design-system/sound/SoundContext';
import { useHaptics } from '../../design-system/haptics/HapticContext';
import { CatalogEntry } from '../../design-system/catalog/catalogTypes';
import { CodeViewer } from '../CodeViewer';
import { AiHandoffGenerator } from '../AiHandoffGenerator';
import {
  Lock,
  Mail,
  Key,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Shield,
  Smartphone,
  Terminal,
  Sparkles,
  Bot,
  User,
  ArrowRight,
  RefreshCw,
  FileCode,
  Cpu,
  Eye as EyeIcon,
} from 'lucide-react';

interface AuthVariantPreviewProps {
  entry: CatalogEntry;
  onClose?: () => void;
}

type AuthSubMode = 'login' | 'signup' | 'forgot' | 'reset' | 'otp' | 'verification' | 'social' | 'passcode' | 'recovery';
type MascotState = 'idle' | 'username-focus' | 'username-typing' | 'password-focus' | 'password-visible' | 'submitting' | 'success' | 'error';

export function AuthVariantPreview({ entry, onClose }: AuthVariantPreviewProps) {
  const { theme } = useTheme();
  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();

  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'handoff'>('preview');
  const [subMode, setSubMode] = useState<AuthSubMode>('login');
  
  // Interactive form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Mascot state for variant 1
  const [mascotState, setMascotState] = useState<MascotState>('idle');

  const handleActionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (entry.id === 'auth-cinematic-mascot') {
      setMascotState('submitting');
    }
    setLoading(true);
    setStatus('idle');
    playSound('press', 'MICRO');
    triggerHaptic('press');

    setTimeout(() => {
      setLoading(false);
      if (username.includes('error') || password === 'wrong') {
        setStatus('error');
        setErrorMessage('Invalid credentials or authentication failed.');
        if (entry.id === 'auth-cinematic-mascot') setMascotState('error');
        playSound('error', 'STATE');
        triggerHaptic('error');
      } else {
        setStatus('success');
        if (entry.id === 'auth-cinematic-mascot') setMascotState('success');
        playSound('success', 'STATE');
        triggerHaptic('success');
      }
    }, 1200);
  };

  const handleUsernameFocus = () => {
    if (entry.id === 'auth-cinematic-mascot') setMascotState('username-focus');
  };

  const handleUsernameChange = (val: string) => {
    setUsername(val);
    if (entry.id === 'auth-cinematic-mascot') setMascotState(val.length > 0 ? 'username-typing' : 'username-focus');
  };

  const handlePasswordFocus = () => {
    if (entry.id === 'auth-cinematic-mascot') setMascotState('password-focus');
  };

  const toggleShowPassword = () => {
    const next = !showPassword;
    setShowPassword(next);
    if (entry.id === 'auth-cinematic-mascot') setMascotState(next ? 'password-visible' : 'password-focus');
  };

  return (
    <div className={`p-6 md:p-12 rounded-3xl ${theme.surface.primary} border ${theme.border.default} space-y-8 shadow-2xl max-w-5xl mx-auto`}>
      {/* Header & View Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase">
              {entry.family} Family • {entry.visualStyle}
            </span>
            <span className="text-xs font-mono opacity-60">v{entry.version}</span>
          </div>
          <h2 className="text-2xl font-bold text-white">{entry.name}</h2>
          <p className="text-xs opacity-70 max-w-2xl">{entry.description}</p>
        </div>

        <div className="flex items-center gap-2 bg-black/30 p-1.5 rounded-2xl border border-white/10 shrink-0">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-2 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all ${
              activeTab === 'preview' ? 'bg-cyan-500 text-zinc-950 font-bold shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <EyeIcon className="w-4 h-4" /> Live Preview
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-4 py-2 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all ${
              activeTab === 'code' ? 'bg-cyan-500 text-zinc-950 font-bold shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <FileCode className="w-4 h-4" /> Code
          </button>
          <button
            onClick={() => setActiveTab('handoff')}
            className={`px-4 py-2 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all ${
              activeTab === 'handoff' ? 'bg-purple-500 text-zinc-950 font-bold shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Cpu className="w-4 h-4" /> AI Handoff
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-zinc-300"
            >
              Close
            </button>
          )}
        </div>
      </div>

      {activeTab === 'code' ? (
        <CodeViewer entry={entry} />
      ) : activeTab === 'handoff' ? (
        <AiHandoffGenerator entry={entry} />
      ) : (
        <div className="space-y-6">
          {/* Subcomponent Mode Bar */}
          <div className="flex flex-wrap items-center gap-2 bg-black/30 p-2 rounded-2xl border border-white/10">
            <span className="text-[10px] font-mono uppercase opacity-60 px-2">Subcomponent:</span>
            {(['login', 'signup', 'forgot', 'otp', 'verification', 'social', 'passcode', 'recovery'] as AuthSubMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setSubMode(mode)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono uppercase transition-all ${
                  subMode === mode
                    ? 'bg-cyan-500 text-zinc-950 font-bold shadow-md'
                    : 'bg-white/5 border border-white/10 text-zinc-300 hover:text-white'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Variant-Specific Interactive Sandbox Container */}
          <div className={`p-8 md:p-12 rounded-3xl relative overflow-hidden transition-all duration-500 shadow-2xl border ${
            entry.id === 'auth-cinematic-mascot' ? 'bg-gradient-to-br from-zinc-900 via-zinc-950 to-indigo-950 border-indigo-500/30' :
            entry.id === 'auth-obsidian-luxury' ? 'bg-zinc-950 border-amber-500/40 shadow-amber-500/10' :
            entry.id === 'auth-aurora-glass' ? 'bg-gradient-to-tr from-cyan-950 via-slate-900 to-purple-950 border-cyan-500/40 backdrop-blur-3xl' :
            entry.id === 'auth-retro-terminal' ? 'bg-zinc-950 border-emerald-500/50 font-mono text-emerald-400 shadow-emerald-500/20' :
            entry.id === 'auth-neo-brutalist' ? 'bg-amber-100 border-4 border-zinc-950 text-zinc-950 shadow-[6px_6px_0px_0px_#09090b]' :
            'bg-zinc-900/90 border-white/10'
          }`}>
            
            {/* If Variant 1: Interactive Mascot Display */}
            {entry.id === 'auth-cinematic-mascot' && (
              <div className="flex flex-col items-center justify-center mb-8 space-y-3">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl shadow-2xl transition-all duration-300 transform ${
                  mascotState === 'idle' ? 'bg-indigo-600/30 border-2 border-indigo-400 scale-100 animate-pulse' :
                  mascotState === 'username-focus' ? 'bg-cyan-600/40 border-2 border-cyan-400 scale-105' :
                  mascotState === 'username-typing' ? 'bg-emerald-600/40 border-2 border-emerald-400 rotate-3 scale-110' :
                  mascotState === 'password-focus' ? 'bg-purple-600/40 border-2 border-purple-400 scale-105' :
                  mascotState === 'password-visible' ? 'bg-amber-600/40 border-2 border-amber-400 -rotate-3' :
                  mascotState === 'submitting' ? 'bg-blue-600/50 border-2 border-blue-400 animate-spin' :
                  mascotState === 'success' ? 'bg-emerald-500/50 border-2 border-emerald-400 scale-125' :
                  'bg-rose-600/50 border-2 border-rose-400 shake'
                }`}>
                  {mascotState === 'success' ? '🥳' :
                   mascotState === 'error' ? '🤖' :
                   mascotState === 'submitting' ? '💫' :
                   mascotState === 'password-visible' ? '🫣' :
                   mascotState === 'password-focus' ? '👀' :
                   mascotState === 'username-typing' ? '✍️' : '🐱'}
                </div>
                <div className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 font-mono text-[11px]">
                  Mascot State: <span className="uppercase font-bold">{mascotState}</span> (Contextual State Engine)
                </div>
              </div>
            )}

            {/* Form Rendering */}
            <div className="max-w-md mx-auto space-y-6">
              <div className="text-center space-y-2">
                <h3 className={`text-xl font-bold ${entry.id === 'auth-neo-brutalist' ? 'text-zinc-950 font-black' : 'text-white'}`}>
                  {subMode === 'login' ? 'Welcome Back' :
                   subMode === 'signup' ? 'Create Account' :
                   subMode === 'forgot' ? 'Reset Password' :
                   subMode === 'otp' ? 'Enter 6-Digit OTP' :
                   subMode === 'passcode' ? 'Enter 4-Digit PIN' : 'Account Recovery'}
                </h3>
                <p className={`text-xs ${entry.id === 'auth-neo-brutalist' ? 'text-zinc-800' : 'opacity-70'}`}>
                  Experience the {entry.name} authentication interaction model.
                </p>
              </div>

              {status === 'success' && (
                <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                  <div>Authentication successful! Token verified and session initialized.</div>
                </div>
              )}

              {status === 'error' && (
                <div className="p-4 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0 text-rose-400" />
                  <div>{errorMessage}</div>
                </div>
              )}

              <form onSubmit={handleActionSubmit} className="space-y-4">
                {subMode !== 'passcode' && subMode !== 'otp' && (
                  <div className="space-y-1.5">
                    <label className={`text-xs font-mono ${entry.id === 'auth-neo-brutalist' ? 'text-zinc-950 font-bold' : 'opacity-70'}`}>
                      Email or Username
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3 w-4 h-4 opacity-50" />
                      <input
                        type="text"
                        required
                        value={username}
                        onFocus={handleUsernameFocus}
                        onChange={(e) => handleUsernameChange(e.target.value)}
                        placeholder="name@example.com (type 'error' to test failure)"
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs focus:outline-none transition-all ${
                          entry.id === 'auth-neo-brutalist'
                            ? 'bg-white border-2 border-zinc-950 text-zinc-950 font-bold shadow-[2px_2px_0px_0px_#09090b]'
                            : 'bg-black/30 border border-white/10 text-white focus:border-cyan-500'
                        }`}
                      />
                    </div>
                  </div>
                )}

                {subMode !== 'forgot' && subMode !== 'otp' && subMode !== 'passcode' && (
                  <div className="space-y-1.5">
                    <label className={`text-xs font-mono ${entry.id === 'auth-neo-brutalist' ? 'text-zinc-950 font-bold' : 'opacity-70'}`}>
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3 w-4 h-4 opacity-50" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onFocus={handlePasswordFocus}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className={`w-full pl-10 pr-10 py-2.5 rounded-xl text-xs focus:outline-none transition-all ${
                          entry.id === 'auth-neo-brutalist'
                            ? 'bg-white border-2 border-zinc-950 text-zinc-950 font-bold shadow-[2px_2px_0px_0px_#09090b]'
                            : 'bg-black/30 border border-white/10 text-white focus:border-cyan-500'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={toggleShowPassword}
                        className="absolute right-3.5 top-3 opacity-60 hover:opacity-100"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                )}

                {subMode === 'passcode' && (
                  <div className="space-y-2 text-center">
                    <label className="text-xs font-mono opacity-70">Enter 4-Digit Passcode PIN</label>
                    <div className="flex justify-center gap-3 pt-2">
                      {[1, 2, 3, 4].map((i) => (
                        <input
                          key={i}
                          type="password"
                          maxLength={1}
                          className="w-12 h-12 text-center text-lg font-bold rounded-xl bg-black/40 border border-white/20 text-white focus:border-cyan-500 focus:outline-none"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {subMode === 'otp' && (
                  <div className="space-y-2 text-center">
                    <label className="text-xs font-mono opacity-70">Enter 6-Digit SMS Verification Code</label>
                    <div className="flex justify-center gap-2 pt-2">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <input
                          key={i}
                          type="text"
                          maxLength={1}
                          className="w-10 h-12 text-center font-bold rounded-lg bg-black/40 border border-white/20 text-white focus:border-cyan-500 focus:outline-none font-mono"
                        />
                      ))}
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg ${
                    entry.id === 'auth-neo-brutalist'
                      ? 'bg-cyan-400 border-2 border-zinc-950 text-zinc-950 shadow-[4px_4px_0px_0px_#09090b] hover:translate-x-0.5 hover:translate-y-0.5'
                      : 'bg-cyan-500 hover:bg-cyan-400 text-zinc-950 shadow-cyan-500/20'
                  }`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Authenticating...
                    </>
                  ) : (
                    <>
                      <span>Continue Securely</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Social Login Options */}
              <div className="space-y-3 pt-4 border-t border-white/10 text-center">
                <span className="text-[10px] font-mono opacity-50 uppercase tracking-widest">Or continue with</span>
                <div className="grid grid-cols-3 gap-2">
                  {['Google', 'GitHub', 'Apple'].map((provider) => (
                    <button
                      key={provider}
                      type="button"
                      onClick={() => {
                        playSound('selection', 'MICRO');
                        triggerHaptic('selection');
                        setStatus('success');
                      }}
                      className={`py-2 rounded-xl text-xs font-mono transition-all ${
                        entry.id === 'auth-neo-brutalist'
                          ? 'bg-white border-2 border-zinc-950 font-bold text-zinc-950 shadow-[2px_2px_0px_0px_#09090b]'
                          : 'bg-white/5 border border-white/10 text-zinc-300 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {provider}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
