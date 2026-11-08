/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Sparkles, Play, Pause, Sliders, Shield } from 'lucide-react';
import { useSpatial } from '../SpatialContext';

export const AmbientParticles: React.FC = () => {
  const { mode, reducedMotion } = useSpatial();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [particleCount, setParticleCount] = useState(600);
  const [particleSpeed, setParticleSpeed] = useState(1);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (mode === '2d-flat' || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const width = canvas.clientWidth || 400;
    const height = canvas.clientHeight || 300;

    // 1. Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 2. Geometry & Particles Buffer
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0x38bdf8); // sky
    const color2 = new THREE.Color(0x818cf8); // indigo

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

      const mixedColor = color1.clone().lerp(color2, Math.random());
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // 3. Mouse pointer magnetic force
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove);

    // 4. Animation loop
    let reqId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      if (isAnimating && !reducedMotion) {
        particleSystem.rotation.y = elapsedTime * 0.05 * particleSpeed;
        particleSystem.rotation.x = Math.sin(elapsedTime * 0.1) * 0.1 * particleSpeed;

        // Wave deformation
        const posAttr = geometry.attributes.position as THREE.BufferAttribute;
        const array = posAttr.array as Float32Array;

        for (let i = 0; i < particleCount; i++) {
          const x = array[i * 3];
          array[i * 3 + 1] += Math.sin(elapsedTime * 2 + x) * 0.003 * particleSpeed;
        }
        posAttr.needsUpdate = true;
      }

      renderer.render(scene, camera);
      reqId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener('mousemove', onMouseMove);
      geometry.dispose();
      material.dispose();
    };
  }, [mode, particleCount, particleSpeed, isAnimating, reducedMotion]);

  // 2D FLAT FALLBACK
  if (mode === '2d-flat') {
    return (
      <div className="w-full p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-xs font-mono">
          <div className="flex items-center gap-2 text-sky-400">
            <Sparkles className="w-4 h-4" />
            <span className="font-bold text-white uppercase">Ambient Particles (2D Grid Mesh)</span>
          </div>
          <span className="text-zinc-500">2D Dot Matrix</span>
        </div>

        <div className="w-full h-64 rounded-2xl bg-black border border-zinc-800 p-6 bg-[radial-gradient(#38bdf8_1.5px,transparent_1.5px)] [background-size:16px_16px] flex items-center justify-center">
          <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-zinc-300">
            Static 2D particle lattice active (WebGL disabled in 2D Flat Mode)
          </div>
        </div>
      </div>
    );
  }

  // 3D SPATIAL DISPLAY
  return (
    <div className="relative w-full h-[460px] p-6 rounded-3xl bg-zinc-950/90 border border-zinc-800 flex flex-col justify-between select-none overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between z-20 pb-3 border-b border-zinc-800 text-xs font-mono">
        <div className="flex items-center gap-2 text-sky-400">
          <Sparkles className="w-4 h-4" />
          <span className="font-bold text-white">AMBIENT 3D PARTICLE FIELD</span>
        </div>

        <button
          onClick={() => setIsAnimating(!isAnimating)}
          className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 cursor-pointer"
          title={isAnimating ? 'Pause Particles' : 'Play Particles'}
        >
          {isAnimating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* WebGL Canvas */}
      <div className="relative w-full h-80 my-auto flex items-center justify-center">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {/* Footer Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-zinc-800/80 text-xs font-mono text-zinc-400">
        <div className="flex items-center gap-2">
          <span>Count:</span>
          {[300, 600, 1200].map((count) => (
            <button
              key={count}
              onClick={() => setParticleCount(count)}
              className={`px-2.5 py-1 rounded-lg text-[11px] border cursor-pointer ${
                particleCount === count
                  ? 'bg-sky-500 text-white border-sky-400 font-bold'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
              }`}
            >
              {count}
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
            value={particleSpeed}
            onChange={(e) => setParticleSpeed(parseFloat(e.target.value))}
            className="w-20 accent-sky-400"
          />
        </div>
      </div>
    </div>
  );
};
