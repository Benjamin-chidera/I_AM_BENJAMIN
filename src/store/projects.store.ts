/// <reference types="vite/client" />
import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

interface Project {
  id: string;
  title: string;
  description: string;
  github_url: string;
  live_url: string;
  project_status: string;
  tools_used: string;
  project_image: string;
}

interface ProjectsState {
  projects: Project[];
  isUpdating: boolean;
  title: string | null;
  setTitle: (title: string) => void;
  description: string | null;
  setDescription: (description: string) => void;
  github_url: string | null;
  setGithubUrl: (github_url: string) => void;
  live_url: string | null;
  setLiveUrl: (live_url: string) => void;
  project_status: string | null;
  setProjectStatus: (project_status: string) => void;
  tools_used: string;
  setToolsUsed: (tools_used: string) => void;
  project_image: string | File | null;
  setProjectImage: (project_image: string | File) => void;
  preview: string | null;
  setPreview: (preview: string) => void;
  currentProjectId: string | null;
  setCurrentProjectId: (id: string | null) => void;
  getProjects: () => void;
  createProject: () => void;
  updateProject: () => void;
  deleteProject: (id: string) => void;
  clearForm: () => void;
  isStored: boolean;
}

export const useProjectsStore = create<ProjectsState>((set) => ({
  projects: [],
  isUpdating: false,
  isStored: false,
  title: null,
  setTitle: (title: string) => set({ title }),
  description: null,
  setDescription: (description: string) => set({ description }),
  github_url: null,
  setGithubUrl: (github_url: string) => set({ github_url }),
  live_url: null,
  setLiveUrl: (live_url: string) => set({ live_url }),
  project_status: null,
  setProjectStatus: (project_status: string) => set({ project_status }),
  tools_used: "",
  setToolsUsed: (tools_used: string) => set({ tools_used }),
  project_image: null,
  setProjectImage: (project_image: string | File) => set({ project_image }),
  preview: null,
  setPreview: (preview: string) => set({ preview }),
  currentProjectId: null,
  setCurrentProjectId: (id: string | null) => set({ currentProjectId: id }),

  clearForm: () =>
    set({
      title: null,
      description: null,
      github_url: null,
      live_url: null,
      project_status: null,
      tools_used: "",
      project_image: null,
      preview: null,
      currentProjectId: null,
    }),

  //   create project (POST for new)
  createProject: async () => {
    set({ isUpdating: true });
    const {
      title,
      description,
      github_url,
      live_url,
      project_status,
      tools_used,
      project_image,
    } = useProjectsStore.getState();

    const formData = new FormData();
    formData.append("title", title || "");
    formData.append("description", description || "");
    formData.append("github_url", github_url || "");
    formData.append("live_url", live_url || "");
    formData.append("project_status", project_status || "");
    formData.append("tools_used", tools_used || "");

    if (project_image instanceof File) {
      formData.append("image", project_image);
    } else if (project_image) {
      formData.append("image", project_image as string);
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/projects`,
        formData
      );

      console.log(data);
      toast.success(data.message || "Project created successfully!"); // Success toast

      set({ isStored: true, isUpdating: false });
      useProjectsStore.getState().clearForm();
      await useProjectsStore.getState().getProjects();
    } catch (error) {
      console.log(error);
      toast.error(
        (error as any).response?.data?.error || "Failed to create project."
      ); // Error toast
      set({ isUpdating: false });
    }
  },

  //   update project (PUT for existing)
  updateProject: async () => {
    set({ isUpdating: true });
    const {
      currentProjectId,
      title,
      description,
      github_url,
      live_url,
      project_status,
      tools_used,
      project_image,
    } = useProjectsStore.getState();

    if (!currentProjectId) {
      toast.error("No project selected for update."); // Error toast
      set({ isUpdating: false });
      return;
    }

    const formData = new FormData();
    formData.append("title", title || "");
    formData.append("description", description || "");
    formData.append("github_url", github_url || "");
    formData.append("live_url", live_url || "");
    formData.append("project_status", project_status || "");
    formData.append("tools_used", tools_used || "");

    if (project_image instanceof File) {
      formData.append("image", project_image);
    } else if (project_image) {
      formData.append("image", project_image as string);
    }

    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/projects/${currentProjectId}`,
        formData
      );

      toast.success(data.message || "Project updated successfully!"); // Success toast
      set({ isStored: true, isUpdating: false });
      useProjectsStore.getState().clearForm();
      await useProjectsStore.getState().getProjects();
    } catch (error) {
      console.log(error);
      toast.error(
        (error as any).response?.data?.error || "Failed to update project."
      ); // Error toast
      set({ isUpdating: false });
    }
  },

  //   get all projects
  getProjects: async () => {
    try {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/projects`);

      set({ projects: data, isStored: true });
    } catch (error) {
      console.log(error);
      toast.error(
        (error as any).response?.data?.error || "Failed to fetch projects."
      ); // Error toast
       set({ isUpdating: false, isStored: false });
    }
  },

  //   delete project
  deleteProject: async (id: string) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/projects/${id}`
      );
      toast.success(data.message || "Project deleted successfully!"); // Success toast
      set({ isStored: true });
      await useProjectsStore.getState().getProjects();
    } catch (error) {
      console.log(error);
      set({ isUpdating: false, isStored: false });
      toast.error(
        (error as any).response?.data?.error || "Failed to delete project."
      ); // Error toast
    }
  },
}));
