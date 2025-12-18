import { Chart, ChartConfiguration, ChartItem } from "chart.js";
import { generatePath } from "react-router-dom";

import { Align, Justify } from "src/enums/align.enum";
import { Colors } from "src/enums/colors.enum";
import { LocalStorageKeys } from "src/enums/localStorageKeys.enum";
import { ChartLabel } from "src/models/dashboard.model";
import { localStorageHelper } from "src/shared/utils/localStorageHelper";
import { ChartItem as ChartItemModel } from "src/models/dashboard.model";
import { ApiRoutes } from "src/routes/routeConstants/apiRoutes";
import { superAdminChartItems, CHART_CONSTANTS } from "../constants";

const { DEFAULT_ITEM_WIDTH } = CHART_CONSTANTS;

const clubId = localStorageHelper.getItem(LocalStorageKeys.USER)?.clubId ?? "";
const { GET_CHART_DETAIL } = ApiRoutes;

export const calculateChartWidth = (length: number = 0) => {
  return length * DEFAULT_ITEM_WIDTH + 40;
};

const {
  CHART_TEXT,
  DARK_GOLD,
  TOOLTIP_BG,
  ASHGRO_WHITE,
  GRID_LINE,
  ASHGRO_NAVY,
  ASHGRO_WHITE_80,
  DEFAULT_BAR_COLOR,
} = Colors;

export const createBarChart = (
  ctx: ChartItem,
  title: string,
  labels: ChartLabel[],
) => {
  const dataLabelPlugin = {
    id: `${title}_dataLabels`,
    afterDatasetsDraw(chart: Chart) {
      const { ctx } = chart;
      chart.data.datasets?.forEach((dataset, i) => {
        const meta = chart?.getDatasetMeta(i);
        meta?.data?.forEach((bar, index) => {
          const value = dataset?.data?.[index] as number;
          if (bar && value !== undefined && value !== null) {
            ctx.fillStyle = CHART_TEXT;
            ctx.font = "bold 14px sans-serif";
            ctx.textAlign = Justify.CENTER;
            ctx.textBaseline = Align.BOTTOM;
            ctx.fillText(value.toString(), bar.x, bar.y - 8);
          }
        });
      });
    },
  };

  const maxDataValue = Math.max(
    0,
    ...(labels?.map((item) => item?.count || 0) || []),
  );
  const yAxisMax = maxDataValue * 1.1;

  const config: ChartConfiguration = {
    type: "bar",
    data: {
      labels: labels?.map((item) => item?.name) || [],
      datasets: [
        {
          label: title,
          data: labels?.map((item) => item?.count || 0) || [],
          backgroundColor: DEFAULT_BAR_COLOR,
          borderRadius: 6,
          barThickness: 30,
          maxBarThickness: 30,
          categoryPercentage: 1.0,
          barPercentage: 0.43,
          hoverBackgroundColor: DARK_GOLD,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          top: 20,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: false,
        },
        tooltip: {
          backgroundColor: TOOLTIP_BG,
          titleColor: ASHGRO_WHITE,
          bodyColor: ASHGRO_WHITE_80,
          titleFont: {
            size: 14,
            weight: 400,
          },
          bodyFont: {
            size: 16,
            weight: 700,
          },
          padding: 12,
          cornerRadius: 8,
          displayColors: false,
          yAlign: Align.BOTTOM,
          callbacks: {
            title: (tooltipItems) => {
              return tooltipItems?.[0]?.label || "";
            },
            label: (context) => {
              return `${context?.parsed?.y || 0}`;
            },
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: true,
            drawOnChartArea: true,
            color: GRID_LINE,
            tickLength: 0,
          },
          border: {
            display: false,
            dash: [4, 4],
          },
          ticks: {
            color: ASHGRO_NAVY,
            font: {
              size: 12,
              weight: 400,
            },
            padding: 10,
            maxRotation: 0,
            minRotation: 0,
            autoSkip: false,
            callback: function (value) {
              const label = this.getLabelForValue(value as number);
              if (label?.length > 7) {
                return label.substring(0, 8) + "...";
              }
              return label;
            },
          },
        },
        y: {
          display: true,
          max: yAxisMax,
          grid: {
            display: true,
            color: GRID_LINE,
            tickLength: 0,
          },
          border: {
            display: false,
            dash: [4, 4],
          },
          ticks: {
            display: false,
          },
        },
      },
    },
    plugins: [dataLabelPlugin],
  };

  return new Chart(ctx, config);
};

export const generateChartPaths = (charts: ChartItemModel[]) => {
  if (!charts?.length) return [];
  return charts?.map((chart) => {
    chart.path = generatePath(GET_CHART_DETAIL, { clubId, chartId: chart.id });
    return chart;
  });
};

export const SUPER_ADMIN_CHARTS = superAdminChartItems?.map((item, index) => ({
  ...item,
  label: item.id,
  isDefault: true,
  order: index,
  path: generatePath(ApiRoutes.ADMIN_DASHBOARD_CHART, { type: item.id }),
}));

export const getSwappedCharts = (
  charts: ChartItemModel[],
  activeId?: string,
  overId?: string,
) => {
  if (!overId || activeId === overId) return null;

  const oldIndex = charts?.findIndex(({ id }) => id === activeId);
  const newIndex = charts?.findIndex(({ id }) => id === overId);

  if (oldIndex === -1 || newIndex === -1) return null;

  const newCharts = [...charts];
  [newCharts[oldIndex], newCharts[newIndex]] = [
    newCharts[newIndex],
    newCharts[oldIndex],
  ];

  return { newCharts, oldIndex, newIndex };
};
