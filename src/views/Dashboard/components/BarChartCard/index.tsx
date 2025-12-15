import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  IconReorderAlt,
  IconFilterAlt,
  IconEdit,
  IconDelete,
} from "obra-icons-react";
import clsx from "clsx";

import { Colors } from "src/enums/colors.enum";
import { DashboardService } from "src/services/DashboardService/dashboard.service";
import ChartCanvas from "../ChartCanvas";
import ConditionalRender from "src/shared/components/ConditionalRender";
import { XAxisTypes } from "src/enums/charts.enum";
import ConditionalRenderComponent from "src/shared/components/ConditionalRenderComponent";
import EmptyState from "../../atoms/EmptyState";
import ErrorState from "../../atoms/ErrorState";
import { CHART_CONSTANTS } from "../../constants";
import DeleteModal from "src/shared/components/DeleteModal";
import { useDashboardFilters } from "src/context/DashboardFiltersContext";
import DateRangeButton from "../DateRangeButton";
import { BarChartCardProps } from "src/shared/types/dashboard.type";

import styles from "./barChartCard.module.scss";

const { DARK_GOLD, MODAL_CLOSE_ICON } = Colors;

const BarChartCard: React.FC<BarChartCardProps> = ({
  chart,
  dragChartProps,
  onEdit,
}) => {
  const {
    id,
    name: title = "",
    isDefault: isDefault,
    path: path = "",
  } = chart || {};
  const { isDragging = false, isOver, dragHandleProps } = dragChartProps || {};

  if (!id) return null;
  const {
    openFilterDrawer,
    hasActiveFilters,
    getChartDateRange,
    setChartDateRange,
    getChartParams,
  } = useDashboardFilters();

  const queryParams = getChartParams(id);

  const hasFilters = hasActiveFilters(id);
  const dateRange = getChartDateRange(id);
  const { getChartDetails, deleteChart } = DashboardService();

  const { mutateAsync: deleteChartMutation, isPending } =
    useMutation(deleteChart());
  const {
    data: chartData,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = useQuery(getChartDetails(path, queryParams));

  const { name, type, values = [] } = chartData || {};

  const handleOnDelete = async () => {
    if (!id) return;
    await deleteChartMutation(id);
  };

  const handleOnEdit = () => {
    if (!chartData) return;

    const formattedData = {
      id,
      name,
      type,
      values: values?.map((item) => item.id) || [],
    };

    onEdit?.(formattedData);
  };

  const handleFilterClick = () => {
    if (id && type) {
      openFilterDrawer({
        chartId: id,
        type: type as XAxisTypes,
        chartName: title,
      });
    }
  };

  const handleDateChange = (dates: [string, string] | null) => {
    if (!id) return;
    setChartDateRange(id, dates);
  };

  return (
    <div
      className={clsx(styles.chartCard, {
        [styles.chartCardDragging]: isDragging,
        [styles.chartCardOver]: isOver,
      })}
    >
      <div className={styles.chartHeader}>
        <div className={styles.headerLeft}>
          <IconReorderAlt
            {...dragHandleProps}
            size={20}
            color={DARK_GOLD}
            className={clsx(styles.dragIcon, { [styles.dragging]: isDragging })}
          />
          <h2 className={styles.chartTitle}>{title}</h2>
        </div>

        <ConditionalRenderComponent visible={!isDefault} hideFallback>
          <span className={styles.customBadge}>
            {CHART_CONSTANTS.CUSTOM_CHART}
          </span>
        </ConditionalRenderComponent>
        <div className={styles.chartActions}>
          <DateRangeButton value={dateRange} onChange={handleDateChange} />
          <div className={styles.filterIconWrapper}>
            <IconFilterAlt
              size={20}
              color={MODAL_CLOSE_ICON}
              className={styles.actionIcon}
              onClick={handleFilterClick}
            />
            <ConditionalRenderComponent visible={hasFilters} hideFallback>
              <span className={styles.filterBadge} />
            </ConditionalRenderComponent>
          </div>

          <ConditionalRenderComponent visible={!isDefault} hideFallback>
            <IconEdit
              size={20}
              color={MODAL_CLOSE_ICON}
              className={styles.actionIcon}
              onClick={handleOnEdit}
            />

            <DeleteModal
              {...CHART_CONSTANTS}
              customDescription={CHART_CONSTANTS.customDescription.replace(
                "%s",
                title,
              )}
              onDelete={handleOnDelete}
              loading={isPending}
            >
              <IconDelete
                size={20}
                color={MODAL_CLOSE_ICON}
                className={styles.actionIcon}
              />
            </DeleteModal>
          </ConditionalRenderComponent>
        </div>
      </div>

      <ConditionalRender
        records={values}
        isPending={isLoading}
        isSuccess={isSuccess}
        className={styles.loader}
        isError={isError}
        errorComponent={<ErrorState onReload={refetch} />}
        {...(hasFilters && { noData: <EmptyState /> })}
      >
        <ChartCanvas title={title} labels={values} />
      </ConditionalRender>
    </div>
  );
};

export default React.memo(BarChartCard);
