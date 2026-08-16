import React, { useState } from 'react';
import { Star, ThumbsUp, MessageSquare, Check, Plus, ShieldCheck, Award } from 'lucide-react';

export const ReviewsView = ({ reviews: initialReviews }) => {
  const [reviewsList, setReviewsList] = useState(initialReviews);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedRating, setSelectedRating] = useState(5);
  const [newCompany, setNewCompany] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newPros, setNewPros] = useState('');
  const [newCons, setNewCons] = useState('');
  const [newRole, setNewRole] = useState('');

  const handleLike = (id) => {
    setReviewsList((prev) =>
      prev.map((r) => (r.id === id ? { ...r, likes: r.likes + 1 } : r))
    );
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    const newRev = {
      id: `rev-${Date.now()}`,
      companyName: newCompany || 'Công ty Công nghệ',
      companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=120&auto=format&fit=crop&q=80',
      rating: selectedRating,
      title: newTitle,
      pros: newPros,
      cons: newCons,
      authorRole: newRole || 'Nhân viên',
      authorExperience: 'Đang làm việc',
      date: 'Hôm nay',
      likes: 1,
      recommendPercentage: 95,
    };
    setReviewsList([newRev, ...reviewsList]);
    setShowAddModal(false);
    setNewCompany('');
    setNewTitle('');
    setNewPros('');
    setNewCons('');
    setNewRole('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
            <Award className="w-3.5 h-3.5 text-indigo-600" />
            <span>Góc nhìn nội bộ chân thực</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Đánh Giá & Trải Nghiệm Môi Trường Làm Việc
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Tổng hợp đánh giá chân thực từ nhân viên đang làm việc tại các công ty hàng đầu.
          </p>
        </div>
        <button
          id="write-review-btn"
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center space-x-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-xl shadow-sm shadow-indigo-200 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Viết đánh giá</span>
        </button>
      </div>

      <div className="space-y-6">
        {reviewsList.map((review) => (
          <div
            key={review.id}
            id={`review-card-${review.id}`}
            className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs hover:border-indigo-300 transition-all space-y-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center space-x-3.5">
                <div className="w-12 h-12 rounded-xl border border-slate-200 bg-slate-50 p-1.5 flex items-center justify-center shrink-0 shadow-xs">
                  <img
                    src={review.companyLogo}
                    alt={review.companyName}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base">
                    {review.companyName}
                  </h3>
                  <div className="flex items-center space-x-2 text-xs text-slate-500 mt-0.5">
                    <span>{review.authorRole}</span>
                    <span>•</span>
                    <span>{review.authorExperience}</span>
                    <span>•</span>
                    <span>{review.date}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-1.5 bg-amber-50 border border-amber-200/80 px-3 py-1 rounded-xl text-xs font-bold text-amber-700">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>{review.rating}.0 / 5.0</span>
              </div>
            </div>

            <h4 className="text-base font-semibold text-slate-800">
              "{review.title}"
            </h4>

            <div className="space-y-3 text-sm">
              <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-3.5">
                <span className="text-xs font-bold text-emerald-800 block mb-1">
                  Ưu điểm (Pros):
                </span>
                <p className="text-emerald-950 text-xs sm:text-sm leading-relaxed">
                  {review.pros}
                </p>
              </div>

              <div className="bg-rose-50/70 border border-rose-100 rounded-xl p-3.5">
                <span className="text-xs font-bold text-rose-800 block mb-1">
                  Điểm cần cải thiện (Cons):
                </span>
                <p className="text-rose-950 text-xs sm:text-sm leading-relaxed">
                  {review.cons}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center space-x-1.5 text-emerald-700 font-medium bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/60">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Khuyên bạn bè nên ứng tuyển ({review.recommendPercentage}%)</span>
              </div>

              <button
                id={`like-review-btn-${review.id}`}
                onClick={() => handleLike(review.id)}
                className="flex items-center space-x-1 text-slate-600 hover:text-indigo-600 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-colors font-medium"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>Hữu ích ({review.likes})</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Review Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-4">
              Chia sẻ đánh giá công ty
            </h2>
            <form onSubmit={handleAddReview} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Tên công ty
                </label>
                <input
                  type="text"
                  required
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  placeholder="Ví dụ: TechFlow Solutions"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Vị trí của bạn
                </label>
                <input
                  type="text"
                  required
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  placeholder="Ví dụ: Senior UI/UX Designer"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Đánh giá chung (sao)
                </label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setSelectedRating(s)}
                      className={`p-2 rounded-xl border flex items-center space-x-1 ${
                        selectedRating === s
                          ? 'bg-amber-50 border-amber-300 text-amber-600 font-bold'
                          : 'border-slate-200 text-slate-600'
                      }`}
                    >
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span>{s}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Tiêu đề đánh giá
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Tóm tắt ngắn gọn trải nghiệm..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Ưu điểm (Pros)
                </label>
                <textarea
                  required
                  rows={2}
                  value={newPros}
                  onChange={(e) => setNewPros(e.target.value)}
                  placeholder="Môi trường, sếp, phúc lợi, lương thưởng..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Điểm cần cải thiện (Cons)
                </label>
                <textarea
                  required
                  rows={2}
                  value={newCons}
                  onChange={(e) => setNewCons(e.target.value)}
                  placeholder="OT, quy trình, áp lực..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-sm text-slate-600 hover:text-slate-900"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 text-white rounded-xl font-medium text-sm hover:bg-indigo-700 shadow-sm shadow-indigo-200"
                >
                  Đăng đánh giá
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
