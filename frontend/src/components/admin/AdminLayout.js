/**
 * AdminLayout — JobCentral
 * Sidebar + Header layout for all Admin/Staff pages
 * Styled with JobCentral's unified white & #2170e4 theme (matching Employer & Candidate portals)
 */
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, Briefcase, CreditCard, Tag, FileText,
  BarChart2, Settings, Activity, HeadphonesIcon, Shield,
  ChevronLeft, ChevronRight, Bell, LogOut, Menu, X,
  ChevronDown, User, Search
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePermission } from '../../context/PermissionContext';

const NAV_ITEMS = [
  {
    group: 'Tổng quan',
    items: [
      { label: 'Dashboard', icon: <LayoutDashboard size={18} />, path: '/admin/dashboard', permission: null },
    ],
  },
  {
    group: 'Quản lý',
    items: [
      { label: 'Người dùng', icon: <Users size={18} />, path: '/admin/users', permission: 'users:read' },
      { label: 'Tin tuyển dụng', icon: <Briefcase size={18} />, path: '/admin/jobs', permission: 'jobs:read' },
      { label: 'Thanh toán & Doanh thu', icon: <CreditCard size={18} />, path: '/admin/payments', permission: 'payments:read' },
      { label: 'Hỗ trợ khách hàng', icon: <HeadphonesIcon size={18} />, path: '/admin/support', permission: 'support:read' },
    ],
  },
  {
    group: 'Nội dung',
    items: [
      { label: 'Danh mục ngành nghề', icon: <Tag size={18} />, path: '/admin/categories', permission: 'categories:manage' },
      { label: 'Quản lý nội dung', icon: <FileText size={18} />, path: '/admin/content', permission: 'content:manage' },
      { label: 'Danh sách cấm (Blacklist)', icon: <Shield size={18} />, path: '/admin/blacklist', permission: 'blacklist:manage' },
    ],
  },
  {
    group: 'Phân tích & Báo cáo',
    items: [
      { label: 'Báo cáo thống kê', icon: <BarChart2 size={18} />, path: '/admin/reports', permission: 'reports:read' },
      { label: 'Giám sát hệ thống', icon: <Activity size={18} />, path: '/admin/monitoring', permission: 'system:monitoring' },
    ],
  },
  {
    group: 'Hệ thống',
    items: [
      { label: 'Cấu hình chung', icon: <Settings size={18} />, path: '/admin/system', permission: 'system:config' },
    ],
  },
];

export default function AdminLayout({ children, title, subtitle }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { hasPermission } = usePermission();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifications] = useState(3);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const SidebarContent = () => (
    <>
      {/* ── Logo ── */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-slate-200">
        <Link to="/admin/dashboard" className="flex items-center gap-2 no-underline">
          <div className="text-xl sm:text-2xl font-black tracking-tight select-none flex items-center">
            <span className="text-slate-900">Job</span>
            <span className="text-[#2170E4]">Central</span>
          </div>
          {!collapsed && (
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-[#2170e4]/10 text-[#2170e4]">
              Admin
            </span>
          )}
        </Link>
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 py-3 px-2 overflow-y-auto space-y-4 no-scrollbar">
        {NAV_ITEMS.map((group) => {
          const visibleItems = group.items.filter(
            (item) => !item.permission || hasPermission(item.permission)
          );
          if (visibleItems.length === 0) return null;

          return (
            <div key={group.group}>
              {!collapsed && (
                <p className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {group.group}
                </p>
              )}
              <div className="space-y-0.5">
                {visibleItems.map((item) => {
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                      title={collapsed ? item.label : ''}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                        active
                          ? 'bg-indigo-50 text-[#2170e4] font-bold shadow-xs'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium'
                      }`}
                    >
                      <span className={`shrink-0 ${active ? 'text-[#2170e4]' : 'text-slate-400'}`}>
                        {item.icon}
                      </span>
                      {!collapsed && (
                        <span className="truncate">{item.label}</span>
                      )}
                      {active && !collapsed && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#2170e4]" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      {/* ── User info at bottom ── */}
      <div className="border-t border-slate-200 p-3 bg-white">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[#2170e4] text-xs font-bold shrink-0">
            {user?.fullName?.[0]?.toUpperCase() || 'A'}
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-800 truncate">{user?.fullName || 'Quản trị viên'}</p>
              <p className="text-[11px] text-slate-400 truncate">
                {user?.role === 'admin' ? 'Hệ thống Quản trị' : 'Nhân viên'}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans">

      {/* ── Desktop Sidebar ── */}
      <aside
        className="hidden lg:flex flex-col shrink-0 transition-all duration-300 relative bg-white border-r border-slate-200 z-20"
        style={{ width: collapsed ? 72 : 256 }}
      >
        <SidebarContent />
        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full flex items-center justify-center shadow-md bg-white border border-slate-200 cursor-pointer hover:bg-slate-50"
        >
          {collapsed ? <ChevronRight size={12} color="#2170e4" /> : <ChevronLeft size={12} color="#2170e4" />}
        </button>
      </aside>

      {/* ── Mobile Sidebar Overlay ── */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setMobileOpen(false)} />
          <aside className="relative flex flex-col w-64 h-full z-10 bg-white border-r border-slate-200">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X size={20} />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* ── Main Content Area ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* ── Header ── */}
        <header className="h-16 shrink-0 flex items-center justify-between px-6 bg-white border-b border-slate-200">

          {/* Left: Mobile menu + Title */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-600"
            >
              <Menu size={18} />
            </button>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-slate-800 leading-tight">{title || 'Dashboard'}</h1>
              {subtitle && <p className="text-xs text-slate-400 hidden sm:block mt-0.5">{subtitle}</p>}
            </div>
          </div>

          {/* Right: Search + Notifications + User menu */}
          <div className="flex items-center gap-3">
            {/* Quick search input */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50/70 focus-within:border-[#2170e4] focus-within:bg-white transition">
              <Search size={15} className="text-slate-400" />
              <input
                placeholder="Tìm kiếm quản trị..."
                className="text-xs outline-none bg-transparent w-40 text-slate-700 placeholder:text-slate-400"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 cursor-pointer">
              <Bell size={18} />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] text-white flex items-center justify-center font-bold bg-[#EF4444]">
                  {notifications}
                </span>
              )}
            </button>

            {/* User Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer transition"
              >
                <div className="w-7 h-7 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[#2170e4] text-xs font-bold">
                  {user?.fullName?.[0]?.toUpperCase() || 'A'}
                </div>
                <span className="text-xs font-semibold hidden sm:block text-slate-700">
                  {user?.fullName || 'Admin'}
                </span>
                <ChevronDown size={14} className="text-slate-400" />
              </button>

              {userMenuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 w-52 rounded-xl py-1.5 z-20 bg-white border border-slate-200 shadow-lg">
                    <div className="px-4 py-2.5 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-800">{user?.fullName}</p>
                      <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
                    </div>
                    <Link
                      to="/admin/system"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 transition no-underline"
                    >
                      <Settings size={14} className="text-slate-400" /> Cài đặt hệ thống
                    </Link>
                    <div className="border-t border-slate-100 my-1" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 text-xs w-full text-left text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                    >
                      <LogOut size={14} /> Đăng xuất
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* ── Page Content ── */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-50 no-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}
