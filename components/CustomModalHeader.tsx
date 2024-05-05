import React from "react";
import CustomIconButton from "./CustomIconButton";
import CustomView from "./CustomView";
import CustomText from "./CustomText";

const CustomModalHeader = (props: any) => {
  return (
    <CustomView
      sx={(theme) => ({
        paddingTop: theme.insets.top,
        paddingBottom: 10,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.colors.slate["200"],
      })}
    >
      <CustomText weight="bold">{props?.title}</CustomText>
      <CustomIconButton
        iconName="close-outline"
        onPress={props?.navigation.goBack}
        iconSize={28}
      />
    </CustomView>
  );
};

export default CustomModalHeader;
