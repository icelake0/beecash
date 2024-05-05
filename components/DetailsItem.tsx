import React from "react";
import { TouchableOpacity } from "react-native";
import CustomText from "./CustomText";
import CustomView from "./CustomView";

const DetailsItem = ({
  label,
  content,
  IconLeft,
  IconRight,
  color,
  onPress,
}: {
  label: string;
  content?: string;
  color?: string;
  IconLeft?: () => React.JSX.Element;
  IconRight?: () => React.JSX.Element;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <CustomView
        $transparent
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 25,
          flexWrap: "wrap",
        }}
      >
        <CustomView $transparent>
          <CustomView
            $transparent
            sx={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {IconLeft ? <IconLeft /> : null}
            <CustomText
              size={12}
              sx={{ marginRight: 1, marginLeft: IconLeft ? 10 : 0 }}
              weight="bold"
            >
              {label}
            </CustomText>
          </CustomView>
        </CustomView>
        <CustomView
          $transparent
          sx={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {content && (
            <CustomText size={11} color={color || "gray"}>
              {content}
            </CustomText>
          )}
          {IconRight ? <IconRight /> : null}
        </CustomView>
      </CustomView>
    </TouchableOpacity>
  );
};

const MemoizedDetailsItem = React.memo(DetailsItem);

export default MemoizedDetailsItem;
