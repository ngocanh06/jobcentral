// src/components/HeroSection.jsx
import React from "react";
import { heroImage } from "../Data/MockData.js";

export default function HeroSection() {
    return (
        <>
            <section className="relative px-5 pt-12">
                <div className="mx-auto max-w-[900px] text-center">
                    <h1 className="text-[40px] font-extrabold leading-tight tracking-[-1.5px] text-[#051a3e] md:text-[56px]">
                        Cầu Nối Sự Nghiệp{" "}
                        <span className="bg-gradient-to-r from-[#2563eb] to-[#3b82f6] bg-clip-text text-transparent">
                            Thế Hệ Mới
                        </span>
                    </h1>

                    <p className="mt-5 text-lg leading-7 text-[#434654]">
                        Tìm kiếm liền tay - Nhận ngay công việc
                        <br />
                        Hơn <span className="font-semibold text-[#2170e4]">10,000+</span>{" "}
                        nghề nghiệp đang chờ bạn ứng tuyển
                    </p>
                </div>

                <div className="relative z-10 mx-auto mt-9 flex max-w-[896px] flex-col gap-3 rounded-[28px] bg-white p-4 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.08)] md:flex-row">
                    <div className="flex flex-1 items-center border-b border-[#f3f4f6] px-3 py-2 md:border-b-0 md:border-r">
                        <span className="mr-3 text-lg text-gray-400">⌕</span>
                        <input
                            type="text"
                            placeholder="Từ khóa"
                            className="w-full bg-transparent text-sm outline-none placeholder:text-[#9ca3af]"
                        />
                    </div>

                    <div className="flex flex-1 items-center border-b border-[#f3f4f6] px-3 py-2 md:border-b-0 md:border-r">
                        <span className="mr-3 text-lg text-gray-400">▦</span>
                        <select className="w-full bg-transparent text-sm text-[#9ca3af] outline-none">
                            <option>Ngành nghề</option>
                            <option>Công nghệ</option>
                            <option>Marketing</option>
                            <option>Tài chính</option>
                            <option>Thiết kế</option>
                        </select>
                    </div>

                    <div className="flex flex-1 items-center px-3 py-2">
                        <span className="mr-3 text-lg text-gray-400">⌖</span>
                        <input
                            type="text"
                            placeholder="Địa điểm"
                            className="w-full bg-transparent text-sm outline-none placeholder:text-[#9ca3af]"
                        />
                    </div>

                    <button className="rounded-lg bg-[#2563eb] px-10 py-3 font-semibold text-white transition hover:bg-[#185fc7]">
                        Tìm kiếm
                    </button>
                </div>
            </section>

            <section className="mt-8 overflow-hidden px-4">
                <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl shadow-md">
                    <img
                        src={heroImage}
                        alt="JobCentral recruitment"
                        className="h-auto w-full object-cover max-h-[420px]"
                        onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80";
                        }}
                    />
                </div>
            </section>
        </>
    );
}