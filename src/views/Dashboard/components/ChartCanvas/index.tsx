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

    chartInstance.current = createBarChart(ctx, title, labels);

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [labels, title]);

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
