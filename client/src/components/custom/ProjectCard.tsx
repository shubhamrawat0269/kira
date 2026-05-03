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
      className="group cursor-pointer border rounded-sm"
      onClick={() => handleNaviateToProjectDetail(project._id)}
    >
      <CardContent>
        <div>
          <h2 className="text-base font-semibold group-hover:text-blue-600 transition">
            {project.name}
          </h2>

          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            Software Space
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
