import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import RecruiterLayout from "./layouts/RecruiterLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import PublicLayout from "./layouts/PublicLayout";

import Register from "./pages/Register";
import DashBoard from "./pages/DashBoard";
import TaoTinTuyenDung, {
  JobPostingOptions,
} from "./pages/Tao-tin-tuyen-dung";
import QuanLiTinTuyenDung from "./pages/quan-li-tin-tuyen-dung";
import QuanLiUngVien from "./pages/quan-li-ung-vien";
import TruthScore from "./pages/Truth-Score";
import LichPhongVan from "./pages/lich-phong-van";
import EmailMau from "./pages/Email-mau";
import TinNhan from "./pages/tin-nhan";
import GoiDichVu from "./pages/goi-dich-vu";
import QuanLiTaiKhoan from "./pages/quan-li-tai-khoan";
import CaiDat from "./pages/SysPages/Cai-dat";
import HoTro from "./pages/SysPages/Ho-tro";
import Intro from "./pages/Intro-signup-in/Intro";
import LogIn from "./pages/LogIn";
import CamNang from "./pages/Intro-signup-in/cam-nang";
import ChatBox from "./pages/ChatBox";
import HintUngVien from "./pages/HintUngVien";
import Hirablogcards from "./pages/Intro-signup-in/Hirablogcards";

import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";

function HomeRoute() {
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
  // PUBLIC
  // =========================

  {
    path: "/",
    element: <HomeRoute />,
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

  // =========================
  // RECRUITER
  // =========================

  {
    element: <ProtectedRecruiterLayout />,
    children: recruiterRoutes,
  },
]);

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
