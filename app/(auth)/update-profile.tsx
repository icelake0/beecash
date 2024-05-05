import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components";

import {
  CustomSafeAreaView,
  CustomScrollView,
  CustomText,
  CustomTextInput,
  CustomButton,
  CustomLoader,
  CustomView,
} from "@/components";
import { useBoundStore } from "@/stores";
import { toast } from "utils";
// endpoints
import { updateAccount } from "@/endpoints/auth-requests";

const formSchema = z.object({
  email: z.coerce
    .string({ required_error: "Email is required" })
    .regex(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "Please provide a valid email address"
    )
    .email("Please enter a valid email"),
  firstName: z
    .string({ required_error: "First name is required" })
    .min(3, "first name must be at least 3 characters"),
  lastName: z
    .string({ required_error: "Last name is required" })
    .min(3, "last name must be at least 3 characters"),
  username: z
    .string({ required_error: "Username is required" })
    .min(3, "Username must be at least 3 characters"),
});

type FormType = z.infer<typeof formSchema>;

const UpdateProfile = () => {
  const theme = useTheme();
  const { authData, setAuth } = useBoundStore((state) => state);
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormType>({
    defaultValues: {
      email: authData?.email,
      firstName: authData?.firstName,
      lastName: authData?.lastName,
      username: authData?.username,
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormType> = async (data) => {
    setIsLoading(true);
    try {
      const result = await updateAccount(data);
      toast({ message: result?.message, color: "success" });

      const authData = {
        user: {
          ...result.data,
        },
        access_token: null,
      };
      setAuth(authData);
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
      <CustomLoader visible={isLoading} />
      <CustomView
        sx={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <CustomText
          gutterBottom
          variant="h4"
          weight="extrabold"
          sx={{ marginRight: 1 }}
        >
          Update Profile
        </CustomText>
        <MaterialIcons
          name="account-circle"
          size={30}
          color={theme.colors.text}
          style={{ top: -2 }}
        />
      </CustomView>
      <CustomText
        variant="caption"
        color={(theme) => theme.colors.slate["600"]}
      >
        Below are your profile information.
      </CustomText>
      <CustomScrollView contentContainerStyle={{ paddingTop: 40 }}>
        <CustomView sx={{ marginBottom: 20 }}>
          <Controller
            control={control}
            name={"firstName"}
            rules={{
              required: true,
            }}
            render={({ field: { value, onChange, onBlur } }) => (
              <CustomTextInput
                label="First Name"
                placeholder="First Name"
                flat
                required
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.firstName && errors.firstName.message}
              />
            )}
          />
        </CustomView>
        <CustomView sx={{ marginBottom: 20 }}>
          <Controller
            control={control}
            name={"lastName"}
            rules={{
              required: true,
            }}
            render={({ field: { value, onChange, onBlur } }) => (
              <CustomTextInput
                label="Last Name"
                placeholder="Last Name"
                flat
                required
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.lastName && errors.lastName.message}
              />
            )}
          />
        </CustomView>
        <CustomView sx={{ marginBottom: 20 }}>
          <Controller
            control={control}
            name={"email"}
            rules={{
              required: true,
            }}
            render={({ field: { value, onChange, onBlur } }) => (
              <CustomTextInput
                label="Email"
                placeholder="Email"
                keyboardType="email-address"
                flat
                required
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.email && errors?.email.message}
              />
            )}
          />
        </CustomView>
        <CustomView sx={{ marginBottom: 20 }}>
          <Controller
            control={control}
            name={"username"}
            rules={{
              required: true,
            }}
            render={({ field: { value, onChange, onBlur } }) => (
              <CustomTextInput
                label="Username"
                placeholder="Username"
                flat
                required
                value={value}
                onChangeText={onChange}
                onBlur={() => {
                  onBlur();
                }}
                error={errors.username && errors.username.message}
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
          Update Profile
        </CustomButton>
      </CustomScrollView>
    </CustomSafeAreaView>
  );
};

export default UpdateProfile;
