import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

import styled, { DefaultTheme, useTheme } from "styled-components/native";
interface CustomViewProps extends React.ComponentProps<typeof View> {
  animated?: boolean;
  sx?: StyleProp<ViewStyle> | ((theme: DefaultTheme) => StyleProp<ViewStyle>);
  $transparent?: boolean;
}

const StyledView = styled.View<CustomViewProps>`
  background-color: ${(props) =>
    props?.$transparent ? "transparent" : props.theme.colors.background};
`;

const CustomView: React.FC<CustomViewProps> = (props) => {
  const theme = useTheme();
  const { sx, ...rest } = props;

  const memoizedSx = React.useMemo(() => {
    if (sx && typeof sx === "function") {
      const result = sx(theme);
      return result;
    }
    return sx; // If sx is not a function, it will return sx as is
  }, [sx, theme]);

  return <StyledView style={[rest?.style, memoizedSx]} {...rest} />;
};

export default CustomView;
