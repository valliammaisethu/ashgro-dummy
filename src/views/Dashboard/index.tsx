import React, { useState } from "react";

import { useUserRole } from "src/shared/hooks/useUserRole";

import DashboardHeader from "./Header";
import ChartForm from "./ChartForm";
import ChartFilters from "./Filters";
import { deleteModalDescription, deleteModalTitle } from "./constants";
import { xAxisLabel } from "./ChartForm/constants";
import { ChartState } from "src/shared/types/dashboard.type";
import { XAxisTypes } from "src/enums/charts.enum";
import ConditionalRenderComponent from "src/shared/components/ConditionalRenderComponent";
import DeleteModal from "src/shared/components/DeleteModal";
import { replaceString } from "src/shared/utils/commonHelpers";

import styles from "./dashboard.module.scss";

const DashboardWrapper = () => {
  const SuperAdminDashboard = () => {
    return <div>SuperAdminDashboard</div>;
  };

  const ClubAdminDashboard = () => {
    const [chartState, setChartState] = useState<ChartState>({
      chartDeleteOpen: false,
      chartFormOpen: false,
      chartFiltersOpen: false,
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

    const handleChartFilters = () => {
      setChartState((prev) => ({
        ...prev,
        chartFiltersOpen: !prev.chartFiltersOpen,
      }));
    };

    return (
      <div className={styles.clubAdminDashboard}>
        <DashboardHeader onAddChart={handleChartForm} />
        <ConditionalRenderComponent
          visible={chartState.chartFormOpen}
          hideFallback
        >
          <ChartForm
            onClose={handleChartForm}
            open={chartState.chartFormOpen}
          />
        </ConditionalRenderComponent>
        <ConditionalRenderComponent
          hideFallback
          visible={chartState.chartDeleteOpen}
        >
          <DeleteModal
            title={deleteModalTitle}
            externalOnClose={handleDeleteChart}
            externalVisible={chartState.chartDeleteOpen}
            description={replaceString(deleteModalDescription, xAxisLabel)}
          />
        </ConditionalRenderComponent>
        <ConditionalRenderComponent
          visible={chartState.chartFiltersOpen}
          hideFallback
        >
          <ChartFilters
            open={chartState.chartFiltersOpen}
            onClose={handleChartFilters}
            title="Chart Filters"
            selectedType={XAxisTypes.LEAD_SOURCE}
          />
        </ConditionalRenderComponent>
      </div>
    );
  };
  const { isSuperAdmin, isClubAdmin } = useUserRole();

  if (isSuperAdmin) return <SuperAdminDashboard />;
  if (isClubAdmin) return <ClubAdminDashboard />;
  return null;
};

export default DashboardWrapper;
