import React, { useState, useEffect } from 'react';

// ---- DỮ LIỆU (thay bằng dữ liệu thật từ API khi có) ----
// Đơn vị: triệu VNĐ / tháng (Gross)
const SALARY_DATA = [
  { level: 'Fresher / Dưới 1 năm', p25: 8, p50: 11.5, p75: 15, rangeLabel: '8 - 15 triệu' },
  { level: 'Junior (1 - 3 năm)', p25: 14, p50: 18.5, p75: 24, rangeLabel: '14 - 24 triệu' },
  { level: 'Middle-level (3 - 5 năm)', p25: 22, p50: 29, p75: 38, rangeLabel: '22 - 38 triệu' },
  { level: 'Senior (5 - 8 năm)', p25: 35, p50: 48, p75: 65, rangeLabel: '35 - 65 triệu' },
  { level: 'Lead / Director / Head of Dept (8+ năm)', p25: 60, p50: 82, p75: 110, rangeLabel: '60 - 110+ triệu' },
];

const MAX_SALARY = 100; // trục tối đa 100M+ (giá trị lớn hơn sẽ bị cắt ở mép phải)
const AXIS_TICKS = [0, 25, 50, 75, 100];

const LOCATION_DATA = [
  { id: 'hcm', name: 'TP. Hồ Chí Minh', short: 'TP. HCM', value: 54.2, color: '#0B4FD6' },
  { id: 'hn', name: 'Hà Nội', short: 'Hà Nội', value: 34.8, color: '#2F6BFF' },
  { id: 'dn', name: 'Đà Nẵng & Miền Trung', short: 'Đà Nẵng', value: 7.0, color: '#FFA81C' },
  { id: 'other', name: 'Các tỉnh thành khác', short: 'Khác', value: 4.0, color: '#C9C9D8' },
];

// ---- THÔNG SỐ BIỂU ĐỒ TRÒN (donut) ----
const RADIUS = 70;
const STROKE = 26;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const GAP = 2; // khoảng hở giữa các cung

const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

