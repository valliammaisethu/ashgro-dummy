import { Col, Row } from "antd";
import React, { useMemo, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";

import Drawer from "src/shared/components/Drawer";
import Form from "src/shared/components/Form";
import Checkbox from "src/shared/components/Checkbox";
import Label from "src/shared/components/Label";
import useForm from "src/shared/components/UseForm";
import { ChartFilterProps } from "src/shared/types/dashboard.type";
import { Buttons, ButtonTypes } from "src/enums/buttons.enum";
import { XAxisTypes } from "src/enums/charts.enum";
import { MetaService } from "src/services/MetaService/meta.service";
import {
  getChartFilterLabel,
  getDynamicLabelOptions,
  getActiveQueryStatus,
} from "./utils";
import { useDashboardFilters } from "src/context/DashboardFiltersContext";
import ConditionalRender from "src/shared/components/ConditionalRender";
import ConditionalRenderComponent from "src/shared/components/ConditionalRenderComponent";
import { mapChartOptions } from "src/shared/utils/helpers";

import styles from "./chartFilters.module.scss";

const ChartFilters = (props: ChartFilterProps) => {
  const { onClose, open, title, selectedType, chartId } = props;

  const {
    getChartFilter,
    setChartFilter,
    closeFilterDrawer,
    clearChartFilters,
    activeFilterChart,
  } = useDashboardFilters();

  const existingValues = getChartFilter(chartId);

  const [selectedValues, setSelectedValues] =
    useState<string[]>(existingValues);

  const {
    getLeadSources,
    getLeadStatuses,
    getMembershipCategories,
    getMembershipStatuses,
    getStaffDepartments,
    getActivityTypes,
  } = MetaService();

  const {
    data: leadSourcesData,
    isPending: isLeadSourcesLoading,
    isSuccess: isLeadSourcesSuccess,
  } = useQuery({
    ...getLeadSources(),
    enabled: selectedType === XAxisTypes.LEAD_SOURCE,
  });

  const {
    data: leadStatusesData,
    isPending: isLeadStatusesLoading,
    isSuccess: isLeadStatusesSuccess,
  } = useQuery({
    ...getLeadStatuses(),
    enabled: selectedType === XAxisTypes.LEAD_STATUS,
  });

  const {
    data: membershipCategoriesData,
    isPending: isMembershipCategoriesLoading,
    isSuccess: isMembershipCategoriesSuccess,
  } = useQuery({
    ...getMembershipCategories(),
    enabled: selectedType === XAxisTypes.MEMBERSHIP_CATEGORY,
  });

  const {
    data: membershipStatusesData,
    isPending: isMembershipStatusesLoading,
    isSuccess: isMembershipStatusesSuccess,
  } = useQuery({
    ...getMembershipStatuses(),
    enabled: selectedType === XAxisTypes.MEMBERSHIP_STATUS,
  });

  const {
    data: staffDepartmentsData,
    isPending: isStaffDepartmentsLoading,
    isSuccess: isStaffDepartmentsSuccess,
  } = useQuery({
    ...getStaffDepartments(),
    enabled: selectedType === XAxisTypes.STAFF_DEPARTMENT,
  });

  const {
    data: salesActivityData,
    isPending: isSalesActivityLoading,
    isSuccess: isSalesActivitySuccess,
  } = useQuery({
    ...getActivityTypes(),
    enabled: selectedType === XAxisTypes.SALES_ACTIVITY,
  });

  const statusBundle = {
    leadSources: {
      loading: isLeadSourcesLoading,
      success: isLeadSourcesSuccess,
    },
    leadStatuses: {
      loading: isLeadStatusesLoading,
      success: isLeadStatusesSuccess,
    },
    membershipCategories: {
      loading: isMembershipCategoriesLoading,
      success: isMembershipCategoriesSuccess,
    },
    membershipStatuses: {
      loading: isMembershipStatusesLoading,
      success: isMembershipStatusesSuccess,
    },
    staffDepartments: {
      loading: isStaffDepartmentsLoading,
      success: isStaffDepartmentsSuccess,
    },
    salesActivity: {
      loading: isSalesActivityLoading,
      success: isSalesActivitySuccess,
    },
  };

  const { loading, success } = getActiveQueryStatus(selectedType, statusBundle);

  const optionsBundle = {
    leadSourcesData,
    leadStatusesData,
    membershipCategoriesData,
    membershipStatusesData,
    staffDepartmentsData,
    salesActivityData,
  };

  const dynamicLabelOptions = useMemo(() => {
    if (activeFilterChart?.chartValues?.length) {
      return mapChartOptions(activeFilterChart.chartValues);
    }

    return getDynamicLabelOptions(selectedType, optionsBundle);
  }, [selectedType, optionsBundle, activeFilterChart]);

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
    if (chartId) {
      setChartFilter(chartId, selectedValues);
      closeFilterDrawer();
    }
  };

  const handleClearFilters = () => {
    if (chartId) {
      setSelectedValues([]);
      clearChartFilters(chartId);
      closeFilterDrawer();
    }
  };

  useEffect(() => {
    if (open && chartId) {
      setSelectedValues(getChartFilter(chartId));
    }
  }, [open, chartId, getChartFilter]);

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
      cancelText={Buttons.CLEAR_FILTERS}
      cancelButtonProps={{
        onClick: handleClearFilters,
        type: ButtonTypes.DEFAULT,
        ...(!existingValues?.length && { className: "d-none" }),
      }}
    >
      <Form methods={methods} className={styles.form}>
        <Row gutter={[0, 24]}>
          <div className={styles.labelContainer}>
            <Col>
              <h3 className={styles.titleLabel}>
                {getChartFilterLabel(selectedType)}
              </h3>
            </Col>
            <Col>
              <h3 onClick={handleSelectAll} className={styles.selectAll}>
                <ConditionalRenderComponent
                  visible={!!dynamicLabelOptions?.length}
                  hideFallback
                >
                  {isAllSelected ? Buttons.UNSELECT_ALL : Buttons.SELECT_ALL}
                </ConditionalRenderComponent>
              </h3>
            </Col>
          </div>
          <div className={styles.filtersContainer}>
            <ConditionalRender
              isPending={loading}
              isSuccess={success}
              records={dynamicLabelOptions}
            >
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
            </ConditionalRender>
          </div>
        </Row>
      </Form>
    </Drawer>
  );
};

export default ChartFilters;
