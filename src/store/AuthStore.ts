import { create } from 'zustand';
import { SignUpData } from '../types/SignupData';

interface AuthState {
  activeAuthPage: string;
  formData: Partial<SignUpData>;
  reference: string;
  setReference: (value: string)=>void;
  email: string;
  setEmail: (value: string)=>void;
  setActiveAuthPage: (value: string) => void;
  updateFormData: (data: Partial<SignUpData>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  activeAuthPage: 'login',
  reference: "",
  email: "",
  formData: {},
  setActiveAuthPage: (activeAuthPage) => set({ activeAuthPage }),
  updateFormData: (data) =>
    set((state) => ({
      formData: {
        ...state.formData,
        ...data,
      },
    })),
  setEmail: (email)=> set({email}),
  setReference: (reference)=> set({reference}),
}));
