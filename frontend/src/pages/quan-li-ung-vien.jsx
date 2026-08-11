import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  X,
  Download,
  Layers,
  Sparkles,
  RefreshCw,
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  FileText,
  Send,
  User,
} from "lucide-react";

import pic from "../picture_sec/pic_default.jpg";

// Dữ liệu mẫu — thay bằng dữ liệu thật của bạn (props / API) khi tích hợp

const CANDIDATES = [
  {
    id: 1,
    name: "Vo Thai Kiet",
    email: "kietthaivo2006@gmail.com",
    avatar: pic,
    role: "Senior Backend Engineer",
    location: "HaiChau, DN",
    tags: ["Remote-friendly"],
    date: "24 Th10, 2026",
    score: 100,
    stage: "Interviewing",
    recruiter: "NgocAnh",
    recruiterAvatar: pic,
    skills: ["DEV"],
    resume: "vo_kiet_resume_2023.pdf",

    successPrediction: 0,
    skillGaps: [
      // { name: "Distributed Systems", status: "ok" },
      // { name: "Kubernetes/Helm", status: "warn" },
      // { name: "Team Leadership", status: "ok" },
    ],

    timeline: [
      // { title: "Phỏng vấn đã lên lịch", detail: "26 Th10, 2023 · 10:00 AM", note: "Với Technical Lead: Duy Nguyễn" },
      // { title: "Hoàn thành sàng lọc", detail: "24 Th10, 2023 · 02:45 PM" },
      // { title: "Đã nhận hồ sơ", detail: "24 Th10, 2023 · 09:12 AM" },
    ],
  },

  {
    id: 2,
    name: "lê đại thú",
    email: "kietthaivo2006@gmail.com",
    avatar: pic,
    role: "Senior Backend Engineer",
    location: "HaiChau, DN",
    tags: ["Remote-friendly"],
    date: "24 Th10, 2026",
    score: 100,
    stage: "Interviewing",
    recruiter: "NgocAnh",
    recruiterAvatar: pic,
    skills: ["DEV"],
    resume: "vo_kiet_resume_2023.pdf",

    successPrediction: 0,
    skillGaps: [
      // { name: "Distributed Systems", status: "ok" },
      // { name: "Kubernetes/Helm", status: "warn" },
      // { name: "Team Leadership", status: "ok" },
    ],

    timeline: [
      // { title: "Phỏng vấn đã lên lịch", detail: "26 Th10, 2023 · 10:00 AM", note: "Với Technical Lead: Duy Nguyễn" },
      // { title: "Hoàn thành sàng lọc", detail: "24 Th10, 2023 · 02:45 PM" },
      // { title: "Đã nhận hồ sơ", detail: "24 Th10, 2023 · 09:12 AM" },
    ],
  },
  {
    id: 3,
    name: "Kiều lương tâm",
    email: "kietthaivo2006@gmail.com",
    avatar: pic,
    role: "Senior Backend Engineer",
    location: "HaiChau, DN",
    tags: ["Remote-friendly"],
    date: "24 Th10, 2026",
    score: 100,
    stage: "Interviewing",
    recruiter: "NgocAnh",
    recruiterAvatar: pic,
    skills: ["DEV"],
    resume: "vo_kiet_resume_2023.pdf",

    successPrediction: 0,
    skillGaps: [
      // { name: "Distributed Systems", status: "ok" },
      // { name: "Kubernetes/Helm", status: "warn" },
      // { name: "Team Leadership", status: "ok" },
    ],

    timeline: [
      // { title: "Phỏng vấn đã lên lịch", detail: "26 Th10, 2023 · 10:00 AM", note: "Với Technical Lead: Duy Nguyễn" },
      // { title: "Hoàn thành sàng lọc", detail: "24 Th10, 2023 · 02:45 PM" },
      // { title: "Đã nhận hồ sơ", detail: "24 Th10, 2023 · 09:12 AM" },
    ],
  },
  {
    id: 4,
    name: "Ngo thua an",
    email: "kietthaivo2006@gmail.com",
    avatar: pic,
    role: "Senior Backend Engineer",
    location: "HaiChau, DN",
    tags: ["Remote-friendly"],
    date: "24 Th10, 2026",
    score: 100,
    stage: "Interviewing",
    recruiter: "NgocAnh",
    recruiterAvatar: pic,
    skills: ["DEV"],
    resume: "vo_kiet_resume_2023.pdf",

    successPrediction: 0,
    skillGaps: [
      // { name: "Distributed Systems", status: "ok" },
      // { name: "Kubernetes/Helm", status: "warn" },
      // { name: "Team Leadership", status: "ok" },
    ],

    timeline: [
      // { title: "Phỏng vấn đã lên lịch", detail: "26 Th10, 2023 · 10:00 AM", note: "Với Technical Lead: Duy Nguyễn" },
      // { title: "Hoàn thành sàng lọc", detail: "24 Th10, 2023 · 02:45 PM" },
      // { title: "Đã nhận hồ sơ", detail: "24 Th10, 2023 · 09:12 AM" },
    ],
  },
  {
    id: 5,
    name: "Vo van b",
    email: "kietthaivo2006@gmail.com",
    avatar: pic,
    role: "Senior Backend Engineer",
    location: "HaiChau, DN",
    tags: ["Remote-friendly"],
    date: "24 Th10, 2026",
    score: 100,
    stage: "Interviewing",
    recruiter: "NgocAnh",
    recruiterAvatar: pic,
    skills: ["DEV"],
    resume: "vo_kiet_resume_2023.pdf",

    successPrediction: 0,
    skillGaps: [
      // { name: "Distributed Systems", status: "ok" },
      // { name: "Kubernetes/Helm", status: "warn" },
      // { name: "Team Leadership", status: "ok" },
    ],

    timeline: [
      // { title: "Phỏng vấn đã lên lịch", detail: "26 Th10, 2023 · 10:00 AM", note: "Với Technical Lead: Duy Nguyễn" },
      // { title: "Hoàn thành sàng lọc", detail: "24 Th10, 2023 · 02:45 PM" },
      // { title: "Đã nhận hồ sơ", detail: "24 Th10, 2023 · 09:12 AM" },
    ],
  },
  {
    id: 6,
    name: "Nguyen văn a",
    email: "kietthaivo2006@gmail.com",
    avatar: pic,
    role: "Senior Backend Engineer",
    location: "HaiChau, DN",
    tags: ["Remote-friendly"],
    date: "24 Th10, 2026",
    score: 100,
    stage: "Interviewing",
    recruiter: "NgocAnh",
    recruiterAvatar: pic,
    skills: ["DEV"],
    resume: "vo_kiet_resume_2023.pdf",

    successPrediction: 0,
    skillGaps: [
      // { name: "Distributed Systems", status: "ok" },
      // { name: "Kubernetes/Helm", status: "warn" },
      // { name: "Team Leadership", status: "ok" },
    ],

    timeline: [
      // { title: "Phỏng vấn đã lên lịch", detail: "26 Th10, 2023 · 10:00 AM", note: "Với Technical Lead: Duy Nguyễn" },
      // { title: "Hoàn thành sàng lọc", detail: "24 Th10, 2023 · 02:45 PM" },
      // { title: "Đã nhận hồ sơ", detail: "24 Th10, 2023 · 09:12 AM" },
    ],
  },
  {
    id: 7,
    name: "Ng Tai Loc",
    email: "kietthaivo2006@gmail.com",
    avatar: pic,
    role: "Senior Backend Engineer",
    location: "HaiChau, DN",
    tags: ["Remote-friendly"],
    date: "24 Th10, 2026",
    score: 100,
    stage: "Interviewing",
    recruiter: "NgocAnh",
    recruiterAvatar: pic,
    skills: ["DEV"],
    resume: "vo_kiet_resume_2023.pdf",

    successPrediction: 0,
    skillGaps: [
      // { name: "Distributed Systems", status: "ok" },
      // { name: "Kubernetes/Helm", status: "warn" },
      // { name: "Team Leadership", status: "ok" },
    ],

    timeline: [
      // { title: "Phỏng vấn đã lên lịch", detail: "26 Th10, 2023 · 10:00 AM", note: "Với Technical Lead: Duy Nguyễn" },
      // { title: "Hoàn thành sàng lọc", detail: "24 Th10, 2023 · 02:45 PM" },
      // { title: "Đã nhận hồ sơ", detail: "24 Th10, 2023 · 09:12 AM" },
    ],
  },
];

