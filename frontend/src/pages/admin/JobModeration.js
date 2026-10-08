import React, { useState, useMemo } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import {
  Briefcase, CheckCircle, XCircle, Clock, Eye, AlertTriangle,
  Search, Filter, Check, X, ShieldAlert, Sparkles, Building,
  MapPin, DollarSign, Calendar, Star, FileText, CheckSquare,
  Square, RefreshCw, Send, ChevronRight
} from 'lucide-react';

const INITIAL_JOBS = [
  {
    id: 1,
    title: 'Senior Frontend Developer (React / Next.js)',
    company: 'TechCorp Vietnam JSC',
    logo: 'TC',
    salary: '35 - 50 triệu',
    location: 'Hà Nội (Hybrid)',
    type: 'Toàn thời gian',
    level: 'Senior',
    category: 'IT / Phần mềm',
    status: 'pending',
    postedDate: '08/10/2026',
    deadline: '30/10/2026',
    aiScore: 98,
    aiAlert: null,
    featured: false,
    contactEmail: 'hr@techcorp.vn',
    contactPhone: '02438889999',
    description: 'Chịu trách nhiệm kiến trúc và phát triển hệ thống web quy mô lớn phục vụ hơn 500k người dùng...',
    requirements: 'Tối thiểu 4 năm kinh nghiệm với React, Redux, Next.js. Nắm vững TypeScript và tối ưu Core Web Vitals.',
    benefits: 'Thưởng hiệu quả quý + lương tháng 13. Bảo hiểm sức khỏe VIP PVI. 15 ngày phép/năm.',
    skills: ['React', 'Next.js', 'TypeScript', 'TailwindCSS'],
  },
  {
    id: 2,
    title: 'Trợ lý tuyển dụng / Nhập liệu tại nhà (Lương 1-2tr/ngày)',
    company: 'Công ty CP Đầu Tư Thịnh Vượng Mới',
    logo: 'TV',
    salary: '30 - 60 triệu',
    location: 'Toàn quốc (Remote)',
    type: 'Bán thời gian',
    level: 'Không yêu cầu',
    category: 'Hành chính / Nhân sự',
    status: 'pending',
    postedDate: '08/10/2026',
    deadline: '15/10/2026',
    aiScore: 32,
    aiAlert: 'Cảnh báo lừa đảo: Mức lương phi thực tế cho công việc nhập liệu, có dấu hiệu thu phí cọc của ứng viên.',
    featured: false,
    contactEmail: 'tuyendungnhanh88@gmail.com',
    contactPhone: '0988001122',
    description: 'Công việc nhẹ nhàng, chỉ cần điện thoại hoặc máy tính có mạng. Nhập mã đơn hàng hoặc xem video nhận tiền...',
    requirements: 'Có tài khoản ngân hàng hoặc ví MoMo, đặt cọc giữ chỗ làm việc 200k (sẽ hoàn lại)...',
    benefits: 'Nhận tiền trong ngày, linh động thời gian làm việc tự do.',
    skills: ['Nhập liệu', 'Đánh máy'],
  },
  {
    id: 3,
    title: 'Growth Marketing Manager',
    company: 'Tập đoàn Vingroup (VinFast Digital)',
    logo: 'VG',
    salary: '40 - 70 triệu',
    location: 'TP. Hồ Chí Minh',
    type: 'Toàn thời gian',
    level: 'Manager / Trưởng phòng',
    category: 'Marketing / Truyền thông',
    status: 'approved',
    postedDate: '07/10/2026',
    deadline: '25/10/2026',
    aiScore: 99,
    aiAlert: null,
    featured: true,
    contactEmail: 'talent@vinfast.vn',
    contactPhone: '02839999999',
    description: 'Xây dựng chiến lược tăng trưởng người dùng app và web trên thị trường Đông Nam Á...',
    requirements: 'Từ 5 năm kinh nghiệm làm Growth Marketing trong mảng E-commerce, Fintech hoặc Automotive.',
    benefits: 'Lương thưởng cạnh tranh, hưởng chế độ giảm giá sản phẩm hệ sinh thái Vingroup.',
    skills: ['Growth Hacking', 'Google Ads', 'Meta Ads', 'Data Analytics'],
  },
  {
    id: 4,
    title: 'DevOps / Cloud Platform Engineer',
    company: 'FPT Software Da Nang',
    logo: 'FP',
    salary: '30 - 45 triệu',
    location: 'Đà Nẵng',
    type: 'Toàn thời gian',
    level: 'Middle / Senior',
    category: 'IT / Phần mềm',
    status: 'approved',
    postedDate: '06/10/2026',
    deadline: '05/11/2026',
    aiScore: 95,
    aiAlert: null,
    featured: false,
    contactEmail: 'recruitment@fpt.com',
    contactPhone: '02363555888',
    description: 'Thiết kế hệ thống CI/CD trên AWS & Kubernetes cho khách hàng Nhật Bản và Bắc Mỹ...',
    requirements: 'Có kinh nghiệm AWS, Terraform, Docker, Kubernetes, Prometheus, Grafana.',
    benefits: 'Môi trường làm việc quốc tế, cơ hội Onsite ngắn hạn tại Tokyo.',
    skills: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD'],
  },
  {
    id: 5,
    title: 'Cộng tác viên Bán hàng Online không vốn',
    company: 'Shop Thời Trang Quốc Tế 99',
    logo: 'ST',
    salary: '50 - 100 triệu',
    location: 'Hà Nội',
    type: 'Bán thời gian',
    level: 'Intern',
    category: 'Bán hàng / Kinh doanh',
    status: 'rejected',
    rejectReason: 'Nội dung quảng cáo đa cấp trái phép, cam kết lợi nhuận bất thường.',
    postedDate: '05/10/2026',
    deadline: '10/10/2026',
    aiScore: 28,
    aiAlert: 'Nghi ngờ mô hình tài chính ảo / đa cấp.',
    featured: false,
    contactEmail: 'hotrokinhdoanh247@gmail.com',
    contactPhone: '0911223344',
    description: 'Không cần vốn, chỉ cần làm theo hướng dẫn nạp tiền đặt đơn ảo...',
    requirements: 'Không yêu cầu bằng cấp.',
    benefits: 'Hoa hồng 20-30% trên mỗi đơn hàng.',
    skills: ['Bán hàng'],
  },
];

