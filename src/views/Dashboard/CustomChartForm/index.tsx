import React from "react";
import { Col, Divider, Row } from "antd";
import { useMutation } from "@tanstack/react-query";

import {
  chartFormConstants,
  fields,
  labels,
  placeholders,
  xAxisLabel,
} from "./constants";
import { chartformValidation } from "./validation";
import { Buttons } from "src/enums/buttons.enum";
import { CustomChartProps } from "src/shared/types/dashboard.type";
import { xAxisTypesOptions } from "src/constants/chartOptions";
import InputField from "src/shared/components/InputField";
import Form from "src/shared/components/Form";
import useForm from "src/shared/components/UseForm";
import Modal from "src/shared/components/Modal";
import TagInput from "src/shared/components/TagInput";
import SelectField from "src/shared/components/SelectField";
import { CustomChart } from "src/models/chart.model";
import { DashboardService } from "src/services/DashboardService/dashboard.service";

import styles from "./customChartForm.module.scss";

const { title } = chartFormConstants;
const { chartTitle, xAxis, labelAlongYAxis, type } = labels;
const {
  chartTitle: chartTitleField,
  labels: xAxisLabelsField,
  xaxis: xAxisField,
  type: xAxisTypeField,
} = fields;
const {
  chartTitle: chartTitlePlaceholder,
  xAxis: xAxisLabelsPlaceholder,
  yAxis: yAxisPlaceholder,
  type: typePlaceholder,
} = placeholders;

const CustomChartForm = (props: CustomChartProps) => {
  const { onClose, open, formValues } = props;

  const { addCustomChart, editCustomChart } = DashboardService();

  const { mutateAsync: addCustomChartMutate, isPending: isAddingCustomChart } =
    useMutation(addCustomChart());

  const {
    mutateAsync: editCustomChartMutate,
    isPending: isEditingCustomChart,
  } = useMutation(editCustomChart());

  const handleFormSubmit = (values: CustomChart) => {
    const mutateFn = formValues?.id
      ? editCustomChartMutate
      : addCustomChartMutate;

    mutateFn(values, { onSuccess: onClose });
  };

  const methods = useForm({
    validationSchema: chartformValidation,
    defaultValues: formValues,
  });

  const {
    formState: { isDirty, isValid },
    handleSubmit,
  } = methods;

  return (
    <Modal
      cancelButtonProps={{
        className: "d-none",
      }}
      handleOk={handleSubmit(handleFormSubmit)}
      okText={formValues ? Buttons.SAVE_CHANGES : Buttons.ADD_CHART}
      okButtonProps={{
        disabled: !isDirty || !isValid,
        loading: formValues?.id ? isEditingCustomChart : isAddingCustomChart,
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
            <SelectField
              required
              label={type}
              name={xAxisTypeField}
              options={xAxisTypesOptions}
              placeholder={typePlaceholder}
            />
          </Col>
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

export default CustomChartForm;
