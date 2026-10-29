import { create } from 'zustand';
import catAvatar from '../assets/images/cat_opentowork_avatar_1791346160613.jpg';
import { useNotificationsStore } from './notificationsStore';
import { useToastStore } from './toastStore';

const STORAGE_KEY = 'jobcentral_user';

const readStoredUser = () => {
  if (typeof window === 'undefined') return null;

  try {
    const savedUser = window.localStorage.getItem(STORAGE_KEY);
    if (!savedUser) return null;

    const parsed = JSON.parse(savedUser);
    return { ...parsed, avatar: catAvatar };
  } catch {
    return null;
  }
};

/**
 * Phiên đăng nhập + trạng thái modal auth.
 */
export const useAuthStore = create((set) => ({
  currentUser: readStoredUser(),
  authModalOpen: false,
  authMode: 'login',

  setAuthModalOpen: (open) => set({ authModalOpen: open }),
  setAuthMode: (mode) => set({ authMode: mode }),

  openAuth: (mode = 'login') =>
    set({ authMode: mode, authModalOpen: true }),

  closeAuth: () => set({ authModalOpen: false }),

  login: (user) => {
    const loggedInUser = {
      ...user,
      avatar: user.avatar || catAvatar,
      isGuest: false,
    };

    set({ currentUser: loggedInUser, authModalOpen: false });

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedInUser));
    } catch (e) {
      console.error('Failed to save user session:', e);
    }

    useToastStore
      .getState()
      .showToast(`Chào mừng ${user.name}! Bạn đã đăng nhập thành công.`, 'success');

    useNotificationsStore.getState().pushNotification({
      type: 'system',
      category: 'system',
      title: `Đăng nhập thành công: ${user.name}`,
      description:
        'Chào mừng bạn quay lại JobCentral! Hồ sơ và các thông báo tuyển dụng của bạn đã được đồng bộ.',
      badgeText: 'Tài khoản',
      badgeColor: 'purple',
      targetType: 'messages',
      targetId: 'conv-1',
      actionLabel: 'Mở tin nhắn HR',
    });
  },

  logout: () => {
    set({ currentUser: null });

    try {
      window.localStorage.removeItem(STORAGE_KEY);
      window.localStorage.removeItem('user_session');
    } catch (e) {
      console.error('Failed to remove user session:', e);
    }
  },
}));
