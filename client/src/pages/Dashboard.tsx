import { useEffect, useState } from "react";
import API from "@/lib/api";

import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/custom/ProjectCard";
import CreateProjectModal from "@/components/custom/CreateProjectModal";

import type { GetProjectsResponse, Project } from "@/types/project";

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await API.get<GetProjectsResponse>(
        "/api/project/get-projects",
      );
      setProjects(res.data.projects);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="px-6 py-3 max-w-387.5 mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500 text-sm">
            Manage your projects and tasks
          </p>
        </div>

        <Button onClick={() => setOpen(true)}>+ Create Project</Button>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-5 gap-6">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-56 bg-gray-200 animate-pulse rounded-lg"
            />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center mt-20">
          <h2 className="text-lg font-semibold mb-2">No projects yet</h2>

          <p className="text-gray-500 mb-4">
            Start by creating your first project
          </p>

          <Button onClick={() => alert("Feature yet to be implemented")}>
            Create Project
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-5 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}

      {/* Modal */}
      <CreateProjectModal
        open={open}
        setOpen={setOpen}
        onSuccess={fetchProjects}
      />
    </div>
  );
}
