import { ThemeProvider as StyledThemeProvider } from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Appearance, ColorSchemeName, useColorScheme } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { useShallow } from "zustand/react/shallow";

import { darkTheme, lightTheme } from "./index";
import { useBoundStore } from "@/stores";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const colorScheme = useColorScheme(); // Get the device color scheme (light/dark)
  const insets = useSafeAreaInsets();

  const { currentColorScheme, setCurrentColorScheme } = useBoundStore(
    useShallow((state) => state)
  );
  const [theme, setTheme] = useState(
    currentColorScheme === "dark" ? darkTheme : lightTheme
  );

  const updateTheme = useCallback(
    (newColorScheme: ColorSchemeName) => {
      setTheme(newColorScheme === "dark" ? darkTheme : lightTheme);
      setCurrentColorScheme(newColorScheme);
      Appearance.setColorScheme(newColorScheme);
    },
    [darkTheme, lightTheme]
  );

  useEffect(() => {
    setCurrentColorScheme(colorScheme);
  }, [colorScheme]);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(
      ({ colorScheme: newColorScheme }) => {
        if (currentColorScheme !== newColorScheme) {
          updateTheme(newColorScheme);
        }
      }
    );

    return () => {
      subscription.remove();
    };
  }, [currentColorScheme, updateTheme]);

  useEffect(() => {
    updateTheme(colorScheme);
  }, [colorScheme]);

  const toggleTheme = useCallback(async () => {
    const newColorScheme = currentColorScheme === "light" ? "dark" : "light";
    updateTheme(newColorScheme);
  }, [currentColorScheme]);

  return (
    <StyledThemeProvider
      theme={{
        ...theme,
        toggleTheme,
        colorScheme: currentColorScheme,
        insets,
      }}
    >
      {children}
    </StyledThemeProvider>
  );
};

export default ThemeProvider;
