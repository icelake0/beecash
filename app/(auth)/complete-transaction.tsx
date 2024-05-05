import React from "react";
import LottieView from "lottie-react-native";
import { useTheme } from "styled-components/native";
import NfcManager, { NfcEvents, Ndef } from "react-native-nfc-manager";

import {
  CustomView,
  CustomText,
  CustomSafeAreaView,
  CustomScrollView,
  CustomButton,
} from "@/components";
import { NfcProxy, toast } from "utils";
import { useBoundStore } from "../../stores";
import { router } from "expo-router";

const CompleteTransaction = () => {
  const animation = React.useRef(null);
  const theme = useTheme();
  const { addOfflineBalance, addOfflineTransaction } = useBoundStore((state) => state);

  const completeTransaction = React.useCallback(async () => {
    const tag = await NfcProxy.readTag();
    if (!tag) {
      toast({
        message: "Please tap a tag to complete transaction",
        color: "danger",
      });
      return;
    }
    const ndef =
      Array.isArray(tag.ndefMessage) && tag.ndefMessage.length > 0
        ? tag.ndefMessage[0]
        : null;
    const payload: any = JSON.parse(Ndef.text.decodePayload(ndef.payload));
    if (payload && Object.keys(payload).length > 0) {
      try {
        // TODO: Complete transaction logic
        await addOfflineBalance!(payload?.amount)
        await addOfflineTransaction!(payload)
        toast({ message: "Transaction completed", color: "success" });
        router.back()
      } catch (error) {
        // TODO: throw error exception
      }
    }
  }, []);

  return (
    <CustomSafeAreaView>
      <CustomScrollView>
        <CustomView
          sx={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 60,
          }}
        >
          <LottieView
            autoPlay
            ref={animation}
            style={{
              width: "100%",
              height: 350,
              borderCurve: "circular",
              borderWidth: 1,
              backgroundColor: theme.colors.slate["100"],
              borderColor: theme.colors.slate["200"],
            }}
            loop
            source={
              theme.colorScheme === "dark"
                ? require("assets/lottie/complete-transaction-light.json")
                : require("assets/lottie/complete-transaction.json")
            }
            speed={0.5}
          />
          <CustomText
            sx={{ textAlign: "center", marginTop: 20, lineHeight: 20 }}
          >
            Please scan the NFC tag once the customer has completed his/her
            transaction, in order to complete the transaction.
          </CustomText>
          <CustomText sx={{ textAlign: "center", marginTop: 20 }}>
            Wait for the customer to scan the NFC tag.
          </CustomText>
        </CustomView>
        <CustomButton flat size="lg" onPress={completeTransaction}>
          Complete Transaction
        </CustomButton>
      </CustomScrollView>
    </CustomSafeAreaView>
  );
};

export default CompleteTransaction;
