import { Pressable, StyleProp, ViewStyle } from "react-native";
import React from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import styled, { useTheme, DefaultTheme } from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";

import CustomText from "./CustomText";
import Spinner from "./icons/Spinner";
// TODO: Add spinner to button

export interface ButtonProps
  extends React.ComponentPropsWithRef<typeof Pressable> {
  variant?: "contained" | "outlined" | "text" | "ghost" | "link" | "unstyled";
  children?: React.ReactNode;
  flat?: boolean;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  width?: number;
  loading?: boolean;
  sx?: StyleProp<ViewStyle> | ((theme: DefaultTheme) => StyleProp<ViewStyle>);
  iconName?: React.ComponentProps<typeof Ionicons>["name"];
  iconColor?: string;
  loadingText?: string;
  disableAnimation?: boolean;
  $contrastColor?: string;
}

const bgColors = (theme: any) => ({
  contained: theme.colors.primary,
  outlined: "transparent",
  text: theme.colors.text,
  ghost: "transparent",
  link: "none",
  unstyled: "none",
});

const StyledButton = styled.Pressable<ButtonProps>`
  padding: ${({ size }) =>
    size === "sm"
      ? "0px 16px"
      : size === "md"
      ? "0px 24px"
      : size === "lg"
      ? "16px 30px"
      : "0px 20px"};
  background-color: ${({ theme, variant }) =>
    variant ? bgColors(theme)[variant] : theme.colors.button};
  border-radius: ${(props) => (props.flat ? 0 : 10)}px;
  border-width: ${(props) => (props.variant === "outlined" ? 3 : 0)}px;
  border-color: ${({ theme, variant }) =>
    variant === "outlined" ? theme.colors.primary : "transparent"};
  width: ${({ fullWidth, width }) =>
    fullWidth ? "100%" : width ? width + "px" : "auto"};
  height: ${({ size }) =>
    size === "sm"
      ? "32px"
      : size === "md"
      ? "55px"
      : size === "lg"
      ? "68px"
      : "45px"};
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.disabled ? 0.6 : 1)};
`;

// Create Animated Styled Button for interactions
const AnimatedButton = Animated.createAnimatedComponent(StyledButton);

const Button = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  ButtonProps
>((props, ref) => {
  const scale = useSharedValue(1);
  const theme = useTheme();
  const memoizedSx = React.useMemo(() => {
    if (typeof props.sx === "function") {
      return props.sx(theme);
    }
    return props.sx;
  }, [theme, props.sx]);

  const tapGesture = Gesture.Tap()
    .maxDuration(500)
    .onStart(() => {
      scale.value = withTiming(1); // set to initial value
    })
    .onBegin(() => {
      scale.value = withTiming(0.8); // Scale down on press
    })
    .onEnd(() => {
      scale.value = withTiming(1); // Scale back up on release
    })
    .onFinalize(() => {
      scale.value = withTiming(1); // Scale back up on release
    });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      flexDirection: "row",
      justifyContent: "center",
    };
  });

  return (
    <GestureDetector gesture={tapGesture}>
      <AnimatedButton
        ref={ref}
        {...props}
        style={[
          !props?.disableAnimation ? animatedStyles : undefined,
          props.style,
          memoizedSx,
        ]}
        disabled={props?.loading ? true : props.disabled}
      >
        <CustomText
          variant={"body1"}
          style={{
            color:
              props?.$contrastColor !== undefined
                ? props?.$contrastColor
                : props.variant === "outlined"
                ? theme.colorScheme === "dark"
                  ? theme.colors.btnText
                  : theme.colors.primary
                : theme.colors.btnText,
          }}
        >
          {props?.loading
            ? props?.loadingText ?? "Loading ..."
            : props.children}
        </CustomText>

        {props?.loading ? (
          <Spinner size={props?.size === "sm" ? 18 : 24} />
        ) : props?.iconName && !props?.loading ? (
          <Ionicons
            name={props?.iconName}
            color={props?.iconColor ?? theme.colors.text}
            size={16}
            style={{
              right: -3,
            }}
          />
        ) : null}
      </AnimatedButton>
    </GestureDetector>
  );
});

export default Button;
