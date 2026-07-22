import {
  ClipboardList,
  Search,
  Bell,
  Settings as SettingsIcon,
} from "lucide-react";

const ScrollToTop = () => {
  window.scrollTo({
    top: 0,
    Behavior: "smooth",
  });
};

export default function NavBar() {
  return (
    <>
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center gap-4 sticky top-0 z-10">
        <button className="text-slate-500">
          <ClipboardList size={18} className="hidden" />
        </button>
        <button
          onClick={ScrollToTop}
          className="flex items-center gap-1 text-sm text-slate-500 shrink-0"
        >
          <span>≡</span>
          <span>Home</span>
        </button>
        <div className="flex-1 max-w-md mx-auto relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            placeholder="Tìm kiếm ứng viên, thông tin báo cáo..."
            className="w-full bg-slate-50 border border-slate-200 rounded-full pl-9 pr-4 py-2 text-sm outline-none focus:border-indigo-300"
            readOnly
          />
        </div>
        <div className="flex items-center gap-4 ml-auto">
          <Bell size={18} className="text-slate-400" />
          <SettingsIcon size={18} className="text-slate-400" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-indigo-100" />
            <div className="text-xs text-right">
              <p className="font-medium">User</p>
              <p className="text-slate-400">MANAGER</p>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
