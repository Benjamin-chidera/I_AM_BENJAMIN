/// <reference types="vite/client" />
import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";


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
  isUpdating: boolean; // NEW
}

export const useResumeStore = create<ResumeState>((set) => ({
  url: null,
  isStored: false,
  isUpdating: false, // NEW
  setUrl: (url: string) => set({ url }),
  isModalOpen: false,
  setIsModalOpen: (isOpen: boolean) => set({ isModalOpen: isOpen }),
  uploadedUrl: null,
  message: null,

  uploadResume: async () => {
    set({ isUpdating: true });
    const { url } = useResumeStore.getState();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/resume`,
        { url }
      );
      set({
        url: data.url,
        isStored: true,
        isModalOpen: false,
        isUpdating: false,
      });
      toast.success(data.message || "Resume uploaded successfully!");
      await useResumeStore.getState().getResume();
    } catch (error) {
      console.log(error);
      set({
        isModalOpen: true,
        isUpdating: false,
      });
      toast.error((error as any).response?.data?.error || "Failed to upload resume.");
    }
  },

  getResume: async () => {
    set({ isUpdating: true });
    try {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/resume`);
      set({
        url: data.url,
        isStored: true,
        isModalOpen: false,
        isUpdating: false,
      });
    } catch (error) {
      console.log(error);
      set({ isUpdating: false });
    }
  },

  updateResume: async () => {
    set({ isUpdating: true });
    const { url } = useResumeStore.getState();
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/resume`,
        { url }
      );
      set({
        url: data.url,
        isStored: true,
        isModalOpen: false,
        isUpdating: false,
      });
      toast.success(data.message || "Resume updated successfully!");
      await useResumeStore.getState().getResume();
    } catch (error) {
      console.log(error);
      set({ isModalOpen: true, isUpdating: false});
    }
  },

  deleteResume: async () => {
    set({ isUpdating: true });
    try {
      const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/resume`);
      set({
        url: null,
        isStored: false,
        isModalOpen: false,
        isUpdating: false,
      });
      toast.success(data.message || "Resume deleted successfully!");
    } catch (error) {
      console.log(error);
      toast.error((error as any).response?.data?.error || "Failed to delete resume.");
      set({ isUpdating: false });
    }
  },
}));
