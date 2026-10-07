import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Search,
  SlidersHorizontal,
  MapPin,
  Banknote,
  Briefcase,
  GraduationCap,
  Clock,
  Building2,
  Bookmark,
  Share2,
  CheckCircle2,
  Sparkles,
  ArrowUpDown,
  RotateCcw,
  ChevronRight,
  ChevronDown,
  Send,
  ExternalLink,
  Award,
  Check,
  X,
  Filter,
} from 'lucide-react';

export const JobSearchView = ({
  jobs = [],
  currentUser = null,
  onToggleSave,
  onApply,
  onViewDetails,
  onShare,
  onOpenAuth,
  onOpenProfileDrawer,
  onNavigateHome,
}) => {
  // Search & Filter States (Left Sidebar)
  const [keyword, setKeyword] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedSalaryRange, setSelectedSalaryRange] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [selectedJobType, setSelectedJobType] = useState('');
  const [isFeaturedOnly, setIsFeaturedOnly] = useState(false);
  const [isUrgentOnly, setIsUrgentOnly] = useState(false);
  const [sortBy, setSortBy] = useState('newest'); // newest, salaryHigh, featured

  // Quick Pill Filter States (Header)
  const [postedDateFilter, setPostedDateFilter] = useState('all'); // all, 24h, 1w, 1m
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);
  const [isEasyApply, setIsEasyApply] = useState(false);
  const [isUnder10Applicants, setIsUnder10Applicants] = useState(false);

  // Selected job for master-detail in the middle area
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);
  const [showMobileFilterModal, setShowMobileFilterModal] = useState(false);
  const [isDetailHeaderCollapsed, setIsDetailHeaderCollapsed] = useState(false);
  const [openFilterDropdown, setOpenFilterDropdown] = useState(null);
  const [isListTransitioning, setIsListTransitioning] = useState(false);
  const sidebarScrollRef = useRef(null);
  const jobListScrollRef = useRef(null);
  const detailScrollRef = useRef(null);

  // Smooth eased scroll helper for internal scroll containers
  const smoothScrollContainer = (el, targetTop = 0, duration = 420) => {
    if (!el) return;
    const startTop = el.scrollTop;
    const distance = targetTop - startTop;
    if (Math.abs(distance) < 8) {
      el.scrollTop = targetTop;
      return;
    }

    let startTime = null;
    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      el.scrollTop = startTop + distance * easeOutQuart(progress);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  };

  // Gently scroll job list to top and animate list when filter criteria change
  useEffect(() => {
    setIsListTransitioning(true);
    if (jobListScrollRef.current) {
      smoothScrollContainer(jobListScrollRef.current, 0, 420);
    }
    const timer = setTimeout(() => {
      setIsListTransitioning(false);
    }, 220);
    return () => clearTimeout(timer);
  }, [
    selectedIndustry,
    selectedCity,
    selectedSalaryRange,
    selectedExperience,
    selectedJobType,
    isFeaturedOnly,
    isUrgentOnly,
    postedDateFilter,
    isEasyApply,
    isUnder10Applicants,
    sortBy,
  ]);

  // Filter options constants
  const industryList = [
    'Tất cả ngành nghề',
    'Công nghệ thông tin / Phần mềm',
    'Marketing / Truyền thông / PR',
    'Tài chính / Kế toán / Ngân hàng',
    'Thiết kế UI / UX / Đồ họa',
    'Dữ liệu & Trí tuệ nhân tạo (AI)',
    'Kinh doanh / Bán hàng (Sales)',
    'Nhân sự / Tuyển dụng (HR)',
    'Quản lý dự án (Product / Project)',
    'Y tế / Dược phẩm',
    'Giáo dục / Đào tạo',
    'Bất động sản / Xây dựng',
    'Logistics / Chuỗi cung ứng',
  ];

  const cityList = [
    'Tất cả địa điểm',
    'TP. Hồ Chí Minh',
    'Hà Nội',
    'Đà Nẵng',
    'Cần Thơ',
    'Hải Phòng',
    'Bình Dương',
    'Làm việc từ xa (Remote)',
  ];

  const salaryOptions = [
    { value: '', label: 'Tất cả mức lương' },
    { value: 'under15', label: 'Dưới 15 triệu' },
    { value: '15to25', label: '15 - 25 triệu' },
    { value: '25to40', label: '25 - 40 triệu' },
    { value: 'above40', label: 'Trên 40 triệu' },
    { value: 'negotiable', label: 'Thỏa thuận / Cạnh tranh' },
  ];

  const experienceOptions = [
    { value: '', label: 'Tất cả kinh nghiệm' },
    { value: 'intern', label: 'Chưa có / Thực tập (Intern)' },
    { value: 'fresher', label: 'Dưới 1 năm (Fresher / Junior)' },
    { value: 'mid', label: '1 - 3 năm (Middle)' },
    { value: 'senior', label: '3 - 5 năm (Senior)' },
    { value: 'lead', label: 'Trên 5 năm (Lead / Manager)' },
  ];

  const jobTypeOptions = [
    { value: '', label: 'Tất cả hình thức' },
    { value: 'Full-time', label: 'Toàn thời gian (Full-time)' },
    { value: 'Part-time', label: 'Bán thời gian (Part-time)' },
    { value: 'Remote', label: 'Từ xa (Remote / Hybrid)' },
    { value: 'Freelance', label: 'Freelance / Dự án' },
    { value: 'Internship', label: 'Thực tập sinh' },
  ];

  // Filtered and sorted jobs list
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // 1. Keyword
      if (keyword.trim()) {
        const kw = keyword.toLowerCase();
        const matchKw =
          job.title?.toLowerCase().includes(kw) ||
          job.company?.toLowerCase().includes(kw) ||
          job.requirementsSummary?.toLowerCase().includes(kw) ||
          job.category?.toLowerCase().includes(kw) ||
          job.industry?.toLowerCase().includes(kw);
        if (!matchKw) return false;
      }

      // 2. Industry
      if (selectedIndustry && selectedIndustry !== 'Tất cả ngành nghề') {
        const ind = selectedIndustry.toLowerCase();
        const matchInd =
          job.industry?.toLowerCase().includes(ind) ||
          job.category?.toLowerCase().includes(ind) ||
          (selectedIndustry.includes('Công nghệ') &&
            (job.category === 'Công nghệ' || job.category === 'AI & ML'));
        if (!matchInd) return false;
      }

      // 3. Location / City
      if (selectedCity && selectedCity !== 'Tất cả địa điểm') {
        if (selectedCity.includes('Remote')) {
          const isRemote =
            job.jobType?.toLowerCase().includes('remote') ||
            job.location?.toLowerCase().includes('remote') ||
            job.description?.toLowerCase().includes('remote');
          if (!isRemote) return false;
        } else {
          const cityKw = selectedCity.toLowerCase();
          const matchCity =
            job.city?.toLowerCase().includes(cityKw) ||
            job.location?.toLowerCase().includes(cityKw);
          if (!matchCity) return false;
        }
      }

      // 4. Salary Range
      if (selectedSalaryRange) {
        if (selectedSalaryRange === 'under15') {
          if (!job.salary?.includes('10') && !job.salary?.includes('12') && !job.salary?.includes('Dưới 15')) {
            return false;
          }
        } else if (selectedSalaryRange === '15to25') {
          if (!job.salary?.includes('15') && !job.salary?.includes('20') && !job.salary?.includes('25')) {
            return false;
          }
        } else if (selectedSalaryRange === '25to40') {
          if (!job.salary?.includes('25') && !job.salary?.includes('30') && !job.salary?.includes('35') && !job.salary?.includes('40')) {
            return false;
          }
        } else if (selectedSalaryRange === 'above40') {
          if (!job.salary?.includes('40') && !job.salary?.includes('50') && !job.salary?.includes('60') && !job.salary?.includes('80')) {
            return false;
          }
        } else if (selectedSalaryRange === 'negotiable') {
          if (!job.salary?.toLowerCase().includes('thỏa thuận') && !job.salary?.toLowerCase().includes('cạnh tranh')) {
            return false;
          }
        }
      }

      // 5. Experience
      if (selectedExperience) {
        if (selectedExperience === 'intern' && !job.isIntern && !job.experience?.includes('intern')) {
          return false;
        }
        if (selectedExperience === 'fresher' && job.experience !== 'fresher' && !job.requirementsSummary?.toLowerCase().includes('fresher')) {
          return false;
        }
        if (selectedExperience === 'senior' && job.experience !== 'senior' && !job.title?.toLowerCase().includes('senior')) {
          return false;
        }
      }

      // 6. Job Type
      if (selectedJobType) {
        if (!job.jobType?.toLowerCase().includes(selectedJobType.toLowerCase())) {
          return false;
        }
      }

      // 7. Advanced Toggles
      if (isFeaturedOnly && !job.isFeatured) return false;
      if (isUrgentOnly && !job.isUrgent) return false;

      // 8. Quick Pill: Ngày đăng
      if (postedDateFilter === '24h') {
        const time = job.postedTime?.toLowerCase() || '';
        const is24h = time.includes('giờ') || time.includes('phút') || time.includes('vừa') || time.includes('hôm nay');
        if (!is24h) return false;
      } else if (postedDateFilter === '1w') {
        const time = job.postedTime?.toLowerCase() || '';
        const isOlder = time.includes('tháng') || (time.includes('tuần') && !time.includes('1 tuần'));
        if (isOlder) return false;
      } else if (postedDateFilter === '1m') {
        const time = job.postedTime?.toLowerCase() || '';
        if (time.includes('tháng') && !time.includes('1 tháng')) return false;
      }

      // 9. Quick Pill: Ứng tuyển nhanh
      if (isEasyApply && !job.isFeatured && !job.isUrgent) {
        return false;
      }

      // 10. Quick Pill: Dưới 10 ứng viên
      if (isUnder10Applicants && job.isFeatured && job.isUrgent) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'featured') {
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      }
      if (sortBy === 'salaryHigh') {
        const getSalaryNum = (str) => {
          const match = str?.match(/\d+/);
          return match ? parseInt(match[0], 10) : 0;
        };
        return getSalaryNum(b.salary) - getSalaryNum(a.salary);
      }
      return 0; // Default newest
    });
  }, [
    jobs,
    keyword,
    selectedIndustry,
    selectedCity,
    selectedSalaryRange,
    selectedExperience,
    selectedJobType,
    isFeaturedOnly,
    isUrgentOnly,
    postedDateFilter,
    isEasyApply,
    isUnder10Applicants,
    sortBy,
  ]);

  // Set default selected job
  useEffect(() => {
    if (filteredJobs.length > 0) {
      if (!selectedJobId || !filteredJobs.some((j) => j.id === selectedJobId)) {
        setSelectedJobId(filteredJobs[0].id);
      }
    } else {
      setSelectedJobId(null);
    }
  }, [filteredJobs, selectedJobId]);

  // Selected job object for the detail panel
  const activeJob = useMemo(() => {
    return jobs.find((j) => j.id === selectedJobId) || filteredJobs[0] || null;
  }, [jobs, selectedJobId, filteredJobs]);

  // Smoothly reset detail scroll and collapsed header when switching jobs
  useEffect(() => {
    setIsDetailHeaderCollapsed(false);
    if (detailScrollRef.current) {
      smoothScrollContainer(detailScrollRef.current, 0, 380);
    }
  }, [activeJob?.id]);

  const dateFilterLabel = useMemo(() => {
    switch (postedDateFilter) {
      case '24h':
        return '24 giờ qua';
      case '1w':
        return '1 tuần qua';
      case '1m':
        return '1 tháng qua';
      default:
        return 'Ngày đăng';
    }
  }, [postedDateFilter]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (keyword) count++;
    if (selectedIndustry && selectedIndustry !== 'Tất cả ngành nghề') count++;
    if (selectedCity && selectedCity !== 'Tất cả địa điểm') count++;
    if (selectedSalaryRange) count++;
    if (selectedExperience) count++;
    if (selectedJobType) count++;
    if (isFeaturedOnly) count++;
    if (isUrgentOnly) count++;
    if (postedDateFilter !== 'all') count++;
    if (isEasyApply) count++;
    if (isUnder10Applicants) count++;
    return count;
  }, [
    keyword,
    selectedIndustry,
    selectedCity,
    selectedSalaryRange,
    selectedExperience,
    selectedJobType,
    isFeaturedOnly,
    isUrgentOnly,
    postedDateFilter,
    isEasyApply,
    isUnder10Applicants,
  ]);

  const handleResetFilters = () => {
    setKeyword('');
    setSelectedIndustry('');
    setSelectedCity('');
    setSelectedSalaryRange('');
    setSelectedExperience('');
    setSelectedJobType('');
    setIsFeaturedOnly(false);
    setIsUrgentOnly(false);
    setSortBy('newest');
    setPostedDateFilter('all');
    setIsEasyApply(false);
    setIsUnder10Applicants(false);
    setOpenFilterDropdown(null);
    smoothScrollContainer(sidebarScrollRef.current, 0, 420);
    smoothScrollContainer(jobListScrollRef.current, 0, 420);
  };

  return (
    <div className="w-full bg-[#f4f2ee] text-slate-800 flex flex-col flex-1 h-full min-h-0 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3.5 pb-1 shrink-0 z-20">
        {/* Top Filter Card (Separated from main navbar, aligned with max-w-7xl) */}
        <div className="bg-white border border-slate-200/90 rounded-xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-2.5 shadow-2xs">
          {/* Left: Quick Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-0.5">
            {/* Pill 1: Ngày đăng ▼ */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setDateDropdownOpen(!dateDropdownOpen)}
                className="inline-flex items-center space-x-1 px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#e5e7eb] hover:bg-[#dce0e5] text-slate-900 border border-slate-400/90 transition-colors cursor-pointer select-none"
              >
                <span>{dateFilterLabel}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-800 transition-transform ${dateDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {dateDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setDateDropdownOpen(false)}
                  />
                  <div className="absolute left-0 mt-1 w-44 bg-white rounded-xl shadow-lg border border-slate-200 p-1.5 z-30 text-xs space-y-0.5 animate-fadeIn">
                    {[
                      { value: 'all', label: 'Tất cả thời gian' },
                      { value: '24h', label: '24 giờ qua' },
                      { value: '1w', label: '1 tuần qua' },
                      { value: '1m', label: '1 tháng qua' },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => {
                          setPostedDateFilter(opt.value);
                          setDateDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl transition-colors cursor-pointer flex items-center justify-between ${
                          postedDateFilter === opt.value
                            ? 'bg-slate-100 hover:bg-slate-200/80 text-slate-950 font-bold'
                            : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 font-medium'
                        }`}
                      >
                        <span>{opt.label}</span>
                        {postedDateFilter === opt.value && <Check className="w-3.5 h-3.5 text-slate-950 shrink-0" />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Pill 2: Ứng tuyển nhanh */}
            <button
              type="button"
              onClick={() => setIsEasyApply(!isEasyApply)}
              className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer select-none border ${
                isEasyApply
                  ? 'bg-slate-900 text-white border-slate-900 font-semibold shadow-xs'
                  : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300'
              }`}
            >
              Ứng tuyển nhanh
            </button>

            {/* Pill 3: Dưới 10 ứng viên */}
            <button
              type="button"
              onClick={() => setIsUnder10Applicants(!isUnder10Applicants)}
              className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer select-none border ${
                isUnder10Applicants
                  ? 'bg-slate-900 text-white border-slate-900 font-semibold shadow-xs'
                  : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-300'
              }`}
            >
              Dưới 10 ứng viên
            </button>
          </div>

          {/* Right: Quick Sort & Mobile Filter Toggle */}
          <div className="flex items-center space-x-3 ml-auto">
            <div className="flex items-center space-x-2 text-xs relative">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 shrink-0 hidden sm:block" />
              <span className="text-slate-500 hidden sm:inline">Sắp xếp:</span>
              <div className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setOpenFilterDropdown(openFilterDropdown === 'sort' ? null : 'sort')
                  }
                  className="bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full px-3.5 py-1.5 text-xs font-semibold text-slate-700 focus:outline-hidden focus:border-slate-900 cursor-pointer inline-flex items-center space-x-1.5 transition-colors"
                >
                  <span>
                    {sortBy === 'salaryHigh'
                      ? 'Lương cao nhất'
                      : sortBy === 'featured'
                      ? 'Việc làm nổi bật'
                      : 'Mới nhất'}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-150 ${
                      openFilterDropdown === 'sort' ? 'rotate-180 text-slate-900' : ''
                    }`}
                  />
                </button>

                {openFilterDropdown === 'sort' && (
                  <>
                    <div
                      className="fixed inset-0 z-20"
                      onClick={() => setOpenFilterDropdown(null)}
                    />
                    <div className="absolute right-0 mt-1.5 w-44 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-1.5 z-30 text-xs space-y-0.5 animate-fadeIn">
                      {[
                        { value: 'newest', label: 'Mới nhất' },
                        { value: 'salaryHigh', label: 'Lương cao nhất' },
                        { value: 'featured', label: 'Việc làm nổi bật' },
                      ].map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => {
                            setSortBy(opt.value);
                            setOpenFilterDropdown(null);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl transition-colors cursor-pointer flex items-center justify-between ${
                            sortBy === opt.value
                              ? 'bg-slate-100 hover:bg-slate-200/80 text-slate-950 font-bold'
                              : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 font-medium'
                          }`}
                        >
                          <span>{opt.label}</span>
                          {sortBy === opt.value && (
                            <Check className="w-3.5 h-3.5 text-slate-950 shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Filter Toggle Button */}
            <button
              type="button"
              onClick={() => setShowMobileFilterModal(true)}
              className="lg:hidden inline-flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 text-slate-800 border border-slate-200 rounded-full text-xs font-bold hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Bộ lọc</span>
              {activeFilterCount > 0 && (
                <span className="w-4 h-4 bg-slate-900 text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main 3-Zone Partitioned Body: Các vùng riêng biệt bo sơ sơ (rounded-xl) như LinkedIn, ẩn toàn bộ thanh cuộn */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 flex min-h-0 py-2.5 pb-4 gap-3.5 xl:gap-4 overflow-hidden">
        
        {/* ========================================================================= */}
        {/* 1. VÙNG TRÁI: BỘ LỌC CƠ BẢN ĐẾN NÂNG CAO (Card riêng biệt bo sơ sơ)         */}
        {/* ========================================================================= */}
        <aside className="hidden lg:flex flex-col w-72 xl:w-80 shrink-0 bg-white rounded-xl border border-slate-200/90 shadow-2xs overflow-hidden">
          <div className="p-3.5 px-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10 shrink-0">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-900 flex items-center justify-center">
                <SlidersHorizontal className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Bộ Lọc Tìm Kiếm</h3>
            </div>

            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center space-x-1 text-xs text-rose-600 hover:text-rose-700 font-semibold px-2 py-0.5 rounded-full hover:bg-rose-50 transition-colors cursor-pointer"
                title="Xóa tất cả bộ lọc"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Đặt lại</span>
              </button>
            )}
          </div>

          <div
            ref={sidebarScrollRef}
            className="p-4 pb-16 space-y-4 overflow-y-auto no-scrollbar smooth-scroll-container flex-1"
          >
            {/* Lọc cơ bản 1: Từ khóa */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                Từ khóa / Vị trí / Kỹ năng
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="VD: ReactJS, UI/UX, Sales..."
                  className="w-full bg-slate-50/90 hover:bg-slate-100/70 border border-slate-200 rounded-full px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-slate-900 focus:bg-white transition-all"
                />
                {keyword && (
                  <button
                    type="button"
                    onClick={() => setKeyword('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Lọc cơ bản 2: Ngành nghề */}
            <div className="space-y-1.5 relative">
              <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                Ngành nghề
              </label>
              <button
                type="button"
                onClick={(e) => {
                  const next = openFilterDropdown === 'industry' ? null : 'industry';
                  setOpenFilterDropdown(next);
                  if (next) {
                    const parentEl = e.currentTarget.parentElement;
                    setTimeout(() => {
                      parentEl?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }, 60);
                  }
                }}
                className={`w-full border rounded-full px-3.5 py-2 text-xs flex items-center justify-between transition-all cursor-pointer text-left ${
                  selectedIndustry || openFilterDropdown === 'industry'
                    ? 'bg-white border-slate-900 text-slate-900 font-semibold shadow-2xs'
                    : 'bg-slate-50/90 hover:bg-slate-100/80 border-slate-200 text-slate-700 font-medium'
                }`}
              >
                <span className="truncate pr-2">
                  {selectedIndustry || 'Tất cả ngành nghề'}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-500 shrink-0 transition-transform duration-200 ${
                    openFilterDropdown === 'industry' ? 'rotate-180 text-slate-900' : ''
                  }`}
                />
              </button>

              {openFilterDropdown === 'industry' && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setOpenFilterDropdown(null)}
                  />
                  <div className="absolute left-0 right-0 mt-1.5 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-1.5 z-30 max-h-56 overflow-y-auto no-scrollbar space-y-0.5 animate-fadeIn">
                    {industryList.map((ind) => {
                      const val = ind === 'Tất cả ngành nghề' ? '' : ind;
                      const isSelected = selectedIndustry === val;
                      return (
                        <button
                          key={ind}
                          type="button"
                          onClick={() => {
                            setSelectedIndustry(val);
                            setOpenFilterDropdown(null);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'bg-slate-100 hover:bg-slate-200/80 text-slate-950 font-bold'
                              : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 font-medium'
                          }`}
                        >
                          <span className="truncate pr-2">{ind}</span>
                          {isSelected && (
                            <Check className="w-3.5 h-3.5 text-slate-950 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {/* Lọc cơ bản 3: Địa điểm */}
            <div className="space-y-1.5 relative">
              <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                Địa điểm
              </label>
              <button
                type="button"
                onClick={(e) => {
                  const next = openFilterDropdown === 'city' ? null : 'city';
                  setOpenFilterDropdown(next);
                  if (next) {
                    const parentEl = e.currentTarget.parentElement;
                    setTimeout(() => {
                      parentEl?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    }, 60);
                  }
                }}
                className={`w-full border rounded-full px-3.5 py-2 text-xs flex items-center justify-between transition-all cursor-pointer text-left ${
                  selectedCity || openFilterDropdown === 'city'
                    ? 'bg-white border-slate-900 text-slate-900 font-semibold shadow-2xs'
                    : 'bg-slate-50/90 hover:bg-slate-100/80 border-slate-200 text-slate-700 font-medium'
                }`}
              >
                <span className="truncate pr-2">
                  {selectedCity || 'Tất cả địa điểm'}
                </span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-slate-500 shrink-0 transition-transform duration-200 ${
                    openFilterDropdown === 'city' ? 'rotate-180 text-slate-900' : ''
                  }`}
                />
              </button>

              {openFilterDropdown === 'city' && (
                <>
                  <div
                    className="fixed inset-0 z-20"
                    onClick={() => setOpenFilterDropdown(null)}
                  />
                  <div className="absolute left-0 right-0 mt-1.5 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-1.5 z-30 max-h-56 overflow-y-auto no-scrollbar space-y-0.5 animate-fadeIn">
                    {cityList.map((city) => {
                      const val = city === 'Tất cả địa điểm' ? '' : city;
                      const isSelected = selectedCity === val;
                      return (
                        <button
                          key={city}
                          type="button"
                          onClick={() => {
                            setSelectedCity(val);
                            setOpenFilterDropdown(null);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'bg-slate-100 hover:bg-slate-200/80 text-slate-950 font-bold'
                              : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 font-medium'
                          }`}
                        >
                          <span className="truncate pr-2">{city}</span>
                          {isSelected && (
                            <Check className="w-3.5 h-3.5 text-slate-950 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            {/* PHẦN LỌC NÂNG CAO */}
            <div className="pt-3 border-t border-slate-100 space-y-4">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Bộ Lọc Nâng Cao
              </div>

              {/* Lọc nâng cao 4: Mức lương */}
              <div className="space-y-1.5 relative">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                  Mức lương
                </label>
                <button
                  type="button"
                  onClick={(e) => {
                    const next = openFilterDropdown === 'salary' ? null : 'salary';
                    setOpenFilterDropdown(next);
                    if (next) {
                      const parentEl = e.currentTarget.parentElement;
                      setTimeout(() => {
                        parentEl?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                      }, 60);
                    }
                  }}
                  className={`w-full border rounded-full px-3.5 py-2 text-xs flex items-center justify-between transition-all cursor-pointer text-left ${
                    selectedSalaryRange || openFilterDropdown === 'salary'
                      ? 'bg-white border-slate-900 text-slate-900 font-semibold shadow-2xs'
                      : 'bg-slate-50/90 hover:bg-slate-100/80 border-slate-200 text-slate-700 font-medium'
                  }`}
                >
                  <span className="truncate pr-2">
                    {salaryOptions.find((o) => o.value === selectedSalaryRange)?.label ||
                      'Tất cả mức lương'}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-500 shrink-0 transition-transform duration-200 ${
                      openFilterDropdown === 'salary' ? 'rotate-180 text-slate-900' : ''
                    }`}
                  />
                </button>

                {openFilterDropdown === 'salary' && (
                  <>
                    <div
                      className="fixed inset-0 z-20"
                      onClick={() => setOpenFilterDropdown(null)}
                    />
                    <div className="absolute left-0 right-0 mt-1.5 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-1.5 z-30 max-h-56 overflow-y-auto no-scrollbar space-y-0.5 animate-fadeIn">
                      {salaryOptions.map((opt) => {
                        const isSelected = selectedSalaryRange === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => {
                              setSelectedSalaryRange(opt.value);
                              setOpenFilterDropdown(null);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-between ${
                              isSelected
                                ? 'bg-slate-100 hover:bg-slate-200/80 text-slate-950 font-bold'
                                : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 font-medium'
                            }`}
                          >
                            <span className="truncate pr-2">{opt.label}</span>
                            {isSelected && (
                              <Check className="w-3.5 h-3.5 text-slate-950 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>

              {/* Lọc nâng cao 5: Kinh nghiệm */}
              <div className="space-y-1.5 relative">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                  Kinh nghiệm
                </label>
                <button
                  type="button"
                  onClick={(e) => {
                    const next = openFilterDropdown === 'experience' ? null : 'experience';
                    setOpenFilterDropdown(next);
                    if (next) {
                      const parentEl = e.currentTarget.parentElement;
                      setTimeout(() => {
                        parentEl?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                      }, 60);
                    }
                  }}
                  className={`w-full border rounded-full px-3.5 py-2 text-xs flex items-center justify-between transition-all cursor-pointer text-left ${
                    selectedExperience || openFilterDropdown === 'experience'
                      ? 'bg-white border-slate-900 text-slate-900 font-semibold shadow-2xs'
                      : 'bg-slate-50/90 hover:bg-slate-100/80 border-slate-200 text-slate-700 font-medium'
                  }`}
                >
                  <span className="truncate pr-2">
                    {experienceOptions.find((o) => o.value === selectedExperience)?.label ||
                      'Tất cả kinh nghiệm'}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-500 shrink-0 transition-transform duration-200 ${
                      openFilterDropdown === 'experience' ? 'rotate-180 text-slate-900' : ''
                    }`}
                  />
                </button>

                {openFilterDropdown === 'experience' && (
                  <>
                    <div
                      className="fixed inset-0 z-20"
                      onClick={() => setOpenFilterDropdown(null)}
                    />
                    <div className="absolute left-0 right-0 mt-1.5 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-1.5 z-30 max-h-56 overflow-y-auto no-scrollbar space-y-0.5 animate-fadeIn">
                      {experienceOptions.map((opt) => {
                        const isSelected = selectedExperience === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => {
                              setSelectedExperience(opt.value);
                              setOpenFilterDropdown(null);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-between ${
                              isSelected
                                ? 'bg-slate-100 hover:bg-slate-200/80 text-slate-950 font-bold'
                                : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 font-medium'
                            }`}
                          >
                            <span className="truncate pr-2">{opt.label}</span>
                            {isSelected && (
                              <Check className="w-3.5 h-3.5 text-slate-950 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>

              {/* Lọc nâng cao 6: Hình thức */}
              <div className="space-y-1.5 relative">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                  Hình thức làm việc
                </label>
                <button
                  type="button"
                  onClick={(e) => {
                    const next = openFilterDropdown === 'jobType' ? null : 'jobType';
                    setOpenFilterDropdown(next);
                    if (next) {
                      const parentEl = e.currentTarget.parentElement;
                      setTimeout(() => {
                        parentEl?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                      }, 60);
                    }
                  }}
                  className={`w-full border rounded-full px-3.5 py-2 text-xs flex items-center justify-between transition-all cursor-pointer text-left ${
                    selectedJobType || openFilterDropdown === 'jobType'
                      ? 'bg-white border-slate-900 text-slate-900 font-semibold shadow-2xs'
                      : 'bg-slate-50/90 hover:bg-slate-100/80 border-slate-200 text-slate-700 font-medium'
                  }`}
                >
                  <span className="truncate pr-2">
                    {jobTypeOptions.find((o) => o.value === selectedJobType)?.label ||
                      'Tất cả hình thức'}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-500 shrink-0 transition-transform duration-200 ${
                      openFilterDropdown === 'jobType' ? 'rotate-180 text-slate-900' : ''
                    }`}
                  />
                </button>

                {openFilterDropdown === 'jobType' && (
                  <>
                    <div
                      className="fixed inset-0 z-20"
                      onClick={() => setOpenFilterDropdown(null)}
                    />
                    <div className="absolute left-0 right-0 bottom-full mb-1.5 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-1.5 z-30 max-h-56 overflow-y-auto no-scrollbar space-y-0.5 animate-fadeIn">
                      {jobTypeOptions.map((opt) => {
                        const isSelected = selectedJobType === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => {
                              setSelectedJobType(opt.value);
                              setOpenFilterDropdown(null);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-between ${
                              isSelected
                                ? 'bg-slate-100 hover:bg-slate-200/80 text-slate-950 font-bold'
                                : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 font-medium'
                            }`}
                          >
                            <span className="truncate pr-2">{opt.label}</span>
                            {isSelected && (
                              <Check className="w-3.5 h-3.5 text-slate-950 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>

              {/* Lọc nâng cao 7: Checkbox */}
              <div className="space-y-2.5 pt-1">
                <label className="flex items-center space-x-2 text-xs font-medium text-slate-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isFeaturedOnly}
                    onChange={(e) => setIsFeaturedOnly(e.target.checked)}
                    className="w-4 h-4 rounded text-slate-900 border-slate-300 focus:ring-slate-900 cursor-pointer accent-slate-900"
                  />
                  <span>Chỉ việc làm nổi bật (HOT)</span>
                </label>

                <label className="flex items-center space-x-2 text-xs font-medium text-slate-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isUrgentOnly}
                    onChange={(e) => setIsUrgentOnly(e.target.checked)}
                    className="w-4 h-4 rounded text-slate-900 border-slate-300 focus:ring-slate-900 cursor-pointer accent-slate-900"
                  />
                  <span>Tuyển gấp trong tuần</span>
                </label>
              </div>
            </div>
          </div>
        </aside>

        {/* ========================================================================= */}
        {/* 2. VÙNG GIỮA: VÙNG VIỆC LÀM (KHỚP LẠI THÀNH 1 CONTAINER THỐNG NHẤT)        */}
        {/* ========================================================================= */}
        <main className="flex-1 flex min-w-0 bg-white rounded-xl border border-slate-200/90 shadow-2xs divide-x divide-slate-200/80 overflow-hidden">
          
          {/* 2A. DANH SÁCH THẺ VIỆC LÀM */}
          <div className="w-full md:w-[350px] lg:w-[370px] xl:w-[410px] shrink-0 flex flex-col bg-white overflow-hidden">
            {/* Thanh tiêu đề số lượng */}
            <div className="px-4 py-2.5 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between shrink-0">
              <span className="text-xs font-bold text-slate-800">
                Danh sách việc làm ({filteredJobs.length})
              </span>
              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-[11px] text-slate-800 hover:text-black font-semibold cursor-pointer underline"
                >
                  Xóa lọc ({activeFilterCount})
                </button>
              )}
            </div>

            {/* List các thẻ việc làm: Ngăn cách bằng gạch ngang divide-y, không hiện thanh cuộn */}
            <div
              ref={jobListScrollRef}
              className={`flex-1 overflow-y-auto no-scrollbar smooth-scroll-container divide-y divide-slate-100 transition-opacity duration-200 ${
                isListTransitioning ? 'opacity-65' : 'opacity-100'
              }`}
            >
              {filteredJobs.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-2">
                    <Search className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-800">Không có việc làm phù hợp</h4>
                  <p className="text-[11px] text-slate-500 mt-1 mb-3">
                    Thử đổi từ khóa hoặc bộ lọc của bạn.
                  </p>
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="px-4 py-1.5 bg-slate-900 text-white text-xs font-bold rounded-full hover:bg-black transition-colors cursor-pointer"
                  >
                    Đặt lại bộ lọc
                  </button>
                </div>
              ) : (
                filteredJobs.map((job) => {
                  const isSelected = job.id === activeJob?.id;
                  return (
                    <div
                      key={job.id}
                      id={`job-card-item-${job.id}`}
                      onClick={(e) => {
                        setSelectedJobId(job.id);
                        setMobileDetailOpen(true);
                        e.currentTarget.scrollIntoView({
                          behavior: 'smooth',
                          block: 'nearest',
                        });
                      }}
                      className={`p-4 transition-colors cursor-pointer relative border-l-4 ${
                        isSelected
                          ? 'bg-slate-100 border-l-slate-900 shadow-2xs'
                          : 'bg-white hover:bg-slate-50/90 border-l-transparent'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-11 h-11 bg-white rounded-lg border border-slate-200/80 p-1 flex items-center justify-center shrink-0 overflow-hidden shadow-2xs">
                          <img
                            src={job.companyLogo}
                            alt={job.company}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <h4
                              className={`text-xs sm:text-sm font-bold truncate transition-colors ${
                                isSelected ? 'text-[#0A58CA] font-black' : 'text-[#0A58CA] hover:text-[#084298]'
                              }`}
                            >
                              {job.title}
                            </h4>
                            {job.isFeatured && (
                              <span className="px-1.5 py-0.2 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-md shrink-0">
                                HOT
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-slate-500 truncate mt-0.5 font-medium">
                            {job.company}
                          </p>
                        </div>
                      </div>

                      {/* Salary, Location, Type */}
                      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium">
                        <span className="text-xs text-slate-500 font-medium">
                          {job.salary}
                        </span>
                        <span className="text-xs text-slate-500 font-medium truncate max-w-[140px] before:content-['•'] before:mr-2 before:text-slate-300">
                          {job.location}
                        </span>
                        <span className="text-xs text-slate-500 font-medium before:content-['•'] before:mr-2 before:text-slate-300">
                          {job.jobType}
                        </span>
                      </div>

                      {/* Bottom row: Time + Indicator */}
                      <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                        <span>{job.postedTime}</span>
                        <span className="text-slate-600 hover:text-slate-900 font-medium flex items-center transition-colors">
                          Xem chi tiết <ChevronRight className="w-3 h-3 ml-0.5" />
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* 2B. CHI TIẾT VIỆC LÀM (Khớp chung trong khối main thống nhất) */}
          <div className="hidden md:flex flex-1 flex-col bg-white overflow-hidden">
            {activeJob ? (
              <div
                ref={detailScrollRef}
                onScroll={(e) => {
                  const top = e.currentTarget.scrollTop;
                  if (top > 35 && !isDetailHeaderCollapsed) {
                    setIsDetailHeaderCollapsed(true);
                  } else if (top <= 10 && isDetailHeaderCollapsed) {
                    setIsDetailHeaderCollapsed(false);
                  }
                }}
                className="flex-1 flex flex-col overflow-y-auto no-scrollbar smooth-scroll-container"
              >
                {/* Header chi tiết việc làm (Thu gọn khi cuộn xuống giống LinkedIn) */}
                <div
                  className={`border-b bg-white/95 backdrop-blur-xs sticky top-0 z-10 shrink-0 transition-all duration-200 ${
                    isDetailHeaderCollapsed
                      ? 'px-5 py-2.5 border-slate-200 shadow-xs'
                      : 'p-5 border-slate-100'
                  }`}
                >
                  {isDetailHeaderCollapsed ? (
                    <div className="flex items-center justify-between gap-4 animate-fadeIn">
                      <div className="min-w-0 flex-1">
                        <h2 className="text-sm sm:text-base font-bold text-slate-900 truncate">
                          {activeJob.title}
                        </h2>
                        <p className="text-xs text-slate-500 truncate mt-0.5">
                          {activeJob.company} • {activeJob.location} ({activeJob.jobType})
                        </p>
                      </div>

                      <div className="flex items-center space-x-2 shrink-0">
                        <button
                          type="button"
                          onClick={(e) => onToggleSave && onToggleSave(activeJob.id, e)}
                          className={`px-3.5 py-1.5 rounded-full font-bold text-xs transition-all cursor-pointer active:scale-95 ${
                            activeJob.isSaved
                              ? 'bg-rose-50 text-rose-600 border border-rose-200'
                              : 'border border-[#0A58CA] text-[#0A58CA] hover:bg-blue-50/60'
                          }`}
                        >
                          {activeJob.isSaved ? 'Đã lưu' : 'Lưu'}
                        </button>

                        <button
                          type="button"
                          onClick={() => onApply && onApply(activeJob)}
                          className="py-1.5 px-4 bg-[#0A58CA] hover:bg-[#084298] text-white font-bold text-xs rounded-full transition-all flex items-center space-x-1.5 cursor-pointer active:scale-95 shadow-2xs"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Ứng tuyển nhanh</span>
                        </button>

                        <button
                          type="button"
                          onClick={(e) => onShare && onShare(activeJob, e)}
                          className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
                          title="Chia sẻ tin"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => onViewDetails && onViewDetails(activeJob)}
                          className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
                          title="Toàn màn hình"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start space-x-3.5 min-w-0">
                          <div className="w-14 h-14 bg-white rounded-xl border border-slate-200/80 p-1.5 flex items-center justify-center shrink-0 shadow-2xs">
                            <img
                              src={activeJob.companyLogo}
                              alt={activeJob.company}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <h2 className="text-base sm:text-xl font-black text-[#0A58CA] leading-tight">
                              {activeJob.title}
                            </h2>
                            <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
                              {activeJob.company} • <span className="text-slate-400 font-normal">{activeJob.postedTime}</span>
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 shrink-0">
                          <button
                            type="button"
                            onClick={(e) => onToggleSave && onToggleSave(activeJob.id, e)}
                            className={`p-2 rounded-full transition-all duration-200 cursor-pointer active:scale-75 hover:scale-115 hover:bg-slate-100 flex items-center justify-center ${
                              activeJob.isSaved
                                ? 'text-rose-600'
                                : 'text-slate-400 hover:text-slate-800'
                            }`}
                            title={activeJob.isSaved ? 'Bỏ lưu tin' : 'Lưu tin tuyển dụng'}
                          >
                            <Bookmark className={`w-5 h-5 ${activeJob.isSaved ? 'fill-rose-600' : ''}`} />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => onShare && onShare(activeJob, e)}
                            className="p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-all duration-200 cursor-pointer active:scale-75 hover:scale-115 flex items-center justify-center"
                            title="Chia sẻ tin"
                          >
                            <Share2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {/* Highlights Information */}
                      <div className="grid grid-cols-3 gap-3 mt-4">
                        <div>
                          <span className="text-[11px] font-medium text-slate-500 block">
                            Mức lương
                          </span>
                          <p className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5 truncate">
                            {activeJob.salary}
                          </p>
                        </div>

                        <div>
                          <span className="text-[11px] font-medium text-slate-500 block">
                            Địa điểm
                          </span>
                          <p className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5 truncate">
                            {activeJob.location}
                          </p>
                        </div>

                        <div>
                          <span className="text-[11px] font-medium text-slate-500 block">
                            Hình thức
                          </span>
                          <p className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5 truncate">
                            {activeJob.jobType}
                          </p>
                        </div>
                      </div>

                      {/* Nút ứng tuyển & mở toàn màn hình */}
                      <div className="flex items-center space-x-3 mt-4">
                        <button
                          type="button"
                          id="search-apply-btn"
                          onClick={() => onApply && onApply(activeJob)}
                          className="flex-1 py-2.5 px-5 bg-[#0A58CA] hover:bg-[#084298] text-white font-bold text-xs sm:text-sm rounded-full transition-all flex items-center justify-center space-x-2 cursor-pointer active:scale-95 shadow-sm shadow-blue-500/20"
                        >
                          <Send className="w-4 h-4" />
                          <span>Ứng Tuyển Ngay</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => onViewDetails && onViewDetails(activeJob)}
                          className="py-2.5 px-4 rounded-full border border-slate-200 text-slate-700 hover:border-[#0A58CA] hover:text-[#0A58CA] hover:bg-blue-50/40 font-semibold text-xs transition-all duration-200 cursor-pointer flex items-center space-x-1.5 shrink-0 group"
                        >
                          <ExternalLink className="w-3.5 h-3.5 transition-colors group-hover:text-[#0A58CA]" />
                          <span>Toàn màn hình</span>
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/* Nội dung chi tiết cuộn không hiện thanh cuộn */}
                <div
                  className={`p-6 space-y-5 text-xs sm:text-sm text-slate-700 min-h-[calc(100%-60px)] ${
                    isDetailHeaderCollapsed ? 'pb-48' : 'pb-12'
                  }`}
                >
                  <div>
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm mb-2 border-b border-slate-100 pb-1">
                      Mô tả công việc
                    </h4>
                    <p className="leading-relaxed text-slate-600 text-xs sm:text-sm">
                      {activeJob.description}
                    </p>
                  </div>

                  {activeJob.responsibilities && activeJob.responsibilities.length > 0 && (
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm mb-2 border-b border-slate-100 pb-1">
                        Trách nhiệm công việc
                      </h4>
                      <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                        {activeJob.responsibilities.map((resp, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-slate-800 shrink-0 mt-0.5" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeJob.requirements && activeJob.requirements.length > 0 && (
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm mb-2 border-b border-slate-100 pb-1">
                        Yêu cầu ứng viên
                      </h4>
                      <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                        {activeJob.requirements.map((req, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeJob.benefits && activeJob.benefits.length > 0 && (
                    <div className="p-4 bg-slate-50/70 rounded-xl border border-slate-200/70">
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm mb-2 flex items-center space-x-1.5">
                        <Award className="w-4 h-4 text-slate-800" />
                        <span>Chế độ đãi ngộ & Quyền lợi</span>
                      </h4>
                      <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                        {activeJob.benefits.map((b, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-800 shrink-0 mt-2" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center p-8 text-center text-slate-400">
                <p className="text-xs">Chọn một công việc bên trái để xem chi tiết</p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Mobile Drawer Detail (Khi bấm vào thẻ trên điện thoại) */}
      {mobileDetailOpen && activeJob && (
        <div className="fixed inset-0 z-50 md:hidden bg-slate-900/60 backdrop-blur-xs flex flex-col justify-end animate-fadeIn">
          <div className="bg-white max-h-[85vh] rounded-t-2xl shadow-xl flex flex-col p-4 overflow-hidden border-t-2 border-slate-900">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center space-x-2 min-w-0">
                <img
                  src={activeJob.companyLogo}
                  alt={activeJob.company}
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded-md object-cover border border-slate-200 shrink-0"
                />
                <span className="text-xs font-bold text-[#0A58CA] truncate">
                  {activeJob.title}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileDetailOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto no-scrollbar py-4 space-y-4 text-xs text-slate-700">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="font-bold text-emerald-700 text-sm">{activeJob.salary}</div>
                <div className="text-slate-500 mt-0.5">{activeJob.company} • {activeJob.location}</div>
              </div>

              <div>
                <h5 className="font-bold text-slate-900 mb-1">Mô tả công việc</h5>
                <p className="leading-relaxed text-slate-600">{activeJob.description}</p>
              </div>

              {activeJob.requirements && (
                <div>
                  <h5 className="font-bold text-slate-900 mb-1">Yêu cầu</h5>
                  <ul className="space-y-1">
                    {activeJob.requirements.map((r, i) => (
                      <li key={i} className="flex items-start space-x-1.5 text-slate-600">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center space-x-2">
              <button
                type="button"
                onClick={() => {
                  setMobileDetailOpen(false);
                  onApply && onApply(activeJob);
                }}
                className="flex-1 py-2.5 bg-[#0A58CA] hover:bg-[#084298] text-white font-bold text-xs rounded-full flex items-center justify-center space-x-1.5 cursor-pointer shadow-sm shadow-blue-500/20"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Ứng tuyển ngay</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Filter Modal */}
      {showMobileFilterModal && (
        <div className="fixed inset-0 z-50 lg:hidden bg-slate-900/60 backdrop-blur-xs flex flex-col justify-end animate-fadeIn">
          <div className="bg-white max-h-[85vh] rounded-t-2xl shadow-xl flex flex-col p-4 overflow-hidden border-t-2 border-slate-900">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="font-bold text-slate-900 text-sm">Bộ lọc tìm việc</h3>
              <button
                type="button"
                onClick={() => setShowMobileFilterModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto no-scrollbar py-4 space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Từ khóa</label>
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  placeholder="Vị trí, kỹ năng..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-full px-3.5 py-2 text-xs"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Ngành nghề</label>
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-full px-3.5 py-2 text-xs"
                >
                  {industryList.map((ind) => (
                    <option key={ind} value={ind === 'Tất cả ngành nghề' ? '' : ind}>
                      {ind}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Địa điểm</label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-full px-3.5 py-2 text-xs"
                >
                  {cityList.map((c) => (
                    <option key={c} value={c === 'Tất cả địa điểm' ? '' : c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Mức lương</label>
                <select
                  value={selectedSalaryRange}
                  onChange={(e) => setSelectedSalaryRange(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-full px-3.5 py-2 text-xs"
                >
                  {salaryOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Kinh nghiệm</label>
                <select
                  value={selectedExperience}
                  onChange={(e) => setSelectedExperience(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-full px-3.5 py-2 text-xs"
                >
                  {experienceOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Hình thức làm việc</label>
                <select
                  value={selectedJobType}
                  onChange={(e) => setSelectedJobType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-full px-3.5 py-2 text-xs"
                >
                  {jobTypeOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center space-x-2">
              <button
                type="button"
                onClick={handleResetFilters}
                className="py-2 px-4 border border-slate-200 text-slate-600 font-bold text-xs rounded-full cursor-pointer"
              >
                Đặt lại
              </button>
              <button
                type="button"
                onClick={() => setShowMobileFilterModal(false)}
                className="flex-1 py-2 bg-slate-900 text-white font-bold text-xs rounded-full cursor-pointer"
              >
                Xem kết quả ({filteredJobs.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
