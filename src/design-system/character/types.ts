/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type CharacterForm = 'mascot' | 'avatar' | 'orb' | 'face-only' | 'eyes-only';

export type CharacterState =
  | 'idle'
  | 'watching'
  | 'listening'
  | 'thinking'
  | 'processing'
  | 'typing'
  | 'success'
  | 'celebrating'
  | 'confused'
  | 'warning'
  | 'error'
  | 'sleeping'
  | 'offline';

export type CharacterEmotion =
  | 'neutral'
  | 'happy'
  | 'excited'
  | 'curious'
  | 'focused'
  | 'worried'
  | 'surprised'
  | 'proud'
  | 'sleepy'
  | 'friendly'
  | 'analytical';

export type CharacterGesture =
  | 'none'
  | 'wave'
  | 'point-left'
  | 'point-right'
  | 'nod'
  | 'shake'
  | 'chin-tap'
  | 'clap'
  | 'confetti'
  | 'shrug'
  | 'shield'
  | 'type-hands'
  | 'celebrate';

export type CharacterReaction =
  | 'none'
  | 'bounce'
  | 'sparkle'
  | 'heart'
  | 'jolt'
  | 'sweat'
  | 'question'
  | 'alert';

export type EyeShape =
  | 'normal'
  | 'happy'
  | 'squint'
  | 'wide'
  | 'wink-left'
  | 'wink-right'
  | 'stars'
  | 'hearts'
  | 'x-eyes'
  | 'sleepy'
  | 'dizzy'
  | 'suspicious';

export type MouthShape =
  | 'neutral'
  | 'smile'
  | 'big-smile'
  | 'open'
  | 'talk'
  | 'surprised'
  | 'frown'
  | 'smirk'
  | 'flat'
  | 'cat';

export type EyeStyle = 'digital-led' | 'organic-anime' | 'geometric-cyber' | 'minimal-dot';

export type AccessoryType = 'none' | 'headphones' | 'glasses' | 'halo' | 'wizard-hat' | 'antenna-star' | 'visor';

export interface AttentionTarget {
  x: number; // normalized -1 to 1 or pixel coords
  y: number; // normalized -1 to 1 or pixel coords
  id?: string;
  label?: string;
  priority?: number;
  mode?: 'cursor' | 'element' | 'ambient' | 'fixed';
}

export interface SpeechAction {
  label: string;
  actionId: string;
  variant?: 'primary' | 'secondary' | 'danger';
}

export interface SpeechMessage {
  id: string;
  text: string;
  emotion?: CharacterEmotion;
  actions?: SpeechAction[];
  autoDismissMs?: number;
  isTyping?: boolean;
  soundCue?: string;
  timestamp?: number;
}

export interface CharacterPalette {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  glow: string;
  eyeColor: string;
  blushColor: string;
  bodyBg: string;
}

export interface StateMachineTransition {
  from: CharacterState | '*';
  to: CharacterState;
  trigger?: string;
  autoTimeoutMs?: number;
  priority?: number;
}
