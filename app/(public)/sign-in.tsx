import React from "react";
import { router, Link } from "expo-router";
import { StyleSheet } from "react-native";
import { useTheme } from "styled-components/native";
import LottieView from "lottie-react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useSession } from "ctx";
import {
  CustomButton,
  CustomText,
  CustomView,
  CustomSafeAreaView,
  CustomScrollView,
  CustomTextInput,
  CustomLoader,
} from "@/components/index";
import { useFocusedBottomInput } from "@/hooks/useFocusedBottomInput";
import { useBoundStore } from "@/stores/index";
import { useStorageState } from "@/hooks/useStorageState";
import { toast } from "utils";

const formSchema = z.object({
  email: z.coerce
    .string({ required_error: "Email is required" })
    .regex(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "Please provide a valid email address"
    )
    .email("Please enter a valid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters"),
  // .regex(
  //   /^(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).{8,}$/,
  //   "Password must have at least one Uppercase, one Lowercase, and a Special character"
  // ),
});

type FormType = z.infer<typeof formSchema>;

export default function SignIn() {
  const { signIn } = useSession();
  const { setAuth } = useBoundStore((state) => state);
  const animation = React.useRef(null);
  const theme = useTheme();
  const { bottomInputFocused } = useFocusedBottomInput();
  const [showPassword, setShowPassword] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });

  const handleSignIn: SubmitHandler<FormType> = async (data) => {
    setIsLoading(true);
    try {
      const result = await signIn(data);
      setIsLoading(false);
      toast({ message: result?.message, color: "success" });
      setAuth(result?.data);
      router.replace("/(auth)/(dashboard)/dashboard");
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
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LottieView
          autoPlay
          ref={animation}
          style={{
            width: "100%",
            height: 200,
          }}
          loop
          source={
            theme.colorScheme === "dark"
              ? require("assets/lottie/smiley-on-phone-white.json")
              : require("assets/lottie/smiley-on-phone.json")
          }
        />
      </CustomView>
      <CustomTextInput.Container bottomInputFocused={bottomInputFocused}>
        <CustomScrollView
          contentContainerStyle={{
            paddingVertical: 20,
          }}
        >
          <CustomView style={styles.textInput}>
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
                  textContentType="emailAddress"
                  autoCapitalize="none"
                  autoCorrect={false}
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
          <CustomView style={styles.textInput}>
            <Controller
              control={control}
              name={"password"}
              rules={{
                required: true,
              }}
              render={({ field: { value, onChange, onBlur } }) => (
                <CustomTextInput
                  label="Password"
                  placeholder="Password"
                  flat
                  required
                  value={value}
                  onChangeText={onChange}
                  onBlur={() => {
                    onBlur();
                  }}
                  error={errors.password && errors.password.message}
                  textContentType="password"
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
            size="md"
            flat
            sx={{ marginTop: 20 }}
            onPress={handleSubmit(handleSignIn)}
          >
            Sign In
          </CustomButton>
          <CustomText
            sx={{
              marginTop: 20,
              alignSelf: "center",
            }}
          >
            Don't have an account?{" "}
            <Link
              href="/sign-up"
              style={{ color: "#023e8a", textDecorationLine: "underline" }}
            >
              Register
            </Link>
          </CustomText>
        </CustomScrollView>
      </CustomTextInput.Container>
    </CustomSafeAreaView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    marginBottom: 15,
  },
});
