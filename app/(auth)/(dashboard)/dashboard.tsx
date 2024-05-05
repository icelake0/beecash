import { Link, SplashScreen, useNavigation, router } from "expo-router";
import React, { useCallback, useEffect } from "react";
import { View, RefreshControl, TouchableOpacity, Platform } from "react-native";
import { useTheme } from "styled-components/native";
import { FlashList } from "@shopify/flash-list";
import NfcManager, { NfcEvents, NfcTech, Ndef } from "react-native-nfc-manager";

import {
  CustomText,
  CustomView,
  CustomCard,
  CustomSafeAreaView,
  CustomScrollView,
  CustomIconButton,
  CustomAvatar,
  CustomEmptyState,
  AndroidNFCModal,
  TransactionItem,
} from "@/components";
import {
  AccountBalanceIcon,
  ArrowDownOutline,
  ArrowTopLeftOutline,
} from "@/components/icons";
import { useBoundStore } from "@/stores";
import { NfcProxy, convertToInitials, formatMoney, toast } from "utils";
import { makePayment } from "@/endpoints/wallet-requests";

SplashScreen.preventAutoHideAsync();

export default function Dashboard() {
  const navigation = useNavigation();
  const {
    isVisible,
    toggleVisibility,
    authData,
    balance,
    offlineBalance,
    getBalance,
    refreshOfflineBalance,
    refreshOfflineTransactions,
    getTransactions,
    transactions,
    offlineTransactions,
    isTransactionLoaded,
    saveTransactionReceipt,
  } = useBoundStore((state) => state);
  const theme = useTheme();
  const [openModal, setOpenModal] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [enabled, setEnabled] = React.useState<boolean | null>(null);

  // Effect
  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
      // Do your stuff here
      navigation.dispatch(e.data.action);
    });
  }, [navigation]);

  useEffect(() => {
    (async () => {
      const enabled = await NfcManager.isEnabled();
      setEnabled(enabled);
      // listen to the NFC on/off state on Android device
      if (Platform.OS === "android") {
        NfcManager.setEventListener(
          NfcEvents.StateChanged,
          ({ state }: any = {}) => {
            NfcManager.cancelTechnologyRequest().catch(() => 0);
            if (state === "off") {
              setEnabled(false);
            } else if (state === "on") {
              setEnabled(true);
            }
          }
        );
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      Promise.allSettled([await getBalance(), await getTransactions()]);
    })();
  }, []);

  const onRefresh = React.useCallback(async () => {
    setIsLoading(true);
    Promise.allSettled([
      await getBalance(),
      await getTransactions(),
      await refreshOfflineBalance(balance),
    ])
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        const err = error as Error;
        setIsLoading(false);
        toast({ message: err.message, color: "danger" });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const onReadNfcTag = useCallback(async () => {
    const tag = await NfcProxy.readTag();
    setEnabled(await NfcProxy.isEnabled());

    if (!enabled) {
      toast({
        message: "NFC is not enabled, go to your device settings",
        color: "danger",
      });
      NfcProxy.goToNfcSetting();
      return;
    }

    if (tag) {
      const ndef =
        Array.isArray(tag.ndefMessage) && tag.ndefMessage.length > 0
          ? tag.ndefMessage[0]
          : null;
      const payload: any = JSON.parse(Ndef.text.decodePayload(ndef.payload));
      if (payload && Object.keys(payload).length > 0) {
        try {
          const data = {
            amount: payload.amount,
            receiverId: payload.receiverId,
          };
          const paymentResponse = await makePayment(data);

          toast({ message: paymentResponse.message, color: "success" });
          saveTransactionReceipt!(paymentResponse.data);

          //Write here payment status on tag
          setTimeout(async () => {
            await NfcProxy.init();
            const nfcData = {
              ...paymentResponse.data.receiverTransaction,
              validation: "PENDING",
            };
            await NfcProxy.writeNdef({
              type: "TEXT",
              value: JSON.stringify(nfcData),
            });
          }, 3000);

          Promise.all([
            await getBalance(),
            await getTransactions(),
            await refreshOfflineBalance(balance),
            await refreshOfflineTransactions(transactions),
          ]);
        } catch (error) {
          const err = error as Error;
          toast({ message: err.message, color: "danger" });
        }
      }
    }
  }, [enabled]);

  return (
    <CustomSafeAreaView edges={["top", "bottom"]}>
      <CustomView style={{ paddingBottom: 1 }}>
        <CustomAvatar
          initials={
            authData?.firstName
              ? convertToInitials(authData?.firstName, authData?.lastName)
              : ""
          }
          onPress={() => {
            router.push("/(auth)/(dashboard)/profile");
          }}
        />
      </CustomView>
      <CustomScrollView
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
        }
      >
        <CustomCard spacing-x="lg" spacing-y="lg">
          <CustomCard.Title weight="bold">Wallet balance</CustomCard.Title>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <CustomText weight="extrabold" size={20}>
              £
            </CustomText>
            <CustomText
              size={Platform.OS === "ios" ? 50 : 80}
              weight={"extrabold"}
              sx={{
                marginRight: 2,
                minHeight: 60,
                alignSelf: !isVisible ? "flex-end" : "flex-start",
              }}
            >
              {isVisible ? formatMoney(offlineBalance) : "ᐧᐧᐧᐧ"}
            </CustomText>
            <CustomIconButton
              iconName={isVisible ? "eye" : "eye-off"}
              size="sm"
              onPress={toggleVisibility}
              variant="outlined"
            />
          </View>
          <CustomCard.Separator fullWidth />
          <CustomCard.Footer
            divider
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <Link asChild href={"/(auth)/(balance)/"}>
              <CustomIconButton
                iconName={"home-sharp"}
                size="md"
                onPress={() => {}}
                variant="outlined"
                label="Balance"
              >
                <AccountBalanceIcon size={22} color={theme.colors.text} />
              </CustomIconButton>
            </Link>
            <Link asChild href={"/receive"}>
              <CustomIconButton
                iconName={"home-sharp"}
                size="md"
                onPress={() => {}}
                variant="outlined"
                label="Receive"
              >
                <ArrowDownOutline size={22} color={theme.colors.text} />
              </CustomIconButton>
            </Link>
            <CustomIconButton
              iconName={"home-sharp"}
              size="md"
              onPress={onReadNfcTag}
              variant="outlined"
              label="Pay"
            >
              <ArrowTopLeftOutline size={22} color={theme.colors.text} />
            </CustomIconButton>

            <Link asChild href={"/topup"}>
              <CustomIconButton
                iconName={"add-outline"}
                size="md"
                onPress={() => {}}
                variant="outlined"
                label="Top-up"
                iconSize={22}
              />
            </Link>
          </CustomCard.Footer>
        </CustomCard>
        <CustomView
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 30,
          }}
        >
          <CustomText variant="caption">Recent Transactions</CustomText>
          <TouchableOpacity
            onPress={() => router.push("/(auth)/(dashboard)/transactions")}
          >
            <CustomText variant="link" sx={{ fontSize: 12 }}>
              See all
            </CustomText>
          </TouchableOpacity>
        </CustomView>
        <CustomCard
          sx={{
            minHeight: 300,
          }}
          spacing-y="lg"
          spacing-x="md"
        >
          <FlashList
            data={offlineTransactions.slice(0, 5) ?? []}
            keyExtractor={(item, index) => index?.toLocaleString()}
            renderItem={({ item }) => (
              <TransactionItem {...item} isLoading={isTransactionLoaded} />
            )}
            estimatedItemSize={200}
            ListEmptyComponent={<CustomEmptyState />}
            showsVerticalScrollIndicator={false}
          />
        </CustomCard>
      </CustomScrollView>
      <AndroidNFCModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        timeout={100000}
      />
    </CustomSafeAreaView>
  );
}
