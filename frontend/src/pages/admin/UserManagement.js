import React, { useState, useMemo } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import {
  Users, Search, Filter, Plus, Edit, Trash2, Lock, Unlock, CheckCircle,
  Clock, Shield, X, Eye, Download, Mail, Phone, Building, AlertTriangle,
  UserCheck, UserX, ChevronDown, CheckSquare, Square
} from 'lucide-react';

const INITIAL_USERS = [
  {
    id: 1,
    name: 'Nguyễn Thị Mai',
    email: 'mai.nguyen@email.com',
    phone: '0912345678',
    role: 'candidate',
    status: 'active',
    joined: '01/08/2024',
    lastActive: '10 phút trước',
    verified: true,
    applications: 14,
    skills: ['ReactJS', 'TypeScript', 'TailwindCSS'],
  },
  {
    id: 2,
    name: 'Công ty TechCorp Vietnam',
    email: 'hr@techcorp.vn',
    phone: '02438889999',
    role: 'employer',
    company: 'TechCorp Vietnam JSC',
    taxCode: '0108928374',
    status: 'active',
    joined: '31/07/2024',
    lastActive: '1 giờ trước',
    verified: true,
    postedJobs: 18,
    plan: 'Doanh nghiệp Pro',
  },
  {
    id: 3,
    name: 'Trần Văn Bình',
    email: 'binh.tran@email.com',
    phone: '0988776655',
    role: 'candidate',
    status: 'pending',
    joined: '30/07/2024',
    lastActive: 'Hôm qua',
    verified: false,
    applications: 3,
    skills: ['Node.js', 'PostgreSQL', 'Docker'],
  },
  {
    id: 4,
    name: 'StartupXYZ Group',
    email: 'recruit@startupxyz.vn',
    phone: '0901234888',
    role: 'employer',
    company: 'StartupXYZ Solutions',
    taxCode: '0316789456',
    status: 'locked',
    lockReason: 'Nghi vấn đăng tin tuyển dụng thu phí ứng viên trái phép',
    joined: '29/07/2024',
    lastActive: '3 ngày trước',
    verified: true,
    postedJobs: 5,
    plan: 'Cơ bản',
  },
  {
    id: 5,
    name: 'Lê Hồng Phúc',
    email: 'phuc.le@email.com',
    phone: '0933221100',
    role: 'candidate',
    status: 'active',
    joined: '28/07/2024',
    lastActive: '30 phút trước',
    verified: false,
    applications: 8,
    skills: ['Product Design', 'Figma', 'UI/UX'],
  },
  {
    id: 6,
    name: 'Vingroup Digital HR',
    email: 'talent@vingroup.vn',
    phone: '02439749999',
    role: 'employer',
    company: 'Tập đoàn Vingroup',
    taxCode: '0101245486',
    status: 'active',
    joined: '20/07/2024',
    lastActive: '5 phút trước',
    verified: true,
    postedJobs: 42,
    plan: 'Enterprise VIP',
  },
  {
    id: 7,
    name: 'Đặng Thảo Vy (Admin)',
    email: 'vy.dang@jobcentral.vn',
    phone: '0909999888',
    role: 'admin',
    status: 'active',
    joined: '01/01/2024',
    lastActive: 'Đang online',
    verified: true,
  },
  {
    id: 8,
    name: 'Phạm Minh Quân (Mod)',
    email: 'quan.moderator@jobcentral.vn',
    phone: '0977889900',
    role: 'staff',
    status: 'active',
    joined: '15/03/2024',
    lastActive: '2 giờ trước',
    verified: true,
  },
];

