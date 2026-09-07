/**
 * [AUTH SERVICE ADAPTER]
 * Quản lý phiên đăng nhập và đăng xuất của người dùng.
 */

export const authService = {
  /**
   * Đăng xuất người dùng
   */
  async logout() {
    // Xóa session người dùng lưu trên client
    try {
      localStorage.removeItem('user_session');
    } catch (e) {
      console.warn('[AuthService] Lỗi khi đăng xuất:', e);
    }
  },
};

