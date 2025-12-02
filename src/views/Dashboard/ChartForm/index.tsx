import React, { useMemo } from "react";
import { Col, Divider, Row } from "antd";
import { useQuery } from "@tanstack/react-query";

import {
  chartFormConstants,
  fields,
  labels,
  placeholders,
  xAxisLabel,
} from "./constants";
import { chartformValidation } from "./validation";
import { xAxisTypesOptions } from "src/constants/chartOptions";
import { XAxisTypes } from "src/enums/charts.enum";
import { Buttons } from "src/enums/buttons.enum";
import { ChartFormProps } from "src/shared/types/dashboard.type";
import { mapToSelectOptionsDynamic } from "src/shared/utils/helpers";
import InputField from "src/shared/components/InputField";
import Form from "src/shared/components/Form";
import useForm from "src/shared/components/UseForm";
import Modal from "src/shared/components/Modal";
import SelectField from "src/shared/components/SelectField";
import { MetaService } from "src/services/MetaService/meta.service";

import styles from "./chartForm.module.scss";

const { title } = chartFormConstants;
const { chartTitle, label, type } = labels;
const {
  chartTitle: chartTitleField,
  label: labelField,
  type: typeField,
} = fields;
const {
  chartTitle: chartTitlePlaceholder,
  label: labelPlaceholder,
  type: typePlaceholder,
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

  const selectedType = methods.watch("type");

  const {
    formState: { isDirty, isValid },
  } = methods;

  const {
    getLeadSources,
    getLeadStatuses,
    getMembershipCategories,
    getMembershipStatuses,
    getStaffDepartments,
  } = MetaService();

  const { data: leadSourcesData } = useQuery({
    ...getLeadSources(),
    enabled: selectedType === XAxisTypes.LEAD_SOURCE,
  });

  const { data: leadStatusesData } = useQuery({
    ...getLeadStatuses(),
    enabled: selectedType === XAxisTypes.LEAD_STATUS,
  });

  const { data: membershipCategoriesData } = useQuery({
    ...getMembershipCategories(),
    enabled: selectedType === XAxisTypes.MEMBERSHIP_CATEGORY,
  });

  const { data: membershipStatusesData } = useQuery({
    ...getMembershipStatuses(),
    enabled: selectedType === XAxisTypes.MEMBERSHIP_STATUS,
  });

  const { data: staffDepartmentsData } = useQuery({
    ...getStaffDepartments(),
    enabled: selectedType === XAxisTypes.STAFF_DEPARTMENT,
  });

  const dynamicLabelOptions = useMemo(() => {
    switch (selectedType) {
      case XAxisTypes.LEAD_SOURCE:
        return mapToSelectOptionsDynamic(leadSourcesData?.leadSources);

      case XAxisTypes.LEAD_STATUS:
        return mapToSelectOptionsDynamic(leadStatusesData?.leadStatuses);

      case XAxisTypes.MEMBERSHIP_CATEGORY:
        return mapToSelectOptionsDynamic(
          membershipCategoriesData?.membershipCategories,
        );

      case XAxisTypes.MEMBERSHIP_STATUS:
        return mapToSelectOptionsDynamic(
          membershipStatusesData?.membershipStatuses,
        );

      case XAxisTypes.STAFF_DEPARTMENT:
        return mapToSelectOptionsDynamic(
          staffDepartmentsData?.staffDepartments,
        );

      default:
        return [];
    }
  }, [
    selectedType,
    leadSourcesData,
    leadStatusesData,
    membershipCategoriesData,
    membershipStatusesData,
    staffDepartmentsData,
  ]);

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
        <Col span={12}>
          <InputField
            placeholder={chartTitlePlaceholder}
            name={chartTitleField}
            required
            label={chartTitle}
          />
        </Col>

        <Divider />

        <p className={styles.formLabel}>{xAxisLabel}</p>

        <Row className={styles.formRow} gutter={[24, 0]}>
          <Col span={12}>
            <SelectField
              label={type}
              placeholder={typePlaceholder}
              name={typeField}
              required
              options={xAxisTypesOptions}
            />
          </Col>

          <Col span={12}>
            <SelectField
              label={label}
              placeholder={labelPlaceholder}
              name={labelField}
              required
              disabled={!selectedType}
              options={dynamicLabelOptions}
            />
          </Col>
        </Row>

        <Divider />
      </Form>
    </Modal>
  );
};

export default ChartForm;
