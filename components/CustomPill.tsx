import styled from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomText from "./CustomText";
import CustomButton from "./CustomButton";

interface PillType extends React.ComponentProps<typeof CustomButton> {
  rounded?: "sm" | "md" | "lg" | "full";
  children?: React.ReactNode;
  label: string;
  iconPosition?: "left" | "right";
  iconSize?: number;
  iconName?: React.ComponentProps<typeof Ionicons>["name"];
  size?: "sm" | "md" | "lg";
}

const rounded = (val: "sm" | "md" | "lg" | "full") => {
  switch (val) {
    case "sm":
      return "5px";
    case "md":
      return "10px";
    case "lg":
      return "20px";
    case "full":
      return "100px";
    default:
      return "10px";
  }
};

const StyledPill = styled(CustomButton)<PillType>`
  align-self: flex-start;
  flex-direction: row;
  border-radius: ${(props) =>
    props?.rounded ? rounded(props.rounded) : "10px"};
  border-width: 1.3px;
  border-color: ${(props) => props?.theme?.colors?.slate["400"]};
  background-color: ${(props) =>
    props?.variant === "outlined" ? "transparent" : props.theme.colors.white};
  padding: 5px 8px;
  width: auto;
  height: auto;
`;

const CustomPill: React.FC<PillType> = (props) => {
  return (
    <>
      <StyledPill {...props}>
        {props?.children ? (
          props?.children
        ) : (
          <>
            <CustomText sx={{ position: "relative" }}>
              {props?.label}
            </CustomText>
          </>
        )}
      </StyledPill>
    </>
  );
};

export default CustomPill;