export const MarketAnalytics = () => {
  const [mounted, setMounted] = useState(false);
  const [activeLocationId, setActiveLocationId] = useState('hcm');

  // Kích hoạt animation thanh lương sau khi render lần đầu
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(t);
  }, []);

  // Tính vị trí từng cung của donut
  let accumulated = 0;
  const segments = LOCATION_DATA.map((item) => {
    const len = (item.value / 100) * CIRCUMFERENCE;
    const seg = { ...item, len, offset: accumulated };
    accumulated += len;
    return seg;
  });

  const activeLocation =
    LOCATION_DATA.find((l) => l.id === activeLocationId) || LOCATION_DATA[0];

  // Tải CSV dữ liệu thô (có BOM để Excel đọc đúng tiếng Việt)
  const handleDownloadCsv = () => {
    const rows = [
      ['Phổ lương theo cấp bậc'],
      ['Cấp bậc', 'P25 (triệu)', 'Trung vị P50 (triệu)', 'P75 (triệu)'],
      ...SALARY_DATA.map((d) => [d.level, d.p25, d.p50, d.p75]),
      [],
      ['Phân bổ nhu cầu theo địa phương'],
      ['Khu vực', 'Tỷ trọng (%)'],
      ...LOCATION_DATA.map((l) => [l.name, l.value]),
    ];
    const csv = rows
      .map((r) => r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'du-lieu-thi-truong-lao-dong.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
        <div className="text-left">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Đồ thị Phân tích Thị trường & Chuyên sâu
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Khảo sát trên tập mẫu dữ liệu lương thực tế từ các vị trí tuyển dụng chính thức trong 90 ngày qua
          </p>
        </div>

        <div className="inline-flex p-1 bg-slate-100/90 rounded-full border border-slate-200/80 shrink-0 self-start">
          <button
            type="button"
            className="px-4 py-1.5 rounded-full text-xs font-semibold bg-[#2170E4] text-white shadow-sm shadow-blue-500/20 cursor-default"
          >
            Biểu đồ động
          </button>
          <button
            type="button"
            onClick={handleDownloadCsv}
            className="px-4 py-1.5 rounded-full text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 transition-colors cursor-pointer"
          >
            Tải CSV Dữ liệu thô
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* ===== CARD TRÁI: PHỔ LƯƠNG ===== */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs text-left">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Phổ lương theo Cấp bậc & Năm kinh nghiệm
              </h3>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Đơn vị: Triệu VNĐ / Tháng (Gross)
              </p>
            </div>

            {/* Chú thích */}
            <div className="flex items-center gap-3.5 text-[11px] font-bold text-slate-700 shrink-0">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#DDE3FF]" /> P25
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0B4FD6]" /> Trung vị (P50)
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B9C4FF]" /> P75
              </span>
            </div>
          </div>

          <div className="space-y-5">
            {SALARY_DATA.map((row, idx) => {
              const left = (clamp(row.p25, 0, MAX_SALARY) / MAX_SALARY) * 100;
              const width =
                ((clamp(row.p75, 0, MAX_SALARY) - clamp(row.p25, 0, MAX_SALARY)) / MAX_SALARY) * 100;
              const median = (clamp(row.p50, 0, MAX_SALARY) / MAX_SALARY) * 100;

              return (
                <div key={row.level}>
                  <div className="flex items-center justify-between gap-3 text-xs mb-1.5">
                    <span className="font-bold text-slate-900 truncate">{row.level}</span>
                    <span className="text-slate-500 font-medium shrink-0">
                      {row.rangeLabel} (Trung vị:{' '}
                      <span className="font-extrabold text-[#2170E4]">{row.p50}M</span>)
                    </span>
                  </div>

                  {/* Thanh nền */}
                  <div className="relative h-4 rounded-full bg-[#EEF0FF]">
                    {/* Khoảng P25 -> P75 */}
                    <div
                      className="absolute top-0 h-full rounded-full bg-[#B9C4FF] transition-all duration-700 ease-out"
                      style={{
                        left: `${left}%`,
                        width: mounted ? `${width}%` : '0%',
                        transitionDelay: `${idx * 90}ms`,
                      }}
                    />
                    {/* Điểm trung vị */}
                    <div
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-4 rounded-full bg-[#0B4FD6] shadow-sm transition-opacity duration-500"
                      style={{
                        left: `${median}%`,
                        opacity: mounted ? 1 : 0,
                        transitionDelay: `${idx * 90 + 300}ms`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trục số */}
          <div className="relative mt-5 h-4 text-[11px] font-bold text-slate-800">
            {AXIS_TICKS.map((tick, i) => {
              const isFirst = i === 0;
              const isLast = i === AXIS_TICKS.length - 1;
              return (
                <span
                  key={tick}
                  className="absolute whitespace-nowrap"
                  style={{
                    left: `${tick}%`,
                    transform: isFirst ? 'none' : isLast ? 'translateX(-100%)' : 'translateX(-50%)',
                  }}
                >
                  {isLast ? `${tick}M+ VNĐ` : `${tick}M`}
                </span>
              );
            })}
          </div>
        </div>

        {/* ===== CARD PHẢI: PHÂN BỔ THEO ĐỊA PHƯƠNG ===== */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs text-left flex flex-col">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            Phân bổ Nhu cầu theo Địa phương
          </h3>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Tỷ trọng tin tuyển dụng hoạt động trên cả nước
          </p>

          <div className="flex-1 flex flex-col sm:flex-row items-center justify-center gap-6 py-6">
            {/* Donut */}
            <div className="relative w-44 h-44 sm:w-48 sm:h-48 shrink-0">
              <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
                {segments.map((seg) => {
                  const dash = Math.max(seg.len - GAP, 0);
                  const isActive = seg.id === activeLocationId;
                  return (
                    <circle
                      key={seg.id}
                      cx="100"
                      cy="100"
                      r={RADIUS}
                      fill="none"
                      stroke={seg.color}
                      strokeWidth={isActive ? STROKE + 4 : STROKE}
                      strokeDasharray={`${dash} ${CIRCUMFERENCE - dash}`}
                      strokeDashoffset={-seg.offset}
                      className="transition-all duration-300 cursor-pointer"
                      style={{ opacity: isActive ? 1 : 0.85 }}
                      onMouseEnter={() => setActiveLocationId(seg.id)}
                    />
                  );
                })}
              </svg>

              {/* Chữ ở giữa */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-extrabold text-slate-900 leading-none">
                  {Math.round(activeLocation.value)}%
                </span>
                <span className="text-[11px] font-bold text-slate-600 mt-1 uppercase tracking-wide">
                  {activeLocation.short}
                </span>
              </div>
            </div>

            {/* Chú thích */}
            <div className="w-full sm:w-auto sm:min-w-[210px] space-y-2">
              {LOCATION_DATA.map((item) => {
                const isActive = item.id === activeLocationId;
                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => setActiveLocationId(item.id)}
                    className={`flex items-center justify-between gap-3 px-3 py-1.5 rounded-xl text-xs transition-colors cursor-pointer ${
                      isActive ? 'bg-blue-50 ring-1 ring-blue-100' : 'bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    <span className="inline-flex items-center gap-2 font-medium text-slate-700">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      {item.name}
                    </span>
                    <span className="font-extrabold text-slate-900">{item.value.toFixed(1)}%</span>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="text-xs text-slate-600 text-center leading-relaxed mt-auto">
            Làn sóng tuyển dụng Hybrid chiếm <strong className="text-[#2170E4]">38%</strong> tổng
            lượng job tại TP.HCM & Hà Nội
          </p>
        </div>
      </div>
    </div>
  );
};
