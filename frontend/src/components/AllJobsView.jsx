import React, { useState, useMemo, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { MarketAnalytics } from './MarketAnalytics';
import { FilterDropdown } from './FilterDropdown';
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
  Building2,
  Truck,
  HeartPulse,
  ShoppingBag,
  Layers,
  Headphones,
  BookOpen,
  ChevronUp,
  Scale,
  Factory,
  UtensilsCrossed,
  Share2,
} from 'lucide-react';
import { JobCardSkeleton } from './JobCardSkeleton';
import { ErrorBoundary } from './ErrorBoundary';
import bannerImage from '../assets/images/Banner.png';

const HERO_TITLE_TEXT = 'Bứt phá sự nghiệp cùng nền tảng tìm việc thế hệ mới';
let hasPlayedInitialHeroIntro = false;
const revealedSectionMemory = new Set();

const companiesList = [
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
];

const SALARY_OPTIONS = [
  { value: '', label: 'Tất cả mức lương' },
  { value: 'under10', label: 'Dưới 10 triệu' },
  { value: '10to20', label: '10 - 20 triệu' },
  { value: '20to35', label: '20 - 35 triệu' },
  { value: 'above35', label: 'Trên 35 triệu' },
  { value: 'negotiable', label: 'Lương thỏa thuận' },
];

const EXPERIENCE_OPTIONS = [
  { value: '', label: 'Tất cả kinh nghiệm' },
  { value: 'intern', label: 'Thực tập sinh / Sinh viên' },
  { value: 'fresher', label: 'Fresher / Chưa có kinh nghiệm' },
  { value: 'junior', label: 'Junior (1 - 2 năm)' },
  { value: 'middle', label: 'Middle (2 - 4 năm)' },
  { value: 'senior', label: 'Senior (5+ năm)' },
  { value: 'lead', label: 'Lead / Quản lý / Trưởng phòng' },
];

const JOBTYPE_OPTIONS = [
  { value: '', label: 'Tất cả hình thức' },
  { value: 'fulltime', label: 'Toàn thời gian (Full-time)' },
  { value: 'parttime', label: 'Bán thời gian (Part-time)' },
  { value: 'remote', label: 'Làm việc từ xa (Remote / Hybrid)' },
  { value: 'freelance', label: 'Freelance / Dự án' },
  { value: 'internship', label: 'Thực tập (Internship)' },
];

