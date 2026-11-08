/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ExperienceRecipe } from './types';
import {
  VISUAL_OPTIONS,
  MOTION_OPTIONS,
  INTERACTION_OPTIONS,
  LIGHTING_OPTIONS,
  SOUND_OPTIONS,
  HAPTIC_OPTIONS,
  TYPOGRAPHY_OPTIONS,
  THEME_OPTIONS,
} from './composerData';
import {
  X,
  Copy,
  Check,
  Download,
  Code2,
  Sparkles,
  FileJson,
  FileCode,
  Layers,
} from 'lucide-react';

interface CodeExporterModalProps {
  recipe: ExperienceRecipe;
  onClose: () => void;
}

export function CodeExporterModal({ recipe, onClose }: CodeExporterModalProps) {
  const [activeTab, setActiveTab] = useState<'code' | 'ai-prompt' | 'json' | 'css'>('code');
  const [copied, setCopied] = useState<boolean>(false);

  const visual = VISUAL_OPTIONS.find((v) => v.id === recipe.visual) || VISUAL_OPTIONS[0];
  const motion = MOTION_OPTIONS.find((m) => m.id === recipe.motion) || MOTION_OPTIONS[0];
  const interaction = INTERACTION_OPTIONS.find((i) => i.id === recipe.interaction) || INTERACTION_OPTIONS[0];
  const lighting = LIGHTING_OPTIONS.find((l) => l.id === recipe.lighting) || LIGHTING_OPTIONS[0];
  const sound = SOUND_OPTIONS.find((s) => s.id === recipe.sound) || SOUND_OPTIONS[0];
  const haptic = HAPTIC_OPTIONS.find((h) => h.id === recipe.haptic) || HAPTIC_OPTIONS[0];
  const typography = TYPOGRAPHY_OPTIONS.find((t) => t.id === recipe.typography) || TYPOGRAPHY_OPTIONS[0];
  const theme = THEME_OPTIONS.find((t) => t.id === recipe.theme) || THEME_OPTIONS[0];

  // 1. Generate React Component Code
  const reactCode = `/**
 * Experience Component: ${recipe.name}
 * Visual: ${visual.name} | Motion: ${motion.name} | Interaction: ${interaction.name}
 * Lighting: ${lighting.name} | Sound: ${sound.name} | Haptic: ${haptic.name}
 */

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export function ${recipe.name.replace(/[^a-zA-Z0-9]/g, '')}Card() {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const playSynthesizerSound = () => {
    if (typeof window === 'undefined' || '${sound.id}' === 'mute') return;
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = '${sound.soundType === 'chord' ? 'sine' : sound.soundType}';
    osc.frequency.setValueAtTime(${sound.baseFreq}, ctx.currentTime);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + ${sound.decayTime});
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + ${sound.decayTime});
  };

  const triggerHapticFeedback = () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(${JSON.stringify(haptic.vibratePattern)});
    }
  };

  const handleAction = () => {
    playSynthesizerSound();
    triggerHapticFeedback();
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: ${motion.hoverScale} }}
      whileTap={{ scale: ${motion.tapScale} }}
      transition={{
        type: 'spring',
        stiffness: ${motion.stiffness},
        damping: ${motion.damping},
        mass: ${motion.mass},
      }}
      className="${visual.surfaceClass} ${visual.borderClass} p-8 rounded-3xl relative overflow-hidden transition-colors"
      style={{
        fontFamily: '${typography.titleFont.includes('serif') ? 'serif' : typography.titleFont.includes('mono') ? 'monospace' : 'sans-serif'}',
      }}
    >
      {/* Reactive Lighting Glow Layer */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: \`radial-gradient(350px circle at \${mousePos.x}px \${mousePos.y}px, ${theme.accentHex}30, transparent 75%)\`,
          }}
        />
      )}

      <div className="relative z-10 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase tracking-wider ${theme.accentPrimary}">
            ${visual.name} • ${theme.name}
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-white/10 text-white border border-white/20">
            ${recipe.intensity.toUpperCase()} INTENSITY
          </span>
        </div>

        <h3 className="text-2xl font-bold tracking-tight text-white">
          ${recipe.name}
        </h3>

        <p className="text-sm leading-relaxed text-zinc-300">
          ${recipe.description}
        </p>

        <button
          onClick={handleAction}
          className="w-full py-3.5 px-6 rounded-2xl font-bold font-mono text-xs uppercase tracking-wider text-black transition-all shadow-lg hover:opacity-95 active:scale-95"
          style={{
            backgroundColor: '${theme.accentHex}',
            boxShadow: '0 0 25px ${theme.accentHex}50',
          }}
        >
          Execute Action Trigger
        </button>
      </div>
    </motion.div>
  );
}`;

  // 2. Generate AI Studio Master Prompt
  const aiPrompt = `### Master UI/UX Experience Specification: ${recipe.name}

You are tasked with building a web application utilizing this exact synthesized design system recipe. Adhere strictly to these 10 architectural dimensions:

1. **Visual Material Archetype**: ${visual.name}
   - Description: ${visual.description}
   - Surface Classes: \`${visual.surfaceClass}\`
   - Border Classes: \`${visual.borderClass}\`
   - Refraction Index: ${visual.refractionIndex}

2. **Motion & Physics Engine**: ${motion.name}
   - Spring Stiffness: ${motion.stiffness} N/m
   - Damping Ratio: ${motion.damping} Ns/m
   - Mass: ${motion.mass} kg
   - Transition Duration: ${motion.duration}s (${motion.ease})
   - Hover Scale: ${motion.hoverScale} | Tap Scale: ${motion.tapScale}

3. **Interaction Physics**: ${interaction.name}
   - Pointer Magnetism: ${interaction.magneticStrength * 100}% pull strength
   - Max 3D Tilt Angle: ${interaction.tiltMaxAngle}°
   - Elasticity Multiplier: ${interaction.elasticMultiplier}x
   - Gesture Feedback: ${interaction.gestureFeedback}

4. **Lighting & Glow Engine**: ${lighting.name}
   - Glow Spread: ${lighting.glowSpread} (${lighting.glowColor})
   - Edge Tracing: ${lighting.edgeTracing ? 'Active Dynamic Perimeter Beam' : 'Disabled'}
   - Specular Sheen: ${lighting.specularSheen ? 'Active 45° Linear Sheen' : 'Disabled'}

5. **Acoustic & Procedural Sound**: ${sound.name}
   - Waveform Type: ${sound.soundType} (${sound.baseFreq} Hz base frequency)
   - Exponential Decay: ${sound.decayTime}s
   - Acoustic Tone: ${sound.tagline}

6. **Haptic & Tactile Sensation**: ${haptic.name}
   - Vibration Pattern: [${haptic.vibratePattern.join(', ')}] ms
   - Sensation Profile: ${haptic.tactileSensation}

7. **Typography Hierarchy**: ${typography.name}
   - Title Font: ${typography.titleFont} (${typography.titleTracking}, ${typography.titleWeight})
   - Body Font: ${typography.bodyFont} | Mono: ${typography.monoFont}

8. **Theme Palette & Tokens**: ${theme.name}
   - Canvas Background: \`${theme.bgCanvas}\`
   - Surface Primary: \`${theme.surfacePrimary}\`
   - Accent Primary: \`${theme.accentPrimary}\` (${theme.accentHex})
   - Accent Secondary: \`${theme.accentSecondary}\` (${theme.secondaryHex})

9. **Intensity Scaling**: ${recipe.intensity.toUpperCase()} (${recipe.intensity === 'subtle' ? '20%' : recipe.intensity === 'balanced' ? '50%' : recipe.intensity === 'expressive' ? '80%' : '100%'})
10. **Target Performance Tier**: ${recipe.performanceTier.toUpperCase()} (${recipe.performanceTier === 'ultra' ? '120 FPS WebGL/Filters' : recipe.performanceTier === 'balanced' ? '60 FPS Accelerated' : 'Eco Reduced-Motion'})

Please implement all components and page views conforming precisely to these tokens and sensory rules.`;

  // 3. Generate JSON Spec
  const jsonSpec = JSON.stringify(recipe, null, 2);

  // 4. Generate CSS Tokens
  const cssTokens = `/* Experience Recipe Design Tokens: ${recipe.name} */
:root {
  --exp-visual: "${recipe.visual}";
  --exp-motion-stiffness: ${motion.stiffness};
  --exp-motion-damping: ${motion.damping};
  --exp-motion-duration: ${motion.duration}s;
  --exp-motion-ease: ${motion.ease};
  
  --exp-accent-primary: ${theme.accentHex};
  --exp-accent-secondary: ${theme.secondaryHex};
  
  --exp-lighting-glow: "${lighting.glowSpread}";
  --exp-audio-freq: ${sound.baseFreq}Hz;
  --exp-haptic-pattern: ${JSON.stringify(haptic.vibratePattern)};
  
  --exp-intensity: "${recipe.intensity}";
  --exp-perf-tier: "${recipe.performanceTier}";
}`;

  const getActiveContent = () => {
    switch (activeTab) {
      case 'code':
        return reactCode;
      case 'ai-prompt':
        return aiPrompt;
      case 'json':
        return jsonSpec;
      case 'css':
        return cssTokens;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename = `${recipe.id || 'recipe'}.${activeTab === 'json' ? 'json' : activeTab === 'css' ? 'css' : activeTab === 'code' ? 'tsx' : 'md'}`;
    const blob = new Blob([getActiveContent()], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-mono">
                Export Experience Recipe: {recipe.name}
              </h3>
              <p className="text-xs text-zinc-400">
                Production code, AI system prompts, JSON specifications, and CSS variables.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 pt-4 border-b border-zinc-800 flex items-center gap-2 overflow-x-auto">
          {[
            { id: 'code', label: 'React Component (TSX)', icon: FileCode },
            { id: 'ai-prompt', label: 'AI Studio Prompt (Markdown)', icon: Sparkles },
            { id: 'json', label: 'JSON Specification', icon: FileJson },
            { id: 'css', label: 'CSS Variables', icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 px-4 text-xs font-mono font-bold flex items-center gap-2 border-b-2 transition-all ${
                  isActive
                    ? 'border-cyan-400 text-cyan-300'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Code Content Viewport */}
        <div className="flex-1 overflow-auto p-6 bg-black/60">
          <pre className="text-xs font-mono text-zinc-300 leading-relaxed overflow-x-auto whitespace-pre-wrap selection:bg-cyan-500 selection:text-black">
            {getActiveContent()}
          </pre>
        </div>

        {/* Modal Actions Footer */}
        <div className="p-6 border-t border-zinc-800 flex items-center justify-between gap-4 bg-zinc-950">
          <div className="text-xs font-mono text-zinc-500">
            {recipe.visual} + {recipe.motion} + {recipe.sound}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownload}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono font-bold text-white flex items-center gap-2 transition-all"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              Download File
            </button>

            <button
              onClick={handleCopy}
              className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-mono font-bold flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all active:scale-95"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy to Clipboard'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
