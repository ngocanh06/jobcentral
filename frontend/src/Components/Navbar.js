// src/Components/Navbar.js
import React from "react";
import { NavLink, Link } from "react-router-dom";

const navItems = [
    {
        label: "Việc Làm",
        path: "/",
    },
    {
        label: "Công ty",
        path: "/companies",
    },
    {
        label: "Đánh giá",
        path: "/reviews",
    },
    {
        label: "Tin tức",
        path: "/news",
    },
    {
        label: "Hồ sơ và tạo cv",
        path: "/profile",
    },
];

export default function Navbar() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#c3c6d6] bg-white/90 backdrop-blur-md">
            <div className="flex h-[80px] w-full items-center px-6 lg:px-10">

                {/* Logo */}
                <Link
                    to="/"
                    className="text-[24px] font-extrabold tracking-[-1px] text-[#2170e4]"
                >
                    JobCentral
                </Link>

                {/* Navigation */}
                <nav className="mx-auto hidden items-center gap-8 lg:flex">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.label}
                            to={item.path}
                            end={item.path === "/"}
                            className={({ isActive }) =>
                                `flex h-[80px] items-center border-b-2 text-[15px] font-medium transition ${isActive
                                    ? "border-[#2170e4] font-bold text-[#2170e4]"
                                    : "border-transparent text-[#434654] hover:text-[#2170e4]"
                                }`
                            }
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                {/* Buttons */}
                <div className="hidden gap-3 sm:flex">
                    <button className="rounded-full bg-[#2170e4] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#185fc7] shadow-sm">
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