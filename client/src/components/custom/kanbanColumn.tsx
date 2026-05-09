import TaskCard from "./TaskCard";
import { Button } from "../ui/button";
import type { Task } from "@/types/task";
import type { Member } from "@/types/project";
import {
  setOpenTaskModal,
  setSelectedProjectId,
} from "@/store/slices/projectSlice";
import { useAppDispatch } from "@/store/hooks";
import { Skeleton } from "../ui/skeleton";
import { useParams } from "react-router-dom";
import { modalCallbacks } from "@/layouts/DashboardLayout";

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
  const dispatch = useAppDispatch();
  const { projectId } = useParams<{ projectId: string }>();

  const handleCreateTask = () => {
    if (projectId) {
      modalCallbacks.onCreateTaskSuccess = () => {
        // refresh callback can be set by parent
      };
      dispatch(setSelectedProjectId(projectId));
      dispatch(setOpenTaskModal(true));
    }
  };

  return (
    <div
      className={`bg-gray-100 rounded p-4 w-full ${tasks.length === 0 ? "min-h-30" : ""}`}
    >
      <h2 className="font-semibold mb-3">
        {title}{" "}
        {title === "Todo" && (
          <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-sm">
            {tasks.length}
          </span>
        )}
      </h2>

      {tasks.length > 0 ? (
        tasks
          .filter((task) => task.status === status)
          .map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              members={members}
              onStatusChange={onStatusChange}
              onAssign={onAssign}
            />
          ))
      ) : (
        <Skeleton className="h-40 w-64 bg-gray-200" />
      )}

      {title === "Todo" && (
        <Button
          onClick={handleCreateTask}
          className="bg-transparent text-gray-400 hover:bg-gray-200 transition-all hover:text-black w-full px-2 py-5 cursor-pointer rounded-none"
        >
          + Create Task
        </Button>
      )}
    </div>
  );
}
