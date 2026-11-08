/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  SpatialProvider,
  useSpatial,
  FloatingPanels,
  DepthStacks,
  OrbitalNavigation,
  ThreeDCard,
  SceneTransitions,
  SpatialDashboard,
  ObjectManipulation,
  HolographicPanels,
  AmbientParticles,
  CameraTransitions,
  DimensionalModal,
  InteractiveGlobe,
  InstrumentEnvironment,
  SpatialDisplayMode,
} from '../../design-system/spatial';
import {
  Box,
  Layers,
  Compass,
  Sparkles,
  Camera,
  LayoutDashboard,
  Radio,
  Globe,
  Activity,
  Shield,
  Smartphone,
  Gauge,
  Code,
  CheckCircle2,
  Copy,
  Sliders,
  Maximize2,
  HelpCircle,
  Eye,
  Info,
} from 'lucide-react';

const CATALOG_ITEMS = [
  { id: 'floating-panels', name: 'Floating Panels', category: 'Depth Perspective', icon: Layers },
  { id: 'depth-stacks', name: 'Depth Stacks', category: '3D Z-Axis Card Stacks', icon: Layers },
  { id: 'orbital-nav', name: 'Orbital Navigation', category: '3D Ring Orbit', icon: Compass },
  { id: '3d-cards', name: '3D Cards', category: 'Gyro/Pointer Tilting Cards', icon: Box },
  { id: 'scene-transitions', name: 'Scene Transitions', category: 'Camera Spatial Zoom', icon: Camera },
  { id: 'spatial-dashboard', name: 'Spatial Dashboard', category: 'Curved Visor HUD', icon: LayoutDashboard },
  { id: 'object-manipulation', name: 'Object Manipulation', category: 'Three.js 3D Mesh Viewer', icon: Box },
  { id: 'holographic-panels', name: 'Holographic Panels', category: 'Volumetric Beam & Scanlines', icon: Radio },
  { id: 'ambient-particles', name: 'Ambient Particles', category: '3D Constellation Field', icon: Sparkles },
  { id: 'camera-transitions', name: 'Camera Transitions', category: 'Waypoint Dolly Flight', icon: Camera },
  { id: 'dimensional-modals', name: 'Dimensional Modals', category: 'Depth Pushed Background', icon: Layers },
  { id: 'interactive-globes', name: 'Interactive Globes', category: 'WebGL 3D Earth Hub', icon: Globe },
  { id: 'instrument-environments', name: 'Instrument Environments', category: 'Avionics Artificial Horizon', icon: Activity },
];

