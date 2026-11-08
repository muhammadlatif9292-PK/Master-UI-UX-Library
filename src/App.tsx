/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ThemeProvider } from './design-system/tokens/ThemeContext';
import { MotionProvider } from './design-system/motion/MotionContext';
import { ExperienceEventProvider } from './design-system/events/ExperienceEventContext';
import { SoundProvider } from './design-system/sound/SoundContext';
import { HapticProvider } from './design-system/haptics/HapticContext';
import { OrganizationProvider } from './design-system/catalog/OrganizationContext';
import { OverlayProvider } from './design-system/overlay/OverlayContext';
import { FeedbackProvider } from './design-system/feedback/FeedbackContext';
import { ToastHost } from './design-system/feedback/ToastHost';
import { AccessibilityProvider } from './design-system/accessibility/AccessibilityContext';
import { PerformanceProvider } from './design-system/performance/PerformanceContext';
import { ExperienceLevelProvider } from './design-system/experience/ExperienceLevelContext';
import { LibraryOnboardingProvider } from './design-system/onboarding/LibraryOnboardingContext';
import { MasterLibraryApp } from './components/MasterLibraryApp';

export default function App() {
  return (
    <ExperienceLevelProvider>
      <AccessibilityProvider>
        <PerformanceProvider>
          <ThemeProvider>
            <MotionProvider>
              <ExperienceEventProvider>
                <SoundProvider>
                  <HapticProvider>
                    <OrganizationProvider>
                      <OverlayProvider>
                        <FeedbackProvider>
                          <LibraryOnboardingProvider>
                            <MasterLibraryApp />
                            <ToastHost />
                          </LibraryOnboardingProvider>
                        </FeedbackProvider>
                      </OverlayProvider>
                    </OrganizationProvider>
                  </HapticProvider>
                </SoundProvider>
              </ExperienceEventProvider>
            </MotionProvider>
          </ThemeProvider>
        </PerformanceProvider>
      </AccessibilityProvider>
    </ExperienceLevelProvider>
  );
}
