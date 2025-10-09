import React, { FC } from "react";
import { Col, Row } from "antd";

import { AppComponentsConstants } from "src/constants/appComponents";
import { Icons } from "src/enums/icons.enum";
import { ButtonTypes, HtmlButtonType } from "src/enums/buttons.enum";
import { INPUT_TYPE } from "src/enums/inputType";
import { NotificationTypes } from "src/enums/notificationTypes";
import InputField from "src/shared/components/InputField";
import Button from "src/shared/components/Button";
import Form from "src/shared/components/Form";
import CheckboxField from "src/shared/components/CheckboxField";
import NumberIncrementer from "src/shared/components/NumberIncrementer";
import RadioField from "src/shared/components/RadioField";
import SwitchField from "src/shared/components/SwitchField";
import Tabs from "src/shared/components/Tabs";
import Table from "src/shared/components/Table";
import Notification from "src/shared/components/Notification";
import { appComponentsValidation } from "./validation";

import styles from "./appComponents.module.scss";

const AppComponents: FC = () => {
  const renderSuccessNotification = () => {
    Notification({
      description: "Notification description",
      message: "Notification title",
      type: NotificationTypes.SUCCESS,
    });
  };

  const renderErrorNotification = () => {
    Notification({
      description: "Notification description",
      message: "Notification title",
      type: NotificationTypes.ERROR,
    });
  };

  return (
    <div className={styles.appComponents}>
      <h1 className="text-center text-decoration">App Components</h1>
      <div className={styles.formComponents}>
        <Form validationSchema={appComponentsValidation}>
          <Row gutter={[20, 20]}>
            <Col span={12}>
              <p className="mt-5 app-components__title">Input: </p>
              <InputField
                type={INPUT_TYPE.TEXT}
                name="input"
                placeholder="Enter some text"
                suffix={<i className={Icons.EYE_LINE}></i>}
                label="Input Field"
              />
            </Col>
            <Col span={12}>
              <p className="mt-5 app-components__title">Input: </p>
              <InputField
                type={INPUT_TYPE.TEXT}
                name="inputs"
                placeholder="Enter some text"
                suffix={<i className={Icons.EYE_LINE}></i>}
                label="Input Field"
                disabled
              />
            </Col>
            <Col span={12}>
              <CheckboxField label="Checkbox" name="checkbox" />
            </Col>
            <Col span={12}>
              <CheckboxField disabled label="Checkbox" name="checkboxs" />
            </Col>
            <Col span={12}>
              <NumberIncrementer name="numberIncrement" />
            </Col>
            <Col span={12}>
              <NumberIncrementer disabled name="numberIncrements" />
            </Col>
            <Col span={12}>
              <RadioField
                name="radioButton"
                options={AppComponentsConstants.OPTIONS}
              />
            </Col>
            <Col span={12}>
              <RadioField
                disabled
                name="radioButtons"
                options={AppComponentsConstants.OPTIONS}
              />
            </Col>
            <Col span={12}>
              <SwitchField disabled name="switchField" />
            </Col>
            <Col span={12}>
              <SwitchField name="switchFields" />
            </Col>
          </Row>
          <Button htmlType={HtmlButtonType.SUBMIT}>Submit</Button>
        </Form>
      </div>
      <div className={styles.otherComponents}>
        <Col span={24}>
          <Tabs items={AppComponentsConstants.TABS} />
        </Col>
        <Row>
          <Col span={6}>
            <Button
              onClick={renderSuccessNotification}
              type={ButtonTypes.PRIMARY}
            >
              Primary Button
            </Button>
          </Col>
          <Col span={6}>
            <Button
              onClick={renderErrorNotification}
              type={ButtonTypes.SECONDARY}
            >
              Secondary Button
            </Button>
          </Col>
          <Col span={6}>
            <Button type={ButtonTypes.TERTIARY}>Tertiary Button</Button>
          </Col>
          <Col span={6}>
            <Button type={ButtonTypes.SECONDARY_TWO}>
              Secondary Two Button
            </Button>
          </Col>
          <Col span={6}>
            <Button type={ButtonTypes.TERTIARY}>Tertiary Button</Button>
          </Col>
          <Col span={6}>
            <Button type={ButtonTypes.SECONDARY_TWO}>
              Secondary Two Button
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <Button type={ButtonTypes.LINK}>Outlined Button</Button>
          </Col>
          <Col span={6}>
            <Button type={ButtonTypes.TERTIARY_TWO}>Tertiary Two Button</Button>
          </Col>
          <Col span={6}>
            <Button type={ButtonTypes.PRIMARY_TWO}>Primary Two Button</Button>
          </Col>
          <Col span={6}>
            <Button type={ButtonTypes.TRANSPARENT}>Transparent Button</Button>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table
              dataSource={AppComponentsConstants.TABLE.DATA}
              columns={AppComponentsConstants.TABLE.COLUMS}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AppComponents;
