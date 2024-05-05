import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
  MaterialTopTabNavigationEventMap,
} from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { TabNavigationState, ParamListBase } from "@react-navigation/native";
import { useTheme } from "styled-components/native";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

const BalanceLayout = () => {
  const theme = useTheme();
  return (
    <MaterialTopTabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.colors.background,
        },
        tabBarLabelStyle: {
          fontFamily: "Sora_500Medium",
          textTransform: "capitalize",
          fontSize: 14,
        },
        tabBarIndicatorStyle: {
          height: 3,
          backgroundColor: theme.colors.text,
        },
        swipeEnabled: false,
        tabBarActiveTintColor: theme.colors.text,
      }}
    >
      <MaterialTopTabs.Screen
        name="index"
        options={{
          title: "Offline Balance",
        }}
      />
      <MaterialTopTabs.Screen
        name="online"
        options={{
          title: "Online Balance",
        }}
      />
    </MaterialTopTabs>
  );
};

export default BalanceLayout;
