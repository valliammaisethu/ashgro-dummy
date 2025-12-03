import React from "react";
import { useQuery } from "@tanstack/react-query";
import { HolderOutlined } from "@ant-design/icons";
import { IconFilterAlt } from "obra-icons-react";

import { Colors } from "src/enums/colors.enum";
import { DashboardService } from "src/services/DashboardService/dashboard.service";
import ChartCanvas from "../ChartCanvas";
import ConditionalRender from "src/shared/components/ConditionalRender";
import { BarChartCardProps } from "src/shared/types/dashboard.types";
import ConditionalRenderComponent from "src/shared/components/ConditionalRenderComponent";
import { CHART_CONSTANTS } from "../../constants";

import styles from "./barChartCard.module.scss";

const { DEFAULT_BAR_COLOR, ICON_GREY } = Colors;

const BarChartCard: React.FC<BarChartCardProps> = ({
  title = "",
  isDefaultChart,
  barColor = DEFAULT_BAR_COLOR,
  apiPath = "",
}) => {
  const { getChartDetails } = DashboardService();
  const {
    data: chartData,
    isLoading,
    isSuccess,
  } = useQuery(getChartDetails(apiPath));

  // TODO: TO confirm with BA and add error state

  return (
    <div className={styles.chartCard}>
      <div className={styles.chartHeader}>
        <div className={styles.headerLeft}>
          <HolderOutlined
            color={ICON_GREY}
            size={20}
            className={styles.dragIcon}
          />
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
      >
        <ChartCanvas
          title={title}
          labels={chartData?.labels ?? []}
          barColor={barColor}
        />
      </ConditionalRender>
    </div>
  );
};

export default BarChartCard;
