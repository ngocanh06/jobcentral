import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import ZaloChatWidget from "../components/ZaloWidget";
import FeedbackWidget from "../components/FeedBack";
export default function RecruiterLayout() {
  const { pathname } = useLocation();
  const isMessagesPage = pathname.toLowerCase().endsWith("/tin-nhan");
  const isChatBox = pathname.toLowerCase().endsWith("/chatbox");

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <NavBar />
        <main className={`flex-1 min-h-0 ${isChatBox ? "overflow-hidden" : "overflow-auto"}`}>
          <Outlet />
          {!isMessagesPage && !isChatBox && <Footer />}
          {!isMessagesPage && <ZaloChatWidget/>}
          <FeedbackWidget/>
        </main>
      </div>
    </div>
  );
}
