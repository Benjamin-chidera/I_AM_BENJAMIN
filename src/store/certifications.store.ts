/// <reference types="vite/client" />
import { create } from "zustand";
import axios from "axios";

interface Certification {
  id: string;
  cert_name: string;
  issued_organization: string;
  year_issued: string;
  cert_url: string;
}

interface CertificationsState {
  certifications: Certification[];
  isUpdating: boolean;
  isStored: boolean;
  cert_name: string | null;
  setCertName: (cert_name: string) => void;
  issued_organization: string | null;
  setIssuedOrganization: (issued_organization: string) => void;
  year_issued: string | null;
  setYearIssued: (year_issued: string) => void;
  cert_url: string | null;
  setCertUrl: (cert_url: string) => void;
  currentCertId: string | null;
  setCurrentCertId: (id: string | null) => void;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  getCertifications: () => void;
  createCertification: () => void;
  updateCertification: () => void;
  deleteCertification: (id: string) => void;
  clearForm: () => void;
}

export const useCertificationsStore = create<CertificationsState>((set) => ({
  certifications: [],
  isUpdating: false,
  isStored: false,
  cert_name: null,
  setCertName: (cert_name: string) => set({ cert_name }),
  issued_organization: null,
  setIssuedOrganization: (issued_organization: string) =>
    set({ issued_organization }),
  year_issued: null,
  setYearIssued: (year_issued: string) => set({ year_issued }),
  cert_url: null,
  setCertUrl: (cert_url: string) => set({ cert_url }),
  currentCertId: null,
  setCurrentCertId: (id: string | null) => set({ currentCertId: id }),
  isModalOpen: false,
  setIsModalOpen: (isOpen: boolean) => set({ isModalOpen: isOpen }),

  clearForm: () =>
    set({
      cert_name: null,
      issued_organization: null,
      year_issued: null,
      cert_url: null,
      currentCertId: null,
    }),

  //   create certification (POST for new)
  createCertification: async () => {
    set({ isUpdating: true });
    const { cert_name, issued_organization, year_issued, cert_url } =
      useCertificationsStore.getState();

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/certifications`,
        {
          cert_name,
          issued_organization,
          year_issued,
          cert_url,
        }
      );

      console.log(data);

      set({ isStored: true, isUpdating: false, isModalOpen: false });
      useCertificationsStore.getState().clearForm();
      await useCertificationsStore.getState().getCertifications();
    } catch (error) {
      console.log(error);
      set({ isUpdating: false, isModalOpen: true });
    }
  },

  //   update certification (PUT for existing)
  updateCertification: async () => {
    set({ isUpdating: true });
    const {
      currentCertId,
      cert_name,
      issued_organization,
      year_issued,
      cert_url,
    } = useCertificationsStore.getState();

    if (!currentCertId) {
      set({ isUpdating: false });
      return;
    }

    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/certifications/${currentCertId}`,
        {
          cert_name,
          issued_organization,
          year_issued,
          cert_url,
        }
      );

      set({ isStored: true, isUpdating: false, isModalOpen: false });
      useCertificationsStore.getState().clearForm();
      await useCertificationsStore.getState().getCertifications();
    } catch (error) {
      console.log(error);
      set({ isUpdating: false, isModalOpen: true });
    }
  },

  //   get all certifications
  getCertifications: async () => {
    try {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/certifications`
      );

      set({ certifications: data, isStored: true });
    } catch (error) {
      console.log(error);
    }
  },

  //   delete certification
  deleteCertification: async (id: string) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/certifications/${id}`
      );
      set({ isStored: true });
      await useCertificationsStore.getState().getCertifications();
    } catch (error) {
      console.log(error);
    }
  },
}));
