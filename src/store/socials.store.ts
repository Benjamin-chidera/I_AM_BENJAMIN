/// <reference types="vite/client" />
import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

interface SocialsState {
  id: string | null;
  url: string | null | undefined;
  setUrl: (url: string) => void;
  platform_name: string | null;
  setPlatformName: (platform_name: string) => void;
  handle: string | null;
  setHandle: (handle: string) => void;
  socials:
    | {
        id: string;
        platform_name: string;
        url: string;
        handle: string;
      }[]
    | null;
  getSocials: () => void;
  uploadSocials: () => void;
  updateSocials: () => void;
  deleteSocials: (id: string) => Promise<void>;
  isStored: boolean;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  loading: boolean; // New loading state
  setLoading: (loading: boolean) => void; // New setter for loading state
}

export const useSocialsStore = create<SocialsState>((set) => ({
  id: null,
  url: null,
  isStored: false,
  loading: false, // Initialize loading state
  setLoading: (loading: boolean) => set({ loading }), // Setter for loading state
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
    set({ loading: true }); // Set loading to true
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
      toast.success(data.message); // Success toast
      set({ isStored: true, isModalOpen: false, id: data.id });
      await useSocialsStore.getState().getSocials();
    } catch (error) {
      console.log(error);
      toast.error(
        (error as any).response?.data?.error || "Failed to delete resume."
      );

      set({ isModalOpen: true }); // Keep modal open on error
    } finally {
      set({ loading: false }); // Set loading to false
    }
  },

  //   get Socials
  getSocials: async () => {
    set({ loading: true }); // Set loading to true
    try {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/social`);
      // console.log(data);
      set({ socials: data, isStored: true, isModalOpen: false });
    } catch (error) {
      console.log(error);
      toast.error(
        (error as any).response?.data?.error || "Failed to fetch socials."
      ); // Error toast
    } finally {
      set({ loading: false }); // Set loading to false
    }
  },

  updateSocials: async () => {
    set({ loading: true }); // Set loading to true
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
      toast.success(data.message); // Success toast
      set({ url: data.url, isStored: true, isModalOpen: false });
      await useSocialsStore.getState().getSocials();
    } catch (error) {
      console.log(error);
      toast.error(
        // Error toast
        (error as any).response?.data?.error || "Failed to update social."
      ); // Error toast

      set({ isModalOpen: true }); // Keep modal open on error
    } finally {
      set({ loading: false }); // Set loading to false
    }
  },

  deleteSocials: async (id: string) => {
    set({ loading: true }); // Set loading to true
    try {
      const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/social/${id}`);
      toast.success(data.message); // Success toast
      set({ url: null, isStored: false, isModalOpen: false });
      await useSocialsStore.getState().getSocials();
    } catch (error) {
      console.log(error);
      toast.error(
        (error as any).response?.data?.error || "Failed to delete social."
      ); // Error toast
    } finally {
      set({ loading: false }); // Set loading to false
    }
  },
}));
