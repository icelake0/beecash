import React, { useRef, useState } from "react";
import { Link, router } from "expo-router";
import LottieView from "lottie-react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  CustomView,
  CustomSafeAreaView,
  CustomScrollView,
  CustomTextInput,
  CustomButton,
  CustomText,
} from "@/components";
import { useFocusedBottomInput } from "@/hooks/useFocusedBottomInput";
import { NfcProxy, toast } from "utils";
import { TextInput } from "react-native";
import { useBoundStore } from "@/stores";

const inputSchema = z.object({
  nfcText: z.string().regex(/^-?\d+(\.\d+)?$/, {
    message: "Invalid input, enter a float value",
  }),
});

type FormType = z.infer<typeof inputSchema>;

const Receive = () => {
  const animation = useRef(null);
  const { authData } = useBoundStore((state) => state);
  const { bottomInputFocused, handleBottomInputFocus, handleBottomInputBlur } =
    useFocusedBottomInput();
  const inputRef = useRef<TextInput | null>(null);

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    defaultValues: {
      nfcText: undefined,
    },
    resolver: zodResolver(inputSchema),
  });

  const writeNdef: SubmitHandler<FormType> = async (data) => {
    inputRef.current && inputRef.current.blur();

    if (!data.nfcText) {
      return;
    }

    const nfcData = {
      receiverId: authData?.id,
      amount: +data.nfcText,
      status: "INITIATE",
    };

    await NfcProxy.writeNdef({
      type: "TEXT",
      value: JSON.stringify(nfcData),
    })
      .then(() => {
        toast({ message: "NFC Tag written", color: "success" });
        router.replace("/(auth)/complete-transaction");
      })
      .catch((err) => {
        console.log(err);
        toast({ message: "Error writing NFC Tag", color: "danger" });
      });
  };

  return (
    <CustomSafeAreaView>
      <CustomTextInput.Container bottomInputFocused={bottomInputFocused}>
        <CustomScrollView contentContainerStyle={{ paddingVertical: 30 }}>
          <LottieView
            autoPlay
            ref={animation}
            style={{
              width: "100%",
              height: 250,
            }}
            loop
            source={require("assets/lottie/initiate-transaction.json")}
          />
          <CustomView
            sx={{
              marginTop: 20,
              justifyContent: "center",
            }}
          >
            <CustomText
              sx={{ textAlign: "center", marginBottom: 30, lineHeight: 20 }}
              variant="caption"
              gutterBottom
            >
              Enter amount you would like to receive from a buyer and initiate
              into an NFC tag
            </CustomText>
            <Controller
              control={control}
              name={"nfcText"}
              rules={{
                required: true,
              }}
              render={({ field: { value, onChange, onBlur } }) => (
                <CustomTextInput
                  ref={inputRef}
                  keyboardType="numeric"
                  flat
                  placeholder="0.0"
                  pre="£"
                  value={value?.toString()}
                  onChangeText={onChange}
                  onFocus={handleBottomInputFocus}
                  onBlur={() => {
                    onBlur();
                    handleBottomInputBlur();
                  }}
                  error={errors.nfcText && errors.nfcText.message}
                />
              )}
            />

            <CustomButton
              size="md"
              sx={{ marginTop: 30 }}
              flat
              onPress={handleSubmit(writeNdef)}
            >
              Initiate
            </CustomButton>
          </CustomView>
        </CustomScrollView>
      </CustomTextInput.Container>
    </CustomSafeAreaView>
  );
};

export default Receive;
