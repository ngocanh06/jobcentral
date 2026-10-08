import React, { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  Bookmark,
  Paperclip,
  Mic,
  Send,
  ShieldCheck,
  Zap,
  Target,
  Building2,
  GraduationCap,
} from "lucide-react";

/**
 * HIRA Smart Assistant — HR chat UI
 * React + Tailwind CSS recreation
 *
 * Drop this component into a project with Tailwind CSS and lucide-react installed:
 *   npm install lucide-react
 */

const SUGGESTIONS = [
  { icon: <Zap size={16} className="text-amber-500" />, text: "Viết JD Trưởng phòng Marketing chuẩn SEO" },
  { icon: <Target size={16} className="text-rose-500" />, text: "Gợi ý câu hỏi phỏng vấn năng lực Hành vi (STAR)" },
  { icon: <Building2 size={16} className="text-neutral-700" />, text: "Dự toán chi phí Cost-Per-Hire cho 5 nhân sự" },
  { icon: <GraduationCap size={16} className="text-sky-600" />, text: "Tra cứu quy định đóng BHXH mới nhất 2025" },
];

const HISTORY = [
  { title: "Tối ưu JD Senior Backend Go/Python", active: true },
  { title: "Soạn bộ câu hỏi phỏng vấn vị trí Product Lead", active: false },
];

function Sidebar() {
  return (
    <aside className="flex w-64 sm:w-72 shrink-0 flex-col border-r border-neutral-200 bg-white px-3 py-4">
      <button className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700">
        <span className="text-lg leading-none">+</span>
        Cuộc trò chuyện mới
      </button>

      <div className="mt-6 px-1 text-xs font-medium tracking-wide text-neutral-400">
        HÔM NAY
      </div>

      <nav className="mt-2 flex flex-col gap-1">
        {HISTORY.map((item) => (
          <button
            key={item.title}
            className={`rounded-lg px-3 py-2 text-left text-sm transition ${
              item.active
                ? "bg-blue-50 text-blue-700 font-medium"
                : "text-neutral-600 hover:bg-neutral-100"
            }`}
          >
            {item.title}
          </button>
        ))}
      </nav>
    </aside>
  );
}

function TopBar() {
  return (
    <div className="flex items-center justify-between border-b border-neutral-200 bg-white px-5 py-3">
      <button className="flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-1.5 text-sm hover:bg-neutral-50">
        <span className="text-base">🧠</span>
        <span className="text-left leading-tight">
          <span className="block text-neutral-800">Model: GPT-4o</span>
          <span className="block text-xs text-neutral-500">HR Tuned</span>
        </span>
        <ChevronDown size={16} className="text-neutral-400" />
      </button>
      <Bookmark size={18} className="text-neutral-400" />
    </div>
  );
}

