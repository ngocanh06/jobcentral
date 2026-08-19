import React, { useState } from "react";
import { Check, User, Building2, ShieldCheck, Eye, EyeOff, AlertCircle } from "lucide-react";

// ---------- Reusable field components ----------

function Field({ label, required, children, error }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-medium text-slate-600">
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      {children}
      {error && (
        <span className="flex items-center gap-1 text-xs text-rose-500">
          <AlertCircle size={12} /> {error}
        </span>
      )}
    </div>
  );
}

function TextInput({ error, disabled, ...props }) {
  return (
    <input
      {...props}
      disabled={disabled}
      className={`w-full rounded-lg border px-3 py-2.5 text-[14px] text-slate-800 placeholder:text-slate-400 outline-none transition
        ${disabled ? "bg-slate-50 text-slate-500 cursor-not-allowed" : "bg-white"}
        ${error ? "border-rose-400 focus:ring-2 focus:ring-rose-100" : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"}
      `}
    />
  );
}

function TextArea({ error, ...props }) {
  return (
    <textarea
      {...props}
      rows={4}
      className={`w-full rounded-lg border px-3 py-2.5 text-[14px] text-slate-800 placeholder:text-slate-400 outline-none transition resize-none
        ${error ? "border-rose-400 focus:ring-2 focus:ring-rose-100" : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"}
      `}
    />
  );
}

function Select({ error, children, ...props }) {
  return (
    <select
      {...props}
      className={`w-full rounded-lg border bg-white px-3 py-2.5 text-[14px] text-slate-800 outline-none transition
        ${error ? "border-rose-400" : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"}
      `}
    >
      {children}
    </select>
  );
}

function SectionCard({ title, children }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-200 bg-slate-50 px-5 py-3">
        <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </h3>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function Toast({ message, onClose }) {
  React.useEffect(() => {
    const t = setTimeout(onClose, 2500);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 animate-[fadeIn_.2s_ease]">
      <div className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-sm text-white shadow-lg">
        <Check size={16} className="text-emerald-400" />
        {message}
      </div>
    </div>
  );
}

// ---------- Tab 1: Tài khoản (Personal account info) ----------

function AccountTab({ onSaved }) {
  const [form, setForm] = useState({
    fullName: "Nguyễn Minh Anh",
    email: "minhanh.hr@recruitflow.vn",
    phone: "+84 901 234 567",
    country: "",
    city: "",
    address: "",
    fax: "",
  });
  const [errors, setErrors] = useState({});

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!form.fullName.trim()) next.fullName = "Vui lòng nhập họ và tên";
    if (!form.phone.trim()) next.phone = "Vui lòng nhập số điện thoại";
    else if (!/^\+?[0-9\s]{8,15}$/.test(form.phone.trim()))
      next.phone = "Số điện thoại không hợp lệ";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onSaved("Đã cập nhật thông tin tài khoản");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <SectionCard title="Thông tin liên hệ">
        <div className="flex flex-col gap-4">
          <Field label="Họ và tên" required error={errors.fullName}>
            <TextInput
              value={form.fullName}
              onChange={update("fullName")}
              placeholder="Nhập họ và tên"
              error={errors.fullName}
            />
          </Field>

          <Field label="Email (Đã xác thực)">
            <div className="relative">
              <TextInput value={form.email} disabled readOnly />
              <Check
                size={16}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500"
              />
            </div>
          </Field>

          <Field label="Số điện thoại" required error={errors.phone}>
            <TextInput
              value={form.phone}
              onChange={update("phone")}
              placeholder="+84 ..."
              error={errors.phone}
            />
          </Field>
        </div>
      </SectionCard>

      <SectionCard title="Địa chỉ liên hệ">
        <div className="flex flex-col gap-4">
          <Field label="Quốc gia">
            <TextInput
              value={form.country}
              onChange={update("country")}
              placeholder="Ví dụ: Việt Nam"
            />
          </Field>
          <Field label="Thành phố / Tỉnh">
            <TextInput
              value={form.city}
              onChange={update("city")}
              placeholder="Ví dụ: Đà Nẵng"
            />
          </Field>
          <Field label="Địa chỉ chi tiết">
            <TextInput
              value={form.address}
              onChange={update("address")}
              placeholder="Số nhà, đường, phường/xã..."
            />
          </Field>
          <Field label="Fax">
            <TextInput value={form.fax} onChange={update("fax")} placeholder="Không bắt buộc" />
          </Field>
        </div>
      </SectionCard>

      <div className="flex justify-center pt-1">
        <button
          type="submit"
          className="rounded-lg border border-blue-500 px-8 py-2.5 text-sm font-medium text-blue-600 transition hover:bg-blue-50 active:scale-[0.98]"
        >
          Cập nhật
        </button>
      </div>
    </form>
  );
}

