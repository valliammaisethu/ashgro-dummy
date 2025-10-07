import { Col, Row } from "antd";
import React, { FC } from "react";
import InputField from "../../shared/components/InputField";
import { INPUT_TYPE } from "../../enums/inputType";
import "./appComponents.scss";
import Form from "../../shared/components/Form";
import { appComponentsValidation } from "./validation";
import CheckboxField from "../../shared/components/CheckboxField";

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
        </Row>
      </Form>
    </div>
  );
};

export default AppComponents;
