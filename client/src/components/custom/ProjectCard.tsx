import { Card, CardContent } from "@/components/ui/card";
import type { Project } from "@/types/project";
import { useNavigate } from "react-router-dom";

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  const navigate = useNavigate();

  function handleNaviateToProjectDetail(id: string) {
    navigate(`/project/${id}`);
  }
  return (
    <Card
      className="group cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1 border"
      onClick={() => handleNaviateToProjectDetail(project._id)}
    >
      <CardContent className="p-5 space-y-4">
        {/* Top Section */}
        <div className="flex items-start justify-between">
          {/* Project Icon */}
          <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
            {project.name.charAt(0).toUpperCase()}
          </div>

          {/* Optional Badge */}
          <span className="text-xs px-2 py-1 bg-gray-100 rounded">Project</span>
        </div>

        {/* Title */}
        <div>
          <h2 className="text-base font-semibold group-hover:text-blue-600 transition">
            {project.name}
          </h2>

          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {project.description || "No description"}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
          {/* Members (placeholder for now) */}
          <div className="flex items-center gap-1">
            👥 <span>3 members</span>
          </div>

          {/* Tasks (placeholder) */}
          <div className="flex items-center gap-1">
            📋 <span>12 tasks</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
