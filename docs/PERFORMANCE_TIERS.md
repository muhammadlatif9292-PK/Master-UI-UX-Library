# Master UI/UX Design System: Performance Tiers & Loop Guard

This document details the **Performance Tiers 1–3 Governor** and **Loop Idle Protection System** to guarantee 60fps across low-end mobile to high-end workstations.

---

## 1. Performance Tiers Governor

| Tier | Profile Name | Target Hardware | Allowed Graphical Features | Prohibited / Stripped Features |
|---|---|---|---|---|
| **Tier 1** | `Low / Ultra-Fast` | Budget mobile, battery saver, slow GPUs | Solid colors (`bg-zinc-900`), flat 1px borders, CSS opacity fades, minimal DOM nodes. | Zero backdrop blur (`backdrop-blur-none`), zero canvas particles, zero infinite CSS keyframes, zero 3D matrix transforms. |
| **Tier 2** | `Standard / Balanced`| Modern phones, standard laptops | Frosted glass (`backdrop-blur-md`), physics-based springs, subtle drop shadows, SVG icons. | Heavy multi-layer shaders, 60+ simultaneous particle emitters. |
| **Tier 3** | `High / Cinematic` | Desktop GPUs, high-end workstations | Volumetric lighting, 3D gyroscope tilt, particle emitters (60 particles), glassmorphism (`backdrop-blur-2xl`), sound + haptics. | Unbounded layout repaints. |

---

## 2. Loop Idle Protection Protocol

Any component running continuous animation loops (canvas particles, holographic scanlines, ticker telemetry streams, procedural audio ambient loops) must implement automatic idle throttling:

1. **Inactivity Detection**: Listen to user pointer, touch, scroll, and keydown events.
2. **10-Second Idle Timer**: If zero user interactions occur for 10 seconds:
   - Throttles canvas particle framerate from 60fps to 15fps or freezes `requestAnimationFrame`.
   - Halts complex CSS continuous rotate/pulse animations.
   - Suspends ambient Web Audio oscillators.
3. **Instant Resume**: Immediately upon pointer movement or keydown, all effects resume 60fps fidelity in `<16ms` with zero stutter.

---

## 3. Telemetry & FPS Budget

Every component must adhere to:
- **DOM Node Budget**: $\le 150$ DOM nodes per card or interactive module.
- **Paint Time**: $\le 16.6\text{ms}$ per frame during active user gestures.
- **Memory Footprint**: Strict cleanup of Web Audio nodes (`ctx.close()` / `disconnect()`), event listeners, and timers in React `useEffect` teardown functions.
