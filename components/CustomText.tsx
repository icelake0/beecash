import { Text, StyleProp, TextStyle, Platform } from "react-native";
import React from "react";
import styled, { useTheme, DefaultTheme } from "styled-components/native";
import { dynamicFontSize } from "utils";
export interface BTextProps extends React.ComponentPropsWithRef<typeof Text> {
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "body1"
    | "body2"
    | "link"
    | "caption"
    | "button"
    | "overline";
  size?: number;
  color?: string | ((theme: DefaultTheme) => string);
  weight?: "normal" | "bold" | "extrabold" | "boldest" | "light";
  style?: StyleProp<TextStyle>;
  children: React.ReactElement | React.ReactNode;
  sx?: StyleProp<TextStyle> | ((theme: DefaultTheme) => StyleProp<TextStyle>);
  gutterBottom?: boolean;
}

const variants = {
  h1: {
    fontSize: 32,
  },
  h2: {
    fontSize: 28,
  },
  h3: {
    fontSize: 24,
  },
  h4: {
    fontSize: 20,
  },
  h5: {
    fontSize: 16,
  },
  h6: {
    fontSize: 14,
  },
  body1: {
    fontSize: 15,
  },
  link: {
    fontSize: 13,
    textDecoration: "underline",
  },
  body2: {
    fontSize: 14,
  },
  caption: {
    fontSize: 12,
  },
  button: {
    fontSize: 14,
  },
  overline: {
    fontSize: 10,
  },
};

const StyledText = styled.Text<BTextProps>`
  font-size: ${(props) =>
    props.variant && !props?.size
      ? Platform.OS === "android"
        ? dynamicFontSize(variants[props.variant]?.fontSize) + "px"
        : variants[props.variant]?.fontSize + "px"
      : props?.size
      ? Platform.OS === "android"
        ? dynamicFontSize(props.size) + "px"
        : props.size + "px"
      : "14px"};
  color: ${(props) =>
    typeof props.color === "string"
      ? props?.color
      : props?.variant === "link"
      ? props.theme.colors.link
      : props.theme.colors.text};
  font-family: ${(props) =>
    props.weight === "bold"
      ? "Sora_500Medium"
      : props.weight === "extrabold"
      ? "Sora_600SemiBold"
      : props?.weight === "boldest"
      ? "Sora_800ExtraBold"
      : "Sora_400Regular"};
  text-transform: ${(props) =>
    props.variant === "overline" ? "uppercase" : "none"};
  letter-spacing: ${(props) =>
    props.variant === "overline" ? "1.5px" : "0.5px"};
  margin-bottom: ${(props) => (props?.gutterBottom ? "5px" : "0px")};
  text-decoration: ${(props) =>
    props.variant && props.variant === "link"
      ? variants[props.variant]?.textDecoration
      : "none"};
  text-decoration-color: ${(props) =>
    props.variant && props.variant === "link"
      ? typeof props?.color === "string"
        ? props.color
        : props.theme.colors.link
      : props?.theme?.colors.link};
`;

const CustomText = React.forwardRef<React.ElementRef<typeof Text>, BTextProps>(
  (props, ref) => {
    const theme = useTheme();
    const { color, sx, children, ...rest } = props;

    const memoizedColor = React.useMemo(() => {
      if (color && typeof color === "function") {
        const result = color(theme);
        return result;
      }
      return color; // If color is not a function, it will return the color as is
    }, [color, theme]);

    const memoizedSx = React.useMemo(() => {
      if (sx && typeof sx === "function") {
        const result = sx(theme);
        return result;
      }
      return sx; // If sx is not a function, it will return sx as is
    }, [sx, theme]);

    return (
      <StyledText
        ref={ref}
        style={[props.style, memoizedSx]}
        color={memoizedColor}
        {...rest}
      >
        {children}
      </StyledText>
    );
  }
);

export default CustomText;
