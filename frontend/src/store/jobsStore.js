import { create } from 'zustand';
import { INITIAL_JOBS } from '../data/mockData';
import { useNotificationsStore } from './notificationsStore';
import { useToastStore } from './toastStore';
import { useUiStore } from './uiStore';

/**
 * Danh sách việc làm + các thao tác toàn cục trên job.
 */
export const useJobsStore = create((set, get) => ({
  jobs: INITIAL_JOBS,

  toggleSave: (jobId) => {
    const job = get().jobs.find((j) => j.id === jobId);
    if (!job) return;

    const nextSaved = !job.isSaved;

    set((state) => ({
      jobs: state.jobs.map((j) =>
        j.id === jobId ? { ...j, isSaved: nextSaved } : j
      ),
    }));

    useToastStore
      .getState()
      .showToast(
        nextSaved
          ? `Đã lưu công việc "${job.title}" thành công!`
          : `Đã bỏ lưu công việc "${job.title}"`
      );

    if (nextSaved) {
      useNotificationsStore.getState().pushNotification({
        type: 'job_match',
        category: 'job_match',
        title: `Đã lưu việc làm: ${job.title}`,
        description: `Vị trí tại ${job.company} (${job.salary}) đã được lưu vào danh sách theo dõi của bạn.`,
        badgeText: 'Đã lưu việc',
        badgeColor: 'blue',
        targetType: 'job',
        targetId: job.id,
        actionLabel: 'Xem việc làm',
      });
    }

    // Đồng bộ nếu job detail đang mở đúng job này
    useUiStore.getState().syncSavedJob(jobId, nextSaved);
  },

  getJobById: (id) =>
    get().jobs.find((job) => String(job.id) === String(id)),
}));
