import TaskCard from "./TaskCard";
import { Button } from "../ui/button";
import type { Task } from "@/types/task";
import type { Member } from "@/types/project";
import { setOpenTaskModal } from "@/store/slices/projectSlice";
import { useDispatch } from "react-redux";

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
  const dispatch = useDispatch();

  return (
    <div
      className={`bg-gray-100 rounded p-4 w-full ${tasks.length === 0 ? "min-h-30" : ""}`}
    >
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

      {title === "Todo" && (
        <Button
          onClick={() => dispatch(setOpenTaskModal(true))}
          className="bg-transparent text-gray-400 hover:bg-gray-200 transition-all hover:text-black w-full px-2 py-5 cursor-pointer rounded-none"
        >
          + Create Task
        </Button>
      )}
    </div>
  );
}
