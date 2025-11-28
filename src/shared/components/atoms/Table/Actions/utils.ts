import { Option } from ".";

export const formatOptions = (options: Option[]) =>
  options?.map((option) => ({
    statusName: option.label,
    id: option.value,
    color: option.color,
  })) || [];
