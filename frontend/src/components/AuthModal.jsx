import React, { useState } from 'react';
import { X, Mail, Lock, User, Sparkles, ArrowRight, Eye, EyeOff, Smartphone, ShieldCheck } from 'lucide-react';
import { useDevice } from '../context/DeviceContext';

export const AuthModal = ({
  initialMode = 'login',
  onClose,
  onSuccess,
}) => {
  const device = useDevice();
  const [mode, setMode] = useState(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSuccess({
      name: name.trim() || (email ? email.split('@')[0] : 'Minh Nguyễn'),
      email: email.trim() || 'minh.nguyen@example.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      provider: 'email',
    });
  };

  return (
    <div
      className={`fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn ${
        device.isPhone ? 'items-end sm:items-center p-0 sm:p-4' : ''
      }`}
    >
      {/* Background touch dismiss */}
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        id="auth-modal-card"
        className={`bg-white shadow-2xl border border-slate-200 relative text-left z-10 w-full transition-all duration-200 ${
          device.isPhone
            ? 'rounded-t-3xl max-h-[92vh] overflow-y-auto p-5 pb-8 animate-slideUp border-b-0'
            : 'rounded-2xl max-w-md p-6 sm:p-7'
        }`}
        style={device.isPhone ? { paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 24px)' } : {}}
      >
        {/* Mobile drag handle */}
        {device.isPhone && (
          <div className="w-full flex items-center justify-center -mt-1 pb-3 cursor-pointer" onClick={onClose}>
            <div className="w-12 h-1.5 bg-slate-300 rounded-full" />
          </div>
        )}

        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-4 sm:mb-5">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-blue-50 text-[#2170E4] flex items-center justify-center mx-auto mb-2 border border-blue-100">
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
            {mode === 'login' ? 'Chào mừng bạn trở lại' : 'Tạo tài khoản mới'}
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
            {mode === 'login'
              ? 'Đăng nhập để quản lý danh sách việc làm và hồ sơ CV'
              : 'Gia nhập cộng đồng tuyển dụng chất lượng cao'}
          </p>

          {device.isPhone && (
            <div className="inline-flex items-center space-x-1 mt-2 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold border border-emerald-200">
              <Smartphone className="w-3 h-3" />
              <span>Giao diện đã tối ưu màn hình cảm ứng di động</span>
            </div>
          )}
        </div>

        {/* Mode Switcher */}
        <div className="flex bg-slate-100 p-1 rounded-xl mb-4 sm:mb-5 text-xs font-semibold">
          <button
            type="button"
            id="auth-mode-login-tab"
            onClick={() => setMode('login')}
            className={`flex-1 py-2 sm:py-1.5 rounded-lg transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-white text-[#2170E4] shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Đăng nhập
          </button>
          <button
            type="button"
            id="auth-mode-register-tab"
            onClick={() => setMode('register')}
            className={`flex-1 py-2 sm:py-1.5 rounded-lg transition-all cursor-pointer ${
              mode === 'register'
                ? 'bg-white text-[#2170E4] shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Đăng ký
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-sm">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Họ và tên
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nguyễn Văn A"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm sm:text-xs text-slate-900 focus:bg-white focus:outline-hidden focus:border-[#2170E4] focus:ring-1 focus:ring-blue-100"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm sm:text-xs text-slate-900 focus:bg-white focus:outline-hidden focus:border-[#2170E4] focus:ring-1 focus:ring-blue-100"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Mật khẩu
              </label>
              {mode === 'login' && (
                <span className="text-[11px] text-[#0A58CA] hover:underline cursor-pointer">
                  Quên mật khẩu?
                </span>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm sm:text-xs text-slate-900 focus:bg-white focus:outline-hidden focus:border-[#2170E4] focus:ring-1 focus:ring-blue-100"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 p-0.5"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            id="auth-submit-btn"
            className="w-full py-3 sm:py-2.5 bg-[#2170E4] hover:bg-[#1a5bbd] active:scale-[0.99] text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center justify-center space-x-2 mt-4 cursor-pointer"
          >
            <span>{mode === 'login' ? 'Đăng nhập ngay' : 'Tạo tài khoản'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-4 sm:mt-5 text-center text-[11px] text-slate-400 leading-relaxed">
          Bằng việc tiếp tục, bạn đồng ý với Điều khoản dịch vụ & Chính sách bảo mật của JobCentral.
        </div>
      </div>
    </div>
  );
};
