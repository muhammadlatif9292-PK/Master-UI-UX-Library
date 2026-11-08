/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ComponentDefinition, ComponentVariant, ComponentFamilyId, DesignArchetype } from '../types/architecture';
import { createStyleRecipeFromArchetype, STANDARD_MOTION_RECIPES, STANDARD_SENSORY_RECIPES } from '../design-system/recipes/recipeEngine';

// Example Registry Database holding definitions and variants
class ComponentRegistryManager {
  private families: Map<ComponentFamilyId, ComponentDefinition> = new Map();

  constructor() {
    this.registerInitialFamilies();
  }

  private registerInitialFamilies() {
    // 1. Login Family Definition
    const loginVariants: ComponentVariant[] = [
      {
        id: 'login-luxury-obsidian',
        name: 'Obsidian & Gold Luxury Login',
        familyId: 'login',
        archetype: 'restrained-luxury',
        description: 'Bespoke dark velvet aesthetic with gold foil accents, serif typography, and subtle glass depth.',
        version: '1.0.0',
        author: 'Lead Architect',
        createdAt: '2026-08-27',
        styleRecipe: createStyleRecipeFromArchetype(
          'login-luxury-obsidian',
          'Obsidian Luxury',
          'restrained-luxury'
        ),
        motionRecipe: STANDARD_MOTION_RECIPES.luxuryFluid,
        interactionRecipe: STANDARD_SENSORY_RECIPES.subtleGlass,
        accessibility: {
          wcagTarget: 'AAA',
          contrastRatio: 14.5,
          screenReaderAnnouncement: 'Secure luxury login form loaded.',
          keyboardNavigable: true,
          focusRingClasses: 'focus:ring-2 focus:ring-[#D4AF37] focus:outline-none',
          ariaLandmarks: ['form', 'region'],
        },
        responsive: {
          minWidthSupport: '320px',
          fluidScaling: true,
          touchTargetMinimumPx: 48,
          breakpointBehavior: 'stack',
        },
        performance: {
          tier: 'tier-1-ultra',
          estimatedFps: 60,
          domNodeComplexity: 'medium',
          gpuAccelerated: true,
          lazyLoadable: false,
        },
        codeArtifact: {
          fileName: 'LoginLuxuryObsidian.tsx',
          language: 'tsx',
          rawCode: `export function LoginLuxuryObsidian() { return <div>Luxury Login</div>; }`,
          dependencies: {
            packages: ['motion', 'lucide-react'],
            tailwindPluginsNeeded: ['@tailwindcss/vite'],
          },
        },
        aiSpecification: {
          promptTemplate: 'Generate a high-end luxury login form with dark obsidian background, gold accents, and Playfair Display headings.',
          designIntent: 'Restrained luxury conveying high status and absolute security.',
          colorHexCodes: ['#0A0A0B', '#121215', '#D4AF37', '#F4F4F6'],
          animationParameters: { stiffness: 180, damping: 30, entryStyle: 'luxury-wipe' },
          accessibilityNotes: 'Full contrast compliance for gold text on dark obsidian.',
          suggestedPromptForCursor: 'Build a login component using Tailwind with dark obsidian surface #121215 and gold accents #D4AF37.',
        },
        tags: ['auth', 'luxury', 'dark', 'serif'],
        isFeatured: true,
      },
      {
        id: 'login-cyber-hud',
        name: 'Cyberpunk HUD Terminal Login',
        familyId: 'login',
        archetype: 'futuristic-cyber',
        description: 'Sci-fi terminal interface with cyan wireframe borders, monospace typography, and digital audio feedback.',
        version: '1.0.0',
        author: 'Lead Architect',
        createdAt: '2026-08-27',
        styleRecipe: createStyleRecipeFromArchetype(
          'login-cyber-hud',
          'Cyber HUD',
          'futuristic-cyber'
        ),
        motionRecipe: STANDARD_MOTION_RECIPES.cyberGlitch,
        interactionRecipe: STANDARD_SENSORY_RECIPES.cyberTerminal,
        accessibility: {
          wcagTarget: 'AA',
          contrastRatio: 9.2,
          screenReaderAnnouncement: 'Cybernetic secure authentication terminal ready.',
          keyboardNavigable: true,
          focusRingClasses: 'focus:ring-2 focus:ring-cyan-400 focus:outline-none',
          ariaLandmarks: ['form', 'complementary'],
        },
        responsive: {
          minWidthSupport: '320px',
          fluidScaling: true,
          touchTargetMinimumPx: 44,
          breakpointBehavior: 'stack',
        },
        performance: {
          tier: 'tier-1-ultra',
          estimatedFps: 120,
          domNodeComplexity: 'low',
          gpuAccelerated: true,
          lazyLoadable: false,
        },
        codeArtifact: {
          fileName: 'LoginCyberHUD.tsx',
          language: 'tsx',
          rawCode: `export function LoginCyberHUD() { return <div>Cyber Login</div>; }`,
          dependencies: {
            packages: ['motion', 'lucide-react'],
            tailwindPluginsNeeded: ['@tailwindcss/vite'],
          },
        },
        aiSpecification: {
          promptTemplate: 'Generate a futuristic cyberpunk terminal login interface with cyan glow and monospace font.',
          designIntent: 'High-tech sci-fi simulation for developer tools and futuristic dashboards.',
          colorHexCodes: ['#020617', '#090D16', '#22D3EE', '#06B6D4'],
          animationParameters: { stiffness: 500, damping: 15, entryStyle: 'glitch' },
          accessibilityNotes: 'Neon cyan text on deep slate background meeting WCAG AA.',
          suggestedPromptForCursor: 'Build a cyberpunk login component with cyan glowing borders and monospace typography.',
        },
        tags: ['auth', 'cyberpunk', 'sci-fi', 'hud', 'terminal'],
        isFeatured: true,
      },
    ];

    this.families.set('login', {
      familyId: 'login',
      name: 'Login & Authentication',
      description: 'Secure entry points and authentication flows across diverse aesthetic archetypes.',
      iconName: 'Lock',
      headlessStateInterface: 'useLoginHeadlessState',
      defaultVariantId: 'login-luxury-obsidian',
      variants: loginVariants,
    });
  }

  public getFamily(familyId: ComponentFamilyId): ComponentDefinition | undefined {
    return this.families.get(familyId);
  }

  public getAllFamilies(): ComponentDefinition[] {
    return Array.from(this.families.values());
  }

  public getVariant(variantId: string): ComponentVariant | undefined {
    for (const family of this.families.values()) {
      const found = family.variants.find((v) => v.id === variantId);
      if (found) return found;
    }
    return undefined;
  }
}

export const componentRegistry = new ComponentRegistryManager();
