// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./Layouts/MainLayout";
import DashBoard from "./pages/public/Dashboard";
import ChiTietViecLam from "./pages/public/ChiTietViecLam";
import CongTy from "./pages/public/CongTy";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout chính chứa Navbar */}
        <Route path="/" element={<MainLayout />}>
          {/* Trang chủ */}
          <Route index element={<DashBoard />} />

          {/* Chi tiết việc làm */}
          <Route path="jobs/:id" element={<ChiTietViecLam />} />

          {/* Trang công ty */}
          <Route path="companies" element={<CongTy />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}