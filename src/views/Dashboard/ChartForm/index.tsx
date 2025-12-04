import React from "react";
import { Col, Divider, Row } from "antd";

import {
  chartFormConstants,
  fields,
  labels,
  placeholders,
  xAxisLabel,
} from "./constants";
import { chartformValidation } from "./validation";
import { Buttons } from "src/enums/buttons.enum";
import { ChartFormProps } from "src/shared/types/dashboard.type";
import InputField from "src/shared/components/InputField";
import Form from "src/shared/components/Form";
import useForm from "src/shared/components/UseForm";
import Modal from "src/shared/components/Modal";
import TagInput from "src/shared/components/TagInput";

import styles from "./chartForm.module.scss";

const { title } = chartFormConstants;
const { chartTitle, xAxis, labelAlongYAxis } = labels;
const {
  chartTitle: chartTitleField,
  labels: xAxisLabelsField,
  xaxis: xAxisField,
} = fields;
const {
  chartTitle: chartTitlePlaceholder,
  xAxis: xAxisLabelsPlaceholder,
  yAxis: yAxisPlaceholder,
} = placeholders;

const ChartForm = (props: ChartFormProps) => {
  const { onClose, open } = props;

  // TODO: Edit Integration

  // const editData = useMemo(() => {
  //   return {
  //     [chartTitleField]: title,
  //     [typeField]: XAxisTypes.TOUR_BOOKING_TO_CONVERSION_RATE,
  //     [labelField]: xAxisLabel,
  //   };
  // }, []);

  const methods = useForm({
    validationSchema: chartformValidation,
    // TODO: Edit Integration
    // defaultValues: editData,
  });

  const {
    formState: { isDirty, isValid },
  } = methods;

  return (
    <Modal
      cancelButtonProps={{
        className: "d-none",
      }}
      // TODO: Edit Integration
      // okText={editData ? Buttons.SAVE_CHANGES : Buttons.ADD_CHART}
      okText={Buttons.ADD_CHART}
      okButtonProps={{
        disabled: !isDirty || !isValid,
      }}
      title={title}
      onCancel={onClose}
      visible={open}
      rootClassName={styles.chartFormModal}
    >
      <Form methods={methods}>
        <Row gutter={24}>
          <Col span={12}>
            <InputField
              placeholder={chartTitlePlaceholder}
              name={chartTitleField}
              required
              label={chartTitle}
            />
          </Col>
          <Col span={12}>
            <InputField
              placeholder={yAxisPlaceholder}
              name={xAxisField}
              label={labelAlongYAxis}
            />
          </Col>
        </Row>
        <Divider />

        <p className={styles.formLabel}>{xAxisLabel}</p>

        <Row className={styles.formRow} gutter={[24, 0]}>
          <Col span={12}>
            <TagInput
              required
              label={xAxis}
              placeholder={xAxisLabelsPlaceholder}
              name={xAxisLabelsField}
            />
          </Col>
        </Row>

        <Divider />
      </Form>
    </Modal>
  );
};

export default ChartForm;
