# Master UI/UX Design System: Components & Catalog Reference

This document details all 16+ component families, key catalog items, component props APIs, semantic states, and usage patterns in the Master UI/UX Library.

---

## 1. The 16 Major Component Families

| Family ID | Family Name | Primary Purpose | Reference Variants Count |
|---|---|---|---|
| `auth` | Authentication & Identity | Login, Registration, OTP, Passcode, Mascot Auth, Social Auth, Reset | 20+ |
| `navigation` | Navigation & Wayfinding | Command Palettes, Island Menus, Radial Wheels, Morphing Headers | 15+ |
| `buttons` | Action Triggers | Micro-interaction buttons, Glitch, Liquid, Magnetic, Haptic Buttons | 20+ |
| `inputs` | Data Collection & Forms | Floating Label, Holographic Input, Matrix Tagging, Currency, OTP | 18+ |
| `cards` | Content Containers | Holographic 3D Tilt, Frosted Glass, Obsidian Gold, Cyber HUD, Bento | 25+ |
| `overlays` | Modals, Drawers & Sheets | Liquid Dialog, Fullscreen Takeover, Bottom Sheets, Spatial Panels | 12+ |
| `feedback` | Alerts, Notifications & Toasts | Biomorphic Toast, Cyber Alert Banner, Confetti Success, Ambient Glow | 14+ |
| `controls` | Range & Precision Inputs | Obsidian Sliders, Rotary Knobs, Steppers, Multi-state Toggle Switches | 16+ |
| `onboarding` | Tours & Activation | Step Walkthroughs, Spotlight Guides, Persona Selectors, Feature Cards | 10+ |
| `dashboards` | Analytics & Monitoring | Telemetry Bento Grids, Node Metrics, Real-time Charts, KPI Monitors | 16+ |
| `ai-interface` | AI & Cognitive Workflows | Token Streaming, Particle Audio Visualizers, Multi-agent Prompt Chits | 18+ |
| `character` | Mascot & Interactive Pets | Emotion State Machines, Reactive Avatars, Gaze-tracking Eyes | 8+ |
| `spatial` | Spatial & 3D Cards | Parallax Tilt, Volumetric Lighting, Gyroscopic Cards, Layer Shifters | 10+ |
| `scientific` | Node Graphs & Simulators | Node Editors, Formula Evaluators, Spectral Analyzers, Calibration Panels | 12+ |
| `workflow` | Steppers & Flow Builders | Kanban Pipelines, Flow Steppers, Interactive Timelines, Decision Trees | 12+ |
| `general` | Core Primitives & Layouts | Responsive Containers, Split Screens, Hero Stages, Section Dividers | 15+ |

---

## 2. Key Canonical Catalog Components

### A. Cinematic Liquid Glass + Interactive Mascot (`auth-cinematic-mascot`)
- **Component**: `CinematicMascotAuth` (rendered in `AuthVariantPreview.tsx`)
- **Archetype**: `cinematic-dark` / `neumorphic-glass` / `ai-character`
- **Description**: Immersive liquid glass portal featuring an interactive, state-driven companion mascot that reacts dynamically with spring physics to input field focus, typing cadence, password masking, submission, success, and error states.
- **States**:
  - `idle`: Mascot pulses gently with breathing animation.
  - `username-focus`: Mascot leans forward attentively (`👀`).
  - `username-typing`: Mascot follows cursor with active rotation (`✍️`).
  - `password-focus`: Mascot covers eyes (`🫣`).
  - `password-visible`: Mascot peeks through fingers (`👀`).
  - `submitting`: Mascot spins into orbital transition (`💫`).
  - `success`: Mascot celebrates with particle chime (`🥳`).
  - `error`: Mascot shakes sympathetically with error alert (`🤖`).
- **Code Template**:
```tsx
import { useState } from 'react';
import { motion } from 'motion/react';
import { useSound } from '../design-system/sound/SoundContext';
import { useHaptics } from '../design-system/haptics/HapticContext';

export function CinematicMascotAuth({ onLogin }: { onLogin?: (creds: any) => void }) {
  const [mascotState, setMascotState] = useState<'idle'|'username-focus'|'username-typing'|'password-focus'|'password-visible'|'submitting'|'success'|'error'>('idle');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMascotState('submitting');
    playSound('press', 'MICRO');
    triggerHaptic('press');
    // Authentication logic...
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 rounded-3xl bg-zinc-950/80 backdrop-blur-2xl border border-indigo-500/30 shadow-[0_0_50px_rgba(99,102,241,0.2)]">
      {/* Interactive Mascot Stage */}
      <div className="flex flex-col items-center justify-center mb-6">
        <motion.div 
          animate={{ scale: mascotState === 'success' ? 1.2 : 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="w-20 h-20 rounded-full flex items-center justify-center text-3xl bg-indigo-500/20 border-2 border-indigo-400 shadow-xl"
        >
          {mascotState === 'success' ? '🥳' : mascotState === 'password-focus' ? '🫣' : mascotState === 'username-typing' ? '✍️' : '🐱'}
        </motion.div>
        <span className="text-[10px] font-mono text-indigo-300 mt-2 uppercase tracking-wider">
          Mascot: {mascotState}
        </span>
      </div>

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-zinc-300 mb-1">Username / Email</label>
          <input
            type="text"
            value={username}
            onFocus={() => setMascotState('username-focus')}
            onBlur={() => setMascotState('idle')}
            onChange={(e) => {
              setUsername(e.target.value);
              setMascotState(e.target.value.length > 0 ? 'username-typing' : 'username-focus');
            }}
            placeholder="pilot@starship.io"
            className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-300 mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onFocus={() => setMascotState(showPassword ? 'password-visible' : 'password-focus')}
              onBlur={() => setMascotState('idle')}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/15 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              type="button"
              onClick={() => {
                const next = !showPassword;
                setShowPassword(next);
                setMascotState(next ? 'password-visible' : 'password-focus');
              }}
              className="absolute right-3 top-3 text-zinc-400 hover:text-white"
            >
              {showPassword ? '👁️' : '🙈'}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 px-4 rounded-xl font-bold bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg hover:opacity-95 active:scale-[0.98] transition-all"
        >
          Sign In Portal
        </button>
      </form>
    </div>
  );
}
```

---

### B. Obsidian Luxury Auth (`auth-obsidian-luxury`)
- **Archetype**: `restrained-luxury`
- **Features**: Matte obsidian backdrop, brushed 24k gold leaf borders (`border-[#D4AF37]/40`), serif headings (`Playfair Display`), deep resonance Web Audio cues, heavy crisp haptics.

---

### C. Cyber HUD Telemetry Card (`card-cyber-hud`)
- **Archetype**: `futuristic-cyber`
- **Features**: Corner tactical bracket notches, neon cyan glow (`border-cyan-500/50`), scanline animations, instant snappiness (`stiffness: 500, damping: 15`).

---

## 3. Semantic Component States Standard

Every component contract must support:
- `idle`: Default resting state with ambient elevation.
- `hover`: Elevated state (`hover:scale-[1.02]`, increased glow, specular shift).
- `focus`: Accessible focus ring (`ring-2 ring-cyan-400 ring-offset-2 ring-offset-black`).
- `active` / `press`: Tactile compression (`active:scale-[0.97]`).
- `submitting` / `loading`: Spinner/orbital indicator, disabled user interaction.
- `success`: Emerald accent border, success chime, tactile double-tap.
- `error`: Rose accent border, error shake animation, acoustic warning.
- `disabled`: Muted opacity (`opacity-50 cursor-not-allowed pointer-events-none`).
