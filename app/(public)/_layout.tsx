import { useSession } from "ctx";
import { Redirect, Stack } from "expo-router";
import React from "react";
import { CustomHeader } from "@/components/index";

const PublicLayout = () => {
  const { session } = useSession();

  if (session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/(auth)/home" />;
  }
  return (
    <Stack>
      <Stack.Screen
        name="onboarding"
        options={{
          title: "Onboarding",
          gestureDirection: "horizontal",
          animation: "fade",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          title: "Sign Up",
          gestureDirection: "horizontal",
          header: (props) => <CustomHeader {...props} />,
        }}
      />
      <Stack.Screen
        name="create-pin"
        options={{
          title: "Create Pin",
          gestureDirection: "horizontal",
          header: (props) => <CustomHeader {...props} />,
        }}
      />
      <Stack.Screen
        name="sign-in"
        options={{
          title: "Sign In",
          gestureDirection: "horizontal",
          header: (props) => <CustomHeader title="Sign In" {...props} />,
        }}
      />
    </Stack>
  );
};

export default PublicLayout;
