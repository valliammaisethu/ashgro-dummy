import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  newPassword: Yup.string().max(25),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("newPassword")], "Passwords must match"),
});