const ROLE_CONFIG = {
  candidate: { label: 'Ứng viên', badgeClass: 'bg-blue-50 text-[#2170e4] border-blue-200' },
  employer: { label: 'Nhà tuyển dụng', badgeClass: 'bg-purple-50 text-purple-700 border-purple-200' },
  staff: { label: 'Kiểm duyệt viên', badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  admin: { label: 'Quản trị viên', badgeClass: 'bg-rose-50 text-rose-700 border-rose-200' },
};

const STATUS_CONFIG = {
  active: { label: 'Hoạt động', badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  pending: { label: 'Chờ xác thực', badgeClass: 'bg-amber-50 text-amber-700 border-amber-200' },
  locked: { label: 'Đã khóa', badgeClass: 'bg-rose-50 text-rose-700 border-rose-200' },
};

export default function UserManagement() {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedIds, setSelectedIds] = useState([]);
  const [toast, setToast] = useState(null);

  // Modals state
  const [activeModal, setActiveModal] = useState(null);
  const [targetUser, setTargetUser] = useState(null);

  // Form states for Add / Edit
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'candidate',
    company: '',
    status: 'active',
    verified: true,
  });

  const [lockReason, setLockReason] = useState('Vi phạm quy định hệ thống JobCentral');

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchSearch =
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (u.company && u.company.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (u.phone && u.phone.includes(searchQuery));
      const matchRole = roleFilter === 'all' || u.role === roleFilter;
      const matchStatus = statusFilter === 'all' || u.status === statusFilter;
      return matchSearch && matchRole && matchStatus;
    });
  }, [users, searchQuery, roleFilter, statusFilter]);

  const stats = useMemo(() => {
    return {
      total: users.length,
      active: users.filter((u) => u.status === 'active').length,
      pending: users.filter((u) => u.status === 'pending').length,
      locked: users.filter((u) => u.status === 'locked').length,
      employers: users.filter((u) => u.role === 'employer').length,
      candidates: users.filter((u) => u.role === 'candidate').length,
    };
  }, [users]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(filteredUsers.map((u) => u.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleOpenAdd = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: 'candidate',
      company: '',
      status: 'active',
      verified: true,
    });
    setActiveModal('add');
  };

  const handleOpenEdit = (user) => {
    setTargetUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone || '',
      role: user.role,
      company: user.company || '',
      status: user.status,
      verified: user.verified,
    });
    setActiveModal('edit');
  };

  const handleOpenView = (user) => {
    setTargetUser(user);
    setActiveModal('view');
  };

  const handleOpenLock = (user) => {
    setTargetUser(user);
    setLockReason(user.lockReason || 'Vi phạm điều khoản cộng đồng');
    setActiveModal('lock');
  };

  const handleOpenDelete = (user) => {
    setTargetUser(user);
    setActiveModal('delete');
  };

  const handleSaveAdd = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      showToast('Vui lòng điền đủ tên và email', 'error');
      return;
    }
    const newUser = {
      id: Date.now(),
      ...formData,
      joined: new Date().toLocaleDateString('vi-VN'),
      lastActive: 'Vừa xong',
      applications: 0,
      postedJobs: 0,
    };
    setUsers([newUser, ...users]);
    setActiveModal(null);
    showToast(`Đã thêm tài khoản "${formData.name}" thành công!`);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setUsers(users.map((u) => (u.id === targetUser.id ? { ...u, ...formData } : u)));
    setActiveModal(null);
    showToast(`Đã cập nhật thông tin "${formData.name}"`);
  };

  const handleConfirmLock = () => {
    const isCurrentlyLocked = targetUser.status === 'locked';
    const newStatus = isCurrentlyLocked ? 'active' : 'locked';
    setUsers(
      users.map((u) =>
        u.id === targetUser.id
          ? { ...u, status: newStatus, lockReason: isCurrentlyLocked ? null : lockReason }
          : u
      )
    );
    setActiveModal(null);
    showToast(
      isCurrentlyLocked
        ? `Đã mở khóa tài khoản "${targetUser.name}"`
        : `Đã khóa tài khoản "${targetUser.name}"`
    );
  };

  const handleConfirmDelete = () => {
    setUsers(users.filter((u) => u.id !== targetUser.id));
    setSelectedIds(selectedIds.filter((id) => id !== targetUser.id));
    setActiveModal(null);
    showToast(`Đã xóa tài khoản "${targetUser.name}"`);
  };

  const handleBatchLock = (lock = true) => {
    setUsers(
      users.map((u) =>
        selectedIds.includes(u.id)
          ? { ...u, status: lock ? 'locked' : 'active', lockReason: lock ? 'Khóa hàng loạt' : null }
          : u
      )
    );
    showToast(`Đã ${lock ? 'khóa' : 'mở khóa'} ${selectedIds.length} tài khoản`);
    setSelectedIds([]);
  };

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['ID,Họ và tên,Email,Số điện thoại,Vai trò,Trạng thái,Ngày tạo']
        .concat(
          filteredUsers.map(
            (u) =>
              `${u.id},"${u.name}","${u.email}","${u.phone || ''}","${ROLE_CONFIG[u.role]?.label || u.role}","${STATUS_CONFIG[u.status]?.label || u.status}","${u.joined}"`
          )
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `jobcentral_users_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Đã xuất file danh sách người dùng thành công!');
  };

  const inputClass =
    "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2170e4]/40 focus:border-[#2170e4] transition bg-white";

  return (
    <AdminLayout title="Quản lý người dùng" subtitle="Kiểm soát toàn bộ tài khoản Ứng viên, Doanh nghiệp và Nhân sự">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-50 px-4 py-2.5 rounded-lg shadow-lg flex items-center gap-2 text-white text-sm font-medium transition-all ${
            toast.type === 'error' ? 'bg-rose-600' : 'bg-emerald-600'
          }`}
        >
          {toast.type === 'error' ? <AlertTriangle size={16} /> : <CheckCircle size={16} />}
          <span>{toast.msg}</span>
        </div>
      )}

      {/* Top Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          {
            label: 'Tổng người dùng',
            val: stats.total,
            desc: `${stats.candidates} Ứng viên • ${stats.employers} Doanh nghiệp`,
            iconBg: 'bg-[#2170e4]/10 text-[#2170e4]',
            icon: <Users size={18} />,
          },
          {
            label: 'Đang hoạt động',
            val: stats.active,
            desc: 'Tài khoản hoạt động bình thường',
            iconBg: 'bg-emerald-50 text-emerald-600',
            icon: <CheckCircle size={18} />,
          },
          {
            label: 'Chờ xác thực KYC',
            val: stats.pending,
            desc: 'Cần duyệt hồ sơ & giấy phép',
            iconBg: 'bg-amber-50 text-amber-600',
            icon: <Clock size={18} />,
          },
          {
            label: 'Đang bị khóa',
            val: stats.locked,
            desc: 'Vi phạm hoặc tạm khóa',
            iconBg: 'bg-rose-50 text-rose-600',
            icon: <Lock size={18} />,
          },
        ].map((c) => (
          <div
            key={c.label}
            className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between shadow-xs"
          >
            <div>
              <p className="text-xs font-medium text-slate-500">{c.label}</p>
              <h3 className="text-2xl font-bold mt-1 text-slate-800">{c.val}</h3>
              <p className="text-xs mt-1 text-slate-400">{c.desc}</p>
            </div>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${c.iconBg}`}>
              {c.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 mb-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-xs">
        
        {/* Search & Select filters */}
        <div className="flex flex-wrap items-center gap-3 flex-1">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-300 flex-1 min-w-[220px] bg-white focus-within:border-[#2170e4] focus-within:ring-2 focus-within:ring-[#2170e4]/30 transition">
            <Search size={16} className="text-slate-400" />
            <input
              type="text"
              placeholder="Tìm theo tên, email, sđt, công ty..."
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

          {/* Role Filter */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="text-sm px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 outline-none focus:border-[#2170e4] transition cursor-pointer"
          >
            <option value="all">Mọi vai trò</option>
            <option value="candidate">Ứng viên</option>
            <option value="employer">Nhà tuyển dụng</option>
            <option value="staff">Kiểm duyệt viên</option>
            <option value="admin">Quản trị viên</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-sm px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 outline-none focus:border-[#2170e4] transition cursor-pointer"
          >
            <option value="all">Mọi trạng thái</option>
            <option value="active">Đang hoạt động</option>
            <option value="pending">Chờ xác thực</option>
            <option value="locked">Bị khóa</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {selectedIds.length > 0 && (
            <div className="flex items-center gap-2 mr-2">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-[#2170e4]/10 text-[#2170e4]">
                Đã chọn: {selectedIds.length}
              </span>
              <button
                onClick={() => handleBatchLock(true)}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition"
              >
                <Lock size={13} /> Khóa
              </button>
              <button
                onClick={() => handleBatchLock(false)}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition"
              >
                <Unlock size={13} /> Mở khóa
              </button>
            </div>
          )}

          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-lg border border-slate-300 bg-white flex items-center gap-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition"
          >
            <Download size={15} /> Xuất CSV
          </button>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 rounded-lg text-white text-sm font-semibold flex items-center gap-2 bg-[#2170e4] hover:bg-[#1a5bc0] shadow-xs transition"
          >
            <Plus size={16} /> Thêm người dùng
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-5 py-3 w-10">
                  <input
                    type="checkbox"
                    className="cursor-pointer rounded text-[#2170e4]"
                    checked={filteredUsers.length > 0 && selectedIds.length === filteredUsers.length}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Họ và tên / Email
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Vai trò
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Chi tiết tài khoản
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Trạng thái
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Ngày tham gia
                </th>
                <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wider text-right text-slate-500">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-sm text-slate-400">
                    Không tìm thấy người dùng phù hợp.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const role = ROLE_CONFIG[user.role] || ROLE_CONFIG.candidate;
                  const status = STATUS_CONFIG[user.status] || STATUS_CONFIG.active;
                  const isSelected = selectedIds.includes(user.id);

                  return (
                    <tr
                      key={user.id}
                      className={`transition-colors border-b border-slate-100 hover:bg-slate-50/80 ${
                        isSelected ? 'bg-blue-50/40' : ''
                      }`}
                    >
                      <td className="px-5 py-3.5">
                        <input
                          type="checkbox"
                          className="cursor-pointer rounded text-[#2170e4]"
                          checked={isSelected}
                          onChange={() => handleSelectOne(user.id)}
                        />
                      </td>

                      {/* Name & Avatar */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 bg-indigo-50 border border-indigo-100 text-[#2170e4]">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-semibold text-sm text-slate-800">
                                {user.name}
                              </span>
                              {user.verified && (
                                <span title="Đã xác minh KYC">
                                  <CheckCircle size={14} className="text-emerald-600" />
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-slate-500 block">
                              {user.email}
                            </span>
                            {user.phone && (
                              <span className="text-[11px] text-slate-400 block">
                                {user.phone}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="px-5 py-3.5">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-md border ${role.badgeClass}`}>
                          {role.label}
                        </span>
                      </td>

                      {/* Details */}
                      <td className="px-5 py-3.5">
                        {user.role === 'employer' ? (
                          <div className="text-xs text-slate-600">
                            <div className="font-medium flex items-center gap-1 text-slate-800">
                              <Building size={12} className="text-slate-400" />
                              {user.company || 'Doanh nghiệp'}
                            </div>
                            <span className="text-slate-400">
                              {user.postedJobs || 0} tin đăng • Gói: <strong className="text-purple-700">{user.plan || 'Cơ bản'}</strong>
                            </span>
                          </div>
                        ) : user.role === 'candidate' ? (
                          <div className="text-xs text-slate-500">
                            <span>Đã ứng tuyển {user.applications || 0} vị trí</span>
                            {user.skills && (
                              <div className="flex gap-1 mt-1 flex-wrap">
                                {user.skills.slice(0, 2).map((s) => (
                                  <span key={s} className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600">
                                    {s}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400">Vận hành quản trị</span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-3.5">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-md border inline-flex items-center gap-1 ${status.badgeClass}`}>
                          {status.label}
                        </span>
                        {user.lockReason && (
                          <p className="text-[11px] text-rose-600 mt-1 max-w-[140px] truncate" title={user.lockReason}>
                            {user.lockReason}
                          </p>
                        )}
                      </td>

                      {/* Joined */}
                      <td className="px-5 py-3.5 text-xs text-slate-500">
                        <div>{user.joined}</div>
                        <span className="text-[11px] text-slate-400">{user.lastActive}</span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleOpenView(user)}
                            title="Xem chi tiết"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-[#2170e4] hover:bg-blue-50 transition"
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(user)}
                            title="Chỉnh sửa"
                            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition"
                          >
                            <Edit size={15} />
                          </button>
                          <button
                            onClick={() => handleOpenLock(user)}
                            title={user.status === 'locked' ? 'Mở khóa' : 'Khóa tài khoản'}
                            className={`p-1.5 rounded-lg transition ${
                              user.status === 'locked'
                                ? 'text-emerald-600 hover:bg-emerald-50'
                                : 'text-amber-600 hover:bg-amber-50'
                            }`}
                          >
                            {user.status === 'locked' ? <Unlock size={15} /> : <Lock size={15} />}
                          </button>
                          <button
                            onClick={() => handleOpenDelete(user)}
                            title="Xóa tài khoản"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 flex items-center justify-between border-t border-slate-200 text-xs text-slate-500 bg-slate-50/50">
          <span>
            Hiển thị <strong>{filteredUsers.length}</strong> trên <strong>{users.length}</strong> người dùng
          </span>
          <span className="px-2 py-1 rounded bg-white border border-slate-200 text-slate-600 font-medium">
            Trang 1 / 1
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: VIEW USER */}
      {/* ========================================================================= */}
      {activeModal === 'view' && targetUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-slate-200 w-full max-w-lg overflow-hidden shadow-xl">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-white">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[#2170e4] font-bold text-sm">
                  {targetUser.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-800">{targetUser.name}</h3>
                  <p className="text-xs text-slate-400">{ROLE_CONFIG[targetUser.role]?.label}</p>
                </div>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1 text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto no-scrollbar">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                  <span className="text-slate-400 block mb-0.5">Email</span>
                  <p className="font-medium text-slate-800">{targetUser.email}</p>
                </div>
                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                  <span className="text-slate-400 block mb-0.5">Điện thoại</span>
                  <p className="font-medium text-slate-800">{targetUser.phone || 'Chưa có'}</p>
                </div>
              </div>

              {targetUser.role === 'employer' && (
                <div className="p-4 rounded-lg border border-slate-200 bg-white space-y-2">
                  <h4 className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                    <Building size={14} className="text-[#2170e4]" /> Thông tin doanh nghiệp
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-400">Công ty:</span>
                      <p className="font-medium text-slate-800">{targetUser.company || 'N/A'}</p>
                    </div>
                    <div>
                      <span className="text-slate-400">Mã số thuế:</span>
                      <p className="font-medium text-slate-800">{targetUser.taxCode || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="text-xs text-slate-400 pt-2 border-t border-slate-100 flex justify-between">
                <span>Ngày đăng ký: {targetUser.joined}</span>
                <span>Hoạt động cuối: {targetUser.lastActive}</span>
              </div>
            </div>

            <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2.5">
              <button
                onClick={() => {
                  setActiveModal(null);
                  handleOpenEdit(targetUser);
                }}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#2170e4] bg-[#2170e4]/10 hover:bg-[#2170e4]/20 transition"
              >
                Chỉnh sửa
              </button>
              <button
                onClick={() => setActiveModal(null)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-600 bg-white border border-slate-300 hover:bg-slate-50 transition"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: ADD / EDIT USER */}
      {/* ========================================================================= */}
      {(activeModal === 'add' || activeModal === 'edit') && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-slate-200 w-full max-w-md overflow-hidden shadow-xl">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-white">
              <h3 className="font-bold text-sm text-slate-800">
                {activeModal === 'add' ? 'Thêm người dùng mới' : 'Chỉnh sửa tài khoản'}
              </h3>
              <button onClick={() => setActiveModal(null)} className="p-1 text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={activeModal === 'add' ? handleSaveAdd : handleSaveEdit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Họ và tên *</label>
                <input
                  type="text"
                  required
                  placeholder="Nhập tên người dùng..."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Email *</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">Số điện thoại</label>
                  <input
                    type="tel"
                    placeholder="0912..."
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">Vai trò</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className={inputClass}
                  >
                    <option value="candidate">Ứng viên</option>
                    <option value="employer">Nhà tuyển dụng</option>
                    <option value="staff">Kiểm duyệt viên</option>
                    <option value="admin">Quản trị viên</option>
                  </select>
                </div>
              </div>

              {formData.role === 'employer' && (
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1.5">Tên công ty</label>
                  <input
                    type="text"
                    placeholder="VD: Công ty TNHH Giải pháp Số"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className={inputClass}
                  />
                </div>
              )}

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-4 py-2 rounded-lg text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[#2170e4] hover:bg-[#1a5bc0] shadow-xs transition"
                >
                  {activeModal === 'add' ? 'Tạo tài khoản' : 'Lưu thay đổi'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: LOCK / UNLOCK */}
      {/* ========================================================================= */}
      {activeModal === 'lock' && targetUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-slate-200 w-full max-w-md overflow-hidden shadow-xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                targetUser.status === 'locked' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
              }`}>
                {targetUser.status === 'locked' ? <Unlock size={20} /> : <Lock size={20} />}
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-800">
                  {targetUser.status === 'locked' ? 'Mở khóa tài khoản' : 'Khóa tài khoản'}
                </h3>
                <p className="text-xs text-slate-400">{targetUser.name}</p>
              </div>
            </div>

            {targetUser.status !== 'locked' ? (
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Lý do khóa tài khoản</label>
                <textarea
                  rows={3}
                  value={lockReason}
                  onChange={(e) => setLockReason(e.target.value)}
                  className={inputClass}
                />
              </div>
            ) : (
              <p className="text-xs text-slate-600">
                Tài khoản sẽ được kích hoạt lại và người dùng có thể đăng nhập bình thường.
              </p>
            )}

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setActiveModal(null)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmLock}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold text-white transition ${
                  targetUser.status === 'locked' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'
                }`}
              >
                {targetUser.status === 'locked' ? 'Mở khóa ngay' : 'Khóa tài khoản'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: DELETE */}
      {/* ========================================================================= */}
      {activeModal === 'delete' && targetUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-slate-200 w-full max-w-md overflow-hidden shadow-xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-rose-50 text-rose-600">
                <Trash2 size={20} />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-800">Xác nhận xóa tài khoản</h3>
                <p className="text-xs text-slate-400">{targetUser.name}</p>
              </div>
            </div>

            <p className="text-xs text-slate-600">
              Hành động này không thể hoàn tác. Mọi dữ liệu liên quan sẽ bị gỡ bỏ khỏi hệ thống.
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setActiveModal(null)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 transition"
              >
                Xóa vĩnh viễn
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
