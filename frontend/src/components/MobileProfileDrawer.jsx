import React, { useEffect } from 'react';
import {
  X,
  User,
  MessageSquare,
  FileCheck,
  Bookmark,
  Building2,
  LogOut,
  Smartphone,
  CheckCircle2,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { useDevice } from '../context/DeviceContext';

export const MobileProfileDrawer = ({
  isOpen,
  onClose,
  currentUser,
  savedCount = 0,
  followedCompaniesCount = 0,
  onTabChange,
  onLogout,
  onOpenAuth,
}) => {
  const device = useDevice();

  // Prevent background scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-slate-900/60 backdrop-blur-xs animate-fadeIn md:hidden">
      {/* Backdrop overlay touch dismiss */}
      <div
        className="flex-1 w-full"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-up Container */}
      <div
        id="mobile-profile-sheet"
        className="bg-white rounded-t-3xl shadow-2xl border-t border-slate-200 w-full max-h-[88vh] overflow-y-auto animate-slideUp flex flex-col"
        style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 16px)' }}
      >
        {/* Drag handle bar */}
        <div className="w-full flex items-center justify-center pt-3 pb-1 cursor-pointer" onClick={onClose}>
          <div className="w-12 h-1.5 bg-slate-300 rounded-full" />
        </div>

        {/* Header with Close */}
        <div className="px-5 py-3 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-bold text-slate-900">Tài khoản & Hồ sơ</span>
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Smartphone className="w-2.5 h-2.5" />
              <span>{device.os || 'Di động'}</span>
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Info Card */}
        {currentUser ? (
          <div className="p-5">
            <div className="bg-gradient-to-br from-blue-50/70 via-indigo-50/40 to-slate-50 rounded-2xl p-4 border border-blue-100 flex items-center space-x-3.5 mb-4">
              <div className="relative shrink-0">
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    referrerPolicy="no-referrer"
                    className="w-13 h-13 rounded-full object-cover ring-2 ring-[#0A58CA] shadow-xs"
                  />
                ) : (
                  <div className="w-13 h-13 rounded-full bg-[#0A58CA] text-white text-base font-black flex items-center justify-center shadow-xs">
                    {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                )}
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full ring-2 ring-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-bold text-slate-900 truncate">
                  {currentUser.name}
                </h3>
                <p className="text-xs text-slate-500 truncate mt-0.5">
                  {currentUser.email}
                </p>
                <div className="flex items-center space-x-1 text-[11px] text-[#0A58CA] font-medium mt-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Ứng viên đã xác thực</span>
                </div>
              </div>
            </div>

            {/* Navigation List */}
            <div className="space-y-1 text-sm font-semibold text-slate-700">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onTabChange('messages');
                }}
                className="w-full flex items-center justify-between p-3.5 rounded-xl hover:bg-slate-50 active:bg-slate-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0A58CA] flex items-center justify-center">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <span>Tin nhắn tuyển dụng</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-[#0A58CA] rounded-full" />
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onTabChange('cv-builder');
                }}
                className="w-full flex items-center justify-between p-3.5 rounded-xl hover:bg-slate-50 active:bg-slate-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <span>Hồ sơ & CV của tôi</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onTabChange('saved');
                }}
                className="w-full flex items-center justify-between p-3.5 rounded-xl hover:bg-slate-50 active:bg-slate-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Bookmark className="w-4 h-4" />
                  </div>
                  <span>Việc làm đã lưu</span>
                </div>
                <div className="flex items-center space-x-2">
                  {savedCount > 0 && (
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">
                      {savedCount}
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onTabChange('favorite-companies');
                }}
                className="w-full flex items-center justify-between p-3.5 rounded-xl hover:bg-slate-50 active:bg-slate-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <span>Công ty đã theo dõi</span>
                </div>
                <div className="flex items-center space-x-2">
                  {followedCompaniesCount > 0 && (
                    <span className="px-2 py-0.5 bg-purple-100 text-purple-800 text-xs font-bold rounded-full">
                      {followedCompaniesCount}
                    </span>
                  )}
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </button>

              {/* Logout */}
              <div className="pt-3 mt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onLogout();
                  }}
                  className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl bg-rose-50 text-rose-600 font-bold text-xs hover:bg-rose-100 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Đăng xuất khỏi tài khoản</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-blue-50 text-[#0A58CA] flex items-center justify-center mx-auto mb-3">
              <User className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Đăng nhập tài khoản
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-5 max-w-xs mx-auto">
              Đăng nhập để xem danh sách việc làm đã lưu, kết nối trực tiếp với nhà tuyển dụng và tải CV chất lượng cao.
            </p>
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenAuth('login');
                }}
                className="w-full py-3 bg-[#0A58CA] text-white font-bold text-sm rounded-xl shadow-sm hover:bg-[#084298] transition-colors"
              >
                Đăng nhập ngay
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenAuth('register');
                }}
                className="w-full py-3 bg-slate-100 text-slate-700 font-bold text-sm rounded-xl hover:bg-slate-200 transition-colors"
              >
                Tạo tài khoản mới
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
