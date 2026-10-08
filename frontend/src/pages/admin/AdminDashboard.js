/**
 * AdminDashboard — JobCentral
 * Overview dashboard with stats, charts, and recent activity
 * Styled in sync with Employer & Candidate portals
 */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import {
  Users, Briefcase, CreditCard, TrendingUp, TrendingDown,
  CheckCircle, Clock, AlertTriangle, Eye, ArrowRight,
  UserPlus, FileText, Star, Activity
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const STATS = [
  {
    label: 'Tổng người dùng',
    value: '24,521',
    change: '+12.5%',
    trend: 'up',
    icon: <Users size={20} />,
    color: '#2170E4',
    bg: '#EFF6FF',
    desc: 'so với tháng trước',
    path: '/admin/users',
  },
  {
    label: 'Tin tuyển dụng',
    value: '3,847',
    change: '+8.2%',
    trend: 'up',
    icon: <Briefcase size={20} />,
    color: '#7C3AED',
    bg: '#F5F3FF',
    desc: 'đang hoạt động',
    path: '/admin/jobs',
  },
  {
    label: 'Doanh thu tháng',
    value: '₫ 142.5M',
    change: '+23.1%',
    trend: 'up',
    icon: <CreditCard size={20} />,
    color: '#059669',
    bg: '#ECFDF5',
    desc: 'so với tháng trước',
    path: '/admin/payments',
  },
  {
    label: 'Hỗ trợ chờ xử lý',
    value: '18',
    change: '-5',
    trend: 'down',
    icon: <AlertTriangle size={20} />,
    color: '#D97706',
    bg: '#FFFBEB',
    desc: 'yêu cầu mới hôm nay',
    path: '/admin/support',
  },
];

const RECENT_USERS = [
  { name: 'Nguyễn Thị Mai', email: 'mai.nguyen@email.com', role: 'candidate', time: '5 phút trước', verified: true },
  { name: 'Công ty TechCorp', email: 'hr@techcorp.vn', role: 'employer', time: '12 phút trước', verified: true },
  { name: 'Trần Văn Bình', email: 'binh.tran@email.com', role: 'candidate', time: '1 giờ trước', verified: false },
  { name: 'StartupXYZ', email: 'recruit@startupxyz.vn', role: 'employer', time: '2 giờ trước', verified: true },
  { name: 'Lê Hồng Phúc', email: 'phuc.le@email.com', role: 'candidate', time: '3 giờ trước', verified: false },
];

const RECENT_JOBS = [
  { title: 'Senior React Developer', company: 'TechCorp Vietnam', status: 'pending', time: '10 phút trước' },
  { title: 'Marketing Manager', company: 'Vingroup Digital', status: 'approved', time: '45 phút trước' },
  { title: 'DevOps Engineer', company: 'FPT Software', status: 'approved', time: '2 giờ trước' },
  { title: 'Product Designer', company: 'Sendo', status: 'rejected', time: '5 giờ trước' },
  { title: 'Data Analyst', company: 'VNG Corporation', status: 'pending', time: '1 ngày trước' },
];

const ACTIVITY_LOG = [
  { type: 'user', message: 'Người dùng mới đăng ký: Nguyễn Thị Mai', time: '5 phút' },
  { type: 'job', message: 'Tin tuyển dụng mới cần duyệt: Senior React Developer', time: '10 phút' },
  { type: 'payment', message: 'Thanh toán thành công gói Pro #TXN-2026-0801', time: '30 phút' },
  { type: 'support', message: 'Yêu cầu hỗ trợ mới #SUP-0042', time: '1 giờ' },
  { type: 'system', message: 'Sao lưu dữ liệu tự động hoàn thành', time: '2 giờ' },
];

const CHART_DATA = [65, 72, 58, 80, 91, 85, 78, 92, 88, 95, 102, 115];
const MONTHS = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'];

const StatusBadge = ({ status }) => {
  const configs = {
    pending: { label: 'Chờ duyệt', color: '#D97706', bg: '#FEF3C7', border: '#FDE68A' },
    approved: { label: 'Đã duyệt', color: '#059669', bg: '#ECFDF5', border: '#A7F3D0' },
    rejected: { label: 'Từ chối', color: '#DC2626', bg: '#FEE2E2', border: '#FECACA' },
  };
  const c = configs[status] || configs.pending;
  return (
    <span className="text-xs font-semibold px-2 py-0.5 rounded-md border"
      style={{ color: c.color, background: c.bg, borderColor: c.border }}>{c.label}</span>
  );
};

const RoleBadge = ({ role }) => {
  const configs = {
    candidate: { label: 'Ứng viên', color: '#2170E4', bg: '#EFF6FF', border: '#BFDBFE' },
    employer: { label: 'NTD', color: '#7C3AED', bg: '#F5F3FF', border: '#DDD6FE' },
    staff: { label: 'Staff', color: '#059669', bg: '#ECFDF5', border: '#A7F3D0' },
    admin: { label: 'Admin', color: '#DC2626', bg: '#FEF2F2', border: '#FECACA' },
  };
  const c = configs[role] || configs.candidate;
  return (
    <span className="text-xs font-semibold px-2 py-0.5 rounded-md border"
      style={{ color: c.color, background: c.bg, borderColor: c.border }}>{c.label}</span>
  );
};

const MiniBarChart = ({ data, months }) => {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-1" style={{ height: 80 }}>
      {data.map((val, i) => (
        <div key={i} className="flex flex-col items-center flex-1 gap-1">
          <div className="w-full rounded-t-sm transition-all"
            style={{
              height: `${(val / max) * 72}px`,
              background: i === data.length - 1
                ? '#2170E4'
                : 'rgba(33, 112, 228, 0.15)',
              minHeight: 4,
            }} />
          <span className="text-xs text-slate-400" style={{ fontSize: 9 }}>{months[i]}</span>
        </div>
      ))}
    </div>
  );
};

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('users');

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Chào buổi sáng';
    if (hour < 18) return 'Chào buổi chiều';
    return 'Chào buổi tối';
  };

  return (
    <AdminLayout
      title="Dashboard"
      subtitle={`${getGreeting()}, ${user?.fullName || 'Admin'}! Tổng quan hoạt động hệ thống JobCentral.`}
    >
      {/* ── Stats Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            onClick={() => stat.path && navigate(stat.path)}
            className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between shadow-xs transition hover:border-[#2170e4] cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: stat.bg, color: stat.color }}>
                {stat.icon}
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold"
                style={{ color: stat.trend === 'up' ? '#059669' : '#DC2626' }}>
                {stat.trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {stat.change}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-800">{stat.value}</div>
              <div className="text-xs font-medium text-slate-500 mt-0.5">{stat.label}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">{stat.desc}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Main Grid ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">

        {/* Revenue Chart */}
        <div className="xl:col-span-2 bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-sm text-slate-800">Doanh thu theo tháng</h3>
              <p className="text-xs text-slate-400">Năm 2026</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
              <TrendingUp size={15} /> +18.5% YoY
            </div>
          </div>
          <MiniBarChart data={CHART_DATA} months={MONTHS} />
          <div className="grid grid-cols-3 gap-4 mt-5 pt-4 border-t border-slate-100">
            {[
              { label: 'Tháng này', value: '₫142.5M', color: '#2170E4' },
              { label: 'Tháng trước', value: '₫115.8M', color: '#7C3AED' },
              { label: 'Cả năm', value: '₫1.2B', color: '#059669' },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="text-sm font-bold" style={{ color: item.color }}>{item.value}</div>
                <div className="text-[11px] text-slate-400">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <h3 className="font-bold text-sm text-slate-800 mb-4">Hoạt động hôm nay</h3>
          <div className="space-y-3.5">
            {[
              { label: 'Đăng ký mới', value: 48, icon: <UserPlus size={16} />, color: '#2170E4', bg: '#EFF6FF' },
              { label: 'Tin cần duyệt', value: 12, icon: <Clock size={16} />, color: '#D97706', bg: '#FEF3C7' },
              { label: 'Tin đã duyệt', value: 35, icon: <CheckCircle size={16} />, color: '#059669', bg: '#ECFDF5' },
              { label: 'Lượt xem CV', value: 1284, icon: <Eye size={16} />, color: '#7C3AED', bg: '#F5F3FF' },
              { label: 'Đánh giá mới', value: 7, icon: <Star size={16} />, color: '#F59E0B', bg: '#FFFBEB' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: item.bg, color: item.color }}>
                    {item.icon}
                  </div>
                  <span className="text-xs text-slate-600">{item.label}</span>
                </div>
                <span className="text-xs font-bold text-slate-800">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tables + Activity ── */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Tab Table */}
        <div className="xl:col-span-2 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <div className="flex items-center justify-between p-4 border-b border-slate-100">
            <div className="flex gap-1 p-1 rounded-lg bg-slate-100">
              {[
                { id: 'users', label: 'Người dùng mới' },
                { id: 'jobs', label: 'Tin tuyển dụng' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition ${
                    activeTab === tab.id
                      ? 'bg-white text-[#2170e4] shadow-xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => navigate(activeTab === 'users' ? '/admin/users' : '/admin/jobs')}
              className="flex items-center gap-1 text-xs font-semibold text-[#2170e4] hover:underline"
            >
              Xem tất cả <ArrowRight size={13} />
            </button>
          </div>

          {/* Users tab */}
          {activeTab === 'users' && (
            <div>
              {RECENT_USERS.map((user, i) => (
                <div key={i} className="flex items-center justify-between px-5 py-3 hover:bg-slate-50 transition border-b border-slate-100 last:border-b-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[#2170e4] text-xs font-bold shrink-0">
                      {user.name[0]}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-800">{user.name}</p>
                      <p className="text-[11px] text-slate-400">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <RoleBadge role={user.role} />
                    {user.verified
                      ? <CheckCircle size={14} className="text-emerald-600" />
                      : <Clock size={14} className="text-amber-600" />
                    }
                    <span className="text-[11px] text-slate-400 hidden sm:block">{user.time}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Jobs tab */}
          {activeTab === 'jobs' && (
            <div>
              {RECENT_JOBS.map((job, i) => (
                <div key={i} className="flex items-center justify-between px-5 py-3 hover:bg-slate-50 transition border-b border-slate-100 last:border-b-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-blue-50 text-[#2170e4]">
                      <Briefcase size={15} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-800">{job.title}</p>
                      <p className="text-[11px] text-slate-400">{job.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <StatusBadge status={job.status} />
                    <span className="text-[11px] text-slate-400 hidden sm:block">{job.time}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Activity Log */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
          <div className="flex items-center gap-2 mb-4">
            <Activity size={16} className="text-[#2170e4]" />
            <h3 className="font-bold text-sm text-slate-800">Hoạt động gần đây</h3>
          </div>
          <div className="space-y-3.5">
            {ACTIVITY_LOG.map((log, i) => {
              const icons = {
                user: { icon: <Users size={13} />, color: '#2170E4', bg: '#EFF6FF' },
                job: { icon: <Briefcase size={13} />, color: '#7C3AED', bg: '#F5F3FF' },
                payment: { icon: <CreditCard size={13} />, color: '#059669', bg: '#ECFDF5' },
                support: { icon: <FileText size={13} />, color: '#D97706', bg: '#FEF3C7' },
                system: { icon: <Activity size={13} />, color: '#64748B', bg: '#F1F5F9' },
              };
              const cfg = icons[log.type] || icons.system;
              return (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: cfg.bg, color: cfg.color }}>
                    {cfg.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs leading-snug text-slate-700">{log.message}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{log.time} trước</p>
                  </div>
                </div>
              );
            })}
          </div>
          <button
            onClick={() => navigate('/admin/monitoring')}
            className="w-full mt-4 py-2 rounded-lg text-xs font-semibold transition bg-blue-50 text-[#2170e4] hover:bg-blue-100"
          >
            Xem tất cả nhật ký
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
