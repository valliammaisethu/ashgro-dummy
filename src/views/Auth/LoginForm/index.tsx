import React from "react";
import { Formik, Form } from "formik";
import InputField from "../../../shared/components/InputField";
import { validationSchema } from "./LoginValidation";
import { Button } from "antd";
import UserService from "../../../services/AuthService/auth.service";
import { AuthConstants } from "../../../constants/auth";

interface User {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { loading, loginUser } = UserService();

  const { INITIAL_VALUES, INPUT_FIELDS, BUTTON } = AuthConstants.LOGIN_FORM;

  const onSubmit = (user: User) => loginUser(user);

  return (
    <div>
      <Formik
        initialValues={INITIAL_VALUES}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          {INPUT_FIELDS.map(({ TYPE, NAME, PLACEHOLDER }) => (
            <InputField type={TYPE} name={NAME} placeholder={PLACEHOLDER} />
          ))}
          <Button htmlType={BUTTON.TYPE} loading={loading}>
            {BUTTON.TEXT}
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
