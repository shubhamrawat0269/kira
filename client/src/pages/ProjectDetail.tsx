import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import API from "@/lib/api";
import type { Task } from "@/types/task";

import KanbanColumn from "@/components/custom/kanbanColumn";

export default function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();

  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    try {
      const res = await API.get(`/api/task/${projectId}`);
      setTasks(res.data.tasks);
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (taskId: string, status: Task["status"]) => {
    try {
      await API.patch(`/api/task/${taskId}/status`, { status });

      // update locally (no refetch needed)
      setTasks((prev) =>
        prev.map((t) => (t._id === taskId ? { ...t, status } : t)),
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Project Board</h1>

      <div className="grid md:grid-cols-3 gap-4">
        <KanbanColumn
          title="Todo"
          status="todo"
          tasks={tasks}
          onStatusChange={updateStatus}
        />

        <KanbanColumn
          title="In Progress"
          status="in-progress"
          tasks={tasks}
          onStatusChange={updateStatus}
        />

        <KanbanColumn
          title="Done"
          status="done"
          tasks={tasks}
          onStatusChange={updateStatus}
        />
      </div>
    </div>
  );
}
