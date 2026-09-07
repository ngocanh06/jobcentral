import React, { useState, useMemo, useEffect } from 'react';
import {
  Building2,
  MapPin,
  Users,
  Globe,
  Plus,
  Check,
  Bookmark,
  Share2,
  Link2,
  Mail,
  ArrowLeft,
  Star,
  ExternalLink,
  Briefcase,
  ChevronRight,
  Layers,
  Sparkles,
  Code2,
  Layout,
  TrendingUp,
  Award,
  Search,
  Filter,
  CheckCircle2,
  ThumbsUp,
  Heart,
  MessageSquare,
  Clock,
  DollarSign,
  ShieldCheck,
  Cpu,
  Coffee,
  Smile,
  Compass,
} from 'lucide-react';
import { JobCardSkeleton } from './JobCardSkeleton';
import { ErrorBoundary } from './ErrorBoundary';

export const CompanyDetailView = ({
  company,
  allJobs = [],
  onBack,
  onApplyJob,
  onViewJobDetail,
  onToggleSaveJob,
  onShareJob,
  followedCompanyIds = [],
  onToggleFollowCompany,
}) => {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'jobs' | 'reviews'
  const [internalFollowing, setInternalFollowing] = useState(false);
  const [savedJobIds, setSavedJobIds] = useState(new Set(['job-tf-1']));
  const [copiedLink, setCopiedLink] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);

  // Job filters for the "Tuyển dụng" tab
  const [jobSearchTerm, setJobSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedJobType, setSelectedJobType] = useState('all');
  const [isSearchingJobs, setIsSearchingJobs] = useState(false);

  // Transition skeleton on filter changes in company jobs
  useEffect(() => {
    setIsSearchingJobs(true);
    const timer = setTimeout(() => {
      setIsSearchingJobs(false);
    }, 240);
    return () => clearTimeout(timer);
  }, [jobSearchTerm, selectedDepartment, selectedJobType]);

  // Default fallback data matching screenshot exactly for TechFlow Solutions
  const currentCompany = {
    id: company?.id || 'c1',
    name: company?.name || 'TechFlow Solutions',
    industry: company?.industry || 'Công nghệ phần mềm',
    location: company?.location || 'TP. Hồ Chí Minh',
    employees: company?.employees || '500+ Nhân viên',
    website: 'https://techflow.example.com',
    openJobsCount: 12,
    rating: company?.rating || 4.9,
    reviewsCount: company?.reviewsCount || 142,
    coverImage:
      company?.coverImage ||
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&auto=format&fit=crop&q=80',
    logo:
      company?.logo ||
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80',
    aboutP1:
      company?.aboutP1 ||
      'TechFlow Solutions là đơn vị hàng đầu trong việc cung cấp các giải pháp công nghệ đột phá cho thị trường Fintech và E-commerce toàn cầu. Được thành lập từ năm 2015, chúng tôi tự hào xây dựng một môi trường làm việc sáng tạo, nơi các tài năng công nghệ có thể phát triển tối đa tiềm năng bản thân.',
    aboutP2:
      company?.aboutP2 ||
      'Với sứ mệnh "Nâng tầm trải nghiệm số", TechFlow không ngừng đầu tư vào các công nghệ mới nhất như AI, Blockchain và Cloud Native để mang đến những giá trị thực chất cho khách hàng và cộng đồng.',
  };

  // Full 12 jobs for the company
  const fullCompanyJobs = useMemo(
    () => [
      {
        id: 'job-tf-1',
        title: 'Senior UI/UX Designer',
        department: 'design',
        departmentLabel: 'Thiết kế & Sản phẩm',
        company: currentCompany.name,
        type: 'Full-time',
        salary: '$1,500 - $2,500',
        location: 'TP. Hồ Chí Minh',
        postedTime: '2 ngày trước',
        iconBg: 'bg-indigo-50 text-indigo-600',
        iconType: 'pen',
        featured: true,
        tags: ['Figma', 'Design System', 'User Research'],
      },
      {
        id: 'job-tf-2',
        title: 'Frontend Developer (ReactJS)',
        department: 'tech',
        departmentLabel: 'Kỹ thuật & Công nghệ',
        company: currentCompany.name,
        type: 'Remote',
        salary: '$2,000 - $3,500',
        location: 'Toàn quốc',
        postedTime: 'Vừa đăng',
        iconBg: 'bg-emerald-50 text-emerald-600',
        iconType: 'code',
        featured: true,
        tags: ['React', 'TypeScript', 'TailwindCSS'],
      },
      {
        id: 'job-tf-3',
        title: 'Project Manager (Fintech)',
        department: 'product',
        departmentLabel: 'Thiết kế & Sản phẩm',
        company: currentCompany.name,
        type: 'Full-time',
        salary: 'Thỏa thuận',
        location: 'TP. Hồ Chí Minh',
        postedTime: '5 ngày trước',
        iconBg: 'bg-blue-50 text-[#0A58CA]',
        iconType: 'briefcase',
        featured: true,
        tags: ['Agile', 'Scrum', 'Fintech'],
      },
      {
        id: 'job-tf-4',
        title: 'Product Marketing Lead',
        department: 'marketing',
        departmentLabel: 'Marketing & Vận hành',
        company: currentCompany.name,
        type: 'Hybrid',
        salary: '$2,500+',
        location: 'TP. Hồ Chí Minh',
        postedTime: '1 tuần trước',
        iconBg: 'bg-cyan-50 text-cyan-600',
        iconType: 'trending',
        featured: true,
        tags: ['Growth', 'Go-to-market', 'Analytics'],
      },
      {
        id: 'job-tf-5',
        title: 'Senior Backend Engineer (Golang/Node.js)',
        department: 'tech',
        departmentLabel: 'Kỹ thuật & Công nghệ',
        company: currentCompany.name,
        type: 'Full-time',
        salary: '$2,200 - $3,800',
        location: 'TP. Hồ Chí Minh',
        postedTime: '3 ngày trước',
        iconBg: 'bg-purple-50 text-purple-600',
        iconType: 'code',
        tags: ['Golang', 'Node.js', 'Microservices', 'PostgreSQL'],
      },
      {
        id: 'job-tf-6',
        title: 'DevOps & Cloud Architect (AWS/K8s)',
        department: 'tech',
        departmentLabel: 'Kỹ thuật & Công nghệ',
        company: currentCompany.name,
        type: 'Remote',
        salary: '$2,500 - $4,000',
        location: 'Toàn quốc',
        postedTime: '4 ngày trước',
        iconBg: 'bg-amber-50 text-amber-600',
        iconType: 'code',
        tags: ['AWS', 'Kubernetes', 'CI/CD', 'Terraform'],
      },
      {
        id: 'job-tf-7',
        title: 'AI / Machine Learning Engineer',
        department: 'tech',
        departmentLabel: 'Kỹ thuật & Công nghệ',
        company: currentCompany.name,
        type: 'Full-time',
        salary: '$2,200 - $3,600',
        location: 'TP. Hồ Chí Minh',
        postedTime: '1 tuần trước',
        iconBg: 'bg-rose-50 text-rose-600',
        iconType: 'code',
        tags: ['Python', 'LLM', 'PyTorch', 'Computer Vision'],
      },
      {
        id: 'job-tf-8',
        title: 'QA Automation Lead',
        department: 'tech',
        departmentLabel: 'Kỹ thuật & Công nghệ',
        company: currentCompany.name,
        type: 'Hybrid',
        salary: '$1,600 - $2,600',
        location: 'TP. Hồ Chí Minh',
        postedTime: '6 ngày trước',
        iconBg: 'bg-teal-50 text-teal-600',
        iconType: 'briefcase',
        tags: ['Selenium', 'Cypress', 'Automation Test'],
      },
      {
        id: 'job-tf-9',
        title: 'Data Analyst (Fintech & BI)',
        department: 'tech',
        departmentLabel: 'Kỹ thuật & Công nghệ',
        company: currentCompany.name,
        type: 'Full-time',
        salary: '$1,200 - $2,000',
        location: 'TP. Hồ Chí Minh',
        postedTime: '3 ngày trước',
        iconBg: 'bg-sky-50 text-sky-600',
        iconType: 'trending',
        tags: ['SQL', 'Power BI', 'Python', 'Tableau'],
      },
      {
        id: 'job-tf-10',
        title: 'Mobile App Developer (Flutter / React Native)',
        department: 'tech',
        departmentLabel: 'Kỹ thuật & Công nghệ',
        company: currentCompany.name,
        type: 'Remote',
        salary: '$1,800 - $3,000',
        location: 'Toàn quốc',
        postedTime: '5 ngày trước',
        iconBg: 'bg-indigo-50 text-indigo-600',
        iconType: 'code',
        tags: ['Flutter', 'React Native', 'iOS', 'Android'],
      },
      {
        id: 'job-tf-11',
        title: 'Technical Product Owner',
        department: 'product',
        departmentLabel: 'Thiết kế & Sản phẩm',
        company: currentCompany.name,
        type: 'Full-time',
        salary: '$2,000 - $3,200',
        location: 'TP. Hồ Chí Minh',
        postedTime: '1 tuần trước',
        iconBg: 'bg-emerald-50 text-emerald-600',
        iconType: 'briefcase',
        tags: ['Product Strategy', 'Backlog Management', 'API'],
      },
      {
        id: 'job-tf-12',
        title: 'Security & Compliance Specialist',
        department: 'tech',
        departmentLabel: 'Kỹ thuật & Công nghệ',
        company: currentCompany.name,
        type: 'Full-time',
        salary: '$2,000 - $3,500',
        location: 'TP. Hồ Chí Minh',
        postedTime: '2 tuần trước',
        iconBg: 'bg-slate-50 text-slate-600',
        iconType: 'briefcase',
        tags: ['ISO 27001', 'PCI-DSS', 'Penetration Testing'],
      },
    ],
    [currentCompany.name]
  );

  // Overview 4 featured jobs
  const overviewJobs = fullCompanyJobs.slice(0, 4);

  // Filtered jobs in "Tuyển dụng" tab
  const filteredJobs = useMemo(() => {
    return fullCompanyJobs.filter((job) => {
      const matchSearch =
        job.title.toLowerCase().includes(jobSearchTerm.toLowerCase()) ||
        job.tags.some((t) => t.toLowerCase().includes(jobSearchTerm.toLowerCase()));
      const matchDept =
        selectedDepartment === 'all' || job.department === selectedDepartment;
      const matchType =
        selectedJobType === 'all' ||
        (selectedJobType === 'fulltime' && job.type === 'Full-time') ||
        (selectedJobType === 'remote' && job.type === 'Remote') ||
        (selectedJobType === 'hybrid' && job.type === 'Hybrid');
      return matchSearch && matchDept && matchType;
    });
  }, [fullCompanyJobs, jobSearchTerm, selectedDepartment, selectedJobType]);

  // Mock employee reviews for the Reviews tab
  const reviewsData = [
    {
      id: 'rev-1',
      author: 'Senior Software Engineer',
      department: 'Phòng Kỹ thuật & R&D',
      tenure: 'Đã làm việc hơn 3 năm',
      date: 'Tháng 7, 2026',
      rating: 5,
      title: 'Môi trường công nghệ mở, nhiều thử thách và đãi ngộ xứng đáng',
      pros: 'Tech stack hiện đại, áp dụng AI và Microservices thực tế. Sếp tâm lý, đồng nghiệp giỏi và sẵn sàng chia sẻ. Thưởng performance rõ ràng, bảo hiểm sức khỏe VIP cho cả gia đình.',
      cons: 'Đôi khi có đợt release gấp vào cuối quý nhưng luôn có overtime lương x2 và ngày nghỉ bù đầy đủ.',
      likes: 34,
      recommends: true,
    },
    {
      id: 'rev-2',
      author: 'Product Designer (UI/UX)',
      department: 'Phòng Sản phẩm',
      tenure: 'Đã làm việc 1.5 năm',
      date: 'Tháng 6, 2026',
      rating: 5,
      title: 'Cơ hội phát triển kỹ năng thiết kế sản phẩm quốc tế tuyệt vời',
      pros: 'Quy trình làm việc chuẩn Agile, Design System được đầu tư bài bản. Được cấp MacBook Pro M3 Max và màn hình 4K. Chế độ Hybrid linh hoạt 2 ngày WFH mỗi tuần.',
      cons: 'Số lượng dự án khá nhiều nên cần kỹ năng quản lý thời gian tốt.',
      likes: 21,
      recommends: true,
    },
    {
      id: 'rev-3',
      author: 'Data Analyst',
      department: 'Phòng Phân tích Dữ liệu',
      tenure: 'Đã làm việc 2 năm',
      date: 'Tháng 5, 2026',
      rating: 4.8,
      title: 'Văn hóa công ty cởi mở, chế độ đào tạo và phúc lợi tốt',
      pros: 'Hỗ trợ 100% chi phí thi các chứng chỉ quốc tế (AWS, GCP, Scrum). Pantry tràn ngập đồ ăn nhẹ và cà phê hảo hạng. Văn phòng xanh mát, view Landmark 81 cực đẹp.',
      cons: 'Mở rộng quy mô nhanh nên cần đồng bộ tài liệu nội bộ tốt hơn nữa.',
      likes: 18,
      recommends: true,
    },
  ];

  // Activities gallery photos
  const activityPhotos = [
    {
      id: 1,
      title: 'Team Workshop',
      url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 2,
      title: 'Company Dinner',
      url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 3,
      title: 'Modern Workspace',
      url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&auto=format&fit=crop&q=80',
    },
    {
      id: 4,
      title: 'Developer Setup',
      url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&auto=format&fit=crop&q=80',
    },
  ];

  const toggleSave = (jobId) => {
    setSavedJobIds((prev) => {
      const next = new Set(prev);
      if (next.has(jobId)) {
        next.delete(jobId);
      } else {
        next.add(jobId);
      }
      return next;
    });
    if (onToggleSaveJob) {
      onToggleSaveJob(jobId);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleGoToAllJobs = () => {
    setActiveTab('jobs');
    // Scroll to the jobs section smoothly
    const tabEl = document.getElementById('company-detail-tabs');
    if (tabEl) {
      tabEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderJobCard = (job) => {
    const isSaved = savedJobIds.has(job.id);

    return (
      <div
        key={job.id}
        id={`company-job-card-${job.id}`}
        className="bg-white rounded-2xl border border-slate-200/90 p-5 hover:border-[#2170E4]/60 hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative group"
      >
        {/* Header Row: Company Logo Placeholder + Title + Company + Bookmark */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start space-x-3.5 flex-1 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200 overflow-hidden flex items-center justify-center text-[#2170E4] font-bold text-sm shrink-0">
              {job.companyLogo || currentCompany?.logo ? (
                <img
                  src={job.companyLogo || currentCompany?.logo}
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
                onClick={() => {
                  if (onViewJobDetail) {
                    onViewJobDetail({
                      id: job.id,
                      title: job.title,
                      company: job.company,
                      salary: job.salary,
                      location: job.location,
                    });
                  }
                }}
                className="text-sm font-bold text-slate-900 truncate hover:text-[#2170E4] cursor-pointer transition-colors"
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
              id={`company-share-btn-${job.id}`}
              onClick={(e) => {
                if (e) e.stopPropagation();
                if (onShareJob) {
                  onShareJob(job, e);
                } else {
                  handleCopyLink();
                }
              }}
              className="p-1.5 text-slate-400 hover:text-[#2170E4] transition-colors cursor-pointer"
              title="Chia sẻ việc làm"
              aria-label="Chia sẻ việc làm"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              type="button"
              id={`company-bookmark-btn-${job.id}`}
              onClick={(e) => {
                if (e) e.stopPropagation();
                toggleSave(job.id);
              }}
              className="p-1.5 text-slate-400 hover:text-[#2170E4] transition-colors cursor-pointer"
              title={isSaved ? 'Bỏ lưu việc làm' : 'Lưu việc làm'}
              aria-label="Lưu việc làm"
            >
              <Bookmark
                className={`w-4 h-4 ${
                  isSaved ? 'text-[#2170E4] fill-[#2170E4]' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* Tags Row */}
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium">
          <span className="px-2.5 py-1 bg-blue-50 text-[#2170E4] rounded-md font-semibold">
            {job.jobType || job.type || 'Full-time'}
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
            id={`apply-btn-${job.id}`}
            onClick={(e) => {
              if (e) e.stopPropagation();
              if (onApplyJob) {
                onApplyJob({
                  id: job.id,
                  title: job.title,
                  company: job.company,
                  salary: job.salary,
                  location: job.location,
                });
              }
            }}
            className="px-5 py-2 bg-[#2170E4] hover:bg-[#1a5bbd] text-white font-semibold rounded-lg text-xs shadow-xs transition-all cursor-pointer"
          >
            Ứng tuyển ngay
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full bg-[#f8fafd] min-h-screen text-slate-800 pb-16">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        {/* Top Banner Section */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-xs bg-slate-900 border border-slate-200/80">
          <img
            src={currentCompany.coverImage}
            alt={currentCompany.name}
            className="w-full h-56 sm:h-72 md:h-80 lg:h-[340px] object-cover object-center"
          />
          {/* Subtle gradient overlay at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

          {/* Floating Back Button */}
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              title="Quay lại danh sách công ty"
              className="absolute top-4 left-4 z-20 inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-white/95 hover:bg-white text-slate-700 hover:text-[#2170E4] text-xs font-semibold shadow-xs backdrop-blur-xs transition-all cursor-pointer border border-slate-200/60"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Quay lại</span>
            </button>
          )}
        </div>

        {/* Company Header Row (Info below banner, avatar nudged up into banner) */}
        <div className="relative px-2 sm:px-4 z-10 mt-3 sm:mt-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            {/* Left: Logo & Company Info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 sm:gap-6">
              {/* Company Logo Badge (nudged up into banner) */}
              <div className="-mt-14 sm:-mt-18 md:-mt-22 w-28 h-24 sm:w-36 sm:h-32 rounded-2xl bg-white border border-slate-200/90 shadow-md p-2.5 flex items-center justify-center shrink-0 z-20">
                <div className="w-full h-full flex flex-col items-center justify-center bg-[#F8FAFC] rounded-xl p-2 text-center border border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2170E4] flex items-center justify-center font-black text-sm mb-1">
                    TF
                  </div>
                  <span className="text-xs font-extrabold text-slate-800 tracking-tight leading-none">
                    TechFlow
                  </span>
                  <span className="text-[9px] text-slate-400 font-semibold tracking-wider mt-0.5 uppercase">
                    SOLUTIONS
                  </span>
                </div>
              </div>

              {/* Title & Metadata (comfortably below the image) */}
              <div className="pt-2 pb-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {currentCompany.name}
                </h1>
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-2 text-xs sm:text-sm text-slate-500 font-medium">
                  <div className="flex items-center space-x-1.5">
                    <Building2 className="w-4 h-4 text-slate-400" />
                    <span>{currentCompany.industry}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span>{currentCompany.location}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Users className="w-4 h-4 text-slate-400" />
                    <span>{currentCompany.employees}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Action Buttons (+ Theo dõi & Website) */}
            <div className="flex items-center space-x-3 shrink-0 pb-1">
              {/* + Theo dõi Button */}
              {(() => {
                const isFollowing = onToggleFollowCompany
                  ? followedCompanyIds.includes(currentCompany.id)
                  : internalFollowing;

                return (
                  <button
                    type="button"
                    id={`company-detail-follow-btn-${currentCompany.id}`}
                    onClick={() => {
                      if (onToggleFollowCompany) {
                        onToggleFollowCompany(currentCompany.id);
                      } else {
                        setInternalFollowing(!internalFollowing);
                      }
                    }}
                    className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold border transition-all flex items-center space-x-1.5 cursor-pointer shadow-2xs ${
                      isFollowing
                        ? 'bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100'
                        : 'bg-white border-slate-300 hover:border-slate-400 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {isFollowing ? (
                      <>
                        <Check className="w-4 h-4 text-rose-600" />
                        <span>Đang theo dõi</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Theo dõi</span>
                      </>
                    )}
                  </button>
                );
              })()}

              {/* Website Button */}
              <a
                href={currentCompany.website}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-2.5 rounded-lg text-xs sm:text-sm font-semibold bg-[#2170E4] hover:bg-[#1a5bbd] text-white transition-colors shadow-2xs flex items-center space-x-2 cursor-pointer"
              >
                <Globe className="w-4 h-4" />
                <span>Website</span>
              </a>
            </div>
          </div>
        </div>

        {/* Tab Navigation Menu */}
        <div id="company-detail-tabs" className="border-b border-slate-200 mt-8 mb-8 bg-transparent">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3.5 text-sm sm:text-base font-bold transition-colors relative cursor-pointer ${
                activeTab === 'overview'
                  ? 'text-[#2170E4]'
                  : 'text-slate-600 hover:text-slate-900 font-medium'
              }`}
            >
              <span>Tổng quan</span>
              {activeTab === 'overview' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2170E4]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('jobs')}
              className={`pb-3.5 text-sm sm:text-base transition-colors relative cursor-pointer ${
                activeTab === 'jobs'
                  ? 'text-[#2170E4] font-bold'
                  : 'text-slate-600 hover:text-slate-900 font-medium'
              }`}
            >
              <span>Tuyển dụng ({currentCompany.openJobsCount})</span>
              {activeTab === 'jobs' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2170E4]" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3.5 text-sm sm:text-base transition-colors relative cursor-pointer ${
                activeTab === 'reviews'
                  ? 'text-[#2170E4] font-bold'
                  : 'text-slate-600 hover:text-slate-900 font-medium'
              }`}
            >
              <span>Đánh giá</span>
              {activeTab === 'reviews' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2170E4]" />
              )}
            </button>
          </nav>
        </div>

        {/* Main 2-Column Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-8">
            {/* TAB 1: TỔNG QUAN (OVERVIEW) */}
            {activeTab === 'overview' && (
              <>
                {/* Card: Về chúng tôi */}
                <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-2xs">
                  <h2 className="text-xl font-bold text-slate-900 mb-4">
                    Về chúng tôi
                  </h2>
                  <div className="space-y-4 text-sm sm:text-[15px] text-slate-600 leading-relaxed">
                    <p>{currentCompany.aboutP1}</p>
                    <p>{currentCompany.aboutP2}</p>
                  </div>
                </div>

                {/* Section: Vị trí đang tuyển (4 featured jobs) */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-slate-900">
                      Vị trí đang tuyển
                    </h2>
                    {/* The requested link "Xem tất cả 12 vị trí" */}
                    <button
                      type="button"
                      id="btn-view-all-company-jobs"
                      onClick={handleGoToAllJobs}
                      className="text-sm font-semibold text-[#2170E4] hover:underline cursor-pointer transition-colors"
                    >
                      Xem tất cả {currentCompany.openJobsCount} vị trí
                    </button>
                  </div>

                  {/* 2x2 Jobs Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {overviewJobs.map((job) => renderJobCard(job))}
                  </div>
                </div>
              </>
            )}

            {/* TAB 2: TOÀN BỘ VỊ TRÍ TUYỂN DỤNG (JOBS TAB) */}
            {activeTab === 'jobs' && (
              <div className="space-y-6">
                {/* Search & Filter Toolbar */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    {/* Search Input */}
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        value={jobSearchTerm}
                        onChange={(e) => setJobSearchTerm(e.target.value)}
                        placeholder="Tìm theo chức danh, kỹ năng (React, Golang, Figma, AWS...)"
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-[#0A58CA]"
                      />
                    </div>

                    {/* Job Type Selector */}
                    <select
                      value={selectedJobType}
                      onChange={(e) => setSelectedJobType(e.target.value)}
                      className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-700 font-medium focus:outline-hidden focus:border-[#0A58CA]"
                    >
                      <option value="all">Tất cả hình thức</option>
                      <option value="fulltime">Full-time</option>
                      <option value="remote">Remote</option>
                      <option value="hybrid">Hybrid</option>
                    </select>
                  </div>

                  {/* Department Filter Pills */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 text-xs font-medium">
                    {[
                      { id: 'all', label: `Tất cả (${fullCompanyJobs.length})` },
                      {
                        id: 'tech',
                        label: `Kỹ thuật & Công nghệ (${
                          fullCompanyJobs.filter((j) => j.department === 'tech').length
                        })`,
                      },
                      {
                        id: 'product',
                        label: `Sản phẩm (${
                          fullCompanyJobs.filter((j) => j.department === 'product').length
                        })`,
                      },
                      {
                        id: 'design',
                        label: `Thiết kế UI/UX (${
                          fullCompanyJobs.filter((j) => j.department === 'design').length
                        })`,
                      },
                      {
                        id: 'marketing',
                        label: `Marketing & Vận hành (${
                          fullCompanyJobs.filter((j) => j.department === 'marketing').length
                        })`,
                      },
                    ].map((dept) => (
                      <button
                        key={dept.id}
                        type="button"
                        onClick={() => setSelectedDepartment(dept.id)}
                        className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                          selectedDepartment === dept.id
                            ? 'bg-[#0A58CA] text-white font-bold shadow-2xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {dept.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Results count header */}
                <div className="flex items-center justify-between px-1">
                  <h3 className="text-base font-bold text-slate-900">
                    Đang hiển thị {filteredJobs.length} vị trí phù hợp
                  </h3>
                  {(jobSearchTerm || selectedDepartment !== 'all' || selectedJobType !== 'all') && (
                    <button
                      type="button"
                      onClick={() => {
                        setJobSearchTerm('');
                        setSelectedDepartment('all');
                        setSelectedJobType('all');
                      }}
                      className="text-xs text-[#0A58CA] hover:underline font-semibold cursor-pointer"
                    >
                      Đặt lại bộ lọc
                    </button>
                  )}
                </div>

                {/* Grid of Jobs */}
                <ErrorBoundary
                  title="Không thể tải danh sách tuyển dụng của công ty"
                  message="Đã có lỗi xảy ra khi hiển thị các vị trí tuyển dụng. Vui lòng nhấn đặt lại bộ lọc hoặc tải lại."
                  onReset={() => {
                    setJobSearchTerm('');
                    setSelectedDepartment('all');
                    setSelectedJobType('all');
                  }}
                >
                  {isSearchingJobs ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <JobCardSkeleton count={4} variant="compact" />
                    </div>
                  ) : filteredJobs.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8">
                      <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                      <h4 className="text-base font-bold text-slate-800">
                        Không tìm thấy công việc phù hợp
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        Hãy thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setJobSearchTerm('');
                          setSelectedDepartment('all');
                          setSelectedJobType('all');
                        }}
                        className="mt-4 px-4 py-2 bg-[#0A58CA] text-white text-xs font-bold rounded-xl"
                      >
                        Xem toàn bộ 12 công việc
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {filteredJobs.map((job) => renderJobCard(job))}
                    </div>
                  )}
                </ErrorBoundary>
              </div>
            )}

            {/* TAB 3: ĐÁNH GIÁ (REVIEWS TAB) */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {/* Score Summary Box */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-2xs">
                  <h2 className="text-xl font-bold text-slate-900 mb-6">
                    Đánh giá từ nhân viên
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    {/* Big Score */}
                    <div className="md:col-span-4 text-center md:border-r border-slate-200 md:pr-6">
                      <div className="text-5xl font-black text-slate-900">
                        {currentCompany.rating}
                      </div>
                      <div className="flex items-center justify-center space-x-1 my-2">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className="w-4 h-4 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>
                      <p className="text-xs text-slate-500">
                        Dựa trên {currentCompany.reviewsCount} lượt đánh giá thực tế
                      </p>
                    </div>

                    {/* Criteria Bars */}
                    <div className="md:col-span-8 space-y-3">
                      {[
                        { label: 'Môi trường làm việc & Đồng nghiệp', score: '4.9/5', percent: '98%' },
                        { label: 'Chế độ lương thưởng & Đãi ngộ', score: '4.8/5', percent: '96%' },
                        { label: 'Cơ hội phát triển sự nghiệp', score: '4.9/5', percent: '98%' },
                        { label: 'Văn hóa doanh nghiệp & Lãnh đạo', score: '5.0/5', percent: '100%' },
                      ].map((item, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between text-xs font-semibold text-slate-700">
                            <span>{item.label}</span>
                            <span className="text-[#0A58CA]">{item.score}</span>
                          </div>
                          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#0A58CA] rounded-full"
                              style={{ width: item.percent }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-slate-900">
                    Nhận xét tiêu biểu gần đây
                  </h3>

                  {reviewsData.map((rev) => (
                    <div
                      key={rev.id}
                      className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                                />
                              ))}
                            </div>
                            <span className="text-xs font-bold text-slate-900">
                              {rev.rating}.0
                            </span>
                            <span className="text-slate-300">•</span>
                            <span className="text-xs text-slate-500">
                              {rev.date}
                            </span>
                          </div>
                          <h4 className="text-sm sm:text-base font-bold text-slate-900 mt-1.5">
                            {rev.title}
                          </h4>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {rev.author} • {rev.department} • {rev.tenure}
                          </p>
                        </div>

                        {rev.recommends && (
                          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[11px] font-bold rounded-lg border border-emerald-200 flex items-center space-x-1 shrink-0">
                            <ThumbsUp className="w-3 h-3" />
                            <span>Khuyên làm việc</span>
                          </span>
                        )}
                      </div>

                      <div className="space-y-2 text-xs sm:text-sm text-slate-600">
                        <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-3">
                          <p className="font-bold text-emerald-800 text-xs mb-1">
                            👍 Điểm cộng:
                          </p>
                          <p className="text-slate-700 leading-relaxed">
                            {rev.pros}
                          </p>
                        </div>
                        <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-3">
                          <p className="font-bold text-amber-800 text-xs mb-1">
                            💡 Điểm cần lưu ý:
                          </p>
                          <p className="text-slate-700 leading-relaxed">
                            {rev.cons}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 pt-2 border-t border-slate-100 text-xs text-slate-500">
                        <button
                          type="button"
                          className="flex items-center space-x-1.5 hover:text-[#0A58CA] transition-colors cursor-pointer"
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>Hữu ích ({rev.likes})</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Card 1: Hoạt động công ty */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs">
              <h3 className="text-base font-bold text-slate-900 mb-4">
                Hoạt động công ty
              </h3>

              {/* 2x2 Photos Grid */}
              <div className="grid grid-cols-2 gap-2.5 mb-4">
                {activityPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    className="aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-100 group relative cursor-pointer"
                    onClick={() => setShowGalleryModal(true)}
                  >
                    <img
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>

              {/* Xem tất cả hình ảnh Button */}
              <button
                type="button"
                onClick={() => setShowGalleryModal(true)}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 transition-colors text-center cursor-pointer shadow-2xs"
              >
                Xem tất cả hình ảnh
              </button>
            </div>

            {/* Card 2: Số liệu ấn tượng (Solid Blue) */}
            <div className="bg-[#2170E4] text-white rounded-2xl p-6 sm:p-7 shadow-xs space-y-4">
              <h3 className="text-sm sm:text-base font-bold text-white mb-2">
                Số liệu ấn tượng
              </h3>

              {/* Stat 1 */}
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  95%
                </div>
                <p className="text-xs text-blue-100 mt-1">
                  Tỷ lệ nhân viên hài lòng
                </p>
              </div>

              <div className="border-t border-blue-400/40 my-3.5" />

              {/* Stat 2 */}
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  12+
                </div>
                <p className="text-xs text-blue-100 mt-1">
                  Quốc gia đang hoạt động
                </p>
              </div>

              <div className="border-t border-blue-400/40 my-3.5" />

              {/* Stat 3 */}
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  25%
                </div>
                <p className="text-xs text-blue-100 mt-1">
                  Tăng trưởng hàng năm
                </p>
              </div>
            </div>

            {/* Card 3: Chia sẻ hồ sơ (Light Blue Tint) */}
            <div className="bg-[#EDF2FD] border border-blue-100/70 rounded-2xl p-5 sm:p-6 text-left">
              <h3 className="text-sm font-bold text-slate-900 mb-1">
                Chia sẻ hồ sơ
              </h3>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                Lan tỏa cơ hội nghề nghiệp tại {currentCompany.name} đến bạn bè của bạn.
              </p>

              {/* Share Action Buttons */}
              <div className="flex items-center space-x-3">
                {/* Share Icon */}
                <button
                  type="button"
                  onClick={handleCopyLink}
                  title="Chia sẻ"
                  className="w-10 h-10 rounded-full bg-white hover:bg-slate-50 border border-slate-200/70 text-[#2170E4] flex items-center justify-center shadow-2xs transition-colors cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                </button>

                {/* Link Icon */}
                <button
                  type="button"
                  onClick={handleCopyLink}
                  title="Sao chép liên kết"
                  className="w-10 h-10 rounded-full bg-white hover:bg-slate-50 border border-slate-200/70 text-[#2170E4] flex items-center justify-center shadow-2xs transition-colors cursor-pointer relative"
                >
                  <Link2 className="w-4 h-4" />
                </button>

                {/* Mail Icon */}
                <a
                  href={`mailto:?subject=Cơ hội nghề nghiệp tại ${currentCompany.name}&body=Khám phá cơ hội việc làm tại ${currentCompany.name}: ${window.location.href}`}
                  title="Gửi Email"
                  className="w-10 h-10 rounded-full bg-white hover:bg-slate-50 border border-slate-200/70 text-[#2170E4] flex items-center justify-center shadow-2xs transition-colors cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                </a>

                {copiedLink && (
                  <span className="text-xs font-semibold text-emerald-600 animate-in fade-in">
                    Đã sao chép link!
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Modal */}
      {showGalleryModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 relative">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900">
                Hình ảnh hoạt động - {currentCompany.name}
              </h3>
              <button
                onClick={() => setShowGalleryModal(false)}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto">
              {activityPhotos.map((p) => (
                <div key={p.id} className="space-y-1">
                  <img
                    src={p.url}
                    alt={p.title}
                    className="w-full h-48 object-cover rounded-xl border border-slate-200"
                  />
                  <p className="text-xs text-slate-500 font-medium pl-1">
                    {p.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

