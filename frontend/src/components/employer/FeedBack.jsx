import { useState, useEffect, useRef } from "react";

const LABELS = ["Rất tệ", "Chưa tốt", "Bình thường", "Tốt", "Tuyệt vời"];

function Star({ filled, className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8L12 2.5z" />
    </svg>
  );
}

export default function FeedbackWidget({ onSubmit }) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const panelRef = useRef(null);

  // Đóng khi nhấn Esc
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const reset = () => {
    setRating(0);
    setHover(0);
    setComment("");
    setSent(false);
  };

  const handleClose = () => {
    setOpen(false);
    if (sent) setTimeout(reset, 300);
  };

  const handleSubmit = async () => {
    if (!rating) return;
    setLoading(true);
    try {
      // Gọi API của bạn ở đây (hoặc truyền qua prop onSubmit)
      await (onSubmit ? onSubmit({ rating, comment }) : Promise.resolve());
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  const active = hover || rating;

  return (
    <div className="fixed right-4 top-[62%] z-50 flex items-start">
      {/* Panel đánh giá */}
      <div
        ref={panelRef}
        role="dialog"
        aria-label="Gửi phản hồi"
        className={`absolute right-full mr-3 w-[400px] origin-right rounded-xl border border-slate-200 bg-white p-4 shadow-xl transition-all duration-200 sm:w-[400px] ${
          open
            ? "pointer-events-auto translate-x-0 scale-100 opacity-100"
            : "pointer-events-none translate-x-4 scale-95 opacity-0"
        }`}
        style={{ top: "-9rem" }}
      >
        {sent ? (
          <div className="py-6 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
            </div>
            <p className="font-semibold text-slate-900">Cảm ơn bạn đã đánh giá!</p>
            <p className="mt-1 text-sm text-slate-500">Phản hồi của bạn giúp chúng tôi cải thiện trang web.</p>
            <button
              onClick={handleClose}
              className="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
            >
              Đóng
            </button>
          </div>
        ) : (
          <>
            <div className="mb-3 flex items-start justify-between">
              <div>
                <p className="font-black text-blue-600">Trải nghiệm của bạn đối với JobCentral</p>
              </div>
              <button
                onClick={handleClose}
                aria-label="Đóng"
                className="-mr-1 -mt-1 rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            {/* 5 ngôi sao */}
            <div className="flex items-center gap-1" onMouseLeave={() => setHover(0)}>
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  aria-label={`${n} sao`}
                  onMouseEnter={() => setHover(n)}
                  onClick={() => setRating(n)}
                  className={`rounded p-0.5 transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                    n <= active ? "text-amber-400" : "text-slate-300"
                  }`}
                >
                  <Star filled={n <= active} className="h-8 w-8" />
                </button>
              ))}
              <span className="ml-2 text-sm font-medium text-slate-600">
                {active ? LABELS[active - 1] : ""}
              </span>
            </div>

            {/* Mô tả thêm: chỉ hiện sau khi đã chọn sao */}
            <div
              className={`grid transition-all duration-300 ${
                rating ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <label htmlFor="fb-comment" className="mb-1 block text-sm font-medium text-slate-700">
                  Mô tả cho chúng tôi về trải nghiệm của bạn
                </label>
                <textarea
                  id="fb-comment"
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Bạn thích hoặc chưa hài lòng điều gì?"
                  className="w-full resize-none rounded-lg border border-rose-700 p-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-200"
                />
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="mt-3 w-full rounded-lg bg-rose-900 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700 disabled:opacity-60"
                >
                  {loading ? "Đang gửi..." : "Gửi đánh giá"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Tab chữ dọc */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="rounded-l-lg bg-rose-900 px-2.5 py-4 text-sm font-semibold tracking-wide text-white shadow-lg transition-colors hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        style={{ writingMode: "vertical-rl" }}
      >
        FeedBack
      </button>
    </div>
  );
}