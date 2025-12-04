import { REGEX } from "src/constants/regex";
import * as Yup from "yup";

export const chartformValidation = Yup.object().shape({
  chartTitle: Yup.string()
    .required("Title is required")
    .max(50)
    .matches(REGEX.LETTERS_WITH_SPACES),
  type: Yup.string().required("Type is required"),
  label: Yup.string().required("Label is required"),
});
