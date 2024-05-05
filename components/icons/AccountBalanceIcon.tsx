import { SvgUri } from "react-native-svg";

interface Props {
  size?: number;
  color?: string;
}

export default function AccountBalanceIcon({ size, color }: Props) {
  return (
    <SvgUri
      width={size ?? 16}
      height={size ?? 26}
      color={color}
      uri={
        "https://api.iconify.design/material-symbols:account-balance-outline.svg"
      }
    />
  );
}
