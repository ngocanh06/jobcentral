import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import RecruiterLayout from "./layouts/RecruiterLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import PublicLayout from "./layouts/PublicLayout";

// =========================
// AUTH PAGES
// =========================
import Register from "./pages/auth/Register";
import LogIn from "./pages/auth/LogIn";

// =========================
// EMPLOYER / RECRUITER PAGES
// =========================
import DashBoard from "./pages/employer/DashBoard";
import TaoTinTuyenDung, {
  JobPostingOptions,
} from "./pages/employer/Tao-tin-tuyen-dung";
import QuanLiTinTuyenDung from "./pages/employer/quan-li-tin-tuyen-dung";
import QuanLiUngVien from "./pages/employer/quan-li-ung-vien";
import TruthScore from "./pages/employer/Truth-Score";
import LichPhongVan from "./pages/employer/lich-phong-van";
import EmailMau from "./pages/employer/Email-mau";
import TinNhan from "./pages/employer/tin-nhan";
import GoiDichVu from "./pages/employer/goi-dich-vu";
import QuanLiTaiKhoan from "./pages/employer/quan-li-tai-khoan";
import CaiDat from "./pages/employer/SysPages/Cai-dat";
import HoTro from "./pages/employer/SysPages/Ho-tro";
import Intro from "./pages/employer/Intro-signup-in/Intro";
import CamNang from "./pages/employer/Intro-signup-in/cam-nang";
import ChatBox from "./pages/employer/ChatBox";
import HintUngVien from "./pages/employer/HintUngVien";
import Hirablogcards from "./pages/employer/Intro-signup-in/Hirablogcards";

// =========================
// CANDIDATE PAGES
// =========================
import CandidatePortal from "./pages/candidate/CandidatePortal";

// =========================
// ADMIN PAGES
// =========================
import AdminDashboard from "./pages/admin/AdminDashboard";
import JobModeration from "./pages/admin/JobModeration";
import UserManagement from "./pages/admin/UserManagement";
import PaymentManagement from "./pages/admin/PaymentManagement";
import AdminReports from "./pages/admin/AdminReports";
import BlacklistManagement from "./pages/admin/BlacklistManagement";
import CategoryManagement from "./pages/admin/CategoryManagement";
import ContentManagement from "./pages/admin/ContentManagement";
import Monitoring from "./pages/admin/Monitoring";
import SupportManagement from "./pages/admin/SupportManagement";
import SystemConfig from "./pages/admin/SystemConfig";

import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { PermissionProvider } from "./context/PermissionContext";

function RecruiterHomeRoute() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Navigate to="/Dashboard" replace /> : <Intro />;
}

function ProtectedRecruiterLayout() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <RecruiterLayout />
  ) : (
    <Navigate to="/LogIn" replace />
  );
}

const recruiterRoutes = [
  {
    path: "Dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashBoard />,
      },
      {
        path: "Tao-tin-tuyen-dung",
        element: <JobPostingOptions />,
      },
      {
        path: "Tao-tin-tuyen-dung/ai",
        element: <TaoTinTuyenDung mode="ai" />,
      },
      {
        path: "Tao-tin-tuyen-dung/manual",
        element: <TaoTinTuyenDung mode="manual" />,
      },
      {
        path: "Quan-li-tin-tuyen-dung",
        element: <QuanLiTinTuyenDung />,
        children: [
          {
            path: "Tao-tin-tuyen-dung",
            element: <JobPostingOptions />,
          },
        ],
      },
      {
        path: "Quan-li-ung-vien",
        element: <QuanLiUngVien />,
      },
      {
        path: "Hint-Ung-Vien",
        element: <HintUngVien />,
      },
      {
        path: "Truth-Score",
        element: <TruthScore />,
      },
      {
        path: "Lich-phong-van",
        element: <LichPhongVan />,
      },
      {
        path: "Email-mau",
        element: <EmailMau />,
      },
      {
        path: "Tin-nhan",
        element: <TinNhan />,
      },
      {
        path: "Goi-dich-vu",
        element: <GoiDichVu />,
      },
      {
        path: "Quan-li-tai-khoan",
        element: <QuanLiTaiKhoan />,
      },
      {
        path: "Cai-dat",
        element: <CaiDat />,
      },
      {
        path: "Ho-tro",
        element: <HoTro />,
      },
      {
        path: "ChatBox",
        element: <ChatBox />,
      },
    ],
  },
];

const router = createBrowserRouter([
  // =========================
  // 1. CỔNG ỨNG VIÊN (CANDIDATE)
  // =========================
  {
    path: "/",
    element: <CandidatePortal />,
  },
  {
    path: "/jobs",
    element: <CandidatePortal />,
  },
  {
    path: "/companies",
    element: <CandidatePortal />,
  },

  // =========================
  // 2. CỔNG NHÀ TUYỂN DỤNG (EMPLOYER)
  // =========================
  {
    path: "/recruiter",
    element: <RecruiterHomeRoute />,
  },
  {
    path: "/recruiter/intro",
    element: <Intro />,
  },
  {
    path: "/Register",
    element: <Register />,
  },
  {
    path: "/LogIn",
    element: <LogIn />,
  },
  {
    path: "/Cam-nang-tuyen-dung",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <CamNang />,
      },
    ],
  },
  {
    path: "/Ho-tro-intro",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <HoTro />,
      },
    ],
  },
  {
    path: "/Hira-blog-cards",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <Hirablogcards />,
      },
    ],
  },
  {
    element: <ProtectedRecruiterLayout />,
    children: recruiterRoutes,
  },

  // =========================
  // 3. CỔNG QUẢN TRỊ VIÊN (ADMIN)
  // =========================
  {
    path: "/admin",
    element: <Navigate to="/admin/dashboard" replace />,
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/admin/users",
    element: <UserManagement />,
  },
  {
    path: "/admin/jobs",
    element: <JobModeration />,
  },
  {
    path: "/admin/payments",
    element: <PaymentManagement />,
  },
  {
    path: "/admin/reports",
    element: <AdminReports />,
  },
  {
    path: "/admin/blacklist",
    element: <BlacklistManagement />,
  },
  {
    path: "/admin/categories",
    element: <CategoryManagement />,
  },
  {
    path: "/admin/content",
    element: <ContentManagement />,
  },
  {
    path: "/admin/monitoring",
    element: <Monitoring />,
  },
  {
    path: "/admin/support",
    element: <SupportManagement />,
  },
  {
    path: "/admin/system",
    element: <SystemConfig />,
  },
]);

function App() {
  return (
    <AuthProvider>
      <PermissionProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </PermissionProvider>
    </AuthProvider>
  );
}

export default App;
