import React, { useState, useMemo } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import {
  CreditCard, DollarSign, TrendingUp, CheckCircle, Clock, XCircle,
  AlertCircle, Search, Download, Plus, Eye, RefreshCw, FileText,
  Building, ArrowUpRight, ArrowDownRight, Printer, Check, X,
  ShieldCheck, Package, Layers, Sparkles
} from 'lucide-react';

const INITIAL_TRANSACTIONS = [
  {
    id: 'TXN-2026-0801',
    company: 'TechCorp Vietnam JSC',
    email: 'billing@techcorp.vn',
    taxCode: '0108928374',
    package: 'Gói Doanh nghiệp Pro (30 ngày)',
    amount: 2500000,
    method: 'VNPAY',
    status: 'success',
    createdAt: '08/10/2026 10:24',
    invoiceRequested: true,
    invoiceSent: true,
  },
  {
    id: 'TXN-2026-0802',
    company: 'Tập đoàn Vingroup (VinFast)',
    email: 'finance@vinfast.vn',
    taxCode: '0101245486',
    package: 'Gói Enterprise VIP (Quý IV)',
    amount: 7900000,
    method: 'Vietcombank QR',
    status: 'success',
    createdAt: '08/10/2026 09:15',
    invoiceRequested: true,
    invoiceSent: true,
  },
  {
    id: 'TXN-2026-0803',
    company: 'StartupXYZ Solutions',
    email: 'recruit@startupxyz.vn',
    taxCode: '0316789456',
    package: 'Gói AI Screening 100 Lượt',
    amount: 1200000,
    method: 'MoMo',
    status: 'pending',
    createdAt: '08/10/2026 08:50',
    invoiceRequested: false,
    invoiceSent: false,
  },
  {
    id: 'TXN-2026-0804',
    company: 'FPT Software Da Nang',
    email: 'acct@fpt.com',
    taxCode: '0101778127',
    package: 'Gói 5 Tin Đăng Tuyển VIP',
    amount: 1800000,
    method: 'Thẻ Quốc tế (Visa)',
    status: 'success',
    createdAt: '07/10/2026 16:30',
    invoiceRequested: true,
    invoiceSent: false,
  },
  {
    id: 'TXN-2026-0805',
    company: 'Công ty TNHH Giải Pháp Thiên Hà',
    email: 'thienha.hr@gmail.com',
    taxCode: '0315894112',
    package: 'Gói Đăng Tin Tiêu Chuẩn',
    amount: 500000,
    method: 'Vietcombank QR',
    status: 'pending',
    createdAt: '07/10/2026 14:10',
    invoiceRequested: false,
    invoiceSent: false,
  },
  {
    id: 'TXN-2026-0806',
    company: 'Tiệm Bánh Ngọt ABC',
    email: 'banhngotabc@gmail.com',
    taxCode: '',
    package: 'Gói Đăng Tin Cơ Bản',
    amount: 350000,
    method: 'MoMo',
    status: 'failed',
    createdAt: '06/10/2026 11:20',
    failureReason: 'Tài khoản MoMo không đủ số dư hoặc người dùng hủy',
    invoiceRequested: false,
    invoiceSent: false,
  },
  {
    id: 'TXN-2026-0807',
    company: 'Công ty Cổ Phần MegaGroup',
    email: 'contact@megagroup.vn',
    taxCode: '0309998877',
    package: 'Gói Doanh nghiệp Pro (30 ngày)',
    amount: 2500000,
    method: 'VNPAY',
    status: 'refunded',
    createdAt: '05/10/2026 15:45',
    refundReason: 'Khách hàng hủy gói trong 24h và yêu cầu hoàn trả',
    invoiceRequested: true,
    invoiceSent: false,
  },
];

