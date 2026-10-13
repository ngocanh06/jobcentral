import React, { useState } from "react";
import {
  Clock3,
  Target,
  ChevronRight,
  Sparkles,
  BadgeCheck,
  Gift,
  PackageCheck,

} from "lucide-react";
import { LineChart, Line, XAxis, ResponsiveContainer, Tooltip } from "recharts";

const chartData = [
  { month: "Tháng 1", value: 0 },
  { month: "Tháng 2", value: 0 },
  { month: "Tháng 3", value: 0 },
  { month: "Tháng 4", value: 0 },
  { month: "Tháng 5", value: 0 },
  { month: "Tháng 6", value: 0 },
];

const chartData2 = [
  { month: "Tháng 1", value: 0 },
  { month: "Tháng 2", value: 0 },
  { month: "Tháng 3", value: 0 },
  { month: "Tháng 4", value: 0 },
  { month: "Tháng 5", value: 0 },
  { month: "Tháng 7", value: 0 },
  { month: "Tháng 8", value: 0 },
  { month: "Tháng 9", value: 0 },
  { month: "Tháng 10", value: 0 },
  { month: "Tháng 11", value: 0 },
  { month: "Tháng 12", value: 0 },
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

const giftCategories = [
  {
    id: "exchange",
    title: "Khả dụng",
    description: "Đổi điểm lấy phần quà hấp dẫn",
    icon: Gift,
  },
  {
    id: "exclusive",
    title: "Đang áp dụng",
    description: "Ưu đãi đặc biệt dành cho bạn",
    icon: Sparkles,
  },
  {
    id: "received",
    title: "Đã dùng",
    description: "Những phần quà bạn đã sở hữu",
    icon: PackageCheck,
  },
  {
    id: "used",
    title: "Hết hạn",
    description: "Những phần quà bạn đã sở hữu",
    icon: PackageCheck,
  },
];

const gifts = {
  exchange: [
    {
      id: 1,
      name: "Voucher giảm giá",
      description: "Giảm giá cho đơn hàng tiếp theo",
      points: 500,
      icon: "🎟️",
    },
  ],
  exclusive: [
    {
      id: 4,
      name: "Huy hiệu VIP",
      description: "Huy hiệu dành riêng cho thành viên VIP",
      points: 0,
      icon: "👑",
    },
  ],
  received: [
    {
      id: 6,
      name: "Voucher thành viên",
      description: "Đã nhận thành công",
      points: 500,
      icon: "🎫",
    },
  ],
  used: [
    {
      id: 6,
      name: "Voucher giảm giá",
      description: "Đã nhận thành công",
      points: 500,
      icon: "🎫",
    },
  ],
};

// function ScoreRing({ score = 800, max = 1000 }) {
//   const radius = 78;
//   const circumference = 2 * Math.PI * radius;
//   const pct = Math.min(score / max, 1);
//   const offset = circumference * (1 - pct);

//   return (
//     <div className="relative flex h-48 w-48 items-center justify-center">
//       <svg viewBox="0 0 180 180" className="h-full w-full -rotate-90">
//         <circle
//           cx="90"
//           cy="90"
//           r={radius}
//           fill="none"
//           stroke="#EEF1F6"
//           strokeWidth="12"
//         />
//         <circle
//           cx="90"
//           cy="90"
//           r={radius}
//           fill="none"
//           stroke="#2170e4"
//           strokeWidth="12"
//           strokeLinecap="round"
//           strokeDasharray={circumference}
//           strokeDashoffset={offset}
//         />
//       </svg>
//       <div className="absolute flex flex-col items-center">
//         <span className="text-4xl font-bold tracking-tight text-slate-900">
//           {score}
//         </span>
//         <span className="mt-1 text-xs font-medium text-slate-400">
//           / {max} ĐIỂM
//         </span>
//         <span className="mt-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-600">
//           EXCELLENT
//         </span>
//       </div>
//     </div>
//   );
// }

export default function TruthScoreDashboard() {
  const [range, setRange] = useState("6m");
  const [convertChart, setConvertChart] = useState(chartData);
  const [activeCategory, setActiveCategory] = useState("exchange");

  const currentGifts = gifts[activeCategory];

  return (
    <div className="min-h-screen w-full">
      {/* Desktop browser frame */}
      {/* <div className="flex h-full max-h-[900px] w-full max-w-[1440px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/5"> */}
      <div className="flex-1 bg-slate-50">
        <div className="mx-auto max-w-[1200px] px-8 py-7">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-[#2170e4]">
              JobCentral Rewards
            </h1>
          </div>

          {/* Main 2-column layout */}
          <div className="grid grid-cols-12 gap-6">
            {/* Left sidebar */}
            <div className="col-span-12 flex flex-col gap-6 lg:col-span-4">
              <div className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
                <img
                  src="/picture/reward_copper.png"
                  alt="Silver"
                  className="h-20 w-20 object-contain"
                />

                <span className="mt-4 flex items-center gap-1.5 rounded-full bg-slate-100 px-4 py-1.5 text-xs font-semibold text-slate-700">
                  <BadgeCheck size={14} />
                  Basic
                </span>

                <p className="mt-3 text-center text-sm leading-6 text-slate-500">
                  Chi tiêu hơn{" "}
                  <span className="font-bold text-slate-800">
                    15.000.000 VNĐ
                  </span>{" "}
                  để nâng hạng lên{" "}
                  <span className="font-semibold text-slate-700">Silver</span>
                </p>
              </div>

              {/* Gold benefits */}
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <div className="mb-3 flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-slate-800">
                    Lợi ích hạng silver
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
                      Tiến trình lên Silver
                    </span>
                    <span className="text-blue-600">1%</span>
                  </div>
                  <div className="h-1.5 w-[1px] overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full w-full rounded-full bg-blue-600" />
                  </div>
                  <p className="mt-1.5 text-[11px] text-slate-400">
                    Chi tiêu thêm{" "}
                    <span className="text-blue-500 font-semibold">
                      15.000.000 vnd
                    </span>{" "}
                    để đạt hạng Kim cương.
                  </p>
                </div>
              </div>
              {/* Premium banner */}
              <div className="rounded-2xl bg-slate-900 p-5 shadow-sm">
                <h3 className="text-sm font-semibold text-white">
                  Kích hoạt đặt quyền
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
              {/* Chart */}
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-800">
                    Biến động chi tiêu
                  </h3>
                  <div className="flex gap-1 rounded-full bg-slate-100 p-0.5 text-[11px] font-medium">
                    <button
                      onClick={() => {
                        setRange("6m");
                        setConvertChart(chartData);
                      }}
                      className={`rounded-full px-2.5 py-1 ${
                        range === "6m"
                          ? "bg-white text-slate-800 shadow-sm"
                          : "text-slate-400"
                      }`}
                    >
                      6 Tháng
                    </button>
                    <button
                      onClick={() => {
                        setRange("1y");
                        setConvertChart(chartData2);
                      }}
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
                      data={convertChart}
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
                        padding={{ left: 20, right: 20 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#2170e4"
                        strokeWidth={2}
                        dot={{ r: 3, fill: "#2170e4" }}
                        activeDot={{ r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* History */}
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <div className="mb-7 font-bold text-2xl">
                  <h2>Danh sách quà tặng</h2>
                </div>
                {/* 3 thẻ tag chính */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
                  {giftCategories.map((category) => {
                    const isActive = activeCategory === category.id;

                    return (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`border-b-2 pb-2 text-center font-semibold transition-all ${
                          isActive
                            ? "border-blue-600 font-bold text-blue-600"
                            : "border-transparent font-bold text-slate-500 hover:text-blue-500"
                        }`}
                      >
                        <p className="text-xl">{category.title}</p>
                      </button>
                    );
                  })}
                </div>

                {/* Các thẻ quà nhỏ */}
                <div className="mt-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-slate-800">
                      {
                        giftCategories.find(
                          (item) => item.id === activeCategory,
                        )?.title
                      }
                    </h3>

                    <span className="text-xs text-slate-400">
                      {currentGifts.length} phần quà
                    </span>
                  </div>

                  {currentGifts.length > 0 ? (
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {currentGifts.map((gift) => (
                        <div
                          key={gift.id}
                          className="rounded-xl border border-slate-100 p-4 transition hover:border-blue-200 hover:shadow-sm"
                        >
                          <div className="mb-3 flex items-start justify-between">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
                              {gift.icon}
                              {/* img */}
                            </div>
                          </div>

                          <h4 className="text-sm font-semibold text-slate-800">
                            {gift.name}
                          </h4>

                          <p className="mt-1 min-h-10 text-xs leading-5 text-slate-400">
                            {gift.description}
                          </p>

                          <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                            {activeCategory === "received" ? (
                              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600">
                                Đã nhận
                              </span>
                            ) : activeCategory === "exclusive" ? (
                              <span className="text-xs font-medium text-amber-600">
                                Quà đặc biệt
                              </span>
                            ) : (
                              <span className="text-xs font-semibold text-blue-600">
                                {gift.points.toLocaleString("vi-VN")} điểm
                              </span>
                            )}

                            <button
                              onClick={() => {
                                // Xử lý đổi hoặc xem chi tiết quà tại đây
                              }}
                              className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-blue-700"
                            >
                              {activeCategory === "received"
                                ? "Chi tiết"
                                : activeCategory === "exclusive"
                                  ? "Khám phá"
                                  : "Đổi quà"}
                              <ChevronRight size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-xl border border-dashed border-slate-200 py-10 text-center">
                      <Gift size={32} className="mx-auto text-slate-300" />
                      <p className="mt-3 text-sm text-slate-500">
                        Chưa có phần quà nào trong danh mục này.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* How to increase score */}
              {/* <div>
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
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
