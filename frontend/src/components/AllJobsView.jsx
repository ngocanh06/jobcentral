import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Search,
  MapPin,
  Briefcase,
  ChevronDown,
  Bookmark,
  Sparkles,
  Code2,
  Megaphone,
  CreditCard,
  Palette,
  BarChart2,
  Bot,
  TrendingUp,
  TrendingDown,
  Info,
  Rocket,
  Users,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  FileText,
  Handshake,
  Globe,
  Check,
  Banknote,
  GraduationCap,
  Clock,
  RotateCcw,
  SlidersHorizontal,
  X,
} from 'lucide-react';

export const AllJobsView = ({
  jobs,
  onToggleSave,
  onApply,
  onViewDetails,
}) => {
  // Search state & Advanced Filters
  const [keyword, setKeyword] = useState('');
  const [industry, setIndustry] = useState('');
  const [location, setLocation] = useState('');
  const [salaryRange, setSalaryRange] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [jobType, setJobType] = useState('');

  // Dropdown states
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const searchFormRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchFormRef.current && !searchFormRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [activeJobTab, setActiveJobTab] = useState('featured');
  const [activeCompanyCategory, setActiveCompanyCategory] = useState('all');
  const [companyCarouselIndex, setCompanyCarouselIndex] = useState(0);
  const [chartPeriod, setChartPeriod] = useState('6months');
  const [followedCompanyIds, setFollowedCompanyIds] = useState(['c2']);

  const handleResetFilters = () => {
    setKeyword('');
    setIndustry('');
    setLocation('');
    setSalaryRange('');
    setExperienceLevel('');
    setJobType('');
    setOpenDropdown(null);
  };

  const handleToggleFollowCompany = (companyId) => {
    setFollowedCompanyIds((prev) =>
      prev.includes(companyId)
        ? prev.filter((id) => id !== companyId)
        : [...prev, companyId]
    );
  };

  // Categories for "Việc Làm Theo Ngành Nghề"
  const industryCategories = [
    {
      id: 'tech',
      title: 'Công Nghệ',
      icon: Code2,
      bgColor: 'bg-blue-50',
      iconColor: 'text-[#2170E4]',
      jobsCount: '2,450+',
    },
    {
      id: 'marketing',
      title: 'Marketing',
      icon: Megaphone,
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-500',
      jobsCount: '1,820+',
    },
    {
      id: 'finance',
      title: 'Tài Chính',
      icon: CreditCard,
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      jobsCount: '1,340+',
    },
    {
      id: 'design',
      title: 'Thiết Kế',
      icon: Palette,
      bgColor: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
      jobsCount: '980+',
    },
    {
      id: 'data',
      title: 'Dữ Liệu',
      icon: BarChart2,
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600',
      jobsCount: '1,120+',
    },
    {
      id: 'aiml',
      title: 'AI & ML',
      icon: Bot,
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      jobsCount: '650+',
    },
  ];

  // Dynamic filtered jobs based on search criteria and active tab
  const displayedJobs = useMemo(() => {
    return jobs.filter((job) => {
      // 1. Keyword search
      if (keyword) {
        const kw = keyword.toLowerCase();
        const matchesKw =
          job.title?.toLowerCase().includes(kw) ||
          job.company?.toLowerCase().includes(kw) ||
          job.requirementsSummary?.toLowerCase().includes(kw) ||
          job.category?.toLowerCase().includes(kw);
        if (!matchesKw) return false;
      }

      // 2. Industry filter
      if (industry && industry !== 'Tất cả ngành nghề') {
        const ind = industry.toLowerCase();
        const matchesInd =
          job.industry?.toLowerCase().includes(ind) ||
          job.category?.toLowerCase().includes(ind) ||
          (industry.includes('Công nghệ') && (job.category === 'Công nghệ' || job.category === 'AI & ML')) ||
          (industry.includes('Thiết kế') && job.category === 'Thiết kế') ||
          (industry.includes('Tài chính') && job.category === 'Tài chính') ||
          (industry.includes('Marketing') && job.category === 'Marketing') ||
          (industry.includes('Dữ liệu') && (job.category === 'Dữ liệu' || job.category === 'AI & ML'));
        if (!matchesInd) return false;
      }

      // 3. Location filter
      if (location && location !== 'Tất cả địa điểm') {
        const loc = location.toLowerCase();
        const matchesLoc =
          job.location?.toLowerCase().includes(loc) ||
          job.city?.toLowerCase().includes(loc) ||
          (location.includes('Remote') && job.jobType?.toLowerCase().includes('remote'));
        if (!matchesLoc) return false;
      }

      // 4. Salary Range filter
      if (salaryRange) {
        if (salaryRange === 'under10' && job.salaryCategory !== 'under10') return false;
        if (salaryRange === '10to20' && job.salaryCategory !== '10to20') return false;
        if (salaryRange === '20to35' && job.salaryCategory !== '20to35') return false;
        if (salaryRange === 'above35' && job.salaryCategory !== 'above35') return false;
        if (salaryRange === 'usd' && !job.salaryUsd) return false;
      }

      // 5. Experience level filter
      if (experienceLevel && job.experience && job.experience !== experienceLevel) {
        return false;
      }

      // 6. Job Type filter
      if (jobType) {
        if (jobType === 'fulltime' && job.jobType !== 'Full-time') return false;
        if (jobType === 'parttime' && job.jobType !== 'Part-time') return false;
        if (jobType === 'remote' && job.jobType !== 'Remote') return false;
        if (jobType === 'internship' && job.jobType !== 'Internship') return false;
      }

      // 7. Active Job Tab filter ('featured', 'urgent', 'intern')
      if (activeJobTab === 'urgent' && !job.isUrgent) return false;
      if (activeJobTab === 'intern' && !job.isIntern && job.jobType !== 'Internship') return false;

      return true;
    });
  }, [jobs, keyword, industry, location, salaryRange, experienceLevel, jobType, activeJobTab]);

  // Companies carousel data
  const companiesList = useMemo(() => [
    {
      id: 'c1',
      name: 'TechNova Solution',
      industry: 'Công nghệ phần mềm',
      jobsCount: '12 việc làm',
      logo: 'TN',
      logoBg: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      category: 'tech',
      location: 'Hà Nội & TP.HCM',
      isFeatured: false,
    },
    {
      id: 'c2',
      name: 'Công ty Cổ phần Xây dựng Phục Hưng Holdings',
      industry: 'Xây dựng & Kiến trúc',
      jobsCount: '34 việc làm đang tuyển',
      logo: 'PH',
      logoBg: 'bg-blue-50 text-[#2170E4] border-blue-100',
      category: 'realestate',
      location: 'Toàn quốc',
      isFeatured: true,
    },
    {
      id: 'c3',
      name: 'Global Retail Group',
      industry: 'Bán lẻ & Thương mại',
      jobsCount: '28 việc làm',
      logo: 'GR',
      logoBg: 'bg-purple-50 text-purple-600 border-purple-100',
      category: 'ecommerce',
      location: 'TP. Hồ Chí Minh',
      isFeatured: false,
    },
    {
      id: 'c4',
      name: 'VNG Corporation',
      industry: 'Internet & Trò chơi',
      jobsCount: '45 việc làm',
      logo: 'VNG',
      logoBg: 'bg-amber-50 text-amber-600 border-amber-100',
      category: 'tech',
      location: 'TP. Hồ Chí Minh',
      isFeatured: true,
    },
    {
      id: 'c5',
      name: 'Ngân Hàng Quân Đội (MB Bank)',
      industry: 'Tài chính - Ngân hàng',
      jobsCount: '52 việc làm',
      logo: 'MB',
      logoBg: 'bg-blue-50 text-blue-700 border-blue-100',
      category: 'finance',
      location: 'Hà Nội',
      isFeatured: false,
    },
    {
      id: 'c6',
      name: 'Tập đoàn FPT Software',
      industry: 'Xuất khẩu phần mềm',
      jobsCount: '80+ việc làm',
      logo: 'FPT',
      logoBg: 'bg-orange-50 text-orange-600 border-orange-100',
      category: 'tech',
      location: 'Đà Nẵng & Cần Thơ',
      isFeatured: true,
    },
  ], []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setOpenDropdown(null);
  };

  return (
    <div className="bg-[#F8FAFC] pb-20">
      {/* 1. HERO SEARCH SECTION */}
      <section className="pt-12 pb-8 px-4 sm:px-6 lg:px-8 text-center max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-extrabold text-slate-900 tracking-tight leading-tight">
          Cầu Nối Sự Nghiệp <span className="text-[#2170E4]">Thế Hệ Mới</span>
        </h1>
        <p className="mt-3 text-slate-600 text-sm sm:text-base font-medium max-w-xl mx-auto leading-relaxed">
          Tìm kiếm liền tay - Nhận ngay công việc
          <br />
          Hơn <span className="text-[#2170E4] font-bold">10,000+</span> nghề nghiệp đang chờ bạn ứng tuyển
        </p>

        {/* Enhanced Floating Search Bar with Multiple Options */}
        <div ref={searchFormRef} className="mt-7 max-w-4xl mx-auto text-left relative z-20">
          <form
            onSubmit={handleSearchSubmit}
            className="bg-white rounded-xl border border-slate-200 p-2 sm:p-2.5 shadow-md flex flex-col md:flex-row items-center gap-2"
          >
            {/* 1. Keyword Input */}
            <div className="flex items-center space-x-2.5 px-3 py-2 flex-1 w-full text-left">
              <Search className="w-4 h-4 text-[#2170E4] shrink-0" />
              <input
                type="text"
                placeholder="Vị trí, kỹ năng, công ty..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden bg-transparent"
              />
              {keyword && (
                <button
                  type="button"
                  onClick={() => setKeyword('')}
                  className="text-slate-400 hover:text-slate-700 p-0.5 transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="hidden md:block w-px h-7 bg-slate-200 shrink-0" />

            {/* 2. Industry Dropdown with multiple choices */}
            <div className="relative flex-1 w-full">
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === 'industry' ? null : 'industry')}
                className="flex items-center justify-between space-x-2.5 px-3 py-2 w-full text-left cursor-pointer transition-colors text-slate-700 hover:text-slate-900"
              >
                <div className="flex items-center space-x-2.5 truncate">
                  <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="text-sm truncate font-medium">
                    {industry || 'Ngành nghề'}
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-150 ${openDropdown === 'industry' ? 'rotate-180 text-[#2170E4]' : ''}`} />
              </button>

              {openDropdown === 'industry' && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2.5 py-1.5">
                    Chọn ngành nghề
                  </div>
                  <div className="max-h-60 overflow-y-auto space-y-0.5">
                    {[
                      'Tất cả ngành nghề',
                      'Công nghệ thông tin / Phần mềm',
                      'Marketing / Truyền thông / PR',
                      'Tài chính / Kế toán / Ngân hàng',
                      'Thiết kế UI / UX / Đồ họa',
                      'Dữ liệu & Trí tuệ nhân tạo (AI)',
                      'Kinh doanh / Bán hàng (Sales)',
                      'Nhân sự / Tuyển dụng (HR)',
                      'Quản lý dự án (Product / Project)',
                      'Thương mại điện tử / Logistics',
                    ].map((item) => {
                      const isSelected = (item === 'Tất cả ngành nghề' && !industry) || industry === item;
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            setIndustry(item === 'Tất cả ngành nghề' ? '' : item);
                            setOpenDropdown(null);
                          }}
                          className={`w-full text-left px-2.5 py-2 text-xs rounded-md transition-colors cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'bg-blue-50 text-[#2170E4] font-bold'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span className="truncate">{item}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 shrink-0 text-[#2170E4]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="hidden md:block w-px h-7 bg-slate-200 shrink-0" />

            {/* 3. Location Dropdown with richer options */}
            <div className="relative flex-1 w-full">
              <button
                type="button"
                onClick={() => setOpenDropdown(openDropdown === 'location' ? null : 'location')}
                className="flex items-center justify-between space-x-2.5 px-3 py-2 w-full text-left cursor-pointer transition-colors text-slate-700 hover:text-slate-900"
              >
                <div className="flex items-center space-x-2.5 truncate">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="text-sm truncate font-medium">
                    {location || 'Địa điểm'}
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-150 ${openDropdown === 'location' ? 'rotate-180 text-[#2170E4]' : ''}`} />
              </button>

              {openDropdown === 'location' && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2.5 py-1.5">
                    Khu vực làm việc
                  </div>
                  <div className="max-h-60 overflow-y-auto space-y-0.5">
                    {[
                      'Tất cả địa điểm',
                      'TP. Hồ Chí Minh',
                      'Hà Nội',
                      'Đà Nẵng',
                      'Cần Thơ',
                      'Hải Phòng',
                      'Bình Dương',
                      'Đồng Nai',
                      'Làm việc từ xa (Remote)',
                      'Nước ngoài / Toàn cầu',
                    ].map((item) => {
                      const isSelected = (item === 'Tất cả địa điểm' && !location) || location === item;
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            setLocation(item === 'Tất cả địa điểm' ? '' : item);
                            setOpenDropdown(null);
                          }}
                          className={`w-full text-left px-2.5 py-2 text-xs rounded-md transition-colors cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'bg-blue-50 text-[#2170E4] font-bold'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span className="truncate">{item}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 shrink-0 text-[#2170E4]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Toggle Advanced Options */}
            <button
              type="button"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              title="Thêm bộ lọc nâng cao"
              className={`p-2.5 rounded-md border transition-colors cursor-pointer shrink-0 ${
                showAdvancedFilters || salaryRange || experienceLevel || jobType
                  ? 'border-blue-300 bg-blue-50/70 text-[#2170E4]'
                  : 'border-slate-200 text-slate-500 hover:text-slate-800 hover:border-slate-300'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>

            {/* Search Button */}
            <button
              type="submit"
              className="w-full md:w-auto px-7 py-2.5 sm:py-3 bg-[#2170E4] hover:bg-[#1a5bbd] text-white font-semibold text-sm rounded-md transition-colors cursor-pointer shrink-0"
            >
              Tìm kiếm
            </button>
          </form>

          {/* Advanced Filter Row (Salary, Experience, Job Format) */}
          {showAdvancedFilters && (
            <div className="mt-2.5 p-3.5 bg-white/95 backdrop-blur-md rounded-lg border border-slate-200/90 shadow-lg grid grid-cols-1 sm:grid-cols-3 gap-3 animate-in fade-in slide-in-from-top-1 duration-150">
              {/* Option 1: Salary Range */}
              <div className="relative">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Banknote className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Mức lương</span>
                </label>
                <select
                  value={salaryRange}
                  onChange={(e) => setSalaryRange(e.target.value)}
                  className="w-full text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-md px-3 py-2 focus:outline-hidden focus:border-[#2170E4] cursor-pointer"
                >
                  <option value="">Tất cả mức lương</option>
                  <option value="under10">Dưới 10 triệu</option>
                  <option value="10to20">10 - 20 triệu</option>
                  <option value="20to35">20 - 35 triệu</option>
                  <option value="above35">Trên 35 triệu</option>
                  <option value="usd">$1,500 - $3,000+ (USD)</option>
                  <option value="negotiable">Lương thỏa thuận</option>
                </select>
              </div>

              {/* Option 2: Experience Level */}
              <div className="relative">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Kinh nghiệm</span>
                </label>
                <select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className="w-full text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-md px-3 py-2 focus:outline-hidden focus:border-[#2170E4] cursor-pointer"
                >
                  <option value="">Tất cả kinh nghiệm</option>
                  <option value="intern">Thực tập sinh / Sinh viên</option>
                  <option value="fresher">Fresher / Chưa có kinh nghiệm</option>
                  <option value="junior">Junior (1 - 2 năm)</option>
                  <option value="middle">Middle (2 - 4 năm)</option>
                  <option value="senior">Senior (5+ năm)</option>
                  <option value="lead">Lead / Quản lý / Trưởng phòng</option>
                </select>
              </div>

              {/* Option 3: Work Format */}
              <div className="relative">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Hình thức</span>
                </label>
                <select
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  className="w-full text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-md px-3 py-2 focus:outline-hidden focus:border-[#2170E4] cursor-pointer"
                >
                  <option value="">Tất cả hình thức</option>
                  <option value="fulltime">Toàn thời gian (Full-time)</option>
                  <option value="parttime">Bán thời gian (Part-time)</option>
                  <option value="remote">Làm việc từ xa (Remote / Hybrid)</option>
                  <option value="freelance">Freelance / Dự án</option>
                  <option value="internship">Thực tập (Internship)</option>
                </select>
              </div>
            </div>
          )}

          {/* Quick Popular Keywords & Suggested Tags */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-400 font-medium text-[11px] mr-1">Gợi ý tìm kiếm:</span>
            {[
              'UI/UX Designer',
              'ReactJS',
              'Node.js',
              'Product Manager',
              'Digital Marketing',
              'Fresher IT',
              'Remote',
            ].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setKeyword(tag)}
                className={`px-2.5 py-1 rounded-md text-xs transition-colors cursor-pointer ${
                  keyword === tag
                    ? 'bg-blue-100 text-[#2170E4] font-bold'
                    : 'bg-white/80 hover:bg-white text-slate-600 hover:text-[#2170E4] border border-slate-200/70 shadow-2xs'
                }`}
              >
                {tag}
              </button>
            ))}

            {(keyword || industry || location || salaryRange || experienceLevel || jobType) && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="ml-auto inline-flex items-center space-x-1 text-slate-500 hover:text-rose-600 text-xs font-medium cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Đặt lại</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 2. OFFICIAL LAUNCH PROMOTIONAL BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-6 sm:my-8">
        <div className="relative rounded-3xl overflow-hidden shadow-lg border border-blue-400/20 bg-gradient-to-r from-[#023e8a] via-[#0077b6] to-[#03045e] text-white p-6 sm:p-10">
          {/* Subtle Background Glows */}
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-cyan-400/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 left-10 w-60 h-60 bg-blue-400/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[11px] font-extrabold tracking-wider uppercase text-cyan-200">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                <span>CHÍNH THỨC</span>
              </div>

              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white flex items-center gap-2">
                  RA MẮT
                </h2>
                <div className="text-2xl sm:text-3xl font-extrabold text-cyan-300 tracking-tight mt-1 flex items-center gap-2">
                  <span className="text-white">JC</span> JobCentral
                </div>
                <p className="text-xs sm:text-sm text-cyan-100/90 font-medium italic mt-1">
                  Kết nối cơ hội - Bứt phá tương lai
                </p>
              </div>

              {/* 4 Feature Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start space-x-2.5 bg-white/10 backdrop-blur-xs p-2.5 rounded-xl border border-white/10">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/40 flex items-center justify-center text-white shrink-0 mt-0.5">
                    <Briefcase className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-[11px]">
                    <p className="font-bold text-white leading-snug">HÀNG NGÀN VIỆC LÀM CHẤT LƯỢNG</p>
                    <p className="text-blue-200 text-[10px]">Cập nhật mỗi ngày</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2.5 bg-white/10 backdrop-blur-xs p-2.5 rounded-xl border border-white/10">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/40 flex items-center justify-center text-white shrink-0 mt-0.5">
                    <Handshake className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-[11px]">
                    <p className="font-bold text-white leading-snug">KẾT NỐI TRỰC TIẾP VỚI NHÀ TUYỂN DỤNG</p>
                    <p className="text-blue-200 text-[10px]">Uy tín - Minh bạch - Nhanh chóng</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2.5 bg-white/10 backdrop-blur-xs p-2.5 rounded-xl border border-white/10">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/40 flex items-center justify-center text-white shrink-0 mt-0.5">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-[11px]">
                    <p className="font-bold text-white leading-snug">CÔNG CỤ HỖ TRỢ TÌM VIỆC HIỆU QUẢ</p>
                    <p className="text-blue-200 text-[10px]">Hồ sơ nổi bật - Gợi ý thông minh</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2.5 bg-white/10 backdrop-blur-xs p-2.5 rounded-xl border border-white/10">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/40 flex items-center justify-center text-white shrink-0 mt-0.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <div className="text-[11px]">
                    <p className="font-bold text-white leading-snug">AN TOÀN & BẢO MẬT</p>
                    <p className="text-blue-200 text-[10px]">Thông tin được xác thực, bảo vệ tối đa</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Graphic Mockup */}
            <div className="lg:col-span-6 flex flex-col items-center lg:items-end justify-center relative">
              <div className="w-full max-w-md bg-slate-900/90 border border-blue-300/30 rounded-2xl p-4 shadow-2xl backdrop-blur-md">
                <div className="bg-slate-800 rounded-xl p-3 text-center border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 px-1">
                    <div className="flex items-center space-x-1.5">
                      <div className="w-2 h-2 rounded-full bg-red-400" />
                      <div className="w-2 h-2 rounded-full bg-yellow-400" />
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                    </div>
                    <span className="font-mono">jobcentral.vn</span>
                  </div>
                  <div className="py-3 px-2 bg-gradient-to-b from-blue-900/50 to-slate-900 rounded-lg">
                    <p className="text-xs font-bold text-cyan-300">Tìm việc dễ dàng</p>
                    <p className="text-sm font-extrabold text-white">Sự nghiệp vững vàng</p>
                    <p className="text-[10px] text-slate-300 mt-1 max-w-xs mx-auto">
                      Khám phá hàng ngàn cơ hội việc làm phù hợp với năng lực và đam mê của bạn.
                    </p>
                  </div>
                </div>
              </div>

              {/* URL Pill & Slogan */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 w-full max-w-md">
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-blue-950/80 border border-blue-400/30 rounded-full text-[11px] font-mono text-cyan-200">
                  <Globe className="w-3 h-3" />
                  <span>Truy cập ngay: www.jobcentral.vn</span>
                </div>
                <div className="text-xs font-extrabold text-white tracking-wide">
                  BỨT PHÁ SỰ NGHIỆP <span className="text-cyan-300">cùng JobCentral!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VIỆC LÀM THEO NGÀNH NGHỀ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12 text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Việc Làm Theo <span className="text-[#2170E4]">Ngành Nghề</span>
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm mt-1.5">
          Khám phá các lĩnh vực đang bùng nổ trong kỷ nguyên số.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 mt-7">
          {industryCategories.map((cat) => {
            const IconComp = cat.icon;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setIndustry(cat.title);
                }}
                className="bg-white hover:bg-blue-50/40 border border-slate-200/90 hover:border-[#2170E4] rounded-xl p-5 flex flex-col items-center justify-center space-y-3 transition-all hover:shadow-sm cursor-pointer group"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${cat.bgColor} flex items-center justify-center ${cat.iconColor} group-hover:scale-110 transition-transform`}
                >
                  <IconComp className="w-6 h-6 stroke-[2.2]" />
                </div>
                <span className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#2170E4] transition-colors">
                  {cat.title}
                </span>
                <span className="text-[11px] text-slate-400 group-hover:text-slate-600">
                  {cat.jobsCount} việc
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. VIỆC LÀM MỚI NHẤT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-14 text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Việc Làm <span className="text-[#2170E4]">Mới Nhất</span>
        </h2>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center space-x-2 mt-5">
          <button
            type="button"
            onClick={() => setActiveJobTab('featured')}
            className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeJobTab === 'featured'
                ? 'bg-[#2170E4] text-white shadow-xs'
                : 'bg-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Việc làm nổi bật
          </button>
          <button
            type="button"
            onClick={() => setActiveJobTab('urgent')}
            className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeJobTab === 'urgent'
                ? 'bg-[#2170E4] text-white shadow-xs'
                : 'bg-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Việc Làm Tuyển gấp
          </button>
          <button
            type="button"
            onClick={() => setActiveJobTab('intern')}
            className={`px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeJobTab === 'intern'
                ? 'bg-[#2170E4] text-white shadow-xs'
                : 'bg-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Việc Làm Thực tập sinh
          </button>
        </div>

        {/* Job Cards Grid */}
        {displayedJobs.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200/90 p-12 text-center my-6">
            <div className="w-16 h-16 bg-blue-50 text-[#2170E4] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Không tìm thấy việc làm phù hợp</h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mt-1 mb-6">
              Hãy thử điều chỉnh bộ lọc, xóa từ khóa hoặc đặt lại điều kiện tìm kiếm để khám phá thêm cơ hội.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#2170E4] text-white text-xs font-semibold rounded-xl hover:bg-[#1a5bbd] transition-all cursor-pointer shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Đặt lại bộ lọc tìm kiếm</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-7 text-left">
            {displayedJobs.map((job) => {
              return (
                <div
                  key={job.id}
                  className="bg-white rounded-2xl border border-slate-200/90 p-5 hover:border-[#2170E4]/60 hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative group"
                >
                  {/* Header Row: Company Logo Placeholder + Title + Company + Bookmark */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start space-x-3.5 flex-1 min-w-0">
                      <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200 overflow-hidden flex items-center justify-center text-[#2170E4] font-bold text-sm shrink-0">
                        {job.companyLogo ? (
                          <img
                            src={job.companyLogo}
                            alt={job.company}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Building2 className="w-5 h-5 text-[#2170E4]" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3
                          onClick={() => onViewDetails(job)}
                          className="text-sm font-bold text-slate-900 truncate hover:text-[#2170E4] cursor-pointer transition-colors"
                        >
                          {job.title}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
                          {job.company}
                        </p>
                      </div>
                    </div>

                    {/* Bookmark Button */}
                    <button
                      type="button"
                      onClick={(e) => onToggleSave(job.id, e)}
                      className="p-1.5 text-slate-400 hover:text-[#2170E4] rounded-lg hover:bg-blue-50/50 transition-colors cursor-pointer shrink-0"
                      title="Lưu việc làm"
                    >
                      <Bookmark
                        className={`w-4 h-4 ${
                          job.isSaved ? 'text-[#2170E4] fill-[#2170E4]' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* Tags Row */}
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium">
                    <span className="px-2.5 py-1 bg-blue-50 text-[#2170E4] rounded-md font-semibold">
                      {job.jobType || 'Full-time'}
                    </span>
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-md font-semibold">
                      {job.salary}
                    </span>
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md">
                      {job.location?.split(',').pop()?.trim() || job.location}
                    </span>
                  </div>

                  {/* Footer Row: Posted Time & Apply Button */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <span className="text-slate-400 font-medium">{job.postedTime || 'Mới cập nhật'}</span>
                    <button
                      type="button"
                      onClick={(e) => onApply(job, e)}
                      className="px-5 py-2 bg-[#2170E4] hover:bg-[#1a5bbd] text-white font-semibold rounded-lg text-xs shadow-xs transition-all cursor-pointer"
                    >
                      Ứng tuyển ngay
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 5. CẬP NHẬT THỊ TRƯỜNG LAO ĐỘNG MỖI NGÀY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-14">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Cập Nhật Thị Trường Lao Động <span className="text-[#2170E4]">Mỗi Ngày</span>
          </h2>
        </div>

        {/* 2 Big Analytics Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Chart: Xu hướng đăng tuyển */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Xu hướng đăng tuyển
              </h3>
              <div className="relative">
                <select
                  value={chartPeriod}
                  onChange={(e) => setChartPeriod(e.target.value)}
                  className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 font-medium focus:outline-hidden cursor-pointer"
                >
                  <option value="6months">6 tháng qua</option>
                  <option value="1year">1 năm qua</option>
                  <option value="1month">Tháng này</option>
                </select>
              </div>
            </div>

            {/* Visual Bar Chart */}
            <div className="pt-6 pb-2">
              <div className="h-44 flex items-end justify-between gap-3 px-2">
                {[
                  { month: 'Th. 6', height: 'h-24', val: '4,200' },
                  { month: 'Th. 9', height: 'h-28', val: '5,100' },
                  { month: 'Th. 12', height: 'h-32', val: '6,400' },
                  { month: 'Th. 3', height: 'h-36', val: '7,800' },
                  { month: 'Th. 5', height: 'h-40', val: '9,500' },
                ].map((bar) => (
                  <div key={bar.month} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="w-full max-w-[42px] bg-slate-100 rounded-t-lg overflow-hidden flex items-end h-40">
                      <div
                        className={`w-full ${bar.height} bg-gradient-to-t from-[#2170E4] to-blue-400 group-hover:brightness-110 rounded-t-lg transition-all`}
                      />
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium">{bar.month}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Progress List: Ngành nghề nhu cầu cao */}
          <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-1.5">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  Ngành nghề nhu cầu cao
                </h3>
              </div>
              <Info className="w-4 h-4 text-slate-400 cursor-pointer" />
            </div>

            <div className="space-y-3.5 py-1">
              {[
                { name: 'Công nghệ thông tin', percent: 32, width: 'w-[32%]' },
                { name: 'Marketing & Sáng tạo', percent: 24, width: 'w-[24%]' },
                { name: 'Tài chính & Ngân hàng', percent: 18, width: 'w-[18%]' },
                { name: 'Y tế & Chăm sóc sức khỏe', percent: 15, width: 'w-[15%]' },
                { name: 'Sản xuất & Vận tải', percent: 11, width: 'w-[11%]' },
              ].map((item) => (
                <div key={item.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-medium text-slate-700">
                    <span>{item.name}</span>
                    <span className="font-bold text-slate-900">{item.percent}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className={`h-full ${item.width} bg-[#2170E4] rounded-full`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4 Metric Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mt-5">
          {/* Stat 1 */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-[#2170E4]">
                <Briefcase className="w-4 h-4" />
              </div>
              <span className="inline-flex items-center text-xs font-bold text-emerald-600">
                <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> +12%
              </span>
            </div>
            <div className="mt-3">
              <p className="text-xs text-slate-500 font-medium">Marketing</p>
              <p className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5">142,500</p>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <CreditCard className="w-4 h-4" />
              </div>
              <span className="inline-flex items-center text-xs font-bold text-emerald-600">
                <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> +5.4%
              </span>
            </div>
            <div className="mt-3">
              <p className="text-xs text-slate-500 font-medium">Tài chính ngân hàng</p>
              <p className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5">1,500,000</p>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-rose-50 flex items-center justify-center text-rose-500">
                <Rocket className="w-4 h-4" />
              </div>
              <span className="inline-flex items-center text-xs font-bold text-rose-600">
                <TrendingDown className="w-3.5 h-3.5 mr-0.5" /> -7%
              </span>
            </div>
            <div className="mt-3">
              <p className="text-xs text-slate-500 font-medium">Công nghệ phần mềm</p>
              <p className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5">500,000</p>
            </div>
          </div>

          {/* Stat 4 */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                <Users className="w-4 h-4" />
              </div>
              <span className="inline-flex items-center text-xs font-bold text-rose-600">
                <TrendingDown className="w-3.5 h-3.5 mr-0.5" /> -2%
              </span>
            </div>
            <div className="mt-3">
              <p className="text-xs text-slate-500 font-medium">Chăm sóc khách hàng</p>
              <p className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5">890,000</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PHÂN TÍCH CHUYÊN SÂU (AI INSIGHTS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-14">
        <div className="flex items-center space-x-2.5 mb-6">
          <div className="w-7 h-7 rounded-lg bg-[#2170E4] flex items-center justify-center text-white">
            <Sparkles className="w-4 h-4" />
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
            Phân tích chuyên sâu (AI Insights)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl border-t-4 border-t-[#2170E4] border-x border-b border-slate-200/90 p-5 shadow-xs flex flex-col justify-between space-y-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Tương lai việc làm</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-2">
                Sự trỗi dậy của GenAI dự kiến sẽ thay đổi 40% các tác vụ trong ngành tài chính và IT vào năm 2025.
              </p>
            </div>
            <a
              href="#report"
              onClick={(e) => e.preventDefault()}
              className="text-xs font-bold text-[#2170E4] hover:text-[#1a5bbd] inline-flex items-center space-x-1"
            >
              <span>Đọc báo cáo đầy đủ</span>
              <span>&gt;</span>
            </a>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl border-t-4 border-t-[#2170E4] border-x border-b border-slate-200/90 p-5 shadow-xs flex flex-col justify-between space-y-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Kỹ năng vàng</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-2">
                Kỹ năng tư duy phản biện và quản lý dự án linh hoạt (Agile) đang có mức tăng trưởng lương cao nhất (+22%).
              </p>
            </div>
            <a
              href="#skills"
              onClick={(e) => e.preventDefault()}
              className="text-xs font-bold text-[#2170E4] hover:text-[#1a5bbd] inline-flex items-center space-x-1"
            >
              <span>Khám phá kỹ năng</span>
              <span>&gt;</span>
            </a>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl border-t-4 border-t-[#2170E4] border-x border-b border-slate-200/90 p-5 shadow-xs flex flex-col justify-between space-y-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Mức lương chuẩn</h3>
              <p className="text-xs text-slate-600 leading-relaxed mt-2">
                Các doanh nghiệp đang điều chỉnh ngân sách lương tăng 8-10% để thu hút nhân tài cấp cao trong năm nay.
              </p>
            </div>
            <a
              href="#salary"
              onClick={(e) => e.preventDefault()}
              className="text-xs font-bold text-[#2170E4] hover:text-[#1a5bbd] inline-flex items-center space-x-1"
            >
              <span>Xem biểu đồ lương</span>
              <span>&gt;</span>
            </a>
          </div>
        </div>
      </section>

      {/* 7. KẾT NỐI VỚI NHỮNG CÔNG TY HÀNG ĐẦU (3D ROTATING AXIS CAROUSEL) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-14 text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Kết Nối Với Những Công Ty <span className="text-[#2170E4]">Hàng Đầu</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-lg mx-auto">
          Khám phá các doanh nghiệp uy tín hàng đầu và gia nhập đội ngũ phát triển tài năng
        </p>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
          {[
            { id: 'all', label: 'Tất cả' },
            { id: 'tech', label: 'Công nghệ' },
            { id: 'finance', label: 'Tài chính' },
            { id: 'realestate', label: 'Bất động sản & Xây dựng' },
            { id: 'ecommerce', label: 'Thương mại điện tử' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveCompanyCategory(tab.id);
                setCompanyCarouselIndex(0);
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeCompanyCategory === tab.id
                  ? 'bg-[#2170E4] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 3D Axial Rotating Carousel Container */}
        {(() => {
          const filtered =
            activeCompanyCategory === 'all'
              ? companiesList
              : companiesList.filter((c) => c.category === activeCompanyCategory).length >= 3
              ? companiesList.filter((c) => c.category === activeCompanyCategory)
              : companiesList;

          const total = filtered.length;
          const centerIdx = ((companyCarouselIndex % total) + total) % total;
          const leftIdx = (centerIdx - 1 + total) % total;
          const rightIdx = (centerIdx + 1) % total;

          const leftCompany = filtered[leftIdx];
          const centerCompany = filtered[centerIdx];
          const rightCompany = filtered[rightIdx];

          return (
            <div className="relative mt-10 flex flex-col items-center">
              <div className="flex items-center justify-center w-full gap-2 sm:gap-6">
                {/* Prev Button */}
                <button
                  type="button"
                  id="carousel-3d-prev-btn"
                  onClick={() => setCompanyCarouselIndex((prev) => (prev > 0 ? prev - 1 : total - 1))}
                  className="w-11 h-11 rounded-full bg-white border border-slate-200/90 flex items-center justify-center text-slate-600 hover:text-[#2170E4] hover:bg-blue-50/50 hover:border-blue-200 shadow-sm cursor-pointer shrink-0 transition-all z-30"
                  aria-label="Xoay trục sang trái"
                  title="Xoay sang trái"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* 3D Axial Stage */}
                <div
                  className="relative w-full max-w-4xl py-6 flex items-center justify-center"
                  style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full items-center">
                    {/* Left Card - Angled on Y Axis */}
                    <motion.div
                      key={`left-${leftCompany.id}`}
                      initial={{ opacity: 0, rotateY: 35, scale: 0.8 }}
                      animate={{ opacity: 0.72, rotateY: 26, scale: 0.88, zIndex: 10 }}
                      whileHover={{ opacity: 0.95, rotateY: 18, scale: 0.92 }}
                      transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                      onClick={() => setCompanyCarouselIndex(leftIdx)}
                      className="hidden md:flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-200/90 p-6 text-center shadow-md cursor-pointer hover:border-blue-300 transition-colors select-none"
                      style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
                      title="Nhấn để xoay đến công ty này"
                    >
                      <div
                        className={`w-14 h-14 mx-auto rounded-2xl border flex items-center justify-center font-bold text-sm mb-3 shadow-xs ${leftCompany.logoBg}`}
                      >
                        {leftCompany.logo}
                      </div>
                      <h4 className="text-sm font-bold text-slate-800 line-clamp-1">
                        {leftCompany.name}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">{leftCompany.industry}</p>
                      <span className="inline-block mt-3 px-3 py-1 bg-blue-50 text-[#2170E4] text-[11px] font-semibold rounded-full">
                        {leftCompany.jobsCount}
                      </span>
                    </motion.div>

                    {/* Center Active Featured Card - 3D Front Focus with Axial Highlight */}
                    <motion.div
                      key={`center-${centerCompany.id}`}
                      initial={{ opacity: 0, scale: 0.92, rotateY: -15 }}
                      animate={{ opacity: 1, scale: 1.05, rotateY: 0, zIndex: 25 }}
                      whileHover={{ scale: 1.08, rotateY: 0 }}
                      transition={{ type: 'spring', stiffness: 240, damping: 22 }}
                      className="bg-gradient-to-br from-[#1d63cb] to-[#2170E4] rounded-2xl p-6 sm:p-7 text-white text-center shadow-xl shadow-blue-500/20 relative overflow-hidden border border-blue-400/30"
                      style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
                    >
                      {/* Floating glowing background accents */}
                      <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
                      <div className="absolute top-3.5 right-3.5 px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-xs flex items-center space-x-1 text-white text-[11px] font-semibold">
                        <Sparkles className="w-3 h-3 text-amber-300 fill-amber-300" />
                        <span>Đối tác hàng đầu</span>
                      </div>

                      {/* White Logo Badge */}
                      <div className="w-16 h-16 mx-auto rounded-2xl bg-white p-2.5 flex items-center justify-center shadow-lg shadow-black/10 mb-4 mt-2">
                        <div
                          className={`w-full h-full rounded-xl border flex items-center justify-center font-black text-sm ${centerCompany.logoBg}`}
                        >
                          {centerCompany.logo}
                        </div>
                      </div>

                      <h4 className="text-base font-bold text-white leading-snug px-2 line-clamp-2 min-h-[44px] flex items-center justify-center">
                        {centerCompany.name}
                      </h4>
                      <p className="text-xs text-blue-100 mt-1">{centerCompany.industry}</p>
                      <p className="text-[11px] text-blue-200/80 mt-0.5">{centerCompany.location}</p>

                      {/* Action Buttons */}
                      <div className="mt-5 space-y-2.5">
                        <button
                          type="button"
                          id={`company-jobs-count-btn-${centerCompany.id}`}
                          onClick={() =>
                            alert(`Đang mở ${centerCompany.jobsCount} của ${centerCompany.name}!`)
                          }
                          className="w-full py-2.5 bg-white text-[#1d63cb] hover:bg-blue-50/90 active:scale-[0.98] font-semibold rounded-lg text-xs shadow-xs transition-all cursor-pointer"
                        >
                          {centerCompany.jobsCount}
                        </button>
                        {(() => {
                          const isFollowed = followedCompanyIds.includes(centerCompany.id);
                          return (
                            <button
                              type="button"
                              id={`company-follow-btn-${centerCompany.id}`}
                              onClick={() => handleToggleFollowCompany(centerCompany.id)}
                              className={`w-full py-2.5 flex items-center justify-center space-x-1.5 font-semibold rounded-lg text-xs transition-all cursor-pointer select-none active:scale-[0.98] ${
                                isFollowed
                                  ? 'bg-white/25 hover:bg-white/30 border border-white/40 text-white shadow-xs backdrop-blur-xs'
                                  : 'bg-white/10 hover:bg-white/20 border border-white/25 text-white'
                              }`}
                            >
                              {isFollowed ? (
                                <>
                                  <Check className="w-4 h-4 stroke-[2.5] text-white" />
                                  <span>Đã theo dõi</span>
                                </>
                              ) : (
                                <>
                                  <span>+ Theo dõi công ty</span>
                                </>
                              )}
                            </button>
                          );
                        })()}
                      </div>
                    </motion.div>

                    {/* Right Card - Angled on Y Axis */}
                    <motion.div
                      key={`right-${rightCompany.id}`}
                      initial={{ opacity: 0, rotateY: -35, scale: 0.8 }}
                      animate={{ opacity: 0.72, rotateY: -26, scale: 0.88, zIndex: 10 }}
                      whileHover={{ opacity: 0.95, rotateY: -18, scale: 0.92 }}
                      transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                      onClick={() => setCompanyCarouselIndex(rightIdx)}
                      className="hidden md:flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-200/90 p-6 text-center shadow-md cursor-pointer hover:border-blue-300 transition-colors select-none"
                      style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
                      title="Nhấn để xoay đến công ty này"
                    >
                      <div
                        className={`w-14 h-14 mx-auto rounded-2xl border flex items-center justify-center font-bold text-sm mb-3 shadow-xs ${rightCompany.logoBg}`}
                      >
                        {rightCompany.logo}
                      </div>
                      <h4 className="text-sm font-bold text-slate-800 line-clamp-1">
                        {rightCompany.name}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">{rightCompany.industry}</p>
                      <span className="inline-block mt-3 px-3 py-1 bg-blue-50 text-[#2170E4] text-[11px] font-semibold rounded-full">
                        {rightCompany.jobsCount}
                      </span>
                    </motion.div>
                  </div>
                </div>

                {/* Next Button */}
                <button
                  type="button"
                  id="carousel-3d-next-btn"
                  onClick={() => setCompanyCarouselIndex((prev) => (prev < total - 1 ? prev + 1 : 0))}
                  className="w-11 h-11 rounded-full bg-white border border-slate-200/90 flex items-center justify-center text-slate-600 hover:text-[#2170E4] hover:bg-blue-50/50 hover:border-blue-200 shadow-sm cursor-pointer shrink-0 transition-all z-30"
                  aria-label="Xoay trục sang phải"
                  title="Xoay sang phải"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Indicators / Dots for 3D Axis Rotation */}
              <div className="flex items-center space-x-2 mt-4">
                {filtered.map((comp, idx) => (
                  <button
                    key={comp.id}
                    type="button"
                    onClick={() => setCompanyCarouselIndex(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      centerIdx === idx
                        ? 'w-7 bg-[#2170E4]'
                        : 'w-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Chuyển đến công ty ${comp.name}`}
                  />
                ))}
              </div>
            </div>
          );
        })()}
      </section>
    </div>
  );
};
