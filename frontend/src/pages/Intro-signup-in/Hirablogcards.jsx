import React, { useState } from "react";

// Đặt char_AIpixel.png vào thư mục public/ (hoặc đổi đường dẫn tại đây)
const HIRA_IMG = "/char_AIpixel.png";

// Mỗi thẻ cắt một vùng khác nhau của ảnh: cx, cy là tâm vùng (0-1), z là độ phóng
const posts = [
  {
    tag: "Giới thiệu",
    title: "HIRA là ai?",
    excerpt:
      "HIRA là trợ lý AI dành cho nhà tuyển dụng. HIRA đọc yêu cầu công việc, làm việc cùng bạn và đưa ra gợi ý để bạn tuyển người nhanh hơn.",
    detail: [
      "HIRA được tạo ra để giảm những việc lặp lại trong tuyển dụng như lọc hồ sơ, hẹn lịch và viết email, để nhà tuyển dụng dành thời gian cho các cuộc trò chuyện với ứng viên.",
      "HIRA không thay bạn quyết định. Mỗi đề xuất đều đi kèm lý do, bạn xem, chỉnh và chọn.",
    ],
    points: ["Hiểu mô tả công việc bằng ngôn ngữ tự nhiên", "Giải thích lý do cho từng đề xuất", "Làm việc cùng bạn trên toàn bộ quy trình"],
    crop: { cx: 0.5, cy: 0.5, z: 1 },
  },
  {
    tag: "Tính năng",
    title: "Gợi ý ứng viên phù hợp",
    excerpt:
      "HIRA quét kho hồ sơ, so khớp kỹ năng, kinh nghiệm và mức lương mong muốn với mô tả công việc.",
    detail: [
      "Bạn dán mô tả công việc hoặc chỉ cần nói vị trí cần tuyển. HIRA tách ra các yêu cầu bắt buộc và yêu cầu nên có, sau đó tìm trong kho hồ sơ những người khớp nhất.",
      "Kết quả là danh sách đã xếp hạng, mỗi người có phần giải thích ngắn vì sao được đề xuất.",
    ],
    points: ["So khớp kỹ năng và số năm kinh nghiệm", "Đối chiếu mức lương mong muốn", "Xếp hạng kèm lý do"],
    crop: { cx: 0.17, cy: 0.2, z: 2.6 },
  },
  {
    tag: "Tính năng",
    title: "Chấm điểm và tóm tắt hồ sơ",
    excerpt:
      "Mỗi CV được tóm tắt trong vài dòng kèm điểm phù hợp và lý do.",
    detail: [
      "Thay vì đọc từng CV dài, bạn xem bản tóm tắt gồm kinh nghiệm chính, kỹ năng nổi bật và mức độ phù hợp với vị trí.",
      "HIRA cũng chỉ ra những điểm còn thiếu hoặc chưa rõ để bạn biết cần hỏi gì khi phỏng vấn.",
    ],
    points: ["Tóm tắt CV trong vài dòng", "Điểm phù hợp theo từng tiêu chí", "Gợi ý câu hỏi cần làm rõ"],
    crop: { cx: 0.13, cy: 0.46, z: 2.6 },
  },
  {
    tag: "Tính năng",
    title: "Sắp lịch phỏng vấn tự động",
    excerpt:
      "HIRA đối chiếu lịch của hai bên, đề xuất khung giờ còn trống và gửi lời mời.",
    detail: [
      "Sau khi bạn chọn ứng viên, HIRA xem lịch của người phỏng vấn, đề xuất các khung giờ trống và gửi cho ứng viên lựa chọn.",
      "Khi ứng viên xác nhận, lịch được thêm vào cho cả hai bên và HIRA nhắc trước giờ hẹn.",
    ],
    points: ["Đối chiếu lịch nhiều người phỏng vấn", "Gửi lời mời và nhắc lịch", "Đổi lịch nhanh khi có thay đổi"],
    crop: { cx: 0.81, cy: 0.17, z: 2.6 },
  },
  {
    tag: "Tính năng",
    title: "Soạn email theo giọng công ty",
    excerpt:
      "Thư mời phỏng vấn, thư cảm ơn, thư từ chối lịch sự đều được HIRA soạn sẵn.",
    detail: [
      "HIRA soạn email theo từng giai đoạn của quy trình và theo giọng văn bạn muốn, trang trọng hoặc thân thiện.",
      "Bạn xem lại, chỉnh nếu cần rồi gửi. Ứng viên nào cũng nhận được phản hồi đúng hẹn.",
    ],
    points: ["Thư mời phỏng vấn và thư cảm ơn", "Thư từ chối lịch sự", "Giữ nhất quán giọng văn công ty"],
    crop: { cx: 0.87, cy: 0.35, z: 2.6 },
  },
  {
    tag: "Tính năng",
    title: "Đề xuất offer và thương lượng",
    excerpt:
      "Dựa trên dữ liệu thị trường và khung lương nội bộ, HIRA gợi ý mức offer phù hợp.",
    detail: [
      "Khi đến bước chốt, HIRA đối chiếu mong muốn của ứng viên với khung lương nội bộ và mặt bằng thị trường để gợi ý mức offer.",
      "HIRA cũng nêu các điểm có thể thương lượng như thưởng, phúc lợi hoặc ngày bắt đầu để hai bên dễ đạt thỏa thuận.",
    ],
    points: ["Gợi ý mức offer theo khung lương", "Các điểm có thể thương lượng", "Soạn sẵn thư offer"],
    crop: { cx: 0.88, cy: 0.5, z: 2.6 },
  },
];

