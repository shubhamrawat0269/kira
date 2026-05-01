import API from "../lib/api";

export const addUserToProject = async (
  projectId: string,
  email: string
) => {
  return API.post(`/api/project/${projectId}/add-user`, { email });
};