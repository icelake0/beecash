import { useSession } from "ctx";
import { Redirect } from "expo-router";
import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from "expo-status-bar";

import { CustomModalHeader, CustomHeader } from "@/components";
import { useTheme } from "styled-components/native";
// export const unstable_settings = {
//   initialRouteName: "(auth)/home",
// };

const AuthLayout = () => {
  const { session } = useSession();
  const theme = useTheme();

  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/(public)/onboarding" />;
  }

  return (
    <>
      <StatusBar style={theme.colorScheme === "dark" ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerShown: false,
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name="(balance)"
          options={{
            headerShown: true,
            header(props) {
              return <CustomHeader title="Back" {...props} />;
            },
          }}
        />
        <Stack.Screen name="home" />
        <Stack.Screen
          name="topup"
          options={{
            presentation: "modal",
            title: "Topup Balance",
            headerShown: true,
            header(props) {
              return (
                <CustomModalHeader title="Top up Wallet Balance" {...props} />
              );
            },
          }}
        />
        <Stack.Screen
          name="receive"
          options={{
            presentation: "modal",
            title: "Initiate Transaction",
            headerShown: true,
            header(props) {
              return (
                <CustomModalHeader title="Initiate Transaction" {...props} />
              );
            },
          }}
        />
        <Stack.Screen
          name="transaction-details"
          options={{
            headerShown: true,
            header(props) {
              return <CustomHeader title="Back" {...props} />;
            },
          }}
        />
        <Stack.Screen
          name="complete-transaction"
          options={{
            headerShown: true,
            header(props) {
              return <CustomHeader title="Back" {...props} />;
            },
          }}
        />
        <Stack.Screen
          name="update-password"
          options={{
            headerShown: true,
            header(props) {
              return <CustomHeader title="Back" {...props} />;
            },
          }}
        />
        <Stack.Screen
          name="update-pin"
          options={{
            headerShown: true,
            header(props) {
              return <CustomHeader title="Back" {...props} />;
            },
          }}
        />
        <Stack.Screen
          name="update-profile"
          options={{
            headerShown: true,
            header(props) {
              return <CustomHeader title="Back" {...props} />;
            },
          }}
        />
      </Stack>
    </>
  );
};

export default AuthLayout;
