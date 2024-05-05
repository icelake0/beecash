import { SvgUri } from "react-native-svg";

interface Props {
  size?: number;
  color?: string;
  name: "home-line-duotone" | "home-filled-duotone";
}

export default function HomeIcon({ size, color, name }: Props) {
  return (
    <SvgUri
      width={size ?? 26}
      height={size ?? 26}
      color={color}
      uri={
        name === "home-line-duotone"
          ? "https://api.iconify.design/solar:home-2-bold-duotone.svg"
          : "https://api.iconify.design/solar:home-2-bold.svg"
      }
    />
  );
}
