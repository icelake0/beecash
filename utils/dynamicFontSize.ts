import { Dimensions, PixelRatio } from "react-native";

const { width, height } = Dimensions.get("window");

// Utility function to calculate dynamic font size based on the device's screen width
const dynamicFontSize = (baseFontSize: number, maxScreenWidth = 422) => {
  // You can adjust the scaleFactor according to your preference
  const scaleFactor = 0.044;

  // Only adjust font size if the screen width is smaller than the specified maxScreenWidth
  if (width < maxScreenWidth) {
    // Calculate the adjusted font size based on the device's screen width
    const adjustedFontSize = width * scaleFactor + baseFontSize;

    // Adjust the font size based on the device's pixel density
    const pixelDensity = PixelRatio.get();
    const scaledFontSize = adjustedFontSize / pixelDensity;

    return scaledFontSize;
  }

  // Return the base font size for larger screens
  return baseFontSize;
};

export default dynamicFontSize;
