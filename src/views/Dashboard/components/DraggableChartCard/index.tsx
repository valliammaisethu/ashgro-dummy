import React from "react";
import {
  DraggableAttributes,
  DraggableSyntheticListeners,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import clsx from "clsx";

import BarChartCard from "../BarChartCard";
import { ChartItem } from "src/models/dashboard.model";

import styles from "./draggableChartCard.module.scss";

interface DraggableChartCardProps {
  chart: ChartItem;
}

const DraggableChartCard: React.FC<DraggableChartCardProps> = ({ chart }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: chart.id,
  });

  const { setNodeRef: setDroppableNodeRef, isOver } = useDroppable({
    id: chart.id,
  });

  const handleNodeRef = (node: HTMLDivElement) => {
    setNodeRef(node);
    setDroppableNodeRef(node);
  };

  return (
    <div
      ref={handleNodeRef}
      className={clsx(styles.draggableCard, {
        [styles.dragging]: isDragging,
      })}
    >
      <BarChartCard
        id={chart.id}
        title={chart?.name}
        isDefaultChart={chart?.isDefault}
        apiPath={chart?.path}
        isDragging={isDragging}
        isOver={isOver}
        dragHandleProps={
          { ...attributes, ...listeners } as DraggableAttributes &
            DraggableSyntheticListeners
        }
      />
    </div>
  );
};

export default React.memo(DraggableChartCard);
