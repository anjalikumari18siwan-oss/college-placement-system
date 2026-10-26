import React from 'react';

interface StatusBadgeProps {
  status: string;
  type?: 'application' | 'drive' | 'company' | 'interview';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, type = 'application', className = '' }) => {
  let bg = 'bg-slate-100 text-slate-700 border-slate-200';
  let label = status;

  if (type === 'application') {
    switch (status) {
      case 'APPLIED':
        bg = 'bg-blue-50 text-blue-700 border-blue-200';
        label = 'Applied';
        break;
      case 'SHORTLISTED':
        bg = 'bg-sky-50 text-sky-700 border-sky-200';
        label = 'Shortlisted';
        break;
      case 'ASSESSMENT':
        bg = 'bg-amber-50 text-amber-700 border-amber-200';
        label = 'Assessment';
        break;
      case 'TECHNICAL_INTERVIEW':
        bg = 'bg-purple-50 text-purple-700 border-purple-200';
        label = 'Tech Interview';
        break;
      case 'HR_INTERVIEW':
        bg = 'bg-indigo-50 text-indigo-700 border-indigo-200';
        label = 'HR Interview';
        break;
      case 'SELECTED':
        bg = 'bg-emerald-50 text-emerald-700 border-emerald-300 font-semibold';
        label = 'Selected 🎉';
        break;
      case 'REJECTED':
        bg = 'bg-rose-50 text-rose-700 border-rose-200';
        label = 'Not Selected';
        break;
    }
  } else if (type === 'drive') {
    switch (status) {
      case 'ACTIVE':
        bg = 'bg-emerald-50 text-emerald-700 border-emerald-300';
        label = 'Active Drive';
        break;
      case 'UPCOMING':
        bg = 'bg-blue-50 text-blue-700 border-blue-200';
        label = 'Upcoming';
        break;
      case 'COMPLETED':
        bg = 'bg-slate-100 text-slate-600 border-slate-300';
        label = 'Completed';
        break;
      case 'CANCELLED':
        bg = 'bg-rose-50 text-rose-600 border-rose-200';
        label = 'Cancelled';
        break;
    }
  } else if (type === 'company') {
    if (status === 'APPROVED' || status === 'true') {
      bg = 'bg-emerald-50 text-emerald-700 border-emerald-200';
      label = 'Approved Recruiter';
    } else {
      bg = 'bg-amber-50 text-amber-700 border-amber-200';
      label = 'Pending Verification';
    }
  } else if (type === 'interview') {
    switch (status) {
      case 'SCHEDULED':
        bg = 'bg-blue-50 text-blue-700 border-blue-200';
        label = 'Scheduled';
        break;
      case 'COMPLETED':
        bg = 'bg-emerald-50 text-emerald-700 border-emerald-200';
        label = 'Concluded';
        break;
      case 'CANCELLED':
        bg = 'bg-rose-50 text-rose-700 border-rose-200';
        label = 'Cancelled';
        break;
      case 'RESCHEDULED':
        bg = 'bg-amber-50 text-amber-700 border-amber-200';
        label = 'Rescheduled';
        break;
    }
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${bg} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-75" />
      {label}
    </span>
  );
};
