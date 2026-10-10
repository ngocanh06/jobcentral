import React, { useState, useEffect, useMemo, useRef } from 'react';

const DEFAULT_CORPORATE_COMPANIES = [
  {
    id: 'c2',
    name: 'VNG Corporation',
    coverImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAkDPP66YNjzGLU47-Bp2VqWA1BFe0qcZAofRioa_rrDx9LfM732tZZBmR9gyhwPXLHAyd2QLD0G4mIgyRA6r1aj7hvwgyyeeoUYc1MImtFjCfM57gkt8ipUCcdvunCX8A1xPnQgXHQmvwAohNYNbcQ8h_fcuOkusR7ITrGOmL57JCs5OsGjMg9XAvLbLWxC1ow8YAg9osLtWRNXPX2AtvQVHc_0gF1BvSuJQFzddKi4jH8s3b6_Cj7',
    logo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAkDPP66YNjzGLU47-Bp2VqWA1BFe0qcZAofRioa_rrDx9LfM732tZZBmR9gyhwPXLHAyd2QLD0G4mIgyRA6r1aj7hvwgyyeeoUYc1MImtFjCfM57gkt8ipUCcdvunCX8A1xPnQgXHQmvwAohNYNbcQ8h_fcuOkusR7ITrGOmL57JCs5OsGjMg9XAvLbLWxC1ow8YAg9osLtWRNXPX2AtvQVHc_0gF1BvSuJQFzddKi4jH8s3b6_Cj7',
    altText:
      'A modern tech campus interior with glass walls, ambient soft blue LED illumination, ergonomic desks, and indoor green plants representing VNG high-tech workplace in Vietnam.',
    badgeText: 'Top Tech',
    badgeClass: 'bg-secondary-container text-on-secondary-container',
    avatarCode: 'VNG',
    avatarBgClass: 'bg-primary-container text-on-primary font-display-lg text-headline-md',
    rating: 4.8,
    reviewsCount: 240,
    industry: 'Internet & Game Software • Kỳ lân công nghệ',
    employees: '2.000+ nhân sự',
    location: 'Quận 7, TP. HCM',
    openJobsCount: 18,
    jobsLabel: '18 việc làm đang tuyển',
    industryFilter: 'it',
    modelFilter: 'product',
    sizeFilter: '2000+',
    cityFilter: 'TP. HCM',
    quickTags: ['featured', 'top-tech', 'benefits', 'international'],
  },
  {
    id: 'c1',
    name: 'TechFlow Solutions',
    coverImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC1iQ9CokCCY2EDiI4DuLiymIYqgnzVtbC1Jz-fpyzaHx0JyXbjiToH6sbcYWzyEhMs1O3zhTNUMSLnwkZvlbdLXt4p9AUHMIJFHZVJuHyNQApBJrc0M2Ly-B6nEumGtxDPLKm8LxGM6RBbcXYf6ikXYdFXq4B2uvtF7bsGXv9rmWBEICdF7wIGe48mqeSHZt4gvyANvsvcsysSD07sw1cgLieF7i7dvpTBwK7o5EBIvUvYqfZYa79K',
    logo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC1iQ9CokCCY2EDiI4DuLiymIYqgnzVtbC1Jz-fpyzaHx0JyXbjiToH6sbcYWzyEhMs1O3zhTNUMSLnwkZvlbdLXt4p9AUHMIJFHZVJuHyNQApBJrc0M2Ly-B6nEumGtxDPLKm8LxGM6RBbcXYf6ikXYdFXq4B2uvtF7bsGXv9rmWBEICdF7wIGe48mqeSHZt4gvyANvsvcsysSD07sw1cgLieF7i7dvpTBwK7o5EBIvUvYqfZYa79K',
    altText:
      'A clean, collaborative SaaS development studio with wide glass windows overlooking Saigon skyline, developers engaged in whiteboard product design and code discussion.',
    badgeText: 'Hot Culture',
    badgeClass: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
    avatarCode: 'TF',
    avatarBgClass: 'bg-surface-tint text-on-primary font-headline-lg',
    rating: 4.9,
    reviewsCount: 85,
    industry: 'SaaS & Enterprise AI Solutions',
    employees: '150 - 300 nhân sự',
    location: 'Quận 1, TP. HCM',
    openJobsCount: 8,
    jobsLabel: '8 vị trí đang tuyển',
    industryFilter: 'it',
    modelFilter: 'product',
    sizeFilter: '50-300',
    cityFilter: 'TP. HCM',
    quickTags: ['featured', 'top-tech', 'benefits', 'international'],
  },
  {
    id: 'c4',
    name: 'Nexus AI Lab',
    coverImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCU4vADMTfmdOs_yA71bh9VddfqmK13lLdUMHDZcmh0ZMcFtzeubdP2nEw7dTRr-K5ZCPqu-29nl0TfbpYR5xUt4MN9EHVrat0nIZN8wkTaFbnrSYwnnCd3nAjjMSCnsUkbZgkigsR1MMVhAK-v9YRHYBfLLzfPXq1CSRGBScbPyjRD51X--QprnBfDypF89V57shpHTarGgLmjQDsYv_U4WRdsZa4FA6K2-h-jADIpOEmslhplLV2N',
    logo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCU4vADMTfmdOs_yA71bh9VddfqmK13lLdUMHDZcmh0ZMcFtzeubdP2nEw7dTRr-K5ZCPqu-29nl0TfbpYR5xUt4MN9EHVrat0nIZN8wkTaFbnrSYwnnCd3nAjjMSCnsUkbZgkigsR1MMVhAK-v9YRHYBfLLzfPXq1CSRGBScbPyjRD51X--QprnBfDypF89V57shpHTarGgLmjQDsYv_U4WRdsZa4FA6K2-h-jADIpOEmslhplLV2N',
    altText:
      'Futuristic artificial intelligence laboratory in Hanoi with holographic server visual displays, modern clean minimal glass partitions and engineering workbenches.',
    badgeText: null,
    badgeClass: '',
    avatarCode: 'NX',
    avatarBgClass: 'bg-inverse-surface text-on-primary font-headline-lg',
    rating: 4.7,
    reviewsCount: 62,
    industry: 'DeepTech / LLM Research & Computer Vision',
    employees: '50 - 100 nhân sự',
    location: 'Cầu Giấy, Hà Nội',
    openJobsCount: 12,
    jobsLabel: '12 vị trí đang tuyển',
    industryFilter: 'it',
    modelFilter: 'product',
    sizeFilter: '50-300',
    cityFilter: 'Hà Nội',
    quickTags: ['featured', 'top-tech', 'benefits', 'urgent'],
  },
  {
    id: 'c3',
    name: 'FinX Digital Bank',
    coverImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDrqLP3vq8L__EK-8I6ohEFJMiQ01r8u9h-ToZA4DRdl631_wTQ_yW0j9EKwvEderscJwYzCG38kPwiD6915dcqRKKz0AuB3-UUgL2eDmQidOLdtcswhlT2KRgzY5ruThffRA6XyU8Z7RE1KMpVMN598aC5CjCXrddVx097DThobnrbhOx8Xd3JEeB9V1fho5PvdmCD7RZA_eXd111J5hOrtFxpM3naNX-EzqPnYWUTGmUBKEphITsw',
    logo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDrqLP3vq8L__EK-8I6ohEFJMiQ01r8u9h-ToZA4DRdl631_wTQ_yW0j9EKwvEderscJwYzCG38kPwiD6915dcqRKKz0AuB3-UUgL2eDmQidOLdtcswhlT2KRgzY5ruThffRA6XyU8Z7RE1KMpVMN598aC5CjCXrddVx097DThobnrbhOx8Xd3JEeB9V1fho5PvdmCD7RZA_eXd111J5hOrtFxpM3naNX-EzqPnYWUTGmUBKEphITsw',
    altText:
      'High modern financial corporate headquarters lounge in Ho Chi Minh City with executive marble tables, digital tickers, elegant blue mood architectural lights.',
    badgeText: 'Fintech',
    badgeClass: 'bg-secondary-fixed text-on-secondary-fixed',
    avatarCode: 'FX',
    avatarBgClass: 'bg-secondary text-on-secondary font-headline-lg',
    rating: 4.6,
    reviewsCount: 110,
    industry: 'Ngân hàng số Thế hệ mới & Ví điện tử',
    employees: '800 - 1.200 nhân sự',
    location: 'Quận 1, TP. HCM',
    openJobsCount: 25,
    jobsLabel: '25 vị trí đang tuyển',
    industryFilter: 'finance',
    modelFilter: 'product',
    sizeFilter: '800-1200',
    cityFilter: 'TP. HCM',
    quickTags: ['featured', 'benefits', 'urgent'],
  },
  {
    id: 'c9',
    name: 'Shopee Vietnam',
    coverImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC6qtHeY8XsbWQV-AhwKW8YZcQ0FfPPgg1leGjP7b8y-8kn3n7gGZ-eniixrKOKpQVyuPWu6kxm8Aue5XnQz3rFBbRee0FHIm1uwukWQzC-VQNYKhd9_QKpIvH9DE1jSVRykk5TACyRaHsEmuxAWDLXE1xrDqJAbyeDLSSs5ouq5bqsyJEQR9MskTJw4NYUEP3EKw4M3zK3bdXVYgI68hN-6bZuXuxsQe66LFEJv8FDTzrX1gE9iIkn',
    logo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC6qtHeY8XsbWQV-AhwKW8YZcQ0FfPPgg1leGjP7b8y-8kn3n7gGZ-eniixrKOKpQVyuPWu6kxm8Aue5XnQz3rFBbRee0FHIm1uwukWQzC-VQNYKhd9_QKpIvH9DE1jSVRykk5TACyRaHsEmuxAWDLXE1xrDqJAbyeDLSSs5ouq5bqsyJEQR9MskTJw4NYUEP3EKw4M3zK3bdXVYgI68hN-6bZuXuxsQe66LFEJv8FDTzrX1gE9iIkn',
    altText:
      'Energetic open floor workspace with vibrant orange accents, youth tech professionals smiling, collaboration coffee bar, modern e-commerce corporate building.',
    badgeText: 'E-Commerce',
    badgeClass: 'bg-tertiary text-on-tertiary',
    avatarCode: 'SP',
    avatarBgClass: 'bg-tertiary-container text-on-primary font-headline-lg',
    rating: 4.7,
    reviewsCount: 318,
    industry: 'Sàn thương mại điện tử & Chuỗi Logistics hàng đầu',
    employees: '3.000+ nhân sự',
    location: 'Quận 7, TP. HCM',
    openJobsCount: 32,
    jobsLabel: '32 vị trí đang tuyển',
    industryFilter: 'ecommerce',
    modelFilter: 'mnc',
    sizeFilter: '2000+',
    cityFilter: 'TP. HCM',
    quickTags: ['featured', 'top-tech', 'urgent', 'international'],
  },
  {
    id: 'c5',
    name: 'FPT Software',
    coverImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDforfHKfZAw_uOSU60GiKlxQ_Qalgw3rPnpcW-s2fl409WqKlNEQAMuU53cwTfSLpTrrCfrpUg6V63vfRGReVMS-f3MDsohk37XS-935sLR8zTYO_J3iTftqAHMsBgP24-mVJo13cGHD3xPr7Q6oFhO5cRZlmkbtK7tuYUmL3jkBv_r9huLI7cFCu8jTPwqFGje1TytYFNjj3w5UYnmLqKwosnMkyWqQl2xyESS_rBDh05ysCBUE_u',
    logo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDforfHKfZAw_uOSU60GiKlxQ_Qalgw3rPnpcW-s2fl409WqKlNEQAMuU53cwTfSLpTrrCfrpUg6V63vfRGReVMS-f3MDsohk37XS-935sLR8zTYO_J3iTftqAHMsBgP24-mVJo13cGHD3xPr7Q6oFhO5cRZlmkbtK7tuYUmL3jkBv_r9huLI7cFCu8jTPwqFGje1TytYFNjj3w5UYnmLqKwosnMkyWqQl2xyESS_rBDh05ysCBUE_u',
    altText:
      'Expansive software technology park campus building with green lawns, modern solar panels, contemporary architecture representing FPT Software in Da Nang and Hanoi.',
    badgeText: 'Global Scale',
    badgeClass: 'bg-surface-container-highest text-on-primary-fixed-variant',
    avatarCode: 'FPT',
    avatarBgClass: 'bg-primary text-on-primary font-headline-lg',
    rating: 4.5,
    reviewsCount: 450,
    industry: 'Xuất khẩu phần mềm & Chuyển đổi số toàn cầu',
    employees: '30.000+ nhân sự',
    location: 'Hà Nội • TP. HCM • Đà Nẵng',
    openJobsCount: 50,
    jobsLabel: '50+ việc làm đang tuyển',
    industryFilter: 'it',
    modelFilter: 'outsource',
    sizeFilter: '2000+',
    cityFilter: 'Đà Nẵng',
    quickTags: ['featured', 'top-tech', 'urgent', 'international'],
  },
];

