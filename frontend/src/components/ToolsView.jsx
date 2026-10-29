import React, { useState, useMemo, useRef } from 'react';
import {
  formatVND,
  formatNumberOnly,
  calculateGrossToNet,
  calculateNetToGross,
  calculateTaxFinalization,
  calculateBhxhOneTime,
  calculateProbation,
} from '../utils/salaryCalculations';

// Hình ảnh minh họa chuẩn
import salaryNegotiationImg from '../assets/images/salary_negotiation_success_1791542193113.jpg';
import featuredCareerImg from '../assets/images/featured_career_report_1791542153769.jpg';
import remoteHybridImg from '../assets/images/remote_hybrid_work_1791542166753.jpg';

// Danh sách công cụ phong phú (8 công cụ chuyên sâu)
const TOOLS_DATA = [
  {
    id: 'salary-benchmark',
    title: 'So sánh mức lương thị trường (Salary Benchmark)',
    category: 'market',
    categoryLabel: 'Thị trường',
    icon: 'query_stats',
    description:
      'Tra cứu mức lương trung vị theo ngành nghề, vị trí công việc, quy mô công ty và số năm kinh nghiệm từ hơn 250.000 dữ liệu tin tuyển dụng thực tế.',
    tags: ['Dữ liệu 2025', 'Biểu đồ trung vị'],
    stats: '520k+ lượt tra cứu',
    actionText: 'Sử dụng ngay',
    type: 'benchmark',
  },
  {
    id: 'bhtn-calc',
    title: 'Tính Bảo hiểm thất nghiệp & Trợ cấp thôi việc',
    category: 'salary',
    categoryLabel: 'Lương & Thuế',
    icon: 'health_and_safety',
    description:
      'Xác định chính xác số tháng được hưởng trợ cấp thất nghiệp, số tiền nhận từng tháng và trợ cấp thôi việc do doanh nghiệp chi trả theo quy định của Luật Việc làm.',
    tags: ['Chuẩn Luật BHXH', 'Thời hạn nộp hồ sơ'],
    stats: '310k+ lượt sử dụng',
    actionText: 'Sử dụng ngay',
    type: 'bhtn',
  },
  {
    id: 'mbti-test',
    title: 'Trắc nghiệm MBTI & Holland Code chuẩn hóa',
    category: 'assessment',
    categoryLabel: 'Đánh giá & Test',
    icon: 'psychology',
    description:
      'Khám phá 16 nhóm tính cách nghề nghiệp và 6 nhóm xu hướng sở thích Holland (RIASEC) được Việt hóa chuẩn mực kèm danh sách gợi ý công việc tương thích 95%.',
    tags: ['60 câu hỏi nhanh', 'Báo cáo PDF miễn phí'],
    stats: '670k+ người đã làm',
    actionText: 'Làm bài test',
    type: 'mbti',
  },
  {
    id: 'ats-resume',
    title: 'Tạo CV chuẩn ATS miễn phí (50+ Template)',
    category: 'cv',
    categoryLabel: 'Hồ sơ & CV',
    icon: 'badge',
    description:
      'Trình khởi tạo hồ sơ xin việc thông minh với thư viện thiết kế tương thích tuyệt đối hệ thống lọc hồ sơ tự động ATS của các tập đoàn đa quốc gia.',
    tags: ['Xuất PDF 1 chạm', 'Song ngữ Anh - Việt'],
    stats: '890k+ CV được tạo',
    actionText: 'Tạo CV ngay',
    type: 'cv',
  },
  {
    id: 'mock-interview',
    title: 'Phỏng vấn thử nghiệm & Mock Interview AI',
    category: 'assessment',
    categoryLabel: 'Đánh giá & Test',
    secondaryBadge: 'Trợ lý AI',
    icon: 'record_voice_over',
    description:
      'Ngân hàng câu hỏi tình huống thực tế theo từng ngành nghề (IT, Marketing, Sales, Tài chính). Nhận phân tích phản hồi bằng giọng nói và mẹo trả lời theo chuẩn STAR.',
    tags: ['Mô hình STAR', 'Chấm phát âm tiếng Anh'],
    stats: '240k+ lượt luyện tập',
    actionText: 'Luyện phỏng vấn',
    type: 'interview',
  },
  {
    id: 'pit-tax',
    title: 'Tính thuế TNCN lũy tiến & Quyết toán cuối năm',
    category: 'salary',
    categoryLabel: 'Lương & Thuế',
    icon: 'receipt_long',
    description:
      'Hỗ trợ người lao động có từ 2 nguồn thu nhập trở lên tính toán số tiền thuế thừa được hoàn lại hoặc số tiền nộp bổ sung khi tự làm tờ khai quyết toán thuế điện tử (eTax).',
    tags: ['Tích hợp eTax Mobile', 'Biểu 7 bậc thuế'],
    stats: '410k+ lượt sử dụng',
    actionText: 'Sử dụng ngay',
    type: 'tax-final',
  },
  {
    id: 'bhxh-one-time',
    title: 'Dự tính tiền rút Bảo hiểm xã hội (BHXH) một lần',
    category: 'salary',
    categoryLabel: 'Lương & Thuế',
    icon: 'savings',
    description:
      'Ước tính số tiền trợ cấp BHXH 1 lần nhận được dựa trên số năm đóng trước và sau năm 2014 cùng hệ số điều chỉnh trượt giá mới nhất của Nhà nước.',
    tags: ['Luật BHXH 2025', 'Hệ số trượt giá'],
    stats: '490k+ lượt tra cứu',
    actionText: 'Tính BHXH 1 lần',
    type: 'bhxh-one-time',
  },
  {
    id: 'probation-eval',
    title: 'Tra cứu Luật Thử việc & Hợp đồng lao động',
    category: 'market',
    categoryLabel: 'Thị trường',
    icon: 'gavel',
    description:
      'Kiểm tra quy định pháp lý về mức lương thử việc (tối thiểu 85%), thời hạn thử việc tối đa theo trình độ và quyền đơn phương chấm dứt hợp đồng.',
    tags: ['Bộ Luật LĐ 2019', 'Lương thử việc 85%'],
    stats: '280k+ lượt xem',
    actionText: 'Tra cứu luật',
    type: 'probation-eval',
  },
];

