import { MotiTransitionProp, MotiView } from "moti";
import React from "react";
import { GestureResponderEvent, Pressable, View } from "react-native";
import { useTheme } from "styled-components/native";
import { Easing } from "react-native-reanimated";

interface SwitchProps {
  onValueChange?: () => void;
  isActive: boolean;
  size: number;
  activeColor?: string;
  inactiveColor?: string;
}

const transition: MotiTransitionProp = {
  type: "timing",
  duration: 300,
  easing: Easing.inOut(Easing.ease),
};

const CustomSwitch = React.forwardRef<
  React.ElementRef<typeof Pressable>,
  SwitchProps
>(({ onValueChange, isActive, size, activeColor, inactiveColor }, ref) => {
  const theme = useTheme();

  const _colors = {
    inactive: inactiveColor ?? theme.colors.primary,
    active: activeColor ?? theme.colors.success,
  };

  const trackWidth = size * 1.5;
  const trackHeight = size * 0.6;
  const knobSize = size * 0.6;

  const toggleSwitch = React.useCallback((e: GestureResponderEvent) => {
    e.preventDefault();
    ("worklet");
    // Notify parent component about the change
    onValueChange && onValueChange();
  }, []);

  console.log({ isActive });

  return (
    <Pressable onPress={toggleSwitch} ref={ref}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <MotiView
          transition={transition}
          from={{
            backgroundColor: isActive ? _colors.inactive : _colors.active,
          }}
          animate={{
            backgroundColor: isActive ? _colors.active : _colors.inactive,
          }}
          style={[
            {
              position: "absolute",
              width: trackWidth,
              height: trackHeight,
              borderRadius: trackHeight / 2,
              backgroundColor: _colors.active,
            },
          ]}
        />
        <MotiView
          transition={transition}
          from={{
            translateX: isActive ? -trackWidth / 4 : trackWidth / 4,
          }}
          animate={{
            translateX: isActive ? trackWidth / 4 : -trackWidth / 4,
          }}
          style={[
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff",
              borderWidth: 0.5,
              borderColor: "#f9f9f9",
              shadowColor: theme.colors.primary,
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 0.3,
              shadowRadius: 1.5,
              elevation: 1,
            },
          ]}
        >
          <MotiView
            transition={transition}
            from={{
              width: isActive ? knobSize : 0,
              borderColor: isActive ? _colors.inactive : _colors.active,
            }}
            animate={{
              width: isActive ? 0 : knobSize,
              borderColor: isActive ? _colors.active : _colors.inactive,
            }}
            style={{
              width: knobSize,
              height: knobSize,
              borderRadius: knobSize / 2,
              borderWidth: size * 0.1,
              borderColor: _colors.active,
            }}
          />
        </MotiView>
      </View>
    </Pressable>
  );
});

const MemoizedCustomSwitch = React.memo(CustomSwitch);

export default MemoizedCustomSwitch;
