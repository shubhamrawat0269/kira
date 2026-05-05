import { useEffect } from "react";
import API from "@/lib/api";

import { Button } from "@/components/ui/button";
import ProjectCard from "@/components/custom/ProjectCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setLoading, setProjects } from "@/store/slices/projectSlice";
import type { GetProjectsResponse, Project } from "@/types/project";

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const { projects, loading } = useAppSelector((state) => state.project);

  const fetchProjects = async () => {
    dispatch(setLoading(true));
    try {
      const res = await API.get<GetProjectsResponse>(
        "/api/project/get-projects",
      );
      dispatch(setProjects(res.data.projects));
    } catch (err) {
      console.error(err);
    } finally {
      dispatch(setLoading(false));
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
          <h1 className="text-gray-500 text-xl sm:text-base text-center sm:text-left">
            Manage your projects and tasks effectively{" "}
            <span className="sm:hidden">using kira.</span>
          </h1>
          <div className="flex items-center flex-col gap-2 py-4 sm:hidden">
            <Button>Create Space</Button>
            <p className="text-sm">View Space</p>
          </div>
        </div>

        <p className="hidden sm:block text-sm hover:underline transition cursor-pointer">
          View All Spaces
        </p>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-5 gap-6">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-20 bg-gray-200 animate-pulse rounded-lg"
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
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