const INDUSTRY_OPTIONS = [
  { id: 'it', label: 'Công nghệ thông tin' },
  { id: 'finance', label: 'Ngân hàng & Tài chính' },
  { id: 'ecommerce', label: 'Thương mại điện tử' },
  { id: 'marketing', label: 'Marketing & Media' },
  { id: 'realestate', label: 'Bất động sản & Du lịch' },
];

const MODEL_OPTIONS = [
  { id: 'all', label: 'Tất cả mô hình' },
  { id: 'product', label: 'Product & SaaS Platform' },
  { id: 'outsource', label: 'Software Outsource' },
  { id: 'mnc', label: 'Tập đoàn Đa quốc gia (MNC)' },
];

const LOCATION_OPTIONS = [
  { id: 'all', label: 'Tất cả địa điểm' },
  { id: 'TP. HCM', label: 'TP. Hồ Chí Minh' },
  { id: 'Hà Nội', label: 'Hà Nội' },
  { id: 'Đà Nẵng', label: 'Đà Nẵng' },
];

const SIZE_OPTIONS = [
  { id: 'all', label: 'Tất cả quy mô' },
  { id: '50-300', label: '50 - 300 nhân sự' },
  { id: '800-1200', label: '800 - 1.200 nhân sự' },
  { id: '2000+', label: '2.000+ nhân sự' },
];

