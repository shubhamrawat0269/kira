import API from "../lib/api";

export const assignTask = async (taskId: string, userId: string) => {
  return API.patch(`/api/task/${taskId}/assign`, { userId });
};

export const createTask = async (data: {
  title: string;
  description?: string;
  projectId: string;
}) => {
  return API.post("/api/task/create-task", data);
};