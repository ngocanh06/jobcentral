import React from "react";
import {
  Search,
  ChevronDown,
  ArrowRight,
  Scale,
  Users,
  ClipboardList,
  Gift,
  Building2,
  Bot,
  Clock,
  Mail,
  FileText,
  FileSpreadsheet,
  FileCheck2,
  CheckSquare,
  Download,
  Shield,
  Check,
  Home,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

/* -------------------------------------------------------------------- */
/*  Mock content — stands in for real CMS data                          */
/* -------------------------------------------------------------------- */

const topicCategories = [
  {
    icon: Scale,
    tag: "48 bài viết",
    title: "Luật Lao Động & Pháp Lý B2B",
    desc: "Cập nhật quy định pháp luật lao động mới nhất, hợp đồng thử việc, xử lý kỷ luật và các rủi ro pháp lý doanh nghiệp cần nắm.",
    img: "picture/picture-handbook1.avif",
  },
  {
    icon: Users,
    tag: "36 bài viết",
    title: "Thu Hút & Săn Đầu Người (Talent Acquisition)",
    desc: "Chiến lược Headhunting, xây dựng kênh nguồn ứng viên chất lượng và tối ưu chi phí tuyển dụng cho từng vị trí.",
    img: "picture/picture-handbook1.avif",
  },
  {
    icon: ClipboardList,
    tag: "52 bài viết",
    title: "Quy Trình Tuyển Dụng & Phỏng Vấn",
    desc: "Bộ khung quy trình chuẩn từ sàng lọc hồ sơ, phỏng vấn hành vi đến ra quyết định, giúp rút ngắn thời gian tuyển dụng.",
    img: "picture/picture-handbook1.avif",
  },
  {
    icon: Gift,
    tag: "29 bài viết",
    title: "Đãi Ngộ & Lương Thưởng (C&B Insights)",
    desc: "Khảo sát mức lương thị trường, xây dựng thang bảng lương 3P và chính sách phúc lợi giữ chân nhân tài.",
    img: "picture/picture-handbook1.avif",
  },
  {
    icon: Building2,
    tag: "31 bài viết",
    title: "Văn Hóa Doanh Nghiệp & EVP",
    desc: "Xây dựng thương hiệu tuyển dụng, giá trị đề xuất cho nhân viên và văn hóa gắn kết trong tổ chức.",
    img: "picture/picture-handbook1.avif",
  },
  {
    icon: Bot,
    tag: "24 bài viết",
    title: "Ứng Dụng AI & Chuyển Đổi Số HR",
    desc: "Ứng dụng AI vào sàng lọc CV, chatbot tuyển dụng và tự động hóa quy trình vận hành nhân sự hiện đại.",
    img: "picture/picture-handbook1.avif",
  },
];

const sideArticles = [
  {
    tag: "TUYỂN DỤNG HIỆN ĐẠI",
    time: "7 phút đọc",
    date: "12/01/2025",
    title:
      "Tổng hợp 50+ Bộ câu hỏi phỏng vấn theo phương pháp STAR cho các vị trí then chốt",
  },
  {
    tag: "C&B / LƯƠNG THƯỞNG",
    time: "9 phút đọc",
    date: "09/01/2025",
    title:
      "Hướng dẫn chi tiết xây dựng khung năng lực và thang bảng lương chuẩn Nghị định mới",
  },
  {
    tag: "ĐÃI NGỘ & EVP",
    time: "6 phút đọc",
    date: "05/01/2025",
    title:
      "Bí quyết giữ chân nhân sự Gen Z và ứng dụng hiệu quả mô hình phúc lợi linh hoạt (EVP)",
  },
];

const resources = [
  {
    icon: FileText,
    ext: "WORD / PDF",
    size: "1.2 MB",
    title: "Bộ Mẫu JD (Mô tả công việc) chuẩn hóa 100+ ngành nghề",
    desc: "Bộ mô tả công việc chi tiết, IT Marketing, Sales HR và các vị trí quản lý cấp cao đầy đủ.",
    ctaBg: "bg-blue-600 hover:bg-blue-700",
    cta: "Tải Mẫu JD",
  },
  {
    icon: FileSpreadsheet,
    ext: "EXCEL (.XLSL)",
    size: "0.9 MB",
    title: "Template Excel tính ngân sách tuyển dụng & Cost-per-Hire 2025",
    desc: "Bảng tính chi phí tuyển dụng tự động, giúp HR kiểm soát ngân sách theo từng kênh tuyển.",
    ctaBg: "bg-emerald-600 hover:bg-emerald-700",
    cta: "Tải Tệp Excel",
  },
  {
    icon: FileCheck2,
    ext: "DOCX & PDF",
    size: "2.4 MB",
    title: "Biểu mẫu đánh giá thử việc & biên bản phỏng vấn",
    desc: "Trọn bộ biểu mẫu chuẩn hóa quy trình đánh giá nhân sự thử việc và lưu trữ hồ sơ tuyển dụng.",
    ctaBg: "bg-blue-600 hover:bg-blue-700",
    cta: "Tải Bộ Biểu Mẫu",
  },
  {
    icon: CheckSquare,
    ext: "FULL TOOLKIT",
    size: "1.5 MB",
    title: "Cẩm nang Onboarding nhân viên mới 30-60-90 ngày",
    desc: "Checklist chi tiết theo từng mốc thời gian, giúp nhân sự mới hội nhập nhanh và hiệu quả.",
    ctaBg: "bg-blue-600 hover:bg-blue-700",
    cta: "Tải Trọn Bộ Onboarding",
  },
];

const stats = [
  { value: "120+", label: "Biểu mẫu miễn phí" },
  { value: "350+", label: "Bài phân tích chuyên sâu" },
  { value: "25K+", label: "Nhà quản lý & HR theo dõi" },
  { value: "99.4%", label: "Đánh giá tích cực từ độc giả" },
];

const practiceGroups = [
  {
    title: "Kỹ Năng Sourcing Ứng Viên",
    link: "Xem tất cả chuyên mục Sourcing",
    items: [
      {
        title:
          "Cách khai thác Boolean Search để tìm ứng viên IT ẩn trên LinkedIn, Google",
        time: "5 phút đọc",
      },
      {
        title:
          "Xây dựng Talent Pool: 7 kênh nguồn ứng viên thụ động hiệu quả nhất 2025",
        time: "6 phút đọc",
      },
    ],
  },
  {
    title: "Đàm Phán Lương & Offer",
    link: "Xem tất cả chuyên mục Đàm Phán",
    items: [
      {
        title:
          "Nghệ thuật xử lý Offer Letter khi ứng viên mang thư mời từ đối thủ",
        time: "6 phút đọc",
      },
      {
        title:
          "Mẫu thư mời nhận việc (Offer Letter) chuẩn pháp lý và đầy đủ điều khoản",
        time: "4 phút đọc",
      },
    ],
  },
  {
    title: "Đào Tạo & Phát Triển (L&D)",
    link: "Xem tất cả chuyên mục Đào Tạo",
    items: [
      {
        title:
          "Xây dựng lộ trình đào tạo hội nhập cho nhân viên mới từ 30-60-90",
        time: "5 phút đọc",
      },
      {
        title:
          "Mô hình 9-Box Talent Review: xác định nhân sự kế cận đúng người",
        time: "7 phút đọc",
      },
    ],
  },
  {
    title: "Đánh Giá Hiệu Suất (Performance)",
    link: "Xem tất cả chuyên mục Đánh Giá",
    items: [
      {
        title:
          "Phương pháp phản hồi 360 độ: triển khai đúng cách tránh sai lệch",
        time: "6 phút đọc",
      },
      {
        title:
          "KPI hay OKR? So sánh 2 khung đánh giá hiệu suất phổ biến nhất hiện nay",
        time: "5 phút đọc",
      },
    ],
  },
];

/* -------------------------------------------------------------------- */
/*  Small building blocks                                               */
/* -------------------------------------------------------------------- */

function Header() {
  const NaviGate = useNavigate();
  return (
    <header className="border-b border-slate-200 bg-white px-6 py-3 flex items-center justify-center gap-4">
      <nav className="hidden lg:flex items-center gap-6 text-sm text-slate-600 font-medium">
        <a className="text-blue-600" href="#top">
          <Link
            to={"/"}
            className="inline-flex items-center justify-center rounded-lg p-2
             text-slate-600 transition-all duration-200
             hover:bg-blue-50 hover:text-blue-600
             hover:scale-110 active:scale-95"
          >
            <Home className="h-5 w-5" />
          </Link>
        </a>
        <a className="text-blue-600" href="#top">
          Cẩm Nang Tuyển Dụng 2026
        </a>
        <a className="hover:text-slate-900" href="#topics">
          Chuyên Mục Kiến Thức
        </a>
        <a className="hover:text-slate-900" href="#resources">
          Mẫu Biểu &amp; Công Cụ
        </a>
        <a className="hover:text-slate-900" href="#practice">
          Thực Hành Nhân Sự
        </a>
      </nav>
      {/* 
      <button className="hidden sm:inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition-colors whitespace-nowrap">
        Đăng Ký Nhận Bản Tin HR
      </button> */}
    </header>
  );
}

function HeroSearch() {
  return (
    <section
      id="top"
      className="bg-gradient-to-b from-blue-50 to-white px-6 py-14 text-center"
    >
      <p className="text-xs font-semibold tracking-wide text-blue-600 mb-3">
        BỘ TRI THỨC &amp; QUẢN TRỊ NGUỒN NHÂN LỰC TỪ A ĐẾN Z
      </p>
      <h1 className="text-3xl sm:text-4xl md:text-[2.6rem] font-bold text-slate-900 leading-tight max-w-3xl mx-auto">
        Cẩm Nang Tuyển Dụng &amp;{" "}
        <span className="text-blue-600">Quản Trị Nhân Tài</span> Toàn Diện
      </h1>
      <p className="mt-4 text-sm text-slate-500 max-w-xl mx-auto">
        Kho tri thức, quy chuẩn pháp lý và biểu mẫu chuyên sâu cho nhà tuyển
        dụng — nơi hàng ngàn HR Leader Việt Nam tin dùng và tra cứu mỗi ngày.
      </p>

      <div className="mt-7 mx-auto max-w-2xl bg-white rounded-xl shadow-sm border border-slate-200 p-2 flex flex-col sm:flex-row items-stretch gap-2">
        <div className="flex-1 flex items-center gap-2 px-3 py-2 text-sm text-slate-400">
          <Search className="h-4 w-4 shrink-0" />
          <span className="truncate">
            Tìm kiếm bài viết tuyển dụng, biểu mẫu JD, chính sách...
          </span>
        </div>
        <button className="flex items-center justify-center gap-1 px-3 py-2 text-sm text-slate-500 border-t sm:border-t-0 sm:border-l border-slate-200">
          Tất cả danh mục <ChevronDown className="h-3.5 w-3.5" />
        </button>
        <button className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition-colors">
          Tìm Kiếm
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-xs text-slate-400">
        <span>Từ khóa nổi bật:</span>
        <a className="hover:text-blue-600" href="#topics">
          Luật Lao Động mới nhất
        </a>
        <a className="hover:text-blue-600" href="#resources">
          Mẫu hợp đồng thử việc
        </a>
        <a className="hover:text-blue-600" href="#resources">
          Chiến lược Sourcing
        </a>
        <a className="hover:text-blue-600" href="#resources">
          Mẫu đánh giá KPI/OKR
        </a>
      </div>
    </section>
  );
}

function TopicCard({ icon: Icon, tag, title, desc, img }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 hover:shadow-md hover:border-blue-200 transition-all">
      <img src={img} alt="pic" className="w-full h-48 rounded-lg mb-5" />
      {/* <div className="flex items-center justify-between mb-4">
        <div className="h-9 w-9 rounded-lg bg-blue-50 flex items-center justify-center">
          <Icon className="h-4.5 w-4.5 text-blue-600" />
        </div>
        <span className="flex items-center gap-1 text-[11px] text-slate-400">
          <Clock className="h-3 w-3" /> {tag}
        </span>
      </div> */}
      <h3 className="font-semibold text-slate-900 text-[15px] leading-snug mb-2">
        {title}
      </h3>
      <p className="text-[13px] text-slate-500 leading-relaxed mb-4">{desc}</p>
      <a
        href="#topics"
        className="inline-flex items-center gap-1 text-[13px] font-semibold text-blue-600 hover:text-blue-700"
      >
        Khám phá chủ đề <ArrowRight className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}

function TopicsSection() {
  return (
    <section id="topics" className="px-6 py-16 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
        <div>
          <p className="text-xs font-semibold text-blue-600 mb-1.5">
            CẤU TRÚC KIẾN THỨC CHUYÊN SÂU
          </p>
          <h2 className="text-2xl font-bold text-slate-900">
            Chuyên Mục Cẩm Nang Trọng Điểm
          </h2>
        </div>
        <p className="text-sm text-slate-500 max-w-sm">
          Hệ thống hóa toàn bộ kiến thức vận hành nhân sự — từ pháp lý cơ bản
          đến chiến lược quản trị nhân tài cấp cao.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {topicCategories.map((t) => (
          <TopicCard key={t.title} {...t} />
        ))}
      </div>
    </section>
  );
}

function FeaturedArticles() {
  return (
    <section className="px-6 py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-semibold text-blue-600 mb-1.5">
              TUYỂN DỤNG TINH HOA
            </p>
            <h2 className="text-2xl font-bold text-slate-900">
              Bài Viết Tiêu Điểm &amp; Đọc Nhiều Nhất
            </h2>
          </div>
          <a
            href="#topics"
            className="hidden sm:inline text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            Xem tất cả bài viết
          </a>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Featured big card */}
          <div className="lg:col-span-3 rounded-2xl overflow-hidden border border-slate-200 bg-white">
            <img
              src="picture/picture-handbook.jpg"
              alt="pic"
              className="relative w-full h-90 sm:h-67 rounded-2xl flex items-end p-2"
            />
            <h3 className="text-black text-xl sm:text-2xl px-5 py-1 font-bold leading-snug max-w-lg">
              Bộ Quy Chuẩn Quản Trị Tuyển Dụng 2026: Thích Ứng Thay Đổi Pháp Lý
              &amp; Tối Ưu Phí Sourcing Với AI
            </h3>
            <div className="p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 min-w-0">
                <img
                  src="picture/Logo_JobCentral.png"
                  alt="pic"
                  className="h-8 w-8 rounded-full bg-slate-200 shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">
                    Ban Chuyên Gia HR Jobcentral
                  </p>
                  <p className="text-xs text-slate-400">
                    Cập nhật 09/09/2026 · 8 phút đọc
                  </p>
                </div>
              </div>
              <button className="shrink-0 rounded-md bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700">
                Đọc Bài Viết
              </button>
            </div>
          </div>

          {/* Side list */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {sideArticles.map((a) => (
              <div
                key={a.title}
                className="flex-1 rounded-xl border border-slate-200 bg-white p-4"
              >
                <p className="text-[11px] font-semibold text-blue-600 mb-1.5">
                  {a.tag} · {a.time}
                </p>
                <h4 className="text-sm font-semibold text-slate-900 leading-snug mb-2">
                  {a.title}
                </h4>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    Cập nhật {a.date}
                  </span>
                  <a
                    href="#topics"
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Đọc thêm
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ResourceCard({ icon: Icon, ext, size, title, desc, ctaBg, cta }) {
  return (
    <div className="rounded-xl bg-white p-5 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
          <Icon className="h-5 w-5 text-blue-600" />
        </div>
        <span className="text-[11px] font-medium text-slate-400">
          {ext} · {size}
        </span>
      </div>
      <h3 className="text-sm font-semibold text-slate-900 leading-snug mb-2">
        {title}
      </h3>
      <p className="text-[13px] text-slate-500 leading-relaxed mb-5 flex-1">
        {desc}
      </p>
      <button
        className={`inline-flex items-center justify-center gap-1.5 rounded-md ${ctaBg} px-3 py-2 text-xs font-semibold text-white transition-colors`}
      >
        <Download className="h-3.5 w-3.5" /> {cta}
      </button>
    </div>
  );
}

function ResourcesSection() {
  return (
    <section id="resources" className="px-6 py-16 bg-blue-600">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
          <div>
            <p className="text-xs font-semibold text-blue-200 mb-1.5">
              TÀI NGUYÊN THIẾT THỰC
            </p>
            <h2 className="text-2xl font-bold text-white">
              Kho Biểu Mẫu &amp; Bộ Công Cụ Tuyển Dụng Chuẩn Hóa
            </h2>
          </div>
          <p className="text-sm text-blue-100 max-w-sm">
            Đã được hơn 45.000 nhà tuyển dụng và HR Manager tải xuống.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {resources.map((r) => (
            <ResourceCard key={r.title} {...r} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  return (
    <section className="px-6 py-12 bg-white border-b border-slate-100">
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="text-3xl font-bold text-blue-600">{s.value}</p>
            <p className="text-xs text-slate-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function PracticeGroup({ title, link, items }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <h3 className="text-sm font-semibold text-slate-900 mb-4">{title}</h3>
      <div className="space-y-4">
        {items.map((it) => (
          <div
            key={it.title}
            className="border-b border-slate-100 pb-4 last:border-0 last:pb-0"
          >
            <p className="text-sm text-slate-700 leading-snug mb-1.5">
              {it.title}
            </p>
            <span className="text-xs text-slate-400">{it.time}</span>
          </div>
        ))}
      </div>
      <a
        href="#practice"
        className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
      >
        {link} <ArrowRight className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}

function PracticeSection() {
  return (
    <section id="practice" className="px-6 py-16 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-8">
        <div>
          <p className="text-xs font-semibold text-blue-600 mb-1.5">
            PHẦN MỀM THAO TÁC CÔNG VIỆC
          </p>
          <h2 className="text-2xl font-bold text-slate-900">
            Tra Cứu Theo Chuyên Mục Thực Hành
          </h2>
        </div>
        <p className="text-sm text-slate-500 max-w-sm">
          Các bài viết chọn lọc theo từng khâu công việc quan trọng của nhà quản
          lý nhân sự.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {practiceGroups.map((g) => (
          <PracticeGroup key={g.title} {...g} />
        ))}
      </div>
    </section>
  );
}

function ComplianceBanner() {
  return (
    <section className="px-6 py-8">
      <div className="max-w-6xl mx-auto rounded-xl border border-blue-100 bg-blue-50 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <Shield className="h-8 w-8 text-blue-600 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-slate-900">
              Điều Chỉnh Mức Đóng Bảo Hiểm &amp; Tiền Lương Tối Thiểu Vùng:
              Checklist Bắt Buộc Cho Doanh Nghiệp
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              Cập nhật mới nhất theo quy định pháp luật hiện hành — tránh rủi ro
              xử phạt hành chính.
            </p>
          </div>
        </div>
        <button className="shrink-0 inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-blue-700 whitespace-nowrap">
          <FileCheck2 className="h-3.5 w-3.5" /> Tải Checklist PDF
        </button>
      </div>
    </section>
  );
}

function Newsletter() {
  return (
    <section className="px-6 py-16">
      <div className="max-w-4xl mx-auto rounded-2xl bg-gradient-to-br from-blue-700 to-blue-600 px-6 sm:px-12 py-12 text-center">
        <div className="mx-auto h-11 w-11 rounded-full bg-white/10 flex items-center justify-center mb-4">
          <Mail className="h-5 w-5 text-white" />
        </div>
        <p className="text-xs font-semibold text-blue-200 mb-2">
          ĐỒNG HÀNH CÙNG 45.000+ LÀM NGHỀ NHÂN SỰ
        </p>
        <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug max-w-lg mx-auto">
          Nhận Bản Tin HR Weekly — Cập Nhật Sớm Nhất Xu Hướng &amp; Pháp Lý Mỗi
          Sáng Thứ Hai
        </h2>
        <p className="text-sm text-blue-100 mt-3 max-w-md mx-auto">
          Gói kiến thức tinh gọn dành riêng cho nhà tuyển dụng, 1 email mỗi
          tuần, giải pháp thực tiễn ngay khi vấn đề vừa phát sinh.
        </p>

        <form
          className="mt-6 mx-auto max-w-md flex flex-col sm:flex-row gap-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Nhập địa chỉ email doanh nghiệp của bạn"
            className="flex-1 rounded-md px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none"
          />
          <button className="rounded-md bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 whitespace-nowrap">
            Đăng Ký Ngay
          </button>
        </form>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-xs text-blue-200">
          <span className="flex items-center gap-1">
            <Check className="h-3.5 w-3.5" /> Không spam email
          </span>
          <span className="flex items-center gap-1">
            <Check className="h-3.5 w-3.5" /> Hủy đăng ký bất kỳ lúc nào
          </span>
          <span className="flex items-center gap-1">
            <Check className="h-3.5 w-3.5" /> Bảo mật thông tin tuyệt đối
          </span>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-6 py-6 border-t border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <span>
          JobCentral — Trung Tâm Tri Thức &amp; Cẩm Nang Quản Trị Nhân Tài
        </span>
        <div className="flex items-center gap-4">
          <a className="hover:text-slate-600" href="#top">
            Điều khoản sử dụng
          </a>
          <a className="hover:text-slate-600" href="#top">
            Chính sách bảo mật
          </a>
          <a className="hover:text-slate-600" href="#top">
            Góp ý cải thiện nội dung
          </a>
          <a className="hover:text-slate-600" href="#top">
            Liên hệ Ban Biên Tập
          </a>
        </div>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------- */
/*  Page                                                                 */
/* -------------------------------------------------------------------- */

export default function RecruitmentGuidePage() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <Header />
      <HeroSearch />
      <TopicsSection />
      <FeaturedArticles />
      <ResourcesSection />
      <StatsBar />
      <PracticeSection />
      <ComplianceBanner />
      <Newsletter />
      <Footer />
    </div>
  );
}
