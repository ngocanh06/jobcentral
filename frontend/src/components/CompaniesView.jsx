import React, { useState, useEffect } from 'react';
import {
  Building2,
  Star,
  MapPin,
  Users,
  ArrowRight,
  CheckCircle2,
  Search,
  X,
  Sparkles,
  ChevronDown,
  ChevronRight,
  Bookmark,
  Newspaper,
  Calendar,
  Plus,
  Check,
  UserPlus,
  TrendingUp,
  Clock,
  Info,
  SquarePlay,
  Image,
  FileText,
  ShieldCheck,
} from 'lucide-react';
import { FavoriteCompaniesSection } from './FavoriteCompaniesSection';
import catAvatar from '../assets/images/cat_opentowork_avatar_1791346160613.jpg';

const INITIAL_RECRUITERS = [
  {
    id: 'rec-1',
    name: 'June Nguyen',
    verified: false,
    headline:
      '[IT jobs for Foreigners in Vietnam] Java/NodeJS/AngularJS/.NET Outsystems/ Power BI...',
    companyName: 'FPT Software',
    badgeText: 'FPT',
    reason: 'Dựa trên hồ sơ của bạn',
    avatar: catAvatar,
  },
  {
    id: 'rec-2',
    name: 'Ngọc Vũ Hồng',
    verified: true,
    headline:
      'Talent Acquisition Specialist tại Viettel Aerospace Institute - VTX',
    companyName: 'Viettel Group',
    badgeText: 'VTX',
    reason: 'Dựa trên hồ sơ của bạn',
    avatar: catAvatar,
  },
  {
    id: 'rec-3',
    name: 'Le Duy Dung',
    verified: true,
    headline:
      'Program Director of the B.Sc. in Data Science cum Associate Program Director of the B.Sc. in Computer Science',
    companyName: 'VNG Corporation',
    badgeText: 'VNG',
    reason: 'Dựa trên hồ sơ của bạn',
    avatar: catAvatar,
  },
  {
    id: 'rec-4',
    name: 'Trần Thu Hà',
    verified: true,
    headline:
      'Head of Talent Acquisition tại VNG Corporation • Tuyển dụng Senior AI / Backend Engineers',
    companyName: 'VNG Corporation',
    badgeText: 'VNG',
    reason: 'Dựa trên hồ sơ của bạn',
    avatar: catAvatar,
  },
  {
    id: 'rec-5',
    name: 'Nguyễn Minh Tuấn',
    verified: true,
    headline:
      'Senior IT Recruiter tại Techcombank (TCB) • Chuyên săn nhân tài Khối Công nghệ & Dữ liệu',
    companyName: 'Techcombank',
    badgeText: 'TCB',
    reason: 'Dựa trên hồ sơ của bạn',
    avatar: catAvatar,
  },
];

const INITIAL_CANDIDATES = [
  {
    id: 'cand-1',
    name: 'Manh Hung',
    verified: true,
    headline: 'DevOps Engineer • AWS / Kubernetes / CI-CD Cloud Infrastructure',
    activity: 'Hoạt động gần đây trên bảng tin',
    activityType: 'clock',
    avatar: catAvatar,
  },
  {
    id: 'cand-2',
    name: 'Vinh Đặng Quang',
    verified: true,
    headline: 'Fullstack Software Engineer • ReactJS / Node.js / TypeScript',
    activity: 'Hoạt động gần đây trên bảng tin',
    activityType: 'clock',
    avatar: catAvatar,
  },
  {
    id: 'cand-3',
    name: 'Hoàng Minh Khôi',
    verified: true,
    headline: 'Frontend Developer (React / Next.js) • Đang tìm kiếm cơ hội mới',
    activity: 'Cùng học tại Duy Tan University',
    activityType: 'trend',
    avatar: catAvatar,
  },
  {
    id: 'cand-4',
    name: 'Phạm Thảo Vy',
    verified: true,
    headline: 'Product Designer (UI/UX) • Figma / Design Systems',
    activity: 'Dựa trên hồ sơ của bạn',
    activityType: 'trend',
    avatar: catAvatar,
  },
  {
    id: 'cand-5',
    name: 'Đỗ Quốc Bảo',
    verified: false,
    headline: 'Data Analyst & AI Engineer • Python / SQL / Machine Learning',
    activity: 'Hoạt động gần đây trên bảng tin',
    activityType: 'clock',
    avatar: catAvatar,
  },
];

