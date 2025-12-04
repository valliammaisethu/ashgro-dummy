import { ChartLabel } from "src/models/dashboard.model";

export interface ChartCanvasProps {
  title: string;
  labels: ChartLabel[];
  barColor?: string;
  height?: number;
}

export interface BarChartCardProps {
  title?: string;
  isDefaultChart?: boolean;
  barColor?: string;
  apiPath?: string;
}
