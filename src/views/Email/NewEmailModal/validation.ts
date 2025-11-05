import * as yup from "yup";

export const addEmailValidation = yup.object().shape({
  to: yup
    .array()
    .of(yup.string().email("Invalid email format"))
    .min(1, "At least one recipient is required")
    .required("Recipients are required"),
  subject: yup
    .string()
    .required("Subject is required")
    .max(998, "Subject must be at most 998 characters")
    .label("Subject"),
  body: yup.string().required("Email body is required").max(1000000),
  title: yup.string().notRequired().label("Title"),
  cc: yup
    .array()
    .of(yup.string().email("Invalid email format"))
    .notRequired()
    .label("CC"),
  bcc: yup
    .array()
    .of(yup.string().email("Invalid email format"))
    .notRequired()
    .label("BCC"),
  clubId: yup.string().notRequired(),
});
