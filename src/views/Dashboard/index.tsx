import React, { useState, useEffect, useCallback } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";

import { DashboardService } from "src/services/DashboardService/dashboard.service";
import ConditionalRender from "src/shared/components/ConditionalRender";
import BarChartCard from "./components/BarChartCard";
import ConditionalRenderComponent from "src/shared/components/ConditionalRenderComponent";
import { useUserRole } from "src/shared/hooks/useUserRole";
import {
  SUPER_ADMIN_CHARTS as superAdminCharts,
  getSwappedCharts,
} from "./utils/chartUtils";
import { XAxisTypes } from "src/enums/charts.enum";
import { useAppContainerPadding } from "src/shared/hooks/useAppContainerPadding";
import { ChartState } from "src/shared/types/dashboard.type";
import DashboardHeader from "./Header";
import StatsCard from "./atoms/StatsCard";
import ChartFilters from "./Filters";
import CustomChartForm from "./CustomChartForm";
import { useDashboardFilters } from "src/context/DashboardFiltersContext";
import {
  getDashboardStatsValues,
  dropAnimationConfig,
  CHART_CONSTANTS,
  chartLimitErrorMessages,
} from "./constants";
import { ChartItem } from "src/models/dashboard.model";
import DraggableChartCard from "./components/DraggableChartCard";
import { CustomChart } from "src/models/chart.model";
import DateRangeButton from "./components/DateRangeButton";
import { DateRange } from "src/shared/types/dashboard.type";

import styles from "./dashboard.module.scss";
import { renderNotification } from "src/shared/utils/renderNotification";
import { NotificationTypes } from "src/enums/notificationTypes";

const { DASHBOARD_STATS_ID } = CHART_CONSTANTS;
const { TITLE, DESCRIPTION } = chartLimitErrorMessages;

