import React, { useState } from "react";
import {
  Eye,
  Zap,
  Award,
  ShieldCheck,
  Clock3,
  Target,
  Crown,
  ChevronRight,
  Sparkles,
  BadgeCheck,
  FileCheck2,
} from "lucide-react";
import { LineChart, Line, XAxis, ResponsiveContainer, Tooltip } from "recharts";

const historyRows = [
  {
    date: "15/05/2024",
    title: "Hoàn thành khảo sát ứng viên",
    subtitle: "Phản hồi tích cực từ 50 ứng viên",
    change: "+15",
    positive: true,
    status: "Đã cộng",
    total: 850,
  },
  {
    date: "08/05/2024",
    title: "Duy trì tỷ lệ phản hồi >95%",
    subtitle: "Thành tích hàng tháng",
    change: "+25",
    positive: true,
    status: "Đã cộng",
    total: 835,
  },
  {
    date: "02/05/2024",
    title: "Tin tuyển dụng bị báo cáo",
    subtitle: "Nội dung không đồng nhất với thực tế",
    change: "-10",
    positive: false,
    status: "Khấu trừ",
    total: 810,
  },
];

const chartData = [
  { month: "Th 1", value: 620 },
  { month: "Th 2", value: 690 },
  { month: "Th 3", value: 740 },
  { month: "Th 4", value: 790 },
  { month: "Th 5", value: 1000 },
  { month: "Th 6", value: 960 },
];

const goldBenefits = [
  {
    icon: BadgeCheck,
    title: "Dấu tick xanh chính chủ",
    desc: "Tăng tỷ lệ ứng tuyển lên 45% nhờ sự tin tưởng từ ứng viên.",
  },
  {
    icon: Clock3,
    title: "Ưu tiên hỗ trợ 24/7",
    desc: "Kênh hỗ trợ riêng biệt cho nhà tuyển dụng có điểm uy tín cao.",
  },
  {
    icon: Target,
    title: "Tăng reach tự nhiên",
    desc: "Thuật toán phân phối tin tuyển dụng đến đúng đối tượng mục tiêu.",
  },
];

const taskCards = [
  {
    icon: Award,
    color: "bg-indigo-50 text-indigo-600",
    title: "Gói Premium",
    desc: "Nâng cấp tài khoản để mở khóa tất cả tính năng nổi bật cùng cộng đồng.",
    points: "+200 điểm",
  },
  {
    icon: ShieldCheck,
    color: "bg-orange-50 text-orange-500",
    title: "Xác thực KYC",
    desc: "Xác minh danh tính giấy phép kinh doanh để bảo chứng thông tin.",
    points: "+150 điểm",
  },
  {
    icon: Sparkles,
    color: "bg-blue-50 text-blue-600",
    title: "Employer Branding",
    desc: "Hoàn thiện 100% hồ sơ công ty, hình ảnh văn phòng và văn hóa.",
    points: "+100 điểm",
  },
  {
    icon: FileCheck2,
    color: "bg-emerald-50 text-emerald-600",
    title: "Hồ sơ sạch",
    desc: "Phản hồi ứng viên đúng hạn và không có báo cáo vi phạm.",
    points: "+50 điểm/tháng",
    active: true,
  },
];

function ScoreRing({ score = 800, max = 1000 }) {
  const radius = 78;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(score / max, 1);
  const offset = circumference * (1 - pct);

  return (
    <div className="relative flex h-48 w-48 items-center justify-center">
      <svg viewBox="0 0 180 180" className="h-full w-full -rotate-90">
        <circle
          cx="90"
          cy="90"
          r={radius}
          fill="none"
          stroke="#EEF1F6"
          strokeWidth="12"
        />
        <circle
          cx="90"
          cy="90"
          r={radius}
          fill="none"
          stroke="#2563EB"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-4xl font-bold tracking-tight text-slate-900">
          {score}
        </span>
        <span className="mt-1 text-xs font-medium text-slate-400">
          / {max} ĐIỂM
        </span>
        <span className="mt-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-600">
          EXCELLENT
        </span>
      </div>
    </div>
  );
}

