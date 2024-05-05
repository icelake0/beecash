import { Pressable, StyleProp, View, ViewStyle } from "react-native";
import React from "react";
import styled, { DefaultTheme, useTheme } from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import CustomText from "./CustomText";

export interface IconButtonProps
  extends React.ComponentPropsWithRef<typeof Pressable> {
  variant?: "contained" | "outlined" | "text" | "ghost" | "link" | "unstyled";
  children?: React.ReactNode;
  flat?: boolean;
  size?: "sm" | "md" | "lg";
  rounded?: "sm" | "md" | "full";
  width?: number;
  loading?: boolean;
  sx?: StyleProp<ViewStyle> | ((theme: DefaultTheme) => StyleProp<ViewStyle>);
  iconName?: React.ComponentProps<typeof Ionicons>["name"];
  iconSize?: number;
  iconColor?: string | ((theme: DefaultTheme) => string);
  label?: string;
}

const bgColors = (theme: DefaultTheme) => ({
  contained: theme.colors.primary,
  outlined: theme.colors.white,
  text: theme.colors.text,
  ghost: "transparent",
  link: "none",
  unstyled: "none",
});

const SIZES = {
  sm: "8px",
  md: "13px",
  lg: "25px",
};

const ICON_SIZES = {
  sm: 16,
  md: 22,
  lg: 30,
};

const StyledIconButton = styled.Pressable<IconButtonProps>`
  padding: ${(props) => (props?.size ? SIZES[props?.size] : "10px")};
  border-radius: ${(props) =>
    props?.rounded === "sm"
      ? "5px"
      : props.rounded === "md"
      ? "25px"
      : "100px"};
  border-width: 1.1px;
  border-color: ${(props) => props.theme?.colors?.cardBorder};
`;

const AnimatedIconButton = Animated.createAnimatedComponent(StyledIconButton);

const CustomIconButton = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  IconButtonProps
>((props, ref) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
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
      opacity.value = withTiming(1);
    })
    .onBegin(() => {
      scale.value = withTiming(0.8); // Scale down on press
      opacity.value = withTiming(0.5);
    })
    .onEnd(() => {
      scale.value = withTiming(1); // Scale back up on release
      opacity.value = withTiming(1);
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
    <View
      style={{
        width: props?.width ?? "auto",
        alignItems: "center",
      }}
    >
      <GestureDetector gesture={tapGesture}>
        <AnimatedIconButton
          style={[animatedStyles, memoizedSx, props?.style]}
          {...props}
          ref={ref}
        >
          {props?.children ? (
            props.children
          ) : (
            <Ionicons
              name={props?.iconName ? props.iconName : "help-outline"}
              color={
                typeof props?.iconColor === "function"
                  ? props?.iconColor(theme)
                  : props?.iconColor ?? theme.colors.text
              }
              size={
                props?.size ? ICON_SIZES[props?.size] : props?.iconSize ?? 16
              }
            />
          )}
        </AnimatedIconButton>
      </GestureDetector>
      {props?.label && (
        <CustomText
          variant="caption"
          weight="extrabold"
          size={10}
          sx={{
            marginVertical: 5,
            textAlign: "center",
            left: 1,
          }}
        >
          {props?.label}
        </CustomText>
      )}
    </View>
  );
});

export default CustomIconButton;
