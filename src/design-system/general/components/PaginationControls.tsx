/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useGeneral } from '../GeneralContext';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  ArrowRight,
  Sparkles,
  Layers,
} from 'lucide-react';

export const PaginationControls: React.FC = () => {
  const { recipeConfig, stateMode } = useGeneral();
  const [currentPage, setCurrentPage] = useState<number>(3);
  const [pageSize, setPageSize] = useState<number>(20);
  const [jumpPage, setJumpPage] = useState<string>('');
  const totalItems = 384;
  const totalPages = Math.ceil(totalItems / pageSize);

  const handleJump = (e: React.FormEvent) => {
    e.preventDefault();
    const target = Number(jumpPage);
    if (target >= 1 && target <= totalPages) {
      setCurrentPage(target);
      setJumpPage('');
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  const startRecord = (currentPage - 1) * pageSize + 1;
  const endRecord = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className={`rounded-3xl border ${recipeConfig.cardBg} ${recipeConfig.border} ${recipeConfig.fontFamily} shadow-2xl p-6 space-y-5 select-none max-w-3xl`}>
      {/* Top Status Readout */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-black/40 border border-white/10 text-indigo-400">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h4 className={`font-bold text-sm ${recipeConfig.textPrimary}`}>Dataset Pagination Controller</h4>
            <p className={`text-xs ${recipeConfig.textSecondary}`}>
              Showing records <strong className={recipeConfig.textPrimary}>{startRecord}–{endRecord}</strong> of <strong className={recipeConfig.accentText}>{totalItems}</strong> total entries
            </p>
          </div>
        </div>

        {/* Page Size Selector */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className={recipeConfig.textSecondary}>Per page:</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className={`px-3 py-1.5 rounded-xl border text-xs ${recipeConfig.inputBg} outline-none`}
          >
            <option value="10">10 rows</option>
            <option value="20">20 rows</option>
            <option value="50">50 rows</option>
            <option value="100">100 rows</option>
          </select>
        </div>
      </div>

      {/* Main Pagination Navigation Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Numbered Stepper */}
        <div className="flex items-center gap-1.5">
          {/* First / Prev */}
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="p-2 rounded-xl bg-black/40 hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none border border-white/5 text-slate-400 hover:text-white"
            title="First Page"
          >
            <ChevronsLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-xl bg-black/40 hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none border border-white/5 text-slate-400 hover:text-white"
            title="Previous Page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Number Pills */}
          {getPageNumbers().map((p, idx) => {
            if (p === '...') {
              return (
                <span key={`dots-${idx}`} className="px-2 text-slate-600 font-mono text-xs">
                  •••
                </span>
              );
            }

            const isCurrent = currentPage === p;
            return (
              <button
                key={`page-${p}`}
                onClick={() => setCurrentPage(Number(p))}
                className={`w-9 h-9 rounded-xl font-mono text-xs font-bold transition-all ${
                  isCurrent
                    ? `${recipeConfig.accentBg} shadow-lg scale-105`
                    : 'bg-black/40 hover:bg-white/5 border border-white/5 text-slate-300'
                }`}
              >
                {p}
              </button>
            );
          })}

          {/* Next / Last */}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-xl bg-black/40 hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none border border-white/5 text-slate-400 hover:text-white"
            title="Next Page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-xl bg-black/40 hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none border border-white/5 text-slate-400 hover:text-white"
            title="Last Page"
          >
            <ChevronsRight className="w-4 h-4" />
          </button>
        </div>

        {/* Direct Jump Input Form */}
        <form onSubmit={handleJump} className="flex items-center gap-2 text-xs font-mono">
          <span className={recipeConfig.textSecondary}>Go to:</span>
          <input
            type="number"
            min="1"
            max={totalPages}
            placeholder={String(currentPage)}
            value={jumpPage}
            onChange={(e) => setJumpPage(e.target.value)}
            className={`w-14 px-2 py-1.5 text-center rounded-xl border text-xs ${recipeConfig.inputBg} outline-none`}
          />
          <button
            type="submit"
            className={`px-3 py-1.5 rounded-xl font-bold ${recipeConfig.accentBg} text-xs shadow-md`}
          >
            Go
          </button>
        </form>
      </div>
    </div>
  );
};
