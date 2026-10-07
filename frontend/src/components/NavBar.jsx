import { useEffect, useRef, useState } from "react";
import {
  Bell,
  Settings as SettingsIcon,
  ChevronDown,
  UserRound,
  ShieldCheck,
  LogOut,
  ShoppingCart,
  MonitorCog,
  BriefcaseBusiness,
  User,
  info,
  ArrowLeftRight,
  Search,
  Mail,
  Info,
  Cog,
  SquarePen,
} from "lucide-react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";

import { href, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

export default function NavBar() {
  const [openMenu, setOpenMenu] = useState(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { label: "Hồ sơ cá nhân", icon: UserRound, href: "" },
    { label: "Dành cho ứng viên", icon: ArrowLeftRight },
    { label: "Quản lý công việc", icon: BriefcaseBusiness },
    { label: "Đăng xuất", icon: LogOut, danger: true },
  ];

  const links = [
    {
      icon: <SquarePen />,
      label: "Tạo tin tuyển dụng",
      href: "/Dashboard/Tao-tin-tuyen-dung",
    },
    { icon: <Search />, label: "Tra cứu CV", href: "/Dashboard/Hint-Ung-Vien" },
    { icon: <Mail />, label: "Tin Nhắn", href: "Dashboard/tin-nhan" },
    { icon: <Info />, label: "Gợi ý", href: "#product" },
  ];

  return (
    <header className="bg-[#212f3f] border-b border-[#354456] py-3 flex items-center justify-end sticky top-0 z-10">
      <nav className="hidden items-center gap-7 text-sm font-medium text-white lg:flex">
        {links.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className="flex items-center gap-2 bg-[#354456] rounded-full px-4 py-2.5 text-gray-300 transition-all duration-200 hover:bg-[#354470] hover:text-white"
          >
            <span className="flex items-center">{link.icon}</span>
            <span>{link.label}</span>
          </Link>
        ))}

        <div className="group relative">
          <button
            type="button"
            aria-haspopup="true"
            className="flex items-center gap-2 bg-[#354456] rounded-full px-4 py-2.5 text-gray-300 transition-all duration-200 hover:bg-[#354470] hover:text-white"
          >
            <span className="group inline-flex">
              <Cog className="transition-transform duration-700 group-hover:rotate-180" />
            </span>
            {"Công cụ"}
            <span className="text-xs text-white">▼</span>
          </button>
          <div className="invisible absolute left-0 top-full z-50 mt-2 w-64 translate-y-1 rounded-xl border border-slate-200 bg-white p-1.5 text-sm opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
            <Link
              to="/Truth-Score"
              className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-600"
            >
              {t("utilities.truthScore")}
            </Link>

            <Link
              to="/Goi-dich-vu"
              className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-600"
            >
              {t("utilities.servicePlans")}
            </Link>

            <Link
              // to={/BoTinhLuong}
              className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-600"
            >
              {t("utilities.Calculator_salary")}
            </Link>

            <Link
              // to={/BoTinhLuong}
              className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-600"
            >
              {t("utilities.Personal_IncomeTax")}
            </Link>

            <Link
              // to={/BoTinhLuong}
              className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-600"
            >
              {t("utilities.industry_specific_base_salary")}
            </Link>
          </div>
        </div>
      </nav>

      <div
        ref={menuRef}
        className="w-60 flex justify-end items-center gap-3 relative"
      >
        <div className="relative">
          <button
            type="button"
            onClick={() =>
              setOpenMenu(openMenu === "notifications" ? null : "notifications")
            }
            className="flex items-center gap-2 bg-[#354456] rounded-full px-4 py-2.5 transition-all duration-200 hover:bg-[#354470] hover:text-white"
          >
            <Bell size={18} className="text-white" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border-2 border-white" />
          </button>

          {openMenu === "notifications" && (
            <div className="absolute right-0 top-full mt-2 w-72 rounded-xl border border-slate-200 bg-white shadow-xl z-20 overflow-hidden">
              <div className="px-3 py-2 border-b border-slate-100">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Thông báo
                </p>
              </div>

              <div className="py-1">
                {[
                  [
                    "3 ứng viên mới",
                    "đã ứng tuyển vào vị trí Data Analyst",
                    "5 phút trước",
                  ],
                  [
                    "Buổi phỏng vấn sắp diễn ra",
                    "Bạn có 2 lịch hẹn hôm nay",
                    "1 giờ trước",
                  ],
                  [
                    "Cập nhật hệ thống",
                    "Dữ liệu báo cáo đã được đồng bộ",
                    "Hôm qua",
                  ],
                ].map(([title, desc, time], index) => (
                  <button
                    key={index}
                    type="button"
                    className="w-full flex items-start gap-3 px-3 py-2.5 text-left hover:bg-slate-50 transition-colors"
                  >
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-indigo-500" />
                    <span className="flex-1">
                      <span className="block text-sm font-medium text-slate-700">
                        {title}
                      </span>
                      <span className="block text-xs text-slate-500 mt-0.5">
                        {desc}
                      </span>
                      <span className="block text-[11px] text-slate-400 mt-1">
                        {time}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() =>
              setOpenMenu(openMenu === "settings" ? null : "settings")
            }
            className="flex items-center gap-2 bg-[#354456] rounded-full px-4 py-2.5 text-gray-300 transition-all duration-200 hover:bg-[#354470] hover:text-white"
          >
            <ShoppingCart size={18} className="text-[#fff]" />
          </button>

          {openMenu === "settings" && (
            <div className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-slate-200 bg-white shadow-xl z-20 overflow-hidden">
              <button
                type="button"
                className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
              >
                <MonitorCog size={15} className="text-slate-400" />
                Cài đặt chung
              </button>
              <button
                type="button"
                className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
              >
                <ShieldCheck size={15} className="text-slate-400" />
                Bảo mật
              </button>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() =>
              setOpenMenu(openMenu === "profile" ? null : "profile")
            }
            className="mr-1 flex items-center gap-2 bg-[#354456] rounded-full px-4 py-2.5 text-gray-300 transition-all duration-200 hover:bg-[#354470] hover:text-white"
          >
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-sm font-semibold text-indigo-600">
              U
            </div>
            <div className="text-xs text-right leading-tight"></div>
            <ChevronDown size={14} className="text-[#fff]" />
          </button>

          {openMenu === "profile" && (
            <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-slate-200 bg-white shadow-xl z-20 overflow-hidden">
              <div className="px-3 py-2 border-b border-slate-100">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Tài khoản
                </p>
              </div>

              <div className="py-1">
                {menuItems.map(({ label, icon: Icon, danger, href }) => (
                  <button
                    key={label}
                    type="button"
                    className={`w-full flex items-center gap-2 px-3 py-2.5 text-left text-sm hover:bg-slate-50 transition-colors ${
                      danger ? "text-rose-500" : "text-slate-700"
                    }`}
                    onClick={() => {
                      setOpenMenu(null);
                      if (danger) {
                        logout();
                        navigate("/");
                      } else if (href) {
                        navigate(href);
                      }
                    }}
                  >
                    <Icon
                      size={15}
                      className={danger ? "text-rose-400" : "text-slate-400"}
                    />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
