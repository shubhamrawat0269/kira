import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Project {
  _id: string;
  name: string;
  description: string;
}

interface ProjectState {
  projects: Project[];
  loading: boolean;
  openProjectCreationModal: boolean;
  openTaskModal: boolean;
}

const initialState: ProjectState = {
  projects: [],
  loading: false,
  openTaskModal: false,
  openProjectCreationModal: false,
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
  },
});

export const {
  setProjects,
  addProject,
  setLoading,
  setOpenTaskModal,
  setOpenProjectCreationModal,
} = projectSlice.actions;
export default projectSlice.reducer;
