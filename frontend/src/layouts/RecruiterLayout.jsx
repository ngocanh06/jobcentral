import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import ZaloChatWidget from "../components/ZaloWidget";

export default function RecruiterLayout() {
  const { pathname } = useLocation();
  const isMessagesPage = pathname.toLowerCase().endsWith("/tin-nhan");

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <NavBar />
        <main className="flex-1 overflow-auto">
          <Outlet />
          {!isMessagesPage && <Footer />}
          {!isMessagesPage && <ZaloChatWidget/>}
        </main>
      </div>
    </div>
  );
}
