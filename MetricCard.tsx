import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive?: boolean;
  };
  accentColor?: 'blue' | 'emerald' | 'purple' | 'amber' | 'navy';
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  accentColor = 'blue',
}) => {
  const colorMap = {
    blue: {
      iconBg: 'bg-blue-50 text-blue-600',
      borderHover: 'hover:border-blue-300',
      glow: 'group-hover:bg-blue-500/5',
    },
    emerald: {
      iconBg: 'bg-emerald-50 text-emerald-600',
      borderHover: 'hover:border-emerald-300',
      glow: 'group-hover:bg-emerald-500/5',
    },
    purple: {
      iconBg: 'bg-purple-50 text-purple-600',
      borderHover: 'hover:border-purple-300',
      glow: 'group-hover:bg-purple-500/5',
    },
    amber: {
      iconBg: 'bg-amber-50 text-amber-600',
      borderHover: 'hover:border-amber-300',
      glow: 'group-hover:bg-amber-500/5',
    },
    navy: {
      iconBg: 'bg-slate-100 text-slate-800',
      borderHover: 'hover:border-slate-400',
      glow: 'group-hover:bg-slate-500/5',
    },
  };

  const scheme = colorMap[accentColor] || colorMap.blue;

  return (
    <div
      className={`relative group bg-white border border-slate-200/80 rounded-xl p-5 shadow-sm transition-all duration-200 ${scheme.borderHover} hover:shadow-md overflow-hidden`}
    >
      <div
        className={`absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${scheme.glow} pointer-events-none`}
      />
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </span>
        <div className={`p-2.5 rounded-lg ${scheme.iconBg}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="flex items-baseline space-x-2">
        <span className="text-2xl font-bold text-slate-900 tracking-tight">{value}</span>
        {trend && (
          <span
            className={`text-xs font-medium px-1.5 py-0.5 rounded ${
              trend.isPositive ? 'text-emerald-700 bg-emerald-50' : 'text-slate-600 bg-slate-100'
            }`}
          >
            {trend.value}
          </span>
        )}
      </div>
      {subtitle && <p className="mt-1.5 text-xs text-slate-500">{subtitle}</p>}
    </div>
  );
};
