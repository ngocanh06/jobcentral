import React, { useState, useEffect, useMemo } from "react";
import { MapPin, Eye, EyeOff, ChevronDown, Headset } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// const { login } = useAuth();
// const navigate = useNavigate();

const STEPS = ["Thông tin", "Công ty", "Xác thực"];

/* =====================================================================
 * Các component dùng chung — ĐẶT NGOÀI RightPanel.
 * Nếu khai báo bên trong RightPanel, mỗi lần gõ phím React sẽ tạo lại
 * component mới => ô input bị mất focus sau mỗi ký tự.
 * ===================================================================== */

const inputCls = (err) =>
  `h-12 w-full rounded-lg border bg-white px-4 text-base text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${
    err ? "border-red-400" : "border-slate-300"
  }`;

function Field({ label, error, children, tooltip }) {
  return (
    <div>
      <label className="mb-1.5 flex items-center gap-1.5 text-[14px] font-medium text-slate-700">
        {label}
        <span className="text-red-500">*</span>
        {tooltip && (
          <span className="group relative">
            <span className="flex h-4 w-4 cursor-help items-center justify-center rounded-full bg-slate-500 text-[10px] font-bold text-white">
              ?
            </span>
            <span className="pointer-events-none absolute left-6 top-1/2 z-10 hidden w-60 -translate-y-1/2 rounded bg-slate-800 p-2 text-xs font-normal text-white group-hover:block">
              {tooltip}
            </span>
          </span>
        )}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

function PasswordInput({ value, onChange, onBlur, error }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <input
        type={visible ? "text" : "password"}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`${inputCls(error)} pr-12`}
        autoComplete="new-password"
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
      >
        {visible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
      </button>
    </div>
  );
}

function Stepper({ current = 0 }) {
  return (
    <div className="flex w-full items-stretch">
      {STEPS.map((label, i) => {
        const active = i === current;
        const first = i === 0;
        const last = i === STEPS.length - 1;
        const d = 18; // độ sâu mũi tên (px)

        const clip = `polygon(
          0 0,
          ${last ? "100% 0, 100% 100%" : `calc(100% - ${d}px) 0, 100% 50%, calc(100% - ${d}px) 100%`},
          0 100%
          ${first ? "" : `, ${d}px 50%`}
        )`;

        return (
          <div
            key={label}
            style={{ clipPath: clip }}
            className={`flex h-12 flex-1 items-center justify-center gap-2 whitespace-nowrap text-sm ${
              first ? "" : "-ml-1"
            } ${
              active
                ? "bg-blue-600 font-medium text-white"
                : "bg-slate-200 text-slate-600"
            }`}
          >
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                active ? "bg-white/25" : "bg-slate-300"
              }`}
            >
              {i + 1}
            </span>
            {label}
          </div>
        );
      })}
    </div>
  );
}

/* Dùng cho bước 2 (Công ty) — chưa hiển thị ở bước 1 */

function ProvinceField({ value, onChange, onBlur, error }) {
  const [provinces, setProvinces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const date = "2025-07-01";
    const url_connect = `/address-kit/${date}/provinces`;
    const controller = new AbortController();
    setLoading(true);
    setLoadError("");

    fetch(url_connect, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Không thể tải danh sách tỉnh thành ${res.status}`);
        }
        return res.json();
      })

      .then((data) => {
        const items = data.provinces ?? data;
        if (!Array.isArray(items)) {
          throw new Error(`Dữ liệu tỉnh thành không hợp lệ`.data);
        }
        setProvinces(items);
        console.log("dữ liệu đầu ra", data.provinces);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Lỗi tải danh sách tỉnh thành:", err);
          setLoadError("Không thể tải danh sách tỉnh thành. Vui lòng thử lại.");
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [attempt]);

  return (
    <Field label="Tỉnh / Thành phố" error={error || loadError}>
      <span className="relative flex items-center">
        <MapPin className="pointer-events-none absolute left-3 h-4 w-4 text-slate-400" />
        <select
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={loading || Boolean(loadError)}
          className={`${inputCls(error || loadError)} appearance-none pl-9 disabled:opacity-50`}
        >
          <option value="" disabled>
            {loading
              ? "Đang tải dữ liệu..."
              : loadError
                ? "Không thể tải danh sách"
                : "Chọn Tỉnh / Thành phố"}
          </option>
          {provinces.map((p) => (
            <option key={p.code} value={p.code}>
              {p.name}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 h-4 w-4 text-slate-400" />
      </span>
      {loadError && (
        <button
          type="button"
          onClick={() => setAttempt((current) => current + 1)}
          className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          Tải lại danh sách
        </button>
      )}
    </Field>
  );
}

/* ============================ Panel trái ============================ */
const slideshowSlides = [
  {
    image: "/picture/banner_outside1.png",
    text: "Nền tảng bứt phá – Nâng tầm sự nghiệp",
  },
  {
    image: "/picture/banner_outside3.png",
    text: "Tuyển dụng hiệu quả cùng HIRA hỗ trợ",
  },
  {
    image: "/picture/banner_outside2.png",
    text: "Tuyển dụng thông minh – Hiệu quả vượt trội",
  },
];

function LeftPanel() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveImageIndex(
        (currentIndex) => (currentIndex + 1) % slideshowSlides.length,
      );
    }, 7000);

    return () => clearInterval(intervalId);
  }, [activeImageIndex]);

  const showImage = (index) => {
    setActiveImageIndex(
      (index + slideshowSlides.length) % slideshowSlides.length,
    );
  };

  return (
    <div className="relative flex h-full flex-col justify-between overflow-hidden bg-[#0a131c] bg-gradient-to-t from-[#0a131c] from-0% to-[#1e85d4] to-[85%] px-8 py-10 text-slate-100 lg:px-12 lg:py-12">
      <div className="relative z-10">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600">
            <img
              src={"/picture/Logo_JobCentral.png"}
              alt="Logo JobCentral"
              className="h-full w-full rounded-lg object-contain"
            />
          </div>
          <span className="text-lg font-semibold leading-tight text-white">
            JobCentral
          </span>
        </div>

        <h1 className="text-4xl font-bold leading-[1.15] text-white sm:text-[42px]">
          Bắt đầu tuyển dụng nhân tài cùng JobCentral
        </h1>

        <div className="mt-8 rounded-2xl border border-slate-700/60 bg-slate-800/40 p-5 backdrop-blur-sm">
          <div className="overflow-hidden rounded-xl">
            <img
              key={activeImageIndex}
              src={slideshowSlides[activeImageIndex].image}
              alt={`Minh họa JobCentral ${activeImageIndex + 1}`}
              className="w-full rounded-xl animate-[slideshowFade_500ms_ease-in-out]"
            />
          </div>

          <div className="mt-3 flex items-center justify-center">
            <div className="flex items-center gap-2" aria-label="Chọn ảnh">
              {slideshowSlides.map((slide, index) => (
                <button
                  key={slide.image}
                  type="button"
                  onClick={() => showImage(index)}
                  aria-label={`Chuyển đến ảnh ${index + 1}`}
                  aria-current={index === activeImageIndex ? "true" : undefined}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeImageIndex
                      ? "w-6 bg-white"
                      : "w-2 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="mt-4 flex justify-center border-t border-slate-700/60 pt-4">
            <span
              key={activeImageIndex}
              className="text-center font-semibold text-lg animate-[slideshowFade_500ms_ease-in-out]"
            >
              {slideshowSlides[activeImageIndex].text}
            </span>
          </div>
          <style>{`
            @keyframes slideshowFade {
              from { opacity: 0.35; transform: scale(0.985); }
              to { opacity: 1; transform: scale(1); }
            }
          `}</style>
        </div>
      </div>

      <div className="flex justify-center">
        <img
          src="/picture/Powered.png"
          alt="Powered by"
          className="h-20 w-60 rounded-xl"
        />
      </div>
    </div>
  );
}

/* ============================ Panel phải ============================ */

function RightPanel() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [company, setCompany] = useState({
    name: "",
    website: "",
    province: "",
    address: "",
  });
  const [verificationCode, setVerificationCode] = useState("");
  const [touched, setTouched] = useState({});
  const [companyTouched, setCompanyTouched] = useState({});

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const blur = (k) => () => setTouched((t) => ({ ...t, [k]: true }));
  const setCompanyField = (k) => (e) =>
    setCompany((c) => ({ ...c, [k]: e.target.value }));
  const blurCompanyField = (k) => () =>
    setCompanyTouched((t) => ({ ...t, [k]: true }));

  const errors = useMemo(() => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Vui lòng nhập tên";
    if (!form.lastName.trim()) e.lastName = "Vui lòng nhập họ";
    if (!/^(0|\+84)\d{9}$/.test(form.phone.replace(/\s/g, "")))
      e.phone = "Số điện thoại không hợp lệ";
    if (!/^\S+@\S+\.\S+$/.test(form.email))
      e.email = "Địa chỉ email không hợp lệ";
    if (form.password.length < 8) e.password = "Mật khẩu tối thiểu 8 ký tự";
    if (!form.confirm || form.confirm !== form.password)
      e.confirm = "Mật khẩu nhập lại không khớp";
    return e;
  }, [form]);

  const companyErrors = useMemo(() => {
    const e = {};
    if (!company.name.trim()) e.name = "Vui lòng nhập tên công ty";
    if (!company.province) e.province = "Vui lòng chọn tỉnh / thành phố";
    if (!company.address.trim()) e.address = "Vui lòng nhập địa chỉ công ty";
    return e;
  }, [company]);

  const valid = Object.keys(errors).length === 0;
  const show = (k) => (touched[k] ? errors[k] : undefined);

  const handleAccountSubmit = (ev) => {
    ev.preventDefault();
    if (!valid) {
      setTouched({
        firstName: true,
        lastName: true,
        phone: true,
        email: true,
        password: true,
        confirm: true,
      });
      return;
    }
    setStep(1);
  };

  const handleCompanySubmit = (ev) => {
    ev.preventDefault();
    if (Object.keys(companyErrors).length > 0) {
      setCompanyTouched({
        name: true,
        website: true,
        province: true,
        address: true,
      });
      return;
    }
    setStep(2);
  };

  return (
    <div className="flex h-full flex-col bg-white px-6 py-8 sm:px-10 lg:px-14 lg:py-10">
      {/* Top bar */}
      <div className="mx-auto w-full max-w-lg">
        <h2 className="text-2xl font-bold text-slate-900">
          Đăng ký Tài khoản Doanh nghiệp
        </h2>
        <div className="mt-8">
          <Stepper current={step} />
        </div>

        {step === 0 && (
          <form
            onSubmit={handleAccountSubmit}
            noValidate
            className="mt-8 space-y-4"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Tên" error={show("firstName")}>
                <input
                  className={inputCls(show("firstName"))}
                  value={form.firstName}
                  onChange={set("firstName")}
                  onBlur={blur("firstName")}
                />
              </Field>
              <Field label="Họ" error={show("lastName")}>
                <input
                  className={inputCls(show("lastName"))}
                  value={form.lastName}
                  onChange={set("lastName")}
                  onBlur={blur("lastName")}
                />
              </Field>
            </div>

            <Field label="Điện thoại" error={show("phone")}>
              <input
                type="tel"
                className={inputCls(show("phone"))}
                value={form.phone}
                onChange={set("phone")}
                onBlur={blur("phone")}
              />
            </Field>

            <Field label="Địa chỉ email" error={show("email")}>
              <input
                type="email"
                className={inputCls(show("email"))}
                value={form.email}
                onChange={set("email")}
                onBlur={blur("email")}
              />
            </Field>

            <Field
              label="Mật khẩu"
              error={show("password")}
              tooltip="Mật khẩu tối thiểu 8 ký tự, nên gồm chữ hoa, chữ thường và số."
            >
              <PasswordInput
                value={form.password}
                onChange={set("password")}
                onBlur={blur("password")}
                error={show("password")}
              />
            </Field>

            <Field label="Nhập lại mật khẩu" error={show("confirm")}>
              <PasswordInput
                value={form.confirm}
                onChange={set("confirm")}
                onBlur={blur("confirm")}
                error={show("confirm")}
              />
            </Field>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={!valid}
                className="h-12 rounded-lg bg-orange-600 px-8 text-base font-medium text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-orange-300"
              >
                Tiếp tục
              </button>
            </div>
          </form>
        )}

        {step === 1 && (
          <form
            onSubmit={handleCompanySubmit}
            noValidate
            className="mt-8 space-y-4"
          >
            <Field
              label="Tên công ty"
              error={companyTouched.name && companyErrors.name}
            >
              <input
                className={inputCls(companyTouched.name && companyErrors.name)}
                value={company.name}
                onChange={setCompanyField("name")}
                onBlur={blurCompanyField("name")}
                autoComplete="organization"
              />
            </Field>

            <Field
              label="Website công ty"
              error={companyTouched.website && companyErrors.website}
              tooltip="Không bắt buộc. Có thể nhập example.com hoặc https://example.com."
            >
              <input
                type="url"
                className={inputCls(
                  companyTouched.website && companyErrors.website,
                )}
                value={company.website}
                onChange={setCompanyField("website")}
                onBlur={blurCompanyField("website")}
                autoComplete="url"
              />
            </Field>

            <ProvinceField
              value={company.province}
              onChange={setCompanyField("province")}
              onBlur={blurCompanyField("province")}
              error={companyTouched.province && companyErrors.province}
            />

            <Field
              label="Địa chỉ cụ thể"
              error={companyTouched.address && companyErrors.address}
            >
              <input
                className={inputCls(
                  companyTouched.address && companyErrors.address,
                )}
                value={company.address}
                onChange={setCompanyField("address")}
                onBlur={blurCompanyField("address")}
                autoComplete="street-address"
              />
            </Field>

            <div className="flex justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(0)}
                className="h-12 rounded-lg border border-slate-300 px-6 text-base font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Quay lại
              </button>
              <button
                type="submit"
                disabled={Object.keys(companyErrors).length > 0}
                className="h-12 rounded-lg bg-orange-600 px-8 text-base font-medium text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-orange-300"
              >
                Tiếp tục
              </button>
            </div>
          </form>
        )}

        {step === 2 && (
          <div className="mt-8 space-y-5">
            <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-4 text-sm text-slate-700">
              <p>
                Mã xác thực sẽ được gửi tới <strong>{form.email}</strong> sau
                khi hệ thống tích hợp API gửi email.
              </p>
            </div>

            <Field label="Mã xác thực email">
              <input
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                value={verificationCode}
                onChange={(e) =>
                  setVerificationCode(
                    e.target.value.replace(/\D/g, "").slice(0, 6),
                  )
                }
                placeholder="XXX-XXX"
                className={inputCls()}
              />
            </Field>

            <p role="status" className="text-sm text-amber-700">
              Chưa thể gửi hoặc xác minh mã: cần tích hợp API backend trước khi
              hoàn tất đăng ký.
            </p>

            <div className="flex justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="h-12 rounded-lg border border-slate-300 px-6 text-base font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Quay lại
              </button>
              <button
                type="button"
                disabled
                title="Cần tích hợp API xác thực email"
                className="h-12 cursor-not-allowed rounded-lg bg-orange-300 px-8 text-base font-medium text-white"
              >
                Xác thực
              </button>
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <span className="h-px flex-1 bg-slate-200" />
        </div>

        {/* Đã có tài khoản */}

        <div className="mt-6 flex items-center justify-center gap-1.5 rounded-xl border border-blue-100 bg-blue-50/60 px-4 py-3.5 text-sm">
          <p className="text-slate-600">Bạn đã có tài khoản?</p>

          <Link
            to="/LogIn"
            className="font-semibold text-blue-600 underline-offset-4 transition hover:text-blue-700 hover:underline"
          >
            Đăng nhập ngay
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function BusinessSignupPage() {
  return (
    <div className="min-h-screen w-full bg-slate-100">
      <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[minmax(360px,36%)_1fr]">
        <LeftPanel />
        <RightPanel />
      </div>
    </div>
  );
}
