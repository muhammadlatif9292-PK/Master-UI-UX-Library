/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { experienceEventBus } from './experienceEventBus';
import { ExperienceEventType, ExperienceEventPayload } from './eventBusTypes';
import { useTheme } from '../tokens/ThemeContext';

interface ExperienceEventContextType {
  emit: (type: ExperienceEventType, sourceId?: string, metadata?: Record<string, unknown>) => void;
  emitInteractionConfirmed: (sourceId?: string, metadata?: Record<string, unknown>) => void;
  emitInteractionStarted: (sourceId?: string, metadata?: Record<string, unknown>) => void;
  emitSelectionChanged: (sourceId?: string, metadata?: Record<string, unknown>) => void;
  emitNavigationChanged: (sourceId?: string, metadata?: Record<string, unknown>) => void;
  emitStateSuccess: (sourceId?: string, metadata?: Record<string, unknown>) => void;
  emitStateError: (sourceId?: string, metadata?: Record<string, unknown>) => void;
  history: ExperienceEventPayload[];
  clearHistory: () => void;
}

const ExperienceEventContext = createContext<ExperienceEventContextType | undefined>(undefined);

export function ExperienceEventProvider({ children }: { children: ReactNode }) {
  const { activeThemeId } = useTheme();
  const [history, setHistory] = useState<ExperienceEventPayload[]>([]);

  useEffect(() => {
    const unsubscribe = experienceEventBus.subscribe((payload) => {
      setHistory([...experienceEventBus.getHistory()]);
    });
    setHistory(experienceEventBus.getHistory());
    return unsubscribe;
  }, []);

  const emit = (type: ExperienceEventType, sourceId?: string, metadata?: Record<string, unknown>) => {
    experienceEventBus.emit(type, sourceId, metadata, activeThemeId);
  };

  const emitInteractionConfirmed = (sourceId?: string, metadata?: Record<string, unknown>) => {
    emit('interaction.confirmed', sourceId, metadata);
  };

  const emitInteractionStarted = (sourceId?: string, metadata?: Record<string, unknown>) => {
    emit('interaction.started', sourceId, metadata);
  };

  const emitSelectionChanged = (sourceId?: string, metadata?: Record<string, unknown>) => {
    emit('selection.changed', sourceId, metadata);
  };

  const emitNavigationChanged = (sourceId?: string, metadata?: Record<string, unknown>) => {
    emit('navigation.changed', sourceId, metadata);
  };

  const emitStateSuccess = (sourceId?: string, metadata?: Record<string, unknown>) => {
    emit('state.success', sourceId, metadata);
  };

  const emitStateError = (sourceId?: string, metadata?: Record<string, unknown>) => {
    emit('state.error', sourceId, metadata);
  };

  const clearHistory = () => {
    experienceEventBus.clearHistory();
    setHistory([]);
  };

  return (
    <ExperienceEventContext.Provider
      value={{
        emit,
        emitInteractionConfirmed,
        emitInteractionStarted,
        emitSelectionChanged,
        emitNavigationChanged,
        emitStateSuccess,
        emitStateError,
        history,
        clearHistory,
      }}
    >
      {children}
    </ExperienceEventContext.Provider>
  );
}

export function useExperienceEvents() {
  const context = useContext(ExperienceEventContext);
  if (!context) {
    throw new Error('useExperienceEvents must be used within an ExperienceEventProvider');
  }
  return context;
}
