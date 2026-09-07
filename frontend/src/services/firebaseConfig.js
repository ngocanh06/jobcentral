/**
 * [PROTOTYPE ONLY - DỄ DÀNG XÓA HOẶC THAY THẾ]
 * Cấu hình kết nối Firebase Auth phục vụ thử nghiệm / tạo mẫu.
 *
 * Cách gỡ bỏ hoặc thay thế sau này:
 * 1. Xóa thư mục `src/services/` hoặc chỉ cần sửa `authService.js` để kết nối backend của bạn.
 * 2. Không làm ảnh hưởng đến bất kỳ thành phần UI nào khác.
 */
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
};

// Kiểm tra xem đã cấu hình đầy đủ API Key hay chưa
export const isFirebaseConfigured = () => {
  return Boolean(
    firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId
  );
};

let cachedAuth = null;
let cachedProvider = null;

/**
 * Lazy initialization: Chỉ khởi tạo khi được gọi thực tế để tránh crash ứng dụng khi chưa điền key
 */
export const getFirebaseAuth = () => {
  if (!isFirebaseConfigured()) {
    return null;
  }

  if (!cachedAuth) {
    const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    cachedAuth = getAuth(app);
  }
  return cachedAuth;
};

export const getGoogleProvider = () => {
  if (!cachedProvider) {
    cachedProvider = new GoogleAuthProvider();
    cachedProvider.setCustomParameters({
      prompt: 'select_account',
    });
  }
  return cachedProvider;
};
