import React, { useState, useEffect } from 'react';
import {
  INITIAL_JOBS,
  INITIAL_COMPANIES,
  INITIAL_ARTICLES,
  INITIAL_REVIEWS,
} from './data/mockData';
import { Header } from './components/Header';
import { AllJobsView } from './components/AllJobsView';
import { JobSearchView } from './components/JobSearchView';
import { SavedJobsView } from './components/SavedJobsView';
import { CompaniesView } from './components/CompaniesView';
import { CompanyDetailView } from './components/CompanyDetailView';
import { NewsView } from './components/NewsView';
import { ReviewsView } from './components/ReviewsView';
import { ToolsView } from './components/ToolsView';
import { CVBuilderView } from './components/CVBuilderView';
import { MessagesView } from './components/MessagesView';
import { JobDetailView } from './components/JobDetailView';
import { ApplyJobView } from './components/ApplyJobView';
import { JobDetailModal } from './components/JobDetailModal';
import { ApplyModal } from './components/ApplyModal';
import { AuthModal } from './components/AuthModal';
import { Toast } from './components/Toast';
import { MobileBottomNav } from './components/MobileBottomNav';
import { MobileProfileDrawer } from './components/MobileProfileDrawer';
import { useDevice } from './context/DeviceContext';
import catAvatar from './assets/images/cat_opentowork_avatar_1791346160613.jpg';

