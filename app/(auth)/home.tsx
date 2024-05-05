import { Link, router, useNavigation } from "expo-router";
import * as LocalAuthentication from "expo-local-authentication";

import React from "react";
import {
  CustomText,
  CustomView,
  CustomOTPInput,
  CustomSafeAreaView,
  CustomScrollView,
  CustomLoader,
} from "@/components";
import { useBoundStore } from "@/stores";
import { useSession } from "ctx";
import { toast } from "utils";

const TokenSignIn = () => {
  const { setPin, authData, pin } = useBoundStore((state) => state);
  const { signOut, signInWithPin } = useSession();
  const navigation = useNavigation();
  const otpRef = React.useRef<{ resetPin: () => void }>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  // Effect
  React.useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      e.preventDefault();
      // Do your stuff here
      navigation.dispatch(e.data.action);
    });
  }, [navigation]);

  const handleOTPComplete = async (otp: any) => {
    setIsLoading(true);
    const credentials = {
      email: authData?.email,
      pin: otp,
    };

    try {
      const result = await signInWithPin(credentials);
      setIsLoading(false);
      setPin(otp);
      toast({ message: result?.message, color: "success" });
      router.replace("/(auth)/(dashboard)/dashboard");
    } catch (error) {
      const err = error as Error;
      setIsLoading(false);
      toast({ message: err?.message, color: "danger" });
    } finally {
      otpRef.current?.resetPin();
      setIsLoading(false);
    }
    // Add logic for OTP verification or further actions
  };

  const triggerLocalAuth = async () => {
    try {
      const authenticationType =
        await LocalAuthentication.getEnrolledLevelAsync();
      if (authenticationType !== 0) {
        const response = await LocalAuthentication.authenticateAsync({
          promptMessage: "Access Beecash",
        });

        if (response.success) {
          setIsLoading(true);
          const credentials = {
            email: authData?.email,
            pin: pin,
          };
          await signInWithPin(credentials)
            .then((result) => {
              setIsLoading(false);
              toast({ message: result?.message, color: "success" });
              router.replace("/(auth)/(dashboard)/dashboard");
            })
            .catch((error) => {
              const err = error as Error;
              setIsLoading(false);
              toast({ message: err?.message, color: "danger" });
            })
            .finally(() => {
              setIsLoading(false);
            });
        }
      } else {
        const supportedAuthentications =
          await LocalAuthentication.supportedAuthenticationTypesAsync();
        console.log({ supportedAuthentications });
      }
    } catch (error) {
      console.log({ localAuthError: error });
    }
  };

  return (
    <CustomSafeAreaView edges={["top", "bottom"]}>
      <CustomLoader visible={isLoading} />
      <CustomScrollView>
        <CustomView>
          <CustomText gutterBottom variant="h4" weight="bold">
            Welcome Back,{" "}
            <CustomText
              variant="h4"
              weight="normal"
              color={(theme) => theme.colors.slate["600"]}
            >
              {" "}
              {authData?.username ?? "Friend"}
            </CustomText>
          </CustomText>
          <CustomText gutterBottom>Enter your 4-Digit PIN</CustomText>

          <CustomOTPInput
            onComplete={handleOTPComplete}
            length={4}
            triggerBiometrics={triggerLocalAuth}
            ref={otpRef}
          />
        </CustomView>
      </CustomScrollView>
      <CustomView
        sx={{
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 20,
          marginTop: 20,
        }}
      >
        <CustomText>
          Not your account?{" "}
          <CustomText
            weight="extrabold"
            sx={{ textDecorationLine: "underline" }}
            onPress={signOut}
          >
            Log out
          </CustomText>
        </CustomText>
      </CustomView>
    </CustomSafeAreaView>
  );
};

export default TokenSignIn;