// ---------- Tab 2: Thông tin công ty ----------

function CompanyTab({ onSaved }) {
  const [form, setForm] = useState({
    companyName: "",
    licenseNumber: "",
    foundedDate: "",
    legalRep: "",
    taxCode: "",
    size: "Dưới 50",
    industry: "Công nghệ thông tin",
    headquarters: "",
    intro: "",
    website: "",
    linkedin: "",
    facebook: "",
  });
  const [errors, setErrors] = useState({});

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!form.companyName.trim()) next.companyName = "Vui lòng nhập tên doanh nghiệp";
    if (!form.licenseNumber.trim()) next.licenseNumber = "Vui lòng nhập số giấy phép kinh doanh";
    if (!form.intro.trim()) next.intro = "Vui lòng giới thiệu công ty";
    const urlFields = ["website", "linkedin", "facebook"];
    urlFields.forEach((f) => {
      if (form[f] && !/^https?:\/\/.+/.test(form[f])) {
        next[f] = "URL phải bắt đầu bằng http:// hoặc https://";
      }
    });
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onSaved("Đã cập nhật thông tin công ty");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <SectionCard title="Thông tin pháp lý & doanh nghiệp">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Tên doanh nghiệp đầy đủ" required error={errors.companyName}>
            <TextInput
              value={form.companyName}
              onChange={update("companyName")}
              placeholder="Ví dụ: Công ty TNHH RecruitFlow"
              error={errors.companyName}
            />
          </Field>
          <Field label="Số giấy phép kinh doanh" required error={errors.licenseNumber}>
            <TextInput
              value={form.licenseNumber}
              onChange={update("licenseNumber")}
              placeholder="Ví dụ: 0312345678"
              error={errors.licenseNumber}
            />
          </Field>
          <Field label="Ngày thành lập">
            <TextInput type="date" value={form.foundedDate} onChange={update("foundedDate")} />
          </Field>
          <Field label="Người đại diện pháp luật">
            <TextInput
              value={form.legalRep}
              onChange={update("legalRep")}
              placeholder="Họ và tên"
            />
          </Field>
          <Field label="Mã số thuế">
            <TextInput value={form.taxCode} onChange={update("taxCode")} placeholder="Mã số thuế" />
          </Field>
          <Field label="Quy mô nhân sự">
            <Select value={form.size} onChange={update("size")}>
              <option>Dưới 50</option>
              <option>50 - 200</option>
              <option>200 - 500</option>
              <option>Trên 500</option>
            </Select>
          </Field>
          <Field label="Lĩnh vực hoạt động">
            <Select value={form.industry} onChange={update("industry")}>
              <option>Công nghệ thông tin</option>
              <option>Tài chính - Ngân hàng</option>
              <option>Sản xuất</option>
              <option>Bán lẻ</option>
              <option>Giáo dục</option>
              <option>Khác</option>
            </Select>
          </Field>
          <Field label="Trụ sở chính">
            <TextInput
              value={form.headquarters}
              onChange={update("headquarters")}
              placeholder="Địa chỉ trụ sở chính"
            />
          </Field>
        </div>
      </SectionCard>

      <SectionCard title="Nhận diện doanh nghiệp">
        <div className="flex flex-col gap-4">
          <Field label="Giới thiệu công ty" required error={errors.intro}>
            <TextArea
              value={form.intro}
              onChange={update("intro")}
              placeholder="Mô tả ngắn gọn về sứ mệnh và giá trị của công ty..."
              error={errors.intro}
            />
          </Field>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Website chính thức" error={errors.website}>
              <TextInput
                value={form.website}
                onChange={update("website")}
                placeholder="https://example.com"
                error={errors.website}
              />
            </Field>
            <Field label="LinkedIn Profile" error={errors.linkedin}>
              <TextInput
                value={form.linkedin}
                onChange={update("linkedin")}
                placeholder="https://linkedin.com/company/..."
                error={errors.linkedin}
              />
            </Field>
          </div>
          <Field label="Facebook Page" error={errors.facebook}>
            <TextInput
              value={form.facebook}
              onChange={update("facebook")}
              placeholder="https://facebook.com/..."
              error={errors.facebook}
            />
          </Field>
        </div>
      </SectionCard>

      <div className="flex justify-center pt-1">
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-8 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98]"
        >
          Cập nhật
        </button>
      </div>
    </form>
  );
}