function Cover({ crop }) {
  const r = 9 / 16; // tỉ lệ cao/rộng của khung ảnh
  const { cx, cy, z } = crop;
  const px = z === 1 ? 50 : ((cx * z - 0.5) / (z - 1)) * 100;
  const py = z <= r ? 50 : ((cy * z - r / 2) / (z - r)) * 100;
  const clamp = (v) => Math.min(100, Math.max(0, v));
  return (
    <div
      role="img"
      aria-label="Hình minh họa HIRA"
      className="aspect-video w-full bg-sky-100"
      style={{
        backgroundImage: `url(${HIRA_IMG})`,
        backgroundSize: `${z * 100}%`,
        backgroundPosition: `${clamp(px)}% ${clamp(py)}%`,
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}

function PostCard({ post, index }) {
  const [open, setOpen] = useState(false);
  const panelId = `hira-post-${index}`;

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md">
      <Cover crop={post.crop} />
      <div className="p-5">
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
          {post.tag}
        </span>
        <h2 className="mt-3 text-lg font-semibold text-slate-900">{post.title}</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{post.excerpt}</p>

        {/* Nội dung sổ ra: animate chiều cao bằng grid-rows */}
        <div
          id={panelId}
          className={`grid transition-all duration-300 ease-in-out ${
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="space-y-3 pt-4 text-sm leading-relaxed text-slate-600">
              {post.detail.map((t) => (
                <p key={t}>{t}</p>
              ))}
              <ul className="space-y-2 rounded-xl bg-slate-50 p-4">
                {post.points.map((t) => (
                  <li key={t} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" aria-hidden="true" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className="mt-4 inline-flex items-center gap-1 rounded text-sm font-semibold text-blue-600 hover:text-blue-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          {open ? "Thu gọn" : "Đọc tiếp"}
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            aria-hidden="true"
          >
            <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
          </svg>
        </button>
      </div>
    </article>
  );
}

export default function HiraBlogCards() {
  return (
    <main
      className="min-h-screen bg-slate-50 px-5 py-12 text-slate-800"
      style={{ fontFamily: "'Be Vietnam Pro', system-ui, sans-serif" }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">Làm quen với HIRA</h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Trợ lý AI giúp nhà tuyển dụng gợi ý ứng viên, sắp lịch, soạn email và đề xuất offer.
        </p>

        {/* items-start: thẻ nào mở rộng thì chỉ thẻ đó dài ra, các thẻ bên cạnh giữ nguyên */}
        <div className="mt-10 grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p, i) => (
            <PostCard key={p.title} post={p} index={i} />
          ))}
        </div>
      </div>
    </main>
  );
}