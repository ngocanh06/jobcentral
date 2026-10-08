import React, { useState, useMemo, useRef, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Plus,
  Clock,
  User,
  Briefcase,
  Trash2,
  Pencil,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Constants & helpers                                               */
/* ------------------------------------------------------------------ */

const WEEKDAYS = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "CN"];
const MONTH_LABEL = (d) => `Tháng ${d.getMonth() + 1}, ${d.getFullYear()}`;

const TYPES = {
  kt: {
    label: "Phòng Tài chính – Kế toán",
    dot: "#6b6a65",
    className: "bg-gray-50 text-gray-700 border-l-2 border-gray-400",
  },
  SEO: {
    label: "Phòng Nhân sự (HR)",
    dot: "#59eb80",
    className: "bg-emerald-50 text-emerald-700 border-l-2 border-emerald-400",
  },
  sale: {
    label: "Phòng Kinh doanh (Sales)",
    dot: "#3cb3d7",
    className: "bg-cyan-50 text-cyan-700 border-l-2 border-cyan-400",
  },
  careCustumer: {
    label: "Phòng Chăm sóc khách hàng (CSR)",
    dot: "#e2554b",
    className: "bg-rose-50 text-rose-700 border-l-2 border-rose-400",
  },
  RandD: {
    label: "Phòng Nghiên cứu và Phát triển (R&D)",
    dot: "#3f8fd6",
    className: "bg-sky-50 text-sky-700 border-l-2 border-sky-400",
  },

  IT: {
    label: "Phòng Công nghệ thông tin (IT)",
    dot: "#d822f8",
    className: "bg-violet-50 text-violet-700 border-l-2 border-violet-400",
  },
};

const INTERVIEWERS = [
  { id: "mai", name: "Lê Thị Mai", role: "HR Director", status: "online" },
  {
    id: "hoang",
    name: "Nguyễn Hoàng",
    role: "Lead Developer",
    status: "online",
  },
];

const pad = (n) => String(n).padStart(2, "0");
const keyOf = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;
const todayKey = () => {
  const t = new Date();
  return keyOf(t.getFullYear(), t.getMonth(), t.getDate());
};

const uid = () => Math.random().toString(36).slice(2, 9);

/* Seed data mirrors the reference mock (October 2023) */
const seedEvents = () => ({
  "2026-8-8": [
    {
      id: uid(),
      time: "14:30",
      title: "Security",
      type: "IT", // type phả đảm bảo trùm khớp với type !
      candidate: "Phạm Quang Huy",
      interviewer: "mai",
      status: "pending",
    },
  ],
});

/* ------------------------------------------------------------------ */
/*  Main component                                                    */
/* ------------------------------------------------------------------ */

