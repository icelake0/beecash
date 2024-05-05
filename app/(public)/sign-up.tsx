import React from "react";
import { StyleSheet } from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";

import {
  CustomButton,
  CustomText,
  CustomView,
  CustomSafeAreaView,
  CustomLogo,
  CustomScrollView,
  CustomTextInput,
  CustomLoader,
} from "@/components";
import { useFocusedBottomInput } from "@/hooks/useFocusedBottomInput";
import { useBoundStore } from "@/stores/index";
import { toast } from "utils";
import { useSession } from "ctx";

const formSchema = z
  .object({
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
    password: z
      .string({ required_error: "Password is required" })
      .min(8, "Password must be at least 8 characters"),
    // .regex(
    //   /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).{8,}$/,
    //   "Password must have at least one Uppercase, one Lowercase, and a Special character"
    // ),
    confirmPassword: z
      .string({ required_error: "Confirm Password is required" })
      .min(8, "Password must be at least 8 characters"),
    // .regex(
    //   /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).{8,}$/,
    //   "Password must have at least one Uppercase, one Lowercase, and a Special character"
    // ),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

type FormType = z.infer<typeof formSchema>;

const SignUp = () => {
  const { signUp } = useSession();
  const { setAuth } = useBoundStore((state) => state);
  const { bottomInputFocused, handleBottomInputFocus, handleBottomInputBlur } =
    useFocusedBottomInput();
  const [showPassword, setShowPassword] = React.useState(true);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormType>({
    defaultValues: {
      firstName: "",
      email: "",
      lastName: "",
      username: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(formSchema),
  });
  const onSubmit: SubmitHandler<FormType> = async (data) => {
    setIsLoading(true);
    try {
      const result = await signUp(data);
      setIsLoading(false);
      setAuth(result?.data?.user);
      toast({ message: result?.message, color: "success" });
      router.replace("/(public)/create-pin");
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
      <CustomView style={styles.logoContainer}>
        <CustomLogo />
      </CustomView>
      <CustomView style={styles.header}>
        <CustomText variant="h3" weight="extrabold">
          Let's get started
        </CustomText>
      </CustomView>
      <CustomTextInput.Container bottomInputFocused={bottomInputFocused}>
        <CustomScrollView>
          <CustomView style={[styles.textInputContainer, { marginTop: 20 }]}>
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
          <CustomView style={styles.textInputContainer}>
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
          <CustomView style={styles.textInputContainer}>
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
          <CustomView style={styles.textInputContainer}>
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
                  onFocus={handleBottomInputFocus}
                  onBlur={() => {
                    onBlur();
                    handleBottomInputBlur();
                  }}
                  error={errors.username && errors.username.message}
                />
              )}
            />
          </CustomView>
          <CustomView style={styles.textInputContainer}>
            <Controller
              control={control}
              name={"password"}
              rules={{
                required: true,
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).{8,}$/,
                  message:
                    "Password must be at least one lowercase, uppercase and a special character",
                },
              }}
              render={({ field: { value, onChange, onBlur } }) => (
                <CustomTextInput
                  label="Password"
                  placeholder="Password"
                  flat
                  required
                  value={value}
                  onChangeText={onChange}
                  onFocus={handleBottomInputFocus}
                  onBlur={() => {
                    onBlur();
                    handleBottomInputBlur();
                  }}
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
          <CustomView style={styles.textInputContainer}>
            <Controller
              control={control}
              name={"confirmPassword"}
              rules={{
                required: true,
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).{8,}$/,
                  message:
                    "Password must be at least one lowercase, uppercase and a special character",
                },
              }}
              render={({ field: { value, onChange, onBlur } }) => (
                <CustomTextInput
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  flat
                  required
                  value={value}
                  onChangeText={onChange}
                  onFocus={handleBottomInputFocus}
                  onBlur={() => {
                    onBlur();
                    handleBottomInputBlur();
                  }}
                  error={
                    errors.confirmPassword && errors.confirmPassword.message
                  }
                  secureTextEntry={showConfirmPassword}
                  iconName={showConfirmPassword ? "eye-off" : "eye-sharp"}
                  iconPress={() => {
                    setShowConfirmPassword((prev) => !prev);
                  }}
                />
              )}
            />
          </CustomView>
          <CustomView
            style={{
              alignItems: "flex-end",
            }}
          >
            <CustomButton
              size="md"
              flat
              iconName={"arrow-forward-outline"}
              onPress={handleSubmit(onSubmit)}
              iconColor="#fff"
              loading={isLoading}
            >
              Next
            </CustomButton>
          </CustomView>
        </CustomScrollView>
      </CustomTextInput.Container>
    </CustomSafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  header: {
    marginVertical: 10,
    marginBottom: 25,
  },
  textInputContainer: {
    marginBottom: 20,
  },
});
