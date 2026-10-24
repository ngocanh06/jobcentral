import React from "react";
import {
  Briefcase,
  Heart,
  Shield,
  HelpCircle,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-[#182666] text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1 */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-white font-bold text-base">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                <img
                  src="/picture/Logo_JobCentral.png"
                  alt="logo"
                  className="w-14 h-8"
                />
              </div>
              <span className="text-lg">JobCentral</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Nền tảng tuyển dụng và kết nối việc làm công nghệ & thiết kế hàng
              đầu TP. Đà Nẵng.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Dành Cho Ứng Viên
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#jobs" className="hover:text-white transition-colors">
                  Tìm việc làm mới nhất
                </a>
              </li>
              <li>
                <a
                  href="#cv-builder"
                  className="hover:text-white transition-colors"
                >
                  Tạo CV chuyên nghiệp
                </a>
              </li>
              <li>
                <a
                  href="#companies"
                  className="hover:text-white transition-colors"
                >
                  Danh sách công ty IT hàng đầu
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Dành Cho Nhà Tuyển Dụng
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#post" className="hover:text-white transition-colors">
                  Đăng tin tuyển dụng
                </a>
              </li>
              <li>
                <a
                  href="#search-cv"
                  className="hover:text-white transition-colors"
                >
                  Tìm kiếm hồ sơ ứng viên
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="hover:text-white transition-colors"
                >
                  Bảng giá dịch vụ
                </a>
              </li>
              <li>
                <a
                  href="#branding"
                  className="hover:text-white transition-colors"
                >
                  Giải pháp thương hiệu tuyển dụng
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Liên Hệ & Hỗ Trợ
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>Thanh Khê - TP Đà Nẵng</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>contact@jobcentral.vn</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>0123456789</span>
              </li>
            </ul>
          </div>

          <div className="flex">
            {/* liên kết với chúng tôi */}
            <div>
              <div>
                <h2 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
                  Kết nối với chúng tôi thông qua:
                </h2>
                <div className="flex items-center gap-3">
                  {/* Facebook */}
                  <a
                    href="https://facebook.com/your-page"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
                      alt="Facebook"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </a>

                  {/* Zalo */}
                  <a
                    href="https://zalo.me/your-id"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Zalo"
                    className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg"
                      alt="Zalo"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://linkedin.com/company/your-company"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
                      alt="LinkedIn"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://instagram.com/your-account"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm"
                  >
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                      alt="Instagram"
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </a>

                  {/* TikTok */}
                  <a
                    href="https://tiktok.com/@your-channel"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                    className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-black shadow-sm"
                  >
                    <img
                      src="/picture/tiktok_logo.jpg"
                      alt="TikTok"
                      className="h-6 w-6 object-contain"
                      loading="lazy"
                    />
                  </a>
                </div>
              </div>
            </div>
            {/* chứng nhận */}
            {/* <div className="mt-6">
              
              <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-white">
                Được chứng nhận bởi
              </h2>
        
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="http://online.gov.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Đã đăng ký Bộ Công Thương"
                  className="flex h-10 items-center justify-center rounded-lg bg-white px-3 shadow-sm"
                >
                  <img
                    src="https://images.dmca.com/Badges/dmca_protected_sml_120n.png?ID=60f4e3c5-9279-4509-9b98-0cfa0b0467c6"
                    alt="DMCA Protected"
                    className="h-5 w-auto object-contain"
                    loading="lazy"
                  />
                </a>

                <div
                  title="Tiêu chuẩn An toàn thông tin ISO/IEC 27001"
                  className="flex h-10 items-center justify-center rounded-lg bg-white px-3 shadow-sm"
                >
                  <span className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                    <svg
                      className="h-4 w-4 text-[#2D589F]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                    ISO 27001
                  </span>
                </div>

                <div
                  title="Bảo mật SSL 256-bit"
                  className="flex h-10 items-center justify-center rounded-lg bg-white px-3 shadow-sm"
                >
                  <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600">
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    SSL Secure
                  </span>
                </div>

                <a
                  href="http://online.gov.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Đã thông báo Bộ Công Thương"
                  className="flex h-10 items-center justify-center rounded-lg bg-white px-2.5 shadow-sm"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/2/29/Logo_bocongthuong.png"
                    alt="Đã thông báo Bộ Công Thương"
                    className="h-6 w-auto object-contain"
                    loading="lazy"
                  />
                </a>
              </div>
            </div> */}
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-xs">
          <p>© 2026 JobCentral. Tất cả quyền được bảo lưu.</p>
          <div className="flex items-center space-x-4">
            <a href="#privacy" className="hover:text-slate-400">
              Chính sách bảo mật
            </a>
            <a href="#terms" className="hover:text-slate-400">
              Điều khoản sử dụng
            </a>
            <a href="#security" className="hover:text-slate-400">
              An toàn thông tin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
