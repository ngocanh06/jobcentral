import { create } from 'zustand';

let timeoutId = null;

/**
 * Toast toàn cục.
 * Chỉ chứa state hiển thị toast, không chứa logic nghiệp vụ.
 */
export const useToastStore = create((set, get) => ({
  toast: null,

  setToast: (toast) => set({ toast }),

  showToast: (message, type = 'success') => {
    if (timeoutId) clearTimeout(timeoutId);

    set({ toast: { message, type } });

    timeoutId = setTimeout(() => {
      const current = get().toast;
      if (current?.message === message) {
        set({ toast: null });
      }
      timeoutId = null;
    }, 3500);
  },

  clearToast: () => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = null;
    set({ toast: null });
  },
}));
