import React from "react";
import { Image } from "expo-image";
import { Pressable } from "react-native";
import styled from "styled-components/native";
import CustomText from "./CustomText";

interface AvatarProps extends React.ComponentProps<typeof Pressable> {
  rounded?: "full" | "md";
  flat?: boolean;
  uri?: string;
  size?: "sm" | "md" | "lg";
  iconSize?: number;
  variant?: "contained" | "outlined" | "text" | "ghost" | "link" | "unstyled";
  initials?: string;
}

const bgColors = (theme: any) => ({
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

const StyledPressable = styled.Pressable<AvatarProps>`
  border-width: 1.1px;
  border-color: ${(props) => props.theme?.colors?.cardBorder};
  background-color: ${({ theme, variant }) =>
    variant ? bgColors(theme)[variant] : theme.colors.white};
  border-radius: ${(props) =>
    props?.flat ? "0px" : props?.rounded === "md" ? "50px" : "100px"};
  align-self: flex-start;
  align-items: center;
  width: ${(props) =>
    props?.size === "sm" ? "30px" : props?.size === "md" ? "40px" : "50px"};
  height: ${(props) =>
    props?.size === "sm" ? "30px" : props?.size === "md" ? "40px" : "50px"};
  justify-content: center;
`;

const StyledImage = styled(Image)<AvatarProps>`
  border-radius: ${(props) =>
    props?.flat ? "0px" : props?.rounded === "md" ? "50px" : "100px"};
  width: ${(props) =>
    props?.size === "sm" ? "30px" : props?.size === "md" ? "40px" : "50px"};
  height: ${(props) =>
    props?.size === "sm" ? "30px" : props?.size === "md" ? "40px" : "50px"};
`;

export default function CustomAvatar(props: AvatarProps) {
  return (
    <StyledPressable {...props}>
      {props?.initials && !props?.uri ? (
        <CustomText variant="caption" size={16} weight="extrabold">
          {props?.initials?.toLocaleUpperCase()}
        </CustomText>
      ) : (
        <StyledImage
          source={props?.uri ? props?.uri : require("assets/user.png")}
          placeholder={
            "https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
          }
          contentFit="contain"
          transition={1000}
        />
      )}
    </StyledPressable>
  );
}
