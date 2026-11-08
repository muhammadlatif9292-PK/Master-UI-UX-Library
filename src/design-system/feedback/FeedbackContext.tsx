/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { StateVariant, FeedbackVisualLanguage, SuccessAnimationType } from './feedbackTypes';
import { useSound } from '../sound/SoundContext';
import { useHaptics } from '../haptics/HapticContext';

export interface ToastItem {
  id: string;
  variant: StateVariant;
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  duration?: number;
  undoable?: boolean;
  onUndo?: () => void;
  timestamp: number;
}

export interface BannerItem {
  id: string;
  variant: StateVariant;
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  dismissible?: boolean;
  sticky?: boolean;
}

export interface SnackbarItem {
  id: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  duration?: number;
}

interface FeedbackContextType {
  // Global configuration
  activeLanguage: FeedbackVisualLanguage;
  setActiveLanguage: (lang: FeedbackVisualLanguage) => void;
  preferredSuccessAnimation: SuccessAnimationType;
  setPreferredSuccessAnimation: (anim: SuccessAnimationType) => void;

  // Active items
  toasts: ToastItem[];
  banners: BannerItem[];
  snackbars: SnackbarItem[];

  // Triggers
  showToast: (toast: Omit<ToastItem, 'id' | 'timestamp'>) => string;
  dismissToast: (id: string) => void;
  clearAllToasts: () => void;

  showBanner: (banner: Omit<BannerItem, 'id'>) => string;
  dismissBanner: (id: string) => void;

  showSnackbar: (message: string, actionLabel?: string, onAction?: () => void, duration?: number) => string;
  dismissSnackbar: (id: string) => void;

  // Success helper that triggers sound + haptics respectfully
  triggerSuccess: (title: string, message?: string, animType?: SuccessAnimationType) => void;
  // Error helper that guarantees clear, restrained, recoverable guidance
  triggerError: (title: string, message: string, retryAction?: () => void) => void;
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

export function FeedbackProvider({ children }: { children: ReactNode }) {
  const [activeLanguage, setActiveLanguage] = useState<FeedbackVisualLanguage>('glass');
  const [preferredSuccessAnimation, setPreferredSuccessAnimation] = useState<SuccessAnimationType>('spring-confirm');

  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [banners, setBanners] = useState<BannerItem[]>([]);
  const [snackbars, setSnackbars] = useState<SnackbarItem[]>([]);

  const { playSound } = useSound();
  const { triggerHaptic } = useHaptics();

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (toast: Omit<ToastItem, 'id' | 'timestamp'>): string => {
      const id = 'toast_' + Math.random().toString(36).substring(2, 9);
      const newToast: ToastItem = {
        ...toast,
        id,
        timestamp: Date.now(),
        duration: toast.duration ?? 4500,
      };

      // Sound & haptic coordination based on state variant
      if (toast.variant === 'success') {
        playSound('success', 'STATE');
        triggerHaptic('success');
      } else if (toast.variant === 'error') {
        playSound('error', 'STATE');
        triggerHaptic('error');
      } else if (toast.variant === 'warning') {
        playSound('warning', 'STATE');
        triggerHaptic('warning');
      } else {
        playSound('notification', 'STATE');
        triggerHaptic('light');
      }

      setToasts((prev) => [newToast, ...prev].slice(0, 5));

      if (newToast.duration && newToast.duration > 0) {
        setTimeout(() => {
          dismissToast(id);
        }, newToast.duration);
      }

      return id;
    },
    [playSound, triggerHaptic, dismissToast]
  );

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const dismissBanner = useCallback((id: string) => {
    setBanners((prev) => prev.filter((b) => b.id !== id));
  }, []);

  const showBanner = useCallback(
    (banner: Omit<BannerItem, 'id'>): string => {
      const id = 'banner_' + Math.random().toString(36).substring(2, 9);
      const newBanner: BannerItem = { ...banner, id };
      setBanners((prev) => [newBanner, ...prev.filter((b) => b.title !== banner.title)]);
      playSound(banner.variant === 'error' ? 'error' : 'notification', 'STATE');
      return id;
    },
    [playSound]
  );

  const dismissSnackbar = useCallback((id: string) => {
    setSnackbars((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const showSnackbar = useCallback(
    (message: string, actionLabel?: string, onAction?: () => void, duration: number = 4000): string => {
      const id = 'sb_' + Math.random().toString(36).substring(2, 9);
      const newSb: SnackbarItem = { id, message, actionLabel, onAction, duration };
      setSnackbars([newSb]);
      playSound('toggle', 'MICRO');
      triggerHaptic('light');

      setTimeout(() => {
        dismissSnackbar(id);
      }, duration);

      return id;
    },
    [playSound, triggerHaptic, dismissSnackbar]
  );

  const triggerSuccess = useCallback(
    (title: string, message?: string, animType?: SuccessAnimationType) => {
      if (animType) setPreferredSuccessAnimation(animType);
      showToast({
        variant: 'success',
        title,
        message,
        duration: 3800,
      });
    },
    [showToast]
  );

  const triggerError = useCallback(
    (title: string, message: string, retryAction?: () => void) => {
      showToast({
        variant: 'error',
        title,
        message,
        actionLabel: retryAction ? 'Retry Action' : undefined,
        onAction: retryAction,
        duration: 6000,
      });
    },
    [showToast]
  );

  return (
    <FeedbackContext.Provider
      value={{
        activeLanguage,
        setActiveLanguage,
        preferredSuccessAnimation,
        setPreferredSuccessAnimation,
        toasts,
        banners,
        snackbars,
        showToast,
        dismissToast,
        clearAllToasts,
        showBanner,
        dismissBanner,
        showSnackbar,
        dismissSnackbar,
        triggerSuccess,
        triggerError,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
}

export function useFeedback() {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error('useFeedback must be used within a FeedbackProvider');
  }
  return context;
}
