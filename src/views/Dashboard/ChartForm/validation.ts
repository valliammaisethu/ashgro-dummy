import { REGEX } from "src/constants/regex";
import * as Yup from "yup";

export const chartformValidation = Yup.object().shape({
  chartTitle: Yup.string()
    .required("Title is required")
    .max(50)
    .matches(REGEX.LETTERS_WITH_SPACES),
  labels: Yup.array()
    .of(Yup.string().required("X-axis value is required"))
    .min(1, "At least one x-axis value is required")
    .required("At least one x-axis value is required"),
  xaxis: Yup.string().notRequired(),
});
