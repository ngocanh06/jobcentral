import React, { useEffect, useRef } from 'react';
import {
  INITIAL_COMPANIES,
  INITIAL_ARTICLES,
  INITIAL_REVIEWS,
} from './data/mockData';
import { Header } from './components/Header';
import { AllJobsView } from './components/AllJobsView';
import { JobSearchView } from './components/JobSearchView';
import { SavedJobsView } from './components/SavedJobsView';
import { CompaniesView } from './components/CompaniesView';
import { FollowedCompaniesView } from './components/FollowedCompaniesView';
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
import { CandidateLoginPage } from './pages/login';
import { Toast } from './components/Toast';
import { MobileBottomNav } from './components/MobileBottomNav';
import { MobileProfileDrawer } from './components/MobileProfileDrawer';
import { useAuthStore } from './store/authStore';
import { useJobsStore } from './store/jobsStore';
import { useCompaniesStore } from './store/companiesStore';
import { useNotificationsStore } from './store/notificationsStore';
import { useUiStore } from './store/uiStore';
import { useToastStore } from './store/toastStore';

export function App() {
  // Auth
  const currentUser = useAuthStore((s) => s.currentUser);
  const authModalOpen = useAuthStore((s) => s.authModalOpen);
  const authMode = useAuthStore((s) => s.authMode);
  const setAuthModalOpen = useAuthStore((s) => s.setAuthModalOpen);
  const setAuthMode = useAuthStore((s) => s.setAuthMode);
  const login = useAuthStore((s) => s.login);
  const logout = useAuthStore((s) => s.logout);

  // Jobs
  const jobs = useJobsStore((s) => s.jobs);
  const toggleSave = useJobsStore((s) => s.toggleSave);
  const savedCount = useJobsStore(
    (s) => s.jobs.filter((job) => job.isSaved).length
  );

  // Companies
  const followedCompanyIds = useCompaniesStore((s) => s.followedCompanyIds);
  const selectedCompany = useCompaniesStore((s) => s.selectedCompany);
  const targetCompanyFilter = useCompaniesStore((s) => s.targetCompanyFilter);
  const setSelectedCompany = useCompaniesStore((s) => s.setSelectedCompany);
  const setTargetCompanyFilter = useCompaniesStore(
    (s) => s.setTargetCompanyFilter
  );
  const toggleFollow = useCompaniesStore((s) => s.toggleFollow);

  // Notifications
  const notifications = useNotificationsStore((s) => s.notifications);
  const pushNotification = useNotificationsStore((s) => s.pushNotification);
  const simulateNotification = useNotificationsStore(
    (s) => s.simulateNotification
  );
  const markRead = useNotificationsStore((s) => s.markRead);
  const markAllRead = useNotificationsStore((s) => s.markAllRead);
  const deleteNotification = useNotificationsStore(
    (s) => s.deleteNotification
  );

  // UI / navigation
  const activeTab = useUiStore((s) => s.activeTab);
  const previousTab = useUiStore((s) => s.previousTab);
  const targetConversationId = useUiStore((s) => s.targetConversationId);
  const selectedJobForDetail = useUiStore((s) => s.selectedJobForDetail);
  const selectedJobForApply = useUiStore((s) => s.selectedJobForApply);
  const selectedJobForStandardApply = useUiStore(
    (s) => s.selectedJobForStandardApply
  );
  const mobileProfileDrawerOpen = useUiStore(
    (s) => s.mobileProfileDrawerOpen
  );
  const setActiveTab = useUiStore((s) => s.setActiveTab);
  const setPreviousTab = useUiStore((s) => s.setPreviousTab);
  const setTargetConversationId = useUiStore(
    (s) => s.setTargetConversationId
  );
  const setSelectedJobForDetail = useUiStore(
    (s) => s.setSelectedJobForDetail
  );
  const setSelectedJobForApply = useUiStore((s) => s.setSelectedJobForApply);
  const setSelectedJobForStandardApply = useUiStore(
    (s) => s.setSelectedJobForStandardApply
  );
  const setMobileProfileDrawerOpen = useUiStore(
    (s) => s.setMobileProfileDrawerOpen
  );

  // Toast
  const toast = useToastStore((s) => s.toast);
  const showToast = useToastStore((s) => s.showToast);
  const setToast = useToastStore((s) => s.setToast);

  const pushSystemNotification = pushNotification;

  const handleSimulateNotification = () => {
    simulateNotification();
  };

  const handleMarkNotificationRead = (notifId, e) => {
    if (e) e.stopPropagation();
    markRead(notifId);
  };

  const handleMarkAllNotificationsRead = () => {
    markAllRead();
    showToast('Đã đánh dấu đọc tất cả thông báo.', 'info');
  };

  const handleDeleteNotification = (notifId, e) => {
    if (e) e.stopPropagation();
    deleteNotification(notifId);
  };

  const handleNotificationClick = (notif) => {
    // Mark clicked notification as read
    markRead(notif.id);

    setSelectedJobForStandardApply(null);

    if (notif.targetType === 'job') {
      const targetJob =
        jobs.find((j) => String(j.id) === String(notif.targetId)) || jobs[0];
      if (targetJob) {
        setSelectedJobForDetail(targetJob);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    }

    setSelectedJobForDetail(null);

    if (notif.targetType === 'company') {
      let targetComp = null;

      // 1. Direct resolution with ID corrections/aliases
      let lookupId = notif.targetId;
      if (notif.id === 'notif-3' || (lookupId === 'c3' && (notif.title?.includes('FPT') || notif.description?.includes('FPT')))) {
        lookupId = 'c5'; // FPT Software
      } else if (notif.id === 'notif-7' || (lookupId === 'c5' && (notif.title?.includes('FinX') || notif.description?.includes('FinX')))) {
        lookupId = 'c3'; // FinX Digital Bank
      } else if (lookupId === 'c6' || notif.id === 'notif-8') {
        lookupId = 'c9'; // Shopee Vietnam
      }

      if (lookupId) {
        targetComp = INITIAL_COMPANIES.find(
          (c) => String(c.id) === String(lookupId) || c.aliasIds?.includes(String(lookupId))
        );
      }

      // 2. Fallback to name matching in title or description
      if (!targetComp) {
        const textToSearch = `${notif.title || ''} ${notif.description || ''}`.toLowerCase();
        targetComp = INITIAL_COMPANIES.find((c) =>
          textToSearch.includes(c.name.toLowerCase())
        );
      }

      // 3. Fallback to first company if still not found
      if (!targetComp) {
        targetComp = INITIAL_COMPANIES[0];
      }

      if (targetComp) {
        setSelectedCompany(targetComp);
      }
      setPreviousTab('companies');
      setActiveTab('companies');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (notif.targetType === 'messages') {
      if (activeTab !== 'messages') {
        setPreviousTab(activeTab);
      }
      if (notif.targetId) {
        setTargetConversationId(notif.targetId);
      }
      setActiveTab('messages');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (
      notif.targetType === 'cv-builder' ||
      notif.targetType === 'tools' ||
      notif.targetType === 'saved'
    ) {
      setPreviousTab(notif.targetType);
      setActiveTab(notif.targetType);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
  };

  // Toggle Messages page: click once to open, click again to close back to previous tab
  const handleToggleMessages = () => {
    if (!currentUser) {
      showToast('Vui lòng đăng nhập để xem tin nhắn từ nhà tuyển dụng!', 'info');
      handleOpenAuth('login');
      return;
    }

    const isCurrentlyOnMessages =
      activeTab === 'messages' &&
      !selectedJobForDetail &&
      !selectedJobForStandardApply;

    if (isCurrentlyOnMessages) {
      const fallbackTab =
        previousTab && previousTab !== 'messages' ? previousTab : 'jobs';
      setActiveTab(fallbackTab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (activeTab !== 'messages') {
        setPreviousTab(activeTab);
      }
      setSelectedJobForStandardApply(null);
      setSelectedJobForDetail(null);
      setActiveTab('messages');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleToggleFollowCompany = (companyId, e) => {
    if (e) e.stopPropagation();
    toggleFollow(companyId);
  };

  // Open job details if URL contains jobId
  const initialJobHandledRef = useRef(false);

  useEffect(() => {
    if (initialJobHandledRef.current) return;
    initialJobHandledRef.current = true;

    const url = new URL(window.location.href);
    const urlJobId = url.searchParams.get('jobId');
    if (!urlJobId) return;

    const found = jobs.find((j) => String(j.id) === String(urlJobId));
    if (found) setSelectedJobForDetail(found);

    url.searchParams.delete('jobId');
    window.history.replaceState({}, '', url.toString());
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
    toggleSave(jobId);
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
    const appliedJob = selectedJobForApply;
    setSelectedJobForApply(null);
    showToast('Hồ sơ ứng tuyển của bạn đã được gửi thành công!', 'success');
    if (appliedJob) {
      pushSystemNotification({
        type: 'application',
        category: 'application',
        title: `Đã nộp CV ứng tuyển: ${appliedJob.title}`,
        description: `Hồ sơ của bạn đã được chuyển tới bộ phận Tuyển dụng tại ${appliedJob.company}.`,
        badgeText: 'Ứng tuyển',
        badgeColor: 'emerald',
        targetType: 'job',
        targetId: appliedJob.id,
        actionLabel: 'Xem lại công việc',
      });
    }
  };

  const handleOpenAuth = (mode) => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = (user) => {
    login(user);
  };

  const handleLogout = () => {
    logout();
    if (activeTab === 'messages') {
      setActiveTab('jobs');
    }
    showToast('Đã đăng xuất. Bạn đang ở trạng thái chưa đăng nhập.', 'info');
  };

  return (
    <div
      className={`flex flex-col font-sans text-slate-800 antialiased selection:bg-indigo-100 selection:text-indigo-900 bg-[#FAF9FF] ${(activeTab === 'messages' || activeTab === 'search') && !selectedJobForDetail && !selectedJobForStandardApply
          ? 'h-dvh overflow-hidden'
          : 'min-h-screen'
        }`}
    >
      {/* Top Main Navigation Header */}
      <Header
        activeTab={selectedJobForStandardApply || selectedJobForDetail ? 'search' : activeTab}
        onToggleMessages={handleToggleMessages}
        onTabChange={(tab) => {
          if (tab === 'messages') {
            handleToggleMessages();
            return;
          }
          setSelectedJobForStandardApply(null);
          setSelectedJobForDetail(null);
          if (tab === 'favorite-companies') {
            setSelectedJobForStandardApply(null);
            setSelectedJobForDetail(null);
            setSelectedCompany(null);
            setTargetCompanyFilter(null);
            setPreviousTab(activeTab);
            setActiveTab('favorite-companies');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
          }
          if (tab === 'companies') {
            setSelectedCompany(null);
            setTargetCompanyFilter(null);
          }
          setPreviousTab(tab);
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        savedCount={savedCount}
        followedCompaniesCount={followedCompanyIds.length}
        notifications={notifications}
        onNotificationClick={handleNotificationClick}
        onMarkNotificationRead={handleMarkNotificationRead}
        onMarkAllNotificationsRead={handleMarkAllNotificationsRead}
        onDeleteNotification={handleDeleteNotification}
        onSimulateNotification={handleSimulateNotification}
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
            onNavigateCVBuilder={() => {
              setSelectedJobForStandardApply(null);
              setSelectedJobForDetail(null);
              setPreviousTab('jobs');
              setActiveTab('cv-builder');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onViewJobDetail={(targetJob) => {
              setSelectedJobForStandardApply(null);
              setSelectedJobForDetail(targetJob);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSubmitSuccess={(data) => {
              const appliedJob = selectedJobForStandardApply;
              setSelectedJobForStandardApply(null);
              showToast(`Đã gửi hồ sơ ứng tuyển vị trí "${data.jobTitle || 'việc làm'}" thành công!`, 'success');
              if (appliedJob) {
                pushSystemNotification({
                  type: 'application',
                  category: 'application',
                  title: `Đã nộp hồ sơ ứng tuyển: ${appliedJob.title}`,
                  description: `CV của bạn đã được gửi tới ${appliedJob.company}. Hệ thống sẽ thông báo ngay khi Nhà tuyển dụng phản hồi.`,
                  badgeText: 'Ứng tuyển',
                  badgeColor: 'emerald',
                  targetType: 'job',
                  targetId: appliedJob.id,
                  actionLabel: 'Xem lại công việc',
                });
              }
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onShowToast={showToast}
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
                onTabChange={(tab) => {
                  setActiveTab(tab);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onShowToast={showToast}
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

            {activeTab === 'favorite-companies' && (
              <FollowedCompaniesView
                companies={INITIAL_COMPANIES}
                allJobs={jobs}
                followedCompanyIds={followedCompanyIds}
                onToggleFollowCompany={handleToggleFollowCompany}
                onSelectCompany={(c) => {
                  setSelectedCompany(c);
                  setPreviousTab('favorite-companies');
                  setActiveTab('companies');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onExploreCompanies={() => {
                  setSelectedCompany(null);
                  setTargetCompanyFilter(null);
                  setActiveTab('companies');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
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
                    if (previousTab === 'favorite-companies') {
                      setActiveTab('favorite-companies');
                    }
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
                initialConversationId={targetConversationId}
                onCloseMessages={handleToggleMessages}
                onSystemNotification={pushSystemNotification}
                onViewJobDetail={handleViewJobDetails}
                onOpenAuth={handleOpenAuth}
                onNavigateToJobs={() => {
                  setPreviousTab('jobs');
                  setActiveTab('jobs');
                }}
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
                  setPreviousTab('companies');
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
          if (tab === 'messages') {
            handleToggleMessages();
            return;
          }
          setSelectedJobForStandardApply(null);
          setSelectedJobForDetail(null);
          setPreviousTab(tab);
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
          setSelectedJobForStandardApply(null);
          setSelectedJobForDetail(null);
          if (tab === 'messages') {
            handleToggleMessages();
            return;
          }
          if (tab === 'favorite-companies') {
            setSelectedCompany(null);
            setTargetCompanyFilter(null);
            setPreviousTab(activeTab);
            setActiveTab('favorite-companies');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
          }
          if (tab === 'companies') {
            setSelectedCompany(null);
            setTargetCompanyFilter(null);
          }
          setPreviousTab(tab);
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
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="fixed inset-0" onClick={() => setAuthModalOpen(false)} aria-hidden="true" />
          <div className="relative z-10 w-full max-w-5xl">
            <CandidateLoginPage
              onLoginSuccess={handleAuthSuccess}
              onNavigateHome={() => setAuthModalOpen(false)}
              onNavigateRegister={(mode) => {
                showToast(`Chức năng đăng ký/khôi phục (${mode}) đang cập nhật.`, 'info');
              }}
            />
          </div>
        </div>
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
