import React, { useState } from 'react';
import {
  Bookmark,
  Bell,
  MessageSquare,
  ChevronDown,
  User,
  LogOut,
  Settings,
  FileCheck,
} from 'lucide-react';

export const Header = ({
  activeTab,
  onTabChange,
  savedCount,
  onOpenAuth,
  currentUser,
  onLogout,
}) => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  const navItems = [
    { id: 'jobs', label: 'Việc Làm' },
    { id: 'companies', label: 'Công ty' },
    { id: 'reviews', label: 'Đánh giá' },
    { id: 'news', label: 'Tin tức' },
    { id: 'cv-builder', label: 'Hồ sơ' },
  ];

  return (
    <header className="bg-white sticky top-0 z-40 border-b border-slate-200/90 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 relative">
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

          {/* Center Navigation Tabs (Symmetrically Centered) */}
          <nav
            id="main-nav-tabs"
            className="hidden md:flex items-center justify-center flex-row flex-nowrap space-x-6 lg:space-x-8 text-sm shrink-0"
          >
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => onTabChange(item.id)}
                  className={`relative py-2.5 px-1 font-medium transition-colors cursor-pointer select-none text-[15px] whitespace-nowrap shrink-0 inline-flex items-center focus:outline-hidden ${
                    isActive
                      ? 'text-[#0A58CA] font-bold'
                      : 'text-slate-700 hover:text-[#0A58CA]'
                  }`}
                >
                  <span className="whitespace-nowrap">{item.label}</span>
                  {isActive && (
                    <span
                      id={`nav-tab-indicator-${item.id}`}
                      className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#0A58CA] rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Actions & User Profile */}
          <div className="flex items-center justify-end space-x-5 sm:space-x-7 shrink-0">
            {/* Notification Bell with red dot */}
            <div className="relative">
              <button
                id="header-notification-btn"
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                title="Thông báo"
                className="relative p-2 text-slate-700 hover:text-[#0A58CA] hover:bg-slate-50 rounded-full transition-colors cursor-pointer focus:outline-hidden"
              >
                <Bell className="w-5 h-5 stroke-[1.8]" />
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-600 rounded-full ring-2 ring-white" />
              </button>

              {/* Notification Dropdown */}
              {notifDropdownOpen && (
                <div
                  id="header-notifications-menu"
                  className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">Thông báo mới</span>
                    <span className="text-xs text-[#0A58CA] font-semibold cursor-pointer hover:underline">
                      Đánh dấu đã đọc
                    </span>
                  </div>
                  <div className="max-h-64 overflow-y-auto divide-y divide-slate-50">
                    <div className="px-4 py-3 hover:bg-slate-50 transition-colors cursor-pointer">
                      <p className="text-xs font-semibold text-slate-800">
                        VNG Corporation vừa đăng tin tuyển dụng mới phù hợp với bạn
                      </p>
                      <span className="text-[11px] text-slate-400 mt-1 block">10 phút trước</span>
                    </div>
                    <div className="px-4 py-3 hover:bg-slate-50 transition-colors cursor-pointer">
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
              onClick={() => onTabChange('jobs')}
              title="Tin nhắn nhà tuyển dụng"
              className="p-2 text-slate-700 hover:text-[#0A58CA] hover:bg-slate-50 rounded-full transition-colors cursor-pointer focus:outline-hidden"
            >
              <MessageSquare className="w-5 h-5 stroke-[1.8]" />
            </button>

            {/* User Profile Section */}
            {currentUser ? (
              <div className="relative">
                <button
                  id="header-user-profile-btn"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center space-x-2.5 group cursor-pointer focus:outline-hidden select-none py-1"
                >
                  <span className="text-sm font-semibold text-[#6B21A8] group-hover:text-[#581c87] transition-colors hidden sm:inline">
                    {currentUser.name}
                  </span>
                  <div className="relative">
                    <img
                      src={
                        currentUser.avatar ||
                        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
                      }
                      alt={currentUser.name}
                      referrerPolicy="no-referrer"
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-[#7E22CE] group-hover:ring-[#6B21A8] transition-all shadow-2xs"
                    />
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-700 group-hover:text-slate-900 transition-transform duration-200" />
                </button>

                {/* Profile dropdown menu */}
                {profileDropdownOpen && (
                  <div
                    id="header-profile-menu"
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  >
                    <div className="px-4 py-2.5 border-b border-slate-100">
                      <p className="text-sm font-bold text-slate-900 truncate">{currentUser.name}</p>
                      <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
                    </div>
                    <div className="py-1">
                      <button
                        onClick={() => {
                          onTabChange('cv-builder');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center space-x-2 cursor-pointer"
                      >
                        <FileCheck className="w-4 h-4 text-slate-500" />
                        <span>Hồ sơ & CV của tôi</span>
                      </button>
                      <button
                        onClick={() => {
                          onTabChange('saved');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center space-x-2 cursor-pointer"
                      >
                        <Bookmark className="w-4 h-4 text-slate-500" />
                        <span>Việc làm đã lưu ({savedCount})</span>
                      </button>
                    </div>
                    <div className="border-t border-slate-100 pt-1">
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          onLogout();
                        }}
                        className="w-full px-4 py-2 text-left text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center space-x-2 cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Đăng xuất</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  id="header-login-btn"
                  onClick={() => onOpenAuth('login')}
                  className="px-3.5 py-1.5 text-sm font-semibold text-slate-700 hover:text-[#0A58CA] cursor-pointer"
                >
                  Đăng nhập
                </button>
                <button
                  id="header-register-btn"
                  onClick={() => onOpenAuth('register')}
                  className="px-4 py-1.5 text-sm font-semibold text-white bg-[#0A58CA] hover:bg-[#084298] rounded-lg cursor-pointer transition-colors"
                >
                  Đăng ký
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex md:hidden overflow-x-auto py-2 border-t border-slate-100 space-x-2 no-scrollbar text-xs">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => onTabChange(item.id)}
                className={`relative px-3 py-2 whitespace-nowrap font-medium transition-colors cursor-pointer select-none ${
                  isActive
                    ? 'text-[#0A58CA] font-bold'
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

