import React, { useMemo, useCallback } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IconReorderAlt, IconEdit, IconDelete } from "obra-icons-react";
import clsx from "clsx";

import { Colors } from "src/enums/colors.enum";
import { DashboardService } from "src/services/DashboardService/dashboard.service";
import ChartCanvas from "../ChartCanvas";
import ConditionalRender from "src/shared/components/ConditionalRender";
import { XAxisTypes } from "src/enums/charts.enum";
import ConditionalRenderComponent from "src/shared/components/ConditionalRenderComponent";
import EmptyState from "../../atoms/EmptyState";
import ErrorState from "../../atoms/ErrorState";
import { CHART_CONSTANTS, CHART_LABEL_MAP } from "../../constants";
import DeleteModal from "src/shared/components/DeleteModal";
import { useDashboardFilters } from "src/context/DashboardFiltersContext";
import DateRangeButton from "../DateRangeButton";
import { BarChartCardProps, DateRange } from "src/shared/types/dashboard.type";
import { useUserRole } from "src/shared/hooks/useUserRole";
import FilterIconWithBadge from "../FilterIconWithBadge";
import ClubFilterDropdown from "../ClubFilterDropdown";

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

  const { isClubAdmin } = useUserRole();

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
  const { getChartDetails, deleteChart, getSuperAdminChartDetails } =
    DashboardService();

  const { mutateAsync: deleteChartMutation, isPending } =
    useMutation(deleteChart());
  const {
    data: chartData,
    isLoading: clubChartDataLoading,
    isSuccess: clubChartDataSuccess,
    isError: clubChartDataError,
    refetch: clubChartRefetch,
  } = useQuery(getChartDetails(path, queryParams));

  const {
    data: superAdminChartData,
    isLoading: superAdminChartDataLoading,
    isSuccess: superAdminChartDataSuccess,
    isError: superAdminChartDataError,
    refetch: superAdminChartRefetch,
  } = useQuery(getSuperAdminChartDetails(path, queryParams));

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

  const handleDateChange = (dates: DateRange | null) => {
    if (!id) return;
    setChartDateRange(id, dates);
  };

  const chartDetails = useMemo(
    () => (isClubAdmin ? values : superAdminChartData) ?? [],
    [isClubAdmin, values, superAdminChartData],
  );

  const refetchData = useCallback(
    () => (isClubAdmin ? clubChartRefetch() : superAdminChartRefetch()),
    [isClubAdmin, clubChartRefetch, superAdminChartRefetch],
  );

  const isLoading = clubChartDataLoading || superAdminChartDataLoading;
  const isSuccess = clubChartDataSuccess || superAdminChartDataSuccess;
  const isError = clubChartDataError || superAdminChartDataError;

  return (
    <div
      className={clsx(styles.chartCard, {
        [styles.chartCardDragging]: isDragging,
        [styles.chartCardOver]: isOver,
      })}
    >
      <div className={styles.chartHeader}>
        <div className={styles.headerLeft}>
          <ConditionalRenderComponent visible={isClubAdmin} hideFallback>
            <IconReorderAlt
              {...dragHandleProps}
              size={20}
              color={DARK_GOLD}
              className={clsx(styles.dragIcon, {
                [styles.dragging]: isDragging,
              })}
            />
          </ConditionalRenderComponent>
          <h2 className={styles.chartTitle}>{title}</h2>
        </div>

        <ConditionalRenderComponent visible={!isDefault} hideFallback>
          <span className={styles.customBadge}>
            {CHART_CONSTANTS.CUSTOM_CHART}
          </span>
        </ConditionalRenderComponent>
        <div className={styles.chartActions}>
          <ConditionalRenderComponent visible={!isClubAdmin} hideFallback>
            <div className={styles.labelPrefix} />
            <span className={styles.superAdminChatLabel}>
              {CHART_LABEL_MAP[title]}
            </span>
          </ConditionalRenderComponent>

          <DateRangeButton value={dateRange} onChange={handleDateChange} />
          <ConditionalRenderComponent
            visible={isClubAdmin}
            fallback={<ClubFilterDropdown chartId={id} />}
          >
            <FilterIconWithBadge
              hasFilters={hasFilters}
              onClick={handleFilterClick}
            />
          </ConditionalRenderComponent>
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
        records={chartDetails}
        isPending={isLoading}
        isSuccess={isSuccess}
        className={styles.loader}
        isError={isError}
        errorComponent={<ErrorState onReload={refetchData} />}
        {...(hasFilters && { noData: <EmptyState /> })}
      >
        <ChartCanvas title={title} labels={chartDetails} />
      </ConditionalRender>
    </div>
  );
};

export default React.memo(BarChartCard);
