import {
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StyleProp,
  TextStyle,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import styled, { useTheme, DefaultTheme } from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";

import CustomText from "./CustomText";
import CustomView from "./CustomView";

interface CustomTextInputProps
  extends React.ComponentPropsWithRef<typeof TextInput> {
  variant?: "contained" | "outlined";
  label?: string;
  size?: "sm" | "md" | "lg";
  flat?: boolean;
  sx?: StyleProp<TextStyle> | ((theme: DefaultTheme) => StyleProp<TextStyle>);
  required?: boolean;
  error?: string;
  iconName?: any;
  iconPress?: () => void;
  iconColor?: string;
  borderColor?: string;
  pre?: string;
}

const StyledTextInput = styled.TextInput<CustomTextInputProps>`
  padding: ${({ size, pre }) =>
    size === "sm"
      ? "0px 10px"
      : size === "md"
      ? "0px 24px"
      : size === "lg"
      ? "16px 30px"
      : pre
      ? "0px 23px"
      : "0px 12px"};
  background-color: ${(props) =>
    props.variant === "outlined"
      ? "transparent"
      : props.theme.colors.background};
  border-color: ${(props) =>
    props.error ? "red" : props.borderColor ?? props.theme.colors.border};
  border-radius: ${(props) => (props.flat ? 0 : 10)}px;
  border-width: ${(props) => (props.variant === "outlined" ? 3 : 2)}px;
  color: ${(props) => props.theme.colors.text};
  font-family: "Sora_400Regular";
  font-size: ${(props) => (Platform.OS === "ios" ? "16px" : "13px")};
  height: 55px;
`;

const Container = React.forwardRef<
  React.ElementRef<typeof KeyboardAvoidingView>,
  React.ComponentPropsWithRef<typeof KeyboardAvoidingView> & {
    bottomInputFocused?: boolean;
  }
>((props, ref) => {
  const scrollViewRef = React.useRef<any>(null);

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        // Scroll to the TextInput at the bottom when the keyboard is shown
        if (props?.bottomInputFocused) {
          scrollViewRef?.current?.scrollToEnd({ animated: true });
        }
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        // Scroll back to the top when the keyboard is hidden
        scrollViewRef?.current.scrollTo({ x: 0, y: 0, animated: true });
      }
    );

    // Cleanup listeners when component unmounts
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [props?.bottomInputFocused]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 100}
      style={{ flex: 1 }}
      ref={ref}
      {...props}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 100,
          }}
          style={[{ flex: 1, paddingHorizontal: 5, paddingTop: 0 }]}
          nestedScrollEnabled
          showsVerticalScrollIndicator={false}
          contentInsetAdjustmentBehavior="never"
          keyboardShouldPersistTaps="handled"
        >
          {props.children}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
});

const CustomTextInputRoot = React.forwardRef<
  React.ElementRef<typeof TextInput>,
  CustomTextInputProps
>((props, ref) => {
  const theme = useTheme();
  const memoizedSx = React.useMemo(() => {
    if (typeof props.sx === "function") {
      return props.sx(theme);
    }
    return props.sx;
  }, [theme, props.sx]);
  return (
    <CustomView sx={{ position: "relative", marginBottom: 20 }}>
      {props.label ? (
        <CustomText
          variant="caption"
          color={(theme) =>
            theme.colorScheme === "dark"
              ? theme.colors?.btnText
              : theme.colors?.labelText
          }
          sx={(theme) => ({
            left: theme.insets.left + 2,
            position: "absolute",
            // top: -theme.insets.top / 2.6,
            top: Platform.select({
              ios: -theme.insets.top / 2.6,
              android: -theme.insets.top + 5,
            }),
          })}
        >
          {props.label}
          {props?.required ? <CustomText color="red">*</CustomText> : null}
        </CustomText>
      ) : null}
      <CustomView style={{ position: "relative" }}>
        {props?.pre && (
          <TouchableOpacity
            style={{
              position: "absolute",
              top: Platform.select({ ios: 18.9, android: 15.5 }),
              left: Platform.select({ ios: 15, android: 11 }),
              zIndex: 100,
            }}
          >
            <CustomText color={(theme) => theme.colors.slate["500"]}>
              {props?.pre}
            </CustomText>
          </TouchableOpacity>
        )}
        <StyledTextInput
          ref={ref}
          style={[props.style, memoizedSx]}
          selectionColor={
            theme.colorScheme === "dark"
              ? theme.colors.text
              : theme.colors.labelText
          }
          placeholderTextColor={theme.colors.slate["400"]}
          {...props}
        />
        {props?.iconName && (
          <TouchableOpacity
            style={{ position: "absolute", top: 15.5, right: 15, zIndex: 100 }}
            onPress={props.iconPress}
          >
            <Ionicons
              name={props.iconName}
              size={24}
              color={props.iconColor ?? "#888"}
            />
          </TouchableOpacity>
        )}
        {props?.error ? (
          <CustomText
            color={"red"}
            style={{
              position: "absolute",
              bottom: -15,
              left: 5,
              // top: "100%",
              verticalAlign: "bottom",
              width: "120%",
            }}
            size={12}
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {props.error}
          </CustomText>
        ) : null}
      </CustomView>
    </CustomView>
  );
});

const CustomTextInput = Object.assign(CustomTextInputRoot, {
  Container,
});

export default CustomTextInput;