const SORT_OPTIONS = [
  { id: 'popular', label: 'Phổ biến nhất' },
  { id: 'rating', label: 'Đánh giá cao nhất' },
  { id: 'jobs', label: 'Nhiều việc làm nhất' },
];

export const CompaniesView = ({
  companies = [],
  onSelectCompany,
  onTabChange,
  onShowToast,
  initialSearchQuery = '',
  onResetSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchQuery || '');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedSize, setSelectedSize] = useState('all');
  const [activeQuickTag, setActiveQuickTag] = useState(null);
  const [selectedIndustries, setSelectedIndustries] = useState(['it', 'finance']);
  const [hasModifiedIndustry, setHasModifiedIndustry] = useState(false);
  const [selectedModel, setSelectedModel] = useState('all');
  const [minRating, setMinRating] = useState(4.5);
  const [sortBy, setSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);

  const [locationMenuOpen, setLocationMenuOpen] = useState(false);
  const [sizeMenuOpen, setSizeMenuOpen] = useState(false);
  const [sortMenuOpen, setSortMenuOpen] = useState(false);

  const searchBarRef = useRef(null);

  useEffect(() => {
    if (initialSearchQuery) {
      setSearchTerm(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchBarRef.current && !searchBarRef.current.contains(e.target)) {
        setLocationMenuOpen(false);
        setSizeMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggleIndustry = (industryId) => {
    setHasModifiedIndustry(true);
    setSelectedIndustries((prev) =>
      prev.includes(industryId)
        ? prev.filter((id) => id !== industryId)
        : [...prev, industryId]
    );
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedLocation('all');
    setSelectedSize('all');
    setActiveQuickTag(null);
    setSelectedIndustries(['it', 'finance']);
    setHasModifiedIndustry(false);
    setSelectedModel('all');
    setMinRating(4.5);
    setSortBy('popular');
    setCurrentPage(1);
    if (onResetSearch) {
      onResetSearch();
    }
    if (onShowToast) {
      onShowToast('Đã đặt lại bộ lọc tìm kiếm về mặc định', 'info');
    }
  };

  const handleSearchButtonClick = () => {
    setLocationMenuOpen(false);
    setSizeMenuOpen(false);
    const feedEl = document.getElementById('company-feed-section');
    if (feedEl) {
      feedEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const mergedCompanies = useMemo(() => {
    return DEFAULT_CORPORATE_COMPANIES.map((defComp) => {
      const matched = companies.find((c) => c.id === defComp.id || c.name === defComp.name);
      return matched ? { ...matched, ...defComp } : defComp;
    });
  }, [companies]);

  const filteredCompanies = useMemo(() => {
    let result = [...mergedCompanies];

    // Keyword filter
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.industry.toLowerCase().includes(q) ||
          c.location.toLowerCase().includes(q) ||
          (c.badgeText && c.badgeText.toLowerCase().includes(q))
      );
    }

    // Location filter
    if (selectedLocation !== 'all') {
      result = result.filter((c) =>
        c.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    // Size filter
    if (selectedSize !== 'all') {
      result = result.filter((c) => c.sizeFilter === selectedSize);
    }

    // Quick Tag filter
    if (activeQuickTag) {
      result = result.filter(
        (c) => c.quickTags && c.quickTags.includes(activeQuickTag)
      );
    }

    // Industry checkbox filter (applies when user actively modifies checkboxes)
    if (hasModifiedIndustry && selectedIndustries.length > 0) {
      result = result.filter((c) =>
        selectedIndustries.includes(c.industryFilter)
      );
    }

    // Company model radio filter
    if (selectedModel !== 'all') {
      result = result.filter((c) => c.modelFilter === selectedModel);
    }

    // Minimum rating filter
    if (minRating) {
      result = result.filter((c) => c.rating >= minRating);
    }

    // Sort
    if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'jobs') {
      result.sort((a, b) => b.openJobsCount - a.openJobsCount);
    }

    return result;
  }, [
    mergedCompanies,
    searchTerm,
    selectedLocation,
    selectedSize,
    activeQuickTag,
    hasModifiedIndustry,
    selectedIndustries,
    selectedModel,
    minRating,
    sortBy,
  ]);

  const activeLocationLabel =
    LOCATION_OPTIONS.find((o) => o.id === selectedLocation)?.label ||
    'Tất cả địa điểm';
  const activeSizeLabel =
    SIZE_OPTIONS.find((o) => o.id === selectedSize)?.label || 'Tất cả quy mô';
  const activeSortLabel =
    SORT_OPTIONS.find((o) => o.id === sortBy)?.label || 'Phổ biến nhất';

  return (
    <div className="flex flex-col w-full bg-surface font-body-md text-body-md text-on-surface antialiased">
      {/* 1. HERO & ENTERPRISE SEARCH SECTION */}
      <section className="w-full bg-gradient-to-b from-surface-container-high/40 via-surface-container-low/20 to-surface pb-space-xl">
        <div className="max-w-7xl mx-auto px-margin pt-space-xl">
          <div className="max-w-3xl mb-space-lg">
            <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight mb-space-xs">
              Khám phá 1.000+ Doanh nghiệp nổi bật &amp; Môi trường làm việc lý tưởng
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Tìm hiểu văn hóa doanh nghiệp, chế độ đãi ngộ minh bạch và kết nối cơ hội nghề nghiệp phù hợp nhất với hành trình sự nghiệp của bạn.
            </p>
          </div>

          {/* Main Search Console */}
          <div
            ref={searchBarRef}
            className="bg-surface-container-lowest shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-space-md mb-space-md rounded-3xl md:rounded-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-space-sm items-center">
              {/* Keyword input */}
              <div className="md:col-span-5 flex items-center gap-space-sm px-space-md py-space-sm bg-surface-container-lowest rounded-full">
                <span className="material-symbols-outlined text-primary text-[22px]">
                  search
                </span>
                <div className="flex-1 min-w-0">
                  <label className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                    Tên công ty hoặc ngành nghề
                  </label>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSearchButtonClick();
                    }}
                    placeholder="VD: FPT Software, Shopee, VNG, Fintech..."
                    className="w-full bg-transparent font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none"
                  />
                </div>
              </div>

              {/* Location Dropdown */}
              <div className="md:col-span-3 relative">
                <div
                  onClick={() => {
                    setLocationMenuOpen((prev) => !prev);
                    setSizeMenuOpen(false);
                  }}
                  className="flex items-center gap-space-sm px-space-md py-space-sm bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors rounded-full select-none"
                >
                  <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                    location_on
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                      Địa điểm
                    </span>
                    <span className="block font-body-md text-body-md text-on-surface truncate">
                      {activeLocationLabel}
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant text-[18px]">
                    expand_more
                  </span>
                </div>

                {locationMenuOpen && (
                  <div className="absolute left-0 right-0 top-full mt-2 bg-surface-container-lowest rounded-2xl shadow-lg border border-outline-variant/30 py-1.5 z-30">
                    {LOCATION_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setSelectedLocation(opt.id);
                          setLocationMenuOpen(false);
                          setCurrentPage(1);
                        }}
                        className={`w-full text-left px-4 py-2 font-body-sm text-body-sm transition-colors cursor-pointer ${
                          selectedLocation === opt.id
                            ? 'bg-surface-container-low text-primary font-semibold'
                            : 'text-on-surface hover:bg-surface-container-low'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Size Dropdown */}
              <div className="md:col-span-2 relative">
                <div
                  onClick={() => {
                    setSizeMenuOpen((prev) => !prev);
                    setLocationMenuOpen(false);
                  }}
                  className="flex items-center gap-space-sm px-space-md py-space-sm bg-surface-container-low cursor-pointer hover:bg-surface-container transition-colors rounded-full select-none"
                >
                  <span className="material-symbols-outlined text-on-surface-variant text-[20px]">
                    groups
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="block font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                      Quy mô
                    </span>
                    <span className="block font-body-md text-body-md text-on-surface truncate">
                      {activeSizeLabel}
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-on-surface-variant text-[18px]">
                    expand_more
                  </span>
                </div>

                {sizeMenuOpen && (
                  <div className="absolute left-0 right-0 top-full mt-2 bg-surface-container-lowest rounded-2xl shadow-lg border border-outline-variant/30 py-1.5 z-30 min-w-[180px]">
                    {SIZE_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          setSelectedSize(opt.id);
                          setSizeMenuOpen(false);
                          setCurrentPage(1);
                        }}
                        className={`w-full text-left px-4 py-2 font-body-sm text-body-sm transition-colors cursor-pointer ${
                          selectedSize === opt.id
                            ? 'bg-surface-container-low text-primary font-semibold'
                            : 'text-on-surface hover:bg-surface-container-low'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* CTA Button */}
              <div className="md:col-span-2">
                <button
                  type="button"
                  onClick={handleSearchButtonClick}
                  className="w-full h-12 flex items-center justify-center gap-space-xs bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg transition-colors shadow-[0_4px_14px_rgba(21,93,252,0.3)] rounded-full cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    search
                  </span>
                  <span>Tìm kiếm</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Filter Pills matching Reference UI */}
          <div className="flex items-center gap-space-sm flex-wrap">
            <span className="font-label-md text-label-md text-on-surface-variant mr-space-xs">
              Gợi ý nhanh:
            </span>
            <button
              type="button"
              onClick={() =>
                setActiveQuickTag((prev) =>
                  prev === 'featured' ? null : 'featured'
                )
              }
              className={`flex items-center gap-space-xs px-space-md py-1.5 rounded-full transition-colors font-label-md text-label-md shadow-sm cursor-pointer ${
                activeQuickTag === 'featured'
                  ? 'bg-surface-container-high text-primary'
                  : 'bg-surface-container-lowest hover:bg-surface-container-high text-on-surface'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
              <span>Công ty nổi bật</span>
            </button>
            <button
              type="button"
              onClick={() =>
                setActiveQuickTag((prev) =>
                  prev === 'top-tech' ? null : 'top-tech'
                )
              }
              className={`flex items-center gap-space-xs px-space-md py-1.5 rounded-full transition-colors font-label-md text-label-md shadow-sm cursor-pointer ${
                activeQuickTag === 'top-tech'
                  ? 'bg-surface-container-high text-primary'
                  : 'bg-surface-container-lowest hover:bg-surface-container-high text-on-surface'
              }`}
            >
              <span>Top Tech Companies</span>
            </button>
            <button
              type="button"
              onClick={() =>
                setActiveQuickTag((prev) =>
                  prev === 'benefits' ? null : 'benefits'
                )
              }
              className={`flex items-center gap-space-xs px-space-md py-1.5 rounded-full transition-colors font-label-md text-label-md shadow-sm cursor-pointer ${
                activeQuickTag === 'benefits'
                  ? 'bg-surface-container-high text-primary'
                  : 'bg-surface-container-lowest hover:bg-surface-container-high text-on-surface'
              }`}
            >
              <span>Đãi ngộ vượt trội</span>
            </button>
            <button
              type="button"
              onClick={() =>
                setActiveQuickTag((prev) =>
                  prev === 'urgent' ? null : 'urgent'
                )
              }
              className={`flex items-center gap-space-xs px-space-md py-1.5 rounded-full transition-colors font-label-md text-label-md shadow-sm cursor-pointer ${
                activeQuickTag === 'urgent'
                  ? 'bg-surface-container-high text-primary'
                  : 'bg-surface-container-lowest hover:bg-surface-container-high text-on-surface'
              }`}
            >
              <span>Tuyển dụng gấp</span>
            </button>
            <button
              type="button"
              onClick={() =>
                setActiveQuickTag((prev) =>
                  prev === 'international' ? null : 'international'
                )
              }
              className={`flex items-center gap-space-xs px-space-md py-1.5 rounded-full transition-colors font-label-md text-label-md shadow-sm cursor-pointer ${
                activeQuickTag === 'international'
                  ? 'bg-surface-container-high text-primary'
                  : 'bg-surface-container-lowest hover:bg-surface-container-high text-on-surface'
              }`}
            >
              <span>Môi trường quốc tế</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. MAIN 2-COLUMN VIEWPORT: FILTER SIDEBAR & COMPANY FEED */}
      <section id="company-feed-section" className="w-full bg-surface py-space-xl">
        <div className="max-w-7xl mx-auto px-margin">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
            {/* LEFT COLUMN: Filter Sidebar */}
            <aside className="lg:col-span-3 flex flex-col gap-space-md lg:sticky lg:top-24">
              {/* Filter Card 1 */}
              <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col gap-space-lg">
                <div className="flex items-center justify-between pb-space-sm bg-surface-container-lowest">
                  <div className="flex items-center gap-space-xs font-headline-sm text-headline-sm text-on-surface">
                    <span className="material-symbols-outlined text-[20px] text-primary">
                      tune
                    </span>
                    <span>Bộ Lọc Tìm Kiếm</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="font-label-md text-label-md text-primary hover:underline cursor-pointer"
                  >
                    Đặt lại
                  </button>
                </div>

                {/* Lĩnh vực hoạt động */}
                <div className="flex flex-col gap-space-sm">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                    Lĩnh vực hoạt động
                  </span>
                  <div className="flex flex-col gap-space-xs">
                    {INDUSTRY_OPTIONS.map((item) => {
                      const isChecked = selectedIndustries.includes(item.id);
                      return (
                        <label
                          key={item.id}
                          className="flex items-center justify-between py-1 cursor-pointer group"
                        >
                          <div className="flex items-center gap-space-sm">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => handleToggleIndustry(item.id)}
                              className="w-4 h-4 rounded text-primary focus:ring-0 accent-primary cursor-pointer"
                            />
                            <span className="font-body-sm text-body-sm text-on-surface group-hover:text-primary transition-colors">
                              {item.label}
                            </span>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Mô hình doanh nghiệp */}
                <div className="flex flex-col gap-space-sm">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                    Mô hình doanh nghiệp
                  </span>
                  <div className="flex flex-col gap-space-xs">
                    {MODEL_OPTIONS.map((model) => (
                      <label
                        key={model.id}
                        className="flex items-center gap-space-sm py-1 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="comp-type"
                          checked={selectedModel === model.id}
                          onChange={() => {
                            setSelectedModel(model.id);
                            setCurrentPage(1);
                          }}
                          className="w-4 h-4 text-primary accent-primary cursor-pointer"
                        />
                        <span className="font-body-sm text-body-sm text-on-surface">
                          {model.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Filter Card 2: Đánh Giá & Xếp Hạng */}
              <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col gap-space-md">
                <div className="flex items-center gap-space-xs pb-space-xs font-headline-sm text-headline-sm text-on-surface">
                  <span className="material-symbols-outlined text-[20px] text-primary">
                    star
                  </span>
                  <span>Đánh Giá &amp; Xếp Hạng</span>
                </div>
                <div className="flex flex-col gap-space-sm">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                    Đánh giá từ nhân viên
                  </span>
                  <div className="flex flex-col gap-space-xs">
                    <button
                      type="button"
                      onClick={() => setMinRating(4.5)}
                      className={`flex items-center justify-between p-2 rounded-lg text-left transition-colors cursor-pointer ${
                        minRating === 4.5
                          ? 'bg-surface-container-high/50 hover:bg-surface-container-high'
                          : 'hover:bg-surface-container'
                      }`}
                    >
                      <div className="flex items-center gap-1 text-secondary">
                        <span
                          className="material-symbols-outlined text-[18px]"
                          style={{ fontVariationSettings: '"FILL" 1' }}
                        >
                          star
                        </span>
                        <span
                          className="material-symbols-outlined text-[18px]"
                          style={{ fontVariationSettings: '"FILL" 1' }}
                        >
                          star
                        </span>
                        <span
                          className="material-symbols-outlined text-[18px]"
                          style={{ fontVariationSettings: '"FILL" 1' }}
                        >
                          star
                        </span>
                        <span
                          className="material-symbols-outlined text-[18px]"
                          style={{ fontVariationSettings: '"FILL" 1' }}
                        >
                          star
                        </span>
                        <span
                          className="material-symbols-outlined text-[18px]"
                          style={{ fontVariationSettings: '"FILL" 1' }}
                        >
                          star_half
                        </span>
                        <span className="font-label-md text-label-md text-on-surface ml-1">
                          4.5+
                        </span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setMinRating(4.0)}
                      className={`flex items-center justify-between p-2 rounded-lg text-left transition-colors cursor-pointer ${
                        minRating === 4.0
                          ? 'bg-surface-container-high/50 hover:bg-surface-container-high'
                          : 'hover:bg-surface-container'
                      }`}
                    >
                      <div className="flex items-center gap-1 text-secondary">
                        <span
                          className="material-symbols-outlined text-[18px]"
                          style={{ fontVariationSettings: '"FILL" 1' }}
                        >
                          star
                        </span>
                        <span
                          className="material-symbols-outlined text-[18px]"
                          style={{ fontVariationSettings: '"FILL" 1' }}
                        >
                          star
                        </span>
                        <span
                          className="material-symbols-outlined text-[18px]"
                          style={{ fontVariationSettings: '"FILL" 1' }}
                        >
                          star
                        </span>
                        <span
                          className="material-symbols-outlined text-[18px]"
                          style={{ fontVariationSettings: '"FILL" 1' }}
                        >
                          star
                        </span>
                        <span className="material-symbols-outlined text-[18px]">
                          star
                        </span>
                        <span className="font-label-md text-label-md text-on-surface ml-1">
                          4.0+
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </aside>

            {/* RIGHT COLUMN: Company Feed & Corporate Cards */}
            <div className="lg:col-span-9 flex flex-col gap-space-lg">
              {/* Section Controls Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm bg-surface-container-lowest p-space-md rounded-2xl shadow-sm">
                <div>
                  <span className="font-headline-md text-headline-md text-on-surface">
                    Danh sách công ty tiêu biểu
                  </span>
                </div>
                <div className="flex items-center gap-space-sm self-end sm:self-auto relative">
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Sắp xếp:
                  </span>
                  <div
                    onClick={() => setSortMenuOpen((prev) => !prev)}
                    className="flex items-center gap-space-xs bg-surface-container px-space-md py-1.5 rounded-lg cursor-pointer select-none"
                  >
                    <span className="font-label-md text-label-md text-on-surface">
                      {activeSortLabel}
                    </span>
                    <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                      arrow_drop_down
                    </span>
                  </div>

                  {sortMenuOpen && (
                    <div className="absolute right-0 top-full mt-1.5 bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant/30 py-1 z-20 min-w-[170px]">
                      {SORT_OPTIONS.map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => {
                            setSortBy(opt.id);
                            setSortMenuOpen(false);
                          }}
                          className={`w-full text-left px-3.5 py-2 font-body-sm text-body-sm transition-colors cursor-pointer ${
                            sortBy === opt.id
                              ? 'bg-surface-container-low text-primary font-semibold'
                              : 'text-on-surface hover:bg-surface-container-low'
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Grid of Corporate Cards (2-col on Desktop) */}
              {filteredCompanies.length === 0 ? (
                <div className="bg-surface-container-lowest rounded-2xl p-space-xl text-center shadow-sm">
                  <span className="material-symbols-outlined text-[40px] text-outline mb-space-xs">
                    domain_disabled
                  </span>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-space-xs">
                    Không tìm thấy doanh nghiệp phù hợp
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-space-md">
                    Vui lòng thử lại với từ khóa khác hoặc đặt lại bộ lọc tìm kiếm.
                  </p>
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="px-space-lg py-space-sm bg-primary text-on-primary font-label-lg text-label-lg rounded-full hover:bg-primary-container transition-colors cursor-pointer"
                  >
                    Đặt lại bộ lọc
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
                  {filteredCompanies.map((company) => (
                    <div
                      key={company.id}
                      id={`company-card-${company.id}`}
                      className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div>
                        {/* Banner Preview */}
                        <div
                          onClick={() =>
                            onSelectCompany && onSelectCompany(company)
                          }
                          className="relative h-36 w-full bg-surface-container overflow-hidden cursor-pointer"
                        >
                          <img
                            src={company.coverImage}
                            alt={company.altText || company.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                          {company.badgeText && (
                            <span
                              className={`absolute top-3 right-3 px-2 py-0.5 rounded-md font-label-sm text-label-sm uppercase ${company.badgeClass}`}
                            >
                              {company.badgeText}
                            </span>
                          )}
                        </div>

                        <div className="p-space-lg pt-0 relative">
                          {/* Logo Overlap */}
                          <div className="-mt-8 mb-space-sm flex items-end justify-between">
                            <div
                              onClick={() =>
                                onSelectCompany && onSelectCompany(company)
                              }
                              className="w-16 h-16 bg-surface-container-lowest shadow-md p-1.5 flex items-center justify-center rounded-full cursor-pointer"
                            >
                              <div
                                className={`w-full h-full flex items-center justify-center rounded-full ${company.avatarBgClass}`}
                              >
                                {company.avatarCode}
                              </div>
                            </div>

                            <div className="flex items-center gap-1 bg-surface-container-lowest px-2.5 py-1 rounded-full shadow-sm text-secondary">
                              <span
                                className="material-symbols-outlined text-[16px]"
                                style={{ fontVariationSettings: '"FILL" 1' }}
                              >
                                star
                              </span>
                              <span className="font-headline-sm text-headline-sm text-on-surface">
                                {company.rating}
                              </span>
                              <span className="font-body-sm text-body-sm text-on-surface-variant">
                                ({company.reviewsCount})
                              </span>
                            </div>
                          </div>

                          {/* Details */}
                          <div className="flex flex-col gap-1 mb-space-md">
                            <h2
                              onClick={() =>
                                onSelectCompany && onSelectCompany(company)
                              }
                              className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors cursor-pointer"
                            >
                              {company.name}
                            </h2>
                            <span className="font-body-sm text-body-sm text-on-surface-variant">
                              {company.industry}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-y-2 text-on-surface-variant font-body-sm text-body-sm mb-space-md">
                            <div className="flex items-center gap-1.5">
                              <span className="material-symbols-outlined text-[18px] text-primary">
                                groups
                              </span>
                              <span>{company.employees}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="material-symbols-outlined text-[18px] text-primary">
                                location_on
                              </span>
                              <span>{company.location}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Footer CTA */}
                      <div className="px-space-lg pb-space-lg pt-0 flex items-center justify-between bg-surface-container-lowest">
                        <span className="font-label-md text-label-md flex items-center gap-1 text-on-surface-variant">
                          {company.jobsLabel}
                        </span>
                        <div className="flex items-center gap-space-xs">
                          <button
                            type="button"
                            onClick={() =>
                              onSelectCompany && onSelectCompany(company)
                            }
                            className="px-space-md py-1.5 bg-primary text-on-primary hover:bg-primary-container font-label-md text-label-md transition-colors rounded-full cursor-pointer"
                          >
                            Xem công ty
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination Container */}
              <div className="flex items-center justify-between pt-space-md">
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Hiển thị 1 - {filteredCompanies.length} trên tổng số 48 công ty
                </span>
                <div className="flex items-center gap-space-xs">
                  {[1, 2, 3].map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => {
                        setCurrentPage(page);
                        const feedEl = document.getElementById('company-feed-section');
                        if (feedEl) {
                          feedEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }}
                      className={
                        currentPage === page
                          ? 'w-9 h-9 rounded-full bg-primary text-on-primary font-bold text-label-md flex items-center justify-center transition-colors border-0 outline-none cursor-pointer'
                          : 'w-9 h-9 rounded-full text-on-surface hover:text-primary hover:bg-surface-container font-label-md text-label-md flex items-center justify-center transition-colors cursor-pointer'
                      }
                    >
                      {page}
                    </button>
                  ))}
                  <span className="px-1.5 text-outline font-label-md select-none">
                    ...
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentPage(8);
                      const feedEl = document.getElementById('company-feed-section');
                      if (feedEl) {
                        feedEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className={
                      currentPage === 8
                        ? 'w-9 h-9 rounded-full bg-primary text-on-primary font-bold text-label-md flex items-center justify-center transition-colors border-0 outline-none cursor-pointer'
                        : 'w-9 h-9 rounded-full text-on-surface hover:text-primary hover:bg-surface-container font-label-md text-label-md flex items-center justify-center transition-colors cursor-pointer'
                    }
                  >
                    8
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CULTURE SHOWCASE & WORKSPACE BENTO SECTION */}
      <section className="w-full bg-surface-container-lowest py-space-xl">
        <div className="max-w-7xl mx-auto px-margin">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl gap-space-md">
            <div>
              <div className="inline-flex items-center gap-space-xs text-primary font-label-md text-label-md uppercase tracking-wider mb-space-xs">
                <span className="material-symbols-outlined text-[18px]">
                  verified
                </span>
                <span>Góc Văn Hóa &amp; Không Gian Làm Việc Thực Tế</span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                Trải nghiệm môi trường trước khi ứng tuyển
              </h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
              Khám phá không gian làm việc đạt tiêu chuẩn Great Place To Work® cùng các hoạt động văn hóa đặc sắc từ các doanh nghiệp hàng đầu.
            </p>
          </div>

          {/* Bento Grid Visual Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-space-md h-auto md:h-[420px]">
            {/* Large Tile */}
            <div className="md:col-span-6 relative rounded-2xl overflow-hidden group shadow-sm h-72 md:h-auto">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-5niMZANi-oQUA7_9sEox2WtxY5qpHaaR6kuqADxRuUBkxUZ0wbxLt73S0uEliC2psUvdDd6rlH8tOTBbU6ZJIWd1Fo8KurRV84uEO0q63gOK5taAv2RK0eYvXGmEB8kdE3yQ_HUgWbEYinGywxdWfysLhEGY39racVWbc_s5ywY_Rgl29VbcZ8D3VIbrVGyvZKonGMye4-q13kKZsmuCB-MnnzTc9eOov0t4UX3FqAb07m-QKvij"
                alt="Modern collaborative open workspace with sunlight streaming through large floor-to-ceiling windows, developers coding in a spacious modern tech office lounge."
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-on-primary">
                <span className="px-2.5 py-1 rounded-md bg-primary-container text-on-primary font-label-sm text-label-sm uppercase mb-2 inline-block">
                  Best Workplace 2024
                </span>
                <h3 className="font-headline-md text-headline-md text-on-primary mb-1">
                  Không gian mở linh hoạt không bàn cố định
                </h3>
                <p className="font-body-sm text-body-sm text-on-primary/80">
                  Khuyến khích tương tác đa phòng ban và nuôi dưỡng tính sáng tạo tối đa.
                </p>
              </div>
            </div>

            {/* Upper Right Tile */}
            <div className="md:col-span-3 relative overflow-hidden group shadow-sm h-64 md:h-auto rounded-2xl">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyPris8CZfKcbhIOx90Gai-Ht3lxCD-67vjigPzjUbvL8zHn85b9oOJOjhg8Wvux7SUInNBHq1e19tUi8xxPOZWz1qNkn2pL03GwHGbdox07OgrLRAn-1CYcmZSRZfQKM5W3TZI6vQ6tILffDzJg9R2wJ9QRCW_WNZnL3X7VblKNNUe9be1HUpjoG2y-wm7A15kRCkpBZMsRFWjVBtJSFecmPmv1xQtd_wBOQg3YyYI-D5zW5TrPKA"
                alt="Vietnamese corporate tech team building event on a tropical beach in Da Nang, happy young diverse colleagues celebrating together under warm sunset."
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-on-primary">
                <span className="font-label-sm text-label-sm text-secondary-fixed block mb-1">
                  Team Bonding Thường Niên
                </span>
                <h4 className="font-headline-sm text-headline-sm text-on-primary">
                  Gắn kết năng lượng đồng đội
                </h4>
              </div>
            </div>

            {/* Lower Right Tile */}
            <div className="md:col-span-3 relative overflow-hidden group shadow-sm h-64 md:h-auto rounded-2xl">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzYr9Y-3KAUxC3F-W90yda5oKYik7gurEGgmIuPfiD9m4iLRRJvEYZByBC1lA_7EBaq0MPvpXFRM9HmO2C-UnOadyLY805R4kXx4hO1sx4cqoHB3KWoZr1qzA_aWSFJh3wWUekUWxg8hKZ17so141X8Q5bUn-DLTHj15l7mWzaKoGnKOZjDny5Ykxq6cKY8UCwZ3uJGamw28IYM16qE2dICyaqx8Esk3VxMUXWhHEgZgOq1C0eIOMS"
                alt="Modern barista coffee bar and healthy snack lounge located inside a luxury corporate high-rise office building in central Saigon."
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-on-primary">
                <span className="font-label-sm text-label-sm text-tertiary-fixed block mb-1">
                  Tiện Ích Nội Khu
                </span>
                <h4 className="font-headline-sm text-headline-sm text-on-primary">
                  Quầy Barista &amp; Phòng Gym riêng
                </h4>
              </div>
            </div>
          </div>

          {/* Trust Metrics Bar */}
          <div className="mt-space-xl grid grid-cols-2 md:grid-cols-4 gap-space-md py-space-lg px-space-xl bg-surface-container-low rounded-2xl">
            <div className="flex flex-col items-center text-center">
              <span className="font-display-lg text-display-lg text-primary tracking-tight">
                1.200+
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Doanh nghiệp kiểm duyệt
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="font-display-lg text-display-lg text-primary tracking-tight">
                96%
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Đánh giá xác thực từ nhân sự
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="font-display-lg text-display-lg text-primary tracking-tight">
                8.500+
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Vị trí việc làm chất lượng cao
              </span>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="font-display-lg text-display-lg text-primary tracking-tight">
                24h
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Tốc độ phản hồi hồ sơ trung bình
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOOTER */}
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
                  onClick={() => onTabChange && onTabChange('jobs')}
                  className="text-left font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                >
                  Giới thiệu chung
                </button>
                <button
                  type="button"
                  onClick={() => onTabChange && onTabChange('news')}
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
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }
                  className="text-left font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                >
                  Khám phá doanh nghiệp
                </button>
                <button
                  type="button"
                  onClick={() => onTabChange && onTabChange('news')}
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
