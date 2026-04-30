import { Card, CardContent } from "@/components/ui/card";
import type { Task } from "@/types/task";

interface Props {
  task: Task;
  onStatusChange: (id: string, status: Task["status"]) => void;
}

export default function TaskCard({ task, onStatusChange }: Props) {
  return (
    <Card className="mb-3">
      <CardContent className="p-3 space-y-2">
        <h3 className="font-medium">{task.title}</h3>

        <p className="text-sm text-gray-500">
          {task.description || "No description"}
        </p>

        {/* Quick Status Change */}
        <select
          className="w-full border rounded p-1 text-sm"
          value={task.status}
          onChange={(e) =>
            onStatusChange(task._id, e.target.value as Task["status"])
          }
        >
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </CardContent>
    </Card>
  );
}
