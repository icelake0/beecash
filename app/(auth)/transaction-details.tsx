import React from "react";
import {
  CustomView,
  CustomSafeAreaView,
  CustomScrollView,
  CustomText,
  CustomCard,
  CustomPill,
  DetailsItem,
} from "@/components";
import { useLocalSearchParams } from "expo-router";
import moment from "moment";
import * as Clipboard from "expo-clipboard";

import { useBoundStore } from "@/stores";
import { formatMoney, toast } from "utils";
import { Platform, TouchableOpacity } from "react-native";
import { CopyDuotone } from "@/components/icons";
import { useTheme } from "styled-components/native";

type ItemType = {
  amount: string;
  createdAt: string;
  status: "INITIATE" | "COMPLETED" | "FAILED" | "PENDING";
  previousBalance: string;
  newBalance: string;
  type: "CR" | "DR";
  reference: string;
};

const TransactionDetails = () => {
  const {
    amount,
    createdAt,
    status,
    previousBalance,
    newBalance,
    type,
    reference,
  } = useLocalSearchParams<ItemType>();
  const { isVisible, toggleVisibility } = useBoundStore((state) => state);
  const theme = useTheme();

  const CopyToClipboard = async (text: string) => {
    toast({ message: "Copied to clipboard", color: "success" });
    await Clipboard.setStringAsync(text);
  };

  const getStatusColor = (status: string, theme: any) => {
    switch (status) {
      case "INITIATE":
        return theme.colors.warning;
      case "COMPLETED":
        return theme.colors.green["500"];
      case "FAILED":
        return theme.colors.red["700"];
      case "PENDING":
        return theme.colors.warning;
      default:
        return "gray";
    }
  };

  return (
    <CustomSafeAreaView edges={["bottom"]}>
      <CustomScrollView>
        <CustomView sx={{ justifyContent: "center", alignItems: "center" }}>
          <CustomView style={{ flexDirection: "row", alignItems: "center" }}>
            <CustomText
              weight="bold"
              size={30}
              color={(theme) => theme.colors.slate["700"]}
              sx={{ top: Platform.OS === "ios" ? -10 : 0 }}
            >
              £
            </CustomText>
            <CustomText
              size={Platform.OS === "ios" ? 110 : 250}
              weight={"extrabold"}
              sx={{
                minHeight: 180,
                alignSelf: !isVisible ? "flex-end" : "flex-start",
              }}
            >
              {isVisible ? formatMoney(+amount) : "ᐧᐧᐧᐧ"}
            </CustomText>
          </CustomView>
          <CustomView sx={{ justifyContent: "center", alignItems: "center" }}>
            <CustomPill
              iconName={isVisible ? "eye" : "eye-off"}
              size="sm"
              onPress={toggleVisibility}
              variant="outlined"
              label={isVisible ? "Hide" : "Show"}
            />
          </CustomView>
        </CustomView>
        <CustomCard spacing-x="md" spacing-y="md" sx={{ marginTop: 50 }}>
          <CustomCard.Title
            weight="bold"
            style={{ marginBottom: 20 }}
            color={theme.colors.slate["500"]}
          >
            Transaction Details
          </CustomCard.Title>
          <CustomView $transparent>
            <DetailsItem
              label="Date & Time"
              content={moment(createdAt).format("DD MMMM YYYY, LTS")}
            />
            <DetailsItem
              label="Transaction Type"
              content={type === "CR" ? "Credit" : "Debit"}
              color={
                type === "CR"
                  ? theme.colors.green["500"]
                  : theme.colors.red["700"]
              }
            />
            <DetailsItem
              label="Amount"
              content={isVisible ? "£" + formatMoney(+amount) : "ᐧᐧᐧᐧ"}
            />
            <DetailsItem
              label="Previous Balance"
              content={isVisible ? "£" + formatMoney(+previousBalance) : "ᐧᐧᐧᐧ"}
            />
            <DetailsItem
              label="New Balance"
              content={isVisible ? "£" + formatMoney(+newBalance) : "ᐧᐧᐧᐧ"}
            />
            <DetailsItem
              label="Status"
              content={status}
              color={getStatusColor(status, theme)}
            />
            <DetailsItem
              label="Reference"
              content={reference}
              IconRight={() => (
                <TouchableOpacity onPress={() => CopyToClipboard(reference)}>
                  <CopyDuotone color={theme.colors.slate["400"]} />
                </TouchableOpacity>
              )}
            />
          </CustomView>
        </CustomCard>
      </CustomScrollView>
    </CustomSafeAreaView>
  );
};

export default TransactionDetails;
