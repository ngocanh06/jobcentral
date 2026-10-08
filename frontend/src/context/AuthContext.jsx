import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);
const AUTH_STORAGE_KEY = "jobcentral.authenticated";

// Tạo một vùng lưu trữ trạng thái xác thực dùng chung trong ứng dụng.
// AUTH_STORAGE_KEY Tạo một vùng lưu trữ trạng thái xác thực dùng chung trong ứng dụng.
  
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem(AUTH_STORAGE_KEY) === "true",
  );

// diễn biến đăng nhập được mô tả theo isAuthenticated 

  function login() {
    localStorage.setItem(AUTH_STORAGE_KEY, "true");
    setIsAuthenticated(true);
  }

  //set trganjg tash 

  function logout() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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