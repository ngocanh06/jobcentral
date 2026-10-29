import { create } from 'zustand';
import {
  INITIAL_NOTIFICATIONS,
  SIMULATED_SYSTEM_NOTIFICATIONS,
} from '../data/mockData';
import { useToastStore } from './toastStore';

let simulationIndex = 0;

const createNotification = (payload) => ({
  id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
  type: payload.type || 'system',
  category: payload.category || 'system',
  title: payload.title,
  description: payload.description || '',
  time: 'Vừa xong',
  isRead: false,
  badgeText: payload.badgeText || 'Hệ thống',
  badgeColor: payload.badgeColor || 'blue',
  targetType: payload.targetType || 'job',
  targetId: payload.targetId || 'job-1',
  actionLabel: payload.actionLabel || 'Xem chi tiết',
});

/**
 * Trung tâm thông báo toàn cục.
 * Header và các nơi khác có thể subscribe trực tiếp bằng selector.
 */
export const useNotificationsStore = create((set, get) => ({
  notifications: INITIAL_NOTIFICATIONS,

  pushNotification: (payload) => {
    const newNotification = createNotification(payload);
    set((state) => ({
      notifications: [newNotification, ...state.notifications],
    }));
    return newNotification;
  },

  simulateNotification: () => {
    const template =
      SIMULATED_SYSTEM_NOTIFICATIONS[
        simulationIndex % SIMULATED_SYSTEM_NOTIFICATIONS.length
      ];
    simulationIndex += 1;

    const newNotification = get().pushNotification(template);
    useToastStore
      .getState()
      .showToast(`Thông báo hệ thống mới: ${template.title}`, 'info');

    return newNotification;
  },

  markRead: (notifId) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === notifId ? { ...n, isRead: true } : n
      ),
    })),

  markAllRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, isRead: true })),
    })),

  deleteNotification: (notifId) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== notifId),
    })),
}));
