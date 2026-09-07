import React, { useState } from 'react';
import { Smartphone, Monitor, Tablet, Check, Settings2, RefreshCw, X } from 'lucide-react';
import { useDevice } from '../context/DeviceContext';

export const DeviceStatusBadge = () => {
  const device = useDevice();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating indicator button in bottom right (above bottom nav on mobile) */}
      <div className="fixed bottom-16 sm:bottom-4 right-3 z-30 select-none">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-1.5 bg-slate-900/85 hover:bg-slate-900 text-white text-[11px] font-semibold py-1.5 px-3 rounded-full shadow-lg backdrop-blur-md border border-slate-700/50 transition-all active:scale-95 cursor-pointer"
          title="Thông tin nhận diện thiết bị"
        >
          {device.isPhone ? (
            <Smartphone className="w-3.5 h-3.5 text-blue-400" />
          ) : device.isTablet ? (
            <Tablet className="w-3.5 h-3.5 text-emerald-400" />
          ) : (
            <Monitor className="w-3.5 h-3.5 text-slate-300" />
          )}
          <span>
            {device.simulatedDevice !== 'auto'
              ? `Mô phỏng: ${device.simulatedDevice === 'phone' ? 'Điện thoại' : 'Máy tính'}`
              : device.isPhone
              ? `${device.os} Di động`
              : `${device.os} PC`}
          </span>
        </button>
      </div>

      {/* Modal Dialog for Device System settings & tester */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-sm w-full shadow-2xl border border-slate-200 p-5 text-left text-slate-800 animate-slideUp">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0A58CA] flex items-center justify-center font-bold">
                  <Smartphone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Hệ Thống Nhận Diện Thiết Bị
                  </h4>
                  <p className="text-[10px] text-slate-400">
                    Tự động tối ưu giao diện chống vỡ khung hình
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Diagnostic Snapshot */}
            <div className="bg-slate-50 rounded-xl p-3 text-xs space-y-2 mb-4 border border-slate-200/70">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Thiết bị hiện tại:</span>
                <span className="font-bold text-slate-800 flex items-center space-x-1">
                  {device.isPhone ? '📱 Điện thoại thông minh' : device.isTablet ? '📱 Máy tính bảng' : '💻 Máy tính để bàn'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Hệ điều hành:</span>
                <span className="font-semibold text-slate-800">{device.os} ({device.browser})</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Độ phân giải:</span>
                <span className="font-semibold text-slate-800">{device.width} × {device.height}px</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Hỗ trợ cảm ứng (Touch):</span>
                <span className={`font-semibold ${device.isTouch ? 'text-emerald-600' : 'text-slate-600'}`}>
                  {device.isTouch ? '✓ Có (Touch Screen)' : '✗ Chuột / Phím'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Chế độ hiển thị:</span>
                <span className="font-bold text-[#0A58CA]">
                  {device.isPhone ? 'Giao diện Điện Thoại (Không vỡ layout)' : 'Giao diện Màn Hình Lớn'}
                </span>
              </div>
            </div>

            {/* Simulation controls for easy testing in browser preview */}
            <div className="space-y-1.5 mb-4">
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Chế độ xem trước (Simulator Mode):
              </label>
              <div className="grid grid-cols-3 gap-1.5 text-xs">
                <button
                  type="button"
                  onClick={() => device.setSimulatedDevice('auto')}
                  className={`py-2 px-2 rounded-lg border font-medium flex flex-col items-center justify-center space-y-1 transition-all cursor-pointer ${
                    device.simulatedDevice === 'auto'
                      ? 'border-[#0A58CA] bg-blue-50 text-[#0A58CA] font-bold shadow-2xs'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span className="text-[10px]">Tự động</span>
                </button>

                <button
                  type="button"
                  onClick={() => device.setSimulatedDevice('phone')}
                  className={`py-2 px-2 rounded-lg border font-medium flex flex-col items-center justify-center space-y-1 transition-all cursor-pointer ${
                    device.simulatedDevice === 'phone'
                      ? 'border-[#0A58CA] bg-blue-50 text-[#0A58CA] font-bold shadow-2xs'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span className="text-[10px]">Điện thoại</span>
                </button>

                <button
                  type="button"
                  onClick={() => device.setSimulatedDevice('desktop')}
                  className={`py-2 px-2 rounded-lg border font-medium flex flex-col items-center justify-center space-y-1 transition-all cursor-pointer ${
                    device.simulatedDevice === 'desktop'
                      ? 'border-[#0A58CA] bg-blue-50 text-[#0A58CA] font-bold shadow-2xs'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span className="text-[10px]">Máy tính</span>
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full py-2.5 bg-[#0A58CA] text-white text-xs font-bold rounded-xl shadow-sm hover:bg-[#084298] transition-colors"
            >
              Đã hiểu & Đóng
            </button>
          </div>
        </div>
      )}
    </>
  );
};
