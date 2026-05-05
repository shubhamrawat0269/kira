import { useState } from "react";
import Navbar from "@/components/custom/Navbar";
import { Outlet } from "react-router-dom";
import SideMenu from "@/components/custom/SideMenu";
import CreateProjectModal from "@/components/custom/CreateProjectModal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setOpenProjectCreationModal } from "@/store/slices/projectSlice";

function DashboardLayout() {
  const token = JSON.parse(localStorage.getItem("token") || "null");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const dispatch = useAppDispatch();
  const { openProjectCreationModal } = useAppSelector((state) => state.project);

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

      <CreateProjectModal
        open={openProjectCreationModal}
        setOpen={(open) => dispatch(setOpenProjectCreationModal(open))}
      />
    </div>
  );
}

export default DashboardLayout;
