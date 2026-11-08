/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CharacterState, StateMachineTransition } from './types';

// Priority hierarchy: Higher numbers interrupt lower numbers
const STATE_PRIORITIES: Record<CharacterState, number> = {
  offline: 100,
  error: 90,
  warning: 80,
  celebrating: 75,
  success: 70,
  confused: 65,
  sleeping: 60,
  thinking: 50,
  processing: 50,
  typing: 45,
  listening: 40,
  watching: 30,
  idle: 10,
};

// Automatic fallback timeouts (ms) for transient states
const DEFAULT_TIMEOUTS: Partial<Record<CharacterState, { timeoutMs: number; fallback: CharacterState }>> = {
  celebrating: { timeoutMs: 3200, fallback: 'success' },
  success: { timeoutMs: 2500, fallback: 'idle' },
  confused: { timeoutMs: 4000, fallback: 'idle' },
  typing: { timeoutMs: 6000, fallback: 'idle' },
  warning: { timeoutMs: 5000, fallback: 'idle' },
  error: { timeoutMs: 6000, fallback: 'idle' },
};

export class CharacterStateMachine {
  private currentState: CharacterState = 'idle';
  private previousState: CharacterState = 'idle';
  private timer: any = null;
  private listeners: Set<(state: CharacterState, prev: CharacterState) => void> = new Set();
  private history: { state: CharacterState; timestamp: number }[] = [];

  constructor(initialState: CharacterState = 'idle') {
    this.currentState = initialState;
    this.history.push({ state: initialState, timestamp: Date.now() });
  }

  public getState(): CharacterState {
    return this.currentState;
  }

  public getPreviousState(): CharacterState {
    return this.previousState;
  }

  public getHistory() {
    return [...this.history];
  }

  public subscribe(listener: (state: CharacterState, prev: CharacterState) => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public transition(nextState: CharacterState, force: boolean = false): boolean {
    if (nextState === this.currentState) return false;

    // Check priorities unless forced
    const currentPriority = STATE_PRIORITIES[this.currentState] || 10;
    const nextPriority = STATE_PRIORITIES[nextState] || 10;

    if (!force && nextPriority < currentPriority && this.timer !== null) {
      // Current high-priority transient state is still active; do not interrupt unless forced
      return false;
    }

    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    this.previousState = this.currentState;
    this.currentState = nextState;
    this.history = [{ state: nextState, timestamp: Date.now() }, ...this.history].slice(0, 30);

    // Notify subscribers
    this.listeners.forEach((fn) => {
      try {
        fn(this.currentState, this.previousState);
      } catch (err) {
        console.error('Error in state machine listener:', err);
      }
    });

    // Schedule auto fallback if configured
    const autoRule = DEFAULT_TIMEOUTS[nextState];
    if (autoRule) {
      this.timer = setTimeout(() => {
        this.transition(autoRule.fallback, true);
      }, autoRule.timeoutMs);
    }

    return true;
  }

  public reset(state: CharacterState = 'idle') {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.previousState = this.currentState;
    this.currentState = state;
    this.listeners.forEach((fn) => fn(this.currentState, this.previousState));
  }

  public destroy() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.listeners.clear();
  }
}
