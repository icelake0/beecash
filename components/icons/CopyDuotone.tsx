import { SvgUri } from "react-native-svg";

interface Props {
  size?: number;
  color?: string;
}

export default function CopyDuotone({ size, color }: Props) {
  return (
    <SvgUri
      width={size ?? 16}
      height={size ?? 26}
      color={color}
      uri={"https://api.iconify.design/solar:copy-bold-duotone.svg"}
    />
  );
}
