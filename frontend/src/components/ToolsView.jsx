import React, { useState, useMemo } from 'react';
import {
  Calculator,
  Sparkles,
  Search,
  X,
  Bookmark,
  Users,
  Newspaper,
  Calendar,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  ShieldCheck,
  TrendingUp,
  Clock,
  Check,
  Plus,
  FileCheck,
  Percent,
  PiggyBank,
  Award,
  Briefcase,
  RefreshCw,
} from 'lucide-react';
import catAvatar from '../assets/images/cat_opentowork_avatar_1791346160613.jpg';

const CAREER_TOOLS = [
  {
    id: 'tool-gross-net',
    name: 'Công cụ tính lương Gross ↔ Net',
    badgeText: 'LƯƠNG',
    verified: true,
    category: 'Tài chính & Thu nhập',
    headline:
      'Quy đổi lương Gross sang Net và ngược lại chuẩn biểu thuế TNCN lũy tiến & mức đóng BHXH, BHYT, BHTN mới nhất.',
    usageMeta: '142.850 lượt sử dụng trong tuần này',
    actionLabel: 'Đang sử dụng',
    type: 'calculator',
  },
  {
    id: 'tool-bhtn',
    name: 'Tính mức hưởng Bảo hiểm thất nghiệp',
    badgeText: 'BHTN',
    verified: true,
    category: 'Bảo hiểm & Chế độ',
    headline:
      'Dự tính chính xác trợ cấp thất nghiệp hàng tháng (60% lương bình quân 6 tháng liền kề) và số tháng được hưởng.',
    usageMeta: '64.320 lượt tra cứu gần đây',
    actionLabel: 'Tính BHTN',
    type: 'bhtn',
  },
  {
    id: 'tool-bhxh-1lan',
    name: 'Tính Bảo hiểm xã hội 1 lần',
    badgeText: 'BHXH',
    verified: true,
    category: 'Bảo hiểm & Chế độ',
    headline:
      'Ước tính tổng số tiền nhận BHXH 1 lần dựa trên thời gian tham gia đóng bảo hiểm và hệ số trượt giá.',
    usageMeta: '51.900 lượt tra cứu gần đây',
    actionLabel: 'Tính BHXH',
    type: 'bhxh',
  },
  {
    id: 'tool-compound',
    name: 'Tính lãi kép & Kế hoạch tiết kiệm lương',
    badgeText: 'LÃI',
    verified: true,
    category: 'Hoạch định tài chính',
    headline:
      'Lập kế hoạch trích phần trăm thu nhập hàng tháng để đầu tư và tính giá trị tài sản tích lũy theo lãi suất kép.',
    usageMeta: '38.410 lượt sử dụng',
    actionLabel: 'Tính lãi kép',
    type: 'compound',
  },
  {
    id: 'tool-ats-cv',
    name: 'Kiểm tra & Chấm điểm CV chuẩn ATS',
    badgeText: 'ATS',
    verified: true,
    category: 'Hồ sơ & Ứng tuyển',
    headline:
      'Phân tích bố cục, từ khóa kỹ năng trong CV và tối ưu hóa tỷ lệ vượt qua hệ thống lọc hồ sơ tự động của nhà tuyển dụng.',
    usageMeta: '89.120 ứng viên đã tối ưu CV',
    actionLabel: 'Mở tạo CV',
    type: 'cv-builder',
  },
];

