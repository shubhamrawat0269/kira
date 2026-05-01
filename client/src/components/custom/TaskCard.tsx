import type { Task } from "@/types/task";
import type { Member } from "@/types/project";

import AssignUserSelect from "./AssignUserSelect";

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
  return (
    <div className="bg-white p-3 rounded shadow mb-3">
      <h3 className="font-medium">{task.title}</h3>

      <p className="text-sm text-gray-500">
        {task.description || "No description"}
      </p>

      {/* Status */}
      <select
        className="w-full border rounded p-1 mt-2"
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
      <p className="text-xs mt-2 text-gray-600">
        Assigned: {task.assignedTo?.name || "Unassigned"}
      </p>

      {/* Assign Dropdown */}
      <AssignUserSelect
        taskId={task._id}
        members={members}
        assignedTo={task.assignedTo?._id}
        onAssign={(userId) => onAssign(task._id, userId)}
      />
    </div>
  );
}
