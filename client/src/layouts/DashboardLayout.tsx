import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Outlet, useNavigate } from "react-router-dom";

function DashboardLayout() {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token") || "null");
  const user = JSON.parse(localStorage.getItem("userDetails") || "null");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userDetails");
    navigate("/"); 
  };

  return (
    <div className="min-h-screen">
      {/* Navbar Section Here */}
      <div className="flex justify-between items-center px-6 py-4">
        <h1 className="text-xl font-bold">KIRA</h1>

        <div className="space-x-2"> 
          {token ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="/avatar.png" alt="User Avatar" />
                  <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="outline" onClick={() => navigate("/signin")}>
                Login
              </Button>
              <Button onClick={() => navigate("/signup")}>Sign Up</Button>
            </>
          )}
        </div>
      </div>
      {/* Body */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