export const AllJobsView = ({
  jobs,
  isLoading = false,
  onToggleSave,
  onApply,
  onViewDetails,
  onShare,
  onNavigateNews,
  onTabChange,
  onShowToast,
}) => {
  // Search state & Advanced Filters
  const [keyword, setKeyword] = useState('');
  const [industry, setIndustry] = useState('');
  const [location, setLocation] = useState('');
  const [salaryRange, setSalaryRange] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [jobType, setJobType] = useState('');
  const [isFiltering, setIsFiltering] = useState(false);

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
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const [activeJobTab, setActiveJobTab] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const JOBS_PER_PAGE = 9;
  const [activeCompanyCategory, setActiveCompanyCategory] = useState('all');
  const [companyCarouselIndex, setCompanyCarouselIndex] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [followedCompanyIds, setFollowedCompanyIds] = useState(['c2']);
  const [industrySlideIndex, setIndustrySlideIndex] = useState(0);
  const CATEGORIES_PER_PAGE = 8; // 2 rows x 4 columns = 8 cards per slide

  // Auto-rotating 3D axis carousel animation
  useEffect(() => {
    if (isCarouselPaused) return;
    const interval = setInterval(() => {
      setCompanyCarouselIndex((prev) => (prev + 1) % companiesList.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [isCarouselPaused, companiesList.length]);

  // Antigravity-style Hero H1 typing animation (runs ONLY on initial website load)
  // Uses module-level flag so animation survives tab switches but plays only once per session
  const [typedTitle, setTypedTitle] = useState(() =>
    hasPlayedInitialHeroIntro ? HERO_TITLE_TEXT : ''
  );
  const [isActivelyTyping, setIsActivelyTyping] = useState(false);
  const [isTypingComplete, setIsTypingComplete] = useState(() => hasPlayedInitialHeroIntro);
  const [revealedSections, setRevealedSections] = useState(
    () => new Set(revealedSectionMemory)
  );

  useEffect(() => {
    // Animation already played this session → skip (handles tab switch back)
    if (hasPlayedInitialHeroIntro) {
      return;
    }

    let typingInterval;
    let completeTimer;
    let cancelled = false;

    // 1. Show only Navbar, Banner, and blinking cursor first (~500ms)
    const startTimer = setTimeout(() => {
      if (cancelled) return;
      setIsActivelyTyping(true);
      let currentIndex = 0;

      // 2. Type out the H1 headline smoothly character by character
      typingInterval = setInterval(() => {
        if (cancelled) {
          clearInterval(typingInterval);
          return;
        }
        currentIndex += 1;
        setTypedTitle(HERO_TITLE_TEXT.slice(0, currentIndex));

        if (currentIndex >= HERO_TITLE_TEXT.length) {
          clearInterval(typingInterval);
          setIsActivelyTyping(false);
          // 3. Mark as played ONLY after typing truly finishes
          //    (StrictMode cleanup runs before this point, so flag stays false for remount)
          hasPlayedInitialHeroIntro = true;
          // 4. Reveal Hero elements & activate scroll-reveal observer
          completeTimer = setTimeout(() => {
            if (cancelled) return;
            setIsTypingComplete(true);
          }, 260);
        }
      }, 34);
    }, 500);

    return () => {
      cancelled = true;
      clearTimeout(startTimer);
      if (typingInterval) clearInterval(typingInterval);
      if (completeTimer) clearTimeout(completeTimer);
    };
  }, []);

  // Antigravity-style Scroll Reveal: reveal each section & its child cards as user scrolls down
  useEffect(() => {
    if (!isTypingComplete) return;

    const elements = document.querySelectorAll('[data-scroll-reveal]');
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const key = entry.target.getAttribute('data-scroll-reveal');
            if (key) {
              revealedSectionMemory.add(key);
              setRevealedSections((prev) => {
                if (prev.has(key)) return prev;
                const next = new Set(prev);
                next.add(key);
                return next;
              });
            }
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -55px 0px',
      }
    );

    elements.forEach((el) => {
      const key = el.getAttribute('data-scroll-reveal');
      if (key && !revealedSectionMemory.has(key)) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [isTypingComplete]);

  const isSectionVisible = (key) => isTypingComplete && revealedSections.has(key);

  // Brief skeleton loading state trigger when search, filters or tabs change
  useEffect(() => {
    setIsFiltering(true);
    setCurrentPage(1);
    const timer = setTimeout(() => {
      setIsFiltering(false);
    }, 280);
    return () => clearTimeout(timer);
  }, [
    keyword,
    industry,
    location,
    salaryRange,
    experienceLevel,
    jobType,
    activeJobTab,
  ]);

  const handleResetFilters = () => {
    setKeyword('');
    setIndustry('');
    setLocation('');
    setSalaryRange('');
    setExperienceLevel('');
    setJobType('');
    setCurrentPage(1);
    setOpenDropdown(null);
  };

  const handleToggleFollowCompany = (companyId) => {
    setFollowedCompanyIds((prev) =>
      prev.includes(companyId)
        ? prev.filter((id) => id !== companyId)
        : [...prev, companyId]
    );
  };

  // Comprehensive Categories for "Việc Làm Theo Ngành Nghề"
  const industryCategories = [
    {
      id: 'tech',
      title: 'Công Nghệ',
      fullName: 'Công nghệ thông tin / Phần mềm',
      icon: Code2,
      bgColor: 'bg-blue-50',
      iconColor: 'text-[#2170E4]',
      jobsCount: '2,450+',
    },
    {
      id: 'marketing',
      title: 'Marketing',
      fullName: 'Marketing / Truyền thông / PR',
      icon: Megaphone,
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-500',
      jobsCount: '1,820+',
    },
    {
      id: 'finance',
      title: 'Tài Chính',
      fullName: 'Tài chính / Kế toán / Ngân hàng',
      icon: CreditCard,
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      jobsCount: '1,340+',
    },
    {
      id: 'design',
      title: 'Thiết Kế',
      fullName: 'Thiết kế UI / UX / Đồ họa',
      icon: Palette,
      bgColor: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
      jobsCount: '980+',
    },
    {
      id: 'data',
      title: 'Dữ Liệu',
      fullName: 'Dữ liệu & Trí tuệ nhân tạo (AI)',
      icon: BarChart2,
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600',
      jobsCount: '1,120+',
    },
    {
      id: 'aiml',
      title: 'AI & ML',
      fullName: 'Dữ liệu & Trí tuệ nhân tạo (AI)',
      icon: Bot,
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      jobsCount: '650+',
    },
    {
      id: 'sales',
      title: 'Kinh Doanh',
      fullName: 'Kinh doanh / Bán hàng (Sales)',
      icon: TrendingUp,
      bgColor: 'bg-rose-50',
      iconColor: 'text-rose-600',
      jobsCount: '2,150+',
    },
    {
      id: 'hr',
      title: 'Nhân Sự',
      fullName: 'Nhân sự / Tuyển dụng (HR)',
      icon: Users,
      bgColor: 'bg-teal-50',
      iconColor: 'text-teal-600',
      jobsCount: '860+',
    },
    {
      id: 'product',
      title: 'Sản Phẩm & PM',
      fullName: 'Quản lý dự án (Product / Project)',
      icon: Rocket,
      bgColor: 'bg-cyan-50',
      iconColor: 'text-cyan-600',
      jobsCount: '740+',
    },
    {
      id: 'healthcare',
      title: 'Y Tế & Dược',
      fullName: 'Y tế / Dược phẩm / Chăm sóc sức khỏe',
      icon: HeartPulse,
      bgColor: 'bg-red-50',
      iconColor: 'text-red-500',
      jobsCount: '690+',
    },
    {
      id: 'education',
      title: 'Giáo Dục',
      fullName: 'Giáo dục / Đào tạo / Giảng dạy',
      icon: GraduationCap,
      bgColor: 'bg-sky-50',
      iconColor: 'text-sky-600',
      jobsCount: '580+',
    },
    {
      id: 'realestate',
      title: 'Bất Động Sản',
      fullName: 'Bất động sản / Xây dựng / Kiến trúc',
      icon: Building2,
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-700',
      jobsCount: '920+',
    },
    {
      id: 'logistics',
      title: 'Logistics',
      fullName: 'Logistics / Xuất nhập khẩu / Chuỗi cung ứng',
      icon: Truck,
      bgColor: 'bg-lime-50',
      iconColor: 'text-lime-700',
      jobsCount: '1,050+',
    },
    {
      id: 'service',
      title: 'CSKH & Dịch Vụ',
      fullName: 'Chăm sóc khách hàng / Dịch vụ',
      icon: Headphones,
      bgColor: 'bg-violet-50',
      iconColor: 'text-violet-600',
      jobsCount: '1,420+',
    },
    {
      id: 'hospitality',
      title: 'Khách Sạn & Du Lịch',
      fullName: 'Khách sạn / Nhà hàng / Du lịch',
      icon: UtensilsCrossed,
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-700',
      jobsCount: '780+',
    },
    {
      id: 'manufacturing',
      title: 'Sản Xuất',
      fullName: 'Sản xuất / Vận hành / Kỹ thuật công nghiệp',
      icon: Factory,
      bgColor: 'bg-slate-100',
      iconColor: 'text-slate-700',
      jobsCount: '890+',
    },
    {
      id: 'legal',
      title: 'Luật & Pháp Lý',
      fullName: 'Luật / Pháp chế / Tuân thủ',
      icon: Scale,
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-700',
      jobsCount: '430+',
    },
    {
      id: 'ecommerce',
      title: 'E-Commerce',
      fullName: 'Thương mại điện tử / Bán lẻ',
      icon: ShoppingBag,
      bgColor: 'bg-pink-50',
      iconColor: 'text-pink-600',
      jobsCount: '1,260+',
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
          job.category?.toLowerCase().includes(kw) ||
          job.industry?.toLowerCase().includes(kw);
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
          (industry.includes('Dữ liệu') && (job.category === 'Dữ liệu' || job.category === 'AI & ML')) ||
          (industry.includes('Kinh doanh') && (job.category === 'Kinh doanh' || job.category === 'Sales')) ||
          (industry.includes('Nhân sự') && job.category === 'Nhân sự') ||
          (industry.includes('Sản phẩm') && (job.category === 'Sản phẩm' || job.category === 'Tài chính' || job.title?.toLowerCase().includes('product'))) ||
          (industry.includes('Y tế') && (job.category === 'Y tế' || job.industry?.includes('Y tế'))) ||
          (industry.includes('Giáo dục') && (job.category === 'Giáo dục' || job.industry?.includes('Giáo dục'))) ||
          (industry.includes('Bất động sản') && (job.category === 'Bất động sản' || job.industry?.includes('Bất động sản'))) ||
          (industry.includes('Logistics') && (job.category === 'Logistics' || job.industry?.includes('Logistics'))) ||
          (industry.includes('CSKH') && (job.category === 'Dịch vụ' || job.industry?.includes('khách hàng')));
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

  const totalJobPages = Math.max(1, Math.ceil(displayedJobs.length / JOBS_PER_PAGE));

  // Reset to page 1 whenever any filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [keyword, industry, location, salaryRange, experienceLevel, jobType, activeJobTab]);

  // Ensure currentPage does not exceed totalJobPages
  useEffect(() => {
    if (currentPage > totalJobPages) {
      setCurrentPage(totalJobPages);
    }
  }, [totalJobPages, currentPage]);

  // Paginated jobs for Section 4 (9 jobs per page)
  const paginatedJobs = useMemo(() => {
    const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
    return displayedJobs.slice(startIndex, startIndex + JOBS_PER_PAGE);
  }, [displayedJobs, currentPage]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setOpenDropdown(null);
    smoothScrollToJobs();
  };

  // Custom eased smooth scroll helper to #latest-jobs-section
  const smoothScrollToJobs = () => {
    revealedSectionMemory.add('industries');
    revealedSectionMemory.add('latest-jobs');
    setRevealedSections((prev) => {
      const next = new Set(prev);
      next.add('industries');
      next.add('latest-jobs');
      return next;
    });

    const targetEl = document.getElementById('latest-jobs-section');
    if (!targetEl) return;

    const headerOffset = 84;
    const startY = window.scrollY;
    const rect = targetEl.getBoundingClientRect();
    const targetY = Math.max(0, rect.top + startY - headerOffset);
    const distance = targetY - startY;

    // Skip if already very close to target
    if (Math.abs(distance) < 24) return;

    const duration = Math.min(720, Math.max(420, Math.abs(distance) * 0.45));
    let startTime = null;

    // Ease-out-quart curve for a light, modern deceleration
    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);

      window.scrollTo(0, startY + distance * easedProgress);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  };

  return (
    <div className="bg-[#FAF9FF] flex flex-col w-full">
      {/* 1. HERO SEARCH SECTION WITH BACKGROUND IMAGE */}
      <section
        id="main-search-hero-section"
        className="relative pt-12 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 text-center bg-slate-900 border-b border-slate-200/50 shadow-xs z-10"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <img
            id="jobcentral-search-bg-image"
            src={bannerImage}
            alt="JobCentral Background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <h1 className="text-2xl sm:text-4xl lg:text-[44px] font-extrabold text-[#ECFEFF] tracking-tight leading-tight text-balance min-h-[2.5em] sm:min-h-[1.3em] flex items-center justify-center flex-wrap [text-shadow:0_2px_6px_rgba(0,0,0,0.92),0_4px_20px_rgba(2,6,23,0.85),0_0_30px_rgba(56,189,248,0.9)]">
            <span>
              {typedTitle}
              <span
                aria-hidden="true"
                className={`inline-block w-[3px] sm:w-[4px] h-[0.88em] ml-1.5 align-middle rounded-full bg-[#38BDF8] shadow-[0_0_16px_#38BDF8,0_0_6px_#ffffff] ${isActivelyTyping ? 'opacity-100' : 'animate-antigravity-cursor'
                  }`}
              />
            </span>
          </h1>
          <p
            className={`mt-3 text-slate-200 text-sm sm:text-base font-medium max-w-xl mx-auto leading-relaxed drop-shadow-xs transition-all duration-700 ease-out ${isTypingComplete
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4 pointer-events-none select-none'
              }`}
          >
            Tìm kiếm liền tay — Nhận ngay công việc mơ ước
            <br />
            Hơn <span className="text-slate-200 font-bold">10,000+</span> việc làm hấp dẫn đang chờ bạn ứng tuyển
          </p>

          {/* Enhanced Floating Search Bar with Multiple Options */}
          <div
            ref={searchFormRef}
            className={`mt-8 max-w-4xl mx-auto text-left relative z-20 transition-all duration-700 delay-150 ease-out ${isTypingComplete
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-5 scale-[0.98] pointer-events-none select-none'
              }`}
          >
            <form
              onSubmit={handleSearchSubmit}
              className="bg-white/95 backdrop-blur-md rounded-3xl md:rounded-full border border-white/40 p-1.5 sm:p-2 shadow-2xl flex flex-col md:flex-row items-center gap-1.5 ring-4 ring-black/15 relative z-30"
            >
              {/* 1. Keyword Input */}
              <div className="flex items-center space-x-2.5 px-4 py-2.5 flex-1 w-full text-left rounded-full hover:bg-slate-100 focus-within:bg-slate-100 transition-colors">
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
                    className="text-slate-400 hover:text-slate-800 hover:bg-slate-200/80 p-1 rounded-full transition-colors cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="hidden md:block w-px h-7 bg-slate-200 shrink-0" />

              {/* Location Dropdown */}
              <div className="relative flex-1 w-full" id="hero-location-dropdown-container">
                <button
                  id="hero-location-select-btn"
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setOpenDropdown((prev) => (prev === 'location' ? null : 'location'));
                  }}
                  className={`flex items-center justify-between space-x-2.5 px-4 py-2.5 w-full text-left cursor-pointer rounded-full transition-colors text-slate-700 hover:text-slate-900 ${openDropdown === 'location' ? 'bg-slate-100 ring-2 ring-[#2170E4]/30' : 'hover:bg-slate-100'
                    }`}
                  aria-expanded={openDropdown === 'location'}
                  aria-haspopup="listbox"
                >
                  <div className="flex items-center space-x-2.5 truncate">
                    <MapPin className="w-4 h-4 text-[#2170E4] shrink-0" />
                    <span className={`text-sm truncate ${location ? 'font-semibold text-slate-900' : 'font-medium text-slate-700'}`}>
                      {location || 'Địa điểm'}
                    </span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${openDropdown === 'location' ? 'rotate-180 text-[#2170E4]' : ''}`} />
                </button>

                {openDropdown === 'location' && (
                  <div
                    id="hero-location-menu"
                    className="absolute top-full left-0 mt-2 w-full sm:w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-50 text-left animate-in fade-in slide-in-from-top-2 duration-150"
                    onClick={(e) => e.stopPropagation()}
                    role="listbox"
                  >
                    <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1.5 flex items-center justify-between border-b border-slate-100 pb-1 mb-1">
                      <span>Khu vực làm việc</span>
                      {location && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setLocation('');
                            setOpenDropdown(null);
                          }}
                          className="text-[11px] text-[#2170E4] hover:underline font-semibold cursor-pointer"
                        >
                          Xóa chọn
                        </button>
                      )}
                    </div>
                    <div className="max-h-60 overflow-y-auto overscroll-contain space-y-0.5">
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
                            onClick={(e) => {
                              e.stopPropagation();
                              setLocation(item === 'Tất cả địa điểm' ? '' : item);
                              setOpenDropdown(null);
                            }}
                            className={`w-full text-left px-3 py-2 text-xs rounded-xl transition-colors cursor-pointer flex items-center justify-between ${isSelected
                              ? 'bg-blue-50 text-[#2170E4] font-bold'
                              : 'text-slate-700 hover:bg-slate-100 font-medium'
                              }`}
                            role="option"
                            aria-selected={isSelected}
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
                className={`p-2.5 rounded-full border transition-colors cursor-pointer shrink-0 ${showAdvancedFilters || salaryRange || experienceLevel || jobType
                  ? 'border-slate-300 bg-slate-200/80 text-slate-950 hover:bg-slate-200'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 hover:border-slate-300'
                  }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>

              {/* Search Button */}
              <button
                type="submit"
                className="w-full md:w-auto px-7 py-2.5 sm:py-3 bg-[#2170E4] hover:bg-[#1a5bbd] text-white font-semibold text-sm rounded-full transition-colors cursor-pointer shrink-0"
              >
                Tìm kiếm
              </button>
            </form>

            {/* Advanced Filter Row (Salary, Experience, Job Format) */}
            {showAdvancedFilters && (
              <div className="relative z-20 mt-2.5 p-3.5 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-lg grid grid-cols-1 sm:grid-cols-3 gap-3 animate-in fade-in slide-in-from-top-1 duration-150">
                {/* Option 1: Salary Range */}
                <div className="relative p-2 rounded-xl hover:bg-slate-100 transition-colors">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <span>Mức lương</span>
                  </label>
                  <FilterDropdown
                    id="salary"
                    value={salaryRange}
                    onChange={setSalaryRange}
                    options={SALARY_OPTIONS}
                    openDropdown={openDropdown}
                    setOpenDropdown={setOpenDropdown}
                  />
                </div>

                {/* Option 2: Experience Level */}
                <div className="relative p-2 rounded-xl hover:bg-slate-100 transition-colors">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <span>Kinh nghiệm</span>
                  </label>
                  <FilterDropdown
                    id="experience"
                    value={experienceLevel}
                    onChange={setExperienceLevel}
                    options={EXPERIENCE_OPTIONS}
                    openDropdown={openDropdown}
                    setOpenDropdown={setOpenDropdown}
                  />
                </div>

                {/* Option 3: Work Format */}
                <div className="relative p-2 rounded-xl hover:bg-slate-100 transition-colors">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <span>Hình thức</span>
                  </label>
                  <FilterDropdown
                    id="jobType"
                    value={jobType}
                    onChange={setJobType}
                    options={JOBTYPE_OPTIONS}
                    openDropdown={openDropdown}
                    setOpenDropdown={setOpenDropdown}
                  />
                </div>
              </div>
            )}

            {/* Quick Popular Keywords & Suggested Tags */}
          </div>
        </div>
      </section>

      {/* 2. VIỆC LÀM THEO NGÀNH NGHỀ (ĐA DẠNG NGHỀ NGHIỆP) */}
      <section
        data-scroll-reveal="industries"
        className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isSectionVisible('industries')
          ? 'opacity-100 translate-y-0 scale-100 blur-0'
          : 'opacity-0 translate-y-10 scale-[0.98] blur-[2px] pointer-events-none select-none'
          }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div className="text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Top ngành nghề <span className="text-[#2170E4]">nổi bật</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 font-medium">
              Bạn muốn tìm việc mới? Khám phá ngay các ngành nghề hàng đầu đang được tuyển dụng nhiều nhất
            </p>

            {industry && (
              <div className="mt-3 inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 border border-blue-200 rounded-full text-xs text-[#2170E4] font-medium">
                <span>Đang lọc: <strong>{industry}</strong></span>
                <button
                  type="button"
                  onClick={() => setIndustry('')}
                  className="hover:bg-blue-200/60 p-0.5 rounded-full cursor-pointer transition-colors"
                  title="Bỏ lọc ngành nghề"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Navigation carousel arrows like in the reference layout */}
          {Math.ceil(industryCategories.length / CATEGORIES_PER_PAGE) > 1 && (
            <div className="flex items-center space-x-2 shrink-0 self-end sm:self-auto">
              <button
                type="button"
                onClick={() => setIndustrySlideIndex((prev) => Math.max(0, prev - 1))}
                disabled={industrySlideIndex === 0}
                title="Trang ngành nghề trước"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-2xs cursor-pointer active:scale-95"
              >
                <ChevronLeft className="w-5 h-5 stroke-[2]" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setIndustrySlideIndex((prev) =>
                    Math.min(Math.ceil(industryCategories.length / CATEGORIES_PER_PAGE) - 1, prev + 1)
                  )
                }
                disabled={
                  industrySlideIndex >= Math.ceil(industryCategories.length / CATEGORIES_PER_PAGE) - 1
                }
                title="Trang ngành nghề tiếp theo"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-2xs cursor-pointer active:scale-95"
              >
                <ChevronRight className="w-5 h-5 stroke-[2]" />
              </button>
            </div>
          )}
        </div>

        {/* 4 Cards Per Row Grid with Balanced Spacing and Proportions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {industryCategories
            .slice(
              industrySlideIndex * CATEGORIES_PER_PAGE,
              industrySlideIndex * CATEGORIES_PER_PAGE + CATEGORIES_PER_PAGE
            )
            .map((cat, idx) => {
              const IconComp = cat.icon;
              const isCategoryActive =
                industry === cat.title ||
                industry === cat.fullName ||
                (industry && cat.title.toLowerCase().includes(industry.toLowerCase())) ||
                (industry && industry.toLowerCase().includes(cat.title.toLowerCase()));

              return (
                <button
                  key={cat.id}
                  type="button"
                  style={{
                    transitionDelay: isSectionVisible('industries') ? `${idx * 40}ms` : '0ms',
                  }}
                  onClick={() => {
                    if (isCategoryActive) {
                      setIndustry('');
                    } else {
                      setIndustry(cat.title);
                      smoothScrollToJobs();
                    }
                  }}
                  className={`relative rounded-2xl p-4 sm:p-5 min-h-[140px] sm:min-h-[150px] flex flex-col items-center justify-center space-y-2.5 transition-all duration-300 ease-out cursor-pointer group text-center ${isSectionVisible('industries')
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-6'
                    } ${isCategoryActive
                      ? 'bg-blue-50/90 border-2 border-[#2170E4] shadow-sm'
                      : 'bg-white hover:bg-white border border-slate-200/90 shadow-2xs hover:border-[#EFF6FF] hover:ring-4 hover:ring-[#EFF6FF] hover:shadow-[0_0_20px_6px_#EFF6FF,0_6px_20px_rgba(33,112,228,0.06)] hover:-translate-y-0.5'
                    }`}
                >
                  {isCategoryActive && (
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#2170E4]" />
                  )}

                  {/* Balanced Icon Box */}
                  <div
                    className={`w-12 h-12 sm:w-13 sm:h-13 rounded-xl ${cat.bgColor} flex items-center justify-center ${cat.iconColor} transition-transform duration-300 group-hover:scale-105 shadow-2xs`}
                  >
                    <IconComp className="w-6 h-6 sm:w-6.5 sm:h-6.5 stroke-[2]" />
                  </div>

                  {/* Title */}
                  <h3
                    className={`text-xs sm:text-sm font-bold leading-snug line-clamp-1 transition-colors ${isCategoryActive
                      ? 'text-[#2170E4]'
                      : 'text-slate-800 group-hover:text-[#2170E4]'
                      }`}
                  >
                    {cat.title}
                  </h3>

                  {/* Jobs Count */}
                  <span className="text-[11px] sm:text-xs font-medium text-slate-500 group-hover:text-slate-600 leading-none">
                    {cat.jobsCount} việc làm
                  </span>
                </button>
              );
            })}
        </div>
      </section>

      {/* 4. VIỆC LÀM MỚI NHẤT */}
      <section
        id="latest-jobs-section"
        data-scroll-reveal="latest-jobs"
        className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-14 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isSectionVisible('latest-jobs')
          ? 'opacity-100 translate-y-0 scale-100 blur-0'
          : 'opacity-0 translate-y-12 scale-[0.98] blur-[2px] pointer-events-none select-none'
          }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 id="latest-jobs-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight text-left">
            Việc Làm <span className="text-[#2170E4]">Mới Nhất</span>
          </h2>

          {/* Filter Tabs - Pill Vibe */}
          <div className="inline-flex p-1 bg-slate-100/90 rounded-full border border-slate-200/80 max-w-full overflow-x-auto no-scrollbar shadow-2xs">
            <button
              type="button"
              id="tab-job-featured"
              onClick={() => setActiveJobTab('featured')}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${activeJobTab === 'featured'
                ? 'bg-[#2170E4] text-white shadow-sm shadow-blue-500/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
            >
              Việc làm nổi bật
            </button>
            <button
              type="button"
              id="tab-job-urgent"
              onClick={() => setActiveJobTab('urgent')}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${activeJobTab === 'urgent'
                ? 'bg-[#2170E4] text-white shadow-sm shadow-blue-500/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
            >
              Việc Làm Tuyển gấp
            </button>
            <button
              type="button"
              id="tab-job-intern"
              onClick={() => setActiveJobTab('intern')}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${activeJobTab === 'intern'
                ? 'bg-[#2170E4] text-white shadow-sm shadow-blue-500/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
            >
              Việc Làm Thực tập sinh
            </button>
          </div>
        </div>

        {/* Job Cards Grid with Skeleton Loading & Error Boundary */}
        <ErrorBoundary
          title="Không thể tải danh sách việc làm"
          message="Đã có lỗi xảy ra khi xử lý dữ liệu việc làm. Vui lòng nhấn nút thử lại bên dưới hoặc đặt lại bộ lọc tìm kiếm."
          onReset={handleResetFilters}
        >
          {isLoading || isFiltering ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-7 text-left">
              <JobCardSkeleton count={9} />
            </div>
          ) : displayedJobs.length === 0 ? (
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
                className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#2170E4] text-white text-xs font-semibold rounded-full hover:bg-[#1a5bbd] transition-all cursor-pointer shadow-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Đặt lại bộ lọc tìm kiếm</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-7 text-left">
              {paginatedJobs.map((job, idx) => (
                <div
                  key={job.id}
                  id={`alljobs-card-${job.id}`}
                  style={{
                    transitionDelay: isSectionVisible('latest-jobs') ? `${idx * 65}ms` : '0ms',
                  }}
                  onClick={() => onViewDetails(job)}
                  className={`bg-white hover:bg-white rounded-2xl border border-slate-200/90 hover:border-[#2170E4] hover:shadow-md p-5 transition-all duration-300 ease-out flex flex-col justify-between space-y-4 relative group cursor-pointer ${isSectionVisible('latest-jobs')
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
                    }`}
                >
                  {/* Header Row: Company Logo Placeholder + Title + Company + Bookmark */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start space-x-3.5 flex-1 min-w-0">
                      <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200 overflow-hidden flex items-center justify-center text-[#2170E4] font-bold text-sm shrink-0">
                        {job.companyLogo ? (
                          <img
                            src={job.companyLogo}
                            alt={job.company}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Building2 className="w-5 h-5 text-[#2170E4]" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3
                          onClick={(e) => {
                            e.stopPropagation();
                            onViewDetails(job);
                          }}
                          className="text-sm font-bold text-slate-900 truncate group-hover:text-[#2170E4] cursor-pointer transition-colors"
                        >
                          {job.title}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
                          {job.company}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons: Share + Bookmark */}
                    <div className="flex items-center space-x-1 shrink-0">
                      <button
                        type="button"
                        id={`share-btn-${job.id}`}
                        onClick={(e) => {
                          if (e) e.stopPropagation();
                          if (onShare) onShare(job, e);
                        }}
                        className="p-2 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-300/70 transition-colors cursor-pointer"
                        title="Chia sẻ việc làm"
                        aria-label="Chia sẻ việc làm"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        id={`bookmark-btn-${job.id}`}
                        onClick={(e) => onToggleSave(job.id, e)}
                        className={`p-2 rounded-full transition-colors cursor-pointer ${job.isSaved
                          ? 'bg-slate-100 hover:bg-slate-200 text-amber-500'
                          : 'text-slate-400 hover:text-amber-500 hover:bg-slate-100'
                          }`}
                        title={job.isSaved ? 'Bỏ lưu việc làm' : 'Lưu việc làm'}
                        aria-label="Lưu việc làm"
                      >
                        <Bookmark
                          className={`w-4 h-4 ${job.isSaved ? 'text-amber-500 fill-amber-400' : ''
                            }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Tags Row */}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-500 font-medium">
                    <span className="text-xs text-slate-500 font-medium">
                      {job.jobType || 'Full-time'}
                    </span>
                    <span className="text-xs text-slate-500 font-medium before:content-['•'] before:mr-2 before:text-slate-300">
                      {job.salary}
                    </span>
                    <span className="text-xs text-slate-500 font-medium before:content-['•'] before:mr-2 before:text-slate-300">
                      {job.location?.split(',').pop()?.trim() || job.location}
                    </span>
                  </div>

                  {/* Footer Row: Posted Time */}
                  <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 group-hover:border-slate-200 text-xs transition-colors">
                    <span className="text-slate-400 group-hover:text-slate-600 font-medium">
                      {job.postedTime || 'Mới cập nhật'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Phân trang động dựa trên tổng số trang thực tế */}
          {displayedJobs.length > 0 && totalJobPages > 1 && (
            <div
              id="jobs-pagination-controls"
              className="flex items-center justify-center space-x-1 mt-10"
            >
              {/* Nút Trang trước */}
              <button
                type="button"
                id="jobs-pagination-prev"
                onClick={() => {
                  if (currentPage > 1) {
                    setCurrentPage((p) => p - 1);
                    smoothScrollToJobs();
                  }
                }}
                disabled={currentPage === 1}
                className="w-9 h-9 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-200/80 disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer transition-colors"
                title="Trang trước"
                aria-label="Trang trước"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Các chỉ mục trang động */}
              {Array.from({ length: totalJobPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  id={`jobs-pagination-page-${pageNum}`}
                  onClick={() => {
                    setCurrentPage(pageNum);
                    smoothScrollToJobs();
                  }}
                  className={`px-3 py-1 text-sm rounded-lg cursor-pointer select-none transition-colors ${currentPage === pageNum
                    ? 'text-[#2170E4] font-extrabold text-base bg-blue-50'
                    : 'text-slate-500 hover:text-[#2170E4] hover:bg-slate-100 font-medium'
                    }`}
                >
                  {pageNum}
                </button>
              ))}

              {/* Nút Trang sau */}
              <button
                type="button"
                id="jobs-pagination-next"
                onClick={() => {
                  if (currentPage < totalJobPages) {
                    setCurrentPage((p) => p + 1);
                    smoothScrollToJobs();
                  }
                }}
                disabled={currentPage === totalJobPages}
                className="w-9 h-9 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-200/80 disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer transition-colors"
                title="Trang sau"
                aria-label="Trang sau"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </ErrorBoundary>
      </section>

      {/* 5. PHÂN TÍCH THỊ TRƯỜNG & CHUYÊN SÂU */}
      <section
        data-scroll-reveal="market-trends"
        className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-14 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isSectionVisible('market-trends')
          ? 'opacity-100 translate-y-0 scale-100 blur-0'
          : 'opacity-0 translate-y-12 scale-[0.98] blur-[2px] pointer-events-none select-none'
          }`}
      >
        <MarketAnalytics />
      </section>

      {/* 7. KẾT NỐI VỚI NHỮNG CÔNG TY HÀNG ĐẦU */}
      <section
        data-scroll-reveal="top-companies"
        className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-14 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isSectionVisible('top-companies')
          ? 'opacity-100 translate-y-0 scale-100 blur-0'
          : 'opacity-0 translate-y-12 scale-[0.98] blur-[2px] pointer-events-none select-none'
          }`}
      >
        <div className="flex flex-col items-center gap-4 mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight text-center">
            Kết Nối Với Những Công Ty <span className="text-[#2170E4]">Hàng Đầu</span>
          </h2>

          {/* Category Pills */}
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 p-1 bg-slate-100/90 rounded-full border border-slate-200/80 max-w-full shadow-2xs">
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
                className={`px-4.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${activeCompanyCategory === tab.id
                  ? 'bg-[#2170E4] text-white shadow-xs shadow-blue-500/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
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
          if (total === 0) return null;
          const centerIdx = ((companyCarouselIndex % total) + total) % total;
          const leftIdx = (centerIdx - 1 + total) % total;
          const rightIdx = (centerIdx + 1) % total;

          const leftCompany = filtered[leftIdx] || filtered[0];
          const centerCompany = filtered[centerIdx] || filtered[0];
          const rightCompany = filtered[rightIdx] || filtered[0];

          if (!centerCompany) return null;

          return (
            <div
              className="relative mt-8 flex flex-col items-center"
              onMouseEnter={() => setIsCarouselPaused(true)}
              onMouseLeave={() => setIsCarouselPaused(false)}
            >
              {/* 3D Axial Stage */}
              <div
                className="relative w-full max-w-4xl py-4 flex items-center justify-center"
                style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full items-center">
                  {/* Left Card - Angled on Y Axis */}
                  <motion.div
                    key={`left-${leftCompany.id}`}
                    initial={{ opacity: 0.4, rotateY: 26, scale: 0.88 }}
                    animate={{ opacity: 0.72, rotateY: 26, scale: 0.88, zIndex: 10 }}
                    transition={{ type: 'spring', stiffness: 180, damping: 26 }}
                    onClick={() => setCompanyCarouselIndex(leftIdx)}
                    className="hidden md:flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-200/90 p-6 text-center shadow-md cursor-pointer select-none"
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
                    initial={{ opacity: 0.8, scale: 1.03, rotateY: 0 }}
                    animate={{ opacity: 1, scale: 1.03, rotateY: 0, zIndex: 25 }}
                    transition={{ type: 'spring', stiffness: 180, damping: 26 }}
                    className="bg-gradient-to-br from-[#1d63cb] to-[#2170E4] rounded-2xl p-6 sm:p-7 text-white text-center shadow-xl shadow-blue-500/20 relative overflow-hidden border border-blue-400/30"
                    style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
                  >
                    {/* Floating glowing background accents */}
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />

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
                        onClick={() => {
                          setKeyword(centerCompany.name.split(' ')[0]);
                          smoothScrollToJobs();
                        }}
                        className="w-full py-2.5 bg-white text-[#1d63cb] hover:bg-slate-200 active:scale-[0.98] font-semibold rounded-full text-xs shadow-xs transition-colors cursor-pointer"
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
                            className={`w-full py-2.5 flex items-center justify-center space-x-1.5 font-semibold rounded-full text-xs transition-colors cursor-pointer select-none active:scale-[0.98] ${isFollowed
                              ? 'bg-slate-700/80 hover:bg-slate-700 text-white shadow-xs'
                              : 'bg-white/10 hover:bg-white/20 hover:text-white border border-white/25 text-white'
                              }`}
                          >
                            {isFollowed ? (
                              <>
                                <Check className="w-4 h-4 stroke-[2.5] text-amber-400" />
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
                    initial={{ opacity: 0.4, rotateY: -26, scale: 0.88 }}
                    animate={{ opacity: 0.72, rotateY: -26, scale: 0.88, zIndex: 10 }}
                    transition={{ type: 'spring', stiffness: 180, damping: 26 }}
                    onClick={() => setCompanyCarouselIndex(rightIdx)}
                    className="hidden md:flex flex-col items-center justify-center bg-white rounded-2xl border border-slate-200/90 p-6 text-center shadow-md cursor-pointer select-none"
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

              {/* Navigation Indicators / Dots for 3D Axis Rotation */}
              <div className="flex items-center space-x-2 mt-4">
                {filtered.map((comp, idx) => (
                  <button
                    key={comp.id}
                    type="button"
                    onClick={() => setCompanyCarouselIndex(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${centerIdx === idx
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

      {/* FOOTER */}
      <footer className="w-full bg-surface-container-low pt-space-xl pb-space-lg">
        <div className="max-w-7xl mx-auto px-margin">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-xl pb-space-xl">
            {/* Column 1: Brand & Contact */}
            <div className="flex flex-col gap-space-md">
              <div className="flex items-center">
                <span className="font-headline-md text-headline-md text-primary tracking-tight">
                  JobCentral
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Nền tảng kết nối nhân tài và cơ hội việc làm hàng đầu tại Việt Nam. Xây dựng sự nghiệp vượt trội cùng công nghệ tối ưu hóa tuyển dụng.
              </p>
              <div className="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[18px] text-primary">
                    mail
                  </span>
                  <span>contact@jobcentral.vn</span>
                </div>
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[18px] text-primary">
                    call
                  </span>
                  <span>(+84) 28 7300 8888</span>
                </div>
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[18px] text-primary">
                    location_on
                  </span>
                  <span>
                    Tòa nhà Pearl Plaza, Quận Bình Thạnh, TP. Hồ Chí Minh
                  </span>
                </div>
              </div>
            </div>

            {/* Column 2: Về JobCentral */}
            <div className="flex flex-col gap-space-md">
              <span className="font-headline-sm text-headline-sm text-on-surface">
                Về JobCentral
              </span>
              <div className="flex flex-col gap-space-sm">
                <button
                  type="button"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }
                  className="text-left font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                >
                  Giới thiệu chung
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (onTabChange) onTabChange('news');
                    else if (onNavigateNews) onNavigateNews();
                  }}
                  className="text-left font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                >
                  Tin tức tuyển dụng
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onShowToast &&
                    onShowToast('Liên hệ hợp tác: contact@jobcentral.vn', 'info')
                  }
                  className="text-left font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                >
                  Liên hệ hợp tác
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onShowToast &&
                    onShowToast('Chính sách bảo mật thông tin người dùng JobCentral', 'info')
                  }
                  className="text-left font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                >
                  Chính sách bảo mật
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onShowToast &&
                    onShowToast('Điều khoản sử dụng dịch vụ JobCentral', 'info')
                  }
                  className="text-left font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                >
                  Điều khoản sử dụng
                </button>
              </div>
            </div>

            {/* Column 3: Dành cho ứng viên */}
            <div className="flex flex-col gap-space-md">
              <span className="font-headline-sm text-headline-sm text-on-surface">
                Dành cho ứng viên
              </span>
              <div className="flex flex-col gap-space-sm">
                <button
                  type="button"
                  onClick={() => onTabChange && onTabChange('search')}
                  className="text-left font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                >
                  Tìm kiếm việc làm
                </button>
                <button
                  type="button"
                  onClick={() => onTabChange && onTabChange('cv-builder')}
                  className="text-left font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                >
                  Tạo CV trực tuyến
                </button>
                <button
                  type="button"
                  onClick={() => onTabChange && onTabChange('tools')}
                  className="text-left font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                >
                  Tính lương Gross - Net
                </button>
                <button
                  type="button"
                  onClick={() => onTabChange && onTabChange('companies')}
                  className="text-left font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                >
                  Khám phá doanh nghiệp
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (onTabChange) onTabChange('news');
                    else if (onNavigateNews) onNavigateNews();
                  }}
                  className="text-left font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                >
                  Cẩm nang nghề nghiệp
                </button>
              </div>
            </div>

            {/* Column 4: Dành cho nhà tuyển dụng */}
            <div className="flex flex-col gap-space-md">
              <span className="font-headline-sm text-headline-sm text-on-surface">
                Dành cho nhà tuyển dụng
              </span>
              <div className="flex flex-col gap-space-sm">
                <button
                  type="button"
                  onClick={() =>
                    onShowToast &&
                    onShowToast('Đang chuyển đến Cổng Đăng Tin Tuyển Dụng', 'info')
                  }
                  className="text-left font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                >
                  Đăng tin tuyển dụng
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onShowToast &&
                    onShowToast('Đang mở kho Hồ sơ nhân tài JobCentral', 'info')
                  }
                  className="text-left font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                >
                  Tìm kiếm hồ sơ nhân tài
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onShowToast &&
                    onShowToast('Giải pháp Employer Branding dành cho doanh nghiệp', 'info')
                  }
                  className="text-left font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                >
                  Giải pháp thương hiệu nhà tuyển dụng
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onShowToast &&
                    onShowToast('Bảng giá dịch vụ tuyển dụng doanh nghiệp 2024', 'info')
                  }
                  className="text-left font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                >
                  Bảng giá dịch vụ
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onShowToast &&
                    onShowToast('Đang mở Cổng Nhà Tuyển Dụng JobCentral', 'info')
                  }
                  className="text-left font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                >
                  Cổng nhà tuyển dụng
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Copyright Bar */}
          <div className="pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md">
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              © 2024 JobCentral JSC. Toàn bộ bản quyền được bảo lưu.
            </span>
            <div className="flex items-center gap-space-lg">
              <button
                type="button"
                onClick={() =>
                  onShowToast &&
                  onShowToast('Quy chế hoạt động sàn giao dịch việc làm JobCentral', 'info')
                }
                className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
              >
                Quy chế hoạt động
              </button>
              <button
                type="button"
                onClick={() =>
                  onShowToast &&
                  onShowToast('Quy trình tiếp nhận và giải quyết khiếu nại', 'info')
                }
                className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
              >
                Giải quyết khiếu nại
              </button>
              <button
                type="button"
                onClick={() =>
                  onShowToast &&
                  onShowToast('Trung tâm trợ giúp ứng viên & nhà tuyển dụng 24/7', 'info')
                }
                className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
              >
                Trung tâm trợ giúp
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
