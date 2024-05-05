import React, { useState, ForwardedRef, useImperativeHandle } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Platform,
  ViewProps,
  View,
} from "react-native";
import { Image } from "expo-image";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "styled-components/native";
import { MotiView } from "moti";

import CustomText from "./CustomText";
import CustomView from "./CustomView";
import { hideText } from "utils/hideText";

interface Props extends ViewProps {
  length?: number;
  onComplete: (val: any) => void;
  disableBiometrics?: boolean;
  triggerBiometrics?: () => void;
}

interface OTPRefType {
  // properties of your ref, such as 'current'
  resetPin: () => void;
  // adjust this based on your use case
}

const CustomOTPInput = React.forwardRef<OTPRefType, Props>(
  ({ length = 4, onComplete, disableBiometrics, triggerBiometrics }, ref) => {
    const theme = useTheme();
    const [pin, setPin] = useState(Array(length).fill(""));

    const resetPin = () => {
      setPin(Array(length).fill(""));
    };

    useImperativeHandle(ref, () => ({
      resetPin,
    }));

    const handleDigitPress = (digit: any) => {
      const newPin = [...pin];
      const emptyIndex = newPin.findIndex((item) => item === "");

      if (emptyIndex !== -1) {
        newPin[emptyIndex] = digit;
        setPin(newPin);
      }

      // Check if all inputs are filled
      if (newPin.every((input) => input !== "")) {
        onComplete(newPin.join(""));
      }
    };

    const handleBackspace = () => {
      setPin((prevPin) => {
        for (let i = prevPin.length - 1; i >= 0; i--) {
          if (prevPin[i] !== "") {
            prevPin[i] = "";
            break;
          }
        }

        return [...prevPin];
      });
    };

    return (
      <CustomView style={styles.container}>
        <CustomView style={styles.flexRow}>
          {Array.from({ length }).map((_, index) => (
            <CustomView key={index} style={styles.pinItem}>
              <MotiView
                key={pin[index]}
                from={{
                  opacity: 0,
                  scale: 0.5,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.5,
                }}
              >
                <CustomText style={styles.pinText} weight="extrabold">
                  {hideText(pin[index])}
                </CustomText>
              </MotiView>
            </CustomView>
          ))}
        </CustomView>
        <CustomView style={styles.flexButtons}>
          {Array.from({ length: 9 }, (_, index) => index + 1).map((digit) => (
            <TouchableOpacity
              key={digit}
              style={styles.pinItem2}
              onPress={() => handleDigitPress(digit.toString())}
            >
              <CustomText style={styles.pinText} weight="extrabold">
                {digit}
              </CustomText>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={[
              styles.pinItem2,
              {
                opacity: disableBiometrics ? 0.3 : 1,
              },
            ]}
            onPress={triggerBiometrics}
            disabled={disableBiometrics}
          >
            {Platform.OS === "ios" ? (
              <Image
                source={
                  theme.colorScheme === "dark"
                    ? require("assets/face-id-white.png")
                    : require("assets/face-id.png")
                }
                transition={1000}
                style={{ width: 45, height: 45 }}
              />
            ) : (
              <Image
                source={
                  theme.colorScheme === "dark"
                    ? require("assets/fingerprint-white.png")
                    : require("assets/fingerprint.png")
                }
                transition={1000}
                style={{ width: 45, height: 45 }}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.pinItem2}
            onPress={() => handleDigitPress("0")}
          >
            <CustomText style={styles.pinText} weight="extrabold">
              0
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.pinItem2]} onPress={handleBackspace}>
            <Ionicons
              name="backspace-outline"
              size={30}
              color={theme.colors.text}
            />
          </TouchableOpacity>
        </CustomView>
      </CustomView>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexGrow: 1,
  },
  flexRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  pinItem: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderRadius: 0,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    borderColor: "#cecece",
  },
  pinItem2: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 50,
    marginRight: 35,
    marginBottom: 20,
  },
  pinText: {
    fontSize: 20,
  },
  backspaceText: {
    fontSize: 18,
  },
  flexButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: "80%",
    justifyContent: "center",
  },
});
export default CustomOTPInput;
