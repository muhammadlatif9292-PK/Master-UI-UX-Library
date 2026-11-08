/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode, useRef } from 'react';
import { OverlayItem, OverlayType, InteractionModel, OverlayVisualTheme } from './overlayTypes';

interface OpenOverlayOptions {
  id?: string;
  type: OverlayType;
  title: string;
  interactionModel?: InteractionModel;
  visualStyle?: OverlayVisualTheme;
  dismissOnEscape?: boolean;
  dismissOnOutsideClick?: boolean;
  preventScroll?: boolean;
  trapFocus?: boolean;
  ariaRole?: string;
  onClose?: () => void;
}

interface OverlayContextValue {
  stack: OverlayItem[];
  activeOverlayCount: number;
  topOverlay: OverlayItem | null;
  openOverlay: (options: OpenOverlayOptions) => string;
  closeOverlay: (id: string) => void;
  closeTopOverlay: () => void;
  closeAllOverlays: () => void;
  isOverlayOpen: (id: string) => boolean;
  getOverlayZIndex: (id: string) => number;
  globalInteractionModel: InteractionModel;
  setGlobalInteractionModel: (model: InteractionModel) => void;
  globalVisualStyle: OverlayVisualTheme;
  setGlobalVisualStyle: (style: OverlayVisualTheme) => void;
  screenReaderAnnouncement: string;
  announceToScreenReader: (message: string) => void;
}

const OverlayContext = createContext<OverlayContextValue | undefined>(undefined);

const BASE_Z_INDEX = 50;

export function OverlayProvider({ children }: { children: ReactNode }) {
  const [stack, setStack] = useState<OverlayItem[]>([]);
  const [globalInteractionModel, setGlobalInteractionModel] = useState<InteractionModel>('spring');
  const [globalVisualStyle, setGlobalVisualStyle] = useState<OverlayVisualTheme>('glass');
  const [screenReaderAnnouncement, setScreenReaderAnnouncement] = useState<string>('');

  const stackRef = useRef<OverlayItem[]>([]);
  stackRef.current = stack;

  const announceToScreenReader = useCallback((message: string) => {
    setScreenReaderAnnouncement(message);
  }, []);

  const closeOverlay = useCallback((id: string) => {
    setStack((prev) => {
      const itemToClose = prev.find((item) => item.id === id);
      if (itemToClose?.onClose) {
        try {
          itemToClose.onClose();
        } catch (err) {
          console.error('Error in overlay onClose handler:', err);
        }
      }
      return prev.filter((item) => item.id !== id);
    });
  }, []);

  const closeTopOverlay = useCallback(() => {
    const currentStack = stackRef.current;
    if (currentStack.length === 0) return;
    const top = currentStack[currentStack.length - 1];
    if (top.dismissOnEscape !== false) {
      closeOverlay(top.id);
      announceToScreenReader(`Closed ${top.title || top.type}`);
    }
  }, [closeOverlay, announceToScreenReader]);

  const closeAllOverlays = useCallback(() => {
    stackRef.current.forEach((item) => {
      if (item.onClose) {
        try {
          item.onClose();
        } catch (err) {
          console.error(err);
        }
      }
    });
    setStack([]);
    announceToScreenReader('All overlays closed');
  }, [announceToScreenReader]);

  const openOverlay = useCallback(
    (options: OpenOverlayOptions): string => {
      const id = options.id || `overlay-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
      const activeEl = document.activeElement as HTMLElement | null;

      setStack((prev) => {
        // If already in stack, update it
        const exists = prev.some((item) => item.id === id);
        if (exists) {
          return prev.map((item) =>
            item.id === id
              ? {
                  ...item,
                  ...options,
                  zIndex: item.zIndex,
                }
              : item
          );
        }

        const newZIndex = BASE_Z_INDEX + prev.length * 10;
        const newItem: OverlayItem = {
          id,
          type: options.type,
          title: options.title,
          zIndex: newZIndex,
          interactionModel: options.interactionModel || globalInteractionModel,
          visualStyle: options.visualStyle || globalVisualStyle,
          dismissOnEscape: options.dismissOnEscape ?? true,
          dismissOnOutsideClick: options.dismissOnOutsideClick ?? true,
          preventScroll: options.preventScroll ?? true,
          trapFocus: options.trapFocus ?? true,
          ariaRole: options.ariaRole || 'dialog',
          createdAt: Date.now(),
          restoreFocusElement: activeEl,
          onClose: options.onClose,
        };

        return [...prev, newItem];
      });

      announceToScreenReader(`Opened ${options.title || options.type}`);
      return id;
    },
    [globalInteractionModel, globalVisualStyle, announceToScreenReader]
  );

  const isOverlayOpen = useCallback((id: string) => {
    return stack.some((item) => item.id === id);
  }, [stack]);

  const getOverlayZIndex = useCallback(
    (id: string) => {
      const item = stack.find((i) => i.id === id);
      return item ? item.zIndex : BASE_Z_INDEX;
    },
    [stack]
  );

  // Global Escape Key Listener for Top-Layer Dismissal
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && stackRef.current.length > 0) {
        e.preventDefault();
        e.stopPropagation();
        closeTopOverlay();
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown, true);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown, true);
  }, [closeTopOverlay]);

  // Viewport / Body Scroll Lock Management
  useEffect(() => {
    const hasScrollLockOverlay = stack.some((item) => item.preventScroll);
    if (hasScrollLockOverlay) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [stack]);

  const topOverlay = stack.length > 0 ? stack[stack.length - 1] : null;

  return (
    <OverlayContext.Provider
      value={{
        stack,
        activeOverlayCount: stack.length,
        topOverlay,
        openOverlay,
        closeOverlay,
        closeTopOverlay,
        closeAllOverlays,
        isOverlayOpen,
        getOverlayZIndex,
        globalInteractionModel,
        setGlobalInteractionModel,
        globalVisualStyle,
        setGlobalVisualStyle,
        screenReaderAnnouncement,
        announceToScreenReader,
      }}
    >
      {children}
      {/* Hidden Live Region for Accessibility Screen Reader Announcements */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only pointer-events-none fixed -left-[9999px] -top-[9999px]"
      >
        {screenReaderAnnouncement}
      </div>
    </OverlayContext.Provider>
  );
}

export function useOverlay() {
  const context = useContext(OverlayContext);
  if (!context) {
    throw new Error('useOverlay must be used within an OverlayProvider');
  }
  return context;
}
