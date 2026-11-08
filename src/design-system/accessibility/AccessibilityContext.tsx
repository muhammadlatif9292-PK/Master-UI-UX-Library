/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  AccessibilitySettings,
  AccessibilityPreset,
  AccessibilityPresetId,
  LiveAnnouncement,
} from './types';

const STORAGE_KEY = 'master_library_accessibility_settings_v1';

export const ACCESSIBILITY_PRESETS: AccessibilityPreset[] = [
  {
    id: 'default',
    name: 'Standard Visual Studio',
    badge: 'Standard',
    iconName: 'Sparkles',
    description: 'Full rich glassmorphism, dynamic spring physics, dynamic lighting, audio chimes, and standard contrast.',
    settings: {
      reducedMotion: false,
      reducedTransparency: false,
      reducedEffects: false,
      highContrast: false,
      largeText: false,
      nonColorIndicators: true,
      soundOff: false,
      hapticOff: false,
      keyboardNavigation: false,
      visibleFocus: false,
      screenReaderLabels: false,
      semanticStates: true,
      colorVisionFilter: 'none',
      showTouchTargetBoundaries: false,
      showFocusOrderOverlay: false,
      showContrastRatios: false,
      showScreenReaderOverlay: false,
    },
  },
  {
    id: 'wcag-aaa',
    name: 'WCAG 2.2 AAA Strict Compliance',
    badge: 'Level AAA',
    iconName: 'ShieldCheck',
    description: 'Enforces 7:1+ contrast, high-visibility 3px focus rings, text scaling, solid opaque surfaces, and non-color state glyphs.',
    settings: {
      reducedMotion: true,
      reducedTransparency: true,
      reducedEffects: true,
      highContrast: true,
      largeText: true,
      nonColorIndicators: true,
      soundOff: false,
      hapticOff: false,
      keyboardNavigation: true,
      visibleFocus: true,
      screenReaderLabels: true,
      semanticStates: true,
      showContrastRatios: true,
    },
  },
  {
    id: 'vestibular-safe',
    name: 'Vestibular Safe & Motion Sensitive',
    badge: 'Motion Safe',
    iconName: 'ZapOff',
    description: 'Strips all kinetic spring bounces, disables 3D parallax tilt, stops continuous rotations, and sets transitions to 0s.',
    settings: {
      reducedMotion: true,
      reducedEffects: true,
      visibleFocus: true,
    },
  },
  {
    id: 'low-vision',
    name: 'Low Vision & Glare Shield',
    badge: 'High Visibility',
    iconName: 'Eye',
    description: 'Pure black/white high contrast, +35% typography scale, zero transparency glare, and 3px double outline focus indicators.',
    settings: {
      highContrast: true,
      largeText: true,
      reducedTransparency: true,
      visibleFocus: true,
      nonColorIndicators: true,
    },
  },
  {
    id: 'motor-keyboard',
    name: 'Motor Operability & Pure Keyboard',
    badge: 'Keyboard Only',
    iconName: 'Keyboard',
    description: 'Expanded 48px+ touch hitboxes, roving tabindex navigation, ultra-visible focus rings, and skip-link shortcuts.',
    settings: {
      keyboardNavigation: true,
      visibleFocus: true,
      showTouchTargetBoundaries: true,
      showFocusOrderOverlay: true,
    },
  },
  {
    id: 'silent-tactile-free',
    name: 'Silent & Tactile-Free (Sensory Safe)',
    badge: 'Sensory Safe',
    iconName: 'VolumeX',
    description: 'Completely silences Web Audio synthesizer, disables navigator vibration calls, and routes all state feedback to visual indicators.',
    settings: {
      soundOff: true,
      hapticOff: true,
      nonColorIndicators: true,
      semanticStates: true,
    },
  },
  {
    id: 'screen-reader-audit',
    name: 'Screen Reader & Assistive Tech Inspector',
    badge: 'SR Inspector',
    iconName: 'Radio',
    description: 'Overlays semantic ARIA roles, computed accessible names, live region feeds, and focus sequencing directly on screen.',
    settings: {
      screenReaderLabels: true,
      semanticStates: true,
      showScreenReaderOverlay: true,
      showFocusOrderOverlay: true,
      visibleFocus: true,
    },
  },
];

const DEFAULT_SETTINGS: AccessibilitySettings = {
  reducedMotion: false,
  reducedTransparency: false,
  reducedEffects: false,
  highContrast: false,
  largeText: false,
  nonColorIndicators: true,
  soundOff: false,
  hapticOff: false,
  keyboardNavigation: false,
  visibleFocus: false,
  screenReaderLabels: false,
  semanticStates: true,
  colorVisionFilter: 'none',
  showTouchTargetBoundaries: false,
  showFocusOrderOverlay: false,
  showContrastRatios: false,
  showScreenReaderOverlay: false,
};

