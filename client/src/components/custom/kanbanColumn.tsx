import type { Task } from "@/types/task";
import TaskCard from "./TaskCard";
import type { Member } from "@/types/project";


interface Props {
  title: string;
  status: Task["status"];
  tasks: Task[];
  members: Member[];
  onStatusChange: (id: string, status: Task["status"]) => void;
  onAssign: (taskId: string, userId: string) => void;
}

export default function KanbanColumn({
  title,
  status,
  tasks,
  members,
  onStatusChange,
  onAssign,
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
            members={members}
            onStatusChange={onStatusChange}
            onAssign={onAssign}
          />
        ))}
    </div>
  );
}
