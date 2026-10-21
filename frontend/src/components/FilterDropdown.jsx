import React, { useEffect, useRef } from 'react';
import { ChevronDown, Check } from 'lucide-react';

/**
 * Dropdown tuỳ chỉnh thay cho <select> — style khớp với bộ lọc ở trang JobSearchView.
 *
 * Props:
 *  - id: định danh duy nhất, ví dụ 'salary' | 'experience' | 'jobType'
 *  - value: giá trị đang chọn ('' = tất cả)
 *  - onChange(value): được gọi khi chọn một mục
 *  - options: [{ value, label }] — mục đầu tiên nên có value: '' (Tất cả ...)
 *  - openDropdown, setOpenDropdown: state đóng/mở do component cha giữ (mỗi lúc chỉ mở 1 dropdown)
 *  - placement: 'bottom' (mặc định, sổ xuống) | 'top' (sổ lên)
 *
 * Component tự đóng khi bấm ra ngoài hoặc nhấn Escape, không phụ thuộc lớp phủ `fixed`
 * (lớp phủ fixed sẽ bị lệch nếu nằm trong phần tử có backdrop-blur như thẻ bộ lọc ở hero).
 */
export const FilterDropdown = ({
  id,
  value,
  onChange,
  options,
  openDropdown,
  setOpenDropdown,
  placement = 'bottom',
}) => {
  const wrapperRef = useRef(null);
  const isOpen = openDropdown === id;
  const selected = options.find((o) => o.value === value) || options[0];

  // Đóng khi bấm ra ngoài hoặc nhấn Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    const handleKey = (e) => {
      if (e.key === 'Escape') setOpenDropdown(null);
    };

    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('touchstart', handleOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('touchstart', handleOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, setOpenDropdown]);

  return (
    <div ref={wrapperRef} className="relative w-full">
      {/* Nút mở dropdown */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpenDropdown(isOpen ? null : id);
        }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`w-full border rounded-full px-3.5 py-2 text-xs flex items-center justify-between transition-all cursor-pointer text-left ${
          value || isOpen
            ? 'bg-white border-slate-900 text-slate-900 font-semibold shadow-2xs'
            : 'bg-slate-50/90 hover:bg-slate-100/80 border-slate-200 text-slate-700 font-medium'
        }`}
      >
        <span className="truncate pr-2">{selected?.label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-500 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-slate-900' : ''
          }`}
        />
      </button>

      {/* Danh sách sổ ra */}
      {isOpen && (
        <div
          role="listbox"
          onClick={(e) => e.stopPropagation()}
          className={`absolute left-0 right-0 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-1.5 z-30 max-h-56 overflow-y-auto no-scrollbar space-y-0.5 animate-fadeIn text-left ${
            placement === 'top' ? 'bottom-full mb-1.5' : 'top-full mt-1.5'
          }`}
        >
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value || 'all'}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={(e) => {
                  e.stopPropagation();
                  onChange(opt.value);
                  setOpenDropdown(null);
                }}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-slate-100 hover:bg-slate-200/80 text-slate-950 font-bold'
                    : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900 font-medium'
                }`}
              >
                <span className="truncate pr-2">{opt.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-slate-950 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
