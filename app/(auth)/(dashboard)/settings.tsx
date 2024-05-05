import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { useTheme } from "styled-components/native";
import { TouchableOpacity, Switch, Platform } from "react-native";

import {
  CustomView,
  CustomText,
  CustomSafeAreaView,
  CustomScrollView,
  CustomCard,
  DetailsItem,
  CustomDialog,
} from "@/components";
import { useSession } from "ctx";

const Settings = () => {
  const theme = useTheme();
  const { signOut } = useSession();
  const [openDialog, setOpenDialog] = React.useState(false);

  const [switchValue, setSwitchValue] = React.useReducer(
    (s) => (theme.colorScheme === "dark" ? true : false ?? !s),
    false
  );

  React.useLayoutEffect(() => {
    "worklet";
    setSwitchValue();
  }, [theme.colorScheme]);

  const handleSwitchChange = React.useCallback(async () => {
    await theme.toggleTheme();
    setSwitchValue();
  }, [theme.toggleTheme]);

  return (
    <CustomSafeAreaView edges={["top", "bottom"]}>
      <CustomDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        message="Are you sure you want to log out?"
        onConfirm={async () => {
          await signOut();
        }}
      />
      <CustomView sx={{ marginVertical: 13 }}>
        <CustomText variant="h4" weight="extrabold">
          Settings
        </CustomText>
      </CustomView>
      <CustomScrollView>
        <CustomView $transparent>
          <CustomCard spacing-x="lg" spacing-y="lg">
            <CustomCard.Title
              sx={{ marginBottom: 20, fontSize: 10 }}
              variant="overline"
            >
              Account
            </CustomCard.Title>
            <DetailsItem
              label="Update Profile"
              IconLeft={() => (
                <Ionicons name="person" color={theme.colors.text} />
              )}
              onPress={() => router.push("/(auth)/update-profile")}
            />
          </CustomCard>
          <CustomCard spacing-x="lg" spacing-y="lg">
            <CustomCard.Title
              sx={{ marginBottom: 20, fontSize: 10 }}
              variant="overline"
            >
              Security
            </CustomCard.Title>
            <DetailsItem
              label="Change Password"
              IconLeft={() => (
                <Ionicons name="lock-closed" color={theme.colors.text} />
              )}
              onPress={() => router.push("/(auth)/update-password")}
            />
            <DetailsItem
              label="Change PIN"
              IconLeft={() => (
                <Ionicons name="star" color={theme.colors.text} />
              )}
              onPress={() => router.push("/(auth)/update-pin")}
            />
          </CustomCard>
          <CustomCard spacing-x="lg" spacing-y="lg">
            <CustomCard.Title
              sx={{ marginBottom: 20, fontSize: 10 }}
              variant="overline"
            >
              Others
            </CustomCard.Title>
            <DetailsItem
              label="Preferences (Light/Dark)"
              IconLeft={() => (
                <Ionicons
                  name="swap-horizontal-sharp"
                  color={theme.colors.text}
                />
              )}
              IconRight={() => (
                <Switch
                  value={switchValue}
                  onValueChange={handleSwitchChange}
                  trackColor={{
                    true: theme.colors.green["900"],
                    false: theme.colors.primary,
                  }}
                  thumbColor={theme.colors.slate["700"]}
                  ios_backgroundColor={theme.colors.slate["300"]}
                />
              )}
            />
          </CustomCard>
        </CustomView>
      </CustomScrollView>
      <TouchableOpacity
        onPress={() => setOpenDialog(true)}
        style={{
          alignSelf: "center",
          marginBottom: Platform.select({
            ios: theme.insets.bottom * 3,
            android: theme.insets.bottom + 150,
          }),
          justifyContent: "center",
          zIndex: 999,
        }}
      >
        <CustomView sx={{ flexDirection: "row", alignItems: "center" }}>
          <CustomText
            color={(theme) => theme.colors.red[500]}
            variant="caption"
            weight="bold"
            sx={{ alignItems: "center", marginRight: 10 }}
          >
            Log Out
          </CustomText>
          <Ionicons name="log-out" size={20} color={theme.colors.red[500]} />
        </CustomView>
      </TouchableOpacity>
    </CustomSafeAreaView>
  );
};

const MemoizedSettingsScreen = React.memo(Settings);

export default MemoizedSettingsScreen;
