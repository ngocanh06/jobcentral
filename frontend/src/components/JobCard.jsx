import React from 'react';
import { MapPin, Banknote, Briefcase, Clock, Bookmark, Share2 } from 'lucide-react';

export const JobCard = ({
  job,
  onToggleSave,
  onApply,
  onViewDetails,
  onShare,
}) => {
  return (
    <div
      id={`job-card-${job.id}`}
      onClick={() => onViewDetails(job)}
      className="bg-white rounded-2xl border border-slate-200/90 hover:border-indigo-300 hover:shadow-md transition-all duration-200 p-5 sm:p-6 cursor-pointer group relative"
    >
      {/* Top Header Row */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start space-x-4">
          {/* Company Logo Box */}
          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center p-1.5 shrink-0 overflow-hidden shadow-xs">
            <img
              src={job.companyLogo}
              alt={job.company}
              className="w-full h-full object-cover rounded-lg"
              loading="lazy"
            />
          </div>

          {/* Job title & company */}
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight">
              {job.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
              {job.company}
            </p>
          </div>
        </div>

        {/* Top Action buttons: Share + Bookmark */}
        <div className="flex items-center space-x-1 shrink-0">
          <button
            id={`share-btn-${job.id}`}
            type="button"
            onClick={(e) => {
              if (e) e.stopPropagation();
              if (onShare) onShare(job, e);
            }}
            title="Chia sẻ việc làm"
            className="p-2 rounded-full text-slate-400 hover:text-indigo-600 hover:bg-indigo-50/60 transition-colors focus:outline-hidden cursor-pointer"
            aria-label="Chia sẻ việc làm"
          >
            <Share2 className="w-5 h-5" />
          </button>

          <button
            id={`bookmark-btn-${job.id}`}
            type="button"
            onClick={(e) => onToggleSave(job.id, e)}
            title={job.isSaved ? 'Bỏ lưu việc làm' : 'Lưu việc làm'}
            className={`p-2 rounded-full hover:bg-indigo-50/60 transition-colors focus:outline-hidden cursor-pointer ${
              job.isSaved
                ? 'text-indigo-600'
                : 'text-slate-400 hover:text-indigo-600'
            }`}
            aria-label="Lưu việc làm"
          >
            <Bookmark
              className={`w-5 h-5 ${
                job.isSaved ? 'fill-indigo-600 text-indigo-600' : 'text-slate-400'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Meta Row */}
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-4 text-xs text-slate-500 font-medium">
        <span className="text-xs text-slate-500 font-medium">
          {job.jobType || 'Full-time'}
        </span>
        <span className="text-xs text-slate-500 font-medium before:content-['•'] before:mr-2 before:text-slate-300">
          {job.salary}
        </span>
        <span className="text-xs text-slate-500 font-medium before:content-['•'] before:mr-2 before:text-slate-300">
          {job.location}
        </span>

        {/* Posted time */}
        <div className="inline-flex items-center space-x-1 text-xs text-slate-400 ml-auto font-medium">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>{job.postedTime}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-100 my-4" />

      {/* Bottom Action & Requirement Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="text-xs sm:text-sm text-slate-500 line-clamp-1 pr-2">
          <span className="text-[11px] uppercase font-bold tracking-wider text-slate-400 mr-1">Yêu cầu:</span>
          {job.requirementsSummary}
        </div>

        <div className="flex items-center space-x-2 shrink-0 self-end sm:self-auto">
          <button
            id={`apply-btn-${job.id}`}
            onClick={(e) => onApply(job, e)}
            className="px-5 py-2 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-full shadow-xs hover:shadow-sm active:scale-95 transition-all focus:outline-hidden cursor-pointer"
          >
            Ứng tuyển ngay
          </button>
        </div>
      </div>
    </div>
  );
};
