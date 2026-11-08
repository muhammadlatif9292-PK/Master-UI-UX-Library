/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Globe, MapPin, Play, Pause, Compass, Activity } from 'lucide-react';
import { useSpatial } from '../SpatialContext';
import { GlobeMarker } from '../types';

const GLOBE_NODES: GlobeMarker[] = [
  { id: 'node-tokyo', name: 'Tokyo Node', lat: 35.6762, lng: 139.6503, type: 'hub', value: '1.2ms' },
  { id: 'node-sf', name: 'San Francisco', lat: 37.7749, lng: -122.4194, type: 'hub', value: '0.8ms' },
  { id: 'node-london', name: 'London Hub', lat: 51.5074, lng: -0.1278, type: 'hub', value: '1.4ms' },
  { id: 'node-singapore', name: 'Singapore Datacenter', lat: 1.3521, lng: 103.8198, type: 'server', value: '2.1ms' },
  { id: 'node-sydney', name: 'Sydney Relayer', lat: -33.8688, lng: 151.2093, type: 'node', value: '3.4ms' },
];

export const InteractiveGlobe: React.FC = () => {
  const { mode, reducedMotion } = useSpatial();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isRotating, setIsRotating] = useState(true);
  const [selectedNode, setSelectedNode] = useState<GlobeMarker>(GLOBE_NODES[0]);

  // Convert Lat/Lng to 3D Cartesian coordinates
  const latLngToVector3 = (lat: number, lng: number, radius: number) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    return new THREE.Vector3(x, y, z);
  };

  useEffect(() => {
    if (mode === '2d-flat' || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const width = canvas.clientWidth || 400;
    const height = canvas.clientHeight || 300;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 5.5;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x38bdf8, 2);
    dirLight.position.set(5, 3, 5);
    scene.add(dirLight);

    // Globe Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Main Sphere Mesh (Wireframe + Translucent Body)
    const globeRadius = 1.8;
    const sphereGeo = new THREE.SphereGeometry(globeRadius, 48, 48);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0x0369a1,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const globeMesh = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(globeMesh);

    // Inner Glow Core Sphere
    const innerGeo = new THREE.SphereGeometry(globeRadius * 0.98, 32, 32);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x0284c7,
      transparent: true,
      opacity: 0.2,
    });
    globeGroup.add(new THREE.Mesh(innerGeo, innerMat));

    // Add Marker Dots
    GLOBE_NODES.forEach((node) => {
      const pos = latLngToVector3(node.lat, node.lng, globeRadius + 0.02);
      const markerGeo = new THREE.SphereGeometry(0.06, 16, 16);
      const markerMat = new THREE.MeshBasicMaterial({
        color: node.id === selectedNode.id ? 0x10b981 : 0x38bdf8,
      });
      const markerMesh = new THREE.Mesh(markerGeo, markerMat);
      markerMesh.position.copy(pos);
      globeGroup.add(markerMesh);
    });

    // Render loop
    let reqId: number;
    const animate = () => {
      if (isRotating && !reducedMotion) {
        globeGroup.rotation.y += 0.005;
      }
      renderer.render(scene, camera);
      reqId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(reqId);
      sphereGeo.dispose();
      sphereMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
    };
  }, [mode, isRotating, selectedNode, reducedMotion]);

  // 2D FLAT FALLBACK
  if (mode === '2d-flat') {
    return (
      <div className="w-full p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs font-mono">
          <div className="flex items-center gap-2 text-sky-400">
            <Globe className="w-4 h-4" />
            <span className="font-bold text-white uppercase">Interactive Globe (2D Flat Map)</span>
          </div>
          <span className="text-zinc-500">2D Equirectangular Map</span>
        </div>

        <div className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-mono text-zinc-400">SELECT GLOBAL NODE:</span>
            <div className="space-y-1">
              {GLOBE_NODES.map((node) => (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`w-full p-2.5 rounded-xl border text-left text-xs font-mono transition-all cursor-pointer flex items-center justify-between ${
                    selectedNode.id === node.id
                      ? 'bg-sky-950 border-sky-400 text-white font-bold'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-sky-400" />
                    <span>{node.name}</span>
                  </span>
                  <span className="text-emerald-400 font-bold">{node.value}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-black border border-zinc-800 flex flex-col justify-between font-mono text-xs">
            <div className="text-sky-400 font-bold border-b border-zinc-800 pb-2">NODE TELEMETRY</div>
            <div className="space-y-2 my-2 text-zinc-300">
              <p>Name: {selectedNode.name}</p>
              <p>Coords: {selectedNode.lat}°, {selectedNode.lng}°</p>
              <p>Type: {selectedNode.type.toUpperCase()}</p>
              <p>Latency: {selectedNode.value}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3D SPATIAL DISPLAY
  return (
    <div className="relative w-full h-[480px] p-6 rounded-3xl bg-zinc-950/90 border border-zinc-800 flex flex-col justify-between select-none overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between z-20 pb-3 border-b border-zinc-800 text-xs font-mono">
        <div className="flex items-center gap-2 text-sky-400">
          <Globe className="w-4 h-4 animate-spin-slow" />
          <span className="font-bold text-white uppercase">3D WEBGL INTERACTIVE GLOBE</span>
        </div>

        <button
          onClick={() => setIsRotating(!isRotating)}
          className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 cursor-pointer"
          title={isRotating ? 'Pause Orbit' : 'Rotate Globe'}
        >
          {isRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* WebGL Canvas Viewer */}
      <div className="relative w-full h-80 my-auto flex items-center justify-center">
        <canvas ref={canvasRef} className="w-full h-full" />

        {/* Selected Node Overlay Badge */}
        <div className="absolute top-4 right-4 p-3.5 rounded-2xl bg-slate-900/90 border border-sky-400/80 backdrop-blur-md font-mono text-xs text-white space-y-1 shadow-xl">
          <div className="flex items-center gap-1.5 text-sky-400 font-bold">
            <MapPin className="w-3.5 h-3.5" />
            <span>{selectedNode.name}</span>
          </div>
          <p className="text-zinc-400 text-[10px]">Lat: {selectedNode.lat}° | Lng: {selectedNode.lng}°</p>
          <p className="text-emerald-400 font-bold text-[11px]">Ping: {selectedNode.value}</p>
        </div>
      </div>

      {/* Footer Node Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-zinc-800/80 text-xs font-mono text-zinc-400">
        <span>Select Global Hub:</span>
        <div className="flex flex-wrap gap-1.5">
          {GLOBE_NODES.map((node) => (
            <button
              key={node.id}
              onClick={() => setSelectedNode(node)}
              className={`px-2.5 py-1 rounded-lg text-[11px] border cursor-pointer ${
                selectedNode.id === node.id
                  ? 'bg-sky-500 text-white border-sky-400 font-bold'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {node.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
