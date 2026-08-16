import React from 'react';
import { Building2, Star, MapPin, Users, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export const CompaniesView = ({
  companies,
  onSelectCompany,
  onExploreJobs,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center max-w-2xl mx-auto mb-12">
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {companies.map((company) => (
          <div
            key={company.id}
            id={`company-card-${company.id}`}
            className="bg-white rounded-2xl border border-slate-200/80 p-6 hover:shadow-md hover:border-indigo-300 transition-all duration-200 flex flex-col justify-between"
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
                    <h3 className="text-lg font-bold text-slate-900 hover:text-indigo-600 transition-colors">
                      {company.name}
                    </h3>
                    <p className="text-xs text-indigo-600 font-semibold mt-0.5">
                      {company.industry}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-1.5 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-xl text-xs font-bold text-amber-700">
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
                onClick={onExploreJobs}
                className="inline-flex items-center space-x-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-xl transition-all shadow-sm shadow-indigo-200"
              >
                <span>Xem việc làm</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
