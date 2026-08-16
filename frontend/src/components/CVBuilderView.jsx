import React, { useState } from 'react';
import { FileText, Download, Plus, Trash2, CheckCircle2, User, Mail, Phone, MapPin, Globe, Sparkles, Printer } from 'lucide-react';
import { INITIAL_CV_DATA } from '../data/mockData';

export const CVBuilderView = ({ onSavedJobsClick }) => {
  const [cvData, setCvData] = useState(INITIAL_CV_DATA);
  const [newSkill, setNewSkill] = useState('');
  const [showSavedNotification, setShowSavedNotification] = useState(false);

  const handleAddExperience = () => {
    const newExp = {
      id: `exp-${Date.now()}`,
      role: 'UI/UX Designer',
      company: 'Tên công ty mới',
      period: '2023 - Hiện tại',
      description: 'Mô tả ngắn gọn về các thành tựu và dự án đã thực hiện.',
    };
    setCvData({
      ...cvData,
      experience: [newExp, ...cvData.experience],
    });
  };

  const handleRemoveExperience = (id) => {
    setCvData({
      ...cvData,
      experience: cvData.experience.filter((e) => e.id !== id),
    });
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    if (!cvData.skills.includes(newSkill.trim())) {
      setCvData({
        ...cvData,
        skills: [...cvData.skills, newSkill.trim()],
      });
    }
    setNewSkill('');
  };

  const handleRemoveSkill = (skillToRemove) => {
    setCvData({
      ...cvData,
      skills: cvData.skills.filter((s) => s !== skillToRemove),
    });
  };

  const handleSaveCV = () => {
    setShowSavedNotification(true);
    setTimeout(() => setShowSavedNotification(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Banner Navigation */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Trình tạo CV chuẩn ATS 2024</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Hồ Sơ & Tạo CV Chuyên Nghiệp
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Chỉnh sửa thông tin hồ sơ bên trái và xem trước bản in CV theo thời gian thực bên phải.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={onSavedJobsClick}
            className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors"
          >
            Xem Việc Làm Đã Lưu →
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center space-x-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-sm shadow-indigo-200 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Xuất PDF / In CV</span>
          </button>
        </div>
      </div>

      {showSavedNotification && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-medium rounded-xl flex items-center space-x-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Hồ sơ CV của bạn đã được lưu tự động thành công!</span>
        </div>
      )}

      {/* Grid: Left Editor & Right CV Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Editor (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/80 space-y-6 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
            Chỉnh sửa thông tin cá nhân
          </h2>

          <div className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Họ và tên</label>
              <input
                type="text"
                value={cvData.fullName}
                onChange={(e) => setCvData({ ...cvData, fullName: e.target.value })}
                className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Chức danh nghề nghiệp</label>
              <input
                type="text"
                value={cvData.title}
                onChange={(e) => setCvData({ ...cvData, title: e.target.value })}
                className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  value={cvData.email}
                  onChange={(e) => setCvData({ ...cvData, email: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Điện thoại</label>
                <input
                  type="text"
                  value={cvData.phone}
                  onChange={(e) => setCvData({ ...cvData, phone: e.target.value })}
                  className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Địa chỉ</label>
              <input
                type="text"
                value={cvData.location}
                onChange={(e) => setCvData({ ...cvData, location: e.target.value })}
                className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Tóm tắt mục tiêu / Giới thiệu</label>
              <textarea
                rows={3}
                value={cvData.summary}
                onChange={(e) => setCvData({ ...cvData, summary: e.target.value })}
                className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>
          </div>

          {/* Experience list */}
          <div className="pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-900">Kinh nghiệm làm việc</h3>
              <button
                onClick={handleAddExperience}
                className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Thêm</span>
              </button>
            </div>

            <div className="space-y-3">
              {cvData.experience.map((exp) => (
                <div key={exp.id} className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) => {
                        const updated = cvData.experience.map((x) =>
                          x.id === exp.id ? { ...x, role: e.target.value } : x
                        );
                        setCvData({ ...cvData, experience: updated });
                      }}
                      className="font-bold text-slate-900 bg-transparent border-b border-slate-300 focus:outline-hidden text-xs w-2/3"
                    />
                    <button
                      onClick={() => handleRemoveExperience(exp.id)}
                      className="text-rose-500 hover:text-rose-700"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => {
                        const updated = cvData.experience.map((x) =>
                          x.id === exp.id ? { ...x, company: e.target.value } : x
                        );
                        setCvData({ ...cvData, experience: updated });
                      }}
                      placeholder="Tên công ty"
                      className="text-slate-600 bg-transparent border-b border-slate-200 text-xs"
                    />
                    <input
                      type="text"
                      value={exp.period}
                      onChange={(e) => {
                        const updated = cvData.experience.map((x) =>
                          x.id === exp.id ? { ...x, period: e.target.value } : x
                        );
                        setCvData({ ...cvData, experience: updated });
                      }}
                      placeholder="Thời gian"
                      className="text-slate-400 bg-transparent border-b border-slate-200 text-xs text-right"
                    />
                  </div>

                  <textarea
                    rows={2}
                    value={exp.description}
                    onChange={(e) => {
                      const updated = cvData.experience.map((x) =>
                        x.id === exp.id ? { ...x, description: e.target.value } : x
                      );
                      setCvData({ ...cvData, experience: updated });
                    }}
                    className="w-full bg-white p-2 rounded-lg border border-slate-200 text-xs text-slate-700 focus:outline-hidden focus:border-indigo-400"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Skills Tag Input */}
          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 mb-2">Kỹ năng chuyên môn</h3>
            <form onSubmit={handleAddSkill} className="flex space-x-2 mb-3">
              <input
                type="text"
                placeholder="Thêm kỹ năng (VD: Figma, React)..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                className="flex-1 px-3 py-1.5 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:border-indigo-500"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 shadow-xs"
              >
                Thêm
              </button>
            </form>

            <div className="flex flex-wrap gap-1.5">
              {cvData.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100 text-xs font-medium"
                >
                  <span>{skill}</span>
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-indigo-400 hover:text-indigo-800 ml-1"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={handleSaveCV}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-all shadow-sm shadow-indigo-200"
          >
            Lưu hồ sơ CV
          </button>
        </div>

        {/* Right Column: CV Preview Sheet (7 cols) */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-xl space-y-6 min-h-[700px] text-slate-800">
          {/* CV Header */}
          <div className="border-b-2 border-indigo-600 pb-6">
            <h1 className="text-3xl font-extrabold text-slate-900 uppercase tracking-tight">
              {cvData.fullName || 'Họ và tên'}
            </h1>
            <p className="text-base font-semibold text-indigo-600 mt-1">
              {cvData.title || 'Chức danh'}
            </p>

            <div className="flex flex-wrap gap-y-1 gap-x-4 text-xs text-slate-500 mt-3">
              <span className="flex items-center space-x-1">
                <Mail className="w-3.5 h-3.5 text-indigo-600" />
                <span>{cvData.email}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Phone className="w-3.5 h-3.5 text-indigo-600" />
                <span>{cvData.phone}</span>
              </span>
              <span className="flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                <span>{cvData.location}</span>
              </span>
              {cvData.website && (
                <span className="flex items-center space-x-1">
                  <Globe className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{cvData.website}</span>
                </span>
              )}
            </div>
          </div>

          {/* Summary */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-2">
              Giới thiệu bản thân
            </h2>
            <p className="text-xs leading-relaxed text-slate-600">
              {cvData.summary}
            </p>
          </div>

          {/* Experience */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-3">
              Kinh nghiệm làm việc
            </h2>
            <div className="space-y-4">
              {cvData.experience.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">{exp.role}</span>
                    <span className="text-slate-400 font-medium">{exp.period}</span>
                  </div>
                  <div className="text-xs text-indigo-600 font-semibold">
                    {exp.company}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-2">
              Học vấn & Bằng cấp
            </h2>
            {cvData.education.map((edu) => (
              <div key={edu.id} className="text-xs flex justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">{edu.degree}</span>
                  <span className="text-slate-500">{edu.school}</span>
                </div>
                <span className="text-slate-400 font-medium">{edu.year}</span>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-2">
              Kỹ năng chuyên môn
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {cvData.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800 text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
