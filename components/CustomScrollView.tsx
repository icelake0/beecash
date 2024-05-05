import { ScrollView } from "react-native";
import React from "react";

const CustomScrollView = React.forwardRef<
  React.ElementRef<typeof ScrollView>,
  React.ComponentPropsWithRef<typeof ScrollView>
>((props, ref) => {
  return (
    <ScrollView
      ref={ref}
      contentContainerStyle={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      {...props}
    />
  );
});

export default CustomScrollView;
