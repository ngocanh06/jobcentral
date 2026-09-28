import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RecruiterLayout from "./layouts/RecruiterLayout";
import Register from "./pages/Register";
import DashBoard from "./pages/DashBoard";
import TaoTinTuyenDung from "./pages/Tao-tin-tuyen-dung";
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
import CamNang from "./pages/Intro-signup-in/cam-nang"
import ChatBox from "./pages/ChatBox"
import HintUngVien from "./pages/HintUngVien";
import { ThemeProvider } from "./context/ThemeContext";
import { element } from "prop-types";


const recruiterRoutes = [

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
    element: <ChatBox/>
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <Intro />,
  },
  {
    path: "/Ho-tro-intro",
    element: <HoTro/>
  },
  {
    path: "/Register",
    element: <Register />,
  },

  {
    path: "/LogIn",
    element: <LogIn/>
  },
  {
    path:"/Cam-nang-tuyen-dung",
    element : <CamNang/>
  },
  {
    element: <RecruiterLayout />,
    children: recruiterRoutes,
  },
]);

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
