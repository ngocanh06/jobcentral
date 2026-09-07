import React, { useState } from 'react';
import {
  FileText,
  Download,
  Plus,
  Trash2,
  CheckCircle2,
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Sparkles,
  Printer,
  Copy,
  Check,
  X,
  Loader2,
  Palette,
  FileDown,
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';
import { INITIAL_CV_DATA } from '../data/mockData';

export const CVBuilderView = ({ onSavedJobsClick }) => {
  const [cvData, setCvData] = useState(INITIAL_CV_DATA);
  const [newSkill, setNewSkill] = useState('');
  const [showSavedNotification, setShowSavedNotification] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportToast, setExportToast] = useState(null);
  const [copiedText, setCopiedText] = useState(false);
  const [themeColor, setThemeColor] = useState('indigo'); // 'indigo' | 'blue' | 'dark'

  const themeStyles = {
    indigo: {
      accentBorder: 'border-indigo-600',
      accentText: 'text-indigo-600',
      accentHeading: 'text-indigo-700',
      subtleBg: 'bg-indigo-50 text-indigo-700 border-indigo-100',
      activeBorder: 'border-indigo-600 text-indigo-600',
      btnPrimary: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    },
    blue: {
      accentBorder: 'border-[#0A58CA]',
      accentText: 'text-[#0A58CA]',
      accentHeading: 'text-[#0A58CA]',
      subtleBg: 'bg-blue-50 text-[#0A58CA] border-blue-100',
      activeBorder: 'border-[#0A58CA] text-[#0A58CA]',
      btnPrimary: 'bg-[#0A58CA] hover:bg-[#084298] text-white',
    },
    dark: {
      accentBorder: 'border-slate-900',
      accentText: 'text-slate-900',
      accentHeading: 'text-slate-900',
      subtleBg: 'bg-slate-100 text-slate-900 border-slate-200',
      activeBorder: 'border-slate-900 text-slate-900',
      btnPrimary: 'bg-slate-900 hover:bg-slate-800 text-white',
    },
  };

  const currentTheme = themeStyles[themeColor] || themeStyles.indigo;

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

  // Export clean PDF using html2canvas and jsPDF
  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      const element = document.getElementById('cv-preview-sheet');
      if (!element) {
        throw new Error('Không tìm thấy bản xem trước CV');
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.96);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const cleanName = (cvData.fullName || 'Ung_Vien')
        .trim()
        .replace(/\s+/g, '_');
      pdf.save(`CV_${cleanName}.pdf`);

      setExportToast(`Đã xuất và tải xuống thành công file CV_${cleanName}.pdf!`);
      setTimeout(() => setExportToast(null), 4000);
    } catch (err) {
      console.error('Lỗi khi xuất PDF:', err);
      setExportToast('Đang chuyển hướng sang hộp thoại in để lưu PDF...');
      setTimeout(() => setExportToast(null), 3500);
      // Fallback
      window.print();
    } finally {
      setIsExporting(false);
    }
  };

  const getCvPlainText = () => {
    return `
HỌ VÀ TÊN: ${cvData.fullName}
CHỨC DANH NGHỀ NGHIỆP: ${cvData.title}
THÔNG TIN LIÊN HỆ:
- Email: ${cvData.email}
- Điện thoại: ${cvData.phone}
- Địa chỉ: ${cvData.location}
${cvData.website ? `- Website / Portfolio: ${cvData.website}\n` : ''}
GIỚI THIỆU BẢN THÂN:
${cvData.summary}

KINH NGHIỆM LÀM VIỆC:
${cvData.experience
  .map(
    (e) => `• ${e.role} | ${e.company} (${e.period})
  ${e.description}`
  )
  .join('\n\n')}

HỌC VẤN & BẰNG CẤP:
${cvData.education
  .map((edu) => `• ${edu.degree} - ${edu.school} (${edu.year})`)
  .join('\n')}

KỸ NĂNG CHUYÊN MÔN:
${cvData.skills.join(', ')}
    `.trim();
  };

  const handleCopyCVText = () => {
    const text = getCvPlainText();
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  const handleDownloadTxt = () => {
    const text = getCvPlainText();
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const cleanName = (cvData.fullName || 'Ung_Vien').trim().replace(/\s+/g, '_');
    link.href = url;
    link.download = `CV_${cleanName}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    setExportToast(`Đã tải xuống file văn bản CV_${cleanName}.txt!`);
    setTimeout(() => setExportToast(null), 3500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left">
      {/* Top Banner Navigation */}
      <div className="cv-top-banner flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
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
            className="px-4 py-2.5 text-xs sm:text-sm font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors cursor-pointer"
          >
            Xem Việc Làm Đã Lưu →
          </button>
          <button
            id="cv-export-print-btn"
            onClick={() => setShowExportModal(true)}
            className="inline-flex items-center space-x-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-sm shadow-indigo-200 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Xuất PDF / In CV</span>
          </button>
        </div>
      </div>

      {showSavedNotification && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-medium rounded-xl flex items-center space-x-2 animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Hồ sơ CV của bạn đã được lưu tự động thành công!</span>
        </div>
      )}

      {/* Floating Export Toast */}
      {exportToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs sm:text-sm px-4 py-3 rounded-xl shadow-xl flex items-center space-x-2 border border-slate-700 animate-slideUp">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{exportToast}</span>
        </div>
      )}

      {/* Grid: Left Editor & Right CV Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Editor (5 cols) */}
        <div className="cv-editor-col lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200/80 space-y-6 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900">
              Chỉnh sửa thông tin cá nhân
            </h2>
            <button
              type="button"
              onClick={() => setShowExportModal(true)}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center space-x-1 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Tùy chọn xuất</span>
            </button>
          </div>

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
                className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold flex items-center space-x-1 cursor-pointer"
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
                      className="text-rose-500 hover:text-rose-700 cursor-pointer"
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
                className="px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 shadow-xs cursor-pointer"
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
                    className="text-indigo-400 hover:text-indigo-800 ml-1 cursor-pointer"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={handleSaveCV}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm transition-all shadow-sm shadow-indigo-200 cursor-pointer"
          >
            Lưu hồ sơ CV
          </button>
        </div>

        {/* Right Column: CV Preview Sheet (7 cols) */}
        <div
          id="cv-preview-sheet"
          className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-xl space-y-6 min-h-[700px] text-slate-800"
        >
          {/* CV Header */}
          <div className={`border-b-2 ${currentTheme.accentBorder} pb-6`}>
            <h1 className="text-3xl font-extrabold text-slate-900 uppercase tracking-tight">
              {cvData.fullName || 'Họ và tên'}
            </h1>
            <p className={`text-base font-semibold ${currentTheme.accentText} mt-1`}>
              {cvData.title || 'Chức danh'}
            </p>

            <div className="flex flex-wrap gap-y-1 gap-x-4 text-xs text-slate-500 mt-3">
              <span className="flex items-center space-x-1">
                <Mail className={`w-3.5 h-3.5 ${currentTheme.accentText}`} />
                <span>{cvData.email}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Phone className={`w-3.5 h-3.5 ${currentTheme.accentText}`} />
                <span>{cvData.phone}</span>
              </span>
              <span className="flex items-center space-x-1">
                <MapPin className={`w-3.5 h-3.5 ${currentTheme.accentText}`} />
                <span>{cvData.location}</span>
              </span>
              {cvData.website && (
                <span className="flex items-center space-x-1">
                  <Globe className={`w-3.5 h-3.5 ${currentTheme.accentText}`} />
                  <span>{cvData.website}</span>
                </span>
              )}
            </div>
          </div>

          {/* Summary */}
          <div>
            <h2 className={`text-xs font-bold uppercase tracking-wider ${currentTheme.accentHeading} mb-2`}>
              Giới thiệu bản thân
            </h2>
            <p className="text-xs leading-relaxed text-slate-600">
              {cvData.summary}
            </p>
          </div>

          {/* Experience */}
          <div>
            <h2 className={`text-xs font-bold uppercase tracking-wider ${currentTheme.accentHeading} mb-3`}>
              Kinh nghiệm làm việc
            </h2>
            <div className="space-y-4">
              {cvData.experience.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">{exp.role}</span>
                    <span className="text-slate-400 font-medium">{exp.period}</span>
                  </div>
                  <div className={`text-xs ${currentTheme.accentText} font-semibold`}>
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
            <h2 className={`text-xs font-bold uppercase tracking-wider ${currentTheme.accentHeading} mb-2`}>
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
            <h2 className={`text-xs font-bold uppercase tracking-wider ${currentTheme.accentHeading} mb-2`}>
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

      {/* Export & Print Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative animate-fadeIn text-left">
            {/* Close Button */}
            <button
              onClick={() => setShowExportModal(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                <Printer className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Xuất PDF & In Hồ Sơ CV
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Chọn định dạng xuất tài liệu để lưu trữ hoặc gửi trực tiếp cho nhà tuyển dụng.
                </p>
              </div>
            </div>

            {/* Theme Selector */}
            <div className="mb-6 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700 flex items-center space-x-1.5">
                  <Palette className="w-3.5 h-3.5 text-slate-500" />
                  <span>Màu sắc chủ đề CV:</span>
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setThemeColor('indigo')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 border transition-all cursor-pointer ${
                    themeColor === 'indigo'
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 ring-1 ring-white" />
                  <span>Xanh Indigo</span>
                </button>
                <button
                  type="button"
                  onClick={() => setThemeColor('blue')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 border transition-all cursor-pointer ${
                    themeColor === 'blue'
                      ? 'bg-[#0A58CA] text-white border-[#0A58CA] shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0A58CA] ring-1 ring-white" />
                  <span>Xanh Thương Hiệu</span>
                </button>
                <button
                  type="button"
                  onClick={() => setThemeColor('dark')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 border transition-all cursor-pointer ${
                    themeColor === 'dark'
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800 ring-1 ring-white" />
                  <span>Đen Hiện Đại</span>
                </button>
              </div>
            </div>

            {/* Action Options Cards */}
            <div className="space-y-3">
              {/* Option 1: Direct Download PDF */}
              <div className="p-4 rounded-2xl border-2 border-indigo-100 bg-indigo-50/40 hover:bg-indigo-50/80 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm text-slate-900">
                      Tải file PDF (.pdf) chuẩn ATS
                    </span>
                    <span className="text-[10px] uppercase tracking-wider font-extrabold bg-indigo-600 text-white px-2 py-0.5 rounded-full">
                      Khuyên dùng
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Khổ giấy A4 tiêu chuẩn 300 DPI, giữ nguyên cấu trúc phông chữ và định dạng.
                  </p>
                </div>
                <button
                  onClick={handleExportPDF}
                  disabled={isExporting}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-sm shadow-indigo-200 shrink-0 cursor-pointer disabled:opacity-75"
                >
                  {isExporting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Đang tạo PDF...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Tải file PDF</span>
                    </>
                  )}
                </button>
              </div>

              {/* Option 2: Print directly */}
              <div className="p-4 rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="font-bold text-sm text-slate-900 block">
                    In CV trực tiếp ra máy in
                  </span>
                  <p className="text-xs text-slate-500">
                    Mở hộp thoại in trình duyệt, tự động lọc sạch giao diện thừa chỉ in trang CV.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowExportModal(false);
                    setTimeout(() => handlePrint(), 200);
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center space-x-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm rounded-xl transition-colors shrink-0 cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-slate-600" />
                  <span>In bản in A4</span>
                </button>
              </div>

              {/* Option 3: Copy Text & Download TXT */}
              <div className="p-4 rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="font-bold text-sm text-slate-900 block">
                    Văn bản tóm tắt hồ sơ
                  </span>
                  <p className="text-xs text-slate-500">
                    Sao chép text có cấu trúc để paste vào email tuyển dụng hoặc form nộp việc online.
                  </p>
                </div>
                <div className="flex items-center space-x-2 w-full sm:w-auto shrink-0">
                  <button
                    onClick={handleCopyCVText}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center space-x-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    {copiedText ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Đã sao chép!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-600" />
                        <span>Sao chép</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleDownloadTxt}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center space-x-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    <FileDown className="w-3.5 h-3.5 text-slate-600" />
                    <span>Tải .txt</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setShowExportModal(false)}
                className="px-5 py-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

