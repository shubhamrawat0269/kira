import { useState } from "react";
import Navbar from "@/components/custom/Navbar";
import { Outlet } from "react-router-dom";
import SideMenu from "@/components/custom/SideMenu";
import CreateProjectModal from "@/components/custom/CreateProjectModal";
import AddMemberModal from "@/components/custom/AddMemberModal";
import CreateTaskModal from "@/components/custom/CreateTaskModal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setOpenProjectCreationModal,
  setOpenTaskModal,
  setOpenMemberModal,
  setSelectedProjectId,
} from "@/store/slices/projectSlice";

export const modalCallbacks = {
  onAddMemberSuccess: undefined as (() => void) | undefined,
  onCreateTaskSuccess: undefined as (() => void) | undefined,
};

function DashboardLayout() {
  const token = JSON.parse(localStorage.getItem("token") || "null");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const dispatch = useAppDispatch();
  const {
    openProjectCreationModal,
    openMemberModal,
    openTaskModal,
    selectedProjectId,
  } = useAppSelector((state) => state.project);

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

      <AddMemberModal
        open={openMemberModal}
        setOpen={(open) => dispatch(setOpenMemberModal(open))}
        projectId={selectedProjectId}
        onSuccess={() => {
          modalCallbacks.onAddMemberSuccess?.();
          dispatch(setSelectedProjectId(null));
        }}
      />

      <CreateTaskModal
        open={openTaskModal}
        setOpen={(open) => dispatch(setOpenTaskModal(open))}
        projectId={selectedProjectId}
        onSuccess={() => {
          modalCallbacks.onCreateTaskSuccess?.();
          dispatch(setSelectedProjectId(null));
        }}
      />
    </div>
  );
}

export default DashboardLayout;
