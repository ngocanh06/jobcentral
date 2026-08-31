import { useEffect, useRef, useState } from "react";
import {
  Search,
  Bell,
  Settings as SettingsIcon,
  ChevronDown,
  UserRound,
  ShieldCheck,
  LogOut,
  MonitorCog,
  BriefcaseBusiness,
  ArrowLeftRight,
} from "lucide-react";
import Typewriter from "typewriter-effect";

import { TimeOfDay } from "./GetTime";

const session = TimeOfDay();

export default function NavBar() {
  const [openMenu, setOpenMenu] = useState(null);
  const menuRef = useRef(null);

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
    { label: "Hồ sơ cá nhân", icon: UserRound },
    { label: "Dành cho ứng viên", icon: ArrowLeftRight },
    { label: "Quản lý công việc", icon: BriefcaseBusiness },
    { label: "Đăng xuất", icon: LogOut, danger: true },
  ];

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between sticky top-0 z-10">
      <div className="w-80 relative">
        <Search
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          placeholder="Tìm kiếm ứng viên, thông tin báo cáo..."
          className="w-full bg-slate-50 border border-slate-200 rounded-full pl-9 pr-4 py-2 text-sm outline-none focus:border-indigo-300"
        />
      </div>

      <div className="flex-1 flex justify-center">
        <h1
          className="
            text-lg
            sm:text-xl
            md:text-2xl
            font-semibold
            font-[Poppins]
            tracking-tight
            text-[#2170E4]
          "
        >
          <Typewriter
            options={{
              strings: [
                "Welcome back, *nhà tuyển dụng!",
                `Good ${session}!`,
                `Welcome to JobCentral`,
                "Let's make hiring easier.",
                "Ready to hire top talents?",
              ],
              autoStart: true,
              loop: true,
              cursor: "|",
              delay: 60,
              deleteSpeed: 40,
            }}
          />
        </h1>
      </div>

      <div ref={menuRef} className="w-72 flex justify-end items-center gap-3 relative">
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpenMenu(openMenu === "notifications" ? null : "notifications")}
            className="relative p-2 rounded-full hover:bg-slate-100 transition-colors"
          >
            <Bell size={18} className="text-slate-400" />
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
                  ["3 ứng viên mới", "đã ứng tuyển vào vị trí Data Analyst", "5 phút trước"],
                  ["Buổi phỏng vấn sắp diễn ra", "Bạn có 2 lịch hẹn hôm nay", "1 giờ trước"],
                  ["Cập nhật hệ thống", "Dữ liệu báo cáo đã được đồng bộ", "Hôm qua"],
                ].map(([title, desc, time], index) => (
                  <button
                    key={index}
                    type="button"
                    className="w-full flex items-start gap-3 px-3 py-2.5 text-left hover:bg-slate-50 transition-colors"
                  >
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-indigo-500" />
                    <span className="flex-1">
                      <span className="block text-sm font-medium text-slate-700">{title}</span>
                      <span className="block text-xs text-slate-500 mt-0.5">{desc}</span>
                      <span className="block text-[11px] text-slate-400 mt-1">{time}</span>
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
            onClick={() => setOpenMenu(openMenu === "settings" ? null : "settings")}
            className="p-2 rounded-full hover:bg-slate-100 transition-colors"
          >
            <SettingsIcon size={18} className="text-slate-400" />
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
            onClick={() => setOpenMenu(openMenu === "profile" ? null : "profile")}
            className="flex items-center gap-2 rounded-full px-2 py-1.5 hover:bg-slate-50 transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-sm font-semibold text-indigo-600">
              U
            </div>
            <div className="text-xs text-right leading-tight">
              <p className="font-medium text-slate-700">User</p>
              <p className="text-slate-400">MANAGER</p>
            </div>
            <ChevronDown size={14} className="text-slate-400" />
          </button>

          {openMenu === "profile" && (
            <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-slate-200 bg-white shadow-xl z-20 overflow-hidden">
              <div className="px-3 py-2 border-b border-slate-100">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Tài khoản
                </p>
              </div>

              <div className="py-1">
                {menuItems.map(({ label, icon: Icon, danger }) => (
                  <button
                    key={label}
                    type="button"
                    className={`w-full flex items-center gap-2 px-3 py-2.5 text-left text-sm hover:bg-slate-50 transition-colors ${
                      danger ? "text-rose-500" : "text-slate-700"
                    }`}
                  >
                    <Icon size={15} className={danger ? "text-rose-400" : "text-slate-400"} />
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
