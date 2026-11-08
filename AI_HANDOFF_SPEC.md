# AI Handoff Specification

> **XML Schema & Structured AI Prompting Contract for Gemini / Claude / ChatGPT Coding Agents**

---

## 🤖 Purpose & Architecture

The **AI Handoff Engine** converts any component entry or visual recipe in the Master UI/UX Library into a self-contained, structured XML prompt format. This enables developers to hand off components directly to AI agents (Gemini, Claude, ChatGPT) with complete specification contracts.

---

## 📋 Standard XML AI Handoff Format

```xml
<component_spec>
  <metadata>
    <id>auth-cinematic-mascot</id>
    <name>Cinematic Liquid Glass Login</name>
    <family>auth</family>
    <archetype>cinematic-dark</archetype>
    <version>3.8.0</version>
    <wcag_level>AAA</wcag_level>
  </metadata>

  <design_tokens>
    <background_canvas>bg-zinc-950/80</background_canvas>
    <surface_card>backdrop-blur-2xl border border-indigo-500/30 shadow-[0_0_50px_rgba(99,102,241,0.2)]</surface_card>
    <typography_display>font-display text-2xl font-bold tracking-tight text-white</typography_display>
    <primary_accent>bg-indigo-600 hover:bg-indigo-500 text-white</primary_accent>
    <border_radius_outer>rounded-3xl</border_radius_outer>
    <border_radius_inner>rounded-2xl</border_radius_inner>
  </design_tokens>

  <state_machine>
    <state name="idle">Mascot breathes gently with idle wave emoji</state>
    <state name="username-focus">Mascot leans forward attentively watching input</state>
    <state name="password-focus">Mascot covers eyes playfully with hands</state>
    <state name="submitting">Mascot spins orbital loading spinner</state>
    <state name="success">Mascot jumps joyfully with polyphonic C-E-G chime</state>
    <state name="error">Mascot shakes head side-to-side with dual-tone dissonance</state>
  </state_machine>

  <sensory_layer>
    <sound_preset>C5-E5-G5 Triad Chime on success (440Hz / 659Hz / 783Hz)</sound_preset>
    <haptic_preset>[15ms, 40ms, 25ms] double confirm pulse</haptic_preset>
  </sensory_layer>

  <accessibility_contract>
    <focus_ring>ring-2 ring-indigo-500 ring-offset-2 ring-offset-zinc-950</focus_ring>
    <contrast_ratio>14.5:1 text-to-canvas contrast ratio</contrast_ratio>
    <reduced_motion>Graceful opacity fade fallback when prefers-reduced-motion is active</reduced_motion>
  </accessibility_contract>

  <code_implementation>
    <![CDATA[
      // Self-contained React / TypeScript implementation
    ]]>
  </code_implementation>
</component_spec>
```
