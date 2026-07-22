import React from "react";
import { Link } from "react-router-dom";
import {
  // ClipboardList,
  // Search,
  // Bell,
  // Settings as SettingsIcon,
  ChevronRight,
  MoreHorizontal,
  Rocket,
  Download,
} from "lucide-react";
import { BarChart, Bar, ResponsiveContainer, XAxis, Cell } from "recharts";

// const ScrollToTop = () => {
//   window.scrollTo({
//     top: 0,
//     Behavior: "smooth",
//   });
// };

const statCards = [
  { label: "Tin tuyển dụng", value: "", change: "", up: true },
  { label: "Tổng ứng viên", value: "", change: "", up: true },
  { label: "Hồ sơ mới", value: "", change: "", up: true },
  { label: "Lịch phỏng vấn", value: "", change: "", up: false },
  { label: "Follower", value: "", change: "", up: true },
  { label: "Tiến độ tuyển dụng", value: "", change: "", up: true },
  { label: "Tin sắp hết hạn", value: "", change: "", up: null },
];

const tasks = [
  // demo
  // thực hiện kết nối với data
  // {
  //   title: "Gửi feedback cho ứng viên",
  //   subtitle: "2 ứng viên Backend sau phỏng vấn",
  //   priority: "Thấp",
  //   priorityColor: "bg-slate-100 text-slate-500",
  //   borderColor: "border-slate-300",
  // },
];

//lấy dữ liệu từ DB
const funnelStages = [
  { label: "Applied", value: 0, color: "bg-indigo-950 text-white" },
  { label: "Screening", value: 0, color: "bg-indigo-800 text-white" },
  { label: "Interview", value: 0, color: "bg-sky-500 text-white" },
  { label: "Technical", value: 0, color: "bg-sky-300 text-slate-900" },
  { label: "Offer", value: 0, color: "bg-slate-100 text-slate-500" },
  { label: "Hired", value: 0, color: null },
];

// lấy dữ liệu từ DB
const weeklyApplicants = [
  { day: "T2", value: 0 },
  { day: "T3", value: 0 },
  { day: "T4", value: 0 },
  { day: "T5", value: 0 },
  { day: "T6", value: 0 },
  { day: "T7", value: 0 },
  { day: "CN", value: 0 },
];

//demo
const activeJobs = [
  // {
  //   title: "Product Designer",
  //   meta: "Toàn thời gian • Hà Nội",
  //   applicants: "42 ứng viên",
  //   status: "Đang mở",
  //   statusColor: "bg-emerald-50 text-emerald-600",
  //   deadline: "24 Th10, 2026",
  // },
];

const newCandidates = [
  {
    name: "Nguyễn Hồng Hạnh",
    role: "Product Designer",
    time: "15 phút trước",
    tags: [
      { label: "New", color: "bg-sky-50 text-sky-600" },
      { label: "Portfolio ✓", color: "bg-slate-100 text-slate-500" },
    ],
  },
  {
    name: "Trần Hoàng Long",
    role: "Senior React Developer",
    time: "1 giờ trước",
    tags: [
      { label: "Top Talent", color: "bg-violet-50 text-violet-600" },
      { label: "Ex-Google", color: "bg-slate-100 text-slate-500" },
    ],
  },
  {
    name: "Phạm Minh Anh",
    role: "Marketing Manager",
    time: "3 giờ trước",
    tags: [{ label: "Exp 8y", color: "bg-slate-100 text-slate-500" }],
  },
];

function StatCard({ label, value, change, up }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 px-4 py-3 min-w-[130px] flex-1">
      <p className="text-xs text-slate-500 whitespace-nowrap">{label}</p>
      <p className="text-2xl font-semibold text-slate-900 mt-1">{value}</p>
      {change && (
        <p
          className={`text-[11px] mt-1 flex items-center gap-1 ${
            up ? "text-emerald-500" : "text-red-500"
          }`}
        >
          <span>{up ? "↗" : "↘"}</span>
          {change}
        </p>
      )}
    </div>
  );
}

