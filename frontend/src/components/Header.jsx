import React, { useState, useEffect } from 'react';
import {
  Bookmark,
  Bell,
  MessageSquare,
  ChevronDown,
  User,
  LogOut,
  Settings,
  FileCheck,
  Heart,
  Building2,
  Sparkles,
  Smartphone,
  RefreshCw,
} from 'lucide-react';
import { useDevice } from '../context/DeviceContext';
import catAvatar from '../assets/images/cat_opentowork_avatar_1791346160613.jpg';

export const Header = ({
  activeTab,
  onTabChange,
  savedCount,
  followedCompaniesCount = 0,
  onOpenAuth,
  currentUser,
  onLogout,
  onOpenMobileDrawer,
}) => {
  const device = useDevice();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 4);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'jobs', label: 'Trang chủ' },
    { id: 'search', label: 'Việc làm' },
    { id: 'companies', label: 'Công ty' },
    { id: 'tools', label: 'Công cụ' },
    { id: 'news', label: 'Tin tức' },
    { id: 'cv-builder', label: 'Hồ sơ & CV' },
  ];

  return (
    <header
      id="main-top-navbar"
      className={`w-full bg-white sticky top-0 z-50 border-b transition-all duration-200 shrink-0 ${
        isScrolled
          ? 'border-slate-200/90 shadow-sm'
          : 'border-slate-200/70 shadow-2xs'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
        <div className="flex items-center justify-between h-16 gap-3 lg:gap-6">
          {/* Left: Logo */}
          <div className="flex items-center shrink-0">
            <button
              id="header-logo-btn"
              onClick={() => onTabChange('jobs')}
              className="text-2xl sm:text-[26px] font-black tracking-tight hover:opacity-90 transition-opacity cursor-pointer select-none focus:outline-hidden flex items-center whitespace-nowrap shrink-0"
            >
              <span className="text-black">Job</span>
              <span className="text-[#0A58CA]">Central</span>
            </button>
          </div>

          {/* Center: Navigation Tabs */}
          <nav
            id="main-nav-tabs"
            className="hidden lg:flex flex-1 items-center justify-center space-x-1 xl:space-x-2.5 text-xs lg:text-[13px] xl:text-[14px]"
          >
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => onTabChange(item.id)}
                  className={`relative py-2 px-2.5 xl:px-3 font-semibold transition-colors cursor-pointer select-none whitespace-nowrap shrink-0 inline-flex items-center justify-center focus:outline-hidden ${
                    isActive
                      ? 'text-[#0A58CA]'
                      : 'text-slate-700 hover:text-[#0A58CA]'
                  }`}
                >
                  <span className="whitespace-nowrap">{item.label}</span>
                  {isActive && (
                    <span
                      id={`nav-tab-indicator-${item.id}`}
                      className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-[#0A58CA] rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Actions & User Profile */}
          <div className="flex items-center justify-end shrink-0">
            {currentUser ? (
              <div className="flex items-center space-x-1.5 sm:space-x-2.5">
                {/* Notification Bell with blue dot */}
                <div className="relative flex items-center">
                  <button
                    id="header-notification-btn"
                    onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                    title="Thông báo"
                    className="relative w-9 h-9 flex items-center justify-center text-slate-700 hover:text-[#0A58CA] rounded-full transition-colors cursor-pointer focus:outline-hidden"
                  >
                    <Bell className="w-5 h-5 stroke-[1.8]" />
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#0A58CA] rounded-full ring-2 ring-white" />
                  </button>

                  {/* Notification Dropdown */}
                  {notifDropdownOpen && (
                    <div
                      id="header-notifications-menu"
                      className="absolute right-0 top-full mt-2 w-[calc(100vw-32px)] max-w-xs sm:w-80 sm:max-w-none bg-white rounded-2xl shadow-xl border border-slate-100 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    >
                      <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                        <span className="font-bold text-slate-900 text-sm">Thông báo mới</span>
                        <span className="text-xs text-[#0A58CA] font-semibold cursor-pointer px-2.5 py-1 rounded-full hover:bg-slate-100 transition-colors">
                          Đánh dấu đã đọc
                        </span>
                      </div>
                      <div className="max-h-64 overflow-y-auto divide-y divide-slate-50 px-1.5 py-1">
                        <div className="px-3 py-2.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">
                          <p className="text-xs font-semibold text-slate-800">
                            VNG Corporation vừa đăng tin tuyển dụng mới phù hợp với bạn
                          </p>
                          <span className="text-[11px] text-slate-400 mt-1 block">10 phút trước</span>
                        </div>
                        <div className="px-3 py-2.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">
                          <p className="text-xs font-semibold text-slate-800">
                            Hồ sơ ứng tuyển của bạn đã được FPT Software tiếp nhận
                          </p>
                          <span className="text-[11px] text-slate-400 mt-1 block">2 giờ trước</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Chat / Message Icon */}
                <button
                  id="header-messages-btn"
                  onClick={() => onTabChange('messages')}
                  title="Tin nhắn nhà tuyển dụng"
                  className={`relative w-9 h-9 flex items-center justify-center rounded-full transition-colors cursor-pointer focus:outline-hidden ${
                    activeTab === 'messages'
                      ? 'text-[#0A58CA]'
                      : 'text-slate-700 hover:text-[#0A58CA]'
                  }`}
                >
                  <MessageSquare className="w-5 h-5 stroke-[1.8]" />
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#0A58CA] rounded-full ring-2 ring-white" />
                </button>

                <div className="hidden sm:block h-5 w-px bg-slate-200 mx-1" />

                {/* Logged in: User Profile Pill Button with dropdown */}
                <div className="relative flex items-center">
                  <button
                    id="header-user-profile-btn"
                    onClick={() => {
                      if (device.isPhone && onOpenMobileDrawer) {
                        onOpenMobileDrawer();
                      } else {
                        setProfileDropdownOpen(!profileDropdownOpen);
                      }
                    }}
                    className="inline-flex items-center space-x-2 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-slate-100 hover:bg-slate-200/80 rounded-full transition-all cursor-pointer select-none border border-slate-200/90 active:scale-95 group focus:outline-hidden"
                  >
                    <img
                      src={currentUser.avatar || catAvatar}
                      alt={currentUser.name}
                      className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200 shrink-0"
                    />
                    <span className="hidden sm:inline-block text-xs sm:text-[13px] font-bold text-slate-800 max-w-[120px] truncate">
                      {currentUser.name}
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${
                        profileDropdownOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Profile dropdown menu (desktop mode) */}
                  {profileDropdownOpen && !device.isPhone && (
                    <div
                      id="header-profile-menu"
                      className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-from-top-2 duration-150"
                    >
                      <div className="px-4 py-2.5 border-b border-slate-100">
                        <p className="text-sm font-bold text-slate-900 truncate">{currentUser.name}</p>
                        <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
                      </div>
                      <div className="py-1 px-1.5 space-y-0.5">
                        <button
                          onClick={() => {
                            onTabChange('messages');
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full px-3 py-2 rounded-full text-left text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center justify-between cursor-pointer transition-colors"
                        >
                          <div className="flex items-center space-x-2">
                            <MessageSquare className="w-4 h-4 text-slate-500" />
                            <span>Tin nhắn tuyển dụng</span>
                          </div>
                          <span className="w-2 h-2 bg-[#0A58CA] rounded-full" />
                        </button>
                        <button
                          onClick={() => {
                            onTabChange('cv-builder');
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full px-3 py-2 rounded-full text-left text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center space-x-2 cursor-pointer transition-colors"
                        >
                          <FileCheck className="w-4 h-4 text-slate-500" />
                          <span>Hồ sơ & CV của tôi</span>
                        </button>
                        <button
                          id="header-profile-saved-jobs-btn"
                          onClick={() => {
                            onTabChange('saved');
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full px-3 py-2 rounded-full text-left text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center justify-between cursor-pointer transition-colors"
                        >
                          <div className="flex items-center space-x-2">
                            <Bookmark className="w-4 h-4 text-slate-500" />
                            <span>Việc làm đã lưu</span>
                          </div>
                          {savedCount > 0 ? (
                            <span className="w-2 h-2 bg-[#0A58CA] rounded-full" />
                          ) : null}
                        </button>
                        <button
                          id="header-profile-favorite-companies-btn"
                          onClick={() => {
                            onTabChange('favorite-companies');
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full px-3 py-2 rounded-full text-left text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center justify-between cursor-pointer transition-colors"
                        >
                          <div className="flex items-center space-x-2">
                            <Building2 className="w-4 h-4 text-slate-500" />
                            <span>Công ty đã theo dõi</span>
                          </div>
                          {followedCompaniesCount > 0 ? (
                            <span className="w-2 h-2 bg-[#0A58CA] rounded-full" />
                          ) : null}
                        </button>
                      </div>
                      <div className="border-t border-slate-100 pt-1 px-1.5">
                        <button
                          onClick={() => {
                            setProfileDropdownOpen(false);
                            onLogout();
                          }}
                          className="w-full px-3 py-2 rounded-full text-left text-xs font-semibold text-rose-600 hover:bg-slate-100 flex items-center space-x-2 cursor-pointer transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Đăng xuất</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 sm:gap-2">
                {/* Nút Đăng nhập dạng Pill */}
                <button
                  id="header-login-pill-btn"
                  onClick={() => onOpenAuth('login')}
                  className="inline-flex items-center justify-center px-3.5 sm:px-4.5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#0A58CA] bg-white hover:bg-slate-50 border border-slate-300 hover:border-[#0A58CA] rounded-full transition-all cursor-pointer whitespace-nowrap shadow-2xs active:scale-95"
                >
                  <span>Đăng nhập</span>
                </button>

                {/* Nút Đăng ký dạng Pill */}
                <button
                  id="header-register-pill-btn"
                  onClick={() => onOpenAuth('register')}
                  className="inline-flex items-center justify-center px-3.5 sm:px-4.5 py-1.5 sm:py-2 text-xs sm:text-sm font-bold text-[#0A58CA] hover:text-[#084298] bg-blue-50/80 hover:bg-blue-100 border border-blue-200 hover:border-blue-300 rounded-full transition-all cursor-pointer whitespace-nowrap shadow-2xs active:scale-95"
                >
                  <span>Đăng ký</span>
                </button>

                {/* Nút Dành cho nhà tuyển dụng */}
                <button
                  id="header-employer-pill-btn"
                  onClick={() => onOpenAuth('employer')}
                  className="hidden sm:inline-flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold text-white bg-[#0A58CA] hover:bg-[#084298] rounded-full shadow-xs hover:shadow-md transition-all cursor-pointer whitespace-nowrap min-h-[36px] sm:min-h-[38px] group select-none ml-1 sm:ml-1.5"
                  title="Kênh dành riêng cho nhà tuyển dụng"
                >
                  <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-200 shrink-0 group-hover:rotate-180 transition-transform duration-500" />
                  <span className="hidden xl:inline">Dành cho nhà tuyển dụng</span>
                  <span className="xl:hidden">Nhà tuyển dụng</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile & Tablet Navigation bar for screens under lg (1024px) */}
        <div className="flex lg:hidden overflow-x-auto py-2 border-t border-slate-100 space-x-2 no-scrollbar text-xs">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => onTabChange(item.id)}
                className={`relative px-3 py-2 whitespace-nowrap font-semibold transition-colors cursor-pointer select-none ${
                  isActive
                    ? 'text-[#0A58CA]'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span
                    id={`mobile-nav-indicator-${item.id}`}
                    className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#0A58CA] rounded-full"
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

