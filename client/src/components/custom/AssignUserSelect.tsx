import type { Member } from "@/types/project";
import { assignTask } from "@/services/task";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { User } from "lucide-react";
import { useState } from "react";

interface Props {
  taskId: string;
  members: Member[];
  assignedTo?: string;
  onAssign: (userId: string) => void;
}

export default function AssignUserSelect({ taskId, members, onAssign }: Props) {
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const handleAssign = async (
    userId: string | null,
    userName: string | null,
  ) => {
    if (!userId) return;
    try {
      await assignTask(taskId, userId);
      onAssign(userId);
      setSelectedName(userName);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer">
          <AvatarFallback>
            {selectedName ? selectedName.charAt(0) : <User size={14} />}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        {members.map((m) => (
          <DropdownMenuItem
            key={m.user._id}
            className="min-w-0 cursor-pointer"
            onClick={() => handleAssign(m.user._id, m.user.name)}
          >
            <span className="block min-w-0 truncate">{m.user.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