export default function RecruiterDashboard() {
  const maxVal = Math.max(...weeklyApplicants.map((d) => d.value));

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex">
      {/* Main content */}
      <div className="flex-1 min-w-0">
        <main className="p-6 space-y-6">
          {/* Header row */}
          
          <div className="flex justify-end">
            <button className="bg-[#2170E4] hover:bg-[#1c5edc] transition-colors text-white text-sm font-medium px-4 py-2.5 rounded-lg flex items-center gap-2">
              <span className="text-lg leading-none">+</span> Tạo tin tuyển dụng mới
            </button>
          </div>

          {/* Stat cards */}
          <div className="flex gap-3 overflow-x-auto pb-1">
            {statCards.map((s) => (
              <StatCard key={s.label} {...s} />
            ))}
          </div>

          {/* Tasks / Funnel / Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Tasks */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm">Việc cần làm ngay</h3>
                <span className="text-xs text-[#2170e4] font-medium cursor-pointer flex items-center">
                  Xem tất cả <ChevronRight size={13} />
                </span>
              </div>
              <div className="space-y-4">
                {tasks.length === 0 ? (
                  <p className="text-stale-500 text-sm flex items-center justify-center align-item">
                    Chưa có thông báo nào !
                  </p>
                ) : (
                  tasks.map((t) => (
                    <div
                      key={t.title}
                      className={`border-l-4 pl-3 ${t.borderColor}`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium leading-snug">
                          {t.title}
                        </p>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap ${t.priorityColor}`}
                        >
                          {t.priority}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {t.subtitle}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Funnel */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <h3 className="font-semibold text-sm mb-4">
                Số lượng tuyển dụng theo ngành
              </h3>
              <div className="space-y-2.5">
                {funnelStages.map((f) => (
                  <div key={f.label} className="flex items-center gap-3">
                    {f.value ? (
                      <div
                        className={`${f.color} text-xs font-medium px-3 py-1.5 rounded-md flex items-center justify-between flex-1`}
                        style={{
                          maxWidth: `${
                            30 + (f.value / funnelStages[0].value) * 70
                          }%`,
                        }}
                      >
                        <span>{f.label}</span>
                        <span>{f.value}</span>
                      </div>
                    ) : (
                      <p className="text-xs text-slate-500 pl-1">
                        {f.label}
                        {f.value}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Chart */}
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm">Số lượng ứng viên</h3>
                <span className="text-xs text-slate-400">7 Ngày qua</span>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={weeklyApplicants} barCategoryGap="30%">
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: "#94a3b8" }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {weeklyApplicants.map((entry, idx) => (
                      <Cell
                        key={idx}
                        fill={entry.value === maxVal ? "#4f46e5" : "#e0e7ff"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Active jobs / New candidates */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm">
                  Tin tuyển dụng đang chạy
                </h3>
                <MoreHorizontal size={16} className="text-slate-400" />
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-400 border-b border-slate-100">
                    <th className="pb-2 font-medium">VỊ TRÍ</th>
                    <th className="pb-2 font-medium">SỐ ỨNG TUYỂN</th>
                    <th className="pb-2 font-medium">TRẠNG THÁI</th>
                    <th className="pb-2 font-medium">HẠN CUỐI</th>
                  </tr>
                </thead>
                <tbody>
                  {activeJobs.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="py-12 text-center text-slate-400 text-sm"
                      >
                        📄 Chưa có tin tuyển dụng nào!
                      </td>
                    </tr>
                  ) : (
                    activeJobs.map((job) => (
                      <tr key={job.title} className="border-b border-slate-50">
                        <td className="py-3">
                          <p className="font-medium">{job.title}</p>
                          <p className="text-xs text-slate-400">{job.meta}</p>
                        </td>
                        <td className="py-3 text-slate-600">
                          {job.applicants}
                        </td>
                        <td className="py-3">
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${job.statusColor}`}
                          >
                            {job.status}
                          </span>
                        </td>
                        <td className="py-3 text-slate-600">{job.deadline}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm">Ứng viên mới nhất</h3>
                <span className="text-xs text-[#2170e4] font-medium cursor-pointer flex items-center">
                  Xem tất cả <ChevronRight size={13} />
                </span>
              </div>
              <div className="space-y-4">
                {newCandidates.map((c) => (
                  <div key={c.name} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-indigo-100 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium truncate">{c.name}</p>
                        <span className="text-[10px] text-slate-400 whitespace-nowrap ml-2">
                          {c.time}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">{c.role}</p>
                      <div className="flex gap-1.5 mt-1">
                        {c.tags.map((t) => (
                          <span
                            key={t.label}
                            className={`text-[10px] px-2 py-0.5 rounded-full ${t.color}`}
                          >
                            {t.label}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Search history / Market insight */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col">
              <h3 className="font-semibold text-sm mb-4">
                Lịch sử tìm kiếm ứng viên
              </h3>
              <div className="flex-1 flex items-center justify-center text-sm text-slate-400">
                Chưa có kết quả tìm kiếm
              </div>
            </div>
            {/* vị trí đặt thông báo hoặc quảng cáo */}
            <div className="lg:col-span-2 bg-[#2170e4] rounded-xl p-6 text-white flex items-center justify-between gap-6">
              <div>
                <h3 className="font-semibold mb-2">Thông tin thị trường</h3>
                <p className="text-sm text-indigo-100 max-w-md">
                  Dự báo dựa trên trí tuệ nhân tạo cho thấy nhu cầu tuyển dụng
                  nhân sự công nghệ ở Đông Nam Á sẽ tăng 15% trong quý tới.
                </p>
                <button className="bg-white text-[#2170e4] text-xs font-medium px-4 py-2 rounded-lg mt-4 flex items-center gap-2">
                  <Download size={13} /> Tải xuống báo cáo dự báo
                </button>
              </div>
            </div>
          </div>

          {/* Upgrade banner */}
          <div className="bg-sky-50 border border-sky-100 rounded-xl p-6 flex items-center justify-between gap-6">
            <div>
              <h3 className="font-semibold text-sm mb-1">
                Nâng cấp tài khoản Pro để tiếp cận 5.000+ ứng viên tiềm năng
                ngay hôm nay!
              </h3>
              <p className="text-xs text-slate-500 max-w-xl">
                Mở khóa các tính năng cao cấp: Đề xuất ứng viên AI, không giới
                hạn tin tuyển dụng nổi bật và bộ lọc tìm kiếm chuyên sâu để tối
                ưu hóa quy trình tuyển dụng của bạn.
              </p>
            </div>
            <button className="bg-[#2170e4] text-white text-sm font-medium px-4 py-2.5 rounded-lg flex items-center gap-2 whitespace-nowrap">
              <Rocket size={15} /> Nâng cấp ngay
            </button>
          </div>

          {/* Footer */}
          <footer className="pt-8 pb-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
            <div>
              <h4 className="text-[#2170e4] font-bold text-lg">JobCentral</h4>
              <p className="text-xs text-slate-400 mt-2">
                © 2024 JobCentral. Empowering your professional journey.
              </p>
            </div>
            <div>
              <p className="font-medium text-slate-700 mb-2">Công ty</p>
              <ul className="space-y-1.5 text-slate-500 text-xs">
                <li>
                  <Link
                    to="/about"
                    className="hover:text-[#2170E4] transition-colors"
                  >
                    About Us
                  </Link>
                </li>

                <li>
                  <Link
                    to="/about"
                    className="hover:text-[#2170E4] transition-colors"
                  >
                    Career
                  </Link>
                </li>

                <li>
                  <Link
                    to="/about"
                    className="hover:text-[#2170E4] transition-colors"
                  >
                    Mobile App
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-slate-700 mb-2">Hỗ trợ</p>
              <ul className="space-y-1.5 text-slate-500 text-xs">
                <li>Help Center</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-slate-700 mb-2">Tài liệu</p>
              <ul className="space-y-1.5 text-xs">
                <li className="text-slate-500">Handbook</li>
                <li className="text-slate-500">Market Trends</li>
                <li className="text-slate-500">Interview Tips</li>
              </ul>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
