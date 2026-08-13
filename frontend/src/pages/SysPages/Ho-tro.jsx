import React, { useState, useRef } from "react";
import { useForm, ValidationError } from "@formspree/react";
import {
  Phone,
  Mail,
  MapPin,
  ChevronDown,
  FileText,
  Download,
  Paperclip,
  Check,
  Loader2,
} from "lucide-react";

const faqs = [
  {
    q: "Làm cách nào để khôi phục mật khẩu tài khoản Admin?",
    a: 'Vào trang đăng nhập, chọn "Quên mật khẩu", nhập email đăng ký. Hệ thống sẽ gửi liên kết đặt lại mật khẩu trong vòng vài phút.',
  },
  {
    q: "Staff có hỗ trợ tích hợp API với bên thứ ba không?",
    a: "Có. Gói Chuyên Nghiệp và Doanh Nghiệp đi kèm quyền truy cập API đầy đủ cùng tài liệu kỹ thuật chi tiết.",
  },
  {
    q: "Làm sao để gia hạn gói dịch vụ đã hết hạn?",
    a: 'Vào mục Cài đặt > Gói dịch vụ, chọn "Gia hạn ngay" và hoàn tất thanh toán. Dữ liệu của bạn được giữ nguyên trong suốt quá trình.',
  },
];

export default function SupportCenter() {
  const [openFaq, setOpenFaq] = useState(null);
  const [form, setForm] = useState({ title: "", type: "", detail: "" });
  const [state, handleSubmit] = useForm("xvkpawjg");
  const toggleFaq = (i) => setOpenFaq(openFaq === i ? null : i);
  const fileInputRef = useRef(null);


  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const handleSubmied = async (e) => {
    e.preventDefault();

    setSubmitting(true);
    setSucceeded(false);

    try {
      // Gọi API ở đây
      // await axios.post(...);
      setSucceeded(true);
    } catch (error) {
      console.error("Gửi yêu cầu thất bại:", error);
      setSucceeded(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        {/* Header */}
        <h1 className="text-2xl font-bold text-[#2170e4] mb-1">
          Trung tâm Hỗ trợ &amp; Liên hệ
        </h1>
        <p className="text-slate-500 mb-6">
          Xin chào! Chúng tôi có thể giúp gì cho bạn hôm nay?
        </p>

        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="border border-slate-200 rounded-xl p-4">
            <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center mb-3">
              <Phone className="w-4 h-4 text-blue-600" />
            </div>
            <p className="font-semibold text-slate-800 text-sm">Hotline 24/7</p>
            <p className="text-xs text-slate-500 mt-1 mb-3">
              Hỗ trợ ưu tiên dành cho doanh nghiệp.
            </p>
            <p className="text-sm font-semibold text-blue-600">0962.522.881</p>
          </div>

          <div className="border border-slate-200 rounded-xl p-4">
            <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center mb-3">
              <Mail className="w-4 h-4 text-blue-600" />
            </div>
            <p className="font-semibold text-slate-800 text-sm">
              Email Support
            </p>
            <p className="text-xs text-slate-500 mt-1 mb-3">
              Gửi yêu cầu chi tiết cho chúng tôi.
            </p>
            <p className="text-sm font-semibold text-blue-600">
              kietthaivo2006@gmail.com
            </p>
          </div>

          <div className="border border-slate-200 rounded-xl p-4">
            <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center mb-3">
              <MapPin className="w-4 h-4 text-blue-600" />
            </div>
            <p className="font-semibold text-slate-800 text-sm">Văn phòng</p>
            <p className="text-xs text-slate-500 mt-1 mb-3">
              250 Kinh Dương Vương, Phường Liên Chiểu, Thành phố Đà Nẵng.
            </p>
            <a
              href="https://maps.app.goo.gl/b4JNjGpGJ5aFfKva8"
              className="text-sm font-semibold text-blue-600 hover:underline"
            >
              Xem bản đồ →
            </a>
          </div>
        </div>

        {/* FAQ + Docs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="md:col-span-2 border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
              <h2 className="font-semibold text-slate-800">
                Câu hỏi thường gặp (FAQ)
              </h2>
            </div>
            <div className="divide-y divide-slate-100">
              {faqs.map((f, i) => (
                <div key={i}>
                  <button
                    onClick={() => toggleFaq(i)}
                    className="w-full flex items-center justify-between text-left px-5 py-4 hover:bg-slate-50 transition-colors"
                  >
                    <span className="text-sm font-medium text-slate-700">
                      {f.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 ml-3 transition-transform ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-4 -mt-1">
                      <p className="text-sm text-slate-500 leading-relaxed">
                        {f.a}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <button className="w-full text-center text-sm font-medium text-blue-600 bg-blue-50/60 py-3 hover:bg-blue-50 transition-colors">
              Xem tất cả 50+ câu hỏi thường gặp
            </button>
          </div>

          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-900 to-blue-950 p-5 flex flex-col justify-between text-white">
            <FileText className="absolute -right-3 -bottom-3 w-28 h-28 text-white/5" />
            <div className="relative">
              <h3 className="font-semibold mb-2">Tài liệu hướng dẫn</h3>
              <p className="text-xs text-blue-200 leading-relaxed">
                Khám phá cách tối ưu hóa quy trình tuyển dụng với bộ tài liệu
                HDSD chi tiết của STAFF.
              </p>
            </div>
            <button className="relative mt-4 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 transition-colors text-white text-sm font-semibold py-2.5 rounded-lg">
              Tải xuống PDF <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Support form */}

        <form onSubmit={handleSubmit}>
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 bg-blue-50/50 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-600" />
                <h2 className="font-semibold text-slate-800 text-sm">
                  Gửi yêu cầu hỗ trợ kỹ thuật
                </h2>
              </div>
              <span className="text-xs text-slate-400">
                Phản hồi trong vòng 2 giờ làm việc
              </span>
            </div>

            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Tiêu đề yêu cầu
                  </label>
                  <input
                    id="title"
                    type="text"
                    name="title"
                    placeholder="Tóm tắt vấn đề của bạn"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2.5 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">
                    Loại yêu cầu
                  </label>
                  <input
                    id="Classify"
                    type="text"
                    name="Classify"
                    placeholder="Phân loại"
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2.5 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-medium text-slate-600 mb-1.5">
                  Mô tả chi tiết
                </label>
                <textarea
                  id="desc"
                  name="desc"
                  rows={8}
                  placeholder="Vui lòng cung cấp chi tiết lỗi, các bước thực hiện hoặc hình ảnh liên quan..."
                  value={form.detail}
                  onChange={(e) => setForm({ ...form, detail: e.target.value })}
                  className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2.5 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="flex items-center justify-between">
                {/* <button className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 transition-colors">
                  <Paperclip className="w-3.5 h-3.5" />
                  Đính kèm ảnh chụp màn hình
                </button> */}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];

                    if (file) {
                      console.log("Đã chọn:", file);
                    }
                  }}
                />

                <button
                  className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 transition-colors"
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                >
                  <Paperclip className="w-3.5 h-3.5" />
                  Đính kèm ảnh chụp màn hình
                </button>

                <button
                  type="submit"
                  disabled={state.submitting}
                  className={`flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors text-white text-sm font-semibold px-5 py-2.5 rounded-lg`}
                >
                  {state.submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Đang gửi...
                    </>
                  ) : state.succeeded ? (
                    <>
                      <Check className="w-4 h-4 disabled:cursor-not-allowed" />
                      Đã gửi thành công
                    </>
                  ) : (
                    "Gửi yêu cầu ngay"
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
