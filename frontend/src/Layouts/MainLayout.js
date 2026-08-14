// src/layouts/MainLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

export default function MainLayout() {
    return (
        <div className="min-h-screen w-full bg-[#faf9ff] text-[#0d1c2f] pt-[80px]">
            <Navbar />
            <main>
                {/* Nội dung của trang tương ứng sẽ được nhúng vào đây */}
                <Outlet />
            </main>
        </div>
    );
}