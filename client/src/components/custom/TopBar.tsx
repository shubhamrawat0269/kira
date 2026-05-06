import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarGroup } from "@/components/ui/avatar";
import {
  setOpenMemberModal,
  setSelectedProjectId,
} from "@/store/slices/projectSlice";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Search, SlidersHorizontal, User } from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { useParams } from "react-router-dom";
import { modalCallbacks } from "@/layouts/DashboardLayout";
import type { Member } from "@/types/project";

type Props = {
  members: Member[];
  onSearch?: (value: string) => void;
  onFilterClick?: () => void;
};

export default function TopBar({ onSearch, onFilterClick, members }: Props) {
  const dispatch = useAppDispatch();
  const { projectId } = useParams<{ projectId: string }>();

  const handleAddMember = () => {
    if (projectId) {
      modalCallbacks.onAddMemberSuccess = () => {
        // refresh callback can be set by parent
      };
      dispatch(setSelectedProjectId(projectId));
      dispatch(setOpenMemberModal(true));
    }
  };

  return (
    <div className="flex items-center gap-4 p-3 bg-transparent">
      {/* Left: Search */}
      <div className="flex items-center gap-2 border rounded-none px-3 py-1 bg-muted">
        <Search size={16} className="text-muted-foreground" />
        <Input
          placeholder="Search board"
          className="border-none focus-visible:ring-0 shadow-none"
          onChange={(e) => onSearch?.(e.target.value)}
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <AvatarGroup>
          {members.map((m) => (
            <Tooltip>
              <TooltipTrigger>
                <Avatar key={m.user._id} className="h-8 w-8">
                  <AvatarFallback>
                    {m.user.name.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <p>{m.user.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </AvatarGroup>

        {/* Filter Button */}
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={onFilterClick}
        >
          <SlidersHorizontal size={16} />
          Filter
        </Button>
        {/* Add Member Button */}
        <Button
          variant="outline"
          className="flex items-center gap-2 cursor-pointer"
          onClick={handleAddMember}
        >
          <User size={16} />
          Add Member
        </Button>
      </div>
    </div>
  );
}
