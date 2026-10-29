import { create } from 'zustand';

/**
 * Điều hướng tab, modal và các "selection" toàn cục.
 * Các state cục bộ trong từng trang (filter, dropdown, form...) KHÔNG đặt ở đây.
 */
export const useUiStore = create((set) => ({
  activeTab: 'jobs',
  previousTab: 'jobs',
  targetConversationId: 'conv-1',

  selectedJobForDetail: null,
  selectedJobForApply: null,
  selectedJobForStandardApply: null,

  mobileProfileDrawerOpen: false,

  setActiveTab: (tab) => set({ activeTab: tab }),
  setPreviousTab: (tab) => set({ previousTab: tab }),
  setTargetConversationId: (id) => set({ targetConversationId: id }),

  setSelectedJobForDetail: (job) => set({ selectedJobForDetail: job }),
  setSelectedJobForApply: (job) => set({ selectedJobForApply: job }),
  setSelectedJobForStandardApply: (job) =>
    set({ selectedJobForStandardApply: job }),

  setMobileProfileDrawerOpen: (open) =>
    set({ mobileProfileDrawerOpen: open }),

  /** Đồng bộ trạng thái lưu khi job detail đang mở. */
  syncSavedJob: (jobId, isSaved) =>
    set((state) => ({
      selectedJobForDetail:
        state.selectedJobForDetail &&
        state.selectedJobForDetail.id === jobId
          ? { ...state.selectedJobForDetail, isSaved }
          : state.selectedJobForDetail,
    })),
}));
