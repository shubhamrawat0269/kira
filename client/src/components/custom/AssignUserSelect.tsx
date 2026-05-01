import type { Member } from "@/types/project";
import { assignTask } from "@/services/task";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  taskId: string;
  members: Member[];
  assignedTo?: string;
  onAssign: (userId: string) => void;
}

export default function AssignUserSelect({
  taskId,
  members,
  assignedTo,
  onAssign,
}: Props) {
  const handleAssign = async (userId: string) => {
    try {
      await assignTask(taskId, userId);
      onAssign(userId);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Select onValueChange={(value) => handleAssign(value)} defaultValue={assignedTo}>
      <SelectTrigger className="w-full mt-2">
        <SelectValue placeholder="Assign user" />
      </SelectTrigger>

      <SelectContent>
        {members.map((m) => (
          <SelectItem key={m.user._id} value={m.user._id}>
            {m.user.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