interface AccessibilityContextValue {
  settings: AccessibilitySettings;
  updateSetting: <K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => void;
  toggleSetting: (key: keyof AccessibilitySettings) => void;
  applyPreset: (presetId: AccessibilityPresetId) => void;
  activePresetId: AccessibilityPresetId | 'custom';
  resetToDefaults: () => void;
  announce: (message: string, politeness?: 'polite' | 'assertive') => void;
  announcements: LiveAnnouncement[];
  clearAnnouncements: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextValue | null>(null);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
        }
      } catch (e) {
        console.error('Failed to load accessibility settings from localStorage', e);
      }
    }
    return DEFAULT_SETTINGS;
  });

  const [activePresetId, setActivePresetId] = useState<AccessibilityPresetId | 'custom'>('default');
  const [announcements, setAnnouncements] = useState<LiveAnnouncement[]>([]);

  // Persist settings
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    }
  }, [settings]);

  // Sync with system prefers-reduced-motion media query if user has not explicitly configured it
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches && !settings.reducedMotion) {
        setSettings((prev) => ({ ...prev, reducedMotion: true }));
      }
    }
  }, []);

  const updateSetting = <K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
    setActivePresetId('custom');
  };

  const toggleSetting = (key: keyof AccessibilitySettings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    setActivePresetId('custom');
  };

  const applyPreset = (presetId: AccessibilityPresetId) => {
    const preset = ACCESSIBILITY_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      setSettings((prev) => ({
        ...DEFAULT_SETTINGS,
        ...preset.settings,
      }));
      setActivePresetId(presetId);
      announce(`Applied ${preset.name} accessibility preset`, 'polite');
    }
  };

  const resetToDefaults = () => {
    setSettings(DEFAULT_SETTINGS);
    setActivePresetId('default');
    announce('Accessibility settings reset to default', 'polite');
  };

  const announce = (message: string, politeness: 'polite' | 'assertive' = 'polite') => {
    const announcement: LiveAnnouncement = {
      id: `announcement-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      message,
      politeness,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    };

    setAnnouncements((prev) => [announcement, ...prev.slice(0, 19)]);
  };

  const clearAnnouncements = () => {
    setAnnouncements([]);
  };

  // Color Filter CSS generator
  const getColorFilterStyle = (): React.CSSProperties => {
    switch (settings.colorVisionFilter) {
      case 'protanopia':
        return { filter: 'url(#protanopia-filter)' };
      case 'deuteranopia':
        return { filter: 'url(#deuteranopia-filter)' };
      case 'tritanopia':
        return { filter: 'url(#tritanopia-filter)' };
      case 'achromatopsia':
        return { filter: 'grayscale(100%) contrast(110%)' };
      default:
        return {};
    }
  };

  return (
    <AccessibilityContext.Provider
      value={{
        settings,
        updateSetting,
        toggleSetting,
        applyPreset,
        activePresetId,
        resetToDefaults,
        announce,
        announcements,
        clearAnnouncements,
      }}
    >
      {/* SVG Color Blindness Simulation Matrices */}
      <svg style={{ position: 'absolute', height: 0, width: 0, overflow: 'hidden' }} aria-hidden="true">
        <defs>
          {/* Protanopia (Red-Blind) */}
          <filter id="protanopia-filter">
            <feColorMatrix
              type="matrix"
              values="0.567, 0.433, 0, 0, 0
                      0.558, 0.442, 0, 0, 0
                      0, 0.242, 0.758, 0, 0
                      0, 0, 0, 1, 0"
            />
          </filter>

          {/* Deuteranopia (Green-Blind) */}
          <filter id="deuteranopia-filter">
            <feColorMatrix
              type="matrix"
              values="0.625, 0.375, 0, 0, 0
                      0.7, 0.3, 0, 0, 0
                      0, 0.3, 0.7, 0, 0
                      0, 0, 0, 1, 0"
            />
          </filter>

          {/* Tritanopia (Blue-Blind) */}
          <filter id="tritanopia-filter">
            <feColorMatrix
              type="matrix"
              values="0.95, 0.05, 0, 0, 0
                      0, 0.433, 0.567, 0, 0
                      0, 0.475, 0.525, 0, 0
                      0, 0, 0, 1, 0"
            />
          </filter>
        </defs>
      </svg>

      {/* Global ARIA Live Region for Screen Readers */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {announcements[0]?.politeness === 'polite' && announcements[0]?.message}
      </div>
      <div className="sr-only" aria-live="assertive" aria-atomic="true">
        {announcements[0]?.politeness === 'assertive' && announcements[0]?.message}
      </div>

      {/* Application Root Container with Active Filter and Class Overrides */}
      <div
        style={getColorFilterStyle()}
        className={`w-full min-h-screen ${settings.highContrast ? 'a11y-high-contrast' : ''} ${
          settings.largeText ? 'a11y-large-text text-[18px]' : ''
        } ${settings.visibleFocus ? 'a11y-visible-focus' : ''} ${
          settings.reducedTransparency ? 'a11y-reduced-transparency' : ''
        } ${settings.reducedEffects ? 'a11y-reduced-effects' : ''} ${
          settings.reducedMotion ? 'a11y-reduced-motion' : ''
        }`}
      >
        {children}
      </div>
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}
