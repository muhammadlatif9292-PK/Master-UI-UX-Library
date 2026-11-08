/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useTheme } from '../design-system/tokens/ThemeContext';
import { useOrganization } from '../design-system/catalog/OrganizationContext';
import { CATALOG_REGISTRY } from '../design-system/catalog/catalogRegistry';
import { CatalogEntry } from '../design-system/catalog/catalogTypes';
import {
  FolderPlus,
  Star,
  Bookmark,
  Clock,
  Pin,
  Tag,
  FileText,
  Plus,
  Trash2,
  Sparkles,
  ChevronRight,
  Shield,
  Layers,
  X,
} from 'lucide-react';

interface PersonalOrganizerProps {
  onSelectEntry: (entry: CatalogEntry) => void;
}

export function PersonalOrganizer({ onSelectEntry }: PersonalOrganizerProps) {
  const { theme } = useTheme();
  const {
    data,
    toggleFavorite,
    addCollection,
    addToCollection,
    removeFromCollection,
    saveNote,
    addCustomTag,
    removeCustomTag,
    togglePinStyle,
    deleteCombination,
  } = useOrganization();

  const [activeTab, setActiveTab] = useState<'favorites' | 'collections' | 'recent' | 'pinned' | 'combinations'>('favorites');
  const [newCollectionName, setNewCollectionName] = useState('');
  const [newCollectionDesc, setNewCollectionDesc] = useState('');
  const [selectedEntryForNotes, setSelectedEntryForNotes] = useState<CatalogEntry | null>(null);
  const [noteInput, setNoteInput] = useState('');
  const [tagInput, setTagInput] = useState('');

  const favoriteEntries = CATALOG_REGISTRY.filter((e) => data.favorites.includes(e.id));
  const recentViewedEntries = data.recentlyViewed.map((id) => CATALOG_REGISTRY.find((e) => e.id === id)).filter(Boolean) as CatalogEntry[];
  const recentUsedEntries = data.recentlyUsed.map((id) => CATALOG_REGISTRY.find((e) => e.id === id)).filter(Boolean) as CatalogEntry[];

  const handleCreateCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCollectionName.trim()) return;
    addCollection(newCollectionName.trim(), newCollectionDesc.trim() || 'Custom user collection');
    setNewCollectionName('');
    setNewCollectionDesc('');
  };

  const handleSaveNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEntryForNotes) return;
    saveNote(selectedEntryForNotes.id, noteInput);
    setSelectedEntryForNotes(null);
  };

  const handleAddTagSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEntryForNotes || !tagInput.trim()) return;
    addCustomTag(selectedEntryForNotes.id, tagInput.trim());
    setTagInput('');
  };

  return (
    <div className="p-6 md:p-12 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className={`p-6 md:p-8 rounded-3xl ${theme.surface.primary} border ${theme.border.default} shadow-xl space-y-6`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-2">
              <Bookmark className="w-3.5 h-3.5 animate-pulse" /> Personal Library & Workspace
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Catalog Organization & Collections</h1>
            <p className="text-xs md:text-sm opacity-70 mt-1">
              Manage your personal favorites, curated collections, persistent notes, custom tags, and saved combinations.
            </p>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-t border-white/10 pt-4">
          {[
            { id: 'favorites', label: `Favorites (${favoriteEntries.length})`, icon: Star },
            { id: 'collections', label: `Collections (${data.collections.length})`, icon: FolderPlus },
            { id: 'recent', label: `Recent (${recentViewedEntries.length})`, icon: Clock },
            { id: 'pinned', label: `Pinned Styles (${data.pinnedStyles.length})`, icon: Pin },
            { id: 'combinations', label: `Saved Combinations (${data.savedCombinations.length})`, icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-mono flex items-center gap-2 shrink-0 transition-all ${
                  isActive
                    ? 'bg-cyan-500 text-zinc-950 font-bold shadow-md'
                    : 'bg-black/30 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Favorites */}
      {activeTab === 'favorites' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteEntries.length === 0 ? (
            <div className="col-span-full py-16 text-center text-xs font-mono opacity-50">
              No favorite components saved yet. Star items from the Master Catalog to add them here.
            </div>
          ) : (
            favoriteEntries.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectEntry(item)}
                className={`p-6 rounded-2xl ${theme.surface.primary} border ${theme.border.default} hover:border-cyan-500/50 transition-all cursor-pointer group space-y-4 shadow-lg flex flex-col justify-between`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-cyan-400 uppercase">
                      {item.family}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(item.id);
                      }}
                      className="p-1 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    </button>
                  </div>

                  <div>
                    <h3 className="font-bold text-base text-white group-hover:text-cyan-300 transition-colors">{item.name}</h3>
                    <p className="text-xs opacity-70 mt-1.5 leading-relaxed line-clamp-2">{item.description}</p>
                  </div>

                  {data.notes[item.id] && (
                    <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-[11px] text-purple-300 font-mono">
                      <strong className="text-purple-400">Note:</strong> {data.notes[item.id]}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedEntryForNotes(item);
                      setNoteInput(data.notes[item.id] || '');
                    }}
                    className="text-[11px] font-mono text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    <FileText className="w-3.5 h-3.5" /> Edit Note
                  </button>
                  <span className="text-[11px] font-mono opacity-60 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Inspect <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Collections */}
      {activeTab === 'collections' && (
        <div className="space-y-8">
          {/* Create Collection Form */}
          <div className={`p-6 rounded-2xl ${theme.surface.primary} border ${theme.border.default} space-y-4 shadow-xl`}>
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <FolderPlus className="w-4 h-4 text-cyan-400" /> Create New Curated Collection
            </h3>
            <form onSubmit={handleCreateCollection} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Collection Name (e.g. My Favorite Logins)"
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
                className={`px-4 py-2.5 rounded-xl bg-black/20 border ${theme.border.default} text-xs focus:outline-none ${theme.focus.ring}`}
              />
              <input
                type="text"
                placeholder="Description"
                value={newCollectionDesc}
                onChange={(e) => setNewCollectionDesc(e.target.value)}
                className={`px-4 py-2.5 rounded-xl bg-black/20 border ${theme.border.default} text-xs focus:outline-none ${theme.focus.ring}`}
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> Create Collection
              </button>
            </form>
          </div>

          {/* Collections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.collections.map((col) => {
              const colEntries = col.entryIds.map((id) => CATALOG_REGISTRY.find((e) => e.id === id)).filter(Boolean) as CatalogEntry[];
              return (
                <div key={col.id} className={`p-6 rounded-3xl ${theme.surface.primary} border ${theme.border.default} space-y-4 shadow-xl`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-base text-white">{col.name}</h4>
                      <p className="text-xs opacity-70 mt-0.5">{col.description}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
                      {colEntries.length} items
                    </span>
                  </div>

                  {/* Items in Collection */}
                  <div className="space-y-2 pt-2">
                    {colEntries.length === 0 ? (
                      <div className="text-xs font-mono opacity-50 py-4 text-center">Collection is empty.</div>
                    ) : (
                      colEntries.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => onSelectEntry(item)}
                          className={`p-3 rounded-xl ${theme.surface.secondary} border ${theme.border.subtle} flex items-center justify-between cursor-pointer hover:border-cyan-500/50 transition-all`}
                        >
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-cyan-400" />
                            <span className="text-xs font-semibold text-white">{item.name}</span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFromCollection(col.id, item.id);
                            }}
                            className="p-1 rounded hover:bg-rose-500/20 text-rose-400 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Recent Activity */}
      {activeTab === 'recent' && (
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" /> Recently Viewed Catalog Items
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentViewedEntries.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectEntry(item)}
                  className={`p-4 rounded-2xl ${theme.surface.primary} border ${theme.border.default} cursor-pointer hover:border-cyan-500/50 transition-all space-y-2`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-cyan-400 uppercase">{item.family}</span>
                    <span className="text-[10px] font-mono opacity-50">Viewed Recently</span>
                  </div>
                  <div className="font-bold text-sm text-white">{item.name}</div>
                  <p className="text-xs opacity-70 line-clamp-1">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-white/10">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" /> Recently Used in Sandbox
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentUsedEntries.length === 0 ? (
                <div className="text-xs font-mono opacity-50">No sandbox interactions recorded yet.</div>
              ) : (
                recentUsedEntries.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onSelectEntry(item)}
                    className={`p-4 rounded-2xl ${theme.surface.primary} border ${theme.border.default} cursor-pointer hover:border-emerald-500/50 transition-all space-y-2`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-emerald-400 uppercase">{item.family}</span>
                      <span className="text-[10px] font-mono opacity-50">Tested</span>
                    </div>
                    <div className="font-bold text-sm text-white">{item.name}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Pinned Styles */}
      {activeTab === 'pinned' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Glassmorphism', 'Neon Glow', 'Industrial Knob', 'Layered Paper', 'Terminal Minimal', 'Clean Minimalist'].map((styleName) => {
              const isPinned = data.pinnedStyles.includes(styleName);
              return (
                <div
                  key={styleName}
                  className={`p-6 rounded-2xl ${theme.surface.primary} border ${
                    isPinned ? 'border-cyan-500 shadow-cyan-500/10' : theme.border.default
                  } flex items-center justify-between shadow-xl`}
                >
                  <div className="space-y-1">
                    <div className="font-bold text-sm text-white">{styleName}</div>
                    <div className="text-[11px] font-mono opacity-60">Design System Recipe</div>
                  </div>
                  <button
                    onClick={() => togglePinStyle(styleName)}
                    className={`p-2 rounded-xl transition-all ${
                      isPinned ? 'bg-cyan-500 text-zinc-950 font-bold' : 'bg-white/5 border border-white/10 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Pin className={`w-4 h-4 ${isPinned ? 'fill-zinc-950' : ''}`} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 5: Saved Combinations */}
      {activeTab === 'combinations' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.savedCombinations.length === 0 ? (
              <div className="col-span-full py-16 text-center text-xs font-mono opacity-50">
                No saved combinations found.
              </div>
            ) : (
              data.savedCombinations.map((combo) => {
                const comboEntries = combo.entryIds.map((id) => CATALOG_REGISTRY.find((e) => e.id === id)).filter(Boolean) as CatalogEntry[];
                return (
                  <div key={combo.id} className={`p-6 rounded-3xl ${theme.surface.primary} border ${theme.border.default} space-y-4 shadow-xl`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-base text-white">{combo.name}</h4>
                        <p className="text-[10px] font-mono opacity-50">Created: {new Date(combo.createdAt).toLocaleDateString()}</p>
                      </div>
                      <button
                        onClick={() => deleteCombination(combo.id)}
                        className="p-2 rounded-xl hover:bg-rose-500/20 text-rose-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {comboEntries.map((item) => (
                        <span key={item.id} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-cyan-300">
                          {item.name}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Notes Modal */}
      {selectedEntryForNotes && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4">
          <div className={`w-full max-w-lg rounded-3xl ${theme.surface.primary} border ${theme.border.default} p-6 space-y-6 shadow-2xl relative`}>
            <button
              onClick={() => setSelectedEntryForNotes(null)}
              className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="font-bold text-lg text-white">Manage Notes & Tags</h3>
              <p className="text-xs opacity-70 mt-1">{selectedEntryForNotes.name}</p>
            </div>

            <form onSubmit={handleSaveNoteSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-mono opacity-70">Personal Note (e.g. "use for AI app", "avoid on mobile", "needs lighter animation")</label>
                <textarea
                  rows={3}
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  placeholder="Enter private notes, deployment gotchas, or architectural requirements..."
                  className={`w-full p-3 rounded-xl bg-black/20 border ${theme.border.default} text-xs focus:outline-none ${theme.focus.ring}`}
                />
              </div>

              {/* Tag Management */}
              <div className="space-y-2">
                <label className="text-xs font-mono opacity-70">Custom Tags</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Add custom tag (e.g. ai-app)"
                    className={`flex-1 px-3 py-2 rounded-xl bg-black/20 border ${theme.border.default} text-xs focus:outline-none`}
                  />
                  <button
                    type="button"
                    onClick={handleAddTagSubmit}
                    className="px-3 py-2 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 font-bold text-xs hover:bg-purple-500/30"
                  >
                    Add Tag
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {(data.customTags[selectedEntryForNotes.id] || []).map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[11px] font-mono flex items-center gap-1"
                    >
                      #{t}
                      <button
                        type="button"
                        onClick={() => removeCustomTag(selectedEntryForNotes.id, t)}
                        className="hover:text-rose-400 ml-1"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Add to Collection Select */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <label className="text-xs font-mono opacity-70">Add to Curated Collection</label>
                <div className="flex flex-wrap gap-2">
                  {data.collections.map((col) => {
                    const isInCol = col.entryIds.includes(selectedEntryForNotes.id);
                    return (
                      <button
                        key={col.id}
                        type="button"
                        onClick={() => {
                          if (isInCol) {
                            removeFromCollection(col.id, selectedEntryForNotes.id);
                          } else {
                            addToCollection(col.id, selectedEntryForNotes.id);
                          }
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all ${
                          isInCol
                            ? 'bg-cyan-500 text-zinc-950 font-bold'
                            : 'bg-white/5 border border-white/10 text-zinc-300 hover:bg-white/10'
                        }`}
                      >
                        {isInCol ? '✓ ' : '+ '}{col.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setSelectedEntryForNotes(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-zinc-300 text-xs font-bold hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs shadow-md"
                >
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
