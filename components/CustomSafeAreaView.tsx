import { Edges, SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { useTheme } from "styled-components/native";

const CustomSafeAreaView = React.forwardRef<
  React.ElementRef<typeof SafeAreaView>,
  React.ComponentPropsWithRef<typeof SafeAreaView> & {
    edges?: Edges;
  }
>((props, ref) => {
  const theme = useTheme();
  return (
    <SafeAreaView
      {...props}
      ref={ref}
      edges={props?.edges ? props?.edges : ["right", "left"]}
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingTop: 10,
        paddingHorizontal: 15,
      }}
    />
  );
});

export default CustomSafeAreaView;
