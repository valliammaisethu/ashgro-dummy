import React from "react";
import { Form, Formik, FormikConfig } from "formik";
import { User } from "../../models/user.model";
import InputField from "../../shared/components/InputField";
import { Button } from "antd";
import loginValidation from "./loginForm.validation";
import useRedirect from "../../shared/hooks/useRedirect";

import styles from "./loginForm.module.scss";
import { AuthConstants } from "../../constants/auth";

const LoginForm = () => {
  const { navigateToHome } = useRedirect();

  const { TITLE, INPUT_FIELDS, BUTTON } = AuthConstants.LOGIN_FORM;

  const handleSubmit: FormikConfig<User>["onSubmit"] = () => navigateToHome();

  return (
    <div className={styles["login-form"]}>
      <h1>{TITLE}</h1>
      <div>
        <Formik
          initialValues={new User()}
          validationSchema={loginValidation}
          onSubmit={handleSubmit}
        >
          <Form>
            {INPUT_FIELDS.map(({ TYPE, NAME, PLACEHOLDER }) => (
              <InputField type={TYPE} name={NAME} placeholder={PLACEHOLDER} />
            ))}
            <Button htmlType={BUTTON.TYPE}>{BUTTON.TEXT}</Button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
