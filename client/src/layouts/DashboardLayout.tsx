import { useState } from "react";
import Navbar from "@/components/custom/Navbar";
import { Outlet } from "react-router-dom";
import SideMenu from "@/components/custom/SideMenu";

function DashboardLayout() {
  const token = JSON.parse(localStorage.getItem("token") || "null");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar Section Here */}
      <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {token && <SideMenu isOpen={isSidebarOpen} />}
        <main className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
