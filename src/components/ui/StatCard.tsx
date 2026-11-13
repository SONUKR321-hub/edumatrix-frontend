import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  change?: string;
  isPositiveChange?: boolean;
  icon: LucideIcon;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  subtitle,
  change,
  isPositiveChange,
  icon: Icon,
  onClick,
}) => (
  <div
    onClick={onClick}
    className={`bg-white rounded-2xl border border-stone-100 shadow-sm p-6 transition-all ${
      onClick
        ? 'cursor-pointer hover:shadow-md hover:shadow-stone-900/5'
        : ''
    }`}
  >
    <div className="flex items-start justify-between mb-3">
      {/* Icon */}
      <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/40 flex items-center justify-center text-amber-600">
        <Icon className="w-5 h-5" />
      </div>
      {/* Change chip */}
      {change !== undefined && (
        <span
          className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
            isPositiveChange
              ? 'bg-emerald-100 text-emerald-700'
              : 'bg-rose-100 text-rose-700'
          }`}
        >
          {change}
        </span>
      )}
    </div>

    <p className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-1">
      {label}
    </p>
    <p className="text-3xl font-extrabold text-stone-900 tabular-nums tracking-tight">
      {value}
    </p>
    {subtitle && (
      <p className="text-xs text-stone-500 mt-1">{subtitle}</p>
    )}
  </div>
);
