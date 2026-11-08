/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AttentionTarget } from './types';

export interface GazeVector {
  x: number; // -1 (far left) to 1 (far right)
  y: number; // -1 (top) to 1 (bottom)
  distance: number;
  isBlinking: boolean;
  pupilDilation: number; // 0.8 to 1.25
}

export class CharacterAttentionEngine {
  private currentX = 0;
  private currentY = 0;
  private targetX = 0;
  private targetY = 0;
  private isBlinking = false;
  private blinkTimer: any = null;
  private saccadeTimer: any = null;
  private saccadeOffsetX = 0;
  private saccadeOffsetY = 0;
  private activeTarget: AttentionTarget | null = null;
  private targetExpiryTimer: any = null;
  private listeners: Set<(gaze: GazeVector) => void> = new Set();
  private rafId: number | null = null;
  private lastTime = 0;

  constructor() {
    this.scheduleNextBlink();
    this.scheduleNextSaccade();
    this.startLoop();
  }

  public setAttentionTarget(target: AttentionTarget | null, durationMs?: number) {
    this.activeTarget = target;
    if (this.targetExpiryTimer) {
      clearTimeout(this.targetExpiryTimer);
      this.targetExpiryTimer = null;
    }

    if (target) {
      this.targetX = Math.max(-1, Math.min(1, target.x));
      this.targetY = Math.max(-1, Math.min(1, target.y));

      if (durationMs && durationMs > 0) {
        this.targetExpiryTimer = setTimeout(() => {
          this.activeTarget = null;
          this.targetX = 0;
          this.targetY = 0;
        }, durationMs);
      }
    } else {
      this.targetX = 0;
      this.targetY = 0;
    }
  }

  public lookAtElement(elementOrSelector: HTMLElement | string, durationMs: number = 4000) {
    let el: HTMLElement | null = null;
    if (typeof elementOrSelector === 'string') {
      el = document.querySelector(elementOrSelector);
    } else {
      el = elementOrSelector;
    }

    if (!el || typeof window === 'undefined') return;

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const normX = (centerX / window.innerWidth) * 2 - 1;
    const normY = (centerY / window.innerHeight) * 2 - 1;

    this.setAttentionTarget(
      {
        x: normX,
        y: normY,
        id: el.id || 'target-element',
        label: el.getAttribute('aria-label') || el.innerText?.slice(0, 20) || 'element',
        mode: 'element',
        priority: 60,
      },
      durationMs
    );
  }

  public updateCursorPosition(clientX: number, clientY: number, characterBounds?: DOMRect) {
    if (this.activeTarget && this.activeTarget.mode === 'element' && (this.activeTarget.priority || 0) > 40) {
      // Element target has priority
      return;
    }

    if (characterBounds && typeof window !== 'undefined') {
      const charCenterX = characterBounds.left + characterBounds.width / 2;
      const charCenterY = characterBounds.top + characterBounds.height / 2;
      const deltaX = clientX - charCenterX;
      const deltaY = clientY - charCenterY;
      const maxDist = Math.max(window.innerWidth, window.innerHeight) * 0.75;

      this.targetX = Math.max(-1, Math.min(1, deltaX / (maxDist * 0.5)));
      this.targetY = Math.max(-1, Math.min(1, deltaY / (maxDist * 0.5)));
    } else if (typeof window !== 'undefined') {
      this.targetX = (clientX / window.innerWidth) * 2 - 1;
      this.targetY = (clientY / window.innerHeight) * 2 - 1;
    }
  }

  public subscribe(listener: (gaze: GazeVector) => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public getGaze(): GazeVector {
    const finalX = Math.max(-1, Math.min(1, this.currentX + this.saccadeOffsetX));
    const finalY = Math.max(-1, Math.min(1, this.currentY + this.saccadeOffsetY));
    const distance = Math.sqrt(finalX * finalX + finalY * finalY);

    return {
      x: finalX,
      y: finalY,
      distance,
      isBlinking: this.isBlinking,
      pupilDilation: 1 + Math.sin(Date.now() * 0.001) * 0.05,
    };
  }

  public triggerBlink(durationMs: number = 160) {
    this.isBlinking = true;
    setTimeout(() => {
      this.isBlinking = false;
    }, durationMs);
  }

  private scheduleNextBlink() {
    const delay = 3200 + Math.random() * 3800; // 3.2s to 7.0s
    this.blinkTimer = setTimeout(() => {
      this.triggerBlink(140);
      this.scheduleNextBlink();
    }, delay);
  }

  private scheduleNextSaccade() {
    const delay = 1800 + Math.random() * 2600;
    this.saccadeTimer = setTimeout(() => {
      if (!this.activeTarget || this.activeTarget.mode === 'ambient') {
        // Micro organic drift
        this.saccadeOffsetX = (Math.random() - 0.5) * 0.12;
        this.saccadeOffsetY = (Math.random() - 0.5) * 0.08;
      } else {
        this.saccadeOffsetX = 0;
        this.saccadeOffsetY = 0;
      }
      this.scheduleNextSaccade();
    }, delay);
  }

  private startLoop() {
    const loop = (time: number) => {
      // Smooth lerp towards target
      const lerpFactor = 0.12;
      this.currentX += (this.targetX - this.currentX) * lerpFactor;
      this.currentY += (this.targetY - this.currentY) * lerpFactor;

      const gaze = this.getGaze();
      this.listeners.forEach((listener) => {
        try {
          listener(gaze);
        } catch (e) {
          // ignore
        }
      });

      if (typeof window !== 'undefined') {
        this.rafId = requestAnimationFrame(loop);
      }
    };

    if (typeof window !== 'undefined') {
      this.rafId = requestAnimationFrame(loop);
    }
  }

  public destroy() {
    if (this.blinkTimer) clearTimeout(this.blinkTimer);
    if (this.saccadeTimer) clearTimeout(this.saccadeTimer);
    if (this.targetExpiryTimer) clearTimeout(this.targetExpiryTimer);
    if (this.rafId && typeof window !== 'undefined') {
      cancelAnimationFrame(this.rafId);
    }
    this.listeners.clear();
  }
}
