import React, { useState } from "react";
import {
  Sparkles,
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  UserPlus,
  Headset,
  User,
  ArrowUpRight,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import pic_logo from "d:/Recruitment Website/jobcentral_role_r9t/jobcentral/frontend/src/picture_sec/Logo_JobCentral.png";
import { Link } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

const CLIENT_LOGOS = [
  "HSBC",
  "VIETTEL",
  "FPT SOFT",
  "VINGROUP",
  "TIKI",
  "TECHCOMBANK",
];

const SKILL_TAGS = ["React/NodeJS", "AWS Cloud", "System Design"];

function LeftPanel() {
  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden bg-[#0B1220] px-8 py-10 text-slate-100 lg:px-12 lg:py-12">
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative z-10">
        {/* Brand row */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white p-1">
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
                  HR Central
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
        <div className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1.5 text-xs font-medium text-blue-300 ring-1 ring-inset ring-blue-500/20">
          <Sparkles className="h-3.5 w-3.5" />
          Trí tuệ nhân tạo tuyển dụng thế hệ mới
        </div>

        {/* Headline */}
        <h1 className="text-4xl font-bold leading-[1.15] text-white sm:text-[40px]">
          Nền tảng Quản trị Tuyển dụng Thông minh &amp; Khai phóng Nhân tài
        </h1>

        <p className="mt-5 max-w-md text-[15px] leading-relaxed text-slate-300">
          Kết nối trực tiếp hơn 5.000.000+ hồ sơ chuyên gia, tự động hóa quy
          trình ATS và rút ngắn 60% thời gian tuyển chọn nhờ thuật toán đối soát
          AI chuẩn xác.
        </p>

        {/* Live snapshot card */}
        <div className="mt-8 rounded-2xl border border-slate-700/60 bg-slate-800/40 p-5 backdrop-blur-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[13px] font-semibold tracking-wide text-slate-300">
              <span className="h-2 w-2 rounded-full bg-blue-400" />
              LIVE HR CENTRAL SNAPSHOT
            </div>
            <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-medium text-emerald-400">
              32 CVs mới hôm nay
            </span>
          </div>

          {/* Candidate card */}
          <div className="flex items-center gap-3 rounded-xl bg-slate-900/60 p-3">
            <div className="relative shrink-0">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-sm font-semibold text-white">
                NN
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-slate-900 text-[8px] font-bold text-emerald-400 ring-1 ring-slate-700">
                AI
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="truncate text-sm font-semibold text-white">
                  Nguyễn Hoàng Nam
                </span>
                <span className="shrink-0 rounded-md bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-400">
                  Match 96%
                </span>
              </div>
              <p className="mt-0.5 truncate text-[12px] text-slate-400">
                Senior Fullstack Tech Lead · 6 năm kinh nghiệm
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {SKILL_TAGS.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-slate-700/60 px-2 py-0.5 text-[10px] text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-2 text-[12px] font-semibold text-emerald-400">
                $2,800 - $3,500
              </p>
            </div>

            <button className="flex shrink-0 items-center gap-1 self-start rounded-lg bg-blue-600 px-3 py-1.5 text-[12px] font-medium text-white hover:bg-blue-700">
              Xem CV
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Stats row */}
          <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-700/60 pt-4">
            <div>
              <p className="text-[11px] text-slate-400">Tốc độ tuyển chọn</p>
              <p className="mt-1 flex items-center gap-1 text-sm font-semibold text-emerald-400">
                +38%
                <TrendingUp className="h-3.5 w-3.5" />
              </p>
            </div>
            <div>
              <p className="text-[11px] text-slate-400">Độ tương thích hồ sơ</p>
              <p className="mt-1 text-sm font-semibold text-white">94.2%</p>
            </div>
            <div>
              <p className="text-[11px] text-slate-400">Chi phí tối ưu hóa</p>
              <p className="mt-1 text-sm font-semibold text-blue-400">
                -45% Budget
              </p>
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
          <span className="flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5" />
            ISO/IEC 27001 Certified
          </span>
          <span>Tuân thủ Nghị định 13/2023/NĐ-CP</span>
          <span>Tiêu chuẩn mã hoá SSL 256-Bit</span>
        </div>
      </div>
    </div>
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
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [remember, setRemember] = useState(true);
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
          Đăng nhập Doanh nghiệp
        </h2>
        <p className="mt-1.5 text-sm text-slate-500">
          Truy cập hệ sinh thái tuyển dụng HR Central để quản lý chiến dịch và
          ứng viên.
        </p>

        {/* Form */}
        <form onSubmit={(e) => e.preventDefault()} className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-[13px] font-medium text-slate-700">
              EMAIL DOANH NGHIỆP (@COMPANY.COM)
            </span>
            <span className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2.5 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
              <Mail className="h-4 w-4 shrink-0 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hr.talent@fpt.com.vn"
                className="w-full bg-transparent text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none"
              />
            </span>
          </label>

          <label className="block">
            <span className="mb-1.5 flex items-center justify-between text-[13px] font-medium text-slate-700">
              MẬT KHẨU
              <a
                href="#"
                className="text-xs font-medium text-blue-600 hover:underline"
              >
                Quên mật khẩu?
              </a>
            </span>
            <span className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2.5 transition focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100">
              <Lock className="h-4 w-4 shrink-0 text-slate-400" />
              <input
                type={visible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
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

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-[13px] text-slate-600">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              Duy trì đăng nhập 30 ngày
            </label>
            <span className="flex items-center gap-1 text-[12px] text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Bảo mật cấp Enterprise
            </span>
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            onClick={() => navigate("/DashBoard")}
          >
            Đăng nhập vào JobCentral
            <span aria-hidden>→</span>
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <span className="h-px flex-1 bg-slate-200" />
          <span className="text-[11px] font-medium text-slate-400">
            HOẶC ĐĂNG NHẬP NHANH BẰNG SSO
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

        {/* No account banner */}
        <div className="mt-6 flex items-center justify-between rounded-xl border border-blue-100 bg-blue-50/60 px-4 py-3">
          <div>
            <p className="text-[13px] font-semibold text-slate-800">
              Chưa có tài khoản tuyển dụng?
            </p>
            <p className="text-[12px] text-slate-500">
              Nhận ngay gói dùng thử &amp; 1 tin AI miễn phí.
            </p>
          </div>
          <button
            type="button"
            className="shrink-0 rounded-lg border border-blue-200 bg-white px-3.5 py-2 text-[13px] font-medium text-blue-600 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 hover:shadow-sm active:scale-95"
            onClick={() => navigate("/Register")}
          >
            Đăng ký ngay
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

export default function BusinessLoginPage() {
  return (
    <div className="min-h-screen w-full bg-white">
      <div className="grid min-h-screen w-full lg:grid-cols-2">
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