const REJECT_REASONS = [
  'Dấu hiệu lừa đảo / Thu phí ứng viên trái pháp luật',
  'Mức lương hoặc thông tin tuyển dụng mập mờ, thiếu minh bạch',
  'Nội dung sai chuyên mục hoặc vi phạm quy định sàn',
  'Thông tin liên hệ giả mạo hoặc không thể xác thực',
  'Spam bài đăng / Trùng lặp tin quá nhiều lần',
  'Khác (nhập chi tiết lý do)',
];

export default function JobModeration() {
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [aiFilter, setAiFilter] = useState('all');
  const [selectedIds, setSelectedIds] = useState([]);
  const [toast, setToast] = useState(null);

  // Modals
  const [reviewJob, setReviewJob] = useState(null);
  const [rejectingJob, setRejectingJob] = useState(null);
  const [selectedRejectReason, setSelectedRejectReason] = useState(REJECT_REASONS[0]);
  const [customRejectNote, setCustomRejectNote] = useState('');

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((j) => {
      const matchSearch =
        j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        j.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        j.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = statusFilter === 'all' || j.status === statusFilter;
      const matchCategory = categoryFilter === 'all' || j.category === categoryFilter;
      const matchAi =
        aiFilter === 'all' ||
        (aiFilter === 'suspicious' && j.aiScore < 70) ||
        (aiFilter === 'clean' && j.aiScore >= 70);

      return matchSearch && matchStatus && matchCategory && matchAi;
    });
  }, [jobs, searchQuery, statusFilter, categoryFilter, aiFilter]);

  const stats = useMemo(() => {
    return {
      total: jobs.length,
      pending: jobs.filter((j) => j.status === 'pending').length,
      approved: jobs.filter((j) => j.status === 'approved').length,
      rejected: jobs.filter((j) => j.status === 'rejected').length,
      suspicious: jobs.filter((j) => j.aiScore < 70).length,
    };
  }, [jobs]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredJobs.map((j) => j.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleApproveJob = (jobId) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, status: 'approved', rejectReason: null } : j))
    );
    if (reviewJob && reviewJob.id === jobId) {
      setReviewJob(null);
    }
    showToast('Đã phê duyệt tin tuyển dụng thành công!');
  };

  const handleOpenReject = (job) => {
    setRejectingJob(job);
    setSelectedRejectReason(REJECT_REASONS[0]);
    setCustomRejectNote('');
  };

  const handleConfirmReject = () => {
    if (!rejectingJob) return;
    const finalReason =
      selectedRejectReason.startsWith('Khác')
        ? customRejectNote || 'Vi phạm chính sách sàn JobCentral'
        : selectedRejectReason + (customRejectNote ? `: ${customRejectNote}` : '');

    setJobs((prev) =>
      prev.map((j) =>
        j.id === rejectingJob.id
          ? { ...j, status: 'rejected', rejectReason: finalReason }
          : j
      )
    );
    if (reviewJob && reviewJob.id === rejectingJob.id) {
      setReviewJob(null);
    }
    setRejectingJob(null);
    showToast(`Đã từ chối tin: "${rejectingJob.title}"`, 'error');
  };

  const handleToggleFeatured = (jobId) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, featured: !j.featured } : j))
    );
    showToast('Đã cập nhật trạng thái tin nổi bật');
  };

  const handleBatchApprove = () => {
    setJobs((prev) =>
      prev.map((j) =>
        selectedIds.includes(j.id) ? { ...j, status: 'approved', rejectReason: null } : j
      )
    );
    showToast(`Đã duyệt thành công ${selectedIds.length} tin tuyển dụng`);
    setSelectedIds([]);
  };

  const handleBatchReject = () => {
    setJobs((prev) =>
      prev.map((j) =>
        selectedIds.includes(j.id)
          ? { ...j, status: 'rejected', rejectReason: 'Từ chối hàng loạt bởi kiểm duyệt viên' }
          : j
      )
    );
    showToast(`Đã từ chối ${selectedIds.length} tin đã chọn`, 'error');
    setSelectedIds([]);
  };

  const inputClass =
    "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2170e4]/40 focus:border-[#2170e4] transition bg-white";

  return (
    <AdminLayout
      title="Kiểm duyệt tin tuyển dụng"
      subtitle="Thẩm định nội dung, phát hiện tin rác và phê duyệt tin đăng từ Nhà tuyển dụng"
    >
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 text-white text-sm font-medium transition-all ${
            toast.type === 'error' ? 'bg-rose-600' : 'bg-emerald-600'
          }`}
        >
          {toast.type === 'error' ? <XCircle size={16} /> : <CheckCircle size={16} />}
          <span>{toast.msg}</span>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          {
            label: 'Chờ kiểm duyệt',
            val: stats.pending,
            desc: 'Cần thẩm định trong 24h',
            iconBg: 'bg-amber-50 text-amber-600',
            icon: <Clock size={18} />,
          },
          {
            label: 'Đã phê duyệt',
            val: stats.approved,
            desc: 'Đang hiển thị trên sàn việc làm',
            iconBg: 'bg-emerald-50 text-emerald-600',
            icon: <CheckCircle size={18} />,
          },
          {
            label: 'Bị từ chối',
            val: stats.rejected,
            desc: 'Vi phạm quy định hoặc spam',
            iconBg: 'bg-rose-50 text-rose-600',
            icon: <XCircle size={18} />,
          },
          {
            label: 'Cảnh báo rủi ro AI',
            val: stats.suspicious,
            desc: 'Tin có rủi ro lừa đảo cao',
            iconBg: 'bg-purple-50 text-purple-600',
            icon: <Sparkles size={18} />,
          },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between shadow-xs"
          >
            <div>
              <p className="text-xs font-medium text-slate-500">{s.label}</p>
              <h3 className="text-2xl font-bold mt-1 text-slate-800">{s.val}</h3>
              <p className="text-xs mt-1 text-slate-400">{s.desc}</p>
            </div>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${s.iconBg}`}>
              {s.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar & Filters */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-xs">
        <div className="flex flex-wrap items-center gap-3 flex-1">
          {/* Search */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-300 flex-1 min-w-[220px] bg-white focus-within:border-[#2170e4] focus-within:ring-2 focus-within:ring-[#2170e4]/30 transition">
            <Search size={16} className="text-slate-400" />
            <input
              type="text"
              placeholder="Tìm theo tiêu đề tin, công ty, địa điểm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-sm outline-none bg-transparent text-slate-800 placeholder:text-slate-400"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="p-1 text-slate-400 hover:text-slate-600">
                <X size={14} />
              </button>
            )}
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-sm px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 outline-none focus:border-[#2170e4] transition cursor-pointer"
          >
            <option value="all">Mọi trạng thái</option>
            <option value="pending">Chờ kiểm duyệt</option>
            <option value="approved">Đã phê duyệt</option>
            <option value="rejected">Bị từ chối</option>
          </select>

          {/* AI Filter */}
          <select
            value={aiFilter}
            onChange={(e) => setAiFilter(e.target.value)}
            className="text-sm px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 outline-none focus:border-[#2170e4] transition cursor-pointer"
          >
            <option value="all">Tất cả điểm AI</option>
            <option value="suspicious">⚠️ AI cảnh báo rủi ro (&lt; 70%)</option>
            <option value="clean">✅ AI tin cậy cao (&ge; 70%)</option>
          </select>
        </div>

        {/* Batch Actions */}
        {selectedIds.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#2170e4]/10 text-[#2170e4]">
              Đã chọn: {selectedIds.length}
            </span>
            <button
              onClick={handleBatchApprove}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition"
            >
              <Check size={13} /> Duyệt tin chọn
            </button>
            <button
              onClick={handleBatchReject}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition"
            >
              <X size={13} /> Từ chối tin chọn
            </button>
          </div>
        )}
      </div>

      {/* Main Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-5 py-3 w-10">
                  <input
                    type="checkbox"
                    className="cursor-pointer rounded text-[#2170e4]"
                    checked={filteredJobs.length > 0 && selectedIds.length === filteredJobs.length}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Tin tuyển dụng & Doanh nghiệp
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Mức lương & Nơi làm việc
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  AI Truth Score
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Trạng thái
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Ngày gửi
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-right text-slate-500">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-sm text-slate-400">
                    Không có tin tuyển dụng nào phù hợp.
                  </td>
                </tr>
              ) : (
                filteredJobs.map((job) => {
                  const isSelected = selectedIds.includes(job.id);
                  const isLowAi = job.aiScore < 70;

                  return (
                    <tr
                      key={job.id}
                      className={`transition-colors border-b border-slate-100 hover:bg-slate-50/80 ${
                        isSelected ? 'bg-blue-50/40' : isLowAi ? 'bg-amber-50/30' : ''
                      }`}
                    >
                      <td className="px-5 py-3.5">
                        <input
                          type="checkbox"
                          className="cursor-pointer rounded text-[#2170e4]"
                          checked={isSelected}
                          onChange={() => handleSelectOne(job.id)}
                        />
                      </td>

                      {/* Job Title & Company */}
                      <td className="px-5 py-3.5 max-w-xs">
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 text-[#2170e4] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                            {job.logo}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span
                                onClick={() => setReviewJob(job)}
                                className="font-semibold text-sm text-slate-800 hover:text-[#2170e4] cursor-pointer line-clamp-1 transition"
                              >
                                {job.title}
                              </span>
                              {job.featured && (
                                <span title="Tin nổi bật VIP">
                                  <Star size={13} className="fill-amber-400 text-amber-500" />
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                              <Building size={12} className="text-slate-400" /> {job.company}
                            </p>
                            <div className="flex items-center gap-1.5 mt-1">
                              <span className="text-[11px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                                {job.level}
                              </span>
                              <span className="text-[11px] px-1.5 py-0.5 rounded bg-blue-50 text-[#2170e4] font-medium">
                                {job.category}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Salary & Location */}
                      <td className="px-5 py-3.5 text-xs">
                        <div className="font-semibold text-emerald-700 flex items-center gap-1">
                          <DollarSign size={13} /> {job.salary}
                        </div>
                        <div className="text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin size={13} className="text-slate-400" /> {job.location}
                        </div>
                      </td>

                      {/* AI Truth Score */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs font-bold px-2 py-0.5 rounded-md border ${
                              isLowAi
                                ? 'bg-rose-50 text-rose-700 border-rose-200'
                                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            }`}
                          >
                            {job.aiScore}%
                          </span>
                          {isLowAi && (
                            <span title={job.aiAlert} className="text-amber-600 cursor-help">
                              <AlertTriangle size={15} />
                            </span>
                          )}
                        </div>
                        {isLowAi && (
                          <p className="text-[10px] text-rose-600 mt-1 max-w-[150px] line-clamp-1" title={job.aiAlert}>
                            {job.aiAlert}
                          </p>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-3.5">
                        {job.status === 'pending' && (
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200 inline-flex items-center gap-1">
                            <Clock size={12} /> Chờ duyệt
                          </span>
                        )}
                        {job.status === 'approved' && (
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1">
                            <CheckCircle size={12} /> Đã duyệt
                          </span>
                        )}
                        {job.status === 'rejected' && (
                          <div>
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200 inline-flex items-center gap-1">
                              <XCircle size={12} /> Từ chối
                            </span>
                            {job.rejectReason && (
                              <p className="text-[10px] text-rose-500 mt-1 max-w-[140px] truncate" title={job.rejectReason}>
                                {job.rejectReason}
                              </p>
                            )}
                          </div>
                        )}
                      </td>

                      {/* Date */}
                      <td className="px-5 py-3.5 text-xs text-slate-500">
                        <div>{job.postedDate}</div>
                        <span className="text-[11px] text-slate-400">Hạn: {job.deadline}</span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => setReviewJob(job)}
                            title="Xem thẩm định chi tiết"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-[#2170e4] hover:bg-blue-50 transition"
                          >
                            <Eye size={15} />
                          </button>

                          {job.status !== 'approved' && (
                            <button
                              onClick={() => handleApproveJob(job.id)}
                              title="Duyệt tin ngay"
                              className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition"
                            >
                              <Check size={15} />
                            </button>
                          )}

                          {job.status !== 'rejected' && (
                            <button
                              onClick={() => handleOpenReject(job)}
                              title="Từ chối tin"
                              className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition"
                            >
                              <X size={15} />
                            </button>
                          )}

                          <button
                            onClick={() => handleToggleFeatured(job.id)}
                            title={job.featured ? 'Bỏ tin nổi bật' : 'Ghim nổi bật'}
                            className={`p-1.5 rounded-lg transition ${
                              job.featured ? 'text-amber-500 hover:bg-amber-50' : 'text-slate-300 hover:text-amber-500'
                            }`}
                          >
                            <Star size={15} className={job.featured ? 'fill-amber-400' : ''} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: JOB REVIEW */}
      {/* ========================================================================= */}
      {reviewJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-slate-200 w-full max-w-2xl overflow-hidden shadow-xl flex flex-col max-h-[85vh]">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-200 bg-white flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-[#2170e4]">
                    {reviewJob.category}
                  </span>
                  <span className="text-[11px] text-slate-400">ID: #{reviewJob.id}</span>
                </div>
                <h3 className="font-bold text-base text-slate-800 mt-1">{reviewJob.title}</h3>
                <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                  <Building size={12} className="text-slate-400" /> {reviewJob.company} • <MapPin size={12} className="text-slate-400" /> {reviewJob.location}
                </p>
              </div>
              <button onClick={() => setReviewJob(null)} className="p-1 text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4 overflow-y-auto flex-1 text-xs no-scrollbar">
              {/* AI Banner */}
              <div
                className={`p-3.5 rounded-lg border flex items-start gap-3 ${
                  reviewJob.aiScore < 70
                    ? 'bg-rose-50 border-rose-200 text-rose-800'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                }`}
              >
                <Sparkles size={18} className="shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-xs block">
                    Điểm tin cậy AI: {reviewJob.aiScore}% ({reviewJob.aiScore >= 70 ? 'An toàn' : 'Cảnh báo rủi ro'})
                  </span>
                  <p className="mt-0.5 text-slate-600">
                    {reviewJob.aiAlert || 'Tin đăng đã được AI quét tự động, không phát hiện dấu hiệu spam hay thu phí trái phép.'}
                  </p>
                </div>
              </div>

              {/* Salary & Details */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                  <span className="text-slate-400 block mb-0.5">Mức lương</span>
                  <strong className="text-emerald-700 text-sm">{reviewJob.salary}</strong>
                </div>
                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                  <span className="text-slate-400 block mb-0.5">Hình thức</span>
                  <strong className="text-slate-800 text-sm">{reviewJob.type}</strong>
                </div>
                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                  <span className="text-slate-400 block mb-0.5">Hạn nộp</span>
                  <strong className="text-slate-800 text-sm">{reviewJob.deadline}</strong>
                </div>
              </div>

              {/* JD Sections */}
              <div>
                <h4 className="font-semibold text-slate-800 mb-1">Mô tả công việc</h4>
                <p className="p-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 leading-relaxed whitespace-pre-line">
                  {reviewJob.description}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-800 mb-1">Yêu cầu ứng viên</h4>
                <p className="p-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 leading-relaxed whitespace-pre-line">
                  {reviewJob.requirements}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-800 mb-1">Quyền lợi</h4>
                <p className="p-3 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 leading-relaxed whitespace-pre-line">
                  {reviewJob.benefits}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-slate-800 mb-1">Kỹ năng</h4>
                <div className="flex gap-1.5 flex-wrap">
                  {reviewJob.skills.map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded-md bg-blue-50 text-[#2170e4] border border-blue-200 font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => handleToggleFeatured(reviewJob.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition ${
                  reviewJob.featured
                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                    : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
                }`}
              >
                <Star size={13} className={reviewJob.featured ? 'fill-amber-400' : ''} />
                {reviewJob.featured ? 'Đã ghim nổi bật' : 'Ghim nổi bật'}
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenReject(reviewJob)}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-rose-700 bg-rose-50 border border-rose-200 hover:bg-rose-100 transition"
                >
                  Từ chối tin
                </button>
                <button
                  onClick={() => handleApproveJob(reviewJob.id)}
                  className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#2170e4] hover:bg-[#1a5bc0] shadow-xs transition"
                >
                  Phê duyệt ngay
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: REJECT REASON */}
      {/* ========================================================================= */}
      {rejectingJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-slate-200 w-full max-w-md overflow-hidden shadow-xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <XCircle size={20} />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-800">Từ chối tin tuyển dụng</h3>
                <p className="text-xs text-slate-400 line-clamp-1">{rejectingJob.title}</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">
                Lý do từ chối (gửi thông báo đến Nhà tuyển dụng) *
              </label>
              <div className="space-y-1.5">
                {REJECT_REASONS.map((r) => (
                  <label
                    key={r}
                    className={`flex items-center gap-2 p-2 rounded-lg border text-xs cursor-pointer transition ${
                      selectedRejectReason === r
                        ? 'border-[#2170e4] bg-blue-50/50 text-[#2170e4] font-medium'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="rejectReason"
                      checked={selectedRejectReason === r}
                      onChange={() => setSelectedRejectReason(r)}
                      className="cursor-pointer text-[#2170e4]"
                    />
                    <span>{r}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">
                Ghi chú thêm hoặc hướng dẫn sửa đổi
              </label>
              <textarea
                rows={3}
                placeholder="Ghi chú chi tiết cho NTD..."
                value={customRejectNote}
                onChange={(e) => setCustomRejectNote(e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setRejectingJob(null)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleConfirmReject}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 transition"
              >
                Xác nhận từ chối
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
