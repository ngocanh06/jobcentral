// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import DashBoard from "./pages/public/Dashboard";
import ChiTietViecLam from "./pages/public/ChiTietViecLam";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Khung giao diện chính chứa Navbar */}
        <Route path="/" element={<MainLayout />}>
          {/* Trang chủ - Đường dẫn: / */}
          <Route index element={<DashBoard />} />

          {/* Trang chi tiết việc làm - Đường dẫn động: /jobs/1, /jobs/2,... */}
          <Route path="jobs/:id" element={<ChiTietViecLam />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}