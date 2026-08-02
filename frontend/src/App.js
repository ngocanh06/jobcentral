import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RecruiterLayout from "./layouts/RecruiterLayout";
import LoginPage from "./pages/LoginPage";
import DashBoard from "./pages/DashBoard";
import TaoTinTuyenDung from "./pages/Tao-tin-tuyen-dung";
import QuanLiTinTuyenDung from "./pages/quan-li-tin-tuyen-dung";
import QuanLiUngVien from "./pages/quan-li-ung-vien";
import BaoCaoTuyenDung from "./pages/bao-cao-tuyen-dung";
import TruthScore from "./pages/Truth-Score";
import LichPhongVan from "./pages/lich-phong-van";
import EmailMau from "./pages/Email-mau";
import TinNhan from "./pages/tin-nhan";
import GoiDichVu from "./pages/goi-dich-vu";
import QuanLiTaiKhoan from "./pages/quan-li-tai-khoan";
import CaiDat from "./pages/SysPages/Cai-dat";
import HoTro from "./pages/SysPages/Ho-tro";

const recruiterRoutes = [
  {
    index: true,
    element: <DashBoard />,
  },
  {
    path: "Dashboard",
    element: <DashBoard />,
  },
  {
    path: "Tao-tin-tuyen-dung",
    element: <TaoTinTuyenDung />,
  },
  {
    path: "Quan-li-tin-tuyen-dung",
    element: <QuanLiTinTuyenDung />,
  },
  {
    path: "Quan-li-ung-vien",
    element: <QuanLiUngVien />,
  },
  {
    path: "Bao-cao-tuyen-dung",
    element: <BaoCaoTuyenDung />,
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
];

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <RecruiterLayout />,
    children: recruiterRoutes,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