const TRENDING_NEWS = [
  {
    id: 'n1',
    title: 'Google inks major nuclear power deal with...',
    meta: '2 giờ trước • 885 người đọc',
  },
  {
    id: 'n2',
    title: 'Apple prepares new smart home devices ...',
    meta: '2 giờ trước • 427 người đọc',
  },
  {
    id: 'n3',
    title: 'Tech stocks propel S&P 500, Nasdaq to ...',
    meta: '2 giờ trước • 14.305 người đọc',
  },
  {
    id: 'n4',
    title: 'Skydance officially merges Paramount, ...',
    meta: '2 giờ trước • 6.972 người đọc',
  },
  {
    id: 'n5',
    title: "HubSpot announces layoffs 'not driven b...",
    meta: '2 giờ trước • 6.566 người đọc',
  },
  {
    id: 'n6',
    title: 'FPT Software và VNG mở rộng tuyển dụng kỹ sư AI...',
    meta: '3 giờ trước • 3.410 người đọc',
  },
  {
    id: 'n7',
    title: 'Nhu cầu tuyển dụng nhân sự Fintech tăng mạnh quý 4...',
    meta: '4 giờ trước • 1.920 người đọc',
  },
];

export const CompaniesView = ({
  companies = [],
  currentUser,
  savedCount = 0,
  onSelectCompany,
  onExploreJobs,
  onTabChange,
  onShowToast,
  initialSearchQuery = '',
  onResetSearch,
  followedCompanyIds = [],
  onToggleFollowCompany,
}) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchQuery || '');
  const [followedRecruiterIds, setFollowedRecruiterIds] = useState([]);
  const [connectedCandidateIds, setConnectedCandidateIds] = useState([]);
  const [showAllRecruiters, setShowAllRecruiters] = useState(false);
  const [showAllCandidates, setShowAllCandidates] = useState(false);
  const [showAllNews, setShowAllNews] = useState(false);
  const [showAllCompanies, setShowAllCompanies] = useState(false);

  useEffect(() => {
    if (initialSearchQuery) {
      setSearchTerm(initialSearchQuery);
    }
  }, [initialSearchQuery]);

  const handleToggleFollowRecruiter = (recruiter) => {
    const exists = followedRecruiterIds.includes(recruiter.id);
    setFollowedRecruiterIds((prev) =>
      prev.includes(recruiter.id)
        ? prev.filter((id) => id !== recruiter.id)
        : [...prev, recruiter.id]
    );
    if (onShowToast) {
      onShowToast(
        exists
          ? `Đã bỏ theo dõi nhà tuyển dụng ${recruiter.name}`
          : `Đã theo dõi nhà tuyển dụng ${recruiter.name}!`,
        exists ? 'info' : 'success'
      );
    }
  };

  const handleToggleConnectCandidate = (candidate) => {
    const exists = connectedCandidateIds.includes(candidate.id);
    setConnectedCandidateIds((prev) =>
      prev.includes(candidate.id)
        ? prev.filter((id) => id !== candidate.id)
        : [...prev, candidate.id]
    );
    if (onShowToast) {
      onShowToast(
        exists
          ? `Đã hủy lời mời kết nối với ${candidate.name}`
          : `Đã gửi lời mời kết nối tới ứng viên ${candidate.name}!`,
        exists ? 'info' : 'success'
      );
    }
  };

  const filteredRecruiters = INITIAL_RECRUITERS.filter(
    (r) =>
      !searchTerm.trim() ||
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.headline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCandidates = INITIAL_CANDIDATES.filter(
    (c) =>
      !searchTerm.trim() ||
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.headline.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCompanies = companies.filter(
    (c) =>
      !searchTerm.trim() ||
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visibleRecruiters = showAllRecruiters
    ? filteredRecruiters
    : filteredRecruiters.slice(0, 3);

  const visibleCandidates = showAllCandidates
    ? filteredCandidates
    : filteredCandidates.slice(0, 3);

  const visibleCompanies = showAllCompanies
    ? filteredCompanies
    : filteredCompanies.slice(0, 4);

  const displayName = currentUser?.name || 'Nhiên Nguyễn Viết';
  const displayAvatar = catAvatar;

  return (
    <div className="bg-[#f4f2ee] min-h-screen py-5 sm:py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Notice when navigated from recruiter */}
        {initialSearchQuery && searchTerm === initialSearchQuery && (
          <div className="mb-4 flex items-center justify-between bg-white border border-slate-300/80 text-slate-800 text-xs font-semibold px-4 py-2.5 rounded-xl shadow-2xs">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#0a66c2]" />
              <span>
                Đang lọc theo từ khóa:{' '}
                <strong className="text-[#0a66c2]">{initialSearchQuery}</strong>
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                if (onResetSearch) onResetSearch();
              }}
              className="px-3 py-1 rounded-full text-xs font-bold text-[#0a66c2] hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Xem tất cả
            </button>
          </div>
        )}

        {/* 3-Column LinkedIn-style Layout: Các vùng nổi ra so với background (#f4f2ee) và tách biệt với nhau */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* =================================================================== */}
          {/* CỘT TRÁI (3 cols): TỪ TÀI KHOẢN ĐẾN THÔNG TIN Y NGUYÊN NHƯ TRONG HÌNH */}
          {/* =================================================================== */}
          <aside className="lg:col-span-3 space-y-2.5">
            {/* Card 1: Thông tin Tài khoản (Profile Card) */}
            <div className="bg-white rounded-xl border border-slate-300/80 shadow-2xs overflow-hidden">
              {/* Cover Banner */}
              <div className="h-14 bg-[#a0b4b7] relative overflow-hidden">
                <div className="absolute -left-6 -top-6 w-28 h-28 rounded-full bg-[#cbd6d8]/70" />
                <div className="absolute left-12 -bottom-8 w-28 h-28 rounded-full bg-[#b6c7c9]/80" />
                <div className="absolute right-0 top-0 w-24 h-full bg-[#8fa5a8]/60" />
              </div>

              {/* Avatar & User Info */}
              <div className="px-4 pb-4 relative">
                <div className="relative -mt-9 mb-2.5 w-18 h-18">
                  <img
                    src={displayAvatar}
                    alt={displayName}
                    referrerPolicy="no-referrer"
                    className="w-18 h-18 rounded-full object-cover border-2 border-white shadow-xs"
                  />
                </div>

                <h2
                  onClick={() => onTabChange && onTabChange('cv-builder')}
                  className="text-[17px] font-bold text-slate-900 leading-snug hover:underline cursor-pointer"
                >
                  {displayName}
                </h2>
                <p className="text-xs text-slate-700 mt-0.5 leading-snug">
                  Sinh viên tại Duy Tan University
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Đà Nẵng, Da Nang City
                </p>

                {/* School / Organization Badge */}
                <div className="mt-3 flex items-center space-x-2">
                  <div className="w-5 h-4 rounded-[3px] bg-rose-800 text-white flex items-center justify-center text-[7px] font-black shrink-0 tracking-tighter">
                    DTU
                  </div>
                  <span className="text-xs font-semibold text-slate-900 truncate">
                    Duy Tan University
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2: Truy cập công cụ & Dùng thử Premium */}
            <div
              onClick={() =>
                onShowToast &&
                onShowToast(
                  'Tính năng dùng thử Premium 0đ đã sẵn sàng cho tài khoản của bạn!',
                  'info'
                )
              }
              className="bg-white hover:bg-slate-50 rounded-xl border border-slate-300/80 p-3.5 shadow-2xs transition-colors cursor-pointer group"
            >
              <p className="text-xs text-slate-500 leading-snug">
                Truy cập các công cụ và thông tin chuyên sâu độc quyền
              </p>
              <div className="mt-1.5 flex items-center space-x-2">
                <span className="w-3.5 h-3.5 rounded-[3px] bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 inline-block shrink-0 shadow-2xs" />
                <span className="text-xs font-bold text-slate-900 group-hover:text-[#0a66c2] transition-colors">
                  Dùng thử Premium cho 0 đ
                </span>
              </div>
            </div>

            {/* Card 3: Kết nối - Phát triển mạng lưới của bạn */}
            <div className="bg-white hover:bg-slate-50 rounded-xl border border-slate-300/80 p-3.5 shadow-2xs transition-colors cursor-pointer">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-bold text-slate-900">Kết nối</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Phát triển mạng lưới của bạn
                  </p>
                </div>
                <span className="text-xs font-bold text-[#0a66c2]">
                  {connectedCandidateIds.length + followedRecruiterIds.length}
                </span>
              </div>
            </div>

            {/* Card 4: Các mục đã lưu, Nhóm, Bản tin, Sự kiện */}
            <div className="bg-white rounded-xl border border-slate-300/80 p-2 shadow-2xs space-y-0.5">
              <button
                type="button"
                onClick={() => onTabChange && onTabChange('saved')}
                className="w-full px-2.5 py-2 rounded-full hover:bg-slate-100 flex items-center justify-between text-left transition-colors cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <Bookmark className="w-4 h-4 text-slate-700 fill-slate-700 shrink-0" />
                  <span className="text-xs font-bold text-slate-800">
                    Các mục đã lưu
                  </span>
                </div>
                {savedCount > 0 && (
                  <span className="text-[11px] font-bold text-[#0a66c2]">
                    {savedCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() =>
                  onShowToast &&
                  onShowToast('Đang mở danh sách Nhóm chuyên môn của bạn', 'info')
                }
                className="w-full px-2.5 py-2 rounded-full hover:bg-slate-100 flex items-center space-x-3 text-left transition-colors cursor-pointer"
              >
                <Users className="w-4 h-4 text-slate-700 shrink-0" />
                <span className="text-xs font-bold text-slate-800">Nhóm</span>
              </button>

              <button
                type="button"
                onClick={() => onTabChange && onTabChange('news')}
                className="w-full px-2.5 py-2 rounded-full hover:bg-slate-100 flex items-center space-x-3 text-left transition-colors cursor-pointer"
              >
                <Newspaper className="w-4 h-4 text-slate-700 shrink-0" />
                <span className="text-xs font-bold text-slate-800">Bản tin</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  onShowToast &&
                  onShowToast('Đang mở lịch Sự kiện tuyển dụng sắp tới', 'info')
                }
                className="w-full px-2.5 py-2 rounded-full hover:bg-slate-100 flex items-center space-x-3 text-left transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-slate-700 shrink-0" />
                <span className="text-xs font-bold text-slate-800">Sự kiện</span>
              </button>
            </div>
          </aside>

          {/* =================================================================== */}
          {/* CỘT GIỮA / BÊN PHẢI CỘT TÀI KHOẢN (6 cols):                          */}
          {/* - Thanh bắt đầu bài đăng / tìm kiếm                                  */}
          {/* - Ở TRÊN: Kết nối với Nhà tuyển dụng                                 */}
          {/* - Ở DƯỚI: Kết nối với các Ứng viên khác                              */}
          {/* - Danh sách Công ty & Doanh nghiệp                                   */}
          {/* =================================================================== */}
          <div className="lg:col-span-6 space-y-3">
            {/* Top Card: Bắt đầu bài đăng / Tìm kiếm nhanh (y hệt trong hình) */}
            <div className="bg-white rounded-xl border border-slate-300/80 p-3.5 shadow-2xs">
              <div className="flex items-center space-x-2.5">
                <div className="relative w-12 h-12 shrink-0">
                  <img
                    src={displayAvatar}
                    alt={displayName}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-full object-cover border border-slate-200"
                  />
                </div>

                {/* Pill Input */}
                <div className="flex-1 relative flex items-center">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Bắt đầu bài đăng hoặc tìm kiếm nhà tuyển dụng, ứng viên, công ty..."
                    className="w-full py-3 px-4 pr-9 rounded-full border border-slate-400/90 hover:bg-slate-100/80 focus:bg-white text-xs sm:text-sm font-semibold text-slate-800 placeholder:text-slate-600 focus:outline-hidden focus:border-slate-700 transition-colors"
                  />
                  {searchTerm ? (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchTerm('');
                        if (onResetSearch) onResetSearch();
                      }}
                      className="absolute right-3 p-1 rounded-full text-slate-500 hover:bg-slate-200 transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  ) : (
                    <Search className="w-4 h-4 text-slate-500 absolute right-4 pointer-events-none" />
                  )}
                </div>
              </div>

              {/* Action buttons row: Video | Ảnh | Viết bài viết */}
              <div className="flex items-center justify-around pt-2.5 mt-2">
                <button
                  type="button"
                  onClick={() =>
                    onShowToast &&
                    onShowToast('Tính năng đăng Video giới thiệu hồ sơ', 'info')
                  }
                  className="flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-slate-100 text-xs sm:text-sm font-semibold text-slate-700 transition-colors cursor-pointer"
                >
                  <SquarePlay className="w-5 h-5 text-emerald-600 fill-emerald-600/15" />
                  <span>Video</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    onShowToast &&
                    onShowToast('Tính năng chia sẻ Ảnh hoạt động công ty', 'info')
                  }
                  className="flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-slate-100 text-xs sm:text-sm font-semibold text-slate-700 transition-colors cursor-pointer"
                >
                  <Image className="w-5 h-5 text-[#0a66c2]" />
                  <span>Ảnh</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    onShowToast &&
                    onShowToast('Tính năng Viết bài chia sẻ kinh nghiệm phỏng vấn', 'info')
                  }
                  className="flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-slate-100 text-xs sm:text-sm font-semibold text-slate-700 transition-colors cursor-pointer"
                >
                  <FileText className="w-5 h-5 text-orange-600" />
                  <span>Viết bài viết</span>
                </button>
              </div>
            </div>

            {/* =============================================================== */}
            {/* PHẦN Ở TRÊN: KẾT NỐI VỚI NHÀ TUYỂN DỤNG (Đề xuất cho bạn)        */}
            {/* =============================================================== */}
            <div
              id="recruiter-connections-card"
              className="bg-white rounded-xl border border-slate-300/80 shadow-2xs overflow-hidden"
            >
              <div className="px-4 pt-4 pb-2 flex items-center justify-between">
                <div>
                  <h3 className="text-[15px] font-bold text-slate-900">
                    Đề xuất cho bạn
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Kết nối với nhà tuyển dụng & chuyên gia săn đầu người
                  </p>
                </div>
                <span className="text-[11px] font-semibold text-[#0a66c2] bg-blue-50 px-2.5 py-1 rounded-full">
                  Nhà tuyển dụng
                </span>
              </div>

              <div className="divide-y divide-slate-200/80">
                {visibleRecruiters.map((rec) => {
                  const isFollowing = followedRecruiterIds.includes(rec.id);
                  const matchedComp = companies.find((c) =>
                    c.name.toLowerCase().includes(rec.companyName.toLowerCase().split(' ')[0])
                  );

                  return (
                    <div
                      key={rec.id}
                      className="p-4 hover:bg-slate-50/90 transition-colors flex items-start justify-between gap-3"
                    >
                      <div className="flex items-start space-x-3 min-w-0 flex-1">
                        {/* Avatar */}
                        <div
                          onClick={() =>
                            matchedComp &&
                            onSelectCompany &&
                            onSelectCompany(matchedComp)
                          }
                          className="relative w-12 h-12 rounded-full bg-slate-200 shrink-0 overflow-hidden border border-slate-200 cursor-pointer flex items-center justify-center"
                        >
                          {rec.avatar ? (
                            <img
                              src={rec.avatar}
                              alt={rec.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Users className="w-6 h-6 text-slate-500" />
                          )}
                          <span className="absolute bottom-0 right-0 bg-[#0a66c2] text-white text-[7px] font-black px-1 rounded-tl-md">
                            {rec.badgeText}
                          </span>
                        </div>

                        {/* Info */}
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center space-x-1.5">
                            <h4
                              onClick={() =>
                                matchedComp &&
                                onSelectCompany &&
                                onSelectCompany(matchedComp)
                              }
                              className="text-sm font-bold text-slate-900 hover:text-[#0a66c2] hover:underline cursor-pointer truncate"
                            >
                              {rec.name}
                            </h4>
                            {rec.verified && (
                              <ShieldCheck className="w-4 h-4 text-slate-600 shrink-0" />
                            )}
                          </div>

                          <p className="text-xs text-slate-700 line-clamp-2 mt-0.5 leading-snug">
                            {rec.headline}
                          </p>

                          <div className="flex items-center space-x-1.5 text-[11px] text-slate-500 mt-1.5">
                            <TrendingUp className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                            <span>{rec.reason}</span>
                          </div>
                        </div>
                      </div>

                      {/* + Theo dõi Pill Button */}
                      <button
                        type="button"
                        onClick={() => handleToggleFollowRecruiter(rec)}
                        className={`shrink-0 inline-flex items-center space-x-1 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold border transition-colors cursor-pointer ${
                          isFollowing
                            ? 'border-slate-400 bg-slate-100 text-slate-800 hover:bg-slate-200'
                            : 'border-[#0a66c2] text-[#0a66c2] hover:bg-blue-50/80 hover:border-[#004182]'
                        }`}
                      >
                        {isFollowing ? (
                          <>
                            <Check className="w-4 h-4 stroke-[2.5]" />
                            <span>Đang theo dõi</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4 stroke-[2.5]" />
                            <span>Theo dõi</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Footer: Hiển thị thêm -> */}
              <button
                type="button"
                onClick={() => setShowAllRecruiters((prev) => !prev)}
                className="w-full py-3 border-t border-slate-200/80 hover:bg-slate-100 text-sm font-bold text-slate-700 flex items-center justify-center space-x-1.5 transition-colors cursor-pointer rounded-b-xl"
              >
                <span>
                  {showAllRecruiters ? 'Thu gọn danh sách' : 'Hiển thị thêm'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* =============================================================== */}
            {/* PHẦN Ở DƯỚI: KẾT NỐI VỚI CÁC ỨNG VIÊN KHÁC (Những người bạn có thể biết) */}
            {/* =============================================================== */}
            <div
              id="candidate-connections-card"
              className="bg-white rounded-xl border border-slate-300/80 shadow-2xs overflow-hidden"
            >
              <div className="px-4 pt-4 pb-2 flex items-center justify-between">
                <div>
                  <h3 className="text-[15px] font-bold text-slate-900">
                    Những người bạn có thể biết
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Kết nối với các ứng viên khác cùng ngành nghề & khu vực
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAllCandidates((prev) => !prev)}
                  className="p-1.5 rounded-full text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Xem tất cả ứng viên"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="divide-y divide-slate-200/80">
                {visibleCandidates.map((cand) => {
                  const isConnected = connectedCandidateIds.includes(cand.id);
                  return (
                    <div
                      key={cand.id}
                      className="p-4 hover:bg-slate-50/90 transition-colors flex items-start justify-between gap-3"
                    >
                      <div className="flex items-start space-x-3 min-w-0 flex-1">
                        <img
                          src={cand.avatar}
                          alt={cand.name}
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 rounded-full object-cover border border-slate-200 shrink-0"
                        />

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center space-x-1.5">
                            <h4 className="text-sm font-bold text-slate-900 hover:text-[#0a66c2] hover:underline cursor-pointer truncate">
                              {cand.name}
                            </h4>
                            {cand.verified && (
                              <ShieldCheck className="w-4 h-4 text-slate-600 shrink-0" />
                            )}
                          </div>

                          <p className="text-xs text-slate-700 line-clamp-2 mt-0.5 leading-snug">
                            {cand.headline}
                          </p>

                          <div className="flex items-center space-x-1.5 text-[11px] text-slate-500 mt-1.5">
                            {cand.activityType === 'clock' ? (
                              <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                            ) : (
                              <TrendingUp className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                            )}
                            <span>{cand.activity}</span>
                          </div>
                        </div>
                      </div>

                      {/* + Kết nối Pill Button */}
                      <button
                        type="button"
                        onClick={() => handleToggleConnectCandidate(cand)}
                        className={`shrink-0 inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold border transition-colors cursor-pointer ${
                          isConnected
                            ? 'border-slate-400 bg-slate-100 text-slate-800 hover:bg-slate-200'
                            : 'border-[#0a66c2] text-[#0a66c2] hover:bg-blue-50/80 hover:border-[#004182]'
                        }`}
                      >
                        {isConnected ? (
                          <>
                            <Check className="w-4 h-4 stroke-[2.5]" />
                            <span>Đã kết nối</span>
                          </>
                        ) : (
                          <>
                            <UserPlus className="w-4 h-4 stroke-[2.2]" />
                            <span>Kết nối</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Footer: Hiển thị thêm -> */}
              <button
                type="button"
                onClick={() => setShowAllCandidates((prev) => !prev)}
                className="w-full py-3 border-t border-slate-200/80 hover:bg-slate-100 text-sm font-bold text-slate-700 flex items-center justify-center space-x-1.5 transition-colors cursor-pointer rounded-b-xl"
              >
                <span>
                  {showAllCandidates ? 'Thu gọn danh sách' : 'Hiển thị thêm'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* =============================================================== */}
            {/* DANH SÁCH DOANH NGHIỆP & CÔNG TY HÀNG ĐẦU                        */}
            {/* =============================================================== */}
            <div className="bg-white rounded-xl border border-slate-300/80 shadow-2xs overflow-hidden">
              <div className="px-4 pt-4 pb-2 flex items-center justify-between">
                <div>
                  <h3 className="text-[15px] font-bold text-slate-900">
                    Doanh nghiệp & Công ty nổi bật
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Khám phá môi trường làm việc và cơ hội nghề nghiệp tại các tập đoàn hàng đầu
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                  {filteredCompanies.length} công ty
                </span>
              </div>

              <div className="divide-y divide-slate-200/80">
                {visibleCompanies.map((company) => {
                  const isFollowed = followedCompanyIds.includes(company.id);
                  return (
                    <div
                      key={company.id}
                      id={`company-card-${company.id}`}
                      onClick={() => onSelectCompany && onSelectCompany(company)}
                      className="p-4 hover:bg-slate-50/90 transition-colors flex items-start justify-between gap-3 cursor-pointer"
                    >
                      <div className="flex items-start space-x-3 min-w-0 flex-1">
                        <div className="w-12 h-12 rounded-xl border border-slate-200 bg-slate-50 p-1.5 flex items-center justify-center shrink-0">
                          <img
                            src={company.logo}
                            alt={company.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center space-x-1.5">
                            <h4 className="text-sm font-bold text-slate-900 hover:text-[#0a66c2] hover:underline truncate">
                              {company.name}
                            </h4>
                            <ShieldCheck className="w-4 h-4 text-[#0a66c2] shrink-0" />
                          </div>

                          <p className="text-xs text-slate-700 mt-0.5">
                            {company.industry} • {company.location}
                          </p>

                          <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 mt-1.5">
                            <span className="inline-flex items-center space-x-1 text-amber-600 font-semibold">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              <span>{company.rating}</span>
                            </span>
                            <span>•</span>
                            <span className="text-emerald-700 font-semibold">
                              {company.openJobsCount} vị trí đang tuyển
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        id={`company-follow-heart-${company.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onToggleFollowCompany) {
                            onToggleFollowCompany(company.id);
                          }
                        }}
                        className={`shrink-0 inline-flex items-center space-x-1 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold border transition-colors cursor-pointer ${
                          isFollowed
                            ? 'border-slate-400 bg-slate-100 text-slate-800 hover:bg-slate-200'
                            : 'border-[#0a66c2] text-[#0a66c2] hover:bg-blue-50/80 hover:border-[#004182]'
                        }`}
                      >
                        {isFollowed ? (
                          <>
                            <Check className="w-4 h-4 stroke-[2.5]" />
                            <span>Đang theo dõi</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4 stroke-[2.5]" />
                            <span>Theo dõi</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>

              {filteredCompanies.length > 4 && (
                <button
                  type="button"
                  onClick={() => setShowAllCompanies((prev) => !prev)}
                  className="w-full py-3 border-t border-slate-200/80 hover:bg-slate-100 text-sm font-bold text-slate-700 flex items-center justify-center space-x-1.5 transition-colors cursor-pointer rounded-b-xl"
                >
                  <span>
                    {showAllCompanies
                      ? 'Thu gọn danh sách công ty'
                      : `Hiển thị thêm (${filteredCompanies.length - 4} công ty)`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* =================================================================== */}
          {/* CỘT PHẢI (3 cols): TIN TỨC NỔI BẬT & DOANH NGHIỆP TUYỂN DỤNG HÔM NAY */}
          {/* =================================================================== */}
          <aside className="lg:col-span-3 space-y-2.5">
            {/* Top Right Card: JobCentral News / Câu chuyện nổi bật (như trong hình) */}
            <div className="bg-white rounded-xl border border-slate-300/80 p-4 shadow-2xs">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900">
                  JobCentral News
                </h3>
                <span className="w-4 h-4 rounded-xs bg-slate-800 text-white text-[10px] font-bold flex items-center justify-center">
                  i
                </span>
              </div>
              <p className="text-xs font-bold text-slate-500 mt-1.5">
                Câu chuyện nổi bật
              </p>

              <div className="mt-2.5 space-y-2.5">
                {(showAllNews ? TRENDING_NEWS : TRENDING_NEWS.slice(0, 5)).map(
                  (news) => (
                    <div
                      key={news.id}
                      onClick={() => onTabChange && onTabChange('news')}
                      className="px-2 py-1.5 -mx-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                        {news.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {news.meta}
                      </p>
                    </div>
                  )
                )}
              </div>

              <button
                type="button"
                onClick={() => setShowAllNews((prev) => !prev)}
                className="mt-3 px-2.5 py-1 -ml-2.5 rounded-full hover:bg-slate-100 inline-flex items-center space-x-1 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
              >
                <span>
                  {showAllNews ? 'Thu gọn tin tức' : 'Hiển thị thêm tin tức khác'}
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    showAllNews ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>

            {/* Bottom Right Card: Tâm điểm doanh nghiệp hôm nay (style y hệt Câu đố hôm nay trong hình) */}
            <div className="bg-white rounded-xl border border-slate-300/80 p-4 shadow-2xs">
              <h3 className="text-sm font-bold text-slate-600 mb-3">
                Tâm điểm tuyển dụng hôm nay
              </h3>

              <div className="space-y-2">
                {companies.slice(0, 4).map((comp, idx) => {
                  const badgeColors = [
                    'bg-orange-500 text-white',
                    'bg-emerald-600 text-white',
                    'bg-sky-600 text-white',
                    'bg-indigo-600 text-white',
                  ];
                  return (
                    <div
                      key={comp.id}
                      onClick={() => onSelectCompany && onSelectCompany(comp)}
                      className="flex items-center justify-between p-2 -mx-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center font-black text-xs shrink-0 shadow-2xs overflow-hidden border border-slate-200 ${
                            badgeColors[idx % badgeColors.length]
                          }`}
                        >
                          {comp.logo ? (
                            <img
                              src={comp.logo}
                              alt={comp.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            comp.name.slice(0, 2).toUpperCase()
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-900 truncate">
                            {comp.name}{' '}
                            <span className="font-normal text-slate-500">
                              #{idx + 1}0{idx + 2}
                            </span>
                          </p>
                          <p className="text-[11px] text-slate-500 truncate">
                            {comp.openJobsCount} vị trí đang mở tuyển
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-600 group-hover:translate-x-0.5 transition-transform shrink-0" />
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>

        {/* Công ty đang theo dõi ở dưới cùng */}
        <FavoriteCompaniesSection
          allCompanies={companies}
          followedCompanyIds={followedCompanyIds}
          onToggleFollowCompany={onToggleFollowCompany}
          onSelectCompany={onSelectCompany}
          onExploreCompanies={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </div>
    </div>
  );
};
