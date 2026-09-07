import React, { useState, useEffect } from 'react';
import {
  Building2,
  Star,
  MapPin,
  Users,
  ArrowUpRight,
  CheckCircle2,
  Search,
  X,
  Sparkles,
  Heart,
  ChevronDown,
} from 'lucide-react';
import { FavoriteCompaniesSection } from './FavoriteCompaniesSection';

export const CompaniesView = ({
  companies,
  onSelectCompany,
  onExploreJobs,
  initialSearchQuery = '',
  onResetSearch,
  followedCompanyIds = [],
  onToggleFollowCompany,
}) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchQuery || '');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  useEffect(() => {
    if (initialSearchQuery) {
      setSearchTerm(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  const industries = [
    { id: 'all', label: 'Tất cả lĩnh vực' },
    { id: 'tech', label: 'Công nghệ & Phần mềm' },
    { id: 'finance', label: 'Fintech & Ngân hàng' },
  ];

  const filteredCompanies = companies.filter((c) => {
    const matchesSearch =
      !searchTerm.trim() ||
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation =
      selectedLocation === 'all' ||
      c.location.toLowerCase().includes(selectedLocation.toLowerCase());

    const matchesIndustry =
      selectedIndustry === 'all' ||
      (selectedIndustry === 'tech' && c.category === 'tech') ||
      (selectedIndustry === 'finance' && c.category === 'finance');

    return matchesSearch && matchesLocation && matchesIndustry;
  });

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
      {/* Title & Subtitle matching the screenshot */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-4xl md:text-[38px] font-extrabold text-slate-900 tracking-tight leading-tight">
          Khám phá nơi làm việc lý tưởng của bạn
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-500 font-normal leading-relaxed max-w-xl mx-auto">
          Tìm kiếm thông tin, đánh giá và cơ hội nghề nghiệp tại hàng nghìn công ty
          <br className="hidden sm:inline" /> hàng đầu Việt Nam.
        </p>

        {/* Sleek Search Bar matching the screenshot */}
        <form
          onSubmit={handleSearchSubmit}
          className="mt-8 bg-white rounded-2xl border border-slate-200/90 shadow-sm p-2 flex flex-col sm:flex-row items-center max-w-2xl mx-auto transition-shadow hover:shadow-md gap-2 sm:gap-0"
        >
          {/* Keyword Input */}
          <div className="relative flex items-center flex-1 w-full pl-3 pr-2">
            <Search className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tên công ty, từ khóa..."
              className="w-full py-1.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 bg-transparent focus:outline-hidden"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  if (onResetSearch) onResetSearch();
                }}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors mr-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Vertical Divider (desktop) */}
          <div className="hidden sm:block h-7 w-px bg-slate-200 mx-2 shrink-0" />

          {/* Location Dropdown */}
          <div className="relative flex items-center shrink-0 w-full sm:w-auto px-3 sm:px-2 py-1 sm:py-0 border-t sm:border-t-0 border-slate-100 sm:border-transparent">
            <MapPin className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
            <div className="relative flex items-center w-full sm:w-auto">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="appearance-none bg-transparent text-xs sm:text-sm text-slate-700 font-medium pr-7 focus:outline-hidden cursor-pointer w-full sm:w-auto"
              >
                <option value="all">Tất cả địa điểm</option>
                <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                <option value="Hà Nội">Hà Nội</option>
                <option value="Đà Nẵng">Đà Nẵng</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-1 pointer-events-none" />
            </div>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 bg-[#2170E4] hover:bg-[#1a5bbd] text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shrink-0 shadow-xs cursor-pointer active:scale-98"
          >
            Tìm kiếm
          </button>
        </form>

        {/* Notice when navigated from recruiter */}
        {initialSearchQuery && searchTerm === initialSearchQuery && (
          <div className="mt-4 inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 text-[#0A58CA] text-xs font-semibold px-3.5 py-1.5 rounded-xl animate-in fade-in duration-200">
            <Sparkles className="w-3.5 h-3.5 text-[#0A58CA]" />
            <span>Đang hiển thị thông tin công ty của Nhà tuyển dụng: <strong>{initialSearchQuery}</strong></span>
            <button
              onClick={() => {
                setSearchTerm('');
                if (onResetSearch) onResetSearch();
              }}
              className="ml-2 underline hover:text-blue-800 cursor-pointer"
            >
              Xem tất cả
            </button>
          </div>
        )}
      </div>

      {filteredCompanies.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
          <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">Không tìm thấy công ty phù hợp</h3>
          <p className="text-xs text-slate-500 mt-1">Vui lòng thử lại với từ khóa tìm kiếm khác.</p>
          <button
            onClick={() => {
              setSearchTerm('');
              if (onResetSearch) onResetSearch();
            }}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 transition-colors cursor-pointer"
          >
            Xem toàn bộ công ty
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCompanies.map((company) => {
            const isTarget = initialSearchQuery && company.name.toLowerCase().includes(initialSearchQuery.toLowerCase());
            const isFollowed = followedCompanyIds.includes(company.id);

            return (
              <div
                key={company.id}
                id={`company-card-${company.id}`}
                onClick={() => onSelectCompany && onSelectCompany(company)}
                className={`bg-white rounded-2xl border p-6 transition-all duration-200 flex flex-col justify-between cursor-pointer group ${
                  isTarget
                    ? 'border-[#0A58CA] ring-2 ring-blue-500/20 shadow-md'
                    : 'border-slate-200/80 hover:shadow-lg hover:border-blue-300'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-2xl border border-slate-200 bg-slate-50 p-2 flex items-center justify-center shrink-0 shadow-xs group-hover:border-blue-200 transition-colors">
                        <img
                          src={company.logo}
                          alt={company.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#0A58CA] transition-colors">
                            {company.name}
                          </h3>
                          {isTarget && (
                            <span className="px-2 py-0.5 bg-blue-100 text-[#0A58CA] text-[10px] font-bold rounded-full">
                              Nhà tuyển dụng liên hệ
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-indigo-600 font-semibold mt-0.5">
                          {company.industry}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      <div className="flex items-center space-x-1.5 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-xl text-xs font-bold text-amber-700">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span>{company.rating}</span>
                        <span className="text-amber-600 font-normal">({company.reviewsCount})</span>
                      </div>

                      <button
                        type="button"
                        id={`company-follow-heart-${company.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onToggleFollowCompany) {
                            onToggleFollowCompany(company.id);
                          }
                        }}
                        title={isFollowed ? 'Bỏ yêu thích công ty' : 'Yêu thích công ty'}
                        aria-label="Yêu thích công ty"
                        className={`p-2 rounded-xl border transition-all cursor-pointer ${
                          isFollowed
                            ? 'bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100'
                            : 'bg-slate-50/80 border-slate-200/80 text-slate-400 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200'
                        }`}
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            isFollowed ? 'fill-rose-600 text-rose-600' : ''
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-4">
                    <div className="flex items-center space-x-1.5 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{company.location}</span>
                    </div>
                    <div className="flex items-center space-x-1.5 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span>{company.employees}</span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 mt-3.5 line-clamp-2 leading-relaxed">
                    {company.description}
                  </p>

                  {/* Highlights */}
                  <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-wrap gap-2">
                    {company.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center space-x-1.5 text-xs bg-indigo-50/60 text-indigo-700 border border-indigo-100 px-2.5 py-1 rounded-lg font-medium"
                      >
                        <CheckCircle2 className="w-3 h-3 text-indigo-600" />
                        <span>{h}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                    {company.openJobsCount} vị trí đang tuyển
                  </span>

                  <button
                    id={`view-jobs-company-${company.id}`}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSelectCompany) {
                        onSelectCompany(company);
                      }
                    }}
                    className="inline-flex items-center space-x-1.5 text-xs font-semibold text-white bg-[#0A58CA] hover:bg-[#084298] px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer"
                  >
                    <span>Xem chi tiết</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Favorite / Followed Companies Section at bottom of page */}
      <FavoriteCompaniesSection
        allCompanies={companies}
        followedCompanyIds={followedCompanyIds}
        onToggleFollowCompany={onToggleFollowCompany}
        onSelectCompany={onSelectCompany}
        onExploreCompanies={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
};

