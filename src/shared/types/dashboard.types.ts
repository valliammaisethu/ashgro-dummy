import {
  DraggableAttributes,
  DraggableSyntheticListeners,
} from "@dnd-kit/core";
import { CustomChart } from "src/models/chart.model";
import { ChartLabel } from "src/models/dashboard.model";

export interface ChartCanvasProps {
  title: string;
  labels: ChartLabel[];
  height?: number;
}

export interface ChartOrderUpdate {
  id: string;
  order: number;
}

export interface ReorderChartsPayload {
  charts: ChartOrderUpdate[];
}

export interface BarChartCardProps {
  id?: string;
  title?: string;
  isDefaultChart?: boolean;
  barColor?: string;
  apiPath?: string;
  isDragging?: boolean;
  isOver?: boolean;
  dragHandleProps?: DraggableAttributes & DraggableSyntheticListeners;
  onEdit?: (chartData?: CustomChart) => void;
}
