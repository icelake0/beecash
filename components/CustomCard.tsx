import styled from "styled-components/native";
import { Dimensions, StyleProp, ViewStyle, View } from "react-native";

import StyledView from "./CustomView";
import CustomText from "./CustomText";
import { withDefaults } from "utils";
import { useTheme, DefaultTheme } from "styled-components/native";
import React from "react";

interface CardContainerProps extends React.ComponentProps<typeof View> {
  flat?: boolean;
  "spacing-x"?: "xs" | "sm" | "md" | "lg" | "xl";
  "spacing-y"?: "xs" | "sm" | "md" | "lg" | "xl";
  disableShadow?: boolean;
  rounded?: "sm" | "md" | "lg" | "xl" | "full";
  sx?: StyleProp<ViewStyle> | ((theme: DefaultTheme) => StyleProp<ViewStyle>);
}

interface CardFooterProps {
  divider?: boolean;
}

const SPACING = {
  xs: "3px",
  sm: "5px",
  md: "10px",
  lg: "18px",
  xl: "24px",
};

const paddingHorizontal = withDefaults(SPACING, {
  sm: "5px",
});
const paddingVertical = withDefaults(SPACING, {
  sm: "5px",
});

const rounded = (val: "sm" | "md" | "lg" | "xl" | "full") => {
  switch (val) {
    case "sm":
      return "4px";
    case "md":
      return "8px";
    case "lg":
      return "10px";
    case "xl":
      return "20px";
    case "full":
      return "100px";
    default:
      return "8px";
  }
};

const StyledCard = styled(StyledView)<CardContainerProps>`
  border-radius: ${(props) =>
    props?.flat ? "0px" : props?.rounded ? rounded(props?.rounded) : "8px"};
  border-width: 1.1px;
  border-color: ${(props) => props.theme?.colors?.cardBorder};
  background-color: ${(props) => props.theme.colors.cardBackground};
  min-height: 60px;
  padding-horizontal: ${(props) =>
    props?.["spacing-x"]
      ? SPACING[props?.["spacing-x"]]
      : paddingHorizontal.sm};
  padding-vertical: ${(props) =>
    props?.["spacing-y"] ? SPACING[props?.["spacing-y"]] : paddingVertical.sm};
  box-shadow: ${(props) =>
    !props?.disableShadow
      ? "0px 0px 0.5px " + props.theme.shadow?.shadowColor
      : "none"};
  margin-vertical: 10px;
`;

export const Card = (props: CardContainerProps) => {
  const theme = useTheme();
  const { sx, ...rest } = props;

  const memoizedSx = React.useMemo(() => {
    if (sx && typeof sx === "function") {
      const result = sx(theme);
      return result;
    }
    return sx; // If sx is not a function, it will return sx as is
  }, [sx, theme]);
  return <StyledCard style={[rest?.style, memoizedSx]} {...rest} />;
};

export const StyledCardTitle = styled(CustomText)<
  {
    weight?: React.ComponentProps<typeof CustomText>["weight"];
    color?: string | ((theme: DefaultTheme) => string);
  } & typeof CustomText.defaultProps
>`
  color: ${(props) =>
    props.color && typeof props.color === "string"
      ? props?.color
      : props.theme.colors.slate["600"]};
  font-size: 11.5px;
  font-family: ${(props) =>
    props.weight === "bold"
      ? "Sora_500Medium"
      : props.weight === "extrabold"
      ? "Sora_600SemiBold"
      : "Sora_400Regular"};
  margin-bottom: 5px;
`;

export const CardTitle = (props: React.ComponentProps<typeof CustomText>) => {
  const theme = useTheme();
  const { sx, color, ...rest } = props;
  const memoizedSx = React.useMemo(() => {
    if (sx && typeof sx === "function") {
      const result = sx(theme);
      return result;
    }
    return sx; // If sx is not a function, it will return sx as is
  }, [sx, theme]);

  const memoizedColor = React.useMemo(() => {
    if (color && typeof color === "function") {
      const result = color(theme);
      return result;
    }
    return color; // If color is not a function, it will return the color as is
  }, [color, theme]);

  return (
    <StyledCardTitle
      style={[rest?.style, memoizedSx]}
      color={memoizedColor}
      {...rest}
    />
  );
};

export const CardSeparator = styled.View<{ fullWidth?: boolean }>`
  width: ${(props) =>
    props?.fullWidth ? Dimensions.get("screen").width + "px" : "auto"};
  height: 1px;
  background-color: ${(props) =>
    props?.theme.colorScheme === "dark"
      ? props?.theme?.colors?.slate[100]
      : props?.theme?.colors?.slate[200]};
  overflow: hidden;
  margin-vertical: 10px;
  left: ${(props) => (props.fullWidth ? "-20px" : "0px")};
`;

export const StyledCardFooter = styled.View<CardFooterProps>`
  padding-top: 10px;
`;

const RootCard = Object.assign(Card, {
  Footer: StyledCardFooter,
  Title: CardTitle,
  Separator: CardSeparator,
});

export default RootCard;
