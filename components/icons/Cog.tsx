import { SvgUri } from "react-native-svg";

interface Props {
  size?: number;
  color?: string;
  name: "cog-duotone" | "cog-filled";
}

export default function Cog({ size, color, name }: Props) {
  return (
    <SvgUri
      width={size ?? 16}
      height={size ?? 26}
      color={color}
      uri={
        name === "cog-duotone"
          ? "https://api.iconify.design/ph:gear-six-duotone.svg"
          : "https://api.iconify.design/ph:gear-six-fill.svg"
      }
    />
  );
}
