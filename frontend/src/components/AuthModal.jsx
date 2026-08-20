import React, { useState } from 'react';
import { X, Mail, Lock, User, Sparkles, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';

export const AuthModal = ({
  initialMode = 'login',
  onClose,
  onSuccess,
}) => {
  const [mode, setMode] = useState(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [showGoogleChooser, setShowGoogleChooser] = useState(false);

  const mockGoogleAccounts = [
    {
      name: 'Nguyễn Minh Anh',
      email: 'vietnhiennguyen91@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    {
      name: 'Nguyễn Văn Minh',
      email: 'minh.nguyen.dev@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSuccess({
      name: name || (email ? email.split('@')[0] : 'Minh Nguyễn'),
      email: email || 'minh.nguyen@example.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      provider: 'email',
    });
  };

  const handleSelectGoogleAccount = (acc) => {
    setIsGoogleLoading(true);
    setTimeout(() => {
      setIsGoogleLoading(false);
      onSuccess({
        name: acc.name,
        email: acc.email,
        avatar: acc.avatar,
        provider: 'google',
      });
    }, 600);
  };

  const handleQuickGoogleSignIn = () => {
    setShowGoogleChooser(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200 p-6 sm:p-7 relative text-left">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {showGoogleChooser ? (
          /* Google Account Chooser View */
          <div className="py-2 animate-in fade-in duration-200">
            <div className="flex items-center space-x-3 mb-5">
              <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <div>
                <h3 className="text-base font-bold text-slate-900">Đăng nhập bằng Google</h3>
                <p className="text-xs text-slate-500">Chọn tài khoản để tiếp tục tới JobCentral</p>
              </div>
            </div>

            {isGoogleLoading ? (
              <div className="py-10 text-center flex flex-col items-center justify-center space-y-3">
                <Loader2 className="w-8 h-8 text-[#2170E4] animate-spin" />
                <p className="text-xs font-semibold text-slate-600">Đang đồng bộ tài khoản Google...</p>
              </div>
            ) : (
              <div className="space-y-2.5 my-4">
                {mockGoogleAccounts.map((acc) => (
                  <button
                    key={acc.email}
                    type="button"
                    onClick={() => handleSelectGoogleAccount(acc)}
                    className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-[#2170E4] hover:bg-blue-50/40 transition-all text-left cursor-pointer group"
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <img
                        src={acc.avatar}
                        alt={acc.name}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate group-hover:text-[#2170E4] transition-colors">
                          {acc.name}
                        </p>
                        <p className="text-[11px] text-slate-500 truncate">{acc.email}</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-[#2170E4] opacity-0 group-hover:opacity-100 transition-opacity">
                      Đăng nhập →
                    </span>
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    handleSelectGoogleAccount({
                      name: 'Người dùng Google',
                      email: 'user.jobcentral@gmail.com',
                      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
                    })
                  }
                  className="w-full text-center py-2.5 px-3 border border-dashed border-slate-300 rounded-xl text-xs font-semibold text-slate-600 hover:text-[#2170E4] hover:border-[#2170E4] transition-colors cursor-pointer"
                >
                  + Sử dụng tài khoản Google khác
                </button>
              </div>
            )}

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowGoogleChooser(false)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                ← Quay lại
              </button>
              <span className="text-[11px] text-slate-400">Bảo mật bởi Google OAuth</span>
            </div>
          </div>
        ) : (
          /* Standard Auth Form */
          <>
            <div className="text-center mb-5">
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#2170E4] flex items-center justify-center mx-auto mb-2.5 border border-blue-100">
                <Sparkles className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                {mode === 'login' ? 'Chào mừng bạn trở lại' : 'Tạo tài khoản mới'}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                {mode === 'login'
                  ? 'Đăng nhập để quản lý danh sách việc làm và hồ sơ CV'
                  : 'Gia nhập cộng đồng tuyển dụng chất lượng cao'}
              </p>
            </div>

            {/* Google Sign-in Button */}
            <button
              type="button"
              id="google-signin-btn"
              onClick={handleQuickGoogleSignIn}
              className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-lg border border-slate-300 shadow-2xs transition-all flex items-center justify-center space-x-2.5 cursor-pointer group mb-4"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{mode === 'login' ? 'Tiếp tục với Google' : 'Đăng ký nhanh với Google'}</span>
            </button>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-[11px] uppercase tracking-wider">
                <span className="bg-white px-2 text-slate-400 font-medium">hoặc dùng Email</span>
              </div>
            </div>

            {/* Mode Switcher */}
            <div className="flex bg-slate-100 p-1 rounded-lg mb-4 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setMode('login')}
                className={`flex-1 py-1.5 rounded-md transition-all cursor-pointer ${
                  mode === 'login'
                    ? 'bg-white text-[#2170E4] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Đăng nhập
              </button>
              <button
                type="button"
                onClick={() => setMode('register')}
                className={`flex-1 py-1.5 rounded-md transition-all cursor-pointer ${
                  mode === 'register'
                    ? 'bg-white text-[#2170E4] shadow-xs'
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
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nguyễn Văn A"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-md text-xs focus:bg-white focus:outline-hidden focus:border-[#2170E4] focus:ring-1 focus:ring-blue-100"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-md text-xs focus:bg-white focus:outline-hidden focus:border-[#2170E4] focus:ring-1 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Mật khẩu
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-md text-xs focus:bg-white focus:outline-hidden focus:border-[#2170E4] focus:ring-1 focus:ring-blue-100"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#2170E4] hover:bg-[#1a5bbd] text-white font-bold text-xs rounded-md shadow-xs transition-all flex items-center justify-center space-x-2 mt-3 cursor-pointer"
              >
                <span>{mode === 'login' ? 'Đăng nhập ngay' : 'Tạo tài khoản'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="mt-5 text-center text-[11px] text-slate-400">
              Bằng việc tiếp tục, bạn đồng ý với Điều khoản dịch vụ & Chính sách bảo mật của JobCentral.
            </div>
          </>
        )}
      </div>
    </div>
  );
};

