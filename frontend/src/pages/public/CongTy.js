import React, { useState } from "react";
import { Link } from "react-router-dom";

// ============================================================
// ASSETS & FALLBACKS
// ============================================================

const heroImage =
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80";

const companyLogo =
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80";

const jobs = [
    {
        id: 1,
        title: "Senior UI/UX Designer",
        type: "Full-time",
        salary: "$1,500 - $2,500",
        location: "TP. Hồ Chí Minh",
        posted: "2 ngày trước",
    },
    {
        id: 2,
        title: "Frontend Developer (ReactJS)",
        type: "Remote",
        salary: "$2,000 - $3,500",
        location: "Toàn quốc",
        posted: "Vừa đăng",
    },
    {
        id: 3,
        title: "Project Manager (Fintech)",
        type: "Full-time",
        salary: "Thỏa thuận",
        location: "TP. Hồ Chí Minh",
        posted: "5 ngày trước",
    },
    {
        id: 4,
        title: "Product Marketing Lead",
        type: "Hybrid",
        salary: "$2,500+",
        location: "TP. Hồ Chí Minh",
        posted: "1 tuần trước",
    },
];

const galleryImages = [
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80",
];

// ============================================================
// SMALL COMPONENTS
// ============================================================

function JobCard({ job }) {
    const [saved, setSaved] = useState(false);

    return (
        <article className="rounded-2xl border border-[#e2e8f0] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            {/* Top */}
            <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eff4ff] text-xl font-bold text-[#2170e4]">
                    ◈
                </div>

                <button
                    type="button"
                    onClick={() => setSaved((value) => !value)}
                    className="rounded-full p-2 text-xl transition hover:bg-gray-100"
                    aria-label="Lưu việc làm"
                >
                    <span className={saved ? "text-red-500" : "text-gray-400"}>
                        {saved ? "♥" : "♡"}
                    </span>
                </button>
            </div>

            {/* Title */}
            <div className="mt-4">
                <h3 className="text-base font-bold text-[#0d1c2f]">
                    {job.title}
                </h3>

                <p className="mt-1 text-sm text-[#434655]">
                    TechFlow Solutions
                </p>
            </div>

            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-[#eff4ff] px-2.5 py-1 text-xs font-semibold text-[#2170e4]">
                    {job.type}
                </span>

                <span className="rounded-full bg-[#f1f5f9] px-2.5 py-1 text-xs font-medium text-[#475569]">
                    {job.salary}
                </span>

                <span className="rounded-full bg-[#fee2e2] px-2.5 py-1 text-xs font-medium text-[#dc2626]">
                    {job.location}
                </span>
            </div>

            {/* Bottom */}
            <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                <span className="text-xs text-[#64748b]">
                    {job.posted}
                </span>

                <Link
                    to={`/jobs/${job.id}`}
                    className="rounded-lg bg-[#2170e4] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#185fc7]"
                >
                    Ứng tuyển
                </Link>
            </div>
        </article>
    );
}

function GalleryCard() {
    return (
        <aside className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="text-base font-bold text-[#0d1c2f]">
                Hoạt động công ty
            </h3>

            <div className="mt-5 grid grid-cols-2 gap-3">
                {galleryImages.map((image, index) => (
                    <div
                        key={index}
                        className="h-[105px] overflow-hidden rounded-xl bg-gray-100 shadow-sm"
                    >
                        <img
                            src={image}
                            alt={`Hoạt động ${index + 1}`}
                            className="h-full w-full object-cover transition hover:scale-105 duration-300"
                        />
                    </div>
                ))}
            </div>

            <button
                type="button"
                className="mt-5 w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-[#434655] transition hover:bg-gray-50"
            >
                Xem tất cả hình ảnh (18)
            </button>
        </aside>
    );
}

function StatisticsCard() {
    return (
        <aside className="rounded-2xl bg-[#2170e4] p-6 text-white shadow-md">
            <h3 className="text-base font-bold">
                Số liệu ấn tượng
            </h3>

            <div className="mt-6 space-y-4">
                <div>
                    <div className="text-3xl font-extrabold">95%</div>
                    <p className="text-xs text-blue-100 mt-1">
                        Tỷ lệ nhân viên hài lòng
                    </p>
                </div>

                <div className="h-px bg-white/20" />

                <div>
                    <div className="text-3xl font-extrabold">12+</div>
                    <p className="text-xs text-blue-100 mt-1">
                        Quốc gia đang hoạt động
                    </p>
                </div>

                <div className="h-px bg-white/20" />

                <div>
                    <div className="text-3xl font-extrabold">25%</div>
                    <p className="text-xs text-blue-100 mt-1">
                        Tăng trưởng hàng năm
                    </p>
                </div>
            </div>
        </aside>
    );
}

function ShareCard() {
    return (
        <aside className="rounded-2xl border border-[#dbe1ff] bg-[#eff4ff] p-6 shadow-sm">
            <h3 className="text-base font-bold text-[#0d1c2f]">
                Chia sẻ hồ sơ công ty
            </h3>

            <p className="mt-2 text-sm text-[#434655] leading-relaxed">
                Lan tỏa cơ hội nghề nghiệp tại TechFlow đến bạn bè của bạn.
            </p>

            <div className="mt-4 flex gap-3">
                <button
                    type="button"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition hover:scale-105 text-[#2170e4] font-bold"
                    aria-label="Facebook"
                >
                    f
                </button>
                <button
                    type="button"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition hover:scale-105 text-[#2170e4] font-bold"
                    aria-label="LinkedIn"
                >
                    in
                </button>
                <button
                    type="button"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition hover:scale-105 text-[#2170e4] font-bold"
                    aria-label="Email"
                >
                    ✉
                </button>
            </div>
        </aside>
    );
}

// ============================================================
// COMPANY HERO
// ============================================================

function CompanyHero() {
    return (
        <section className="overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100">
            {/* Cover */}
            <div className="relative h-[240px] md:h-[300px]">
                <img
                    src={heroImage}
                    alt="TechFlow Solutions cover"
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </div>

            {/* Company info */}
            <div className="relative -mt-14 flex flex-col gap-6 px-6 pb-8 md:flex-row md:items-end md:justify-between md:px-10">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-end">
                    {/* Logo */}
                    <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-white p-2 shadow-lg">
                        <img
                            src={companyLogo}
                            alt="TechFlow Solutions"
                            className="h-full w-full rounded-xl object-cover"
                        />
                    </div>

                    {/* Details */}
                    <div className="pb-1">
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0d1c2f]">
                            TechFlow Solutions
                        </h1>

                        <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#434655]">
                            <div className="flex items-center gap-1.5">
                                <span className="text-[#2170e4]">⌘</span>
                                <span>Công nghệ phần mềm</span>
                            </div>

                            <div className="flex items-center gap-1.5">
                                <span className="text-[#2170e4]">⌖</span>
                                <span>TP. Hồ Chí Minh</span>
                            </div>

                            <div className="flex items-center gap-1.5">
                                <span className="text-[#2170e4]">👥</span>
                                <span>500+ Nhân viên</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        className="flex items-center gap-2 rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-[#2170e4] transition hover:bg-blue-50"
                    >
                        <span>♡</span> Theo dõi
                    </button>

                    <a
                        href="https://techflow.example.com"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 rounded-xl bg-[#2170e4] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#185fc7] shadow-sm"
                    >
                        <span>🌐</span> Website
                    </a>
                </div>
            </div>
        </section>
    );
}

// ============================================================
// TABS
// ============================================================

function CompanyTabs({ activeTab, setActiveTab }) {
    const tabs = [
        { id: "overview", label: "Tổng quan" },
        { id: "jobs", label: "Tuyển dụng (12)" },
        { id: "reviews", label: "Đánh giá (4.8 ★)" },
    ];

    return (
        <div className="border-b border-gray-200">
            <div className="flex gap-8 overflow-x-auto">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        type="button"
                        onClick={() => setActiveTab(tab.id)}
                        className={`shrink-0 border-b-2 pb-4 text-sm font-semibold transition ${activeTab === tab.id
                                ? "border-[#2170e4] text-[#2170e4]"
                                : "border-transparent text-gray-500 hover:text-gray-900"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

// ============================================================
// ABOUT
// ============================================================

function AboutCompany() {
    return (
        <article className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl font-bold text-[#0d1c2f]">
                Về chúng tôi
            </h2>

            <div className="mt-4 space-y-4 text-sm sm:text-base leading-relaxed text-[#434655]">
                <p>
                    TechFlow Solutions là đơn vị hàng đầu trong việc cung cấp các giải pháp công nghệ đột phá cho thị trường Fintech và E-commerce toàn cầu. Được thành lập từ năm 2015, chúng tôi tự hào xây dựng một môi trường làm việc sáng tạo, nơi các tài năng công nghệ có thể phát triển tối đa tiềm năng bản thân.
                </p>

                <p>
                    Với sứ mệnh "Nâng tầm trải nghiệm số", TechFlow không ngừng đầu tư vào các công nghệ mới nhất như AI, Cloud Native và Microservices để mang đến những giá trị thực chất cho khách hàng và cộng đồng.
                </p>
            </div>
        </article>
    );
}

// ============================================================
// JOBS
// ============================================================

function OpenPositions() {
    return (
        <section>
            <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-[#0d1c2f]">
                        Vị trí đang tuyển dụng
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">Cơ hội làm việc tại môi trường chuyên nghiệp chuẩn quốc tế</p>
                </div>

                <button
                    type="button"
                    className="text-sm font-semibold text-[#2170e4] hover:underline"
                >
                    Xem tất cả 12 vị trí →
                </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
                {jobs.map((job) => (
                    <JobCard key={job.id} job={job} />
                ))}
            </div>
        </section>
    );
}

// ============================================================
// MAIN PAGE COMPONENT
// ============================================================

export default function CongTy() {
    const [activeTab, setActiveTab] = useState("overview");

    return (
        <div className="min-h-screen bg-[#faf9ff] py-8 text-[#0d1c2f]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Hero */}
                <CompanyHero />

                {/* Tabs */}
                <div className="mt-8">
                    <CompanyTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>

                {/* Main content */}
                <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">
                    {/* Left Column */}
                    <div className="space-y-8">
                        <AboutCompany />
                        <OpenPositions />
                    </div>

                    {/* Right Column */}
                    <aside className="space-y-8">
                        <GalleryCard />
                        <StatisticsCard />
                        <ShareCard />
                    </aside>
                </div>
            </div>
        </div>
    );
}