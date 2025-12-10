import React from "react";
import { useQuery } from "@tanstack/react-query";
import { HolderOutlined } from "@ant-design/icons";
import { IconFilterAlt } from "obra-icons-react";
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

const { ICON_GREY } = Colors;

const BarChartCard: React.FC<BarChartCardProps> = ({
  title = "",
  isDefaultChart,
  apiPath = "",
  isDragging = false,
  isOver,
  dragHandleProps,
}) => {
  const { getChartDetails } = DashboardService();
  const {
    data: chartData,
    isLoading,
    isSuccess,
    isError,
    refetch,
  } = useQuery(getChartDetails(apiPath));

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
            <HolderOutlined
              color={ICON_GREY}
              size={20}
              className={styles.dragIcon}
            />
          </span>
          <h3 className={styles.chartTitle}>{title}</h3>
        </div>
        <div className={styles.chartActions}>
          <ConditionalRenderComponent visible={isDefaultChart} hideFallback>
            <p className={styles.customChartText}>
              {CHART_CONSTANTS.CUSTOM_CHART}
            </p>
          </ConditionalRenderComponent>
          <IconFilterAlt size={20} color={ICON_GREY} />
        </div>
      </div>

      <ConditionalRender
        records={chartData?.labels}
        isPending={isLoading}
        isSuccess={isSuccess}
        className={styles.loader}
        noData={<EmptyState />}
        isError={isError}
        errorComponent={<ErrorState onReload={refetch} />}
      >
        <ChartCanvas title={title} labels={chartData?.labels ?? []} />
      </ConditionalRender>
    </div>
  );
};

export default React.memo(BarChartCard);
