import { SyntheticEvent } from "react";

export const stopPropagation = (event: SyntheticEvent) =>
  event.stopPropagation();

export const stopEventPropagation = (event: SyntheticEvent) => {
  event.preventDefault();
  event.stopPropagation();
};
