/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useGeneral } from '../GeneralContext';
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  MoreHorizontal,
  ChevronDown,
  ChevronRight,
  Search,
  SlidersHorizontal,
  Download,
  CheckCircle2,
  AlertCircle,
  Clock,
  Square,
  CheckSquare,
  Eye,
  Loader2,
} from 'lucide-react';

export interface DataRow {
  id: string;
  cluster: string;
  region: string;
  status: 'healthy' | 'degraded' | 'syncing' | 'failed';
  latencyMs: number;
  cpuLoad: number; // percentage
  memoryGb: number;
  throughput: string;
  details: string;
}

export const TableControls: React.FC = () => {
  const { recipeConfig, stateMode } = useGeneral();
  const [density, setDensity] = useState<'compact' | 'normal' | 'relaxed'>('normal');
  const [sortColumn, setSortColumn] = useState<keyof DataRow>('latencyMs');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>(['cls-01']);
  const [expandedRowIds, setExpandedRowIds] = useState<string[]>([]);

  const rows: DataRow[] = [
    {
      id: 'cls-01',
      cluster: 'us-east-quantum-01',
      region: 'us-east-1 (N. Virginia)',
      status: 'healthy',
      latencyMs: 14.2,
      cpuLoad: 42,
      memoryGb: 128.4,
      throughput: '4.8 GB/s',
      details: 'Active primary TPU v5e pod cluster running distributed transformer inference.',
    },
    {
      id: 'cls-02',
      cluster: 'eu-west-inference-03',
      region: 'eu-west-4 (Eemshaven)',
      status: 'healthy',
      latencyMs: 22.8,
      cpuLoad: 58,
      memoryGb: 256.0,
      throughput: '6.2 GB/s',
      details: 'Multi-host pipeline parallel partition for Gemini multimodal reasoning tasks.',
    },
    {
      id: 'cls-03',
      cluster: 'ap-south-vector-02',
      region: 'ap-southeast-1 (Singapore)',
      status: 'syncing',
      latencyMs: 48.5,
      cpuLoad: 89,
      memoryGb: 64.2,
      throughput: '2.1 GB/s',
      details: 'HNSW vector index repartitioning in progress across 128 shards.',
    },
    {
      id: 'cls-04',
      cluster: 'us-west-training-09',
      region: 'us-west-2 (Oregon)',
      status: 'degraded',
      latencyMs: 84.1,
      cpuLoad: 96,
      memoryGb: 512.0,
      throughput: '1.4 GB/s',
      details: 'Thermal throttle detected on GPU slice 4B. Automatic failover initiated.',
    },
    {
      id: 'cls-05',
      cluster: 'sa-east-edge-01',
      region: 'sa-east-1 (São Paulo)',
      status: 'failed',
      latencyMs: 310.0,
      cpuLoad: 0,
      memoryGb: 0,
      throughput: '0.0 GB/s',
      details: 'Cross-continental optical fiber link cut. Gateway routing via secondary transit.',
    },
  ];

  const handleSort = (column: keyof DataRow) => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedRows = [...rows].sort((a, b) => {
    const aVal = a[sortColumn];
    const bVal = b[sortColumn];
    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredRows = sortedRows.filter((r) =>
    r.cluster.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleExpand = (id: string) => {
    setExpandedRowIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getStatusBadge = (status: DataRow['status']) => {
    switch (status) {
      case 'healthy':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950/80 text-emerald-400 border border-emerald-800">
            <CheckCircle2 className="w-3 h-3" /> Healthy
          </span>
        );
      case 'syncing':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-950/80 text-cyan-400 border border-cyan-800 animate-pulse">
            <Clock className="w-3 h-3" /> Syncing
          </span>
        );
      case 'degraded':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-950/80 text-amber-400 border border-amber-800">
            <AlertCircle className="w-3 h-3" /> Degraded
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-950/80 text-rose-400 border border-rose-800">
            <AlertCircle className="w-3 h-3" /> Failed
          </span>
        );
    }
  };

  const paddingClass =
    density === 'compact' ? 'py-1.5 px-3' : density === 'relaxed' ? 'py-4 px-4' : 'py-2.5 px-3.5';

  return (
    <div className={`rounded-3xl border ${recipeConfig.cardBg} ${recipeConfig.border} ${recipeConfig.fontFamily} shadow-2xl p-6 space-y-4 select-none`}>
      {/* Top Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search clusters or regions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`pl-9 pr-3 py-1.5 text-xs rounded-xl border ${recipeConfig.inputBg} outline-none w-56`}
            />
          </div>

          <div className="flex items-center bg-black/40 p-0.5 rounded-xl border border-white/5 text-[11px] font-mono">
            {(['compact', 'normal', 'relaxed'] as const).map((d) => (
              <button
                key={d}
                onClick={() => setDensity(d)}
                className={`px-2.5 py-1 rounded-lg capitalize transition-colors ${
                  density === d ? `${recipeConfig.accentBg}` : 'text-slate-400 hover:text-white'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={`text-xs font-mono ${recipeConfig.textSecondary}`}>
            Selected: <strong className={recipeConfig.accentText}>{selectedIds.length}</strong> / {rows.length}
          </span>
          <button className={`px-3 py-1.5 bg-black/40 hover:bg-white/5 border ${recipeConfig.border} rounded-xl text-xs font-semibold ${recipeConfig.textPrimary} flex items-center gap-1.5`}>
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="border border-white/5 rounded-2xl overflow-x-auto bg-black/30">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className={`border-b border-white/5 bg-black/50 text-[11px] font-mono uppercase ${recipeConfig.textSecondary}`}>
              <th className="py-3 px-3 w-8">
                <Square className="w-4 h-4 text-slate-600 cursor-pointer" />
              </th>
              <th className="py-3 px-2 w-8"></th>
              <th
                onClick={() => handleSort('cluster')}
                className="py-3 px-3 cursor-pointer hover:text-white"
              >
                <div className="flex items-center gap-1">
                  <span>Cluster Node</span>
                  {sortColumn === 'cluster' ? (
                    sortDirection === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                  ) : <ArrowUpDown className="w-3 h-3 opacity-30" />}
                </div>
              </th>
              <th className="py-3 px-3">Status</th>
              <th
                onClick={() => handleSort('latencyMs')}
                className="py-3 px-3 cursor-pointer hover:text-white text-right"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>RTT Latency</span>
                  {sortColumn === 'latencyMs' ? (
                    sortDirection === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                  ) : <ArrowUpDown className="w-3 h-3 opacity-30" />}
                </div>
              </th>
              <th
                onClick={() => handleSort('cpuLoad')}
                className="py-3 px-3 cursor-pointer hover:text-white"
              >
                <div className="flex items-center gap-1">
                  <span>CPU Load</span>
                  {sortColumn === 'cpuLoad' ? (
                    sortDirection === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                  ) : <ArrowUpDown className="w-3 h-3 opacity-30" />}
                </div>
              </th>
              <th className="py-3 px-3 text-right">Throughput</th>
              <th className="py-3 px-3 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredRows.map((row) => {
              const isSelected = selectedIds.includes(row.id);
              const isExpanded = expandedRowIds.includes(row.id);

              return (
                <React.Fragment key={row.id}>
                  <tr
                    className={`transition-colors ${
                      isSelected ? 'bg-indigo-500/10' : 'hover:bg-white/5'
                    }`}
                  >
                    <td className={paddingClass} onClick={() => toggleSelect(row.id)}>
                      {isSelected ? (
                        <CheckSquare className="w-4 h-4 text-indigo-400 cursor-pointer" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-600 cursor-pointer hover:text-slate-400" />
                      )}
                    </td>
                    <td className={paddingClass} onClick={() => toggleExpand(row.id)}>
                      <button className="text-slate-500 hover:text-white">
                        {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                      </button>
                    </td>
                    <td className={paddingClass}>
                      <div className={`font-bold ${recipeConfig.textPrimary}`}>{row.cluster}</div>
                      <div className={`text-[10px] font-mono ${recipeConfig.textSecondary}`}>{row.region}</div>
                    </td>
                    <td className={paddingClass}>{getStatusBadge(row.status)}</td>
                    <td className={`${paddingClass} text-right font-mono font-bold ${
                      row.latencyMs > 100 ? 'text-rose-400' : row.latencyMs > 50 ? 'text-amber-400' : 'text-emerald-400'
                    }`}>
                      {row.latencyMs.toFixed(1)} ms
                    </td>
                    <td className={paddingClass}>
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-slate-950 h-1.5 rounded-full overflow-hidden border border-white/5">
                          <div
                            style={{ width: `${row.cpuLoad}%` }}
                            className={`h-full ${
                              row.cpuLoad > 80 ? 'bg-rose-500' : row.cpuLoad > 60 ? 'bg-amber-500' : 'bg-indigo-500'
                            }`}
                          />
                        </div>
                        <span className={`text-[10px] font-mono ${recipeConfig.textSecondary}`}>{row.cpuLoad}%</span>
                      </div>
                    </td>
                    <td className={`${paddingClass} text-right font-mono ${recipeConfig.textSecondary}`}>
                      {row.throughput}
                    </td>
                    <td className={paddingClass}>
                      <button className="p-1 text-slate-500 hover:text-white rounded-lg">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>

                  {/* Expanded Row Detail */}
                  {isExpanded && (
                    <tr className="bg-black/60 border-y border-white/5">
                      <td colSpan={8} className="p-4 text-xs font-mono space-y-2">
                        <div className="flex items-center gap-2 text-indigo-300 font-bold">
                          <Eye className="w-3.5 h-3.5" />
                          <span>Node Telemetry Description</span>
                        </div>
                        <p className={`text-[11px] leading-relaxed ${recipeConfig.textSecondary}`}>
                          {row.details}
                        </p>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
