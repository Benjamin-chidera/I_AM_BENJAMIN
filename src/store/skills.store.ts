/// <reference types="vite/client" />
import { create } from "zustand";
import axios from "axios";

interface Skill {
  id: string;
  skills_name: string;
  skills_type: "frontend" | "backend" | "ai/ml" | "tools";
  skills_img: string;
}

interface SkillsState {
  skills: Skill[];
  isUpdating: boolean;
  isStored: boolean;
  skills_name: string | null;
  setSkillsName: (skills_name: string) => void;
  skills_type: "frontend" | "backend" | "ai/ml" | "tools" | null;
  setSkillsType: (
    skills_type: "frontend" | "backend" | "ai/ml" | "tools"
  ) => void;
  skills_img: string | File | null;
  setSkillsImg: (skills_img: string | File | null) => void;
  preview: string | null;
  setPreview: (preview: string) => void;
  currentSkillId: string | null;
  setCurrentSkillId: (id: string | null) => void;
  getSkills: () => void;
  createSkill: () => void;
  updateSkill: () => void;
  deleteSkill: (id: string) => void;
  clearForm: () => void;
}

export const useSkillsStore = create<SkillsState>((set) => ({
  skills: [],
  isUpdating: false,
  isStored: false,
  skills_name: null,
  setSkillsName: (skills_name: string) => set({ skills_name }),
  skills_type: null,
  setSkillsType: (skills_type: "frontend" | "backend" | "ai/ml" | "tools") =>
    set({ skills_type }),
  skills_img: null,
  setSkillsImg: (skills_img: string | File | null) => set({ skills_img }),
  preview: null,
  setPreview: (preview: string) => set({ preview }),
  currentSkillId: null,
  setCurrentSkillId: (id: string | null) => set({ currentSkillId: id }),

  clearForm: () =>
    set({
      skills_name: null,
      skills_type: null,
      skills_img: null,
      preview: null,
      currentSkillId: null,
    }),

  //   create skill (POST for new)
  createSkill: async () => {
    set({ isUpdating: true });
    const { skills_name, skills_type, skills_img } = useSkillsStore.getState();

    const formData = new FormData();
    formData.append("skills_name", skills_name || "");
    formData.append("skills_type", skills_type || "");

    if (skills_img instanceof File) {
      formData.append("image", skills_img);
    } else if (skills_img) {
      formData.append("image", skills_img as string);
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/skills`,
        formData
      );

      console.log(data);

      set({ isStored: true, isUpdating: false });
      useSkillsStore.getState().clearForm();
      await useSkillsStore.getState().getSkills();
    } catch (error) {
      console.log(error);
      set({ isUpdating: false });
    }
  },

  //   update skill (PUT for existing)
  updateSkill: async () => {
    set({ isUpdating: true });
    const { currentSkillId, skills_name, skills_type, skills_img } =
      useSkillsStore.getState();

    if (!currentSkillId) {
      set({ isUpdating: false });
      return;
    }

    const formData = new FormData();
    formData.append("skills_name", skills_name || "");
    formData.append("skills_type", skills_type || "");

    if (skills_img instanceof File) {
      formData.append("image", skills_img);
    } else if (skills_img) {
      formData.append("image", skills_img as string);
    }

    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/skills/${currentSkillId}`,
        formData
      );

      set({ isStored: true, isUpdating: false });
      useSkillsStore.getState().clearForm();
      await useSkillsStore.getState().getSkills();
    } catch (error) {
      console.log(error);
      set({ isUpdating: false });
    }
  },

  //   get all skills
getSkills: async () => {
  try {
    const { data } = await axios(`${import.meta.env.VITE_API_URL}/skills`);

    const validTypes = ["frontend", "backend", "ai/ml", "tools"];

    const normalized = data.map((skill: any) => ({
      ...skill,
      skills_type: validTypes.includes(skill.skills_type)
        ? skill.skills_type
        : "frontend",
    }));

    set({ skills: normalized, isStored: true });
  } catch (error) {
    console.log(error);
  }
},


  //   delete skill
  deleteSkill: async (id: string) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/skills/${id}`);
      set({ isStored: true });
      await useSkillsStore.getState().getSkills();
    } catch (error) {
      console.log(error);
    }
  },
}));