export function App() {
  const device = useDevice();
  const [jobs, setJobs] = useState(INITIAL_JOBS);
  const [followedCompanyIds, setFollowedCompanyIds] = useState(['c1', 'c2']);
  const [activeTab, setActiveTab] = useState('jobs');
  const [selectedJobForDetail, setSelectedJobForDetail] = useState(null);
  const [selectedJobForApply, setSelectedJobForApply] = useState(null);
  const [selectedJobForStandardApply, setSelectedJobForStandardApply] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [mobileProfileDrawerOpen, setMobileProfileDrawerOpen] = useState(false);
  const [targetCompanyFilter, setTargetCompanyFilter] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('jobcentral_user');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        return { ...parsed, avatar: catAvatar };
      }
      return null;
    } catch {
      return null;
    }
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
    const isAlreadyFollowed = followedCompanyIds.includes(companyId);

    setFollowedCompanyIds((prev) =>
      prev.includes(companyId)
        ? prev.filter((id) => id !== companyId)
        : [...prev, companyId]
    );

    if (isAlreadyFollowed) {
      showToast(`Đã bỏ theo dõi công ty "${companyName}"`, 'info');
    } else {
      showToast(
        `Đã theo dõi công ty "${companyName}"! Bạn sẽ nhận được thông báo khi có việc làm mới.`,
        'success'
      );
    }
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
    const targetJob = jobs.find((j) => j.id === jobId);
    if (targetJob) {
      const nextSaved = !targetJob.isSaved;
      showToast(
        nextSaved
          ? `Đã lưu công việc "${targetJob.title}" thành công!`
          : `Đã bỏ lưu công việc "${targetJob.title}"`
      );
    }

    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === jobId ? { ...job, isSaved: !job.isSaved } : job
      )
    );

    if (selectedJobForDetail && selectedJobForDetail.id === jobId) {
      setSelectedJobForDetail((prev) =>
        prev ? { ...prev, isSaved: !prev.isSaved } : null
      );
    }
  };

  const handleViewJobDetails = (job) => {
    setSelectedJobForDetail(job);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplyClick = (job, eOrOptions, maybeOptions) => {
    let options = {};
    if (eOrOptions && eOrOptions.stopPropagation) {
      eOrOptions.stopPropagation();
      if (maybeOptions) options = maybeOptions;
    } else if (eOrOptions && typeof eOrOptions === 'object') {
      options = eOrOptions;
    }

    if (options.isQuickApply) {
      setSelectedJobForApply({ ...job, ...options });
    } else {
      setSelectedJobForStandardApply({ ...job, ...options });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
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
    const loggedInUser = {
      ...user,
      avatar: user.avatar || catAvatar,
      isGuest: false,
    };
    setCurrentUser(loggedInUser);
    try {
      localStorage.setItem('jobcentral_user', JSON.stringify(loggedInUser));
    } catch (e) {
      console.error('Failed to save user session:', e);
    }
    setAuthModalOpen(false);
    showToast(`Chào mừng ${user.name}! Bạn đã đăng nhập thành công.`, 'success');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('jobcentral_user');
      localStorage.removeItem('user_session');
    } catch (e) {
      console.error('Failed to remove user session:', e);
    }
    showToast('Đã đăng xuất khỏi hệ thống.', 'info');
  };

  const savedCount = jobs.filter((j) => j.isSaved).length;

  return (
    <div
      className={`flex flex-col font-sans text-slate-800 antialiased selection:bg-indigo-100 selection:text-indigo-900 bg-[#FAF9FF] ${
        (activeTab === 'messages' || activeTab === 'search') && !selectedJobForDetail && !selectedJobForStandardApply
          ? 'h-dvh overflow-hidden'
          : 'min-h-screen'
      }`}
    >
      {/* Top Main Navigation Header */}
      <Header
        activeTab={selectedJobForStandardApply || selectedJobForDetail ? 'search' : activeTab}
        onTabChange={(tab) => {
          setSelectedJobForStandardApply(null);
          setSelectedJobForDetail(null);
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
        onOpenMobileDrawer={() => setMobileProfileDrawerOpen(true)}
      />

      {/* Main View Display Body */}
      <main
        className={
          (activeTab === 'messages' || activeTab === 'search') && !selectedJobForDetail && !selectedJobForStandardApply
            ? 'flex-1 overflow-hidden flex flex-col min-h-0 pb-16 md:pb-0'
            : 'flex-1 pb-16 md:pb-0'
        }
      >
        {selectedJobForStandardApply ? (
          <ApplyJobView
            job={selectedJobForStandardApply}
            currentUser={currentUser}
            onBack={() => {
              setSelectedJobForStandardApply(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateHome={() => {
              setSelectedJobForStandardApply(null);
              setSelectedJobForDetail(null);
              setActiveTab('jobs');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateJobs={() => {
              setSelectedJobForStandardApply(null);
              setSelectedJobForDetail(null);
              setActiveTab('search');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onViewJobDetail={(targetJob) => {
              setSelectedJobForStandardApply(null);
              setSelectedJobForDetail(targetJob);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSubmitSuccess={(data) => {
              setSelectedJobForStandardApply(null);
              showToast(`Đã gửi hồ sơ ứng tuyển vị trí "${data.jobTitle || 'việc làm'}" thành công!`, 'success');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : selectedJobForDetail ? (
          <JobDetailView
            job={selectedJobForDetail}
            allJobs={jobs}
            onBack={() => {
              setSelectedJobForDetail(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateHome={() => {
              setSelectedJobForDetail(null);
              setActiveTab('jobs');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateJobs={() => {
              setSelectedJobForDetail(null);
              setActiveTab('search');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectRelatedJob={(relJob) => {
              const fullJob = jobs.find((j) => j.id === relJob.id) || relJob;
              setSelectedJobForDetail(fullJob);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onViewCompany={(compName) => {
              const matched = INITIAL_COMPANIES.find(
                (c) =>
                  c.name.toLowerCase().includes(compName.toLowerCase()) ||
                  compName.toLowerCase().includes(c.name.toLowerCase())
              );
              if (matched) {
                setSelectedCompany(matched);
              } else {
                setTargetCompanyFilter(compName);
                setSelectedCompany(null);
              }
              setSelectedJobForDetail(null);
              setActiveTab('companies');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onToggleSave={handleToggleSave}
            onApply={handleApplyClick}
            onShare={handleShareJob}
            onShowToast={showToast}
          />
        ) : (
          <>
            {activeTab === 'jobs' && (
              <AllJobsView
                jobs={jobs}
                onToggleSave={handleToggleSave}
                onApply={handleApplyClick}
                onViewDetails={handleViewJobDetails}
                onShare={handleShareJob}
                onNavigateNews={() => {
                  setActiveTab('news');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {activeTab === 'search' && (
              <JobSearchView
                jobs={jobs}
                currentUser={currentUser}
                onToggleSave={handleToggleSave}
                onApply={handleApplyClick}
                onViewDetails={handleViewJobDetails}
                onShare={handleShareJob}
                onOpenAuth={(mode) => {
                  setAuthMode(mode || 'login');
                  setAuthModalOpen(true);
                }}
                onOpenProfileDrawer={() => setMobileProfileDrawerOpen(true)}
                onNavigateHome={() => setActiveTab('jobs')}
                onExploreJobs={() => setActiveTab('jobs')}
              />
            )}

            {activeTab === 'saved' && (
              <SavedJobsView
                jobs={jobs}
                onToggleSave={handleToggleSave}
                onApply={handleApplyClick}
                onViewDetails={handleViewJobDetails}
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
                  onViewJobDetail={handleViewJobDetails}
                  onToggleSaveJob={(jobId) => handleToggleSave(jobId)}
                  onShareJob={handleShareJob}
                />
              ) : (
                <CompaniesView
                  companies={INITIAL_COMPANIES}
                  currentUser={currentUser}
                  savedCount={savedCount}
                  initialSearchQuery={targetCompanyFilter}
                  onResetSearch={() => setTargetCompanyFilter(null)}
                  followedCompanyIds={followedCompanyIds}
                  onToggleFollowCompany={handleToggleFollowCompany}
                  onSelectCompany={(c) => {
                    setSelectedCompany(c);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onExploreJobs={() => setActiveTab('jobs')}
                  onTabChange={(tab) => {
                    setActiveTab(tab);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  onShowToast={showToast}
                />
              )
            )}

            {activeTab === 'news' && (
              <NewsView articles={INITIAL_ARTICLES} />
            )}

            {activeTab === 'reviews' && (
              <ReviewsView reviews={INITIAL_REVIEWS} />
            )}

            {activeTab === 'tools' && (
              <ToolsView
                currentUser={currentUser}
                savedCount={savedCount}
                onTabChange={(tab) => {
                  setActiveTab(tab);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onShowToast={showToast}
              />
            )}

            {activeTab === 'cv-builder' && (
              <CVBuilderView
                onSavedJobsClick={() => setActiveTab('saved')}
              />
            )}

            {activeTab === 'messages' && (
              <MessagesView
                currentUser={currentUser}
                onViewJobDetail={handleViewJobDetails}
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
          </>
        )}
      </main>

      {/* Mobile Bottom Navigation Bar (Phone-Optimized) */}
      <MobileBottomNav
        activeTab={selectedJobForStandardApply || selectedJobForDetail ? 'search' : activeTab}
        onTabChange={(tab) => {
          setSelectedJobForStandardApply(null);
          setSelectedJobForDetail(null);
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        savedCount={savedCount}
        currentUser={currentUser}
        onOpenProfileDrawer={() => setMobileProfileDrawerOpen(true)}
        onOpenAuth={handleOpenAuth}
      />

      {/* Mobile Profile & Account Sheet */}
      <MobileProfileDrawer
        isOpen={mobileProfileDrawerOpen}
        onClose={() => setMobileProfileDrawerOpen(false)}
        currentUser={currentUser}
        savedCount={savedCount}
        followedCompaniesCount={followedCompanyIds.length}
        onTabChange={(tab) => {
          if (tab === 'favorite-companies') {
            setSelectedCompany(null);
            setTargetCompanyFilter(null);
            setActiveTab('companies');
            setTimeout(() => {
              const el = document.getElementById('favorite-companies-section');
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 120);
            return;
          }
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onLogout={handleLogout}
        onOpenAuth={handleOpenAuth}
      />

      {/* Modals & Portals */}
      {selectedJobForApply && (
        <ApplyModal
          job={selectedJobForApply}
          currentUser={currentUser}
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
