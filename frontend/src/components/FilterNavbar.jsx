import React, { useState, useRef, useEffect } from 'react';
import {
  MapPin,
  Banknote,
  Briefcase,
  RotateCcw,
  SlidersHorizontal,
  ChevronDown,
  Check,
  X,
} from 'lucide-react';

export const FilterNavbar = ({
  filters,
  onFilterChange,
  onApply,
  onReset,
  totalResults,
}) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const navRef = useRef(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  // Human-readable labels
  const getLocationLabel = () => {
    if (filters.locations.includes('all_hcm') || filters.locations.length === 0) {
      return 'Tất cả TP.HCM';
    }
    const names = filters.locations.map((loc) => {
      if (loc === 'q1') return 'Quận 1';
      if (loc === 'q7') return 'Quận 7';
      if (loc === 'tan_binh') return 'Tân Bình';
      return loc;
    });
    return names.join(', ');
  };

  const getSalaryLabel = () => {
    switch (filters.salary) {
      case 'under10':
        return 'Dưới 10 triệu';
      case '10to20':
        return '10 - 20 triệu';
      case 'above20':
        return 'Trên 20 triệu';
      default:
        return 'Tất cả mức lương';
    }
  };

  const activeFiltersCount =
    (filters.locations.length > 0 && !filters.locations.includes('all_hcm') ? 1 : 0) +
    (filters.salary !== 'all' ? 1 : 0) +
    (filters.jobTypes.length > 0 ? filters.jobTypes.length : 0);

  return (
    <div
      ref={navRef}
      id="top-filter-navbar"
      className="bg-white rounded-2xl border border-slate-200/80 shadow-xs mb-6 overflow-visible relative z-30"
    >
      {/* Primary Horizontal Filter Bar */}
      <div className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 sm:gap-4">
        {/* Left Side: Filter Title and Filter Selectors */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 flex-1">
          <div className="flex items-center space-x-2 mr-1 text-slate-900 font-bold text-sm shrink-0">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <span className="hidden sm:inline">Bộ lọc:</span>
          </div>

          {/* 1. Dropdown: Địa điểm */}
          <div className="relative">
            <button
              id="filter-nav-location-btn"
              type="button"
              onClick={() => setOpenDropdown(openDropdown === 'location' ? null : 'location')}
              className={`inline-flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium border transition-all cursor-pointer ${
                openDropdown === 'location' || (!filters.locations.includes('all_hcm') && filters.locations.length > 0)
                  ? 'border-indigo-600 bg-indigo-50/80 text-indigo-700 font-semibold shadow-xs'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-indigo-600" />
              <span className="max-w-[120px] sm:max-w-[160px] truncate">{getLocationLabel()}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === 'location' ? 'rotate-180 text-indigo-600' : 'text-slate-400'}`} />
            </button>

            {/* Location Dropdown Menu */}
            {openDropdown === 'location' && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 animate-fadeIn space-y-1.5">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                  Chọn khu vực TP.HCM
                </div>

                <label className="flex items-center justify-between px-2.5 py-2 hover:bg-slate-50 rounded-xl cursor-pointer text-xs font-medium text-slate-700">
                  <div className="flex items-center space-x-2.5">
                    <input
                      type="checkbox"
                      id="filter-nav-loc-all"
                      checked={filters.locations.includes('all_hcm')}
                      onChange={() => toggleLocation('all_hcm')}
                      className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 accent-indigo-600"
                    />
                    <span>Tất cả TP. Hồ Chí Minh</span>
                  </div>
                  {filters.locations.includes('all_hcm') && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                </label>

                <label className="flex items-center justify-between px-2.5 py-2 hover:bg-slate-50 rounded-xl cursor-pointer text-xs font-medium text-slate-700">
                  <div className="flex items-center space-x-2.5">
                    <input
                      type="checkbox"
                      id="filter-nav-loc-q1"
                      checked={filters.locations.includes('q1')}
                      onChange={() => toggleLocation('q1')}
                      className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 accent-indigo-600"
                    />
                    <span>Quận 1 (Trung tâm)</span>
                  </div>
                  {filters.locations.includes('q1') && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                </label>

                <label className="flex items-center justify-between px-2.5 py-2 hover:bg-slate-50 rounded-xl cursor-pointer text-xs font-medium text-slate-700">
                  <div className="flex items-center space-x-2.5">
                    <input
                      type="checkbox"
                      id="filter-nav-loc-q7"
                      checked={filters.locations.includes('q7')}
                      onChange={() => toggleLocation('q7')}
                      className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 accent-indigo-600"
                    />
                    <span>Quận 7 (Khu đô thị mới)</span>
                  </div>
                  {filters.locations.includes('q7') && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                </label>

                <label className="flex items-center justify-between px-2.5 py-2 hover:bg-slate-50 rounded-xl cursor-pointer text-xs font-medium text-slate-700">
                  <div className="flex items-center space-x-2.5">
                    <input
                      type="checkbox"
                      id="filter-nav-loc-tanbinh"
                      checked={filters.locations.includes('tan_binh')}
                      onChange={() => toggleLocation('tan_binh')}
                      className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 accent-indigo-600"
                    />
                    <span>Tân Bình (Gần sân bay)</span>
                  </div>
                  {filters.locations.includes('tan_binh') && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                </label>
              </div>
            )}
          </div>

          {/* 2. Dropdown: Mức lương */}
          <div className="relative">
            <button
              id="filter-nav-salary-btn"
              type="button"
              onClick={() => setOpenDropdown(openDropdown === 'salary' ? null : 'salary')}
              className={`inline-flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium border transition-all cursor-pointer ${
                openDropdown === 'salary' || filters.salary !== 'all'
                  ? 'border-indigo-600 bg-indigo-50/80 text-indigo-700 font-semibold shadow-xs'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Banknote className="w-3.5 h-3.5 text-indigo-600" />
              <span className="max-w-[120px] sm:max-w-[160px] truncate">{getSalaryLabel()}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === 'salary' ? 'rotate-180 text-indigo-600' : 'text-slate-400'}`} />
            </button>

            {/* Salary Dropdown Menu */}
            {openDropdown === 'salary' && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 p-2.5 z-50 animate-fadeIn space-y-1">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                  Mức lương mong muốn
                </div>

                {[
                  { id: 'all', label: 'Tất cả mức lương' },
                  { id: 'under10', label: 'Dưới 10 triệu' },
                  { id: '10to20', label: '10 - 20 triệu' },
                  { id: 'above20', label: 'Trên 20 triệu' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setSalary(item.id);
                      setOpenDropdown(null);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-left transition-colors cursor-pointer ${
                      filters.salary === item.id
                        ? 'bg-indigo-50 text-indigo-700 font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{item.label}</span>
                    {filters.salary === item.id && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 3. Dropdown: Loại hình làm việc */}
          <div className="relative">
            <button
              id="filter-nav-jobtype-btn"
              type="button"
              onClick={() => setOpenDropdown(openDropdown === 'type' ? null : 'type')}
              className={`inline-flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium border transition-all cursor-pointer ${
                openDropdown === 'type' || filters.jobTypes.length > 0
                  ? 'border-indigo-600 bg-indigo-50/80 text-indigo-700 font-semibold shadow-xs'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
              <span>
                {filters.jobTypes.length > 0
                  ? `${filters.jobTypes.length} hình thức`
                  : 'Loại hình'}
              </span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openDropdown === 'type' ? 'rotate-180 text-indigo-600' : 'text-slate-400'}`} />
            </button>

            {/* Job Types Dropdown Menu */}
            {openDropdown === 'type' && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 animate-fadeIn space-y-1.5">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                  Hình thức làm việc
                </div>

                {['Full-time', 'Part-time', 'Freelance', 'Remote'].map((type) => (
                  <label
                    key={type}
                    className="flex items-center justify-between px-2.5 py-2 hover:bg-slate-50 rounded-xl cursor-pointer text-xs font-medium text-slate-700"
                  >
                    <div className="flex items-center space-x-2.5">
                      <input
                        type="checkbox"
                        checked={filters.jobTypes.includes(type)}
                        onChange={() => toggleJobType(type)}
                        className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 accent-indigo-600"
                      />
                      <span>{type}</span>
                    </div>
                    {filters.jobTypes.includes(type) && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Actions (Apply, Reset, Toggle All) */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          {activeFiltersCount > 0 && (
            <button
              id="filter-nav-reset-btn"
              type="button"
              onClick={onReset}
              className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Đặt lại</span>
            </button>
          )}

          <button
            id="filter-nav-apply-btn"
            type="button"
            onClick={() => {
              setOpenDropdown(null);
              onApply();
            }}
            className="inline-flex items-center space-x-1.5 px-4 sm:px-5 py-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-lg text-xs sm:text-sm font-semibold shadow-sm shadow-indigo-200 transition-all cursor-pointer"
          >
            <span>Áp dụng</span>
            {activeFiltersCount > 0 && (
              <span className="w-4.5 h-4.5 rounded-full bg-white/20 text-white text-[10px] flex items-center justify-center font-bold">
                {activeFiltersCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Active Filter Tags Pill Bar (if any non-default filter selected) */}
      {(!filters.locations.includes('all_hcm') || filters.salary !== 'all' || filters.jobTypes.length > 0) && (
        <div className="px-5 py-2.5 bg-slate-50/80 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-semibold uppercase text-[10px] tracking-wider mr-1">
            Đang chọn:
          </span>

          {!filters.locations.includes('all_hcm') &&
            filters.locations.map((loc) => (
              <span
                key={loc}
                className="inline-flex items-center space-x-1 bg-white border border-indigo-200 text-indigo-700 px-2.5 py-1 rounded-lg font-medium shadow-2xs"
              >
                <span>{loc === 'q1' ? 'Quận 1' : loc === 'q7' ? 'Quận 7' : loc === 'tan_binh' ? 'Tân Bình' : loc}</span>
                <button
                  onClick={() => toggleLocation(loc)}
                  className="hover:text-indigo-900 ml-1 text-indigo-400 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

          {filters.salary !== 'all' && (
            <span className="inline-flex items-center space-x-1 bg-white border border-emerald-200 text-emerald-700 px-2.5 py-1 rounded-lg font-medium shadow-2xs">
              <span>{getSalaryLabel()}</span>
              <button
                onClick={() => setSalary('all')}
                className="hover:text-emerald-900 ml-1 text-emerald-400 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.jobTypes.map((type) => (
            <span
              key={type}
              className="inline-flex items-center space-x-1 bg-white border border-slate-200 text-slate-700 px-2.5 py-1 rounded-lg font-medium shadow-2xs"
            >
              <span>{type}</span>
              <button
                onClick={() => toggleJobType(type)}
                className="hover:text-slate-900 ml-1 text-slate-400 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

          <button
            onClick={onReset}
            className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold ml-auto underline cursor-pointer"
          >
            Xóa hết
          </button>
        </div>
      )}
    </div>
  );
};
