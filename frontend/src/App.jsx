import React, { useState, useEffect } from 'react';
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
import { CompanyDetailView } from './components/CompanyDetailView';
import { ReviewsView } from './components/ReviewsView';
import { NewsView } from './components/NewsView';
import { CVBuilderView } from './components/CVBuilderView';
import { MessagesView } from './components/MessagesView';
import { JobDetailModal } from './components/JobDetailModal';
import { ApplyModal } from './components/ApplyModal';
import { AuthModal } from './components/AuthModal';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';

export function App() {
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [followedCompanyIds, setFollowedCompanyIds] = useState(['c1', 'c2']);
  const [activeTab, setActiveTab] = useState('jobs');
  const [selectedJobForDetail, setSelectedJobForDetail] = useState(null);
  const [selectedJobForApply, setSelectedJobForApply] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [targetCompanyFilter, setTargetCompanyFilter] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
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

  const handleToggleFollowCompany = (companyId, e) => {
    if (e) e.stopPropagation();
    const company = INITIAL_COMPANIES.find((c) => c.id === companyId);
    const companyName = company ? company.name : 'Công ty';

    setFollowedCompanyIds((prev) => {
      const isAlreadyFollowed = prev.includes(companyId);
      if (isAlreadyFollowed) {
        showToast(`Đã bỏ theo dõi công ty "${companyName}"`, 'info');
        return prev.filter((id) => id !== companyId);
      } else {
        showToast(
          `Đã theo dõi công ty "${companyName}"! Bạn sẽ nhận được thông báo khi có việc làm mới.`,
          'success'
        );
        return [...prev, companyId];
      }
    });
  };

  // Open job details if URL contains jobId
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlJobId = params.get('jobId');
      if (urlJobId) {
        const found = jobs.find((j) => String(j.id) === String(urlJobId));
        if (found) {
          setSelectedJobForDetail(found);
        }
      }
    } catch {
      // Ignore if URL query params fail to parse
    }
  }, [jobs]);

  const handleShareJob = (job, e) => {
    if (e) e.stopPropagation();
    
    // Construct shareable URL
    const url = new URL(window.location.href);
    url.searchParams.set('jobId', job.id);
    const shareUrl = url.toString();

    const jobTitle = job.title ? `"${job.title}"` : 'việc làm';

    const copyFallback = () => {
      try {
        const tempInput = document.createElement('input');
        tempInput.value = shareUrl;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast(`Đã sao chép liên kết ${jobTitle} vào bộ nhớ tạm!`, 'success');
      } catch {
        showToast('Không thể sao chép liên kết. Vui lòng thử lại.', 'error');
      }
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(shareUrl)
        .then(() => {
          showToast(`Đã sao chép liên kết ${jobTitle} vào bộ nhớ tạm!`, 'success');
        })
        .catch(() => {
          copyFallback();
        });
    } else {
      copyFallback();
    }
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
          if (tab === 'favorite-companies') {
            setSelectedCompany(null);
            setTargetCompanyFilter(null);
            setActiveTab('companies');
            setTimeout(() => {
              const el = document.getElementById('favorite-companies-section');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }, 120);
            return;
          }
          if (tab === 'companies') {
            setSelectedCompany(null);
            setTargetCompanyFilter(null);
          }
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        savedCount={savedCount}
        followedCompaniesCount={followedCompanyIds.length}
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
            onShare={handleShareJob}
          />
        )}

        {activeTab === 'saved' && (
          <SavedJobsView
            jobs={jobs}
            onToggleSave={handleToggleSave}
            onApply={handleApplyClick}
            onViewDetails={(job) => setSelectedJobForDetail(job)}
            onShare={handleShareJob}
            onExploreMore={() => setActiveTab('jobs')}
          />
        )}

        {activeTab === 'companies' && (
          selectedCompany ? (
            <CompanyDetailView
              company={selectedCompany}
              allJobs={jobs}
              followedCompanyIds={followedCompanyIds}
              onToggleFollowCompany={handleToggleFollowCompany}
              onBack={() => {
                setSelectedCompany(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onApplyJob={handleApplyClick}
              onViewJobDetail={(job) => setSelectedJobForDetail(job)}
              onToggleSaveJob={(jobId) => handleToggleSave(jobId)}
              onShareJob={handleShareJob}
            />
          ) : (
            <CompaniesView
              companies={INITIAL_COMPANIES}
              initialSearchQuery={targetCompanyFilter}
              onResetSearch={() => setTargetCompanyFilter(null)}
              followedCompanyIds={followedCompanyIds}
              onToggleFollowCompany={handleToggleFollowCompany}
              onSelectCompany={(c) => {
                setSelectedCompany(c);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onExploreJobs={() => setActiveTab('jobs')}
            />
          )
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

        {activeTab === 'messages' && (
          <MessagesView
            currentUser={currentUser}
            onViewJobDetail={(job) => setSelectedJobForDetail(job)}
            onNavigateToJobs={() => setActiveTab('jobs')}
            onNavigateToCompany={(companyName) => {
              const matched = INITIAL_COMPANIES.find(
                (c) =>
                  c.name.toLowerCase().includes(companyName.toLowerCase()) ||
                  companyName.toLowerCase().includes(c.name.toLowerCase())
              );
              if (matched) {
                setSelectedCompany(matched);
              } else {
                setTargetCompanyFilter(companyName);
                setSelectedCompany(null);
              }
              setActiveTab('companies');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Footer */}
      {activeTab !== 'messages' && <Footer />}

      {/* Modals & Portals */}
      {selectedJobForDetail && (
        <JobDetailModal
          job={selectedJobForDetail}
          onClose={() => setSelectedJobForDetail(null)}
          onToggleSave={handleToggleSave}
          onApply={handleApplyClick}
          onShare={handleShareJob}
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