const INITIAL_PACKAGES = [
  {
    id: 'pkg-basic',
    name: 'Gói Đăng Tin Cơ Bản',
    price: 350000,
    duration: '14 ngày',
    features: ['1 tin đăng tuyển dụng tiêu chuẩn', 'Hiển thị tìm kiếm cơ bản', 'Hỗ trợ qua email trong 24h'],
    active: true,
    popular: false,
  },
  {
    id: 'pkg-standard',
    name: 'Gói Đăng Tin Tiêu Chuẩn',
    price: 500000,
    duration: '30 ngày',
    features: ['1 tin tuyển dụng 30 ngày', 'Gắn nhãn tuyển gấp', 'Xem 10 hồ sơ ứng viên miễn phí'],
    active: true,
    popular: false,
  },
  {
    id: 'pkg-pro',
    name: 'Gói Doanh Nghiệp Pro',
    price: 2500000,
    duration: '30 ngày',
    features: ['5 tin đăng VIP trang chủ', '50 lượt xem CV ứng viên chất lượng cao', 'Công cụ AI gợi ý ứng viên phù hợp', 'Hỗ trợ kỹ thuật 24/7'],
    active: true,
    popular: true,
  },
  {
    id: 'pkg-vip',
    name: 'Gói Enterprise VIP',
    price: 7900000,
    duration: '90 ngày (Quý)',
    features: ['Không giới hạn tin đăng tuyển dụng', 'Huy hiệu Doanh nghiệp xác thực VIP', 'Mở khóa toàn bộ kho CV ứng viên', 'AI Truth Score & Tự động sàng lọc CV'],
    active: true,
    popular: false,
  },
  {
    id: 'pkg-ai',
    name: 'Gói AI Screening 100 Lượt',
    price: 1200000,
    duration: 'Không hết hạn',
    features: ['100 lượt phân tích AI Truth Score', 'Chấm điểm độ khớp CV & JD tự động', 'Tóm tắt thế mạnh và rủi ro ứng viên'],
    active: true,
    popular: false,
  },
];

const formatVND = (num) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);

