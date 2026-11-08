/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { componentRegistry } from '../registry/componentRegistry';
import { audioEngine } from '../design-system/sensory/audioEngine';
import { ArchitectureGuide } from '../docs/ArchitectureGuide';
import { Shield, Sparkles, Volume2, VolumeX, Code, Cpu, Terminal, Layers, CheckCircle } from 'lucide-react';

export function ArchitectureDemonstration() {
  const loginFamily = componentRegistry.getFamily('login');
  const variants = loginFamily ? loginFamily.variants : [];

  const [selectedVariantId, setSelectedVariantId] = useState<string>(variants[0]?.id || '');
  const [activeTab, setActiveTab] = useState<'preview' | 'code' | 'ai-spec' | 'guide'>('preview');
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Headless form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const activeVariant = variants.find((v) => v.id === selectedVariantId) || variants[0];

  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    audioEngine.setMuted(next);
  };

  const handleInteract = () => {
    if (activeVariant) {
      audioEngine.playSound(activeVariant.interactionRecipe.sound);
      audioEngine.triggerHaptic(activeVariant.interactionRecipe.haptic.pattern);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleInteract();
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      audioEngine.playSound({ enabled: true, soundType: 'chime' as any, volume: 0.3 });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-zinc-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Navigation Bar */}
      <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-xl border border-cyan-500/30 text-cyan-400">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight text-white flex items-center gap-2">
              Master UI/UX Style Library <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono">Architectural Foundation</span>
            </h1>
            <p className="text-xs text-zinc-400">Reusable frontend laboratory & decoupled recipe engine</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleToggleMute}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 hover:text-white transition-all"
            title="Toggle Sensory Audio"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
            <span>{isMuted ? 'Muted' : 'Sensory Audio Active'}</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8 flex flex-col gap-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-zinc-800 pb-4">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === 'preview'
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-lg'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Cpu className="w-4 h-4" /> Live Recipe Renderer
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === 'code'
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-lg'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Code className="w-4 h-4" /> Code Artifact
          </button>
          <button
            onClick={() => setActiveTab('ai-spec')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === 'ai-spec'
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-lg'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Terminal className="w-4 h-4" /> AI Vibe-Coder Spec
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === 'guide'
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-lg'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            <Layers className="w-4 h-4" /> Architecture Guide
          </button>
        </div>

        {activeTab === 'preview' && activeVariant && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Control Panel: Variant Switcher */}
            <div className="lg:col-span-1 space-y-6">
              <div className="p-6 bg-zinc-900/80 rounded-2xl border border-zinc-800 backdrop-blur-xl space-y-4">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
                  Component Family: <span className="text-white capitalize">Login & Auth</span>
                </h2>
                <p className="text-xs text-zinc-400">
                  Demonstrating one headless component rendering via two distinct style recipes without duplicating code.
                </p>

                <div className="space-y-3 pt-2">
                  <label className="text-xs font-medium text-zinc-300">Select Style Recipe (Variant):</label>
                  {variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => {
                        setSelectedVariantId(v.id);
                        handleInteract();
                      }}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex flex-col gap-1.5 ${
                        selectedVariantId === v.id
                          ? 'bg-cyan-500/10 border-cyan-500/50 shadow-lg shadow-cyan-500/10'
                          : 'bg-black/30 border-zinc-800 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm text-white">{v.name}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono">
                          {v.archetype}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 line-clamp-2">{v.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Recipe Inspector Metadata */}
              <div className="p-6 bg-zinc-900/80 rounded-2xl border border-zinc-800 backdrop-blur-xl space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Active Recipe Parameters</h3>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between py-1 border-b border-zinc-800">
                    <span className="text-zinc-500">Archetype:</span>
                    <span className="text-cyan-400">{activeVariant.archetype}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-800">
                    <span className="text-zinc-500">Shadow Depth:</span>
                    <span className="text-zinc-300">{activeVariant.styleRecipe.lighting.shadowDepth}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-zinc-800">
                    <span className="text-zinc-500">Sound Feedback:</span>
                    <span className="text-emerald-400">{activeVariant.interactionRecipe.sound.soundType}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-zinc-500">WCAG Target:</span>
                    <span className="text-purple-400">{activeVariant.accessibility.wcagTarget}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Stage: Live Render using the Selected Recipe */}
            <div className="lg:col-span-2 flex items-center justify-center p-8 rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-black border border-zinc-800/80 shadow-2xl relative overflow-hidden min-h-[500px]">
              {/* Background ambient lighting */}
              <div className="absolute inset-0 opacity-20 pointer-events-none flex items-center justify-center">
                <div className="w-96 h-96 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 blur-3xl" />
              </div>

              {/* Polymorphic Component Rendered via activeVariant.styleRecipe */}
              <div className={activeVariant.styleRecipe.wrapperClasses}>
                <div className={activeVariant.styleRecipe.surfaceClasses}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 rounded-xl bg-white/10 border border-white/20 text-white">
                      <Shield className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className={activeVariant.styleRecipe.typography.titleClasses}>Secure Access</h3>
                      <p className={activeVariant.styleRecipe.typography.bodyClasses}>Enter your credentials to continue</p>
                    </div>
                  </div>

                  {status === 'success' ? (
                    <div className="py-8 text-center space-y-3">
                      <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                        <CheckCircle className="w-6 h-6" />
                      </div>
                      <h4 className="font-semibold text-white">Authentication Successful</h4>
                      <p className="text-xs text-zinc-400">Recipe applied & state verified.</p>
                      <button
                        onClick={() => setStatus('idle')}
                        className={activeVariant.styleRecipe.buttonClasses.secondary}
                      >
                        Reset Form
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4" onClick={handleInteract}>
                      <div className="space-y-1.5">
                        <label className={activeVariant.styleRecipe.typography.labelClasses}>Email Address</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="architect@domain.com"
                          className={activeVariant.styleRecipe.inputClasses.base}
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className={activeVariant.styleRecipe.typography.labelClasses}>Password</label>
                        <input
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className={activeVariant.styleRecipe.inputClasses.base}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={status === 'submitting'}
                        className={activeVariant.styleRecipe.buttonClasses.primary}
                      >
                        {status === 'submitting' ? 'Authenticating...' : 'Sign In with Recipe'}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'code' && activeVariant && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Code className="w-5 h-5 text-cyan-400" /> Standalone Code Artifact: <span className="font-mono text-cyan-300">{activeVariant.codeArtifact.fileName}</span>
              </h2>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(activeVariant.codeArtifact.rawCode);
                  alert('Code copied to clipboard!');
                }}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-semibold rounded-lg text-xs transition-all"
              >
                Copy Code Snippet
              </button>
            </div>
            <pre className="p-6 bg-zinc-950 rounded-xl border border-zinc-800 text-zinc-300 font-mono text-xs overflow-x-auto">
              <code>{activeVariant.codeArtifact.rawCode}</code>
            </pre>
          </div>
        )}

        {activeTab === 'ai-spec' && activeVariant && (
          <div className="space-y-6">
            <div className="p-6 bg-zinc-900/90 rounded-2xl border border-zinc-800 space-y-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Terminal className="w-5 h-5 text-purple-400" /> AI Vibe-Coder Implementation Specification
              </h2>
              <p className="text-xs text-zinc-400">
                Structured specification designed to feed LLM coding assistants (Cursor, Claude, Gemini) with exact design intent and token rules.
              </p>

              <div className="space-y-3 font-mono text-xs bg-black/40 p-4 rounded-xl border border-zinc-800">
                <div>
                  <span className="text-zinc-500 block">Design Intent:</span>
                  <span className="text-white">{activeVariant.aiSpecification.designIntent}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Color Hex Codes:</span>
                  <div className="flex gap-2 mt-1">
                    {activeVariant.aiSpecification.colorHexCodes.map((hex, i) => (
                      <span key={i} className="px-2 py-1 rounded bg-zinc-800 text-cyan-300 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: hex }} />
                        {hex}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-zinc-500 block">Cursor Prompt:</span>
                  <p className="text-emerald-300 mt-1">{activeVariant.aiSpecification.suggestedPromptForCursor}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'guide' && <ArchitectureGuide />}
      </main>
    </div>
  );
}
