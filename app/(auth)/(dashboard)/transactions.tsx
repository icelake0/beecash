import { Dimensions, RefreshControl } from "react-native";
import React from "react";
import { FlashList } from "@shopify/flash-list";

import {
  TransactionItem,
  CustomText,
  CustomSafeAreaView,
  CustomScrollView,
  CustomEmptyState,
} from "@/components";
import { useBoundStore } from "@/stores/index";

const Transactions = () => {
  const { offlineTransactions, getTransactions, isTransactionLoaded } = useBoundStore(
    (state) => state
  );
  const [isLoading, setIsLoading] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setIsLoading(true);
    await getTransactions()
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        console.log({ err });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <CustomSafeAreaView>
      <CustomText weight="extrabold" size={20} gutterBottom>
        Transactions
      </CustomText>
      <CustomScrollView
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
        contentContainerStyle={{
          paddingBottom: 100,
          minHeight: Dimensions.get("screen").height,
        }}
      >
        <FlashList
          data={offlineTransactions ?? []}
          keyExtractor={(item, index) => index?.toLocaleString()}
          renderItem={({ item }) => (
            <TransactionItem {...item} isLoading={isTransactionLoaded} />
          )}
          estimatedItemSize={200}
          ListEmptyComponent={<CustomEmptyState height={200} />}
          contentContainerStyle={{
            paddingVertical: 10,
          }}
        />
      </CustomScrollView>
    </CustomSafeAreaView>
  );
};

export default Transactions;
