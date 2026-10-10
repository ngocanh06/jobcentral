import React, { useState, useEffect, useRef } from 'react';
import {
  Bookmark,
  Bell,
  MessageSquare,
  ChevronDown,
  ChevronRight,
  User,
  LogOut,
  FileCheck,
  Building2,
  Sparkles,
  Calendar,
  Briefcase,
  Check,
  CheckCheck,
  Trash2,
  X,
  Plus,
} from 'lucide-react';
import { useDevice } from '../context/DeviceContext';
import catAvatar from '../assets/images/cat_opentowork_avatar_1791346160613.jpg';

export const Header = ({
  activeTab,
  onTabChange,
  onToggleMessages,
  savedCount,
  followedCompaniesCount = 0,
  notifications = [],
  onNotificationClick,
  onMarkNotificationRead,
  onMarkAllNotificationsRead,
  onDeleteNotification,
  onSimulateNotification,
  onOpenAuth,
  currentUser,
  onLogout,
  onOpenMobileDrawer,
}) => {
  const device = useDevice();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [notifCategory, setNotifCategory] = useState('all');
  const [isScrolled, setIsScrolled] = useState(false);

  const notifMenuRef = useRef(null);
  const profileMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 4);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifMenuRef.current && !notifMenuRef.current.contains(e.target)) {
        setNotifDropdownOpen(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { id: 'jobs', label: 'Trang chủ' },
    { id: 'search', label: 'Việc làm' },
    { id: 'companies', label: 'Công ty' },
    { id: 'tools', label: 'Công cụ' },
    { id: 'news', label: 'Tin tức' },
    { id: 'cv-builder', label: 'Hồ sơ & CV' },
  ];

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const filteredNotifications = notifications.filter((n) => {
    if (notifCategory === 'all') return true;
    if (notifCategory === 'unread') return !n.isRead;
    return n.category === notifCategory;
  });

  const notifTabs = [
    { id: 'all', label: 'Tất cả', count: notifications.length },
    { id: 'unread', label: 'Chưa đọc', count: unreadCount },
    {
      id: 'application',
      label: 'Ứng tuyển',
      count: notifications.filter((n) => n.category === 'application').length,
    },
    {
      id: 'job_match',
      label: 'Việc làm',
      count: notifications.filter((n) => n.category === 'job_match').length,
    },
    {
      id: 'system',
      label: 'Hệ thống',
      count: notifications.filter((n) => n.category === 'system').length,
    },
  ];

  const getNotifIcon = (type) => {
    switch (type) {
      case 'interview':
        return {
          icon: Calendar,
          wrapClass: 'bg-emerald-50 text-emerald-600 border-emerald-200/70',
        };
      case 'job_match':
        return {
          icon: Briefcase,
          wrapClass: 'bg-blue-50 text-blue-600 border-blue-200/70',
        };
      case 'application':
      case 'profile_view':
        return {
          icon: FileCheck,
          wrapClass: 'bg-indigo-50 text-indigo-600 border-indigo-200/70',
        };
      case 'message':
        return {
          icon: MessageSquare,
          wrapClass: 'bg-sky-50 text-sky-600 border-sky-200/70',
        };
      case 'company_update':
        return {
          icon: Building2,
          wrapClass: 'bg-amber-50 text-amber-600 border-amber-200/70',
        };
      default:
        return {
          icon: Sparkles,
          wrapClass: 'bg-purple-50 text-purple-600 border-purple-200/70',
        };
    }
  };

  const getBadgeStyle = (color) => {
    switch (color) {
      case 'emerald':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/80';
      case 'indigo':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200/80';
      case 'amber':
        return 'bg-amber-50 text-amber-700 border-amber-200/80';
      case 'purple':
        return 'bg-purple-50 text-purple-700 border-purple-200/80';
      case 'rose':
        return 'bg-rose-50 text-rose-700 border-rose-200/80';
      case 'slate':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      default:
        return 'bg-blue-50 text-blue-700 border-blue-200/80';
    }
  };

  const handleMessagesBtnClick = () => {
    setNotifDropdownOpen(false);
    setProfileDropdownOpen(false);
    if (onToggleMessages) {
      onToggleMessages();
    } else {
      onTabChange('messages');
    }
  };

  return (
    <header
      id="main-top-navbar"
      className={`w-full bg-surface-container-lowest/95 backdrop-blur-md sticky top-0 z-50 transition-all duration-200 shrink-0 ${
        isScrolled
          ? 'shadow-[0_2px_12px_rgba(0,0,0,0.06)]'
          : 'shadow-[0_1px_8px_rgba(0,0,0,0.04)]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="h-[72px] flex items-center justify-between gap-6">
          {/* Zone 1 (Left): Brand Logo */}
          <div className="flex items-center shrink-0">
            <button
              id="header-logo-btn"
              onClick={() => onTabChange('jobs')}
              className="flex items-center select-none cursor-pointer focus:outline-hidden whitespace-nowrap shrink-0"
            >
              <span className="font-headline-lg text-[25px] leading-none font-extrabold text-primary tracking-tight">
                JobCentral
              </span>
            </button>
          </div>

          {/* Zone 2 (Center): Balanced Navigation Tabs */}
          <nav
            id="main-nav-tabs"
            className="hidden lg:flex items-center justify-center gap-7 xl:gap-9"
          >
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => onTabChange(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative h-10 px-1 inline-flex items-center justify-center font-label-lg text-label-lg transition-colors cursor-pointer select-none whitespace-nowrap shrink-0 focus:outline-hidden ${
                    isActive
                      ? 'text-primary font-bold'
                      : 'text-on-surface-variant hover:text-on-surface font-semibold'
                  }`}
                >
                  <span className="whitespace-nowrap">{item.label}</span>
                  {isActive && (
                    <span
                      id={`nav-tab-indicator-${item.id}`}
                      className="absolute bottom-0.5 left-0 right-0 h-[2.5px] bg-primary rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3 (Right): Actions & User Profile */}
          <div className="flex items-center justify-end gap-2.5 sm:gap-3 shrink-0">
            {/* Notification Bell with Unread Count Badge */}
            <div className="relative flex items-center" ref={notifMenuRef}>
              <button
                id="header-notification-btn"
                onClick={() => {
                  setNotifDropdownOpen((prev) => !prev);
                  setProfileDropdownOpen(false);
                }}
                title="Thông báo hệ thống"
                className={`relative w-10 h-10 flex items-center justify-center rounded-full transition-all cursor-pointer focus:outline-hidden ${
                  notifDropdownOpen
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-surface-container-low/70 hover:bg-surface-container text-on-surface-variant hover:text-primary'
                }`}
              >
                <Bell className="w-[19px] h-[19px] stroke-[1.9]" />
                {unreadCount > 0 && (
                  <span
                    id="header-notification-badge"
                    className={`absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 text-[10px] font-extrabold rounded-full flex items-center justify-center ring-2 ring-white tabular-nums ${
                      notifDropdownOpen
                        ? 'bg-rose-500 text-white'
                        : 'bg-primary text-white'
                    }`}
                  >
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Center Dropdown */}
              {notifDropdownOpen && (
                <div
                  id="header-notifications-menu"
                  className="absolute right-0 top-full mt-2.5 w-[calc(100vw-24px)] max-w-[420px] sm:w-[420px] bg-white rounded-2xl shadow-[0_20px_50px_rgba(15,23,42,0.16)] border border-slate-200/80 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  {/* Top Header */}
                  <div className="px-4 pt-3.5 pb-2.5 border-b border-slate-100 flex items-center justify-between gap-2 bg-slate-50/60">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-[15px]">
                        Thông báo
                      </span>
                      {unreadCount > 0 ? (
                        <span className="px-2 py-0.5 text-[11px] font-bold bg-blue-100 text-primary rounded-full tabular-nums">
                          {unreadCount} mới
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 text-[11px] font-medium bg-slate-100 text-slate-500 rounded-full">
                          Đã đọc hết
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1">
                      {onSimulateNotification && (
                        <button
                          id="header-simulate-notif-btn"
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSimulateNotification();
                          }}
                          title="Mô phỏng nhận thông báo mới từ hệ thống"
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-full transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3 stroke-[2.5]" />
                          <span>Tạo sự kiện</span>
                        </button>
                      )}
                      {unreadCount > 0 && onMarkAllNotificationsRead && (
                        <button
                          id="header-mark-all-read-btn"
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onMarkAllNotificationsRead();
                          }}
                          className="inline-flex items-center gap-1 text-[11px] text-primary font-semibold cursor-pointer px-2.5 py-1 rounded-full hover:bg-blue-50 transition-colors"
                        >
                          <CheckCheck className="w-3.5 h-3.5" />
                          <span>Đọc tất cả</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Category Filter Pills */}
                  <div className="px-3 py-2 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-white">
                    {notifTabs.map((tab) => {
                      const active = notifCategory === tab.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setNotifCategory(tab.id)}
                          className={`px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap inline-flex items-center gap-1 transition-all cursor-pointer ${
                            active
                              ? 'bg-primary text-white shadow-2xs'
                              : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                          }`}
                        >
                          <span>{tab.label}</span>
                          <span
                            className={`text-[10px] px-1 rounded-full tabular-nums ${
                              active
                                ? 'bg-white/20 text-white'
                                : 'bg-white text-slate-500'
                            }`}
                          >
                            {tab.count}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Notification Items List */}
                  <div className="max-h-[390px] overflow-y-auto divide-y divide-slate-100/80">
                    {filteredNotifications.length === 0 ? (
                      <div className="py-10 px-6 text-center">
                        <div className="w-11 h-11 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-2.5">
                          <Bell className="w-5 h-5" />
                        </div>
                        <p className="text-xs font-bold text-slate-700">
                          Không có thông báo nào trong mục này
                        </p>
                        <p className="text-[11px] text-slate-400 mt-1">
                          Khi có cập nhật từ Nhà tuyển dụng hoặc Hệ thống, thông báo sẽ xuất hiện tại đây.
                        </p>
                        {onSimulateNotification && (
                          <button
                            type="button"
                            onClick={() => onSimulateNotification()}
                            className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-primary text-white hover:bg-primary/90 transition-colors cursor-pointer"
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Mô phỏng thông báo hệ thống</span>
                          </button>
                        )}
                      </div>
                    ) : (
                      filteredNotifications.map((notif) => {
                        const { icon: NotifIcon, wrapClass } = getNotifIcon(
                          notif.type
                        );
                        return (
                          <div
                            key={notif.id}
                            onClick={() => {
                              if (onNotificationClick) {
                                onNotificationClick(notif);
                              }
                              setNotifDropdownOpen(false);
                            }}
                            className={`group relative px-4 py-3 transition-colors cursor-pointer flex items-start gap-3 ${
                              notif.isRead
                                ? 'bg-white hover:bg-slate-50/90'
                                : 'bg-blue-50/35 hover:bg-blue-50/70'
                            }`}
                          >
                            {/* Type Icon */}
                            <div
                              className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 ${wrapClass}`}
                            >
                              <NotifIcon className="w-4 h-4 stroke-[2]" />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <span
                                  className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold border ${getBadgeStyle(
                                    notif.badgeColor
                                  )}`}
                                >
                                  {notif.badgeText || 'Hệ thống'}
                                </span>
                                <div className="flex items-center gap-1.5 shrink-0">
                                  <span className="text-[11px] text-slate-400 font-medium">
                                    {notif.time}
                                  </span>
                                  {!notif.isRead && (
                                    <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                                  )}
                                </div>
                              </div>

                              <p
                                className={`text-xs leading-snug ${
                                  notif.isRead
                                    ? 'font-semibold text-slate-700'
                                    : 'font-bold text-slate-900'
                                }`}
                              >
                                {notif.title}
                              </p>

                              {notif.description && (
                                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                                  {notif.description}
                                </p>
                              )}

                              <div className="mt-2 flex items-center justify-between">
                                <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-primary group-hover:translate-x-0.5 transition-transform">
                                  <span>{notif.actionLabel || 'Xem chi tiết'}</span>
                                  <ChevronRight className="w-3.5 h-3.5" />
                                </span>

                                <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                                  {!notif.isRead && onMarkNotificationRead && (
                                    <button
                                      type="button"
                                      title="Đánh dấu đã đọc"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        onMarkNotificationRead(notif.id, e);
                                      }}
                                      className="p-1 rounded-md text-slate-400 hover:text-primary hover:bg-blue-50 transition-colors cursor-pointer"
                                    >
                                      <Check className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                  {onDeleteNotification && (
                                    <button
                                      type="button"
                                      title="Xóa thông báo"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        onDeleteNotification(notif.id, e);
                                      }}
                                      className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>

                  {/* Bottom Footer */}
                  <div className="px-4 py-2.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Tự động đồng bộ sự kiện ứng tuyển & HR</span>
                    <button
                      type="button"
                      onClick={() => setNotifDropdownOpen(false)}
                      className="font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
                    >
                      Đóng
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Chat / Message Icon (Click once to open, click again to close Messages page) */}
            <button
              id="header-messages-btn"
              onClick={handleMessagesBtnClick}
              title={
                activeTab === 'messages'
                  ? 'Đóng trang tin nhắn (Bấm lần nữa để quay lại)'
                  : 'Tin nhắn nhà tuyển dụng'
              }
              aria-pressed={activeTab === 'messages'}
              className={`relative w-10 h-10 flex items-center justify-center rounded-full transition-all cursor-pointer focus:outline-hidden ${
                activeTab === 'messages'
                  ? 'bg-primary text-white shadow-xs ring-2 ring-primary/20'
                  : 'bg-surface-container-low/70 hover:bg-surface-container text-on-surface-variant hover:text-primary'
              }`}
            >
              <MessageSquare className="w-[19px] h-[19px] stroke-[1.9]" />
              {activeTab !== 'messages' && (
                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-primary rounded-full ring-2 ring-white" />
              )}
            </button>

            <div className="hidden sm:block h-6 w-px bg-slate-200/90" />

            {currentUser ? (
              <div className="relative flex items-center" ref={profileMenuRef}>
                <button
                  id="header-user-profile-btn"
                  onClick={() => {
                    if (device.isPhone && onOpenMobileDrawer) {
                      onOpenMobileDrawer();
                    } else {
                      setProfileDropdownOpen((prev) => !prev);
                      setNotifDropdownOpen(false);
                    }
                  }}
                  className="h-10 pl-1.5 pr-3.5 bg-surface-container-low hover:bg-surface-container border border-slate-200/60 rounded-full inline-flex items-center gap-2.5 transition-all cursor-pointer select-none active:scale-95 group focus:outline-hidden"
                >
                  <img
                    src={currentUser.avatar || catAvatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-slate-200 shrink-0"
                  />
                  <span className="hidden sm:inline-block text-[13px] font-bold text-on-surface max-w-[140px] truncate">
                    {currentUser.name}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-on-surface-variant transition-transform duration-200 ${
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
                      <p className="text-sm font-bold text-slate-900 truncate">
                        {currentUser.name}
                      </p>
                      <p className="text-xs text-slate-500 truncate">
                        {currentUser.email}
                      </p>
                    </div>
                    <div className="py-1 px-1.5 space-y-0.5">
                      <button
                        onClick={() => {
                          handleMessagesBtnClick();
                        }}
                        className="w-full px-3 py-2 rounded-full text-left text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <div className="flex items-center space-x-2">
                          <MessageSquare className="w-4 h-4 text-slate-500" />
                          <span>
                            {activeTab === 'messages'
                              ? 'Đóng trang tin nhắn'
                              : 'Tin nhắn tuyển dụng'}
                          </span>
                        </div>
                        <span className="w-2 h-2 bg-primary rounded-full" />
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
                          <span className="w-2 h-2 bg-primary rounded-full" />
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
                          <span className="w-2 h-2 bg-primary rounded-full" />
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
            ) : (
              <div className="flex items-center gap-2 sm:gap-2.5">
                <button
                  id="header-login-pill-btn"
                  onClick={() => onOpenAuth('login')}
                  className="h-10 px-4 inline-flex items-center justify-center font-label-lg text-label-lg text-on-surface hover:text-primary hover:bg-surface-container-low transition-colors rounded-full cursor-pointer whitespace-nowrap"
                >
                  <span>Đăng nhập</span>
                </button>

                <button
                  id="header-register-pill-btn"
                  onClick={() => onOpenAuth('register')}
                  className="h-10 px-4 inline-flex items-center justify-center font-label-lg text-label-lg text-on-surface hover:text-primary hover:bg-surface-container-low transition-colors rounded-full cursor-pointer whitespace-nowrap"
                >
                  <span>Đăng ký</span>
                </button>

                <button
                  id="header-employer-pill-btn"
                  onClick={() => onOpenAuth('employer')}
                  className="hidden sm:inline-flex h-10 items-center gap-2 px-4.5 bg-primary-container text-on-primary font-label-lg text-label-lg hover:bg-primary transition-colors shadow-[0_2px_6px_rgba(21,93,252,0.22)] rounded-full cursor-pointer whitespace-nowrap ml-1"
                  title="Kênh dành riêng cho nhà tuyển dụng"
                >
                  <span className="material-symbols-outlined text-[18px]">sync_alt</span>
                  <span>Dành cho nhà tuyển dụng</span>
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
                    ? 'text-primary font-bold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span
                    id={`mobile-nav-indicator-${item.id}`}
                    className="absolute bottom-0 left-0 w-full h-[2.5px] bg-primary rounded-full"
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

