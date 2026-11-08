/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, ReactNode } from 'react';

interface FocusTrapProps {
  active?: boolean;
  autoFocus?: boolean;
  restoreFocus?: boolean;
  children: ReactNode;
  className?: string;
  onEscape?: () => void;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), [contenteditable="true"]';

export function FocusTrap({
  active = true,
  autoFocus = true,
  restoreFocus = true,
  children,
  className,
  onEscape,
}: FocusTrapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!active) return;

    // Save previous active element to restore later
    previousActiveElementRef.current = document.activeElement as HTMLElement | null;

    if (autoFocus && containerRef.current) {
      // Find element with data-autofocus first, or first focusable
      const autofocusEl = containerRef.current.querySelector<HTMLElement>('[data-autofocus]');
      if (autofocusEl) {
        autofocusEl.focus();
      } else {
        const focusableElements = containerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
        if (focusableElements.length > 0) {
          focusableElements[0].focus();
        }
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!active || !containerRef.current) return;

      if (e.key === 'Escape') {
        if (onEscape) {
          e.preventDefault();
          e.stopPropagation();
          onEscape();
        }
        return;
      }

      if (e.key === 'Tab') {
        const elements = Array.from(
          containerRef.current.querySelectorAll(FOCUSABLE_SELECTOR)
        ) as HTMLElement[];
        const focusable = elements.filter((el) => el.offsetParent !== null); // only visible elements

        if (focusable.length === 0) {
          e.preventDefault();
          return;
        }

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement || !containerRef.current.contains(document.activeElement)) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement || !containerRef.current.contains(document.activeElement)) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown, true);

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
      if (restoreFocus && previousActiveElementRef.current && typeof previousActiveElementRef.current.focus === 'function') {
        try {
          previousActiveElementRef.current.focus();
        } catch {
          // Ignore potential focus error on unmounted elements
        }
      }
    };
  }, [active, autoFocus, restoreFocus, onEscape]);

  return (
    <div ref={containerRef} className={className} tabIndex={-1}>
      {children}
    </div>
  );
}
