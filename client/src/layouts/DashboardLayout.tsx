import { Outlet } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
