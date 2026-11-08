/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useTheme } from '../../design-system/tokens/ThemeContext';
import { AUTH_REGISTRY } from '../../design-system/catalog/authRegistry';
import { CatalogEntry } from '../../design-system/catalog/catalogTypes';
import { VariantDetailPage } from '../detail/VariantDetailPage';
import { VisualShowroomCard } from '../VisualShowroomCard';
import {
  Shield,
  Search,
  Sparkles,
  Lock,
  ArrowRight,
  Star,
  Check,
  Cpu,
  Layers,
  Terminal,
} from 'lucide-react';

interface AuthFamilyCatalogProps {
  onSelectEntry?: (entry: CatalogEntry) => void;
}

export function AuthFamilyCatalog({ onSelectEntry }: AuthFamilyCatalogProps) {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAuthEntry, setSelectedAuthEntry] = useState<CatalogEntry | null>(null);

  const handleSelectEntry = (entry: CatalogEntry) => {
    if (onSelectEntry) {
      onSelectEntry(entry);
    } else {
      setSelectedAuthEntry(entry);
    }
  };

  if (selectedAuthEntry) {
    return (
      <div className="p-4 md:p-8 max-w-7xl mx-auto">
        <VariantDetailPage
          entry={selectedAuthEntry}
          onBack={() => setSelectedAuthEntry(null)}
          onSelectSiblingEntry={(sibling) => setSelectedAuthEntry(sibling)}
        />
      </div>
    );
  }

  const filteredEntries = AUTH_REGISTRY.filter((entry) =>
    entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-6 md:p-12 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className={`p-6 md:p-8 rounded-3xl ${theme.surface.primary} border ${theme.border.default} shadow-xl space-y-6`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-2">
              <Shield className="w-3.5 h-3.5 animate-pulse" /> Major Component Family: Authentication (20 Reference Variants)
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Enterprise Authentication & Login Suite</h1>
            <p className="text-xs md:text-sm opacity-70 mt-1">
              Explore 20 genuinely distinct visual and interaction directions for secure login, signup, OTP, passcodes, and AI companion flows.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-3 w-4 h-4 opacity-50" />
            <input
              type="text"
              placeholder="Search auth variants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/30 border ${theme.border.default} text-xs focus:outline-none ${theme.focus.ring}`}
            />
          </div>
        </div>
      </div>

      {/* Grid of 20 Auth Variants */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEntries.map((entry) => (
          <VisualShowroomCard
            key={entry.id}
            entry={entry}
            onOpen={handleSelectEntry}
          />
        ))}
      </div>
    </div>
  );
}
