import { SvgUri } from "react-native-svg";

interface Props {
  size?: number;
  color?: string;
  name: "user-thin-outline" | "user-bold-filled";
}

export default function ProfileIcon({ size, color, name }: Props) {
  return (
    <SvgUri
      width={size ?? 26}
      height={size ?? 26}
      color={color}
      uri={
        name === "user-thin-outline"
          ? "https://api.iconify.design/solar:user-bold-duotone.svg"
          : "https://api.iconify.design/solar:user-bold.svg"
      }
    />
  );
}
