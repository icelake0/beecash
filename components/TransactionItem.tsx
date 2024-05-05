import moment from "moment";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { DefaultTheme, useTheme } from "styled-components/native";
import { Easing, FadeIn, FadeOut } from "react-native-reanimated";
import { AnimatePresence, MotiView } from "moti";

import CustomView from "./CustomView";
import CustomText from "./CustomText";
import { useBoundStore } from "@/stores";
import { ArrowBottomLeftCircleOutline, ArrowUpRightCircle } from "./icons";
import { formatMoney } from "utils";
import SkeletonLoader from "./SkeletonLoader";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";

type ItemType = {
  amount: number;
  createdAt: Date;
  status: "INITIATE" | "COMPLETED" | "FAILED" | "PENDING";
  previousBalance?: number;
  newBalance?: number;
  type: "CR" | "DR";
  reference?: string;
};

const TransactionLoader = () => {
  return (
    <AnimatePresence exitBeforeEnter>
      <MotiView
        entering={FadeIn.duration(500).easing(Easing.inOut(Easing.ease))}
        exiting={FadeOut.duration(500).easing(Easing.inOut(Easing.ease))}
      >
        <CustomView
          sx={{
            marginBottom: 30,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          $transparent
        >
          <CustomView
            sx={{
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
            $transparent
          >
            <SkeletonLoader radius={100} width={24} height={24} />
            <CustomView sx={{ marginLeft: 5 }} $transparent>
              <SkeletonLoader width={100} height={10} />
              <CustomView $transparent sx={{ marginTop: 2 }}>
                <SkeletonLoader width={80} height={10} />
              </CustomView>
            </CustomView>
          </CustomView>
          <CustomView $transparent>
            <CustomView
              sx={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
              $transparent
            >
              <CustomView $transparent>
                <SkeletonLoader width={80} height={11} />
              </CustomView>
            </CustomView>
            <CustomView
              sx={{ top: -2, alignSelf: "flex-end", marginTop: 5 }}
              $transparent
            >
              <SkeletonLoader width={60} height={10} />
            </CustomView>
          </CustomView>
        </CustomView>
      </MotiView>
    </AnimatePresence>
  );
};

const TransactionItem = ({
  amount,
  type,
  previousBalance,
  newBalance,
  createdAt,
  status,
  isLoading,
  reference,
}: ItemType & { isLoading?: boolean }) => {
  const theme = useTheme();
  const { isVisible } = useBoundStore((state) => state);

  const renderStatusColor = (
    status: "INITIATE" | "COMPLETED" | "FAILED" | "PENDING",
    theme: DefaultTheme
  ) => {
    switch (status) {
      case "INITIATE":
        return theme.colors.warning;
      case "PENDING":
        return theme.colors.warning;
      case "FAILED":
        return theme.colors.danger;
      case "COMPLETED":
        return theme.colors.success;
      default:
        return theme.colors.slate["700"];
    }
  };

  if (isLoading) {
    return <TransactionLoader />;
  }

  return (
    <TouchableOpacity
      onPress={() => {
        router.navigate({
          pathname: "/(auth)/transaction-details",
          params: {
            amount,
            type,
            previousBalance,
            newBalance,
            createdAt,
            status,
            reference,
          },
        });
      }}
    >
      <CustomView
        sx={{
          marginBottom: 30,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        $transparent
      >
        <CustomView
          sx={{
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
          $transparent
        >
          {type === "CR" ? (
            <ArrowUpRightCircle color={theme.colors.success} size={24} />
          ) : (
            <ArrowBottomLeftCircleOutline
              color={theme.colors.danger}
              size={24}
            />
          )}
          <CustomView sx={{ marginLeft: 5 }} $transparent>
            <CustomText
              size={10}
              color={(theme) => renderStatusColor(status, theme)}
              variant="overline"
              weight="boldest"
            >
              {status}
            </CustomText>
            <CustomText size={9} color={(theme) => theme.colors.slate["600"]}>
              {moment(createdAt).format("Do MMMM YYYY")}
            </CustomText>
          </CustomView>
        </CustomView>
        <CustomView $transparent>
          <CustomView
            sx={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
            $transparent
          >
            <CustomView $transparent>
              <CustomText size={12.5} weight="boldest" sx={{ marginRight: 2 }}>
                <CustomText weight="bold" size={12.5}>
                  {isVisible
                    ? type === "CR"
                      ? "+ £" + formatMoney(amount)
                      : "- £" + formatMoney(amount)
                    : "ᐧᐧᐧᐧ"}{" "}
                </CustomText>
              </CustomText>
            </CustomView>
          </CustomView>
        </CustomView>
      </CustomView>
    </TouchableOpacity>
  );
};

export default TransactionItem;
