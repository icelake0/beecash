export const hideText = (
  inputString: string,
  valueToReplace: string = "*"
): string => {
  const regex = /\w/g;

  const resultString = inputString.replace(regex, valueToReplace);

  return resultString;
};
