const contrastColor = (
  textColor: string,
  [darkContrast = "#000000", lightContrast = "#FFFFFF"]: [string, string]
): string => {
  // Convert the text color to RGB values
  const hexToRgb = (hex: string) =>
    //@ts-ignore
    hex.match(/[A-Za-z0-9]{2}/g).map((v) => parseInt(v, 16));

  const rgb = hexToRgb(textColor);

  // Calculate the luminance (brightness) of the color
  const luminance = 0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2];

  // Choose white or black as the contrasting color based on luminance
  const colorContrast = luminance > 128 ? darkContrast : lightContrast;

  return colorContrast;
};

export default contrastColor;
