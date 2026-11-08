/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useScientific } from '../ScientificContext';
import { Sliders, Key, Power, AlertTriangle, Cpu, Radio, ShieldAlert } from 'lucide-react';

export const LabPanels: React.FC = () => {
  const { familyConfig } = useScientific();

  const [isKeyUnlocked, setIsKeyUnlocked] = useState(true);
  const [eStopTripped, setEStopTripped] = useState(false);

  // Toggle switch states
  const [switches, setSwitches] = useState({
    laserPump: true,
    vacuumCooling: true,
    magnetPower: false,
    rfBias: true,
    beamShutter: false,
  });

  // Rotary Dial values
  const [biasVoltage, setBiasVoltage] = useState(480);
  const [pulseWidth, setPulseWidth] = useState(120);

  const toggleSwitch = (key: keyof typeof switches) => {
    if (!isKeyUnlocked || eStopTripped) return;
    setSwitches((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleTriggerEStop = () => {
    setEStopTripped(true);
    setSwitches({
      laserPump: false,
      vacuumCooling: false,
      magnetPower: false,
      rfBias: false,
      beamShutter: false,
    });
  };

  const handleResetEStop = () => {
    setEStopTripped(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div>
          <h3 className={`text-lg font-bold ${familyConfig.textPrimary} flex items-center gap-2`}>
            <Cpu className={`w-5 h-5 ${familyConfig.accentText}`} />
            Modular Physical Laboratory Rack Panels
          </h3>
          <p className={`text-xs ${familyConfig.textSecondary}`}>
            Physical rack chassis with illuminated guarded toggle switches, master safety keylock, and E-STOP killswitch.
          </p>
        </div>

        {/* Master Keylock */}
        <button
          onClick={() => setIsKeyUnlocked(!isKeyUnlocked)}
          className={`px-3 py-1.5 rounded text-xs font-mono font-bold flex items-center gap-2 border transition-all ${
            isKeyUnlocked
              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
              : 'bg-red-500/20 text-red-400 border-red-500/40'
          }`}
        >
          <Key className="w-3.5 h-3.5" />
          MASTER KEY: {isKeyUnlocked ? 'UNLOCKED' : 'SAFETY LOCKED'}
        </button>
      </div>

      {/* Emergency Stop Alert Banner if Tripped */}
      {eStopTripped && (
        <div className="p-4 rounded-xl bg-red-950/80 border-2 border-red-500 text-red-200 flex items-center justify-between shadow-[0_0_20px_rgba(239,68,68,0.4)] animate-pulse">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-red-400 shrink-0" />
            <div>
              <h4 className="font-bold text-sm">EMERGENCY STOP (E-STOP) ACTIVATED</h4>
              <p className="text-xs opacity-80">All active power relays, high-voltage lines, and beam shutters have been hard-isolated.</p>
            </div>
          </div>
          <button
            onClick={handleResetEStop}
            className="px-4 py-2 rounded bg-red-500 hover:bg-red-400 text-black font-bold text-xs"
          >
            DISENGAGE E-STOP & RE-ARM
          </button>
        </div>
      )}

      {/* Hardware Panel Frame */}
      <div className={`p-5 rounded-2xl ${familyConfig.cardClass} border-2 border-slate-700 shadow-2xl relative overflow-hidden`}>
        {/* Rack Mounting Screw Holes */}
        <div className="absolute top-3 left-3 w-3 h-3 rounded-full border border-white/20 bg-black/40 flex items-center justify-center">
          <div className="w-2 h-0.5 bg-white/40 rotate-45" />
        </div>
        <div className="absolute top-3 right-3 w-3 h-3 rounded-full border border-white/20 bg-black/40 flex items-center justify-center">
          <div className="w-2 h-0.5 bg-white/40 rotate-45" />
        </div>
        <div className="absolute bottom-3 left-3 w-3 h-3 rounded-full border border-white/20 bg-black/40 flex items-center justify-center">
          <div className="w-2 h-0.5 bg-white/40 rotate-45" />
        </div>
        <div className="absolute bottom-3 right-3 w-3 h-3 rounded-full border border-white/20 bg-black/40 flex items-center justify-center">
          <div className="w-2 h-0.5 bg-white/40 rotate-45" />
        </div>

        <div className="px-6 py-2 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Section 1: Illuminated Guarded Toggle Switches */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-bold opacity-70 tracking-wider">
              HIGH-VOLTAGE RELAY TOGGLES
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { key: 'laserPump', label: 'LASER PUMP DITHER' },
                { key: 'vacuumCooling', label: 'VACUUM TURBO PUMP' },
                { key: 'magnetPower', label: 'SUPERCONDUCTING MAG' },
                { key: 'rfBias', label: 'RF BIAS GENERATOR' },
                { key: 'beamShutter', label: 'SAFETY BEAM SHUTTER' },
              ].map((item) => {
                const isOn = switches[item.key as keyof typeof switches];
                return (
                  <button
                    key={item.key}
                    disabled={!isKeyUnlocked || eStopTripped}
                    onClick={() => toggleSwitch(item.key as keyof typeof switches)}
                    className={`p-3 rounded-xl border text-left transition-all duration-200 relative ${
                      isOn
                        ? 'bg-cyan-950/50 border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                        : 'bg-black/40 border-white/10 opacity-60'
                    } ${!isKeyUnlocked || eStopTripped ? 'cursor-not-allowed opacity-40' : ''}`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      {/* LED Indicator Dot */}
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${
                          isOn ? 'bg-cyan-400 shadow-[0_0_8px_cyan]' : 'bg-slate-700'
                        }`}
                      />
                      <span className="text-[9px] font-mono opacity-50">{isOn ? 'ACTIVE' : 'OFF'}</span>
                    </div>
                    <span className="text-[11px] font-mono font-bold block leading-tight text-white">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Precision Rotary Adjusters */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold opacity-70 tracking-wider">
              FINE ROTARY DIALS
            </h4>

            <div className="p-3 rounded-xl bg-black/50 border border-white/10 space-y-3">
              <div>
                <div className="flex justify-between text-[11px] font-mono mb-1">
                  <span>BIAS VOLTAGE</span>
                  <span className="text-cyan-400 font-bold">{biasVoltage} V</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="10"
                  disabled={!isKeyUnlocked || eStopTripped}
                  value={biasVoltage}
                  onChange={(e) => setBiasVoltage(Number(e.target.value))}
                  className="w-full accent-cyan-400"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-mono mb-1">
                  <span>PULSE WIDTH</span>
                  <span className="text-amber-400 font-bold">{pulseWidth} ns</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="5"
                  disabled={!isKeyUnlocked || eStopTripped}
                  value={pulseWidth}
                  onChange={(e) => setPulseWidth(Number(e.target.value))}
                  className="w-full accent-amber-400"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Physical E-STOP Killswitch Button */}
          <div className="flex flex-col justify-between items-center p-3 rounded-xl bg-red-950/20 border border-red-900/40">
            <span className="text-[10px] font-mono font-bold text-red-400 text-center">
              HARDWARE KILLSWITCH
            </span>

            <button
              onClick={handleTriggerEStop}
              className="w-20 h-20 rounded-full bg-gradient-to-br from-red-600 to-red-800 border-4 border-red-900 shadow-[0_0_20px_rgba(239,68,68,0.6)] active:scale-95 transition-transform flex flex-col items-center justify-center my-2 text-white font-mono font-extrabold text-xs"
            >
              <Power className="w-6 h-6 mb-1" />
              E-STOP
            </button>

            <span className="text-[9px] font-mono opacity-50 text-center">
              PRESS TO ISOLATE ALL POWER
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
