import React, { useState } from 'react';
import {
  Building2,
  MapPin,
  Clock,
  Banknote,
  Briefcase,
  Award,
  Send,
  Bookmark,
  CheckCircle2,
  Gift,
  ShieldCheck,
  Laptop,
  Users,
  ExternalLink,
  ChevronRight,
  Layers,
  Globe,
  Map,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const JobDetailView = ({
  job,
  allJobs = [],
  onBack,
  onNavigateHome,
  onNavigateJobs,
  onSelectRelatedJob,
  onViewCompany,
  onToggleSave,
  onApply,
  onShare,
  onShowToast,
}) => {
  const [selectedRating, setSelectedRating] = useState(null);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);

  if (!job) return null;

  // Rating options matching the 5 smiley faces in design
  const ratingOptions = [
    {
      id: 1,
      label: 'Không đáng tin cậy & rõ ràng',
      face: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
          <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="2.5" />
          <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="2.5" />
          <line x1="8" y1="8" x2="10" y2="9" />
          <line x1="16" y1="8" x2="14" y2="9" />
        </svg>
      ),
    },
    {
      id: 2,
      label: 'Ít đáng tin cậy & rõ ràng',
      face: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M16 16s-1.5-1.5-4-1.5-4 1.5-4 1.5" />
          <line x1="9" y1="9.5" x2="9.01" y2="9.5" strokeWidth="2.5" />
          <line x1="15" y1="9.5" x2="15.01" y2="9.5" strokeWidth="2.5" />
        </svg>
      ),
    },
    {
      id: 3,
      label: 'Bình thường',
      face: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="8" y1="15" x2="16" y2="15" />
          <line x1="9" y1="9.5" x2="9.01" y2="9.5" strokeWidth="2.5" />
          <line x1="15" y1="9.5" x2="15.01" y2="9.5" strokeWidth="2.5" />
        </svg>
      ),
    },
    {
      id: 4,
      label: 'Đáng tin cậy & rõ ràng',
      face: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9.5" x2="9.01" y2="9.5" strokeWidth="2.5" />
          <line x1="15" y1="9.5" x2="15.01" y2="9.5" strokeWidth="2.5" />
        </svg>
      ),
    },
    {
      id: 5,
      label: 'Rất đáng tin cậy & rõ ràng',
      face: (
        <svg viewBox="0 0 24 24" className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 13.5c1 2.5 3 3 4 3s3-.5 4-3" />
          <path d="M7.5 9c1-1 2-1 2.5 0" />
          <path d="M14 9c.5-1 1.5-1 2.5 0" />
        </svg>
      ),
    },
  ];

  const handleRate = (opt) => {
    setSelectedRating(opt.id);
    setRatingSubmitted(true);
    if (onShowToast) {
      onShowToast(`Cảm ơn bạn đã đánh giá: "${opt.label}"!`, 'success');
    }
  };

  // Curated fallback data for UI/UX or current job
  const jobTitle = job.title || 'Senior UI/UX Designer';
  const companyName = job.company || 'Nexus Career Systems Ltd.';
  const jobLocation = job.location || 'Quận 1, TP. Hồ Chí Minh';
  const postedDate = job.postedDate || '15/07/2026';
  const salaryDisplay = job.salaryUsd || job.salary || '$1,500 - $2,500';
  const jobTypeDisplay = job.jobType || 'Toàn thời gian';
  const experienceDisplay = job.experienceSummary || '2 năm kinh nghiệm';

  // Specific description points matching the design image
  const descriptions = job.responsibilities && job.responsibilities.length > 0
    ? job.responsibilities
    : [
        'Thiết kế giao diện người dùng (UI) và trải nghiệm người dùng (UX) cho các ứng dụng web và di động quy mô lớn.',
        'Phối hợp chặt chẽ với đội ngũ Product Manager và Developers để đảm bảo tính khả thi và thẩm mỹ của sản phẩm.',
        'Thực hiện nghiên cứu người dùng, xây dựng user persona và thực hiện testing để tối ưu hóa luồng người dùng.',
        'Xây dựng và duy trì Design System đồng nhất cho toàn hệ thống doanh nghiệp.',
      ];

  // Specific requirement points matching the design image
  const requirements = job.requirements && job.requirements.length > 0
    ? job.requirements
    : [
        'Ít nhất 2-4 năm kinh nghiệm làm UI/UX Designer hoặc các vai trò tương đương.',
        'Thành thạo các công cụ thiết kế: Figma, Adobe XD, Sketch, Principle.',
        'Hiểu biết sâu về Typography, Color Theory và Grid Systems.',
        'Có khả năng tư duy logic tốt, khả năng trình bày và phản biện giải pháp thiết kế.',
      ];

  // Related jobs: either filtered from allJobs or curated design fallbacks
  const relatedJobs = allJobs
    .filter((j) => j.id !== job.id)
    .slice(0, 3);

  const displayRelatedJobs = relatedJobs.length >= 3
    ? relatedJobs
    : [
        {
          id: 'rel-1',
          title: 'Lead Product Designer',
          company: 'Alpha Tech Corp',
          companyLogo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=120&auto=format&fit=crop&q=80',
          salary: '$2,000 - $3,500',
          location: 'TP. HCM',
        },
        {
          id: 'rel-2',
          title: 'UX Researcher',
          company: 'Fintech Solutions',
          companyLogo: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=120&auto=format&fit=crop&q=80',
          salary: 'Cạnh tranh',
          location: 'Hà Nội',
        },
        {
          id: 'rel-3',
          title: 'Visual Designer (Game)',
          company: 'Creative Hub',
          companyLogo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=120&auto=format&fit=crop&q=80',
          salary: '$1,200 - $1,800',
          location: 'Đà Nẵng',
        },
      ];

  const handleOpenGoogleMaps = () => {
    const query = encodeURIComponent(`${companyName}, ${jobLocation}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#f4f2ee] pb-20">
      {/* 1. Breadcrumb navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-3">
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs sm:text-sm text-slate-500 font-medium">
          <button
            type="button"
            onClick={onNavigateHome}
            className="hover:text-[#2170E4] transition-colors cursor-pointer"
          >
            Trang chủ
          </button>
          <span>&gt;</span>
          <button
            type="button"
            onClick={onNavigateJobs}
            className="hover:text-[#2170E4] transition-colors cursor-pointer"
          >
            Việc làm
          </button>
          <span>&gt;</span>
          <span className="text-slate-900 font-semibold truncate max-w-xs sm:max-w-md">
            {jobTitle}
          </span>
        </nav>
      </div>

      {/* 2. Top Main Hero / Header Card */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Left: Company Logo + Title + Info + Badges */}
            <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-5 flex-1 min-w-0">
              {/* Logo Box */}
              <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-2xl border border-slate-200 bg-white p-2 flex items-center justify-center shrink-0 shadow-2xs overflow-hidden">
                {job.companyLogo ? (
                  <img
                    src={job.companyLogo}
                    alt={companyName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full rounded-xl bg-blue-50 flex items-center justify-center text-[#2170E4]">
                    <Building2 className="w-8 h-8" />
                  </div>
                )}
              </div>

              {/* Title and Metadata */}
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0D3880] tracking-tight leading-tight">
                  {jobTitle}
                </h1>

                {/* Subtitle with icons */}
                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mt-2.5 text-xs sm:text-sm text-slate-600 font-medium">
                  <div className="inline-flex items-center space-x-1.5 text-slate-800 font-semibold">
                    <Building2 className="w-4 h-4 text-slate-500 shrink-0" />
                    <span className="truncate">{companyName}</span>
                  </div>
                  <div className="inline-flex items-center space-x-1.5 text-slate-600">
                    <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
                    <span>{jobLocation}</span>
                  </div>
                  <div className="inline-flex items-center space-x-1.5 text-slate-500">
                    <Clock className="w-4 h-4 text-slate-500 shrink-0" />
                    <span>Cập nhật: {postedDate}</span>
                  </div>
                </div>

                {/* Badges line */}
                <div className="flex flex-wrap items-center gap-2.5 mt-4">
                  <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 text-slate-700">
                    <Banknote className="w-4 h-4 text-slate-500" />
                    <span>{salaryDisplay}</span>
                  </span>

                  <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 text-slate-700">
                    <Clock className="w-4 h-4 text-slate-500" />
                    <span>{jobTypeDisplay}</span>
                  </span>

                  <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-100 text-slate-700">
                    <Award className="w-4 h-4 text-slate-500" />
                    <span>{experienceDisplay}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Stacked Action Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 lg:w-56">
              <button
                type="button"
                id="jobdetail-apply-hero-btn"
                onClick={(e) => onApply(job, e)}
                className="w-full py-3.5 px-6 bg-[#0D4EB8] hover:bg-[#0A3D91] text-white font-bold rounded-xl shadow-sm hover:shadow-md active:scale-98 transition-all flex items-center justify-center space-x-2.5 cursor-pointer text-sm sm:text-base"
              >
                <Send className="w-4 h-4 fill-white" />
                <span>Ứng tuyển ngay</span>
              </button>

              <button
                type="button"
                id="jobdetail-save-hero-btn"
                onClick={(e) => onToggleSave(job.id, e)}
                className={`w-full py-3.5 px-6 rounded-xl font-bold transition-all flex items-center justify-center space-x-2.5 cursor-pointer text-sm sm:text-base border-2 ${
                  job.isSaved
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                    : 'bg-white hover:bg-blue-50 text-[#0D4EB8] border-[#0D4EB8]'
                }`}
              >
                <Bookmark
                  className={`w-4 h-4 ${
                    job.isSaved ? 'text-amber-500 fill-amber-400' : 'text-[#0D4EB8]'
                  }`}
                />
                <span>{job.isSaved ? 'Đã lưu việc làm' : 'Lưu công việc'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Content Grid (Left 8 cols, Right 4 cols) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT COLUMN: Job description, Requirements, Benefits, Rating survey, Company Card */}
          <div className="lg:col-span-8 space-y-6">
            {/* Section 1: Mô tả công việc */}
            <section className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center space-x-3 mb-5">
                <div className="w-1.5 h-6 bg-[#1967D2] rounded-full" />
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                  Mô tả công việc
                </h2>
              </div>

              <div className="space-y-4">
                {descriptions.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3 text-slate-700 text-sm sm:text-base leading-relaxed">
                    <CheckCircle2 className="w-5 h-5 text-[#1967D2] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 2: Yêu cầu công việc */}
            <section className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center space-x-3 mb-5">
                <div className="w-1.5 h-6 bg-[#1967D2] rounded-full" />
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                  Yêu cầu công việc
                </h2>
              </div>

              <div className="space-y-4">
                {requirements.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-3 text-slate-700 text-sm sm:text-base leading-relaxed">
                    <CheckCircle2 className="w-5 h-5 text-[#1967D2] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 3: Quyền lợi được hưởng (2x2 grid) */}
            <section className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-1.5 h-6 bg-[#1967D2] rounded-full" />
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                  Quyền lợi được hưởng
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Benefit 1 */}
                <div className="bg-[#EEF4FF]/70 border border-[#D5E3FC] rounded-2xl p-4 sm:p-5 flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#DCE8FE] text-[#1967D2] flex items-center justify-center shrink-0">
                    <Gift className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      Thưởng hiệu quả
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-snug">
                      Thưởng theo KPI và hiệu quả kinh doanh cuối năm (lương tháng 13, 14).
                    </p>
                  </div>
                </div>

                {/* Benefit 2 */}
                <div className="bg-[#EEF4FF]/70 border border-[#D5E3FC] rounded-2xl p-4 sm:p-5 flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#DCE8FE] text-[#1967D2] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      Bảo hiểm & Sức khỏe
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-snug">
                      Bảo hiểm sức khỏe cao cấp (PVI/Bảo Việt) cho nhân viên và người thân.
                    </p>
                  </div>
                </div>

                {/* Benefit 3 */}
                <div className="bg-[#EEF4FF]/70 border border-[#D5E3FC] rounded-2xl p-4 sm:p-5 flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#DCE8FE] text-[#1967D2] flex items-center justify-center shrink-0">
                    <Laptop className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      Thiết bị hiện đại
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-snug">
                      Cấp MacBook Pro/Dell XPS và màn hình rời 4K để làm việc.
                    </p>
                  </div>
                </div>

                {/* Benefit 4 */}
                <div className="bg-[#EEF4FF]/70 border border-[#D5E3FC] rounded-2xl p-4 sm:p-5 flex items-start space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#DCE8FE] text-[#1967D2] flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                      Môi trường trẻ
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-snug">
                      Văn phòng sáng tạo, nhiều hoạt động team building hàng quý.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4: Đánh giá độ tin cậy của tin tuyển dụng */}
            <section className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs text-center">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-6">
                Bạn thấy độ tin cậy &amp; Rõ ràng của tin tuyển dụng này thế nào?
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {ratingOptions.map((opt) => {
                  const isSelected = selectedRating === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleRate(opt)}
                      className={`p-3 sm:p-4 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between min-h-[110px] sm:min-h-[120px] ${
                        isSelected
                          ? 'border-[#0D4EB8] bg-blue-50/70 text-[#0D4EB8] shadow-xs ring-2 ring-[#0D4EB8]/20'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <div className={`mb-2.5 transition-transform ${isSelected ? 'scale-110 text-[#0D4EB8]' : 'text-slate-600'}`}>
                        {opt.face}
                      </div>
                      <span className="text-[11px] sm:text-xs font-semibold leading-tight">
                        {opt.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {ratingSubmitted && (
                <p className="mt-4 text-xs font-semibold text-emerald-600 animate-fadeIn">
                  ✓ Cảm ơn bạn đã phản hồi! Đánh giá này giúp JobCentral duy trì tin tuyển dụng chất lượng cao.
                </p>
              )}
            </section>

            {/* Section 5: Thẻ công ty tuyển dụng */}
            <section className="bg-[#EEF4FF] border border-[#D5E3FC] rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-xs">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                {/* Office photo */}
                <div className="w-full sm:w-36 h-24 rounded-2xl overflow-hidden shrink-0 border border-slate-200/90 shadow-2xs bg-white">
                  <img
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&auto=format&fit=crop&q=80"
                    alt={companyName}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold text-[#0D4EB8] tracking-tight">
                    {companyName}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    Nexus Career Systems là đơn vị hàng đầu trong việc cung cấp các giải pháp nhân sự và công nghệ tuyển dụng. Với hơn 10 năm kinh nghiệm, chúng tôi đã kết nối thành công hàng nghìn ứng viên với các doanh nghiệp uy tín.
                  </p>
                  <button
                    type="button"
                    onClick={() => onViewCompany && onViewCompany(companyName)}
                    className="mt-3.5 inline-flex items-center space-x-1.5 text-xs sm:text-sm font-bold text-[#0D4EB8] hover:underline cursor-pointer group"
                  >
                    <span>Xem hồ sơ công ty</span>
                    <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: Thông tin chung & Việc làm liên quan */}
          <div className="lg:col-span-4 space-y-6">
            {/* Card 1: Thông tin chung */}
            <aside className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs">
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 border-b border-slate-100 pb-3 mb-5 tracking-tight">
                Thông tin chung
              </h2>

              <div className="space-y-4">
                {/* Ngành nghề */}
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-[#1967D2] shrink-0">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-medium text-slate-400 block uppercase tracking-wider">
                      Ngành nghề
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900">
                      IT - Phần mềm, Thiết kế
                    </span>
                  </div>
                </div>

                {/* Cấp bậc */}
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-[#1967D2] shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-medium text-slate-400 block uppercase tracking-wider">
                      Cấp bậc
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900">
                      Nhân viên / Chuyên viên
                    </span>
                  </div>
                </div>

                {/* Số lượng tuyển */}
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-[#1967D2] shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-medium text-slate-400 block uppercase tracking-wider">
                      Số lượng tuyển
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900">
                      02 người
                    </span>
                  </div>
                </div>

                {/* Ngôn ngữ hồ sơ */}
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-[#1967D2] shrink-0">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-medium text-slate-400 block uppercase tracking-wider">
                      Ngôn ngữ hồ sơ
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900">
                      Tiếng Anh / Tiếng Việt
                    </span>
                  </div>
                </div>
              </div>

              {/* Map Preview Graphic */}
              <div className="mt-6 rounded-2xl overflow-hidden border border-slate-200 relative bg-[#EBF1F6] h-40 flex flex-col justify-between p-3">
                {/* Styled Map Background Vector Elements */}
                <div className="absolute inset-0 opacity-80 pointer-events-none">
                  {/* Grid / Street lines */}
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="detail-map-grid" width="36" height="36" patternUnits="userSpaceOnUse">
                        <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#D3E0EA" strokeWidth="1.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="#EBF1F6" />
                    <rect width="100%" height="100%" fill="url(#detail-map-grid)" />
                    {/* Main roads */}
                    <path d="M -10 60 Q 150 70 350 40" stroke="#FFFFFF" strokeWidth="12" fill="none" />
                    <path d="M 120 -10 Q 140 100 160 200" stroke="#FFFFFF" strokeWidth="14" fill="none" />
                    <path d="M -10 130 L 350 120" stroke="#FDE68A" strokeWidth="6" fill="none" />
                  </svg>
                </div>

                {/* Pin indicator with label */}
                <div className="relative z-10 flex items-center space-x-1.5 self-center mt-3 bg-white/95 px-3 py-1 rounded-full shadow-xs border border-slate-200">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1967D2] animate-ping" />
                  <span className="text-[10px] font-bold text-slate-800">
                    Chi tiết việc làm - JobCentral
                  </span>
                </div>

                {/* Button: Mở Google Maps */}
                <button
                  type="button"
                  onClick={handleOpenGoogleMaps}
                  className="relative z-10 self-start px-3 py-1.5 bg-white/95 hover:bg-white text-slate-700 hover:text-[#1967D2] rounded-xl border border-slate-200 text-xs font-semibold shadow-xs flex items-center space-x-1.5 transition-colors cursor-pointer"
                >
                  <Map className="w-3.5 h-3.5 text-[#1967D2]" />
                  <span>Mở Google Maps</span>
                </button>
              </div>
            </aside>

            {/* Card 2: Việc làm liên quan */}
            <aside className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs">
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 border-b border-slate-100 pb-3 mb-4 tracking-tight">
                Việc làm liên quan
              </h2>

              <div className="divide-y divide-slate-100">
                {displayRelatedJobs.map((relJob) => (
                  <div
                    key={relJob.id}
                    onClick={() => onSelectRelatedJob && onSelectRelatedJob(relJob)}
                    className="py-3.5 first:pt-0 last:pb-0 hover:bg-slate-50/80 -mx-2 px-2 rounded-xl transition-colors cursor-pointer group"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 p-1 flex items-center justify-center shrink-0 overflow-hidden">
                        {relJob.companyLogo ? (
                          <img
                            src={relJob.companyLogo}
                            alt={relJob.company}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <Building2 className="w-5 h-5 text-[#2170E4]" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#1967D2] transition-colors truncate">
                          {relJob.title}
                        </h4>
                        <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
                          {relJob.company}
                        </p>

                        <div className="flex items-center justify-between text-xs mt-2">
                          <span className="font-bold text-[#1967D2]">
                            {relJob.salaryUsd || relJob.salary}
                          </span>
                          <span className="text-slate-400 flex items-center space-x-1">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            <span>{relJob.location?.split(',').pop()?.trim() || relJob.location}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Button: Xem thêm việc làm */}
              <button
                type="button"
                onClick={onNavigateJobs}
                className="w-full mt-5 py-2.5 rounded-xl border border-[#1967D2] text-[#1967D2] hover:bg-blue-50 font-bold text-xs sm:text-sm flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
              >
                <span>Xem thêm việc làm</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};
export default JobDetailView;
