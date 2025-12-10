import * as yup from "yup";

export const addEmailTemplateValidation = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .max(100, "Title must be at most 100 characters")
    .label("Title"),
  subject: yup
    .string()
    .required("Subject is required")
    .max(998, "Subject must be at most 998 characters")
    .label("Subject"),
  body: yup
    .string()
    .required("Email body is required")
    .max(1000000, "Email body is too long")
    .label("Email Body"),
  attachments: yup
    .array()
    .of(yup.string().required())
    .default([])
    .label("Attachments"),
});
