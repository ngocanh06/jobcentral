import React, { useState, useMemo } from 'react';
import {
  Building2,
  Bookmark,
  ArrowLeft,
  Search,
  Sparkles,
  MapPin,
  Users,
  Briefcase,
  Star,
  ArrowUpRight,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import { ErrorBoundary } from './ErrorBoundary';

export const FollowedCompaniesView = ({
  companies = [],
  followedCompanyIds = [],
  onToggleFollowCompany,
  onSelectCompany,
  onExploreCompanies,
  allJobs = [],
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter followed companies
  const followedCompanies = useMemo(() => {
    return companies.filter((c) => followedCompanyIds.includes(c.id));
  }, [companies, followedCompanyIds]);

  // Filter with local search keyword if user types
  const displayCompanies = useMemo(() => {
    if (!searchQuery.trim()) return followedCompanies;
    const q = searchQuery.toLowerCase().trim();
    return followedCompanies.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        (c.industry && c.industry.toLowerCase().includes(q)) ||
        (c.location && c.location.toLowerCase().includes(q))
    );
  }, [followedCompanies, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Top Breadcrumb / Header Bar matching SavedJobsView */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200/80">
        <div className="flex items-center space-x-3">
          <button
            id="back-to-companies-btn"
            type="button"
            onClick={onExploreCompanies}
            className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors cursor-pointer"
            title="Quay lại danh sách công ty"
            aria-label="Quay lại danh sách công ty"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center space-x-2.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Công Ty Đã Theo Dõi
              </h1>
              <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full border border-indigo-100">
                {followedCompanies.length} công ty
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Danh sách các doanh nghiệp bạn đã đánh dấu để theo dõi và cập nhật cơ hội nghề nghiệp nhanh nhất.
            </p>
          </div>
        </div>

        <button
          id="explore-more-companies-btn"
          type="button"
          onClick={onExploreCompanies}
          className="self-start sm:self-auto inline-flex items-center space-x-2 px-5 py-2.5 bg-[#2170E4] hover:bg-[#1a5bbd] text-white font-medium text-sm rounded-full shadow-sm shadow-blue-500/20 transition-all cursor-pointer"
        >
          <Building2 className="w-4 h-4" />
          <span>Khám phá thêm công ty</span>
        </button>
      </div>

      {/* Main Content Area */}
      <ErrorBoundary
        title="Không thể tải danh sách công ty đã theo dõi"
        message="Đã có lỗi xảy ra khi hiển thị các doanh nghiệp bạn đang theo dõi. Vui lòng thử tải lại hoặc quay lại danh sách công ty."
        onReset={onExploreCompanies}
      >
        {followedCompanies.length > 0 ? (
          <div>
            {/* Search filter within followed list if >= 3 companies */}
            {followedCompanies.length >= 3 && (
              <div className="mb-6 max-w-md">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm trong công ty đã theo dõi..."
                    className="w-full pl-9 pr-4 py-2 bg-white rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      Xóa
                    </button>
                  )}
                </div>
              </div>
            )}

            {displayCompanies.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-8 text-center max-w-md mx-auto my-8">
                <p className="text-sm text-slate-600 mb-3">
                  Không tìm thấy công ty phù hợp với từ khóa "{searchQuery}".
                </p>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="px-4 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full transition-colors cursor-pointer"
                >
                  Xóa bộ lọc tìm kiếm
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {displayCompanies.map((company) => {
                  const companyOpenJobs = allJobs.filter(
                    (j) =>
                      j.company?.toLowerCase() === company.name?.toLowerCase() ||
                      String(j.companyId) === String(company.id)
                  );
                  const openJobsCount =
                    company.openJobsCount || companyOpenJobs.length || 0;

                  return (
                    <div
                      key={company.id}
                      id={`followed-company-card-${company.id}`}
                      className="bg-white rounded-2xl border border-slate-200/90 hover:border-indigo-300 hover:shadow-md transition-all duration-200 p-5 sm:p-6 flex flex-col justify-between group relative"
                    >
                      <div>
                        {/* Top Header Row with Logo & Unfollow button */}
                        <div className="flex items-start justify-between gap-4">
                          <div
                            onClick={() => onSelectCompany && onSelectCompany(company)}
                            className="flex items-start space-x-3.5 sm:space-x-4 cursor-pointer flex-1 min-w-0"
                          >
                            {/* Logo */}
                            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border border-slate-200 bg-slate-50 p-2 flex items-center justify-center shrink-0 shadow-2xs group-hover:border-indigo-200 transition-colors overflow-hidden">
                              {company.logo && typeof company.logo === 'string' && company.logo.startsWith('http') ? (
                                <img
                                  src={company.logo}
                                  alt={company.name}
                                  referrerPolicy="no-referrer"
                                  className="w-full h-full object-cover rounded-xl"
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    const fallback = e.currentTarget.nextElementSibling;
                                    if (fallback) fallback.style.display = 'flex';
                                  }}
                                />
                              ) : null}
                              <div
                                className={`w-full h-full items-center justify-center rounded-xl font-bold text-xs ${
                                  company.avatarBgClass || 'bg-blue-50 text-[#2170E4]'
                                } ${company.logo && typeof company.logo === 'string' && company.logo.startsWith('http') ? 'hidden' : 'flex'}`}
                              >
                                {company.avatarCode ||
                                  (company.name ? company.name.substring(0, 2).toUpperCase() : 'CP')}
                              </div>
                            </div>

                            {/* Info */}
                            <div className="min-w-0">
                              <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#2170E4] transition-colors leading-tight truncate">
                                {company.name}
                              </h3>
                              <p className="text-xs sm:text-sm text-indigo-600 font-medium truncate mt-1">
                                {company.industry}
                              </p>
                              {company.badgeText && (
                                <span
                                  className={`inline-block text-[10px] uppercase font-bold px-2 py-0.5 rounded-md mt-1.5 ${
                                    company.badgeClass || 'bg-blue-50 text-blue-700'
                                  }`}
                                >
                                  {company.badgeText}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Top Action Bookmark Unfollow Button */}
                          <div className="flex items-center space-x-1 shrink-0">
                            <button
                              id={`unfollow-company-btn-${company.id}`}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onToggleFollowCompany) {
                                  onToggleFollowCompany(company.id, e);
                                }
                              }}
                              title="Bỏ theo dõi công ty này"
                              aria-label="Bỏ theo dõi công ty"
                              className="p-2 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-600 transition-colors focus:outline-hidden cursor-pointer"
                            >
                              <Bookmark className="w-5 h-5 fill-amber-400 text-amber-500" />
                            </button>
                          </div>
                        </div>

                        {/* Meta Row: Rating, Location, Employees */}
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-4 text-xs text-slate-500 font-medium">
                          {company.rating && (
                            <div className="flex items-center space-x-1 text-amber-600 font-semibold">
                              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                              <span>{company.rating}</span>
                              {company.reviewsCount && (
                                <span className="text-slate-400 font-normal">
                                  ({company.reviewsCount})
                                </span>
                              )}
                            </div>
                          )}
                          {company.location && (
                            <span className="flex items-center space-x-1 before:content-['•'] before:mr-2 before:text-slate-300">
                              <MapPin className="w-3.5 h-3.5 text-slate-400 inline" />
                              <span className="truncate max-w-[140px]">{company.location}</span>
                            </span>
                          )}
                          {company.employees && (
                            <span className="flex items-center space-x-1 before:content-['•'] before:mr-2 before:text-slate-300">
                              <Users className="w-3.5 h-3.5 text-slate-400 inline" />
                              <span>{company.employees}</span>
                            </span>
                          )}
                        </div>

                        {/* Description */}
                        {company.description && (
                          <p className="text-xs sm:text-sm text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                            {company.description}
                          </p>
                        )}

                        {/* Highlights */}
                        {company.highlights && company.highlights.length > 0 && (
                          <div className="mt-3.5 flex flex-wrap gap-1.5">
                            {company.highlights.slice(0, 3).map((h, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center space-x-1 text-[11px] bg-slate-50 text-slate-700 border border-slate-200/80 px-2 py-0.5 rounded-md font-medium"
                              >
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                <span>{h}</span>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Divider */}
                      <div className="border-t border-slate-100 my-4" />

                      {/* Bottom Action Row */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center space-x-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                          <Briefcase className="w-3.5 h-3.5" />
                          <span>{openJobsCount} việc làm đang tuyển</span>
                        </span>

                        <button
                          type="button"
                          id={`view-followed-company-btn-${company.id}`}
                          onClick={() => onSelectCompany && onSelectCompany(company)}
                          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-white bg-[#2170E4] hover:bg-[#1a5bbd] px-4 py-2 rounded-full transition-all shadow-xs cursor-pointer"
                        >
                          <span>Xem công ty</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          /* Empty State exactly matching SavedJobsView styling */
          <div className="bg-white rounded-2xl border border-slate-200/80 p-12 text-center max-w-lg mx-auto shadow-xs my-8">
            <div className="w-16 h-16 bg-blue-50 text-[#2170E4] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-100 shadow-2xs">
              <Building2 className="w-8 h-8 stroke-[1.8]" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Chưa có công ty nào được theo dõi
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-6">
              Khi bạn tìm thấy doanh nghiệp có môi trường và cơ hội nghề nghiệp phù hợp, hãy nhấn nút "Theo dõi" để lưu lại và nhận thông báo khi có vị trí tuyển dụng mới.
            </p>
            <button
              type="button"
              id="empty-explore-companies-btn"
              onClick={onExploreCompanies}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-[#2170E4] hover:bg-[#1a5bbd] text-white font-semibold text-sm rounded-full shadow-sm shadow-blue-500/20 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Khám phá công ty ngay</span>
            </button>
          </div>
        )}
      </ErrorBoundary>
    </div>
  );
};

export default FollowedCompaniesView;
