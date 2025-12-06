/// <reference types="vite/client" />
import { create } from "zustand";
import axios from "axios";

interface SocialsState {
  id: string | null;
  url: string | null | undefined;
  setUrl: (url: string) => void;
  platform_name: string | null;
  setPlatformName: (platform_name: string) => void;
  handle: string | null;
  setHandle: (handle: string) => void;
  socials: {
    id: string;
    platform_name: string;
    url: string;
    handle: string;
  }[] | null;
  getSocials: () => void;
  uploadSocials: () => void;
  updateSocials: () => void;
  deleteSocials: (id: string) => Promise<void>;
  isStored: boolean;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

export const useSocialsStore = create<SocialsState>((set) => ({
  id: null,
  url: null,
  isStored: false,
  setUrl: (url: string) => set({ url }),
  platform_name: null,
  setPlatformName: (platform_name: string) => set({ platform_name }),
  handle: null,
  setHandle: (handle: string) => set({ handle }),
  socials: null,

  isModalOpen: false,
  setIsModalOpen: (isOpen: boolean) => set({ isModalOpen: isOpen }),

  //   upload Socials
  uploadSocials: async () => {
    const { platform_name, handle, url } = useSocialsStore.getState();

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/social`,
        {
          url,
          platform_name,
          handle,
        }
      );
      console.log(data);

      set({ isStored: true, isModalOpen: false, id: data.id });
      await useSocialsStore.getState().getSocials();
    } catch (error) {
      console.log(error);
      set({ isModalOpen: true }); // Keep modal open on error
    }
  },

  //   get Socials

  getSocials: async () => {
    const { id } = useSocialsStore.getState();
    try {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/social`);
      console.log(data);
      
      set({ socials: data, isStored: true, isModalOpen: false });
    } catch (error) {
      console.log(error);
    }
  },

  updateSocials: async () => {
    const { url, platform_name, handle } = useSocialsStore.getState();

    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/social`,
        {
          url,
          platform_name,
          handle,
        }
      );
      set({ url: data.url, isStored: true, isModalOpen: false });
      await useSocialsStore.getState().getSocials();
    } catch (error) {
      console.log(error);
      set({ isModalOpen: true }); // Keep modal open on error
    }
  },

  deleteSocials: async (id: string) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/social/${id}`);
      set({ url: null, isStored: false, isModalOpen: false });
      await useSocialsStore.getState().getSocials();
    } catch (error) {
      console.log(error);
    }
  },
}));
