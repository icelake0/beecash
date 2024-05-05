import { Image } from "expo-image";
import React from "react";
import styled from "styled-components/native";
import CustomText from "./CustomText";

const StyledEmptyState = styled.View`
  justify-content: center;
  align-items: center;
  min-height: 200px;
  padding: 20px;
`;

const CustomEmptyState = ({ height = 100 }) => {
  return (
    <StyledEmptyState>
      <Image
        source={require("assets/planet.png")}
        style={{
          width: 100,
          height: height,
        }}
        contentFit="contain"
        transition={1000}
        placeholder={
          "https://cdn-icons-png.flaticon.com/128/14005/14005478.png"
        }
      />
      <CustomText
        variant="overline"
        color={(theme) => theme.colors.slate["600"]}
        sx={{ marginTop: 10 }}
        weight="extrabold"
      >
        Nothing to show
      </CustomText>
    </StyledEmptyState>
  );
};

export default CustomEmptyState;
