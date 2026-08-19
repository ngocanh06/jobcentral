import {
  ClipboardList,
  Search,
  Bell,
  Settings as SettingsIcon,
} from "lucide-react";
import Typewriter from "typewriter-effect";

import { TimeOfDay } from "./GetTime";
const session = TimeOfDay();

const ScrollToTop = () => {
  window.scrollTo({
    top: 0,
    Behavior: "smooth",
  });
};

export default function NavBar() {
  return (
    <>
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="w-80">
          <Search
            size={16}
            className="absolute left-9 top-1/2 -translate-y-1/2 text-slate-400"
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

        <div className="w-56 flex justify-end items-center gap-4">
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
