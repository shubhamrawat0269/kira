import API from "../lib/api";

export const assignTask = async (taskId: string, userId: string) => {
  return API.patch(`/api/task/${taskId}/assign`, { userId });
};