const STAT_CARDS = [
  { label: "Tổng đơn ứng tuyển", value: "", meta: "", metaTone: "" },
  { label: "Mới hôm nay", value: "", meta: "", metaTone: "" },
  { label: "Đang xem xét", value: "", meta: "", metaTone: "" },
  { label: "Phỏng vấn", value: "", meta: "", metaTone: "" },
  { label: "Đã gửi offer", value: "", meta: "", metaTone: "" },
  { label: "Đã đóng", value: "", meta: "", metaTone: "" },
];

// Tailwind class maps thay cho các hàm scoreTone/stageTone trả về style object
function scoreClasses(score) {
  if (score >= 90) return "bg-emerald-50 text-emerald-600";
  if (score >= 70) return "bg-yellow-100 text-yellow-700";
  if (score >= 50) return "bg-amber-600 text-amber-500";
  return "bg-red-50 text-red-600";
}

function stageClasses(stage) {
  const map = {
    Interviewing: "bg-blue-50 text-blue-600",
    "Under Review": "bg-indigo-50 text-indigo-600",
  };
  return map[stage] || "bg-slate-100 text-slate-600";
}

// ---------------------------------------------------------------------------
// Panel hồ sơ ứng viên — CHỈ hiển thị khi có candidate được chọn
// ---------------------------------------------------------------------------

