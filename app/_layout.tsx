import "react-native-reanimated";
import "react-native-gesture-handler";
import { Slot } from "expo-router";
import { useCallback, useEffect } from "react";
import { useSegments, useRouter } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootSiblingParent } from "react-native-root-siblings";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import {
  useFonts,
  Sora_300Light,
  Sora_400Regular,
  Sora_500Medium,
  Sora_600SemiBold,
  Sora_700Bold,
  Sora_800ExtraBold,
} from "@expo-google-fonts/sora";
import { SplashScreen } from "expo-router";

import { SessionProvider, useSession } from "ctx";
import ThemeProvider from "utils/theme/ThemeProvider";
import { View } from "react-native";

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: "index",
};

const InitialLayout = () => {
  const { session, isLoading } = useSession();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const inTabsGroup = segments[0] === "(auth)";
    if (!isLoading) {
      return;
    }
    if (!session) {
      router.replace("/(public)/onboarding");
    }
  }, [session, isLoading]);

  return <Slot />;
};

export default function Layout() {
  const [fontsLoaded, fontError] = useFonts({
    Sora_300Light,
    Sora_400Regular,
    Sora_500Medium,
    Sora_600SemiBold,
    Sora_700Bold,
    Sora_800ExtraBold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <SessionProvider>
          <RootSiblingParent>
            <BottomSheetModalProvider>
              <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
                <InitialLayout />
              </View>
            </BottomSheetModalProvider>
          </RootSiblingParent>
        </SessionProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