const Dashboard = () => {
  const { isClubAdmin, isSuperAdmin } = useUserRole();
  const [orderedCharts, setOrderedCharts] = useState<ChartItem[]>([]);
  const [activeDragItem, setActiveDragItem] = useState<{
    id: string;
    width?: number;
  } | null>(null);
  const [chartFormValues, setChartFormValues] = useState<
    CustomChart | undefined
  >(new CustomChart());

  const {
    activeFilterChart,
    closeFilterDrawer,
    setChartDateRange,
    getChartDateRange,
  } = useDashboardFilters();

  const dashboardStatsDateRange = getChartDateRange(
    CHART_CONSTANTS.DASHBOARD_STATS_ID,
  );

  useAppContainerPadding();

  const {
    getDashboardChartsList,
    canCreateCustomChart,
    updateChartOrder,
    getDashboardStats,
  } = DashboardService();

  const {
    data: clubAdminCharts = [],
    isLoading,
    isSuccess,
  } = useQuery({
    ...getDashboardChartsList(),
    enabled: isClubAdmin,
  });

  const { data: dashboardStats } = useQuery({
    ...getDashboardStats({
      fromDate: dashboardStatsDateRange?.[0],
      toDate: dashboardStatsDateRange?.[1],
    }),
    enabled: isSuperAdmin,
  });
  const {
    mutateAsync: canCreateCustomChartMutate,
    isPending: canCreateChartLoading,
  } = useMutation(canCreateCustomChart());
  const { mutateAsync: reorderCharts } = useMutation(updateChartOrder());

  const [chartState, setChartState] = useState<ChartState>({
    chartFormOpen: false,
  });

  const handleChartForm = () => {
    canCreateCustomChartMutate(undefined, {
      onSuccess: (response) => {
        if (response?.data?.success) {
          setChartState((prev) => ({
            ...prev,
            chartFormOpen: !prev.chartFormOpen,
          }));
        } else {
          renderNotification(TITLE, DESCRIPTION, NotificationTypes.ERROR);
        }
      },
    });
  };

  const closeChartForm = () => {
    setChartState((prev) => ({
      ...prev,
      chartFormOpen: false,
    }));
    setChartFormValues(new CustomChart());
  };

  const handleChartEdit = (chartData?: CustomChart) => {
    setChartFormValues(chartData);
    setChartState((prev) => ({
      ...prev,
      chartFormOpen: true,
    }));
  };

  const dashboardCharts = isClubAdmin ? clubAdminCharts : superAdminCharts;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
  );

  const activeChart = orderedCharts?.find(
    ({ id }) => id === activeDragItem?.id,
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const dragItem = event?.active;
    if (!dragItem?.id) return;

    setActiveDragItem({
      id: dragItem?.id as string,
      width: dragItem?.rect?.current?.initial?.width,
    });
  }, []);

  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const { active, over } = event;

      setActiveDragItem(null);

      const activeChartId = active?.id as string;
      const overChartId = over?.id as string;

      if (!activeChartId || !overChartId) return;

      const chartsOrderData = getSwappedCharts(
        orderedCharts,
        activeChartId,
        overChartId,
      );

      if (!chartsOrderData) return;

      const { newCharts, oldIndex, newIndex } = chartsOrderData;
      setOrderedCharts(newCharts);

      const charts = [
        { id: activeChartId, order: newIndex },
        { id: overChartId, order: oldIndex },
      ];
      await reorderCharts(
        { charts },
        {
          onError: () => {
            setOrderedCharts(orderedCharts);
          },
        },
      );
    },
    [orderedCharts, reorderCharts],
  );

  const handleDateRangeChange = (dates: DateRange) =>
    setChartDateRange(DASHBOARD_STATS_ID, dates);

  const handleDragCancel = useCallback(() => {
    setActiveDragItem(null);
  }, []);

  useEffect(() => {
    if (dashboardCharts?.length) {
      setOrderedCharts(dashboardCharts as ChartItem[]);
    }
  }, [dashboardCharts]);

  return (
    <>
      <DashboardHeader
        loading={canCreateChartLoading}
        onAddChart={handleChartForm}
      />
      <div className={styles.dashboardContainer}>
        <ConditionalRenderComponent visible={isSuperAdmin} hideFallback>
          <div className={styles.superAdminDashboard}>
            <div className={styles.dateRangeContainer}>
              <DateRangeButton
                value={dashboardStatsDateRange}
                onChange={handleDateRangeChange}
              />
            </div>
            <div className={styles.statsContainer}>
              {getDashboardStatsValues(dashboardStats)?.map(
                ({ label, value }, index) => (
                  <StatsCard key={index} title={label} value={value} />
                ),
              )}
            </div>
          </div>
        </ConditionalRenderComponent>
        <ConditionalRenderComponent
          visible={chartState.chartFormOpen}
          hideFallback
        >
          <CustomChartForm
            onClose={closeChartForm}
            open={chartState.chartFormOpen}
            formValues={chartFormValues}
          />
        </ConditionalRenderComponent>

        <ConditionalRender
          records={orderedCharts}
          isPending={isClubAdmin ? isLoading : false}
          isSuccess={isClubAdmin ? isSuccess : true}
        >
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
          >
            <div className={styles.chartsGrid}>
              {orderedCharts?.map((chart) => (
                <DraggableChartCard
                  key={chart.id}
                  chart={chart}
                  onEdit={handleChartEdit}
                />
              ))}
            </div>

            <DragOverlay dropAnimation={dropAnimationConfig}>
              <ConditionalRenderComponent
                visible={!!activeChart?.id}
                hideFallback
              >
                <div
                  className={styles.dragOverlayCard}
                  style={{
                    width: activeDragItem?.width
                      ? `${activeDragItem.width}px`
                      : "100%",
                  }}
                >
                  <BarChartCard
                    key={activeChart?.id}
                    chart={activeChart}
                    dragChartProps={{ isDragging: true }}
                  />
                </div>
              </ConditionalRenderComponent>
            </DragOverlay>
          </DndContext>
        </ConditionalRender>
        <ConditionalRenderComponent visible={!!activeFilterChart} hideFallback>
          <ChartFilters
            open={!!activeFilterChart}
            onClose={closeFilterDrawer}
            title={`Filters - ${activeFilterChart?.chartName || ""}`}
            selectedType={activeFilterChart?.type || XAxisTypes.LEAD_SOURCE}
            chartId={activeFilterChart?.chartId}
          />
        </ConditionalRenderComponent>
      </div>
    </>
  );
};

export default Dashboard;
