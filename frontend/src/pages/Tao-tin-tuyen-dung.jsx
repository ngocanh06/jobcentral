import React, { useState } from "react";
import {
  Info,
  FileText,
  Star,
  Gift,
  HelpCircle,
  Settings,
  Check,
  Plus,
  X,
  GripVertical,
  MessageCircle,
  Phone,
  Bold,
  Italic,
  List,
  Send,
} from "lucide-react";

const STEPS = [
  { id: 1, label: "Thông tin cơ bản" },
  { id: 2, label: "Mô tả công việc" },
  { id: 3, label: "Yêu cầu" },
  { id: 4, label: "Lương & Phúc lợi" },
  { id: 5, label: "Câu hỏi sàng lọc" },
  { id: 6, label: "Xuất bản" },
];

function StepIndicator({ current, Completed, onChange }) {
  return (
    <div className="flex items-center w-full px-6 py-3 bg-white border-b border-slate-200">
      {STEPS.map((step, idx) => {
        const isDone = Completed[step.id];
        return (
          <React.Fragment key={step.id}>
            <button className="flex flex-col items-center gap-1.5 group">
              <div
                className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-semibold border-2 transition-colors
                  ${
                    isDone
                      ? "bg-[#2170e4]/10 border-[#2170e4]/40 text-[#2170e4]"
                      : "bg-white border-slate-300 text-slate-400"
                  }`}
              >
                {isDone ? <Check size={14} /> : step.id}
              </div>
              {console.log(Completed)}
              <span
                className={`text-[11px] whitespace-nowrap font-medium text-slate-400`}
              >
                {step.label}
              </span>
            </button>
            {idx < STEPS.length - 1 && (
              <div
                className={`flex-1 h-px mx-2 mb-5 ${
                  Completed[step.id] ? "bg-[#2170e4]/60" : "bg-slate-200"
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function SectionCard({ icon: Icon, title, children }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-6 w-6 rounded-md bg-[#2170e4]/10 text-[#2170e4] flex items-center justify-center">
          <Icon size={14} />
        </div>
        <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-slate-500 mb-1.5">
        {label}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-slatborder border-slate-300 rounded-lg px-3 py-2e-300 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2170e4]/40 focus:border-[#2170e4] transition";

export default function JobPostingForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    title: "",
    department: "",
    jobType: "",
    workMode: "",
    openings: 0,
    location: "",
    summary: "",
    responsibilities: "",
    experience: "",
    degree: "",
    currency: "",
    salaryFrom: 0,
    salaryTo: 0,
    benefits: "",
    begins: "",
    expired: "",
  });

  const [questions, setQuestions] = useState([
    { id: 1, text: "", type: "Text", required: true },
  ]);
  const stepCompleted = {
    1:
      form.title.trim() !== "" &&
      form.department.trim() !== "" &&
      form.jobType.trim() !== "" &&
      form.workMode.trim() !== "" &&
      form.openings !== "" &&
      form.location.trim() !== "",
    2: form.summary.trim() !== "" && form.responsibilities.trim() !== "",
    3: form.experience.trim() !== "" && form.degree.trim() !== "",
    4:
      form.benefits.trim() !== "" &&
      form.salaryFrom !== "" &&
      form.salaryTo !== "",
    5:
      questions?.length > 0 &&
      questions.every((q) => (q.text ?? "").trim() !== ""),

    6: false,
  };

  const [skills, setSkills] = useState(["Figma", "Prototyping", "UI/UX"]);
  const [skillInput, setSkillInput] = useState("");

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const addSkill = (e) => {
    if (e.key === "Enter" && skillInput.trim()) {
      setSkills((s) => [...s, skillInput.trim()]);
      setSkillInput("");
      e.preventDefault();
    }
  };
  const removeSkill = (idx) => setSkills((s) => s.filter((_, i) => i !== idx));

  const addQuestion = () =>
    setQuestions((q) => [
      ...q,
      { id: Date.now(), text: "", type: "Text", required: false },
    ]);
  const removeQuestion = (id) =>
    setQuestions((q) => q.filter((item) => item.id !== id));

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Top bar */}
      <div className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-base font-semibold text-slate-900">
            Tạo tin tuyển dụng{" "}
            <span className="text-[#2170e4]">với Trợ lý AI</span>
          </h1>
          <p className="text-xs text-slate-400">
            Phân tích dữ liệu, đề xuất giải pháp
          </p>
        </div>
      </div>

      <StepIndicator
        current={step}
        Completed={stepCompleted}
        onChange={setStep}
      />

      <div className="max-w-11xl mx-auto flex flex-col lg:flex-row gap-5 p-6 items-start">
        {/* LEFT: form content — scrolls independently */}
        <div className="w-full lg:flex-1 lg:min-w-0 space-y-5">
          <SectionCard icon={Info} title="Thông tin cơ bản">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Field label="Tiêu đề công việc *">
                  <input
                    className={inputClass}
                    value={form.title}
                    onChange={update("title")}
                  />
                </Field>
              </div>
              <Field label="Phòng ban">
                <input
                  className={inputClass}
                  value={form.department}
                  onChange={update("department")}
                />
              </Field>
              <Field label="Loại công việc">
                <select
                  className={inputClass}
                  value={form.jobType}
                  onChange={update("jobType")}
                >
                  <option>Toàn thời gian</option>
                  <option>Bán thời gian</option>
                  <option>Hợp đồng</option>
                  <option>Thực tập</option>
                </select>
              </Field>
              <Field label="Hình thức làm việc">
                <select
                  className={inputClass}
                  value={form.workMode}
                  onChange={update("workMode")}
                >
                  <option>Remote</option>
                  <option>Hybrid</option>
                  <option>Contract</option>
                </select>
              </Field>
              <Field label="Số lượng vị trí">
                <input
                  type="number"
                  min={1}
                  className={inputClass}
                  value={form.openings}
                  onChange={update("openings")}
                />
              </Field>
              <div className="col-span-2">
                <Field label="Địa điểm">
                  <input
                    placeholder="Thành phố, Quốc gia"
                    className={inputClass}
                    value={form.location}
                    onChange={update("location")}
                  />
                </Field>
              </div>
            </div>
          </SectionCard>

          <SectionCard icon={FileText} title="Mô tả công việc">
            <div className="space-y-4">
              <Field label="Tóm tắt">
                <div className="rounded-lg border border-slate-300 overflow-hidden">
                  <div className="flex items-center gap-1 px-2 py-1.5 border-b border-slate-200 bg-slate-50">
                    <button className="p-1 rounded hover:bg-slate-200">
                      <Bold size={13} />
                    </button>
                    <button className="p-1 rounded hover:bg-slate-200">
                      <Italic size={13} />
                    </button>
                    <button className="p-1 rounded hover:bg-slate-200">
                      <List size={13} />
                    </button>
                  </div>
                  <textarea
                    rows={3}
                    placeholder="Viết tóm tắt ngắn về vai trò và sứ mệnh của vị trí này..."
                    className="w-full px-3 py-2 text-sm outline-none resize-none placeholder:text-slate-400"
                    value={form.summary}
                    onChange={update("summary")}
                  />
                </div>
              </Field>

              <Field label="Trách nhiệm chính">
                <div className="rounded-lg border border-slate-300 overflow-hidden">
                  <div className="flex items-center gap-1 px-2 py-1.5 border-b border-slate-200 bg-slate-50">
                    <button className="p-1 rounded hover:bg-slate-200">
                      <Bold size={13} />
                    </button>
                    <button className="p-1 rounded hover:bg-slate-200">
                      <List size={13} />
                    </button>
                  </div>
                  <textarea
                    rows={3}
                    placeholder="Liệt kê các trách nhiệm chính của vai trò này..."
                    className="w-full px-3 py-2 text-sm outline-none resize-none placeholder:text-slate-400"
                    value={form.responsibilities}
                    onChange={update("responsibilities")}
                  />
                </div>
              </Field>
            </div>
          </SectionCard>

          <SectionCard icon={Star} title="Yêu cầu & Kinh nghiệm">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Field label="Số năm kinh nghiệm">
                <input
                  className={inputClass}
                  placeholder="vd: 3+ năm"
                  value={form.experience}
                  onChange={update("experience")}
                />
              </Field>
              <Field label="Yêu cầu bằng cấp">
                <input
                  className={inputClass}
                  placeholder="vd: Cử nhân"
                  value={form.degree}
                  onChange={update("degree")}
                />
              </Field>
            </div>
            <Field label="Kỹ năng">
              <div className="flex flex-wrap items-center gap-2 rounded-lg border border-slate-300 px-3 py-2">
                {skills.map((s, i) => (
                  <span
                    key={s + i}
                    className="flex items-center gap-1 bg-[#2170e4]/10 text-[#2170e4] text-xs font-medium px-2 py-1 rounded-md"
                  >
                    {s}
                    <button onClick={() => removeSkill(i)}>
                      <X size={11} />
                    </button>
                  </span>
                ))}
                <input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={addSkill}
                  placeholder="Thêm kỹ năng..."
                  className="flex-1 min-w-[100px] text-sm outline-none placeholder:text-slate-400"
                />
              </div>
            </Field>
          </SectionCard>

          <SectionCard icon={Gift} title="Lương & Phúc lợi">
            <div className="grid grid-cols-3 gap-3 mb-4">
              <Field label="Loại tiền tệ">
                <select
                  className={inputClass}
                  value={form.currency}
                  onChange={update("currency")}
                >
                  <option>USD ($)</option>
                  <option>VND (₫)</option>
                  <option>EUR (€)</option>
                </select>
              </Field>
              <Field label="Từ">
                <input
                  type="number"
                  min={0}
                  className={inputClass}
                  value={form.salaryFrom}
                  onChange={update("salaryFrom")}
                />
              </Field>
              <Field label="Đến">
                <input
                  type="number"
                  min={0}
                  className={inputClass}
                  value={form.salaryTo}
                  onChange={update("salaryTo")}
                />
              </Field>
            </div>

            <Field label="Phúc lợi nhân viên">
              <div className="rounded-lg border border-slate-300 overflow-hidden">
                <div className="flex items-center gap-1 px-2 py-1.5 border-b border-slate-200 bg-slate-50">
                  <button className="p-1 rounded hover:bg-slate-200">
                    <Bold size={13} />
                  </button>
                  <button className="p-1 rounded hover:bg-slate-200">
                    <List size={13} />
                  </button>
                </div>
                <textarea
                  rows={3}
                  placeholder="Chế độ phúc lợi của nhân viên..."
                  className="w-full px-3 py-2 text-sm outline-none resize-none placeholder:text-slate-400"
                  value={form.benefits}
                  onChange={update("benefits")}
                />
              </div>
            </Field>
          </SectionCard>

          <SectionCard icon={HelpCircle} title="Câu hỏi sàng lọc">
            <div className="space-y-2">
              {questions.map((q) => (
                <div key={q.id} className="flex items-center gap-2 w-full">
                  <GripVertical size={14} className="text-slate-300 skrink-0" />
                  <input
                    className={`border border-slate-300 rounded-lg px-3 py-2 flex-1 min-w-0`}
                    placeholder="Nhập câu hỏi sàng lọc..."
                    value={q.text}
                    onChange={(e) =>
                      setQuestions((qs) =>
                        qs.map((item) =>
                          item.id === q.id
                            ? { ...item, text: e.target.value }
                            : item,
                        ),
                      )
                    }
                  />
                  <select
                    className={`border border-slate-300 rounded-lg px-3 py-2 w-28 shrink-0`}
                    value={q.type}
                    onChange={(e) =>
                      setQuestions((qs) =>
                        qs.map((item) =>
                          item.id === q.id
                            ? { ...item, type: e.target.value }
                            : item,
                        ),
                      )
                    }
                  >
                    <option>Văn bản</option>
                    <option>Có/Không</option>
                    <option>Nhiều lựa chọn</option>
                  </select>
                  <label className="flex items-center gap-1 text-xs text-slate-500 shrink-0">
                    <input
                      type="checkbox"
                      checked={q.required}
                      onChange={() =>
                        setQuestions((qs) =>
                          qs.map((item) =>
                            item.id === q.id
                              ? { ...item, required: !item.required }
                              : item,
                          ),
                        )
                      }
                      className="h-3.5 w-3.5 rounded border-slate-300 text-[#2170e4]"
                    />
                    Bắt buộc
                  </label>
                  <button
                    onClick={() => removeQuestion(q.id)}
                    className="text-red-400 hover:text-red-600 text-xs shrink-0"
                  >
                    Xóa
                  </button>
                </div>
              ))}
              <button
                onClick={addQuestion}
                className="flex items-center gap-1 text-xs font-medium text-[#2170e4] hover:text-[#1b5ec9] mt-1"
              >
                <Plus size={13} /> Thêm câu hỏi
              </button>
            </div>
          </SectionCard>

          <SectionCard icon={Settings} title="Cài đặt đăng tin">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Field label="Ngày đăng">
                <input
                  type="date"
                  className={inputClass}
                  value={form.begins}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      begins: e.target.value,
                    })
                  }
                />
              </Field>
              <Field label="Ngày hết hạn">
                <input
                  type="date"
                  className={inputClass}
                  value={form.expired}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      expired: e.target.value,
                    })
                  }
                />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="block text-xs font-medium text-slate-500 mb-1.5">
                  Hiển thị
                </span>
                <label className="flex items-center gap-2 text-sm mb-1">
                  <input
                    type="radio"
                    name="visibility"
                    defaultChecked
                    className="text-[#2170e4]"
                    onChange={(e) => {
                      console.log(e.target.value);
                    }}
                  />
                  Công khai (Trang nghề nghiệp & các sàn việc làm)
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="visibility"
                    className="text-[#2170e4]"
                  />
                  Riêng tư (Chỉ nội bộ)
                </label>
              </div>
              <div>
                <span className="block text-xs font-medium text-slate-500 mb-1.5">
                  Phân phối
                </span>
                {["LinkedIn", "TopCV", "Indeed"].map((ch) => (
                  <label
                    key={ch}
                    className="flex items-center gap-2 text-sm mb-1"
                  >
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 rounded border-slate-300 text-[#2170e4]"
                    />
                    {ch}
                  </label>
                ))}
              </div>
            </div>
          </SectionCard>
        </div>

        {/* RIGHT: preview + assistant — separate panel, sticks while left scrolls */}
        <div className="w-full lg:w-[340px] lg:shrink-0 lg:sticky lg:top-2 space-y-4 lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto lg:pr-1">
          <div className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> LIVE
            PREVIEW
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-br from-[#2170e4] to-[#0099FF] p-4 text-white">
              <div className="h-8 w-8 rounded-lg bg-white/20 flex items-center justify-center mb-3 text-sm font-bold">
                NTD
              </div>
              <h4 className="font-semibold text-sm">
                {form.title || "Tiêu đề công việc"}
              </h4>
              <p className="text-[11px] text-[#dce9fb]">
                {form.department} · {form.workMode}
              </p>
            </div>
            <div className="p-4 space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="px-2 py-0.5 rounded-full bg-slate-100">
                  {form.location || "Địa điểm"}
                </span>

                <span className="px-2 py-0.5 rounded-full bg-slate-100 whitespace-nowrap">
                  {form.begins || "Ngày đăng"} -{" "}
                  {form.expired || "Hạn kết thúc"}
                </span>

                <span className="px-2 py-0.5 rounded-full bg-slate-100">
                  {form.jobType || "Loại công việc"}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {form.currency || "USD ($)"} {form.salaryFrom || "5,000"} -{" "}
                {form.salaryTo || "10,000"}
              </p>
              <p className="text-xs text-slate-500 max-w-[300px] overflow-y-auto overflow-x-hidden whitespace-pre-wrap break-words">
                {"Mô tả công việc: "}
                {form.summary}
              </p>
              <p className="text-xs text-slate-500 max-w-[300px] overflow-y-auto overflow-x-hidden whitespace-pre-wrap break-words">
                {"Chế độ phúc lợi: "}
                {form.benefits}
              </p>
              <button className="w-full bg-[#2170e4] text-white text-xs font-medium rounded-lg py-2 mt-2">
                Ứng tuyển ngay
              </button>
              <p className="text-[10px] text-slate-400 text-center pt-1">
                Đăng 0 phút trước · 0 đã xem
              </p>
            </div>
          </div>

          <div className="bg-[#2170e4]/10 rounded-xl p-3 text-xs text-[#2170e4]">
            💡 Mẹo cho nhà tuyển dụng: mô tả công việc rõ ràng, cụ thể sẽ thu
            hút gấp 2 lần số ứng viên phù hợp và rút ngắn thời gian tuyển dụng.
          </div>

          {/* Chat widget */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="bg-[#2170e4] text-white px-3 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-medium">
                <MessageCircle size={14} /> StickyAI
              </div>
              <X size={14} className="cursor-pointer opacity-80" />
            </div>

            <div className="p-3 space-y-2 bg-slate-50 h-[200px]">
              <div className="bg-white rounded-lg rounded-tl-none px-3 py-2 text-xs text-slate-600 max-w-[85%] shadow-sm">
                Chào! Tôi bạn tôi là AI hỗ trợ! bạn cần giúp gì ?
              </div>
              {/* <div className="bg-[#2170e4] text-white rounded-lg rounded-tr-none px-3 py-2 text-xs max-w-[85%] ml-auto shadow-sm">
                Tôi muốn tìm hiểu thêm về gói Doanh nghiệp.
              </div>
              <div className="bg-white rounded-lg rounded-tl-none px-3 py-2 text-xs text-slate-600 max-w-[85%] shadow-sm">
                Được chứ! Gói Doanh nghiệp của chúng tôi bao gồm hỗ trợ 24/7. Bạn có muốn đặt lịch demo không?
              </div> */}
            </div>
            <div className="flex items-center gap-2 px-3 py-2 border-t border-slate-200">
              <input
                placeholder="Nhập tin nhắn..."
                className="flex-1 text-xs outline-none placeholder:text-slate-400"
              />
              <button className="text-[#2170e4]">
                <Send size={15} />
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button className="h-9 w-9 rounded-full bg-[#2170e4] text-white flex items-center justify-center shadow">
              <MessageCircle size={16} />
            </button>
            <button className="h-9 w-9 rounded-full bg-[#2170e4] text-white flex items-center justify-center shadow">
              <Phone size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Footer actions */}
      <div className="bottom-0 bg-white border-t border-slate-200 px-6 py-3 flex items-center justify-between">
        <p className="text-xs text-slate-400">
          <span className="text-[#2170e4] font-semibold">JobCentral |</span>{" "}
          Được vận hành bởi JobCentral · Tất cả dữ liệu được tự động lưu sau vài
          phút
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            className="px-4 py-2 rounded-lg border border-slate-300 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Lưu nháp
          </button>
          <button
            onClick={() => setStep((s) => Math.min(6, s + 1))}
            className="px-4 py-2 rounded-lg bg-[#2170e4] text-white text-sm font-medium hover:bg-[#1b5ec9]"
          >
            {step < 6 ? "Tiếp tục" : "Đăng tin"}
          </button>
        </div>
      </div>
    </div>
  );
}
