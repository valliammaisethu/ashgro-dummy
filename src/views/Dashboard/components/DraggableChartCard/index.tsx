import React from "react";
import {
  DraggableAttributes,
  DraggableSyntheticListeners,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import clsx from "clsx";

import BarChartCard from "../BarChartCard";
import { DraggableChartCardProps } from "src/shared/types/dashboard.type";

import styles from "./draggableChartCard.module.scss";

const DraggableChartCard: React.FC<DraggableChartCardProps> = ({
  chart,
  onEdit,
}) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: chart?.id,
  });

  const { setNodeRef: setDroppableRef, isOver } = useDroppable({
    id: chart?.id,
  });

  return (
    <div
      ref={(node) => {
        setNodeRef(node);
        setDroppableRef(node);
      }}
      className={clsx(styles.draggableChartCard, {
        [styles.dragging]: isDragging,
        [styles.over]: isOver,
      })}
    >
      <BarChartCard
        chart={chart}
        dragChartProps={{
          isDragging,
          isOver,
          dragHandleProps: {
            ...attributes,
            ...listeners,
          } as DraggableAttributes & DraggableSyntheticListeners,
        }}
        onEdit={onEdit}
      />
    </div>
  );
};

export default React.memo(DraggableChartCard);
