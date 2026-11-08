# Master UI/UX Design System: Tokens and Themes Reference

This document provides the complete specification of the **12 Design Archetypes** and token system used throughout the Master UI/UX Library.

---

## 1. The 12 Design Archetypes

Every component, recipe, and layout in the library belongs to or derives from one of the following 12 archetypes:

### 1. `restrained-luxury`
- **Mood**: Opulent, Exclusive, Bespoke, High-Touch
- **Canvas Background**: `bg-[#0A0A0B]` (Warm deep charcoal / near black)
- **Primary Surface**: `bg-[#121215]/80 backdrop-blur-xl`
- **Secondary Surface**: `bg-[#1A1A1E]`
- **Text Primary**: `text-[#F4F4F6]` (Warm alabaster)
- **Text Secondary**: `text-[#A1A1AA]` (Muted platinum)
- **Accent Primary**: `text-[#D4AF37]` (24k Brushed Gold)
- **Accent Glow**: `shadow-[0_0_30px_rgba(212,175,55,0.15)]`
- **Border Default**: `border-[#D4AF37]/30`
- **Typography Pairing**: Title: `Playfair Display, serif` | Body: `Plus Jakarta Sans, sans-serif`

### 2. `cinematic-dark`
- **Mood**: Immersive, Dynamic, Deep Space, High Contrast
- **Canvas Background**: `bg-[#050508]` (Deep cosmic obsidian)
- **Primary Surface**: `bg-[#0D0E15]/90 backdrop-blur-2xl`
- **Secondary Surface**: `bg-[#151722]`
- **Text Primary**: `text-[#FFFFFF]` (Pure white)
- **Text Secondary**: `text-[#94A3B8]` (Slate gray)
- **Accent Primary**: `text-[#38BDF8]` (Cyan nebula)
- **Accent Glow**: `shadow-[0_0_40px_rgba(56,189,248,0.25)]`
- **Border Default**: `border-slate-800`
- **Typography Pairing**: Title: `Outfit, sans-serif` | Body: `Inter, sans-serif`

### 3. `futuristic-cyber`
- **Mood**: HUD Terminal, Cyberpunk, Tactical, High Frequency
- **Canvas Background**: `bg-[#020617]` (Midnight cockpit)
- **Primary Surface**: `bg-[#090D16]/95 backdrop-blur-md`
- **Secondary Surface**: `bg-[#0F172A]`
- **Text Primary**: `text-[#22D3EE]` (Terminal Cyan)
- **Text Secondary**: `text-[#64748B]` (Dark telemetry slate)
- **Accent Primary**: `text-[#06B6D4]` (Electric Cyan)
- **Accent Glow**: `shadow-[0_0_25px_rgba(6,182,212,0.4)]`
- **Border Default**: `border-cyan-500/50`
- **Typography Pairing**: Title: `Share Tech Mono, monospace` | Body: `JetBrains Mono, monospace`

### 4. `scientific-lab`
- **Mood**: Rigorous, Clean, Precision-Engineered, Academic
- **Canvas Background**: `bg-[#F8FAFC]` (Clean sterile slate)
- **Primary Surface**: `bg-white border border-slate-200 shadow-sm`
- **Secondary Surface**: `bg-slate-50`
- **Text Primary**: `text-slate-900`
- **Text Secondary**: `text-slate-500`
- **Accent Primary**: `text-blue-600` (Laboratory Cobalt)
- **Accent Glow**: `shadow-[0_0_15px_rgba(37,99,235,0.1)]`
- **Border Default**: `border-slate-300`
- **Typography Pairing**: Title: `Inter, sans-serif` | Body: `Inter, sans-serif`

### 5. `neumorphic-glass`
- **Mood**: Soft Refractive Glass, Translucent, Liquid Depth
- **Canvas Background**: `bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950`
- **Primary Surface**: `bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]`
- **Secondary Surface**: `bg-white/5`
- **Text Primary**: `text-white`
- **Text Secondary**: `text-white/70`
- **Accent Primary**: `text-purple-400`
- **Accent Glow**: `shadow-[0_0_35px_rgba(168,85,247,0.3)]`
- **Border Default**: `border-white/20`
- **Typography Pairing**: Title: `Outfit, sans-serif` | Body: `Inter, sans-serif`

### 6. `mechanical-tactile`
- **Mood**: Industrial Hardware, Dieter Rams, Physical Switchgear
- **Canvas Background**: `bg-[#18181B]` (Matte instrument casing)
- **Primary Surface**: `bg-[#27272A] border-t border-l border-zinc-600 shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_10px_20px_rgba(0,0,0,0.5)]`
- **Secondary Surface**: `bg-[#202023]`
- **Text Primary**: `text-zinc-100`
- **Text Secondary**: `text-zinc-400`
- **Accent Primary**: `text-amber-500` (Safety Amber)
- **Accent Glow**: `shadow-[0_0_20px_rgba(245,158,11,0.2)]`
- **Border Default**: `border-zinc-700`
- **Typography Pairing**: Title: `Space Grotesk, sans-serif` | Body: `IBM Plex Sans, sans-serif`

