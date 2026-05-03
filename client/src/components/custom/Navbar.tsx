import { Search, Wheat } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

type NavbarProps = {
  toggleSidebar: () => void;
};

export default function Navbar({ toggleSidebar }: NavbarProps) {
  const navigate = useNavigate();

  const token = JSON.parse(localStorage.getItem("token") || "null");
  const user = JSON.parse(localStorage.getItem("userDetails") || "null");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userDetails");
    navigate("/");
  };

  return (
    <nav className="w-full border-b bg-background px-4 py-2 flex items-center justify-between">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="cursor-pointer"
          onClick={toggleSidebar}
        >
          <Wheat className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-bold hidden sm:block">Kira.</h1>
      </div>

      <div className="flex-1 max-w-xl mx-4 hidden md:flex items-center">
        <Input placeholder="Search" className="rounded-none" />
        <Button
          variant="secondary"
          className={"rounded-none bg-blue-500 hover:bg-blue-600 text-white"}
          size="icon"
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-3">
        {token ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="cursor-pointer">
                <AvatarImage src="/avatar.png" alt="User Avatar" />
                <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
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
    </nav>
  );
}
