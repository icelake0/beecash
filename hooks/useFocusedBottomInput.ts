import React from "react";

export const useFocusedBottomInput = () => {
  const [bottomInputFocused, setBottomInputFocused] = React.useState(false);

  const handleBottomInputFocus = () => {
    setBottomInputFocused(true);
    // Handle focus logic for the bottom TextInput
  };

  const handleBottomInputBlur = () => {
    setBottomInputFocused(false);
    // Handle blur logic for the bottom TextInput
  };

  return { bottomInputFocused, handleBottomInputFocus, handleBottomInputBlur };
};
