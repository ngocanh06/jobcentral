import React, { useState } from "react";
import {
  Briefcase,
  FileEdit,
  Timer,
  Users,
  Search,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  TrendingUp,
  Code2,
} from "lucide-react";

import { Link } from "react-router-dom";

const stats = [
  {
    icon: Briefcase,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    value: "42",
    label: "TIN TUYỂN DỤNG ĐANG CHẠY",
    badge: "+12%",
    badgeColor: "text-emerald-600",
    badgeIcon: TrendingUp,
  },
  {
    icon: FileEdit,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    value: "15",
    label: "TIN NHÁP / ĐANG CHỜ",
    badge: "Tháng này",
    badgeColor: "text-slate-400",
  },
  {
    icon: Timer,
    iconBg: "bg-rose-50",
    iconColor: "text-rose-400",
    value: "08",
    label: "SẮP HẾT HẠN (24H)",
    badge: "Khẩn cấp",
    badgeColor: "text-rose-500",
  },
  {
    icon: Users,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    value: "1,824",
    label: "TỔNG LƯỢT ỨNG TUYỂN",
    badge: "+24%",
    badgeColor: "text-emerald-600",
    badgeIcon: TrendingUp,
  },
];

const statusStyles = {
  "Đang hoạt động": "bg-emerald-50 text-emerald-600",
  "Tin nháp": "bg-orange-50 text-orange-500",
  "Đã hết hạn": "bg-rose-50 text-rose-500",
  "Đã lên lịch": "bg-blue-50 text-blue-500",
};

const jobs = [
  {
    icon: Code2,
    // default
    iconBg: "bg-blue-50", 
    iconColor: "text-blue-600",

    title: "Dev FullStack",
    meta: "Full-time • Đà Nẵng",
    dept: "Engineering",
    date: "09/08/2026",
    applicants: "30",
    // views: "3,2k lượt xem",
    status: "Đang hoạt động",
    note: "",
  },
];

const barData = [
  { label: "Senior React Dev", value: 124, max: 124 },
  { label: "Product Designer", value: 86, max: 124 },
  { label: "Sales Manager", value: 64, max: 124 },
];

const trendData = [40, 55, 48, 62, 90, 58, 70];

export default function Quan_li_tin_tuyen_dung() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#2170e4]">
              Quản lý đăng tuyển
            </h1>
            <p className="text-slate-400 text-sm mt-1">
              Tạo, theo dõi, chỉnh sửa và quản lý các chiến dịch tuyển dụng của bạn.
            </p>
          </div>


          <Link to={"/Tao-tin-tuyen-dung"}>
              <button className="bg-[#2170E4] hover:bg-[#1c5edc] transition-colors text-white text-sm font-medium px-4 py-2.5 rounded-lg flex items-center gap-2">
                <span className="text-lg leading-none">+</span> Tạo tin tuyển
                dụng mới
              </button>
            </Link>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <label className="text-sm font-medium text-slate-600 mb-2 block">
            Tìm kiếm tin tuyển dụng
          </label>
          <div className="relative max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tên vị trí hoặc mã số..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 text-sm placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
            />
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => {
            const Icon = s.icon;
            const BadgeIcon = s.badgeIcon;
            return (
              <div
                key={i}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`${s.iconBg} ${s.iconColor} rounded-lg p-2.5`}>
                    <Icon size={20} />
                  </div>
                  <span
                    className={`text-xs font-semibold flex items-center gap-1 ${s.badgeColor}`}
                  >
                    {s.badge}
                    {BadgeIcon && <BadgeIcon size={14} />}
                  </span>
                </div>
                <div className="text-2xl font-bold text-slate-800">{s.value}</div>
                <div className="text-[11px] tracking-wide text-slate-400 font-medium mt-1">
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Job list */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-5">
            <h2 className="text-lg font-bold text-slate-800">
              Danh sách tin tuyển dụng
            </h2>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-slate-400">Sắp xếp:</span>
              <button className="flex items-center gap-1 font-semibold text-blue-600">
                Mới nhất
                <ChevronDown size={16} />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[720px]">
              <thead>
                <tr className="border-t border-b border-slate-100 text-[11px] text-slate-400 font-semibold tracking-wide">
                  <th className="text-left px-6 py-3 font-semibold">
                    VỊ TRÍ TUYỂN DỤNG
                  </th>
                  <th className="text-left px-4 py-3 font-semibold">BỘ PHẬN</th>
                  <th className="text-left px-4 py-3 font-semibold">NGÀY ĐĂNG</th>
                  <th className="text-left px-4 py-3 font-semibold">ỨNG TUYỂN</th>
                  <th className="text-left px-4 py-3 font-semibold">TRẠNG THÁI</th>
                  <th className="text-left px-6 py-3 font-semibold">GHI CHÚ</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job, i) => {
                  const Icon = job.icon;
                  return (
                    <tr
                      key={i}
                      className={i !== jobs.length - 1 ? "border-b border-slate-100" : ""}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-3">
                          <div className={`${job.iconBg} ${job.iconColor} rounded-lg p-2 shrink-0`}>
                            <Icon size={18} />
                          </div>
                          <div>
                            <div className="font-semibold text-slate-800">
                              {job.title}
                            </div>
                            <div className="text-xs text-slate-400 mt-0.5">
                              {job.meta}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-slate-600 align-top pt-4">
                        {job.dept}
                      </td>
                      <td className="px-4 py-4 text-slate-600 align-top pt-4">
                        {job.date}
                      </td>
                      <td className="px-4 py-4 align-top pt-4">
                        <div className="font-bold text-blue-600">
                          {job.applicants}
                        </div>
                        <div className="text-xs text-slate-400">{job.views}</div>
                      </td>
                      <td className="px-4 py-4 align-top pt-4">
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${statusStyles[job.status]}`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current" />
                          {job.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 align-top pt-4" />
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between px-6 py-4">
            <span className="text-sm text-slate-400">
              Hiển thị 10/42 tin tuyển dụng
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50"
              >
                <ChevronLeft size={16} />
              </button>
              {[1, 2, 3].map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-semibold border ${
                    page === p
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(3, p + 1))}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Applications by position */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-800">Ứng tuyển theo vị trí</h3>
              <BarChart3 size={18} className="text-slate-300" />
            </div>
            <div className="space-y-5">
              {barData.map((b, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="text-slate-600">{b.label}</span>
                    <span className="font-bold text-slate-800">{b.value}</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-blue-600"
                      style={{ width: `${(b.value / b.max) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trend chart */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-800">
                Xu hướng ứng tuyển (30 ngày)
              </h3>
              <TrendingUp size={18} className="text-slate-300" />
            </div>
            <div className="flex items-end justify-between gap-3 h-40">
              {trendData.map((v, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-t-md ${
                    i === 4 ? "bg-blue-600" : "bg-slate-100"
                  }`}
                  style={{ height: `${v}%` }}
                />
              ))}
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400 mt-3">
              <span>01 MAY</span>
              <span>15 MAY</span>
              <span>30 MAY</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}