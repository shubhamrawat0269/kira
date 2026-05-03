import { useState } from "react";
import Navbar from "@/components/custom/Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/custom/Sidebar";

function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen">
      {/* Navbar Section Here */}
      <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} />
        <main className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
