/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useGeneral } from '../GeneralContext';
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  Unlock,
  Users,
  Check,
  AlertTriangle,
  Sparkles,
  Info,
} from 'lucide-react';

export interface RolePermission {
  roleId: string;
  roleName: string;
  badgeColor: string;
  description: string;
  permissions: {
    readData: boolean;
    writeModels: boolean;
    deployCluster: boolean;
    adminPurge: boolean;
  };
}

export const PermissionMatrix: React.FC = () => {
  const { recipeConfig, stateMode } = useGeneral();

  const [roles, setRoles] = useState<RolePermission[]>([
    {
      roleId: 'role-admin',
      roleName: 'Principal Administrator',
      badgeColor: 'bg-rose-950/80 text-rose-300 border-rose-800',
      description: 'Unrestricted cluster authority, root key management, and cryptographic signing.',
      permissions: {
        readData: true,
        writeModels: true,
        deployCluster: true,
        adminPurge: true,
      },
    },
    {
      roleId: 'role-lead',
      roleName: 'Senior ML Research Scientist',
      badgeColor: 'bg-indigo-950/80 text-indigo-300 border-indigo-800',
      description: 'Full training pipeline control, checkpoint promotion, and dataset authoring.',
      permissions: {
        readData: true,
        writeModels: true,
        deployCluster: true,
        adminPurge: false,
      },
    },
    {
      roleId: 'role-eng',
      roleName: 'Pipeline Operator / Engineer',
      badgeColor: 'bg-cyan-950/80 text-cyan-300 border-cyan-800',
      description: 'Telemetry monitoring and experimental execution on isolated slices.',
      permissions: {
        readData: true,
        writeModels: true,
        deployCluster: false,
        adminPurge: false,
      },
    },
    {
      roleId: 'role-auditor',
      roleName: 'External Compliance Auditor',
      badgeColor: 'bg-amber-950/80 text-amber-300 border-amber-800',
      description: 'Read-only access to model evaluation metrics and immutable audit trails.',
      permissions: {
        readData: true,
        writeModels: false,
        deployCluster: false,
        adminPurge: false,
      },
    },
  ]);

  const togglePerm = (roleId: string, permKey: keyof RolePermission['permissions']) => {
    setRoles((prev) =>
      prev.map((role) => {
        if (role.roleId !== roleId) return role;
        return {
          ...role,
          permissions: {
            ...role.permissions,
            [permKey]: !role.permissions[permKey],
          },
        };
      })
    );
  };

  return (
    <div className={`rounded-3xl border ${recipeConfig.cardBg} ${recipeConfig.border} ${recipeConfig.fontFamily} shadow-2xl p-6 space-y-6 select-none max-w-4xl`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-2xl bg-black/40 border border-white/10 text-indigo-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className={`font-bold text-base ${recipeConfig.textPrimary}`}>
              Role-Based Access Control (RBAC) Matrix
            </h3>
            <p className={`text-xs ${recipeConfig.textSecondary}`}>
              Configure granular node and cryptographic policy permissions across team roles
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-xl bg-emerald-950/80 text-emerald-400 border border-emerald-800 text-xs font-mono font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Zero-Trust Enforced
          </span>
        </div>
      </div>

      {/* RBAC Matrix Table */}
      <div className="border border-white/5 rounded-2xl overflow-x-auto bg-black/30">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className={`border-b border-white/5 bg-black/50 text-[11px] font-mono uppercase ${recipeConfig.textSecondary}`}>
              <th className="py-3.5 px-4 w-1/3">Security Role Profile</th>
              <th className="py-3.5 px-3 text-center">Read Telemetry</th>
              <th className="py-3.5 px-3 text-center">Write Models</th>
              <th className="py-3.5 px-3 text-center">Deploy Pods</th>
              <th className="py-3.5 px-3 text-center">Admin Purge</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {roles.map((role) => (
              <tr key={role.roleId} className="hover:bg-white/5 transition-colors">
                <td className="py-4 px-4 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`font-bold ${recipeConfig.textPrimary}`}>{role.roleName}</span>
                  </div>
                  <p className={`text-[11px] ${recipeConfig.textSecondary}`}>{role.description}</p>
                </td>

                {/* Read Perm */}
                <td className="py-4 px-3 text-center">
                  <button
                    onClick={() => togglePerm(role.roleId, 'readData')}
                    className={`w-7 h-7 rounded-xl inline-flex items-center justify-center transition-all ${
                      role.permissions.readData
                        ? 'bg-emerald-500 text-black font-bold shadow-md'
                        : 'bg-black/50 border border-white/10 text-slate-600'
                    }`}
                  >
                    {role.permissions.readData ? <Check className="w-4 h-4" /> : <Lock className="w-3.5 h-3.5" />}
                  </button>
                </td>

                {/* Write Perm */}
                <td className="py-4 px-3 text-center">
                  <button
                    onClick={() => togglePerm(role.roleId, 'writeModels')}
                    className={`w-7 h-7 rounded-xl inline-flex items-center justify-center transition-all ${
                      role.permissions.writeModels
                        ? 'bg-indigo-500 text-white font-bold shadow-md'
                        : 'bg-black/50 border border-white/10 text-slate-600'
                    }`}
                  >
                    {role.permissions.writeModels ? <Check className="w-4 h-4" /> : <Lock className="w-3.5 h-3.5" />}
                  </button>
                </td>

                {/* Deploy Perm */}
                <td className="py-4 px-3 text-center">
                  <button
                    onClick={() => togglePerm(role.roleId, 'deployCluster')}
                    className={`w-7 h-7 rounded-xl inline-flex items-center justify-center transition-all ${
                      role.permissions.deployCluster
                        ? 'bg-cyan-500 text-black font-bold shadow-md'
                        : 'bg-black/50 border border-white/10 text-slate-600'
                    }`}
                  >
                    {role.permissions.deployCluster ? <Check className="w-4 h-4" /> : <Lock className="w-3.5 h-3.5" />}
                  </button>
                </td>

                {/* Purge / Admin Perm */}
                <td className="py-4 px-3 text-center">
                  <button
                    onClick={() => togglePerm(role.roleId, 'adminPurge')}
                    className={`w-7 h-7 rounded-xl inline-flex items-center justify-center transition-all ${
                      role.permissions.adminPurge
                        ? 'bg-rose-500 text-white font-bold shadow-md'
                        : 'bg-black/50 border border-white/10 text-slate-600'
                    }`}
                  >
                    {role.permissions.adminPurge ? <Check className="w-4 h-4" /> : <Lock className="w-3.5 h-3.5" />}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