export const ToolsView = ({ currentUser, onTabChange, onShowToast }) => {
  // Bộ lọc & Tìm kiếm
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState('popular');

  // Preview mini calculator ở Card 1
  const [previewGross, setPreviewGross] = useState(30000000);

  // Widget tính lương chính
  const [calcMode, setCalcMode] = useState('gross-to-net'); // 'gross-to-net' | 'net-to-gross'
  const [salaryValue, setSalaryValue] = useState(25000000);
  const [salaryInputFormatted, setSalaryInputFormatted] = useState('25,000,000');
  const [region, setRegion] = useState('1');
  const [dependents, setDependents] = useState(0);
  const [insuranceType, setInsuranceType] = useState('official'); // 'official' | 'custom'
  const [customInsuranceWage, setCustomInsuranceWage] = useState(5000000);

  // Modal chi tiết & Modal các tính năng ('breakdown' | 'cv-scanner' | 'benchmark' | 'bhtn' | 'mbti' | 'interview' | 'tax-final' | 'bhxh-one-time' | 'probation-eval')
  const [activeModal, setActiveModal] = useState(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  // CV Scanner State & Input Ref
  const cvFileInputRef = useRef(null);
  const [cvFile, setCvFile] = useState(null);
  const [cvFileName, setCvFileName] = useState('');
  const [cvFileSize, setCvFileSize] = useState('');
  const [isScanningCv, setIsScanningCv] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResult, setScanResult] = useState(null);
  const [cvError, setCvError] = useState('');
  const [isDraggingCv, setIsDraggingCv] = useState(false);

  // Tax Finalization (tax-final) State
  const [taxFinalAnnualGross, setTaxFinalAnnualGross] = useState(360000000);
  const [taxFinalMonths, setTaxFinalMonths] = useState(12);
  const [taxFinalDependents, setTaxFinalDependents] = useState(0);
  const [taxFinalInsurancePaid, setTaxFinalInsurancePaid] = useState(37800000);
  const [taxFinalPrepaidTax, setTaxFinalPrepaidTax] = useState(18500000);

  // BHXH 1 lần State
  const [bhxhAvgSalary, setBhxhAvgSalary] = useState(12000000);
  const [bhxhYearsBefore2014, setBhxhYearsBefore2014] = useState(2);
  const [bhxhYearsAfter2014, setBhxhYearsAfter2014] = useState(4);

  // Probation State
  const [probationJobType, setProbationJobType] = useState('university');
  const [probationOfficialSalary, setProbationOfficialSalary] = useState(20000000);

  // Kết quả tính của Widget chính
  const widgetResult = useMemo(() => {
    if (calcMode === 'gross-to-net') {
      return calculateGrossToNet(salaryValue, dependents, region, insuranceType, customInsuranceWage);
    } else {
      return calculateNetToGross(salaryValue, dependents, region, insuranceType, customInsuranceWage);
    }
  }, [calcMode, salaryValue, dependents, region, insuranceType, customInsuranceWage]);

  // Kết quả tính của Card 1 Preview
  const previewResult = useMemo(() => {
    return calculateGrossToNet(previewGross, 0, '1', 'official');
  }, [previewGross]);

  // Lọc và sắp xếp công cụ dựa theo sortOption
  const filteredTools = useMemo(() => {
    const list = TOOLS_DATA.filter((tool) => {
      const matchCategory =
        selectedCategory === 'all' ||
        (selectedCategory === 'salary' && tool.category === 'salary') ||
        (selectedCategory === 'cv' && tool.category === 'cv') ||
        (selectedCategory === 'assessment' && tool.category === 'assessment') ||
        (selectedCategory === 'market' && tool.category === 'market');

      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        tool.title.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.categoryLabel.toLowerCase().includes(q);

      return matchCategory && matchSearch;
    });

    return [...list].sort((a, b) => {
      if (sortOption === 'popular') {
        const getStatsNum = (str) => {
          const match = str.match(/(\d+)k/);
          return match ? parseInt(match[1], 10) : 0;
        };
        return getStatsNum(b.stats) - getStatsNum(a.stats);
      }
      if (sortOption === 'new') {
        const isNewA = a.tags.some((t) => t.includes('2025') || t.includes('AI') || t.includes('eTax')) || a.secondaryBadge ? 1 : 0;
        const isNewB = b.tags.some((t) => t.includes('2025') || t.includes('AI') || t.includes('eTax')) || b.secondaryBadge ? 1 : 0;
        return isNewB - isNewA;
      }
      if (sortOption === 'high-rate') {
        return a.title.localeCompare(b.title, 'vi');
      }
      return 0;
    });
  }, [selectedCategory, searchQuery, sortOption]);

  // Tính Quyết toán thuế TNCN cả năm
  const taxFinalResult = useMemo(
    () =>
      calculateTaxFinalization({
        annualGross: taxFinalAnnualGross,
        months: taxFinalMonths,
        dependents: taxFinalDependents,
        insurancePaid: taxFinalInsurancePaid,
        prepaidTax: taxFinalPrepaidTax,
      }),
    [
      taxFinalAnnualGross,
      taxFinalMonths,
      taxFinalDependents,
      taxFinalInsurancePaid,
      taxFinalPrepaidTax,
    ]
  );

  // Tính BHXH 1 lần
  const bhxhOneTimeResult = useMemo(
    () =>
      calculateBhxhOneTime({
        avgSalary: bhxhAvgSalary,
        yearsBefore2014: bhxhYearsBefore2014,
        yearsAfter2014: bhxhYearsAfter2014,
      }),
    [bhxhAvgSalary, bhxhYearsBefore2014, bhxhYearsAfter2014]
  );

  // Tính Luật thử việc
  const probationResult = useMemo(
    () =>
      calculateProbation({
        jobType: probationJobType,
        officialSalary: probationOfficialSalary,
      }),
    [probationOfficialSalary, probationJobType]
  );

  // Xử lý tệp tải lên cho AI CV Scanner
  const handleCvFileSelect = (file) => {
    if (!file) return;
    setCvError('');
    const validExtensions = ['.pdf', '.doc', '.docx'];
    const nameLower = file.name.toLowerCase();
    const isValidExt = validExtensions.some((ext) => nameLower.endsWith(ext));
    if (!isValidExt) {
      const err = 'Chỉ hỗ trợ tệp định dạng .pdf, .doc hoặc .docx!';
      setCvError(err);
      if (onShowToast) onShowToast(err, 'error');
      return;
    }
    const maxSizeBytes = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSizeBytes) {
      const err = 'Dung lượng tệp vượt quá 10MB cho phép!';
      setCvError(err);
      if (onShowToast) onShowToast(err, 'error');
      return;
    }

    setCvFile(file);
    setCvFileName(file.name);
    setCvFileSize((file.size / (1024 * 1024)).toFixed(1) + ' MB');
    setIsScanningCv(true);
    setScanProgress(15);
    setScanResult(null);

    let progress = 15;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 20) + 15;
      if (progress >= 100) {
        clearInterval(interval);
        setScanProgress(100);
        setTimeout(() => {
          setIsScanningCv(false);
          setScanResult({
            overallScore: 88,
            formatScore: 92,
            keywordScore: 85,
            experienceScore: 89,
            matchedKeywords: ['ReactJS', 'TypeScript', 'Tailwind CSS', 'Figma', 'UI/UX Design', 'Next.js', 'REST API', 'Git'],
            missingKeywords: ['Docker', 'CI/CD', 'Unit Testing / Jest', 'Microservices'],
            recommendations: [
              'Bổ sung số liệu định lượng (metrics, % tăng trưởng, thời gian tối ưu) trong các dự án gần nhất.',
              'Thêm các từ khóa CI/CD hoặc Docker để tăng điểm tương thích ATS lên 95+.',
              'Định dạng cấu trúc phân cấp tiêu đề đã chuẩn xác, dễ đọc cho hệ thống quét tự động.'
            ],
          });
          if (onShowToast) onShowToast(`Quét CV "${file.name}" hoàn tất! Đạt 88/100 điểm.`, 'success');
        }, 300);
      } else {
        setScanProgress(progress);
      }
    }, 180);
  };

  const handleLoadSampleCv = () => {
    const fakeFile = {
      name: 'NguyenVanA_Senior_Frontend_Engineer.pdf',
      size: 1.4 * 1024 * 1024,
    };
    handleCvFileSelect(fakeFile);
  };

  const handleResetCvScanner = () => {
    setCvFile(null);
    setCvFileName('');
    setCvFileSize('');
    setIsScanningCv(false);
    setScanProgress(0);
    setScanResult(null);
    setCvError('');
    if (cvFileInputRef.current) cvFileInputRef.current.value = '';
  };

  // Xử lý thay đổi input tiền lương
  const handleSalaryInputChange = (e) => {
    const raw = e.target.value.replace(/,/g, '').replace(/[^0-9]/g, '');
    const num = Number(raw) || 0;
    setSalaryValue(num);
    setSalaryInputFormatted(num > 0 ? formatNumberOnly(num) : '');
  };

  // Xử lý đăng ký nhận tin
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) {
      if (onShowToast) onShowToast('Vui lòng nhập địa chỉ email hợp lệ!', 'error');
      return;
    }
    setIsSubscribed(true);
    if (onShowToast) onShowToast('Đã đăng ký nhận bản tin thành công!', 'success');
  };

  // Scroll xuống Widget
  const scrollToWidget = () => {
    const el = document.getElementById('quick-calculator-widget');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Mở công cụ tương ứng
  const handleToolAction = (tool) => {
    if (tool.type === 'cv') {
      if (onTabChange) onTabChange('cv-builder');
      return;
    }
    setActiveModal(tool.type);
    if (onShowToast) onShowToast(`Đang mở: ${tool.title}`, 'info');
  };

  return (
    <div className="flex flex-col w-full bg-surface text-on-surface antialiased min-h-screen">
      {/* ===================================================================== */}
      {/* 1. INTERACTIVE TOP SEARCH & HERO HUB                                  */}
      {/* ===================================================================== */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-surface-container-high/60 via-surface-container-low/40 to-surface py-space-xl">
        {/* Ambient Glow Orbs */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[720px] h-[340px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 -right-24 w-80 h-80 bg-secondary-container/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-margin flex flex-col items-center text-center">
          {/* Main Headline */}
          <h1 className="font-display-lg text-display-lg text-on-surface max-w-4xl tracking-tight leading-tight">
            Bộ công cụ phát triển sự nghiệp toàn diện cho ứng viên
          </h1>

          {/* Subtitle */}
          <p className="mt-space-md font-body-lg text-body-lg text-on-surface-variant max-w-3xl leading-relaxed">
            Tính toán lương thực nhận Gross - Net, kiểm tra chuẩn CV bằng AI, định giá thị trường lao động và trắc nghiệm tính cách nghề nghiệp chuẩn quốc tế.
          </p>

          {/* Search Input Bar & Quick Filter Pills */}
          <div className="w-full max-w-2xl mt-space-lg">
            <div className="relative flex items-center bg-surface-container-lowest rounded-full p-2 shadow-md">
              <span
                className="material-symbols-outlined text-primary text-[24px] ml-3 shrink-0"
                style={{ fontVariationSettings: '"FILL" 1' }}
              >
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm nhanh công cụ: Gross sang Net, Chấm điểm CV, Tính BHXH, MBTI..."
                className="w-full bg-transparent px-space-sm py-2 font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none"
              />
              <button
                type="button"
                onClick={scrollToWidget}
                className="shrink-0 px-space-lg py-2.5 bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg rounded-full transition-all duration-200 shadow-sm flex items-center gap-space-xs cursor-pointer"
              >
                <span>Tìm kiếm</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center justify-center gap-space-xs mt-space-md">
              {[
                { id: 'all', label: `Tất cả công cụ (${TOOLS_DATA.length})` },
                { id: 'salary', label: 'Lương & Thuế' },
                { id: 'cv', label: 'Hồ sơ & CV' },
                { id: 'assessment', label: 'Đánh giá & Test' },
                { id: 'market', label: 'Thị trường' },
              ].map((pill) => (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => setSelectedCategory(pill.id)}
                  className={`px-4 py-2 rounded-full font-label-md text-label-md transition-colors duration-200 shadow-sm cursor-pointer ${
                    selectedCategory === pill.id
                      ? 'bg-primary-container text-on-primary'
                      : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 2. FEATURED HUB: 2 CORE ANCHOR TOOLS (ASYMMETRIC BENTO)               */}
      {/* ===================================================================== */}
      <section className="w-full max-w-7xl mx-auto px-margin py-space-xl">
        <div className="flex items-center justify-between mb-space-lg">
          <div className="flex items-center gap-space-sm">
            <span className="inline-flex p-2 bg-primary-fixed rounded-xl text-primary">
              <span className="material-symbols-outlined text-[24px]">verified</span>
            </span>
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-bold">
                Lựa chọn hàng đầu
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">
                Công cụ cốt lõi được tin dùng nhất
              </h2>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-1 text-on-surface-variant font-label-md text-label-md">
            <span className="material-symbols-outlined text-[16px] text-primary">update</span>
            <span>Cập nhật ngày 15/01/2025</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
          {/* Tool 1: Gross to Net Advanced Calculator Card (7 cols) */}
          <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between group">
            {/* Top Banner Gradient Accent */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary to-primary-container" />

            <div>
              <div className="flex items-start justify-between gap-space-md mb-space-md">
                <div className="flex items-center gap-space-md">
                  <div className="w-14 h-14 rounded-xl bg-surface-container-high flex items-center justify-center text-primary-container shrink-0 shadow-inner">
                    <span className="material-symbols-outlined text-[32px]">payments</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-space-xs mb-1">
                      <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm uppercase tracking-wide">
                        Phổ biến nhất
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                        Quy định 2024 - 2025
                      </span>
                    </div>
                    <h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors">
                      Tính lương Gross sang Net & Ngược lại
                    </h3>
                  </div>
                </div>
              </div>

              <p className="font-body-md text-body-md text-on-surface-variant mb-space-lg leading-relaxed">
                Hỗ trợ chuyển đổi 2 chiều chính xác tuyệt đối. Tự động khấu trừ Bảo hiểm Xã hội (8%), BHYT (1.5%), BHTN (1%) và biểu thuế thu nhập cá nhân lũy tiến từng phần mới nhất.
              </p>

              {/* Interactive Fast Simulator inside the Card */}
              <div className="bg-surface-container-low rounded-xl p-space-md mb-space-lg">
                <div className="flex items-center justify-between mb-space-sm">
                  <span className="font-label-md text-label-md text-on-surface font-semibold">
                    Mô phỏng lương tháng nhanh
                  </span>
                  <div className="flex items-center gap-1 text-on-surface-variant font-body-sm text-body-sm">
                    <span className="material-symbols-outlined text-[16px] text-primary">info</span>
                    <span>Vùng I (Hà Nội, TP.HCM)</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm items-center">
                  <div className="sm:col-span-2 relative">
                    <input
                      type="number"
                      step="1000000"
                      value={previewGross}
                      onChange={(e) => setPreviewGross(Math.max(0, Number(e.target.value) || 0))}
                      placeholder="Nhập mức lương Gross..."
                      className="w-full bg-surface-container-lowest rounded-full px-space-md py-2.5 font-headline-sm text-headline-sm text-primary font-bold focus:outline-none shadow-sm"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 font-label-sm text-label-sm text-outline font-semibold">
                      VND
                    </span>
                  </div>
                  <div className="bg-surface-container-lowest rounded-full px-space-md py-2 text-center shadow-sm">
                    <span className="block font-label-sm text-label-sm text-outline-variant uppercase">
                      Net dự kiến
                    </span>
                    <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                      {formatVND(previewResult.net)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-space-sm pt-space-xs text-on-surface-variant font-body-sm text-body-sm">
                  <span>
                    Người phụ thuộc: <strong>0 người</strong>
                  </span>
                  <span className="text-tertiary">
                    Tổng khấu trừ BH & Thuế:{' '}
                    <strong>{formatVND(previewResult.totalIns + previewResult.tax)}</strong>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-space-md pt-space-sm">
              <div className="flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
                <span className="material-symbols-outlined text-primary text-[18px]">group</span>
                <span>
                  Hơn <strong>1.450.000+</strong> lượt tính mỗi tháng
                </span>
              </div>
              <div className="flex items-center gap-space-sm">
                <button
                  type="button"
                  onClick={scrollToWidget}
                  className="px-space-lg py-2.5 bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg rounded-full transition-all duration-200 shadow-sm flex items-center gap-space-xs cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">calculate</span>
                  <span>Tính lương ngay</span>
                </button>
              </div>
            </div>
          </div>

          {/* Tool 2: AI CV Scanner Card (5 cols) */}
          <div className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between group">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-secondary-container to-primary" />

            <div>
              <div className="flex items-start justify-between gap-space-md mb-space-md">
                <div className="w-14 h-14 rounded-xl bg-surface-container-high flex items-center justify-center text-primary shrink-0 shadow-inner">
                  <span className="material-symbols-outlined text-[32px]">neurology</span>
                </div>
                <div className="flex flex-col items-end">
                  <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm uppercase tracking-wide">
                    Công nghệ AI
                  </span>
                  <span className="mt-1 font-label-sm text-label-sm text-outline font-semibold">
                    Chuẩn ATS 2025
                  </span>
                </div>
              </div>

              <h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors mb-space-xs">
                AI CV Scanner & Đánh giá mức độ phù hợp JD
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-space-md leading-relaxed">
                Quét và chấm điểm CV bằng trí tuệ nhân tạo, đối chiếu từ khóa với mô tả công việc (JD), gia tăng tỷ lệ nhận lời mời phỏng vấn lên tới 85%.
              </p>

              {/* Interactive Graphic / Visual Metric Pill */}
              <div className="bg-surface-container-low rounded-xl p-space-md mb-space-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-label-md text-label-md text-on-surface font-semibold">
                    Điểm phù hợp trung bình sau tối ưu
                  </span>
                  <span className="font-headline-sm text-headline-sm text-primary font-bold">
                    88 / 100
                  </span>
                </div>
                {/* Progress Bar */}
                <div className="w-full bg-surface-container-high rounded-full h-2.5 overflow-hidden">
                  <div className="bg-primary-container h-2.5 rounded-full transition-all duration-1000 w-[88%]" />
                </div>
                <div className="flex items-center justify-between mt-space-sm text-on-surface-variant font-label-sm text-label-sm">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-primary" /> Phát hiện 12 từ khóa thiếu
                  </span>
                  <span className="flex items-center gap-1 text-primary">
                    <span className="material-symbols-outlined text-[14px]">bolt</span> Sửa lỗi format tự động
                  </span>
                </div>
              </div>

              <div className="p-3 bg-surface-container-lowest rounded-xl flex items-center gap-3 shadow-inner">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAenvMF3_6Rh8HBq4mr8uhYQ1_Td86FXhJZ9B6gGm9PwhaKidXaRgrDF7EoeAnqu7Du1x-Ah47pHIyKKOQmV83BeiUD-7ivCH3JUf8MkqZQCJBfXTVVIiB1X4T8uxN5BUnW2N91L_bnSnC3wMthbG1bBepz-lE-qQmQxM4K_PvxTNyrBYoIcBDcdpXzVVXbqw_x6qPx5-3fBM1egaXAAv__LFFB2Pqcik-jl0wgJUjginfRw1VJpthC"
                  alt="Recruiter reviewing CV"
                  onError={(e) => {
                    e.currentTarget.src = featuredCareerImg;
                  }}
                  className="w-12 h-12 rounded-xl object-cover shrink-0"
                />
                <div className="min-w-0">
                  <p className="font-label-md text-label-md text-on-surface truncate font-semibold">
                    Tương thích hơn 500+ doanh nghiệp
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                    Được tối ưu cho Shopee, VNG, Techcombank, FPT...
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-space-md pt-space-lg">
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Miễn phí 3 lần quét/ngày
              </span>
              <button
                type="button"
                onClick={() => setActiveModal('cv-scanner')}
                className="px-space-lg py-2.5 bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg rounded-full transition-all duration-200 shadow-sm flex items-center gap-space-xs cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">upload_file</span>
                <span>Tải CV chấm điểm</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 3. INTERACTIVE LIVE SIMULATOR WIDGET                                  */}
      {/* ===================================================================== */}
      <section className="w-full max-w-7xl mx-auto px-margin py-space-lg" id="quick-calculator-widget">
        <div className="bg-surface-container-lowest rounded-xl p-space-lg lg:p-space-xl shadow-md relative overflow-hidden">
          {/* Decorative Backdrop Graphic */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/5 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg pb-space-lg border-b border-surface-container-high/50">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">
                Widget Tính Lương Gross - Net Tức Thì
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                Nhập nhanh mức lương đề xuất và số người phụ thuộc để kiểm tra số tiền thực lãnh về tài khoản ATM hàng tháng.
              </p>
            </div>

            <div className="flex items-center gap-space-sm">
              <button
                type="button"
                onClick={() => setCalcMode('gross-to-net')}
                className={`px-5 py-2 rounded-full font-label-md text-label-md transition-all shadow-sm cursor-pointer ${
                  calcMode === 'gross-to-net'
                    ? 'bg-primary-container text-on-primary'
                    : 'bg-surface-container-high text-on-surface-variant hover:text-primary'
                }`}
              >
                Gross sang Net
              </button>
              <button
                type="button"
                onClick={() => setCalcMode('net-to-gross')}
                className={`px-5 py-2 rounded-full font-label-md text-label-md transition-all shadow-sm cursor-pointer ${
                  calcMode === 'net-to-gross'
                    ? 'bg-primary-container text-on-primary'
                    : 'bg-surface-container-high text-on-surface-variant hover:text-primary'
                }`}
              >
                Net sang Gross
              </button>
            </div>
          </div>

          {/* Widget Interactive Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center pt-space-lg">
            {/* Input Parameters Form (7 cols) */}
            <div className="lg:col-span-7 space-y-space-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                <div>
                  <label className="block font-label-md text-label-md text-on-surface mb-1.5 font-medium">
                    {calcMode === 'gross-to-net' ? 'Mức lương thỏa thuận (VND)' : 'Mức lương Net mong muốn (VND)'}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={salaryInputFormatted}
                      onChange={handleSalaryInputChange}
                      placeholder="25,000,000"
                      className="w-full bg-surface-container-low rounded-xl px-4 py-3 font-headline-md text-headline-md text-primary font-bold focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/30 transition-all pr-24"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-outline font-label-md text-label-md font-semibold">
                      VND/tháng
                    </span>
                  </div>

                  {/* Quick Preset Buttons */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {[15000000, 20000000, 25000000, 35000000].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => {
                          setSalaryValue(amt);
                          setSalaryInputFormatted(formatNumberOnly(amt));
                        }}
                        className={`text-[11px] px-2 py-0.5 rounded-full border transition-colors cursor-pointer ${
                          salaryValue === amt
                            ? 'bg-primary-fixed text-primary border-primary font-bold'
                            : 'bg-surface-container-lowest text-on-surface-variant border-surface-container-high hover:border-primary/40'
                        }`}
                      >
                        {(amt / 1000000).toLocaleString('vi-VN')} triệu
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-label-md text-label-md text-on-surface mb-1.5 font-medium">
                    Khu vực / Vùng lương tối thiểu
                  </label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full bg-surface-container-low rounded-xl px-4 py-3 font-body-md text-body-md text-on-surface focus:outline-none focus:bg-surface-container-lowest transition-all"
                  >
                    <option value="1">Vùng I (4.960.000 đ - Hà Nội, TP.HCM)</option>
                    <option value="2">Vùng II (4.410.000 đ - Đà Nẵng, Cần Thơ)</option>
                    <option value="3">Vùng III (3.860.000 đ - Bắc Ninh, Hải Dương)</option>
                    <option value="4">Vùng IV (3.450.000 đ - Khu vực còn lại)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                <div>
                  <label className="block font-label-md text-label-md text-on-surface mb-1.5 font-medium">
                    Số người phụ thuộc giảm trừ
                  </label>
                  <div className="flex items-center bg-surface-container-low rounded-xl p-1">
                    <button
                      type="button"
                      onClick={() => setDependents((prev) => Math.max(0, prev - 1))}
                      className="w-10 h-10 rounded-lg bg-surface-container-lowest text-on-surface font-headline-sm text-headline-sm hover:bg-surface-container-high transition-colors flex items-center justify-center cursor-pointer select-none"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-headline-sm text-headline-sm text-on-surface font-bold">
                      {dependents}
                    </span>
                    <button
                      type="button"
                      onClick={() => setDependents((prev) => prev + 1)}
                      className="w-10 h-10 rounded-lg bg-surface-container-lowest text-on-surface font-headline-sm text-headline-sm hover:bg-surface-container-high transition-colors flex items-center justify-center cursor-pointer select-none"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-[12px] text-outline mt-1 block">
                    4.400.000 đ/tháng cho mỗi người phụ thuộc
                  </span>
                </div>

                <div>
                  <label className="block font-label-md text-label-md text-on-surface mb-1.5 font-medium">
                    Mức đóng bảo hiểm
                  </label>
                  <div className="flex items-center gap-space-sm pt-2">
                    <label className="inline-flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="ins-type"
                        checked={insuranceType === 'official'}
                        onChange={() => setInsuranceType('official')}
                        className="accent-primary w-4 h-4 cursor-pointer"
                      />
                      <span className="font-body-md text-body-md text-on-surface">Trên lương chính thức</span>
                    </label>
                    <label className="inline-flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="ins-type"
                        checked={insuranceType === 'custom'}
                        onChange={() => setInsuranceType('custom')}
                        className="accent-primary w-4 h-4 cursor-pointer"
                      />
                      <span className="font-body-md text-body-md text-on-surface-variant">Mức quy định khác</span>
                    </label>
                  </div>

                  {insuranceType === 'custom' && (
                    <div className="mt-2 relative">
                      <input
                        type="number"
                        step="500000"
                        value={customInsuranceWage}
                        onChange={(e) => setCustomInsuranceWage(Math.max(0, Number(e.target.value) || 0))}
                        placeholder="Mức đóng BH..."
                        className="w-full bg-surface-container-low rounded-xl px-3 py-2 text-sm font-semibold pr-12 focus:outline-none"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-outline font-semibold">
                        VND
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Realtime Result Summary Card (5 cols) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-primary via-primary-container to-surface-tint rounded-xl p-space-lg text-on-primary shadow-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-space-md">
                  <span className="font-label-md text-label-md uppercase tracking-wider text-primary-fixed">
                    KẾT QUẢ THỰC NHẬN
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-on-primary/10 backdrop-blur-sm text-[11px] font-semibold text-primary-fixed">
                    Chính xác 100%
                  </span>
                </div>

                <div className="mb-space-lg">
                  <span className="font-label-md text-label-md text-on-primary/80">
                    {calcMode === 'gross-to-net' ? 'LƯƠNG NET (Thực nhận về tài khoản):' : 'LƯƠNG GROSS (Cần thỏa thuận):'}
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="font-display-lg text-display-lg text-on-primary font-extrabold tracking-tight">
                      {formatNumberOnly(calcMode === 'gross-to-net' ? widgetResult.net : widgetResult.gross)}
                    </span>
                    <span className="font-headline-md text-headline-md text-primary-fixed">VND</span>
                  </div>
                </div>

                {/* Deductions breakdown mini bars */}
                <div className="space-y-2.5 bg-on-primary/10 rounded-xl p-space-md backdrop-blur-sm">
                  <div className="flex justify-between items-center text-body-sm font-body-sm">
                    <span className="text-on-primary/90 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-secondary-fixed" /> Bảo hiểm bắt buộc (10.5%):
                    </span>
                    <span className="font-bold text-on-primary">{formatVND(widgetResult.totalIns)}</span>
                  </div>
                  <div className="flex justify-between items-center text-body-sm font-body-sm">
                    <span className="text-on-primary/90 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-tertiary-fixed" /> Thuế thu nhập cá nhân (TNCN):
                    </span>
                    <span className="font-bold text-on-primary">{formatVND(widgetResult.tax)}</span>
                  </div>
                  <div className="flex justify-between items-center text-body-sm font-body-sm pt-2 border-t border-on-primary/10">
                    <span className="text-on-primary/80">Giảm trừ bản thân:</span>
                    <span className="font-semibold text-on-primary">11.000.000 đ</span>
                  </div>
                  {dependents > 0 && (
                    <div className="flex justify-between items-center text-body-sm font-body-sm">
                      <span className="text-on-primary/80">Giảm trừ người phụ thuộc ({dependents} người):</span>
                      <span className="font-semibold text-on-primary">{formatVND(dependents * 4400000)}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-space-md flex items-center justify-between gap-space-sm">
                <span className="text-[12px] text-primary-fixed">Đã bao gồm điều chỉnh theo luật thuế 2025</span>
                <button
                  type="button"
                  onClick={() => setActiveModal('breakdown')}
                  className="px-space-md py-2 bg-surface-container-lowest hover:bg-surface-container-low text-primary font-label-md text-label-md rounded-full transition-colors shadow-sm flex items-center gap-1 cursor-pointer"
                >
                  <span>Xem bảng chi tiết</span>
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 4. COMPREHENSIVE TOOL GRID (6-8 SPECIALIZED TOOLS)                    */}
      {/* ===================================================================== */}
      <section className="w-full max-w-7xl mx-auto px-margin py-space-xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-space-sm">
          <div>
            <div className="inline-flex items-center gap-1 text-on-surface font-label-sm text-label-sm uppercase font-bold tracking-wider mb-1">
              <span className="material-symbols-outlined text-[16px]">grid_view</span>
              Hệ sinh thái tiện ích
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">
              Danh mục công cụ hỗ trợ nghề nghiệp
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Được thiết kế chuyên sâu cho thị trường lao động và ứng viên tại Việt Nam.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-label-sm text-label-sm text-on-surface-variant">Sắp xếp:</span>
            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="appearance-none px-3.5 py-1.5 pr-8 rounded-full bg-surface-container-lowest text-on-surface font-label-md text-label-md shadow-sm border border-surface-container-high focus:outline-none cursor-pointer"
              >
                <option value="popular">Phổ biến nhất</option>
                <option value="new">Mới nhất</option>
                <option value="high-rate">Đánh giá cao</option>
              </select>
              <span className="material-symbols-outlined text-[16px] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">
                expand_more
              </span>
            </div>
          </div>
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className="group bg-surface-container-lowest rounded-xl p-space-lg shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-transparent hover:border-primary/20"
            >
              <div>
                <div className="flex items-start justify-between mb-space-md">
                  <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-[26px]">{tool.icon}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {tool.secondaryBadge && (
                      <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm">
                        {tool.secondaryBadge}
                      </span>
                    )}
                    <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                      {tool.categoryLabel}
                    </span>
                  </div>
                </div>

                <h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors leading-snug">
                  {tool.title}
                </h3>

                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 mb-space-md line-clamp-3 leading-relaxed">
                  {tool.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-space-md">
                  {tool.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-full bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-space-md flex items-center justify-between border-t border-surface-container-high/40">
                <div className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-[16px] text-primary">analytics</span>
                  <span>{tool.stats}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleToolAction(tool)}
                  className="px-space-md py-2 bg-surface-container-low hover:bg-primary hover:text-on-primary text-primary font-label-md text-label-md rounded-full transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>{tool.actionText}</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 5. KEY METRICS & TRUST BANNER                                         */}
      {/* ===================================================================== */}
      <section className="w-full bg-surface-container-low py-space-xl">
        <div className="max-w-7xl mx-auto px-margin">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg text-center divide-y md:divide-y-0 md:divide-x divide-outline-variant/30">
            <div className="flex flex-col items-center p-space-md">
              <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary mb-space-sm shadow-sm">
                <span className="material-symbols-outlined text-[28px]">monitoring</span>
              </div>
              <span className="font-display-lg text-display-lg text-primary font-extrabold tracking-tight">
                2.5M+
              </span>
              <span className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-1">
                Lượt tính lương thành công
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Dữ liệu được bảo mật 100% theo tiêu chuẩn ISO
              </span>
            </div>

            <div className="flex flex-col items-center p-space-md">
              <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary mb-space-sm shadow-sm">
                <span className="material-symbols-outlined text-[28px]">document_scanner</span>
              </div>
              <span className="font-display-lg text-display-lg text-secondary font-extrabold tracking-tight">
                850k+
              </span>
              <span className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-1">
                Hồ sơ CV được tối ưu AI
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Tăng tỷ lệ phản hồi phỏng vấn trung bình 3.2 lần
              </span>
            </div>

            <div className="flex flex-col items-center p-space-md">
              <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center text-primary mb-space-sm shadow-sm">
                <span className="material-symbols-outlined text-[28px]">sentiment_very_satisfied</span>
              </div>
              <span className="font-display-lg text-display-lg text-primary font-extrabold tracking-tight">
                98.4%
              </span>
              <span className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-1">
                Đánh giá hài lòng
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Từ hơn 45.000 phản hồi của ứng viên trên cả nước
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 6. CAREER INSIGHTS & BEST PRACTICE GUIDES                             */}
      {/* ===================================================================== */}
      <section className="w-full max-w-7xl mx-auto px-margin py-space-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-space-lg gap-space-sm">
          <div>
            <div className="inline-flex items-center gap-1 text-on-surface font-label-sm text-label-sm uppercase font-bold tracking-wider mb-1">
              <span className="material-symbols-outlined text-[16px]">menu_book</span>
              Cẩm nang chuyên gia
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">
              Hướng dẫn sử dụng công cụ tối ưu sự nghiệp
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Bí quyết đàm phán quyền lợi và chuẩn bị hồ sơ từ chuyên gia nhân sự JobCentral.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              if (onTabChange) onTabChange('news');
            }}
            className="inline-flex items-center gap-1 text-primary hover:text-primary-container font-label-lg text-label-lg cursor-pointer"
          >
            <span>Xem tất cả bài viết</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          {/* Article 1 */}
          <article className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between border border-surface-container-high/30">
            <div>
              <div className="relative w-full h-48 overflow-hidden bg-surface-container-high">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0zmyrQVJsbqP35obGnYYhUSpi00xm1oeaIIQoWba6kflFof2iB66PmGHPZJkmRks-HueYdBppGfhHNkVU4kEZZw9dlDdEJ3Ja00xNLG7_f7yRXpimNPXVBStBjoPuTZeDpsRB9kZj8IVqB94wWyrBIrJbBuWC4J--QfKO22tKubRpKNDz78VFY4lL3tLeCa2NyjbRcoKePEH_TNO60gMekY76bb8YD7uk8lpUEwLyEjZ3kBoSQ8F5"
                  alt="Deal lương thành công"
                  onError={(e) => {
                    e.currentTarget.src = salaryNegotiationImg;
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-primary font-label-sm text-label-sm font-bold shadow-sm">
                  Đàm phán lương
                </span>
              </div>
              <div className="p-space-lg">
                <div className="flex items-center gap-2 font-label-sm text-label-sm text-outline mb-2">
                  <span className="material-symbols-outlined text-[14px]">schedule</span>
                  <span>5 phút đọc</span>
                  <span>•</span>
                  <span>Cập nhật tuần này</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors leading-snug">
                  Cách đàm phán lương hiệu quả dựa trên bảng quy đổi Gross - Net
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 line-clamp-3 leading-relaxed">
                  Chiến thuật đề xuất mức lương mong muốn khi deal lương với HR, tránh rủi ro bị giảm trừ bảo hiểm quá nhiều và cách làm rõ các khoản phụ cấp không chịu thuế.
                </p>
              </div>
            </div>
            <div className="px-space-lg pb-space-lg pt-0">
              <button
                type="button"
                onClick={() => {
                  if (onTabChange) onTabChange('news');
                }}
                className="inline-flex items-center gap-1 text-primary font-label-md text-label-md group-hover:translate-x-1 transition-transform cursor-pointer"
              >
                <span>Đọc chi tiết</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </article>

          {/* Article 2 */}
          <article className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between border border-surface-container-high/30">
            <div>
              <div className="relative w-full h-48 overflow-hidden bg-surface-container-high">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCeEoAz03312WLNLisdiZWgpzmwlSjfHwsywS5DEaSNSGjtReYlpobzoJamYi3jdF5TJZwm3GSKHSq9Ig-Qb4LJ2XfXOgAeFUW5mkSmpXIHrR9BNJw7KlzowNvMRQqfipztS3-MzWFE2nuNgUsavqpMcTSYb9yUYBYM3nxaV-k0hvIo3sKE0LUH3BmKYXwhZ4xtMMXC7jOc8EHp7Wj9goQxjztKbwaNUp8c36EOso7Lk9yJybxgnC7V"
                  alt="Tối ưu từ khóa CV ATS"
                  onError={(e) => {
                    e.currentTarget.src = featuredCareerImg;
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-primary font-label-sm text-label-sm font-bold shadow-sm">
                  Tối ưu CV & AI
                </span>
              </div>
              <div className="p-space-lg">
                <div className="flex items-center gap-2 font-label-sm text-label-sm text-outline mb-2">
                  <span className="material-symbols-outlined text-[14px]">schedule</span>
                  <span>7 phút đọc</span>
                  <span>•</span>
                  <span>Xu hướng 2025</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors leading-snug">
                  Tối ưu từ khóa CV để vượt qua hệ thống quét tự động ATS
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 line-clamp-3 leading-relaxed">
                  Hiểu cách thuật toán AI và ATS phân loại ứng viên, cách trích xuất động từ hành động và số liệu đo lường kết quả công việc để đạt điểm tương thích trên 85%.
                </p>
              </div>
            </div>
            <div className="px-space-lg pb-space-lg pt-0">
              <button
                type="button"
                onClick={() => {
                  if (onTabChange) onTabChange('news');
                }}
                className="inline-flex items-center gap-1 text-primary font-label-md text-label-md group-hover:translate-x-1 transition-transform cursor-pointer"
              >
                <span>Đọc chi tiết</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </article>

          {/* Article 3 */}
          <article className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between border border-surface-container-high/30">
            <div>
              <div className="relative w-full h-48 overflow-hidden bg-surface-container-high">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgGrkCtPFF0UmQ_Iy0vv8YM1AOpuvQCra7jyfkad9BZlbEDtZdIN_vAvoJhOvWLewJRwOZ7G99AcFpuypKSA8mZvVJuDzp3hodXdnhP2Xa9-961R2D6CrQCGmpVPEUCu32pImTEVM0SxQXGzSTzXgSIcxpL59AgpTFuL-2UWC48iKn3rGAM5XjJy1aJMF0Da7qdWD4_n2CYPwXVMGmQSZ3QI6XoYUjNgo60LUZW-jv10xCEXnuNUb1"
                  alt="Luật lao động và bảo hiểm"
                  onError={(e) => {
                    e.currentTarget.src = remoteHybridImg;
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-primary font-label-sm text-label-sm font-bold shadow-sm">
                  Luật Lao Động
                </span>
              </div>
              <div className="p-space-lg">
                <div className="flex items-center gap-2 font-label-sm text-label-sm text-outline mb-2">
                  <span className="material-symbols-outlined text-[14px]">schedule</span>
                  <span>6 phút đọc</span>
                  <span>•</span>
                  <span>Cẩm nang pháp lý</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface group-hover:text-primary transition-colors leading-snug">
                  Hiểu đúng về bảo hiểm xã hội khi nhảy việc để không thiệt thòi
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 line-clamp-3 leading-relaxed">
                  Hướng dẫn chốt sổ bảo hiểm xã hội, cộng dồn thời gian đóng bảo hiểm thất nghiệp và cách xử lý khi có quãng nghỉ ngắt quãng giữa hai công ty.
                </p>
              </div>
            </div>
            <div className="px-space-lg pb-space-lg pt-0">
              <button
                type="button"
                onClick={() => {
                  if (onTabChange) onTabChange('news');
                }}
                className="inline-flex items-center gap-1 text-primary font-label-md text-label-md group-hover:translate-x-1 transition-transform cursor-pointer"
              >
                <span>Đọc chi tiết</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </article>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 7. COMMUNITY FEEDBACK / CALL-TO-ACTION NEWSLETTER BANNER             */}
      {/* ===================================================================== */}
      <section className="w-full max-w-7xl mx-auto px-margin pb-space-xl">
        <div className="bg-gradient-to-r from-primary-container to-primary rounded-xl p-space-lg lg:p-space-xl text-on-primary flex flex-col lg:flex-row items-center justify-between gap-space-lg shadow-md relative overflow-hidden">
          {/* Glow Decor */}
          <div className="absolute -left-10 -top-10 w-64 h-64 bg-on-primary/10 rounded-full blur-2xl pointer-events-none" />

          <div className="max-w-xl">
            <span className="px-3 py-1 rounded-full bg-on-primary/15 text-primary-fixed text-label-sm font-label-sm uppercase tracking-wider font-semibold">
              Đồng hành sự nghiệp
            </span>
            <h3 className="font-display-lg text-display-lg text-on-primary mt-space-xs font-bold leading-tight">
              Bạn cần một công cụ chuyên biệt khác?
            </h3>
            <p className="font-body-md text-body-md text-on-primary/90 mt-2 leading-relaxed">
              Gửi yêu cầu tính năng cho đội ngũ JobCentral hoặc nhận thông báo ngay khi có biểu thuế & chính sách lao động mới nhất gửi vào hòm thư.
            </p>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-space-sm shrink-0">
            <div className="relative w-full sm:w-80">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Nhập email của bạn..."
                className="w-full bg-surface-container-lowest text-on-surface placeholder:text-outline rounded-full px-space-md py-3 font-body-md text-body-md focus:outline-none shadow-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-space-lg py-3 bg-secondary-container hover:bg-secondary-fixed text-on-primary font-label-lg text-label-lg rounded-full transition-all shadow-sm font-bold flex items-center justify-center gap-space-xs whitespace-nowrap cursor-pointer"
            >
              <span>{isSubscribed ? 'Đã gửi' : 'Đăng ký nhận tin'}</span>
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </form>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 8. MODAL: XEM BẢNG CHI TIẾT THUẾ TNCN & CHI PHÍ DOANH NGHIỆP          */}
      {/* ===================================================================== */}
      {activeModal === 'breakdown' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-surface-container-lowest rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-surface-container-high">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[28px]">receipt_long</span>
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                    Bảng phân tích chi tiết Thuế & Bảo hiểm
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Lương Gross: <strong>{formatVND(widgetResult.gross)}</strong> | Lương Net: <strong>{formatVND(widgetResult.net)}</strong>
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-surface-container-low hover:bg-surface-container flex items-center justify-center text-on-surface-variant cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Chi tiết 7 bậc thuế */}
            <div className="mt-5">
              <h4 className="font-label-lg text-label-lg text-on-surface font-bold mb-3 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                Biểu thuế lũy tiến từng phần (7 bậc)
              </h4>
              <div className="bg-surface-container-low rounded-xl overflow-hidden text-xs">
                <div className="grid grid-cols-12 bg-surface-container-high/70 p-2.5 font-bold text-on-surface">
                  <div className="col-span-2">Bậc</div>
                  <div className="col-span-5">Thu nhập tính thuế/tháng</div>
                  <div className="col-span-2 text-center">Thuế suất</div>
                  <div className="col-span-3 text-right">Tiền thuế</div>
                </div>
                {widgetResult.bracketDetails.map((b) => (
                  <div
                    key={b.level}
                    className={`grid grid-cols-12 p-2.5 border-t border-surface-container-high/40 items-center ${
                      b.taxAmount > 0 ? 'bg-primary-fixed/20 font-semibold' : 'text-on-surface-variant'
                    }`}
                  >
                    <div className="col-span-2">Bậc {b.level}</div>
                    <div className="col-span-5">{b.label}</div>
                    <div className="col-span-2 text-center">{b.rate * 100}%</div>
                    <div className="col-span-3 text-right font-bold text-primary">
                      {formatVND(b.taxAmount)}
                    </div>
                  </div>
                ))}
                <div className="grid grid-cols-12 p-3 bg-surface-container-high/50 font-bold text-on-surface border-t border-surface-container-high">
                  <div className="col-span-9">Tổng tiền thuế TNCN phải nộp:</div>
                  <div className="col-span-3 text-right text-rose-600 font-extrabold text-sm">
                    {formatVND(widgetResult.tax)}
                  </div>
                </div>
              </div>
            </div>

            {/* Chi phí phía Doanh nghiệp */}
            <div className="mt-6">
              <h4 className="font-label-lg text-label-lg text-on-surface font-bold mb-3 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary-container" />
                Khoản bảo hiểm do Người sử dụng lao động chi trả
              </h4>
              <div className="bg-surface-container-low rounded-xl p-4 text-xs space-y-2">
                <div className="flex justify-between">
                  <span>• BHXH Doanh nghiệp đóng (17.5%):</span>
                  <span className="font-semibold">{formatVND(widgetResult.employerBhxh)}</span>
                </div>
                <div className="flex justify-between">
                  <span>• BHYT Doanh nghiệp đóng (3%):</span>
                  <span className="font-semibold">{formatVND(widgetResult.employerBhyt)}</span>
                </div>
                <div className="flex justify-between">
                  <span>• BHTN Doanh nghiệp đóng (1%):</span>
                  <span className="font-semibold">{formatVND(widgetResult.employerBhtn)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-surface-container-high font-bold text-sm text-on-surface">
                  <span>Tổng chi phí doanh nghiệp chi trả cho bạn:</span>
                  <span className="text-primary font-black">{formatVND(widgetResult.totalEmployerCost)}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-5 py-2.5 bg-primary-container text-on-primary font-label-md text-label-md rounded-full shadow-sm hover:bg-primary transition-colors cursor-pointer"
              >
                Đã hiểu & Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 9. MODAL: AI CV SCANNER                                               */}
      {/* ===================================================================== */}
      {/* ===================================================================== */}
      {/* 9. MODAL: AI CV SCANNER                                               */}
      {/* ===================================================================== */}
      {activeModal === 'cv-scanner' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-surface-container-lowest rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative text-center">
            {/* Hidden real file input */}
            <input
              ref={cvFileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => handleCvFileSelect(e.target.files?.[0])}
              className="hidden"
            />

            <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
              <div className="flex items-center gap-2 text-left">
                <div className="w-10 h-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[24px]">document_scanner</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                    AI CV Scanner & Chấm điểm ATS
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Đối chiếu từ khóa và cấu trúc theo chuẩn ATS 500+ doanh nghiệp
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  handleResetCvScanner();
                  setActiveModal(null);
                }}
                className="w-8 h-8 rounded-full bg-surface-container-low hover:bg-surface-container flex items-center justify-center text-on-surface-variant cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {!isScanningCv && !scanResult && (
              <div className="mt-5">
                <div
                  onClick={() => cvFileInputRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDraggingCv(true);
                  }}
                  onDragLeave={() => setIsDraggingCv(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDraggingCv(false);
                    const file = e.dataTransfer.files?.[0];
                    if (file) handleCvFileSelect(file);
                  }}
                  className={`border-2 border-dashed rounded-2xl p-8 transition-all cursor-pointer flex flex-col items-center justify-center ${
                    isDraggingCv
                      ? 'border-primary bg-primary-fixed/20 scale-[1.01]'
                      : 'border-primary/40 bg-surface-container-low hover:bg-surface-container hover:border-primary'
                  }`}
                >
                  <div className="w-16 h-16 rounded-2xl bg-primary-fixed text-primary flex items-center justify-center mb-3">
                    <span className="material-symbols-outlined text-[36px]">cloud_upload</span>
                  </div>
                  <p className="font-label-lg text-label-lg text-on-surface font-bold">
                    Kéo thả hoặc nhấn để chọn tệp CV từ thiết bị
                  </p>
                  <p className="text-[12px] text-on-surface-variant mt-1">
                    Định dạng hỗ trợ: <strong>.PDF, .DOC, .DOCX</strong> (Tối đa 10MB)
                  </p>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      cvFileInputRef.current?.click();
                    }}
                    className="mt-4 px-5 py-2 bg-primary-container text-on-primary font-label-md text-label-md rounded-full shadow-sm hover:bg-primary transition-colors cursor-pointer"
                  >
                    Duyệt tệp từ máy tính
                  </button>
                </div>

                {cvError && (
                  <div className="mt-3 p-3 bg-error-container text-on-error-container text-xs rounded-xl flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">error</span>
                    <span>{cvError}</span>
                  </div>
                )}

                {/* Quick Sample CV Test */}
                <div className="mt-4 pt-4 border-t border-surface-container-high/60 flex items-center justify-between text-xs text-on-surface-variant">
                  <span>Chưa có tệp sẵn trên máy?</span>
                  <button
                    type="button"
                    onClick={handleLoadSampleCv}
                    className="font-bold text-primary hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">play_circle</span>
                    <span>Thử nhanh với CV mẫu IT / Designer</span>
                  </button>
                </div>
              </div>
            )}

            {isScanningCv && (
              <div className="mt-8 py-8 px-4 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin mb-4" />
                <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Đang phân tích cấu trúc CV bằng AI...
                </h4>
                <p className="text-xs text-on-surface-variant mt-1 max-w-sm">
                  Đang quét tệp "{cvFileName}" ({cvFileSize}) đối chiếu thuật toán ATS của các doanh nghiệp lớn.
                </p>

                {/* Progress bar */}
                <div className="w-full max-w-xs bg-surface-container-high rounded-full h-2.5 mt-5 overflow-hidden">
                  <div
                    className="bg-primary-container h-full rounded-full transition-all duration-200"
                    style={{ width: `${scanProgress}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-primary mt-2">{scanProgress}%</span>
              </div>
            )}

            {!isScanningCv && scanResult && (
              <div className="mt-4 text-left space-y-4">
                {/* Result Top Card */}
                <div className="bg-surface-container-low rounded-2xl p-4 flex items-center justify-between border border-primary/20">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-emerald-500/15 text-emerald-700 flex flex-col items-center justify-center font-bold">
                      <span className="text-lg leading-none">{scanResult.overallScore}</span>
                      <span className="text-[10px]">/ 100</span>
                    </div>
                    <div>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold flex items-center gap-1.5">
                        <span>Đạt chuẩn ATS xuất sắc</span>
                        <span className="material-symbols-outlined text-emerald-600 text-[18px]">verified</span>
                      </h4>
                      <p className="text-xs text-on-surface-variant">
                        Tệp: <strong>{cvFileName || 'CV_UngVien.pdf'}</strong> ({cvFileSize || '1.4 MB'})
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleResetCvScanner}
                    className="text-xs text-primary font-bold hover:underline cursor-pointer"
                  >
                    Quét tệp khác
                  </button>
                </div>

                {/* Sub-scores */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 bg-surface-container-low rounded-xl border border-surface-container-high">
                    <span className="text-on-surface-variant block text-[11px]">Bố cục ATS</span>
                    <span className="font-bold text-emerald-600 text-sm">{scanResult.formatScore}%</span>
                  </div>
                  <div className="p-2.5 bg-surface-container-low rounded-xl border border-surface-container-high">
                    <span className="text-on-surface-variant block text-[11px]">Từ khóa ngành</span>
                    <span className="font-bold text-primary text-sm">{scanResult.keywordScore}%</span>
                  </div>
                  <div className="p-2.5 bg-surface-container-low rounded-xl border border-surface-container-high">
                    <span className="text-on-surface-variant block text-[11px]">Kinh nghiệm</span>
                    <span className="font-bold text-amber-600 text-sm">{scanResult.experienceScore}%</span>
                  </div>
                </div>

                {/* Matched Keywords */}
                <div>
                  <span className="font-label-sm text-label-sm font-bold text-on-surface block mb-1.5">
                    Từ khóa tương thích phát hiện ({scanResult.matchedKeywords.length}):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {scanResult.matchedKeywords.map((kw, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-medium flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[13px]">check</span>
                        <span>{kw}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Missing Keywords */}
                <div>
                  <span className="font-label-sm text-label-sm font-bold text-on-surface block mb-1.5">
                    Từ khóa nên bổ sung để đạt 95+ điểm:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {scanResult.missingKeywords.map((kw, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-medium flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[13px]">add</span>
                        <span>{kw}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* AI Recommendations */}
                <div className="p-3 bg-primary-fixed/20 rounded-xl space-y-1.5 text-xs text-on-surface">
                  <span className="font-bold text-primary block">Khuyến nghị từ chuyên gia AI:</span>
                  {scanResult.recommendations.map((rec, i) => (
                    <p key={i} className="leading-relaxed flex items-start gap-1.5">
                      <span className="material-symbols-outlined text-[14px] text-primary shrink-0 mt-0.5">tips_and_updates</span>
                      <span>{rec}</span>
                    </p>
                  ))}
                </div>

                {/* Bottom Actions */}
                <div className="pt-2 flex items-center justify-end gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      handleResetCvScanner();
                      setActiveModal(null);
                    }}
                    className="px-4 py-2 bg-surface-container-high text-on-surface font-label-md text-label-md rounded-full hover:bg-surface-container transition-colors cursor-pointer"
                  >
                    Đóng
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveModal(null);
                      if (onTabChange) onTabChange('cv-builder');
                    }}
                    className="px-5 py-2 bg-primary-container text-on-primary font-label-md text-label-md rounded-full shadow-sm hover:bg-primary transition-colors cursor-pointer flex items-center gap-1 font-bold"
                  >
                    <span>Mở CV Builder để sửa</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 10. MODAL: DỰ TÍNH BHTN & THỜI HẠN NỘP HỒ SƠ                           */}
      {/* ===================================================================== */}
      {activeModal === 'bhtn' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-surface-container-high">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[28px]">health_and_safety</span>
                <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                  Bảo hiểm thất nghiệp (BHTN)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-surface-container-low hover:bg-surface-container flex items-center justify-center text-on-surface-variant cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="mt-4 space-y-3 text-body-md text-on-surface-variant leading-relaxed">
              <div className="p-3 bg-primary-fixed/20 rounded-xl text-primary font-semibold text-xs flex items-start gap-2">
                <span className="material-symbols-outlined text-[18px] shrink-0">info</span>
                <span>
                  Mức hưởng trợ cấp thất nghiệp hàng tháng = <strong>60%</strong> mức bình quân tiền lương tháng đóng BHTN của 06 tháng liền kề trước khi nghỉ việc.
                </span>
              </div>

              <div className="bg-surface-container-low rounded-xl p-4 text-xs space-y-2">
                <p>• <strong>Thời gian hưởng:</strong> Đóng đủ từ 12 - 36 tháng thì được hưởng 03 tháng trợ cấp; sau đó cứ đóng đủ thêm 12 tháng thì được hưởng thêm 01 tháng (tối đa không quá 12 tháng).</p>
                <p>• <strong>Thời hạn nộp hồ sơ:</strong> Trong vòng <strong>03 tháng (90 ngày)</strong> kể từ ngày chấm dứt hợp đồng lao động tại Trung tâm Dịch vụ Việc làm.</p>
                <p>• <strong>Mức trần chi trả:</strong> Không quá 05 lần mức lương tối thiểu vùng tại thời điểm chấm dứt hợp đồng ({formatVND(4960000 * 5)}/tháng ở Vùng I).</p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-5 py-2.5 bg-primary-container text-on-primary font-label-md text-label-md rounded-full shadow-sm hover:bg-primary transition-colors cursor-pointer"
              >
                Đã hiểu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 11. MODAL: TRẮC NGHIỆM TÍNH CÁCH MBTI                                  */}
      {/* ===================================================================== */}
      {activeModal === 'mbti' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-6 shadow-2xl relative text-center">
            <div className="w-16 h-16 rounded-2xl bg-secondary-fixed text-secondary flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-[36px]">psychology</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
              Trắc nghiệm MBTI & Holland Code
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
              Bộ câu hỏi 60 tình huống thực tế giúp bạn xác định chuẩn xác nhóm tính cách nghề nghiệp (INTJ, ENFP, ISTJ...) và môi trường văn hóa công ty tương thích.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-2 text-left">
              {['INTJ - Nhà kiến tạo', 'ENFP - Người truyền cảm hứng', 'ISTJ - Người trách nhiệm', 'ENTP - Người phát minh'].map((type, i) => (
                <div key={i} className="p-3 bg-surface-container-low rounded-xl text-xs font-semibold text-on-surface">
                  {type}
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-5 py-2.5 bg-surface-container-high text-on-surface font-label-md text-label-md rounded-full hover:bg-surface-container transition-colors cursor-pointer"
              >
                Đóng
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveModal(null);
                  if (onShowToast) onShowToast('Đang khởi tạo bài kiểm tra MBTI 60 câu hỏi...', 'success');
                }}
                className="px-5 py-2.5 bg-primary-container text-on-primary font-label-md text-label-md rounded-full shadow-sm hover:bg-primary transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>Bắt đầu làm bài (15 phút)</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 12. MODAL: SALARY BENCHMARK                                           */}
      {activeModal === 'benchmark' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-surface-container-high">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[28px]">query_stats</span>
                <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                  Báo cáo Lương Thị Trường 2025
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-surface-container-low hover:bg-surface-container flex items-center justify-center text-on-surface-variant cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Mức lương trung vị được khảo sát từ hơn 250.000 tin tuyển dụng thực tế tại TP.HCM & Hà Nội:
              </p>

              <div className="space-y-2">
                {[
                  { title: 'Frontend Developer (2-4 năm)', salary: '22 - 38 triệu' },
                  { title: 'Backend / DevOps (3-5 năm)', salary: '28 - 48 triệu' },
                  { title: 'Product Manager / PO', salary: '30 - 55 triệu' },
                  { title: 'Digital Marketing Lead', salary: '20 - 35 triệu' },
                  { title: 'HR Generalist / Recruiter', salary: '14 - 24 triệu' },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 bg-surface-container-low rounded-xl text-xs">
                    <span className="font-semibold text-on-surface">{item.title}</span>
                    <span className="font-bold text-primary">{item.salary}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-5 py-2.5 bg-primary-container text-on-primary font-label-md text-label-md rounded-full shadow-sm hover:bg-primary transition-colors cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 13. MODAL: PHỎNG VẤN THỬ NGHIỆM AI                                    */}
      {activeModal === 'interview' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-6 shadow-2xl relative text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary-fixed text-primary flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-[36px]">record_voice_over</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
              Phỏng Vấn Giả Lập AI (Mock Interview)
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
              Luyện trả lời câu hỏi phỏng vấn theo mô hình STAR (Situation, Task, Action, Result) với người phỏng vấn ảo AI.
            </p>

            <div className="mt-4 p-4 bg-surface-container-low rounded-xl text-xs text-left space-y-2 text-on-surface-variant">
              <p>✔ Tự động chấm điểm độ tự tin và cấu trúc câu trả lời</p>
              <p>✔ Gợi ý từ khóa đắt giá cho ngành IT, Marketing, Tài chính</p>
              <p>✔ Hỗ trợ luyện cả tiếng Việt và tiếng Anh chuẩn quốc tế</p>
            </div>

            <div className="mt-6 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-5 py-2.5 bg-surface-container-high text-on-surface font-label-md text-label-md rounded-full hover:bg-surface-container transition-colors cursor-pointer"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveModal(null);
                  if (onShowToast) onShowToast('Đang kết nối phòng phỏng vấn thử nghiệm...', 'success');
                }}
                className="px-5 py-2.5 bg-primary-container text-on-primary font-label-md text-label-md rounded-full shadow-sm hover:bg-primary transition-colors cursor-pointer"
              >
                Bắt đầu phỏng vấn
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 14. MODAL: QUYẾT TOÁN THUẾ TNCN CUỐI NĂM (tax-final)                  */}
      {/* ===================================================================== */}
      {activeModal === 'tax-final' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-surface-container-lowest rounded-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-6 shadow-2xl relative text-left">
            <div className="flex items-center justify-between pb-4 border-b border-surface-container-high">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[24px]">receipt_long</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                    Quyết toán Thuế TNCN & Tính Thuế Lũy Tiến
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Tính toán số tiền thuế thừa được hoàn hoặc số tiền cần nộp thêm cuối năm
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-surface-container-low hover:bg-surface-container flex items-center justify-center text-on-surface-variant cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Inputs Grid */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              <div>
                <label className="font-bold text-on-surface block mb-1">
                  Tổng thu nhập chịu thuế cả năm (Gross năm):
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="5000000"
                    value={taxFinalAnnualGross}
                    onChange={(e) => setTaxFinalAnnualGross(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full bg-surface-container-low rounded-xl px-3 py-2 text-sm font-bold text-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-outline text-[11px]">VND</span>
                </div>
                <span className="text-[10px] text-on-surface-variant">Bình quân: {formatVND(taxFinalAnnualGross / taxFinalMonths)}/tháng</span>
              </div>

              <div>
                <label className="font-bold text-on-surface block mb-1">
                  Thuế TNCN đã tạm khấu trừ trong năm:
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="1000000"
                    value={taxFinalPrepaidTax}
                    onChange={(e) => setTaxFinalPrepaidTax(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full bg-surface-container-low rounded-xl px-3 py-2 text-sm font-bold text-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-outline text-[11px]">VND</span>
                </div>
                <span className="text-[10px] text-on-surface-variant">Xem trên chứng từ khấu trừ thuế của công ty</span>
              </div>

              <div>
                <label className="font-bold text-on-surface block mb-1">
                  Số tháng làm việc tính giảm trừ (1-12 tháng):
                </label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={taxFinalMonths}
                  onChange={(e) => setTaxFinalMonths(Math.max(1, Math.min(12, Number(e.target.value) || 1)))}
                  className="w-full bg-surface-container-low rounded-xl px-3 py-2 text-sm font-bold text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <span className="text-[10px] text-on-surface-variant">Giảm trừ bản thân: {formatVND(11000000 * taxFinalMonths)}</span>
              </div>

              <div>
                <label className="font-bold text-on-surface block mb-1">
                  Số người phụ thuộc đăng ký:
                </label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={taxFinalDependents}
                  onChange={(e) => setTaxFinalDependents(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full bg-surface-container-low rounded-xl px-3 py-2 text-sm font-bold text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <span className="text-[10px] text-on-surface-variant">Giảm trừ: {formatVND(4400000 * taxFinalMonths * taxFinalDependents)}</span>
              </div>
            </div>

            {/* Final Balance Notification Box */}
            <div className="mt-4">
              {taxFinalResult.difference > 0 ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[24px]">savings</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                      Kết quả quyết toán: BẠN ĐƯỢC HOÀN THUẾ THỪA
                    </span>
                    <h4 className="text-xl font-black text-emerald-700 mt-0.5">
                      +{formatVND(taxFinalResult.difference)}
                    </h4>
                    <p className="text-xs text-emerald-800/90 mt-1 leading-relaxed">
                      Bạn đã nộp thừa tiền thuế trong năm. Bạn có quyền nộp tờ khai <strong>02/QTT-TNCN</strong> trực tuyến trên ứng dụng <strong>eTax Mobile</strong> để nhận tiền hoàn trả về tài khoản ngân hàng.
                    </p>
                  </div>
                </div>
              ) : taxFinalResult.difference < 0 ? (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[24px]">priority_high</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                      Kết quả quyết toán: BẠN CẦN NỘP BỔ SUNG
                    </span>
                    <h4 className="text-xl font-black text-amber-700 mt-0.5">
                      -{formatVND(Math.abs(taxFinalResult.difference))}
                    </h4>
                    <p className="text-xs text-amber-800/90 mt-1 leading-relaxed">
                      Số tiền thuế tạm nộp trong năm chưa đủ so với tổng thu nhập thực tế. Bạn cần nộp bổ sung trước hạn quyết toán để tránh bị tính tiền chậm nộp 0.03%/ngày.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[28px]">check_circle</span>
                  <div>
                    <h4 className="font-bold text-primary text-sm">Thuế TNCN đã quyết toán cân bằng!</h4>
                    <p className="text-xs text-slate-600">Số thuế đã tạm nộp trùng khớp hoàn toàn với số thuế phát sinh cả năm.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="mt-4 bg-surface-container-low rounded-xl p-3.5 text-xs space-y-1.5 text-on-surface-variant">
              <div className="flex justify-between">
                <span>Tổng thu nhập chịu thuế cả năm:</span>
                <span className="font-bold text-on-surface">{formatVND(taxFinalResult.gross)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tổng các khoản giảm trừ gia cảnh & BH:</span>
                <span className="font-semibold text-emerald-700">-{formatVND(taxFinalResult.totalDeduction)}</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-surface-container-high">
                <span className="font-bold text-on-surface">Thu nhập tính thuế cả năm:</span>
                <span className="font-bold text-primary">{formatVND(taxFinalResult.taxableIncome)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-on-surface">Thuế TNCN cả năm phải nộp:</span>
                <span className="font-bold text-rose-600">{formatVND(taxFinalResult.totalTax)}</span>
              </div>
              <div className="flex justify-between">
                <span>Thuế TNCN đã tạm khấu trừ tại nguồn:</span>
                <span className="font-semibold text-on-surface">{formatVND(taxFinalResult.prepaid)}</span>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <span className="text-[11px] text-outline">Quy định theo Luật Thuế Thu Nhập Cá Nhân & eTax Mobile</span>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 bg-primary-container text-on-primary font-label-md text-label-md rounded-full shadow-sm hover:bg-primary transition-colors cursor-pointer"
              >
                Đã hiểu & Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 15. MODAL: TÍNH BHXH 1 LẦN (bhxh-one-time)                             */}
      {/* ===================================================================== */}
      {activeModal === 'bhxh-one-time' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative text-left">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[24px]">savings</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                    Dự Tính Tiền Rút BHXH 1 Lần
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Tính theo quy định Luật Bảo hiểm Xã hội hiện hành
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-surface-container-low hover:bg-surface-container flex items-center justify-center text-on-surface-variant cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-on-surface block mb-1">
                  Mức bình quân tiền lương tháng đóng BHXH (VND):
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="1000000"
                    value={bhxhAvgSalary}
                    onChange={(e) => setBhxhAvgSalary(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full bg-surface-container-low rounded-xl px-3 py-2 text-sm font-bold text-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-outline text-[11px]">VND</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-on-surface block mb-1">
                    Số năm đóng trước 2014:
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="40"
                    value={bhxhYearsBefore2014}
                    onChange={(e) => setBhxhYearsBefore2014(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full bg-surface-container-low rounded-xl px-3 py-2 text-sm font-bold text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <span className="text-[10px] text-on-surface-variant">Mỗi năm = 1.5 tháng lương</span>
                </div>

                <div>
                  <label className="font-bold text-on-surface block mb-1">
                    Số năm đóng từ 2014 trở đi:
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="40"
                    value={bhxhYearsAfter2014}
                    onChange={(e) => setBhxhYearsAfter2014(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full bg-surface-container-low rounded-xl px-3 py-2 text-sm font-bold text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <span className="text-[10px] text-on-surface-variant">Mỗi năm = 2.0 tháng lương</span>
                </div>
              </div>

              {/* Total Card */}
              <div className="p-4 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-2xl shadow-sm">
                <span className="text-xs uppercase tracking-wider text-primary-fixed block font-bold">
                  SỐ TIỀN BHXH 1 LẦN DỰ TÍNH NHẬN ĐƯỢC:
                </span>
                <div className="text-2xl font-black mt-1">
                  {formatVND(bhxhOneTimeResult.totalAmount)}
                </div>
                <div className="mt-2 pt-2 border-t border-on-primary/15 text-[11px] text-on-primary/80 flex justify-between">
                  <span>Trước 2014 ({bhxhOneTimeResult.yearsBefore2014} năm): {formatVND(bhxhOneTimeResult.amountBefore)}</span>
                  <span>Từ 2014 ({bhxhOneTimeResult.yearsAfter2014} năm): {formatVND(bhxhOneTimeResult.amountAfter)}</span>
                </div>
              </div>

              <div className="bg-surface-container-low rounded-xl p-3 text-[11px] text-on-surface-variant space-y-1">
                <p>• <strong>Điều kiện rút:</strong> Sau 12 tháng nghỉ việc không tiếp tục tham gia BHXH hoặc ra nước ngoài định cư, mắc bệnh hiểm nghèo.</p>
                <p>• <strong>Lưu ý:</strong> Rút BHXH 1 lần sẽ làm mất thời gian tích lũy để hưởng chế độ hưu trí và thẻ BHYT miễn phí khi về già.</p>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 bg-primary-container text-on-primary font-label-md text-label-md rounded-full shadow-sm hover:bg-primary transition-colors cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 16. MODAL: TRA CỨU LUẬT THỬ VIỆC (probation-eval)                     */}
      {/* ===================================================================== */}
      {activeModal === 'probation-eval' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative text-left">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[24px]">gavel</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                    Tra Cứu Luật Thử Việc & Quyền Lợi
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Căn cứ theo Điều 25 & 26 Bộ Luật Lao Động 2019
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-surface-container-low hover:bg-surface-container flex items-center justify-center text-on-surface-variant cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-on-surface block mb-1">
                  Trình độ / Vị trí công việc:
                </label>
                <select
                  value={probationJobType}
                  onChange={(e) => setProbationJobType(e.target.value)}
                  className="w-full bg-surface-container-low rounded-xl px-3 py-2 text-xs font-bold text-on-surface focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                >
                  <option value="university">Cao đẳng / Đại học trở lên (Tối đa 60 ngày)</option>
                  <option value="intermediate">Trung cấp / Kỹ thuật viên / Nghiệp vụ (Tối đa 30 ngày)</option>
                  <option value="simple">Lao động đơn giản / Phổ thông (Tối đa 6 ngày)</option>
                  <option value="manager">Người quản lý doanh nghiệp (Tối đa 180 ngày)</option>
                </select>
                <p className="text-[11px] text-on-surface-variant mt-1 leading-relaxed">
                  {probationResult.description}
                </p>
              </div>

              <div>
                <label className="font-bold text-on-surface block mb-1">
                  Mức lương chính thức thỏa thuận (VND):
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="1000000"
                    value={probationOfficialSalary}
                    onChange={(e) => setProbationOfficialSalary(Math.max(0, Number(e.target.value) || 0))}
                    className="w-full bg-surface-container-low rounded-xl px-3 py-2 text-sm font-bold text-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-outline text-[11px]">VND</span>
                </div>
              </div>

              {/* Legal Summary Box */}
              <div className="p-4 bg-surface-container-low rounded-2xl border border-primary/20 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant">Thời gian thử việc tối đa:</span>
                  <span className="font-bold text-primary text-sm">{probationResult.maxDays} ngày</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-on-surface-variant">Lương thử việc tối thiểu (85%):</span>
                  <span className="font-black text-emerald-700 text-sm">{formatVND(probationResult.probationSalaryMin)}</span>
                </div>
                <div className="flex justify-between items-center text-[11px] text-outline">
                  <span>Không được áp dụng thử việc đối với:</span>
                  <span className="font-semibold text-on-surface">HĐLĐ dưới 1 tháng</span>
                </div>
              </div>

              <div className="bg-primary-fixed/20 rounded-xl p-3 text-[11px] text-on-surface space-y-1">
                <p className="font-bold text-primary">Quyền chấm dứt trong thời gian thử việc:</p>
                <p>• Trong thời gian thử việc, mỗi bên có quyền hủy bỏ hợp đồng thử việc mà <strong>không cần báo trước</strong> và <strong>không phải bồi thường</strong>.</p>
                <p>• Người sử dụng lao động <strong>chỉ được thử việc 01 lần</strong> cho một công việc.</p>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 bg-primary-container text-on-primary font-label-md text-label-md rounded-full shadow-sm hover:bg-primary transition-colors cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
