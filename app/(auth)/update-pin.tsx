import React from "react";

import {
  CustomScrollView,
  CustomSafeAreaView,
  CustomText,
  CustomView,
  CustomOTPInput,
  CustomLoader,
} from "@/components";
import { useBoundStore } from "@/stores";

// endpoint
import { updatePin } from "@/endpoints/auth-requests";
import { toast } from "utils";
import { router } from "expo-router";

const UpdatePin = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { setPin } = useBoundStore((state) => state);

  const handleOTPComplete = async (otp: any) => {
    setIsLoading(true);
    await updatePin({ pin: otp })
      .then((res) => {
        setIsLoading(false);
        toast({ message: res.message, color: "success" });
        setPin(otp);
        router.back();
      })
      .catch((err: any) => {
        setIsLoading(false);
        toast({ message: err.message, color: "danger" });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <CustomSafeAreaView>
      <CustomLoader visible={isLoading} />
      <CustomView>
        <CustomText>Enter a 4-digit PIN</CustomText>
      </CustomView>
      <CustomScrollView>
        <CustomOTPInput
          onComplete={handleOTPComplete}
          length={4}
          disableBiometrics
        />
      </CustomScrollView>
    </CustomSafeAreaView>
  );
};

export default UpdatePin;
