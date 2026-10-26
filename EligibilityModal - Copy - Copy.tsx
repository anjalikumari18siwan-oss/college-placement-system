import React from 'react';
import { CheckCircle2, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { EligibilityResult } from '@/lib/eligibility';

interface EligibilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  driveTitle: string;
  companyName: string;
  eligibility: EligibilityResult;
  onApply?: () => void;
  isApplying?: boolean;
  hasApplied?: boolean;
}

export const EligibilityModal: React.FC<EligibilityModalProps> = ({
  isOpen,
  onClose,
  driveTitle,
  companyName,
  eligibility,
  onApply,
  isApplying = false,
  hasApplied = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-slate-100 bg-slate-50/70">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                Eligibility Audit
              </span>
              <span className="text-xs text-slate-500 font-medium">{companyName}</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mt-1">{driveTitle}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {/* Overall verdict banner */}
          {eligibility.canApply ? (
            <div className="flex items-start space-x-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">You are eligible to apply!</p>
                <p className="text-xs text-emerald-700 mt-0.5">
                  Your academic marks, branch, batch, and backlog status satisfy all criteria set by {companyName}.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-start space-x-3 p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-900">
              <AlertCircle className="w-5 h-5 text-rose-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-sm">Eligibility Criteria Not Met</p>
                <p className="text-xs text-rose-700 mt-0.5">
                  You cannot submit an application because one or more requirements are not satisfied.
                </p>
              </div>
            </div>
          )}

          {/* Detailed Criteria Checklist */}
          <div className="border border-slate-200 rounded-xl divide-y divide-slate-100 overflow-hidden">
            <div className="bg-slate-50/80 px-4 py-2.5 text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Verification Breakdown
            </div>
            {eligibility.criteriaChecks.map((criterion, idx) => (
              <div key={idx} className="p-3.5 flex items-start justify-between gap-3 text-sm">
                <div className="flex items-start space-x-2.5">
                  {criterion.passed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-500 mt-0.5 flex-shrink-0" />
                  )}
                  <div>
                    <div className="font-medium text-slate-800 text-xs sm:text-sm">
                      {criterion.label}
                    </div>
                    {criterion.message && (
                      <div
                        className={`text-xs mt-0.5 ${
                          criterion.passed ? 'text-slate-500' : 'text-rose-600 font-medium'
                        }`}
                      >
                        {criterion.message}
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-xs text-slate-500">
                    Req: <span className="font-mono font-medium text-slate-700">{criterion.required}</span>
                  </div>
                  <div className="text-xs">
                    Your: <span className="font-mono font-semibold text-slate-900">{criterion.actual}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Ineligibility reasons list */}
          {eligibility.reasons.length > 0 && !eligibility.isEligible && (
            <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl">
              <div className="flex items-center space-x-2 text-amber-900 font-semibold text-xs mb-2">
                <Info className="w-4 h-4 text-amber-600" />
                <span>Identified Issues:</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-xs text-amber-800">
                {eligibility.reasons.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-200/70 rounded-lg transition"
          >
            Close
          </button>
          {onApply && !hasApplied && eligibility.canApply && (
            <button
              type="button"
              disabled={isApplying}
              onClick={onApply}
              className="px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 rounded-lg shadow-sm transition"
            >
              {isApplying ? 'Submitting Application...' : 'Confirm & Apply Now'}
            </button>
          )}
          {hasApplied && (
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
              Already Applied
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
