import type { Task } from "@/types/task";
import type { Member } from "@/types/project";

import AssignUserSelect from "./AssignUserSelect";
import { Calendar, EllipsisVertical } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  task: Task;
  members: Member[];
  onStatusChange: (id: string, status: Task["status"]) => void;
  onAssign: (taskId: string, userId: string) => void;
}

export default function TaskCard({
  task,
  members,
  onStatusChange,
  onAssign,
}: Props) {
  console.log(task);
  return (
    <div className="group bg-white p-3 rounded shadow mb-3">
      <div className="flex items-center gap-2 h-10">
        <h3 className="font-medium">{task.title}</h3>

        <Button variant="ghost" size="sm" className="ml-auto p-1 cursor-pointer hidden group-hover:flex">
          <EllipsisVertical size={16} />
        </Button>
      </div>
      <div className="inline-flex gap-1 items-center text-xs text-gray-600 border px-2 py-1 rounded-md">
        <span>
          <Calendar size={14} />
        </span>
        {new Date(task.createdAt).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </div>

      <div className="flex justify-between items-center">
        {/* Status */}
        <select
          className="w-24 border rounded p-1 mt-2"
          value={task.status}
          onChange={(e) =>
            onStatusChange(task._id, e.target.value as Task["status"])
          }
        >
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        {/* Assigned User */}
        {/* <p className="text-xs mt-2 text-gray-600">
          Assigned: {task.assignedTo?.name || "Unassigned"}
        </p> */}

        {/* Assign Dropdown */}
        <AssignUserSelect
          taskId={task._id}
          members={members}
          assignedTo={task.assignedTo?._id}
          onAssign={(userId) => onAssign(task._id, userId)}
        />
      </div>
    </div>
  );
}
