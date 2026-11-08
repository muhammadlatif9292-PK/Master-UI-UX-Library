/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ExpensiveEffectsRegistry } from './types';

// Global singleton registry tracking active expensive effects across the app
class ExpensiveEffectsManager {
  private listeners: Set<(effects: ExpensiveEffectsRegistry) => void> = new Set();
  
  private registry: ExpensiveEffectsRegistry = {
    backdropFiltersCount: 0,
    canvasRafLoopsCount: 0,
    active3DTransformsCount: 0,
    particleEnginesCount: 0,
    shadowFiltersCount: 0,
  };

  public getRegistry(): ExpensiveEffectsRegistry {
    return { ...this.registry };
  }

  public subscribe(listener: (effects: ExpensiveEffectsRegistry) => void): () => void {
    this.listeners.add(listener);
    listener(this.getRegistry());
    return () => {
      this.listeners.delete(listener);
    };
  }

  public registerEffect(type: keyof ExpensiveEffectsRegistry): () => void {
    this.registry[type]++;
    this.notify();

    let unreg = false;
    return () => {
      if (!unreg) {
        unreg = true;
        this.registry[type] = Math.max(0, this.registry[type] - 1);
        this.notify();
      }
    };
  }

  private notify() {
    const current = this.getRegistry();
    this.listeners.forEach((listener) => listener(current));
  }
}

export const expensiveEffectsManager = new ExpensiveEffectsManager();

/**
 * Hook to register an expensive effect during component mount
 */
export function useRegisterExpensiveEffect(type: keyof ExpensiveEffectsRegistry, enabled: boolean = true) {
  useEffect(() => {
    if (!enabled) return;
    const cleanup = expensiveEffectsManager.registerEffect(type);
    return cleanup;
  }, [type, enabled]);
}

/**
 * Hook that tracks the global expensive effect counts in real time
 */
export function useExpensiveEffectsTelemetry(): ExpensiveEffectsRegistry {
  const [effects, setEffects] = useState<ExpensiveEffectsRegistry>(() =>
    expensiveEffectsManager.getRegistry()
  );

  useEffect(() => {
    return expensiveEffectsManager.subscribe(setEffects);
  }, []);

  return effects;
}

/**
 * Loop Guard: Hook that ensures continuous requestAnimationFrame loops
 * automatically PAUSE when:
 * 1. Document tab is hidden (document.hidden)
 * 2. Element is scrolled out of viewport (IntersectionObserver)
 * 3. Component is unmounted
 * 4. User is idle or Tier 1 is active
 */
export function usePreventIdleLoop({
  enabled,
  onFrame,
  elementRef,
}: {
  enabled: boolean;
  onFrame: (timestamp: number, deltaTime: number) => void;
  elementRef?: React.RefObject<HTMLElement | null>;
}) {
  const rafIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const isVisibleRef = useRef<boolean>(true);
  const isTabActiveRef = useRef<boolean>(!document.hidden);
  const [isLoopActive, setIsLoopActive] = useState<boolean>(false);

  // 1. Monitor Tab Visibility
  useEffect(() => {
    const handleVisibilityChange = () => {
      isTabActiveRef.current = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // 2. Monitor Viewport Intersection (if elementRef is provided)
  useEffect(() => {
    if (!elementRef?.current || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );

    observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [elementRef]);

  // 3. Register as an active RAF loop
  useRegisterExpensiveEffect('canvasRafLoopsCount', enabled && isLoopActive);

  // 4. Safe RequestAnimationFrame Driver
  useEffect(() => {
    if (!enabled) {
      setIsLoopActive(false);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      return;
    }

    setIsLoopActive(true);
    lastTimeRef.current = performance.now();

    const loop = (timestamp: number) => {
      // Prevent unnecessary execution when tab is hidden or element is scrolled off-screen
      if (isTabActiveRef.current && isVisibleRef.current) {
        const delta = Math.min(100, timestamp - lastTimeRef.current);
        lastTimeRef.current = timestamp;
        onFrame(timestamp, delta);
      } else {
        lastTimeRef.current = timestamp;
      }

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      setIsLoopActive(false);
    };
  }, [enabled, onFrame]);

  return { isLoopActive };
}
