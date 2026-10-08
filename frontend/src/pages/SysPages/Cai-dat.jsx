import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const CaiDat = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <section
      className={`min-h-full px-6 py-8 transition-colors duration-300 sm:px-10 ${
        isDarkMode ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <p
            className={`mb-2 text-sm font-semibold uppercase tracking-[0.18em] ${
              isDarkMode ? "text-cyan-400" : "text-cyan-700"
            }`}
          >
            Tùy chỉnh
          </p>
          <h1 className="text-3xl font-bold tracking-tight">Cài đặt</h1>
          <p className={`mt-2 ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
            Điều chỉnh giao diện theo cách làm việc của bạn.
          </p>
        </div>

        <div
          className={`flex items-center justify-between gap-6 border p-5 shadow-sm transition-colors duration-300 ${
            isDarkMode
              ? "border-slate-800 bg-slate-900"
              : "border-slate-200 bg-white"
          }`}
        >
          <div className="flex items-center gap-4">
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                isDarkMode
                  ? "bg-cyan-400/10 text-cyan-300"
                  : "bg-cyan-50 text-cyan-700"
              }`}
            >
              {isDarkMode ? <Moon size={21} /> : <Sun size={21} />}
            </div>
            <div>
              <h2 className="font-semibold">Chế độ tối</h2>
              <p className={`mt-1 text-sm ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                {isDarkMode ? "Đang bật giao diện tối" : "Đang dùng giao diện sáng"}
              </p>
            </div>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={isDarkMode}
            aria-label="Bật hoặc tắt chế độ tối"
            onClick={toggleTheme}
            className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 ${
              isDarkMode ? "bg-cyan-500" : "bg-slate-300"
            }`}
          >
            <span
              className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${
                isDarkMode ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CaiDat