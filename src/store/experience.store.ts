/// <reference types="vite/client" />
import { create } from "zustand";
import axios from "axios";

interface Experience {
  id: string;
  role: string;
  company_name: string;
  years: string;
  description: string;
  projects_done: string;
}

interface ExperienceState {
  experiences: Experience[];
  isUpdating: boolean;
  isStored: boolean;
  role: string | null;
  setRole: (role: string) => void;
  company_name: string | null;
  setCompanyName: (company_name: string) => void;
  years: string | null;
  setYears: (years: string) => void;
  description: string | null;
  setDescription: (description: string) => void;
  projects_done: string | null;
  setProjectsDone: (projects_done: string) => void;
  currentExperienceId: string | null;
  setCurrentExperienceId: (id: string | null) => void;
  getExperiences: () => void;
  createExperience: () => void;
  updateExperience: () => void;
  deleteExperience: (id: string) => void;
  clearForm: () => void;
}

export const useExperienceStore = create<ExperienceState>((set) => ({
  experiences: [],
  isUpdating: false,
  isStored: false,
  role: null,
  setRole: (role: string) => set({ role }),
  company_name: null,
  setCompanyName: (company_name: string) => set({ company_name }),
  years: null,
  setYears: (years: string) => set({ years }),
  description: null,
  setDescription: (description: string) => set({ description }),
  projects_done: null,
  setProjectsDone: (projects_done: string) => set({ projects_done }),
  currentExperienceId: null,
  setCurrentExperienceId: (id: string | null) =>
    set({ currentExperienceId: id }),

  clearForm: () =>
    set({
      role: null,
      company_name: null,
      years: null,
      description: null,
      projects_done: null,
      currentExperienceId: null,
    }),

  //   create experience (POST for new)
  createExperience: async () => {
    set({ isUpdating: true });
    const { role, company_name, years, description, projects_done } =
      useExperienceStore.getState();

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/experience`,
        {
          role,
          company_name,
          years,
          description,
          projects_done,
        }
      );

      console.log(data);

      set({ isStored: true, isUpdating: false });
      useExperienceStore.getState().clearForm();
      await useExperienceStore.getState().getExperiences();
    } catch (error) {
      console.log(error);
      set({ isUpdating: false });
    }
  },

  //   update experience (PUT for existing)
  updateExperience: async () => {
    set({ isUpdating: true });
    const {
      currentExperienceId,
      role,
      company_name,
      years,
      description,
      projects_done,
    } = useExperienceStore.getState();

    if (!currentExperienceId) {
      set({ isUpdating: false });
      return;
    }

    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/experience/${currentExperienceId}`,
        {
          role,
          company_name,
          years,
          description,
          projects_done,
        }
      );

      set({ isStored: true, isUpdating: false });
      useExperienceStore.getState().clearForm();
      await useExperienceStore.getState().getExperiences();
    } catch (error) {
      console.log(error);
      set({ isUpdating: false });
    }
  },

  //   get all experiences
  getExperiences: async () => {
    try {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/experience`
      );

      set({ experiences: data, isStored: true });
    } catch (error) {
      console.log(error);
    }
  },

  //   delete experience
  deleteExperience: async (id: string) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/experience/${id}`);
      set({ isStored: true });
      await useExperienceStore.getState().getExperiences();
    } catch (error) {
      console.log(error);
    }
  },
}));
