import type { UserDetail } from "@/types/project";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type UserDropdownProps = {
  user: UserDetail;
  onLogout: () => void;
};

const UserDropdown = ({ user, onLogout }: UserDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer">
          <AvatarImage src="/avatar.png" alt="User Avatar" />
          <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem className="min-w-0">
          <span className="block min-w-0 truncate">
            Welcome, {user?.name?.split(" ")[0]}
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className={"text-red-500 cursor-pointer"}
          onClick={onLogout}
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
