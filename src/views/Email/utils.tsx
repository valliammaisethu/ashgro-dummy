export const generateSelectOptions = (values: string[]) => {
  if (!Array.isArray(values)) return [];
  return values.map((v) => ({
    label: v,
    value: v,
  }));
};
