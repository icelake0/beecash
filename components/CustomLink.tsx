import { Link } from "expo-router";
import React from "react";
import { StyleProp, TextStyle } from "react-native";
import styled, { DefaultTheme, useTheme } from "styled-components/native";

export interface CustomLinkProps extends React.ComponentProps<typeof Link> {
  sx?: StyleProp<TextStyle> | ((theme: DefaultTheme) => StyleProp<TextStyle>);
  color?: string;
}

const StyledLink = styled(Link)<CustomLinkProps>`
  color: ${(props) => props?.color ?? props.theme.colors.text};
  text-decoration: underline;
  text-decoration-color: ${(props) => props.color ?? props.theme.colors.text};
`;

const CustomLink: React.FC<CustomLinkProps> = (props) => {
  const theme = useTheme();
  const memoizedSx = React.useMemo(() => {
    if (typeof props?.sx === "function") {
      return props.sx(theme);
    }
    return props?.sx;
  }, [props?.sx, theme]);

  return <StyledLink {...props} style={[props?.style, memoizedSx]} />;
};

export default CustomLink;
