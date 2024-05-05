import { StateCreator } from "zustand";
import { sliceResetFns } from "./resetAllSlices";

const initialState = {
  authData: null,
  token: null,
  pin: null,
  isAuthLoading: false,
};

type UserType = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  updatedAt: Date;
  createdAt: Date;
};

export interface AuthState {
  authData: UserType | null;
  token?: string | null;
  isAuthLoading: boolean;
  pin: string | null;
  setAuth: (data: any) => Promise<void>;
  setIsLoading: (val: boolean) => void;
  clearAuth: () => void;
  setPin: (value: string) => Promise<void>;
  updatePin: (value: string) => Promise<void>;
}

export const createAuthSlice: StateCreator<AuthState, [], [], AuthState> = (
  set
) => {
  sliceResetFns.add(() => set(initialState));
  return {
    ...initialState,
    setAuth: async (credentials: any) => {
      set(() => ({
        token: credentials?.access_token,
        authData: credentials?.user,
      }));
    },
    setPin: async (pin: string) => {
      set((state) => ({
        ...state,
        pin,
      }));
    },
    setIsLoading: (val) => set(() => ({ isAuthLoading: val })),
    updatePin: async (pin: string) =>
      set(() => ({
        pin,
      })),
    clearAuth: () => set(initialState),
  };
};
