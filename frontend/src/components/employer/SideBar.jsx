import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CheckCircle2,
  Calendar,
  Package,
  UserCog,
  ClipboardList,
  Bot,
  PanelLeftClose,
  PanelLeftOpen,
  UserCheck,
} from "lucide-react";

function SidebarItem({ icon: Icon, label, path, collapsed }) {
  return (
    <NavLink
      to={path}
      title={collapsed ? label : undefined}
      className={({ isActive }) =>
        `flex items-center ${
          collapsed ? "justify-center px-2" : "gap-3 px-4"
        } py-2.5 rounded-lg text-sm cursor-pointer transition-all duration-200 ${
          isActive
            ? "bg-indigo-100 text-[#2170e4] font-bold"
            : "text-slate-600 hover:bg-slate-50"
        }`
      }
    >
      <Icon size={17} strokeWidth={2} />
      {!collapsed && <span>{label}</span>}
    </NavLink>
  );
}

const navItems = [
  {
    icon: LayoutDashboard,
    label: "DashBoard",
    path: "Dashboard",
    active: true,
  },

  {
    icon: ClipboardList,
    label: "Quản lý tin tuyển dụng",
    path: "Dashboard/Quan-li-tin-tuyen-dung",
  },
  // { icon: MessageSquare, label: "Tin nhắn", path: "Dashboard/tin-nhan" },
  {
    icon: Users,
    label: "Quản lý ứng viên",
    path: "Dashboard/quan-li-ung-vien",
  },
  {
    icon: UserCheck,
    label: "Tra cứu ứng viên",
    path: "Dashboard/Hint-Ung-Vien",
  },
  { icon: Calendar, label: "Lịch phỏng vấn", path: "Dashboard/lich-phong-van" },
  { icon: CheckCircle2, label: "Truth Score", path: "Dashboard/Truth-Score" },
  { icon: Bot, label: "ChatBox", path: "Dashboard/ChatBox" },
  { icon: Package, label: "Gói dịch vụ", path: "Dashboard/goi-dich-vu" },
  {
    icon: UserCog,
    label: "Quản lý tài khoản",
    path: "Dashboard/quan-li-tai-khoan",
  },
];

export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside
        className={`${
          collapsed ? "w-16" : "w-[290px]"
        } bg-white border-r border-slate-200 flex flex-col shrink-0 transition-all duration-200`}
      >
        <div
          className={`flex items-start ${
            collapsed ? "justify-center px-2" : "justify-between px-5"
          } py-5`}
        >
          {!collapsed && (
            <div className="flex">
              <div className="space-y-2">
                <img src="/picture/pic_default.jpg" alt="" className="w-10 h-10 rounded-full" />
                <p className="text-base font-bold tracking-tight text-slate-800">
                  Tên:{" "}
                  <span className="font-semibold">User</span>
                </p>
                <p className="text-sm font-medium text-slate-600">
                  Hạng thành viên:{" "}
                  <span className="font-bold tracking-wide text-amber-600">
                    VIP
                  </span>
                </p>

                <p className="text-xs font-medium tracking-wide text-slate-400">
                  ID: <span className="text-slate-500">12345</span>
                </p>
              </div>
            </div>
          )}
          <button
            type="button"
            onClick={() => setCollapsed((current) => !current)}
            aria-label={collapsed ? "Mở rộng thanh bên" : "Thu gọn thanh bên"}
            title={collapsed ? "Mở rộng thanh bên" : "Thu gọn thanh bên"}
            className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors"
          >
            {collapsed ? (
              <PanelLeftOpen size={18} />
            ) : (
              <PanelLeftClose size={18} />
            )}
          </button>
        </div>

        <nav className="flex-1 px-2 space-y-0.5">
          {navItems.map((item) => (
            <SidebarItem key={item.label} {...item} collapsed={collapsed} />
          ))}
        </nav>
      </aside>
    </div>
  );
}