export default function TruthScoreDashboard() {
  const [range, setRange] = useState("6m");

  return (
    <div className="min-h-screen w-full">
      {/* Desktop browser frame */}
      {/* <div className="flex h-full max-h-[900px] w-full max-w-[1440px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5"> */}
        <div className="flex-1 bg-slate-50">
          <div className="mx-auto max-w-[1200px] px-8 py-7">

            {/* Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-blue-600">Truth Score</h1>
              <p className="mt-1 text-sm text-slate-400">
                Analyze the reliability and effectiveness of your recruitment in
                detail.
              </p>
            </div>

            {/* Main 2-column layout */}
            <div className="grid grid-cols-12 gap-6">
              {/* Left sidebar */}
              <div className="col-span-12 flex flex-col gap-6 lg:col-span-4">
                {/* Score card */}
                <div className="flex flex-col items-center rounded-2xl bg-white p-6 shadow-sm">
                  <ScoreRing score={800} max={1000} />
                  <span className="mt-4 flex items-center gap-1.5 rounded-full bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white">
                    <BadgeCheck size={14} /> DOANH NGHIỆP XUẤT SẮC
                  </span>
                  <p className="mt-3 text-center text-sm text-slate-500">
                    Điểm của bạn cao hơn{" "}
                    <span className="font-semibold text-slate-700">92%</span>{" "}
                    các nhà tuyển dụng trong cùng lĩnh vực Công nghệ.
                  </p>
                </div>

                {/* Gold benefits */}
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <div className="mb-3 flex items-center gap-2">
                    <Crown size={16} className="text-amber-500" />
                    <h3 className="text-sm font-semibold text-slate-800">
                      Lợi ích hạng Vàng
                    </h3>
                  </div>

                  <ul className="flex flex-col gap-3">
                    {goldBenefits.map(({ icon: Icon, title, desc }) => (
                      <li key={title} className="flex gap-3">
                        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                          <Icon size={14} />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-800">
                            {title}
                          </p>
                          <p className="mt-0.5 text-[11px] leading-relaxed text-slate-400">
                            {desc}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4">
                    <div className="mb-1 flex items-center justify-between text-[11px] font-medium">
                      <span className="text-slate-500">
                        Tiến trình lên Kim cương
                      </span>
                      <span className="text-blue-600">100%</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full w-full rounded-full bg-blue-600" />
                    </div>
                    <p className="mt-1.5 text-[11px] text-slate-400">
                      Cần thêm 0 điểm để đạt hạng Kim cương.
                    </p>
                  </div>
                </div>

                {/* Premium banner */}
                <div className="rounded-2xl bg-slate-900 p-5 shadow-sm">
                  <h3 className="text-sm font-semibold text-white">
                    Đặc quyền Premium
                  </h3>
                  <p className="mt-1 text-xs text-slate-400">
                    Sử dụng miễn phí bộ lọc AI nâng cao và liên hệ trực tiếp 50
                    ứng viên/tháng.
                  </p>
                  <button className="mt-4 w-full whitespace-nowrap rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-900">
                    Kích hoạt ngay
                  </button>
                </div>
              </div>

              {/* Right main column */}
              <div className="col-span-12 flex flex-col gap-6 lg:col-span-8">
                {/* History */}
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <div className="mb-3 flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-slate-800">
                      Lịch sử thay đổi điểm
                    </h2>
                    <button className="flex items-center gap-0.5 text-xs font-medium text-blue-600">
                      Xem tất cả <ChevronRight size={14} />
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[560px] text-left text-xs">
                      <thead>
                        <tr className="text-slate-400">
                          <th className="pb-2 font-medium">NGÀY CẬP NHẬT</th>
                          <th className="pb-2 font-medium">
                            HÀNH ĐỘNG / SỰ KIỆN
                          </th>
                          <th className="pb-2 font-medium">THAY ĐỔI</th>
                          <th className="pb-2 font-medium">TRẠNG THÁI</th>
                          <th className="pb-2 text-right font-medium">
                            TỔNG ĐIỂM
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {historyRows.map((row) => (
                          <tr
                            key={row.date}
                            className="border-t border-slate-100"
                          >
                            <td className="py-3 pr-3 align-top text-slate-500">
                              {row.date}
                            </td>
                            <td className="py-3 pr-3 align-top">
                              <p className="font-semibold text-slate-800">
                                {row.title}
                              </p>
                              <p className="mt-0.5 text-slate-400">
                                {row.subtitle}
                              </p>
                            </td>
                            <td
                              className={`py-3 pr-3 align-top font-semibold ${
                                row.positive
                                  ? "text-emerald-500"
                                  : "text-red-500"
                              }`}
                            >
                              {row.change}
                            </td>
                            <td className="py-3 pr-3 align-top">
                              <span
                                className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                                  row.positive
                                    ? "bg-blue-50 text-blue-600"
                                    : "bg-red-50 text-red-500"
                                }`}
                              >
                                {row.status}
                              </span>
                            </td>
                            <td className="py-3 text-right align-top font-semibold text-slate-800">
                              {row.total}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Two info cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <div className="flex items-start justify-between">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                        <Eye size={18} />
                      </div>
                      <span className="text-xs font-semibold text-emerald-500">
                        +24%↗
                      </span>
                    </div>
                    <h3 className="mt-3 text-sm font-semibold text-slate-800">
                      Visibility Boost
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-slate-400">
                      Tin tuyển dụng của bạn được ưu tiên hiển thị ở top đầu kết
                      quả tìm kiếm.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <div className="flex items-start justify-between">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                        <Zap size={18} />
                      </div>
                      <span className="text-xs font-semibold text-orange-500">
                        Cực nhanh
                      </span>
                    </div>
                    <h3 className="mt-3 text-sm font-semibold text-slate-800">
                      Phản hồi ứng viên
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-slate-400">
                      Tốc độ phản hồi trung bình trong 4 giờ giúp giữ chân ứng
                      viên tốt hơn.
                    </p>
                  </div>
                </div>

                {/* Chart */}
                <div className="rounded-2xl bg-white p-5 shadow-sm">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-slate-800">
                      Biến động điểm uy tín
                    </h3>
                    <div className="flex gap-1 rounded-full bg-slate-100 p-0.5 text-[11px] font-medium">
                      <button
                        onClick={() => setRange("6m")}
                        className={`rounded-full px-2.5 py-1 ${
                          range === "6m"
                            ? "bg-white text-slate-800 shadow-sm"
                            : "text-slate-400"
                        }`}
                      >
                        6 Tháng
                      </button>
                      <button
                        onClick={() => setRange("1y")}
                        className={`rounded-full px-2.5 py-1 ${
                          range === "1y"
                            ? "bg-white text-slate-800 shadow-sm"
                            : "text-slate-400"
                        }`}
                      >
                        1 Năm
                      </button>
                    </div>
                  </div>

                  <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={chartData}
                        margin={{ top: 10, right: 8, left: 8, bottom: 0 }}
                      >
                        <Tooltip
                          contentStyle={{
                            borderRadius: 8,
                            border: "1px solid #EEF1F6",
                            fontSize: 12,
                          }}
                        />
                        <XAxis
                          dataKey="month"
                          tick={{ fontSize: 11, fill: "#94A3B8" }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#2563EB"
                          strokeWidth={2}
                          dot={{ r: 3, fill: "#2563EB" }}
                          activeDot={{ r: 5 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* How to increase score */}
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-slate-800">
                      Làm thế nào để tăng điểm?
                    </h2>
                    <button className="flex items-center gap-0.5 text-xs font-medium text-blue-600">
                      Tất cả nhiệm vụ <ChevronRight size={14} />
                    </button>
                  </div>
                  <p className="mb-4 text-xs text-slate-400">
                    Thực hiện các bước sau để xây dựng uy tín tuyển dụng tuyệt
                    đối.
                  </p>

                  <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
                    {taskCards.map(
                      ({ icon: Icon, color, title, desc, points, active }) => (
                        <div
                          key={title}
                          className={`flex flex-col rounded-2xl border p-4 shadow-sm ${
                            active
                              ? "border-emerald-200 bg-emerald-50"
                              : "border-transparent bg-white"
                          }`}
                        >
                          <div
                            className={`flex h-9 w-9 items-center justify-center rounded-xl ${color}`}
                          >
                            <Icon size={18} />
                          </div>
                          <h3 className="mt-3 text-sm font-semibold text-slate-800">
                            {title}
                          </h3>
                          <p className="mt-1 flex-1 text-[11px] leading-relaxed text-slate-400">
                            {desc}
                          </p>
                          <div className="mt-3 flex items-center justify-between text-xs font-semibold">
                            <span
                              className={
                                active ? "text-emerald-600" : "text-blue-600"
                              }
                            >
                              {points}
                            </span>
                            {active ? (
                              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">
                                ĐANG DUY TRÌ
                              </span>
                            ) : (
                              <ChevronRight
                                size={16}
                                className="text-slate-300"
                              />
                            )}
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/* </div> */}
    </div>
  );
}
