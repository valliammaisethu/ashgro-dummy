import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email address!")
    .required("E-mail is required!"),
  password: Yup.string().required("Password is required!"),
});