function AssistantIntro({ onPick }) {
  return (
    <div className="flex gap-3">
      <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white text-sm font-semibold">
        H
      </div>
      <div className="max-w-2xl">
        <div className="mb-1 flex items-baseline gap-2">
          <span className="text-sm font-semibold text-neutral-800">
            HIRA Smart Assistant
          </span>
          <span className="text-xs text-neutral-400">Vừa xong</span>
        </div>
        <div className="rounded-2xl rounded-tl-sm bg-neutral-50 px-4 py-3 text-[15px] leading-relaxed text-neutral-700">
          Xin chào Quý Nhà tuyển dụng! Tôi là{" "}
          <span className="text-blue-600 font-medium">HIRA</span> — Trợ lý
          Trí tuệ Nhân tạo chuyên trách tuyển dụng và nhân sự của CareerViet.
          Hôm nay tôi có thể hỗ trợ bạn tối ưu bản mô tả công việc (JD), gợi
          ý câu hỏi phỏng vấn theo phương pháp STAR, tra cứu luật lao động
          mới nhất hay dự toán chi phí tuyển dụng?
        </div>

        <div className="mt-3 flex flex-col gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s.text}
              onClick={() => onPick(s.text)}
              className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-left text-sm text-neutral-700 transition hover:border-blue-300 hover:bg-blue-50/40"
            >
              {s.icon}
              {s.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function UserBubble({ text }) {
  return (
    <div className="flex justify-end gap-3">
      <div className="max-w-xl rounded-2xl rounded-tr-sm bg-blue-600 px-4 py-3 text-[15px] leading-relaxed text-white shadow-sm">
        {text}
      </div>
      <div className="h-9 w-9 shrink-0 rounded-full bg-neutral-200 flex items-center justify-center text-xs font-semibold text-neutral-600">
        HR
      </div>
    </div>
  );
}

function AssistantBubble({ text, time }) {
  return (
    <div className="flex gap-3">
      <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-sky-400 to-blue-600 flex items-center justify-center text-white text-sm font-semibold">
        H
      </div>
      <div className="max-w-2xl">
        <div className="mb-1 flex items-baseline gap-2">
          <span className="text-sm font-semibold text-neutral-800">HIRA AI</span>
          <span className="text-xs text-neutral-400">{time}</span>
        </div>
        <div className="rounded-2xl rounded-tl-sm bg-neutral-50 px-4 py-3 text-[15px] leading-relaxed text-neutral-700 whitespace-pre-line">
          {text}
        </div>
      </div>
    </div>
  );
}

function nowTime() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, "0")}:${String(
    d.getMinutes()
  ).padStart(2, "0")}`;
}

export default function HiraChatUI() {
  const [messages, setMessages] = useState([
    

    // {
    //   role: "assistant",
    //   time: "10:42",
    //   text: (
    //     <>
    //       Chào bạn! Dưới đây là bản mô tả công việc chuẩn hóa dành cho vị trí{" "}
    //       <span className="text-blue-600 font-medium">Senior Data Engineer</span>{" "}
    //       tại TP.HCM. Bản JD này được tối ưu hóa từ khóa SEO kỹ thuật để thu
    //       hút các chuyên gia Big Data trên nền tảng...
    //     </>
    //   ),
    // },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((m) => [...m, { role: "user", text: trimmed }]);
    setInput("");
    // Simulated placeholder reply
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          time: nowTime(),
          text: "Đã nhận yêu cầu của bạn. Đây là bản demo giao diện — kết nối API để nhận phản hồi thực tế.",
        },
      ]);
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="flex h-full min-h-0 w-full bg-neutral-50 text-neutral-900 font-sans">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6 md:px-8">
          <div className="mx-auto flex max-w-3xl flex-col gap-6">
            <div className="rounded-2xl border border-neutral-200 bg-white p-5">
              <AssistantIntro onPick={sendMessage} />
            </div>

            {messages.map((m, i) =>
              m.role === "user" ? (
                <UserBubble key={i} text={m.text} />
              ) : (
                <AssistantBubble key={i} text={m.text} time={m.time} />
              )
            )}
            <div ref={bottomRef} />
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="border-t border-neutral-200 bg-white px-4 pb-3 pt-3 md:px-8"
        >
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-2 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Hỏi HIRA bất cứ điều gì về tuyển dụng, chính sách C&B hoặc dán JD/CV vào đây..."
                className="flex-1 bg-transparent text-sm text-neutral-700 placeholder-neutral-400 outline-none"
              />
              <button
                type="submit"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white transition hover:bg-blue-700 disabled:opacity-40"
                disabled={!input.trim()}
              >
                <Send size={16} />
              </button>
            </div>
            <div className="mt-2 flex items-center gap-4 px-1">
              <button
                type="button"
                className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-700"
              >
                <Paperclip size={14} />
                Tải CV / JD
              </button>
              <button
                type="button"
                className="text-neutral-500 hover:text-neutral-700"
              >
                <Mic size={14} />
              </button>
            </div>
            <p className="mt-2 flex items-center justify-center gap-1.5 text-center text-[11px] text-neutral-400">
              <ShieldCheck size={12} className="text-sky-500" />
              HIRA AI có thể mắc sai sót vui lòng kiểm tra lại thông tin quan
              trọng trước khi ban hành.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}