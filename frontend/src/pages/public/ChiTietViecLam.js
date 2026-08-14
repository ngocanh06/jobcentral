import React from "react";
import { useParams, Link } from "react-router-dom";
import { jobs } from "../../Data/MockData.js";

export default function ChiTietViecLam() {
    const { id } = useParams();
    const job = jobs.find((j) => String(j.id) === String(id)) || {
        id: id || "1",
        title: "Senior UI/UX Designer",
        company: "TechFlow Solutions",
        salary: "$1,500 - $2,500",
        location: "TP. Hồ Chí Minh",
        type: "Full-time",
    };

    return (
        <div className="mx-auto max-w-4xl px-6 py-12">
            <Link to="/" className="inline-flex items-center text-sm font-semibold text-[#2170e4] hover:underline mb-6">
                ← Quay lại danh sách việc làm
            </Link>

            <div className="rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
                    <div>
                        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-[#eff4ff] text-[#2170e4] mb-2">
                            {job.type}
                        </span>
                        <h1 className="text-2xl sm:text-3xl font-bold text-[#0d1c2f]">{job.title}</h1>
                        <p className="mt-1 text-base text-gray-600">{job.company} • {job.location}</p>
                    </div>
                    <div className="text-left sm:text-right">
                        <div className="text-xl font-bold text-[#2170e4]">{job.salary}</div>
                        <span className="text-xs text-gray-400">Mức lương hàng tháng</span>
                    </div>
                </div>

                <div className="mt-6 space-y-6">
                    <div>
                        <h2 className="text-lg font-bold text-[#0d1c2f] mb-2">Mô tả công việc</h2>
                        <p className="text-gray-600 leading-relaxed">
                            Chúng tôi đang tìm kiếm ứng viên tài năng cho vị trí <span className="font-semibold text-gray-900">{job.title}</span> tại công ty <span className="font-semibold text-gray-900">{job.company}</span>. 
                            Bạn sẽ được làm việc trong môi trường chuyên nghiệp, năng động với chế độ đãi ngộ hấp dẫn và cơ hội phát triển sự nghiệp vững chắc.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-bold text-[#0d1c2f] mb-2">Yêu cầu công việc</h2>
                        <ul className="list-disc pl-5 text-gray-600 space-y-1">
                            <li>Có kinh nghiệm tối thiểu từ 1-3 năm trong lĩnh vực liên quan.</li>
                            <li>Tư duy giải quyết vấn đề tốt, chủ động và có tinh thần trách nhiệm cao.</li>
                            <li>Kỹ năng giao tiếp và làm việc nhóm hiệu quả.</li>
                            <li>Khả năng thích ứng nhanh với môi trường công nghệ hiện đại.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-lg font-bold text-[#0d1c2f] mb-2">Quyền lợi</h2>
                        <ul className="list-disc pl-5 text-gray-600 space-y-1">
                            <li>Mức lương cạnh tranh ({job.salary}) cùng thưởng hiệu suất định kỳ.</li>
                            <li>Chế độ bảo hiểm đầy đủ, khám sức khỏe hàng năm.</li>
                            <li>Trang thiết bị làm việc hiện đại, môi trường thân thiện.</li>
                            <li>Cơ hội thăng tiến và đào tạo chuyên sâu.</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap gap-4">
                    <button className="rounded-xl bg-[#2170e4] px-8 py-3 font-semibold text-white transition hover:bg-[#185fc7] shadow-md shadow-blue-500/20">
                        Ứng tuyển ngay
                    </button>
                    <button className="rounded-xl border border-gray-200 bg-white px-6 py-3 font-semibold text-[#434655] transition hover:bg-gray-50">
                        Lưu tin tuyển dụng
                    </button>
                </div>
            </div>
        </div>
    );
}