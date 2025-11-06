interface Option {
  label?: string;
  value?: string;
}

export const replaceString = (
  text: string = "",
  replacement: string = "",
): string => {
  return text?.replace("%s", replacement) ?? "";
};

export const findValueByLabel = (
  options: Option[] = [],
  targetLabel?: string,
): string | undefined => {
  if (!targetLabel) return undefined;
  return options.find((opt) => opt.label === targetLabel)?.value;
};

export const fallbackHandler = (
  value?: string | number | null,
  isNumber = false,
) => {
  if (value == null) {
    return isNumber ? 0 : "-";
  }
  return value;
};
