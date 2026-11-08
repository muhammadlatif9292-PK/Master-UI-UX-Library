/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface UserOrganizationData {
  version: string;
  favorites: string[];
  collections: {
    id: string;
    name: string;
    description: string;
    entryIds: string[];
  }[];
  notes: Record<string, string>; // entryId -> user notes
  customTags: Record<string, string[]>; // entryId -> custom tags
  recentlyViewed: string[]; // entryIds ordered by most recent
  recentlyUsed: string[]; // entryIds ordered by most recent state trigger
  pinnedStyles: string[];
  savedCombinations: {
    id: string;
    name: string;
    entryIds: string[];
    createdAt: string;
  }[];
}

export const INITIAL_ORGANIZATION_DATA: UserOrganizationData = {
  version: '1.0.0',
  favorites: ['auth-cinematic-mascot', 'auth-obsidian-luxury', 'nav-floating-glass-dock', 'nav-command-palette', 'ai-prompt-box'],
  collections: [
    {
      id: 'my-best-logins',
      name: 'My Best Logins',
      description: 'Hand-picked flagship authentication portals featuring reactive mascots, luxury gold accents, and sci-fi glass setups.',
      entryIds: ['auth-cinematic-mascot', 'auth-obsidian-luxury', 'auth-aurora-glass', 'auth-ai-companion', 'auth-spatial-floating'],
    },
    {
      id: 'prod-candidates',
      name: 'Production Candidates',
      description: 'Fully audited, AAA accessibility, high-performance UI components ready for enterprise production deployment.',
      entryIds: ['auth-obsidian-luxury', 'auth-crystal-minimal', 'nav-standard-bottom', 'nav-command-palette', 'nav-spotlight-navigation', 'container-fluid', 'status-indicator'],
    },
    {
      id: 'experimental',
      name: 'Experimental',
      description: 'High-creativity prototypes exploring 3D spatial cards, reactive plasma orbs, and phosphor CRT screens.',
      entryIds: ['auth-retro-terminal', 'auth-reactive-orb', 'auth-portal-dimensional', 'nav-radial-menu', 'nav-orbital-navigation', 'nav-physics-navigation'],
    },
    {
      id: 'science-lab',
      name: 'Science',
      description: 'Analytical telemetry dashboards, blueprint grids, and scientific laboratory portals for technical tools.',
      entryIds: ['auth-laboratory', 'nav-command-center', 'event-bus-inspector', 'status-indicator'],
    },
    {
      id: 'ai-interfaces',
      name: 'AI',
      description: 'Generative AI prompt boxes, conversational companion logins, neural telemetry, and streaming agent dialogs.',
      entryIds: ['auth-ai-companion', 'ai-prompt-box', 'auth-cinematic-mascot'],
    },
    {
      id: 'mobile-first',
      name: 'Mobile',
      description: 'Touch-optimized bottom navigation bars, gesture swipe controllers, and compact mobile docks.',
      entryIds: ['nav-standard-bottom', 'nav-gesture-navigation', 'nav-swipe-navigation', 'nav-liquid-tab-bar'],
    },
    {
      id: 'minimalist',
      name: 'Minimal',
      description: 'Pristine minimalist forms with Swiss typography, monochrome crystal clarity, and zero clutter.',
      entryIds: ['auth-crystal-minimal', 'auth-minimal-cinema', 'nav-minimal-text', 'nav-icon-only'],
    },
    {
      id: 'cinematic-style',
      name: 'Cinematic',
      description: 'Dramatic dark room surfaces, glowing neon highlights, glassmorphism, and poster typography.',
      entryIds: ['auth-aurora-glass', 'auth-minimal-cinema', 'auth-neon-noir', 'auth-holographic', 'nav-floating-glass-dock', 'glass-surface'],
    },
    {
      id: 'navigation-ideas',
      name: 'Navigation Ideas',
      description: 'Innovative navigation paradigms ranging from floating docks and radial wheels to command palettes and gesture bars.',
      entryIds: ['nav-floating-glass-dock', 'nav-command-palette', 'nav-radial-menu', 'nav-liquid-tab-bar', 'nav-gesture-navigation', 'nav-spatial-navigation'],
    },
  ],
  notes: {
    'auth-cinematic-mascot': 'use for AI app — interactive mascot engages users on signup',
    'nav-radial-menu': 'avoid on mobile — best for desktop/tablet circular menu ergonomics',
    'auth-portal-dimensional': 'needs lighter animation on low-power mobile devices',
    'nav-command-palette': 'essential for power-user keyboard shortcuts (Cmd+K)',
    'auth-obsidian-luxury': 'ideal for fintech, VIP banking, and luxury concierge applications',
    'nav-gesture-navigation': 'test edge swipe sensitivity on iOS Safari iframe preview',
  },
  customTags: {
    'auth-cinematic-mascot': ['ai-app', 'mascot', 'flagship', 'interactive'],
    'nav-radial-menu': ['avoid-mobile', 'radial', 'experimental'],
    'auth-portal-dimensional': ['needs-lighter-animation', '3d', 'portal'],
    'auth-obsidian-luxury': ['production', 'luxury', 'gold'],
    'nav-command-palette': ['production', 'power-user', 'keyboard'],
    'nav-standard-bottom': ['mobile', 'production', 'ios'],
  },
  recentlyViewed: ['auth-cinematic-mascot', 'nav-command-palette', 'auth-obsidian-luxury', 'nav-floating-glass-dock'],
  recentlyUsed: ['auth-cinematic-mascot', 'nav-command-palette'],
  pinnedStyles: ['Cinematic Glassmorphism', 'Obsidian & Gold', 'Phosphor CRT Terminal', 'Liquid Glass'],
  savedCombinations: [
    {
      id: 'combo-1',
      name: 'Flagship AI Companion Portal',
      entryIds: ['auth-cinematic-mascot', 'auth-ai-companion', 'nav-command-palette', 'ai-prompt-box'],
      createdAt: new Date().toISOString(),
    },
    {
      id: 'combo-2',
      name: 'Luxury Enterprise Suite',
      entryIds: ['auth-obsidian-luxury', 'nav-floating-glass-dock', 'status-indicator'],
      createdAt: new Date().toISOString(),
    },
  ],
};
