import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { DashboardService } from "src/services/DashboardService/dashboard.service";
import ConditionalRender from "src/shared/components/ConditionalRender";
import BarChartCard from "./components/BarChartCard";
import ConditionalRenderComponent from "src/shared/components/ConditionalRenderComponent";
import { DashboardStats } from "src/models/dashboardStats.model";
import DeleteModal from "src/shared/components/DeleteModal";
import { useUserRole } from "src/shared/hooks/useUserRole";
import { SUPER_ADMIN_CHARTS as superAdminCharts } from "./utils/chartUtils";
import { XAxisTypes } from "src/enums/charts.enum";
import { useAppContainerPadding } from "src/shared/hooks/useAppContainerPadding";
import { ChartState } from "src/shared/types/dashboard.type";
import { replaceString } from "src/shared/utils/commonHelpers";
import DashboardHeader from "./Header";
import ChartForm from "./ChartForm";
import StatsCard from "./atoms/StatsCard";
import ChartFilters from "./Filters";
import {
  chartFiltersTitle,
  deleteModalDescription,
  deleteModalTitle,
  getDashboardStats,
  sampleFilter,
} from "./constants";
import { xAxisLabel } from "./ChartForm/constants";

import styles from "./dashboard.module.scss";

const Dashboard = () => {
  const { isClubAdmin, isSuperAdmin } = useUserRole();
  useAppContainerPadding();

  const { getDashboardChartsList } = DashboardService();

  const {
    data: clubAdminCharts = [],
    isLoading,
    isSuccess,
  } = useQuery({
    ...getDashboardChartsList(),
    enabled: isClubAdmin,
  });

  const [chartState, setChartState] = useState<ChartState>({
    chartDeleteOpen: false,
    chartFormOpen: false,
    chartFiltersOpen: false,
    activeFilter: sampleFilter,
  });

  const handleChartForm = () =>
    setChartState((prev) => ({
      ...prev,
      chartFormOpen: !prev.chartFormOpen,
    }));

  const handleDeleteChart = () =>
    setChartState((prev) => ({
      ...prev,
      chartDeleteOpen: !prev.chartDeleteOpen,
    }));

  const handleChartFilters = () =>
    setChartState((prev) => ({
      ...prev,
      chartFiltersOpen: !prev.chartFiltersOpen,
    }));

  const dashboardCharts = isClubAdmin ? clubAdminCharts : superAdminCharts;

  return (
    <div className={styles.dashboardContainer}>
      <DashboardHeader onAddChart={handleChartForm} />
      <ConditionalRenderComponent visible={isSuperAdmin} hideFallback>
        <div className={styles.superAdminDashboard}>
          {getDashboardStats(new DashboardStats())?.map(({ label, value }) => (
            <StatsCard key={label} title={label} value={value} />
          ))}
        </div>
      </ConditionalRenderComponent>
      <ConditionalRenderComponent
        visible={chartState.chartFormOpen}
        hideFallback
      >
        <ChartForm onClose={handleChartForm} open={chartState.chartFormOpen} />
      </ConditionalRenderComponent>

      <ConditionalRenderComponent
        visible={chartState.chartDeleteOpen}
        hideFallback
      >
        <DeleteModal
          title={deleteModalTitle}
          externalOnClose={handleDeleteChart}
          externalVisible={chartState.chartDeleteOpen}
          description={replaceString(deleteModalDescription, xAxisLabel)}
        />
      </ConditionalRenderComponent>

      <ConditionalRender
        records={dashboardCharts}
        isPending={isClubAdmin ? isLoading : false}
        isSuccess={isClubAdmin ? isSuccess : true}
      >
        <div className={styles.chartsGrid}>
          {dashboardCharts?.map(({ id, name, isDefault, path }) => (
            <ConditionalRenderComponent key={id} visible={!!id} hideFallback>
              <BarChartCard
                title={name}
                isDefaultChart={isDefault}
                apiPath={path}
              />
            </ConditionalRenderComponent>
          ))}
        </div>
      </ConditionalRender>
      <ConditionalRenderComponent
        visible={chartState.chartFiltersOpen}
        hideFallback
      >
        <ChartFilters
          open={chartState.chartFiltersOpen}
          onClose={handleChartFilters}
          title={replaceString(chartFiltersTitle, chartState.activeFilter)}
          selectedType={XAxisTypes.LEAD_SOURCE}
          // TODO: to remove this once the API is ready
        />
      </ConditionalRenderComponent>
    </div>
  );
};

export default Dashboard;
