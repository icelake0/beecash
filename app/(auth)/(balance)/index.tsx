import React from "react";
import { AnimatedFlashList, FlashList } from "@shopify/flash-list";

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
import { LayoutAnimation } from "react-native";

const OfflineBalance = () => {
  const { offlineBalance, isVisible, toggleVisibility, offlineTransactions } =
    useBoundStore((state) => state);
  const list = React.useRef<FlashList<number> | null>(null);

  React.useEffect(() => {
    list.current?.prepareForLayoutAnimationRender();
    // After removing the item, we can start the animation.
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, []);

  return (
    <CustomSafeAreaView edges={["bottom"]}>
      <>
        <CustomText
          sx={{ textAlign: "center", marginTop: 35 }}
          color={(theme) => theme.colors.slate["600"]}
        >
          Offline balance
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
            {isVisible ? formatMoney(offlineBalance) : "ᐧᐧᐧᐧ"}
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
        ref={list}
        showsVerticalScrollIndicator={false}
        data={offlineTransactions ?? []}
        keyExtractor={(item, index) => index?.toLocaleString()}
        renderItem={({ item }) => <TransactionItem {...item} />}
        estimatedItemSize={200}
        ListEmptyComponent={<CustomEmptyState />}
      />
    </CustomSafeAreaView>
  );
};

export default OfflineBalance;
