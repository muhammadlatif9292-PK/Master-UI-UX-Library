/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Box, RotateCcw, Eye, Play, Pause, Layers, Sliders, Shield } from 'lucide-react';
import { useSpatial } from '../SpatialContext';

export const ObjectManipulation: React.FC = () => {
  const { mode, reducedMotion } = useSpatial();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Controls state
  const [wireframe, setWireframe] = useState(false);
  const [isRotating, setIsRotating] = useState(true);
  const [rotationSpeed, setRotationSpeed] = useState(1);
  const [meshShape, setMeshShape] = useState<'torusKnot' | 'icosahedron' | 'octahedron'>('torusKnot');
  const [metalness, setMetalness] = useState(0.8);

  useEffect(() => {
    if (mode === '2d-flat' || !canvasRef.current) return;

    // 1. Three.js Scene Setup
    const canvas = canvasRef.current;
    const width = canvas.clientWidth || 400;
    const height = canvas.clientHeight || 300;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x38bdf8, 3, 20);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x818cf8, 2, 20);
    pointLight2.position.set(-5, -5, -2);
    scene.add(pointLight2);

    // 3. Create Mesh Geometry
    let geometry: THREE.BufferGeometry;
    if (meshShape === 'torusKnot') {
      geometry = new THREE.TorusKnotGeometry(1.2, 0.38, 128, 32);
    } else if (meshShape === 'icosahedron') {
      geometry = new THREE.IcosahedronGeometry(1.6, 2);
    } else {
      geometry = new THREE.OctahedronGeometry(1.8, 1);
    }

    const material = new THREE.MeshStandardMaterial({
      color: 0x0ea5e9,
      metalness: metalness,
      roughness: 0.25,
      wireframe: wireframe,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // 4. Mouse Interactive Drag Controls
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y,
      };

      mesh.rotation.y += deltaMove.x * 0.01;
      mesh.rotation.x += deltaMove.y * 0.01;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // 5. Render Loop
    let reqId: number;
    const animate = () => {
      if (isRotating && !isDragging && !reducedMotion) {
        mesh.rotation.y += 0.008 * rotationSpeed;
        mesh.rotation.x += 0.004 * rotationSpeed;
      }
      renderer.render(scene, camera);
      reqId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(reqId);
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      geometry.dispose();
      material.dispose();
    };
  }, [mode, wireframe, isRotating, rotationSpeed, meshShape, metalness, reducedMotion]);

  // 2D FLAT FALLBACK
  if (mode === '2d-flat') {
    return (
      <div className="w-full p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs font-mono">
          <div className="flex items-center gap-2 text-sky-400">
            <Box className="w-4 h-4" />
            <span className="font-bold text-white uppercase">3D Object Viewer (2D Vector Blueprint)</span>
          </div>
          <span className="text-zinc-500">SVG Technical Schematic</span>
        </div>

        {/* Technical SVG Blueprint */}
        <div className="w-full h-64 rounded-2xl bg-black border border-zinc-800 flex items-center justify-center p-6">
          <svg className="w-48 h-48 text-sky-400 stroke-current fill-none" viewBox="0 0 100 100">
            <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" strokeWidth="1.5" />
            <line x1="50" y1="10" x2="50" y2="90" strokeWidth="1" strokeDasharray="3,3" />
            <line x1="10" y1="30" x2="90" y2="70" strokeWidth="1" strokeDasharray="3,3" />
            <line x1="90" y1="30" x2="10" y2="70" strokeWidth="1" strokeDasharray="3,3" />
            <circle cx="50" cy="50" r="24" strokeWidth="1.5" className="text-emerald-400" />
          </svg>
        </div>
      </div>
    );
  }

  // 3D SPATIAL DISPLAY
  return (
    <div className="relative w-full h-[480px] p-6 rounded-3xl bg-zinc-950/90 border border-zinc-800 flex flex-col justify-between select-none overflow-hidden">
      {/* Header Controls */}
      <div className="flex items-center justify-between z-20 pb-3 border-b border-zinc-800 text-xs font-mono">
        <div className="flex items-center gap-2 text-sky-400">
          <Box className="w-4 h-4" />
          <span className="font-bold text-white">INTERACTIVE 3D MESH MANIPULATOR</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setWireframe(!wireframe)}
            className={`px-3 py-1.5 rounded-xl border transition-colors cursor-pointer ${
              wireframe
                ? 'bg-sky-500 text-white border-sky-400 font-bold'
                : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            {wireframe ? 'Shaded Mesh' : 'Wireframe'}
          </button>
          <button
            onClick={() => setIsRotating(!isRotating)}
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 cursor-pointer"
            title={isRotating ? 'Pause Orbit' : 'Play Orbit'}
          >
            {isRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* WebGL Canvas Viewer */}
      <div className="relative w-full h-80 my-auto flex items-center justify-center cursor-grab active:cursor-grabbing">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {/* Footer Mesh Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-800/80 text-xs font-mono text-zinc-400">
        <div className="flex items-center gap-2">
          <span>Mesh:</span>
          {(['torusKnot', 'icosahedron', 'octahedron'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setMeshShape(s)}
              className={`px-2.5 py-1 rounded-lg text-[11px] border capitalize cursor-pointer ${
                meshShape === s
                  ? 'bg-sky-500 text-white border-sky-400 font-bold'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span>Speed:</span>
          <input
            type="range"
            min="0.2"
            max="3"
            step="0.2"
            value={rotationSpeed}
            onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
            className="w-20 accent-sky-400"
          />
        </div>
      </div>
    </div>
  );
};
