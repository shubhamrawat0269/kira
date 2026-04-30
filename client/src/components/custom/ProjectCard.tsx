import { Card, CardContent } from "@/components/ui/card";
import type { Project } from "@/types/project";

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  return (
    <Card className="hover:shadow-lg transition cursor-pointer">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold">{project.name}</h2>

        <p className="text-sm text-gray-500 mt-2">
          {project.description || "No description"}
        </p>
      </CardContent>
    </Card>
  );
}
