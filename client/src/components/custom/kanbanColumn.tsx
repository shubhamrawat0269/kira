import type { Task } from "@/types/task";
import TaskCard from "./TaskCard";

interface Props {
  title: string;
  status: Task["status"];
  tasks: Task[];
  onStatusChange: (id: string, status: Task["status"]) => void;
}

export default function KanbanColumn({
  title,
  status,
  tasks,
  onStatusChange,
}: Props) {
  return (
    <div className="bg-gray-100 rounded p-4 w-full">
      <h2 className="font-semibold mb-3">{title}</h2>

      {tasks
        .filter((task) => task.status === status)
        .map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onStatusChange={onStatusChange}
          />
        ))}
    </div>
  );
}
