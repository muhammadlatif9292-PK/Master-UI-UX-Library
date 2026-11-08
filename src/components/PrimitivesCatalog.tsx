/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useTheme } from '../design-system/tokens/ThemeContext';
import {
  Container,
  Stack,
  Grid,
  Flex,
  Layer,
  Surface,
  GlassSurface,
  GlowSurface,
  Divider,
  Text,
  Heading,
  Badge,
  Status,
  FocusRing,
  TooltipAnchor,
  Scene,
  Environment,
  DepthLayer,
} from '../design-system/primitives/primitives';
import { Layers, Sparkles, Check, Shield, Eye, Smartphone, Monitor, Moon, Sun } from 'lucide-react';

export function PrimitivesCatalog() {
  const { theme, activeThemeId, setThemeId } = useTheme();
  const [testMode, setTestMode] = useState<'all' | 'keyboard' | 'mobile' | 'desktop'>('all');

  return (
    <Scene className={`${testMode === 'mobile' ? 'max-w-sm mx-auto border-x border-zinc-800' : ''}`}>
      {/* Header Catalog Control */}
      <div className={`p-6 rounded-2xl ${theme.surface.primary} border ${theme.border.default} shadow-xl flex flex-wrap items-center justify-between gap-6 backdrop-blur-xl`}>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-white/10 border border-white/20 text-current shadow-lg">
            <Layers className="w-6 h-6 text-cyan-400 animate-pulse" />
          </div>
          <div>
            <Heading level={1}>Primitive Catalog & Storybook</Heading>
            <Text variant="secondary" size="xs">
              Production-quality, token-bound design system primitives with keyboard, mobile, and theme testing modes.
            </Text>
          </div>
        </div>

        {/* View Testing Toggles */}
        <div className="flex items-center gap-2 flex-wrap">
          {(['all', 'mobile', 'desktop'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setTestMode(mode)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono uppercase transition-all ${
                testMode === mode
                  ? 'bg-cyan-500 text-zinc-950 font-bold shadow-md'
                  : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      <Divider />

      {/* 1. Containers & Layouts */}
      <Environment>
        <Stack spacing={6}>
          <Heading level={2}>1. Containers, Stacks, Grids & Flex</Heading>
          <Text variant="secondary" size="sm">
            Structured spacing and layout wrappers enforcing mathematical padding and responsive grid scales.
          </Text>

          <Grid cols={3} gap={4}>
            <Surface variant="primary">
              <Heading level={4}>Surface Primary</Heading>
              <Text variant="muted" size="xs">Standard token surface container.</Text>
            </Surface>
            <Surface variant="secondary">
              <Heading level={4}>Surface Secondary</Heading>
              <Text variant="muted" size="xs">Contrasting container layer.</Text>
            </Surface>
            <Surface variant="elevated">
              <Heading level={4}>Surface Elevated</Heading>
              <Text variant="muted" size="xs">High emphasis container.</Text>
            </Surface>
          </Grid>
        </Stack>
      </Environment>

      {/* 2. Glass & Glow Surfaces */}
      <Grid cols={2} gap={6}>
        <GlassSurface>
          <Stack spacing={3}>
            <Badge variant="primary">Glass Surface</Badge>
            <Heading level={3}>Frosted Blur Environment</Heading>
            <Text variant="secondary" size="sm">
              Features gorgeous translucent blur, backdrop filters, and subtle luminescent border highlights.
            </Text>
          </Stack>
        </GlassSurface>

        <GlowSurface>
          <Stack spacing={3}>
            <Badge variant="success">Glow Surface</Badge>
            <Heading level={3}>Active Radiant State</Heading>
            <Text variant="secondary" size="sm">
              Highlighted active state with multi-layered glowing drop shadows and primary accent borders.
            </Text>
          </Stack>
        </GlowSurface>
      </Grid>

      {/* 3. Typography & Badges */}
      <Environment>
        <Stack spacing={6}>
          <Heading level={2}>3. Typography, Badges & Status Indicators</Heading>
          <Stack spacing={3}>
            <Heading level={1}>Heading Level 1 Display</Heading>
            <Heading level={2}>Heading Level 2 Section</Heading>
            <Heading level={3}>Heading Level 3 Subheading</Heading>
            <Text variant="primary">Primary body text with standard contrast and optimal line height.</Text>
            <Text variant="secondary">Secondary descriptive text for muted context.</Text>
            <Text variant="muted" mono>Monospace metadata and telemetry text identifier.</Text>
          </Stack>

          <Flex className="gap-4 flex-wrap">
            <Badge variant="primary">Primary Badge</Badge>
            <Badge variant="success">Success Badge</Badge>
            <Badge variant="warning">Warning Badge</Badge>
            <Badge variant="error">Error Badge</Badge>
            <Status status="success" label="System Operational" />
            <Status status="warning" label="High Latency Warning" />
            <Status status="error" label="Connection Offline" />
          </Flex>
        </Stack>
      </Environment>

      {/* 4. Focus Rings & Tooltip Anchors */}
      <Environment>
        <Stack spacing={6}>
          <Heading level={2}>4. Focus Rings & Tooltip Anchors</Heading>
          <Flex className="gap-6 flex-wrap">
            <FocusRing>
              <button className={`px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono`}>
                Keyboard Focusable Button
              </button>
            </FocusRing>

            <TooltipAnchor label="Tooltip Anchor Preview">
              <button className={`px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono hover:bg-white/10 transition-all`}>
                Hover for Tooltip
              </button>
            </TooltipAnchor>
          </Flex>
        </Stack>
      </Environment>

      {/* 5. Depth Layers & Scenes */}
      <Grid cols={3} gap={6}>
        <DepthLayer depth={0}>
          <Layer elevation="flat">
            <Heading level={4}>Depth 0 (Flat)</Heading>
            <Text variant="muted" size="xs">Zero elevation layer.</Text>
          </Layer>
        </DepthLayer>
        <DepthLayer depth={1}>
          <Layer elevation="raised">
            <Heading level={4}>Depth 1 (Raised)</Heading>
            <Text variant="muted" size="xs">Standard card elevation.</Text>
          </Layer>
        </DepthLayer>
        <DepthLayer depth={2}>
          <Layer elevation="overlay">
            <Heading level={4}>Depth 2 (Overlay)</Heading>
            <Text variant="muted" size="xs">Elevated modal shadow.</Text>
          </Layer>
        </DepthLayer>
      </Grid>
    </Scene>
  );
}
