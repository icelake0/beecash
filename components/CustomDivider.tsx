import { Dimensions } from "react-native";
import React from "react";
import styled, { useTheme } from "styled-components/native";
import CustomView from "./CustomView";

interface DividerProps extends React.ComponentProps<typeof CustomView> {
  alignment?: "horizontal" | "vertical";
  fullWidth?: boolean;
}

const { width } = Dimensions.get("screen");

const StyledDivider = styled(CustomView)<DividerProps>`
  width: ${(props) => (props?.fullWidth ? width + "px" : "100%")};
  height: ${(props) => (props?.alignment === "vertical" ? "100%" : "0.8px")};
  background-color: ${(props) => props?.theme?.colors.slate["300"]};
  margin: ${(props) => (props?.fullWidth ? "10px 0px" : "10px 10px")};
`;

const CustomDivider: React.FC<DividerProps> = (props) => {
  const theme = useTheme();
  const { sx, ...rest } = props;

  const memoizedSx = React.useMemo(() => {
    if (sx && typeof sx === "function") {
      const result = sx(theme);
      return result;
    }
    return sx; // If sx is not a function, it will return sx as is
  }, [sx, theme]);

  return <StyledDivider style={[rest?.style, memoizedSx]} {...rest} />;
};

export default CustomDivider;
