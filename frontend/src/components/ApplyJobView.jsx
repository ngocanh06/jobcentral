import React, { useState, useRef } from 'react';
import {
  ArrowLeft,
  Building2,
  MapPin,
  Clock,
  Calendar,
  ExternalLink,
  Upload,
  FileText,
  Lock,
  Globe,
  Zap,
  CheckCircle2,
  Sparkles,
  AlertCircle,
  FileCheck,
  User,
  Mail,
  Phone,
  Trash2,
} from 'lucide-react';

export const ApplyJobView = ({
  job,
  currentUser = null,
  onBack,
  onNavigateJobs,
  onNavigateHome,
  onViewJobDetail,
  onSubmitSuccess,
}) => {
  const [profileMode, setProfileMode] = useState('upload'); // 'select' | 'upload'
  const [fullName, setFullName] = useState(currentUser?.name || 'Nhiên Nguyễn Viết');
  const [email, setEmail] = useState(currentUser?.email || 'vietnhiennguyen91@gmail.com');
  const [phone, setPhone] = useState('0905 123 456');
  const [searchVisibility, setSearchVisibility] = useState('lock'); // 'lock' | 'public' | 'urgent'
  const [uploadedFile, setUploadedFile] = useState({
    name: 'CV_NguyenVietNhien_2024.pdf',
    size: '1.4 MB',
    date: '08/10/2026',
  });
  const [selectedProfileCv, setSelectedProfileCv] = useState('Hồ sơ trực tuyến JobCentral (Mặc định)');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  if (!job) return null;

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      setUploadedFile({
        name: file.name,
        size: `${sizeMB} MB`,
        date: new Date().toLocaleDateString('vi-VN'),
      });
      setProfileMode('upload');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      if (onSubmitSuccess) {
        onSubmitSuccess({
          jobId: job.id,
          jobTitle: job.title,
          company: job.company,
          fullName,
          email,
          phone,
          resume: profileMode === 'upload' ? uploadedFile?.name : selectedProfileCv,
          searchVisibility,
        });
      }
    }, 700);
  };

  const getVisibilityExplanation = () => {
    switch (searchVisibility) {
      case 'lock':
        return 'Bạn đang vô hiệu hóa hồ sơ này. Nhà tuyển dụng sẽ không tìm thấy được hồ sơ này của bạn ngoài vị trí ứng tuyển hiện tại.';
      case 'public':
        return 'Hồ sơ ở chế độ công khai. Tất cả các nhà tuyển dụng uy tín trên hệ thống có thể tìm kiếm và xem hồ sơ của bạn.';
      case 'urgent':
        return 'Hồ sơ được gắn nhãn tìm việc khẩn cấp. Nhà tuyển dụng sẽ ưu tiên liên hệ phỏng vấn trong vòng 24 - 48 giờ.';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9FF] pb-24 text-slate-800 font-sans">
      {/* 1. Breadcrumb & Back Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs sm:text-sm text-slate-500 font-medium">
            <button
              type="button"
              onClick={onNavigateHome}
              className="hover:text-[#0A58CA] transition-colors cursor-pointer"
            >
              Trang chủ
            </button>
            <span>&gt;</span>
            <button
              type="button"
              onClick={onNavigateJobs}
              className="hover:text-[#0A58CA] transition-colors cursor-pointer"
            >
              Việc làm
            </button>
            <span>&gt;</span>
            <button
              type="button"
              onClick={() => onViewJobDetail && onViewJobDetail(job)}
              className="hover:text-[#0A58CA] transition-colors cursor-pointer truncate max-w-[160px] sm:max-w-xs"
            >
              {job.title}
            </button>
            <span>&gt;</span>
            <span className="text-slate-900 font-semibold">
              Nộp hồ sơ ứng tuyển
            </span>
          </nav>

          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-[#0A58CA] transition-colors cursor-pointer py-1 px-2.5 rounded-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại chi tiết công việc</span>
          </button>
        </div>
      </div>

      {/* 2. Main 2-Column Application Layout (Khớp cấu trúc ảnh mẫu) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ========================================================================= */}
          {/* CỘT TRÁI (8 CỘT): NỘP HỒ SƠ ỨNG TUYỂN                                      */}
          {/* ========================================================================= */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 sm:p-8 space-y-7">
            
            {/* Header: NỘP HỒ SƠ ỨNG TUYỂN */}
            <div className="border-b-2 border-[#0A58CA] pb-3">
              <h1 className="text-base sm:text-lg font-extrabold text-slate-900 uppercase tracking-wide">
                Nộp hồ sơ ứng tuyển
              </h1>
            </div>

            {/* Block 1: 2 Box Chọn hồ sơ vs Tải lên hồ sơ (Khớp thiết kế ảnh) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Box 1A: Chọn hồ sơ của bạn */}
              <div
                onClick={() => setProfileMode('select')}
                className={`rounded-2xl p-5 border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  profileMode === 'select'
                    ? 'border-[#0A58CA] bg-blue-50/40 shadow-xs ring-2 ring-[#0A58CA]/15'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div>
                  <div className="flex items-center space-x-2.5 mb-2">
                    <div className="w-7 h-7 rounded-full bg-blue-100 text-[#0A58CA] flex items-center justify-center font-bold text-xs shrink-0">
                      C
                    </div>
                    <h2 className="text-sm font-bold text-slate-900">
                      Chọn hồ sơ của bạn
                    </h2>
                  </div>

                  <div className="mt-3 text-xs text-slate-600 space-y-1.5">
                    <p className="font-medium text-slate-800">
                      {selectedProfileCv}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Hồ sơ đã tạo trên JobCentral và sẵn sàng gửi.
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Bạn chưa có hồ sơ ?</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open('/cv-builder', '_blank');
                    }}
                    className="font-bold text-[#0A58CA] hover:underline cursor-pointer"
                  >
                    Tạo hồ sơ mới!
                  </button>
                </div>
              </div>

              {/* Box 1B: Tải lên hồ sơ của bạn (Màu nền xanh đậm Navy sang trọng) */}
              <div
                onClick={() => {
                  setProfileMode('upload');
                  fileInputRef.current?.click();
                }}
                className={`rounded-2xl p-5 transition-all cursor-pointer flex flex-col items-center justify-center text-center relative overflow-hidden group ${
                  profileMode === 'upload'
                    ? 'bg-[#0B1A30] text-white shadow-md ring-2 ring-amber-400'
                    : 'bg-[#0F223D] hover:bg-[#0B1A30] text-white shadow-xs'
                }`}
              >
                {/* Hidden File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".doc,.docx,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <Upload className="w-6 h-6 text-white" />
                </div>

                <h2 className="text-sm sm:text-base font-bold text-white mb-1.5">
                  Tải lên hồ sơ của bạn
                </h2>

                <p className="text-[11px] sm:text-xs text-slate-300 leading-relaxed max-w-[240px]">
                  Hỗ trợ định dạng *.doc, *.docx, *.pdf và không quá 5MB
                </p>

                {uploadedFile && (
                  <div className="mt-3 inline-flex items-center space-x-1.5 bg-white/15 px-3 py-1 rounded-full text-[11px] text-amber-300 font-semibold border border-amber-300/30">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span className="truncate max-w-[150px]">{uploadedFile.name}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Block 2: Thông tin liên hệ của bạn (Khớp khung bo ảnh mẫu) */}
            <div className="rounded-2xl border-2 border-slate-200/90 p-5 sm:p-6 bg-white space-y-5">
              <div className="flex items-center space-x-2.5 pb-2 border-b border-slate-100">
                <div className="w-7 h-7 rounded-full bg-blue-100 text-[#0A58CA] flex items-center justify-center font-bold text-xs shrink-0">
                  C
                </div>
                <h2 className="text-sm font-bold text-slate-900">
                  Thông tin liên hệ của bạn
                </h2>
              </div>

              {/* Input: Họ tên */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">
                  Họ tên
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Nhập họ và tên..."
                    className="w-full pb-2 pt-1 border-b-2 border-slate-300 focus:border-[#0A58CA] text-sm sm:text-base font-bold text-slate-900 bg-transparent focus:outline-hidden transition-colors"
                  />
                </div>
              </div>

              {/* Input: Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full pb-2 pt-1 border-b-2 border-slate-300 focus:border-[#0A58CA] text-sm sm:text-base font-bold text-slate-900 bg-transparent focus:outline-hidden transition-colors"
                  />
                </div>
              </div>

              {/* Input: Số điện thoại */}
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">
                  Số điện thoại
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Nhập số điện thoại..."
                    className="w-full pb-2 pt-1 border-b-2 border-slate-300 focus:border-[#0A58CA] text-sm sm:text-base font-bold text-slate-900 bg-transparent focus:outline-hidden transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Block 3: Chế độ tìm việc của hồ sơ (3 Pills: Khóa, Công khai, Khẩn cấp) */}
            <div className="space-y-3">
              <label className="block text-xs sm:text-sm font-extrabold text-slate-900">
                Chế độ tìm việc của hồ sơ
              </label>

              <div className="grid grid-cols-3 gap-2 sm:gap-3 bg-slate-100 p-1.5 rounded-2xl">
                {/* Mode 1: Khóa */}
                <button
                  type="button"
                  onClick={() => setSearchVisibility('lock')}
                  className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
                    searchVisibility === 'lock'
                      ? 'bg-slate-700 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <Lock className="w-4 h-4" />
                  <span>Khóa</span>
                </button>

                {/* Mode 2: Công khai */}
                <button
                  type="button"
                  onClick={() => setSearchVisibility('public')}
                  className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
                    searchVisibility === 'public'
                      ? 'bg-[#0A58CA] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <Globe className="w-4 h-4" />
                  <span>Công khai</span>
                </button>

                {/* Mode 3: Khẩn cấp */}
                <button
                  type="button"
                  onClick={() => setSearchVisibility('urgent')}
                  className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
                    searchVisibility === 'urgent'
                      ? 'bg-yellow-400 hover:bg-yellow-500 text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Khẩn cấp</span>
                </button>
              </div>

              {/* Giải thích chế độ tìm việc */}
              <p className="text-xs text-slate-500 leading-relaxed pt-1">
                {getVisibilityExplanation()}
              </p>
            </div>

            {/* Block 4: NÚT GỬI ỨNG TUYỂN */}
            <div className="pt-2">
              <button
                type="submit"
                id="submit-standard-application-btn"
                disabled={isSubmitting}
                className="w-full py-4 px-8 rounded-2xl font-black text-sm sm:text-base uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-xs active:scale-98 disabled:opacity-75 flex items-center justify-center space-x-2 bg-yellow-400 hover:bg-yellow-500 text-slate-900"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                    <span>ĐANG GỬI HỒ SƠ ỨNG TUYỂN...</span>
                  </>
                ) : (
                  <span>ỨNG TUYỂN VỊ TRÍ NÀY</span>
                )}
              </button>
              <p className="text-[11px] text-center text-slate-400 mt-2.5">
                Bằng việc nhấn nộp đơn, bạn đồng ý với Điều khoản sử dụng và Chính sách bảo mật của JobCentral.
              </p>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* CỘT PHẢI (4 CỘT): THÔNG TIN VIỆC LÀM (Khớp cột phải trong ảnh mẫu)        */}
          {/* ========================================================================= */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 sm:p-7 space-y-6">
            
            {/* Header: THÔNG TIN VIỆC LÀM */}
            <div className="border-b-2 border-[#0A58CA] pb-3">
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 uppercase tracking-wide">
                Thông tin việc làm
              </h2>
            </div>

            {/* List of Key-Value Meta Rows */}
            <div className="space-y-4 text-xs sm:text-sm divide-y divide-slate-100">
              {/* Row 1: Vị trí / Chức danh */}
              <div className="pt-2 first:pt-0 flex items-start justify-between gap-3">
                <span className="font-semibold text-slate-600 shrink-0 w-36">
                  Vị trí / Chức danh:
                </span>
                <div className="flex items-center space-x-1.5 font-bold text-slate-900 text-right min-w-0">
                  <span className="truncate">{job.title || 'IT Engineer'}</span>
                  <button
                    type="button"
                    onClick={() => onViewJobDetail && onViewJobDetail(job)}
                    className="text-[#0A58CA] hover:text-[#084298] transition-colors p-0.5 shrink-0"
                    title="Xem chi tiết công việc"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Row 2: Công ty ứng tuyển */}
              <div className="pt-3 flex items-start justify-between gap-3">
                <span className="font-semibold text-slate-600 shrink-0 w-36">
                  Công ty ứng tuyển:
                </span>
                <span className="font-bold text-slate-900 text-right uppercase leading-snug">
                  {job.company || 'CÔNG TY TRÁCH NHIỆM HỮU HẠN FM SUPPLY CHAIN VIỆT NAM'}
                </span>
              </div>

              {/* Row 3: Nơi làm việc */}
              <div className="pt-3 flex items-start justify-between gap-3">
                <span className="font-semibold text-slate-600 shrink-0 w-36">
                  Nơi làm việc:
                </span>
                <span className="font-semibold text-slate-800 text-right">
                  {job.location || 'Bắc Ninh'}
                </span>
              </div>

              {/* Row 4: Người liên hệ */}
              <div className="pt-3 flex items-start justify-between gap-3">
                <span className="font-semibold text-slate-600 shrink-0 w-36">
                  Người liên hệ:
                </span>
                <span className="font-semibold text-slate-800 text-right">
                  Phòng nhân sự
                </span>
              </div>

              {/* Row 5: Hết hạn nộp */}
              <div className="pt-3 flex items-start justify-between gap-3">
                <span className="font-semibold text-slate-600 shrink-0 w-36">
                  Hết hạn nộp:
                </span>
                <span className="font-semibold text-slate-800 text-right">
                  {job.expiryDate || '31/10/2026'}
                </span>
              </div>

              {/* Row 6: Hình thức ứng tuyển */}
              <div className="pt-3 flex items-start justify-between gap-3">
                <span className="font-semibold text-slate-600 shrink-0 w-36">
                  Hình thức ứng tuyển:
                </span>
                <span className="font-semibold text-[#0A58CA] text-right">
                  Hồ sơ trực tuyến
                </span>
              </div>
            </div>

            {/* Note box at bottom */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 text-xs text-slate-600 leading-relaxed space-y-2">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-[#0A58CA] shrink-0 mt-0.5" />
                <p>
                  Nhà tuyển dụng sẽ nhận trực tiếp hồ sơ thông qua hệ thống ngay khi hoàn tất ứng tuyển. Ứng viên vui lòng không liên hệ qua email và số điện thoại.
                </p>
              </div>
            </div>

            {/* Feedback / Support contact */}
            <div className="pt-2 text-center">
              <p className="text-[11px] text-slate-400">
                Cần trợ giúp trong quá trình nộp hồ sơ? Liên hệ hỗ trợ trực tuyến 24/7.
              </p>
            </div>

          </div>

        </form>
      </main>
    </div>
  );
};

export default ApplyJobView;
