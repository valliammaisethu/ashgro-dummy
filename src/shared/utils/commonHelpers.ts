export const replaceString = (
  text: string = "",
  replacement: string = "",
): string => {
  return text?.replace("%s", replacement) ?? "";
};
