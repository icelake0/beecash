import React from "react";
import { Tabs } from "expo-router";
import { Platform, TouchableOpacity } from "react-native";
import { useTheme } from "styled-components/native";
import { BlurView } from "expo-blur";
import { MotiView } from "moti";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  HomeIcon,
  ProfileIcon,
  Cog,
  TransactionIcon,
} from "@/components/icons";
import { CustomHeader, CustomText } from "@/components";

const DashboardLayout = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const _tabBarLabel = React.useCallback((props: any) => {
    return (
      <>
        {props?.focused && (
          <MotiView
            from={{
              translateY: 10,
              opacity: 0,
            }}
            animate={{
              translateY: 0,
              opacity: 1,
            }}
            transition={{
              type: "timing",
              duration: 300,
              delay: 100,
            }}
            style={{
              position: "absolute",
              bottom: 3,
            }}
          >
            <CustomText weight="extrabold" size={11}>
              {props?.children}
            </CustomText>
          </MotiView>
        )}
      </>
    );
  }, []);

  const _tabBarBackground = React.useCallback(() => {
    return (
      <>
        {Platform.OS !== "ios" ? null : (
          <BlurView
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              paddingBottom: insets.bottom,
            }}
            tint={theme.colorScheme === "light" ? "light" : "dark"}
            intensity={50}
            blurReductionFactor={4}
          />
        )}
      </>
    );
  }, [insets, theme]);

  const _tabBarIcon = React.useCallback(
    ({ route, focused }: any) => {
      switch (route.name) {
        case "dashboard":
          return (
            <HomeIcon
              color={focused ? theme.colors.text : theme.colors.slate["500"]}
              size={focused ? 25 : 24}
              name={focused ? "home-filled-duotone" : "home-line-duotone"}
            />
          );
        case "profile":
          return (
            <ProfileIcon
              name={focused ? "user-bold-filled" : "user-thin-outline"}
              size={focused ? 25 : 24}
              color={focused ? theme.colors.text : theme.colors.slate["500"]}
            />
          );
        case "transactions":
          return (
            <TransactionIcon
              size={focused ? 25 : 24}
              color={focused ? theme.colors.text : theme.colors.slate["500"]}
            />
          );
        case "settings":
          return (
            <Cog
              name={focused ? "cog-filled" : "cog-duotone"}
              size={focused ? 25 : 24}
              color={focused ? theme.colors.text : theme.colors.slate["500"]}
            />
          );

        default:
          return null;
      }
    },
    [theme]
  );

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => _tabBarIcon({ route, focused }),
        tabBarStyle: {
          position: "absolute",
          borderColor: theme.colors.slate["300"],
          backgroundColor: Platform.select({
            ios: "transparent",
            android: theme.colors.background,
          }),
          borderTopColor:
            theme.colorScheme === "dark"
              ? theme.colors.slate["200"]
              : theme.colors.slate["500"],
          borderTopWidth: 0.2,
          paddingBottom: Platform.select({
            android: 20,
            ios: 30,
          }),
          height: Platform.select({
            android: 90,
            ios: 90,
          }),
        },
        tabBarLabelStyle: {
          fontFamily: "Sora_600SemiBold",
          fontSize: 11.1,
        },
        tabBarBackground: () => _tabBarBackground(),
        tabBarActiveTintColor: theme.colors.text,
        tabBarHideOnKeyboard: true,
        tabBarAccessibilityLabel: "Beecash bottom tab",
        tabBarAllowFontScaling: false,
        tabBarButton: (props) => (
          <TouchableOpacity {...props} activeOpacity={0.3} />
        ),
      })}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Home",
          tabBarLabel: (props) => _tabBarLabel(props),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: true,
          tabBarLabel: (props) => _tabBarLabel(props),
          header: (props) => <CustomHeader title="Back" {...props} />,
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: "Transactions",
          headerShown: true,
          tabBarLabel: (props) => _tabBarLabel(props),
          header: (props) => <CustomHeader title="Back" {...props} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarLabel: (props) => _tabBarLabel(props),
        }}
      />
    </Tabs>
  );
};

export default DashboardLayout;
