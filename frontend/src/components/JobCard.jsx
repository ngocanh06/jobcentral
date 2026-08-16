import React from 'react';
import { MapPin, Banknote, Briefcase, Clock, Bookmark } from 'lucide-react';

export const JobCard = ({
  job,
  onToggleSave,
  onApply,
  onViewDetails,
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

        {/* Bookmark action button */}
        <button
          id={`bookmark-btn-${job.id}`}
          onClick={(e) => onToggleSave(job.id, e)}
          title={job.isSaved ? 'Bỏ lưu việc làm' : 'Lưu việc làm'}
          className={`p-2 rounded-xl transition-all focus:outline-hidden ${
            job.isSaved
              ? 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100'
              : 'text-slate-400 hover:text-indigo-600 hover:bg-slate-50'
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

      {/* Meta Pills Row */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mt-4">
        {/* Location badge */}
        <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium">
          <MapPin className="w-3.5 h-3.5 text-slate-500" />
          <span>{job.location}</span>
        </div>

        {/* Salary badge */}
        <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200/70 text-emerald-700 text-xs font-semibold">
          <Banknote className="w-3.5 h-3.5 text-emerald-600" />
          <span>{job.salary}</span>
        </div>

        {/* Job Type badge */}
        <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-medium">
          <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
          <span>{job.jobType}</span>
        </div>

        {/* Posted time */}
        <div className="inline-flex items-center space-x-1 text-xs text-slate-400 ml-auto sm:ml-0 font-medium">
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
            className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-sm shadow-indigo-200 transition-all focus:outline-hidden cursor-pointer"
          >
            Ứng tuyển ngay
          </button>
        </div>
      </div>
    </div>
  );
};
