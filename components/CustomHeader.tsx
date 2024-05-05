import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useTheme } from "styled-components/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomText from "./CustomText";
import CustomView from "./CustomView";

interface ICustomHeader {
  title?: string;
  navigation?: any;
}

const CustomHeader: React.FC<ICustomHeader> = (props) => {
  const theme = useTheme();
  return (
    <CustomView>
      <TouchableOpacity
        onPress={() => props.navigation.goBack()}
        style={styles.header}
      >
        <Ionicons
          name="arrow-back-outline"
          color={theme.colors.text}
          size={26}
        />
        <CustomText size={15.5} style={{ marginLeft: 8 }} weight="extrabold">
          {props?.title}
        </CustomText>
      </TouchableOpacity>
    </CustomView>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    paddingTop: 40,
    alignItems: "center",
    height: 80,
    paddingHorizontal: 14,
    alignSelf: "flex-start",
  },
});
