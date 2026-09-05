import React, { useState, useEffect } from "react";
import {
  Building2,
  Sparkles,
  Zap,
  Ticket,
  Search,
  Target,
  CheckCircle2,
  User,
  Phone,
  Mail,
  MapPin,
  Lock,
  Eye,
  EyeOff,
  ChevronDown,
  LogIn,
  UserPlus,
  Headset,
} from "lucide-react";
import { Link } from "lucide-react";
import pic_logo from "d:/Recruitment Website/jobcentral_role_r9t/jobcentral/frontend/src/picture_sec/Logo_JobCentral.png";
import { useNavigate } from "react-router-dom";

const PROVINCES = [
  "TP. Hồ Chí Minh",
  "Hà Nội",
  "Đà Nẵng",
  "Cần Thơ",
  "Hải Phòng",
  "Bình Dương",
];

const CLIENT_LOGOS = [
  "HSBC",
  "VIETTEL",
  "FPT SOFT",
  "VINGROUP",
  "TIKI",
  "TECHCOM",
];

function LeftPanel() {
  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden bg-[#0B1220] px-8 py-10 text-slate-100 lg:px-12 lg:py-12">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative z-10">
        {/* Brand row */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600">
              <img
                src={pic_logo}
                alt="Logo JobCentral"
                className="h-full w-full rounded-lg object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold leading-tight text-white">
                  JobCentral
                </span>
                <span className="rounded-md bg-blue-500/20 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-blue-300">
                  HR CENTRAL
                </span>
              </div>
              <p className="text-[11px] leading-tight text-slate-400">
                Cổng doanh nghiệp &amp; tuyển dụng V5.0
              </p>
            </div>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-slate-700/70 bg-slate-800/50 px-3 py-1.5 sm:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-xs text-slate-300">
              Hệ thống phân tích AI trực tuyến
            </span>
          </div>
        </div>

        {/* Eyebrow pill */}
        <div className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-300 ring-1 ring-inset ring-emerald-500/20">
          <Zap className="h-3.5 w-3.5" />
          Gia nhập mạng lưới tuyển dụng số 1
        </div>

        {/* Headline */}
        <h1 className="text-4xl font-bold leading-[1.15] text-white sm:text-[42px]">
          Bắt đầu tuyển dụng nhân tài cùng JobCentral
        </h1>

        <p className="mt-5 max-w-md text-[15px] leading-relaxed text-slate-300">
          Đăng ký tài khoản doanh nghiệp nhận ngay{" "}
          <span className="font-semibold text-emerald-400">
            01 tin đăng tuyển miễn phí
          </span>{" "}
          &amp;{" "}
          <span className="font-semibold text-emerald-400">
            30 ngày trải nghiệm
          </span>{" "}
          thuật toán AI Talent Matching.
        </p>

        {/* Gift card */}
        <div className="mt-8 rounded-2xl border border-slate-700/60 bg-slate-800/40 p-5 backdrop-blur-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium text-white">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Gói quà tặng khởi động doanh nghiệp mới
            </div>
            <span className="rounded-md bg-amber-400/90 px-2 py-1 text-[11px] font-bold text-slate-900">
              TRỊ GIÁ 2.850.000đ
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-slate-900/60 p-3">
              <Ticket className="mb-2 h-5 w-5 text-blue-400" />
              <p className="text-[13px] font-semibold text-white">
                01 Tin Đăng Tuyển
              </p>
              <p className="mt-1 text-[11px] leading-snug text-slate-400">
                Tiêu chuẩn 30 ngày hiển thị ưu tiên
              </p>
            </div>
            <div className="rounded-xl bg-slate-900/60 p-3">
              <Search className="mb-2 h-5 w-5 text-blue-400" />
              <p className="text-[13px] font-semibold text-white">
                05 Điểm Lọc CV
              </p>
              <p className="mt-1 text-[11px] leading-snug text-slate-400">
                Mở khoá bộ ứng viên chất lượng cao
              </p>
            </div>
            <div className="rounded-xl bg-slate-900/60 p-3">
              <Target className="mb-2 h-5 w-5 text-blue-400" />
              <p className="text-[13px] font-semibold text-white">
                AI Candidate Score
              </p>
              <p className="mt-1 text-[11px] leading-snug text-slate-400">
                Đánh giá độ phù hợp tự động
              </p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 border-t border-slate-700/60 pt-4">
            <div className="flex items-center gap-2 text-[13px] text-slate-300">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
              5.000.000+ Hồ sơ chuyên môn
            </div>
            <div className="flex items-center gap-2 text-[13px] text-slate-300">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
              Tích hợp hệ thống ATS hiện đại
            </div>
            <div className="flex items-center gap-2 text-[13px] text-slate-300">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
              Chuyên viên HR tư vấn 1:1
            </div>
          </div>
        </div>
      </div>

      {/* Bottom trust row */}
      <div className="relative z-10 mt-10">
        <p className="mb-3 text-[11px] font-medium tracking-wide text-slate-500">
          20.000+ doanh nghiệp &amp; tập đoàn tin dùng
        </p>
        <div className="flex flex-wrap gap-2">
          {CLIENT_LOGOS.map((name) => (
            <span
              key={name}
              className="rounded-lg border border-slate-700/60 bg-slate-800/40 px-3 py-1.5 text-[11px] font-semibold text-slate-300"
            >
              {name}
            </span>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-slate-500">
          <span>ISO/IEC 27001 Certified</span>
          <span>Tuân thủ Nghị định 13/2023/NĐ-CP</span>
          <span>Mã hóa SSL 256-Bit</span>
        </div>
      </div>
    </div>
  );
}

function TextField({
  icon: Icon,
  label,
  placeholder,
  type = "text",
  required,
}) {
  const [value, setValue] = useState("");
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-medium text-slate-700">
        {label} {required && <span className="text-blue-600">*</span>}
      </span>
      <span className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2.5 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
        <Icon className="h-4 w-4 shrink-0 text-slate-400" />
        <input
          type={type}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
        />
      </span>
    </label>
  );
}

function PasswordField({ label, placeholder }) {
  const [value, setValue] = useState("");
  const [visible, setVisible] = useState(false);
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-medium text-slate-700">
        {label} <span className="text-blue-600">*</span>
      </span>
      <span className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2.5 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
        <Lock className="h-4 w-4 shrink-0 text-slate-400" />
        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="text-slate-400 hover:text-slate-600"
          aria-label={visible ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
        >
          {visible ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </span>
    </label>
  );
}

function ProvinceField() {
  const [value, setValue] = useState("");
  const [provinces, setProvinces] = useState([]); // State để lưu danh sách tỉnh từ API
  const [loading, setLoading] = useState(true);   // State hiển thị trạng thái đang tải

  useEffect(() => {
    const effectiveDate = "2025-07-01";
    // Đã sửa lại đúng cấu trúc URL của AddressKit by Casso
    const url = `https://cas.so{effectiveDate}/provinces`;

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Không thể tải danh sách tỉnh thành");
        return res.json();
      })
      .then((data) => {
        // AddressKit trả về một mảng các object: [{ code: "01", name: "Thành phố Hà Nội", ... }]
        setProvinces(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi fetch API:", err);
        setLoading(false);
      });
  }, []);

  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-medium text-slate-700">
        Tỉnh / Thành phố <span className="text-blue-600">*</span>
      </span>
      <span className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2.5 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
        <MapPin className="h-4 w-4 shrink-0 text-slate-400" />
        <select
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full appearance-none bg-transparent text-sm text-slate-800 focus:outline-none disabled:opacity-50"
          disabled={loading} // Khóa select khi chưa tải xong dữ liệu
        >
          <option value="" disabled>
            {loading ? "Đang tải dữ liệu..." : "Chọn Tỉnh / Thành phố"}
          </option>
          
          {/* Lặp qua danh sách tỉnh thành lấy từ API */}
          {provinces.map((p) => (
            <option key={p.code} value={p.code}>
              {p.name}
            </option>
          ))}
        </select>
        <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
      </span>
    </label>
  );
}

function SSOButton({ label, children }) {
  return (
    <button
      type="button"
      className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
    >
      {children}
      {label}
    </button>
  );
}

function RightPanel() {
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col bg-white px-6 py-8 sm:px-10 lg:px-14 lg:py-10">
      {/* Top bar */}
      <div className="mb-8 flex items-center justify-between text-sm">
        <button
          onClick={() => navigate("/")}
          className="group flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition-all duration-200 hover:bg-blue-50 hover:text-blue-600"
        >
          <User className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
          <span>Dành cho Nhà tuyển dụng</span>
        </button>
        <div className="flex items-center gap-1.5 text-slate-500">
          <Headset className="h-4 w-4" />
          Hỗ trợ Doanh nghiệp:
          <a href="tel:0962522881" className="font-semibold text-blue-600">
            0962 522 881
          </a>
        </div>
      </div>

      <div className="mx-auto w-full max-w-md">
        <h2 className="text-2xl font-bold text-slate-900">
          Đăng ký Tài khoản Doanh nghiệp
        </h2>
        <p className="mt-1.5 text-sm text-slate-500">
          Truy cập bộ công cụ tuyển dụng chuyên nghiệp và kết nối nhân tài toàn
          diện.
        </p>

        {/* Form */}
        <form onSubmit={(e) => e.preventDefault()} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField
              icon={User}
              label="Họ và tên người liên hệ"
              placeholder="VD: Nguyễn Hoàng Long"
              required
            />
            <TextField
              icon={Phone}
              label="Số điện thoại liên hệ"
              placeholder="VD: 0987 654 321"
              type="tel"
              required
            />
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-[13px] font-medium text-slate-700">
                Email doanh nghiệp (@company.com){" "}
                <span className="text-blue-600">*</span>
              </span>
              <span className="text-[11px] text-slate-400">
                Khuyến dùng tên miền công ty
              </span>
            </div>
            <span className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2.5 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
              <Mail className="h-4 w-4 shrink-0 text-slate-400" />
              <input
                type="email"
                placeholder="talent.acquisition@congty.com"
                className="w-full bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
              />
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField
              icon={Building2}
              label="Tên công ty / Doanh nghiệp"
              placeholder="VD: Công ty Cổ phần TechVN"
              required
            />
            <ProvinceField />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <PasswordField label="Mật khẩu" placeholder="Tối thiểu 8 ký tự" />
            <PasswordField
              label="Xác nhận mật khẩu"
              placeholder="Nhập lại mật khẩu"
            />
          </div>

          <label className="flex items-start gap-2 text-[13px] text-slate-600">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span>
              Tôi đồng ý với{" "}
              <a href="#" className="font-medium text-blue-600 hover:underline">
                Điều khoản dịch vụ
              </a>{" "}
              và{" "}
              <a href="#" className="font-medium text-blue-600 hover:underline">
                Chính sách bảo mật dữ liệu
              </a>{" "}
              B2B của JobCentral.
            </span>
          </label>

          <button
            type="submit"
            onClick={() => navigate("/DashBoard")}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Hoàn tất đăng ký &amp; Nhận ưu đãi
            <span aria-hidden>→</span>
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <span className="h-px flex-1 bg-slate-200" />
          <span className="text-[11px] font-medium text-slate-400">
            HOẶC ĐĂNG KÝ NHANH BẰNG SSO
          </span>
          <span className="h-px flex-1 bg-slate-200" />
        </div>

        {/* SSO buttons */}
        <div className="flex gap-3">
          <SSOButton label="Workspace">
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.85A11 11 0 0 0 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.05H2.18a11 11 0 0 0 0 9.9z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1a11 11 0 0 0-9.82 6.05l3.66 2.85C6.71 7.31 9.14 5.38 12 5.38z"
              />
            </svg>
          </SSOButton>
          <SSOButton label="Azure AD">
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <rect x="2" y="2" width="9" height="9" fill="#F35325" />
              <rect x="13" y="2" width="9" height="9" fill="#81BC06" />
              <rect x="2" y="13" width="9" height="9" fill="#05A6F0" />
              <rect x="13" y="13" width="9" height="9" fill="#FFBA08" />
            </svg>
          </SSOButton>
          <SSOButton label="LinkedIn">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="#0A66C2">
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.95v5.66H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
            </svg>
          </SSOButton>
        </div>

        {/* Existing account banner */}
        <div className="mt-6 flex items-center justify-between rounded-xl border border-blue-100 bg-blue-50/60 px-4 py-3">
          <div>
            <p className="text-[13px] font-semibold text-slate-800">
              Đã có tài khoản tuyển dụng HR Central?
            </p>
            <p className="text-[12px] text-slate-500">
              Đăng nhập để quản lý tin tuyển dụng và CV ngay.
            </p>
          </div>
          <button
            type="button"
            className="shrink-0 rounded-lg border border-blue-200 bg-white px-3.5 py-2 text-[13px] font-medium text-blue-600 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-sm active:scale-95"
            onClick={() => navigate("/LogIn")}
          >
            Đăng nhập ngay
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto flex flex-col items-center gap-2 pt-8 text-[11px] text-slate-400 sm:flex-row sm:justify-between">
        <span>
          © {new Date().getFullYear()} JobCentral. All rights reserved.
        </span>
        <span className="flex gap-4">
          <a href="#" className="hover:text-slate-600">
            Điều khoản dịch vụ
          </a>
          <a href="#" className="hover:text-slate-600">
            Chính sách bảo mật B2B
          </a>
        </span>
      </div>
    </div>
  );
}

export default function BusinessSignupPage() {
  return (
    <div className="min-h-screen w-full bg-slate-100">
      <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-2">
        <LeftPanel />
        <RightPanel />
      </div>
      <footer
        id="contacts"
        className="scroll-mt-24 border-t border-slate-200 bg-slate-50"
      >
        <div className="grid grid-cols-1 border-b border-slate-200 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <div className="border-b border-slate-200 px-6 py-10 sm:col-span-2 lg:col-span-1 lg:border-b-0 lg:border-r lg:px-10">
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                src={pic_logo}
                alt="Logo JobCentral"
                className="h-10 w-10 rounded-xl object-contain"
              />
              <span className="text-lg font-black tracking-tight text-slate-900">
                JOB<span className="text-[#2170e4]">CENTRAL</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs leading-relaxed text-slate-500">
              Liên hệ:
            </p>
            <br />
            <p>Trụ sở chính: 256 Kinh Dương Vương, Thanh Khê,Tp Đà Nẵng</p>
            <p className="overflow-auto whitespace-pre">
              Email: Helper.jobcentral@gmail.com
            </p>
            <p className="overflow-auto whitespace-pre">
              Hotline: 0962.522.881
            </p>
            <p className="overflow-auto whitespace-pre">
              FaceBook: JobCentral Today
            </p>
            <p className="overflow-auto whitespace-pre">
              TikTok: JobCentral.VietNam
            </p>
          </div>

          <div className="px-6 py-8 sm:px-8 lg:px-10">
            <p className="font-semibold text-slate-900">Công ty</p>
            <ul className="mt-4 space-y-3 text-slate-500">
              <li>
                <Link
                  to="/about"
                  className="transition-colors hover:text-[#2170e4]"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="transition-colors hover:text-[#2170e4]"
                >
                  Career
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="transition-colors hover:text-[#2170e4]"
                >
                  Mobile App
                </Link>
              </li>
            </ul>
          </div>

          <div className="px-6 py-8 sm:px-8 lg:px-10">
            <p className="font-semibold text-slate-900">Hỗ trợ</p>
            <ul className="mt-4 space-y-3 text-slate-500">
              <li>
                <Link
                  to="/Ho-tro-intro"
                  className="transition-colors hover:text-[#2170e4]"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="transition-colors hover:text-[#2170e4]"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="transition-colors hover:text-[#2170e4]"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div className="px-6 py-8 lg:px-10">
            <p className="font-semibold text-slate-900">Tài liệu</p>
            <ul className="mt-4 space-y-3 text-slate-500">
              <li>Handbook</li>
              <li>Market Trends</li>
              <li>Interview Tips</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-200 px-6 py-5 flex justify-center">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} JobCentral. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