const PERSONAL_DEV_TOOLS = [
  {
    id: 'dev-mbti',
    name: 'Trắc nghiệm tính cách nghề nghiệp MBTI',
    verified: true,
    headline:
      'Khám phá 16 nhóm tính cách Myers-Briggs để định hướng vị trí công việc và môi trường doanh nghiệp phù hợp nhất.',
    activity: 'Dựa trên hồ sơ ứng viên của bạn',
    activityType: 'trend',
  },
  {
    id: 'dev-holland',
    name: 'Trắc nghiệm mật mã nghề nghiệp Holland (RIASEC)',
    verified: true,
    headline:
      'Xác định nhóm sở thích nghề nghiệp Kỹ thuật, Nghiên cứu, Nghệ thuật, Xã hội, Quản lý hay Nghiệp vụ.',
    activity: 'Hoạt động phổ biến của sinh viên & Fresher',
    activityType: 'clock',
  },
  {
    id: 'dev-interview',
    name: 'Bộ 150+ câu hỏi phỏng vấn IT, Marketing & Tài chính',
    verified: true,
    headline:
      'Tổng hợp câu hỏi phỏng vấn thực tế kèm gợi ý trả lời theo mô hình STAR từ các tập đoàn lớn.',
    activity: 'Cập nhật mới cho mùa tuyển dụng năm nay',
    activityType: 'trend',
  },
  {
    id: 'dev-salary-negotiation',
    name: 'Cẩm nang & Kịch bản đàm phán lương (Deal Offer)',
    verified: true,
    headline:
      'Mẫu email phản hồi Offer và công thức định giá bản thân giúp tăng 15% - 30% mức thu nhập đề xuất.',
    activity: 'Được đề xuất bởi các chuyên gia HR',
    activityType: 'clock',
  },
];

const SALARY_INSIGHTS = [
  {
    id: 's1',
    title: 'Mức lương tối thiểu vùng I tăng lên 4.960.000đ...',
    meta: '1 giờ trước • 4.210 người đọc',
  },
  {
    id: 's2',
    title: 'Báo cáo lương IT & AI Engineer tại Việt Nam...',
    meta: '3 giờ trước • 9.840 người đọc',
  },
  {
    id: 's3',
    title: 'Cách tính giảm trừ gia cảnh thuế TNCN chuẩn...',
    meta: '4 giờ trước • 6.530 người đọc',
  },
  {
    id: 's4',
    title: 'Quy định mới về mức đóng BHXH bắt buộc...',
    meta: '6 giờ trước • 5.120 người đọc',
  },
  {
    id: 's5',
    title: 'Lương Gross và Net khác nhau thế nào khi nhận Offer...',
    meta: '8 giờ trước • 11.490 người đọc',
  },
  {
    id: 's6',
    title: 'Kinh nghiệm nhận biết chế độ đóng bảo hiểm full lương...',
    meta: '12 giờ trước • 3.870 người đọc',
  },
];

