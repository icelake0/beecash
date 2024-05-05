import { StyleSheet } from "react-native";
import React from "react";
import { CustomView, CustomText } from "../components";
import LottieView from "lottie-react-native";

const Root = () => {
  return (
    <CustomView style={styles.container}>
      <LottieView
        autoPlay
        style={{
          width: "100%",
          height: 200,
        }}
        loop
        source={require("assets/lottie/bee-loading.json")}
      />
      <CustomText style={{ marginTop: 10, fontSize: 12 }} variant="h4">
        Loading...
      </CustomText>
    </CustomView>
  );
};

export default Root;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
