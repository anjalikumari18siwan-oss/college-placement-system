'use client';

import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface DepartmentData {
  department: string;
  totalStudents: number;
  placedStudents: number;
  placementRate: string;
}

interface StageData {
  stage: string;
  count: number;
}

const STAGE_COLORS: Record<string, string> = {
  APPLIED: '#3b82f6',
  SHORTLISTED: '#0ea5e9',
  ASSESSMENT: '#f59e0b',
  TECHNICAL_INTERVIEW: '#8b5cf6',
  HR_INTERVIEW: '#6366f1',
  SELECTED: '#10b981',
  REJECTED: '#f43f5e',
};

export const DepartmentPlacementChart: React.FC<{ data: DepartmentData[] }> = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="text-center py-8 text-xs text-slate-400">No department data available</div>;
  }

  const chartData = data.map((d) => ({
    name: d.department.length > 15 ? d.department.slice(0, 14) + '...' : d.department,
    Total: d.totalStudents,
    Placed: d.placedStudents,
    Rate: parseFloat(d.placementRate),
  }));

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 20, left: -10, bottom: 20 }}>
          <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} interval={0} angle={-15} textAnchor="end" />
          <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0f172a',
              borderRadius: '8px',
              border: 'none',
              color: '#fff',
              fontSize: '12px',
            }}
          />
          <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
          <Bar dataKey="Total" fill="#94a3b8" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Placed" fill="#2563eb" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const StageDistributionChart: React.FC<{ data: StageData[] }> = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="text-center py-8 text-xs text-slate-400">No application stages data</div>;
  }

  const formattedData = data.map((d) => ({
    name: d.stage.replace(/_/g, ' '),
    value: d.count,
    color: STAGE_COLORS[d.stage] || '#64748b',
  }));

  return (
    <div className="w-full h-72 flex flex-col items-center justify-center">
      <ResponsiveContainer width="100%" height="80%">
        <PieChart>
          <Pie
            data={formattedData}
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={75}
            paddingAngle={3}
            dataKey="value"
          >
            {formattedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#0f172a',
              borderRadius: '8px',
              border: 'none',
              color: '#fff',
              fontSize: '12px',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
        {formattedData.map((item, idx) => (
          <div key={idx} className="flex items-center space-x-1.5 text-[11px] text-slate-600">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
            <span>{item.name}: <strong>{item.value}</strong></span>
          </div>
        ))}
      </div>
    </div>
  );
};