// ---------- Tab 3: Bảo mật & Mật khẩu ----------

function SecurityTab({ onSaved }) {
  const [form, setForm] = useState({
    username: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [show, setShow] = useState({ old: false, next: false, confirm: false });
  const [errors, setErrors] = useState({});

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const next = {};
    if (!form.username.trim()) next.username = "Vui lòng nhập email hoặc tên đăng nhập";
    if (!form.oldPassword) next.oldPassword = "Vui lòng nhập mật khẩu cũ";
    if (!form.newPassword) next.newPassword = "Vui lòng nhập mật khẩu mới";
    else if (form.newPassword.length < 8)
      next.newPassword = "Mật khẩu mới phải có ít nhất 8 ký tự";
    if (!form.confirmPassword) next.confirmPassword = "Vui lòng xác thực mật khẩu mới";
    else if (form.newPassword && form.confirmPassword !== form.newPassword)
      next.confirmPassword = "Mật khẩu xác thực không khớp";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleReset = () => {
    setForm({ username: "", oldPassword: "", newPassword: "", confirmPassword: "" });
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSaved("Đã đổi mật khẩu thành công");
      handleReset();
    }
  };

  const pwField = (key, label, showKey) => (
    <Field label={label} required error={errors[key]}>
      <div className="relative">
        <TextInput
          type={show[showKey] ? "text" : "password"}
          value={form[key]}
          onChange={update(key)}
          placeholder="••••••••"
          error={errors[key]}
        />
        <button
          type="button"
          onClick={() => setShow((s) => ({ ...s, [showKey]: !s[showKey] }))}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          tabIndex={-1}
        >
          {show[showKey] ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </Field>
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <SectionCard title="Đổi mật khẩu">
        <div className="flex flex-col gap-4">
          <Field label="Email/ Tên đăng nhập" required error={errors.username}>
            <TextInput
              value={form.username}
              onChange={update("username")}
              placeholder="email@congty.vn"
              error={errors.username}
            />
          </Field>
          {pwField("oldPassword", "Mật khẩu cũ", "old")}
          {pwField("newPassword", "Mật khẩu mới", "next")}
          {pwField("confirmPassword", "Xác thực mật khẩu mới", "confirm")}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98]"
          >
            Hủy
          </button>
          <button
            type="submit"
            className="rounded-lg border border-blue-500 px-6 py-2.5 text-sm font-medium text-blue-600 transition hover:bg-blue-50 active:scale-[0.98]"
          >
            Lưu
          </button>
        </div>
      </SectionCard>
    </form>
  );
}

// ---------- Root component ----------

const TABS = [
  { id: "account", label: "Tài khoản", icon: User },
  { id: "company", label: "Thông tin công ty", icon: Building2 },
  { id: "security", label: "Bảo mật & Mật khẩu", icon: ShieldCheck },
];

export default function AccountSettings() {
  const [activeTab, setActiveTab] = useState("account");
  const [toast, setToast] = useState(null);

  const showToast = (msg) => setToast(msg);

  return (
    <div className="min-h-screen w-full bg-slate-100 py-8">
      <div className="px-4">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl md:text-3xl font-bold text-[#2170e4]">Thiết lập tài khoản</h1>
          <p className="mt-1 text-sm text-slate-400">
            Quản lý thông tin cá nhân, hồ sơ doanh nghiệp và tùy chỉnh hệ thống.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-5 flex gap-1 rounded-t-xl border-b border-slate-200 bg-white px-2 pt-1">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 border-b-2 px-4 py-3 text-sm font-medium transition
                  ${
                    isActive
                      ? "border-blue-600 text-blue-600"
                      : "border-transparent text-slate-500 hover:text-slate-700"
                  }
                `}
              >
                <Icon size={15} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="rounded-xl border-2 border-blue-500 bg-slate-50 p-5">
          {activeTab === "account" && <AccountTab onSaved={showToast} />}
          {activeTab === "company" && <CompanyTab onSaved={showToast} />}
          {activeTab === "security" && <SecurityTab onSaved={showToast} />}
        </div>
      </div>

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translate(-50%, 10px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
      `}</style>
    </div>
  );
}