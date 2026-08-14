// src/components/TopCompanies.jsx
import React, { useState } from "react";
import { companies } from "../Data/MockData.js";

const categories = [
    "Tất cả",
    "Công nghệ",
    "Tài chính",
    "Bất động sản",
    "Y tế",
    "Giáo dục",
    "Thương mại điện tử",
];

export default function TopCompanies() {
    const [activeIndustry, setActiveIndustry] = useState("Tất cả");
    const [companyIndex, setCompanyIndex] = useState(1);

    const currentCompany = companies[companyIndex];
    const prevIndex = (companyIndex - 1 + companies.length) % companies.length;
    const nextIndex = (companyIndex + 1) % companies.length;

    const nextCompany = () => setCompanyIndex(nextIndex);
    const previousCompany = () => setCompanyIndex(prevIndex);

    return (
        <section className="w-full px-6 pb-24 lg:px-10 xl:px-16">
            <h2 className="text-center text-[30px] font-bold">
                Kết Nối Với Những Công Ty{" "}
                <span className="text-[#2170e4]">Hàng Đầu</span>
            </h2>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
                {categories.map((item) => (
                    <button
                        key={item}
                        onClick={() => setActiveIndustry(item)}
                        className={`rounded-full px-5 py-2 text-sm transition ${activeIndustry === item
                            ? "bg-[#2170e4] text-white"
                            : "bg-[#f3f3f6] text-[#434655] hover:bg-blue-50"
                            }`}
                    >
                        {item}
                    </button>
                ))}
            </div>

            <div className="relative mt-16 flex items-center justify-center gap-8">
                <button
                    onClick={previousCompany}
                    className="absolute left-0 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#2170e4] shadow-lg"
                >
                    ←
                </button>

                {/* Card bên trái */}
                <div className="hidden h-[400px] w-[260px] scale-90 flex-col items-center justify-center rounded-xl bg-[#e8ecf4]/40 opacity-60 shadow-sm md:flex">
                    <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-white text-2xl shadow">
                        ◈
                    </div>
                    <h3 className="mt-5 text-lg">{companies[prevIndex].name}</h3>
                    <p className="mt-3 text-sm text-gray-500">
                        {companies[prevIndex].category}
                    </p>
                    <span className="mt-5 rounded-full bg-white px-4 py-2 text-xs text-[#2170e4]">
                        {companies[prevIndex].jobs}
                    </span>
                </div>

                {/* Card trung tâm */}
                <div className="relative flex h-[480px] w-full max-w-[448px] flex-col items-center justify-between overflow-hidden rounded-2xl border-2 border-[#ffcc00] bg-[#2170e4] p-10 text-center shadow-xl">
                    <div className="absolute right-5 top-5 rounded-full bg-white/20 px-3 py-2 text-xs text-white">
                        ★
                    </div>

                    <div className="flex flex-1 flex-col items-center justify-center">
                        <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-white text-3xl shadow-xl">
                            ◈
                        </div>
                        <h3 className="mt-8 text-base font-medium leading-6 text-white">
                            {currentCompany.name}
                        </h3>
                        <p className="mt-2 text-sm text-white/80">
                            {currentCompany.category}
                        </p>
                    </div>

                    <div className="w-full space-y-4">
                        <button className="w-full rounded-xl bg-[#ffcc00] py-4 text-sm font-medium text-black shadow-lg transition hover:bg-yellow-300">
                            {currentCompany.jobs}
                        </button>

                        <button className="w-full rounded-xl border border-white/30 bg-white/10 py-3.5 text-sm text-white backdrop-blur transition hover:bg-white/20">
                            ♡ &nbsp; Theo dõi công ty
                        </button>
                    </div>
                </div>

                {/* Card bên phải */}
                <div className="hidden h-[400px] w-[260px] scale-90 flex-col items-center justify-center rounded-xl bg-[#e8ecf4]/40 opacity-60 shadow-sm md:flex">
                    <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-white text-2xl shadow">
                        ◈
                    </div>
                    <h3 className="mt-5 text-lg">{companies[nextIndex].name}</h3>
                    <p className="mt-3 text-sm text-gray-500">
                        {companies[nextIndex].category}
                    </p>
                    <span className="mt-5 rounded-full bg-white px-4 py-2 text-xs text-[#2170e4]">
                        {companies[nextIndex].jobs}
                    </span>
                </div>

                <button
                    onClick={nextCompany}
                    className="absolute right-0 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#2170e4] shadow-lg"
                >
                    →
                </button>
            </div>
        </section>
    );
}