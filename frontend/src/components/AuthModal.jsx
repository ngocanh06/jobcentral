import React, { useState } from 'react';
import {
  X,
  Mail,
  Lock,
  User,
  Sparkles,
  ArrowRight,
  Eye,
  EyeOff,
  Smartphone,
  ShieldCheck,
  Building2,
  Phone,
  CheckCircle2,
  KeyRound,
  ChevronLeft,
} from 'lucide-react';
import { useDevice } from '../context/DeviceContext';
import { MOCK_TEST_ACCOUNTS } from '../data/mockData';
import catAvatar from '../assets/images/cat_opentowork_avatar_1791346160613.jpg';

export const AuthModal = ({
  initialMode = 'login',
  onClose,
  onSuccess,
}) => {
  const device = useDevice();
  const [mode, setMode] = useState(
    initialMode === 'register' ? 'register' : 'login'
  );
  const [role, setRole] = useState(
    initialMode === 'employer' ? 'employer' : 'candidate'
  );

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // Status & error states
  const [errorMessage, setErrorMessage] = useState('');
  const [forgotSent, setForgotSent] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  // Quick Demo Accounts for fast testing
  const handleQuickTestAccount = (acc) => {
    setMode('login');
    setRole(acc.role || 'candidate');
    setEmail(acc.username);
    setPassword(acc.password);
    setErrorMessage('');
    onSuccess({
      ...acc,
      avatar: catAvatar,
      provider: 'credentials',
    });
  };

  const handleGoogleLogin = () => {
    onSuccess({
      name: role === 'employer' ? 'HR Specialist (Google)' : 'Nhiên Nguyễn Viết (Google)',
      email: 'vietnhiennguyen91@gmail.com',
      role,
      avatar: catAvatar,
      provider: 'google',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (mode === 'forgot') {
      if (!forgotEmail || !forgotEmail.trim()) {
        setErrorMessage('Vui lòng nhập tài khoản hoặc địa chỉ email hợp lệ.');
        return;
      }
      setForgotSent(true);
      return;
    }

    const trimmedIdentifier = email.trim();

    if (!trimmedIdentifier) {
      setErrorMessage('Vui lòng nhập tên tài khoản hoặc email.');
      return;
    }

    // Check against predefined test accounts on login
    if (mode === 'login') {
      const matchedTestAcc = MOCK_TEST_ACCOUNTS.find(
        (acc) =>
          acc.username.toLowerCase() === trimmedIdentifier.toLowerCase() ||
          acc.email.toLowerCase() === trimmedIdentifier.toLowerCase()
      );

      if (matchedTestAcc) {
        if (password !== matchedTestAcc.password) {
          setErrorMessage(
            `Mật khẩu không chính xác cho tài khoản "${matchedTestAcc.username}".`
          );
          return;
        }
        onSuccess({
          ...matchedTestAcc,
          avatar: catAvatar,
          provider: 'credentials',
        });
        return;
      }
    }

    if (mode === 'register' && !trimmedIdentifier.includes('@')) {
      setErrorMessage('Vui lòng nhập địa chỉ email hợp lệ khi đăng ký.');
      return;
    }

    if (!password || password.length < 6) {
      setErrorMessage('Mật khẩu cần có tối thiểu 6 ký tự.');
      return;
    }

    if (mode === 'register' && !name.trim()) {
      setErrorMessage('Vui lòng nhập họ và tên của bạn.');
      return;
    }

    if (mode === 'register' && !agreeTerms) {
      setErrorMessage('Bạn cần đồng ý với điều khoản dịch vụ để tiếp tục.');
      return;
    }

    // Success login/register for custom inputs
    const displayName =
      name.trim() ||
      (trimmedIdentifier.includes('@')
        ? trimmedIdentifier.split('@')[0]
        : trimmedIdentifier);

    onSuccess({
      name: displayName,
      username: trimmedIdentifier,
      email: trimmedIdentifier.includes('@')
        ? trimmedIdentifier
        : `${trimmedIdentifier.toLowerCase()}@jobcentral.vn`,
      phone: phone.trim() || '0901234567',
      role,
      headline:
        role === 'employer'
          ? 'Đại diện tuyển dụng doanh nghiệp'
          : 'Ứng viên tiềm năng',
      avatar: catAvatar,
      provider: 'credentials',
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
            : 'rounded-3xl max-w-md p-6 sm:p-8'
        }`}
        style={device.isPhone ? { paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 24px)' } : {}}
      >
        {/* Mobile drag handle */}
        {device.isPhone && (
          <div
            className="w-full flex items-center justify-center -mt-1 pb-3 cursor-pointer"
            onClick={onClose}
          >
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
        <div className="text-center mb-5">
          <div className="w-11 h-11 rounded-2xl bg-blue-50 text-[#0A58CA] flex items-center justify-center mx-auto mb-2.5 border border-blue-100 shadow-2xs">
            {mode === 'forgot' ? (
              <KeyRound className="w-5 h-5 stroke-[2]" />
            ) : role === 'employer' ? (
              <Building2 className="w-5 h-5 stroke-[2]" />
            ) : (
              <Sparkles className="w-5 h-5 stroke-[2]" />
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {mode === 'forgot'
              ? 'Khôi phục mật khẩu'
              : mode === 'login'
              ? role === 'employer'
                ? 'Đăng nhập Nhà Tuyển Dụng'
                : 'Chào mừng bạn trở lại'
              : role === 'employer'
              ? 'Đăng ký Nhà Tuyển Dụng'
              : 'Tạo tài khoản ứng viên'}
          </h2>
          <p className="text-xs sm:text-[13px] text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
            {mode === 'forgot'
              ? 'Nhập email đã đăng ký để nhận hướng dẫn đặt lại mật khẩu.'
              : mode === 'login'
              ? 'Khám phá hàng ngàn cơ hội việc làm và quản lý hồ sơ ứng tuyển'
              : 'Gia nhập cộng đồng tuyển dụng chất lượng cao tại JobCentral'}
          </p>

          {device.isPhone && (
            <div className="inline-flex items-center space-x-1 mt-2.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold border border-emerald-200">
              <Smartphone className="w-3 h-3" />
              <span>Giao diện tối ưu màn hình cảm ứng di động</span>
            </div>
          )}
        </div>

        {/* Mode & Role Switchers (Hidden when in Forgot mode) */}
        {mode !== 'forgot' && (
          <div className="space-y-2.5 mb-5">
            {/* Candidate vs Employer Role Selector */}
            <div className="grid grid-cols-2 p-1 bg-slate-100/90 rounded-2xl border border-slate-200/70 text-xs font-bold">
              <button
                type="button"
                onClick={() => setRole('candidate')}
                className={`flex items-center justify-center space-x-1.5 py-2 rounded-xl transition-all cursor-pointer ${
                  role === 'candidate'
                    ? 'bg-white text-[#0A58CA] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Ứng viên tìm việc</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('employer')}
                className={`flex items-center justify-center space-x-1.5 py-2 rounded-xl transition-all cursor-pointer ${
                  role === 'employer'
                    ? 'bg-white text-[#0A58CA] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Nhà tuyển dụng</span>
              </button>
            </div>

            {/* Login vs Register Mode Switcher */}
            <div className="flex bg-slate-100 p-1 rounded-full text-xs font-bold">
              <button
                type="button"
                id="auth-mode-login-tab"
                onClick={() => {
                  setMode('login');
                  setErrorMessage('');
                }}
                className={`flex-1 py-1.5 rounded-full transition-all cursor-pointer ${
                  mode === 'login'
                    ? 'bg-white text-[#0A58CA] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Đăng nhập
              </button>
              <button
                type="button"
                id="auth-mode-register-tab"
                onClick={() => {
                  setMode('register');
                  setErrorMessage('');
                }}
                className={`flex-1 py-1.5 rounded-full transition-all cursor-pointer ${
                  mode === 'register'
                    ? 'bg-white text-[#0A58CA] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Đăng ký tài khoản
              </button>
            </div>
          </div>
        )}

        {/* Error Notification */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700 flex items-center space-x-2 animate-fadeIn">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* FORGOT PASSWORD VIEW */}
        {mode === 'forgot' ? (
          <div>
            {forgotSent ? (
              <div className="text-center py-4 space-y-3">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto border border-emerald-200">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Đã gửi liên kết khôi phục</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Chúng tôi đã gửi đường dẫn đặt lại mật khẩu đến <strong>{forgotEmail}</strong>. Vui lòng kiểm tra hòm thư của bạn.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setForgotSent(false);
                    setMode('login');
                  }}
                  className="w-full py-2.5 bg-[#0A58CA] hover:bg-[#084298] text-white font-bold text-xs rounded-full shadow-xs transition-all cursor-pointer mt-3"
                >
                  Quay lại đăng nhập
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email của bạn
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:border-[#0A58CA] focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#0A58CA] hover:bg-[#084298] text-white font-bold text-xs sm:text-sm rounded-full shadow-xs transition-all cursor-pointer"
                >
                  Gửi liên kết khôi phục
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setErrorMessage('');
                  }}
                  className="w-full py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center justify-center space-x-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Quay lại trang đăng nhập</span>
                </button>
              </form>
            )}
          </div>
        ) : (
          /* LOGIN & REGISTER VIEW */
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
                    placeholder={role === 'employer' ? 'Nguyễn Mai Anh (HR Manager)' : 'Nguyễn Văn A'}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:border-[#0A58CA] focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                {mode === 'register' ? 'Email' : 'Tài khoản hoặc Email'}
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type={mode === 'register' ? 'email' : 'text'}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={
                    mode === 'register'
                      ? 'name@example.com'
                      : 'VD: NhienNguyen, abc, xyz...'
                  }
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:border-[#0A58CA] focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Số điện thoại
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0912 345 678"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:border-[#0A58CA] focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Mật khẩu
                </label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => {
                      setMode('forgot');
                      setErrorMessage('');
                    }}
                    className="text-[11px] font-semibold text-[#0A58CA] hover:underline cursor-pointer"
                  >
                    Quên mật khẩu?
                  </button>
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
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-hidden focus:border-[#0A58CA] focus:ring-2 focus:ring-blue-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Checkbox Options */}
            {mode === 'login' ? (
              <div className="flex items-center justify-between text-xs text-slate-600 pt-0.5">
                <label className="flex items-center space-x-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-[#0A58CA] rounded-sm border-slate-300 focus:ring-blue-200 cursor-pointer"
                  />
                  <span>Ghi nhớ đăng nhập</span>
                </label>
                <span className="text-[11px] text-slate-400">Bảo mật SSL 256-bit</span>
              </div>
            ) : (
              <div className="pt-1">
                <label className="flex items-start space-x-2 cursor-pointer select-none text-[11px] text-slate-600 leading-snug">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-4 h-4 text-[#0A58CA] rounded-sm border-slate-300 focus:ring-blue-200 cursor-pointer mt-0.5 shrink-0"
                  />
                  <span>
                    Tôi đồng ý với{' '}
                    <span className="text-[#0A58CA] font-semibold hover:underline">Điều khoản dịch vụ</span>{' '}
                    và{' '}
                    <span className="text-[#0A58CA] font-semibold hover:underline">Chính sách bảo mật</span> của JobCentral.
                  </span>
                </label>
              </div>
            )}

            {/* Primary Submit Button */}
            <button
              type="submit"
              id="auth-submit-btn"
              className="w-full py-3 sm:py-2.5 bg-[#0A58CA] hover:bg-[#084298] active:scale-[0.99] text-white font-bold text-xs sm:text-sm rounded-full shadow-xs hover:shadow-md transition-all flex items-center justify-center space-x-2 mt-4 cursor-pointer"
            >
              <span>
                {mode === 'login'
                  ? role === 'employer'
                    ? 'Đăng nhập Tuyển Dụng'
                    : 'Đăng nhập ngay'
                  : role === 'employer'
                  ? 'Đăng ký Nhà Tuyển Dụng'
                  : 'Tạo tài khoản ứng viên'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-[11px] uppercase tracking-wider font-semibold">
                <span className="bg-white px-3 text-slate-400">Hoặc tiếp tục với</span>
              </div>
            </div>

            {/* Google Social Login */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-2.5 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold text-xs sm:text-sm rounded-full transition-all flex items-center justify-center space-x-2.5 cursor-pointer shadow-2xs"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
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
              <span>Tiếp tục với Google</span>
            </button>

            {/* Quick 1-Click Demo Accounts Section */}
            <div className="mt-4 pt-3.5 border-t border-slate-100">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 mb-2">
                <span>Tài khoản test có sẵn:</span>
                <span className="text-[#0A58CA] font-semibold text-[10px]">Nhấn để đăng nhập nhanh</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {MOCK_TEST_ACCOUNTS.map((acc) => (
                  <button
                    key={acc.id}
                    type="button"
                    onClick={() => handleQuickTestAccount(acc)}
                    className="px-2.5 py-1.5 rounded-xl border border-blue-200/80 bg-blue-50/50 hover:bg-blue-100/80 text-left transition-colors cursor-pointer"
                  >
                    <p className="text-[11px] font-bold text-[#0A58CA] truncate">
                      {acc.username}
                    </p>
                    <p className="text-[10px] text-slate-500 truncate">
                      MK: {acc.password}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </form>
        )}

        <div className="mt-4 sm:mt-5 text-center text-[11px] text-slate-400 leading-relaxed">
          JobCentral cam kết bảo mật tuyệt đối thông tin cá nhân và hồ sơ ứng viên.
        </div>
      </div>
    </div>
  );
};
