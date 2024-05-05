import React from "react";
import { useTheme } from "styled-components/native";
import { Platform, TouchableOpacity } from "react-native";
import moment from "moment";

import {
  CustomView,
  CustomText,
  CustomSafeAreaView,
  CustomScrollView,
  CustomAvatar,
  CustomCard,
  DetailsItem,
} from "@/components";
import { useBoundStore } from "@/stores";
import { convertToInitials } from "utils";

const Profile = () => {
  const { authData } = useBoundStore((state) => state);
  const theme = useTheme();
  return (
    <CustomSafeAreaView edges={["bottom"]}>
      <CustomView
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CustomView>
          <CustomText variant="h5" weight="extrabold">
            {authData?.firstName} {authData?.lastName}
          </CustomText>
          <CustomText
            variant="caption"
            color={(theme) => theme.colors.slate["600"]}
          >
            {authData?.email}
          </CustomText>
        </CustomView>
        <CustomAvatar
          initials={
            authData?.firstName
              ? convertToInitials(authData?.firstName, authData?.lastName)
              : ""
          }
        />
      </CustomView>
      <CustomScrollView
        contentContainerStyle={{
          paddingTop: 30,
        }}
      >
        <CustomText
          color={(theme) => theme.colors.slate["600"]}
          variant="overline"
          size={11}
        >
          Details
        </CustomText>
        <CustomCard spacing-x="md" spacing-y="md">
          <DetailsItem
            label="FirstName"
            content={authData?.firstName!}
            color={theme.colors.slate["600"]}
          />
          <DetailsItem
            label="LastName"
            content={authData?.lastName!}
            color={theme.colors.slate["600"]}
          />
          <DetailsItem
            label="Username"
            content={authData?.username!}
            color={theme.colors.slate["600"]}
          />
          <DetailsItem
            label="Date Joined"
            content={moment(authData?.createdAt!).format("DD MMMM YYYY, LTS")}
            color={theme.colors.slate["600"]}
          />
        </CustomCard>
      </CustomScrollView>
      <TouchableOpacity
        onPress={() => {}}
        style={{
          alignSelf: "center",
          marginBottom: Platform.select({
            ios: theme.insets.bottom * 3,
            android: theme.insets.bottom + 150,
          }),
        }}
      >
        <CustomText
          color={(theme) => theme.colors.red[500]}
          variant="caption"
          weight="bold"
        >
          Delete Account
        </CustomText>
      </TouchableOpacity>
    </CustomSafeAreaView>
  );
};

export default Profile;