export const ToolsView = ({
  currentUser,
  savedCount = 0,
  onTabChange,
  onShowToast,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeToolMode, setActiveToolMode] = useState('gross-to-net'); // 'gross-to-net' | 'net-to-gross' | 'bhtn' | 'compound'
  const [salaryInput, setSalaryInput] = useState(25000000);
  const [dependents, setDependents] = useState(0);
  const [region, setRegion] = useState('1');
  const [bhtnMonths, setBhtnMonths] = useState(24);
  const [savedToolIds, setSavedToolIds] = useState(['tool-gross-net']);
  const [completedDevIds, setCompletedDevIds] = useState([]);
  const [showAllTools, setShowAllTools] = useState(false);
  const [showAllDevTools, setShowAllDevTools] = useState(false);
  const [showAllInsights, setShowAllInsights] = useState(false);

  const displayName = currentUser?.name || 'Nhiên Nguyễn Viết';
  const displayAvatar = catAvatar;

  // Calculate Gross <-> Net Salary Breakdown
  const salaryBreakdown = useMemo(() => {
    const rawAmount = Math.max(0, Number(salaryInput) || 0);
    const numDeps = Math.max(0, Number(dependents) || 0);

    // Ceiling for BHXH/BHYT (20 x base salary 2,340,000 = 46,800,000)
    const bhxhCap = 46800000;
    const regionMinWages = {
      1: 4960000,
      2: 4410000,
      3: 3860000,
      4: 3450000,
    };
    const bhtnCap = (regionMinWages[region] || 4960000) * 20;

    const computeFromGross = (gross) => {
      const bhxh = Math.min(gross, bhxhCap) * 0.08;
      const bhyt = Math.min(gross, bhxhCap) * 0.015;
      const bhtn = Math.min(gross, bhtnCap) * 0.01;
      const totalInsurance = bhxh + bhyt + bhtn;
      const incomeBeforeTax = Math.max(0, gross - totalInsurance);
      const personalDeduction = 11000000;
      const dependentDeduction = numDeps * 4400000;
      const taxableIncome = Math.max(
        0,
        incomeBeforeTax - personalDeduction - dependentDeduction
      );

      // Progressive PIT brackets (VND)
      let pit = 0;
      if (taxableIncome > 0) {
        const brackets = [
          { limit: 5000000, rate: 0.05 },
          { limit: 10000000, rate: 0.1 },
          { limit: 18000000, rate: 0.15 },
          { limit: 32000000, rate: 0.2 },
          { limit: 52000000, rate: 0.25 },
          { limit: 80000000, rate: 0.3 },
          { limit: Infinity, rate: 0.35 },
        ];
        let prevLimit = 0;
        for (const b of brackets) {
          if (taxableIncome > prevLimit) {
            const taxableInBracket = Math.min(taxableIncome, b.limit) - prevLimit;
            pit += taxableInBracket * b.rate;
            prevLimit = b.limit;
          } else {
            break;
          }
        }
      }

      const net = Math.max(0, gross - totalInsurance - pit);
      return {
        gross: Math.round(gross),
        net: Math.round(net),
        bhxh: Math.round(bhxh),
        bhyt: Math.round(bhyt),
        bhtn: Math.round(bhtn),
        totalInsurance: Math.round(totalInsurance),
        taxableIncome: Math.round(taxableIncome),
        pit: Math.round(pit),
        dependentDeduction,
      };
    };

    if (activeToolMode === 'net-to-gross') {
      // Binary search for Gross that yields target Net
      let low = rawAmount;
      let high = rawAmount * 2 + 20000000;
      for (let i = 0; i < 35; i++) {
        const mid = (low + high) / 2;
        const res = computeFromGross(mid);
        if (res.net < rawAmount) {
          low = mid;
        } else {
          high = mid;
        }
      }
      return computeFromGross((low + high) / 2);
    }

    return computeFromGross(rawAmount);
  }, [salaryInput, dependents, region, activeToolMode]);

  const bhtnBenefit = useMemo(() => {
    const avgSalary = Math.max(0, Number(salaryInput) || 0);
    const monthlyBenefit = Math.min(avgSalary * 0.6, 4960000 * 5);
    const years = Math.max(1, Math.floor((Number(bhtnMonths) || 12) / 12));
    const eligibleMonths = Math.min(12, Math.max(3, years <= 3 ? 3 : 3 + (years - 3)));
    return {
      monthlyBenefit: Math.round(monthlyBenefit),
      eligibleMonths,
      totalBenefit: Math.round(monthlyBenefit * eligibleMonths),
    };
  }, [salaryInput, bhtnMonths]);

  const formatVND = (num) => {
    return Number(num || 0).toLocaleString('vi-VN') + ' đ';
  };

  const handleToggleSaveTool = (tool) => {
    const exists = savedToolIds.includes(tool.id);
    setSavedToolIds((prev) =>
      prev.includes(tool.id)
        ? prev.filter((id) => id !== tool.id)
        : [...prev, tool.id]
    );
    if (onShowToast) {
      onShowToast(
        exists
          ? `Đã bỏ ghim công cụ "${tool.name}"`
          : `Đã ghim công cụ "${tool.name}" vào danh sách yêu thích!`,
        exists ? 'info' : 'success'
      );
    }
  };

  const handleToggleDevTool = (item) => {
    const exists = completedDevIds.includes(item.id);
    setCompletedDevIds((prev) =>
      prev.includes(item.id)
        ? prev.filter((id) => id !== item.id)
        : [...prev, item.id]
    );
    if (onShowToast) {
      onShowToast(
        exists
          ? `Đã bỏ lưu "${item.name}"`
          : `Đã mở bài đánh giá "${item.name}" và lưu vào lộ trình của bạn!`,
        exists ? 'info' : 'success'
      );
    }
  };

  const filteredTools = CAREER_TOOLS.filter(
    (t) =>
      !searchTerm.trim() ||
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.headline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredDevTools = PERSONAL_DEV_TOOLS.filter(
    (d) =>
      !searchTerm.trim() ||
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.headline.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visibleTools = showAllTools ? filteredTools : filteredTools.slice(0, 3);
  const visibleDevTools = showAllDevTools
    ? filteredDevTools
    : filteredDevTools.slice(0, 3);

  return (
    <div className="bg-[#FAF9FF] min-h-screen py-5 sm:py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 3-Column LinkedIn-style Layout: Đồng bộ phong cách với trang Công ty */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* =================================================================== */}
          {/* CỘT TRÁI (3 cols): TÀI KHOẢN ĐẾN THÔNG TIN ĐỒNG BỘ TRANG CÔNG TY      */}
          {/* =================================================================== */}
          <aside className="lg:col-span-3 space-y-2.5">
            {/* Card 1: Thông tin Tài khoản (Profile Card) */}
            <div className="bg-white rounded-xl border border-slate-300/80 shadow-2xs overflow-hidden">
              <div className="h-14 bg-[#a0b4b7] relative overflow-hidden">
                <div className="absolute -left-6 -top-6 w-28 h-28 rounded-full bg-[#cbd6d8]/70" />
                <div className="absolute left-12 -bottom-8 w-28 h-28 rounded-full bg-[#b6c7c9]/80" />
                <div className="absolute right-0 top-0 w-24 h-full bg-[#8fa5a8]/60" />
              </div>

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

            {/* Card 3: Công cụ đã ghim & Lộ trình cá nhân */}
            <div className="bg-white hover:bg-slate-50 rounded-xl border border-slate-300/80 p-3.5 shadow-2xs transition-colors cursor-pointer">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-bold text-slate-900">Công cụ của bạn</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Công cụ tính toán & bài test đã lưu
                  </p>
                </div>
                <span className="text-xs font-bold text-[#0a66c2]">
                  {savedToolIds.length + completedDevIds.length}
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
                  onShowToast('Đang mở lịch Sự kiện nghề nghiệp sắp tới', 'info')
                }
                className="w-full px-2.5 py-2 rounded-full hover:bg-slate-100 flex items-center space-x-3 text-left transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-slate-700 shrink-0" />
                <span className="text-xs font-bold text-slate-800">Sự kiện</span>
              </button>
            </div>
          </aside>

          {/* =================================================================== */}
          {/* CỘT GIỮA (6 cols): THANH TÌM KIẾM CÔNG CỤ, MÁY TÍNH LƯƠNG & CÔNG CỤ   */}
          {/* =================================================================== */}
          <div className="lg:col-span-6 space-y-3">
            {/* Top Card: Thanh tìm kiếm & Chuyển nhanh công cụ */}
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

                <div className="flex-1 relative flex items-center">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Tìm công cụ tính lương Gross - Net, BHXH, BHTN, chấm điểm CV..."
                    className="w-full py-3 px-4 pr-9 rounded-full border border-slate-400/90 hover:bg-slate-100/80 focus:bg-white text-xs sm:text-sm font-semibold text-slate-800 placeholder:text-slate-600 focus:outline-hidden focus:border-slate-700 transition-colors"
                  />
                  {searchTerm ? (
                    <button
                      type="button"
                      onClick={() => setSearchTerm('')}
                      className="absolute right-3 p-1 rounded-full text-slate-500 hover:bg-slate-200 transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  ) : (
                    <Search className="w-4 h-4 text-slate-500 absolute right-4 pointer-events-none" />
                  )}
                </div>
              </div>

              {/* Quick Tool Switcher Pills */}
              <div className="flex items-center justify-around pt-2.5 mt-2">
                <button
                  type="button"
                  onClick={() => setActiveToolMode('gross-to-net')}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                    activeToolMode === 'gross-to-net' || activeToolMode === 'net-to-gross'
                      ? 'bg-blue-50 text-[#0a66c2]'
                      : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <Calculator className="w-4 h-4 text-[#0a66c2]" />
                  <span>Tính lương Gross - Net</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveToolMode('bhtn')}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                    activeToolMode === 'bhtn'
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <PiggyBank className="w-4 h-4 text-emerald-600" />
                  <span>Bảo hiểm thất nghiệp</span>
                </button>

                <button
                  type="button"
                  onClick={() => onTabChange && onTabChange('cv-builder')}
                  className="flex items-center space-x-2 px-3.5 py-2 rounded-full hover:bg-slate-100 text-xs sm:text-sm font-semibold text-slate-700 transition-colors cursor-pointer"
                >
                  <FileCheck className="w-4 h-4 text-orange-600" />
                  <span>Chấm điểm CV</span>
                </button>
              </div>
            </div>

            {/* Interactive Calculator Card: Tính Lương Gross <-> Net hoặc BHTN */}
            <div className="bg-white rounded-xl border border-slate-300/80 p-4 shadow-2xs">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200/80">
                <div>
                  <h3 className="text-[15px] font-bold text-slate-900">
                    {activeToolMode === 'bhtn'
                      ? 'Công cụ tính Bảo hiểm thất nghiệp (BHTN)'
                      : 'Công cụ tính lương Gross ↔ Net chuẩn 2026'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {activeToolMode === 'bhtn'
                      ? 'Áp dụng mức lương cơ sở & trần BHTN theo vùng mới nhất'
                      : 'Áp dụng mức giảm trừ gia cảnh 11 triệu/tháng & người phụ thuộc 4,4 triệu/người'}
                  </p>
                </div>

                <div className="flex items-center space-x-1.5">
                  <button
                    type="button"
                    onClick={() => setActiveToolMode('gross-to-net')}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                      activeToolMode === 'gross-to-net'
                        ? 'bg-[#0a66c2] text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Gross → Net
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveToolMode('net-to-gross')}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                      activeToolMode === 'net-to-gross'
                        ? 'bg-[#0a66c2] text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Net → Gross
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveToolMode('bhtn')}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                      activeToolMode === 'bhtn'
                        ? 'bg-[#0a66c2] text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Tính BHTN
                  </button>
                </div>
              </div>

              {activeToolMode === 'bhtn' ? (
                <div className="pt-3.5 space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Lương bình quân 6 tháng liền kề (VNĐ)
                      </label>
                      <input
                        type="number"
                        value={salaryInput}
                        onChange={(e) => setSalaryInput(Number(e.target.value))}
                        className="w-full px-3.5 py-2 rounded-full border border-slate-300 text-xs sm:text-sm font-bold text-slate-900 focus:outline-hidden focus:border-[#0a66c2]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Tổng số tháng đã đóng BHTN
                      </label>
                      <input
                        type="number"
                        min="12"
                        max="240"
                        value={bhtnMonths}
                        onChange={(e) => setBhtnMonths(Number(e.target.value))}
                        className="w-full px-3.5 py-2 rounded-full border border-slate-300 text-xs sm:text-sm font-bold text-slate-900 focus:outline-hidden focus:border-[#0a66c2]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2.5 bg-slate-50 rounded-xl p-3.5 border border-slate-200/80">
                    <div>
                      <p className="text-[11px] text-slate-500 font-medium">
                        Mức hưởng / tháng
                      </p>
                      <p className="text-sm font-extrabold text-[#0a66c2] mt-0.5">
                        {formatVND(bhtnBenefit.monthlyBenefit)}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-500 font-medium">
                        Số tháng được hưởng
                      </p>
                      <p className="text-sm font-extrabold text-slate-900 mt-0.5">
                        {bhtnBenefit.eligibleMonths} tháng
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-500 font-medium">
                        Tổng trợ cấp dự kiến
                      </p>
                      <p className="text-sm font-extrabold text-emerald-700 mt-0.5">
                        {formatVND(bhtnBenefit.totalBenefit)}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="pt-3.5 space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {activeToolMode === 'net-to-gross'
                          ? 'Thu nhập Net (VNĐ)'
                          : 'Thu nhập Gross (VNĐ)'}
                      </label>
                      <input
                        type="number"
                        step="500000"
                        value={salaryInput}
                        onChange={(e) => setSalaryInput(Number(e.target.value))}
                        className="w-full px-3.5 py-2 rounded-full border border-slate-300 text-xs sm:text-sm font-bold text-slate-900 focus:outline-hidden focus:border-[#0a66c2]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Người phụ thuộc
                      </label>
                      <select
                        value={dependents}
                        onChange={(e) => setDependents(Number(e.target.value))}
                        className="w-full px-3.5 py-2 rounded-full border border-slate-300 bg-white text-xs sm:text-sm font-semibold text-slate-800 focus:outline-hidden focus:border-[#0a66c2] cursor-pointer"
                      >
                        {[0, 1, 2, 3, 4, 5].map((n) => (
                          <option key={n} value={n}>
                            {n} người phụ thuộc
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Vùng lương tối thiểu
                      </label>
                      <select
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-full border border-slate-300 bg-white text-xs sm:text-sm font-semibold text-slate-800 focus:outline-hidden focus:border-[#0a66c2] cursor-pointer"
                      >
                        <option value="1">Vùng I (TP.HCM, Hà Nội...)</option>
                        <option value="2">Vùng II (Đà Nẵng, Cần Thơ...)</option>
                        <option value="3">Vùng III</option>
                        <option value="4">Vùng IV</option>
                      </select>
                    </div>
                  </div>

                  {/* Quick preset salary pills */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] text-slate-500 font-medium mr-1">
                      Mức lương phổ biến:
                    </span>
                    {[15000000, 20000000, 25000000, 35000000, 50000000].map(
                      (val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setSalaryInput(val)}
                          className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors cursor-pointer ${
                            Number(salaryInput) === val
                              ? 'bg-blue-50 text-[#0a66c2] border border-[#0a66c2]'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {val / 1000000} triệu
                        </button>
                      )
                    )}
                  </div>

                  {/* Result Summary Box */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 bg-slate-50 rounded-xl p-3.5 border border-slate-200/80">
                    <div>
                      <p className="text-[11px] text-slate-500 font-medium">
                        Lương Gross
                      </p>
                      <p className="text-sm font-extrabold text-slate-900 mt-0.5">
                        {formatVND(salaryBreakdown.gross)}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-500 font-medium">
                        Bảo hiểm (10.5%)
                      </p>
                      <p className="text-sm font-bold text-slate-700 mt-0.5">
                        -{formatVND(salaryBreakdown.totalInsurance)}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-500 font-medium">
                        Thuế TNCN
                      </p>
                      <p className="text-sm font-bold text-rose-600 mt-0.5">
                        -{formatVND(salaryBreakdown.pit)}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] text-slate-500 font-medium">
                        Lương Net thực nhận
                      </p>
                      <p className="text-sm font-extrabold text-[#0a66c2] mt-0.5">
                        {formatVND(salaryBreakdown.net)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* =============================================================== */}
            {/* PHẦN Ở TRÊN: CÔNG CỤ TÍNH TOÁN & SỰ NGHIỆP ĐỀ XUẤT CHO BẠN        */}
            {/* =============================================================== */}
            <div className="bg-white rounded-xl border border-slate-300/80 shadow-2xs overflow-hidden">
              <div className="px-4 pt-4 pb-2 flex items-center justify-between">
                <div>
                  <h3 className="text-[15px] font-bold text-slate-900">
                    Công cụ sự nghiệp đề xuất cho bạn
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Các tiện ích tính lương, bảo hiểm và tối ưu hồ sơ ứng tuyển
                  </p>
                </div>
                <span className="text-[11px] font-semibold text-[#0a66c2] bg-blue-50 px-2.5 py-1 rounded-full">
                  Công cụ tiện ích
                </span>
              </div>

              <div className="divide-y divide-slate-200/80">
                {visibleTools.map((tool) => {
                  const isSaved = savedToolIds.includes(tool.id);
                  return (
                    <div
                      key={tool.id}
                      className="p-4 hover:bg-slate-50/90 transition-colors flex items-start justify-between gap-3"
                    >
                      <div className="flex items-start space-x-3 min-w-0 flex-1">
                        <div className="relative w-12 h-12 rounded-full bg-slate-200 shrink-0 overflow-hidden border border-slate-200 flex items-center justify-center">
                          <img
                            src={displayAvatar}
                            alt={tool.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute bottom-0 right-0 bg-[#0a66c2] text-white text-[7px] font-black px-1 rounded-tl-md">
                            {tool.badgeText}
                          </span>
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center space-x-1.5">
                            <h4
                              onClick={() => {
                                if (tool.type === 'cv-builder') {
                                  onTabChange && onTabChange('cv-builder');
                                } else if (tool.type === 'bhtn') {
                                  setActiveToolMode('bhtn');
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                } else {
                                  setActiveToolMode('gross-to-net');
                                  window.scrollTo({ top: 0, behavior: 'smooth' });
                                }
                              }}
                              className="text-sm font-bold text-slate-900 hover:text-[#0a66c2] hover:underline cursor-pointer truncate"
                            >
                              {tool.name}
                            </h4>
                            {tool.verified && (
                              <ShieldCheck className="w-4 h-4 text-slate-600 shrink-0" />
                            )}
                          </div>

                          <p className="text-xs text-slate-700 line-clamp-2 mt-0.5 leading-snug">
                            {tool.headline}
                          </p>

                          <div className="flex items-center space-x-1.5 text-[11px] text-slate-500 mt-1.5">
                            <TrendingUp className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                            <span>{tool.usageMeta}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleToggleSaveTool(tool)}
                        className={`shrink-0 inline-flex items-center space-x-1 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold border transition-colors cursor-pointer ${
                          isSaved
                            ? 'border-slate-400 bg-slate-100 text-slate-800 hover:bg-slate-200'
                            : 'border-[#0a66c2] text-[#0a66c2] hover:bg-blue-50/80 hover:border-[#004182]'
                        }`}
                      >
                        {isSaved ? (
                          <>
                            <Check className="w-4 h-4 stroke-[2.5]" />
                            <span>Đã ghim</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4 stroke-[2.5]" />
                            <span>Ghim công cụ</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setShowAllTools((prev) => !prev)}
                className="w-full py-3 border-t border-slate-200/80 hover:bg-slate-100 text-sm font-bold text-slate-700 flex items-center justify-center space-x-1.5 transition-colors cursor-pointer rounded-b-xl"
              >
                <span>
                  {showAllTools ? 'Thu gọn danh sách' : 'Hiển thị thêm'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* =============================================================== */}
            {/* PHẦN Ở DƯỚI: TRẮC NGHIỆM ĐỊNH HƯỚNG & PHÁT TRIỂN BẢN THÂN         */}
            {/* =============================================================== */}
            <div className="bg-white rounded-xl border border-slate-300/80 shadow-2xs overflow-hidden">
              <div className="px-4 pt-4 pb-2 flex items-center justify-between">
                <div>
                  <h3 className="text-[15px] font-bold text-slate-900">
                    Định hướng nghề nghiệp & Phát triển kỹ năng
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Trắc nghiệm tính cách, cẩm nang phỏng vấn & đàm phán thu nhập dành cho ứng viên
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAllDevTools((prev) => !prev)}
                  className="p-1.5 rounded-full text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Xem tất cả"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="divide-y divide-slate-200/80">
                {visibleDevTools.map((item) => {
                  const isCompleted = completedDevIds.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      className="p-4 hover:bg-slate-50/90 transition-colors flex items-start justify-between gap-3"
                    >
                      <div className="flex items-start space-x-3 min-w-0 flex-1">
                        <img
                          src={displayAvatar}
                          alt={item.name}
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 rounded-full object-cover border border-slate-200 shrink-0"
                        />

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center space-x-1.5">
                            <h4
                              onClick={() => handleToggleDevTool(item)}
                              className="text-sm font-bold text-slate-900 hover:text-[#0a66c2] hover:underline cursor-pointer truncate"
                            >
                              {item.name}
                            </h4>
                            {item.verified && (
                              <ShieldCheck className="w-4 h-4 text-slate-600 shrink-0" />
                            )}
                          </div>

                          <p className="text-xs text-slate-700 line-clamp-2 mt-0.5 leading-snug">
                            {item.headline}
                          </p>

                          <div className="flex items-center space-x-1.5 text-[11px] text-slate-500 mt-1.5">
                            {item.activityType === 'clock' ? (
                              <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                            ) : (
                              <TrendingUp className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                            )}
                            <span>{item.activity}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleToggleDevTool(item)}
                        className={`shrink-0 inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold border transition-colors cursor-pointer ${
                          isCompleted
                            ? 'border-slate-400 bg-slate-100 text-slate-800 hover:bg-slate-200'
                            : 'border-[#0a66c2] text-[#0a66c2] hover:bg-blue-50/80 hover:border-[#004182]'
                        }`}
                      >
                        {isCompleted ? (
                          <>
                            <Check className="w-4 h-4 stroke-[2.5]" />
                            <span>Đã lưu</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4 stroke-[2.2]" />
                            <span>Khám phá</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setShowAllDevTools((prev) => !prev)}
                className="w-full py-3 border-t border-slate-200/80 hover:bg-slate-100 text-sm font-bold text-slate-700 flex items-center justify-center space-x-1.5 transition-colors cursor-pointer rounded-b-xl"
              >
                <span>
                  {showAllDevTools ? 'Thu gọn danh sách' : 'Hiển thị thêm'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* =================================================================== */}
          {/* CỘT PHẢI (3 cols): BẢNG LƯƠNG & TIỆN ÍCH NỔI BẬT HÔM NAY             */}
          {/* =================================================================== */}
          <aside className="lg:col-span-3 space-y-2.5">
            {/* Top Right Card: Cẩm nang Lương & Thuế (giống JobCentral News) */}
            <div className="bg-white rounded-xl border border-slate-300/80 p-4 shadow-2xs">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900">
                  JobCentral Tools
                </h3>
                <span className="w-4 h-4 rounded-xs bg-slate-800 text-white text-[10px] font-bold flex items-center justify-center">
                  i
                </span>
              </div>
              <p className="text-xs font-bold text-slate-500 mt-1.5">
                Tiêu điểm Lương & Bảo hiểm
              </p>

              <div className="mt-2.5 space-y-2.5">
                {(showAllInsights
                  ? SALARY_INSIGHTS
                  : SALARY_INSIGHTS.slice(0, 5)
                ).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onTabChange && onTabChange('news')}
                    className="px-2 py-1.5 -mx-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {item.meta}
                    </p>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setShowAllInsights((prev) => !prev)}
                className="mt-3 px-2.5 py-1 -ml-2.5 rounded-full hover:bg-slate-100 inline-flex items-center space-x-1 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
              >
                <span>
                  {showAllInsights ? 'Thu gọn' : 'Hiển thị thêm'}
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    showAllInsights ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>

            {/* Bottom Right Card: Tiện ích dùng nhiều hôm nay */}
            <div className="bg-white rounded-xl border border-slate-300/80 p-4 shadow-2xs">
              <h3 className="text-sm font-bold text-slate-600 mb-3">
                Công cụ nổi bật hôm nay
              </h3>

              <div className="space-y-2">
                {[
                  {
                    id: 'quick-1',
                    name: 'Quy đổi Gross → Net',
                    tag: '#101',
                    desc: 'Tính nhanh thuế TNCN & BHXH',
                    color: 'bg-orange-500 text-white',
                    icon: Calculator,
                    action: () => setActiveToolMode('gross-to-net'),
                  },
                  {
                    id: 'quick-2',
                    name: 'Trợ cấp thất nghiệp',
                    tag: '#102',
                    desc: 'Dự tính mức hưởng 60% lương',
                    color: 'bg-emerald-600 text-white',
                    icon: PiggyBank,
                    action: () => setActiveToolMode('bhtn'),
                  },
                  {
                    id: 'quick-3',
                    name: 'Tạo & Chấm điểm CV',
                    tag: '#103',
                    desc: 'Mẫu CV chuẩn ATS nhà tuyển dụng',
                    color: 'bg-sky-600 text-white',
                    icon: FileCheck,
                    action: () => onTabChange && onTabChange('cv-builder'),
                  },
                  {
                    id: 'quick-4',
                    name: 'Khám phá việc làm lương cao',
                    tag: '#104',
                    desc: 'So sánh mức đãi ngộ thị trường',
                    color: 'bg-indigo-600 text-white',
                    icon: Briefcase,
                    action: () => onTabChange && onTabChange('search'),
                  },
                ].map((item) => {
                  const IconComp = item.icon;
                  return (
                    <div
                      key={item.id}
                      onClick={item.action}
                      className="flex items-center justify-between p-2 -mx-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 shadow-2xs ${item.color}`}
                        >
                          <IconComp className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-900 truncate">
                            {item.name}{' '}
                            <span className="font-normal text-slate-500">
                              {item.tag}
                            </span>
                          </p>
                          <p className="text-[11px] text-slate-500 truncate">
                            {item.desc}
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
      </div>
    </div>
  );
};
