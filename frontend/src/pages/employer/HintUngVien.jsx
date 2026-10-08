import { useState, useEffect } from "react";
import {
  Search,
  SlidersHorizontal,
  Briefcase,
  MapPin,
  CalendarDays,
  UserCheck,
  Award,
  ChevronDown,
  ArrowRight,
  WandSparkles,
  Clock,
  Phone,
  Wallet,
  CalendarClock,
  MousePointerClick,
  Users,
  Plus,
  Check,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { addManagedCandidate, getManagedCandidates } from "../../candidateStorage";

const profileFilters = [
  {
    label: "Nội dung hồ sơ",
    type: "input",
    placeholder: "Nhập từ khóa (Kỹ năng, chức vụ, trường học, công ty cũ...)",
    icon: Search,
  },
  {
    label: "Ngành nghề chuyên môn",
    type: "select",
    value: "Tất cả ngành nghề",
    icon: Briefcase,
  },
  {
    label: "Địa điểm làm việc",
    type: "select",
    value: "Tất cả địa điểm",
    icon: MapPin,
    iconClass: "text-red-500",
  },
  {
    label: "Ngày truy cập / cập nhật hồ sơ",
    type: "select",
    value: "Tất cả hồ sơ",
    icon: CalendarDays,
  },
  {
    label: "Trạng thái tìm việc",
    type: "select",
    value: "Tất cả trạng thái",
    icon: UserCheck,
  },
  {
    label: "Số năm kinh nghiệm",
    type: "select",
    value: "Tất cả kinh nghiệm",
    icon: Award,
  },
];

const partTimeFilters = [
  {
    label: "Công việc",
    type: "input",
    placeholder: "Nhập vị trí cần tuyển (Phục vụ, gia sư, bán hàng...)",
    icon: Briefcase,
  },
  {
    label: "Khoảng thời gian làm việc",
    type: "select",
    value: "Tất cả khung giờ",
    icon: Clock,
  },
  {
    label: "Địa điểm làm việc",
    type: "select",
    value: "Tất cả địa điểm",
    icon: MapPin,
    iconClass: "text-red-500",
  },
  {
    label: "Ca làm việc mong muốn",
    type: "select",
    value: "Tất cả ca làm",
    icon: CalendarClock,
  },
  {
    label: "Số điện thoại",
    type: "input",
    inputType: "tel",
    placeholder: "Nhập số điện thoại liên hệ",
    icon: Phone,
  },
  {
    label: "Mức lương mong muốn",
    type: "select",
    value: "Tất cả mức lương",
    icon: Wallet,
  },
];

const categories = [
  {
    name: "Công việc bán thời gian",
    items: [
      "Phục vụ và pha chế (F&B)",
      "Bán hàng và trực kênh online",
      "TGia sư và trợ giảng",
      "Cộng tác viên viết bài, thiết kế",
      "Chăm sóc thú cưng / trẻ nhỏ",
    ],
  },
  {
    name: "Bán hàng / Tiếp thị",
    items: [
      "Bán hàng / Kinh doanh",
      "Tiếp thị / Marketing",
      "Bán lẻ / Bán sỉ",
      "Tiếp thị trực tuyến (Digital)",
      "Thương mại điện tử (E-Commerce)",
      "Bán Hàng Kỹ Thuật (Technical Sales)",
    ],
  },
  {
    name: "Hành chính / Nhân sự",
    items: [
      "Hành chính / Thư ký",
      "Nhân sự (HR & Tuyển dụng)",
      "Quản lí điều hành (Executive)",
      "Biên phiên dịch / Ngoại ngữ",
      "Đào tạo nội bộ & Phát triển văn hoá",
    ],
  },
  {
    name: "CNTT / Phần mềm",
    items: [
      "Phát triển phần mềm (Software Dev)",
      "Kiểm thử phần mềm QA/QC Tester",
      "Quản trị hệ thống / DevOps / Cloud",
      "Dữ liệu lớn / Trí tuệ nhân tạo (AI/Data)",
    ],
  },
  {
    name: "Hàng tiêu dùng (FMCG)",
    items: [
      "Thực phẩm & Đồ uống (F&B)",
      "Hàng gia dụng / Chăm sóc cá nhân",
      "Kênh phân phối MT/GT",
    ],
  },
  {
    name: "Giáo dục / Đào tạo",
    items: [
      "Giáo dục / Đào tạo / Giảng dạy",
      "Giảng viên / Gia sư chuyên môn",
      "Thư viện / Lưu trữ thông tin",
    ],
  },
  {
    name: "Khách sạn / Du lịch",
    items: [
      "Nhà hàng / Khách sạn / Hospitality",
      "Du lịch / Điều hành tour",
      "Hàng không / Vé máy bay",
    ],
  },
  {
    name: "Chăm sóc sức khỏe",
    items: ["Dược phẩm / Hóa mỹ phẩm", "Y tế / Bác sĩ / Điều dưỡng"],
  },
  {
    name: "Kỹ thuật / Sản xuất",
    items: [
      "Cơ khí / Ô tô / Tự động hóa",
      "Điện / Điện tử / Viễn thông",
      "Quản lý chất lượng (QA/QC)",
    ],
  },
];

const extraCategories = [
  {
    name: "Xây dựng / Bất động sản",
    items: [
      "Kỹ sư xây dựng / Kiến trúc sư",
      "Giám sát công trình / Dự toán",
      "Môi giới / Tư vấn bất động sản",
      "Nội thất / Thiết kế không gian",
    ],
  },
  {
    name: "Vận tải / Logistics",
    items: [
      "Kho vận / Chuỗi cung ứng",
      "Xuất nhập khẩu / Hải quan",
      "Tài xế / Giao nhận",
      "Mua hàng / Điều phối vận tải",
    ],
  },
  {
    name: "Truyền thông / Sáng tạo",
    items: [
      "Thiết kế đồ họa / UI-UX",
      "Biên tập / Content / Copywriter",
      "Báo chí / Truyền hình / PR",
      "Sản xuất video / Nhiếp ảnh",
    ],
  },
  {
    name: "Tài chính / Ngân hàng",
    items: [
      "Kế toán / Kiểm toán",
      "Ngân hàng / Tín dụng / Chứng khoán",
      "Đầu tư tài chính / M&A",
    ],
  },
  {
    name: "Pháp lý / Bảo hiểm",
    items: [
      "Luật sư / Pháp chế doanh nghiệp",
      "Tư vấn bảo hiểm",
      "Thẩm định / Giám định bồi thường",
    ],
  },
  {
    name: "Dịch vụ khách hàng",
    items: [
      "Chăm sóc khách hàng / Tổng đài",
      "Hỗ trợ kỹ thuật (Helpdesk)",
      "Quản lý trải nghiệm khách hàng",
    ],
  },
  {
    name: "Năng lượng / Môi trường",
    items: [
      "Dầu khí / Năng lượng tái tạo",
      "Xử lý nước / Môi trường",
      "An toàn lao động (HSE)",
    ],
  },
  {
    name: "Nông nghiệp / Thực phẩm",
    items: [
      "Nông nghiệp / Thủy sản",
      "Công nghệ thực phẩm",
      "Thú y / Chăn nuôi",
    ],
  },
  {
    name: "Khoa học / Nghiên cứu",
    items: [
      "Nghiên cứu & Phát triển (R&D)",
      "Phòng thí nghiệm / Kiểm nghiệm",
      "Công nghệ sinh học",
    ],
  },
];

const candidateDataByIndustry = Object.fromEntries(
  [...categories, ...extraCategories].flatMap((category) =>
    category.items.map((industry) => [industry, []]),
  ),
);

// ĐẶT DỮ LIỆU TẠI ĐÂY: thêm hồ sơ vào mảng của ngành tương ứng.

// dataDemo
candidateDataByIndustry["Bán hàng / Kinh doanh"].push({
  id: 1,
  industry: "Sales",
  candidateName: "Kiệt",
  experience: "1 năm",
  location: "đà nẵng",
  desiredSalary: "300$",
  lastAccessed: "1 day",
  email: "ktv",
  skills: "quickly",
});

// Trả về số cột theo kích thước màn hình: 1 (mobile), 2 (tablet), 3 (desktop)
function useColumnCount() {
  const get = () =>
    typeof window === "undefined"
      ? 3
      : window.innerWidth >= 1024
        ? 3
        : window.innerWidth >= 768
          ? 2
          : 1;
  const [count, setCount] = useState(get);
  useEffect(() => {
    const onResize = () => setCount(get());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return count;
}

function FilterField({
  label,
  type,
  inputType = "text",
  placeholder,
  value,
  icon: Icon,
  iconClass = "text-slate-400",
}) {
  return (
    <div>
      <label className="mb-2 block text-[11px] font-bold uppercase tracking-wide text-slate-600">
        {label}
      </label>
      <div className="relative">
        <Icon
          className={`pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${iconClass}`}
        />
        {type === "input" ? (
          <input
            type={inputType}
            placeholder={placeholder}
            className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-3 text-xs text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        ) : (
          <>
            <select className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-8 text-xs text-slate-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100">
              <option>{value}</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </>
        )}
      </div>
    </div>
  );
}

function CategoryGroup({
  name,
  items,
  candidateCount,
  selectedIndustry,
  candidateCountInIndustry,
  onSelectIndustry,
}) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between border-b-2 border-blue-500 pb-2">
        <h3 className="text-[13px] font-extrabold uppercase text-slate-900">
          {name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600">
            {candidateCount} CV
          </span>
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Thu gọn" : "Mở rộng"}
            aria-expanded={open}
            className="flex h-6 w-6 items-center justify-center rounded bg-blue-50 text-blue-600 hover:bg-blue-100"
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform ${open ? "" : "-rotate-90"}`}
            />
          </button>
        </div>
      </div>
      {open && (
        <ul className="mt-3 space-y-2.5">
          {items.map((item) => (
            <li
              key={item}
              className="flex items-center justify-between pl-2 text-xs text-slate-600"
            >
              <button
                type="button"
                onClick={() =>
                  onSelectIndustry(selectedIndustry === item ? null : item)
                }
                aria-pressed={selectedIndustry === item}
                className={`flex-1 py-1 text-left ${selectedIndustry === item ? "font-bold text-blue-700" : "hover:text-blue-700"}`}
              >
                {item}
              </button>
              <span className="min-w-[28px] rounded bg-blue-50 px-2 py-1 text-center text-[11px] font-bold text-blue-700">
                {candidateCountInIndustry(item)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function CandidateSearchPage() {
  const [showAll, setShowAll] = useState(false);
  const [activeTab, setActiveTab] = useState("profile"); // "profile" | "parttime"
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const [managedCandidateIds, setManagedCandidateIds] = useState(
    () => new Set(getManagedCandidates().map((candidate) => candidate.id)),
  );
  const navigate = useNavigate();
  const columnCount = useColumnCount();
  const visibleCategories = showAll
    ? [...categories, ...extraCategories]
    : categories;
  const activeFilters =
    activeTab === "profile" ? profileFilters : partTimeFilters;
  const selectedProfiles = selectedIndustry
    ? candidateDataByIndustry[selectedIndustry] || []
    : [];

  function handleAddCandidate(profile) {
    const wasAdded = addManagedCandidate({
      id: profile.id,
      name: profile.candidateName,
      email: profile.email,
      role: profile.industry,
      location: profile.location,
      desiredSalary: profile.desiredSalary,
      industry: profile.industry,
      tags: [profile.category],
      date: profile.lastAccessed,
      score: 85,
      stage: "Under Review",
      recruiter: "JobCentral",
      skills: profile.skills,
      resume: "Chưa cập nhật CV",
      successPrediction: 85,
      skillGaps: [],
      timeline: [],
    });

    if (wasAdded) {
      setManagedCandidateIds((ids) => new Set([...ids, profile.id]));
      navigate("/quan-li-ung-vien");
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Header */}
      <header className="bg-white px-6 pb-8 pt-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-extrabold tracking-tight text-[#2170e4]">
            Tra Cứu &amp; Tìm Kiếm Hồ Sơ Ứng Viên Hàng Đầu
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-500">
            Hơn 5M+ hồ sơ ứng viên chất lượng cao, xác thực kinh nghiệm, học vấn
            và được cập nhật hoạt động liên tục mỗi ngày trên mạng lưới
            JobCentral.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 lg:px-8">
        {/* Search card */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="h-5 w-1.5 rounded-full bg-blue-600" />
              <h2 className="text-sm font-extrabold uppercase text-slate-900">
                {activeTab === "profile"
                  ? "Từ khóa tìm kiếm hồ sơ"
                  : "Tuyển Dụng Part Time"}
              </h2>
            </div>

            {/* Tab chuyển đổi giữa Tìm hồ sơ và Tuyển dụng PartTime */}
            <div className="flex gap-1 rounded-lg bg-slate-100 p-1">
              <button
                onClick={() => setActiveTab("profile")}
                aria-pressed={activeTab === "profile"}
                className={`flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-xs font-bold transition-colors ${
                  activeTab === "profile"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <Search className="h-3.5 w-3.5" />
                Tìm Hồ Sơ
              </button>
            </div>
          </div>
                



{/* 
<button
                onClick={() => setActiveTab("parttime")}
                aria-pressed={activeTab === "parttime"}
                className={`flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-xs font-bold transition-colors ${
                  activeTab === "parttime"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                <Users className="h-3.5 w-3.5" />
                Tuyển Dụng PartTime
              </button> */}





          <div className="grid gap-x-6 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
            {activeFilters.map((f) => (
              <FilterField key={f.label} {...f} />
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-6">
            <button className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-700 hover:bg-slate-50">
              <SlidersHorizontal className="h-4 w-4 text-blue-600" />
              Tìm kiếm nâng cao
            </button>
            <button className="flex h-10 items-center gap-2 rounded-lg bg-blue-600 px-6 text-xs font-bold text-white shadow-sm hover:bg-blue-700">
              <Search className="h-4 w-4" />
              {activeTab === "profile"
                ? "Tìm Kiếm Hồ Sơ"
                : "Tìm Ứng Viên PartTime"}
            </button>
          </div>
        </section>

        {/* banner */}
        <div className="relative overflow-hidden bg-sky-50 border border-sky-100 rounded-xl p-6 flex items-center justify-between gap-6">
          {/* Các hạt sáng nhỏ bay lên */}
          {[...Array(30)].map((_, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-[#2170e4]/40"
              style={{
                width: `${5 + (i % 3) * 2}px`,
                height: `${5 + (i % 3) * 2}px`,
                left: `${(i * 8.3) % 100}%`,
                bottom: "-10px",
                animation: `rise ${4 + (i % 4)}s linear infinite`,
                animationDelay: `${i * 0.4}s`,
              }}
            />
          ))}

          <div>
            <span className="inline-block rounded border border-amber-400/40 bg-amber-400/10 px-2 py-0.5 text-[15px] font-bold uppercase ext-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Tính năng AI mới đột phá
            </span>
            <h3 className="mt-1.5 text-xl font-bold text-[#2170e4]">
              Tuyển Dụng Thành Thơi Cùng HIRA AI Smart Matching
            </h3>
            <p className="mt-1 max-w-2xl text-base leading-relaxed text-slate-900">
              Chỉ cần tải lên Bảng mô tả công việc (Job Description), trợ lý
              HIRA AI sẽ quét hơn 5.000.000+ Hồ sơ và gợi ý chính xác 98% danh
              sách ứng viên phù hợp chỉ sau 30 giây.
            </p>
          </div>

          <Link to={""} className="relative z-10">
            <button className="bg-[#2170e4] text-white text-sm font-medium px-4 py-2.5 rounded-lg flex items-center gap-2 whitespace-nowrap">
              <MousePointerClick size={15} /> Tìm hiểu ngay
            </button>
          </Link>

          <style>{`
    @keyframes rise {
      0% { transform: translateY(0) scale(1); opacity: 0; }
      10% { opacity: 1; }
      100% { transform: translateY(-140px) scale(0.5); opacity: 0; }
    }
  `}</style>
        </div>

        {/* Category distribution */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="h-5 w-1.5 rounded-full bg-blue-600" />
            <h2 className="text-xl font-extrabold text-slate-900">
              Phân Bố Số Lượng Hồ Sơ Theo Ngành Nghề
            </h2>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Bấm chọn chuyên ngành chi tiết để lọc và tiếp cận ứng viên mục tiêu
            nhanh chóng
          </p>

          {/* Mỗi cột là một dải độc lập: mở một nhóm chỉ đẩy các nhóm bên dưới trong cùng cột */}
          <div className="mt-8 flex items-start gap-x-8">
            {Array.from({ length: columnCount }, (_, col) => (
              <div key={col} className="flex min-w-0 flex-1 flex-col gap-4">
                {visibleCategories
                  .filter((_, i) => i % columnCount === col)
                  .map((c) => (
                    <CategoryGroup
                      key={c.name}
                      {...c}
                      candidateCount={c.items.reduce(
                        (total, industry) =>
                          total +
                          // tóng số lượng ứng viên của cả ngành
                          (candidateDataByIndustry[industry]?.length || 0),
                        0,
                      )}
                      selectedIndustry={selectedIndustry}
                      // số lượng ứng viên trong từng nghề ( cụ thể )
                      candidateCountInIndustry={(industry) =>
                        candidateDataByIndustry[industry]?.length || 0
                      }
                      onSelectIndustry={setSelectedIndustry}
                    />
                  ))}
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center border-t border-slate-100 pt-6">
            <button
              onClick={() => setShowAll(!showAll)}
              aria-expanded={showAll}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-6 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
            >
              {showAll
                ? "Thu Gọn Danh Sách Ngành Nghề"
                : "Xem Toàn Bộ 70+ Ngành Nghề & Nhóm Kỹ Năng"}
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${showAll ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        </section>

        {selectedIndustry && (
          <section
            className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
            aria-live="polite"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-6 py-5">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">
                  Hồ sơ ngành: {selectedIndustry}
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Hồ sơ mẫu phù hợp với chuyên ngành đã chọn
                </p>
              </div>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                {selectedProfiles.length} hồ sơ
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-xs">
                <caption className="sr-only">
                  Hồ sơ ứng viên mẫu theo ngành đã chọn
                </caption>
                <thead className="bg-slate-50 text-[10px] uppercase tracking-wide text-slate-500">
                  <tr>
                    <th scope="col" className="px-6 py-3 font-bold">
                      Ứng viên
                    </th>
                    <th scope="col" className="px-6 py-3 font-bold">
                      Kinh nghiệm
                    </th>
                    <th scope="col" className="px-6 py-3 font-bold">
                      Nơi làm việc
                    </th>
                    <th scope="col" className="px-6 py-3 font-bold">
                      Lương mong muốn
                    </th>
                    <th scope="col" className="px-6 py-3 font-bold">
                      Ngày truy cập
                    </th>
                    <th scope="col" className="px-6 py-3 text-center font-bold">
                      Thêm
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {selectedProfiles.map((profile) => {
                    const isManaged = managedCandidateIds.has(profile.id);

                    return (
                      <tr key={profile.id}>
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="font-bold text-slate-900">
                            {profile.candidateName}
                          </div>
                          <div className="mt-1 text-[10px] text-slate-500">
                            {profile.industry}
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                          {profile.experience}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                          {profile.location}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                          {profile.desiredSalary}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-slate-600">
                          {profile.lastAccessed}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            type="button"
                            onClick={() => handleAddCandidate(profile)}
                            disabled={isManaged}
                            aria-label={
                              isManaged
                                ? `Đã thêm ${profile.candidateName}`
                                : `Thêm ${profile.candidateName} vào quản lý ứng viên`
                            }
                            title={
                              isManaged
                                ? "Đã có trong Quản lý ứng viên"
                                : "Thêm vào Quản lý ứng viên"
                            }
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-emerald-600"
                          >
                            {isManaged ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <Plus className="h-4 w-4" />
                            )}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                  {selectedProfiles.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-8 text-center text-slate-500"
                      >
                        Chưa có hồ sơ cho ngành nghề này.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