export default function InterviewCalendar() {
  const [viewDate, setViewDate] = useState(new Date());
  const [events, setEvents] = useState(seedEvents);
  const [hover, setHover] = useState(null); // { event, x, y }
  const [modal, setModal] = useState(null); // { mode: 'add'|'edit', date, event }
  const hoverTimeout = useRef(null);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  /* ---------------- calendar grid ---------------- */
  const grid = useMemo(() => {
    const firstOfMonth = new Date(year, month, 1);
    const startOffset = (firstOfMonth.getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    const cells = []
    for (let i = 0; i < startOffset; i++) {
      const d = daysInPrevMonth - startOffset + i + 1;
      const m = month === 0 ? 11 : month - 1;
      const y = month === 0 ? year - 1 : year;

      cells.push({ day: d, key: keyOf(y, m, d), inMonth: false });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ day: d, key: keyOf(year, month, d), inMonth: true });
    }
    while (cells.length % 7 !== 0) {
      const idx = cells.length - (startOffset + daysInMonth);
      const d = idx + 1;
      const m = month === 11 ? 0 : month + 1;
      const y = month === 11 ? year + 1 : year;
      cells.push({ day: d, key: keyOf(y, m, d), inMonth: false });
    }
    return cells;
  }, [year, month]);

  /* ---------------- stats ---------------- */
  const stats = useMemo(() => {
    const monthPrefix = `${year}-${pad(month + 1)}`;
    let completed = 0;
    let pending = 0;
    Object.entries(events).forEach(([k, list]) => {
      if (!k.startsWith(monthPrefix)) return;
      list.forEach((e) => (e.status === "completed" ? completed++ : pending++));
    });
    return { completed, pending, total: completed + pending };
  }, [events, year, month]);

  /* ---------------- handlers ---------------- */
  const goto = (delta) => setViewDate(new Date(year, month + delta, 1));
  const gotoToday = () => setViewDate(new Date());

  const showHover = useCallback((e, evt) => {
    clearTimeout(hoverTimeout.current);
    const rect = e.currentTarget.getBoundingClientRect();
    setHover({ event: evt, x: rect.left + rect.width / 2, y: rect.top });
  }, []);

  const hideHover = useCallback(() => {
    hoverTimeout.current = setTimeout(() => setHover(null), 80);
  }, []);

  const openAdd = (dateKey) =>
    setModal({ mode: "add", date: dateKey, event: null });

  const openEdit = (dateKey, evt) => {
    setHover(null);
    setModal({ mode: "edit", date: dateKey, event: evt });
  };

  const saveEvent = (dateKey, data, mode, originalDate) => {
    setEvents((prev) => {
      const next = { ...prev };
      if (mode === "edit" && originalDate) {
        next[originalDate] = (next[originalDate] || []).filter(
          (e) => e.id !== data.id,
        );
        if (next[originalDate].length === 0) delete next[originalDate];
      }

      const list = next[dateKey] ? [...next[dateKey]] : [];
      list.push(data);
      list.sort((a, b) => a.time.localeCompare(b.time));
      next[dateKey] = list;
      return next;
    });
    setModal(null);
  };

  const deleteEvent = (dateKey, id) => {
    setEvents((prev) => {
      const next = { ...prev };
      next[dateKey] = (next[dateKey] || []).filter((e) => e.id !== id);
      if (next[dateKey].length === 0) delete next[dateKey];
      return next;
    });
    setModal(null);
  };

  const todK = todayKey();

  /* ---------------------------------------------------------------- */

  return (
    <div className="min-h-screen w-full bg-[#f4f6fb] font-[Inter,sans-serif] text-slate-800 p-6">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap');
        .font-display { font-family: 'Plus Jakarta Sans', Inter, sans-serif; }
      `}</style>

      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-[#2170e4]">
            Lịch phỏng vấn
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Xem, theo dõi và xử lý các cuộc phỏng vấn ứng viên. Nhấp vào một
            ngày để thêm cuộc hẹn mới, di chuột vào cuộc hẹn để xem chi tiết.
          </p>
        </div>

        {/* Calendar card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-[17px] font-semibold text-slate-900">
                {MONTH_LABEL(viewDate)}
              </h2>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => goto(-1)}
                  className="w-7 h-7 grid place-items-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50 transition"
                  aria-label="Tháng trước"
                >
                  <ChevronLeft size={15} />
                </button>
                <button
                  onClick={() => goto(1)}
                  className="w-7 h-7 grid place-items-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50 transition"
                  aria-label="Tháng sau"
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
            <button
              onClick={gotoToday}
              className="text-sm font-medium text-[#2170e4] hover:underline"
            >
              Hôm nay
            </button>
          </div>

          {/* Weekday header */}
          <div className="grid grid-cols-7 bg-slate-50 rounded-t-lg overflow-hidden text-[11px] font-semibold tracking-wide text-slate-500 uppercase">
            {WEEKDAYS.map((w) => (
              <div key={w} className="px-3 py-2 border-b border-slate-200">
                {w}
              </div>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-7 border-l border-slate-200">
            {grid.map((cell, i) => {
              const isToday = cell.key === todK;
              const dayEvents = events[cell.key] || [];
              return (
                <div
                  key={cell.key + i}
                  onClick={() => cell.inMonth && openAdd(cell.key)}
                  className={`relative min-h-[92px] border-r border-b border-slate-200 p-2 group ${
                    cell.inMonth
                      ? "cursor-pointer hover:bg-slate-50/70"
                      : "bg-slate-50/40"
                  } transition`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[13px] ${
                        cell.inMonth
                          ? "text-slate-700 font-medium"
                          : "text-slate-300"
                      } ${isToday ? "bg-[#2170e4] text-white w-5 h-5 grid place-items-center rounded-full text-[12px]" : ""}`}
                    >
                      {cell.day}
                    </span>
                    {cell.inMonth && (
                      <Plus
                        size={18}
                        className="text-slate-300 opacity-0 group-hover:opacity-100 transition"
                      />
                    )}
                  </div>

                  <div className="mt-1.5 flex flex-col gap-1">
                    {dayEvents.map((evt) => {
                      const t = TYPES[evt.type]; // t hiện đang underfined 

                      console.log("evt: ", evt);
                      console.log("t", t);
                      console.log("evt.type: ", evt.type);

                      return (
                        <div
                          key={evt.id}
                          onMouseEnter={(e) =>
                            showHover(e, { ...evt, dateKey: cell.key })
                          }
                          onMouseLeave={hideHover}
                          onClick={(e) => {
                            e.stopPropagation();
                            openEdit(cell.key, evt);
                          }}
                          className={`truncate rounded-[5px] px-1.5 py-[3px] text-[10.5px] font-medium leading-tight ${t?.className} hover:brightness-105 transition`}
                        >
                          {evt.time} · {evt.title}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interviewers */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 mt-5">
          <p className="text-[11px] font-semibold tracking-wide text-slate-400 uppercase mb-3">
            Người phỏng vấn
          </p>
          <div className="flex flex-col gap-3">
            {INTERVIEWERS.map((p) => (
              <div key={p.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2170e4] to-[#7b9bff] grid place-items-center text-white text-xs font-semibold">
                    {p.name
                      .split(" ")
                      .slice(-2)
                      .map((s) => s[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="text-[13.5px] font-semibold text-slate-800 leading-tight">
                      {p.name}
                    </p>
                    <p className="text-[12px] text-slate-400">{p.role}</p>
                  </div>
                </div>
                <span
                  className={`w-2 h-2 rounded-full ${
                    p.status === "online" ? "bg-emerald-500" : "bg-amber-400"
                  }`}
                />
              </div>
            ))}
          </div>
          <button className="mt-4 w-full border border-dashed border-slate-200 rounded-lg py-2 text-[12.5px] text-slate-400 hover:text-slate-600 hover:border-slate-300 transition">
            + Thêm người phụ trách
          </button>
        </div>

        {/* Overview */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 mt-5">
          <p className="text-[11px] font-semibold tracking-wide text-slate-400 uppercase mb-4">
            Tổng quan tháng này
          </p>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[13px] text-slate-600">Buổi phỏng vấn</span>
              <span className="text-[15px] font-bold text-slate-800">
                {String(stats.total).padStart(2, "0")}
              </span>
            </div>
            <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full bg-[#2170e4] rounded-full transition-all"
                style={{
                  width: stats.total
                    ? `${(stats.completed / stats.total) * 100}%`
                    : "0%",
                }}
              />
            </div>
            <div className="flex justify-between mt-1 text-[11.5px] text-slate-400">
              <span>{stats.completed} Hoàn thành</span>
              <span>{stats.pending} Chờ xử lý</span>
            </div>
          </div>
        </div>
      </div>

      {/* -------- HOVER_DEMO -------- */}
      {hover && (
        <div
          onMouseEnter={() => clearTimeout(hoverTimeout.current)}
          onMouseLeave={hideHover}
          style={{
            position: "fixed",
            left: hover.x,
            top: hover.y,
            transform: "translate(-50%, calc(-100% - 10px))",
            zIndex: 50,
          }}
          className="w-60 bg-slate-900 text-white rounded-xl shadow-xl p-3.5 pointer-events-auto"
        >
          <div className="flex items-center gap-1.5 mb-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: TYPES[hover.event.type].dot }}
            />
            {console.log(TYPES[hover.event.type])}
            <span className="text-[10.5px] uppercase tracking-wide text-slate-400 font-semibold">
              {TYPES[hover.event.type].label}
            </span>
          </div>
          <p className="text-[14px] font-semibold leading-tight mb-2">
            {hover.event.title}
          </p>
          <div className="flex flex-col gap-1.5 text-[12px] text-slate-300">
            <div className="flex items-center gap-1.5">
              <Clock size={12} /> {hover.event.time}
            </div>
            <div className="flex items-center gap-1.5">
              <User size={12} /> {hover.event.candidate}
            </div>
            <div className="flex items-center gap-1.5">
              <Briefcase size={12} />
              {INTERVIEWERS.find((p) => p.id === hover.event.interviewer)
                ?.name || "—"}
            </div>
          </div>
          <p className="mt-2 text-[10.5px] text-slate-500">Nhấp để chỉnh sửa</p>
          <div
            className="absolute left-1/2 -bottom-1.5 w-3 h-3 bg-slate-900 rotate-45"
            style={{ transform: "translateX(-50%) rotate(45deg)" }}
          />
        </div>
      )}

      {/* -------- Add / Edit modal -------- */}

      {modal && (
        <EventModal
          modal={modal}
          onClose={() => setModal(null)}
          onSave={saveEvent}
          onDelete={deleteEvent}
        />
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Modal component                                                   */
/* ------------------------------------------------------------------ */

function EventModal({ modal, onClose, onSave, onDelete }) {
  const isEdit = modal.mode === "edit";
  const src = modal.event;

  const [date, setDate] = useState(modal.date);
  const [time, setTime] = useState(src?.time || "09:00");
  const [title, setTitle] = useState(src?.title || "");
  const [candidate, setCandidate] = useState(src?.candidate || "");
  const [type, setType] = useState(src?.type || "tech");
  const [interviewer, setInterviewer] = useState(
    src?.interviewer || INTERVIEWERS[0].id,
  );
  const [status, setStatus] = useState(src?.status || "pending");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !candidate.trim()) {
      setError("Vui lòng nhập vị trí và tên ứng viên.");
      return;
    }
    const data = {
      id: src?.id || uid(),
      time,
      title: title.trim(),
      candidate: candidate.trim(),
      type,
      interviewer,
      status,
    };
    onSave(date, data, modal.mode, modal.date);
  };

  return (
    <div
      className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-[60] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h3 className="font-display text-[16px] font-700 text-slate-900 flex items-center gap-2">
            {isEdit ? (
              <Pencil size={15} className="text-[#2170e4]" />
            ) : (
              <Plus size={15} className="text-[#2170e4]" />
            )}
            {isEdit ? "Chỉnh sửa cuộc hẹn" : "Thêm cuộc hẹn mới"}
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <X size={18} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="px-5 py-4 flex flex-col gap-3.5"
        >
          <div className="grid grid-cols-2 gap-3">
            <Field label="Ngày">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="input-base"
                required
              />
            </Field>
            <Field label="Giờ">
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="input-base"
                required
              />
            </Field>
          </div>

          <Field label="Vị trí / Vòng phỏng vấn">
            <input
              type="text"
              placeholder="VD: Senior Dev, HR Screen..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-base"
            />
          </Field>

          <Field label="Ứng viên">
            <input
              type="text"
              placeholder="Tên ứng viên"
              value={candidate}
              onChange={(e) => setCandidate(e.target.value)}
              className="input-base"
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Phòng ban phỏng vấn">
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="input-base"
              >
                {Object.entries(TYPES).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Người phụ trách">
              <select
                value={interviewer}
                onChange={(e) => setInterviewer(e.target.value)}
                className="input-base"
              >
                {INTERVIEWERS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Trạng thái">
            <div className="flex gap-2">
              {[
                { v: "pending", label: "Chờ xử lý" },
                { v: "completed", label: "Hoàn thành" },
              ].map((s) => (
                <button
                  type="button"
                  key={s.v}
                  onClick={() => setStatus(s.v)}
                  className={`flex-1 rounded-lg border text-[12.5px] py-1.5 font-medium transition ${
                    status === s.v
                      ? "bg-[#2170e4] border-[#2170e4] text-white"
                      : "border-slate-200 text-slate-500 hover:bg-slate-50"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </Field>

          {error && <p className="text-[12px] text-rose-500">{error}</p>}

          <div className="flex items-center gap-2 pt-1">
            {isEdit && (
              <button
                type="button"
                onClick={() => onDelete(modal.date, src.id)}
                className="mr-auto flex items-center gap-1.5 text-[12.5px] text-rose-500 hover:text-rose-600 font-medium"
              >
                <Trash2 size={14} /> Xoá
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-[13px] font-medium text-slate-500 hover:bg-slate-50"
            >
              Huỷ
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-[13px] font-semibold bg-[#2170e4] text-white hover:bg-[#2a46b8] transition"
            >
              {isEdit ? "Lưu thay đổi" : "Thêm cuộc hẹn"}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .input-base {
          width: 100%;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 7px 10px;
          font-size: 13px;
          color: #1e293b;
          outline: none;
          transition: border-color .15s;
        }
        .input-base:focus {
          border-color: #2170e4;
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-[11.5px] font-medium text-slate-500">{label}</span>
      {children}
    </label>
  );
}
