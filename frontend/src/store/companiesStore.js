import { create } from 'zustand';
import { INITIAL_COMPANIES } from '../data/mockData';
import { useNotificationsStore } from './notificationsStore';
import { useToastStore } from './toastStore';

/**
 * Công ty: danh sách, công ty đang theo dõi, công ty đang xem.
 */
export const useCompaniesStore = create((set, get) => ({
  companies: INITIAL_COMPANIES,
  followedCompanyIds: ['c1', 'c2'],
  selectedCompany: null,
  targetCompanyFilter: null,

  setSelectedCompany: (company) => set({ selectedCompany: company }),
  setTargetCompanyFilter: (value) => set({ targetCompanyFilter: value }),

  resetCompanyFilters: () =>
    set({ selectedCompany: null, targetCompanyFilter: null }),

  toggleFollow: (companyId) => {
    const company = INITIAL_COMPANIES.find((c) => c.id === companyId);
    const companyName = company ? company.name : 'Công ty';
    const isAlreadyFollowed = get().followedCompanyIds.includes(companyId);

    set((state) => ({
      followedCompanyIds: isAlreadyFollowed
        ? state.followedCompanyIds.filter((id) => id !== companyId)
        : [...state.followedCompanyIds, companyId],
    }));

    if (isAlreadyFollowed) {
      useToastStore
        .getState()
        .showToast(`Đã bỏ theo dõi công ty "${companyName}"`, 'info');
    } else {
      useToastStore
        .getState()
        .showToast(
          `Đã theo dõi công ty "${companyName}"! Bạn sẽ nhận được thông báo khi có việc làm mới.`,
          'success'
        );

      useNotificationsStore.getState().pushNotification({
        type: 'company_update',
        category: 'job_match',
        title: `Đang theo dõi ${companyName}`,
        description: `Hệ thống đã bật thông báo ưu tiên khi ${companyName} đăng vị trí tuyển dụng hoặc cập nhật phúc lợi mới.`,
        badgeText: 'Theo dõi mới',
        badgeColor: 'indigo',
        targetType: 'company',
        targetId: companyId,
        actionLabel: 'Xem công ty',
      });
    }
  },

  getCompanyById: (id) =>
    INITIAL_COMPANIES.find(
      (company) =>
        String(company.id) === String(id) ||
        company.aliasIds?.includes(String(id))
    ),
}));
