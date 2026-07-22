import SideBar from "../components/SideBar";
import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";

export default function RecruiterLayout() {
  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-1 flex flex-col">
        <NavBar />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}