/// <reference types="vite/client" />
import { create } from "zustand";
import axios from "axios";

interface ResumeState {
  url: string | null | undefined;
  setUrl: (url: string) => void;
  getResume: () => void;
  uploadResume: () => void;
  updateResume: () => void;
  deleteResume: () => void;
  isStored: boolean;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

export const useResumeStore = create<ResumeState>((set) => ({
  url: null,
  isStored: false,
  setUrl: (url: string) => set({ url }),
  isModalOpen: false,
  setIsModalOpen: (isOpen: boolean) => set({ isModalOpen: isOpen }),
  uploadedUrl: null,

  //   upload resume
  uploadResume: async () => {
    const { url } = useResumeStore.getState();

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/resume`,
        {
          url,
        }
      );
      set({ url: data.url, isStored: true, isModalOpen: false });
      await useResumeStore.getState().getResume();
    } catch (error) {
      console.log(error);
      set({ isModalOpen: true }); // Keep modal open on error
    }
  },

  //   get resume

  getResume: async () => {
    try {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/resume`);
      set({ url: data.url, isStored: true, isModalOpen: false });
    } catch (error) {
      console.log(error);
    }
  },

  updateResume: async () => {
    const { url } = useResumeStore.getState();

    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/resume`,
        {
          url,
        }
      );
      set({ url: data.url, isStored: true, isModalOpen: false });
      await useResumeStore.getState().getResume();
    } catch (error) {
      console.log(error);
      set({ isModalOpen: true }); // Keep modal open on error
    }
  },

  deleteResume: async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/resume`);
      set({ url: null, isStored: false, isModalOpen: false });
    } catch (error) {
      console.log(error);
    }
  },
}));
