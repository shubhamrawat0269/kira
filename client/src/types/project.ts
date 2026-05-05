export interface Project {
  _id: string;
  name: string;
  description?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetProjectsResponse {
  status: boolean;
  count: number;
  projects: Project[];
}

export interface CreateProjectModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess?: () => void;
}

export interface FormState {
  name: string;
  description: string;
}

export interface Member {
  user: {
    _id: string;
    name: string;
    email: string;
  };
  role: "admin" | "member";
}
