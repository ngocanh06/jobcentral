import React from 'react';
import { Briefcase, Heart, Shield, HelpCircle, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1 */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-white font-bold text-base">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                <Briefcase className="w-4 h-4" />
              </div>
              <span className="text-lg">JobCentral</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Nền tảng tuyển dụng và kết nối việc làm công nghệ & thiết kế hàng đầu TP. Hồ Chí Minh.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Dành Cho Ứng Viên
            </h4>
            <ul className="space-y-2">
              <li><a href="#jobs" className="hover:text-white transition-colors">Tìm việc làm mới nhất</a></li>
              <li><a href="#cv-builder" className="hover:text-white transition-colors">Tạo CV chuyên nghiệp</a></li>
              <li><a href="#companies" className="hover:text-white transition-colors">Danh sách công ty IT hàng đầu</a></li>
              <li><a href="#reviews" className="hover:text-white transition-colors">Đánh giá môi trường làm việc</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">
              Dành Cho Nhà Tuyển Dụng
            </h4>
            <ul className="space-y-2">
              <li><a href="#post" className="hover:text-white transition-colors">Đăng tin tuyển dụng</a></li>
              <li><a href="#search-cv" className="hover:text-white transition-colors">Tìm kiếm hồ sơ ứng viên</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Bảng giá dịch vụ</a></li>
              <li><a href="#branding" className="hover:text-white transition-colors">Giải pháp thương hiệu tuyển dụng</a></li>
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
                <span>Quận 1, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>contact@jobcentral.vn</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>028 3822 9999</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-xs">
          <p>© 2024 JobCentral Vietnam. Tất cả quyền được bảo lưu.</p>
          <div className="flex items-center space-x-4">
            <a href="#privacy" className="hover:text-slate-400">Chính sách bảo mật</a>
            <a href="#terms" className="hover:text-slate-400">Điều khoản sử dụng</a>
            <a href="#security" className="hover:text-slate-400">An toàn thông tin</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
