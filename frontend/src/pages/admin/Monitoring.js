import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Activity } from 'lucide-react';
const Stub = ({ title, subtitle, icon }) => (
  <AdminLayout title={title} subtitle={subtitle}>
    <div className="flex flex-col items-center justify-center py-24 rounded-2xl" style={{ background: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: '#EFF6FF' }}>{icon}</div>
      <h3 className="text-lg font-bold mb-2" style={{ color: '#1E293B' }}>{title}</h3>
      <p style={{ color: '#94A3B8' }}>Trang này đang được phát triển</p>
    </div>
  </AdminLayout>
);
export default function Monitoring() {
  return <Stub title="Monitoring" subtitle="Theo dõi hiệu năng hệ thống" icon={<Activity size={28} color="#0A58CA" />} />;
}
