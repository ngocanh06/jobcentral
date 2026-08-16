import React from 'react';
import {
  X,
  MapPin,
  Banknote,
  Briefcase,
  Clock,
  Bookmark,
  Building2,
  CheckCircle2,
  Share2,
  Award,
  Sparkles,
} from 'lucide-react';

export const JobDetailModal = ({
  job,
  onClose,
  onToggleSave,
  onApply,
}) => {
  if (!job) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn">
      <div
        id={`job-detail-modal-${job.id}`}
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col my-auto"
      >
        {/* Modal Sticky Header */}
        <div className="p-6 sm:p-7 border-b border-slate-100 bg-slate-50/60 flex items-start justify-between gap-4 sticky top-0 z-10 backdrop-blur-md">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 rounded-2xl border border-slate-200 bg-white p-2 flex items-center justify-center shrink-0 shadow-xs">
              <img
                src={job.companyLogo}
                alt={job.company}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div>
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-1">
                <Sparkles className="w-3 h-3" />
                <span>{job.category}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                {job.title}
              </h2>
              <p className="text-sm font-semibold text-slate-600 mt-0.5 flex items-center space-x-2">
                <span>{job.company}</span>
                <span>•</span>
                <span className="text-slate-400 text-xs">{job.postedTime}</span>
              </p>
            </div>
          </div>

          <button
            id="close-job-modal-btn"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-colors cursor-pointer"
            aria-label="Đóng chi tiết việc làm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-slate-700">
          {/* Key metadata grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/70">
            <div className="space-y-0.5">
              <span className="text-xs font-medium text-slate-400 flex items-center space-x-1">
                <Banknote className="w-3.5 h-3.5 text-emerald-600" />
                <span>Mức lương</span>
              </span>
              <p className="text-sm font-bold text-emerald-700">{job.salary}</p>
            </div>

            <div className="space-y-0.5">
              <span className="text-xs font-medium text-slate-400 flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                <span>Địa điểm</span>
              </span>
              <p className="text-sm font-bold text-slate-800">{job.location}</p>
            </div>

            <div className="space-y-0.5 col-span-2 sm:col-span-1">
              <span className="text-xs font-medium text-slate-400 flex items-center space-x-1">
                <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
                <span>Hình thức</span>
              </span>
              <p className="text-sm font-bold text-slate-800">{job.jobType}</p>
            </div>
          </div>

          {/* Job Overview */}
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Mô tả công việc</h3>
            <p className="leading-relaxed text-slate-600">{job.description}</p>
          </div>

          {/* Responsibilities */}
          {job.responsibilities && (
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-3">
                Trách nhiệm chính (Responsibilities)
              </h3>
              <ul className="space-y-2">
                {job.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed text-slate-600">{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements */}
          {job.requirements && (
            <div>
              <h3 className="text-base font-bold text-slate-900 mb-3">
                Yêu cầu ứng viên (Requirements)
              </h3>
              <ul className="space-y-2">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-start space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-relaxed text-slate-600">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Benefits */}
          {job.benefits && (
            <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100">
              <h3 className="text-base font-bold text-indigo-950 mb-3 flex items-center space-x-2">
                <Award className="w-4 h-4 text-indigo-600" />
                <span>Chế độ đãi ngộ & Phúc lợi</span>
              </h3>
              <ul className="space-y-2">
                {job.benefits.map((b, i) => (
                  <li key={i} className="flex items-start space-x-2.5 text-indigo-900">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 shrink-0 mt-2" />
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Modal Sticky Bottom Action Footer */}
        <div className="p-4 sm:p-6 border-t border-slate-100 bg-white flex items-center justify-between gap-3">
          <button
            id="modal-bookmark-btn"
            onClick={(e) => onToggleSave(job.id, e)}
            className={`px-4 py-2.5 rounded-xl border flex items-center space-x-2 text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              job.isSaved
                ? 'border-indigo-200 bg-indigo-50 text-indigo-700'
                : 'border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${job.isSaved ? 'fill-indigo-600 text-indigo-600' : ''}`} />
            <span>{job.isSaved ? 'Đã lưu việc làm' : 'Lưu tin tuyển dụng'}</span>
          </button>

          <div className="flex items-center space-x-3">
            <button
              id="modal-apply-btn"
              onClick={(e) => {
                onClose();
                onApply(job, e);
              }}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md shadow-indigo-200 transition-all cursor-pointer"
            >
              Ứng tuyển ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
