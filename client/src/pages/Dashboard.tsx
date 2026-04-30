import { useEffect, useState } from "react";
import API from "@/lib/api";

import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/custom/ProjectCard";
import CreateProjectModal from "@/components/custom/CreateProjectModal";

import type { GetProjectsResponse, Project } from "@/types/project";

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const fetchProjects = async () => {
    try {
      const res = await API.get<GetProjectsResponse>(
        "/api/project/get-project",
      );
      setProjects(res.data.projects);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <Button onClick={() => setOpen(true)}>+ Create Project</Button>
      </div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <p className="text-gray-500">No projects yet</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
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
