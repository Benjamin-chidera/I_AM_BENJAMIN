/// <reference types="vite/client" />
import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

interface AboutState {
  about_me: string | null;
  setAbout_me: (about_me: string) => void;
  getAbout: () => void;
  uploadAbout: () => void;
  updateAbout: () => void;
  isStored: boolean;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  isUpdating: boolean;
}

export const useAboutStore = create<AboutState>((set) => ({
  about_me: null,
  isStored: false,
  isUpdating: false,
  setAbout_me: (about_me: string) => set({ about_me }),
  isModalOpen: false,
  setIsModalOpen: (isOpen: boolean) => set({ isModalOpen: isOpen }),

  //   upload about (POST for new)
  uploadAbout: async () => {
    set({ isUpdating: true });
    const { about_me } = useAboutStore.getState();

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/about`,
        { about_me }
      );
      toast.success(data.message || "About section uploaded successfully!"); // Success toast
      set({
        about_me: data.about_me,
        isStored: true,
        isModalOpen: false,
        isUpdating: false,
      });
      await useAboutStore.getState().getAbout();
    } catch (error) {
      console.log(error);
      toast.error(
        (error as any).response?.data?.error ||
          "Failed to upload about section."
      ); // Error toast
      set({ isModalOpen: true, isUpdating: false });
    }
  },

  //   get about
  getAbout: async () => {
    try {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/about`);

      set({ about_me: data.about_me, isStored: true, isModalOpen: false });
    } catch (error) {
      console.log(error);
      toast.error(
        (error as any).response?.data?.error || "Failed to fetch about section."
      ); // Error toast
      set({ isStored: false }); // No about found
    }
  },

  //   update about (PUT for existing)
  updateAbout: async () => {
    set({ isUpdating: true });
    const { about_me } = useAboutStore.getState();

    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/about`,
        { about_me }
      );

      toast.success(data.message || "About section updated successfully!"); // Success toast
      set({
        about_me: data.about_me,
        isStored: true,
        isModalOpen: false,
        isUpdating: false,
      });
      await useAboutStore.getState().getAbout();
    } catch (error) {
      console.log(error);
      toast.error(
        (error as any).response?.data?.error ||
          "Failed to update about section."
      ); // Error toast
      set({ isModalOpen: true, isUpdating: false });
    }
  },
}));
