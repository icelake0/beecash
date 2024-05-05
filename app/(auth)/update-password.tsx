import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image } from "expo-image";

import {
  CustomSafeAreaView,
  CustomScrollView,
  CustomText,
  CustomTextInput,
  CustomButton,
  CustomView,
} from "@/components";
import { toast } from "utils";
// endpoints
import { updatePassword } from "@/endpoints/auth-requests";
import { router } from "expo-router";

const formSchema = z
  .object({
    currentPassword: z
      .string({ required_error: "Password is required" })
      .min(8, "Password must be at least 8 characters"),
    password: z
      .string({ required_error: "Confirm Password is required" })
      .min(8, "Password must be at least 8 characters"),
  })
  .superRefine(({ currentPassword, password }, ctx) => {
    if (currentPassword === password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "You cannot re-use your previous password",
        path: ["password"],
      });
    }
  });

type FormType = z.infer<typeof formSchema>;

const UpdatePassword = () => {
  const [showPassword, setShowPassword] = React.useState(true);
  const [showCurrentPassword, setShowCurrentPassword] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormType>({
    defaultValues: {
      currentPassword: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    setIsLoading(true);
    try {
      const result = await updatePassword(data);
      toast({ message: result?.message, color: "success" });
      setIsLoading(false);
      router.back();
    } catch (error) {
      const err = error as Error;
      setIsLoading(false);
      toast({ message: err?.message, color: "danger" });
    } finally {
      setIsLoading(false);
      reset();
    }
  };

  return (
    <CustomSafeAreaView>
      <CustomText gutterBottom variant="h4" weight="extrabold">
        Update Password
      </CustomText>
      <CustomText
        variant="caption"
        color={(theme) => theme.colors.slate["600"]}
      >
        Update Password to a new password
      </CustomText>
      <Image
        source={require("assets/shield-badge.png")}
        style={{
          height: 200,
          aspectRatio: 1,
          justifyContent: "center",
          alignSelf: "center",
          marginTop: 10,
        }}
      />
      <CustomScrollView contentContainerStyle={{ paddingTop: 40 }}>
        <CustomView sx={{ marginBottom: 20 }}>
          <Controller
            control={control}
            name={"currentPassword"}
            rules={{
              required: true,
            }}
            render={({ field: { value, onChange, onBlur } }) => (
              <CustomTextInput
                label="Current Password"
                flat
                required
                placeholder="Current Password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.currentPassword && errors.currentPassword.message}
                secureTextEntry={showCurrentPassword}
                iconName={showCurrentPassword ? "eye-off" : "eye-sharp"}
                iconPress={() => {
                  setShowCurrentPassword((prev) => !prev);
                }}
              />
            )}
          />
        </CustomView>
        <CustomView sx={{ marginBottom: 20 }}>
          <Controller
            control={control}
            name={"password"}
            rules={{
              required: true,
            }}
            render={({ field: { value, onChange, onBlur } }) => (
              <CustomTextInput
                label="New Password"
                flat
                required
                placeholder="New Password"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.password && errors.password.message}
                secureTextEntry={showPassword}
                iconName={showPassword ? "eye-off" : "eye-sharp"}
                iconPress={() => {
                  setShowPassword((prev) => !prev);
                }}
              />
            )}
          />
        </CustomView>
        <CustomButton
          flat
          size="md"
          loading={isLoading}
          onPress={handleSubmit(onSubmit)}
        >
          Update Password
        </CustomButton>
      </CustomScrollView>
    </CustomSafeAreaView>
  );
};

export default UpdatePassword;
