import React from "react";
import { useQuery } from "@tanstack/react-query";

import { DashboardService } from "src/services/DashboardService/dashboard.service";
import ConditionalRender from "src/shared/components/ConditionalRender";
import ConditionalRenderComponent from "src/shared/components/ConditionalRenderComponent";
import { useUserRole } from "src/shared/hooks/useUserRole";
import BarChartCard from "./components/BarChartCard";
import { SUPER_ADMIN_CHARTS as superAdminCharts } from "./utils/chartUtils";
import { useAppContainerPadding } from "src/shared/hooks/useAppContainerPadding";

import styles from "./dashboard.module.scss";

const Dashboard = () => {
  const { isClubAdmin } = useUserRole();

  const { getDashboardChartsList } = DashboardService();

  const {
    data: clubAdminCharts = [],
    isLoading,
    isSuccess,
  } = useQuery({
    ...getDashboardChartsList(),
    enabled: isClubAdmin,
  });

  const dashboardCharts = isClubAdmin ? clubAdminCharts : superAdminCharts;

  useAppContainerPadding();

  return (
    <div className={styles.dashboardContainer}>
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
    </div>
  );
};

export default Dashboard;
