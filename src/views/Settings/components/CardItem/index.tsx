import React from "react";
import { IconEdit } from "obra-icons-react";

import Button from "src/shared/components/Button";
import DeleteModal from "src/shared/components/DeleteModal";
import TextTooltip from "src/shared/components/atoms/TextTooltip";

import styles from "./cardItem.module.scss";

interface CardItemProps {
  id?: string;
  label: string;
  onEdit: () => void;
  onDelete: () => void;
  deleteTitle: string;
  deleteDescription: string;
  loading?: boolean;
}

const CardItem: React.FC<CardItemProps> = ({
  label,
  onEdit,
  onDelete,
  deleteTitle,
  deleteDescription,
  loading,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.labelContainer}>
        <TextTooltip text={label} className={styles.cardLabel} />
      </div>

      <div className={styles.cardActions}>
        <Button
          onClick={onEdit}
          icon={<IconEdit strokeWidth={1.5} />}
          className={styles.editButton}
        />

        <DeleteModal
          title={deleteTitle}
          description={deleteDescription}
          onDelete={onDelete}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default CardItem;
