// src/Components/CongTy.js (Industries)
import React from "react";
import { industries } from "../Data/MockData.js";

export default function Industries() {
    return (
        <section className="w-full px-6 py-14 lg:px-10 xl:px-16">
            <div className="text-center">
                <h2 className="text-[30px] font-bold text-[#0d1c2f]">
                    Việc Làm Theo <span className="text-[#2170e4]">Ngành Nghề</span>
                </h2>
                <p className="mt-3 text-[#434654]">
                    Khám phá các lĩnh vực đang bùng nổ trong kỷ nguyên số.
                </p>
            </div>

            <div className="mt-9 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                {industries.map((industry, index) => (
                    <button
                        key={industry.name}
                        className="group flex h-[154px] flex-col items-center justify-center gap-4 rounded-2xl border border-[#e9edff] bg-white shadow-[0_4px_6px_rgba(0,61,155,0.04)] transition hover:-translate-y-1 hover:shadow-lg hover:border-[#2170e4]"
                    >
                        <div
                            className={`flex h-16 w-16 items-center justify-center rounded-full text-xl ${index % 2 === 0
                                ? "bg-[rgba(0,82,204,0.1)] text-[#2170e4]"
                                : "bg-[rgba(253,139,0,0.1)] text-orange-500"
                                }`}
                        >
                            {industry.icon}
                        </div>

                        <span className="text-sm font-bold text-[#051a3e] group-hover:text-[#2170e4]">
                            {industry.name}
                        </span>
                    </button>
                ))}
            </div>
        </section>
    );
}