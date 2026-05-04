import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import JiraProjectImage from "@/assets/jira-project-icon.svg";
import API from "@/lib/api";
import type { Task } from "@/types/task";
import type { Member, Project } from "@/types/project";
import KanbanColumn from "@/components/custom/kanbanColumn";
import { Button } from "@/components/ui/button";
import AddMemberModal from "@/components/custom/AddMemberModal";
import CreateTaskModal from "@/components/custom/CreateTaskModal";
import { setOpenTaskModal } from "@/store/slices/projectSlice";
import { useAppSelector } from "@/store/hooks";

export default function ProjectDetail() {
  const { openTaskModal } = useAppSelector((state) => state.project);
  const { projectId } = useParams<{ projectId: string }>();
  const [members, setMembers] = useState<Member[]>([]);
  const [project, setProject] = useState<Project>({});
  const [openMemberModal, setOpenMemberModal] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    try {
      const res = await API.get(`/api/task/${projectId}`);
      setTasks(res.data.tasks);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAssign = (taskId: string, userId: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t._id === taskId
          ? {
              ...t,
              assignedTo: members.find((m) => m.user._id === userId)?.user,
            }
          : t,
      ),
    );
  };

  const fetchProject = async () => {
    try {
      const res = await API.get(`/api/project/${projectId}`);
      setProject(res.data.project);
      setMembers(res.data?.project?.members || []);
    } catch (err) {
      console.error(err);
      setMembers([]);
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
    fetchProject();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex justify-between flex-col mb-6">
          <p className="text-sm">Spaces</p>
          <div className="flex items-center gap-2 py-2">
            <img src={JiraProjectImage} alt="Logo" className="w-8 h-8" />
            <h1 className="text-xl font-bold">
              {project?.name || "My Project Space"}
            </h1>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold">Members</h2>

          <Button onClick={() => setOpenMemberModal(true)}>+ Add Member</Button>
        </div>

        <div className="flex gap-2 flex-wrap">
          {members.map((m) => (
            <span
              key={m.user._id}
              className="bg-gray-200 px-3 py-1 rounded text-sm"
            >
              {m.user.name}
            </span>
          ))}
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-6">Project Board</h1>

      <div className="grid md:grid-cols-4 gap-4">
        <KanbanColumn
          title="Todo"
          status="todo"
          tasks={tasks}
          members={members}
          onStatusChange={updateStatus}
          onAssign={handleAssign}
        />

        <KanbanColumn
          title="In Progress"
          status="in-progress"
          tasks={tasks}
          members={members}
          onStatusChange={updateStatus}
          onAssign={handleAssign}
        />

        <KanbanColumn
          title="In Review"
          status="done"
          tasks={tasks}
          members={members}
          onStatusChange={updateStatus}
          onAssign={handleAssign}
        />

        <KanbanColumn
          title="Done"
          status="done"
          tasks={tasks}
          members={members}
          onStatusChange={updateStatus}
          onAssign={handleAssign}
        />
      </div>

      <AddMemberModal
        open={openMemberModal}
        setOpen={setOpenMemberModal}
        projectId={projectId!}
        onSuccess={fetchProject}
      />

      <CreateTaskModal
        open={openTaskModal}
        setOpen={setOpenTaskModal}
        projectId={projectId!}
        onSuccess={fetchTasks}
      />
    </div>
  );
}
