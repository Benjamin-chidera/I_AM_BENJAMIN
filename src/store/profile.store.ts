/// <reference types="vite/client" />
import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

interface SocialsState {
  isUpdating: boolean;
  id: string | null;
  full_name: string | null | undefined;
  setFull_name: (full_name: string) => void;
  headline: string | null;
  setHeadline: (headline: string) => void;
  location: string | null;
  setLocation: (location: string) => void;
  preview: string | null;
  setPreview: (preview: string) => void;
  avatar: string | null;
  setAvatar: (avatar: string) => void;
  profile: {
    id: string;
    full_name: string;
    headline: string;
    location: string;
    profile_image: string;
  } | null;
  getProfile: () => void;
  uploadProfile: () => void;
  updateProfile: () => void;
  isStored: boolean;
}

export const useProfileStore = create<SocialsState>((set) => ({
  isUpdating: false,
  id: null,
  full_name: null,
  isStored: false,
  setFull_name: (full_name: string) => set({ full_name }),
  headline: null,
  setHeadline: (headline: string) => set({ headline }),
  location: null,
  setLocation: (location: string) => set({ location }),
  preview: null,
  setPreview: (preview: string) => set({ preview }),
  avatar: null,
  setAvatar: (avatar: string) => set({ avatar }),
  profile: null,

  //   upload Profile (POST for new)
  uploadProfile: async () => {
    set({ isUpdating: true });
    const { full_name, headline, location, avatar } =
      useProfileStore.getState();
    const formData = new FormData();
    formData.append("full_name", full_name || "");
    formData.append("headline", headline || "");
    formData.append("location", location || "");

    if ((avatar as any) instanceof File) {
      formData.append("image", avatar as unknown as Blob);
    } else if (avatar) {
      formData.append("image", avatar as string);
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/profile`,
        formData
      );

      console.log(data);
      toast.success(data.message || "Profile uploaded successfully!"); // Success toast

      set({ isStored: true, isUpdating: false });
      await useProfileStore.getState().getProfile();
    } catch (error) {
      console.log(error);
      toast.error(
        (error as any).response?.data?.error || "Failed to upload profile."
      ); // Error toast
      set({ isUpdating: false });
    }
  },

  //   update Profile (PATCH for existing)
  updateProfile: async () => {
    set({ isUpdating: true });
    const { full_name, headline, location, avatar } =
      useProfileStore.getState();
    const formData = new FormData();
    formData.append("full_name", full_name || "");
    formData.append("headline", headline || "");
    formData.append("location", location || "");

    if ((avatar as any) instanceof File) {
      formData.append("image", avatar as unknown as Blob);
    } else if (avatar) {
      formData.append("image", avatar as string);
    }

    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/profile`,
        formData
      );
      toast.success(data.message || "Profile updated successfully!"); // Success toast
      set({ profile: data, isStored: true, isUpdating: false });
      await useProfileStore.getState().getProfile();
    } catch (error) {
      console.log(error);
      toast.error(
        (error as any).response?.data?.error || "Failed to update profile."
      ); // Error toast
      set({ isUpdating: false });
    }
  },

  //   get Socials

  getProfile: async () => {
    try {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/profile`);

      set({ profile: data, isStored: true });
    } catch (error) {
      console.log(error);
      toast.error(
        (error as any).response?.data?.error || "Failed to fetch profile."
      ); // Error toast
    }
  },
}));
