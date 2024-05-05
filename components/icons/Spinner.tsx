import React from "react";
import Svg, { Path, G } from "react-native-svg";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const Spinner = React.forwardRef<
  React.ElementRef<typeof Svg>,
  React.ComponentPropsWithRef<typeof Svg> & {
    size?: number;
    color?: string;
  }
>((props, ref) => {
  const spin = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${spin.value}deg`,
        },
      ],
    };
  });

  React.useEffect(() => {
    spin.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, []);

  return (
    <AnimatedSvg
      width={props?.size ?? 30}
      height={props?.size ?? 30}
      viewBox="0 0 24 24"
      ref={ref}
      style={animatedStyles}
      {...props}
    >
      <G fill="#cccccc">
        <Path
          fill-rule="evenodd"
          d="M12 19a7 7 0 1 0 0-14a7 7 0 0 0 0 14m0 3c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10"
          clip-rule="evenodd"
          opacity="0.2"
        />
        <Path d="M2 12C2 6.477 6.477 2 12 2v3a7 7 0 0 0-7 7z" />
      </G>
    </AnimatedSvg>
  );
});

export default Spinner;