const InnerLabContent: React.FC = () => {
  const { mode, setMode, performanceTier, reducedMotion, setReducedMotion, isMobile, isWebGLSupported, fps } =
    useSpatial();

  const [activeItemId, setActiveItemId] = useState<string>('floating-panels');
  const [copiedCode, setCopiedCode] = useState(false);
  const [showFallbackMatrix, setShowFallbackMatrix] = useState(false);

  const getActiveComponent = () => {
    switch (activeItemId) {
      case 'floating-panels':
        return <FloatingPanels />;
      case 'depth-stacks':
        return <DepthStacks />;
      case 'orbital-nav':
        return <OrbitalNavigation />;
      case '3d-cards':
        return <ThreeDCard />;
      case 'scene-transitions':
        return <SceneTransitions />;
      case 'spatial-dashboard':
        return <SpatialDashboard />;
      case 'object-manipulation':
        return <ObjectManipulation />;
      case 'holographic-panels':
        return <HolographicPanels />;
      case 'ambient-particles':
        return <AmbientParticles />;
      case 'camera-transitions':
        return <CameraTransitions />;
      case 'dimensional-modals':
        return <DimensionalModal />;
      case 'interactive-globes':
        return <InteractiveGlobe />;
      case 'instrument-environments':
        return <InstrumentEnvironment />;
      default:
        return <FloatingPanels />;
    }
  };

  const handleCopyCode = () => {
    const codeSnippet = `<SpatialProvider initialMode="${mode}">\n  <${
      CATALOG_ITEMS.find((i) => i.id === activeItemId)?.name.replace(/\s+/g, '') || 'FloatingPanels'
    } />\n</SpatialProvider>`;
    navigator.clipboard.writeText(codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-sky-500 selection:text-white p-4 md:p-8 space-y-8">
      {/* Catalog Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-sky-400 font-mono text-xs uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Design System Catalog</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Spatial & 3D Catalog</h1>
          <p className="text-sm text-zinc-400 mt-1 max-w-2xl">
            Experimental 3D experiences with mandatory 2D flat, reduced-motion, low-performance, and mobile fallbacks.
          </p>
        </div>

        {/* Global Mode Switcher Controls */}
        <div className="flex flex-wrap items-center gap-2 bg-zinc-900/90 p-2 rounded-2xl border border-zinc-800 font-mono text-xs">
          {(
            [
              { id: '3d-spatial', label: 'Real 3D' },
              { id: '2d-flat', label: '2D Flat Fallback' },
              { id: 'low-perf', label: 'Low-Perf Mode' },
              { id: 'reduced-motion', label: 'Reduced Motion' },
            ] as const
          ).map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id as SpatialDisplayMode)}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                mode === m.id
                  ? 'bg-sky-500 text-white font-bold shadow-md shadow-sky-500/20'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Realtime Telemetry Bar */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 font-mono text-xs">
        <div className="flex items-center gap-2.5">
          <Gauge className="w-4 h-4 text-sky-400" />
          <div>
            <span className="text-[10px] text-zinc-500 block">CURRENT FPS</span>
            <span className={`font-bold ${fps >= 50 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {fps} FPS
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Activity className="w-4 h-4 text-indigo-400" />
          <div>
            <span className="text-[10px] text-zinc-500 block">PERFORMANCE TIER</span>
            <span className="font-bold text-white capitalize">{performanceTier}</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Box className="w-4 h-4 text-emerald-400" />
          <div>
            <span className="text-[10px] text-zinc-500 block">WEBGL HARDWARE</span>
            <span className="font-bold text-emerald-400">
              {isWebGLSupported ? 'Supported' : 'Disabled / Missing'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Smartphone className="w-4 h-4 text-amber-400" />
          <div>
            <span className="text-[10px] text-zinc-500 block">DEVICE FORM</span>
            <span className="font-bold text-zinc-300">{isMobile ? 'Mobile Screen' : 'Desktop Wide'}</span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Eye className="w-4 h-4 text-violet-400" />
          <div>
            <span className="text-[10px] text-zinc-500 block">REDUCED MOTION</span>
            <span className="font-bold text-violet-400">{reducedMotion ? 'ON' : 'OFF'}</span>
          </div>
        </div>
      </div>

      {/* Main Grid Layout: Catalog Nav Sidebar + Main Workspace Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Nav Menu */}
        <div className="lg:col-span-1 space-y-2">
          <h3 className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-wider px-2 mb-3">
            Spatial 3D Experiences (13)
          </h3>
          <div className="space-y-1 max-h-[600px] overflow-y-auto pr-1">
            {CATALOG_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeItemId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveItemId(item.id)}
                  className={`w-full p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                    isActive
                      ? 'bg-sky-950/80 border-sky-400 text-white shadow-lg shadow-sky-500/10 font-bold'
                      : 'bg-zinc-900/50 border-zinc-800/80 text-zinc-400 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-sky-400' : 'text-zinc-500'}`} />
                    <div>
                      <span className="block text-xs">{item.name}</span>
                      <span className="block text-[10px] font-mono text-zinc-500">{item.category}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setShowFallbackMatrix(!showFallbackMatrix)}
            className="w-full mt-4 p-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-sky-400 hover:text-sky-300 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Info className="w-4 h-4" />
            <span>{showFallbackMatrix ? 'Hide Fallback Audit' : 'Show Fallback Matrix'}</span>
          </button>
        </div>

        {/* Right Active Spatial Stage */}
        <div className="lg:col-span-3 space-y-6">
          <div className="p-1 rounded-3xl bg-zinc-900/40 border border-zinc-800/80">
            {getActiveComponent()}
          </div>

          {/* Code Snippet & Export Panel */}
          <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 font-mono space-y-3">
            <div className="flex items-center justify-between text-xs text-zinc-400">
              <span className="flex items-center gap-2 text-white font-bold">
                <Code className="w-4 h-4 text-sky-400" />
                <span>Component Export & Integration</span>
              </span>
              <button
                onClick={handleCopyCode}
                className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {copiedCode ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>
            <pre className="p-4 rounded-2xl bg-black border border-zinc-800 text-xs text-sky-300 overflow-x-auto">
              <code>
                {`<SpatialProvider initialMode="${mode}">\n  <${
                  CATALOG_ITEMS.find((i) => i.id === activeItemId)?.name.replace(/\s+/g, '') || 'FloatingPanels'
                } />\n</SpatialProvider>`}
              </code>
            </pre>
          </div>

          {/* Fallback Audit Matrix Table */}
          {showFallbackMatrix && (
            <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4 font-mono text-xs">
              <h4 className="font-bold text-white text-sm flex items-center gap-2 text-sky-400">
                <Shield className="w-4 h-4" />
                <span>Spatial Fallback Audit Matrix</span>
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-800 text-zinc-400 text-[11px]">
                      <th className="p-2">Experience</th>
                      <th className="p-2">Standard 2D Fallback</th>
                      <th className="p-2">Reduced-Motion</th>
                      <th className="p-2">Low-Performance</th>
                      <th className="p-2">Mobile Adaptation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800 text-zinc-300 text-[11px]">
                    <tr>
                      <td className="p-2 font-bold text-white">Floating Panels</td>
                      <td className="p-2">Flat grid stack</td>
                      <td className="p-2">Freeze parallax tilt</td>
                      <td className="p-2">Disable blur filter</td>
                      <td className="p-2">Single column stack</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-bold text-white">Depth Stacks</td>
                      <td className="p-2">Flat accordion list</td>
                      <td className="p-2">Lock Z-transforms</td>
                      <td className="p-2">Remove dynamic shadows</td>
                      <td className="p-2">Touch tap toggle</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-bold text-white">Orbital Navigation</td>
                      <td className="p-2">Pill tab menu</td>
                      <td className="p-2">Disable ring spin</td>
                      <td className="p-2">Static ring nodes</td>
                      <td className="p-2">Swipe gestures</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-bold text-white">Interactive Globe</td>
                      <td className="p-2">2D SVG Map Projection</td>
                      <td className="p-2">Halt auto-rotation</td>
                      <td className="p-2">Low polygon count</td>
                      <td className="p-2">Touch node pin select</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const SpatialCatalogLab: React.FC = () => {
  return (
    <SpatialProvider>
      <InnerLabContent />
    </SpatialProvider>
  );
};
