import { SyntheticEvent } from "react";

export const stopPropagation = (event: SyntheticEvent) =>
  event.stopPropagation();
