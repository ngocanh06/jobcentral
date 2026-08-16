import React from 'react';
import { Bookmark, ArrowLeft, Briefcase, Search, Sparkles } from 'lucide-react';
import { JobCard } from './JobCard';

export const SavedJobsView = ({
  jobs,
  onToggleSave,
  onApply,
  onViewDetails,
  onExploreMore,
}) => {
  const savedJobs = jobs.filter((j) => j.isSaved);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Top Breadcrumb / Back button */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200/80">
        <div className="flex items-center space-x-3">
          <button
            id="back-to-jobs-btn"
            onClick={onExploreMore}
            className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
            title="Quay lại danh sách việc làm"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Việc Làm Đã Lưu
              </h1>
              <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full border border-indigo-100">
                {savedJobs.length} công việc
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Danh sách các cơ hội nghề nghiệp bạn đã đánh dấu để theo dõi và ứng tuyển.
            </p>
          </div>
        </div>

        <button
          id="explore-more-jobs-btn"
          onClick={onExploreMore}
          className="hidden sm:inline-flex items-center space-x-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-xl shadow-sm shadow-indigo-200 transition-all"
        >
          <Search className="w-4 h-4" />
          <span>Tìm thêm việc làm</span>
        </button>
      </div>

      {/* Main Content Area */}
      {savedJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {savedJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onToggleSave={onToggleSave}
              onApply={onApply}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center max-w-lg mx-auto shadow-xs my-8">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-400">
            <Bookmark className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            Chưa có việc làm nào được lưu
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed mb-6">
            Khi bạn tìm thấy công việc phù hợp nhưng chưa sẵn sàng ứng tuyển ngay, hãy nhấn biểu tượng Bookmark để lưu lại tại đây.
          </p>
          <button
            onClick={onExploreMore}
            className="inline-flex items-center space-x-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-xl shadow-sm shadow-indigo-200 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Khám phá việc làm ngay</span>
          </button>
        </div>
      )}
    </div>
  );
};
