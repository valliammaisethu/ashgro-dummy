import { Col, Row } from "antd";
import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";

import DateRangePickerField from "src/shared/components/DateRangePicker";
import Drawer from "src/shared/components/Drawer";
import Form from "src/shared/components/Form";
import Checkbox from "src/shared/components/Checkbox";
import Label from "src/shared/components/Label";
import useForm from "src/shared/components/UseForm";
import ConditionalRenderComponent from "src/shared/components/ConditionalRenderComponent";
import { ChartFilterProps } from "src/shared/types/dashboard.type";
import { Buttons } from "src/enums/buttons.enum";
import { XAxisTypes } from "src/enums/charts.enum";
import { MetaService } from "src/services/MetaService/meta.service";
import { getChartFilterLabel, getDynamicLabelOptions } from "./utils";
import { dateRangeFilterField, dateRangeFilterLabel } from "./constants";

import styles from "./chartFilters.module.scss";

const ChartFilters = (props: ChartFilterProps) => {
  const { onClose, open, title, selectedType } = props;

  const [selectedValues, setSelectedValues] = useState<string[]>([]);

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

  const optionsBundle = {
    leadSourcesData,
    leadStatusesData,
    membershipCategoriesData,
    membershipStatusesData,
    staffDepartmentsData,
  };

  const dynamicLabelOptions = useMemo(
    () => getDynamicLabelOptions(selectedType, optionsBundle),
    [selectedType, optionsBundle],
  );

  const filterCheckboxesValues = dynamicLabelOptions?.map(
    (option) => option.value,
  );
  const isAllSelected = selectedValues.length === filterCheckboxesValues.length;

  const handleSelectAll = () => {
    if (isAllSelected) setSelectedValues([]);
    else setSelectedValues(filterCheckboxesValues);
  };

  const handleCheckboxChange = (value: string) => () =>
    setSelectedValues((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );

  const handleSubmit = (values: FieldValues) => {
    //
  };

  const methods = useForm({});

  const handleCloseDrawer = () => {
    setSelectedValues([]);
    onClose();
  };

  return (
    <Drawer
      rootClassName={styles.chartFiltersDrawer}
      open={open}
      width={504}
      onClose={handleCloseDrawer}
      title={title}
      handleOk={methods.handleSubmit(handleSubmit)}
      okText={Buttons.APPLY_FILTERS}
      cancelButtonProps={{
        className: "d-none",
      }}
    >
      <Form methods={methods} className={styles.form}>
        <Row gutter={[0, 24]}>
          <Col span={24}>
            <h3 className={styles.titleLabel}>{dateRangeFilterLabel}</h3>
            <DateRangePickerField
              className={styles.formDatePicker}
              name={dateRangeFilterField}
            />
          </Col>
          <div className={styles.labelContainer}>
            <Col>
              <h3 className={styles.titleLabel}>
                {getChartFilterLabel(selectedType)}
              </h3>
            </Col>
            <Col>
              <h3 onClick={handleSelectAll} className={styles.selectAll}>
                {isAllSelected ? Buttons.UNSELECT_ALL : Buttons.SELECT_ALL}
              </h3>
            </Col>
          </div>
          <div className={styles.filtersContainer}>
            <ConditionalRenderComponent visible={!!dynamicLabelOptions.length}>
              {dynamicLabelOptions?.map((option) => (
                <div className={styles.checkboxContainer} key={option.value}>
                  <Checkbox
                    onChange={handleCheckboxChange(option.value)}
                    checked={selectedValues.includes(option.value)}
                    key={option.value}
                  />
                  <Label className={styles.checkboxLabel}>{option.label}</Label>
                </div>
              ))}
            </ConditionalRenderComponent>
          </div>
        </Row>
      </Form>
    </Drawer>
  );
};

export default ChartFilters;
