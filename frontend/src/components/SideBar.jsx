import { NavLink, Outlet } from "react-router-dom";
import {
  Settings,
  HelpCircle,
  LayoutDashboard,
  Users,
  FileText,
  CheckCircle2,
  Calendar,
  Mail,
  MessageSquare,
  Package,
  UserCog,
  ClipboardList,
} from "lucide-react";

function SidebarItem({ icon: Icon, label, path }) {
  return (
    <NavLink
      to={path}
      className={({ Isactive }) =>
        `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm cursor-pointer transition-colors ${
          Isactive
            ? "bg-indigo-50 text-[#2170E4] font-medium"
            : "text-slate-600 hover:bg-slate-50"
        }`
      }
    >
      <Icon size={17} strokeWidth={2} />
      <span>{label}</span>
    </NavLink>
  );
}

const navItems = [
  {
    icon: LayoutDashboard,
    label: "DashBoard",
    path: "dashboard",
    active: true,
  },

  {
    icon: ClipboardList,
    label: "Quản lý đăng tuyển",
    path: "/quan-li-tin-tuyen-dung",
  },

  { icon: Users, label: "Quản lý ứng viên", path: "/quan-li-ung-vien" },
  { icon: FileText, label: "Báo cáo tuyển dụng", path: "/bao-cao-tuyen-dung" },
  { icon: CheckCircle2, label: "Truth Score", path: "/Truth-Score" },
  { icon: Calendar, label: "Lịch phỏng vấn", path: "/lich-phong-van" },
  { icon: Mail, label: "Email mẫu", path: "/Email-mau" },
  { icon: MessageSquare, label: "Tin nhắn", path: "/tin-nhan" },
  { icon: Package, label: "Gói dịch vụ", path: "/goi-dich-vu" },
  { icon: UserCog, label: "Quản lý tài khoản", path: "/quan-li-tai-khoan" },
];

const systemNavItems = [
  { icon: Settings, label: "Cấu hình hệ thống" },
  { icon: HelpCircle, label: "Hỗ trợ" },
];

export default function SideBar() {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-slate-200 flex flex-col shrink-0">
        <div className="px-5 py-5">
          <h1 className="text-[#2170E4] font-bold text-lg leading-tight">
            Nhà tuyển dụng
          </h1>
          <p className="text-xs text-slate-400">System Employer</p>
        </div>
        <nav className="flex-1 px-2 space-y-0.5">
          {navItems.map((item) => (
            <SidebarItem key={item.label} {...item} />
          ))}
        </nav>
        <div className="px-2 pb-2">
          <p className="px-4 text-[10px] tracking-wider text-slate-400 font-medium mb-1">
            HỆ THỐNG
          </p>
          {systemNavItems.map((item) => (
            <SidebarItem key={item.label} {...item} />
          ))}
        </div>
        <div className="border-t border-slate-200 px-4 py-3 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-semibold">
            EU
          </div>
          <div className="text-xs">
            <p className="font-medium text-slate-700">Employer User</p>
            <p className="text-slate-400">admin@hr.system</p>
          </div>
        </div>
      </aside>
    </div>
  );
}