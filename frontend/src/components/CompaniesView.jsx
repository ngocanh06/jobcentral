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
} from 'lucide-react';

export const CompaniesView = ({
  companies,
  onSelectCompany,
  onExploreJobs,
  initialSearchQuery = '',
  onResetSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchQuery || '');
  const [selectedIndustry, setSelectedIndustry] = useState('all');

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
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesIndustry =
      selectedIndustry === 'all' ||
      (selectedIndustry === 'tech' && c.category === 'tech') ||
      (selectedIndustry === 'finance' && c.category === 'finance');

    return matchesSearch && matchesIndustry;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
          <Building2 className="w-3.5 h-3.5 text-indigo-600" />
          <span>Hệ sinh thái doanh nghiệp hàng đầu</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Danh Sách Công Ty Hàng Đầu
        </h1>
        <p className="mt-2 text-base text-slate-500">
          Khám phá môi trường làm việc lý tưởng, văn hóa doanh nghiệp và cơ hội nghề nghiệp tại các công ty công nghệ uy tín.
        </p>

        {/* Search Bar */}
        <div className="mt-6 relative max-w-lg mx-auto">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm kiếm công ty, địa điểm hoặc lĩnh vực..."
            className="w-full pl-12 pr-10 py-3 bg-white border border-slate-200 rounded-2xl text-sm text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm('');
                if (onResetSearch) onResetSearch();
              }}
              className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 p-0.5 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

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
            return (
              <div
                key={company.id}
                id={`company-card-${company.id}`}
                className={`bg-white rounded-2xl border p-6 transition-all duration-200 flex flex-col justify-between ${
                  isTarget
                    ? 'border-[#0A58CA] ring-2 ring-blue-500/20 shadow-md'
                    : 'border-slate-200/80 hover:shadow-md hover:border-indigo-300'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-2xl border border-slate-200 bg-slate-50 p-2 flex items-center justify-center shrink-0 shadow-xs">
                        <img
                          src={company.logo}
                          alt={company.name}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold text-slate-900 hover:text-indigo-600 transition-colors">
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

                    <div className="flex items-center space-x-1.5 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-xl text-xs font-bold text-amber-700 shrink-0">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{company.rating}</span>
                      <span className="text-amber-600 font-normal">({company.reviewsCount})</span>
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
                    onClick={() => {
                      if (onSelectCompany) {
                        onSelectCompany(company);
                      } else if (onExploreJobs) {
                        onExploreJobs();
                      }
                    }}
                    className="inline-flex items-center space-x-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-xl transition-all shadow-sm shadow-indigo-200 cursor-pointer"
                  >
                    <span>Xem việc làm</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
