import React from 'react';
import { MapPin, Banknote, Briefcase, RotateCcw, Sliders } from 'lucide-react';

export const FilterSidebar = ({
  filters,
  onFilterChange,
  onApply,
  onReset,
}) => {
  const toggleLocation = (loc) => {
    if (loc === 'all_hcm') {
      onFilterChange({
        ...filters,
        locations: filters.locations.includes('all_hcm') ? [] : ['all_hcm'],
      });
      return;
    }

    let updated = filters.locations.filter((l) => l !== 'all_hcm');
    if (updated.includes(loc)) {
      updated = updated.filter((l) => l !== loc);
    } else {
      updated.push(loc);
    }

    if (updated.length === 0) {
      updated = ['all_hcm'];
    }

    onFilterChange({
      ...filters,
      locations: updated,
    });
  };

  const setSalary = (val) => {
    onFilterChange({
      ...filters,
      salary: val,
    });
  };

  const toggleJobType = (type) => {
    const exists = filters.jobTypes.includes(type);
    const updated = exists
      ? filters.jobTypes.filter((t) => t !== type)
      : [...filters.jobTypes, type];
    onFilterChange({
      ...filters,
      jobTypes: updated,
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
      {/* Title & subtitle */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
            <Sliders className="w-4 h-4 text-indigo-600" />
            <span>Bộ lọc</span>
          </h2>
          <p className="text-[11px] font-semibold text-slate-400 mt-0.5 uppercase tracking-wider">
            Tùy chọn tìm kiếm
          </p>
        </div>
        <button
          id="filter-reset-btn"
          onClick={onReset}
          title="Đặt lại bộ lọc"
          className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center space-x-1 px-2 py-1 hover:bg-indigo-50 rounded-lg transition-colors font-medium cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Đặt lại</span>
        </button>
      </div>

      <div className="space-y-6 pt-4">
        {/* Section 1: Địa điểm */}
        <div>
          <div className="flex items-center space-x-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Địa điểm</span>
          </div>
          <div className="space-y-2.5 pl-0.5">
            <label className="flex items-center space-x-3 cursor-pointer select-none text-sm text-slate-700 hover:text-slate-900">
              <input
                id="filter-loc-all-hcm"
                type="checkbox"
                checked={filters.locations.includes('all_hcm')}
                onChange={() => toggleLocation('all_hcm')}
                className="w-4 h-4 rounded-md text-indigo-600 border-slate-300 focus:ring-indigo-500 cursor-pointer accent-indigo-600"
              />
              <span className={filters.locations.includes('all_hcm') ? 'font-semibold text-slate-900' : ''}>
                Tất cả TP. Hồ Chí Minh
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer select-none text-sm text-slate-700 hover:text-slate-900">
              <input
                id="filter-loc-q1"
                type="checkbox"
                checked={filters.locations.includes('q1')}
                onChange={() => toggleLocation('q1')}
                className="w-4 h-4 rounded-md text-indigo-600 border-slate-300 focus:ring-indigo-500 cursor-pointer accent-indigo-600"
              />
              <span className={filters.locations.includes('q1') ? 'font-semibold text-slate-900' : ''}>
                Quận 1
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer select-none text-sm text-slate-700 hover:text-slate-900">
              <input
                id="filter-loc-q7"
                type="checkbox"
                checked={filters.locations.includes('q7')}
                onChange={() => toggleLocation('q7')}
                className="w-4 h-4 rounded-md text-indigo-600 border-slate-300 focus:ring-indigo-500 cursor-pointer accent-indigo-600"
              />
              <span className={filters.locations.includes('q7') ? 'font-semibold text-slate-900' : ''}>
                Quận 7
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer select-none text-sm text-slate-700 hover:text-slate-900">
              <input
                id="filter-loc-tan-binh"
                type="checkbox"
                checked={filters.locations.includes('tan_binh')}
                onChange={() => toggleLocation('tan_binh')}
                className="w-4 h-4 rounded-md text-indigo-600 border-slate-300 focus:ring-indigo-500 cursor-pointer accent-indigo-600"
              />
              <span className={filters.locations.includes('tan_binh') ? 'font-semibold text-slate-900' : ''}>
                Tân Bình
              </span>
            </label>
          </div>
        </div>

        {/* Section 2: Mức lương */}
        <div className="pt-3 border-t border-slate-100">
          <div className="flex items-center space-x-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-3">
            <Banknote className="w-3.5 h-3.5" />
            <span>Mức lương</span>
          </div>
          <div className="space-y-2.5 pl-0.5">
            <label className="flex items-center space-x-3 cursor-pointer select-none text-sm text-slate-700 hover:text-slate-900">
              <input
                id="filter-salary-all"
                type="radio"
                name="salary_filter"
                checked={filters.salary === 'all'}
                onChange={() => setSalary('all')}
                className="w-4 h-4 text-indigo-600 border-slate-300 focus:ring-indigo-500 cursor-pointer accent-indigo-600"
              />
              <span className={filters.salary === 'all' ? 'font-semibold text-slate-900' : ''}>
                Tất cả mức lương
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer select-none text-sm text-slate-700 hover:text-slate-900">
              <input
                id="filter-salary-under10"
                type="radio"
                name="salary_filter"
                checked={filters.salary === 'under10'}
                onChange={() => setSalary('under10')}
                className="w-4 h-4 text-indigo-600 border-slate-300 focus:ring-indigo-500 cursor-pointer accent-indigo-600"
              />
              <span className={filters.salary === 'under10' ? 'font-semibold text-slate-900' : ''}>
                Dưới 10 triệu
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer select-none text-sm text-slate-700 hover:text-slate-900">
              <input
                id="filter-salary-10to20"
                type="radio"
                name="salary_filter"
                checked={filters.salary === '10to20'}
                onChange={() => setSalary('10to20')}
                className="w-4 h-4 text-indigo-600 border-slate-300 focus:ring-indigo-500 cursor-pointer accent-indigo-600"
              />
              <span className={filters.salary === '10to20' ? 'font-semibold text-slate-900' : ''}>
                10 - 20 triệu
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer select-none text-sm text-slate-700 hover:text-slate-900">
              <input
                id="filter-salary-above20"
                type="radio"
                name="salary_filter"
                checked={filters.salary === 'above20'}
                onChange={() => setSalary('above20')}
                className="w-4 h-4 text-indigo-600 border-slate-300 focus:ring-indigo-500 cursor-pointer accent-indigo-600"
              />
              <span className={filters.salary === 'above20' ? 'font-semibold text-slate-900' : ''}>
                Trên 20 triệu
              </span>
            </label>
          </div>
        </div>

        {/* Section 3: Loại hình */}
        <div className="pt-3 border-t border-slate-100">
          <div className="flex items-center space-x-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Loại hình</span>
          </div>
          <div className="space-y-2.5 pl-0.5">
            <label className="flex items-center space-x-3 cursor-pointer select-none text-sm text-slate-700 hover:text-slate-900">
              <input
                id="filter-type-fulltime"
                type="checkbox"
                checked={filters.jobTypes.includes('Full-time')}
                onChange={() => toggleJobType('Full-time')}
                className="w-4 h-4 rounded-md text-indigo-600 border-slate-300 focus:ring-indigo-500 cursor-pointer accent-indigo-600"
              />
              <span className={filters.jobTypes.includes('Full-time') ? 'font-semibold text-slate-900' : ''}>
                Full-time
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer select-none text-sm text-slate-700 hover:text-slate-900">
              <input
                id="filter-type-parttime"
                type="checkbox"
                checked={filters.jobTypes.includes('Part-time')}
                onChange={() => toggleJobType('Part-time')}
                className="w-4 h-4 rounded-md text-indigo-600 border-slate-300 focus:ring-indigo-500 cursor-pointer accent-indigo-600"
              />
              <span className={filters.jobTypes.includes('Part-time') ? 'font-semibold text-slate-900' : ''}>
                Part-time
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer select-none text-sm text-slate-700 hover:text-slate-900">
              <input
                id="filter-type-freelance"
                type="checkbox"
                checked={filters.jobTypes.includes('Freelance')}
                onChange={() => toggleJobType('Freelance')}
                className="w-4 h-4 rounded-md text-indigo-600 border-slate-300 focus:ring-indigo-500 cursor-pointer accent-indigo-600"
              />
              <span className={filters.jobTypes.includes('Freelance') ? 'font-semibold text-slate-900' : ''}>
                Freelance
              </span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer select-none text-sm text-slate-700 hover:text-slate-900">
              <input
                id="filter-type-remote"
                type="checkbox"
                checked={filters.jobTypes.includes('Remote')}
                onChange={() => toggleJobType('Remote')}
                className="w-4 h-4 rounded-md text-indigo-600 border-slate-300 focus:ring-indigo-500 cursor-pointer accent-indigo-600"
              />
              <span className={filters.jobTypes.includes('Remote') ? 'font-semibold text-slate-900' : ''}>
                Remote (Từ xa)
              </span>
            </label>
          </div>
        </div>

        {/* Apply filter button */}
        <div className="pt-3">
          <button
            id="apply-filter-btn"
            onClick={onApply}
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-medium text-sm rounded-xl shadow-sm shadow-indigo-200 transition-all flex items-center justify-center space-x-2 focus:outline-hidden cursor-pointer"
          >
            <span>Áp dụng bộ lọc</span>
          </button>
        </div>
      </div>
    </div>
  );
};
