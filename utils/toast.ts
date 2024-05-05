import Toast from "react-native-root-toast";

type ColorType = "danger" | "success" | "warning";

const toast = ({ message, color }: { message: string; color?: ColorType }) => {
  Toast.show(message, {
    duration: Toast.durations.LONG,
    position: Toast.positions.TOP,
    shadow: false,
    animation: true,
    hideOnPress: true,
    delay: 0,
    backgroundColor:
      color === "danger"
        ? "#e63946"
        : color === "success"
        ? "#52b788"
        : color === "warning"
        ? "#ffd670"
        : "#f9f7f3",
  });
};

export default toast;
