import * as Yup from "yup";

export default Yup.object().shape({
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
});
