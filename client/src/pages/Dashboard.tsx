import { useEffect, useState } from "react";
import API from "@/lib/api";

import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/custom/ProjectCard";
import CreateProjectModal from "@/components/custom/CreateProjectModal";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setOpenProjectCreationModal } from "@/store/slices/projectSlice";
import type { GetProjectsResponse, Project } from "@/types/project";

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const { openProjectCreationModal } = useAppSelector((state) => state.project);
  const [projects, setProjects] = useState<Project[]>([]);
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
          <h1 className="text-gray-500 text-base">
            Manage your projects and tasks
          </h1>
        </div>

        <p className="text-sm hover:underline transition cursor-pointer">View All Spaces</p>
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
        open={openProjectCreationModal}
        setOpen={(open) => dispatch(setOpenProjectCreationModal(open))}
        onSuccess={fetchProjects}
      />
    </div>
  );
}
