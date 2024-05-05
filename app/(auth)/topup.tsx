import { Dimensions } from "react-native";
import React from "react";
import { router } from "expo-router";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  CustomView,
  CustomText,
  CustomSafeAreaView,
  CustomScrollView,
  CustomTextInput,
  CustomButton,
  CustomIconButton,
  CustomLoader,
} from "@/components";
import { useBoundStore } from "@/stores";
import { formatMoney, toast } from "utils";

//api requests
import { topupWallet } from "@/endpoints/wallet-requests";

const { width } = Dimensions.get("screen");

const formSchema = z.object({
  amount: z
    .string({ required_error: "Balance is required" })
    .regex(/^-?\d+(\.\d+)?$/, {
      message: "Invalid input, enter a float value for amount",
    }),
});

type FormType = z.infer<typeof formSchema>;

const TopUp = () => {
  const { balance, addBalance, addOfflineBalance, isVisible, toggleVisibility, getTransactions } =
    useBoundStore((state) => state);
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormType>({
    defaultValues: {
      amount: undefined,
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    setIsLoading(true);
    const topupData = {
      amount: +data.amount,
    };
    try {
      const result = await topupWallet(topupData);
      setIsLoading(false);
      toast({ message: result.message, color: "success" });
      await addOfflineBalance!(+data.amount)
      addBalance!(+data.amount).then(() => {
        router.back();
        reset();
      });
    } catch (error) {
      const err = error as Error;
      setIsLoading(false);
      toast({ message: err.message, color: "danger" });
    } finally {
      setIsLoading(false);
      await getTransactions();
    }
  };

  return (
    <CustomSafeAreaView>
      <CustomLoader visible={isLoading} />
      <CustomScrollView>
        <CustomText sx={{ textAlign: "center", marginTop: 35 }}>
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
          <CustomIconButton
            iconName={isVisible ? "eye" : "eye-off"}
            size="sm"
            onPress={toggleVisibility}
            variant="outlined"
          />
        </CustomView>

        <CustomView
          sx={{
            marginTop: 50,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Controller
            control={control}
            name={"amount"}
            rules={{
              required: true,
            }}
            render={({ field: { value, onChange, onBlur } }) => (
              <CustomTextInput
                keyboardType="numeric"
                flat
                sx={{
                  width: width - 200,
                }}
                placeholder="0.0"
                pre="£"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.amount && errors.amount.message}
                required
                label="Top up balance"
              />
            )}
          />

          <CustomButton
            size="md"
            flat
            disableAnimation
            onPress={handleSubmit(onSubmit)}
          >
            Top up
          </CustomButton>
        </CustomView>
      </CustomScrollView>
    </CustomSafeAreaView>
  );
};

export default TopUp;
