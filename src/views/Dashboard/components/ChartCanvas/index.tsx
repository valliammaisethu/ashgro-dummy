import React, { useEffect, useRef } from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BarController,
} from "chart.js";

import { calculateChartWidth, createBarChart } from "../../utils/chartUtils";
import { ChartCanvasProps } from "src/shared/types/dashboard.types";
import { Colors } from "src/enums/colors.enum";

import styles from "../BarChartCard/barChartCard.module.scss";

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend,
);

const ChartCanvas: React.FC<ChartCanvasProps> = ({
  title,
  labels,
  barColor = Colors.DEFAULT_BAR_COLOR,
  height = 350,
}) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  const calculatedWidth = calculateChartWidth(labels?.length);

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    chartInstance.current = createBarChart(ctx, title, labels, barColor);

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [labels, title, barColor]);

  return (
    <div
      className={styles.chartContainerWrapper}
      style={{ height: height, width: "100%", maxWidth: "100%" }}
    >
      <div style={{ width: `max(${calculatedWidth}px, 100%)`, height: "100%" }}>
        <canvas ref={chartRef} />
      </div>
    </div>
  );
};

export default ChartCanvas;
