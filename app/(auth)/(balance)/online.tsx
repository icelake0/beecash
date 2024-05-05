import React from "react";
import { AnimatedFlashList } from "@shopify/flash-list";

import {
  CustomSafeAreaView,
  CustomView,
  CustomText,
  CustomPill,
  CustomDivider,
  TransactionItem,
  CustomEmptyState,
} from "@/components";
import { useBoundStore } from "@/stores";
import { formatMoney } from "utils";

const OnlineBalance = () => {
  const { balance, isVisible, toggleVisibility, transactions } = useBoundStore(
    (state) => state
  );

  return (
    <CustomSafeAreaView edges={["bottom"]}>
      <>
        <CustomText
          sx={{ textAlign: "center", marginTop: 35 }}
          color={(theme) => theme.colors.slate["600"]}
        >
          Available balance
        </CustomText>

        <CustomView
          sx={(theme) => ({
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
            height: 100,
          })}
        >
          <CustomText
            sx={{ alignItems: "flex-start" }}
            size={25}
            weight="extrabold"
          >
            £
          </CustomText>
          <CustomText size={80} weight="extrabold">
            {isVisible ? formatMoney(balance) : "ᐧᐧᐧᐧ"}
          </CustomText>
        </CustomView>
        <CustomView sx={{ alignSelf: "center", justifyContent: "center" }}>
          <CustomPill
            label={isVisible ? "Hide" : "Show"}
            size="sm"
            iconName={isVisible ? "eye" : "eye-off"}
            iconPosition="left"
            onPress={toggleVisibility}
            variant="contained"
          />
        </CustomView>
        <CustomView sx={{ marginTop: 50 }}>
          <CustomText size={12} weight="extrabold">
            Recent Activities
          </CustomText>
        </CustomView>
        <CustomDivider sx={{ marginBottom: 20 }} fullWidth />
      </>
      <AnimatedFlashList
        showsVerticalScrollIndicator={false}
        data={transactions ?? []}
        keyExtractor={(item, index) => index?.toLocaleString()}
        renderItem={({ item }) => <TransactionItem {...item} />}
        estimatedItemSize={200}
        ListEmptyComponent={<CustomEmptyState />}
      />
    </CustomSafeAreaView>
  );
};

export default OnlineBalance;
