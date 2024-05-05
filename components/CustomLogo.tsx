import React from "react";
import { Image } from "expo-image";
import { useTheme } from "styled-components/native";
import CustomText from "./CustomText";

const CustomLogo: React.FC<
  React.ComponentPropsWithRef<typeof Image> & {
    label?: string;
  }
> = (props) => {
  const theme = useTheme();

  return (
    <>
      <Image
        source={
          theme.colorScheme === "dark"
            ? require("assets/logo-outlined-white.png")
            : require("assets/logo-filled.png")
        }
        contentFit="cover"
        transition={1000}
        style={{ width: 60, height: 60 }}
        {...props}
      />
      {props?.label && <CustomText variant="h6">{props?.label}</CustomText>}
    </>
  );
};

export default CustomLogo;
