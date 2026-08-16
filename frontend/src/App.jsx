import React, { useState } from 'react';
import {
  INITIAL_JOBS,
  INITIAL_COMPANIES,
  INITIAL_REVIEWS,
  INITIAL_ARTICLES,
} from './data/mockData';
import { Header } from './components/Header';
import { AllJobsView } from './components/AllJobsView';
import { SavedJobsView } from './components/SavedJobsView';
import { CompaniesView } from './components/CompaniesView';
import { ReviewsView } from './components/ReviewsView';
import { NewsView } from './components/NewsView';
import { CVBuilderView } from './components/CVBuilderView';
import { JobDetailModal } from './components/JobDetailModal';
import { ApplyModal } from './components/ApplyModal';
import { AuthModal } from './components/AuthModal';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';

export function App() {
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [activeTab, setActiveTab] = useState('jobs');
  const [selectedJobForDetail, setSelectedJobForDetail] = useState(null);
  const [selectedJobForApply, setSelectedJobForApply] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [currentUser, setCurrentUser] = useState({
    name: 'Nguyễn Minh Anh',
    email: 'minhanh.nguyen@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  });
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 3500);
  };

  const handleToggleSave = (jobId, e) => {
    if (e) e.stopPropagation();
    setJobs((prevJobs) =>
      prevJobs.map((job) => {
        if (job.id === jobId) {
          const nextSaved = !job.isSaved;
          showToast(
            nextSaved
              ? `Đã lưu công việc "${job.title}" thành công!`
              : `Đã bỏ lưu công việc "${job.title}"`
          );
          return { ...job, isSaved: nextSaved };
        }
        return job;
      })
    );

    if (selectedJobForDetail && selectedJobForDetail.id === jobId) {
      setSelectedJobForDetail((prev) =>
        prev ? { ...prev, isSaved: !prev.isSaved } : null
      );
    }
  };

  const handleApplyClick = (job, e) => {
    if (e) e.stopPropagation();
    setSelectedJobForApply(job);
  };

  const handleApplySubmit = (data) => {
    setSelectedJobForApply(null);
    showToast('Hồ sơ ứng tuyển của bạn đã được gửi thành công!', 'success');
  };

  const handleOpenAuth = (mode) => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    setAuthModalOpen(false);
    showToast(`Chào mừng ${user.name}! Bạn đã đăng nhập thành công.`, 'success');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    showToast('Đã đăng xuất khỏi hệ thống.', 'info');
  };

  const savedCount = jobs.filter((j) => j.isSaved).length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-slate-800 antialiased selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Main Navigation Header */}
      <Header
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        savedCount={savedCount}
        onOpenAuth={handleOpenAuth}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Main View Display Body */}
      <main className="flex-1">
        {activeTab === 'jobs' && (
          <AllJobsView
            jobs={jobs}
            onToggleSave={handleToggleSave}
            onApply={handleApplyClick}
            onViewDetails={(job) => setSelectedJobForDetail(job)}
          />
        )}

        {activeTab === 'saved' && (
          <SavedJobsView
            jobs={jobs}
            onToggleSave={handleToggleSave}
            onApply={handleApplyClick}
            onViewDetails={(job) => setSelectedJobForDetail(job)}
            onExploreMore={() => setActiveTab('jobs')}
          />
        )}

        {activeTab === 'companies' && (
          <CompaniesView
            companies={INITIAL_COMPANIES}
            onSelectCompany={(c) => setActiveTab('jobs')}
            onExploreJobs={() => setActiveTab('jobs')}
          />
        )}

        {activeTab === 'reviews' && (
          <ReviewsView reviews={INITIAL_REVIEWS} />
        )}

        {activeTab === 'news' && (
          <NewsView articles={INITIAL_ARTICLES} />
        )}

        {activeTab === 'cv-builder' && (
          <CVBuilderView
            onSavedJobsClick={() => setActiveTab('saved')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Portals */}
      {selectedJobForDetail && (
        <JobDetailModal
          job={selectedJobForDetail}
          onClose={() => setSelectedJobForDetail(null)}
          onToggleSave={handleToggleSave}
          onApply={handleApplyClick}
        />
      )}

      {selectedJobForApply && (
        <ApplyModal
          job={selectedJobForApply}
          onClose={() => setSelectedJobForApply(null)}
          onSubmit={handleApplySubmit}
        />
      )}

      {authModalOpen && (
        <AuthModal
          initialMode={authMode}
          onClose={() => setAuthModalOpen(false)}
          onSuccess={handleAuthSuccess}
        />
      )}

      {/* Global Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default App;
