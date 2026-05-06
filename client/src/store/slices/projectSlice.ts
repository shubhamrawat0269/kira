import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Project } from "@/types/project";

interface ProjectState {
  projects: Project[];
  loading: boolean;
  openProjectCreationModal: boolean;
  openTaskModal: boolean;
  openMemberModal: boolean;
  selectedProjectId: string | null;
}

const initialState: ProjectState = {
  projects: [],
  loading: false,
  openTaskModal: false,
  openMemberModal: false,
  openProjectCreationModal: false,
  selectedProjectId: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    },
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.unshift(action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setOpenProjectCreationModal: (state, action: PayloadAction<boolean>) => {
      state.openProjectCreationModal = action.payload;
    },
    setOpenTaskModal: (state, action: PayloadAction<boolean>) => {
      state.openTaskModal = action.payload;
    },
    setOpenMemberModal: (state, action: PayloadAction<boolean>) => {
      state.openMemberModal = action.payload;
    },
    setSelectedProjectId: (state, action: PayloadAction<string | null>) => {
      state.selectedProjectId = action.payload;
    },
  },
});

export const {
  setProjects,
  addProject,
  setLoading,
  setOpenTaskModal,
  setOpenMemberModal,
  setOpenProjectCreationModal,
  setSelectedProjectId,
} = projectSlice.actions;
export default projectSlice.reducer;
