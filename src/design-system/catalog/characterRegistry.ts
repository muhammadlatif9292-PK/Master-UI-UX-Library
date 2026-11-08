/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CatalogEntry } from './catalogTypes';

export const CHARACTER_CATALOG: CatalogEntry[] = [
  {
    id: 'character-mascot-system',
    name: 'Character & Mascot Architecture',
    component: 'CharacterHost',
    family: 'feedback',
    tags: ['character', 'mascot', 'avatar', 'orb', 'eyes', 'fsm', 'attention', 'speech-bubble', 'gestures', 'events'],
    description: 'A complete cognitive character and mascot system featuring 13 FSM states, 5 representations (Mascot, Avatar, Orb, Face, Eyes), contextual gaze tracking, speech bubbles, and semantic event bus reactivity.',
    mood: 'Expressive & Contextual',
    visualStyle: 'Cyber Organic',
    motionStyle: 'Subtle Organic Spring',
    interactionStyle: 'Autonomous Attention & Reactive',
    lightingStyle: 'Dynamic Chromatic Aura',
    soundStyle: 'Subtle Chimes & Viseme Sync',
    hapticStyle: 'Tactile Tick',
    states: [
      'idle',
      'watching',
      'listening',
      'thinking',
      'processing',
      'typing',
      'success',
      'celebrating',
      'confused',
      'warning',
      'error',
      'sleeping',
      'offline',
    ],
    responsiveBehavior: 'Fluid scaling from 80px micro-dock to 240px hero stage',
    accessibility: 'AAA',
    performanceTier: 'real-time',
    dependencies: ['motion/react', 'lucide-react'],
    sourceInspiration: 'Cognitive FSMs & Cybernetic AI Assistants',
    license: 'Apache-2.0',
    codeArtifact: '<CharacterProvider><CharacterHost size="lg" /></CharacterProvider>',
    aiSpecification: 'Character system with 13 states, 5 forms, contextual attention engine, and semantic event bus reactivity.',
    version: '3.0.0',
    status: 'stable',
  },
];
