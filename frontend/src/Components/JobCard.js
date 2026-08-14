import React from "react";
import { Link } from "react-router-dom";

export default function JobCard({
    id = "1",
    title = "Senior UI/UX Designer",
    company = "TechFlow Solutions",
    salary = "$1,500 - $2,500",
    location = "TP. Hồ Chí Minh",
    type = "Full-time",
    postedTime = "2 ngày trước",
    isFavorite = false,
    onToggleFavorite,
}) {
    return (
        <div className="flex flex-col justify-between rounded-[24px] border border-[#c7c4d8] bg-white p-6 shadow-[0_4px_10px_rgba(79,70,229,0.08)] transition hover:-translate-y-1 hover:shadow-xl">
            <div>
                {/* Header card: Logo & Nút yêu thích */}
                <div className="flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e6eeff] text-xl text-[#2170e4]">
                        ◈
                    </div>
                    <button
                        onClick={() => onToggleFavorite && onToggleFavorite(id)}
                        className={`text-xl transition ${isFavorite ? "text-red-500" : "text-gray-400 hover:text-[#2170e4]"
                            }`}
                        aria-label="Lưu công việc"
                    >
                        {isFavorite ? "♥" : "♡"}
                    </button>
                </div>

                {/* Thông tin chính */}
                <div className="mt-4">
                    <h3 className="text-lg font-semibold text-[#0d1c2f] line-clamp-1">
                        {title}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-[#464555]">
                        {company}
                    </p>
                </div>

                {/* Nhãn thuộc tính (Badges) */}
                <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#e2dfff] px-3 py-1 text-xs font-medium text-[#2170e4]">
                        {type}
                    </span>
                    <span className="rounded-full bg-[#e1e3e4] px-3 py-1 text-xs font-medium text-[#5c5f60]">
                        {salary}
                    </span>
                    <span className="rounded-full bg-[#ffdbce] px-3 py-1 text-xs font-medium text-[#464555]">
                        {location}
                    </span>
                </div>
            </div>

            {/* Footer card: Thời gian & Nút ứng tuyển */}
            <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
                <span className="text-xs text-[#464555]">{postedTime}</span>
                <Link
                    to={`/jobs/${id}`}
                    className="rounded-xl bg-[#2170e4] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#185fc7]"
                >
                    Xem chi tiết
                </Link>
            </div>
        </div>
    );
}