### 7. `brutalist-grid`
- **Mood**: Raw Structural, High Density, Monospaced Architecture
- **Canvas Background**: `bg-[#FFFBEB]` (Cream bond paper)
- **Primary Surface**: `bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000]`
- **Secondary Surface**: `bg-zinc-100`
- **Text Primary**: `text-black`
- **Text Secondary**: `text-zinc-700`
- **Accent Primary**: `text-rose-600`
- **Accent Glow**: `shadow-[4px_4px_0px_0px_#000]` (Hard drop shadow)
- **Border Default**: `border-2 border-black`
- **Typography Pairing**: Title: `Syne, sans-serif` | Body: `Space Mono, monospace`

### 8. `editorial-serif`
- **Mood**: Literary Journal, Bespoke Typography, High Contrast
- **Canvas Background**: `bg-[#FAF8F5]` (Warm archival paper)
- **Primary Surface**: `bg-[#F3EFEA] border border-[#E5DFD7]`
- **Secondary Surface**: `bg-[#EBE5DC]`
- **Text Primary**: `text-[#1C1917]` (Warm stone black)
- **Text Secondary**: `text-[#78716C]` (Warm taupe)
- **Accent Primary**: `text-[#991B1B]` (Burgundy ink)
- **Accent Glow**: `shadow-[0_4px_20px_rgba(153,27,27,0.08)]`
- **Border Default**: `border-[#D6CEBF]`
- **Typography Pairing**: Title: `Playfair Display, serif` | Body: `Newsreader, serif`

### 9. `minimal-monastic`
- **Mood**: Zen Calm, Extreme Restraint, Ample Negative Space
- **Canvas Background**: `bg-[#121212]` (Soft graphite)
- **Primary Surface**: `bg-[#181818] border border-zinc-800/60`
- **Secondary Surface**: `bg-[#1E1E1E]`
- **Text Primary**: `text-[#E4E4E7]`
- **Text Secondary**: `text-[#71717A]`
- **Accent Primary**: `text-[#D4D4D8]`
- **Accent Glow**: `shadow-none`
- **Border Default**: `border-zinc-800/40`
- **Typography Pairing**: Title: `Plus Jakarta Sans, sans-serif` | Body: `Plus Jakarta Sans, sans-serif`

### 10. `biomorphic-organic`
- **Mood**: Fluid Curves, Botanical, Nature-Inspired Synesthesia
- **Canvas Background**: `bg-[#0C1410]` (Deep forest canopy)
- **Primary Surface**: `bg-[#13231B]/90 backdrop-blur-xl border border-emerald-500/20`
- **Secondary Surface**: `bg-[#1B3026]`
- **Text Primary**: `text-[#ECFDF5]`
- **Text Secondary**: `text-[#6EE7B7]`
- **Accent Primary**: `text-[#10B981]` (Emerald leaf)
- **Accent Glow**: `shadow-[0_0_30px_rgba(16,185,129,0.25)]`
- **Border Default**: `border-emerald-500/30`
- **Typography Pairing**: Title: `Outfit, sans-serif` | Body: `Plus Jakarta Sans, sans-serif`

### 11. `retro-computing`
- **Mood**: 1980s Phosphor CRT, Amber/Green Screen, DOS Console
- **Canvas Background**: `bg-[#0D1117]` (CRT screen tube)
- **Primary Surface**: `bg-[#161B22] border border-green-500/40 shadow-[0_0_15px_rgba(34,197,94,0.15)]`
- **Secondary Surface**: `bg-[#21262D]`
- **Text Primary**: `text-[#4ADE80]` (Phosphor Green P1)
- **Text Secondary**: `text-[#22C55E]/70`
- **Accent Primary**: `text-[#22C55E]`
- **Accent Glow**: `shadow-[0_0_20px_rgba(34,197,94,0.3)]`
- **Border Default**: `border-green-500/50`
- **Typography Pairing**: Title: `VT323, monospace` | Body: `Share Tech Mono, monospace`

### 12. `ai-character`
- **Mood**: Playful Interactive Companion, Emotional State Machine
- **Canvas Background**: `bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#311042]`
- **Primary Surface**: `bg-white/10 backdrop-blur-2xl border border-indigo-400/30 shadow-[0_12px_40px_rgba(99,102,241,0.25)]`
- **Secondary Surface**: `bg-indigo-950/40`
- **Text Primary**: `text-white`
- **Text Secondary**: `text-indigo-200/80`
- **Accent Primary**: `text-indigo-400`
- **Accent Glow**: `shadow-[0_0_40px_rgba(129,140,248,0.35)]`
- **Border Default**: `border-indigo-400/30`
- **Typography Pairing**: Title: `Outfit, sans-serif` | Body: `Inter, sans-serif`

---

## 2. Token TypeScript Definition (`ARCHETYPE_TOKENS`)

Access tokens programmatically via:
```typescript
import { ARCHETYPE_TOKENS } from '../design-system/tokens';

const tokens = ARCHETYPE_TOKENS['restrained-luxury'];
// tokens.bgCanvas => "bg-[#0A0A0B]"
// tokens.accentPrimary => "text-[#D4AF37]"
```

## 3. Mathematical Corner Nesting Rule
Whenever placing a rounded element inside a padded container, apply:
$$\text{Inner Radius} = \text{Outer Radius} - \text{Padding}$$
- Outer `rounded-3xl` (24px) with `p-4` (16px) $\rightarrow$ Inner `rounded-lg` (8px).
- Never mix a sharp outer container with a rounded inner child or vice versa without optical intention.
