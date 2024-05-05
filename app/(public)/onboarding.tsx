import React from "react";
import { Image } from "expo-image";
import { StyleSheet, Dimensions } from "react-native";
import { ErrorBoundaryProps, router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "styled-components/native";
import { Link } from "expo-router";

import {
  CustomButton,
  CustomText,
  CustomView,
  CustomSafeAreaView,
  CustomLogo,
  CustomScrollView,
} from "@/components/index";

export function ErrorBoundary(props: ErrorBoundaryProps) {
  return (
    <CustomView style={{ flex: 1, backgroundColor: "red" }}>
      <CustomText>{props.error.message}</CustomText>
      <CustomText onPress={props.retry}>Try Again?</CustomText>
    </CustomView>
  );
}

const { height } = Dimensions.get("screen");

export default function OnboardingScreen() {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <CustomSafeAreaView>
      <CustomScrollView>
        <CustomView style={[styles.container, { paddingTop: insets.top }]}>
          <CustomView style={styles.logo}>
            <CustomLogo />
          </CustomView>
          <CustomText size={23.5} weight="bold">
            Make Payments Easier and Faster
          </CustomText>
          <CustomText
            variant="overline"
            style={{ marginBottom: 20, lineHeight: 30 }}
          >
            Get started with a free account.
          </CustomText>
          <CustomView>
            <Image
              source={
                theme.colorScheme === "dark"
                  ? require("assets/astronaut-no-bg.png")
                  : require("assets/payment.webp")
              }
              contentFit="cover"
              transition={1000}
              style={[
                styles.image2,
                theme.colorScheme === "dark" && styles.image1,
              ]}
            />
          </CustomView>
          <CustomView style={styles.dots}>
            <CustomText variant="body1">
              Easily View all your credit card payments in one place
            </CustomText>
          </CustomView>
          <CustomView style={{ marginTop: 20 }}>
            <CustomButton
              size="md"
              flat
              onPress={() => {
                router.push("/(public)/sign-up");
              }}
            >
              Setup Account
            </CustomButton>
            <Link href={"/(public)/sign-in"} asChild>
              <CustomButton
                size="md"
                variant="outlined"
                style={{ marginTop: 10 }}
                flat
              >
                Already have an account? Sign in
              </CustomButton>
            </Link>
          </CustomView>
        </CustomView>
      </CustomScrollView>
    </CustomSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height,
  },
  image: {
    width: 60,
    height: 60,
  },
  image1: {
    // height: 380,
    // borderRadius: 100,
  },
  image2: {
    height: 350,
    borderWidth: 0.01,
    borderColor: "#111",
  },
  logo: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  dots: {
    marginTop: 30,
  },
});
