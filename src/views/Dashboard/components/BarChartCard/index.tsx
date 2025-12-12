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
import { BarChartCardProps } from "src/shared/types/dashboard.types";
import ConditionalRenderComponent from "src/shared/components/ConditionalRenderComponent";
import EmptyState from "../../atoms/EmptyState";
import ErrorState from "../../atoms/ErrorState";
import { CHART_CONSTANTS } from "../../constants";

import styles from "./barChartCard.module.scss";

const { DARK_GOLD, MODAL_CLOSE_ICON } = Colors;

const BarChartCard: React.FC<BarChartCardProps> = ({
  id,
  title = "",
  isDefaultChart,
  apiPath = "",
  isDragging = false,
  isOver,
  dragHandleProps,
  onEdit,
}) => {
  const { getChartDetails, deleteChart } = DashboardService();

  const { mutateAsync: deleteChartMutation } = useMutation(deleteChart());
  const {
    data: chartData,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = useQuery(getChartDetails(apiPath));

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

  return (
    <div
      className={clsx(styles.chartCard, {
        [styles.chartCardDragging]: isDragging,
        [styles.chartCardOver]: isOver,
      })}
    >
      <div className={styles.chartHeader}>
        <div className={styles.headerLeft}>
          <span
            className={clsx(styles.dragIcon, {
              [styles.dragging]: isDragging,
            })}
            {...dragHandleProps}
          >
            <IconReorderAlt
              color={DARK_GOLD}
              size={20}
              className={styles.dragIcon}
            />
          </span>
          <h3 className={styles.chartTitle}>{title}</h3>
        </div>
        <ConditionalRenderComponent visible={!isDefaultChart} hideFallback>
          <span className={styles.customBadge}>
            {CHART_CONSTANTS.CUSTOM_CHART}
          </span>
        </ConditionalRenderComponent>
        <div className={styles.chartActions}>
          <IconFilterAlt
            size={20}
            color={MODAL_CLOSE_ICON}
            className={styles.actionIcon}
          />

          <ConditionalRenderComponent visible={!isDefaultChart} hideFallback>
            <IconEdit
              size={20}
              color={MODAL_CLOSE_ICON}
              className={styles.actionIcon}
              onClick={handleOnEdit}
            />
            <IconDelete
              size={20}
              color={MODAL_CLOSE_ICON}
              className={styles.actionIcon}
              onClick={handleOnDelete}
            />
          </ConditionalRenderComponent>
        </div>
      </div>

      <ConditionalRender
        records={values}
        isPending={isLoading}
        isSuccess={isSuccess}
        className={styles.loader}
        noData={<EmptyState />}
        isError={isError}
        errorComponent={<ErrorState onReload={refetch} />}
      >
        <ChartCanvas title={title} labels={values} />
      </ConditionalRender>
    </div>
  );
};

export default React.memo(BarChartCard);
