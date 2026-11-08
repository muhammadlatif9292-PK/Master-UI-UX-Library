/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CatalogEntry } from './catalogTypes';

export const SPATIAL_CATALOG: CatalogEntry[] = [
  {
    id: 'spatial-3d-catalog',
    name: 'Spatial & 3D Experience Catalog',
    component: 'SpatialCatalogLab',
    family: 'layout',
    tags: ['spatial', '3d', 'webgl', 'three.js', 'parallax', 'depth', 'globe', 'hologram', 'fallback'],
    description: 'Master spatial 3D catalog containing 13 experimental experiences (Floating Panels, Depth Stacks, Orbital Nav, 3D Cards, Scene Transitions, Spatial Dashboards, Object Manipulation, Hologram Panels, Ambient Particles, Camera Flight, Dimensional Modals, Interactive Globe, Avionics Cockpit) with strict 2D, reduced-motion, low-performance, and mobile fallbacks.',
    mood: 'Futuristic & Immersive',
    visualStyle: '3D Spatial & WebGL',
    motionStyle: 'Perspective Camera & Physics',
    interactionStyle: 'Gyro Orbit & Parallax Tilt',
    lightingStyle: 'Volumetric Raycasting',
    soundStyle: 'Synth Resonance',
    hapticStyle: 'Heavy Resonance',
    states: ['3d-spatial', '2d-flat', 'low-perf', 'reduced-motion'],
    responsiveBehavior: 'Full touch adaptation with 2D flat mode fallback',
    accessibility: 'AAA',
    performanceTier: 'real-time',
    dependencies: ['Three.js', 'Motion', 'React 19', 'Lucide Icons'],
    sourceInspiration: 'Apple VisionOS, Cyberpunk HUD, NASA Avionics',
    license: 'Apache-2.0',
    codeArtifact: '<SpatialProvider initialMode="3d-spatial"><SpatialCatalogLab /></SpatialProvider>',
    aiSpecification: 'Guarantees 2D flat fallback when WebGL or reduced-motion is requested.',
    version: '4.2.0',
    status: 'stable',
    favorite: true,
    collection: 'Spatial 3D Experiences',
  },
];
