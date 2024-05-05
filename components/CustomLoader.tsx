import { Modal, Platform, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import CustomView from "./CustomView";
import { AnimatePresence, MotiView } from "moti";
import { BlurView } from "expo-blur";
import { useTheme } from "styled-components/native";
import LottieView from "lottie-react-native";

interface LoaderProps {
  visible: boolean;
  onPress?: () => void;
  disabled?: boolean;
}

const CustomLoader: React.FC<LoaderProps> = (props) => {
  const theme = useTheme();
  const animation = React.useRef(null);

  if (!props?.visible) {
    return null;
  }

  return (
    <Modal transparent visible={props.visible}>
      <AnimatePresence exitBeforeEnter>
        <CustomView
          sx={(theme) => ({
            ...StyleSheet.absoluteFillObject,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: Platform.select({
              ios: "transparent",
              android: theme.colors.background,
            }),
          })}
        >
          <>
            {Platform.OS !== "ios" ? null : (
              <BlurView
                style={[StyleSheet.absoluteFillObject, { flex: 1 }]}
                tint={theme.colorScheme === "light" ? "light" : "dark"}
                intensity={80}
                blurReductionFactor={4}
              />
            )}
            <LottieView
              autoPlay
              ref={animation}
              style={{
                width: "100%",
                height: 450,
              }}
              loop
              source={
                theme.colorScheme === "dark"
                  ? require("assets/lottie/tapping-loading-white.json")
                  : require("assets/lottie/tapping-loading.json")
              }
            />
          </>
        </CustomView>
      </AnimatePresence>
    </Modal>
  );
};

export default CustomLoader;
