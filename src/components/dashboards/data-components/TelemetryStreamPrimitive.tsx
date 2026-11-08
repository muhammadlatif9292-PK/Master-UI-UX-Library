/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { VisualRecipeStyle, TelemetryPacket } from '../types';
import { VISUAL_RECIPES } from '../recipes';
import { Radio, ShieldCheck, Activity, Terminal } from 'lucide-react';

export function TelemetryStreamPrimitive({
  recipe = VISUAL_RECIPES['luminous-data'],
  title = 'Hardware Telemetry Bus',
}: {
  recipe?: VisualRecipeStyle;
  title?: string;
}) {
  const [packets, setPackets] = useState<TelemetryPacket[]>([
    { id: '1', timestamp: '20:23:01.402', node: 'node-us-east-01', metric: 'GPU_TEMP', value: 68.4, status: 'optimal' },
    { id: '2', timestamp: '20:23:01.650', node: 'node-eu-west-04', metric: 'NVLINK_BW', value: 894.2, status: 'optimal' },
    { id: '3', timestamp: '20:23:01.890', node: 'node-ap-south-02', metric: 'FAN_RPM', value: 4200, status: 'warning' },
    { id: '4', timestamp: '20:23:02.100', node: 'edge-tokyo-09', metric: 'MEM_ECC_CORR', value: 0, status: 'optimal' },
    { id: '5', timestamp: '20:23:02.320', node: 'node-us-west-03', metric: 'VOLTAGE_RAIL', value: 12.04, status: 'optimal' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const metrics = ['GPU_TEMP', 'NVLINK_BW', 'FAN_RPM', 'VOLTAGE_RAIL', 'IOPS_RATE'];
      const nodes = ['node-us-east-01', 'node-eu-west-04', 'node-ap-south-02', 'node-us-west-03', 'edge-singapore-01'];
      const chosenMetric = metrics[Math.floor(Math.random() * metrics.length)];
      const chosenNode = nodes[Math.floor(Math.random() * nodes.length)];
      const now = new Date();
      const timeStr = `${now.toTimeString().split(' ')[0]}.${String(now.getMilliseconds()).padStart(3, '0')}`;

      let val = Math.round((Math.random() * 100 + 20) * 10) / 10;
      let status: TelemetryPacket['status'] = 'optimal';
      if (chosenMetric === 'GPU_TEMP' && val > 80) status = 'warning';
      if (chosenMetric === 'FAN_RPM') val = Math.round(3000 + Math.random() * 2000);

      const newPacket: TelemetryPacket = {
        id: String(Date.now()),
        timestamp: timeStr,
        node: chosenNode,
        metric: chosenMetric,
        value: val,
        status,
      };

      setPackets((prev) => [newPacket, ...prev.slice(0, 5)]);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      role="region"
      aria-label={`${title} telemetry stream`}
      tabIndex={0}
      className={`p-4 rounded-xl border ${recipe.borderClass} ${recipe.cardClass} relative overflow-hidden focus:outline-none focus:ring-1 focus:ring-sky-500`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
          <div>
            <h4 className={`text-sm font-semibold ${recipe.textPrimary}`}>{title}</h4>
            <p className={`text-xs ${recipe.textMuted}`}>Live UDP broadcast frame parser</p>
          </div>
        </div>
        <span className={`text-[10px] px-2 py-0.5 rounded-sm font-mono flex items-center gap-1 ${recipe.badgeClass}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          500 Hz Bus
        </span>
      </div>

      {/* Packet Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-xs">
          <thead>
            <tr className="border-b border-white/10 text-[10px] text-zinc-400">
              <th className="pb-2">TIMESTAMP</th>
              <th className="pb-2">NODE</th>
              <th className="pb-2">METRIC</th>
              <th className="pb-2">VALUE</th>
              <th className="pb-2 text-right">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {packets.map((pkt) => (
              <tr key={pkt.id} className="hover:bg-white/5 transition-colors">
                <td className="py-2 text-zinc-400">{pkt.timestamp}</td>
                <td className={`py-2 ${recipe.textPrimary}`}>{pkt.node}</td>
                <td className="py-2 text-sky-400">{pkt.metric}</td>
                <td className="py-2 font-bold text-white">{pkt.value}</td>
                <td className="py-2 text-right">
                  <span
                    className={`inline-block px-1.5 py-0.2 rounded-xs text-[10px] uppercase font-bold ${
                      pkt.status === 'optimal'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    }`}
                  >
                    {pkt.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
