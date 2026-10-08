import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);
const AUTH_STORAGE_KEY = "jobcentral.authenticated";

// Tạo một vùng lưu trữ trạng thái xác thực dùng chung trong ứng dụng.
// AUTH_STORAGE_KEY Tạo một vùng lưu trữ trạng thái xác thực dùng chung trong ứng dụng.
  
const DEFAULT_USER = {
  id: 1,
  fullName: "Admin Quản Trị",
  email: "admin@jobcentral.vn",
  role: "admin",
  avatar: null,
};

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem(AUTH_STORAGE_KEY) === "true",
  );
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("jobcentral.user");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return DEFAULT_USER;
  });

  function login(userData) {
    localStorage.setItem(AUTH_STORAGE_KEY, "true");
    setIsAuthenticated(true);
    if (userData) {
      setUser(userData);
      localStorage.setItem("jobcentral.user", JSON.stringify(userData));
    }
  }

  function logout() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    localStorage.removeItem("jobcentral.user");
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return auth;
}