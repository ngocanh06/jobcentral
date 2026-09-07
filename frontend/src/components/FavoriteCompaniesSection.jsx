import React from 'react';
import {
  Building2,
  Heart,
  Star,
  MapPin,
  Users,
  Briefcase,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Trash2,
} from 'lucide-react';

export const FavoriteCompaniesSection = ({
  allCompanies = [],
  followedCompanyIds = [],
  onToggleFollowCompany,
  onSelectCompany,
  onExploreCompanies,
}) => {
  const favoriteCompanies = allCompanies.filter((c) =>
    followedCompanyIds.includes(c.id)
  );

  return (
    <section
      id="favorite-companies-section"
      className="mt-16 pt-12 border-t border-slate-200/80 scroll-mt-24"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 text-[#0A58CA] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2.5">
            <Building2 className="w-3.5 h-3.5 text-[#0A58CA]" />
            <span>Doanh nghiệp đang theo dõi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <span>Công Ty Đã Theo Dõi</span>
            <span className="text-sm font-bold bg-blue-100 text-[#0A58CA] px-2.5 py-0.5 rounded-full">
              {favoriteCompanies.length}
            </span>
          </h2>
          <p className="text-sm text-slate-500 mt-1.5 max-w-2xl">
            Nhận thông báo việc làm ưu tiên và theo dõi các cập nhật mới nhất từ những doanh nghiệp bạn quan tâm hàng đầu.
          </p>
        </div>

        {favoriteCompanies.length > 0 && (
          <div className="text-xs text-slate-500 flex items-center space-x-1.5 bg-slate-50 border border-slate-200/80 px-3.5 py-2 rounded-xl">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Tự động cập nhật việc làm mới mỗi ngày</span>
          </div>
        )}
      </div>

      {favoriteCompanies.length === 0 ? (
        <div
          id="favorite-companies-empty-state"
          className="bg-white rounded-3xl border border-dashed border-slate-300 p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-xs"
        >
          <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto mb-4 text-[#0A58CA] shadow-xs">
            <Building2 className="w-8 h-8 stroke-[1.7]" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">
            Chưa có công ty nào trong danh sách theo dõi
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
            Nhấn vào nút "Theo dõi" trên bất kỳ thẻ công ty nào để lưu lại và theo dõi cơ hội nghề nghiệp nhanh chóng.
          </p>
          {onExploreCompanies && (
            <button
              type="button"
              id="explore-companies-btn"
              onClick={onExploreCompanies}
              className="mt-6 inline-flex items-center space-x-2 px-5 py-2.5 bg-[#0A58CA] hover:bg-[#084298] text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-xs cursor-pointer"
            >
              <Building2 className="w-4 h-4" />
              <span>Khám phá công ty hàng đầu ngay</span>
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteCompanies.map((company) => {
            return (
              <div
                key={company.id}
                id={`favorite-company-card-${company.id}`}
                className="bg-white rounded-2xl border border-slate-200/80 p-5 hover:border-rose-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between group relative"
              >
                <div>
                  {/* Top: Logo & Unfollow button */}
                  <div className="flex items-start justify-between gap-3">
                    <div
                      onClick={() => onSelectCompany && onSelectCompany(company)}
                      className="flex items-center space-x-3.5 cursor-pointer flex-1 min-w-0"
                    >
                      <div className="w-14 h-14 rounded-2xl border border-slate-200 bg-slate-50 p-2 flex items-center justify-center shrink-0 shadow-2xs group-hover:border-rose-200 transition-colors">
                        <img
                          src={company.logo}
                          alt={company.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-base font-bold text-slate-900 group-hover:text-[#0A58CA] transition-colors truncate">
                          {company.name}
                        </h4>
                        <p className="text-xs text-indigo-600 font-medium truncate mt-0.5">
                          {company.industry}
                        </p>
                      </div>
                    </div>

                    {/* Unfollow Heart Action */}
                    <button
                      type="button"
                      id={`unfollow-btn-${company.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onToggleFollowCompany) {
                          onToggleFollowCompany(company.id);
                        }
                      }}
                      title="Bỏ theo dõi công ty này"
                      aria-label="Bỏ theo dõi công ty"
                      className="p-2 rounded-xl text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors cursor-pointer shrink-0"
                    >
                      <Heart className="w-4 h-4 fill-rose-600 text-rose-600" />
                    </button>
                  </div>

                  {/* Rating and Info */}
                  <div className="flex items-center justify-between text-xs text-slate-500 mt-4 pt-3 border-t border-slate-100">
                    <div className="flex items-center space-x-1 font-semibold text-amber-600">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{company.rating}</span>
                      <span className="text-slate-400 font-normal">
                        ({company.reviewsCount})
                      </span>
                    </div>

                    <div className="flex items-center space-x-1 text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate max-w-[120px]">{company.location}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                    {company.description}
                  </p>

                  {/* Highlights */}
                  {company.highlights && company.highlights.length > 0 && (
                    <div className="mt-3.5 flex flex-wrap gap-1.5">
                      {company.highlights.slice(0, 2).map((h, idx) => (
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

                {/* Footer Buttons */}
                <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center space-x-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>{company.openJobsCount} việc làm</span>
                  </span>

                  <button
                    type="button"
                    id={`view-detail-fav-company-${company.id}`}
                    onClick={() => onSelectCompany && onSelectCompany(company)}
                    className="inline-flex items-center space-x-1 text-xs font-semibold text-white bg-[#0A58CA] hover:bg-[#084298] px-3.5 py-1.5 rounded-xl transition-all shadow-xs cursor-pointer"
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
    </section>
  );
};
