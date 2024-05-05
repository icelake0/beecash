import { ColorSchemeName } from "react-native";
import { StateCreator } from "zustand";
export interface AppearanceType {
  currentColorScheme: ColorSchemeName;
  setCurrentColorScheme: (colorScheme: ColorSchemeName) => void;
}

const initialState = {
  currentColorScheme: null,
};

export const createAppearanceScheme: StateCreator<
  AppearanceType,
  [],
  [],
  AppearanceType
> = (set) => {
  return {
    ...initialState,
    setCurrentColorScheme: (colorScheme: ColorSchemeName) =>
      set((state) => ({
        ...state,
        currentColorScheme: colorScheme,
      })),
  };
};
