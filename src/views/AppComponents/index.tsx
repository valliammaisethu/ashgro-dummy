import { Col, Row } from "antd";
import React, { FC } from "react";

import InputField from "src/shared/components/InputField";
import { INPUT_TYPE } from "src/enums/inputType";
import Form from "src/shared/components/Form";
import { appComponentsValidation } from "./validation";
import CheckboxField from "src/shared/components/CheckboxField";
import NumberIncrementer from "src/shared/components/NumberIncrementer";
import RadioField from "src/shared/components/RadioField";
import Button from "src/shared/components/Button";
import { AppComponentsConstants } from "src/constants/appComponents";

import "./appComponents.scss";

const AppComponents: FC = () => {
  return (
    <div className="app-components">
      <h1 className="text-center text-decoration">App Components</h1>
      <Form validationSchema={appComponentsValidation}>
        <Row gutter={[20, 20]}>
          <Col span={8}>
            <p className="mt-5 app-components__title">Input: </p>
            <InputField
              type={INPUT_TYPE.TEXT}
              name="input"
              placeholder="Enter some text"
              suffixIcon={<i className="ri-eye-line"></i>}
              label="Input Field"
            />
          </Col>
          <Col span={8}>
            <CheckboxField label="Checkbox" name="checkbox" />
          </Col>
          <Col span={4}>
            <NumberIncrementer disabled name="numberIncrement" />
          </Col>
          <Col span={4}>
            <RadioField
              name="radioButton"
              options={AppComponentsConstants.OPTIONS}
            />
          </Col>
        </Row>
        <Button htmlType="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default AppComponents;
