import React, { useState } from "react";
import { Check, X, Clock, Star } from "lucide-react";

const plans = [
  {
    tag: "CƠ BẢN",
    tagClass: "bg-slate-100 text-slate-500",
    name: "Gói Cơ Băn",
    price: "0đ",
    desc: "Phù hợp cho freelancer hoặc các startup giai đoạn sơ khai hoặc nhà tuyển dụng mới.",
    features: [
      { text: "Đăng 1 bài lên FanPage", state: "on" },
      { text: "Tiếp cận 5.00 - 10.000 ứng viên", state: "on" },
      { text: "AI Matching vấn đáp tự động", state: "on" },
    ],

    cta: "Bắt đầu miễn phí",
    variant: "outline",
    card: "bg-white border border-slate-200",
  },

  {
    tag: "TĂNG TRƯỞNG",
    badge: "Best Value",
    tagClass: "bg-slate-100 text-slate-500",
    name: "Gói Tiêu Chuẩn",
    price: "0đ",
    desc: "Giải pháp tối ưu cho doanh nghiệp vừa và nhỏ.",
    features: [
      { text: "Đăng 02 bài lên Fanpage", state: "on" },
      { text: "Ghim bài lên Fanpage trong 03 ngày", state: "on" },
      { text: "Tiếp cận 15.000 - 20.000 ứng viên", state: "on" },
      { text: "Phỏng vấn video (Sắp tới)", state: "soon" },
    ],
    cta: "Nâng cấp ngay",
    variant: "outline",
    card: "bg-white border border-slate-200",
  },

  {
    tag: "BỨT PHÁ",
    badge: "NEW",
    tagClass: "bg-white/15 text-white",
    name: "Gói Cao Cấp",
    price: "0đ",
    desc: "Khai phá sức mạnh AI và quản trị dữ liệu tập trung.",
    features: [
      { text: "Bao gồm toàn bộ quyền lợi của gói Tiêu Chuẩn", state: "on" },
      { text: "Chạy Quảng Cáo 05 ngày", state: "on" },
      { text: "Hỗ trợ tương tác, kéo tin nhắn trong 03 ngày đầu", state: "on" },
      { text: "Tiếp cận 30.000 - 50.000 ứng viên", state: "on" },
    ],
    cta: "Nâng cấp ngay",
    variant: "solid",
    card: "bg-gradient-to-b from-blue-500 to-blue-800 border border-blue-700 text-white",
    featured: true,
  },
  {
    tag: "CHUYÊN NGHIỆP",
    tagClass: "bg-slate-100 text-slate-500",
    name: "Gói VIP",
    price: "Liên hệ",
    desc: "Tùy chỉnh riêng biệt theo cấu trúc của tập đoàn đa quốc gia.",
    features: [
      { text: "Đăng 04 bài lên Fanpage", state: "on" },
      { text: "Luôn có 01 bài được ghim ưu tiên", state: "on" },
      { text: "Chạy Quảng Cáo 14 ngày", state: "on" },
      { text: "Tiếp cận > 80.000 ứng viên", state: "on" },
    ],
    cta: "Nâng ký ngay",
    variant: "outline",
    card: "bg-white border border-slate-200",
  },
];

const cycles = [
  { id: "month", label: "Tháng" },
  { id: "year", label: "Năm" },
  { id: "2year", label: "2 Năm", badge: "Giảm 35%" },
];

function FeatureIcon({ state }) {
  if (state === "on")
    return (
      <Check
        className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5"
        strokeWidth={2.5}
      />
    );
  if (state === "off")
    return (
      <X className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" strokeWidth={2.5} />
    );
  if (state === "soon")
    return (
      <Clock
        className="w-4 h-4 text-slate-400 shrink-0 mt-0.5"
        strokeWidth={2}
      />
    );
  if (state === "star")
    return (
      <Star className="w-4 h-4 text-blue-200 shrink-0 mt-0.5 fill-blue-200" />
    );
  return null;
}

export default function PricingPage() {
  const [cycle, setCycle] = useState("month");

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="text-2xl md:text-3xl font-bold text-[#2170e4]">
            Nâng tầm quy trình tuyển dụng của bạn
          </h1>
          <p className="text-slate-500 mb-8">
            Chọn gói dịch vụ phù hợp với quy mô và nhu cầu tăng trưởng của doanh
            nghiệp bạn.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center bg-slate-100 rounded-xl p-1 gap-1">
            {cycles.map((c) => (
              <button
                key={c.id}
                onClick={() => setCycle(c.id)}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium
        transition-all duration-300 ease-in-out
        ${
          cycle === c.id
            ? "bg-white text-blue-600 shadow-sm scale-100"
            : "text-slate-500 hover:text-slate-700 hover:bg-white/50 scale-95"
        }
      `}
              >
                {c.label}
                {c.badge && (
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full transition-all duration-300 ${
                      cycle === c.id
                        ? "bg-emerald-100 text-emerald-600"
                        : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {c.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-6 flex flex-col h-full ${plan.card} ${
                plan.featured
                  ? "shadow-xl shadow-blue-200 lg:-translate-y-2"
                  : "shadow-sm"
              }`}
            >
              <div className="flex items-center gap-2 mb-4">
                <span
                  className={`text-xs font-semibold tracking-wide px-2.5 py-1 rounded-md ${plan.tagClass}`}
                >
                  {plan.tag}
                </span>
                {plan.badge && (
                  <span className="text-xs font-semibold bg-blue-100 text-blue-600 px-2.5 py-1 rounded-md">
                    {plan.badge}
                  </span>
                )}
              </div>

              <h3
                className={`text-lg font-semibold mb-2 ${plan.featured ? "text-white" : "text-slate-800"}`}
              >
                {plan.name}
              </h3>

              <p className="mb-4">
                <span
                  className={`text-2xl font-extrabold ${plan.featured ? "text-white" : "text-slate-900"}`}
                >
                  {plan.price}
                </span>
                {plan.price !== "Liên hệ" && (
                  <span
                    className={
                      plan.featured ? "text-blue-200" : "text-slate-400"
                    }
                  >
                    {" "}
                    /tháng
                  </span>
                )}
              </p>

              <p
                className={`text-sm mb-6 leading-relaxed ${plan.featured ? "text-blue-100" : "text-slate-500"}`}
              >
                {plan.desc}
              </p>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f.text} className="flex items-start gap-2.5">
                    <FeatureIcon state={f.state} />
                    <span
                      className={`text-sm ${
                        plan.featured
                          ? "text-white font-medium"
                          : f.state === "off"
                            ? "text-slate-400"
                            : "text-slate-600"
                      }`}
                    >
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-xl text-sm font-semibold transition-colors ${
                  plan.featured
                    ? "bg-white text-blue-600 hover:bg-blue-50"
                    : "border border-slate-300 text-slate-700 hover:bg-slate-50"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
