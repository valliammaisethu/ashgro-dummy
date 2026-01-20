import { REGEX } from "src/constants/regex";
import * as Yup from "yup";

export const chartformValidation = Yup.object().shape({
  name: Yup.string()
    .required("Title is required")
    .max(50, "Title cannot exceed 50 characters")
    .matches(REGEX.LETTERS, "Title must contain only alphabets"),
  values: Yup.array()
    .of(Yup.string().required("X-axis value is required"))
    .min(1, "At least one x-axis value is required")
    .required("At least one x-axis value is required"),
  xAxis: Yup.string().notRequired().nonNullable(),
  type: Yup.string().required("Type is required"),
});
