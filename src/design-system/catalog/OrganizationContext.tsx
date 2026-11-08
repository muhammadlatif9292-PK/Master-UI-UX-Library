/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { UserOrganizationData, INITIAL_ORGANIZATION_DATA } from './organizationTypes';

export interface OrganizationContextType {
  data: UserOrganizationData;
  favoritesCount: number;
  collectionsCount: number;
  toggleFavorite: (entryId: string) => void;
  addFavorite: (entryId: string) => void;
  removeFavorite: (entryId: string) => void;
  isFavorite: (entryId: string) => boolean;
  addCollection: (name: string, description: string, entryIds?: string[]) => void;
  updateCollection: (collectionId: string, updates: Partial<{ name: string; description: string; entryIds: string[] }>) => void;
  deleteCollection: (collectionId: string) => void;
  addToCollection: (collectionId: string, entryId: string) => void;
  removeFromCollection: (collectionId: string, entryId: string) => void;
  isInCollection: (collectionId: string, entryId: string) => boolean;
  saveNote: (entryId: string, note: string) => void;
  deleteNote: (entryId: string) => void;
  addCustomTag: (entryId: string, tag: string) => void;
  removeCustomTag: (entryId: string, tag: string) => void;
  recordView: (entryId: string) => void;
  recordUse: (entryId: string) => void;
  togglePinStyle: (styleName: string) => void;
  isStylePinned: (styleName: string) => boolean;
  saveCombination: (name: string, entryIds: string[]) => void;
  updateCombination: (comboId: string, name: string, entryIds: string[]) => void;
  deleteCombination: (comboId: string) => void;
  resetToDefaults: () => void;
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined);

const STORAGE_KEY = 'ai_studio_master_library_org_v1';

/**
 * Validates and sanitizes raw storage data against corrupted or malformed localStorage content.
 */
function sanitizeOrganizationData(raw: unknown): UserOrganizationData {
  if (!raw || typeof raw !== 'object') {
    return INITIAL_ORGANIZATION_DATA;
  }

  const obj = raw as Record<string, any>;

  const favorites = Array.isArray(obj.favorites)
    ? obj.favorites.filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
    : INITIAL_ORGANIZATION_DATA.favorites;

  const collections = Array.isArray(obj.collections)
    ? obj.collections
        .filter((col) => col && typeof col === 'object' && typeof col.id === 'string' && typeof col.name === 'string')
        .map((col) => ({
          id: String(col.id),
          name: String(col.name),
          description: typeof col.description === 'string' ? col.description : '',
          entryIds: Array.isArray(col.entryIds)
            ? col.entryIds.filter((id: unknown): id is string => typeof id === 'string')
            : [],
        }))
    : INITIAL_ORGANIZATION_DATA.collections;

  const notes: Record<string, string> = {};
  if (obj.notes && typeof obj.notes === 'object' && !Array.isArray(obj.notes)) {
    for (const [key, val] of Object.entries(obj.notes)) {
      if (typeof val === 'string') {
        notes[key] = val;
      }
    }
  }

  const customTags: Record<string, string[]> = {};
  if (obj.customTags && typeof obj.customTags === 'object' && !Array.isArray(obj.customTags)) {
    for (const [key, val] of Object.entries(obj.customTags)) {
      if (Array.isArray(val)) {
        customTags[key] = val.filter((t): t is string => typeof t === 'string');
      }
    }
  }

  const recentlyViewed = Array.isArray(obj.recentlyViewed)
    ? obj.recentlyViewed.filter((id): id is string => typeof id === 'string')
    : INITIAL_ORGANIZATION_DATA.recentlyViewed;

  const recentlyUsed = Array.isArray(obj.recentlyUsed)
    ? obj.recentlyUsed.filter((id): id is string => typeof id === 'string')
    : INITIAL_ORGANIZATION_DATA.recentlyUsed;

  const pinnedStyles = Array.isArray(obj.pinnedStyles)
    ? obj.pinnedStyles.filter((s): s is string => typeof s === 'string')
    : INITIAL_ORGANIZATION_DATA.pinnedStyles;

  const savedCombinations = Array.isArray(obj.savedCombinations)
    ? obj.savedCombinations
        .filter((combo) => combo && typeof combo === 'object' && typeof combo.id === 'string')
        .map((combo) => ({
          id: String(combo.id),
          name: typeof combo.name === 'string' ? combo.name : 'Saved Combination',
          entryIds: Array.isArray(combo.entryIds)
            ? combo.entryIds.filter((id: unknown): id is string => typeof id === 'string')
            : [],
          createdAt: typeof combo.createdAt === 'string' ? combo.createdAt : new Date().toISOString(),
        }))
    : INITIAL_ORGANIZATION_DATA.savedCombinations;

  return {
    version: typeof obj.version === 'string' ? obj.version : INITIAL_ORGANIZATION_DATA.version,
    favorites,
    collections,
    notes: Object.keys(notes).length > 0 ? notes : INITIAL_ORGANIZATION_DATA.notes,
    customTags: Object.keys(customTags).length > 0 ? customTags : INITIAL_ORGANIZATION_DATA.customTags,
    recentlyViewed,
    recentlyUsed,
    pinnedStyles,
    savedCombinations,
  };
}

