import React, { useState, useEffect, useRef } from 'react';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
  Briefcase,
  Sparkles,
  AlertCircle,
  RotateCcw,
} from 'lucide-react';
import { login, verifyOtp, resendOtp } from '../services/authApi';

const RESEND_COOLDOWN = 60;

export const CandidateLoginPage = ({ onLoginSuccess, onNavigateRegister, onNavigateHome }) => {
  const [step, setStep] = useState('credentials'); // 'credentials' | 'otp'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const [sessionId, setSessionId] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [cooldown, setCooldown] = useState(0);

  const [errorMessage, setErrorMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const otpRefs = useRef([]);

  // Đếm ngược gửi lại OTP
  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  // Tự focus ô OTP đầu tiên khi chuyển bước
  useEffect(() => {
    if (step === 'otp') otpRefs.current[0]?.focus();
  }, [step]);

  // BƯỚC 1: email + mật khẩu
  const handleCredentialsSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setInfoMessage('');

    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Vui lòng nhập địa chỉ email hợp lệ.');
      return;
    }
    if (!password || password.length < 6) {
      setErrorMessage('Mật khẩu cần có tối thiểu 6 ký tự.');
      return;
    }

    setIsLoading(true);
    try {
      const data = await login(email.trim(), password);
      if (!data.success) {
        setErrorMessage(data.message || 'Đăng nhập thất bại, vui lòng thử lại.');
        return;
      }
      setSessionId(data.sessionId);
      setStep('otp');
      setCooldown(RESEND_COOLDOWN);
      setInfoMessage(data.message || 'Đã gửi mã OTP về email của bạn.');
    } catch {
      setErrorMessage('Không thể kết nối máy chủ. Vui lòng kiểm tra mạng và thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  // BƯỚC 2: nhập OTP
  const handleOtpChange = (index, value) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    if (digit && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;
    e.preventDefault();
    const next = ['', '', '', '', '', ''];
    pasted.split('').forEach((d, i) => (next[i] = d));
    setOtp(next);
    otpRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length !== 6) {
      setErrorMessage('Vui lòng nhập đủ 6 chữ số của mã OTP.');
      return;
    }

    setErrorMessage('');
    setIsLoading(true);
    try {
      const data = await verifyOtp(sessionId, code);
      if (!data.success) {
        setErrorMessage(data.message || 'Xác thực thất bại.');
        if (data.message?.includes('hết') || data.message?.includes('Nhập sai')) {
          setOtp(['', '', '', '', '', '']);
        }
        return;
      }
      if (rememberMe) localStorage.setItem('jc_token', data.token);
      else sessionStorage.setItem('jc_token', data.token);

      onLoginSuccess?.({
        token: data.token,
        email: email.trim(),
        role: 'candidate',
        provider: 'credentials',
      });
    } catch {
      setErrorMessage('Không thể kết nối máy chủ. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (cooldown > 0 || isLoading) return;
    setErrorMessage('');
    setIsLoading(true);
    try {
      const data = await resendOtp(sessionId);
      if (!data.success) {
        setErrorMessage(data.message || 'Không thể gửi lại mã.');
        return;
      }
      setOtp(['', '', '', '', '', '']);
      setCooldown(RESEND_COOLDOWN);
      setInfoMessage(data.message || 'Đã gửi lại mã OTP mới.');
    } catch {
      setErrorMessage('Không thể kết nối máy chủ.');
    } finally {
      setIsLoading(false);
    }
  };

  const goBackToCredentials = () => {
    setStep('credentials');
    setOtp(['', '', '', '', '', '']);
    setSessionId('');
    setErrorMessage('');
    setInfoMessage('');
  };

  return (
    <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden font-sans text-slate-800">
        {/* Cột trái: thương hiệu & lợi ích cho ứng viên */}
        <div className="hidden lg:flex flex-col justify-between p-10 bg-gradient-to-br from-[#2170E4] to-[#1a5bbd] text-white relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-16 w-72 h-72 bg-blue-300/10 rounded-full blur-3xl pointer-events-none" />

          <button
            type="button"
            onClick={onNavigateHome}
            className="relative z-10 flex items-center gap-2 cursor-pointer w-fit"
          >
            <span className="text-2xl font-extrabold tracking-tight">JobCentral</span>
          </button>

          <div className="relative z-10 space-y-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              Dành cho ứng viên
            </span>
            <h2 className="text-3xl xl:text-4xl font-extrabold leading-tight">
              Tìm công việc mơ ước của bạn cùng JobCentral
            </h2>
            <ul className="space-y-3 text-sm text-blue-50">
              <li className="flex items-start gap-2.5">
                <Briefcase className="w-4 h-4 mt-0.5 shrink-0" />
                Hơn 10.000 việc làm từ doanh nghiệp đã xác minh
              </li>
              <li className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 mt-0.5 shrink-0" />
                Hồ sơ và thông tin cá nhân được bảo mật tuyệt đối
              </li>
              <li className="flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 mt-0.5 shrink-0" />
                Theo dõi trạng thái ứng tuyển và nhận gợi ý phù hợp
              </li>
            </ul>
          </div>

          <p className="relative z-10 text-xs text-blue-100/80">
            © 2026 JobCentral. Mọi quyền được bảo lưu.
          </p>
        </div>

        {/* Cột phải: form */}
        <div className="p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {step === 'credentials' ? 'Đăng nhập ứng viên' : 'Xác thực OTP'}
            </h1>
            <p className="text-sm text-slate-500 mt-1.5">
              {step === 'credentials'
                ? 'Chào mừng bạn trở lại! Đăng nhập để tiếp tục hành trình sự nghiệp.'
                : 'Nhập mã 6 chữ số đã được gửi tới email của bạn.'}
            </p>
          </div>

          {/* Thông báo */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}
          {infoMessage && !errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs font-semibold text-[#2170E4]">
              {infoMessage}
            </div>
          )}

          {step === 'credentials' && import.meta.env.DEV && (
            <div className="text-xs text-slate-500 bg-slate-50 border rounded-lg p-3 mb-4">
              <p className="font-semibold">Tài khoản test:</p>
              <p>Email: vietnhiennguyen91@gmail.com</p>
              <p>Mật khẩu: 123456</p>
            </div>
          )}

          {step === 'credentials' ? (
            <form onSubmit={handleCredentialsSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ban@example.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#2170E4] focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                </div>
              </div>

              {/* Mật khẩu */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Mật khẩu
                  </label>
                  <button
                    type="button"
                    onClick={() => onNavigateRegister?.('forgot')}
                    className="text-xs font-semibold text-[#2170E4] hover:underline cursor-pointer"
                  >
                    Quên mật khẩu?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-[#2170E4] focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 accent-[#2170E4] cursor-pointer"
                />
                Ghi nhớ đăng nhập trên thiết bị này
              </label>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#2170E4] hover:bg-[#1a5bbd] text-white font-bold text-sm rounded-full shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer active:scale-[0.99]"
              >
                {isLoading ? 'Đang kiểm tra...' : 'Tiếp tục'}
                {!isLoading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#2170E4] shrink-0" />
                <span>
                  Mã có hiệu lực trong <strong>5 phút</strong> và được gửi tới{' '}
                  <strong className="text-slate-900">{email}</strong>
                </span>
              </div>

              {/* 6 ô OTP */}
              <div className="flex justify-between gap-2" onPaste={handleOtpPaste}>
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => (otpRefs.current[i] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    className="w-11 h-13 sm:w-12 sm:h-14 text-center text-xl font-extrabold text-slate-900 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:border-[#2170E4] focus:ring-4 focus:ring-blue-100 transition-all"
                    aria-label={`Chữ số OTP thứ ${i + 1}`}
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={isLoading || otp.join('').length !== 6}
                className="w-full py-3 bg-[#2170E4] hover:bg-[#1a5bbd] text-white font-bold text-sm rounded-full shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {isLoading ? 'Đang xác thực...' : 'Xác nhận đăng nhập'}
              </button>

              <div className="flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={goBackToCredentials}
                  className="flex items-center gap-1 font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Đổi tài khoản
                </button>

                <button
                  type="button"
                  onClick={handleResend}
                  disabled={cooldown > 0 || isLoading}
                  className="flex items-center gap-1 font-semibold text-[#2170E4] hover:underline disabled:text-slate-400 disabled:no-underline disabled:cursor-not-allowed cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  {cooldown > 0 ? `Gửi lại sau ${cooldown}s` : 'Gửi lại mã'}
                </button>
              </div>
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-slate-100 text-center text-sm text-slate-600">
            Chưa có tài khoản?{' '}
            <button
              type="button"
              onClick={() => onNavigateRegister?.('register')}
              className="font-bold text-[#2170E4] hover:underline cursor-pointer"
            >
              Đăng ký ứng viên
            </button>
          </div>

          <p className="mt-4 text-[11px] text-center text-slate-400 leading-relaxed">
            Bằng việc đăng nhập, bạn đồng ý với Điều khoản sử dụng và Chính sách bảo mật của JobCentral.
          </p>
        </div>
      </div>
  );
};

export default CandidateLoginPage;
