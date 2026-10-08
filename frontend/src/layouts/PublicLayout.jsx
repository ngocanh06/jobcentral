import { Home } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

function PublicHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:px-6">
      <nav
        aria-label="Điều hướng cẩm nang"
        className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-slate-600"
      >
        <Link
          to="/"
          aria-label="Trang chủ"
          className="inline-flex items-center justify-center rounded-lg p-2 text-slate-600 transition-all duration-200 hover:scale-110 hover:bg-blue-50 hover:text-blue-600 active:scale-95"
        >
          <Home className="h-5 w-5" />
        </Link>
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
    </header>
  );
}

export default function PublicLayout() {
  return (
    <>
      <PublicHeader />
      <Outlet />
    </>
  );
}