function CandidateDetailPanel({ candidate, onClose }) {
  const [tab, setTab] = useState("overview");

  if (!candidate) return null;

  const tabs = [
    ["overview", "Tổng quan"],
    ["resume", "Hồ sơ"],
    ["timeline", "Dòng thời gian"],
    ["notes", "Ghi chú"],
  ];

  return (
    <aside className="w-[380px] flex-shrink-0 border-l border-gray-200 bg-white h-full overflow-y-auto animate-[slideIn_0.22s_ease-out]">
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(24px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>

      {/* Header */}
      <div className="flex items-center justify-between px-5 py-[18px] border-b border-slate-100">
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            aria-label="Đóng hồ sơ"
            className="border-none bg-transparent cursor-pointer flex text-slate-700"
          ></button>
          <span className="font-bold text-[15px] text-slate-900">
            Hồ sơ ứng viên
          </span>
        </div>
        <button
          onClick={onClose}
          aria-label="Đóng"
          className="border-none bg-transparent cursor-pointer text-slate-400 flex"
        >
          <X size={18} />
        </button>
      </div>

      <div className="px-5 py-[18px]">
        {/* Identity */}
        <div className="flex gap-3 items-start">
          <img
            src={candidate.avatar}
            alt={candidate.name}
            className="w-[52px] h-[52px] rounded-[10px] object-cover"
          />
          <div>
            <div className="font-bold text-[17px] text-slate-900">
              {candidate.name}
            </div>
            <div className="text-[13.5px] text-slate-500 mt-0.5">
              {candidate.role}
            </div>
            <div className="flex gap-1.5 mt-2 flex-wrap">
              <span className="text-[11.5px] font-semibold text-slate-600 bg-slate-100 px-[9px] py-[3px] rounded-full">
                {candidate.location}
              </span>
              {candidate.tags.map((t) => (
                <span
                  key={t}
                  className="text-[11.5px] font-semibold text-slate-600 bg-slate-100 px-[9px] py-[3px] rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-[18px] mt-5 border-b border-slate-100">
          {tabs.map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`bg-none border-none cursor-pointer pb-[10px] text-[13.5px] font-semibold border-b-2 ${
                tab === key
                  ? "text-blue-600 border-blue-600"
                  : "text-slate-400 border-transparent"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "overview" && (
          <>
            <SectionLabel>Kỹ năng chính</SectionLabel>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {candidate.skills.map((s) => (
                <span
                  key={s}
                  className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-[5px] rounded-full"
                >
                  {s}
                </span>
              ))}
            </div>

            <SectionLabel className="mt-5">Xem trước hồ sơ</SectionLabel>
            <div className="mt-2 border border-gray-200 rounded-[10px] bg-slate-50 px-4 py-[22px] text-center">
              <FileText size={26} className="text-slate-500 mx-auto" />
              <div className="text-[12.5px] text-slate-600 mt-2 break-all">
                {candidate.resume}
              </div>
              <button className="border-none bg-none text-blue-600 text-[12.5px] font-semibold cursor-pointer mt-1">
                Xem trên trình duyệt
              </button>
            </div>

            <SectionLabel className="mt-5">
              Dòng thời gian hoạt động
            </SectionLabel>
            <div className="mt-2.5">
              {candidate.timeline.map((ev, i) => (
                <div key={i} className="flex gap-2.5 mb-3.5">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-2 h-2 rounded-full mt-1 ${
                        i === 0 ? "bg-blue-600" : "bg-slate-300"
                      }`}
                    />
                    {i < candidate.timeline.length - 1 && (
                      <div className="w-px flex-1 bg-slate-200 mt-0.5" />
                    )}
                  </div>
                  <div className="pb-1">
                    <div className="text-[13px] font-semibold text-slate-900">
                      {ev.title}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {ev.detail}
                    </div>
                    {ev.note && (
                      <div className="text-xs text-slate-600 bg-slate-100 rounded-md px-2 py-1.5 mt-1.5">
                        {ev.note}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2 mt-2">
              <button className="flex-1 bg-blue-600 text-white border-none rounded-lg px-3.5 py-2.5 text-[13px] font-bold cursor-pointer">
                Chuyển giai đoạn tiếp theo
              </button>
              <button className="flex-1 bg-white text-slate-900 border border-slate-200 rounded-lg px-3.5 py-2.5 text-[13px] font-bold cursor-pointer flex items-center justify-center">
                <Send size={14} className="mr-1.5" />
                Nhắn tin
              </button>
            </div>

            {/* AI insight card */}
            <div className="mt-[18px] rounded-xl overflow-hidden border border-slate-200">
              <div className="bg-blue-600 text-white px-3.5 py-2.5 flex items-center gap-2 text-[13px] font-bold">
                <Sparkles size={15} />
                Talent Intelligence AI
              </div>
              <div className="p-3.5">
                <div className="text-[11px] font-bold text-slate-400 tracking-wide">
                  DỰ ĐOÁN THÀNH CÔNG
                </div>
                <div className="text-[26px] font-extrabold text-slate-900 mt-1">
                  {candidate.successPrediction}%
                </div>
                <div className="h-1.5 bg-slate-200 rounded overflow-hidden mt-1.5">
                  <div
                    className="h-full bg-blue-600 rounded"
                    style={{ width: `${candidate.successPrediction}%` }}
                  />
                </div>
                <div className="text-[11.5px] text-slate-400 mt-1.5 italic">
                  Mức độ phù hợp cao với hiệu suất đội nhóm và yêu cầu kỹ thuật
                  cốt lõi.
                </div>

                <div className="text-[11px] font-bold text-slate-400 tracking-wide mt-4">
                  PHÂN TÍCH KHOẢNG CÁCH KỸ NĂNG
                </div>
                <div className="mt-2">
                  {candidate.skillGaps.map((g) => (
                    <div
                      key={g.name}
                      className="flex justify-between text-[13px] py-[5px]"
                    >
                      <span className="text-slate-700">{g.name}</span>
                      <span
                        className={`font-bold ${
                          g.status === "ok"
                            ? "text-emerald-600"
                            : "text-amber-600"
                        }`}
                      >
                        {g.status === "ok" ? "✓" : "!"}
                      </span>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-3 bg-blue-600 text-white border-none rounded-lg px-3.5 py-2.5 text-[13px] font-bold cursor-pointer">
                  Tạo hướng dẫn phỏng vấn
                </button>
              </div>
            </div>
          </>
        )}

        {tab === "resume" && (
          <div className="mt-4 text-[13px] text-slate-500">
            Nội dung hồ sơ chi tiết của {candidate.name} sẽ hiển thị ở đây.
          </div>
        )}
        {tab === "timeline" && (
          <div className="mt-4 text-[13px] text-slate-500">
            Toàn bộ dòng thời gian sẽ hiển thị ở đây.
          </div>
        )}
        {tab === "notes" && (
          <div className="mt-4 text-[13px] text-slate-500">
            Chưa có ghi chú nào cho {candidate.name}.
          </div>
        )}
      </div>
    </aside>
  );
}

function SectionLabel({ children, className = "" }) {
  return (
    <div
      className={`text-[11px] font-bold text-slate-400 tracking-wide ${className}`}
    >
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// App chính
// ---------------------------------------------------------------------------

export default function CandidateManagement(props) {

  CandidateManagement.propTypes = {
    onSubmit: PropTypes.func,
  };

  CandidateManagement.defaultProps = {
    onSubmit: null,
  };

  const { onSubmit } = props;
  const [SearchTerm, SetSearchTerm] = useState('');
  const TypeTimeOutRef = useRef(null);

  function HandleSearchChange(e) {
    const CallValue = e.target.value;
    SetSearchTerm(CallValue);

    console.log("giá trị input vào là: ", CallValue);
    
    if (!onSubmit) return;
    if (TypeTimeOutRef.current) {
      clearTimeout(TypeTimeOutRef.current);
    }
    TypeTimeOutRef.current = setTimeout(() => {
      const formValue = {
        SearchTerm: CallValue,
      };
      console.log("formValue:", formValue);
      onSubmit(formValue);
    }, 400);
  }

  // connect with backend to search

  const Item_per_page = 6;

  const [currentPage, setCurrentPage] = useState(1);

  const StartPage = (currentPage - 1) * Item_per_page;
  const EndPage = StartPage + Item_per_page;

  const DisplayCandidate = CANDIDATES.slice(StartPage, EndPage);
  const totalPages = Math.ceil(CANDIDATES.length / Item_per_page);

  const [selectedId, setSelectedId] = useState(null);
  const selectedCandidate = CANDIDATES.find((c) => c.id === selectedId) || null;

  const toolBtnClass =
    "flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-3.5 py-[9px] text-[12.5px] font-bold text-slate-700 cursor-pointer";

  const selectClass =
    "px-2.5 py-[9px] rounded-lg border border-slate-200 text-[13px] text-slate-700 bg-white";

  const pageBtnClass =
    "w-[26px] h-[26px] rounded-md border border-slate-200 bg-white text-xs cursor-pointer flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Danh sách ứng viên (bên trái) */}
      <main className="flex-1 overflow-auto no-scrollbar px-7 py-6">
        <div className="flex justify-between items-start flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-extrabold text-blue-600 m-0">
              Quản lý ứng viên
            </h1>
            <p className="text-[13.5px] text-slate-500 mt-1 max-w-[420px]">
              Xem xét, theo dõi và xử lý các đơn ứng tuyển hiệu quả.
            </p>
          </div>
          <div className="flex gap-2">
            <button className={toolBtnClass}>
              <Download size={14} /> Xuất file
            </button>
            <button className={toolBtnClass}>
              <Layers size={14} /> Thao tác hàng loạt
            </button>
            <button className={`${toolBtnClass} bg-slate-900 text-white`}>
              <Sparkles size={14} /> Sàng lọc AI
            </button>
            <button className={`${toolBtnClass} bg-blue-600 text-white`}>
              <RefreshCw
                size={14}
                onClick={() => {
                  window.location.reload();
                }}
              />{" "}
              Làm mới
            </button>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid gap-3 mt-[22px] [grid-template-columns:repeat(auto-fit,minmax(150px,1fr))]">
          {STAT_CARDS.map((s) => (
            <div
              key={s.label}
              className="bg-white border border-gray-200 rounded-xl px-4 py-3.5"
            >
              <div className="text-[12.5px] text-slate-500">{s.label}</div>
              <div className="text-[22px] font-extrabold text-slate-900 mt-1">
                {s.value}
              </div>
              <div
                className={`text-[11.5px] mt-1 ${
                  s.metaTone === "up" ? "text-emerald-600" : "text-slate-400"
                }`}
              >
                {s.meta}
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mt-5 flex gap-3 flex-wrap items-center">
          <div className="relative flex-[1_1_220px]">
            <Search
              size={15}
              className="absolute left-2.5 top-2.5 text-slate-400"
            />
            <input
              placeholder="Tìm kiếm ứng viên"
              className="w-full py-[9px] pl-8 pr-2.5 rounded-lg border border-slate-200 text-[13px] box-border"
              type="text"
              value={SearchTerm}
              onChange={HandleSearchChange}
            />
          </div>

          <select className={selectClass}>
            <option>Tất cả tin tuyển dụng</option>
          </select>
          <select className={selectClass}>
            <option>Tất cả vị trí</option>
          </select>
          <button className={`${toolBtnClass} px-2.5`}>Xóa</button>
          <button className={`${toolBtnClass} px-3`}>
            <SlidersHorizontal size={14} /> Lọc thêm
          </button>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-xl mt-5 overflow-hidden">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left bg-white">
                {[
                  "",
                  "ỨNG VIÊN",
                  "VỊ TRÍ ỨNG TUYỂN",
                  "NGÀY",
                  "ĐIỂM AI",
                  "GIAI ĐOẠN",
                  "NGƯỜI TUYỂN DỤNG",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-[11.5px] text-slate-500 font-bold border-b border-slate-100"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {DisplayCandidate.map((c) => {
                const isSelected = c.id === selectedId;

                return (
                  <tr
                    key={c.id}
                    onClick={() => setSelectedId(c.id)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-blue-50"
                        : "bg-transparent hover:bg-slate-50"
                    }`}
                  >
                    <td className="px-4 py-3 border-b border-slate-100">
                      <input
                        type="checkbox"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </td>

                    <td className="px-4 py-3 border-b border-slate-100">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={c.avatar}
                          alt={c.name}
                          className="w-[34px] h-[34px] rounded-full object-cover"
                        />
                        <div>
                          <div className="text-[13.5px] font-bold text-slate-900">
                            {c.name}
                          </div>
                          <div className="text-[11.5px] text-slate-400">
                            {c.email}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3 border-b border-slate-100 text-[13px] text-slate-700">
                      {c.role}
                    </td>

                    <td className="px-4 py-3 border-b border-slate-100 text-[13px] text-slate-700">
                      {c.date}
                    </td>

                    <td className="px-4 py-3 border-b border-slate-100">
                      <span
                        className={`inline-flex items-center gap-1 font-bold text-xs px-[9px] py-[3px] rounded-full ${scoreClasses(
                          c.score,
                        )}`}
                      >
                        ⚡{c.score}%
                      </span>
                    </td>

                    <td className="px-4 py-3 border-b border-slate-100">
                      <span
                        className={`font-bold text-xs px-2.5 py-[3px] rounded-full ${stageClasses(
                          c.stage,
                        )}`}
                      >
                        {c.stage === "Interviewing"
                          ? "Đang phỏng vấn"
                          : "Đang xem xét"}
                      </span>
                    </td>

                    <td className="px-4 py-3 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <img
                          src={c.recruiterAvatar}
                          alt={c.recruiter}
                          className="w-[22px] h-[22px] rounded-full"
                        />
                        <span className="text-[12.5px] text-slate-700">
                          {c.recruiter}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="flex justify-between items-center px-4 py-3">
            <span className="text-[12.5px] text-slate-400">
              {currentPage} / {totalPages}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                className={pageBtnClass}
                disabled={currentPage === 1}
                onClick={() => {
                  if (currentPage > 1) {
                    setCurrentPage(currentPage - 1);
                  }
                }}
              >
                <ChevronLeft size={14} />
              </button>
              <button
                className={pageBtnClass}
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Panel chi tiết — chỉ render khi selectedCandidate khác null */}
      <CandidateDetailPanel
        candidate={selectedCandidate}
        onClose={() => setSelectedId(null)}
      />
    </div>
  );
}
