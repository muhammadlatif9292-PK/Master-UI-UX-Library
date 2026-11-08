# Changelog & Version History

> **Release Notes, Version Milestones, and Architectural Changes**

---

## [v3.8.0] - 2026-08-29 (Production Master Release)

### Added
- **Variant Scaling Engine (`variantScalingEngine.ts`)**: Programmatic candidate generation scaling the catalog to 52+ distinct variants per major family across 11 structural dimensions.
- **Curator & Review Studio (`CuratorReviewStudio.tsx`)**: Formal lifecycle promotion pipeline (`Draft` → `Experimental` → `Reviewed` → `Production Candidate` → `Deprecated`) with 10-vector quality scoring and downloadable curation manifest export.
- **Cross-System Audit & Fallbacks**: Unified 2D flat mode fallback for 3D spatial cards, Tier 1 performance power saver mode, and 12-vector WCAG 2.2 AAA accessibility verification.
- **Procedural Sensory Layer**: Web Audio polyphonic synthesizer and navigator vibration haptics with instant mute controls (`soundOff`, `hapticOff`).

### Refined
- Cleaned up workspace imports, ensuring zero console warnings and 100% clean linter validation (`npm run lint`).
- Enforced mathematical border radius rule ($\text{Inner Radius} = \text{Outer Radius} - \text{Padding}$) across all bento cards and modal containers.
- Enhanced AI Studio Handoff Studio with structured XML export schema.
