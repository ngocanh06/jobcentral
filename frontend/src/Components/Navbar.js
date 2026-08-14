// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const navItems = [
    "Việc Làm",
    "Công ty",
    "Đánh giá",
    "Tin tức",
    "Hồ sơ và tạo cv",
];

export default function Navbar() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#c3c6d6] bg-white/90 backdrop-blur-md">
            <div className="flex h-[80px] w-full items-center px-6 lg:px-10">
                <Link to="/" className="text-[24px] font-extrabold tracking-[-1px] text-[#2170e4]">
                    JobCentral
                </Link>

                <nav className="mx-auto hidden items-center gap-8 lg:flex">
                    {navItems.map((item, index) => (
                        <Link
                            key={item}
                            to={index === 0 ? "/" : "#"}
                            className={`flex h-[80px] items-center text-[15px] ${index === 0
                                ? "border-b-2 border-[#2170e4] font-bold text-[#2170e4]"
                                : "text-[#434654] hover:text-[#2170e4]"
                                }`}
                        >
                            {item}
                        </Link>
                    ))}
                </nav>

                <div className="hidden gap-3 sm:flex">
                    <button className="rounded-full bg-[#2170e4] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#185fc7]">
                        Đăng nhập
                    </button>
                    <button className="rounded-full border border-[#2170e4] bg-white px-7 py-3 text-sm font-semibold text-[#2170e4] transition hover:bg-blue-50">
                        Đăng ký
                    </button>
                </div>
            </div>
        </header>
    );
}