export default function PaymentManagement() {
  const [activeTab, setActiveTab] = useState('transactions');
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [packages, setPackages] = useState(INITIAL_PACKAGES);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');
  const [toast, setToast] = useState(null);

  const [invoiceModalTxn, setInvoiceModalTxn] = useState(null);
  const [refundModalTxn, setRefundModalTxn] = useState(null);
  const [refundReasonInput, setRefundReasonInput] = useState('Khách hàng yêu cầu hoàn phí dịch vụ');

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchSearch =
        t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.package.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus = statusFilter === 'all' || t.status === statusFilter;
      const matchMethod = methodFilter === 'all' || t.method === methodFilter;
      return matchSearch && matchStatus && matchMethod;
    });
  }, [transactions, searchQuery, statusFilter, methodFilter]);

  const stats = useMemo(() => {
    const successTxns = transactions.filter((t) => t.status === 'success');
    const totalRev = successTxns.reduce((acc, t) => acc + t.amount, 0);
    const pendingTxns = transactions.filter((t) => t.status === 'pending');
    const refundedTxns = transactions.filter((t) => t.status === 'refunded');

    return {
      totalRevenue: totalRev,
      todayRevenue: 10400000,
      totalCount: transactions.length,
      successCount: successTxns.length,
      pendingCount: pendingTxns.length,
      refundedCount: refundedTxns.length,
    };
  }, [transactions]);

  const handleApproveTransaction = (id) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: 'success' } : t))
    );
    showToast(`Đã xác nhận thanh toán thành công cho đơn #${id}`);
  };

  const handleOpenRefund = (txn) => {
    setRefundModalTxn(txn);
    setRefundReasonInput('Khách hàng yêu cầu hủy gói dịch vụ');
  };

  const handleConfirmRefund = () => {
    if (!refundModalTxn) return;
    setTransactions((prev) =>
      prev.map((t) =>
        t.id === refundModalTxn.id
          ? { ...t, status: 'refunded', refundReason: refundReasonInput }
          : t
      )
    );
    setRefundModalTxn(null);
    showToast(`Đã hoàn tiền cho giao dịch #${refundModalTxn.id}`);
  };

  const handleTogglePackageActive = (pkgId) => {
    setPackages((prev) =>
      prev.map((p) => (p.id === pkgId ? { ...p, active: !p.active } : p))
    );
    showToast('Đã cập nhật trạng thái gói dịch vụ');
  };

  const handleToggleInvoiceSent = (txnId) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === txnId ? { ...t, invoiceSent: !t.invoiceSent } : t))
    );
    showToast('Đã cập nhật trạng thái hóa đơn điện tử');
  };

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Mã GD,Doanh nghiệp,Gói dịch vụ,Số tiền,Phương thức,Trạng thái,Thời gian']
        .concat(
          filteredTransactions.map(
            (t) =>
              `"${t.id}","${t.company}","${t.package}",${t.amount},"${t.method}","${t.status}","${t.createdAt}"`
          )
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `jobcentral_finance_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Đã xuất báo cáo doanh thu thành công!');
  };

  const inputClass =
    "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2170e4]/40 focus:border-[#2170e4] transition bg-white";

  return (
    <AdminLayout
      title="Quản lý thanh toán & Doanh thu"
      subtitle="Theo dõi dòng tiền, hóa đơn GTGT và các gói dịch vụ tuyển dụng"
    >
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 text-white text-sm font-medium transition-all ${
            toast.type === 'error' ? 'bg-rose-600' : 'bg-emerald-600'
          }`}
        >
          {toast.type === 'error' ? <AlertCircle size={16} /> : <CheckCircle size={16} />}
          <span>{toast.msg}</span>
        </div>
      )}

      {/* Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          {
            label: 'Tổng doanh thu',
            val: formatVND(stats.totalRevenue),
            desc: '+23.4% so với tháng trước',
            iconBg: 'bg-emerald-50 text-emerald-600',
            icon: <DollarSign size={18} />,
          },
          {
            label: 'Doanh thu hôm nay',
            val: formatVND(stats.todayRevenue),
            desc: 'Từ gói tuyển dụng & AI',
            iconBg: 'bg-[#2170e4]/10 text-[#2170e4]',
            icon: <TrendingUp size={18} />,
          },
          {
            label: 'Giao dịch thành công',
            val: `${stats.successCount} / ${stats.totalCount}`,
            desc: 'Tỷ lệ thanh toán 96%',
            iconBg: 'bg-purple-50 text-purple-600',
            icon: <CreditCard size={18} />,
          },
          {
            label: 'Chờ duyệt / Hoàn tiền',
            val: `${stats.pendingCount} chờ • ${stats.refundedCount} hoàn`,
            desc: 'Cần xác nhận chuyển khoản',
            iconBg: 'bg-amber-50 text-amber-600',
            icon: <Clock size={18} />,
          },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between shadow-xs"
          >
            <div>
              <p className="text-xs font-medium text-slate-500">{s.label}</p>
              <h3 className="text-xl font-bold mt-1 text-slate-800">{s.val}</h3>
              <p className="text-xs mt-1 text-slate-400">{s.desc}</p>
            </div>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${s.iconBg}`}>
              {s.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('transactions')}
          className={`pb-3 px-4 text-sm font-semibold flex items-center gap-2 border-b-2 transition ${
            activeTab === 'transactions'
              ? 'border-[#2170e4] text-[#2170e4]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <CreditCard size={16} /> Lịch sử giao dịch ({transactions.length})
        </button>
        <button
          onClick={() => setActiveTab('packages')}
          className={`pb-3 px-4 text-sm font-semibold flex items-center gap-2 border-b-2 transition ${
            activeTab === 'packages'
              ? 'border-[#2170e4] text-[#2170e4]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Package size={16} /> Gói dịch vụ & Bảng giá ({packages.length})
        </button>
        <button
          onClick={() => setActiveTab('invoices')}
          className={`pb-3 px-4 text-sm font-semibold flex items-center gap-2 border-b-2 transition ${
            activeTab === 'invoices'
              ? 'border-[#2170e4] text-[#2170e4]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileText size={16} /> Hóa đơn VAT
        </button>
      </div>

      {/* TAB 1: TRANSACTIONS */}
      {activeTab === 'transactions' && (
        <div>
          {/* Controls */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-xs">
            <div className="flex flex-wrap items-center gap-3 flex-1">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-300 flex-1 min-w-[240px] bg-white focus-within:border-[#2170e4] focus-within:ring-2 focus-within:ring-[#2170e4]/30 transition">
                <Search size={16} className="text-slate-400" />
                <input
                  type="text"
                  placeholder="Tìm theo mã TXN, công ty, email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-sm outline-none bg-transparent text-slate-800 placeholder:text-slate-400"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="p-1 text-slate-400 hover:text-slate-600">
                    <X size={14} />
                  </button>
                )}
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-sm px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 outline-none focus:border-[#2170e4] transition cursor-pointer"
              >
                <option value="all">Mọi trạng thái</option>
                <option value="success">Thành công</option>
                <option value="pending">Chờ xác nhận</option>
                <option value="failed">Thất bại</option>
                <option value="refunded">Đã hoàn tiền</option>
              </select>

              <select
                value={methodFilter}
                onChange={(e) => setMethodFilter(e.target.value)}
                className="text-sm px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 outline-none focus:border-[#2170e4] transition cursor-pointer"
              >
                <option value="all">Mọi phương thức</option>
                <option value="VNPAY">VNPAY</option>
                <option value="Vietcombank QR">Vietcombank QR</option>
                <option value="MoMo">Ví MoMo</option>
                <option value="Thẻ Quốc tế (Visa)">Thẻ Quốc tế (Visa)</option>
              </select>
            </div>

            <button
              onClick={handleExportCSV}
              className="px-4 py-2 rounded-lg border border-slate-300 bg-white flex items-center gap-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
            >
              <Download size={15} /> Xuất báo cáo
            </button>
          </div>

          {/* Table */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Mã đơn & Thời gian</th>
                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Doanh nghiệp</th>
                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Gói dịch vụ</th>
                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Số tiền</th>
                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Phương thức</th>
                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">Trạng thái</th>
                    <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-right text-slate-500">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50/80 transition-colors border-b border-slate-100">
                      <td className="px-5 py-3.5 text-xs">
                        <div className="font-mono font-bold text-[#2170e4]">{t.id}</div>
                        <span className="text-slate-400">{t.createdAt}</span>
                      </td>

                      <td className="px-5 py-3.5 text-xs">
                        <div className="font-semibold text-slate-800">{t.company}</div>
                        <span className="text-slate-400">{t.email}</span>
                      </td>

                      <td className="px-5 py-3.5 text-xs font-medium text-slate-700">
                        {t.package}
                      </td>

                      <td className="px-5 py-3.5 text-xs font-bold text-slate-800">
                        {formatVND(t.amount)}
                      </td>

                      <td className="px-5 py-3.5 text-xs text-slate-600">
                        <span className="px-2 py-0.5 rounded bg-slate-100 font-medium">
                          {t.method}
                        </span>
                      </td>

                      <td className="px-5 py-3.5 text-xs">
                        {t.status === 'success' && (
                          <span className="px-2 py-0.5 rounded-md font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1">
                            <CheckCircle size={12} /> Thành công
                          </span>
                        )}
                        {t.status === 'pending' && (
                          <span className="px-2 py-0.5 rounded-md font-semibold bg-amber-50 text-amber-700 border border-amber-200 inline-flex items-center gap-1">
                            <Clock size={12} /> Chờ duyệt
                          </span>
                        )}
                        {t.status === 'failed' && (
                          <span className="px-2 py-0.5 rounded-md font-semibold bg-rose-50 text-rose-700 border border-rose-200 inline-flex items-center gap-1">
                            <XCircle size={12} /> Thất bại
                          </span>
                        )}
                        {t.status === 'refunded' && (
                          <span className="px-2 py-0.5 rounded-md font-semibold bg-purple-50 text-purple-700 border border-purple-200 inline-flex items-center gap-1">
                            <RefreshCw size={12} /> Đã hoàn
                          </span>
                        )}
                      </td>

                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => setInvoiceModalTxn(t)}
                            title="Xem chi tiết hóa đơn"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-[#2170e4] hover:bg-blue-50 transition"
                          >
                            <Eye size={15} />
                          </button>

                          {t.status === 'pending' && (
                            <button
                              onClick={() => handleApproveTransaction(t.id)}
                              title="Xác nhận thanh toán"
                              className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition"
                            >
                              <Check size={15} />
                            </button>
                          )}

                          {t.status === 'success' && (
                            <button
                              onClick={() => handleOpenRefund(t)}
                              title="Hoàn tiền"
                              className="p-1.5 rounded-lg text-purple-600 hover:bg-purple-50 transition"
                            >
                              <RefreshCw size={15} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PACKAGES */}
      {activeTab === 'packages' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`p-5 rounded-xl border bg-white flex flex-col justify-between transition-all ${
                pkg.popular
                  ? 'border-[#2170e4] shadow-sm ring-1 ring-[#2170e4]/30'
                  : 'border-slate-200 shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-base text-slate-800">{pkg.name}</h3>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-md font-semibold ${
                      pkg.active ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {pkg.active ? 'Đang mở' : 'Tạm ẩn'}
                  </span>
                </div>

                <div className="mb-4">
                  <span className="text-xl font-black text-slate-800">{formatVND(pkg.price)}</span>
                  <span className="text-xs text-slate-400 font-medium"> / {pkg.duration}</span>
                </div>

                <div className="space-y-2 mb-6 text-xs text-slate-600">
                  {pkg.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check size={14} className="text-[#2170e4] shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => handleTogglePackageActive(pkg.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                    pkg.active
                      ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                      : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                  }`}
                >
                  {pkg.active ? 'Tạm ẩn gói' : 'Mở bán lại'}
                </button>
                <span className="text-[11px] text-slate-400">ID: {pkg.id}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: INVOICES */}
      {activeTab === 'invoices' && (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-800">
              Yêu cầu phát hành Hóa đơn điện tử VAT
            </h3>
            <span className="text-xs text-slate-400">Căn cứ theo quy định HĐĐT</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-5 py-3 text-xs font-semibold text-slate-500">Mã đơn</th>
                  <th className="px-5 py-3 text-xs font-semibold text-slate-500">Doanh nghiệp</th>
                  <th className="px-5 py-3 text-xs font-semibold text-slate-500">Mã số thuế</th>
                  <th className="px-5 py-3 text-xs font-semibold text-slate-500">Giá trị</th>
                  <th className="px-5 py-3 text-xs font-semibold text-slate-500">Trạng thái HĐ</th>
                  <th className="px-5 py-3 text-xs font-semibold text-right text-slate-500">Xử lý</th>
                </tr>
              </thead>
              <tbody>
                {transactions
                  .filter((t) => t.invoiceRequested)
                  .map((t) => (
                    <tr key={t.id} className="hover:bg-slate-50 border-b border-slate-100 text-xs">
                      <td className="px-5 py-3.5 font-mono font-bold text-[#2170e4]">{t.id}</td>
                      <td className="px-5 py-3.5 font-semibold text-slate-800">{t.company}</td>
                      <td className="px-5 py-3.5 text-slate-600 font-mono">{t.taxCode || 'Chưa cung cấp'}</td>
                      <td className="px-5 py-3.5 font-bold text-slate-800">{formatVND(t.amount)}</td>
                      <td className="px-5 py-3.5">
                        {t.invoiceSent ? (
                          <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold inline-flex items-center gap-1">
                            <CheckCircle size={12} /> Đã phát hành
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200 font-semibold inline-flex items-center gap-1">
                            <Clock size={12} /> Chờ phát hành
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <button
                          onClick={() => handleToggleInvoiceSent(t.id)}
                          className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                            t.invoiceSent
                              ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              : 'bg-[#2170e4] text-white hover:bg-[#1a5bc0]'
                          }`}
                        >
                          {t.invoiceSent ? 'Đánh dấu chưa gửi' : 'Xác nhận đã xuất'}
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL: INVOICE DETAILS */}
      {invoiceModalTxn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-slate-200 w-full max-w-md overflow-hidden shadow-xl">
            <div className="px-6 py-4 border-b border-slate-200 bg-white flex items-center justify-between">
              <div>
                <span className="text-[11px] text-[#2170e4] font-semibold uppercase tracking-wider">Hóa đơn thanh toán</span>
                <h3 className="font-bold text-base text-slate-800">{invoiceModalTxn.id}</h3>
              </div>
              <button onClick={() => setInvoiceModalTxn(null)} className="p-1 text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-3 text-xs">
              <div className="flex justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-500">Khách hàng:</span>
                <strong className="text-slate-800">{invoiceModalTxn.company}</strong>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-500">Mã số thuế:</span>
                <span className="font-mono text-slate-700">{invoiceModalTxn.taxCode || 'Chưa cung cấp'}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-500">Gói mua:</span>
                <span className="font-medium text-slate-800">{invoiceModalTxn.package}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-100">
                <span className="text-slate-500">Phương thức:</span>
                <span className="font-semibold text-[#2170e4]">{invoiceModalTxn.method}</span>
              </div>
              <div className="flex justify-between pt-1 text-sm">
                <span className="font-bold text-slate-800">Tổng thanh toán:</span>
                <strong className="text-emerald-600 text-base">{formatVND(invoiceModalTxn.amount)}</strong>
              </div>
            </div>

            <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2.5">
              <button
                onClick={() => window.print()}
                className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 flex items-center gap-1.5 transition"
              >
                <Printer size={13} /> In hóa đơn
              </button>
              <button
                onClick={() => setInvoiceModalTxn(null)}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#2170e4] hover:bg-[#1a5bc0] transition"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: REFUND */}
      {refundModalTxn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-slate-200 w-full max-w-md overflow-hidden shadow-xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
                <RefreshCw size={20} />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-800">Xác nhận hoàn tiền</h3>
                <p className="text-xs text-slate-400">Đơn: {refundModalTxn.id} ({formatVND(refundModalTxn.amount)})</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">Lý do hoàn trả *</label>
              <textarea
                rows={3}
                value={refundReasonInput}
                onChange={(e) => setRefundReasonInput(e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setRefundModalTxn(null)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleConfirmRefund}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 transition"
              >
                Xác nhận hoàn {formatVND(refundModalTxn.amount)}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
