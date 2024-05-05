import { ColorSchemeName } from "react-native";
import { EdgeInsets } from "react-native-safe-area-context";

// export type ThemeType = typeof lightTheme | typeof darkTheme;
export type ThemeType = {
  colors: {
    background: string;
    text: string;
    primary: string;
    button: string;
    btnText: string;
    white: string;
    faint: string;
    card: string;
    cardBackground: string;
    link: string;
    cardBorder: string;
    border: string;
    labelText: string;
    success: string;
    danger: string;
    warning: string;
    dangerLight: string;
    slate: {
      "100": string;
      "200": string;
      "300": string;
      "400": string;
      "500": string;
      "600": string;
      "700": string;
      "800": string;
      "900": string;
    };
    green: {
      "100": string;
      "200": string;
      "300": string;
      "400": string;
      "500": string;
      "600": string;
      "700": string;
      "800": string;
      "900": string;
    };
    red: {
      "100": string;
      "200": string;
      "300": string;
      "400": string;
      "500": string;
      "600": string;
      "700": string;
      "800": string;
      "900": string;
    };
  };
  spacing: {
    divider: number;
  };
  shadow: {
    shadowColor: string;
    shadowOffset: {
      width: number;
      height: number;
    };
    shadowOpacity: number;
    shadowRadius: number;
  };
  colorScheme: ColorSchemeName;
  toggleTheme: () => Promise<void>;
  insets: EdgeInsets;
};

export const lightTheme = {
  colors: {
    background: "#fefcfd",
    text: "#000",
    primary: "#000",
    button: "#212529",
    btnText: "#fafafa",
    white: "#fff",
    faint: "rgba(225, 225, 225, 0.3)",
    card: "#fff",
    cardBackground: "#ffffff",
    link: "#0077b6",
    cardBorder: "#e9ecef",
    border: "#6c757d",
    labelText: "#0d1b2a",
    success: "#52b788",
    danger: "#c1121f",
    warning: "#f4d58d",
    dangerLight: "#ffccd5",
    slate: {
      "100": "#f8f9fa",
      "200": "#e9ecef",
      "300": "#dee2e6",
      "400": "#ced4da",
      "500": "#adb5bd",
      "600": "#6c757d",
      "700": "#495057",
      "800": "#343a40",
      "900": "#212529",
    },
    green: {
      "100": "#99e2b4",
      "200": "#88d4ab",
      "300": "#78c6a3",
      "400": "#67b99a",
      "500": "#56ab91",
      "600": "#469d89",
      "700": "#358f80",
      "800": "#248277",
      "900": "#14746f",
    },
    red: {
      "100": "#fff0f3",
      "200": "#ffccd5",
      "300": "#ffb3c1",
      "400": "#ff8fa3",
      "500": "#d00000",
      "600": "#ff4d6d",
      "700": "#c9184a",
      "800": "#a4133c",
      "900": "#800f2f",
    },
  },
  spacing: {
    divider: 10,
  },
  shadow: {
    shadowColor: "#e9ecef",
    shadowOffset: {
      width: 7,
      height: 7,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  insets: null,
};

export const darkTheme = {
  colors: {
    background: "#000814",
    text: "#fff",
    primary: "#302e38",
    button: "#302e38",
    btnText: "#fff",
    white: "#000",
    faint: "rgba(0,0,0,0.3)",
    card: "#0b090a",
    link: "#0077b6",
    cardBackground: "#0d1321",
    cardBorder: "#212529",
    border: "#343a40",
    labelText: "#adb5bd",
    success: "#52b788",
    danger: "#780000",
    warning: "#f6aa1c",
    dangerLight: "#ffccd5",
    slate: {
      "100": "#212529",
      "200": "#343a40",
      "300": "#495057",
      "400": "#6c757d",
      "500": "#adb5bd",
      "600": "#ced4da",
      "700": "#dee2e6",
      "800": "#e9ecef",
      "900": "#f8f9fa",
    },
    green: {
      "100": "#99e2b4",
      "200": "#88d4ab",
      "300": "#78c6a3",
      "400": "#67b99a",
      "500": "#56ab91",
      "600": "#469d89",
      "700": "#358f80",
      "800": "#248277",
      "900": "#14746f",
    },
    red: {
      "100": "#fff0f3",
      "200": "#ffccd5",
      "300": "#ffb3c1",
      "400": "#ff8fa3",
      "500": "#d00000",
      "600": "#ff4d6d",
      "700": "#c9184a",
      "800": "#a4133c",
      "900": "#800f2f",
    },
  },
  spacing: {
    divider: 10,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 7,
      height: 7,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  insets: null,
};