export function OrganizationProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<UserOrganizationData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return sanitizeOrganizationData(parsed);
      }
    } catch (e) {
      console.warn('Malformed or unreadable organization storage in localStorage, using defaults.', e);
    }
    return INITIAL_ORGANIZATION_DATA;
  });

  // Persist state safely to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Failed to persist organization state to localStorage:', e);
    }
  }, [data]);

  // Synchronize across browser tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setData(sanitizeOrganizationData(parsed));
        } catch {
          // ignore corrupted cross-tab updates
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const toggleFavorite = useCallback((entryId: string) => {
    setData((prev) => {
      const isFav = prev.favorites.includes(entryId);
      return {
        ...prev,
        favorites: isFav ? prev.favorites.filter((id) => id !== entryId) : [entryId, ...prev.favorites],
      };
    });
  }, []);

  const addFavorite = useCallback((entryId: string) => {
    setData((prev) => {
      if (prev.favorites.includes(entryId)) return prev;
      return {
        ...prev,
        favorites: [entryId, ...prev.favorites],
      };
    });
  }, []);

  const removeFavorite = useCallback((entryId: string) => {
    setData((prev) => ({
      ...prev,
      favorites: prev.favorites.filter((id) => id !== entryId),
    }));
  }, []);

  const isFavorite = useCallback((entryId: string) => data.favorites.includes(entryId), [data.favorites]);

  const addCollection = useCallback((name: string, description: string, entryIds: string[] = []) => {
    const newCol = {
      id: `col-${Date.now()}`,
      name,
      description,
      entryIds,
    };
    setData((prev) => ({
      ...prev,
      collections: [...prev.collections, newCol],
    }));
  }, []);

  const updateCollection = useCallback(
    (collectionId: string, updates: Partial<{ name: string; description: string; entryIds: string[] }>) => {
      setData((prev) => ({
        ...prev,
        collections: prev.collections.map((col) => (col.id === collectionId ? { ...col, ...updates } : col)),
      }));
    },
    []
  );

  const deleteCollection = useCallback((collectionId: string) => {
    setData((prev) => ({
      ...prev,
      collections: prev.collections.filter((col) => col.id !== collectionId),
    }));
  }, []);

  const addToCollection = useCallback((collectionId: string, entryId: string) => {
    setData((prev) => ({
      ...prev,
      collections: prev.collections.map((col) => {
        if (col.id === collectionId && !col.entryIds.includes(entryId)) {
          return { ...col, entryIds: [...col.entryIds, entryId] };
        }
        return col;
      }),
    }));
  }, []);

  const removeFromCollection = useCallback((collectionId: string, entryId: string) => {
    setData((prev) => ({
      ...prev,
      collections: prev.collections.map((col) => {
        if (col.id === collectionId) {
          return { ...col, entryIds: col.entryIds.filter((id) => id !== entryId) };
        }
        return col;
      }),
    }));
  }, []);

  const isInCollection = useCallback(
    (collectionId: string, entryId: string) => {
      const col = data.collections.find((c) => c.id === collectionId);
      return col ? col.entryIds.includes(entryId) : false;
    },
    [data.collections]
  );

  const saveNote = useCallback((entryId: string, note: string) => {
    setData((prev) => {
      if (!note.trim()) {
        const nextNotes = { ...prev.notes };
        delete nextNotes[entryId];
        return { ...prev, notes: nextNotes };
      }
      return {
        ...prev,
        notes: { ...prev.notes, [entryId]: note },
      };
    });
  }, []);

  const deleteNote = useCallback((entryId: string) => {
    setData((prev) => {
      const nextNotes = { ...prev.notes };
      delete nextNotes[entryId];
      return { ...prev, notes: nextNotes };
    });
  }, []);

  const addCustomTag = useCallback((entryId: string, tag: string) => {
    const trimmed = tag.trim().toLowerCase();
    if (!trimmed) return;
    setData((prev) => {
      const currentTags = prev.customTags[entryId] || [];
      if (currentTags.includes(trimmed)) return prev;
      return {
        ...prev,
        customTags: { ...prev.customTags, [entryId]: [...currentTags, trimmed] },
      };
    });
  }, []);

  const removeCustomTag = useCallback((entryId: string, tag: string) => {
    setData((prev) => {
      const currentTags = prev.customTags[entryId] || [];
      return {
        ...prev,
        customTags: { ...prev.customTags, [entryId]: currentTags.filter((t) => t !== tag) },
      };
    });
  }, []);

  const recordView = useCallback((entryId: string) => {
    setData((prev) => {
      const filtered = prev.recentlyViewed.filter((id) => id !== entryId);
      return {
        ...prev,
        recentlyViewed: [entryId, ...filtered].slice(0, 20),
      };
    });
  }, []);

  const recordUse = useCallback((entryId: string) => {
    setData((prev) => {
      const filtered = prev.recentlyUsed.filter((id) => id !== entryId);
      return {
        ...prev,
        recentlyUsed: [entryId, ...filtered].slice(0, 20),
      };
    });
  }, []);

  const togglePinStyle = useCallback((styleName: string) => {
    setData((prev) => {
      const isPinned = prev.pinnedStyles.includes(styleName);
      return {
        ...prev,
        pinnedStyles: isPinned ? prev.pinnedStyles.filter((s) => s !== styleName) : [...prev.pinnedStyles, styleName],
      };
    });
  }, []);

  const isStylePinned = useCallback((styleName: string) => data.pinnedStyles.includes(styleName), [data.pinnedStyles]);

  const saveCombination = useCallback((name: string, entryIds: string[]) => {
    const newCombo = {
      id: `combo-${Date.now()}`,
      name: name.trim() || 'Custom Combination',
      entryIds,
      createdAt: new Date().toISOString(),
    };
    setData((prev) => ({
      ...prev,
      savedCombinations: [newCombo, ...prev.savedCombinations],
    }));
  }, []);

  const updateCombination = useCallback((comboId: string, name: string, entryIds: string[]) => {
    setData((prev) => ({
      ...prev,
      savedCombinations: prev.savedCombinations.map((combo) =>
        combo.id === comboId ? { ...combo, name: name.trim() || combo.name, entryIds } : combo
      ),
    }));
  }, []);

  const deleteCombination = useCallback((comboId: string) => {
    setData((prev) => ({
      ...prev,
      savedCombinations: prev.savedCombinations.filter((c) => c.id !== comboId),
    }));
  }, []);

  const resetToDefaults = useCallback(() => {
    setData(INITIAL_ORGANIZATION_DATA);
  }, []);

  return (
    <OrganizationContext.Provider
      value={{
        data,
        favoritesCount: data.favorites.length,
        collectionsCount: data.collections.length,
        toggleFavorite,
        addFavorite,
        removeFavorite,
        isFavorite,
        addCollection,
        updateCollection,
        deleteCollection,
        addToCollection,
        removeFromCollection,
        isInCollection,
        saveNote,
        deleteNote,
        addCustomTag,
        removeCustomTag,
        recordView,
        recordUse,
        togglePinStyle,
        isStylePinned,
        saveCombination,
        updateCombination,
        deleteCombination,
        resetToDefaults,
      }}
    >
      {children}
    </OrganizationContext.Provider>
  );
}

export function useOrganization() {
  const context = useContext(OrganizationContext);
  if (!context) {
    throw new Error('useOrganization must be used within an OrganizationProvider');
  }
  return context;
}
