import React, { useEffect, useMemo } from "react";
import { Col, Divider, Row, Spin } from "antd";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoadingOutlined } from "@ant-design/icons";

import { chartFormConstants, chartConfig, xAxisLabel } from "./constants";
import { chartformValidation } from "./validation";
import { Buttons } from "src/enums/buttons.enum";
import { CustomChartProps } from "src/shared/types/dashboard.type";
import { xAxisTypesOptions } from "src/constants/chartOptions";
import { QueryKeys } from "src/enums/cacheEvict.enum";
import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";
import InputField from "src/shared/components/InputField";
import Form from "src/shared/components/Form";
import useForm from "src/shared/components/UseForm";
import Modal from "src/shared/components/Modal";
import SelectField from "src/shared/components/SelectField";
import { CustomChart } from "src/models/chart.model";
import { DashboardService } from "src/services/DashboardService/dashboard.service";
import ConditionalRenderComponent from "src/shared/components/ConditionalRenderComponent";

import styles from "./customChartForm.module.scss";

const { title } = chartFormConstants;
const { labels, fields, placeholders } = chartConfig;

const CustomChartForm = (props: CustomChartProps) => {
  const { onClose, open, formValues } = props;

  const queryClient = useQueryClient();
  const clubId = localStorageHelper.getItem(LocalStorageKeys.USER)?.clubId;

  const { addCustomChart, editCustomChart, getChartValues } =
    DashboardService();

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

    mutateFn(values, {
      onSuccess: () => {
        if (formValues?.id && formValues?.path) {
          queryClient.invalidateQueries({
            queryKey: [QueryKeys.GET_CHART_DETAIL_KEY, clubId, formValues.path],
          });
        }
        onClose();
      },
    });
  };

  const methods = useForm({
    validationSchema: chartformValidation,
    defaultValues: formValues,
  });

  const {
    formState: { isValid },
    handleSubmit,
    watch,
    setValue,
    reset,
  } = methods;

  // TODO: remove useEffect once fix is done for forms to handle default values
  useEffect(() => {
    if (formValues) {
      reset(formValues);
    }
  }, [formValues, reset]);

  // TODO: TO move to constants
  const selectedType = watch("type");

  const { data: chartValuesData = [], isFetching } = useQuery(
    getChartValues(selectedType),
  );

  const memoizedChartOptions = useMemo(
    () => chartValuesData,
    [chartValuesData],
  );

  // TODO: TO move to constants
  const handleTypeChange = () => setValue("values", []);

  return (
    <Modal
      cancelButtonProps={{
        className: "d-none",
      }}
      handleOk={handleSubmit(handleFormSubmit)}
      okText={formValues ? Buttons.SAVE_CHANGES : Buttons.ADD_CHART}
      okButtonProps={{
        disabled: !isValid,
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
              placeholder={placeholders.chartTitle}
              name={fields.name}
              required
              label={labels.chartTitle}
            />
          </Col>
        </Row>
        <Divider />

        <p className={styles.formLabel}>{xAxisLabel}</p>

        <Row className={styles.formRow} gutter={[24, 0]}>
          <Col span={12}>
            <SelectField
              required
              label={labels.type}
              name={fields.type}
              options={xAxisTypesOptions}
              placeholder={placeholders.type}
              onChange={handleTypeChange}
            />
          </Col>
          <Col span={12}>
            {/*TODO: Adding this as temperoty fix, since the SelectField is cluttered with multiple logic, need to fix this during SelectField enhancement */}
            <ConditionalRenderComponent
              visible={!isFetching}
              fallback={
                <InputField
                  placeholder={placeholders.xAxis}
                  name={fields.empty}
                  required
                  label={labels.xAxis}
                  suffix={<Spin indicator={<LoadingOutlined />} />}
                />
              }
            >
              <SelectField
                key={selectedType}
                required
                showCheckboxes
                label={labels.xAxis}
                placeholder={placeholders.xAxis}
                name={fields.values}
                options={memoizedChartOptions}
                loading={isFetching}
                disabled={!selectedType}
              />
            </ConditionalRenderComponent>
          </Col>
        </Row>

        <Divider />
      </Form>
    </Modal>
  );
};

export default CustomChartForm;
