import { ButtonHTMLType } from "antd/lib/button/buttonHelpers";
import { INPUT_TYPE } from "../enums/inputType";

export const AuthConstants = {
  LOGIN_FORM: {
    TITLE: "Welcome",
    INITIAL_VALUES: {
      email: "abc@123.com",
      password: "test@1234",
    },
    INPUT_FIELDS: [
      { TYPE: INPUT_TYPE.EMAIL, NAME: "email", PLACEHOLDER: "Enter email" },
      {
        TYPE: INPUT_TYPE.PASSWORD,
        NAME: "password",
        PLACEHOLDER: "Enter password",
      },
    ],
    BUTTON: {
      TYPE: "submit" as ButtonHTMLType,
      TEXT: "Login",
    },
  },
};
