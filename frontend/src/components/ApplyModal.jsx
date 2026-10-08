import React, { useState } from 'react';
import { X } from 'lucide-react';
import defaultAvatar from '../assets/images/cat_opentowork_avatar_1791346160613.jpg';

export const ApplyModal = ({
  job,
  currentUser = null,
  onClose,
  onSubmit,
}) => {
  const [fullName, setFullName] = useState(currentUser?.name || 'Nhiên Nguyễn Viết');
  const [phone, setPhone] = useState('0905 123 456');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!job) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      if (onSubmit) {
        onSubmit({
          jobId: job.id,
          company: job.company,
          fullName,
          phone,
        });
      }
    }, 600);
  };

  const userAvatar = currentUser?.avatar || defaultAvatar;
  const userName = currentUser?.name || 'Nhiên Nguyễn Viết';
  const userHeadline = currentUser?.headline || 'Sinh viên tại Duy Tan University';
  const userLocation = currentUser?.location || 'Đà Nẵng, Da Nang City, Vietnam';
  const companyTitle = job.company ? job.company.toUpperCase() : 'BROSUP DIGITAL CO., LTD';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div
        id={`apply-modal-${job.id}`}
        className="bg-white rounded-2xl sm:rounded-3xl max-w-xl w-full max-h-[92vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col my-auto"
      >
        {/* 1. Header (Matching: Ứng tuyển vào BROSUP DIGITAL CO., LTD + Close X) */}
        <div className="px-5 sm:px-7 py-4.5 border-b border-slate-200 bg-white flex items-center justify-between shrink-0">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 truncate pr-4">
            Ứng tuyển vào {companyTitle}
          </h2>

          <button
            id="close-apply-modal-btn"
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors shrink-0 cursor-pointer"
            aria-label="Đóng cửa sổ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2. Scrollable Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-5 sm:p-7 space-y-6 flex-1">
          {/* Section: Contact info */}
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-3.5">
              Contact info
            </h3>

            {/* Profile Row */}
            <div className="flex items-start space-x-3.5">
              <img
                src={userAvatar}
                alt={userName}
                className="w-12 h-12 rounded-full object-cover shrink-0 border border-slate-200 shadow-2xs"
              />
              <div className="min-w-0 flex-1">
                <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  {userName}
                </h4>
                <p className="text-xs text-slate-600 mt-0.5 leading-snug">
                  {userHeadline}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {userLocation}
                </p>
              </div>
            </div>
          </div>

          {/* Form Fields: Nhập họ và tên */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Họ và tên*
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Nhập họ và tên của bạn..."
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-[#0A58CA] focus:ring-1 focus:ring-[#0A58CA] shadow-2xs transition-all"
            />
          </div>

          {/* Form Fields: Số điện thoại */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Số điện thoại*
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Nhập số điện thoại của bạn..."
              className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:border-[#0A58CA] focus:ring-1 focus:ring-[#0A58CA] shadow-2xs transition-all"
            />
          </div>

          {/* 3. Footer Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            >
              Hủy
            </button>
            <button
              id="submit-apply-form-btn"
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-[#0A58CA] hover:bg-[#084298] text-white font-bold text-xs sm:text-sm rounded-full shadow-sm shadow-blue-500/20 active:scale-95 transition-all disabled:opacity-70 cursor-pointer flex items-center space-x-2"
            >
              {isSubmitting ? (
                <span>Đang gửi hồ sơ...</span>
              ) : (
                <span>Gửi hồ sơ ứng tuyển</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyModal;
