# Master UI/UX Design System: Sensory (Sound & Haptics) and Motion Specification

This document details the procedural acoustic synthesizer, vibration tactile engine, and physics-based motion system.

---

## 1. Procedural Web Audio Sound Engine

The library uses a zero-external-audio-file Web Audio synthesizer located in `src/design-system/sound/SoundContext.tsx`.

### Sound Profiles & Frequencies
- **`click` / `tap`**: 800Hz sine burst, 20ms duration, exponential gain decay.
- **`press`**: 440Hz sine wave, 35ms duration, subtle low-pass filtered punch.
- **`release`**: 620Hz sine wave, 25ms duration.
- **`hover`**: 1200Hz ultra-low gain (0.05) sine tick, 10ms duration.
- **`success`**: Polyphonic triad: C5 (523.25Hz) $\rightarrow$ E5 (659.25Hz) $\rightarrow$ G5 (783.99Hz) ascending arpeggio over 300ms.
- **`error`**: Dual-tone dissonance: 220Hz (A3) + 233Hz (Bb3) sawtooth wave with 150ms decay.
- **`switch`**: Frequency sweep 300Hz $\rightarrow$ 900Hz exponential ramp.
- **`slider`**: Quantized discrete ticks based on step increment.

### Usage in Components
```typescript
import { useSound } from '../design-system/sound/SoundContext';

function MyButton() {
  const { playSound, soundEnabled } = useSound();

  const handleClick = () => {
    playSound('press', 'MICRO'); // Types: 'MICRO', 'STATE', 'AMBIENT', 'SCIFI'
  };

  return <button onClick={handleClick}>Trigger</button>;
}
```

---

## 2. Navigator Vibration Haptics Engine

The library interacts directly with the HTML5 Vibration API (`navigator.vibrate`) with safe fallbacks:

### Haptic Patterns
- **`tap` / `light`**: Single `10ms` micro-pulse.
- **`press` / `medium`**: Single `25ms` solid tactile bump.
- **`heavy` / `impact`**: Single `40ms` deep pulse.
- **`success`**: Double pulse: `[15ms, 40ms pause, 25ms]`.
- **`error`**: Triple warning burst: `[40ms, 30ms pause, 40ms, 30ms pause, 50ms]`.
- **`selection`**: Ultra-short `8ms` pulse.

### Usage in Components
```typescript
import { useHaptics } from '../design-system/haptics/HapticContext';

function MySlider() {
  const { triggerHaptic } = useHaptics();

  const handleStep = () => {
    triggerHaptic('selection');
  };

  return <input type="range" onChange={handleStep} />;
}
```

---

## 3. Motion Physics & Reduced Motion Compliance

1. **Always use `motion/react`** (formerly Framer Motion).
2. **Spring Physics Over Fixed Durations**:
   - Standard: `{ type: 'spring', stiffness: 300, damping: 25, mass: 1 }`
   - Heavy/Luxury: `{ type: 'spring', stiffness: 180, damping: 30, mass: 1.2 }`
   - Snap/Cyber: `{ type: 'spring', stiffness: 500, damping: 15, mass: 0.5 }`
3. **Respect Reduced Motion**:
   When the user enables `prefers-reduced-motion: reduce` or toggles reduced motion in `useAccessibility()`, replace transform springs with simple opacity fades (`duration: 0.15`) or instant changes.
