import React from 'react';
import { CheckCircle2, Circle, XCircle, Clock } from 'lucide-react';

const STAGES = [
  { key: 'APPLIED', label: 'Applied' },
  { key: 'SHORTLISTED', label: 'Shortlisted' },
  { key: 'ASSESSMENT', label: 'Assessment' },
  { key: 'TECHNICAL_INTERVIEW', label: 'Technical Round' },
  { key: 'HR_INTERVIEW', label: 'HR Interview' },
  { key: 'SELECTED', label: 'Selected' },
];

interface ApplicationTimelineProps {
  currentStatus: string;
  appliedDate?: string | Date;
  currentRoundNote?: string | null;
  selectionFeedback?: string | null;
}

export const ApplicationTimeline: React.FC<ApplicationTimelineProps> = ({
  currentStatus,
  appliedDate,
  currentRoundNote,
  selectionFeedback,
}) => {
  const isRejected = currentStatus === 'REJECTED';
  const currentIndex = isRejected
    ? -1
    : STAGES.findIndex((s) => s.key === currentStatus);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-slate-800">Recruitment Journey</h4>
        {appliedDate && (
          <span className="text-xs text-slate-500">
            Applied on {new Date(appliedDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
        )}
      </div>

      {isRejected ? (
        <div className="flex items-start space-x-3 p-4 bg-rose-50 border border-rose-200 rounded-lg">
          <XCircle className="w-5 h-5 text-rose-600 mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-sm font-medium text-rose-900">Application Closed / Not Selected</div>
            <p className="text-xs text-rose-700 mt-1">
              {selectionFeedback || currentRoundNote || 'The recruiting team decided not to advance your profile at this time.'}
            </p>
          </div>
        </div>
      ) : (
        <div className="relative">
          {/* Timeline steps */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {STAGES.map((stage, idx) => {
              const isCompleted = idx < currentIndex || (currentStatus === 'SELECTED' && idx === currentIndex);
              const isCurrent = idx === currentIndex && currentStatus !== 'SELECTED';

              return (
                <div
                  key={stage.key}
                  className={`flex flex-col items-center text-center p-2.5 rounded-lg border transition-all ${
                    isCurrent
                      ? 'bg-blue-50/80 border-blue-300 ring-2 ring-blue-500/20 shadow-sm'
                      : isCompleted
                      ? 'bg-emerald-50/40 border-emerald-200 text-slate-700'
                      : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                  }`}
                >
                  <div className="mb-1.5">
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : isCurrent ? (
                      <Clock className="w-5 h-5 text-blue-600 animate-pulse" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300" />
                    )}
                  </div>
                  <span
                    className={`text-xs font-medium leading-tight ${
                      isCurrent
                        ? 'text-blue-900 font-semibold'
                        : isCompleted
                        ? 'text-slate-800'
                        : 'text-slate-500'
                    }`}
                  >
                    {stage.label}
                  </span>
                  {isCurrent && (
                    <span className="mt-1 text-[10px] uppercase font-bold tracking-wider text-blue-700 bg-blue-100 px-1.5 py-0.2 rounded">
                      In Progress
                    </span>
                  )}
                  {isCompleted && stage.key === 'SELECTED' && (
                    <span className="mt-1 text-[10px] uppercase font-bold tracking-wider text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                      Offered!
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {(currentRoundNote || selectionFeedback) && (
            <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700">
              <span className="font-semibold text-slate-900">Coordinator / Recruiter Note: </span>
              {currentRoundNote || selectionFeedback}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
