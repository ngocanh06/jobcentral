import React from 'react';
import { AlertTriangle, RefreshCw, Home, RotateCcw } from 'lucide-react';

/**
 * ErrorBoundary Component
 * Catches JavaScript errors anywhere in their child component tree,
 * logs those errors, and displays a user-friendly fallback UI.
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      // If a custom fallback is provided as a function or React element
      if (typeof this.props.fallback === 'function') {
        return this.props.fallback(this.state.error, this.handleReset);
      }
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const title =
        this.props.title || 'Không thể tải danh sách việc làm';
      const message =
        this.props.message ||
        'Đã xảy ra sự cố trong quá trình xử lý hoặc kết nối dữ liệu việc làm. Vui lòng kiểm tra lại kết nối mạng hoặc thử lại.';

      return (
        <div
          className="bg-white rounded-2xl border border-rose-100 p-8 sm:p-12 text-center my-6 shadow-xs relative overflow-hidden"
          role="alert"
          aria-live="assertive"
        >
          {/* Subtle background glow */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-rose-50 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-50 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-md mx-auto flex flex-col items-center">
            <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mb-4 border border-rose-100 shadow-xs">
              <AlertTriangle className="w-8 h-8 stroke-[2.2]" />
            </div>

            <h3 className="text-lg font-bold text-slate-800 tracking-tight">
              {title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-500 mt-2 mb-6 leading-relaxed">
              {message}
            </p>

            {this.state.error?.message && (
              <div className="w-full bg-slate-50 border border-slate-200/80 rounded-xl p-3 mb-6 text-left">
                <p className="text-[11px] font-semibold text-slate-500 mb-1">
                  Mã lỗi / Chi tiết:
                </p>
                <p className="text-xs font-mono text-rose-600 break-words line-clamp-2">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={this.handleReset}
                className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#2170E4] hover:bg-[#1a5bbd] text-white text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer shadow-xs active:scale-95"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Thử tải lại</span>
              </button>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="inline-flex items-center space-x-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer active:scale-95"
              >
                <RotateCcw className="w-4 h-4 text-slate-500" />
                <span>Làm mới trang</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
