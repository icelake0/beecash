import { router } from "expo-router";
import React from "react";
import {
  CustomText,
  CustomView,
  CustomOTPInput,
  CustomSafeAreaView,
  CustomScrollView,
  CustomLoader,
} from "@/components/index";
import { useSession } from "ctx";
import { useBoundStore } from "@/stores/index";
import { toast } from "utils";

const CreatePin = () => {
  const { updatePin } = useSession();
  const { setPin } = useBoundStore((state) => state);

  const [isAuthLoading, setIsLoading] = React.useState(false);

  const handleOTPComplete = async (otp: any) => {
    setIsLoading(true);
    await updatePin({ pin: otp })
      .then((res) => {
        setIsLoading(false);
        toast({ message: res.message, color: "success" });
        setPin(otp);
        router.replace("/(public)/sign-in");
      })
      .catch((err: any) => {
        setIsLoading(false);
        toast({ message: err.message, color: "danger" });
      })
      .finally(() => {
        setIsLoading(false);
      });
    // Add logic for OTP verification or further actions
  };

  return (
    <CustomSafeAreaView>
      <CustomLoader visible={isAuthLoading} />
      <CustomScrollView>
        <CustomView>
          <CustomText gutterBottom>Create a 4-Digit PIN</CustomText>

          <CustomOTPInput
            onComplete={handleOTPComplete}
            length={4}
            disableBiometrics
          />
        </CustomView>
      </CustomScrollView>
    </CustomSafeAreaView>
  );
};

export default CreatePin;
